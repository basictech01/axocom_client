import React, { useEffect, useRef } from 'react';

interface Chapter1Props {
  onNext: () => void;
}

const Chapter1: React.FC<Chapter1Props> = ({ onNext }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    // Horizontal data-stream lines moving left → right, representing media flow
    const LINE_COUNT = 18;
    interface Stream {
      y: number;
      segments: { x: number; len: number; speed: number; alpha: number }[];
    }

    const streams: Stream[] = Array.from({ length: LINE_COUNT }, (_, i) => ({
      y: (canvas.height / LINE_COUNT) * i + (canvas.height / LINE_COUNT) * 0.5,
      segments: Array.from({ length: Math.floor(Math.random() * 3) + 2 }, () => ({
        x: Math.random() * canvas.width,
        len: 40 + Math.random() * 120,
        speed: 0.3 + Math.random() * 0.5,
        alpha: 0.18 + Math.random() * 0.18,
      })),
    }));

    const PRIMARY = '79, 70, 229';

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      streams.forEach(stream => {
        stream.segments.forEach(seg => {
          // Gradient trail
          const grad = ctx.createLinearGradient(seg.x, 0, seg.x + seg.len, 0);
          grad.addColorStop(0, `rgba(${PRIMARY}, 0)`);
          grad.addColorStop(0.4, `rgba(${PRIMARY}, ${seg.alpha})`);
          grad.addColorStop(1, `rgba(${PRIMARY}, 0)`);
          ctx.beginPath();
          ctx.moveTo(seg.x, stream.y);
          ctx.lineTo(seg.x + seg.len, stream.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Leading dot
          ctx.beginPath();
          ctx.arc(seg.x + seg.len, stream.y, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${PRIMARY}, ${seg.alpha * 3.5})`;
          ctx.fill();

          seg.x += seg.speed;
          if (seg.x > W) seg.x = -seg.len - Math.random() * 200;
        });
      });

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
    <div className="relative flex min-h-screen w-full flex-col items-center bg-white pt-24 pb-8 px-4 text-gray-900 font-work">
      {/* Animated data-stream canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Subtle center glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 45%, rgba(79,70,229,0.05) 0%, transparent 70%)' }} />
      
      {/* Main Content Area - Flex Grow to push button down */}
      <div className="flex-grow flex flex-col justify-center items-center z-10 w-full max-w-6xl text-center gap-8 md:gap-12">
        <div className="flex flex-col gap-6 animate-fade-in-up items-center">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-work font-black leading-tight tracking-tighter uppercase text-gray-900">
             Our Story
          </h1>
          <div className="h-1 w-32 bg-primary mx-auto"></div>
          <h2 className="text-lg md:text-2xl font-medium leading-relaxed text-gray-700 max-w-4xl mx-auto">
            AxoCom is not just a media company. We are a <span className="text-primary-accent font-bold rounded">Tech-First Media Company</span> building the future of communication.
          </h2>
          <p className="text-sm md:text-base font-light leading-relaxed text-gray-500 max-w-3xl mx-auto">
            We are the intersection of media and deep technology. AxoCom is where journalists, engineers, creators, strategists, lawyers, and researchers unite to reimagine how stories are built, spread, and scaled using The AI Core our proprietary engine powered by advanced data analytics. We are here to engineer the future of how stories are told and consumed.
          </p>
        </div>
      </div>
      
      {/* Footer Navigation Button */}
      <div 
        onClick={onNext}
        className="relative z-10 mt-12 flex items-center gap-3 px-5 py-3 rounded-full bg-gray-100 border border-gray-200 cursor-pointer group hover:bg-primary hover:border-primary transition-all duration-300 shadow-sm"
      >
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500 group-hover:text-white transition-colors">Scroll to Continue</span>
        <span className="material-symbols-outlined text-sm text-gray-400 group-hover:text-white transition-colors animate-bounce">expand_more</span>
      </div>
    </div>
  );
};

export default Chapter1;