import { motion, useReducedMotion } from "framer-motion";
import { useScrollReveal } from "~/features/hackathon/hooks/useScrollReveal";
import { PARTNERS } from "./data";

export default function HomePartners() {
  const { ref, isInView } = useScrollReveal(0.2);
  const reduceMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      className="relative z-20 -mt-6 lg:-mt-10 mb-4"
      aria-label="In association with"
    >
      <div className="container">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="rounded-xl bg-surface/95 backdrop-blur-md px-5 py-3.5 sm:px-8 sm:py-4"
        >
          <p className="ukis-eyebrow text-center mb-3">In Association With</p>
          <ul className="mx-auto grid max-w-md grid-cols-1 sm:grid-cols-2 sm:divide-x sm:divide-border/60">
            {PARTNERS.map((partner) => (
              <li
                key={partner.name}
                className="flex flex-col items-center justify-center gap-0.5 px-6 py-1 text-center"
              >
                <span className="font-display font-bold text-xl text-foreground tracking-wide">
                  {partner.name}
                </span>
                <span className="text-xs text-muted-foreground leading-snug max-w-[11rem]">
                  {partner.role}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
