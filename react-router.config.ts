import type { Config } from "@react-router/dev/config";

export default {
  ssr: false,
  prerender: [
    "/",
    "/DevbhoomiAISummit",
    "/UISHackathon",
    "/nprweek2026",
    "/election-management",
    "/careers",
  ],
} satisfies Config;
