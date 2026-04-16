import React from 'react';

const Chapter4: React.FC = () => {
  const pipeline = [
    { icon: 'database', label: 'Inputs', desc: 'News feeds, social signals, real-time data streams', color: 'from-blue-500 to-cyan-400' },
    { icon: 'filter_alt', label: 'Pipelines', desc: 'Processing, tagging, clustering & enrichment', color: 'from-cyan-400 to-indigo-400' },
    { icon: 'share', label: 'Knowledge Graph', desc: 'Entity relationships, context maps & ontologies', color: 'from-indigo-400 to-violet-400' },
    { icon: 'psychology', label: 'AI Engines', desc: 'Sentiment analysis, creative generation & NLP', color: 'from-violet-400 to-purple-400' },
    { icon: 'dashboard', label: 'Outputs', desc: 'Assets, dashboards, campaigns & narratives', color: 'from-purple-400 to-pink-400' },
  ];

  return (
    <div className="min-h-screen w-full bg-[#0c0f1a] flex items-center justify-center px-4 pt-24 pb-6 md:px-10 font-space overflow-hidden relative">
      
      {/* Ambient glow effects */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-violet-600/8 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-5xl w-full flex flex-col items-center gap-8 md:gap-12 relative z-10">
        
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-3">
          <p className="text-indigo-400 text-xs font-semibold uppercase tracking-[0.3em]">Proprietary Technology</p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-work font-black leading-[0.95] tracking-tighter uppercase text-white">
            The AI Core
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-xl leading-relaxed">
            From raw data ingestion to narrative creation. Our end-to-end intelligence engine.
          </p>
        </div>

        {/* Pipeline Flow */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
          {pipeline.map((step, idx) => (
            <div key={idx} className="group relative flex flex-col items-center text-center gap-3 p-5 md:p-6 rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm hover:bg-white/[0.07] hover:border-indigo-400/20 transition-all duration-500 cursor-default">
              
              {/* Step number */}
              <span className="absolute top-3 right-3 text-[10px] font-mono text-white/20 group-hover:text-indigo-400/40 transition-colors">
                0{idx + 1}
              </span>

              {/* Icon with gradient ring */}
              <div className={`flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} p-[1px] group-hover:shadow-lg group-hover:shadow-indigo-500/20 transition-all duration-500`}>
                <div className="flex items-center justify-center w-full h-full rounded-[calc(1rem-1px)] bg-[#0c0f1a]">
                  <span className="material-symbols-outlined text-2xl text-white/80 group-hover:text-white transition-colors">{step.icon}</span>
                </div>
              </div>

              <h3 className="text-white font-semibold text-sm md:text-base leading-tight">{step.label}</h3>
              <p className="text-gray-500 text-xs leading-relaxed group-hover:text-gray-400 transition-colors">{step.desc}</p>

              {/* Connector arrow — hidden on last item and on mobile (stacked) */}
              {idx < pipeline.length - 1 && (
                <span className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 material-symbols-outlined text-white/10 text-lg group-hover:text-indigo-400/30 transition-colors">
                  chevron_right
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Bottom accent bar */}
        <div className="flex items-center gap-3 text-gray-500 text-xs">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"></div>
          <span className="uppercase tracking-[0.2em] font-mono">Data In → Intelligence Out</span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"></div>
        </div>

      </div>
    </div>
  );
};

export default Chapter4;