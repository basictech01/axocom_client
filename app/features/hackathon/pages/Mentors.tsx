/**
 * Mentors Page — Kinetic Dark design
 * Public listing of accepted mentors from the API
 */
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@apollo/client/react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "~/features/hackathon/lib/router";
import { Search, ArrowRight, Filter, Loader2 } from "lucide-react";
import { useScrollReveal } from "~/features/hackathon/hooks/useScrollReveal";
import { PUBLIC_MENTORS_QUERY } from "~/features/hackathon/services";

function parseExpertise(expertise: string): string[] {
  return expertise
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);
}

export default function Mentors() {
  const [search, setSearch] = useState("");
  const [expertiseFilter, setExpertiseFilter] = useState<string>("all");
  const { data, loading: isInitialLoading, error, fetchMore } = useQuery(PUBLIC_MENTORS_QUERY, {
    variables: { limit: 100 },
  });
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [paginationError, setPaginationError] = useState<Error | null>(null);
  const mentors = data?.publicMentors.data ?? [];
  const hasFirstPage = Boolean(data);
  const totalPages = data?.publicMentors.pagination.totalPages ?? 1;
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
              const existingIds = new Set(previous.publicMentors.data.map((item) => item.id));
              return {
                publicMentors: {
                  ...fetchMoreResult.publicMentors,
                  data: [
                    ...previous.publicMentors.data,
                    ...fetchMoreResult.publicMentors.data.filter((item) => !existingIds.has(item.id)),
                  ],
                },
              };
            },
          });
        }
      } catch (loadError) {
        if (!cancelled) {
          setPaginationError(loadError instanceof Error ? loadError : new Error("Unable to load all mentors"));
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

  const allExpertise = useMemo(() => {
    const set = new Set<string>();
    mentors.forEach((m) => parseExpertise(m.expertise).forEach((e) => set.add(e)));
    return Array.from(set).sort();
  }, [mentors]);

  const filtered = useMemo(() => {
    return mentors.filter((m) => {
      const expertiseList = parseExpertise(m.expertise);
      const matchesSearch =
        !search ||
        m.fullName.toLowerCase().includes(search.toLowerCase()) ||
        m.experienceSummary.toLowerCase().includes(search.toLowerCase()) ||
        expertiseList.some((e) => e.toLowerCase().includes(search.toLowerCase()));
      const matchesExpertise =
        expertiseFilter === "all" || expertiseList.includes(expertiseFilter);
      return matchesSearch && matchesExpertise;
    });
  }, [search, expertiseFilter, mentors]);

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
            Programme <span className="text-brand-accent">Mentors</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl text-lg">
            Accepted mentors who guide hackathon teams. Applications are reviewed before
            mentors appear on this page.
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
              placeholder="Search mentors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all outline-none"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
            <button
              onClick={() => setExpertiseFilter("all")}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all shrink-0 ${
                expertiseFilter === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              All
            </button>
            {allExpertise.map((exp) => (
              <button
                key={exp}
                onClick={() => setExpertiseFilter(exp)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap shrink-0 ${
                  expertiseFilter === exp
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {exp}
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
              <p className="text-lg">Unable to load mentors. Please try again later.</p>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {filtered.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20 text-muted-foreground"
                >
                  <p className="text-lg">No accepted mentors found matching your criteria.</p>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filtered.map((mentor, i) => {
                    const expertiseList = parseExpertise(mentor.expertise);
                    return (
                      <motion.div
                        key={mentor.id}
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
                        <motion.div
                          whileHover={{ y: -4 }}
                          className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 h-full"
                        >
                          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4">
                            <span className="font-display font-bold text-primary text-xl">
                              {mentor.fullName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .slice(0, 2)}
                            </span>
                          </div>

                          <h3 className="font-display font-semibold text-xl text-foreground mb-1">
                            {mentor.fullName}
                          </h3>
                          <p className="text-sm text-primary mb-3">
                            {mentor.currentRole}
                            {mentor.organisation ? ` · ${mentor.organisation}` : ""}
                          </p>

                          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                            {mentor.experienceSummary}
                          </p>

                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {expertiseList.map((exp) => (
                              <span
                                key={exp}
                                className="px-2.5 py-1 rounded-md text-xs font-medium bg-secondary text-secondary-foreground border border-border"
                              >
                                {exp}
                              </span>
                            ))}
                          </div>

                          {mentor.profileUrl && (
                            <div className="pt-3 border-t border-border">
                              <a
                                href={mentor.profileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-primary hover:underline"
                              >
                                View profile
                              </a>
                            </div>
                          )}
                        </motion.div>
                      </motion.div>
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
          <Link href="/register/mentor">
            <span className="text-primary font-medium hover:underline flex items-center justify-center gap-2">
              Want to mentor? Apply now <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
