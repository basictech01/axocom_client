import { motion, useReducedMotion } from "framer-motion";
import { useScrollReveal } from "~/features/hackathon/hooks/useScrollReveal";
import { MENTOR_GUIDES } from "./data";

export default function HomeSpeakers() {
  const { ref, isInView } = useScrollReveal();
  const reduceMotion = useReducedMotion();

  return (
    <section className="border-t border-border bg-surface py-10 sm:py-12 lg:py-14" ref={ref}>
      <div className="container">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="mb-8 max-w-2xl"
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

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-7 gap-5 lg:gap-4">
          {MENTOR_GUIDES.map((speaker, i) => {
            const hasPhoto = Boolean(speaker.image?.trim());
            return (
              <motion.article
                key={speaker.name}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="flex h-full flex-col text-left"
              >
                <div className="aspect-square w-full rounded-lg border border-border bg-surface-subtle mb-3 overflow-hidden relative shrink-0">
                  {hasPhoto ? (
                    <img
                      src={speaker.image}
                      alt={speaker.name}
                      className="h-full w-full object-cover object-center"
                    />
                  ) : (
                    <div
                      role="img"
                      aria-label={`Portrait placeholder for ${speaker.name}`}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="ukis-contour !opacity-20" />
                      <span className="relative font-display font-bold text-primary text-lg">
                        {speaker.initials}
                      </span>
                    </div>
                  )}
                  {speaker.linkedin ? (
                    <a
                      href={speaker.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${speaker.name} on LinkedIn`}
                      title={`${speaker.name} on LinkedIn`}
                      className="absolute right-2.5 bottom-2.5 inline-flex h-[22px] w-[22px] items-center justify-center transition-transform hover:-translate-y-0.5 z-10"
                    >
                      <img
                        src="/images/linkedin.png"
                        alt=""
                        aria-hidden="true"
                        className="h-full w-full object-contain rounded-[7px] grayscale opacity-60 hover:opacity-90 transition-opacity"
                      />
                    </a>
                  ) : null}
                </div>

                <div className="flex flex-1 flex-col min-h-0">
                  <h3 className="font-display font-semibold text-sm text-foreground leading-tight line-clamp-1">
                    {speaker.name}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-tight line-clamp-1 mt-0.5">
                    {speaker.role}
                  </p>
                  <p className="text-xs font-bold text-foreground leading-tight truncate mt-0.5">
                    {speaker.organisation}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
