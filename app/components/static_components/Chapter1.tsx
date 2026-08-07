import React from 'react';
import { ArrowDown } from 'lucide-react';
import { Reveal } from './Reveal';

interface Chapter1Props { onNext: () => void; }
const disciplines = ['Journalists', 'Engineers', 'Creators', 'Strategists', 'Lawyers', 'Researchers'];

const Chapter1: React.FC<Chapter1Props> = ({ onNext }) => (
  <div className="relative overflow-hidden bg-[#f4f6fa] py-24 text-[#101116] md:py-36">
    <div className="absolute left-[8%] right-[8%] top-1/2 hidden h-px bg-[#4f95e8]/25 lg:block"><span className="axo-signal-dot absolute -top-1 size-2 rounded-full bg-[#4f95e8]" /></div>
    <div className="landing-shell relative">
      <Reveal>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[220px_1fr]">
          <div><p className="text-xs font-bold uppercase tracking-[.14em] text-[#4f95e8]">Our story</p><p className="axo-serif mt-8 max-w-[12rem] text-2xl italic leading-7 text-black/55">Media, rebuilt from the inside out.</p></div>
          <h2 className="max-w-5xl text-[clamp(3rem,6vw,6.2rem)] font-semibold leading-[.98] tracking-[-.045em]">Not just a media company. A <span className="axo-serif italic text-[#4f95e8]">connected intelligence practice</span> for communication.</h2>
        </div>
      </Reveal>

      <div className="mt-20 grid grid-cols-1 gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
        <Reveal><div className="rounded-[32px] bg-white p-8 shadow-[0_22px_55px_-42px_rgba(79,149,232,.35)] md:p-10"><p className="text-[10px] font-bold uppercase tracking-[.14em] text-[#4f95e8]">Our belief</p><p className="axo-serif mt-8 text-3xl italic leading-9">Stories travel further when editorial judgment, cultural instinct and technology share the same room.</p></div></Reveal>
        <Reveal delay={80}><div><p className="text-lg leading-9 text-black/65">AxoCom is where journalists, engineers, creators, strategists, lawyers and researchers unite to reimagine how stories are built, spread and scaled using The AI Core—our proprietary engine powered by advanced data analytics.</p><div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">{disciplines.map((discipline,index)=><div key={discipline} className="flex items-center gap-3 rounded-full border border-[#4f95e8]/15 bg-white px-4 py-3 text-sm font-semibold"><span className="size-2 rounded-full bg-[#4f95e8]" />{discipline}</div>)}</div><button type="button" onClick={onNext} className="group mt-10 flex items-center gap-1 rounded-full bg-[#101116] p-1 pl-6 text-sm font-bold text-white">Explore our practice <span className="flex size-11 items-center justify-center rounded-full bg-[#4f95e8] transition-transform group-hover:translate-y-1"><ArrowDown className="size-4" /></span></button></div></Reveal>
      </div>
    </div>
  </div>
);

export default Chapter1;
