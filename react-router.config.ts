import type { Config } from "@react-router/dev/config";

export default {
  ssr: false,
  prerender: [
    "/",
    "/DevbhoomiAISummit",
    "/DevbhoomiAISummit/nomination",
    "/DevbhoomiAISummit/delegate-pass",
    "/UKISHackathon",
    "/nprweek2026",
    "/election-management",
    "/careers",
    "/support",
    "/privacy-policy",
    "/terms-and-conditions",
    "/refund-policy",
  ],
} satisfies Config;
