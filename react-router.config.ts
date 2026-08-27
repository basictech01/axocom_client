import type { Config } from "@react-router/dev/config";
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import {
  HACKATHON_INDEXABLE_PATHS,
  HACKATHON_SITE_MAP_PATH,
} from "./app/features/hackathon/lib/public-routes";

const SITE_ORIGIN = "https://www.axocom.in";
const HACKATHON_LAST_MODIFIED = "2026-08-27";

const OTHER_PRERENDER_PATHS = [
  "/",
  "/DevbhoomiAISummit",
  "/DevbhoomiAISummit/nomination",
  "/DevbhoomiAISummit/delegate-pass",
  "/nprweek2026",
  "/election-management",
  "/careers",
  "/support",
  "/privacy-policy",
  "/terms-and-conditions",
  "/refund-policy",
] as const;

const OTHER_SITEMAP_PATHS = [
  "/",
  "/DevbhoomiAISummit",
  "/nprweek2026",
  "/election-management",
  "/careers",
] as const;

const ALL_PRERENDER_PATHS: string[] = [
  ...OTHER_PRERENDER_PATHS,
  ...HACKATHON_INDEXABLE_PATHS,
  HACKATHON_SITE_MAP_PATH,
];

const CLIENT_ONLY_PATHS = [
  "/login",
  "/UISHackathon",
  "/UKISHackathon/hackathon-proposal-slides",
  "/UKISHackathon/admin",
  "/UKISHackathon/admin/sign-in",
  "/dashboard",
  "/candidates",
  "/candidates/:id",
  "/voters",
  "/voters/:id",
  "/constituency",
  "/elections",
  "/parties",
  "/parties/:id",
] as const;

function sitemapEntry(path: string, lastModified?: string): string {
  const lastModifiedElement = lastModified
    ? `\n    <lastmod>${lastModified}</lastmod>`
    : "";

  return `  <url>\n    <loc>${SITE_ORIGIN}${path}</loc>${lastModifiedElement}\n  </url>`;
}

function createSitemap(): string {
  const entries = [
    ...OTHER_SITEMAP_PATHS.map((path) => sitemapEntry(path)),
    ...HACKATHON_INDEXABLE_PATHS.map((path) =>
      sitemapEntry(path, HACKATHON_LAST_MODIFIED),
    ),
  ];

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries,
    "</urlset>",
    "",
  ].join("\n");
}

function createServeConfig(): string {
  return `${JSON.stringify(
    {
      trailingSlash: false,
      rewrites: [
        ...ALL_PRERENDER_PATHS.map((path) => ({
          source: path,
          destination: path === "/" ? "/index.html" : `${path}/index.html`,
        })),
        ...CLIENT_ONLY_PATHS.map((path) => ({
          source: path,
          destination: "/__spa-fallback.html",
        })),
      ],
    },
    null,
    2,
  )}\n`;
}

async function protectSpaFallback(buildDirectory: string): Promise<void> {
  const fallbackPath = join(buildDirectory, "client", "__spa-fallback.html");
  const fallbackHtml = await readFile(fallbackPath, "utf8");
  const noIndexTag = '<meta name="robots" content="noindex, nofollow">';

  if (fallbackHtml.includes(noIndexTag)) return;
  if (!fallbackHtml.includes("</head>")) {
    throw new Error("Unable to add noindex protection to the SPA fallback.");
  }

  await writeFile(
    fallbackPath,
    fallbackHtml.replace("</head>", `${noIndexTag}</head>`),
    "utf8",
  );
}

export default {
  ssr: false,
  prerender: ALL_PRERENDER_PATHS,
  async buildEnd({ reactRouterConfig }) {
    const clientBuildDirectory = join(reactRouterConfig.buildDirectory, "client");

    await Promise.all([
      writeFile(join(clientBuildDirectory, "sitemap.xml"), createSitemap(), "utf8"),
      writeFile(join(clientBuildDirectory, "serve.json"), createServeConfig(), "utf8"),
      protectSpaFallback(reactRouterConfig.buildDirectory),
    ]);
  },
} satisfies Config;
