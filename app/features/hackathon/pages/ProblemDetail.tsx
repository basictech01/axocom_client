/**
 * Problem Detail Page - Kinetic Dark design
 * Shows full problem info, accepted solutions for this problem, and CTA to register
 */
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client/react";
import { motion } from "framer-motion";
import { Link, useRoute } from "~/features/hackathon/lib/router";
import { ArrowLeft, ArrowRight, Users, Loader2 } from "lucide-react";
import { getProblemById } from "~/features/hackathon/lib/data";
import { useScrollReveal } from "~/features/hackathon/hooks/useScrollReveal";
import { WHATSAPP_COMMUNITY_URL } from "~/features/hackathon/components/WhatsAppCommunityCta";
import { WhatsAppLogo } from "~/features/hackathon/components/WhatsAppLogo";
import { PUBLIC_SOLUTIONS_QUERY } from "~/features/hackathon/services";

export default function ProblemDetail() {
  const [, params] = useRoute<{ id: string }>("/problems/:id");
  const problemId = params?.id || "";
  const problem = getProblemById(problemId);
  const { data, loading: isInitialLoading, error, fetchMore } = useQuery(PUBLIC_SOLUTIONS_QUERY, {
    variables: { problemCode: problemId, limit: 100 },
    skip: !problemId,
  });
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [paginationError, setPaginationError] = useState<Error | null>(null);
  const solutions = data?.publicSolutions.data ?? [];
  const hasFirstPage = Boolean(data);
  const totalSolutions = data?.publicSolutions.pagination.total ?? 0;
  const totalPages = data?.publicSolutions.pagination.totalPages ?? 1;
  const isLoading = isInitialLoading || isLoadingMore;

  useEffect(() => {
    if (!hasFirstPage || isInitialLoading || totalPages <= 1) return;

    let cancelled = false;
    setIsLoadingMore(true);
    setPaginationError(null);

    const loadRemainingPages = async () => {
      try {
        for (let page = 2; page <= totalPages; page += 1) {
          if (cancelled) return;
          await fetchMore({
            variables: { problemCode: problemId, page, limit: 100 },
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
  }, [fetchMore, hasFirstPage, isInitialLoading, problemId, totalPages]);

  const solutionsReveal = useScrollReveal();

  if (!problem) {
    return (
      <div className="pt-28 pb-20">
        <div className="container text-center">
          <h1 className="font-display font-bold text-2xl text-foreground mb-4">Problem not found</h1>
          <Link href="/problems">
            <span className="text-primary hover:underline">← Back to all problems</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <Link href="/problems" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">All Problems</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="mb-12"
        >
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {problem.sponsor ? (
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                {problem.sponsor}
              </span>
            ) : null}
            <span className="text-sm text-muted-foreground">{problem.category}</span>
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-6">
            {problem.title}
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mb-8">
            {problem.description}
          </p>

          <div className="flex flex-wrap gap-6 mb-8">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">
                <span className="font-mono font-bold text-foreground">
                  {isLoading ? "…" : totalSolutions}
                </span>{" "}
                accepted solution{totalSolutions !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          <Link href={`/register/solution?problem=${problem.id}`}>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl flex items-center gap-2 hover:bg-primary-hover transition-shadow"
            >
              Register a Solution for This Problem
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </motion.div>

        <section className="mb-16" ref={solutionsReveal.ref}>
          <h2 className="font-display font-bold text-2xl text-foreground mb-6">
            Accepted Solutions
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Only solutions that have been reviewed and accepted are listed here.
          </p>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
          ) : error || paginationError ? (
            <div className="p-8 rounded-2xl bg-card border border-border text-center">
              <p className="text-muted-foreground">
                Unable to load accepted solutions. Please try again later.
              </p>
            </div>
          ) : solutions.length === 0 ? (
            <div className="p-8 rounded-2xl bg-card border border-border text-center">
              <p className="text-muted-foreground">
                No accepted solutions yet. Submit yours for review!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {solutions.map((solution, i) => (
                <motion.div
                  key={solution.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={solutionsReveal.isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.08, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                >
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="p-5 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300"
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
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {solution.solutionDescription}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{new Date(solution.createdAt).toLocaleDateString()}</span>
                      <span>Owner: {solution.fullName}</span>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-16"
        >
          <a
            href={WHATSAPP_COMMUNITY_URL}
            target="_blank"
            rel="noreferrer"
          >
            <div className="p-6 rounded-2xl bg-card border border-[#25D366]/20 hover:border-[#25D366]/40 transition-colors flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center shrink-0 text-white">
                <WhatsAppLogo className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-display font-semibold text-foreground">
                  Join the WhatsApp community
                </h3>
                <p className="text-sm text-muted-foreground">
                  Get problem clarifications, mentor access, and programme updates.
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-[#25D366] shrink-0" />
            </div>
          </a>
        </motion.section>
      </div>
    </div>
  );
}
