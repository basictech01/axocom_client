/**
 * Problems Page — Kinetic Dark design
 * Lists all published problems with filters, search, and animated card reveals
 */
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "~/features/hackathon/lib/router";
import { Search, ArrowRight, Filter } from "lucide-react";
import { problems } from "~/features/hackathon/lib/data";
import { useScrollReveal } from "~/features/hackathon/hooks/useScrollReveal";

export default function Problems() {
  const [search, setSearch] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const { ref, isInView } = useScrollReveal(0.05);

  const filtered = useMemo(() => {
    return problems.filter((p) => {
      const matchesSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      const matchesDifficulty =
        difficultyFilter === "all" || p.difficulty === difficultyFilter;
      return matchesSearch && matchesDifficulty;
    });
  }, [search, difficultyFilter]);

  return (
    <div className="pt-28 pb-20">
      <div className="container">
        {/* Header */}
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

        {/* Search & Filter */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 mb-10"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search problems..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <div className="flex gap-1.5">
              {["all", "Beginner", "Intermediate", "Advanced"].map((level) => (
                <button
                  key={level}
                  onClick={() => setDifficultyFilter(level)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    difficultyFilter === level
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {level === "all" ? "All" : level}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Results */}
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
              filtered.map((problem, i) => (
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
                          <div className="flex items-center gap-3 mb-3 flex-wrap">
                            <span className="text-xs text-muted-foreground">
                              {problem.category}
                            </span>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                problem.difficulty === "Advanced"
                                  ? "bg-destructive/10 text-destructive border border-destructive/20"
                                  : problem.difficulty === "Intermediate"
                                  ? "bg-chart-2/10 text-chart-2 border border-chart-2/20"
                                  : "bg-chart-4/10 text-chart-4 border border-chart-4/20"
                              }`}
                            >
                              {problem.difficulty}
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
                          <span className="text-sm text-muted-foreground">
                            <span className="font-mono font-bold text-primary">{problem.solutionCount}</span> solution{problem.solutionCount !== 1 ? "s" : ""}
                          </span>
                          <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
