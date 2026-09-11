import { describe, expect, it } from "vitest";
import type { MetaDescriptor } from "react-router";
import { problems } from "~/features/hackathon/lib/data";
import {
  buildHomeSeoMeta,
  buildMentorRegistrationSeoMeta,
  buildMentorsSeoMeta,
  buildParticipantRegistrationSeoMeta,
  buildProblemSeoMeta,
  buildProblemsSeoMeta,
  buildSolutionsSeoMeta,
  buildTermsSeoMeta,
} from "~/features/hackathon/lib/seo";

function descriptorValue(meta: MetaDescriptor[], key: "name" | "property", value: string) {
  const descriptor = meta.find(
    (item) => key in item && item[key as keyof typeof item] === value,
  ) as { content?: string } | undefined;
  return descriptor?.content;
}

function titleValue(meta: MetaDescriptor[]) {
  const descriptor = meta.find((item) => "title" in item) as { title?: string } | undefined;
  return descriptor?.title;
}

function canonicalValue(meta: MetaDescriptor[]) {
  const descriptor = meta.find(
    (item) => "tagName" in item && item.tagName === "link" && item.rel === "canonical",
  ) as { href?: string } | undefined;
  return descriptor?.href;
}

function schemaValue(meta: MetaDescriptor[]) {
  const descriptor = meta.find((item) => "script:ld+json" in item) as
    | { "script:ld+json"?: unknown }
    | undefined;
  return descriptor?.["script:ld+json"];
}

const publicPages = [
  { path: "/UKISHackathon", meta: buildHomeSeoMeta() },
  { path: "/UKISHackathon/problems", meta: buildProblemsSeoMeta() },
  ...problems.map((problem) => ({
    path: `/UKISHackathon/problems/${problem.id}`,
    meta: buildProblemSeoMeta(problem.id),
  })),
  { path: "/UKISHackathon/solutions", meta: buildSolutionsSeoMeta() },
  { path: "/UKISHackathon/mentors", meta: buildMentorsSeoMeta() },
  {
    path: "/UKISHackathon/register/solution",
    meta: buildParticipantRegistrationSeoMeta(),
  },
  { path: "/UKISHackathon/register/mentor", meta: buildMentorRegistrationSeoMeta() },
  { path: "/UKISHackathon/terms-and-conditions", meta: buildTermsSeoMeta() },
];

describe("UKIS Hackathon SEO contract", () => {
  it("defines 19 public pages with unique titles, descriptions, and self-canonicals", () => {
    expect(publicPages).toHaveLength(19);

    const titles = publicPages.map(({ meta }) => titleValue(meta));
    const descriptions = publicPages.map(({ meta }) => descriptorValue(meta, "name", "description"));

    expect(new Set(titles).size).toBe(publicPages.length);
    expect(new Set(descriptions).size).toBe(publicPages.length);

    for (const page of publicPages) {
      expect(canonicalValue(page.meta)).toBe(`https://www.axocom.in${page.path}`);
      expect(descriptorValue(page.meta, "name", "robots")).toContain("index, follow");
    }
  });

  it("emits complete social metadata and safely structured JSON-LD on every public page", () => {
    for (const { meta } of publicPages) {
      expect(descriptorValue(meta, "property", "og:site_name")).toBe("UKIS Hackathon");
      expect(descriptorValue(meta, "property", "og:image")).toBe(
        "https://www.axocom.in/hackathon/ukis-2026-social-card.jpg",
      );
      expect(descriptorValue(meta, "property", "og:image:secure_url")).toBe(
        "https://www.axocom.in/hackathon/ukis-2026-social-card.jpg",
      );
      expect(descriptorValue(meta, "property", "og:image:type")).toBe("image/jpeg");
      expect(descriptorValue(meta, "property", "og:image:width")).toBe("1200");
      expect(descriptorValue(meta, "property", "og:image:height")).toBe("630");
      expect(descriptorValue(meta, "name", "twitter:card")).toBe("summary_large_image");
      expect(meta.some((item) => "script:ld+json" in item)).toBe(true);
      expect(meta.some((item) => "name" in item && item.name === "keywords")).toBe(false);

      const schema = JSON.stringify(schemaValue(meta));
      expect(schema).toContain("Axolotl Emprise LLP");
      expect(schema).not.toContain('"@type":"Event"');
      expect(schema).not.toContain("Pushkar Singh Dhami");
      expect(schema).not.toContain("Pradeep Batra");
    }
  });

  it("canonicalizes problem-prefill registration variants to the base registration URL", () => {
    expect(canonicalValue(buildParticipantRegistrationSeoMeta())).toBe(
      "https://www.axocom.in/UKISHackathon/register/solution",
    );
  });

  it("marks an invalid problem ID as noindex", () => {
    const meta = buildProblemSeoMeta("P-999");
    expect(descriptorValue(meta, "name", "robots")).toContain("noindex, nofollow");
    expect(canonicalValue(meta)).toBeUndefined();
  });
});
