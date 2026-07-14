import React, { useState } from "react";
import {
  buildSeoLinks,
  buildSeoMeta,
  eventSchema,
  organizationSchema,
  structuredData,
  webPageSchema,
} from "~/lib/seo";

const seo = {
  title: "Devbhoomi AI Summit 2026",
  description:
    "Devbhoomi AI Summit 2026 - Uttarakhand's flagship leadership forum on Artificial Intelligence, on 9 October 2026 at Hyatt Centric, Dehradun. An initiative of ITDA, Government of Uttarakhand.",
  path: "/DevbhoomiAISummit",
  image: "/images/summit2.png",
  imageAlt: "Devbhoomi AI Summit 2026 - Building an AI-Native Uttarakhand",
  keywords: [
    "Devbhoomi AI Summit 2026",
    "Uttarakhand AI Summit",
    "AI governance",
    "Hyatt Centric Dehradun event",
    "ITDA Uttarakhand",
  ],
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
    href: "https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600&family=Geist:wght@400;500;600;700;800&family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0&display=swap",
  },
];

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Hyatt Centric Rajpur Road Dehradun",
  image: "",
  telephone: "+91-135-614-1234",
  address: {
    "@type": "PostalAddress",
    streetAddress: "152 / 3-4, Jakhan, Rajpur Road",
    addressLocality: "Dehradun",
    addressRegion: "Uttarakhand",
    postalCode: "248001",
    addressCountry: "IN",
  },
};

const themes = [
  { icon: "temple_hindu", title: "AI for Char Dham Yatra & pilgrim safety" },
  { icon: "traffic", title: "AI-driven traffic & mobility management" },
  { icon: "satellite_alt", title: "AI-powered encroachment & illegal construction detection" },
  { icon: "support_agent", title: "AI-enabled grievance redressal & citizen services" },
  { icon: "account_balance", title: "AI in governance & public infrastructure" },
  { icon: "landscape", title: "AI for sustainability & replicable Himalayan development models" },
];

const attendees = [
  { icon: "account_balance", label: "Government departments & policymakers" },
  { icon: "developer_board", label: "CIOs, CTOs, CDOs & enterprise technology leaders" },
  { icon: "luggage", label: "Tourism, transport & infrastructure stakeholders" },
  { icon: "rocket_launch", label: "AI startups & solution providers" },
  { icon: "school", label: "Academia & research institutions" },
  { icon: "campaign", label: "Media & civil society representatives" },
];

const patrons = [
  {
    name: "Lt Gen (Retd) Gurmit Singh",
    role: "Hon'ble Governor, Uttarakhand",
    image: "/images/governor_Gen_Gurmit_Singh.jpeg",
  },
  {
    name: "Shri Pushkar Singh Dhami",
    role: "Hon'ble Chief Minister, Uttarakhand",
    image: "/images/cm_pushkar_singh_dhami.jpg",
  },
  {
    name: "Shri Pradeep Batra",
    role: "IT Minister & Good Governance, Uttarakhand",
    image: "/images/summitDeligate/shri_pradeep_batra_it_minister_govt_uttarakhand.jpg",
  },
];

const speakers = [
  {
    name: "Shri Nitesh Jha",
    role: "Honourable IT Secretary, Government of Uttarakhand",
    image: "/images/summitDeligate/shri_nitesh_kumar_jha_ias_secretary_information_technology_govt_uttarakhand.jpg",
  },
  {
    name: "Shri Alok Pandey",
    role: "Director, ITDA",
    image: "/images/Alok-Kumar-Pandey.jpeg",
  },
  { name: "Shri Ashish Upadhyaya", role: "General Manager (AI)", image: "/images/ashish_upadhyay.jpg.jpeg" },
];

const roleChips = [
  "Government / Policy",
  "Enterprise / IT",
  "Tourism / Transport",
  "AI Startup",
  "Academia / Research",
  "Media / Civil society",
];

const Eyebrow = ({ icon, children }: { icon: string; children: React.ReactNode }) => (
  <span className="dbs-eyebrow">
    <span className="material-symbols-rounded">{icon}</span>
    {children}
  </span>
);

const Ribbons = ({
  id,
  className = "",
  style,
}: {
  id: string;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <svg
    className={`dbs-ribbons ${className}`}
    style={style}
    viewBox="0 0 1440 520"
    preserveAspectRatio="none"
    aria-hidden="true"
    focusable="false"
  >
    <defs>
      <linearGradient id={`${id}-stroke`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#34D399" />
        <stop offset="0.5" stopColor="#10B981" />
        <stop offset="1" stopColor="#38BDF8" />
      </linearGradient>
      <linearGradient id={`${id}-stroke2`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#38BDF8" />
        <stop offset="1" stopColor="#3B82F6" />
      </linearGradient>
      <linearGradient id={`${id}-em`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#10B981" stopOpacity="0.24" />
        <stop offset="1" stopColor="#10B981" stopOpacity="0" />
      </linearGradient>
      <linearGradient id={`${id}-blue`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#38BDF8" stopOpacity="0.20" />
        <stop offset="1" stopColor="#38BDF8" stopOpacity="0" />
      </linearGradient>
      <linearGradient id={`${id}-front`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#10B981" stopOpacity="0.30" />
        <stop offset="1" stopColor="#10B981" stopOpacity="0" />
      </linearGradient>
    </defs>

    {/* Filled ridges — mountain silhouettes that double as stacked data bands */}
    <path d="M0,300 C220,250 380,332 620,300 C880,266 1060,342 1300,296 C1372,284 1416,300 1440,296 L1440,520 L0,520 Z" fill={`url(#${id}-blue)`} />
    <path d="M0,378 C240,330 430,432 720,372 C1010,312 1200,422 1440,366 L1440,520 L0,520 Z" fill={`url(#${id}-em)`} />
    <path d="M0,440 C260,400 470,492 780,432 C1090,372 1250,470 1440,428 L1440,520 L0,520 Z" fill={`url(#${id}-front)`} />

    {/* Glowing ridge lines — digital data waves tracing the ridge crests */}
    <path className="dbs-ribbon-line dbs-ribbon-a" d="M0,300 C220,250 380,332 620,300 C880,266 1060,342 1300,296 C1372,284 1416,300 1440,296" stroke={`url(#${id}-stroke)`} strokeWidth="2" opacity="0.9" />
    <path className="dbs-ribbon-line dbs-ribbon-b" d="M0,378 C240,330 430,432 720,372 C1010,312 1200,422 1440,366" stroke={`url(#${id}-stroke2)`} strokeWidth="1.5" opacity="0.7" />
    <path className="dbs-ribbon-line dbs-ribbon-a" d="M-40,232 C240,196 430,270 720,226 C1010,182 1220,258 1480,214" stroke={`url(#${id}-stroke)`} strokeWidth="1.25" opacity="0.5" />
  </svg>
);

const DevbhoomiAISummit: React.FC = () => {
  const [form, setForm] = useState({ name: "", org: "", email: "", phone: "" });
  const [role, setRole] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!(form.name.trim() && form.email.trim()) || sending) return;

    setSending(true);
    setError(null);
    try {
      const res = await fetch("https://formsubmit.co/ajax/sponsorship@axocom.in", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          organisation: form.org || "Not provided",
          email: form.email,
          phone: form.phone || "Not provided",
          role: role ?? "Not specified",
          _subject: "Devbhoomi AI Summit 2026 - Sponsorship request",
          _template: "table",
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please email sponsorship@axocom.in directly.");
    } finally {
      setSending(false);
    }
  };

  const resetForm = () => {
    setForm({ name: "", org: "", email: "", phone: "" });
    setRole(null);
    setSubmitted(false);
    setError(null);
  };

  return (
    <div className="dbs-root">
      <style>{`
        .dbs-root {
          /* Light eco-futurism: snow-white base · deep slate gray type · emerald green · electric blue */
          --emerald:#10B981; --emerald-bright:#059669; --emerald-deep:#047857;
          --green:#10B981; --green-deep:#059669; --mint:#059669;
          --sky:#0EA5E9; --blue:#2563EB; --electric:#0EA5E9; --gold:#B45309;
          --grey-100:#EEF2F1; --grey-300:#D6DEE0; --grey-500:#5B6B72;
          --band-a:radial-gradient(900px 480px at 82% 0%, rgba(14,165,233,.05), transparent 60%), #FFFFFF;
          --band-b:radial-gradient(900px 480px at 18% 0%, rgba(16,185,129,.06), transparent 60%), #F5FAF8;
          --band-tint:radial-gradient(rgba(15,23,42,.05) 1px, transparent 1px) 0 0 / 22px 22px,
            radial-gradient(1100px 520px at 50% -10%, rgba(16,185,129,.12), transparent 60%),
            linear-gradient(180deg,#F2FAF7,#EDF6FB);
          --text-primary:#0F1E2E; --text-secondary:#4A5A6E; --text-muted:#77869A;
          --glass:rgba(255,255,255,.72); --glass-2:rgba(255,255,255,.9); --glass-brd:rgba(15,23,42,.09);
          --line:rgba(15,23,42,.08);
          font-family:'Geist',system-ui,-apple-system,sans-serif;
          color:var(--text-primary); scroll-behavior:smooth; -webkit-font-smoothing:antialiased;
          background:
            radial-gradient(1100px 640px at 80% -6%, rgba(16,185,129,.10), transparent 60%),
            radial-gradient(980px 620px at 12% 4%, rgba(14,165,233,.09), transparent 62%),
            radial-gradient(1200px 820px at 50% 110%, rgba(37,99,235,.07), transparent 60%),
            linear-gradient(180deg, #FFFFFF 0%, #F5FAF8 48%, #EFF6FB 100%);
        }
        .dbs-root .material-symbols-rounded { font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24; line-height:1; }
        .dbs-wrap { max-width:1160px; margin:0 auto; padding:0 24px; }
        .dbs-section { padding:clamp(64px,8.5vw,116px) 0; position:relative; }
        .dbs-serif { font-family:'Newsreader',Georgia,serif; font-weight:500; letter-spacing:-0.02em; }
        .dbs-eyebrow {
          display:inline-flex; align-items:center; gap:8px; color:var(--emerald-bright);
          text-transform:uppercase; letter-spacing:.18em; font-size:12px; font-weight:700;
        }
        .dbs-eyebrow .material-symbols-rounded { font-size:15px; }
        .dbs-h2 { font-size:clamp(27px,3.5vw,44px); line-height:1.1; margin-top:14px; color:var(--text-primary); }
        .dbs-grad {
          background:linear-gradient(115deg,#059669 0%,#10B981 40%,#2563EB 100%);
          -webkit-background-clip:text; background-clip:text; color:transparent;
        }
        .dbs-lead { color:var(--text-secondary); font-size:clamp(15px,1.3vw,17px); line-height:1.72; }
        .dbs-iconwell {
          width:48px; height:48px; border-radius:13px; flex:0 0 auto;
          background:linear-gradient(150deg,rgba(16,185,129,.16),rgba(14,165,233,.13));
          border:1px solid var(--glass-brd); color:var(--emerald-bright);
          display:flex; align-items:center; justify-content:center;
          box-shadow:inset 0 1px 0 rgba(255,255,255,.6), 0 8px 18px rgba(16,185,129,.12);
        }
        .dbs-iconwell .material-symbols-rounded { font-size:26px; }
        .dbs-btn {
          display:inline-flex; align-items:center; justify-content:center; gap:8px;
          border-radius:12px; padding:14px 22px; font-weight:600; font-size:15px;
          cursor:pointer; text-decoration:none; border:1px solid transparent; min-height:44px;
          transition:transform .15s ease,filter .15s ease,background .15s ease,border-color .15s ease;
        }
        .dbs-btn-primary {
          background:linear-gradient(115deg,#10B981,#2563EB); color:#fff; font-weight:700;
          box-shadow:0 12px 28px rgba(16,185,129,.28), inset 0 1px 0 rgba(255,255,255,.25);
        }
        .dbs-btn-primary:hover { transform:translateY(-1px); filter:brightness(1.05); }
        .dbs-btn-secondary { background:var(--glass-2); color:var(--text-primary); border-color:var(--glass-brd); backdrop-filter:blur(8px); }
        .dbs-btn-secondary:hover { border-color:var(--emerald); color:var(--emerald-bright); }
        .dbs-btn-full { width:100%; }
        .dbs-card {
          background:var(--glass); border:1px solid var(--glass-brd); border-radius:18px;
          padding:24px; backdrop-filter:blur(14px); -webkit-backdrop-filter:blur(14px);
          box-shadow:inset 0 1px 0 rgba(255,255,255,.6), 0 1px 2px rgba(15,23,42,.05), 0 20px 44px rgba(15,23,42,.07);
          transition:border-color .2s ease, transform .2s ease, box-shadow .2s ease, background .2s ease;
        }
        .dbs-card:hover { border-color:rgba(5,150,105,.4); transform:translateY(-2px); box-shadow:inset 0 1px 0 rgba(255,255,255,.6), 0 26px 52px rgba(15,23,42,.11); background:var(--glass-2); }
        .dbs-grid { display:grid; gap:16px; grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr)); }
        .dbs-grid-3 { display:grid; gap:16px; grid-template-columns:repeat(3,minmax(0,1fr)); }
        @media (max-width:900px){ .dbs-grid-3{ grid-template-columns:repeat(2,minmax(0,1fr)); } }
        @media (max-width:580px){ .dbs-grid-3{ grid-template-columns:1fr; } }
        .dbs-patrons-grid {
          display: flex;
          flex-wrap: wrap;
          flex-direction: row;
          justify-content: center;
          gap: clamp(16px, 3vw, 32px);
          margin-top: clamp(24px, 4vw, 32px);
        }
        .dbs-patrons-grid > * {
          flex: 1 1 140px;
          max-width: 200px;
        }
        .dbs-dotgrid {
          background-image:radial-gradient(rgba(15,23,42,.06) 1px,transparent 1px);
          background-size:22px 22px;
        }
        .dbs-root a { color:var(--blue); text-decoration:none; }
        .dbs-root a:hover { color:var(--emerald-bright); }
        .dbs-root a.dbs-btn-primary, .dbs-root a.dbs-btn-primary:hover { color:#fff; }
        .dbs-root a.dbs-btn-secondary, .dbs-root a.dbs-btn-secondary:hover { color:var(--text-primary); }
        .dbs-blob { position:absolute; border-radius:50%; filter:blur(90px); z-index:0; pointer-events:none; }
        @keyframes dbsFloat {
          0% { transform:translate3d(0,0,0) scale(1); }
          50% { transform:translate3d(26px,-20px,0) scale(1.14); }
          100% { transform:translate3d(0,0,0) scale(1); }
        }
        .dbs-ribbons { position:absolute; left:0; right:0; bottom:0; width:100%; height:clamp(280px,42vw,520px); z-index:0; pointer-events:none; }
        .dbs-ribbon-line { fill:none; stroke-linecap:round; filter:drop-shadow(0 0 7px rgba(14,165,233,.35)); }
        .dbs-ribbon-a { animation:dbsDriftA 22s ease-in-out infinite; }
        .dbs-ribbon-b { animation:dbsDriftB 28s ease-in-out infinite; }
        @keyframes dbsDriftA { 0%,100%{ transform:translate3d(0,0,0);} 50%{ transform:translate3d(-24px,-6px,0);} }
        @keyframes dbsDriftB { 0%,100%{ transform:translate3d(0,0,0);} 50%{ transform:translate3d(20px,-10px,0);} }
        .dbs-input {
          width:100%; padding:13px 15px; border-radius:12px; border:1px solid var(--glass-brd);
          background:#fff; font-family:inherit; font-size:15px; color:var(--text-primary);
          outline:none; transition:border-color .15s ease,box-shadow .15s ease,background .15s ease;
        }
        .dbs-input::placeholder { color:var(--text-muted); }
        .dbs-input:focus { border-color:var(--emerald); box-shadow:0 0 0 3px rgba(16,185,129,.16); background:#fff; }
        .dbs-chip {
          border:1px solid var(--glass-brd); background:#fff; color:var(--text-secondary);
          border-radius:999px; padding:9px 16px; font-size:13.5px; font-weight:500; cursor:pointer;
          min-height:40px; transition:all .15s ease; font-family:inherit;
        }
        .dbs-chip:hover { border-color:rgba(5,150,105,.5); color:var(--text-primary); }
        .dbs-chip.active { background:linear-gradient(115deg,#10B981,#2563EB); border-color:transparent; color:#fff; font-weight:700; }
        .dbs-ph {
          border:1.5px dashed var(--glass-brd); border-radius:16px; display:flex;
          align-items:center; justify-content:center; text-align:center; color:var(--text-muted);
          font-size:13px; padding:16px; background:rgba(15,23,42,.02);
        }
        @media (prefers-reduced-motion: reduce){
          .dbs-blob, .dbs-ribbon-a, .dbs-ribbon-b { animation:none !important; }
        }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: structuredData([
            organizationSchema,
            webPageSchema(seo),
            eventSchema({
              name: "Devbhoomi AI Summit 2026",
              description: seo.description,
              path: seo.path,
              image: seo.image,
              startDate: "2026-10-09T09:00:00+05:30",
              endDate: "2026-10-09T18:00:00+05:30",
              locationName: "Hyatt Centric Rajpur Road Dehradun",
              locationAddress:
                "152 / 3-4, Jakhan, Rajpur Road, Dehradun, Uttarakhand 248001, India",
            }),
            localBusinessSchema,
          ]),
        }}
      />

      {/* B. HERO */}
      <header id="top" style={{ position: "relative", overflow: "hidden", minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div
          className="dbs-blob"
          style={{ width: "clamp(280px,40vw,520px)", height: "clamp(280px,40vw,520px)", background: "rgba(16,185,129,.14)", top: "20px", right: "-100px", animation: "dbsFloat 16s ease-in-out infinite" }}
        />
        <div
          className="dbs-blob"
          style={{ width: "clamp(240px,34vw,440px)", height: "clamp(240px,34vw,440px)", background: "rgba(14,165,233,.12)", bottom: "-120px", left: "-80px", animation: "dbsFloat 19s ease-in-out infinite reverse" }}
        />
        <div
          className="dbs-blob"
          style={{ width: "clamp(200px,28vw,360px)", height: "clamp(200px,28vw,360px)", background: "rgba(37,99,235,.10)", top: "-80px", left: "42%", animation: "dbsFloat 21s ease-in-out infinite" }}
        />

        <Ribbons id="hero" style={{ height: "clamp(340px,48vw,600px)", opacity: 0.9 }} />


        <div
          className="dbs-wrap"
          style={{
            position: "relative", zIndex: 1,
            paddingTop: "clamp(64px,10vw,120px)", paddingBottom: "clamp(56px,8vw,104px)",
            display: "grid", gap: "clamp(32px,5vw,56px)",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,320px),1fr))", alignItems: "center",
          }}
        >
          <div>
            <h1 className="dbs-serif" style={{ fontSize: "clamp(38px,6vw,72px)", lineHeight: 1.0, margin: "0", color: "var(--text-primary)", fontWeight: 700 }}>
              Devbhoomi AI Summit 2026
            </h1>

            <p className="dbs-serif" style={{ fontSize: "clamp(18px,2.6vw,30px)", lineHeight: 1.25, margin: "14px 0 0", color: "var(--text-secondary)" }}>
              Building an AI-Native <span className="dbs-grad">Uttarakhand</span>
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", margin: "26px 0 0" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "var(--text-secondary)", fontSize: "14.5px", fontWeight: 500 }}>
                <span className="material-symbols-rounded" style={{ fontSize: "20px", color: "var(--green)" }}>calendar_month</span>
                October 9, 2026
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "var(--text-secondary)", fontSize: "14.5px", fontWeight: 500 }}>
                <span className="material-symbols-rounded" style={{ fontSize: "20px", color: "var(--blue)" }}>location_on</span>
                Hyatt Centric, Dehradun, Uttarakhand
              </span>
            </div>

          </div>
        </div>
      </header>

      {/* C. OVERVIEW */}
      <section id="overview" className="dbs-section" style={{ background: "var(--band-a)" }}>
        <div
          className="dbs-wrap"
          style={{ display: "grid", gap: "clamp(28px,5vw,64px)", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))" }}
        >
          <div>
            <h2 className="dbs-serif dbs-h2">About the Summit</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "18px" }}>
            <p className="dbs-lead">
              Devbhoomi AI Summit 2026 is Uttarakhand's flagship event on Artificial
              Intelligence, bringing together policymakers, industry leaders, technology
              experts, startups, academia, and media.
            </p>
            <p className="dbs-lead">
              With a sharp focus on governance, mobility, tourism, public safety, and
              sustainable development, the summit is designed to move beyond conversations
              and deliver actionable AI roadmaps for the state's most pressing priorities.
            </p>
          </div>
        </div>
      </section>

      {/* E. SPEAKERS */}
      <section id="speakers" className="dbs-section" style={{ background: "var(--band-b)" }}>
        <div className="dbs-wrap">
          <div style={{ maxWidth: "760px" }}>
            <h2 className="dbs-serif dbs-h2">Summit Speakers</h2>
          </div>

          <div className="dbs-patrons-grid" style={{ marginTop: "clamp(32px,5vw,48px)" }}>
            {patrons.map((p) => (
              <div key={p.name} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "16px" }}>
                <img
                  src={p.image}
                  alt={p.name}
                  style={{
                    width: "clamp(100px, 12vw, 150px)",
                    height: "clamp(100px, 12vw, 150px)",
                    borderRadius: "50%",
                    objectFit: "cover",
                    objectPosition: "center top",
                    border: "3px solid #fff",
                    boxShadow: "0 0 0 1px var(--glass-brd), 0 18px 40px rgba(15,23,42,.14)",
                  }}
                />
                <div>
                  <p style={{ fontWeight: 700, fontSize: "clamp(15px,1.4vw,17px)" }}>{p.name}</p>
                  <p style={{ color: "var(--text-muted)", fontSize: "13px", lineHeight: 1.45, marginTop: "5px" }}>{p.role}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="dbs-grid" style={{ marginTop: "clamp(32px,5vw,48px)" }}>
            {speakers.map((sp) => (
              <div key={sp.name} className="dbs-card" style={{ textAlign: "center" }}>
                {sp.image ? (
                  <img
                    src={sp.image}
                    alt={sp.name}
                    style={{ width: "104px", height: "104px", borderRadius: "50%", objectFit: "cover", objectPosition: "center top", margin: "0 auto 16px", border: "1px solid var(--glass-brd)" }}
                  />
                ) : (
                  <div className="dbs-ph" style={{ width: "104px", height: "104px", borderRadius: "50%", margin: "0 auto 16px", fontSize: "12px" }}>
                    Photo
                  </div>
                )}
                <p style={{ fontWeight: 700, fontSize: "16px" }}>{sp.name}</p>
                <p style={{ color: "var(--text-muted)", fontSize: "13.5px", lineHeight: 1.45, marginTop: "6px" }}>{sp.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* F. DISCUSSION TOPICS */}
      <section id="themes" className="dbs-section" style={{ background: "var(--band-a)" }}>
        <div className="dbs-wrap">
          <div style={{ maxWidth: "760px" }}>
            <h2 className="dbs-serif dbs-h2">Discussion Topics</h2>
          </div>

          <div className="dbs-grid-3" style={{ marginTop: "clamp(32px,5vw,48px)" }}>
            {themes.map((t, i) => (
              <div key={t.title} className="dbs-card">
                <span style={{ fontWeight: 700, fontSize: "13px", letterSpacing: ".08em", color: "var(--grey-500)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="dbs-iconwell" style={{ margin: "16px 0 16px" }}>
                  <span className="material-symbols-rounded">{t.icon}</span>
                </span>
                <p className="dbs-serif" style={{ fontSize: "18px", lineHeight: 1.35 }}>{t.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* G. WHO SHOULD ATTEND */}
      <section id="attend" className="dbs-section" style={{ background: "var(--band-b)" }}>
        <div className="dbs-wrap">
          <div style={{ maxWidth: "760px" }}>
            <h2 className="dbs-serif dbs-h2">Who Should Attend</h2>
          </div>

          <div className="dbs-grid" style={{ marginTop: "clamp(32px,5vw,48px)" }}>
            {attendees.map((a) => (
              <div key={a.label} className="dbs-card" style={{ display: "flex", alignItems: "center", gap: "16px", padding: "18px 20px" }}>
                <span className="dbs-iconwell">
                  <span className="material-symbols-rounded">{a.icon}</span>
                </span>
                <span style={{ fontWeight: 600, fontSize: "15px" }}>{a.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* I. WHY THIS MATTERS */}
      <section className="dbs-section" style={{ background: "var(--band-a)" }}>
        <div className="dbs-wrap" style={{ maxWidth: "860px" }}>
          <h2 className="dbs-serif dbs-h2">Why this matters</h2>
          <p className="dbs-lead" style={{ marginTop: "22px" }}>
            Uttarakhand is at a crucial inflection point where seasonal pilgrim movement, fragile terrain, urban expansion, and infrastructure pressure demand AI-native solutions rather than conventional fixes. The summit matters because it creates a platform to convert AI from a buzzword into a practical governance tool for safety, mobility, encroachment monitoring, and citizen services.
          </p>
        </div>
      </section>

      {/* H. SPONSOR CONTACT */}
      <section id="sponsor" className="dbs-section" style={{ background: "var(--band-tint)", position: "relative", overflow: "hidden" }}>
        <div className="dbs-blob" style={{ width: "420px", height: "420px", background: "rgba(16,185,129,.12)", top: "-120px", right: "-80px", animation: "dbsFloat 18s ease-in-out infinite" }} />
        <Ribbons id="sponsor" style={{ opacity: 0.8 }} />
        <div
          className="dbs-wrap"
          style={{ position: "relative", zIndex: 1, display: "grid", gap: "clamp(28px,5vw,56px)", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,320px),1fr))", alignItems: "start" }}
        >
          <div>
            <h2 className="dbs-serif dbs-h2">Sponsorship</h2>
            <p className="dbs-lead" style={{ marginTop: "18px" }}>
              Get in touch and the summit team will share the sponsorship details.
            </p>
            <div className="dbs-card" style={{ marginTop: "26px", display: "flex", gap: "14px", alignItems: "center" }}>
              <span className="dbs-iconwell">
                <span className="material-symbols-rounded">event</span>
              </span>
              <div>
                <p style={{ fontWeight: 700, fontSize: "15px" }}>October 9, 2026</p>
                <p style={{ color: "var(--text-muted)", fontSize: "13.5px", marginTop: "2px" }}>Hyatt Centric, Dehradun</p>
              </div>
            </div>
            <div className="dbs-card" style={{ marginTop: "14px", display: "flex", gap: "14px", alignItems: "flex-start" }}>
              <span className="dbs-iconwell">
                <span className="material-symbols-rounded">location_on</span>
              </span>
              <div>
                <p style={{ fontWeight: 700, fontSize: "15px" }}>Hyatt Centric Dehradun</p>
                <p style={{ color: "var(--text-muted)", fontSize: "13.5px", marginTop: "2px" }}>
                  3-4, 152, Rajpur Rd, Jakhan, Dehradun, Uttarakhand 248001
                </p>
                <a
                  href="https://maps.app.goo.gl/i33gWViTrEYK4bXHA"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "var(--green-deep)", fontSize: "13.5px", fontWeight: 600, marginTop: "8px", textDecoration: "none" }}
                >
                  <span className="material-symbols-rounded" style={{ fontSize: "17px" }}>map</span>
                  View on Google Maps
                </a>
              </div>
            </div>
          </div>

          <div className="dbs-card" style={{ padding: "clamp(22px,3vw,32px)" }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "24px 8px" }}>
                <span
                  style={{
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    width: "64px", height: "64px", borderRadius: "50%",
                    background: "rgba(16,185,129,.14)", color: "var(--green-deep)", margin: "0 auto 18px",
                  }}
                >
                  <span className="material-symbols-rounded" style={{ fontSize: "34px" }}>check_circle</span>
                </span>
                <h3 className="dbs-serif" style={{ fontSize: "24px" }}>Thank you</h3>
                <p className="dbs-lead" style={{ marginTop: "10px" }}>
                  Your partnership interest has been noted. The Devbhoomi AI Summit team will
                  reach out shortly.
                </p>
                <button
                  type="button"
                  onClick={resetForm}
                  style={{ marginTop: "18px", background: "none", border: "none", color: "var(--green-deep)", fontWeight: 600, fontSize: "14.5px", cursor: "pointer", fontFamily: "inherit" }}
                >
                  Submit another response
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                  <label style={{ fontSize: "13px", fontWeight: 600 }}>Full name</label>
                  <input className="dbs-input" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name" />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                  <label style={{ fontSize: "13px", fontWeight: 600 }}>Organisation</label>
                  <input className="dbs-input" value={form.org} onChange={(e) => setForm({ ...form, org: e.target.value })} placeholder="Your organisation" />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                  <label style={{ fontSize: "13px", fontWeight: 600 }}>Work email</label>
                  <input className="dbs-input" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@organisation.com" />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                  <label style={{ fontSize: "13px", fontWeight: 600 }}>Phone number</label>
                  <input className="dbs-input" type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 00000 00000" />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <label style={{ fontSize: "13px", fontWeight: 600 }}>Your role</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {roleChips.map((c) => (
                      <button key={c} type="button" onClick={() => setRole(role === c ? null : c)} className={role === c ? "dbs-chip active" : "dbs-chip"}>
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="dbs-btn dbs-btn-primary dbs-btn-full"
                  style={{ marginTop: "4px", opacity: sending ? 0.7 : 1, cursor: sending ? "not-allowed" : "pointer" }}
                >
                  <span className="material-symbols-rounded" style={{ fontSize: "18px" }}>send</span>
                  {sending ? "Submitting..." : "Submit partnership request"}
                </button>
                {error && (
                  <p style={{ fontSize: "12.5px", color: "#DC2626", textAlign: "center" }}>{error}</p>
                )}
                <p style={{ fontSize: "12px", color: "var(--text-muted)", textAlign: "center" }}>
                  By submitting you agree to be contacted by the summit team regarding sponsorship.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* K. FOOTER */}
      <footer className="dbs-dotgrid" style={{ background: "var(--band-tint)", borderTop: "1px solid var(--line)", position: "relative", overflow: "hidden" }}>
        <Ribbons id="footer" style={{ opacity: 0.7 }} />
        <div
          className="dbs-wrap dbs-section"
          style={{ position: "relative", zIndex: 1, display: "grid", gap: "clamp(32px,5vw,56px)", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))" }}
        >
          <div>
            <p className="dbs-serif" style={{ fontSize: "24px", color: "var(--text-primary)" }}>Devbhoomi AI Summit 2026</p>
            <p style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: 1.65, marginTop: "14px", maxWidth: "420px" }}>
              Building an AI-native Uttarakhand — transforming AI from a discussion topic into
              a practical governance tool for the Himalayan state.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "22px" }}>
              <a href="https://it.uk.gov.in/" target="_blank" rel="noreferrer" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px", minWidth: "180px", padding: "10px 16px", background: "#F4F8FC", border: "1px solid var(--glass-brd)", borderRadius: "12px", textDecoration: "none" }}>
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "56px" }}>
                  <img src="/images/itda.jpg" alt="ITDA, Government of Uttarakhand" style={{ maxHeight: "100%", maxWidth: "160px", objectFit: "contain" }} />
                </span>
                <span style={{ color: "var(--text-primary)", fontSize: "13px", fontWeight: 700, textAlign: "center" }}>ITDA</span>
              </a>
              <a href="https://uk.gov.in/" target="_blank" rel="noreferrer" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px", minWidth: "180px", padding: "10px 16px", background: "#F4F8FC", border: "1px solid var(--glass-brd)", borderRadius: "12px", textDecoration: "none" }}>
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "56px" }}>
                  <img src="/images/uttarakhand_government.svg" alt="Government of Uttarakhand" style={{ maxHeight: "100%", maxWidth: "160px", objectFit: "contain" }} />
                </span>
                <span style={{ color: "var(--text-primary)", fontSize: "13px", fontWeight: 700, textAlign: "center" }}>Uttarakhand Government</span>
              </a>
            </div>
          </div>

          <div className="dbs-grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,220px),1fr))" }}>
            <div className="dbs-card" style={{ padding: "20px" }}>
              <span className="dbs-eyebrow" style={{ color: "var(--blue)" }}>Speaking opportunity</span>
              <p style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "16px", marginTop: "12px" }}>Neeraj Pandey</p>
              <p style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--text-secondary)", fontSize: "13.5px", marginTop: "10px" }}>
                <span className="material-symbols-rounded" style={{ fontSize: "17px", color: "var(--green)" }}>mail</span>
                sponsorship@axocom.in
              </p>
              <p style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--text-secondary)", fontSize: "13.5px", marginTop: "6px" }}>
                <span className="material-symbols-rounded" style={{ fontSize: "17px", color: "var(--green)" }}>call</span>
                +91 89792 01974
              </p>
            </div>
            <div className="dbs-card" style={{ padding: "20px" }}>
              <span className="dbs-eyebrow" style={{ color: "var(--blue)" }}>Partnership opportunity</span>
              <p style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "16px", marginTop: "12px" }}>Shruti Kotiyal</p>
              <p style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--text-secondary)", fontSize: "13.5px", marginTop: "10px" }}>
                <span className="material-symbols-rounded" style={{ fontSize: "17px", color: "var(--green)" }}>mail</span>
                sponsorship@axocom.in
              </p>
              <p style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--text-secondary)", fontSize: "13.5px", marginTop: "6px" }}>
                <span className="material-symbols-rounded" style={{ fontSize: "17px", color: "var(--green)" }}>call</span>
                +91 63999 06916
              </p>
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid var(--line)", position: "relative", zIndex: 1 }}>
          <div
            className="dbs-wrap"
            style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "space-between", padding: "22px 24px", color: "var(--text-muted)", fontSize: "13px" }}
          >
            <span>October 9, 2026 · Hyatt Centric, Dehradun, Uttarakhand</span>
            <span>An initiative of ITDA, Government of Uttarakhand</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DevbhoomiAISummit;
