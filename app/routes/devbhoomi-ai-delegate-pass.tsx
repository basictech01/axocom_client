import { useState, type FormEvent } from "react";
import {
  ArrowLeft,
  BriefcaseBusiness,
  Building2,
  Crown,
  Rocket,
  Sparkles,
  Star,
} from "lucide-react";
import { buildSeoLinks, buildSeoMeta } from "~/lib/seo";
import { apolloClient } from "~/lib/api";
import { REGISTER_DELEGATE_PASS_MUTATION } from "~/features/summit/services";
import { formatPaise, calculateGst, formatGstRate } from "~/features/summit/lib/money";
import { useRazorpayCheckout } from "~/features/summit/hooks/useRazorpayCheckout";

const seo = {
  title: "Delegate Passes | Devbhoomi AI Summit 2026",
  description:
    "Choose your delegate pass for Devbhoomi AI Summit 2026 in Dehradun, with options for startups, professionals, corporate teams, executives, and VIP guests.",
  path: "/DevbhoomiAISummit/delegate-pass",
  image: "/images/devbhoomi-ai/summit-logo.png",
  imageAlt: "Devbhoomi AI Summit 2026 Delegate Passes",
};

export const meta = () => buildSeoMeta(seo);
export const links = () => [
  ...buildSeoLinks(seo),
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap",
  },
];

const delegatePasses = [
  { name: "Startup Pass", audience: "Startups", price: 1499, icon: Rocket, note: "For founders and startup team members." },
  { name: "Professional Pass", audience: "Professionals", price: 2999, icon: BriefcaseBusiness, note: "For independent professionals and specialists." },
  { name: "Delegate Pass", audience: "Delegates", price: 7500, icon: Building2, note: "For delegates and institutional representatives.", featured: true },
  { name: "Executive Pass", audience: "Executives", price: 14999, icon: Star, note: "For senior leaders and decision-makers." },
  { name: "VIP Pass", audience: "VIP", price: 24999, icon: Crown, note: "For distinguished guests and leaders." },
];

const formatPrice = (price: number) => `₹${price.toLocaleString("en-IN")}`;

const initialForm = {
  name: "",
  designation: "",
  organisation: "",
  email: "",
  phone: "",
  quantity: "1",
  gstNumber: "",
};

export default function DevbhoomiAIDelegatePass() {
  const [selectedPass, setSelectedPass] = useState(delegatePasses[1].name);
  const [form, setForm] = useState(initialForm);
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [registrationId, setRegistrationId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const checkout = useRazorpayCheckout();

  const selected = delegatePasses.find((pass) => pass.name === selectedPass) ?? delegatePasses[1];
  const quantity = Number(form.quantity);
  const totalPrice = selected.price * quantity;
  // Mirrors the server calculation so the visitor sees what will be charged
  // before submitting; the server recomputes it and its figure is authoritative.
  const gst = calculateGst(selected.price, quantity);

  const updateField = (field: keyof typeof initialForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  /**
   * Notifies the summit inbox. Best-effort only: the registration is already
   * persisted by the time this runs, so a failure here must not fail the flow.
   */
  const notifyByEmail = async (id: string) => {
    try {
      await fetch("https://formsubmit.co/ajax/sponsorship@axocom.in", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          registration_id: id,
          delegate_pass: `${selected.name} - ${formatPrice(selected.price)} per delegate + GST`,
          audience: selected.audience,
          quantity: form.quantity,
          subtotal: formatPaise(gst.subtotalAmount),
          gst: `${formatGstRate(gst.gstRateBps)} - ${formatPaise(gst.gstAmount)}`,
          total_price: formatPaise(gst.totalAmount),
          name: form.name,
          designation: form.designation,
          organisation: form.organisation,
          email: form.email,
          phone: form.phone,
          gst_number: form.gstNumber || "Not provided",
          _subject: `Devbhoomi AI Summit Delegate Pass - ${selected.name}`,
          _template: "table",
        }),
      });
    } catch {
      // Swallowed on purpose - the record is safe in the database.
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending) return;

    setSending(true);
    setError(null);

    try {
      const response = await apolloClient.mutate({
        mutation: REGISTER_DELEGATE_PASS_MUTATION,
        variables: {
          input: {
            fullName: form.name,
            designation: form.designation,
            organisation: form.organisation,
            email: form.email,
            phone: form.phone,
            passName: selected.name,
            quantity: Number(form.quantity),
            gstNumber: form.gstNumber || null,
            contactConsent: true,
          },
        },
      });

      const id = response.data?.registerDelegatePass.registrationId;
      if (!id) throw new Error("Registration failed");

      await notifyByEmail(id);
      setRegistrationId(id);
      setSubmitted(true);
    } catch (submitError) {
      const message =
        submitError instanceof Error && submitError.message
          ? submitError.message
          : "We could not submit your registration. Please email sponsorship@axocom.in directly.";
      setError(message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="delegate-page">
      <style>{`
        .delegate-page {
          --green:#B7D933; --teal:#17B6B8; --blue:#2D7DBB; --deep-blue:#2C4F96;
          --ink:#15171A; --muted:#676C73; --line:#DDE3E5;
          --gradient:linear-gradient(135deg,#B7D933 0%,#67C85A 25%,#17B6B8 52%,#2D7DBB 78%,#2C4F96 100%);
          min-height:100vh; color:var(--ink); background:#F7FAFA; font-family:"Montserrat",sans-serif; font-size:16px;
        }
        .delegate-page * { box-sizing:border-box; }
        .delegate-page a { color:inherit; text-decoration:none; }
        .delegate-shell { width:min(1180px,calc(100% - 48px)); margin:0 auto; }
        .delegate-nav { position:sticky; top:0; z-index:20; border-bottom:1px solid rgba(221,227,229,.85); background:rgba(255,255,255,.92); backdrop-filter:blur(16px); }
        .delegate-nav-inner { min-height:82px; display:flex; align-items:center; justify-content:space-between; gap:24px; }
        .delegate-brand { width:fit-content; display:flex; align-items:center; gap:6px; }
        .delegate-itda { width:39px; height:39px; object-fit:contain; }
        .delegate-logo { width:auto; height:68px; object-fit:contain; }
        .delegate-back { display:inline-flex; align-items:center; gap:8px; color:#227684; font-size:13px; font-weight:700; }
        .delegate-back svg { width:18px; height:18px; }
        .delegate-hero { position:relative; overflow:hidden; padding:76px 0 122px; background:#fff; }
        .delegate-hero::after { content:""; position:absolute; inset:auto 0 -28% 0; height:84%; background:url("/images/devbhoomi-ai/summit-landscape.png") center/cover no-repeat; opacity:.07; pointer-events:none; }
        .delegate-hero-inner { position:relative; z-index:1; max-width:850px; }
        .delegate-kicker { margin:0; color:#128F9D; font-size:12px; font-weight:800; letter-spacing:.14em; text-transform:uppercase; }
        .delegate-hero h1 { margin:14px 0 0; font-size:clamp(42px,6vw,72px); line-height:1.02; font-weight:800; }
        .delegate-hero h1 span { background:var(--gradient); color:transparent; background-clip:text; -webkit-background-clip:text; }
        .delegate-hero-copy { max-width:680px; margin:22px 0 0; color:var(--muted); font-size:17px; line-height:1.75; }
        .delegate-main { position:relative; z-index:2; margin-top:-58px; padding-bottom:88px; }
        .delegate-passes { display:grid; grid-template-columns:repeat(5,minmax(0,1fr)); gap:14px; }
        .delegate-pass { min-height:100%; padding:24px 20px; border:1px solid var(--line); border-radius:8px; background:#fff; box-shadow:0 12px 34px rgba(44,79,150,.08); }
        .delegate-pass-top { min-height:44px; display:flex; align-items:center; justify-content:space-between; gap:10px; }
        .delegate-pass-icon { width:44px; height:44px; display:grid; place-items:center; border-radius:8px; color:#168D9D; background:#EFF9F8; }
        .delegate-pass-icon svg { width:23px; height:23px; }
        .delegate-popular { padding:5px 7px; border-radius:5px; color:#fff; background:#2D7DBB; font-size:8px; font-weight:800; text-transform:uppercase; }
        .delegate-pass h2 { margin:18px 0 0; font-size:16px; }
        .delegate-audience { margin:5px 0 0; color:var(--muted); font-size:11px; font-weight:600; text-transform:uppercase; }
        .delegate-price { margin:16px 0 0; color:#168D9D; font-size:26px; font-weight:800; }
        .delegate-price small { display:block; margin-top:2px; color:var(--muted); font-size:10px; font-weight:600; }
        .delegate-pass-note { min-height:54px; margin:17px 0 0; padding-top:15px; border-top:1px solid #EDF0F1; color:#50565D; font-size:11px; line-height:1.55; }
        .delegate-form-section { display:grid; grid-template-columns:.72fr 1.28fr; gap:54px; align-items:start; padding-top:76px; }
        .delegate-form-copy { position:sticky; top:118px; }
        .delegate-form-copy h2 { margin:12px 0 0; font-size:clamp(30px,4vw,46px); line-height:1.12; }
        .delegate-form-copy > p:last-of-type { margin:18px 0 0; color:var(--muted); line-height:1.7; }
        .delegate-selected { margin-top:24px; padding:18px; border-left:4px solid #17A9AB; background:#fff; box-shadow:0 8px 24px rgba(44,79,150,.07); }
        .delegate-selected span { display:block; color:var(--muted); font-size:10px; font-weight:700; text-transform:uppercase; }
        .delegate-selected strong { display:block; margin-top:5px; color:#168D9D; font-size:15px; }
        .delegate-selected-price { margin:8px 0 0; color:var(--ink); font-size:30px; line-height:1.2; font-weight:800; }
        .delegate-selected-price small { color:var(--muted); font-size:11px; font-weight:600; }
        .delegate-selected-detail { margin:7px 0 0!important; color:var(--muted); font-size:11px; line-height:1.5!important; }
        .delegate-breakdown { display:grid; gap:7px; margin:14px 0 0; padding-top:13px; border-top:1px solid #EDF0F1; }
        .delegate-breakdown div { display:flex; align-items:baseline; justify-content:space-between; gap:12px; }
        .delegate-breakdown dt { color:var(--muted); font-size:11px; }
        .delegate-breakdown dd { margin:0; font-size:12px; font-weight:700; }
        .delegate-breakdown-total { padding-top:7px; border-top:1px solid #EDF0F1; }
        .delegate-breakdown-total dt { color:var(--ink)!important; font-weight:700; }
        .delegate-breakdown-total dd { color:#168D9D; font-size:14px; }
        .delegate-form-card { padding:34px; border:1px solid var(--line); border-radius:8px; background:#fff; box-shadow:0 18px 48px rgba(44,79,150,.09); }
        .delegate-form-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:20px 18px; align-items:start; }
        .delegate-field { min-width:0; display:grid; grid-template-rows:18px auto; gap:8px; }
        .delegate-field.full { grid-column:1/-1; }
        .delegate-field label { display:flex; align-items:center; font-size:12px; font-weight:700; line-height:18px; }
        .delegate-field input, .delegate-field select { width:100%; min-width:0; height:48px; margin:0; padding:0 14px; border:1px solid #D6DCDD; border-radius:7px; color:var(--ink); background:#fff; font:inherit; font-size:13px; outline:0; }
        .delegate-field input:focus, .delegate-field select:focus { border-color:#17A9AB; box-shadow:0 0 0 3px rgba(23,182,184,.11); }
        .delegate-consent { grid-column:1/-1; display:flex; align-items:flex-start; gap:10px; color:var(--muted); font-size:11px; line-height:1.5; }
        .delegate-consent input { width:16px; height:16px; flex:0 0 16px; margin:1px 0 0; accent-color:#168D9D; }
        .delegate-submit { grid-column:1/-1; width:100%; min-height:52px; border:0; border-radius:8px; color:#fff; background:var(--gradient); font:inherit; font-size:14px; font-weight:800; cursor:pointer; }
        .delegate-submit:disabled { cursor:wait; opacity:.7; }
        .delegate-error { grid-column:1/-1; margin:0; color:#B42318; font-size:12px; text-align:center; }
        .delegate-success { padding:44px 20px; text-align:center; }
        .delegate-success-icon { width:64px; height:64px; margin:0 auto; display:grid; place-items:center; border-radius:50%; color:#fff; background:var(--gradient); }
        .delegate-success h2 { margin:22px 0 0; font-size:32px; }
        .delegate-success p { max-width:480px; margin:12px auto 24px; color:var(--muted); line-height:1.7; }
        .delegate-reference { display:grid; gap:4px; max-width:420px; margin:0 auto 24px!important; padding:14px 16px; border:1px dashed #C9D6D8; border-radius:8px; background:#F7FAFA; font-size:11px; }
        .delegate-secondary { width:100%; min-height:46px; margin-top:12px; border:1px solid #D6DCDD; border-radius:8px; color:var(--muted); background:#fff; font:inherit; font-size:13px; font-weight:700; cursor:pointer; }
        .delegate-success .delegate-error { margin:14px auto 0; }
        .delegate-reference-row { display:grid; gap:4px; margin-top:9px; padding-top:9px; border-top:1px solid #E4EAEB; }
        .delegate-reference strong { color:var(--ink); font-size:15px; font-family:ui-monospace,SFMono-Regular,Menlo,monospace; letter-spacing:.02em; }
        .delegate-footer { padding:26px 0; border-top:1px solid var(--line); color:var(--muted); background:#fff; font-size:11px; }
        .delegate-footer-inner { display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:12px 20px; }
        .delegate-footer-links { display:flex; flex-wrap:wrap; gap:6px 18px; }
        .delegate-footer-links a { color:#227684; font-weight:600; }
        .delegate-footer-links a:hover { text-decoration:underline; }
        @media (max-width:1080px) { .delegate-passes { grid-template-columns:repeat(3,1fr); } }
        @media (max-width:900px) { .delegate-form-section { grid-template-columns:1fr; } .delegate-form-copy { position:static; } }
        @media (max-width:700px) { .delegate-passes { grid-template-columns:1fr; } .delegate-pass-note { min-height:0; } }
        @media (max-width:640px) {
          .delegate-shell { width:min(100% - 32px,1180px); }
          .delegate-nav-inner { min-height:72px; gap:12px; }
          .delegate-itda { width:29px; height:29px; }
          .delegate-logo { height:54px; }
          .delegate-back span { display:none; }
          .delegate-hero { padding:58px 0 100px; }
          .delegate-form-card { padding:24px 18px; }
          .delegate-form-grid { grid-template-columns:1fr; }
          .delegate-field.full, .delegate-consent, .delegate-submit, .delegate-error { grid-column:auto; }
          .delegate-footer-inner { flex-direction:column; }
        }
      `}</style>

      <nav className="delegate-nav" aria-label="Delegate pass navigation">
        <div className="delegate-shell delegate-nav-inner">
          <a className="delegate-brand" href="/DevbhoomiAISummit" aria-label="Devbhoomi AI Summit home">
            <img className="delegate-itda" src="/itda_without_background.png" alt="Information Technology Development Agency" />
            <img className="delegate-logo" src="/images/devbhoomi-ai/summit-logo.png" alt="Devbhoomi AI Summit 2026" />
          </a>
          <a className="delegate-back" href="/DevbhoomiAISummit"><ArrowLeft /><span>Back to Summit</span></a>
        </div>
      </nav>

      <header className="delegate-hero">
        <div className="delegate-shell delegate-hero-inner">
          <p className="delegate-kicker">Devbhoomi AI Summit 2026</p>
          <h1>Choose your seat at the <span>AI table</span></h1>
          <p className="delegate-hero-copy">Select the delegate pass that matches your profile, then share your details. Our team will confirm availability and guide you through payment.</p>
        </div>
      </header>

      <main className="delegate-shell delegate-main">
        <section className="delegate-passes" aria-label="Delegate pass options">
          {delegatePasses.map((pass) => {
            const Icon = pass.icon;
            return (
              <article className="delegate-pass" key={pass.name}>
                <div className="delegate-pass-top">
                  <span className="delegate-pass-icon" aria-hidden="true"><Icon /></span>
                  {pass.featured && <span className="delegate-popular">Popular</span>}
                </div>
                <h2>{pass.name}</h2>
                <p className="delegate-audience">{pass.audience}</p>
                <p className="delegate-price">{formatPrice(pass.price)}<small>per delegate + GST</small></p>
                <p className="delegate-pass-note">{pass.note}</p>
              </article>
            );
          })}
        </section>

        <section className="delegate-form-section">
          <div className="delegate-form-copy">
            <p className="delegate-kicker">Reserve your pass</p>
            <h2>Join the people shaping what comes next.</h2>
            <p>Submit your registration details. The summit team will contact you with availability, payment information, and the next steps.</p>
            <div className="delegate-selected">
              <span>Selected pass</span>
              <strong>{selected.name}</strong>
              <p className="delegate-selected-price">{formatPaise(gst.totalAmount)}</p>
              <p className="delegate-selected-detail">Payable including GST</p>
              <dl className="delegate-breakdown">
                <div>
                  <dt>{form.quantity} × {formatPrice(selected.price)}</dt>
                  <dd>{formatPaise(gst.subtotalAmount)}</dd>
                </div>
                <div>
                  <dt>GST {formatGstRate(gst.gstRateBps)} ({formatPaise(gst.unitGstAmount)} per pass)</dt>
                  <dd>{formatPaise(gst.gstAmount)}</dd>
                </div>
                <div className="delegate-breakdown-total">
                  <dt>Total payable</dt>
                  <dd>{formatPaise(gst.totalAmount)}</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="delegate-form-card">
            {submitted ? (
              <div className="delegate-success">
                <span className="delegate-success-icon"><Sparkles /></span>
                {checkout.stage === "paid" ? (
                  <>
                    <h2>Payment received</h2>
                    <p>Thank you. We will confirm your registration seat on your registered email address.</p>
                  </>
                ) : (
                  <>
                    <h2>Registration saved</h2>
                    <p>Your details are saved. Complete the payment below to confirm your seat.</p>
                  </>
                )}
                {registrationId && (
                  <p className="delegate-reference">
                    Registration reference<strong>{registrationId}</strong>
                    {checkout.receipt?.razorpayPaymentId ? (
                      <>
                        <span className="delegate-reference-row">
                          Payment ID<strong>{checkout.receipt.razorpayPaymentId}</strong>
                        </span>
                        <span className="delegate-reference-row">
                          Order ID<strong>{checkout.receipt.razorpayOrderId}</strong>
                        </span>
                        Keep these for any follow-up or refund request.
                      </>
                    ) : (
                      "Keep this handy for any follow-up or refund request."
                    )}
                  </p>
                )}
                {checkout.stage !== "paid" && registrationId && (
                  <button
                    className="delegate-submit"
                    type="button"
                    disabled={checkout.isBusy}
                    onClick={() => void checkout.start({
                      registrationType: "delegate_pass",
                      registrationId,
                      description: `${selected.name} × ${form.quantity}`,
                    })}
                  >
                    {checkout.stage === "verifying"
                      ? "Verifying payment..."
                      : checkout.isBusy
                        ? "Opening payment..."
                        : `Pay ${formatPaise(gst.totalAmount)}`}
                  </button>
                )}
                {checkout.error && <p className="delegate-error">{checkout.error}</p>}
                <button
                  className="delegate-secondary"
                  type="button"
                  onClick={() => { setSubmitted(false); setRegistrationId(null); setForm(initialForm); checkout.reset(); }}
                >
                  Register another delegate
                </button>
              </div>
            ) : (
              <form className="delegate-form-grid" onSubmit={handleSubmit}>
                <div className="delegate-field full">
                  <label htmlFor="delegate-pass">Select pass</label>
                  <select id="delegate-pass" value={selectedPass} onChange={(event) => setSelectedPass(event.target.value)}>
                    {delegatePasses.map((pass) => (
                      <option key={pass.name} value={pass.name}>{pass.name} · {formatPrice(pass.price)} + GST</option>
                    ))}
                  </select>
                </div>
                <div className="delegate-field">
                  <label htmlFor="delegate-name">Full name</label>
                  <input id="delegate-name" required value={form.name} onChange={(event) => updateField("name", event.target.value)} placeholder="Your full name" />
                </div>
                <div className="delegate-field">
                  <label htmlFor="delegate-designation">Designation</label>
                  <input id="delegate-designation" required value={form.designation} onChange={(event) => updateField("designation", event.target.value)} placeholder="Your role" />
                </div>
                <div className="delegate-field">
                  <label htmlFor="delegate-organisation">Organisation</label>
                  <input id="delegate-organisation" required value={form.organisation} onChange={(event) => updateField("organisation", event.target.value)} placeholder="Organisation name" />
                </div>
                <div className="delegate-field">
                  <label htmlFor="delegate-email">Work email</label>
                  <input id="delegate-email" type="email" required value={form.email} onChange={(event) => updateField("email", event.target.value)} placeholder="you@organisation.com" />
                </div>
                <div className="delegate-field">
                  <label htmlFor="delegate-phone">Phone number</label>
                  <input id="delegate-phone" type="tel" required value={form.phone} onChange={(event) => updateField("phone", event.target.value)} placeholder="+91 00000 00000" />
                </div>
                <div className="delegate-field">
                  <label htmlFor="delegate-quantity">Number of passes</label>
                  <select id="delegate-quantity" value={form.quantity} onChange={(event) => updateField("quantity", event.target.value)}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((quantity) => <option key={quantity} value={quantity}>{quantity}</option>)}
                  </select>
                </div>
                <div className="delegate-field">
                  <label htmlFor="delegate-gst">GST number (optional)</label>
                  <input id="delegate-gst" value={form.gstNumber} onChange={(event) => updateField("gstNumber", event.target.value)} placeholder="For tax invoice" />
                </div>
                <label className="delegate-consent">
                  <input type="checkbox" required />
                  <span>I confirm that the information provided is accurate and may be used by the Devbhoomi AI Summit team to process this delegate pass request.</span>
                </label>
                <button className="delegate-submit" type="submit" disabled={sending}>{sending ? "Submitting request..." : `Request ${selected.name}`}</button>
                {error && <p className="delegate-error">{error}</p>}
              </form>
            )}
          </div>
        </section>
      </main>

      <footer className="delegate-footer">
        <div className="delegate-shell delegate-footer-inner">
          <span>© 2026 Devbhoomi AI Summit. All rights reserved.</span>
          <nav className="delegate-footer-links" aria-label="Policies and support">
            <a href="/refund-request">Get help</a>
            <a href="/refund-status">Track a request</a>
            <a href="/refund-policy">Refund policy</a>
            <a href="/terms-and-conditions">Terms</a>
            <a href="/privacy-policy">Privacy</a>
            <a href="/support">Support</a>
          </nav>
          <span>Questions? sponsorship@axocom.in</span>
        </div>
      </footer>
    </div>
  );
}