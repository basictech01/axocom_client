import React from 'react';
import { ArrowDown, BrainCircuit, Database, GitBranch, PanelsTopLeft, Share2 } from 'lucide-react';
import { Reveal } from './Reveal';

interface Chapter3Props { onNext: () => void; }

const pipeline = [
  { icon: Database, title: 'Signals In', description: 'News feeds, social signals and real-time data streams.', offset: 'lg:translate-y-10' },
  { icon: GitBranch, title: 'Intelligent Pipelines', description: 'Processing, tagging, clustering and enrichment.', offset: 'lg:-translate-y-8' },
  { icon: Share2, title: 'Knowledge Graph', description: 'Entity relationships, context maps and ontologies.', offset: 'lg:translate-y-4' },
  { icon: BrainCircuit, title: 'AI Engines', description: 'Sentiment analysis, creative generation and natural language processing.', offset: 'lg:-translate-y-10' },
  { icon: PanelsTopLeft, title: 'Narratives Out', description: 'Assets, dashboards, campaigns and narratives.', offset: 'lg:translate-y-8' },
];

const Chapter3: React.FC<Chapter3Props> = ({ onNext }) => (
  <div className="axo-ai-field relative overflow-hidden py-24 text-[#101116] md:py-36">
    <div className="axo-ai-glow left-[-8%] top-[12%] size-[340px]" />
    <div className="axo-ai-glow bottom-[4%] right-[-5%] size-[420px]" />
    <span className="axo-ai-dot left-[8%] top-[30%]" />
    <span className="axo-ai-dot right-[12%] top-[19%] [animation-delay:-1.4s]" />
    <span className="axo-ai-dot bottom-[18%] left-[34%] [animation-delay:-2.5s]" />
    <span className="axo-ai-dot bottom-[30%] right-[31%] [animation-delay:-.7s]" />

    <div className="landing-shell relative">
      <Reveal>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_480px] lg:items-end">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-[#4f95e8]/15 bg-white/65 px-4 py-2 text-xs font-bold shadow-[0_14px_35px_-24px_rgba(79,149,232,.35)] backdrop-blur">
              <span className="size-1.5 rounded-full bg-[#4f95e8]" />The AI Core
            </p>
            <h2 className="mt-8 max-w-2xl text-[clamp(2.9rem,5.5vw,5.7rem)] font-semibold leading-[.98] tracking-[-.045em]">
              Intelligence that turns <span className="axo-serif italic text-[#4f95e8]">signals into stories.</span>
            </h2>
          </div>
          <div>
            <p className="axo-serif text-2xl italic leading-8 text-[#101116]/65">Our proprietary engine connects data, context, creativity and distribution—so every narrative begins with insight and ends with action.</p>
            <button type="button" onClick={onNext} className="group mt-8 flex items-center gap-1 rounded-full bg-[#101116] p-1 pl-6 text-sm font-bold text-white">
              See where stories live
              <span className="flex size-11 items-center justify-center rounded-full bg-[#4f95e8] transition-transform group-hover:translate-y-1"><ArrowDown className="size-4" /></span>
            </button>
          </div>
        </div>
      </Reveal>

      <Reveal delay={100}>
        <div className="relative mt-24 lg:pb-12 lg:pt-12">
          <div className="axo-ai-line hidden lg:block" />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-3">
            {pipeline.map((step, index) => {
              const Icon = step.icon;
              return (
                <article key={step.title} className={`group relative z-10 min-h-[285px] rounded-[26px] border border-white/80 bg-white/62 p-6 shadow-[0_24px_60px_-42px_rgba(79,149,232,.5)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:bg-white/88 ${step.offset}`}>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-[#4f95e8]">0{index + 1}</span>
                    <span className="flex size-11 items-center justify-center rounded-full border border-[#4f95e8]/20 bg-[#eef7ff] text-[#4f95e8] transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110"><Icon className="size-5" strokeWidth={1.5} /></span>
                  </div>
                  <h3 className="mt-12 text-xl font-semibold leading-tight">{step.title}</h3>
                  <p className="axo-serif mt-4 text-lg italic leading-6 text-[#101116]/58">{step.description}</p>
                  {index < pipeline.length - 1 && <span className="absolute -right-2 top-1/2 hidden size-4 rounded-full border-4 border-[#edf6ff] bg-[#4f95e8] lg:block" />}
                </article>
              );
            })}
          </div>
        </div>
      </Reveal>

      <Reveal delay={160}>
        <div className="mt-16 flex flex-col gap-5 border-t border-[#4f95e8]/12 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-bold uppercase tracking-[.12em] text-[#4f95e8]">Signal → Context → Intelligence → Narrative → Distribution</p>
          <p className="text-sm text-black/45">One connected workflow. Clearer decisions at every stage.</p>
        </div>
      </Reveal>
    </div>
  </div>
);

export default Chapter3;
