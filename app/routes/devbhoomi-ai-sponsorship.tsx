import { useState, type FormEvent } from "react";
import {
  ArrowLeft, BookOpen, BrainCircuit, Building2, CarFront, Check,
  ChevronDown, Cloud, Cpu, Crown, Factory, Handshake, Landmark,
  Lightbulb, Mic, Radio, Waves, Zap, type LucideIcon,
} from "lucide-react";
import { buildSeoLinks, buildSeoMeta } from "~/lib/seo";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "~/components/ui/select";

const seo = {
  title: "Sponsorship & Partnership | Devbhoomi AI Summit 2026",
  description:
    "Explore sponsorship and partnership packages for Devbhoomi AI Summit 2026 in Dehradun and submit your partnership request.",
  path: "/DevbhoomiAISummit/sponsorship",
  image: "/images/devbhoomi-ai/summit-logo.png",
  imageAlt: "Devbhoomi AI Summit 2026 Sponsorship Packages",
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

const partnershipCategories = [
  { category: "Presented By (Booked)", investment: "₹15,00,000", deliverables: "Naming rights, keynote, premium panel seat, premium branding, exhibition space, media features & VIP networking.", booked: true },
  { category: "River Conversation Partner (Booked)", investment: "₹5,00,000", deliverables: "River Conversation Partner recognition, session association, prominent branding & stakeholder networking.", booked: true },
  { category: "Associate Partner", investment: "₹1,50,000", deliverables: "Partner recognition, website/collateral branding, digital visibility, delegate passes & networking." },
  { category: "Media Partner", investment: "₹2,00,000", deliverables: "Media Partner recognition, prominent branding, digital visibility, stakeholder access & event recognition." },
  { category: "Mobility Partner", investment: "₹2,50,000", deliverables: "Mobility showcase, relevant panel opportunity, branding, exhibition & networking." },
  { category: "Infrastructure Partner", investment: "₹3,00,000", deliverables: "Infrastructure showcase, relevant panel opportunity, branding, exhibition & stakeholder networking." },
  { category: "Industrial Partner", investment: "₹3,00,000", deliverables: "Industry-use-case showcase, panel opportunity, branding, exhibition & industry networking." },
  { category: "FinTech Partner", investment: "₹3,00,000", deliverables: "Academic recognition, student/faculty engagement, panel/mentor opportunity, branding & networking." },
  { category: "Cloud Partner", investment: "₹3,00,000", deliverables: "Cloud showcase, panel opportunity, prominent branding, exhibition & stakeholder networking." },
  { category: "Innovation Partner", investment: "₹3,00,000", deliverables: "Innovation showcase, panel opportunity, branding, exhibition & startup networking." },
  { category: "Technology Partner", investment: "₹3,00,000", deliverables: "Technology showcase, panel/demo opportunity, prominent branding, exhibition & networking." },
  { category: "Knowledge Partner", investment: "₹3,00,000", deliverables: "Panel opportunity, prominent branding, knowledge-session association, exhibition & networking." },
  { category: "AI Partner", investment: "₹5,00,000", deliverables: "AI Partner recognition, panel opportunity, logo visibility, AI showcase & exhibition space." },
  { category: "Co-Powered By", investment: "₹4,00,000", deliverables: "Premium branding, senior leadership panel seat, exhibition space, media coverage & stakeholder networking." },
  { category: "Powered By", investment: "₹5,00,000", deliverables: "Prominent branding, keynote/panel opportunity, exhibition space, media visibility & stakeholder networking." },
];

const featuredCategories = ["Presented By (Booked)", "AI Partner", "Powered By"];
const partnershipIcons: Record<string, LucideIcon> = {
  "Presented By (Booked)": Crown,
  "AI Partner": BrainCircuit,
  "Powered By": Zap,
  "River Conversation Partner (Booked)": Waves,
  "Associate Partner": Handshake,
  "Media Partner": Mic,
  "Mobility Partner": CarFront,
  "Infrastructure Partner": Building2,
  "Industrial Partner": Factory,
  "FinTech Partner": Landmark,
  "Cloud Partner": Cloud,
  "Innovation Partner": Lightbulb,
  "Technology Partner": Cpu,
  "Knowledge Partner": BookOpen,
  "Co-Powered By": Radio,
};
const featuredPartnerships = featuredCategories.flatMap((name) =>
  partnershipCategories.filter(({ category }) => category === name),
);
const otherPartnerships = partnershipCategories.filter(
  ({ category }) => !featuredCategories.includes(category),
);

const roleChips = [
  "Government / Policy",
  "Enterprise / IT",
  "Tourism / Transport",
  "AI Startup",
  "Academia / Research",
  "Media / Civil society",
];

const initialForm = { name: "", org: "", email: "", phone: "" };

export default function DevbhoomiAISponsorship() {
  const [form, setForm] = useState(initialForm);
  const [role, setRole] = useState<string | null>(null);
  const [partnershipCategory, setPartnershipCategory] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const selectedPartnership = partnershipCategories.find(({ category }) => category === partnershipCategory);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!(form.name.trim() && form.email.trim() && partnershipCategory) || sending) return;

    setSending(true);
    setError(null);
    try {
      const response = await fetch("https://formsubmit.co/ajax/sponsorship@axocom.in", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          organisation: form.org || "Not provided",
          email: form.email,
          phone: form.phone || "Not provided",
          role: role ?? "Not specified",
          partnership_category: selectedPartnership?.category,
          investment: selectedPartnership?.investment,
          key_deliverables: selectedPartnership?.deliverables,
          _subject: "Devbhoomi AI Summit 2026 - Sponsorship request",
          _template: "table",
        }),
      });
      if (!response.ok) throw new Error("Request failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please email sponsorship@axocom.in directly.");
    } finally {
      setSending(false);
    }
  };

  const resetForm = () => {
    setForm(initialForm);
    setRole(null);
    setPartnershipCategory("");
    setSubmitted(false);
    setError(null);
  };

  return (
    <div className="sponsor-page">
      <style>{`
        .sponsor-page {
          --green:#B7D933; --teal:#17B6B8; --blue:#2D7DBB; --deep-blue:#2C4F96;
          --ink:#15171A; --muted:#676C73; --line:#DDE3E5;
          --gradient:linear-gradient(135deg,#B7D933 0%,#67C85A 25%,#17B6B8 52%,#2D7DBB 78%,#2C4F96 100%);
          min-height:100vh; color:var(--ink); background:#F7FAFA; font-family:"Montserrat",sans-serif; font-size:16px;
        }
        .sponsor-page * { box-sizing:border-box; }
        .sponsor-page a { color:inherit; text-decoration:none; }
        .sponsor-shell { width:min(1180px,calc(100% - 48px)); margin:0 auto; }
        .sponsor-nav { position:sticky; top:0; z-index:20; border-bottom:1px solid rgba(221,227,229,.85); background:rgba(255,255,255,.92); backdrop-filter:blur(16px); }
        .sponsor-nav-inner { min-height:82px; display:flex; align-items:center; justify-content:space-between; gap:24px; }
        .sponsor-brand { width:fit-content; display:flex; align-items:center; gap:6px; }
        .sponsor-itda { width:39px; height:39px; object-fit:contain; }
        .sponsor-logo { width:auto; height:68px; object-fit:contain; }
        .sponsor-back { display:inline-flex; align-items:center; gap:8px; color:#227684; font-size:13px; font-weight:700; }
        .sponsor-back svg { width:18px; height:18px; }
        .sponsor-hero { position:relative; overflow:hidden; padding:18px 0 16px; background:#fff; }
        .sponsor-hero::after { content:""; position:absolute; inset:auto 0 -28% 0; height:84%; background:url("/images/devbhoomi-ai/summit-landscape.png") center/cover no-repeat; opacity:.07; pointer-events:none; }
        .sponsor-hero-inner { position:relative; z-index:1; }
        .sponsor-kicker { margin:0; color:#128F9D; font-size:12px; font-weight:800; letter-spacing:.14em; text-transform:uppercase; }
        .sponsor-hero h1 { margin:8px 0 0; font-size:clamp(30px,3.5vw,44px); line-height:1.1; font-weight:800; }
        .sponsor-hero h1 span { background:var(--gradient); color:transparent; background-clip:text; -webkit-background-clip:text; }
        .sponsor-hero-copy { margin:10px 0 0; color:var(--muted); font-size:13px; line-height:1.6; }
        .sponsor-main { position:relative; z-index:2; padding-top:16px; padding-bottom:88px; }
        .sponsor-featured { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:12px; }
        .sponsor-package { padding:18px 20px; border:1px solid #BADFD9; border-radius:14px; background:linear-gradient(140deg,#F0F8DB,#ECFAF8); box-shadow:0 6px 20px rgba(44,79,150,.05); }
        .sponsor-package:nth-child(2) { background:linear-gradient(140deg,#E2F8F3,#EDF5FF); border-color:#B3DDD9; }
        .sponsor-package:nth-child(3) { background:linear-gradient(140deg,#EBF2FF,#F1EFFB); border-color:#CDD6EC; }
        .sponsor-package-top { display:flex; align-items:center; justify-content:space-between; gap:10px; }
        .sponsor-package-icon { width:38px; height:38px; flex-shrink:0; display:grid; place-items:center; border:1px solid #D5E6E3; border-radius:11px; background:#ffffffb3; color:#176F7C; }
        .sponsor-package-icon svg { width:21px; height:21px; }
        .sponsor-package-booked-tag { padding:4px 7px; border-radius:5px; color:#A32525; background:#FCE4E4; font-size:9px; font-weight:800; text-transform:uppercase; }
        .sponsor-package h2 { margin:10px 0 0; font-size:20px; font-weight:800; }
        .sponsor-package-price { margin:4px 0 0; color:#176F7C; font-size:27px; font-weight:800; }
        .sponsor-package-note { margin:10px 0 0; padding-top:10px; border-top:1px solid #C8DDD9; color:#485D65; font-size:12px; line-height:1.5; }
        .sponsor-options-heading { display:flex; align-items:baseline; justify-content:space-between; flex-wrap:wrap; gap:8px; margin:18px 0 10px; }
        .sponsor-options-heading h2 { margin:0; font-size:14px; font-weight:800; }
        .sponsor-options-heading p { margin:0; color:var(--muted); font-size:11px; }
        .sponsor-compact-grid { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); align-items:start; gap:9px; }
        .sponsor-compact { min-width:0; border:1px solid var(--line); border-radius:10px; background:#fff; }
        .sponsor-compact summary { display:flex; align-items:center; gap:10px; min-height:68px; padding:10px 12px; cursor:pointer; list-style:none; }
        .sponsor-compact summary::-webkit-details-marker { display:none; }
        .sponsor-compact summary:focus-visible { outline:2px solid #128F9D; outline-offset:3px; border-radius:10px; }
        .sponsor-compact:hover, .sponsor-compact[open] { border-color:#128F9D; }
        .sponsor-compact .sponsor-package-icon { width:32px; height:32px; border:0; border-radius:9px; background:#F0F7F7; }
        .sponsor-compact .sponsor-package-icon svg { width:18px; height:18px; }
        .sponsor-compact-copy { flex:1; min-width:0; }
        .sponsor-compact-name { display:block; color:#263D47; font-size:12px; line-height:1.4; font-weight:700; }
        .sponsor-compact-price { display:block; margin-top:3px; color:#176F7C; font-size:13px; font-weight:800; }
        .sponsor-compact .sponsor-package-booked-tag { display:inline-block; margin-top:4px; font-size:8px; }
        .sponsor-expand { width:14px; height:14px; flex-shrink:0; color:#64767E; }
        .sponsor-compact[open] .sponsor-expand { transform:rotate(180deg); }
        .sponsor-compact .sponsor-package-note { margin:0 12px 12px; }
        .sponsor-form-section { display:grid; grid-template-columns:.72fr 1.28fr; gap:54px; align-items:start; padding-top:76px; }
        .sponsor-form-copy { position:sticky; top:118px; }
        .sponsor-form-copy h2 { margin:12px 0 0; font-size:clamp(30px,4vw,46px); line-height:1.12; }
        .sponsor-form-copy > p:last-of-type { margin:18px 0 0; color:var(--muted); line-height:1.7; }
        .sponsor-contact { margin-top:24px; padding:18px; border-left:4px solid #17A9AB; background:#fff; box-shadow:0 8px 24px rgba(44,79,150,.07); display:flex; align-items:center; gap:14px; }
        .sponsor-contact svg { width:22px; height:22px; color:#168D9D; }
        .sponsor-contact strong { display:block; font-size:14px; }
        .sponsor-contact span { display:block; color:var(--muted); font-size:12px; }
        .sponsor-form-card { padding:34px; border:1px solid var(--line); border-radius:8px; background:#fff; box-shadow:0 18px 48px rgba(44,79,150,.09); }
        .sponsor-form-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:20px 18px; align-items:start; }
        .sponsor-field { min-width:0; display:grid; grid-template-rows:18px auto; gap:8px; }
        .sponsor-field.full { grid-column:1/-1; }
        .sponsor-field label { display:flex; align-items:center; font-size:12px; font-weight:700; line-height:18px; }
        .sponsor-field input { width:100%; min-width:0; height:48px; margin:0; padding:0 14px; border:1px solid #D6DCDD; border-radius:7px; color:var(--ink); background:#fff; font:inherit; font-size:13px; outline:0; }
        .sponsor-field input:focus { border-color:#17A9AB; box-shadow:0 0 0 3px rgba(23,182,184,.11); }
        .sponsor-partnership-trigger { width:100%; height:auto; min-height:48px; padding:10px 14px; border:1px solid #D6DCDD; border-radius:7px; background:#fff; color:var(--ink); white-space:normal; text-align:left; }
        .sponsor-partnership-trigger-copy { min-width:0; flex:1; display:grid; grid-template-columns:minmax(0,1fr) max-content; align-items:center; gap:8px; }
        .sponsor-partnership-name { font-size:13px; font-weight:700; }
        .sponsor-partnership-price { color:#168D9D; font-size:12px; font-weight:700; }
        .sponsor-partnership-placeholder { color:var(--muted); font-size:13px; }
        /* Radix renders the menu outside the page's typography and colour scope. */
        .sponsor-partnership-menu { width:var(--radix-select-trigger-width); max-width:calc(100vw - 24px); max-height:min(360px,var(--radix-select-content-available-height)); border:1px solid #D6DCDD; border-radius:8px; background:#fff; color:#15171A; font-family:"Montserrat",sans-serif; box-shadow:0 12px 32px rgba(44,79,150,.16); }
        .sponsor-partnership-menu [data-radix-select-viewport] { min-width:0!important; }
        .sponsor-partnership-option { align-items:flex-start; padding:10px 32px 10px 10px; white-space:normal; overflow-wrap:anywhere; }
        .sponsor-partnership-option[data-highlighted] { background:#EFF9F8; color:#15171A; }
        .sponsor-partnership-option > span:last-child { width:100%; min-width:0; display:block; }
        .sponsor-partnership-option-copy { width:100%; min-width:0; display:block; padding:2px 0; }
        .sponsor-partnership-option-head { display:grid; grid-template-columns:minmax(0,1fr) max-content; align-items:baseline; gap:10px; }
        .sponsor-partnership-option-name { color:#15171A; font-size:13px; font-weight:700; }
        .sponsor-partnership-option-price { color:#168D9D; font-size:12px; font-weight:700; }
        .sponsor-partnership-option-details { display:block; margin-top:4px; color:#50565D; font-size:12px; line-height:1.5; }
        .sponsor-partnership-booked { color:#C62828; }
        .sponsor-partnership-summary { margin-top:8px; padding:12px 14px; border-radius:7px; background:#EFF9F8; }
        .sponsor-partnership-summary-label { margin:0; color:#128F9D; font-size:10px; font-weight:800; text-transform:uppercase; }
        .sponsor-deliverables { margin:5px 0 0; color:var(--muted); font-size:12px; line-height:1.55; }
        .sponsor-chips { display:flex; flex-wrap:wrap; gap:8px; }
        .sponsor-chip { padding:8px 14px; border:1px solid #D6DCDD; border-radius:20px; color:var(--ink); background:#fff; font:inherit; font-size:12px; font-weight:600; cursor:pointer; }
        .sponsor-chip.active { color:#fff; border-color:transparent; background:var(--gradient); }
        .sponsor-submit { grid-column:1/-1; width:100%; min-height:52px; border:0; border-radius:8px; color:#fff; background:var(--gradient); font:inherit; font-size:14px; font-weight:800; cursor:pointer; }
        .sponsor-submit:disabled { cursor:wait; opacity:.7; }
        .sponsor-error { grid-column:1/-1; margin:0; color:#B42318; font-size:12px; text-align:center; }
        .sponsor-success { padding:44px 20px; text-align:center; }
        .sponsor-success-icon { width:64px; height:64px; margin:0 auto; display:grid; place-items:center; border-radius:50%; color:#fff; background:var(--gradient); }
        .sponsor-success h2 { margin:22px 0 0; font-size:32px; }
        .sponsor-success p { max-width:480px; margin:12px auto 24px; color:var(--muted); line-height:1.7; }
        .sponsor-success button { border:0; border-radius:8px; padding:14px 22px; color:#fff; background:var(--gradient); font:inherit; font-size:13px; font-weight:800; cursor:pointer; }
        .sponsor-footer { padding:26px 0; border-top:1px solid var(--line); color:var(--muted); background:#fff; font-size:11px; }
        .sponsor-footer-inner { display:flex; justify-content:space-between; gap:20px; }
        @media (max-width:1080px) { .sponsor-compact-grid { grid-template-columns:repeat(3,minmax(0,1fr)); } }
        @media (max-width:900px) { .sponsor-form-section { grid-template-columns:1fr; } .sponsor-form-copy { position:static; } }
        @media (max-width:640px) {
          .sponsor-shell { width:min(100% - 32px,1180px); }
          .sponsor-nav-inner { min-height:72px; gap:12px; }
          .sponsor-itda { width:29px; height:29px; }
          .sponsor-logo { height:54px; }
          .sponsor-back span { display:none; }
          .sponsor-hero { padding:24px 0; }
          .sponsor-featured { grid-template-columns:1fr; }
          .sponsor-compact-grid { grid-template-columns:repeat(2,minmax(0,1fr)); }
          .sponsor-compact summary { padding:10px; gap:7px; }
          .sponsor-compact .sponsor-package-icon { width:26px; height:26px; }
          .sponsor-compact-name { font-size:11px; }
          .sponsor-expand { width:12px; }
          .sponsor-form-card { padding:24px 18px; }
          .sponsor-form-grid { grid-template-columns:1fr; }
          .sponsor-field.full, .sponsor-submit, .sponsor-error { grid-column:auto; }
          .sponsor-footer-inner { flex-direction:column; }
        }
        @media (max-width:380px) { .sponsor-compact-grid { grid-template-columns:1fr; } }
      `}</style>

      <nav className="sponsor-nav" aria-label="Sponsorship navigation">
        <div className="sponsor-shell sponsor-nav-inner">
          <a className="sponsor-brand" href="/DevbhoomiAISummit" aria-label="Devbhoomi AI Summit home">
            <img className="sponsor-itda" src="/itda_without_background.png" alt="Information Technology Development Agency" />
            <img className="sponsor-logo" src="/images/devbhoomi-ai/summit-logo.png" alt="Devbhoomi AI Summit 2026" />
          </a>
          <a className="sponsor-back" href="/DevbhoomiAISummit"><ArrowLeft /><span>Back to Summit</span></a>
        </div>
      </nav>

      <header className="sponsor-hero">
        <div className="sponsor-shell sponsor-hero-inner">
          <p className="sponsor-kicker">Devbhoomi AI Summit 2026</p>
          <h1>Become a <span>Summit Partner</span></h1>
          <p className="sponsor-hero-copy">
            Put your organisation at the heart of Uttarakhand's AI ecosystem. Find your partnership below.
          </p>
        </div>
      </header>

      <main className="sponsor-shell sponsor-main">
        <section className="sponsor-packages" aria-label="Sponsorship packages">
          <div className="sponsor-featured">
            {featuredPartnerships.map(({ category, investment, deliverables, booked }) => {
              const Icon = partnershipIcons[category];
              return (
                <article className="sponsor-package" key={category}>
                  <div className="sponsor-package-top">
                    <span className="sponsor-package-icon" aria-hidden="true"><Icon /></span>
                    {booked && <span className="sponsor-package-booked-tag">Booked</span>}
                  </div>
                  <h2>{category.replace(" (Booked)", "")}</h2>
                  <p className="sponsor-package-price">{investment}</p>
                  <p className="sponsor-package-note">{deliverables}</p>
                </article>
              );
            })}
          </div>
          <div className="sponsor-options-heading">
            <h2>More ways to partner</h2>
            <p>Select an option to explore its benefits</p>
          </div>
          <div className="sponsor-compact-grid">
            {otherPartnerships.map(({ category, investment, deliverables, booked }) => {
              const Icon = partnershipIcons[category];
              return (
                <details className="sponsor-compact" key={category}>
                  <summary>
                    <span className="sponsor-package-icon" aria-hidden="true"><Icon /></span>
                    <span className="sponsor-compact-copy">
                      <span className="sponsor-compact-name">{category.replace(" (Booked)", "")}</span>
                      <span className="sponsor-compact-price">{investment}</span>
                      {booked && <span className="sponsor-package-booked-tag">Booked</span>}
                    </span>
                    <ChevronDown className="sponsor-expand" aria-hidden="true" />
                  </summary>
                  <p className="sponsor-package-note">{deliverables}</p>
                </details>
              );
            })}
          </div>
        </section>

        <section className="sponsor-form-section">
          <div className="sponsor-form-copy">
            <p className="sponsor-kicker">Shape the future with us</p>
            <h2>Join the organisations powering AI in Uttarakhand.</h2>
            <p>Select the partnership category that fits your organisation and submit your details. Our summit team will get back to you with the next steps.</p>
            <div className="sponsor-contact">
              <Handshake />
              <div><strong>Shruti Kotiyal</strong><span>sponsorship@axocom.in · +91 63999 06916</span></div>
            </div>
          </div>

          <div className="sponsor-form-card">
            {submitted ? (
              <div className="sponsor-success">
                <span className="sponsor-success-icon"><Check /></span>
                <h2>Thank you</h2>
                <p>Your partnership interest has been noted. The summit team will reach out shortly.</p>
                <button type="button" onClick={resetForm}>Submit another response</button>
              </div>
            ) : (
              <form className="sponsor-form-grid" onSubmit={handleSubmit}>
                <div className="sponsor-field">
                  <label htmlFor="sponsor-name">Full name</label>
                  <input id="sponsor-name" required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Your full name" />
                </div>
                <div className="sponsor-field">
                  <label htmlFor="sponsor-org">Organisation</label>
                  <input id="sponsor-org" value={form.org} onChange={(event) => setForm({ ...form, org: event.target.value })} placeholder="Your organisation" />
                </div>
                <div className="sponsor-field">
                  <label htmlFor="sponsor-email">Work email</label>
                  <input id="sponsor-email" type="email" required value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="you@organisation.com" />
                </div>
                <div className="sponsor-field">
                  <label htmlFor="sponsor-phone">Phone number</label>
                  <input id="sponsor-phone" type="tel" required value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} placeholder="+91 00000 00000" />
                </div>
                <div className="sponsor-field full">
                  <label htmlFor="sponsor-partnership-category">Partnership category</label>
                  <Select required value={partnershipCategory} onValueChange={setPartnershipCategory}>
                    <SelectTrigger id="sponsor-partnership-category" className="sponsor-partnership-trigger" aria-label="Partnership category">
                      {selectedPartnership ? (
                        <span className="sponsor-partnership-trigger-copy">
                          <span className={`sponsor-partnership-name${selectedPartnership.booked ? " sponsor-partnership-booked" : ""}`}>{selectedPartnership.category}</span>
                          <span className="sponsor-partnership-price">{selectedPartnership.investment}</span>
                        </span>
                      ) : (
                        <span className="sponsor-partnership-placeholder">Select a partnership category</span>
                      )}
                    </SelectTrigger>
                    <SelectContent className="sponsor-partnership-menu" position="popper" align="start" sideOffset={6}>
                      {partnershipCategories.map(({ category, investment, deliverables, booked }) => (
                        <SelectItem className="sponsor-partnership-option" key={category} value={category} textValue={category}>
                          <span className="sponsor-partnership-option-copy">
                            <span className="sponsor-partnership-option-head">
                              <span className={`sponsor-partnership-option-name${booked ? " sponsor-partnership-booked" : ""}`}>{category}</span>
                              <span className="sponsor-partnership-option-price">{investment}</span>
                            </span>
                            <span className="sponsor-partnership-option-details">{deliverables}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedPartnership && (
                    <div className="sponsor-partnership-summary" aria-live="polite">
                      <p className="sponsor-partnership-summary-label">Included with this partnership</p>
                      <p className="sponsor-deliverables">{selectedPartnership.deliverables}</p>
                    </div>
                  )}
                </div>
                <div className="sponsor-field full">
                  <label>Your role</label>
                  <div className="sponsor-chips">
                    {roleChips.map((chip) => (
                      <button className={`sponsor-chip${role === chip ? " active" : ""}`} key={chip} type="button" onClick={() => setRole(role === chip ? null : chip)}>
                        {chip}
                      </button>
                    ))}
                  </div>
                </div>
                <button className="sponsor-submit" type="submit" disabled={sending}>
                  {sending ? "Submitting..." : "Submit Partnership Request"}
                </button>
                {error && <p className="sponsor-error">{error}</p>}
              </form>
            )}
          </div>
        </section>
      </main>

      <footer className="sponsor-footer">
        <div className="sponsor-shell sponsor-footer-inner">
          <span>© 2026 Devbhoomi AI Summit. All rights reserved.</span>
          <span><Mic style={{ width: 14, height: 14, verticalAlign: "-2px", marginRight: 4 }} />sponsorship@axocom.in</span>
        </div>
      </footer>
    </div>
  );
}
