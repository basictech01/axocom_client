/**
 * Solutions Page - Kinetic Dark design
 * Public listing of accepted solutions from the API
 */
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@apollo/client/react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "~/features/hackathon/lib/router";
import { Search, ArrowRight, Clock, Filter, Loader2 } from "lucide-react";
import { problems } from "~/features/hackathon/lib/data";
import { useScrollReveal } from "~/features/hackathon/hooks/useScrollReveal";
import { PUBLIC_SOLUTIONS_QUERY } from "~/features/hackathon/services";

export default function Solutions() {
  const [search, setSearch] = useState("");
  const [problemFilter, setProblemFilter] = useState<string>("all");
  const { data, loading: isInitialLoading, error, fetchMore } = useQuery(PUBLIC_SOLUTIONS_QUERY, {
    variables: { limit: 100 },
  });
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [paginationError, setPaginationError] = useState<Error | null>(null);
  const solutions = data?.publicSolutions.data ?? [];
  const hasFirstPage = Boolean(data);
  const totalPages = data?.publicSolutions.pagination.totalPages ?? 1;
  const isLoading = isInitialLoading || isLoadingMore;
  const loadError = Boolean(error || paginationError);
  const { ref, isInView } = useScrollReveal(0.05);

  useEffect(() => {
    if (!hasFirstPage || totalPages <= 1) return;

    let cancelled = false;
    setIsLoadingMore(true);
    setPaginationError(null);

    const loadRemainingPages = async () => {
      try {
        for (let page = 2; page <= totalPages; page += 1) {
          if (cancelled) return;
          await fetchMore({
            variables: { page, limit: 100 },
            updateQuery: (previous, { fetchMoreResult }) => {
              const existingIds = new Set(previous.publicSolutions.data.map((item) => item.id));
              return {
                publicSolutions: {
                  ...fetchMoreResult.publicSolutions,
                  data: [
                    ...previous.publicSolutions.data,
                    ...fetchMoreResult.publicSolutions.data.filter((item) => !existingIds.has(item.id)),
                  ],
                },
              };
            },
          });
        }
      } catch (loadError) {
        if (!cancelled) {
          setPaginationError(loadError instanceof Error ? loadError : new Error("Unable to load all solutions"));
        }
      } finally {
        if (!cancelled) setIsLoadingMore(false);
      }
    };

    void loadRemainingPages();
    return () => {
      cancelled = true;
    };
  }, [fetchMore, hasFirstPage, totalPages]);

  const filtered = useMemo(() => {
    return solutions.filter((s) => {
      const matchesSearch =
        !search ||
        s.solutionTitle.toLowerCase().includes(search.toLowerCase()) ||
        s.fullName.toLowerCase().includes(search.toLowerCase()) ||
        s.solutionDescription.toLowerCase().includes(search.toLowerCase());
      const matchesProblem =
        problemFilter === "all" || s.problemCode === problemFilter;
      return matchesSearch && matchesProblem;
    });
  }, [search, problemFilter, solutions]);

  function getProblemTitle(problemId: string) {
    return problems.find((p) => p.id === problemId)?.title || problemId;
  }

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
            Registered <span className="text-brand-accent">Solutions</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl text-lg">
            Accepted solutions and their Solution Owners. Submissions are reviewed before
            they are published on this page.
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
              placeholder="Search solutions or owners..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all outline-none"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
            <button
              onClick={() => setProblemFilter("all")}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all shrink-0 ${
                problemFilter === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              All
            </button>
            {problems.map((p) => (
              <button
                key={p.id}
                onClick={() => setProblemFilter(p.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap shrink-0 max-w-[14rem] truncate ${
                  problemFilter === p.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
                title={p.title}
              >
                {p.title}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Results */}
        <div ref={ref}>
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
          ) : loadError ? (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-lg">Unable to load solutions. Please try again later.</p>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {filtered.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20 text-muted-foreground"
                >
                  <p className="text-lg">No accepted solutions found matching your criteria.</p>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filtered.map((solution, i) => (
                    <motion.div
                      key={solution.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{
                        delay: i * 0.05,
                        duration: 0.4,
                        ease: [0.23, 1, 0.32, 1],
                      }}
                    >
                      <motion.div
                        whileHover={{ y: -2 }}
                        className="p-5 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 h-full"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-primary/10 text-primary border border-primary/20">
                            {solution.id}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                            accepted
                          </span>
                        </div>

                        <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                          {solution.solutionTitle}
                        </h3>

                        <Link href={`/problems/${solution.problemCode}`}>
                          <span className="text-xs text-primary hover:underline flex items-center gap-1 mb-3">
                            {getProblemTitle(solution.problemCode)}
                            <ArrowRight className="w-3 h-3" />
                          </span>
                        </Link>

                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                          {solution.solutionDescription}
                        </p>

                        <div className="flex items-center justify-between pt-3 border-t border-border">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {new Date(solution.createdAt).toLocaleDateString()}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            Owner:{" "}
                            <span className="text-foreground font-medium">{solution.fullName}</span>
                          </span>
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="mt-10 text-center"
        >
          <Link href="/register/solution">
            <span className="text-primary font-medium hover:underline flex items-center justify-center gap-2">
              Register your own solution <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
