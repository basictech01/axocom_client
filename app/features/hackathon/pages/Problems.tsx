/**
 * Problems Page - Kinetic Dark design
 * Lists all published problems with search and live accepted-solution counts
 */
import { useEffect, useMemo, useState } from "react";
import { useApolloClient } from "@apollo/client/react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "~/features/hackathon/lib/router";
import { Search, ArrowRight, Loader2 } from "lucide-react";
import { problems } from "~/features/hackathon/lib/data";
import { useScrollReveal } from "~/features/hackathon/hooks/useScrollReveal";
import { PUBLIC_SOLUTIONS_QUERY } from "~/features/hackathon/services";

export default function Problems() {
  const [search, setSearch] = useState("");
  const [solutionCounts, setSolutionCounts] = useState<Record<string, number>>({});
  const [countsLoading, setCountsLoading] = useState(true);
  const client = useApolloClient();
  const { ref, isInView } = useScrollReveal(0.05);

  useEffect(() => {
    let cancelled = false;

    const loadCounts = async () => {
      setCountsLoading(true);
      try {
        const results = await Promise.all(
          problems.map(async (problem) => {
            const { data } = await client.query({
              query: PUBLIC_SOLUTIONS_QUERY,
              variables: { problemCode: problem.id, page: 1, limit: 1 },
              fetchPolicy: "network-only",
            });
            return [problem.id, data.publicSolutions.pagination.total] as const;
          }),
        );
        if (!cancelled) {
          setSolutionCounts(Object.fromEntries(results));
        }
      } catch {
        if (!cancelled) {
          setSolutionCounts({});
        }
      } finally {
        if (!cancelled) setCountsLoading(false);
      }
    };

    void loadCounts();
    return () => {
      cancelled = true;
    };
  }, [client]);

  const filtered = useMemo(() => {
    return problems.filter((p) => {
      return (
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [search]);

  return (
    <div className="pt-28 pb-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="mb-12"
        >
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-foreground mb-4">
            Published <span className="text-brand-accent">Problems</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl text-lg">
            Each problem is a real challenge from an organisation seeking innovative solutions.
            Register against any problem to become a Solution Owner and official participant.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-10"
        >
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search problems..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all outline-none"
            />
          </div>
        </motion.div>

        <div ref={ref}>
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 text-muted-foreground"
              >
                <p className="text-lg">No problems found matching your criteria.</p>
              </motion.div>
            ) : (
              filtered.map((problem, i) => {
                const count = solutionCounts[problem.id] ?? 0;
                return (
                  <motion.div
                    key={problem.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{
                      delay: i * 0.06,
                      duration: 0.4,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                  >
                    <Link href={`/problems/${problem.id}`}>
                      <motion.div
                        whileHover={{ y: -2 }}
                        className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 mb-4 group"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                          <div className="flex-1">
                            <div className="mb-3">
                              <span className="text-xs text-muted-foreground">
                                {problem.category}
                              </span>
                            </div>
                            <h3 className="font-display font-semibold text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                              {problem.title}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {problem.description}
                            </p>
                          </div>
                          <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-2 shrink-0">
                            <span className="text-sm text-muted-foreground inline-flex items-center gap-1.5">
                              {countsLoading ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin text-primary" />
                              ) : (
                                <span className="font-mono font-bold text-primary">{count}</span>
                              )}
                              {" "}
                              solution{count !== 1 ? "s" : ""}
                            </span>
                            <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
