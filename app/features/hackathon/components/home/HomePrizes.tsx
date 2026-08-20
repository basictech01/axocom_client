import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Cpu,
  GraduationCap,
  MapPin,
  Target,
  Trophy,
  UserRoundCheck,
  type LucideIcon,
} from "lucide-react";
import { useScrollReveal } from "~/features/hackathon/hooks/useScrollReveal";
import { Link } from "~/features/hackathon/lib/router";

const TOTAL_REWARDS = 1_000_000;
const indianNumber = new Intl.NumberFormat("en-IN");

type Prize = {
  number: string;
  title: string;
  amount: string;
  benefits: string;
  icon: LucideIcon;
  highest?: boolean;
};

const podiumPrizes: Prize[] = [
  {
    number: "01",
    title: "State Champion",
    amount: "₹51,000",
    benefits: "₹1,00,000 in exclusive benefits",
    icon: Trophy,
    highest: true,
  },
  {
    number: "02",
    title: "Kumaon Level",
    amount: "₹21,000",
    benefits: "₹50,000 in exclusive benefits",
    icon: MapPin,
  },
  {
    number: "03",
    title: "Garhwal Level",
    amount: "₹21,000",
    benefits: "₹50,000 in exclusive benefits",
    icon: MapPin,
  },
];

const secondaryPrizes: Prize[] = [
  {
    number: "04",
    title: "Problem Level",
    amount: "₹10,000",
    benefits: "₹25,000 in exclusive benefits",
    icon: Target,
  },
  {
    number: "05",
    title: "AI Credit",
    amount: "₹5,000",
    benefits: "UNIUN AI credit",
    icon: Cpu,
  },
];

const benefits = [
  { label: "Mentorship", icon: GraduationCap },
  { label: "Internships", icon: BriefcaseBusiness },
  { label: "Certificates", icon: BadgeCheck },
  { label: "Job opportunities", icon: UserRoundCheck },
];

function useRewardCount(isInView: boolean, reduceMotion: boolean | null) {
  const [value, setValue] = useState(0);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!isInView || hasStarted.current) return;

    hasStarted.current = true;
    if (reduceMotion) {
      setValue(TOTAL_REWARDS);
      return;
    }

    const duration = 1_250;
    const startedAt = performance.now();
    let animationFrame = 0;

    const update = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(TOTAL_REWARDS * eased));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(update);
      }
    };

    animationFrame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, reduceMotion]);

  return value;
}

function PodiumCard({
  prize,
  isInView,
  reduceMotion,
  delay,
  placement,
}: {
  prize: Prize;
  isInView: boolean;
  reduceMotion: boolean | null;
  delay: number;
  placement: string;
}) {
  const Icon = prize.icon;

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.46, delay, ease: [0.23, 1, 0.32, 1] }}
      whileHover={reduceMotion ? undefined : { y: -5 }}
      className={[
        "prize-arena-card group relative flex flex-col overflow-hidden rounded-xl p-4 sm:p-5",
        prize.highest
          ? "prize-arena-state col-span-2 min-h-[250px] sm:min-h-[270px] lg:min-h-[290px]"
          : "min-h-[205px] sm:min-h-[220px] lg:min-h-[235px]",
        placement,
      ].join(" ")}
    >
      <div className="prize-arena-accent-bg absolute inset-x-0 top-0 h-px" aria-hidden />
      <span
        className={[
          "prize-arena-watermark pointer-events-none absolute right-4 top-1 font-display font-bold",
          prize.highest ? "text-7xl sm:text-8xl" : "text-5xl sm:text-6xl",
        ].join(" ")}
        aria-hidden
      >
        {prize.number}
      </span>

      <div className="relative flex items-start justify-between gap-4">
        <div
          className={[
            "prize-arena-icon flex items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-105",
            prize.highest ? "h-12 w-12" : "h-9 w-9 sm:h-10 sm:w-10",
          ].join(" ")}
        >
          <Icon
            className={prize.highest ? "h-6 w-6" : "h-4 w-4 sm:h-5 sm:w-5"}
            strokeWidth={1.6}
            aria-hidden
          />
        </div>
        <span className="prize-arena-subtle font-mono text-[0.65rem]">{prize.number}</span>
      </div>

      <div className="relative mt-auto pt-5 sm:pt-7">
        {prize.highest ? (
          <p className="prize-arena-accent-bright mb-2 flex items-center gap-2 font-mono text-[0.6rem] font-medium uppercase">
            <span className="prize-arena-accent-bg h-px w-5" aria-hidden />
            Highest award
          </p>
        ) : null}
        <h3 className="prize-arena-accent font-mono text-[0.65rem] font-medium uppercase sm:text-xs">
          {prize.title}
        </h3>
        <p
          className={[
            "prize-arena-text mt-2 font-display font-bold",
            prize.highest ? "text-4xl sm:text-5xl" : "text-[1.75rem] sm:text-4xl",
          ].join(" ")}
        >
          {prize.amount}
        </p>
        <p className="prize-arena-copy mt-2 text-xs leading-relaxed sm:text-sm">
          {prize.benefits}
        </p>
      </div>
    </motion.article>
  );
}

export default function HomePrizes() {
  const { ref, isInView } = useScrollReveal(0.05);
  const reduceMotion = useReducedMotion();
  const rewardTotal = useRewardCount(isInView, reduceMotion);

  return (
    <section
      ref={ref}
      className="prize-arena relative flex min-h-[100svh] items-center overflow-hidden pb-12 pt-32 sm:pb-14 sm:pt-32 lg:py-24"
    >
      <div className="container relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(300px,0.78fr)_minmax(0,1.22fr)] lg:gap-10 xl:gap-14">
          <div>
            <motion.header
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.44, ease: [0.23, 1, 0.32, 1] }}
              className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left"
            >
              <p className="prize-arena-accent-bright font-mono text-[0.65rem] font-medium uppercase sm:text-xs">
                Prize pool
              </p>
              <h2 className="prize-arena-text mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.75rem]">
                <span className="block">Build for Uttarakhand.</span>
                <span className="prize-arena-accent mt-1 block">Win at every level.</span>
              </h2>
              <p className="prize-arena-copy mx-auto mt-4 max-w-xl text-sm leading-relaxed sm:text-base lg:mx-0">
                Cash awards, partner benefits, and career opportunities for solutions that create
                measurable impact.
              </p>
            </motion.header>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.48, delay: 0.08, ease: [0.23, 1, 0.32, 1] }}
              className="my-8 text-center lg:mb-0 lg:mt-10 lg:text-left"
              aria-label="10 lakh plus total rewards and benefits"
            >
              <p
                className="prize-arena-text whitespace-nowrap font-display text-[2.6rem] font-bold leading-none sm:text-6xl lg:text-[4.5rem]"
                aria-hidden
              >
                ₹{indianNumber.format(rewardTotal)}
                <span className="prize-arena-accent">+</span>
              </p>
              <p className="prize-arena-subtle mt-3 font-mono text-[0.6rem] font-medium uppercase sm:text-xs">
                Total rewards & benefits
              </p>
            </motion.div>
          </div>

          <div>
            <div className="grid grid-cols-2 items-end gap-3 sm:gap-4 lg:grid-cols-12">
              <PodiumCard
                prize={podiumPrizes[0]}
                isInView={isInView}
                reduceMotion={reduceMotion}
                delay={0.16}
                placement="lg:col-span-4 lg:col-start-5 lg:row-start-1"
              />
              <PodiumCard
                prize={podiumPrizes[1]}
                isInView={isInView}
                reduceMotion={reduceMotion}
                delay={0.24}
                placement="lg:col-span-4 lg:col-start-1 lg:row-start-1"
              />
              <PodiumCard
                prize={podiumPrizes[2]}
                isInView={isInView}
                reduceMotion={reduceMotion}
                delay={0.3}
                placement="lg:col-span-4 lg:col-start-9 lg:row-start-1"
              />
            </div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.44, delay: 0.36, ease: [0.23, 1, 0.32, 1] }}
              className="mt-3 grid grid-cols-2 gap-3 sm:gap-4"
            >
              {secondaryPrizes.map((prize) => {
                const Icon = prize.icon;

                return (
                  <motion.article
                    key={prize.title}
                    whileHover={reduceMotion ? undefined : { y: -4 }}
                    className="prize-arena-card group relative flex min-h-[150px] flex-col overflow-hidden rounded-xl p-4 sm:min-h-[155px] sm:p-5"
                  >
                    <div className="relative flex items-center justify-between gap-3">
                      <div className="prize-arena-icon flex h-9 w-9 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-105">
                        <Icon className="h-4 w-4" strokeWidth={1.6} aria-hidden />
                      </div>
                      <span className="prize-arena-subtle font-mono text-[0.6rem]">
                        {prize.number}
                      </span>
                    </div>
                    <div className="mt-auto pt-4">
                      <h3 className="prize-arena-accent font-mono text-[0.6rem] font-medium uppercase sm:text-xs">
                        {prize.title}
                      </h3>
                      <p className="prize-arena-text mt-1.5 font-display text-2xl font-bold sm:text-3xl">
                        {prize.amount}
                      </p>
                      <p className="prize-arena-copy mt-1.5 text-[0.7rem] leading-relaxed sm:text-xs">
                        {prize.benefits}
                      </p>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.44, delay: 0.44, ease: [0.23, 1, 0.32, 1] }}
          className="prize-arena-line mt-10 border-y lg:mt-8"
        >
          <p className="prize-arena-accent-bright prize-arena-line border-b py-3 text-center font-mono text-[0.65rem] font-medium uppercase">
            The win goes beyond cash
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;

              return (
                <div
                  key={benefit.label}
                  className={[
                    "prize-arena-text prize-arena-line flex min-h-16 items-center gap-2.5 px-3 py-3 sm:gap-3 sm:px-4",
                    index % 2 === 1 ? "border-l" : "",
                    index >= 2 ? "border-t lg:border-t-0" : "",
                    index > 0 ? "lg:border-l" : "",
                  ].join(" ")}
                >
                  <Icon
                    className="prize-arena-accent h-4 w-4 shrink-0 sm:h-5 sm:w-5"
                    strokeWidth={1.6}
                    aria-hidden
                  />
                  <span className="text-xs font-medium sm:text-sm">{benefit.label}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        <div className="mt-6 flex justify-center sm:justify-end">
          <Link
            href="/terms-and-conditions#prizes"
            className="prize-arena-link group inline-flex items-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus"
          >
            View prize terms
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
