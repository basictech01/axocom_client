import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowUpRight, BrainCircuit, BriefcaseBusiness, Instagram, Linkedin, Sparkles, X, Youtube } from 'lucide-react';
import Navbar from '../components/static_components/Navbar';
import { Reveal } from '../components/static_components/Reveal';
import { buildSeoLinks, buildSeoMeta, organizationSchema, structuredData, webPageSchema } from '~/lib/seo';

const seo = {
  title: 'Careers & Internships',
  description: 'Apply for AxoCom internships across strategy, research, creative production, client service, account management, media, technology, and AI-powered campaign work.',
  path: '/careers',
  image: '/images/logo2.png',
  imageAlt: 'AxoCom careers and internship opportunities',
  keywords: ['AxoCom careers', 'AxoCom internship', 'media internship', 'PR internship', 'AI campaign internship'],
};

export const meta = () => buildSeoMeta(seo);
export const links = () => buildSeoLinks(seo);

interface Role {
  title: string;
  discipline: string;
  description: string;
  idealCandidates: string;
}

const roles: Role[] = [
  {
    title: 'Strategy & Research Analyst',
    discipline: 'Intelligence',
    description: 'Interns in this technical role will work directly with client brands, conducting deep-dive market research, identifying upcoming trends, and developing sophisticated, data-driven communication strategies. A core component involves working with our engineering teams to build data pipelines and contribute to our proprietary knowledge graph.',
    idealCandidates: 'Students studying Mass Communication, Law (LLB), Political Science, History, or Sociology, or related analytical fields.',
  },
  {
    title: 'Creative & Generative Production',
    discipline: 'Creative',
    description: 'This role focuses on conceptualizing and materializing ideas into high-quality creative assets using our advanced production tools. Responsibilities include creating dynamic assets like digital artwork, short films, articles, and comprehensive video/photo content that fuel our brand campaigns and media entities.',
    idealCandidates: 'Students studying Visual Communication, Bachelor of Fine Arts (BFA), Graphic Designing, Video Editing, and Photo Editing.',
  },
  {
    title: 'Client Service & Account Management',
    discipline: 'Leadership',
    description: 'These interns will serve as the primary relationship managers for individual clients and media entities. They oversee strategic planning, project execution, and ensure client goals are met through the effective deployment of our technology and services.',
    idealCandidates: 'Students studying Digital Marketing, MBA (Sales & Marketing), or those who possess exceptional communication and leadership skills.',
  },
];

const RoleGraphic: React.FC<{ index: number; compact?: boolean }> = ({ index, compact = false }) => {
  const Icon = index === 0 ? BrainCircuit : index === 1 ? Sparkles : BriefcaseBusiness;

  if (index === 0) {
    return (
      <div className="relative h-full overflow-hidden bg-[#eaf4ff]">
        <div className="absolute inset-0 opacity-45 [background-image:linear-gradient(rgba(79,149,232,.14)_1px,transparent_1px),linear-gradient(90deg,rgba(79,149,232,.14)_1px,transparent_1px)] [background-size:32px_32px]" />
        <div className="absolute left-[12%] top-[16%] h-px w-[66%] rotate-[17deg] bg-[#4f95e8]/45" />
        <div className="absolute bottom-[24%] left-[18%] h-px w-[62%] -rotate-[11deg] bg-[#4f95e8]/35" />
        {[[18,28],[70,19],[78,66],[30,72],[52,46]].map(([left, top], node) => (
          <span key={node} className="absolute flex size-8 items-center justify-center rounded-full border border-[#4f95e8]/30 bg-white shadow-sm" style={{ left: `${left}%`, top: `${top}%` }}>
            <span className="size-2 rounded-full bg-[#4f95e8]" />
          </span>
        ))}
        <div className="absolute left-1/2 top-1/2 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#101116] text-white shadow-xl">
          <Icon className="size-8" strokeWidth={1.4} />
        </div>
        {!compact && <p className="axo-serif absolute bottom-5 right-6 text-xl italic text-[#101116]/55">From signals to strategy.</p>}
      </div>
    );
  }

  if (index === 1) {
    return (
      <div className="relative h-full overflow-hidden bg-[#f4f1ff]">
        <div className="absolute left-[14%] top-[17%] h-[56%] w-[52%] rotate-[-8deg] rounded-[20px] border border-[#4f95e8]/25 bg-white/75 shadow-lg" />
        <div className="absolute right-[12%] top-[22%] h-[55%] w-[48%] rotate-[9deg] rounded-[20px] bg-[#4f95e8]/20 shadow-lg" />
        <div className="absolute left-[27%] top-[25%] h-[53%] w-[51%] rounded-[20px] bg-white shadow-xl">
          <div className="absolute inset-x-5 top-5 h-2 rounded-full bg-[#4f95e8]/25" />
          <div className="absolute left-5 top-12 size-16 rounded-full bg-[#4f95e8]/18" />
          <div className="absolute bottom-6 left-5 right-5 space-y-2"><div className="h-2 w-full rounded-full bg-black/10"/><div className="h-2 w-2/3 rounded-full bg-black/10"/></div>
        </div>
        <div className="absolute left-1/2 top-1/2 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#101116] text-white shadow-xl">
          <Icon className="size-8" strokeWidth={1.4} />
        </div>
        {[['16%','20%'],['82%','18%'],['16%','76%'],['82%','72%']].map(([left, top], spark) => <span key={spark} className="absolute size-2 rotate-45 bg-[#4f95e8]" style={{ left, top }} />)}
        {!compact && <p className="axo-serif absolute bottom-5 right-6 text-xl italic text-[#101116]/55">Ideas become assets.</p>}
      </div>
    );
  }

  return (
    <div className="relative h-full overflow-hidden bg-[#edf7f7]">
      <div className="absolute left-1/2 top-1/2 size-[68%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#4f95e8]/40" />
      <div className="absolute left-1/2 top-1/2 size-[43%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#4f95e8]/25" />
      {[[50,13],[84,48],[51,80],[14,49]].map(([left, top], person) => (
        <span key={person} className="absolute flex size-11 items-center justify-center rounded-full bg-white shadow-md" style={{ left: `${left}%`, top: `${top}%`, transform: 'translate(-50%, -50%)' }}>
          <span className="size-4 rounded-full bg-[#4f95e8]/50" />
        </span>
      ))}
      <div className="absolute left-1/2 top-1/2 flex size-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#101116] text-white shadow-xl">
        <Icon className="size-9" strokeWidth={1.4} />
      </div>
      {!compact && <p className="axo-serif absolute bottom-5 right-6 text-xl italic text-[#101116]/55">Relationships drive outcomes.</p>}
    </div>
  );
};

const RoleCard: React.FC<{ role: Role; index: number }> = ({ role, index }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', close);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', close);
    };
  }, [open]);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="group block w-full overflow-hidden rounded-[26px] bg-white text-left shadow-[0_22px_55px_-44px_rgba(79,149,232,.6)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_70px_-42px_rgba(79,149,232,.72)]">
        <div className="relative aspect-[16/11] overflow-hidden bg-[#e8eef7]">
          <div className="h-full transition-transform duration-700 group-hover:scale-[1.025]"><RoleGraphic index={index} compact /></div>
          <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1.5 font-mono text-[10px] font-bold backdrop-blur">0{index + 1}</span>
          <span className="absolute bottom-5 left-5 rounded-full bg-[#4f95e8] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.12em] text-[#101116]">{role.discipline}</span>
        </div>
        <div className="p-6 md:p-7">
          <h3 className="max-w-sm text-2xl font-semibold leading-tight tracking-[-.025em]">{role.title}</h3>
          <div className="mt-8 flex items-center justify-between border-t border-black/10 pt-5">
            <span className="text-xs font-bold uppercase tracking-[.12em] text-black/45">Explore the role</span>
            <span className="flex size-10 items-center justify-center rounded-full bg-[#101116] text-white transition-transform group-hover:rotate-45"><ArrowUpRight className="size-4" /></span>
          </div>
        </div>
      </button>

      {open && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#101116]/45 p-4 backdrop-blur-sm" onMouseDown={() => setOpen(false)}>
          <section role="dialog" aria-modal="true" aria-labelledby={`role-${index}`} className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[28px] bg-white shadow-2xl" onMouseDown={(event) => event.stopPropagation()}>
            <div className="relative h-52 overflow-hidden md:h-64">
              <RoleGraphic index={index} />
              <span className="absolute bottom-6 left-6 rounded-full bg-[#4f95e8] px-4 py-2 text-xs font-bold uppercase tracking-[.12em] text-[#101116]">{role.discipline}</span>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close role details" className="absolute right-5 top-5 flex size-11 items-center justify-center rounded-full bg-white text-[#101116] shadow-lg"><X className="size-5" /></button>
            </div>
            <div className="p-7 md:p-10">
              <p className="text-xs font-bold uppercase tracking-[.14em] text-[#4f95e8]">AxoCom internship track</p>
              <h3 id={`role-${index}`} className="mt-4 max-w-2xl text-3xl font-semibold leading-tight tracking-[-.035em] md:text-5xl">{role.title}</h3>
              <p className="mt-7 text-base leading-8 text-black/65">{role.description}</p>
              <div className="mt-9 rounded-[22px] bg-[#eef6ff] p-6">
                <h4 className="text-xs font-bold uppercase tracking-[.14em] text-[#4f95e8]">Ideal candidates</h4>
                <p className="axo-serif mt-4 text-xl italic leading-7 text-black/65">{role.idealCandidates}</p>
              </div>
              <a href="https://forms.gle/UHYhSjUmgqnTf4py6" target="_blank" rel="noopener noreferrer" className="group mt-8 inline-flex items-center gap-1 rounded-full bg-[#101116] p-1 pl-6 text-sm font-bold text-white">Apply for this track <span className="flex size-11 items-center justify-center rounded-full bg-[#4f95e8] text-[#101116] transition-transform group-hover:rotate-45"><ArrowUpRight className="size-4" /></span></a>
            </div>
          </section>
        </div>,
        document.body,
      )}
    </>
  );
};

const Careers: React.FC = () => (
  <div className="landing-page min-h-screen w-full bg-white text-[#101116]">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData([organizationSchema, webPageSchema(seo), { '@context': 'https://schema.org', '@type': 'ItemList', name: 'AxoCom Internship Tracks', itemListElement: roles.map((role, index) => ({ '@type': 'ListItem', position: index + 1, name: role.title })) }]) }} />
    <Navbar />

    <main>
      <section className="relative min-h-[92svh] overflow-hidden bg-white pb-16 pt-32">
        <div className="landing-shell relative z-10 grid min-h-[calc(92svh-12rem)] grid-cols-1 items-center gap-14 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <Reveal><p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[.14em] text-[#4f95e8]"><span className="size-2 rounded-full bg-[#4f95e8]" />Internships at AxoCom</p></Reveal>
            <Reveal delay={70}><h1 className="mt-8 max-w-4xl text-[clamp(3.6rem,7vw,7.2rem)] font-semibold leading-[.92] tracking-[-.055em]">Don&apos;t watch the future of media. <span className="axo-serif italic text-[#4f95e8]">Help build it.</span></h1></Reveal>
            <Reveal delay={140}><p className="mt-9 max-w-xl text-lg leading-8 text-black/62">Learn from journalists, engineers, PR experts and creative directors. Build real campaigns. Use real AI tools. Make work that enters the world.</p></Reveal>
            <Reveal delay={210}><a href="https://forms.gle/UHYhSjUmgqnTf4py6" target="_blank" rel="noopener noreferrer" className="group mt-10 inline-flex items-center gap-1 rounded-full bg-[#101116] p-1 pl-6 text-sm font-bold text-white">Apply now <span className="flex size-11 items-center justify-center rounded-full bg-[#4f95e8] text-[#101116] transition-transform group-hover:rotate-45"><ArrowUpRight className="size-4" /></span></a></Reveal>
          </div>

          <Reveal className="relative min-h-[560px]" delay={120}>
            <div className="absolute inset-0 overflow-hidden rounded-[36px] bg-[#101116] p-7 text-white shadow-[0_30px_80px_-52px_rgba(16,17,22,.75)] md:p-9">
              <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:40px_40px]" />
              <div className="relative flex items-start justify-between">
                <div><p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#4f95e8]">Your first 90 days</p><h2 className="axo-serif mt-2 text-3xl italic">From learning to influence.</h2></div>
                <span className="font-mono text-xs text-white/35">AXO / 01</span>
              </div>

              <div className="absolute bottom-10 left-10 top-32 w-px bg-white/15">
                <span className="axo-career-progress absolute -left-1 size-2 rounded-full bg-[#4f95e8] shadow-[0_0_0_7px_rgba(79,149,232,.12)]" />
              </div>

              <div className="relative mt-12 space-y-4 pl-8">
                <div className="w-[88%] -rotate-1 rounded-[20px] bg-[#eaf4ff] p-5 text-[#101116] shadow-xl transition-transform hover:rotate-0">
                  <div className="flex items-center justify-between"><span className="font-mono text-[10px] text-[#4f95e8]">01 / LEARN</span><BrainCircuit className="size-5 text-[#4f95e8]" /></div>
                  <p className="mt-4 font-semibold">Decode the strategy behind live campaigns.</p>
                </div>
                <div className="ml-auto w-[88%] rotate-1 rounded-[20px] bg-white p-5 text-[#101116] shadow-xl transition-transform hover:rotate-0">
                  <div className="flex items-center justify-between"><span className="font-mono text-[10px] text-[#4f95e8]">02 / MAKE</span><Sparkles className="size-5 text-[#4f95e8]" /></div>
                  <p className="mt-4 font-semibold">Build work that enters the real world.</p>
                </div>
                <div className="w-[88%] -rotate-1 rounded-[20px] bg-[#4f95e8] p-5 text-[#101116] shadow-xl transition-transform hover:rotate-0">
                  <div className="flex items-center justify-between"><span className="font-mono text-[10px]">03 / INFLUENCE</span><BriefcaseBusiness className="size-5" /></div>
                  <p className="mt-4 font-semibold">Own outcomes alongside the team.</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#f4f6fa] py-24 md:py-36">
        <div className="landing-shell">
          <Reveal><div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_420px] lg:items-end"><div><p className="text-xs font-bold uppercase tracking-[.14em] text-[#4f95e8]">Find your path</p><h2 className="mt-7 text-[clamp(3rem,6vw,6.2rem)] font-semibold leading-[.98] tracking-[-.045em]">Three ways to enter <span className="axo-serif italic text-[#4f95e8]">the work.</span></h2></div><p className="text-lg leading-8 text-black/60">Choose the track that matches how you think, create or lead. Every role works on live AxoCom projects.</p></div></Reveal>
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">{roles.map((role, index) => <Reveal key={role.title} delay={index * 70}><RoleCard role={role} index={index} /></Reveal>)}</div>
          <p className="mt-8 text-center text-sm text-black/45">Select a role to view responsibilities and the ideal candidate profile.</p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-24 md:py-36">
        <div className="axo-signal-path pointer-events-none -bottom-[52vh] -left-[18vw] h-[80vh] w-[62vw] rotate-[14deg]" />
        <div className="landing-shell relative z-10 grid grid-cols-1 gap-16 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <Reveal><div><p className="text-xs font-bold uppercase tracking-[.14em] text-[#4f95e8]">Ready to shape the future?</p><h2 className="mt-7 max-w-4xl text-[clamp(3rem,6vw,6.2rem)] font-semibold leading-[.98] tracking-[-.045em]">Bring your curiosity. Leave with <span className="axo-serif italic text-[#4f95e8]">work that matters.</span></h2><p className="mt-8 max-w-xl text-lg leading-8 text-black/60">Submit your application and join a team redefining media, technology and communication.</p><a href="https://forms.gle/UHYhSjUmgqnTf4py6" target="_blank" rel="noopener noreferrer" className="group mt-9 inline-flex items-center gap-1 rounded-full bg-[#101116] p-1 pl-6 text-sm font-bold text-white">Start your application <span className="flex size-11 items-center justify-center rounded-full bg-[#4f95e8] text-[#101116] transition-transform group-hover:rotate-45"><ArrowUpRight className="size-4" /></span></a></div></Reveal>
          <Reveal delay={100}><div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1"><div className="rounded-[22px] bg-[#eef6ff] p-6"><BrainCircuit className="size-6 text-[#4f95e8]"/><h3 className="mt-5 font-semibold">Real AI tools</h3><p className="mt-2 text-sm text-black/50">Learn through working systems, not exercises.</p></div><div className="rounded-[22px] bg-[#eef6ff] p-6"><BriefcaseBusiness className="size-6 text-[#4f95e8]"/><h3 className="mt-5 font-semibold">Real campaigns</h3><p className="mt-2 text-sm text-black/50">Contribute to active client and media work.</p></div><div className="rounded-[22px] bg-[#eef6ff] p-6"><Sparkles className="size-6 text-[#4f95e8]"/><h3 className="mt-5 font-semibold">Real mentorship</h3><p className="mt-2 text-sm text-black/50">Work with specialists across disciplines.</p></div></div></Reveal>
        </div>
      </section>
    </main>

    <footer className="bg-[#101116] py-12 text-white">
      <div className="landing-shell grid grid-cols-1 gap-10 md:grid-cols-[1fr_auto] md:items-end"><div><img src="/images/logo2.png" alt="AxoCom" className="h-10 w-auto brightness-0 invert"/><p className="mt-3 text-[10px] font-bold uppercase tracking-[.14em] text-white/40">Axolotl Emprise LLP</p></div><div className="flex gap-5"><a href="https://www.youtube.com/@AxoComTechXMedia" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><Youtube className="size-5"/></a><a href="https://www.instagram.com/axocommedia/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram className="size-5"/></a><a href="https://www.linkedin.com/company/axocom-tech-x-media/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin className="size-5"/></a></div></div>
      <div className="landing-shell mt-9 border-t border-white/10 pt-5 text-xs text-white/30">© 2026 AxoCom. All rights reserved.</div>
    </footer>
  </div>
);

export default Careers;
