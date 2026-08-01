import { motion, useReducedMotion } from "framer-motion";
import { Link } from "~/features/hackathon/lib/router";
import { ArrowRight, Lightbulb, Rocket, Users, Route } from "lucide-react";
import { useScrollReveal } from "~/features/hackathon/hooks/useScrollReveal";
import { WHAT_UKIS } from "./data";

const icons = [Lightbulb, Rocket, Users, Route];

export default function HomeWhatIs() {
  const { ref, isInView } = useScrollReveal();
  const reduceMotion = useReducedMotion();

  return (
    <section className="ukis-section relative overflow-hidden" ref={ref}>
      <div className="ukis-contour opacity-[0.06]" />
      <div className="ukis-jaali" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <motion.div
            className="lg:col-span-5"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <p className="ukis-eyebrow mb-4">{WHAT_UKIS.eyebrow}</p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-[2.75rem] leading-tight text-foreground mb-6">
              What <span className="ukis-accent-word">UKIS</span> Is
            </h2>
            {WHAT_UKIS.body.map((para) => (
              <p key={para} className="text-base text-muted-foreground leading-relaxed mb-4 max-w-md">
                {para}
              </p>
            ))}
            <Link href="/problems" className="inline-flex items-center gap-2 text-primary font-medium text-sm mt-2 hover:underline">
              Explore problem statements
              <ArrowRight className="w-4 h-4" aria-hidden />
            </Link>
          </motion.div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-px bg-border border border-border rounded-xl overflow-hidden">
            {WHAT_UKIS.principles.map((item, i) => {
              const Icon = icons[i];
              return (
                <motion.div
                  key={item.title}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.4 }}
                  className="bg-surface p-6 sm:p-7"
                >
                  <Icon className="w-5 h-5 text-primary mb-4" aria-hidden strokeWidth={1.5} />
                  <h3 className="font-display font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
