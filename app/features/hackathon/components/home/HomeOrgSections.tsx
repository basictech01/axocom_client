import { motion, useReducedMotion } from "framer-motion";
import type { Icon } from "@phosphor-icons/react";
import {
  Briefcase,
  Circuitry,
  GraduationCap,
  Trophy,
  UsersThree,
} from "@phosphor-icons/react";
import { ArrowRight } from "lucide-react";
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

function SectionEyebrow({
  icon: IconComp,
  label,
  className = "mb-4",
}: {
  icon: Icon;
  label: string;
  className?: string;
}) {
  return (
    <div className={`flex items-start gap-3 ${className}`}>
      <IconComp
        className="w-7 h-7 sm:w-8 sm:h-8 text-primary shrink-0 mt-0.5"
        weight="duotone"
        aria-hidden
      />
      <p className="font-display font-bold text-base sm:text-lg tracking-tight text-primary leading-snug">
        {label}
      </p>
    </div>
  );
}

/** Challenge Sponsors: numbered runway list */
function ChallengeSponsorsSection() {
  const section = byId["challenge-sponsors"];
  const { ref, isInView } = useScrollReveal();
  const reduceMotion = useReducedMotion();

  return (
    <section
      id={section.id}
      className="relative overflow-hidden border-t border-border min-h-[100svh] flex flex-col justify-center py-12 sm:py-16"
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
          <SectionEyebrow icon={Trophy} label={section.eyebrow} className="mb-3" />
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
      className="border-t border-border bg-surface min-h-[100svh] flex flex-col justify-center py-12 sm:py-16 lg:py-20"
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
            <SectionEyebrow icon={Circuitry} label={section.eyebrow} />
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
      className="border-t border-border relative overflow-hidden min-h-[100svh] flex flex-col justify-center py-12 sm:py-16 lg:py-20"
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
            <SectionEyebrow icon={UsersThree} label={section.eyebrow} />
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
              className="text-center px-2.5 sm:px-3 py-3.5 sm:py-4 rounded-xl border border-border bg-page/90 backdrop-blur-sm"
            >
              <span className="text-xs sm:text-sm font-semibold text-foreground leading-snug">
                {mode}
              </span>
            </li>
          ))}
        </motion.ul>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <motion.p
            className="lg:col-span-4 text-sm text-foreground/80 leading-relaxed"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            {section.body[1]}
          </motion.p>

          <ul className="lg:col-span-8 relative">
            <motion.div
              aria-hidden
              className="absolute left-[11px] top-3 bottom-3 w-px origin-top bg-gradient-to-b from-primary via-primary/55 to-primary/15"
              initial={reduceMotion ? false : { scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
            />

            {section.points.map((point, i) => (
              <motion.li
                key={point}
                initial={reduceMotion ? false : { opacity: 0, x: 14 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  delay: 0.22 + i * 0.11,
                  duration: 0.45,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="relative flex gap-4 sm:gap-5 pb-7 last:pb-0"
              >
                <div className="relative z-10 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center">
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 rounded-full border border-primary/40"
                    initial={reduceMotion ? false : { scale: 0.5, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{
                      delay: 0.28 + i * 0.11,
                      duration: 0.4,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                  />
                  <motion.span
                    aria-hidden
                    className="h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_0_4px] shadow-primary/15"
                    initial={reduceMotion ? false : { scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{
                      delay: 0.34 + i * 0.11,
                      type: "spring",
                      stiffness: 420,
                      damping: 22,
                    }}
                  />
                </div>
                <p className="pt-0.5 text-sm sm:text-[0.95rem] text-foreground leading-relaxed">
                  {point}
                </p>
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
      className="border-t border-border bg-surface min-h-[100svh] flex flex-col justify-center py-12 sm:py-16 lg:py-20"
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
            <SectionEyebrow icon={GraduationCap} label={section.eyebrow} />
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
      className="border-t border-border relative overflow-hidden min-h-[100svh] flex flex-col justify-center py-12 sm:py-16 lg:py-20"
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
            <SectionEyebrow icon={Briefcase} label={section.eyebrow} />
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
