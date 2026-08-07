import React from 'react';
import { ArrowUpRight, Instagram, Linkedin, Phone, Youtube } from 'lucide-react';
import { Link } from 'react-router';
import { Reveal } from './Reveal';

const prompts = ['Transform a brand narrative', 'Build cutting-edge media tech', 'Shape the future of communication'];
const mailto = 'mailto:pranav.pandey@axocom.in?subject=Collaboration%20Inquiry%20-%20AxoCom&body=Hello%20AxoCom%20Team%2C%0D%0A%0D%0AI%20am%20interested%20in%20collaborating%20with%20AxoCom.%0D%0A%0D%0AName%3A%20%0D%0AOrganization%2FCompany%3A%20%0D%0AEmail%3A%20%0D%0APhone%3A%20%0D%0A%0D%0ACollaboration%20Interest%3A%0D%0A%5BPlease%20describe%20your%20collaboration%20idea%20or%20inquiry%5D%0D%0A%0D%0ABest%20regards';

const Finale: React.FC = () => (
  <div className="bg-white text-[#101116]">
    <div className="landing-shell py-24 md:py-36">
      <Reveal>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
          <div><p className="inline-flex items-center gap-2 rounded-full bg-[#f1f0ec] px-4 py-2 text-xs font-bold"><span className="size-1.5 rounded-full bg-[#4f95e8]" />Stay connected</p><h2 className="mt-9 text-[clamp(3.2rem,6vw,6.2rem)] font-semibold leading-[.96] tracking-[-.045em]">Let&apos;s build the future of <span className="axo-serif italic">media together.</span></h2><p className="mt-7 max-w-xl text-lg leading-8 text-black/60">Where campaigns meet code. Bring us the narrative, technology or communication challenge that deserves a sharper answer.</p><div className="mt-10 flex flex-col gap-3 sm:flex-row"><a href={mailto} className="group flex items-center gap-1 rounded-full bg-[#101116] p-1 pl-6 text-sm font-bold text-white">Send the brief <span className="flex size-11 items-center justify-center rounded-full border border-white/20 transition-transform group-hover:rotate-45"><ArrowUpRight className="size-4" /></span></a><Link to="/careers" className="group flex items-center gap-1 rounded-full border border-black/20 p-1 pl-6 text-sm font-bold">Join the team <span className="flex size-11 items-center justify-center rounded-full bg-[#101116] text-white transition-transform group-hover:rotate-45"><ArrowUpRight className="size-4" /></span></Link></div></div>
          <div className="border-t border-black/15 pt-6"><p className="text-xs font-bold">The brief can start with</p><div className="mt-4">{prompts.map((prompt, index) => <div key={prompt} className="grid grid-cols-[28px_1fr] gap-3 border-t border-black/10 py-5"><span className="font-mono text-[10px] text-black/35">0{index + 1}</span><p className="text-lg font-semibold">{prompt}</p></div>)}</div></div>
        </div>
      </Reveal>
    </div>

    <footer className="bg-[#101116] py-12 text-white">
      <div className="landing-shell grid grid-cols-1 gap-10 md:grid-cols-[1fr_auto] md:items-end"><div><img src="/images/logo2.png" alt="AxoCom" className="h-10 w-auto brightness-0 invert" /><p className="mt-3 text-[10px] font-bold uppercase tracking-[.14em] text-white/40">Axolotl Emprise LLP</p><div className="mt-5 flex flex-col gap-2 text-sm text-white/55 sm:flex-row sm:gap-5"><a href="tel:+916399905916" className="flex items-center gap-2"><Phone className="size-3.5" />+91 63999 05916</a><a href="tel:+916399906916" className="flex items-center gap-2"><Phone className="size-3.5" />+91 63999 06916</a></div></div><div className="flex gap-5"><a href="https://www.youtube.com/@AxoComTechXMedia" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><Youtube className="size-5" /></a><a href="https://www.instagram.com/axocommedia" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram className="size-5" /></a><a href="https://www.linkedin.com/company/axocom-tech-x-media/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin className="size-5" /></a></div></div>
      <div className="landing-shell mt-9 border-t border-white/10 pt-5 text-xs text-white/30">© 2026 AxoCom. All rights reserved.</div>
    </footer>
  </div>
);

export default Finale;
