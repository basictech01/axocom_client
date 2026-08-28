import { useState, type FormEvent } from "react";
import { Sparkles } from "lucide-react";
import { buildSeoLinks, buildSeoMeta } from "~/lib/seo";
import { apolloClient } from "~/lib/api";
import { CREATE_REFUND_REQUEST_MUTATION } from "~/features/summit/services";
import { RefundShell } from "~/features/summit/components/RefundShell";
import type { RefundRegistrationType } from "~/features/summit/types";

const seo = {
  title: "Request a Refund | Devbhoomi AI Summit 2026",
  description:
    "Raise a refund request for a Devbhoomi AI Summit 2026 delegate pass or award nomination and track it with your ticket reference.",
  path: "/refund-request",
  image: "/images/devbhoomi-ai/summit-logo.png",
  imageAlt: "Devbhoomi AI Summit 2026 refund request",
};

export const meta = () => buildSeoMeta(seo);
export const links = () => [
  ...buildSeoLinks(seo),
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap",
  },
];

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  registrationType: "delegate_pass" as RefundRegistrationType,
  registrationId: "",
  paymentReference: "",
  reason: "",
};

export default function RefundRequest() {
  const [form, setForm] = useState(initialForm);
  const [sending, setSending] = useState(false);
  const [ticketId, setTicketId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const updateField = (field: keyof typeof initialForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending) return;

    setSending(true);
    setError(null);

    try {
      const response = await apolloClient.mutate({
        mutation: CREATE_REFUND_REQUEST_MUTATION,
        variables: {
          input: {
            fullName: form.fullName,
            email: form.email,
            phone: form.phone,
            registrationType: form.registrationType,
            registrationId: form.registrationId || null,
            paymentReference: form.paymentReference || null,
            reason: form.reason,
          },
        },
      });

      const id = response.data?.createRefundRequest.ticketId;
      if (!id) throw new Error("Refund request failed");
      setTicketId(id);
    } catch (submitError) {
      const message =
        submitError instanceof Error && submitError.message
          ? submitError.message
          : "We could not raise your refund request. Please email info@axocom.in directly.";
      setError(message);
    } finally {
      setSending(false);
    }
  };

  return (
    <RefundShell
      kicker="Refunds & cancellations"
      title={<>Request a <span>refund</span></>}
      intro="Raise a refund request for a delegate pass or award nomination. You will get a ticket reference you can use to track the request and read our replies."
    >
      <div className="refund-card">
        {ticketId ? (
          <div className="refund-success">
            <span className="refund-success-icon"><Sparkles /></span>
            <h2>Refund request raised</h2>
            <p>
              Our team will review your request and reply on this ticket. You can check the status
              and our replies at any time.
            </p>
            <div className="refund-ticket-box">
              Your ticket reference
              <strong>{ticketId}</strong>
              Save this along with the email address you used above.
            </div>
            <a className="refund-submit" style={{ display: "grid", placeItems: "center", textDecoration: "none" }} href={`/refund-status?ticket=${encodeURIComponent(ticketId)}`}>
              Track this request
            </a>
          </div>
        ) : (
          <form className="refund-grid" onSubmit={handleSubmit}>
            <div className="refund-field">
              <label htmlFor="refund-name">Full name</label>
              <input id="refund-name" required value={form.fullName} onChange={(event) => updateField("fullName", event.target.value)} placeholder="Your full name" />
            </div>
            <div className="refund-field">
              <label htmlFor="refund-email">Registered email</label>
              <input id="refund-email" type="email" required value={form.email} onChange={(event) => updateField("email", event.target.value)} placeholder="Email used at registration" />
            </div>
            <div className="refund-field">
              <label htmlFor="refund-phone">Phone number</label>
              <input id="refund-phone" type="tel" required value={form.phone} onChange={(event) => updateField("phone", event.target.value)} placeholder="+91 00000 00000" />
            </div>
            <div className="refund-field">
              <label htmlFor="refund-type">What are you requesting a refund for?</label>
              <select id="refund-type" value={form.registrationType} onChange={(event) => updateField("registrationType", event.target.value)}>
                <option value="delegate_pass">Delegate pass</option>
                <option value="nomination">Award nomination</option>
              </select>
            </div>
            <div className="refund-field">
              <label htmlFor="refund-registration">Registration reference (optional)</label>
              <input id="refund-registration" value={form.registrationId} onChange={(event) => updateField("registrationId", event.target.value)} placeholder="e.g. dlg_XXXXXXXX" />
            </div>
            <div className="refund-field">
              <label htmlFor="refund-payment">Payment reference (optional)</label>
              <input id="refund-payment" value={form.paymentReference} onChange={(event) => updateField("paymentReference", event.target.value)} placeholder="Transaction or order id" />
            </div>
            <div className="refund-field full">
              <label htmlFor="refund-reason">Reason for the refund</label>
              <textarea id="refund-reason" required value={form.reason} onChange={(event) => updateField("reason", event.target.value)} placeholder="Tell us why you are requesting a refund, and anything that helps us process it faster." />
            </div>
            <p className="refund-hint" style={{ gridColumn: "1/-1" }}>
              Refunds are governed by our <a href="/refund-policy" style={{ color: "#128F9D", fontWeight: 700, textDecoration: "underline" }}>Refund &amp; Cancellation Policy</a>.
              Requests raised at least 7 days before the event date are eligible for a full refund.
            </p>
            <button className="refund-submit" type="submit" disabled={sending}>
              {sending ? "Raising request..." : "Raise refund request"}
            </button>
            {error && <p className="refund-error">{error}</p>}
          </form>
        )}
      </div>

      {!ticketId && (
        <p className="refund-alt">
          Already raised a request? <a href="/refund-status">Track it with your ticket reference</a>.
        </p>
      )}
    </RefundShell>
  );
}
