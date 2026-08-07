import { motion, useReducedMotion } from "framer-motion";
import { useScrollReveal } from "~/features/hackathon/hooks/useScrollReveal";
import { PARTICIPANTS } from "./data";

export default function HomeParticipants() {
  const { ref, isInView } = useScrollReveal();
  const reduceMotion = useReducedMotion();

  return (
    <section className="ukis-section border-t border-border" ref={ref}>
      <div className="container">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="mb-12 max-w-2xl"
        >
          <p className="ukis-eyebrow mb-4">Who can participate</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground leading-tight">
            Built for <span className="ukis-accent-word">builders</span> across
            the world
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-6">
          {PARTICIPANTS.map((item, i) => (
            <motion.article
              key={item.category}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              className="group"
            >
              <div className="mb-5 aspect-[4/5] w-full overflow-hidden rounded-xl border border-border transition-transform duration-500 group-hover:scale-[1.01]">
                <img
                  src={item.image}
                  alt={`${item.category}, UKIS participants`}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="font-display font-semibold text-xl text-foreground mb-2">
                {item.category}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
