import React from 'react';
import { ArrowDown } from 'lucide-react';
import { Reveal } from './Reveal';

interface PrologueProps { onNext: () => void; }

const Prologue: React.FC<PrologueProps> = ({ onNext }) => (
  <div className="relative min-h-[100svh] overflow-hidden bg-white pb-14 pt-28 text-[#101116]">
    <div className="axo-signal-path pointer-events-none -right-[12vw] top-[4vh] h-[88vh] w-[62vw] rotate-[-18deg]" />
    <div className="axo-signal-path pointer-events-none -left-[25vw] bottom-[-42vh] h-[86vh] w-[74vw] rotate-[12deg] opacity-70" />
    <div className="pointer-events-none absolute left-1/2 top-20 h-[calc(100%-5rem)] w-px bg-gradient-to-b from-transparent via-[#4f95e8]/15 to-transparent" />

    <div className="landing-shell relative z-10 grid min-h-[calc(100svh-10rem)] grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_.9fr]">
      <div>
        <Reveal>
          <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[.15em] text-[#4f95e8]"><span className="size-2 rounded-full bg-[#4f95e8]" />Independent tech × media company</div>
        </Reveal>
        <Reveal delay={70}>
          <h1 className="mt-8 max-w-[800px] text-[clamp(3.4rem,6.8vw,7.2rem)] font-semibold leading-[.93] tracking-[-.05em]">
            Intelligence gives stories <span className="axo-serif italic text-[#4f95e8]">direction.</span><br />
            Media gives them <span className="axo-serif italic">distance.</span>
          </h1>
        </Reveal>
        <Reveal delay={140}>
          <p className="mt-9 max-w-xl text-base leading-7 text-[#101116]/65">AxoCom brings editorial judgment, brand strategy, owned distribution and proprietary technology into one connected communication practice.</p>
        </Reveal>
        <Reveal delay={210}>
          <button type="button" onClick={onNext} className="group mt-10 flex items-center gap-1 rounded-full bg-[#101116] p-1 pl-6 text-sm font-bold text-white">Follow the signal <span className="flex size-11 items-center justify-center rounded-full bg-[#4f95e8] transition-transform group-hover:translate-y-1"><ArrowDown className="size-4" /></span></button>
        </Reveal>
      </div>

      <div className="relative min-h-[520px] lg:min-h-[650px]">
        <Reveal className="absolute inset-0" delay={100}>
          <div className="relative h-full min-h-[520px] lg:min-h-[650px]">
            <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 w-full -translate-x-1/2 -translate-y-1/2 select-none text-center text-[clamp(4rem,8vw,8rem)] font-black leading-[.78] tracking-[-.06em] text-[#4f95e8]/[.055]">
              NARRATIVE<br />ENGINE
            </div>
            <div className="axo-engine-glow" />
            <div className="axo-engine-ring axo-engine-ring-outer" />
            <div className="axo-engine-ring axo-engine-ring-middle" />
            <div className="axo-engine-ring axo-engine-ring-inner" />

            {[0, 72, 144, 216, 288].map((angle) => (
              <span key={angle} className="axo-engine-line" style={{ transform: `rotate(${angle}deg)` }} />
            ))}

            <div className="axo-engine-core absolute left-1/2 top-1/2 z-20 flex size-36 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-[#4f95e8]/25 bg-white/85 text-center backdrop-blur md:size-44">
              <strong className="axo-serif block max-w-[8rem] text-xl italic leading-5 md:text-2xl">The medium is the message.</strong>
            </div>

            <div className="absolute left-[8%] top-[12%] rounded-full bg-white px-4 py-2 text-xs font-bold shadow-sm">Signal</div>
            <div className="absolute right-[4%] top-[22%] rounded-full bg-white px-4 py-2 text-xs font-bold shadow-sm">Insight</div>
            <div className="absolute right-[3%] bottom-[18%] rounded-full bg-white px-4 py-2 text-xs font-bold shadow-sm">Impact</div>
            <div className="absolute bottom-[8%] left-[22%] rounded-full bg-white px-4 py-2 text-xs font-bold shadow-sm">Media</div>
            <div className="absolute left-[2%] top-[55%] rounded-full bg-[#4f95e8] px-4 py-2 text-xs font-bold text-[#101116] shadow-sm">Story</div>

            <p className="axo-serif absolute bottom-[1%] right-[8%] max-w-[12rem] text-right text-lg italic leading-5 text-black/55">From raw attention to directed influence.</p>
          </div>
        </Reveal>
      </div>
    </div>

    <div className="landing-shell relative z-10 mt-6 grid grid-cols-2 gap-3 border-t border-black/10 pt-5 text-xs font-bold uppercase tracking-[.12em] text-black/45 sm:grid-cols-5"><span>Public Relations</span><span>Brand Building</span><span>Campaigns</span><span>Owned Media</span><span>AI Systems</span></div>
  </div>
);

export default Prologue;
