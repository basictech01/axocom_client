import React from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { Reveal } from './Reveal';

interface Chapter6Props { onPrev: () => void; onNext: () => void; }
const leaders = [
  { name: 'Basant Rawat', discipline: 'Media', role: 'Media Strategy, Political Communication, Editorial Excellence', description: 'A respected figure in Indian new media with four decades of experience, ex-Senior Journalist at The Telegraph and political commentator.', image: '/images/basantrawat.png' },
  { name: 'Parantap Bhatt', discipline: 'Creative', role: 'Creative Direction, Brand Building, Advertising Strategy', description: 'Associate Creative Director at Sideways, who has crafted brand and communication strategies for major clients like Pidilite, Sleepwell, and Borosil.', image: '/images/paramtapbhatt.png' },
  { name: 'Pranav Pandey', discipline: 'Technology', role: 'AI/ML Engineering, Data Systems, Technical Innovation', description: 'Senior Software Engineer at LinkedIn, specializing in the technical architecture and development of AI and data-driven systems.', image: '/images/pranavpandey.png' },
];

const Chapter6: React.FC<Chapter6Props> = ({ onPrev, onNext }) => (
  <div className="bg-[#f3f3f1] py-24 text-[#101116] md:py-36">
    <div className="landing-shell">
      <Reveal>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_440px] lg:items-end">
          <div><p className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold"><span className="size-1.5 rounded-full bg-[#4f95e8]" />The collective</p><h2 className="mt-8 text-[clamp(3rem,5.6vw,5.8rem)] font-semibold leading-[.98] tracking-[-.045em]">Three disciplines.<br/><span className="axo-serif italic">One point of view.</span></h2></div>
          <p className="text-lg leading-8 text-black/62">Meet the visionaries who ignited the spark and continue to fuel innovation at AxoCom. Each a master in their field; together, the core of our narrative.</p>
        </div>
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
        {leaders.map((leader, index) => <Reveal key={leader.name} delay={index * 70}><article className="overflow-hidden rounded-[22px] bg-white shadow-[0_20px_50px_-42px_rgba(0,0,0,.5)]"><div className="aspect-[4/4.5] overflow-hidden bg-[#ddd]"><img src={leader.image} alt={`Portrait of ${leader.name}`} className="h-full w-full object-cover object-top transition-transform duration-700 hover:scale-[1.03]" /></div><div className="p-6"><p className="text-[10px] font-bold uppercase tracking-[.14em] text-[#4f95e8]">{leader.discipline}</p><h3 className="mt-2 text-2xl font-semibold">{leader.name}</h3><p className="mt-3 text-[10px] font-bold uppercase leading-5 tracking-[.08em] text-black/45">{leader.role}</p><p className="mt-5 text-sm leading-7 text-black/60">{leader.description}</p></div></article></Reveal>)}
      </div>

      <div className="mt-12 flex justify-end gap-3"><button type="button" onClick={onPrev} aria-label="Back to why AxoCom" className="flex size-11 items-center justify-center rounded-full bg-white"><ArrowUp className="size-4" /></button><button type="button" onClick={onNext} aria-label="Continue to contact AxoCom" className="flex size-11 items-center justify-center rounded-full bg-[#101116] text-white"><ArrowDown className="size-4" /></button></div>
    </div>
  </div>
);

export default Chapter6;
