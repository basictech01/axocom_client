import { motion, useReducedMotion } from "framer-motion";
import { useScrollReveal } from "~/features/hackathon/hooks/useScrollReveal";
import { PARTNERS } from "./data";

export default function HomePartners() {
  const { ref, isInView } = useScrollReveal(0.2);
  const reduceMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      className="relative z-30 -mt-12 -mb-24 sm:-mt-14 sm:-mb-20 lg:-mt-16 lg:-mb-16"
      aria-label="In association with"
    >
      <div className="container">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="mx-auto max-w-5xl rounded-xl border border-primary/20 bg-white/95 px-4 py-3.5 shadow-[0_18px_45px_rgba(5,88,212,0.16)] backdrop-blur-md sm:px-8 sm:py-4 dark:border-white/10 dark:bg-[#12263F]/95 dark:shadow-[0_18px_48px_rgba(0,0,0,0.3)]"
        >
          <p className="ukis-eyebrow mb-2.5 text-center !text-primary dark:!text-brand-himalayan-cyan">In Association With</p>
          <ul className="mx-auto grid max-w-xl grid-cols-2 divide-x divide-border dark:divide-white/15">
            {PARTNERS.map((partner) => (
              <li
                key={partner.name}
                className="flex min-w-0 flex-col items-center justify-center gap-0.5 px-2 py-1 text-center sm:px-6"
              >
                <div className="flex items-center justify-center gap-2.5">
                  <img
                    src={partner.logo}
                    alt={partner.logoIncludesName ? partner.name : ""}
                    aria-hidden={partner.logoIncludesName ? undefined : true}
                    width={partner.logoWidth}
                    height={partner.logoHeight}
                    decoding="async"
                    className={
                      partner.logoIncludesName
                        ? "h-7 w-auto max-w-[5rem] shrink-0 object-contain sm:h-[39px] sm:max-w-[7rem]"
                        : "h-7 w-7 shrink-0 object-contain sm:h-9 sm:w-9"
                    }
                  />
                  {!partner.logoIncludesName && (
                    <span className="font-display text-base font-bold text-foreground sm:text-xl dark:text-white">
                      {partner.name}
                    </span>
                  )}
                </div>
                <span className="max-w-[9rem] text-[0.65rem] leading-snug text-muted-foreground sm:max-w-[11rem] sm:text-xs dark:text-white/70">
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
