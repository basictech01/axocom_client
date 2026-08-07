import React, { useRef } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Reveal } from './Reveal';

const properties = [
  { name:'Hillsquills',type:'Editorial',image:'/images/hillsQuills.jpeg',link:'https://www.hillsquills.com/' },
  { name:'AxoNews',type:'News',image:'/images/axo.jpg',link:'https://www.instagram.com/axonews/' },
  { name:'Lawmedy',type:'Legal Media',image:'/images/lawmeady.png',link:'https://www.youtube.com/@Lawmedy_yt' },
  { name:'Spotlight With Shruti',type:'Culture',image:'/images/sws.jpg',link:'https://www.instagram.com/spotlightwithshruti/' },
  { name:'Uttarakhandi Baudi',type:'Regional Media',image:'/images/ukb.jpeg',link:'https://www.instagram.com/uttarakhandi_baudi/' },
  { name:'Know Your Policy',type:'Public Policy',image:'/images/kyp.png',link:'https://www.instagram.com/kyp_uttarakhand/' },
  { name:'India7Live',type:'Digital News',image:'/images/india7.png',link:'https://india7live.com/' },
  { name:'Tehelka India',type:'News',image:'/images/tehalka.png',link:'https://tehelkaindianews.com/' },
];

const Chapter4: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const move = (direction:number) => trackRef.current?.scrollBy({left:direction*380,behavior:'smooth'});

  return (
    <div className="relative overflow-hidden bg-[#eff7ff] py-24 text-[#101116] md:py-36">
      <div className="axo-signal-path pointer-events-none -right-[22vw] top-[5%] h-[68vh] w-[62vw] rotate-[-14deg]" />
      <div className="landing-shell relative">
        <Reveal>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_430px] lg:items-end">
            <div><p className="text-xs font-bold uppercase tracking-[.14em] text-[#4f95e8]">Owned media network</p><h2 className="mt-7 text-[clamp(3rem,6vw,6.2rem)] font-semibold leading-[.98] tracking-[-.045em]">Our growing<br/><span className="axo-serif italic text-[#4f95e8]">media universe.</span></h2></div>
            <p className="text-lg leading-8 text-black/62">A living distribution ecosystem across news, culture, law, policy, regional identity—and whatever comes next.</p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div ref={trackRef} className="mt-16 flex snap-x gap-5 overflow-x-auto pb-5">
            {properties.map((property,index)=><a key={property.name} href={property.link} target="_blank" rel="noopener noreferrer" className={`group relative h-[420px] shrink-0 snap-start overflow-hidden rounded-[28px] bg-black text-white ${index===0?'w-[78vw] max-w-[680px]':'w-[78vw] max-w-[360px]'}`}><img src={property.image} alt="" className="h-full w-full object-cover opacity-85 transition-transform duration-700 group-hover:scale-105"/><div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent"/><div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-7"><div><p className="text-[10px] font-bold uppercase tracking-[.14em] text-[#c4dffc]">{property.type}</p><h3 className="mt-2 text-2xl font-semibold">{property.name}</h3></div><span className="flex size-10 items-center justify-center rounded-full bg-white text-[#101116]"><ArrowUpRight className="size-4"/></span></div></a>)}
          </div>
          <div className="mt-6 flex items-center justify-between"><div className="flex gap-3"><button type="button" onClick={()=>move(-1)} aria-label="Previous media property" className="flex size-11 items-center justify-center rounded-full bg-white"><ArrowLeft className="size-4"/></button><button type="button" onClick={()=>move(1)} aria-label="Next media property" className="flex size-11 items-center justify-center rounded-full bg-[#4f95e8] text-white"><ArrowRight className="size-4"/></button></div><p className="text-xs font-bold uppercase tracking-[.12em] text-black/40">A network designed to keep growing</p></div>
        </Reveal>
      </div>
    </div>
  );
};

export default Chapter4;
