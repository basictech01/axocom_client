import { useState, type FormEvent } from "react";
import { Sparkles } from "lucide-react";
import { buildSeoLinks, buildSeoMeta } from "~/lib/seo";
import { apolloClient } from "~/lib/api";
import { CREATE_REFUND_REQUEST_MUTATION } from "~/features/summit/services";
import { RefundShell } from "~/features/summit/components/RefundShell";
import type { RefundRegistrationType, SupportRequestType } from "~/features/summit/types";

const REQUEST_TYPES: Array<{ value: SupportRequestType; label: string; hint: string }> = [
  { value: "refund", label: "Request a refund", hint: "You paid and would like the money back." },
  {
    value: "payment_not_reflected",
    label: "I paid but it is not showing",
    hint: "Your payment went through but your registration still shows as unpaid.",
  },
  { value: "other", label: "Something else", hint: "Any other question about your registration." },
];

const seo = {
  title: "Get Help | Devbhoomi AI Summit 2026",
  description:
    "Request a refund, report a payment that has not shown up, or ask about a Devbhoomi AI Summit 2026 delegate pass or nomination, and track it with your ticket reference.",
  path: "/refund-request",
  image: "/images/devbhoomi-ai/summit-logo.png",
  imageAlt: "Devbhoomi AI Summit 2026 help and support",
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
  requestType: "refund" as SupportRequestType,
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
            requestType: form.requestType,
            registrationType: form.registrationType,
            registrationId: form.registrationId.trim(),
            paymentReference: form.paymentReference || null,
            reason: form.reason,
          },
        },
      });

      const id = response.data?.createRefundRequest.ticketId;
      if (!id) throw new Error("Could not raise your request");
      setTicketId(id);
    } catch (submitError) {
      const message =
        submitError instanceof Error && submitError.message
          ? submitError.message
          : "We could not raise your request. Please email info@axocom.in directly.";
      setError(message);
    } finally {
      setSending(false);
    }
  };

  return (
    <RefundShell
      kicker="Help & support"
      title={<>Get <span>help</span> with a registration</>}
      intro="Request a refund, tell us a payment has not shown up, or ask something else. You will get a ticket reference you can use to track it and read our replies."
    >
      <div className="refund-card">
        {ticketId ? (
          <div className="refund-success">
            <span className="refund-success-icon"><Sparkles /></span>
            <h2>Request raised</h2>
            <p>
              Our team will look into it and reply on this ticket. You can check the status and our
              replies at any time.
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
            <div className="refund-field full">
              <label htmlFor="refund-request-type">What is this about?</label>
              <select id="refund-request-type" value={form.requestType} onChange={(event) => updateField("requestType", event.target.value)}>
                {REQUEST_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
              <p className="refund-hint" style={{ marginTop: 6 }}>
                {REQUEST_TYPES.find((type) => type.value === form.requestType)?.hint}
              </p>
            </div>
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
              <label htmlFor="refund-registration">Registration reference</label>
              <input id="refund-registration" required value={form.registrationId} onChange={(event) => updateField("registrationId", event.target.value)} placeholder="e.g. dlg_XXXXXXXX" />
            </div>
            <div className="refund-field">
              <label htmlFor="refund-payment">Payment ID (optional)</label>
              <input id="refund-payment" value={form.paymentReference} onChange={(event) => updateField("paymentReference", event.target.value)} placeholder="e.g. pay_XXXXXXXX" />
            </div>
            <p className="refund-hint" style={{ gridColumn: "1/-1" }}>
              Your registration reference was shown when you registered and is in your
              confirmation email &mdash; it starts with <code>dlg_</code> for a delegate pass or{" "}
              <code>nom_</code> for a nomination. It must match the email address above. If you
              cannot find it, email <a href="mailto:info@axocom.in" style={{ color: "#128F9D", fontWeight: 700, textDecoration: "underline" }}>info@axocom.in</a> and we will look it up for you.
            </p>
            <div className="refund-field full">
              <label htmlFor="refund-reason">
                {form.requestType === "refund" ? "Reason for the refund" : "Tell us what happened"}
              </label>
              <textarea id="refund-reason" required value={form.reason} onChange={(event) => updateField("reason", event.target.value)} placeholder="Tell us why you are requesting a refund, and anything that helps us process it faster." />
            </div>
            {form.requestType === "refund" && (
              <p className="refund-hint" style={{ gridColumn: "1/-1" }}>
                Refunds are governed by our <a href="/refund-policy" style={{ color: "#128F9D", fontWeight: 700, textDecoration: "underline" }}>Refund &amp; Cancellation Policy</a>.
                Requests raised at least 7 days before the event date are eligible for a full refund.
              </p>
            )}
            <button className="refund-submit" type="submit" disabled={sending}>
              {sending ? "Raising request..." : "Raise request"}
            </button>
            {error && <p className="refund-error">{error}</p>}
          </form>
        )}
      </div>

      {!ticketId && (
        <p className="refund-alt">
          Already raised one? <a href="/refund-status">Track it with your ticket reference</a>.
        </p>
      )}
    </RefundShell>
  );
}
