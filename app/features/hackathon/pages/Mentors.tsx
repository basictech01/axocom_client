/**
 * Mentors Page - Kinetic Dark design
 * Renders selected programme mentors from static frontend data only.
 * Mentor registration stays available; applications are not published here automatically.
 */
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "~/features/hackathon/lib/router";
import { Search, ArrowRight } from "lucide-react";
import { MENTORS } from "~/features/hackathon/lib/mentors";
import { useScrollReveal } from "~/features/hackathon/hooks/useScrollReveal";

function parseExpertise(expertise: string): string[] {
  return expertise
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);
}

function mentorInitials(name: string, fallback?: string) {
  if (fallback) return fallback;
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
}

export default function Mentors() {
  const [search, setSearch] = useState("");
  const { ref, isInView } = useScrollReveal(0.05);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return MENTORS;

    return MENTORS.filter((m) => {
      const expertiseList = parseExpertise(m.expertise);
      return (
        m.name.toLowerCase().includes(query) ||
        m.bio.toLowerCase().includes(query) ||
        m.designation.toLowerCase().includes(query) ||
        m.organization.toLowerCase().includes(query) ||
        expertiseList.some((e) => e.toLowerCase().includes(query))
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
            Programme <span className="text-brand-accent">Mentors</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl text-lg">
            Selected mentors guiding builders through the UKIS innovation series.
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                        className="p-5 sm:p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 h-full flex flex-col"
                      >
                        <div className="aspect-square w-full rounded-lg border border-border bg-surface-subtle mb-4 overflow-hidden relative shrink-0">
                          {hasPhoto ? (
                            <img
                              src={mentor.image}
                              alt={mentor.name}
                              className="h-full w-full object-cover object-center"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                              <span className="font-display font-bold text-primary text-2xl">
                                {mentorInitials(mentor.name, mentor.initials)}
                              </span>
                            </div>
                          )}
                          {mentor.linkedinUrl ? (
                            <a
                              href={mentor.linkedinUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${mentor.name} on LinkedIn`}
                              title={`${mentor.name} on LinkedIn`}
                              className="absolute right-2.5 bottom-2.5 inline-flex h-[22px] w-[22px] items-center justify-center transition-transform hover:-translate-y-0.5 z-10"
                            >
                              <img
                                src="/images/linkedin.png"
                                alt=""
                                aria-hidden="true"
                                className="h-full w-full object-contain rounded-[7px] grayscale opacity-60 hover:opacity-90 transition-opacity"
                              />
                            </a>
                          ) : null}
                        </div>

                        <h3 className="font-display font-semibold text-xl text-foreground mb-1">
                          {mentor.name}
                        </h3>
                        <p className="text-sm text-primary mb-3">
                          {mentor.designation}
                          {" · "}
                          <span className="font-bold text-foreground">{mentor.organization}</span>
                        </p>

                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                          {mentor.bio}
                        </p>

                        <div className="flex flex-wrap gap-1.5 mt-auto">
                          {expertiseList.map((exp) => (
                            <span
                              key={exp}
                              className="px-2.5 py-1 rounded-md text-xs font-medium bg-secondary text-secondary-foreground border border-border"
                            >
                              {exp}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </AnimatePresence>
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
