import {
  ArrowUpRight,
  BookOpenText,
  FileCheck2,
  Home,
  Lightbulb,
  Scale,
  UserRoundPlus,
  Users,
} from "lucide-react";
import { Link } from "~/features/hackathon/lib/router";
import { problems } from "~/features/hackathon/lib/data";
import { buildSiteMapSeoMeta } from "~/features/hackathon/lib/seo";

export const meta = buildSiteMapSeoMeta;

const primaryLinks = [
  {
    href: "/",
    title: "Hackathon Home",
    description: "Overview, participation format, prizes, partners and UKIS 2026 updates.",
    icon: Home,
  },
  {
    href: "/problems",
    title: "Problem Statements",
    description: "Explore all 12 challenges published for UKIS Hackathon 2026.",
    icon: BookOpenText,
  },
  {
    href: "/solutions",
    title: "Accepted Solutions",
    description: "Discover reviewed projects submitted by UKIS participants.",
    icon: Lightbulb,
  },
  {
    href: "/mentors",
    title: "Mentors",
    description: "Meet the experts supporting participating builders and teams.",
    icon: Users,
  },
] as const;

const participationLinks = [
  {
    href: "/register/solution",
    title: "Participant Registration",
    description: "Register solo or with a team of 2, 3 or 4 people.",
    icon: FileCheck2,
  },
  {
    href: "/register/mentor",
    title: "Mentor Application",
    description: "Apply to guide UKIS teams as a subject-matter mentor.",
    icon: UserRoundPlus,
  },
  {
    href: "/terms-and-conditions",
    title: "Rules and Eligibility",
    description: "Read the official participation, submission and judging rules.",
    icon: Scale,
  },
] as const;

function NavigationCard({
  href,
  title,
  description,
  icon: Icon,
}: (typeof primaryLinks)[number] | (typeof participationLinks)[number]) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
    >
      <div className="absolute inset-x-0 top-0 h-1 brand-gradient opacity-80" aria-hidden />
      <div className="mb-4 flex items-center justify-between">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="h-5 w-5" strokeWidth={1.8} />
        </span>
        <ArrowUpRight
          className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
          aria-hidden
        />
      </div>
      <h2 className="font-display text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
        {title}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
    </Link>
  );
}

export default function SiteMap() {
  return (
    <div className="pb-20 pt-28 sm:pt-32">
      <div className="container">
        <header className="max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Explore UKIS 2026
          </p>
          <h1 className="font-display text-4xl font-bold text-foreground sm:text-5xl">
            UKIS Hackathon <span className="text-brand-accent">Site Map</span>
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Find every public UKIS Hackathon page, from problem statements and solutions to
            registration, mentors and official rules.
          </p>
        </header>

        <section className="mt-12" aria-labelledby="explore-pages">
          <h2 id="explore-pages" className="font-display text-2xl font-semibold text-foreground">
            Explore the programme
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {primaryLinks.map((item) => (
              <NavigationCard key={item.href} {...item} />
            ))}
          </div>
        </section>

        <section className="mt-12" aria-labelledby="participation-pages">
          <h2
            id="participation-pages"
            className="font-display text-2xl font-semibold text-foreground"
          >
            Participate in UKIS
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {participationLinks.map((item) => (
              <NavigationCard key={item.href} {...item} />
            ))}
          </div>
        </section>

        <section className="mt-12" aria-labelledby="problem-pages">
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                  12 challenges
                </p>
                <h2
                  id="problem-pages"
                  className="mt-2 font-display text-2xl font-semibold text-foreground"
                >
                  Problem statement directory
                </h2>
              </div>
              <Link
                href="/problems"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
              >
                View all problems <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>

            <ol className="mt-6 grid gap-3 md:grid-cols-2">
              {problems.map((problem) => (
                <li key={problem.id}>
                  <Link
                    href={`/problems/${problem.id}`}
                    className="group flex h-full items-start gap-3 rounded-xl border border-border bg-background/60 p-4 transition-colors hover:border-primary/35 hover:bg-primary/5"
                  >
                    <span className="mt-0.5 rounded-md bg-primary/10 px-2 py-1 font-mono text-xs font-bold text-primary">
                      {problem.id}
                    </span>
                    <span className="text-sm font-medium leading-relaxed text-foreground group-hover:text-primary">
                      {problem.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>
    </div>
  );
}
