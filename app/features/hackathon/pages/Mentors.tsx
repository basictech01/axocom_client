/**
 * Mentors Page - Kinetic Dark design
 * Shows curated programme mentors plus accepted mentors from the API
 */
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@apollo/client/react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "~/features/hackathon/lib/router";
import { Search, ArrowRight, Loader2 } from "lucide-react";
import { CURATED_MENTORS } from "~/features/hackathon/lib/data";
import { useScrollReveal } from "~/features/hackathon/hooks/useScrollReveal";
import { PUBLIC_MENTORS_QUERY } from "~/features/hackathon/services";

type MentorCard = {
  id: string;
  fullName: string;
  currentRole: string;
  organisation: string | null;
  expertise: string;
  experienceSummary: string;
  profileUrl: string | null;
  image?: string;
  initials?: string;
};

function parseExpertise(expertise: string): string[] {
  return expertise
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);
}

function mentorInitials(fullName: string, fallback?: string) {
  if (fallback) return fallback;
  return fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
}

export default function Mentors() {
  const [search, setSearch] = useState("");
  const { data, loading: isInitialLoading, error, fetchMore } = useQuery(PUBLIC_MENTORS_QUERY, {
    variables: { limit: 100 },
  });
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [paginationError, setPaginationError] = useState<Error | null>(null);
  const apiMentors = data?.publicMentors.data ?? [];
  const hasFirstPage = Boolean(data);
  const totalPages = data?.publicMentors.pagination.totalPages ?? 1;
  const isLoadingApi = isInitialLoading || isLoadingMore;
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
      } catch (err) {
        if (!cancelled) {
          setPaginationError(err instanceof Error ? err : new Error("Unable to load all mentors"));
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

  const mentors = useMemo<MentorCard[]>(() => {
    const curated: MentorCard[] = CURATED_MENTORS.map((m) => ({
      id: m.id,
      fullName: m.fullName,
      currentRole: m.currentRole,
      organisation: m.organisation,
      expertise: m.expertise,
      experienceSummary: m.experienceSummary,
      profileUrl: m.profileUrl ?? null,
      image: m.image,
      initials: m.initials,
    }));

    const curatedNames = new Set(curated.map((m) => m.fullName.toLowerCase()));
    const fromApi: MentorCard[] = apiMentors
      .filter((m) => !curatedNames.has(m.fullName.toLowerCase()))
      .map((m) => ({
        id: m.id,
        fullName: m.fullName,
        currentRole: m.currentRole,
        organisation: m.organisation,
        expertise: m.expertise,
        experienceSummary: m.experienceSummary,
        profileUrl: m.profileUrl,
      }));

    return [...curated, ...fromApi];
  }, [apiMentors]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return mentors;

    return mentors.filter((m) => {
      const expertiseList = parseExpertise(m.expertise);
      return (
        m.fullName.toLowerCase().includes(query) ||
        m.experienceSummary.toLowerCase().includes(query) ||
        m.currentRole.toLowerCase().includes(query) ||
        (m.organisation?.toLowerCase().includes(query) ?? false) ||
        expertiseList.some((e) => e.toLowerCase().includes(query))
      );
    });
  }, [search, mentors]);

  const showApiErrorOnly = loadError && CURATED_MENTORS.length === 0;

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
            Programme mentors who guide hackathon teams, including confirmed mentors and
            accepted applications.
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
              placeholder="Search mentors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all outline-none"
            />
          </div>
        </motion.div>

        <div ref={ref}>
          {isLoadingApi && mentors.length === 0 ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
          ) : showApiErrorOnly ? (
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
                  <p className="text-lg">No mentors found matching your criteria.</p>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filtered.map((mentor, i) => {
                    const expertiseList = parseExpertise(mentor.expertise);
                    const hasPhoto = Boolean(mentor.image?.trim());
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
                          {hasPhoto ? (
                            <div className="w-14 h-14 rounded-full overflow-hidden border border-border mb-4">
                              <img
                                src={mentor.image}
                                alt={mentor.fullName}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>
                          ) : (
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-border mb-4">
                              <span className="font-display font-bold text-primary text-xl">
                                {mentorInitials(mentor.fullName, mentor.initials)}
                              </span>
                            </div>
                          )}

                          <h3 className="font-display font-semibold text-xl text-foreground mb-1">
                            {mentor.fullName}
                          </h3>
                          <p className="text-sm text-primary mb-3">
                            {mentor.currentRole}
                            {mentor.organisation ? (
                              <>
                                {" · "}
                                <span className="font-bold text-foreground">{mentor.organisation}</span>
                              </>
                            ) : null}
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

                          {mentor.profileUrl ? (
                            <a
                              href={mentor.profileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm font-medium text-primary hover:underline underline-offset-2"
                            >
                              Meet them
                            </a>
                          ) : null}
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
