import React from 'react';
import { ArrowUpRight, BarChart3, Compass, Megaphone, Network, PenTool, Rocket, Sparkles, Users } from 'lucide-react';
import { Reveal } from './Reveal';

const groups = [
  { name: 'Think', intro: 'Define the story and understand the audience.', services: [{icon:Compass,title:'Strategy'},{icon:BarChart3,title:'Data Insights'}] },
  { name: 'Build', intro: 'Turn intelligence into systems, language and content.', services: [{icon:Network,title:'Knowledge Graphs'},{icon:Sparkles,title:'AI-Generated Content'}] },
  { name: 'Engage', intro: 'Create conversation across public and social channels.', services: [{icon:Users,title:'Social Media Management'},{icon:Megaphone,title:'Public Relations'}] },
  { name: 'Scale', intro: 'Build durable brands and coordinated campaigns.', services: [{icon:PenTool,title:'Brand Building'},{icon:Rocket,title:'Campaign Management'}] },
];

const Chapter2: React.FC = () => (
  <div className="bg-white py-24 text-[#101116] md:py-36">
    <div className="landing-shell">
      <Reveal>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_440px] lg:items-end"><div><p className="text-xs font-bold uppercase tracking-[.14em] text-[#4f95e8]">Connected capabilities</p><h2 className="mt-7 text-[clamp(3rem,6vw,6.2rem)] font-semibold leading-[.98] tracking-[-.045em]">Think. Build.<br/><span className="axo-serif italic text-[#4f95e8]">Engage. Scale.</span></h2></div><div><p className="text-lg leading-8 text-black/62">Strategy, creative and technology working as one system—from the first signal to the final campaign.</p><a href="#capability-matrix" className="group mt-8 inline-flex items-center gap-1 rounded-full bg-[#101116] p-1 pl-6 text-sm font-bold text-white">See the system <span className="flex size-11 items-center justify-center rounded-full bg-[#4f95e8] transition-transform group-hover:rotate-45"><ArrowUpRight className="size-4" /></span></a></div></div>
      </Reveal>

      <div id="capability-matrix" className="relative mt-20 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="pointer-events-none absolute left-1/2 top-1/2 hidden size-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#4f95e8] text-center text-[10px] font-bold uppercase tracking-[.1em] text-white shadow-xl md:flex">AXO<br/>CORE</div>
        {groups.map((group,index)=><Reveal key={group.name} delay={index*60}><article className={`min-h-[310px] rounded-[28px] border border-[#4f95e8]/12 p-7 md:p-9 ${index===1||index===2?'bg-[#f4f6fa]':'bg-white shadow-[0_20px_55px_-45px_rgba(79,149,232,.4)]'}`}><div className="flex items-center justify-between"><span className="font-mono text-xs text-[#4f95e8]">0{index+1}</span><span className="h-px w-16 bg-[#4f95e8]/25" /></div><h3 className="axo-serif mt-8 text-4xl italic">{group.name}</h3><p className="mt-3 text-sm leading-6 text-black/52">{group.intro}</p><div className="mt-9 grid gap-3 sm:grid-cols-2">{group.services.map(service=>{const Icon=service.icon;return <div key={service.title} className="flex items-center gap-3 rounded-full bg-white px-4 py-3 text-sm font-semibold shadow-sm"><Icon className="size-4 text-[#4f95e8]" />{service.title}</div>})}</div></article></Reveal>)}
      </div>
    </div>
  </div>
);

export default Chapter2;
