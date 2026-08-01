import { motion, useReducedMotion } from "framer-motion";
import { Link } from "~/features/hackathon/lib/router";
import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "~/features/hackathon/hooks/useScrollReveal";
import { DOMAINS } from "./data";
import { useState } from "react";

export default function HomeDomains() {
  const { ref, isInView } = useScrollReveal();
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const activeDomain = DOMAINS[active];

  return (
    <section className="ukis-section border-t border-border bg-surface" ref={ref}>
      <div className="container">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="mb-12 max-w-2xl"
        >
          <p className="ukis-eyebrow mb-4">Problem domains</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground leading-tight">
            Challenges rooted in{" "}
            <span className="ukis-accent-word">Uttarakhand</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          <div className="lg:col-span-7">
            <ul className="divide-y divide-border border-y border-border">
              {DOMAINS.map((domain, i) => {
                const isActive = active === i;
                return (
                  <li key={domain.number}>
                    <Link
                      href={`/problems/${domain.problemId}`}
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      className={`w-full text-left py-5 sm:py-6 flex gap-4 sm:gap-6 group transition-colors outline-none focus-visible:bg-surface-subtle ${
                        isActive ? "bg-surface-subtle/60" : "hover:bg-surface-subtle/40"
                      }`}
                    >
                      <span
                        className={`font-display font-bold text-2xl sm:text-3xl tabular-nums shrink-0 w-12 transition-colors ${
                          isActive ? "text-primary" : "text-muted-foreground/50"
                        }`}
                      >
                        {domain.number}
                      </span>
                      <span className="flex-1 min-w-0 pr-2">
                        <span className="flex items-center justify-between gap-3 mb-1.5">
                          <span className="font-display font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                            {domain.title}
                          </span>
                          <ArrowRight
                            className={`w-4 h-4 shrink-0 transition-all ${
                              isActive
                                ? "text-primary opacity-100 translate-x-0"
                                : "text-muted-foreground opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0"
                            }`}
                            aria-hidden
                          />
                        </span>
                        <span className="text-sm text-muted-foreground leading-relaxed block">
                          {domain.description}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="hidden lg:block lg:col-span-5">
            <div className="sticky top-28">
              <div
                key={activeDomain.number}
                className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-border"
              >
                <img
                  src={activeDomain.image}
                  alt={`${activeDomain.title} domain`}
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                <span className="font-mono text-xs text-primary mr-2">
                  {activeDomain.number}
                </span>
                {activeDomain.title}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
