import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "~/features/hackathon/lib/router";
import { useScrollReveal } from "~/features/hackathon/hooks/useScrollReveal";
import { MENTOR_GUIDES } from "./data";

export default function HomeSpeakers() {
  const { ref, isInView } = useScrollReveal();
  const reduceMotion = useReducedMotion();

  // Duplicate the list so the horizontal track can loop seamlessly.
  const marqueeItems = [...MENTOR_GUIDES, ...MENTOR_GUIDES];
  const scrollSeconds = Math.max(32, MENTOR_GUIDES.length * 4);

  return (
    <section className="border-t border-border bg-surface py-10 sm:py-12 lg:py-14" ref={ref}>
      <div className="container">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-2xl">
            <p className="ukis-eyebrow mb-4">Mentors & Speakers</p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground leading-tight">
              Learn from engineers and{" "}
              <span className="ukis-accent-word">leaders</span>
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed">
              Working at top tech companies guiding builders through the innovation series.
            </p>
          </div>
          <Link
            href="/mentors"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium text-primary transition-colors hover:underline"
          >
            View all mentors
            <ArrowRight
              className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="ukis-mentor-marquee group relative"
      >
        <div className="ukis-mentor-fade pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-surface to-transparent sm:w-24" />
        <div className="ukis-mentor-fade pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-surface to-transparent sm:w-24" />

        <div
          className="ukis-mentor-track flex w-max"
          style={{ animationDuration: `${scrollSeconds}s` }}
        >
          {marqueeItems.map((speaker, i) => {
            const isClone = i >= MENTOR_GUIDES.length;
            const hasPhoto = Boolean(speaker.image?.trim());
            return (
              <article
                key={`${speaker.name}-${i}`}
                aria-hidden={isClone || undefined}
                className="mr-5 flex w-[164px] shrink-0 flex-col text-left sm:w-[184px]"
              >
                <div className="aspect-square w-full rounded-lg border border-border bg-surface-subtle mb-3 overflow-hidden relative shrink-0">
                  {hasPhoto ? (
                    <img
                      src={speaker.image}
                      alt={speaker.name}
                      loading="lazy"
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
                      tabIndex={isClone ? -1 : undefined}
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

                <h3 className="font-display font-semibold text-sm text-foreground leading-tight line-clamp-1">
                  {speaker.name}
                </h3>
                <p className="text-xs text-muted-foreground leading-tight line-clamp-1 mt-0.5">
                  {speaker.role}
                </p>
                <p className="text-xs font-bold text-foreground leading-tight truncate mt-0.5">
                  {speaker.organisation}
                </p>
              </article>
            );
          })}
        </div>
      </motion.div>

      <style>{`
        .ukis-mentor-track {
          animation: ukis-mentor-scroll 40s linear infinite;
          will-change: transform;
        }
        .ukis-mentor-marquee:hover .ukis-mentor-track {
          animation-play-state: paused;
        }
        @keyframes ukis-mentor-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ukis-mentor-track {
            animation: none;
          }
          .ukis-mentor-marquee {
            overflow-x: auto;
            scrollbar-width: none;
          }
          .ukis-mentor-marquee::-webkit-scrollbar {
            display: none;
          }
          .ukis-mentor-fade {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
