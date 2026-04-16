import React, { useEffect, useRef } from 'react';

interface PrologueProps {
  onNext: () => void;
}

const Prologue: React.FC<PrologueProps> = ({ onNext }) => {
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

    const NODE_COUNT = Math.max(40, Math.floor((canvas.width * canvas.height) / 18000));
    const MAX_DIST = 170;
    const PRIMARY = '79, 70, 229';

    interface Node {
      x: number; y: number;
      vx: number; vy: number;
      r: number; pulse: number; pulseSpeed: number;
    }

    const nodes: Node[] = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.5 + 0.8,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.015 + Math.random() * 0.01,
    }));

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // Connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.14;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(${PRIMARY}, ${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      // Nodes
      nodes.forEach(node => {
        node.pulse += node.pulseSpeed;
        const glow = 0.35 + Math.sin(node.pulse) * 0.15;
        const r = node.r + Math.sin(node.pulse) * 0.4;

        // Soft halo
        const grad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r * 5);
        grad.addColorStop(0, `rgba(${PRIMARY}, ${glow * 0.18})`);
        grad.addColorStop(1, `rgba(${PRIMARY}, 0)`);
        ctx.beginPath();
        ctx.arc(node.x, node.y, r * 5, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${PRIMARY}, ${glow})`;
        ctx.fill();

        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > W) node.vx *= -1;
        if (node.y < 0 || node.y > H) node.vy *= -1;
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
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-white pt-24">
      {/* Animated network canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Subtle radial glow at center */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(79,70,229,0.06) 0%, transparent 70%)' }} />

      <div className="flex flex-col gap-8 items-center justify-center text-center px-6 max-w-5xl z-10 animate-fade-in-up">
        <div className="flex flex-col items-center">
          <h1 className="font-sans text-gray-900 text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-medium leading-none tracking-tight" >
            AxoCom
          </h1>
        </div>

        <div className="h-1 w-24 bg-primary mx-auto rounded-full mt-4"></div>

        <p className="mx-auto max-w-2xl text-base md:text-xl font-light text-gray-600 leading-relaxed">
          <span className="italic">&ldquo;The medium is the message&rdquo;</span> and AI is taking over the pen. AI is reshaping the entire media universe. AxoCom isn't adapting to this future. We're engineering it.
        </p>
      </div>

      <button
        onClick={onNext}
        className="z-10 mt-6 px-8 py-3 sm:px-10 sm:py-4 bg-primary hover:bg-indigo-600 text-white rounded-xl font-semibold text-base sm:text-lg transition-all transform hover:scale-105 shadow-[0_0_30px_5px_rgba(79,70,229,0.3)] ring-1 ring-white/20"
      >
        Begin the Story
      </button>
    </div>
  );
};

export default Prologue;