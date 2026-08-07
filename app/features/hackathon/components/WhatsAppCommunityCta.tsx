/**
 * Shared PACE WhatsApp community channel link and CTA.
 */
import { motion } from "framer-motion";
import { WhatsAppLogo } from "~/features/hackathon/components/WhatsAppLogo";

export const WHATSAPP_COMMUNITY_URL =
  "https://chat.whatsapp.com/JJXuUPgtexo7ZhwLim7hh3";

interface WhatsAppCommunityCtaProps {
  className?: string;
  delay?: number;
}

export function WhatsAppCommunityCta({
  className = "",
  delay = 0.4,
}: WhatsAppCommunityCtaProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className={`mt-8 p-5 rounded-2xl bg-card border border-[#25D366]/20 flex flex-col sm:flex-row items-start sm:items-center gap-4 ${className}`}
    >
      <div
        className="w-11 h-11 rounded-full bg-[#25D366] flex items-center justify-center shrink-0 text-white shadow-sm"
        aria-hidden
      >
        <WhatsAppLogo className="w-6 h-6" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-foreground">
          Join the WhatsApp community
        </p>
        <p className="text-xs text-muted-foreground">
          After registration, join our WhatsApp channel for problem clarifications
          and programme updates.
        </p>
      </div>
      <motion.a
        href={WHATSAPP_COMMUNITY_URL}
        target="_blank"
        rel="noreferrer"
        whileTap={{ scale: 0.97 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-[#25D366] text-white hover:opacity-90 transition-opacity shrink-0"
      >
        <WhatsAppLogo className="w-4 h-4" />
        Join
      </motion.a>
    </motion.div>
  );
}
