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
          className="rounded-xl border border-border bg-surface/95 backdrop-blur-md px-5 py-5 sm:px-8 sm:py-6"
        >
          <p className="ukis-eyebrow text-center mb-5">In Association With</p>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {PARTNERS.map((partner) => (
              <li
                key={partner.abbr}
                className="flex flex-col items-center justify-center gap-1 py-3 border border-dashed border-border rounded-lg bg-surface-subtle/40"
              >
                {/* Logo placeholder - replace with official partner mark when provided */}
                <span className="font-display font-bold text-xl text-foreground tracking-wide">
                  {partner.abbr}
                </span>
                <span className="text-[11px] text-muted-foreground text-center px-2">
                  {partner.name}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
