import React from 'react';

interface Chapter3Props {
  onNext: () => void;
}

const Chapter3: React.FC<Chapter3Props> = ({ onNext }) => {
  const items = [
    { icon: 'hub', title: 'Strategy' },
    { icon: 'monitoring', title: 'Data insights' },
    { icon: 'share', title: 'Knowledge Graphs' },
    { icon: 'auto_awesome', title: 'AI Generated Content' },
    { icon: 'groups', title: 'Social Media Management' },
    { icon: 'campaign', title: 'Public Relation Communication' },
    { icon: 'history_edu', title: 'Brand Building' },
    { icon: 'rocket_launch', title: 'Campaign Management' },
  ];

  return (
    <div className="min-h-screen w-full bg-[#1a2f2b] flex items-center justify-center px-4 pt-24 pb-6 md:px-10 md:pt-24 md:pb-10 font-space overflow-hidden">
      <div className="max-w-[1400px] w-full">

        {/* Split layout: Image left, content right on desktop — stacked on mobile */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-14">

          {/* Image — full natural size */}
          <div className="w-full lg:w-5/12 flex justify-center shrink-0">
            <img
              src="./images/services.png"
              alt="Our Services"
              className="w-full max-w-[500px] h-auto rounded-3xl shadow-2xl shadow-black/40 transition-transform duration-700 hover:scale-[1.02]"
            />
          </div>

          {/* Content */}
          <div className="w-full lg:w-7/12 flex flex-col gap-6 md:gap-8">
            <div>
              <p className="text-emerald-400 text-xs font-semibold uppercase tracking-[0.3em] mb-3">What We Do</p>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-work font-black leading-[0.95] tracking-tighter uppercase text-white">
                Our<br />Services
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className="group flex items-center gap-4 p-4 md:p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-emerald-500/15 hover:border-emerald-400/30 transition-all duration-300 cursor-default"
                >
                  <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl bg-emerald-500/20 group-hover:bg-emerald-500/30 transition-colors shrink-0">
                    <span className="material-symbols-outlined text-emerald-400 text-xl md:text-2xl">{item.icon}</span>
                  </div>
                  <h3 className="text-white/90 text-sm md:text-base font-medium leading-tight">{item.title}</h3>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Chapter3;