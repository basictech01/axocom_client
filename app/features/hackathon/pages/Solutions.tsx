/**
 * Solutions Page - Kinetic Dark design
 * Public listing of accepted solutions from the API
 */
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@apollo/client/react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "~/features/hackathon/lib/router";
import { Search, ArrowRight, ChevronDown, ChevronUp, Clock, Loader2 } from "lucide-react";
import { problems } from "~/features/hackathon/lib/data";
import { buildSolutionsSeoMeta } from "~/features/hackathon/lib/seo";
import { useScrollReveal } from "~/features/hackathon/hooks/useScrollReveal";
import { PUBLIC_SOLUTIONS_QUERY } from "~/features/hackathon/services";

export const meta = buildSolutionsSeoMeta;

export default function Solutions() {
  const [search, setSearch] = useState("");
  const [expandedSolutions, setExpandedSolutions] = useState<Set<string>>(() => new Set());
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

  function getProblemTitle(problemId: string) {
    return problems.find((p) => p.id === problemId)?.title || problemId;
  }

  function toggleSolution(solutionId: string) {
    setExpandedSolutions((current) => {
      const next = new Set(current);
      if (next.has(solutionId)) next.delete(solutionId);
      else next.add(solutionId);
      return next;
    });
  }

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return solutions;

    return solutions.filter((s) => {
      return (
        s.solutionTitle.toLowerCase().includes(query) ||
        s.fullName.toLowerCase().includes(query) ||
        s.solutionDescription.toLowerCase().includes(query) ||
        getProblemTitle(s.problemCode).toLowerCase().includes(query)
      );
    });
  }, [search, solutions]);

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
            UKIS 2026 <span className="text-brand-accent">Solutions</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl text-lg">
            Browse accepted hackathon projects addressing UKIS 2026 problem statements from
            Uttarakhand. Entries from solo participants and teams are reviewed before publication.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-10 max-w-xl"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search solutions or owners..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all outline-none"
            />
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
                  {filtered.map((solution, i) => {
                    const isExpanded = expandedSolutions.has(solution.id);
                    const canExpand = solution.solutionDescription.trim().length > 180;
                    const descriptionId = `solution-description-${solution.id}`;

                    return (
                      <motion.article
                        key={solution.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{
                          layout: { type: "spring", stiffness: 290, damping: 30 },
                          opacity: { delay: i * 0.05, duration: 0.35 },
                          y: { delay: i * 0.05, duration: 0.35 },
                        }}
                        className={isExpanded ? "md:col-span-2" : ""}
                      >
                        <motion.div
                          layout
                          whileHover={isExpanded ? undefined : { y: -2 }}
                          className="flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition-colors duration-300 hover:border-primary/30"
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

                          <motion.div layout="position" className="mb-4">
                            <p
                              id={descriptionId}
                              className={`whitespace-pre-line text-sm leading-relaxed text-muted-foreground ${isExpanded ? "" : "line-clamp-2"}`}
                            >
                              {solution.solutionDescription}
                            </p>
                            {canExpand && (
                              <button
                                type="button"
                                aria-expanded={isExpanded}
                                aria-controls={descriptionId}
                                onClick={() => toggleSolution(solution.id)}
                                className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary underline-offset-4 transition-colors hover:text-primary-hover hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                              >
                                {isExpanded ? "View less" : "Read more"}
                                {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                              </button>
                            )}
                          </motion.div>

                        <div className="mt-auto flex items-center justify-between border-t border-border pt-3">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {new Date(solution.createdAt).toLocaleDateString()}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            Primary contact:{" "}
                            <span className="text-foreground font-medium">{solution.fullName}</span>
                          </span>
                        </div>
                        </motion.div>
                      </motion.article>
                    );
                  })}
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
