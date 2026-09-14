import runtimeUrl from "@hyperframes/core/runtime?url";
import gsapUrl from "gsap/dist/gsap.min.js?url";
import interUrl from "@fontsource/inter/files/inter-latin-400-normal.woff2?url";
import interBoldUrl from "@fontsource/inter/files/inter-latin-600-normal.woff2?url";
import displayUrl from "@fontsource/space-grotesk/files/space-grotesk-latin-600-normal.woff2?url";
import styles from "./inauguration.css?raw";
import { HIRING_PARTNERS } from "../lib/hiringPartners";
import { MENTORS } from "../lib/mentors";
import { getTotalProblems } from "../lib/data";
import { PHASES } from "../components/home/data";
import type { EventSlideshowDeck } from "~/components/presentation/EventSlideshow";

/** Source: the two supplied inauguration posters; programme data stays shared with the site. */
export const INAUGURATION = {
  date: "15 September 2026",
  venue: "Prof. K.P. Nautiyal Auditorium, GEHU",
  path: "/UKISHackathon/inauguration",
} as const;

const escape = (text: string) => text.replace(/[&<>"']/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
})[character]!);

const image = (src: string, alt: string, className = "") =>
  `<img src="${escape(src)}" alt="${escape(alt)}" class="${className}" decoding="sync" loading="eager">`;

const brand = () => `<div class="brand-logos">
  <div class="brand-mark">${image("/hackathon/ukis_logo.png", "UKIS Hackathon 2026")}</div>
  ${image("/hackathon/logos/itda.png", "ITDA", "institution-logo institution-logo--itda")}
  ${image("/hackathon/logos/uttarakhand_government.png", "Uttarakhand Government", "institution-logo")}
  ${image("/hackathon/logos/graphic_era.png", "Graphic Era", "institution-logo institution-logo--graphic-era")}
  ${image("/hackathon/logos/TBI.png", "Technology Business Incubator, GEU", "institution-logo institution-logo--tbi")}
</div>`;
const top = (label: string) => `<header class="masthead">${brand()}<span class="eyebrow">${escape(label)}</span></header>`;
const title = (eyebrow: string, headline: string, subtitle = "") => `${top(eyebrow)}<div class="section-heading"><h2>${headline}</h2>${subtitle ? `<p>${subtitle}</p>` : ""}</div>`;

type Slide = { id: string; title: string; content: string; theme?: string; notes: string };

const MENTORS_PER_SLIDE = 6;
const mentorSlideCount = Math.ceil(MENTORS.length / MENTORS_PER_SLIDE);

const mentorSlides: Slide[] = Array.from({ length: mentorSlideCount }, (_, index) => ({
  id: `mentors-${index + 1}`,
  title: `Programme mentors · ${index + 1} / ${mentorSlideCount}`,
  theme: "light mentors",
  notes: "Programme mentors from the current website. These are not announcements of inauguration attendance. Organization names describe individual affiliations, not company sponsorship.",
  content: `${title("Meet the programme mentors", "Great ideas grow with great guidance.", "Learn from builders, engineers and industry leaders.")}
    <div class="mentor-grid">${MENTORS.slice(index * MENTORS_PER_SLIDE, (index + 1) * MENTORS_PER_SLIDE).map((mentor) => `
      <article class="mentor-card">
        <div class="mentor-photo">${mentor.image ? image(mentor.image, mentor.name) : `<span>${escape(mentor.initials)}</span>`}</div>
        <div class="mentor-info"><h3>${escape(mentor.name)}</h3><p>${escape(mentor.designation)}</p><strong>${escape(mentor.organization)}</strong></div>
      </article>`).join("")}</div>`,
}));

export const INAUGURATION_SLIDES: Slide[] = [
  {
    id: "welcome", title: "Welcome to the inauguration", theme: "light hero",
    notes: "Opening and holding screen. Inauguration date and venue are taken directly from the supplied event poster. Space pauses the loop for the ceremony.",
    content: `${top("The inauguration · 2026")}
      <div class="hero-layout"><div class="hero-copy"><p class="kicker">Uttarakhand Innovation &amp; Solutions Hackathon</p><h1>Innovate today.<span>Impact tomorrow.</span></h1><p class="hero-subtitle">Welcome to the beginning of something meaningful for Uttarakhand.</p><div class="event-meta"><strong>${INAUGURATION.date}</strong><p>${INAUGURATION.venue}</p></div></div><div class="hero-art">${image("/hackathon/logos/prop-ukis-hero-1200.jpg", "UKIS identity with Uttarakhand’s mountains, heritage and industry")}</div></div>
      <div class="organizer">${image("/axocomLogo.png", "AxoCom")}<span>Organised by <strong>Axolotl Emprise LLP</strong></span></div>`,
  },
  {
    id: "inauguration-poster", title: "The inauguration · official poster", theme: "poster light",
    notes: "Official inauguration poster, shown intact. The poster names Shri Pushkar Singh Dhami and Shri Pradeep Batra and carries all supplied institutional marks without assigning additional roles.",
    content: `<div class="poster-stage">${image("/hackathon_poster2.jpeg", "UKIS inauguration: Shri Pushkar Singh Dhami, Hon’ble Chief Minister, Uttarakhand; Shri Pradeep Batra, Hon’ble Minister for IT and Science & Technology, Uttarakhand. 15 September 2026, Prof. K.P. Nautiyal Auditorium, GEHU.")}</div>`,
  },
  {
    id: "purpose", title: "Real problems. Real products. Real impact.",
    notes: "UKIS connects industry, problem solvers and government. Real products and practical solutions are the purpose, rather than a competition alone.",
    content: `${top("Our shared purpose")}<div class="statement"><p class="kicker">Not just a hackathon. A journey.</p><h2>Real problems.<span>Real products.</span>Real impact.</h2><p>Bringing builders, industry and government together to solve Uttarakhand’s real-world challenges.</p></div><div class="statement-index" aria-hidden="true">UKIS<span>2026</span></div>`,
  },
  {
    id: "journey", title: "From an idea to an on-ground solution", theme: "light",
    notes: "The website’s three programme stages. City names are programme locations, not a date-specific inauguration schedule.",
    content: `${title("The innovation journey", "Start online. Build for the real world.")}
      <div class="journey-grid">${PHASES.map((phase) => `<article class="journey-card"><span class="step">${phase.number}</span><h3>${escape(phase.title)}</h3><p>${escape(phase.points.join(" · "))}</p></article>`).join("")}</div>
      <div class="city-line"><span>One state. Three cities.</span><strong>Rudrapur <b>→</b> Roorkee <b>→</b> Dehradun</strong></div>`,
  },
  {
    id: "challenges", title: "Build technology that serves people",
    notes: "High-level groupings of the published problem catalogue, not new challenge titles. The count comes from getTotalProblems().",
    content: `${title(`${getTotalProblems()} published problem statements`, "Build technology that serves people.", "AI, GovTech and digital public services, grounded in real needs.")}
      <div class="challenge-grid"><article><span>01 / KNOWLEDGE</span><h3>Make information useful.</h3><p>Knowledge management, AI and document automation.</p></article><article><span>02 / PUBLIC SERVICES</span><h3>Make services work better.</h3><p>Welfare data, accessible digital services and communication.</p></article><article><span>03 / CIVIC INNOVATION</span><h3>Make our cities smarter.</h3><p>Computer vision for civic governance, mobility and infrastructure.</p></article></div>`,
  },
  {
    id: "resilience", title: "Build for a more resilient Uttarakhand", theme: "light",
    notes: "Published GIS and drone-analytics challenges cover forestry, wildlife, climate, disasters, urban planning and public safety.",
    content: `${title("Innovation for Uttarakhand", "Protect the places we call home.")}
      <div class="resilience-layout"><div class="landscape">${image("/hackathon/logos/prop-ukis-hero-1200.jpg", "Uttarakhand’s natural and cultural landscape")}</div><div class="impact-list"><article><span>01</span><div><h3>Forests &amp; wildlife</h3><p>GIS for environment and conservation.</p></div></article><article><span>02</span><div><h3>Climate &amp; disasters</h3><p>Data-led preparedness and disaster management.</p></div></article><article><span>03</span><div><h3>Safer communities</h3><p>Drone analytics, public safety and urban planning.</p></div></article></div></div>`,
  },
  {
    id: "rewards", title: "Recognition for meaningful innovation",
    notes: "Published reward pool includes cash and exclusive benefits, not all cash. Exact breakdown comes from the website’s official rules and prize section. UNIUN AI credit is credit, not cash.",
    content: `${top("Build something that matters")}<div class="prize-heading"><div><p class="kicker">Total prize pool up to</p><h2>₹10 <span>LAKH</span></h2></div><p>Recognising ideas that turn real problems into real solutions.</p></div>
      <div class="prize-grid"><article class="champion"><span>State level</span><strong>₹51,000</strong><p>Cash + benefits worth ₹1,00,000</p></article><article><span>Kumaon level</span><strong>₹21,000</strong><p>Cash + benefits worth ₹50,000</p></article><article><span>Garhwal level</span><strong>₹21,000</strong><p>Cash + benefits worth ₹50,000</p></article></div>
      <div class="prize-extras"><p><strong>Problem level · ₹10,000</strong><span>Cash + benefits worth ₹25,000</span></p><p><strong>UNIUN AI · ₹5,000</strong><span>AI credit</span></p></div>`,
  },
  {
    id: "hiring-partners", title: "Meet our hiring partners", theme: "light",
    notes: "Partners and role labels come from HIRING_PARTNERS. Participation creates opportunities, not guaranteed interviews, internships or jobs.",
    content: `${title("Our hiring ecosystem", "Your work can open new doors.", "Meet the partners connecting real-world skills with opportunity.")}
      <div class="partner-grid">${HIRING_PARTNERS.map((partner) => `<article><div class="partner-logo">${image(partner.logo, partner.name)}</div><h3>${escape(partner.name)}</h3><p>${escape(partner.role)}</p></article>`).join("")}</div>
      <p class="partner-note">Mentorship. Showcases. Career opportunities.<span>Opportunities are subject to partner selection; jobs are not guaranteed.</span></p>`,
  },
  ...mentorSlides,
  {
    id: "participate", title: "There is a place here for every builder",
    notes: "Students, developers and working professionals can participate solo or in one team of 2–4. Selected ideas may be refined and explored for pilots, implementation, incubation and funding; these outcomes are not guaranteed.",
    content: `${title("Join the journey", "You don’t need a title. Just an idea.", "Students. Developers. Working professionals.")}
      <div class="participate-layout"><div class="team-size"><strong>1<span>or</span>2–4</strong><p>Build solo or join as one team.</p></div><div class="next-steps"><p><span>01</span> Choose a published problem.</p><p><span>02</span> Build, test and learn with mentors.</p><p><span>03</span> Turn your idea into a working solution.</p></div></div><div class="site-url">axocom.in/UKISHackathon</div>`,
  },
  {
    id: "programme-poster", title: "Innovate today. Impact tomorrow.", theme: "poster light",
    notes: "The supplied programme poster is displayed without cropping, including its registration QR and original institutional logos.",
    content: `<div class="poster-stage">${image("/hackathon_poster.jpeg", "UKIS official programme poster: Innovate today, impact tomorrow. Hybrid hackathon in Dehradun, Roorkee and Rudrapur, prize pool up to ₹10 lakh, and registration QR code.")}</div>`,
  },
  {
    id: "closing", title: "Let’s build for Uttarakhand",
    notes: "Closing holding slide. Autoplay loops to the welcome slide. Press Space to hold during the inauguration; Home returns to the welcome screen.",
    content: `${top("Uttarakhand Innovation & Solutions Hackathon")}<div class="closing-layout"><div class="closing-copy"><p class="kicker">The journey begins here.</p><h2>Let’s build for<span>Uttarakhand.</span></h2><p>One community. Real challenges. Extraordinary possibilities.</p><div class="site-url">axocom.in/UKISHackathon</div></div><figure class="closing-qr">${image("/hacathon_qr.png", "UKIS Hackathon QR code")}<figcaption>Scan to explore UKIS</figcaption></figure></div><div class="closing-organizer">${image("/axocomLogo.png", "AxoCom")}<p>Organised by <strong>Axolotl Emprise LLP</strong></p></div>`,
  },
];

/** All timelines are finite and seekable; slide order and notes have one source of truth. */
export function createInaugurationDeck(): EventSlideshowDeck {
  const duration = 10;
  const manifest: EventSlideshowDeck["manifest"] = {
    slides: INAUGURATION_SLIDES.map((slide, index) => ({
      sceneId: slide.id, startTime: index * duration, endTime: (index + 1) * duration, notes: slide.notes,
    })),
    slideSequences: [],
  };
  const island = JSON.stringify(manifest).replace(/</g, "\\u003c");
  const scenes = INAUGURATION_SLIDES.map((slide, index) => `<section class="scene ${slide.theme ?? "dark"}" data-composition-id="${slide.id}" data-start="${index * duration}" data-duration="${duration}" data-width="1920" data-height="1080" data-label="${escape(slide.title)}">
    <div class="clip slide-surface" data-start="0" data-duration="${duration}" data-track-index="${index + 1}"><div class="slide-content">${slide.content}</div>${slide.theme?.includes("poster") ? "" : `<footer><span>UKIS 2026 <b>·</b> INAUGURATION</span><span>${String(index + 1).padStart(2, "0")} / ${String(INAUGURATION_SLIDES.length).padStart(2, "0")}</span></footer>`}</div></section>`).join("\n");

  return {
    manifest,
    titles: INAUGURATION_SLIDES.map((slide) => slide.title),
    html: `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>UKIS 2026 · Inauguration</title>
      <style>@font-face{font-family:Inter;src:url('${interUrl}') format('woff2');font-weight:400;font-display:block}@font-face{font-family:Inter;src:url('${interBoldUrl}') format('woff2');font-weight:600;font-display:block}@font-face{font-family:'Space Grotesk';src:url('${displayUrl}') format('woff2');font-weight:600;font-display:block}${styles}</style>
      <script src="${gsapUrl}"></script></head><body><script type="application/hyperframes-slideshow+json">${island}</script>
      <main data-composition-id="inauguration" data-start="0" data-duration="${INAUGURATION_SLIDES.length * duration}" data-width="1920" data-height="1080" style="position:relative;width:1920px;height:1080px">${scenes}</main>
      <script>
        window.__timelines = {};
        const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
        const timeline = gsap.timeline({ paused: true });
        document.querySelectorAll('.scene').forEach(scene => {
          const start = Number(scene.dataset.start);
          timeline.fromTo(scene.querySelector('.slide-content'), { opacity: reduced ? 1 : 0 }, { opacity: 1, duration: .5 }, start);
        });
        window.__timelines.inauguration = timeline;
      </script>
      <!-- Locally bundled hyperframe.runtime.iife.js; no CDN fallback. -->
      <script src="${runtimeUrl}"></script></body></html>`,
  };
}