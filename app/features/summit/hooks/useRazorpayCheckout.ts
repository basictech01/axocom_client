import { useCallback, useState } from "react";
import { apolloClient } from "~/lib/api";
import {
  CREATE_PAYMENT_ORDER_MUTATION,
  VERIFY_PAYMENT_MUTATION,
} from "~/features/summit/services";
import {
  describeRazorpayFailure,
  loadRazorpayCheckout,
  UPI_FIRST_CHECKOUT_CONFIG,
  type RazorpayFailure,
  type RazorpayHandlerResponse,
} from "~/features/summit/lib/razorpay";
import type { PaymentReceipt, PaymentRegistrationType } from "~/features/summit/types";

export type CheckoutStage = "idle" | "starting" | "open" | "verifying" | "paid";

type StartOptions = {
  registrationType: PaymentRegistrationType;
  registrationId: string;
  description?: string;
  onPaid?: (registrationId: string) => void;
};

/**
 * Drives one payment: open an order for an existing registration, hand it to
 * Checkout, then verify the signature server-side.
 *
 * The amount is never passed in - the server reads it from the stored
 * registration - so nothing here can influence what is charged.
 */
export function useRazorpayCheckout() {
  const [stage, setStage] = useState<CheckoutStage>("idle");
  const [error, setError] = useState<string | null>(null);
  // Kept so the payer can be shown their gateway references, which is what
  // makes a later support query answerable.
  const [receipt, setReceipt] = useState<PaymentReceipt | null>(null);

  const reset = useCallback(() => {
    setStage("idle");
    setError(null);
    setReceipt(null);
  }, []);

  const start = useCallback(async (options: StartOptions) => {
    const { registrationType, registrationId, description, onPaid } = options;

    setError(null);
    setStage("starting");

    try {
      await loadRazorpayCheckout();

      const orderResponse = await apolloClient.mutate({
        mutation: CREATE_PAYMENT_ORDER_MUTATION,
        variables: { registrationType, registrationId },
      });

      const order = orderResponse.data?.createPaymentOrder;
      if (!order) throw new Error("Could not start the payment. Please try again.");

      const RazorpayConstructor = window.Razorpay;
      if (!RazorpayConstructor) {
        throw new Error("Could not load the payment gateway. Please try again.");
      }

      await new Promise<void>((resolve) => {
        const checkout = new RazorpayConstructor({
          key: order.keyId,
          amount: order.amount,
          currency: order.currency,
          name: "Devbhoomi AI Summit 2026",
          description,
          order_id: order.orderId,
          prefill: {
            name: order.prefillName,
            email: order.prefillEmail,
            contact: order.prefillContact,
            // Opens the modal on UPI; the visitor can still switch method.
            method: "upi",
          },
          config: UPI_FIRST_CHECKOUT_CONFIG,
          notes: { registrationId, registrationType },
          theme: { color: "#17B6B8" },
          handler: (response: RazorpayHandlerResponse) => {
            // Checkout reports success, but only the server can confirm it.
            setStage("verifying");
            apolloClient
              .mutate({
                mutation: VERIFY_PAYMENT_MUTATION,
                variables: {
                  input: {
                    registrationType,
                    registrationId,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpaySignature: response.razorpay_signature,
                  },
                },
              })
              .then((verifyResponse) => {
                const verified = verifyResponse.data?.verifyPayment;
                if (!verified?.verified) {
                  throw new Error("We could not verify this payment.");
                }
                setReceipt({
                  registrationId,
                  razorpayPaymentId: verified.razorpayPaymentId,
                  razorpayOrderId: verified.razorpayOrderId,
                });
                setStage("paid");
                onPaid?.(registrationId);
              })
              .catch((verifyError: unknown) => {
                const message =
                  verifyError instanceof Error && verifyError.message
                    ? verifyError.message
                    : "We could not verify this payment.";
                // The money may well have left the account, so never tell the
                // visitor it simply failed - point them at support with a
                // reference instead.
                // Give them the gateway reference even on failure - it is
                // exactly what support needs to find the money.
                setError(
                  `${message} If your account was debited, email info@axocom.in quoting `
                  + `${registrationId} and payment ${response.razorpay_payment_id}.`
                );
                setStage("idle");
              })
              .finally(resolve);
          },
          modal: {
            ondismiss: () => {
              setStage("idle");
              setError("Payment cancelled. Your registration is saved and still unpaid.");
              resolve();
            },
          },
        });

        checkout.on("payment.failed", (failure: RazorpayFailure) => {
          setError(describeRazorpayFailure(failure));
          setStage("idle");
          resolve();
        });

        setStage("open");
        checkout.open();
      });
    } catch (startError: unknown) {
      const message =
        startError instanceof Error && startError.message
          ? startError.message
          : "Could not start the payment. Please try again.";
      setError(message);
      setStage("idle");
    }
  }, []);

  return { start, reset, stage, error, receipt, isBusy: stage !== "idle" && stage !== "paid" };
}
