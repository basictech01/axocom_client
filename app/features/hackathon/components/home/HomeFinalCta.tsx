import { motion, useReducedMotion } from "framer-motion";
import { Link } from "~/features/hackathon/lib/router";
import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "~/features/hackathon/hooks/useScrollReveal";
import { FINAL_CTA, FINAL_GOAL, BEYOND } from "./data";

export default function HomeFinalCta() {
  const { ref, isInView } = useScrollReveal();
  const reduceMotion = useReducedMotion();

  return (
    <section className="ukis-section" ref={ref}>
      <div className="container space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45 }}
            className="p-6 sm:p-8 border border-border rounded-xl bg-surface"
          >
            <h3 className="font-display font-semibold text-lg text-foreground mb-3">
              {FINAL_GOAL.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{FINAL_GOAL.body}</p>
          </motion.div>
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.08, duration: 0.45 }}
            className="p-6 sm:p-8 border border-border rounded-xl bg-surface"
          >
            <h3 className="font-display font-semibold text-lg text-foreground mb-3">
              {BEYOND.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{BEYOND.body}</p>
          </motion.div>
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.12, duration: 0.5 }}
          className="final-cta-panel relative overflow-hidden rounded-2xl border border-border min-h-[320px] flex items-end"
        >
          <div className="absolute inset-0">
            <img
              src="/hackathon/logos/prop1.webp"
              alt="UKIS youth audience at a programme presentation"
              className="h-full w-full object-cover"
            />
            <div className="final-cta-scrim absolute inset-0" aria-hidden />
          </div>

          <div className="relative z-10 p-8 sm:p-12 max-w-2xl">
            <p className="ukis-eyebrow final-cta-eyebrow mb-4">Get involved</p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl final-cta-title mb-4 leading-tight">
              {FINAL_CTA.title}
            </h2>
            <p className="text-base final-cta-body leading-relaxed mb-8 max-w-lg">
              {FINAL_CTA.body}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 items-start">
              <Link href="/register/solution">
                <span className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground font-semibold text-sm rounded-lg hover:bg-primary-hover transition-colors min-h-11 shadow-md">
                  Register Now
                  <ArrowRight className="w-4 h-4" aria-hidden />
                </span>
              </Link>
              <Link
                href="/register/mentor"
                className="final-cta-link inline-flex items-center gap-2 px-2 py-3.5 text-sm font-semibold min-h-11"
              >
                Become a mentor
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
