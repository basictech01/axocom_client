import React, { useState } from "react";
import {
  Building,
  Building2,
  Bus,
  CalendarDays,
  CarFront,
  Check,
  Church,
  Cpu,
  Database,
  Facebook,
  Gauge,
  GraduationCap,
  Handshake,
  Headphones,
  Instagram,
  Landmark,
  Linkedin,
  MapPin,
  Megaphone,
  Mic,
  Mountain,
  Rocket,
  Satellite,
  ShieldCheck,
  Siren,
  Trees,
  Youtube,
  type LucideIcon,
} from "lucide-react";
import {
  buildSeoLinks,
  buildSeoMeta,
  eventSchema,
  organizationSchema,
  structuredData,
  webPageSchema,
} from "~/lib/seo";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "~/components/ui/select";

const seo = {
  title: "Devbhoomi AI Summit 2026",
  description:
    "Devbhoomi AI Summit 2026 - Uttarakhand's flagship leadership forum on Artificial Intelligence, on 9 October 2026 at Hyatt Centric, Dehradun. An initiative of ITDA, Government of Uttarakhand.",
  path: "/DevbhoomiAISummit",
  image: "/images/devbhoomi-ai/summit-logo.png",
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
    href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,500,0,0&display=swap",
  },
];

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Hyatt Centric Rajpur Road Dehradun",
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
  { icon: Church, title: "Pilgrim Safety", copy: "AI for Char Dham Yatra and crowd management." },
  { icon: CarFront, title: "Smart Mobility", copy: "Data-led traffic and transport management." },
  { icon: Satellite, title: "Urban Intelligence", copy: "Encroachment and construction monitoring." },
  { icon: Headphones, title: "Citizen Services", copy: "Faster, AI-enabled grievance redressal." },
  { icon: Landmark, title: "Smart Governance", copy: "AI for resilient public infrastructure." },
  { icon: Mountain, title: "Climate Tech", copy: "Sustainable Himalayan development models." },
];

const attendees = [
  { icon: Building2, label: "Government departments and policymakers" },
  { icon: Cpu, label: "CIOs, CTOs, CDOs and technology leaders" },
  { icon: Bus, label: "Tourism, transport and infrastructure leaders" },
  { icon: Rocket, label: "AI startups and solution providers" },
  { icon: GraduationCap, label: "Academia and research institutions" },
  { icon: Megaphone, label: "Media and civil society representatives" },
];

const agenda = [
  { icon: Landmark, label: "AI for Governance" },
  { icon: Building, label: "AI for Public Administration" },
  { icon: Siren, label: "AI for Disaster Management" },
  { icon: Trees, label: "AI for Environment & Forests" },
  { icon: Building2, label: "AI for Smart Cities" },
  { icon: ShieldCheck, label: "AI for Public Safety" },
  { icon: Headphones, label: "AI for Citizen Services" },
  { icon: Database, label: "AI for Data Governance" },
  { icon: Gauge, label: "AI for Administrative Efficiency" },
];

interface SummitSpeaker {
  name: string;
  role: string;
  image: string;
  linkedin?: string;
  officialProfile?: string;
}

const patrons: SummitSpeaker[] = [
  {
    name: "Lt Gen (Retd) Gurmit Singh",
    role: "Hon'ble Governor, Uttarakhand",
    image: "/images/governor_Gen_Gurmit_Singh.jpeg",
    linkedin: "https://www.linkedin.com/in/ltgengurmit/",
  },
  {
    name: "Shri Pushkar Singh Dhami",
    role: "Hon'ble Chief Minister, Uttarakhand",
    image: "/images/cm_pushkar_singh_dhami.jpg",
    linkedin: "https://www.linkedin.com/in/pushkar-singh-dhami-986b66260/",
  },
  {
    name: "Shri Pradeep Batra",
    role: "IT Minister & Good Governance, Uttarakhand",
    image: "/images/summitDeligate/shri_pradeep_batra_it_minister_govt_uttarakhand.jpg",
  },
];

const speakers: SummitSpeaker[] = [
  {
    name: "Dr. Pankaj Kumar Pandey",
    role: "IT Secretary, Government of Uttarakhand",
    image: "/images/pankaj_kumar_pandey.jpeg",
    officialProfile: "https://sad.uk.gov.in/dr-pankaj-kumar-pandey/",
  },
  {
    name: "Shri Alok Pandey",
    role: "Director, ITDA",
    image: "/images/Alok-Kumar-Pandey.jpeg",
    officialProfile: "https://sad.uk.gov.in/alok-kumar-pandey/",
  },
  {
    name: "Tirth Pal Singh",
    role: "Additional Director - ITDA",
    image: "/images/tirth_pal_singh.jpeg",
  },
  {
    name: "Shri Ravi Shankar Singh",
    role: "CTO and GM AI and Emerging Tech ITDA, Head SeMT",
    image: "/images/rai-shankar-singh2.jpeg",
    linkedin: "https://www.linkedin.com/in/singh-ravishankar/"
  },
  {
    name: "Shri Ashish Upadhyaya",
    role: "DGM Cyber Security",
    image: "/images/ashish_upadhyay.jpg.jpeg",
    linkedin: "https://www.linkedin.com/in/ashishiitk22/",
  },
  {
    name: "Manoj Kumar",
    role: "Co-founder, MatterCodeAI | IIT Kanpur",
    image: "/images/manoj_kumar.jpeg",
    linkedin: "https://www.linkedin.com/in/manojku/",
  },
  {
    name: "Umesh Joshi",
    role: "Co-founder, Calibr.AI | CPTO, MindSpark | Co-founder, Hush | IIT Kanpur",
    image: "/images/umesh_joshi.jpeg",
    linkedin: "https://www.linkedin.com/in/umeshjoshi/",
  },
];

const roleChips = [
  "Government / Policy",
  "Enterprise / IT",
  "Tourism / Transport",
  "AI Startup",
  "Academia / Research",
  "Media / Civil society",
];

const partnershipCategories = [
  { category: "River Conversation Partner (Booked)", investment: "₹5,00,000", deliverables: "River Conversation Partner recognition, session association, prominent branding & stakeholder networking.", booked: true },
  { category: "Associate Partner", investment: "₹1,50,000", deliverables: "Partner recognition, website/collateral branding, digital visibility, delegate passes & networking." },
  { category: "Media Partner", investment: "₹2,00,000", deliverables: "Media Partner recognition, prominent branding, digital visibility, stakeholder access & event recognition." },
  { category: "Mobility Partner", investment: "₹2,50,000", deliverables: "Mobility showcase, relevant panel opportunity, branding, exhibition & networking." },
  { category: "Infrastructure Partner", investment: "₹3,00,000", deliverables: "Infrastructure showcase, relevant panel opportunity, branding, exhibition & stakeholder networking." },
  { category: "Industrial Partner", investment: "₹3,00,000", deliverables: "Industry-use-case showcase, panel opportunity, branding, exhibition & industry networking." },
  { category: "FinTech Partner", investment: "₹5,00,000", deliverables: "Academic recognition, student/faculty engagement, panel/mentor opportunity, branding & networking." },
  { category: "Cloud Partner", investment: "₹5,00,000", deliverables: "Cloud showcase, panel opportunity, prominent branding, exhibition & stakeholder networking." },
  { category: "Innovation Partner", investment: "₹5,00,000", deliverables: "Innovation showcase, panel opportunity, branding, exhibition & startup networking." },
  { category: "Technology Partner", investment: "₹5,00,000", deliverables: "Technology showcase, panel/demo opportunity, prominent branding, exhibition & networking." },
  { category: "Knowledge Partner", investment: "₹5,00,000", deliverables: "Panel opportunity, prominent branding, knowledge-session association, exhibition & networking." },
  { category: "AI Partner", investment: "₹7,50,000", deliverables: "AI Partner recognition, panel opportunity, logo visibility, AI showcase & exhibition space." },
  { category: "Co-Powered By", investment: "₹10,00,000", deliverables: "Premium branding, senior leadership panel seat, exhibition space, media coverage & stakeholder networking." },
  { category: "Powered By", investment: "₹12,00,000", deliverables: "Prominent branding, keynote/panel opportunity, exhibition space, media visibility & stakeholder networking." },
  { category: "Presented By", investment: "₹15,00,000", deliverables: "Naming rights, keynote, premium panel seat, premium branding, exhibition space, media features & VIP networking." },
];

const socialLinks = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/devbhoomi-ai-summit/",
  },
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://www.instagram.com/devbhoomi_ai_summit/",
  },
  {
    icon: Facebook,
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61591908117967",
  },
  {
    icon: Youtube,
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCo2Gq0ZKw3m0_cDf_conEsQ",
  },
];

const BrandIcon = ({ icon: Icon }: { icon: LucideIcon }) => (
  <span className="summit-icon" aria-hidden="true">
    <Icon strokeWidth={1.8} />
  </span>
);

const SpeakerProfileLinks = ({ speaker }: { speaker: SummitSpeaker }) => {
  if (!(speaker.linkedin || speaker.officialProfile)) return null;

  return (
    <div className="summit-speaker-profile-links">
      {speaker.linkedin && (
        <a
          className="summit-speaker-link"
          href={speaker.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${speaker.name} on LinkedIn`}
          title={`${speaker.name} on LinkedIn`}
        >
          <img src="/images/linkedin.png" alt="" aria-hidden="true" />
        </a>
      )}
      {speaker.officialProfile && (
        <a
          className="summit-speaker-link summit-official-profile-link"
          href={speaker.officialProfile}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${speaker.name} official government profile`}
          title={`${speaker.name} official government profile`}
        >
          <img src="/images/Emblem_of_India.svg" alt="" aria-hidden="true" />
        </a>
      )}
    </div>
  );
};

const DevbhoomiAISummit: React.FC = () => {
  const [form, setForm] = useState({ name: "", org: "", email: "", phone: "" });
  const [role, setRole] = useState<string | null>(null);
  const [partnershipCategory, setPartnershipCategory] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const selectedPartnership = partnershipCategories.find(({ category }) => category === partnershipCategory);

  const handleSubmit = async (event: React.FormEvent) => {
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
    setForm({ name: "", org: "", email: "", phone: "" });
    setRole(null);
    setPartnershipCategory("");
    setSubmitted(false);
    setError(null);
  };

  return (
    <div className="summit-page">
      <style>{`
        html { scroll-behavior:smooth; scroll-padding-top:96px; }
        .summit-page {
          --green:#B7D933;
          --green-2:#67C85A;
          --teal:#17B6B8;
          --cyan:#00B8D4;
          --blue:#2D7DBB;
          --deep-blue:#2C4F96;
          --ink:#111111;
          --muted:#6F6F73;
          --line:#D9D9D9;
          --gradient:linear-gradient(135deg,#B7D933 0%,#67C85A 25%,#17B6B8 52%,#2D7DBB 78%,#2C4F96 100%);
          min-height:100vh;
          overflow:hidden;
          color:var(--ink);
          background:#fff;
          font-family:"Montserrat",sans-serif;
          font-size:16px;
          scroll-behavior:smooth;
        }
        .summit-page * { box-sizing:border-box; }
        .summit-page [id] { scroll-margin-top:96px; }
        .summit-page a { color:inherit; text-decoration:none; }
        .summit-page button, .summit-page input { font:inherit; }
        .summit-shell { width:min(1180px,calc(100% - 48px)); margin:0 auto; }
        .summit-section { padding:96px 0; position:relative; }
        .summit-kicker { color:#128F9D; font-size:12px; font-weight:800; letter-spacing:.14em; text-transform:uppercase; }
        .summit-title { margin:12px 0 0; font-size:clamp(32px,4vw,48px); line-height:1.12; font-weight:800; letter-spacing:-.035em; }
        .summit-title span, .summit-gradient-text {
          background:var(--gradient); color:transparent; background-clip:text; -webkit-background-clip:text;
        }
        .summit-copy { color:var(--muted); font-size:16px; line-height:1.75; }
        .summit-btn {
          min-height:48px; padding:0 24px; border-radius:8px; border:1px solid transparent;
          display:inline-flex; align-items:center; justify-content:center; gap:10px;
          font-weight:700; font-size:14px; cursor:pointer; transition:.2s ease;
        }
        .summit-btn:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(44,79,150,.18); }
        .summit-btn-primary {
          color:#fff!important; background:var(--gradient); border:0; outline:0;
          box-shadow:none;
        }
        .summit-btn-primary:focus, .summit-btn-primary:focus-visible { outline:0; box-shadow:none; }
        .summit-btn-outline { border-color:var(--teal); color:#127F88!important; background:#fff; }
        .summit-card {
          background:rgba(255,255,255,.94); border:1px solid rgba(217,217,217,.7); border-radius:16px;
          box-shadow:0 8px 24px rgba(0,0,0,.08);
        }
        .summit-nav {
          position:sticky; top:0; z-index:50; background:rgba(255,255,255,.92);
          border-bottom:1px solid rgba(217,217,217,.65); backdrop-filter:blur(18px);
        }
        .summit-nav-inner { height:86px; display:flex; align-items:center; justify-content:space-between; gap:24px; }
        .summit-nav-brand { width:fit-content; display:flex; align-items:center; gap:6px; flex-shrink:0; }
        .summit-nav-logo { width:auto; height:70px; object-fit:contain; }
        .summit-nav-itda { width:39px; flex:0 0 auto; display:flex; flex-direction:column; align-items:center; line-height:1; }
        .summit-nav-itda-logo { width:39px; height:39px; object-fit:contain; }
        .summit-nav-itda-label { margin-top:2px; color:#2118B8; font-size:8px; font-weight:700; letter-spacing:.08em; }
        .summit-nav-links { display:flex; align-items:center; gap:28px; color:#333; font-size:13px; font-weight:600; }
        .summit-nav-links a { position:relative; }
        .summit-nav-links a:not(.summit-btn)::after {
          content:""; position:absolute; left:0; right:100%; bottom:-8px; height:2px; background:var(--gradient); transition:.2s ease;
        }
        .summit-nav-links a:hover::after { right:0; }
        .summit-hero {
          min-height:clamp(560px,36.35vw,727px); position:relative; display:flex; align-items:center;
          background:
            linear-gradient(90deg,rgba(255,255,255,.98) 0%,rgba(255,255,255,.91) 34%,rgba(255,255,255,.34) 62%,rgba(255,255,255,.06) 100%),
            url("/images/devbhoomi-ai/background_image.png");
          background-color:#fff;
          background-position:center,center top;
          background-repeat:no-repeat;
          background-size:cover,contain;
        }
        .summit-hero::after {
          content:""; position:absolute; inset:0;
          background:linear-gradient(180deg,rgba(255,255,255,.08),rgba(255,255,255,0) 68%,rgba(255,255,255,.3));
          pointer-events:none;
        }
        .summit-hero-grid {
          position:relative; z-index:2; display:grid; grid-template-columns:minmax(0,650px); align-items:center;
          padding:72px 0 110px;
        }
        .summit-hero h1 { margin:0; font-size:clamp(48px,6.4vw,76px); line-height:.98; font-weight:800; letter-spacing:-.055em; }
        .summit-hero h1 .line { display:block; }
        .summit-hero h1 .summit-name { color:#168D9D; }
        .summit-hero h1 .year { color:#87B82D; }
        .summit-hero-subtitle { margin:18px 0 0; font-size:clamp(20px,2vw,28px); line-height:1.25; font-weight:500; }
        .summit-hero-copy { max-width:650px; margin:20px 0 0; color:var(--muted); line-height:1.7; font-size:16px; }
        .summit-audience {
          width:max-content; max-width:100%; margin:14px 0 0; font-weight:700; font-size:14px; line-height:1.6;
          background:var(--gradient); color:transparent; background-clip:text; -webkit-background-clip:text;
        }
        .summit-actions { margin-top:30px; display:flex; flex-wrap:wrap; gap:14px; }
        .summit-event-meta { margin-top:26px; display:flex; flex-wrap:wrap; gap:18px; color:#444; font-size:13px; font-weight:600; }
        .summit-event-meta span { display:flex; align-items:center; gap:8px; }
        .summit-event-meta .material-symbols-rounded { color:var(--teal); font-size:19px; }
        .summit-about-grid { display:grid; grid-template-columns:.8fr 1.2fr; gap:72px; align-items:start; }
        .summit-checks { display:grid; grid-template-columns:repeat(2,1fr); gap:10px 24px; margin:26px 0 0; }
        .summit-check { display:flex; align-items:center; gap:9px; font-size:13px; font-weight:600; color:#333; }
        .summit-check .material-symbols-rounded { color:#8CB927; font-size:18px; }
        .summit-focus-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
        .summit-focus-card { min-height:180px; padding:24px; transition:.2s ease; }
        .summit-focus-card:hover { transform:translateY(-5px); box-shadow:0 16px 40px rgba(0,0,0,.12); }
        .summit-icon {
          width:54px; height:54px; display:grid; place-items:center; border-radius:16px;
          color:#178EA6; background:linear-gradient(135deg,rgba(23,182,184,.15),rgba(45,125,187,.1));
          border:1px solid rgba(23,182,184,.2); box-shadow:0 8px 18px rgba(23,182,184,.1);
        }
        .summit-icon svg { width:34px; height:34px; }
        .summit-focus-card h3 { margin:18px 0 0; font-size:15px; font-weight:700; }
        .summit-focus-card p { margin:8px 0 0; color:var(--muted); font-size:12px; line-height:1.55; }
        .summit-pattern-section { background:#fbfdfd; overflow:hidden; }
        .summit-pattern-section::before {
          content:""; position:absolute; inset:0; background:url("/images/devbhoomi-ai/summit-landscape.png") center/cover no-repeat;
          opacity:.055; pointer-events:none;
        }
        .summit-patron-grid {
          position:relative; display:grid; grid-template-columns:repeat(3,minmax(0,280px));
          justify-content:center; gap:24px; margin-top:40px;
        }
        .summit-speaker-grid { position:relative; display:grid; grid-template-columns:repeat(5,1fr); gap:16px; margin-top:28px; }
        .summit-speaker { overflow:hidden; display:flex; flex-direction:column; }
        .summit-speaker-photo { position:relative; }
        .summit-speaker-photo > img { width:100%; aspect-ratio:.92; display:block; object-fit:cover; object-position:center top; background:#eef7f7; }
        .summit-speaker-info { padding:16px; flex:1; display:flex; flex-direction:column; align-items:flex-start; }
        .summit-speaker h3 { margin:0; font-size:13px; line-height:1.35; }
        .summit-speaker p { margin:7px 0 0; color:var(--muted); font-size:11px; line-height:1.45; }
        .summit-patron .summit-speaker-photo > img { aspect-ratio:1.08; }
        .summit-patron .summit-speaker-info { padding:20px; }
        .summit-patron h3 { font-size:16px; }
        .summit-patron p { font-size:12px; }
        .summit-speaker-profile-links {
          position:absolute; right:9px; bottom:9px; display:flex; align-items:center; gap:6px;
        }
        .summit-speaker-link {
          width:22px; height:22px; padding:0; display:inline-flex; align-items:center; justify-content:center;
          background:transparent; box-shadow:none; transition:transform .2s ease;
        }
        .summit-speaker-link:hover { transform:translateY(-2px); }
        .summit-official-profile-link {
          width:25px; height:25px; padding:3px; border-radius:6px;
          background:rgba(255,255,255,.92); box-shadow:0 3px 10px rgba(17,17,17,.18);
        }
        .summit-speaker-link img {
          width:100%; height:100%; display:block; object-fit:contain; border-radius:7px;
          filter:grayscale(1); opacity:.62; transition:opacity .2s ease;
        }
        .summit-speaker-link:hover img { opacity:.88; }
        .summit-attendee-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
        .summit-attendee { display:flex; align-items:center; gap:18px; padding:22px; min-height:108px; }
        .summit-attendee .summit-icon { width:64px; height:64px; border-radius:16px; flex:0 0 auto; }
        .summit-attendee .summit-icon svg { width:42px; height:42px; }
        .summit-attendee span:last-child { font-size:13px; line-height:1.5; font-weight:600; }
        .summit-why {
          background:linear-gradient(135deg,rgba(183,217,51,.09),rgba(23,182,184,.08),rgba(44,79,150,.08));
        }
        .summit-why-grid { display:grid; grid-template-columns:.72fr 1.28fr; gap:72px; align-items:center; }
        .summit-why-copy {
          padding:32px; border-left:4px solid var(--teal); border-radius:0 16px 16px 0;
          background:rgba(255,255,255,.8); box-shadow:0 8px 24px rgba(0,0,0,.06);
        }
        .summit-sponsor { background:linear-gradient(135deg,#f7fce8 0%,#effbfa 52%,#eef6fc 100%); }
        .summit-sponsor-grid { display:grid; grid-template-columns:.8fr 1.2fr; gap:64px; align-items:start; }
        .summit-contact-card { margin-top:28px; padding:22px; display:flex; gap:15px; align-items:flex-start; }
        .summit-contact-card + .summit-contact-card { margin-top:12px; }
        .summit-contact-card h3 { margin:0; font-size:14px; }
        .summit-contact-card p { margin:6px 0 0; color:var(--muted); font-size:12px; line-height:1.55; }
        .summit-form { padding:34px; }
        .summit-form-grid { display:grid; grid-template-columns:1fr 1fr; gap:18px; }
        .summit-field { display:flex; flex-direction:column; gap:8px; }
        .summit-field label { font-size:12px; font-weight:700; }
        .summit-field input {
          width:100%; min-height:48px; padding:0 15px; border:1px solid #d9d9d9; border-radius:8px; color:var(--ink); background:#fff; outline:0;
        }
        .summit-field input:focus { border-color:var(--teal); box-shadow:0 0 0 3px rgba(23,182,184,.12); }
        .summit-partnership { grid-column:1/-1; }
        .summit-partnership-trigger {
          width:100%; height:auto; min-height:58px; padding:10px 14px; border-color:#d9d9d9; border-radius:8px;
          color:var(--ink); background:#fff; box-shadow:none; white-space:normal;
        }
        .summit-partnership-trigger:focus-visible { border-color:var(--teal); box-shadow:0 0 0 3px rgba(23,182,184,.12); }
        .summit-partnership-trigger-copy { min-width:0; flex:1; display:flex; align-items:center; justify-content:space-between; gap:16px; text-align:left; }
        .summit-partnership-placeholder { color:var(--muted); font-size:13px; font-weight:500; }
        .summit-partnership-name { font-size:13px; font-weight:700; }
        .summit-partnership-price { flex:0 0 auto; color:#128F9D; font-size:13px; font-weight:800; }
        .summit-partnership-menu {
          width:var(--radix-select-trigger-width); max-width:calc(100vw - 32px); max-height:min(470px,var(--radix-select-content-available-height));
          border:1px solid #d9e4e4; border-radius:8px; background:#fff; box-shadow:0 18px 44px rgba(17,17,17,.16);
        }
        .summit-partnership-option { align-items:flex-start; padding:12px 38px 12px 12px; border-radius:6px; white-space:normal; }
        .summit-partnership-option:focus { background:#eef9f8; }
        .summit-partnership-option > span:last-child { width:100%; display:block; }
        .summit-partnership-option-copy { width:100%; min-width:0; display:block; }
        .summit-partnership-option-head { width:100%; display:grid; grid-template-columns:minmax(0,1fr) max-content; align-items:baseline; gap:16px; }
        .summit-partnership-option-name { color:var(--ink); font-size:12px; font-weight:800; }
        .summit-partnership-booked { color:#C62828; }
        .summit-partnership-option-price { color:#128F9D; font-size:12px; font-weight:800; text-align:right; }
        .summit-partnership-option-details { display:block; margin-top:6px; color:#4F5559; font-size:12px; font-weight:500; line-height:1.5; }
        .summit-partnership-summary { padding:14px 16px; border-left:3px solid var(--teal); border-radius:0 7px 7px 0; background:#f3faf9; }
        .summit-partnership-summary-label { margin:0; color:#128F9D; font-size:9px; font-weight:800; letter-spacing:.1em; text-transform:uppercase; }
        .summit-deliverables { margin:5px 0 0; color:#4F5559; font-size:12px; font-weight:500; line-height:1.6; }
        .summit-role { grid-column:1/-1; }
        .summit-chips { display:flex; flex-wrap:wrap; gap:8px; }
        .summit-chip { padding:9px 13px; border:1px solid #d9d9d9; border-radius:999px; background:#fff; color:var(--muted); font-size:11px; cursor:pointer; }
        .summit-chip.active { color:#fff; border-color:transparent; background:var(--gradient); }
        .summit-form-submit { grid-column:1/-1; width:100%; }
        .summit-error { grid-column:1/-1; margin:0; color:#c62828; text-align:center; font-size:12px; }
        .summit-success { padding:30px 10px; text-align:center; }
        .summit-success .summit-icon { margin:0 auto; }
        .summit-success h3 { margin:20px 0 0; font-size:28px; }
        .summit-success p { max-width:480px; margin:12px auto 22px; }
        .summit-opportunities {
          padding:72px 0; position:relative; overflow:hidden;
          background:
            radial-gradient(rgba(45,125,187,.12) 1px,transparent 1px) 0 0/24px 24px,
            linear-gradient(180deg,#f4fbf9,#eaf8fb);
        }
        .summit-opportunities::after {
          content:""; position:absolute; inset:auto 0 -20% 0; height:70%;
          background:url("/images/devbhoomi-ai/summit-landscape.png") center/cover no-repeat;
          opacity:.08; pointer-events:none;
        }
        .summit-opportunity-grid { position:relative; z-index:1; display:grid; grid-template-columns:1fr 1fr; gap:28px; }
        .summit-opportunity-card {
          min-height:260px; padding:32px; position:relative; overflow:hidden;
          border-color:rgba(23,182,184,.18); box-shadow:0 16px 40px rgba(44,79,150,.1);
          transition:transform .2s ease,box-shadow .2s ease;
        }
        .summit-opportunity-card:hover { transform:translateY(-4px); box-shadow:0 22px 48px rgba(44,79,150,.15); }
        .summit-opportunity-card::before {
          content:""; position:absolute; inset:0 0 auto; height:5px;
          background:linear-gradient(90deg,#17B6B8,#2D7DBB);
        }
        .summit-opportunity-card::after {
          content:""; position:absolute; width:180px; height:180px; border-radius:50%;
          top:-95px; right:-65px; background:linear-gradient(135deg,rgba(183,217,51,.14),rgba(23,182,184,.08));
        }
        .summit-opportunity-head { position:relative; z-index:1; display:flex; align-items:center; gap:16px; }
        .summit-opportunity-icon {
          width:54px; height:54px; flex:0 0 auto; border-radius:14px; display:grid; place-items:center;
          color:#178EA6; background:linear-gradient(135deg,rgba(23,182,184,.16),rgba(45,125,187,.11));
          border:1px solid rgba(23,182,184,.2); box-shadow:0 8px 20px rgba(23,182,184,.1);
        }
        .summit-opportunity-icon svg { width:31px; height:31px; }
        .summit-opportunity-label {
          margin:0; color:#168D9D; font-size:10px; font-weight:800;
          letter-spacing:.13em; text-transform:uppercase;
        }
        .summit-opportunity-card h3 { margin:7px 0 0; font-size:23px; line-height:1.2; font-weight:800; }
        .summit-opportunity-details { position:relative; z-index:1; display:grid; gap:10px; margin-top:26px; }
        .summit-opportunity-details a {
          width:100%; min-height:48px; padding:11px 14px; display:flex; align-items:center; gap:12px;
          color:#4f5f6c; font-size:13px; font-weight:600; border:1px solid #e4edef; border-radius:10px;
          background:rgba(248,252,252,.9); transition:border-color .2s ease,background .2s ease,color .2s ease;
        }
        .summit-opportunity-details a:hover { color:#127f88; border-color:rgba(23,182,184,.4); background:#fff; }
        .summit-opportunity-details .material-symbols-rounded { color:#12AFA8; font-size:21px; }
        .summit-cta { padding:60px 0 0; background:#fff; }
        .summit-cta-inner {
          min-height:220px; padding:42px; border-radius:24px; text-align:center; position:relative; overflow:hidden;
          background:linear-gradient(100deg,rgba(183,217,51,.13),rgba(23,182,184,.12),rgba(45,125,187,.14));
        }
        .summit-cta-inner::before {
          content:""; position:absolute; inset:0; background:url("/images/devbhoomi-ai/summit-landscape.png") center 57%/cover no-repeat; opacity:.18;
        }
        .summit-cta-content { position:relative; z-index:1; }
        .summit-cta h2 { margin:0; font-size:clamp(26px,3vw,38px); font-weight:800; color:#138D95; }
        .summit-cta p { margin:10px 0 22px; font-size:16px; }
        .summit-cta-actions { display:flex; flex-wrap:wrap; justify-content:center; gap:14px; }
        .summit-footer { padding:48px 0 24px; background:#fff; }
        .summit-footer-grid { display:grid; grid-template-columns:1fr 1.4fr 1fr; gap:48px; align-items:center; }
        .summit-footer-logo { width:220px; height:120px; object-fit:contain; object-position:left; }
        .summit-footer-contact { display:grid; gap:11px; color:var(--muted); font-size:12px; }
        .summit-footer-contact span { display:flex; align-items:center; gap:9px; }
        .summit-footer-contact .material-symbols-rounded { color:var(--teal); font-size:17px; }
        .summit-gov-logos { display:flex; justify-content:flex-end; align-items:center; gap:24px; }
        .summit-gov-logos img { max-width:130px; max-height:70px; object-fit:contain; }
        .summit-social { margin-top:8px; display:flex; align-items:center; gap:10px; }
        .summit-social a {
          width:38px; height:38px; display:grid; place-items:center; border-radius:10px;
          color:#178EA6; border:1px solid rgba(23,182,184,.28);
          background:linear-gradient(135deg,rgba(23,182,184,.12),rgba(45,125,187,.08));
          transition:transform .2s ease,color .2s ease,box-shadow .2s ease;
        }
        .summit-social a:hover { color:#127F88; transform:translateY(-2px); box-shadow:0 8px 18px rgba(23,182,184,.18); }
        .summit-social svg { width:19px; height:19px; }
        .summit-footer-bottom { margin-top:32px; padding-top:20px; border-top:1px solid #e8e8e8; display:flex; justify-content:space-between; gap:20px; color:var(--muted); font-size:10px; }
        @media (max-width:1020px) {
          .summit-nav-links a:not(.summit-btn) { display:none; }
          .summit-hero-grid, .summit-about-grid, .summit-sponsor-grid, .summit-why-grid { grid-template-columns:1fr; }
          .summit-hero { min-height:auto; }
          .summit-hero-grid { padding-top:56px; }
          .summit-focus-grid, .summit-attendee-grid { grid-template-columns:repeat(2,1fr); }
          .summit-patron-grid { grid-template-columns:repeat(3,1fr); }
          .summit-speaker-grid { grid-template-columns:repeat(3,1fr); }
        }
        @media (max-width:720px) {
          .summit-shell { width:min(100% - 32px,1180px); }
          .summit-section { padding:64px 0; }
          .summit-nav-inner { height:74px; gap:10px; }
          .summit-nav-brand { gap:4px; }
          .summit-nav-logo { width:auto; height:56px; }
          .summit-nav-itda { width:29px; }
          .summit-nav-itda-logo { width:29px; height:29px; }
          .summit-nav-itda-label { font-size:7px; }
          .summit-nav .summit-btn { min-height:40px; padding:0 16px; font-size:12px; }
          .summit-hero-grid { padding:48px 0 92px; }
          .summit-hero h1 { font-size:clamp(42px,14vw,60px); }
          .summit-hero {
            background:
              linear-gradient(90deg,rgba(255,255,255,.97),rgba(255,255,255,.76)),
              url("/images/devbhoomi-ai/background_image.png");
            background-color:#fff;
            background-position:center,center top;
            background-repeat:no-repeat;
            background-size:cover,contain;
          }
          .summit-focus-grid, .summit-attendee-grid { grid-template-columns:1fr; }
          .summit-patron-grid { grid-template-columns:1fr; max-width:340px; margin-left:auto; margin-right:auto; }
          .summit-speaker-grid { grid-template-columns:repeat(2,1fr); }
          .summit-form-grid { grid-template-columns:1fr; }
          .summit-opportunity-grid { grid-template-columns:1fr; }
          .summit-role, .summit-form-submit, .summit-error { grid-column:auto; }
          .summit-form { padding:24px; }
          .summit-cta-actions { flex-direction:column; align-items:stretch; }
          .summit-opportunity-card { min-height:auto; padding:28px; }
          .summit-checks { grid-template-columns:1fr; }
          .summit-footer-grid { grid-template-columns:1fr; gap:24px; }
          .summit-gov-logos { justify-content:flex-start; }
          .summit-footer-bottom { flex-direction:column; }
        }
        @media (prefers-reduced-motion:reduce) {
          html { scroll-behavior:auto; }
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

      <nav className="summit-nav" aria-label="Summit navigation">
        <div className="summit-shell summit-nav-inner">
          <a className="summit-nav-brand" href="#top" aria-label="Devbhoomi AI Summit home">
            <span className="summit-nav-itda">
              <img className="summit-nav-itda-logo" src="/itda_without_background.png" alt="Information Technology Development Agency" />
              <span className="summit-nav-itda-label" aria-hidden="true">ITDA</span>
            </span>
            <img className="summit-nav-logo" src="/images/devbhoomi-ai/summit-logo.png" alt="Devbhoomi AI Summit 2026" />
          </a>
          <div className="summit-nav-links">
            <a href="#top">Home</a>
            <a href="#about">About</a>
            <a href="#speakers">Speakers</a>
            <a href="#themes">Focus Areas</a>
            <a href="#agenda">Agenda</a>
            <a href="#attend">Who Should Attend</a>
            <a href="#venue">Venue</a>
            <a className="summit-btn summit-btn-primary" href="#sponsor">Partner With Us</a>
          </div>
        </div>
      </nav>

      <header id="top" className="summit-hero">
        <div className="summit-shell summit-hero-grid">
          <div>
            <p className="summit-kicker">Uttarakhand's flagship AI gathering</p>
            <h1>
              <span className="line summit-name">DEVBHOOMI</span>
              <span className="line">AI SUMMIT <span className="year">2026</span></span>
            </h1>
            <p className="summit-hero-subtitle">Building an AI-Native Uttarakhand</p>
            <p className="summit-hero-copy">
              A premier AI innovation summit bringing together policymakers, industry
              leaders, startups, academia and investors to shape an intelligent future.
            </p>
            <p className="summit-audience">Government · Industry · Startups · Academia · Investors</p>
            <div className="summit-actions">
              <a className="summit-btn summit-btn-primary" href="#sponsor">
                Partner With Us <span className="material-symbols-rounded">arrow_forward</span>
              </a>
              <a className="summit-btn summit-btn-outline" href="/DevbhoomiAISummit/delegate-pass">
                Register as Delegate
              </a>
              <a className="summit-btn summit-btn-outline" href="/DevbhoomiAISummit/nomination">
                Submit Award Nomination
              </a>
            </div>
            <div className="summit-event-meta">
              <span><span className="material-symbols-rounded">calendar_month</span>October 9, 2026</span>
              <span><span className="material-symbols-rounded">location_on</span>Hyatt Centric, Dehradun</span>
            </div>
          </div>
        </div>
      </header>

      <section id="about" className="summit-section">
        <div className="summit-shell summit-about-grid">
          <div>
            <p className="summit-kicker">About the summit</p>
            <h2 className="summit-title">Building the future of <span>Uttarakhand</span></h2>
            <p className="summit-copy">
              Devbhoomi AI Summit 2026 is the state's flagship AI event focused on
              innovation, entrepreneurship, governance, education, mobility, tourism and
              sustainable development.
            </p>
            <div className="summit-checks">
              {["AI for Government", "Research Presentations", "Startup Showcase", "AI Workshops", "Innovation Expo", "Investor Connect"].map((item) => (
                <span className="summit-check" key={item}>
                  <span className="material-symbols-rounded">check_circle</span>{item}
                </span>
              ))}
            </div>
          </div>
          <div id="themes">
            <p className="summit-kicker">Focus areas</p>
            <div className="summit-focus-grid" style={{ marginTop: 18 }}>
              {themes.map((theme) => (
                <article className="summit-card summit-focus-card" key={theme.title}>
                  <BrandIcon icon={theme.icon} />
                  <h3>{theme.title}</h3>
                  <p>{theme.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="agenda" className="summit-section">
        <div className="summit-shell">
          <p className="summit-kicker">What we will explore</p>
          <h2 className="summit-title">Summit <span>Agenda</span></h2>
          <p className="summit-copy" style={{ marginTop: 12, maxWidth: 760 }}>
            A focused agenda on how Artificial Intelligence can transform governance and
            public service delivery across Uttarakhand.
          </p>
          <div className="summit-attendee-grid" style={{ marginTop: 40 }}>
            {agenda.map((item) => (
              <div className="summit-card summit-attendee" key={item.label}>
                <BrandIcon icon={item.icon} />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="speakers" className="summit-section summit-pattern-section">
        <div className="summit-shell" style={{ position: "relative" }}>
          <p className="summit-kicker">Leadership and expertise</p>
          <h2 className="summit-title">Summit <span>Speakers</span></h2>
          <div className="summit-patron-grid">
            {patrons.map((speaker) => (
              <article className="summit-card summit-speaker summit-patron" key={speaker.name}>
                <div className="summit-speaker-photo">
                  <img src={speaker.image} alt={speaker.name} />
                  <SpeakerProfileLinks speaker={speaker} />
                </div>
                <div className="summit-speaker-info">
                  <h3>{speaker.name}</h3>
                  <p>{speaker.role}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="summit-speaker-grid">
            {speakers.map((speaker) => (
              <article className="summit-card summit-speaker" key={speaker.name}>
                <div className="summit-speaker-photo">
                  <img src={speaker.image} alt={speaker.name} />
                  <SpeakerProfileLinks speaker={speaker} />
                </div>
                <div className="summit-speaker-info">
                  <h3>{speaker.name}</h3>
                  <p>{speaker.role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="attend" className="summit-section">
        <div className="summit-shell">
          <p className="summit-kicker">Built for decision-makers and innovators</p>
          <h2 className="summit-title">Who Should <span>Attend</span></h2>
          <div className="summit-attendee-grid" style={{ marginTop: 40 }}>
            {attendees.map((attendee) => (
              <div className="summit-card summit-attendee" key={attendee.label}>
                <BrandIcon icon={attendee.icon} />
                <span>{attendee.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="summit-section summit-why">
        <div className="summit-shell summit-why-grid">
          <div>
            <p className="summit-kicker">Why this matters</p>
            <h2 className="summit-title">AI built for the <span>Himalayan state</span></h2>
          </div>
          <div className="summit-why-copy">
            <p className="summit-copy" style={{ margin: 0 }}>
              Uttarakhand is at a crucial inflection point where seasonal pilgrim movement,
              fragile terrain, urban expansion and infrastructure pressure demand AI-native
              solutions rather than conventional fixes. The summit creates a platform to
              turn AI from a buzzword into a practical governance tool for safety, mobility,
              encroachment monitoring and citizen services.
            </p>
          </div>
        </div>
      </section>

      <section id="sponsor" className="summit-section summit-sponsor">
        <div className="summit-shell summit-sponsor-grid">
          <div>
            <p className="summit-kicker">Shape the future with us</p>
            <h2 className="summit-title">Become a <span>Summit Partner</span></h2>
            <p className="summit-copy">
              Connect your organisation with Uttarakhand's AI ecosystem. Submit your
              interest and our summit team will share partnership opportunities.
            </p>
            <div className="summit-card summit-contact-card">
              <BrandIcon icon={CalendarDays} />
              <div><h3>October 9, 2026</h3><p>A full day of keynotes, showcases and collaboration.</p></div>
            </div>
            <div id="venue" className="summit-card summit-contact-card">
              <BrandIcon icon={MapPin} />
              <div>
                <h3>Hyatt Centric, Dehradun</h3>
                <p>152/3-4, Rajpur Road, Jakhan, Dehradun, Uttarakhand 248001</p>
                <p><a href="https://maps.app.goo.gl/i33gWViTrEYK4bXHA" target="_blank" rel="noopener noreferrer" style={{ color: "#128F9D", fontWeight: 700 }}>View on Google Maps</a></p>
              </div>
            </div>
          </div>

          <div className="summit-card summit-form">
            {submitted ? (
              <div className="summit-success">
                <BrandIcon icon={Check} />
                <h3>Thank you</h3>
                <p className="summit-copy">Your partnership interest has been noted. The summit team will reach out shortly.</p>
                <button className="summit-btn summit-btn-outline" type="button" onClick={resetForm}>Submit another response</button>
              </div>
            ) : (
              <form className="summit-form-grid" onSubmit={handleSubmit}>
                <div className="summit-field">
                  <label htmlFor="summit-name">Full name</label>
                  <input id="summit-name" required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Your full name" />
                </div>
                <div className="summit-field">
                  <label htmlFor="summit-org">Organisation</label>
                  <input id="summit-org" value={form.org} onChange={(event) => setForm({ ...form, org: event.target.value })} placeholder="Your organisation" />
                </div>
                <div className="summit-field">
                  <label htmlFor="summit-email">Work email</label>
                  <input id="summit-email" type="email" required value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="you@organisation.com" />
                </div>
                <div className="summit-field">
                  <label htmlFor="summit-phone">Phone number</label>
                  <input id="summit-phone" type="tel" required value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} placeholder="+91 00000 00000" />
                </div>
                <div className="summit-field summit-partnership">
                  <label htmlFor="summit-partnership-category">Partnership category</label>
                  <Select required value={partnershipCategory} onValueChange={setPartnershipCategory}>
                    <SelectTrigger id="summit-partnership-category" className="summit-partnership-trigger" aria-label="Partnership category">
                      {selectedPartnership ? (
                        <span className="summit-partnership-trigger-copy">
                          <span className={`summit-partnership-name${selectedPartnership.booked ? " summit-partnership-booked" : ""}`}>{selectedPartnership.category}</span>
                          <span className="summit-partnership-price">{selectedPartnership.investment}</span>
                        </span>
                      ) : (
                        <span className="summit-partnership-placeholder">Select a partnership category</span>
                      )}
                    </SelectTrigger>
                    <SelectContent className="summit-partnership-menu" position="popper" align="start" sideOffset={6}>
                      {partnershipCategories.map(({ category, investment, deliverables, booked }) => (
                        <SelectItem className="summit-partnership-option" key={category} value={category} textValue={category}>
                          <span className="summit-partnership-option-copy">
                            <span className="summit-partnership-option-head">
                              <span className={`summit-partnership-option-name${booked ? " summit-partnership-booked" : ""}`}>{category}</span>
                              <span className="summit-partnership-option-price">{investment}</span>
                            </span>
                            <span className="summit-partnership-option-details">{deliverables}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedPartnership && (
                    <div className="summit-partnership-summary" aria-live="polite">
                      <p className="summit-partnership-summary-label">Included with this partnership</p>
                      <p className="summit-deliverables">{selectedPartnership.deliverables}</p>
                    </div>
                  )}
                </div>
                <div className="summit-field summit-role">
                  <label>Your role</label>
                  <div className="summit-chips">
                    {roleChips.map((chip) => (
                      <button className={`summit-chip${role === chip ? " active" : ""}`} key={chip} type="button" onClick={() => setRole(role === chip ? null : chip)}>
                        {chip}
                      </button>
                    ))}
                  </div>
                </div>
                <button className="summit-btn summit-btn-primary summit-form-submit" type="submit" disabled={sending}>
                  {sending ? "Submitting..." : "Submit Partnership Request"}
                  <span className="material-symbols-rounded">arrow_forward</span>
                </button>
                {error && <p className="summit-error">{error}</p>}
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="summit-opportunities" aria-label="Summit contact opportunities">
        <div className="summit-shell summit-opportunity-grid">
          <article className="summit-card summit-opportunity-card">
            <div className="summit-opportunity-head">
              <span className="summit-opportunity-icon" aria-hidden="true"><Mic strokeWidth={1.8} /></span>
              <div>
                <p className="summit-opportunity-label">Speaking Opportunity</p>
                <h3>Neeraj Pandey</h3>
              </div>
            </div>
            <div className="summit-opportunity-details">
              <a href="mailto:sponsorship@axocom.in">
                <span className="material-symbols-rounded">mail</span>
                sponsorship@axocom.in
              </a>
              <a href="tel:+918979201974">
                <span className="material-symbols-rounded">call</span>
                +91 89792 01974
              </a>
            </div>
          </article>
          <article className="summit-card summit-opportunity-card">
            <div className="summit-opportunity-head">
              <span className="summit-opportunity-icon" aria-hidden="true"><Handshake strokeWidth={1.8} /></span>
              <div>
                <p className="summit-opportunity-label">Partnership Opportunity</p>
                <h3>Shruti Kotiyal</h3>
              </div>
            </div>
            <div className="summit-opportunity-details">
              <a href="mailto:sponsorship@axocom.in">
                <span className="material-symbols-rounded">mail</span>
                sponsorship@axocom.in
              </a>
              <a href="tel:+916399906916">
                <span className="material-symbols-rounded">call</span>
                +91 63999 06916
              </a>
            </div>
          </article>
        </div>
      </section>

      <section className="summit-cta">
        <div className="summit-shell summit-cta-inner">
          <div className="summit-cta-content">
            <h2>Ready to shape the future of AI?</h2>
            <p>Join Uttarakhand's largest AI gathering.</p>
            <div className="summit-cta-actions">
              <a className="summit-btn summit-btn-primary" href="#sponsor">Partner Today <span className="material-symbols-rounded">arrow_forward</span></a>
              <a className="summit-btn summit-btn-outline" href="/DevbhoomiAISummit/delegate-pass">
                Register as Delegate
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="summit-footer">
        <div className="summit-shell">
          <div className="summit-footer-grid">
            <img className="summit-footer-logo" src="/images/devbhoomi-ai/summit-logo.png" alt="Devbhoomi AI Summit 2026" />
            <div className="summit-footer-contact">
              <span><span className="material-symbols-rounded">location_on</span>Dehradun, Uttarakhand, India</span>
              <span><span className="material-symbols-rounded">mail</span>sponsorship@axocom.in</span>
              <span><span className="material-symbols-rounded">call</span>+91 89792 01974 · +91 63999 06916</span>
              <div className="summit-social">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Devbhoomi AI Summit on ${social.label}`}
                    title={social.label}
                  >
                    <social.icon strokeWidth={1.8} />
                  </a>
                ))}
              </div>
            </div>
            <div className="summit-gov-logos">
              <img src="/itda_without_background.png" alt="Information Technology Development Agency" />
              <img src="/images/uttarakhand_government.svg" alt="Government of Uttarakhand" />
            </div>
          </div>
          <div className="summit-footer-bottom">
            <span>© 2026 Devbhoomi AI Summit. All rights reserved.</span>
            <span>An initiative of ITDA, Government of Uttarakhand</span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default DevbhoomiAISummit;
