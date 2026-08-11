import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useScrollReveal } from "~/features/hackathon/hooks/useScrollReveal";
import { HIRING_PARTNERS } from "~/features/hackathon/lib/hiringPartners";

export default function HomeHiringPartners() {
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
          <p className="ukis-eyebrow mb-4">Hiring Partners</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground leading-tight">
            Where great builders get{" "}
            <span className="ukis-accent-word">hired</span>
          </h2>
          <p className="text-muted-foreground mt-4 text-base leading-relaxed">
            Our hiring partners meet standout builders through real work — opening
            doors to interviews, internships, and full-time roles.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6">
          {HIRING_PARTNERS.map((partner, i) => {
            const content = (
              <>
                <div className="flex h-24 items-center justify-center bg-white px-6 py-5">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    loading="lazy"
                    className="max-h-full max-w-[75%] object-contain"
                  />
                </div>
                <div className="flex flex-1 items-start justify-between gap-2 border-t border-border p-4">
                  <div className="min-w-0">
                    <h3 className="font-display font-semibold text-sm text-foreground leading-tight truncate">
                      {partner.name}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-tight mt-0.5 truncate">
                      {partner.role}
                    </p>
                  </div>
                  {partner.url ? (
                    <ArrowUpRight
                      className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
                      aria-hidden
                    />
                  ) : null}
                </div>
              </>
            );

            const cardClass =
              "group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface transition-colors hover:border-primary/40";

            return (
              <motion.div
                key={partner.id}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                {partner.url ? (
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${partner.name} — ${partner.role}`}
                    className={cardClass}
                  >
                    {content}
                  </a>
                ) : (
                  <div className={cardClass}>{content}</div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
