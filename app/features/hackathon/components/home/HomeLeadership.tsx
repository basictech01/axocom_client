import { motion, useReducedMotion } from "framer-motion";
import { useScrollReveal } from "~/features/hackathon/hooks/useScrollReveal";
import { LEADERSHIP } from "./data";

export default function HomeLeadership() {
  const { ref, isInView } = useScrollReveal();
  const reduceMotion = useReducedMotion();

  return (
    <section className="ukis-section relative overflow-hidden" ref={ref}>
      <div className="ukis-contour opacity-[0.06]" />
      <div className="ukis-jaali" />

      <div className="container relative z-10">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="mb-12 max-w-2xl mx-auto text-center"
        >
          <p className="ukis-eyebrow mb-4">Chief Patrons</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground leading-tight">
            Distinguished leaders of{" "}
            <span className="ukis-accent-word">Uttarakhand</span>
          </h2>
          <p className="text-muted-foreground mt-4 text-base leading-relaxed">
            The programme is supported by the Hon&apos;ble Governor, the Hon&apos;ble
            Chief Minister, and the IT Minister of Uttarakhand.
          </p>        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto justify-items-center">
          {LEADERSHIP.map((person, i) => (
            <motion.article
              key={person.name}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              className="w-full max-w-[280px] overflow-hidden rounded-xl border border-border bg-surface flex flex-col"
            >
              <div className="relative">
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-full aspect-[1.08] object-cover object-top bg-surface-subtle"
                />
                {"linkedin" in person && person.linkedin ? (
                  <a
                    href={person.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${person.name} on LinkedIn`}
                    title={`${person.name} on LinkedIn`}
                    className="absolute right-2.5 bottom-2.5 inline-flex h-[22px] w-[22px] items-center justify-center transition-transform hover:-translate-y-0.5"
                  >
                    <img
                      src="/images/linkedin.png"
                      alt=""
                      aria-hidden="true"
                      className="h-full w-full object-contain"
                    />
                  </a>
                ) : null}
              </div>
              <div className="px-5 py-5 flex flex-col items-start flex-1">
                <h3 className="font-display font-semibold text-base text-foreground leading-snug">
                  {person.name}
                </h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  {person.role}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
