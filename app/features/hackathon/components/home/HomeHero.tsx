import { motion, useReducedMotion } from "framer-motion";
import { Link } from "~/features/hackathon/lib/router";
import { ArrowRight } from "lucide-react";
import { HERO } from "./data";

export default function HomeHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-[100svh] flex items-end lg:items-center overflow-hidden pt-24 pb-16 lg:pb-24">
      <div className="absolute inset-0 bg-page" />
      <div className="ukis-contour" />
      <div className="ukis-jaali" />

      {/* Full-bleed editorial image - right ~55% on desktop */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[86%] pointer-events-none">
        <img
          src="/hackathon/logos/prop.webp"
          srcSet="/hackathon/logos/prop-ukis-hero-720.jpg 720w, /hackathon/logos/prop-ukis-hero-1200.jpg 1200w, /hackathon/logos/prop.webp 1448w"
          alt="Illustrated Uttarakhand mountains, landmarks, farmer, workers, crowds and the UKIS mark"
          width={1448}
          height={1086}
          sizes="(min-width: 1024px) 86vw, 100vw"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="h-full w-full object-cover object-center ukis-image-blend "
        />
        <div className="absolute inset-0 bg-gradient-to-t from-page via-page/40 to-transparent lg:bg-gradient-to-l lg:from-transparent lg:via-page/30 lg:to-page" />
      </div>

      <div className="container relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end lg:items-center">
          <motion.div
            className="lg:col-span-6 xl:col-span-5"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          >
            <h1 className="ukis-eyebrow mb-5">{HERO.eyebrow}</h1>

            <p className="font-display font-bold text-[2.35rem] sm:text-5xl lg:text-[3.4rem] xl:text-[3.75rem] leading-[1.08] tracking-tight text-foreground mb-6 max-w-xl">
              {HERO.headlineLead}{" "}
              <span className="ukis-accent-word">{HERO.headlineAccent}</span>
            </p>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-md mb-8">
              {HERO.support}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Link href="/problems">
                <span className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground font-semibold text-sm rounded-lg hover:bg-primary-hover transition-colors min-h-11">
                  Explore Problems
                  <ArrowRight className="w-4 h-4" aria-hidden />
                </span>
              </Link>
              <Link href="/mentors">
                <span className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-border bg-transparent text-foreground font-semibold text-sm rounded-lg hover:bg-surface-subtle transition-colors min-h-11">
                  Meet Mentors
                </span>
              </Link>
            </div>

            <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 border-t border-border pt-6 max-w-xl">
              {HERO.meta.map((item) => (
                <div key={item.label}>
                  <dt className="ukis-eyebrow mb-1.5 !text-[0.6rem]">{item.label}</dt>
                  <dd className="text-sm text-foreground font-medium leading-snug">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>

          {/* Spacer columns for the image on desktop */}
          <div className="hidden lg:block lg:col-span-6 xl:col-span-7" aria-hidden />
        </div>
      </div>
    </section>
  );
}
