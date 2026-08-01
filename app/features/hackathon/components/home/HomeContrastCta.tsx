import { motion, useReducedMotion } from "framer-motion";
import { Link } from "~/features/hackathon/lib/router";
import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "~/features/hackathon/hooks/useScrollReveal";
import { CONTRAST_CTA, PHASES } from "./data";

/** Contrasting light panel — primary conversion moment */
export default function HomeContrastCta() {
  const { ref, isInView } = useScrollReveal();
  const reduceMotion = useReducedMotion();
  const livePhase = PHASES[0];

  return (
    <section className="ukis-section" ref={ref}>
      <div className="container">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl border border-[#CBD6E2] px-6 py-14 sm:px-12 sm:py-16 text-center"
          style={{
            background: "#F6F8FB",
            color: "#10213A",
          }}
        >
          <div className="ukis-contour !opacity-[0.08]" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <p
              className="font-mono text-[0.7rem] uppercase tracking-[0.16em] font-medium mb-4"
              style={{ color: "#0058D4" }}
            >
              {CONTRAST_CTA.eyebrow}
            </p>
            <h2
              className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-5"
              style={{ color: "#10213A" }}
            >
              {CONTRAST_CTA.title}
            </h2>
            <p className="text-base sm:text-lg leading-relaxed mb-3" style={{ color: "#526174" }}>
              {CONTRAST_CTA.body}
            </p>
            <p className="text-sm mb-8" style={{ color: "#526174" }}>
              {livePhase.phase}: {livePhase.title} · {livePhase.dateLabel}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/register/solution">
                <span
                  className="inline-flex items-center gap-2 px-7 py-3.5 font-semibold text-sm rounded-lg min-h-11 transition-colors"
                  style={{ background: "#0058D4", color: "#FFFFFF" }}
                >
                  Register Now
                  <ArrowRight className="w-4 h-4" aria-hidden />
                </span>
              </Link>
              <Link href="/problems">
                <span
                  className="inline-flex items-center gap-2 px-7 py-3.5 font-semibold text-sm rounded-lg border min-h-11 transition-colors"
                  style={{ borderColor: "#CBD6E2", color: "#10213A", background: "#FFFFFF" }}
                >
                  Explore Problems
                </span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
