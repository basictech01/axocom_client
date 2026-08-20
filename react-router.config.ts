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
  ],
} satisfies Config;
