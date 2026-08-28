/**
 * Razorpay Checkout script loading.
 *
 * These pages are prerendered, so nothing here may touch `window` at module
 * load. The script is injected on demand instead of sitting in the document
 * head, so visitors who never start a payment do not download it.
 */

const CHECKOUT_SCRIPT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

export interface RazorpayHandlerResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface RazorpayFailure {
  error?: {
    code?: string;
    description?: string;
    reason?: string;
    step?: string;
    source?: string;
  };
}

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description?: string;
  image?: string;
  order_id: string;
  handler: (response: RazorpayHandlerResponse) => void;
  prefill?: { name?: string; email?: string; contact?: string; method?: string };
  notes?: Record<string, string>;
  theme?: { color?: string };
  modal?: { ondismiss?: () => void };
  config?: {
    display?: {
      blocks?: Record<string, { name: string; instruments: Array<Record<string, unknown>> }>;
      sequence?: string[];
      preferences?: { show_default_blocks?: boolean };
    };
  };
}

/**
 * Puts UPI first in the Checkout modal, with cards, netbanking and wallets
 * still available underneath.
 *
 * `show_default_blocks: true` is what keeps those other methods visible - with
 * it false the modal would show UPI only. Each listed method still has to be
 * enabled on the Razorpay account itself; this only controls ordering.
 */
export const UPI_FIRST_CHECKOUT_CONFIG: RazorpayOptions["config"] = {
  display: {
    blocks: {
      upi: {
        name: "Pay using UPI",
        instruments: [{ method: "upi" }],
      },
    },
    sequence: ["block.upi"],
    preferences: { show_default_blocks: true },
  },
};

export interface RazorpayInstance {
  open: () => void;
  on: (event: string, handler: (payload: RazorpayFailure) => void) => void;
  close?: () => void;
}

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

let loadPromise: Promise<void> | null = null;

/**
 * Resolves once window.Razorpay is usable. The promise is cached so repeated
 * checkout attempts reuse one script tag, and cleared on failure so a later
 * attempt can retry after a transient network error.
 */
export function loadRazorpayCheckout(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Razorpay Checkout is only available in the browser."));
  }

  if (window.Razorpay) return Promise.resolve();
  if (loadPromise) return loadPromise;

  loadPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${CHECKOUT_SCRIPT_SRC}"]`
    );

    const fail = () => {
      loadPromise = null;
      reject(new Error("Could not load the payment gateway. Please check your connection."));
    };

    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", fail, { once: true });
      // Already finished loading before we attached the listener.
      if (window.Razorpay) resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = CHECKOUT_SCRIPT_SRC;
    script.async = true;
    script.addEventListener("load", () => resolve(), { once: true });
    script.addEventListener("error", fail, { once: true });
    document.body.appendChild(script);
  });

  return loadPromise;
}

/** Razorpay surfaces its own errors under `error.description`. */
export function describeRazorpayFailure(failure: RazorpayFailure): string {
  return (
    failure?.error?.description
    || failure?.error?.reason
    || "The payment could not be completed. You have not been charged."
  );
}
