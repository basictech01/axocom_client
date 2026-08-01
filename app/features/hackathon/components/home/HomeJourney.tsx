import { motion, useReducedMotion } from "framer-motion";
import { useScrollReveal } from "~/features/hackathon/hooks/useScrollReveal";
import { PHASES, OFFLINE_ROUNDS } from "./data";

export default function HomeJourney() {
  const { ref, isInView } = useScrollReveal();
  const reduceMotion = useReducedMotion();

  return (
    <section className="ukis-section relative overflow-hidden" ref={ref}>
      <div className="ukis-contour" />

      <div className="container relative z-10">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="mb-14 max-w-2xl"
        >
          <p className="ukis-eyebrow mb-4">The UKIS journey</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground leading-tight">
            From online ideas to{" "}
            <span className="ukis-accent-word">on-ground</span> impact
          </h2>
        </motion.div>

        <ol className="relative max-w-3xl">
          {/* Connecting line */}
          <div
            className="absolute left-[1.35rem] sm:left-[1.6rem] top-3 bottom-3 w-px bg-border"
            aria-hidden
          />

          {PHASES.map((phase, i) => (
            <motion.li
              key={phase.id}
              initial={reduceMotion ? false : { opacity: 0, x: -12 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.45 }}
              className="relative pl-14 sm:pl-16 pb-12 last:pb-0"
            >
              <span
                className="absolute left-0 top-0 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-border bg-page font-display font-bold text-sm text-primary"
                aria-hidden
              >
                {phase.number}
              </span>

              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="ukis-eyebrow !text-[0.6rem]">{phase.phase}</span>
                {phase.status && (
                  <span className="px-2 py-0.5 rounded text-[11px] font-medium border border-primary/30 bg-surface-subtle text-primary">
                    {phase.status}
                  </span>
                )}
                <span className="text-xs text-muted-foreground ml-auto sm:ml-0">
                  {phase.dateLabel}
                </span>
              </div>

              <h3 className="font-display font-semibold text-xl sm:text-2xl text-foreground mb-3">
                {phase.title}
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed mb-4 max-w-xl">
                {phase.description}
              </p>
              <ul className="flex flex-wrap gap-2">
                {phase.points.map((point) => (
                  <li
                    key={point}
                    className="text-xs px-2.5 py-1 border border-border rounded-md text-foreground bg-surface"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ol>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.45 }}
          className="mt-16 pt-10 border-t border-border max-w-3xl"
        >
          <h3 className="font-display font-semibold text-lg text-foreground mb-4">
            {OFFLINE_ROUNDS.title}
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
            {OFFLINE_ROUNDS.points.map((point) => (
              <li key={point} className="text-sm text-muted-foreground flex gap-2">
                <span className="text-primary mt-0.5" aria-hidden>
                  —
                </span>
                {point}
              </li>
            ))}
          </ul>
          <p className="text-sm text-foreground leading-relaxed">{OFFLINE_ROUNDS.closing}</p>
        </motion.div>
      </div>
    </section>
  );
}
