import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from './Reveal';

const reasons = [
  { number: '01', title: 'Own the engine', subtitle: 'The power of the AI Core', text: "While others integrate third-party tools, we own the technology that drives our narratives. The AI Core generates, refines and distributes content at scale—giving our media entities speed, clarity and technological advantage." },
  { number: '02', title: 'Unify the disciplines', subtitle: 'Deep tech meets deep stories', text: 'We close the gap between creative vision and technological execution. Journalists, engineers, strategists and researchers solve communication problems together, producing media that is creatively compelling and technically resilient.' },
  { number: '03', title: 'Scale with evidence', subtitle: 'Data-driven, future-proof growth', text: "We don't rely on guesswork. Every strategy is informed by data pipelines, analytics, audience intelligence and continuous research—allowing our media universe to grow efficiently while staying relevant." },
];

const Chapter5: React.FC = () => (
  <div className="relative overflow-hidden bg-white py-24 text-[#101116] md:py-36">
    <div className="axo-arc pointer-events-none -right-[36vw] top-[5%] size-[62vw] min-h-[640px] min-w-[640px] opacity-90" />
    <div className="landing-shell relative z-10">
      <Reveal>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_430px] lg:items-end">
          <div><p className="inline-flex items-center gap-2 rounded-full bg-[#f1f0ec] px-4 py-2 text-xs font-bold"><span className="size-1.5 rounded-full bg-[#4f95e8]" />The AxoCom difference</p><h2 className="mt-8 max-w-3xl text-[clamp(3.2rem,6vw,6.2rem)] font-semibold leading-[.96] tracking-[-.045em]">A sharper advantage in a world of <span className="axo-serif italic text-[#4f95e8]">constant influence.</span></h2></div>
          <p className="axo-serif text-2xl italic leading-8 text-[#101116]/65">Modern communication needs more than content. It needs an engine, an integrated team and evidence at scale.</p>
        </div>
      </Reveal>

      <div className="mt-24 grid grid-cols-1 gap-12 border-t border-black/15 pt-12 lg:grid-cols-3 lg:gap-10">
        {reasons.map((reason, index) => <Reveal key={reason.title} delay={index * 70}><article><div className="flex items-center justify-between"><span className="font-mono text-xs font-bold text-black/35">{reason.number}</span><span className="flex size-10 items-center justify-center rounded-full bg-[#101116] text-white"><ArrowUpRight className="size-4" /></span></div><h3 className="mt-9 text-3xl font-semibold tracking-[-.03em]">{reason.title}</h3><p className="axo-serif mt-3 text-xl italic text-black/55">{reason.subtitle}</p><p className="mt-6 text-sm leading-7 text-black/62">{reason.text}</p></article></Reveal>)}
      </div>
    </div>
  </div>
);

export default Chapter5;
