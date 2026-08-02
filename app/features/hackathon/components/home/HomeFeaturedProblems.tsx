import { motion, useReducedMotion } from "framer-motion";
import { Link } from "~/features/hackathon/lib/router";
import { ArrowRight } from "lucide-react";
import { problems } from "~/features/hackathon/lib/data";
import { useScrollReveal } from "~/features/hackathon/hooks/useScrollReveal";

export default function HomeFeaturedProblems() {
  const { ref, isInView } = useScrollReveal();
  const reduceMotion = useReducedMotion();
  const featured = problems.slice(0, 3);

  return (
    <section className="ukis-section border-t border-border bg-surface" ref={ref}>
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45 }}
            className="max-w-xl"
          >
            <p className="ukis-eyebrow mb-4">Featured problem statements</p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground leading-tight">
              Start with a <span className="ukis-accent-word">real</span> challenge
            </h2>
          </motion.div>
          <Link
            href="/problems"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline shrink-0"
          >
            View all problems
            <ArrowRight className="w-4 h-4" aria-hidden />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {featured.map((problem, i) => (
            <motion.article
              key={problem.id}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              className="flex flex-col border border-border rounded-xl bg-page p-6 sm:p-7 hover:border-primary/35 transition-colors group"
            >
              <div className="flex flex-wrap items-center gap-2 mb-6">
                {problem.sponsor ? (
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                    {problem.sponsor}
                  </span>
                ) : null}
                <span className="ukis-eyebrow !text-[0.6rem]">{problem.category}</span>
              </div>

              <h3 className="font-display font-semibold text-xl text-foreground mb-4 group-hover:text-primary transition-colors leading-snug">
                {problem.title}
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4 mb-6 flex-1">
                {problem.description}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="text-xs text-muted-foreground">
                  {problem.id}
                </span>
                <Link
                  href={`/problems/${problem.id}`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                >
                  View Problem
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
