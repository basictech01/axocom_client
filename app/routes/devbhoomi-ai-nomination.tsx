import { useState, type FormEvent } from "react";
import { ArrowLeft, Award, Check, ShieldCheck, Sparkles, Trophy } from "lucide-react";
import { buildSeoLinks, buildSeoMeta } from "~/lib/seo";
import { apolloClient } from "~/lib/api";
import { REGISTER_NOMINATION_MUTATION } from "~/features/summit/services";
import { formatPaise, calculateGst, formatGstRate } from "~/features/summit/lib/money";
import { useRazorpayCheckout } from "~/features/summit/hooks/useRazorpayCheckout";

const seo = {
  title: "Awards Nomination | Devbhoomi AI Summit 2026",
  description:
    "Submit an award nomination for Devbhoomi AI Summit 2026. Choose Standard, Premium, or Platinum nomination.",
  path: "/DevbhoomiAISummit/nomination",
  image: "/images/devbhoomi-ai/summit-logo.png",
  imageAlt: "Devbhoomi AI Summit 2026 Awards Nomination",
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

const nominationPlans = [
  {
    name: "Standard Nomination",
    price: "₹9,999",
    amount: 9999,
    icon: ShieldCheck,
    features: [
      "One award category",
      "Digital nomination certificate",
      "Jury evaluation",
      "Finalist consideration",
      "Winner announcement on official platforms",
    ],
  },
  {
    name: "Premium Nomination",
    price: "₹19,999",
    amount: 19999,
    icon: Award,
    featured: true,
    features: [
      "One award category",
      "Priority evaluation",
      "Finalist badge",
      "Physical certificate or trophy if shortlisted or selected as winner",
      "Summit profile listing",
      "Social-media recognition",
      "2 summit passes",
    ],
  },
  {
    name: "Platinum Nomination",
    price: "₹34,999",
    amount: 34999,
    icon: Trophy,
    features: [
      "One award category",
      "Premium jury evaluation",
      "2 delegate passes",
      "Trophy and certificate",
      "Winner interview and profile",
      "Stage recognition",
      "Featured social and media promotion",
      "AI Summit website profile",
      "Networking access",
    ],
  },
];

const initialForm = {
  nomineeName: "",
  organisation: "",
  designation: "",
  email: "",
  phone: "",
  website: "",
  achievements: "",
};

export default function DevbhoomiAINomination() {
  const [selectedPlan, setSelectedPlan] = useState(nominationPlans[1].name);
  const selectedPlanDetails = nominationPlans.find((plan) => plan.name === selectedPlan) ?? nominationPlans[1];
  const [form, setForm] = useState(initialForm);
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [registrationId, setRegistrationId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const checkout = useRazorpayCheckout();
  // Mirrors the server calculation; the server recomputes it on submit and its
  // figure is the one charged.
  const gst = calculateGst(selectedPlanDetails.amount, 1);

  const updateField = (field: keyof typeof initialForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  /**
   * Notifies the summit inbox. Best-effort only: the nomination is already
   * persisted by the time this runs, so a failure here must not fail the flow.
   */
  const notifyByEmail = async (id: string) => {
    try {
      await fetch("https://formsubmit.co/ajax/sponsorship@axocom.in", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          registration_id: id,
          nomination_plan: `${selectedPlan} - ${selectedPlanDetails.price} + GST`,
          subtotal: formatPaise(gst.subtotalAmount),
          gst: `${formatGstRate(gst.gstRateBps)} - ${formatPaise(gst.gstAmount)}`,
          total_price: formatPaise(gst.totalAmount),
          nominee_name: form.nomineeName,
          organisation: form.organisation,
          designation: form.designation,
          email: form.email,
          phone: form.phone,
          website_or_linkedin_profile: form.website || "Not provided",
          achievements: form.achievements,
          _subject: `Devbhoomi AI Summit Award Nomination - ${form.nomineeName}`,
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
        mutation: REGISTER_NOMINATION_MUTATION,
        variables: {
          input: {
            nomineeName: form.nomineeName,
            organisation: form.organisation,
            designation: form.designation,
            email: form.email,
            phone: form.phone,
            website: form.website || null,
            achievements: form.achievements,
            planName: selectedPlanDetails.name,
            contactConsent: true,
          },
        },
      });

      const id = response.data?.registerNomination.registrationId;
      if (!id) throw new Error("Nomination failed");

      await notifyByEmail(id);
      setRegistrationId(id);
      setSubmitted(true);
    } catch (submitError) {
      const message =
        submitError instanceof Error && submitError.message
          ? submitError.message
          : "We could not submit your nomination. Please email sponsorship@axocom.in directly.";
      setError(message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="nomination-page">
      <style>{`
        .nomination-page {
          --green:#B7D933; --teal:#17B6B8; --blue:#2D7DBB; --deep-blue:#2C4F96;
          --ink:#15171A; --muted:#676C73; --line:#DDE3E5;
          --gradient:linear-gradient(135deg,#B7D933 0%,#67C85A 25%,#17B6B8 52%,#2D7DBB 78%,#2C4F96 100%);
          min-height:100vh; color:var(--ink); background:#F7FAFA;
          font-family:"Montserrat",sans-serif; font-size:16px;
        }
        .nomination-page * { box-sizing:border-box; }
        .nomination-page a { color:inherit; text-decoration:none; }
        .nomination-shell { width:min(1180px,calc(100% - 48px)); margin:0 auto; }
        .nomination-nav { position:sticky; top:0; z-index:20; border-bottom:1px solid rgba(221,227,229,.85); background:rgba(255,255,255,.92); backdrop-filter:blur(16px); }
        .nomination-nav-inner { min-height:82px; display:flex; align-items:center; justify-content:space-between; gap:24px; }
        .nomination-brand { width:fit-content; display:flex; align-items:center; gap:6px; }
        .nomination-itda { width:39px; height:39px; object-fit:contain; }
        .nomination-logo { width:auto; height:68px; object-fit:contain; }
        .nomination-back { display:inline-flex; align-items:center; gap:8px; color:#227684; font-size:13px; font-weight:700; }
        .nomination-back svg { width:18px; height:18px; }
        .nomination-hero { position:relative; overflow:hidden; padding:78px 0 116px; background:#fff; }
        .nomination-hero::after { content:""; position:absolute; inset:auto 0 -25% 0; height:80%; background:url("/images/devbhoomi-ai/summit-landscape.png") center/cover no-repeat; opacity:.07; pointer-events:none; }
        .nomination-hero-inner { position:relative; z-index:1; max-width:820px; }
        .nomination-kicker { margin:0; color:#128F9D; font-size:12px; font-weight:800; letter-spacing:.14em; text-transform:uppercase; }
        .nomination-hero h1 { margin:14px 0 0; font-size:clamp(42px,6vw,72px); line-height:1.02; font-weight:800; }
        .nomination-hero h1 span { background:var(--gradient); color:transparent; background-clip:text; -webkit-background-clip:text; }
        .nomination-hero-copy { max-width:680px; margin:22px 0 0; color:var(--muted); font-size:17px; line-height:1.75; }
        .nomination-main { position:relative; z-index:2; margin-top:-54px; padding-bottom:88px; }
        .nomination-plans { display:grid; grid-template-columns:repeat(3,1fr); gap:18px; }
        .nomination-plan { min-height:100%; padding:28px; display:grid; grid-template-rows:58px 52px 44px 1fr; align-content:stretch; text-align:left; border:1px solid var(--line); border-radius:8px; background:#fff; box-shadow:0 12px 34px rgba(44,79,150,.08); }
        .nomination-plan-top { height:58px; display:flex; align-items:center; justify-content:space-between; gap:16px; }
        .nomination-plan-icon { width:48px; height:48px; display:grid; place-items:center; border-radius:8px; color:#168D9D; background:#EFF9F8; }
        .nomination-plan-icon svg { width:26px; height:26px; }
        .nomination-popular { padding:6px 9px; border-radius:6px; color:#fff; background:#2D7DBB; font-size:9px; font-weight:800; text-transform:uppercase; }
        .nomination-plan h2 { margin:18px 0 0; align-self:start; font-size:19px; line-height:1.35; }
        .nomination-price { margin:0; align-self:start; color:#168D9D; font-size:30px; line-height:1.25; font-weight:800; }
        .nomination-price small { color:var(--muted); font-size:11px; font-weight:600; }
        .nomination-features { display:grid; align-content:start; gap:11px; margin:0; padding:20px 0 0; border-top:1px solid #EDF0F1; list-style:none; }
        .nomination-features li { display:flex; align-items:flex-start; gap:9px; color:#50565D; font-size:12px; line-height:1.5; }
        .nomination-features svg { width:16px; height:16px; flex:0 0 auto; margin-top:1px; color:#78AD32; }
        .nomination-form-section { display:grid; grid-template-columns:.72fr 1.28fr; gap:54px; align-items:start; padding-top:76px; }
        .nomination-form-copy { position:sticky; top:118px; }
        .nomination-form-copy h2 { margin:12px 0 0; font-size:clamp(30px,4vw,46px); line-height:1.12; }
        .nomination-form-copy p:last-child { margin:18px 0 0; color:var(--muted); line-height:1.7; }
        .nomination-selected { margin-top:24px; padding:18px; border-left:4px solid #17A9AB; background:#fff; box-shadow:0 8px 24px rgba(44,79,150,.07); }
        .nomination-selected span { display:block; color:var(--muted); font-size:10px; font-weight:700; text-transform:uppercase; }
        .nomination-selected-detail { margin:7px 0 0; color:var(--muted); font-size:11px; }
        .nomination-breakdown { display:grid; gap:7px; margin:14px 0 0; padding-top:13px; border-top:1px solid #EDF0F1; }
        .nomination-breakdown div { display:flex; align-items:baseline; justify-content:space-between; gap:12px; }
        .nomination-breakdown dt { color:var(--muted); font-size:11px; }
        .nomination-breakdown dd { margin:0; font-size:12px; font-weight:700; }
        .nomination-breakdown-total { padding-top:7px; border-top:1px solid #EDF0F1; }
        .nomination-breakdown-total dt { color:var(--ink)!important; font-weight:700; }
        .nomination-breakdown-total dd { color:#168D9D; font-size:14px; }
        .nomination-selected strong { display:block; margin-top:5px; color:#168D9D; font-size:15px; }
        .nomination-selected-price { margin:6px 0 0; color:var(--ink); font-size:20px; font-weight:800; }
        .nomination-selected-price small { color:var(--muted); font-size:10px; font-weight:600; }
        .nomination-form-card { padding:34px; border:1px solid var(--line); border-radius:8px; background:#fff; box-shadow:0 18px 48px rgba(44,79,150,.09); }
        .nomination-form-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); column-gap:18px; row-gap:20px; align-items:start; }
        .nomination-field { min-width:0; display:grid; grid-template-rows:18px auto; gap:8px; align-content:start; }
        .nomination-field.full { grid-column:1/-1; }
        .nomination-field label { display:flex; align-items:center; min-width:0; font-size:12px; font-weight:700; line-height:18px; }
        .nomination-field input, .nomination-field select, .nomination-field textarea { display:block; width:100%; min-width:0; margin:0; padding:0 14px; border:1px solid #D6DCDD; border-radius:7px; color:var(--ink); background:#fff; font:inherit; font-size:13px; outline:0; }
        .nomination-field input, .nomination-field select { height:48px; }
        .nomination-field textarea { min-height:130px; padding-top:13px; padding-bottom:13px; resize:vertical; line-height:1.55; }
        .nomination-field input:focus, .nomination-field select:focus, .nomination-field textarea:focus { border-color:#17A9AB; box-shadow:0 0 0 3px rgba(23,182,184,.11); }
        .nomination-consent { grid-column:1/-1; width:100%; display:flex; align-items:flex-start; gap:10px; color:var(--muted); font-size:11px; line-height:1.5; }
        .nomination-consent input { width:16px; height:16px; flex:0 0 16px; margin:1px 0 0; accent-color:#168D9D; }
        .nomination-submit { grid-column:1/-1; width:100%; min-height:52px; margin:0; border:0; border-radius:8px; color:#fff; background:var(--gradient); font:inherit; font-size:14px; font-weight:800; cursor:pointer; }
        .nomination-submit:disabled { cursor:wait; opacity:.7; }
        .nomination-error { grid-column:1/-1; margin:0; color:#B42318; font-size:12px; text-align:center; }
        .nomination-success { padding:44px 20px; text-align:center; }
        .nomination-success-icon { width:64px; height:64px; margin:0 auto; display:grid; place-items:center; border-radius:50%; color:#fff; background:var(--gradient); }
        .nomination-success h2 { margin:22px 0 0; font-size:32px; }
        .nomination-success p { max-width:480px; margin:12px auto 24px; color:var(--muted); line-height:1.7; }
        .nomination-reference { display:grid; gap:4px; max-width:420px; margin:0 auto 24px!important; padding:14px 16px; border:1px dashed #C9D6D8; border-radius:8px; background:#F7FAFA; font-size:11px; }
        .nomination-secondary { width:100%; min-height:46px; margin-top:12px; border:1px solid #D6DCDD; border-radius:8px; color:var(--muted); background:#fff; font:inherit; font-size:13px; font-weight:700; cursor:pointer; }
        .nomination-success .nomination-error { margin:14px auto 0; }
        .nomination-reference-row { display:grid; gap:4px; margin-top:9px; padding-top:9px; border-top:1px solid #E4EAEB; }
        .nomination-reference strong { color:var(--ink); font-size:15px; font-family:ui-monospace,SFMono-Regular,Menlo,monospace; letter-spacing:.02em; }
        .nomination-footer { padding:26px 0; border-top:1px solid var(--line); color:var(--muted); background:#fff; font-size:11px; }
        .nomination-footer-inner { display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:12px 20px; }
        .nomination-footer-links { display:flex; flex-wrap:wrap; gap:6px 18px; }
        .nomination-footer-links a { color:#227684; font-weight:600; }
        .nomination-footer-links a:hover { text-decoration:underline; }
        @media (max-width:900px) { .nomination-plans { grid-template-columns:1fr; } .nomination-form-section { grid-template-columns:1fr; } .nomination-form-copy { position:static; } }
        @media (max-width:640px) {
          .nomination-shell { width:min(100% - 32px,1180px); }
          .nomination-nav-inner { min-height:72px; gap:12px; }
          .nomination-itda { width:29px; height:29px; }
          .nomination-logo { height:54px; }
          .nomination-back span { display:none; }
          .nomination-hero { padding:58px 0 96px; }
          .nomination-form-card { padding:24px 18px; }
          .nomination-form-grid { grid-template-columns:1fr; }
          .nomination-field.full, .nomination-consent, .nomination-submit, .nomination-error { grid-column:auto; }
          .nomination-footer-inner { flex-direction:column; }
        }
      `}</style>

      <nav className="nomination-nav" aria-label="Awards nomination navigation">
        <div className="nomination-shell nomination-nav-inner">
          <a className="nomination-brand" href="/DevbhoomiAISummit" aria-label="Devbhoomi AI Summit home">
            <img className="nomination-itda" src="/itda_without_background.png" alt="Information Technology Development Agency" />
            <img className="nomination-logo" src="/images/devbhoomi-ai/summit-logo.png" alt="Devbhoomi AI Summit 2026" />
          </a>
          <a className="nomination-back" href="/DevbhoomiAISummit"><ArrowLeft /><span>Back to Summit</span></a>
        </div>
      </nav>

      <header className="nomination-hero">
        <div className="nomination-shell nomination-hero-inner">
          <p className="nomination-kicker">Devbhoomi AI Summit Awards</p>
          <h1>Recognising ideas that move <span>Uttarakhand forward</span></h1>
          <p className="nomination-hero-copy">Choose the nomination package that fits your goals, then tell the jury about the individual or organisation creating meaningful impact through AI and innovation.</p>
        </div>
      </header>

      <main className="nomination-shell nomination-main">
        <section className="nomination-plans" aria-label="Nomination packages">
          {nominationPlans.map((plan) => {
            const Icon = plan.icon;
            return (
              <article className="nomination-plan" key={plan.name}>
                <div className="nomination-plan-top">
                  <span className="nomination-plan-icon" aria-hidden="true"><Icon /></span>
                  {plan.featured && <span className="nomination-popular">Most popular</span>}
                </div>
                <h2>{plan.name}</h2>
                <p className="nomination-price">{plan.price} <small>+ GST</small></p>
                <ul className="nomination-features">
                  {plan.features.map((feature) => <li key={feature}><Check />{feature}</li>)}
                </ul>
              </article>
            );
          })}
        </section>

        <section className="nomination-form-section">
          <div className="nomination-form-copy">
            <p className="nomination-kicker">Nomination details</p>
            <h2>Put exceptional work in the spotlight.</h2>
            <p>Submit the nominee's details and a concise account of their impact. Our awards team will review the submission and contact you with payment and next-step information.</p>
            <div className="nomination-selected">
              <span>Selected package</span>
              <strong>{selectedPlan}</strong>
              <p className="nomination-selected-price">{formatPaise(gst.totalAmount)}</p>
              <p className="nomination-selected-detail">Payable including GST</p>
              <dl className="nomination-breakdown">
                <div>
                  <dt>{selectedPlanDetails.price} nomination fee</dt>
                  <dd>{formatPaise(gst.subtotalAmount)}</dd>
                </div>
                <div>
                  <dt>GST {formatGstRate(gst.gstRateBps)}</dt>
                  <dd>{formatPaise(gst.gstAmount)}</dd>
                </div>
                <div className="nomination-breakdown-total">
                  <dt>Total payable</dt>
                  <dd>{formatPaise(gst.totalAmount)}</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="nomination-form-card">
            {submitted ? (
              <div className="nomination-success">
                <span className="nomination-success-icon"><Sparkles /></span>
                {checkout.stage === "paid" ? (
                  <>
                    <h2>Payment received</h2>
                    <p>Thank you. We will confirm your nomination on your registered email address.</p>
                  </>
                ) : (
                  <>
                    <h2>Nomination saved</h2>
                    <p>Your nomination is saved. Complete the payment below to submit it for evaluation.</p>
                  </>
                )}
                {registrationId && (
                  <p className="nomination-reference">
                    Nomination reference<strong>{registrationId}</strong>
                    {checkout.receipt?.razorpayPaymentId ? (
                      <>
                        <span className="nomination-reference-row">
                          Payment ID<strong>{checkout.receipt.razorpayPaymentId}</strong>
                        </span>
                        <span className="nomination-reference-row">
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
                    className="nomination-submit"
                    type="button"
                    disabled={checkout.isBusy}
                    onClick={() => void checkout.start({
                      registrationType: "nomination",
                      registrationId,
                      description: selectedPlanDetails.name,
                    })}
                  >
                    {checkout.stage === "verifying"
                      ? "Verifying payment..."
                      : checkout.isBusy
                        ? "Opening payment..."
                        : `Pay ${formatPaise(gst.totalAmount)}`}
                  </button>
                )}
                {checkout.error && <p className="nomination-error">{checkout.error}</p>}
                <button
                  className="nomination-secondary"
                  type="button"
                  onClick={() => { setSubmitted(false); setRegistrationId(null); setForm(initialForm); checkout.reset(); }}
                >
                  Submit another nomination
                </button>
              </div>
            ) : (
              <form className="nomination-form-grid" onSubmit={handleSubmit}>
                <div className="nomination-field full">
                  <label htmlFor="nomination-package">Select nomination package</label>
                  <select id="nomination-package" value={selectedPlan} onChange={(event) => setSelectedPlan(event.target.value)}>
                    {nominationPlans.map((plan) => (
                      <option key={plan.name} value={plan.name}>{plan.name} · {plan.price} + GST</option>
                    ))}
                  </select>
                </div>
                <div className="nomination-field">
                  <label htmlFor="nominee-name">Nominee name</label>
                  <input id="nominee-name" required value={form.nomineeName} onChange={(event) => updateField("nomineeName", event.target.value)} placeholder="Individual or initiative name" />
                </div>
                <div className="nomination-field">
                  <label htmlFor="nominee-organisation">Organisation</label>
                  <input id="nominee-organisation" required value={form.organisation} onChange={(event) => updateField("organisation", event.target.value)} placeholder="Organisation name" />
                </div>
                <div className="nomination-field">
                  <label htmlFor="nominee-designation">Designation</label>
                  <input id="nominee-designation" required value={form.designation} onChange={(event) => updateField("designation", event.target.value)} placeholder="Role or designation" />
                </div>
                <div className="nomination-field">
                  <label htmlFor="contact-email">Work email</label>
                  <input id="contact-email" type="email" required value={form.email} onChange={(event) => updateField("email", event.target.value)} placeholder="you@organisation.com" />
                </div>
                <div className="nomination-field">
                  <label htmlFor="contact-phone">Phone number</label>
                  <input id="contact-phone" type="tel" required value={form.phone} onChange={(event) => updateField("phone", event.target.value)} placeholder="+91 00000 00000" />
                </div>
                <div className="nomination-field">
                  <label htmlFor="nominee-website">Website or profile (or LinkedIn profile link)</label>
                  <input id="nominee-website" type="url" value={form.website} onChange={(event) => updateField("website", event.target.value)} placeholder="https://website.com or linkedin.com/in/profile" />
                </div>
                <div className="nomination-field full">
                  <label htmlFor="nominee-achievements">Impact and key achievements</label>
                  <textarea id="nominee-achievements" required value={form.achievements} onChange={(event) => updateField("achievements", event.target.value)} placeholder="Describe the nominee's work, measurable impact, innovation, and why they should be recognised." />
                </div>
                <label className="nomination-consent">
                  <input type="checkbox" required />
                  <span>I confirm that the information provided is accurate and may be used by the Devbhoomi AI Summit team to evaluate and process this nomination.</span>
                </label>
                <button className="nomination-submit" type="submit" disabled={sending}>{sending ? "Submitting nomination..." : "Submit Nomination"}</button>
                {error && <p className="nomination-error">{error}</p>}
              </form>
            )}
          </div>
        </section>
      </main>

      <footer className="nomination-footer">
        <div className="nomination-shell nomination-footer-inner">
          <span>© 2026 Devbhoomi AI Summit. All rights reserved.</span>
          <nav className="nomination-footer-links" aria-label="Policies and support">
            <a href="/refund-request">Request a refund</a>
            <a href="/refund-status">Track a refund</a>
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