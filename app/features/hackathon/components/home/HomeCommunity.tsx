import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "~/features/hackathon/hooks/useScrollReveal";
import { WHATSAPP_COMMUNITY_URL } from "~/features/hackathon/components/WhatsAppCommunityCta";
import { WhatsAppLogo } from "~/features/hackathon/components/WhatsAppLogo";

export default function HomeCommunity() {
  const { ref, isInView } = useScrollReveal();
  const reduceMotion = useReducedMotion();

  return (
    <section className="pb-20 lg:pb-28" ref={ref}>
      <div className="container">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10 border border-border rounded-xl bg-surface px-6 py-8 sm:px-10 sm:py-10"
        >
          <div className="flex items-center gap-4 shrink-0">
            <div
              className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-sm"
              aria-hidden
            >
              <WhatsAppLogo className="w-7 h-7" />
            </div>
            <span className="ukis-eyebrow lg:hidden">Community</span>
          </div>

          <div className="flex-1 min-w-0">
            <p className="ukis-eyebrow mb-2 hidden lg:block">Community</p>
            <h3 className="font-display font-semibold text-xl sm:text-2xl text-foreground mb-2">
              Stay in the loop with the cohort
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
              Join the PACE WhatsApp channel for problem clarifications, mentor access,
              workshops, reminders, and official programme updates.
            </p>
          </div>

          <a
            href={WHATSAPP_COMMUNITY_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#25D366] text-white font-semibold text-sm rounded-lg hover:opacity-90 transition-opacity shrink-0 min-h-11"
          >
            <WhatsAppLogo className="w-5 h-5" />
            Join Community
            <ArrowRight className="w-4 h-4" aria-hidden />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
