import type { Config } from "@react-router/dev/config";

export default {
  ssr: false,
  prerender: [
    "/",
    "/DevbhoomiAISummit",
    "/UKISHackathon",
    "/nprweek2026",
    "/election-management",
    "/careers",
  ],
} satisfies Config;
