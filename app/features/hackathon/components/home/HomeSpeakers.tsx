import { motion, useReducedMotion } from "framer-motion";
import { useScrollReveal } from "~/features/hackathon/hooks/useScrollReveal";
import { SPEAKERS } from "./data";

export default function HomeSpeakers() {
  const { ref, isInView } = useScrollReveal();
  const reduceMotion = useReducedMotion();

  return (
    <section className="ukis-section border-t border-border bg-surface" ref={ref}>
      <div className="container">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="mb-12 max-w-2xl"
        >
          <p className="ukis-eyebrow mb-4">Mentors & Speakers</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground leading-tight">
            Learn from engineers and{" "}
            <span className="ukis-accent-word">leaders</span>
          </h2>
          <p className="text-muted-foreground mt-4 text-base leading-relaxed">
            Working at top tech companies guiding builders through the innovation series.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 lg:gap-4">
          {SPEAKERS.map((speaker, i) => (
            <motion.article
              key={speaker.name}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="text-center sm:text-left"
            >
              {/* Portrait placeholder until headshots arrive */}
              <div
                role="img"
                aria-label={`Portrait placeholder for ${speaker.name}`}
                className="aspect-square w-full rounded-lg border border-border bg-surface-subtle mb-3 flex items-center justify-center overflow-hidden relative"
              >
                <div className="ukis-contour !opacity-20" />
                <span className="relative font-display font-bold text-primary text-lg">
                  {speaker.initials}
                </span>
              </div>
              <h3 className="font-display font-semibold text-sm text-foreground leading-snug">
                {speaker.name}
              </h3>
              <p className="text-xs text-muted-foreground mt-1 leading-snug">
                {speaker.role}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
