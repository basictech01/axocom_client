import React, { useEffect, useRef } from 'react';

interface Chapter6Props {
  onPrev: () => void;
  onNext: () => void;
}

const Chapter6: React.FC<Chapter6Props> = ({ onPrev, onNext }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const SPACING = 36;
    const PRIMARY = '79, 70, 229';

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const cols = Math.ceil(W / SPACING) + 1;
      const rows = Math.ceil(H / SPACING) + 1;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * SPACING;
          const y = r * SPACING;

          // Wave displacement
          const wave = Math.sin(t * 0.8 + c * 0.4 + r * 0.3) * 0.5 +
            Math.sin(t * 0.5 + c * 0.2 - r * 0.5) * 0.5;
          const norm = (wave + 1) / 2; // 0..1

          const alpha = 0.08 + norm * 0.2;
          const radius = 1.2 + norm * 1.4;

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${PRIMARY}, ${alpha})`;
          ctx.fill();
        }
      }

      t += 0.018;
      animId = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-start bg-white font-space relative pt-24 pb-6">
      {/* Animated dot-grid canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Soft center glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(79,70,229,0.05) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center flex flex-col items-center">
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-work font-black leading-tight tracking-tighter uppercase text-gray-900">
          Why Us
        </h2>

        <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>

        <p className="text-base md:text-xl text-gray-600 font-light leading-relaxed mb-8 md:mb-12 max-w-4xl">
          In an industry defined by disruption, AxoCom delivers more than content. We provide a competitive, future-proof approach to communication built on engineering and insight.
        </p>

        {/* Three Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full mb-12">
          {/* Card 1 */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 md:p-8 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 text-left group">
            <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-xl mb-4 md:mb-6 group-hover:bg-primary/20 transition-all">
              <span className="material-symbols-outlined text-primary text-3xl md:text-4xl">psychology</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">The Power of the AI Core</h3>
            <p className="text-gray-500 leading-relaxed text-sm md:text-base">
              While others integrate third-party tools, we own the technology that drives our narratives. Our proprietary AI Core is not an add-on. It is the engine that generates, refines, and distributes our content at scale. This provides an unmatched speed-to-market advantage and ensures our media entities remain at the technological forefront. We don't adapt to the AI revolution. We architect it.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 md:p-8 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 text-left group">
            <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-xl mb-4 md:mb-6 group-hover:bg-primary/20 transition-all">
              <span className="material-symbols-outlined text-primary text-3xl md:text-4xl">diversity_3</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Deep Tech Meets Deep Stories</h3>
            <p className="text-gray-500 leading-relaxed text-sm md:text-base">
              We eliminate the traditional gap between creative vision and technological execution. Our strength lies in our unified team: a diverse collection of journalists, engineers, strategists, and researchers who collaborate to solve complex communication problems. This integrated, high-caliber talent pool guarantees media that is both creatively compelling and technically resilient.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 md:p-8 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 text-left group">
            <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-xl mb-4 md:mb-6 group-hover:bg-primary/20 transition-all">
              <span className="material-symbols-outlined text-primary text-3xl md:text-4xl">insights</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Data-Driven, Future-Proof Scale</h3>
            <p className="text-gray-500 leading-relaxed text-sm md:text-base">
              We don't rely on guesswork. Every strategy is informed by advanced data pipelines and deep analytics, providing high-fidelity audience insights and continuous research. This AI-first, data-backed approach allows us to scale our media universe efficiently and intelligently, ensuring that our content remains relevant and impactful, no matter how fast the media landscape evolves.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chapter6;