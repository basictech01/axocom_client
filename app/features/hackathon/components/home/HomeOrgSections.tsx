import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Building2,
  Cloud,
  GraduationCap,
  Trophy,
} from "lucide-react";
import { WHATSAPP_COMMUNITY_URL } from "~/features/hackathon/components/WhatsAppCommunityCta";
import { useScrollReveal } from "~/features/hackathon/hooks/useScrollReveal";
import { ORG_SECTIONS } from "./data";
import SectionImageSlot from "./SectionImageSlot";

const byId = Object.fromEntries(ORG_SECTIONS.map((s) => [s.id, s])) as Record<
  (typeof ORG_SECTIONS)[number]["id"],
  (typeof ORG_SECTIONS)[number]
>;

const TECH_OFFERINGS = [
  "Cloud credits",
  "APIs",
  "Software",
  "Cybersecurity",
  "Data tools",
  "Engineers",
  "Workshops",
] as const;

const HIRING_MODES = [
  "Mentors",
  "Interviews",
  "Internships",
  "Apprenticeships",
  "Contracts",
  "Jobs",
] as const;

function slotSrc(image: string) {
  return image.trim() ? image : undefined;
}

/** Challenge Sponsors: numbered runway list */
function ChallengeSponsorsSection() {
  const section = byId["challenge-sponsors"];
  const { ref, isInView } = useScrollReveal();
  const reduceMotion = useReducedMotion();

  return (
    <section
      id={section.id}
      className="relative overflow-hidden border-t border-border py-10 sm:py-12 lg:py-14"
      ref={ref}
    >
      <SectionImageSlot
        src={slotSrc(section.image)}
        label={section.imageLabel}
        fadeTo="page"
        fade
      />
      <div className="container relative z-10">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="max-w-3xl mb-5"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Trophy className="w-4 h-4" strokeWidth={1.5} aria-hidden />
            </span>
            <p className="ukis-eyebrow mb-0">{section.eyebrow}</p>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground leading-tight mb-3">
            {section.title}
          </h2>
          {section.body.map((para) => (
            <p key={para} className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-2 last:mb-0">
              {para}
            </p>
          ))}
        </motion.div>

        <ol className="border-y border-border divide-y divide-border">
          {section.points.map((point, i) => (
            <motion.li
              key={point}
              initial={reduceMotion ? false : { opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.06 + i * 0.05, duration: 0.4 }}
              className="grid grid-cols-[auto_1fr] gap-4 sm:gap-6 py-2.5 sm:py-3 group"
            >
              <span className="font-display font-bold text-xl sm:text-2xl tabular-nums text-primary/40 group-hover:text-primary transition-colors w-9">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-sm text-foreground leading-snug pt-0.5">
                {point}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Technology Partners: offering chips + 2x2 benefit mosaic */
function TechnologyPartnersSection() {
  const section = byId["technology-partners"];
  const { ref, isInView } = useScrollReveal();
  const reduceMotion = useReducedMotion();

  return (
    <section
      id={section.id}
      className="ukis-section border-t border-border bg-surface"
      ref={ref}
    >
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <motion.div
            className="lg:col-span-4"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Cloud className="w-5 h-5" strokeWidth={1.5} aria-hidden />
              </span>
              <p className="ukis-eyebrow mb-0">{section.eyebrow}</p>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground leading-tight mb-5">
              {section.title}
            </h2>
            {section.body.map((para) => (
              <p key={para} className="text-sm text-muted-foreground leading-relaxed mb-3">
                {para}
              </p>
            ))}
          </motion.div>

          <div className="lg:col-span-8 space-y-8">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.08, duration: 0.4 }}
            >
              <p className="text-xs font-mono uppercase tracking-[0.14em] text-muted-foreground mb-4">
                What you can provide
              </p>
              <div className="flex flex-wrap gap-2">
                {TECH_OFFERINGS.map((item) => (
                  <span
                    key={item}
                    className="px-3.5 py-2 text-sm font-medium text-foreground border border-border bg-page/90 rounded-lg"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>

            <div>
              <p className="text-xs font-mono uppercase tracking-[0.14em] text-muted-foreground mb-4">
                {section.pointsLabel}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border border border-border rounded-xl overflow-hidden">
                {section.points.map((point, i) => (
                  <motion.div
                    key={point}
                    initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.12 + i * 0.05, duration: 0.4 }}
                    className="bg-surface p-5 sm:p-6 min-h-[120px]"
                  >
                    <span className="font-mono text-xs text-primary mb-3 block">
                      0{i + 1}
                    </span>
                    <p className="text-sm text-foreground leading-relaxed">{point}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Hiring Partners: mode strip + timeline list */
function HiringPartnersSection() {
  const section = byId["hiring-partners"];
  const { ref, isInView } = useScrollReveal();
  const reduceMotion = useReducedMotion();

  return (
    <section
      id={section.id}
      className="ukis-section border-t border-border relative overflow-hidden"
      ref={ref}
    >
      <SectionImageSlot
        src={slotSrc(section.image)}
        label={section.imageLabel}
        fadeTo="page"
        blur
        fadeLight
      />
      <div className="container relative z-10">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10"
        >
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Briefcase className="w-5 h-5" strokeWidth={1.5} aria-hidden />
              </span>
              <p className="ukis-eyebrow mb-0">{section.eyebrow}</p>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground leading-tight">
              {section.title}
            </h2>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-md md:text-right">
            {section.body[0]}
          </p>
        </motion.div>

        <motion.ul
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.08, duration: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-12"
        >
          {HIRING_MODES.map((mode) => (
            <li
              key={mode}
              className="text-center px-3 py-4 rounded-xl border border-dashed border-border bg-surface-subtle/80"
            >
              <span className="text-sm font-semibold text-foreground">{mode}</span>
            </li>
          ))}
        </motion.ul>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <motion.p
            className="lg:col-span-4 text-sm text-muted-foreground leading-relaxed"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            {section.body[1]}
          </motion.p>
          <ul className="lg:col-span-8 space-y-0 border-l border-border pl-5 sm:pl-6">
            {section.points.map((point, i) => (
              <motion.li
                key={point}
                initial={reduceMotion ? false : { opacity: 0, x: 8 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.12 + i * 0.05, duration: 0.35 }}
                className="relative py-3.5 border-b border-border last:border-b-0"
              >
                <span className="absolute -left-[1.4rem] sm:-left-[1.65rem] top-5 h-2 w-2 rounded-full bg-primary" />
                <p className="text-sm text-foreground leading-relaxed">{point}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** Knowledge Partners: two-column editorial (no overlapping columns) */
function KnowledgePartnersSection() {
  const section = byId["knowledge-partners"];
  const { ref, isInView } = useScrollReveal();
  const reduceMotion = useReducedMotion();

  return (
    <section
      id={section.id}
      className="ukis-section border-t border-border bg-surface"
      ref={ref}
    >
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <motion.div
            className="lg:col-span-5"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <GraduationCap className="w-5 h-5" strokeWidth={1.5} aria-hidden />
              </span>
              <p className="ukis-eyebrow mb-0">{section.eyebrow}</p>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground leading-tight mb-5">
              {section.title}
            </h2>
            {section.body.map((para) => (
              <p key={para} className="text-base text-muted-foreground leading-relaxed mb-4">
                {para}
              </p>
            ))}
          </motion.div>

          <div className="lg:col-span-7">
            <p className="text-sm font-medium text-foreground mb-6">{section.pointsLabel}</p>
            <div className="space-y-8">
              {section.points.map((point, i) => (
                <motion.div
                  key={point}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.4 }}
                  className="flex gap-4 sm:gap-6"
                >
                  <span className="font-display font-bold text-4xl sm:text-5xl text-primary/20 leading-none shrink-0 w-12 sm:w-16">
                    {i + 1}
                  </span>
                  <p className="text-sm sm:text-base text-foreground leading-relaxed pt-1 border-t border-border flex-1">
                    {point}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Hiring opportunity: normal section text over background (no white panel) */
function HiringOpportunitySection() {
  const section = byId["hiring-opportunity"];
  const { ref, isInView } = useScrollReveal();
  const reduceMotion = useReducedMotion();

  return (
    <section
      id={section.id}
      className="ukis-section border-t border-border relative overflow-hidden"
      ref={ref}
    >
      <SectionImageSlot
        src={slotSrc(section.image)}
        label={section.imageLabel}
        fadeTo="page"
        fade
      />
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <motion.div
            className="lg:col-span-5"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Building2 className="w-5 h-5" strokeWidth={1.5} aria-hidden />
              </span>
              <p className="ukis-eyebrow mb-0">{section.eyebrow}</p>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground leading-tight mb-5">
              {section.title}
            </h2>
            {section.body.map((para) => (
              <p key={para} className="text-base text-muted-foreground leading-relaxed mb-4">
                {para}
              </p>
            ))}
            <a
              href={WHATSAPP_COMMUNITY_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 mt-2 px-6 py-3.5 bg-primary text-primary-foreground font-semibold text-sm rounded-lg hover:bg-primary-hover transition-colors min-h-11"
            >
              Talk to us about hiring
              <ArrowRight className="w-4 h-4" aria-hidden />
            </a>
          </motion.div>

          <motion.div
            className="lg:col-span-7"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.08, duration: 0.45 }}
          >
            <p className="text-sm font-medium text-foreground mb-5">{section.pointsLabel}</p>
            <ul className="space-y-3">
              {section.points.map((point, i) => (
                <motion.li
                  key={point}
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.35 }}
                  className="flex gap-3 items-start rounded-xl border border-border bg-surface/80 px-4 py-4"
                >
                  <span className="font-mono text-xs text-primary shrink-0 pt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm text-muted-foreground leading-relaxed">{point}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function HomeOrgSections() {
  return (
    <>
      <ChallengeSponsorsSection />
      <TechnologyPartnersSection />
      <HiringPartnersSection />
      <KnowledgePartnersSection />
      <HiringOpportunitySection />
    </>
  );
}
