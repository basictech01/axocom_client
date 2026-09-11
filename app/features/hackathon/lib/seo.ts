import type { MetaDescriptor } from "react-router";
import { problems, type Problem } from "~/features/hackathon/lib/data";
import { MENTORS } from "~/features/hackathon/lib/mentors";
import { getProblemOwner } from "~/features/hackathon/lib/problem-owners";
import { HACKATHON_BASE_PATH } from "~/features/hackathon/lib/router";

export const HACKATHON_SITE_URL = "https://www.axocom.in";
export const HACKATHON_SITE_NAME = "UKIS Hackathon";
export const HACKATHON_SOCIAL_IMAGE = "/hackathon/ukis-2026-social-card.jpg";

const HACKATHON_SOCIAL_IMAGE_ALT =
  "Illustrated Uttarakhand mountains, landmarks, farmer, workers, crowds, and the UKIS mark";
const ORGANISER_ID = `${HACKATHON_SITE_URL}${HACKATHON_BASE_PATH}#organiser`;

type JsonLdPrimitive = string | number | boolean | null;
type JsonLdValue = JsonLdPrimitive | JsonLdObject | JsonLdValue[];
type JsonLdObject = { [key: string]: JsonLdValue };

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface HackathonSeoConfig {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  publishedTime?: string;
  schema?: JsonLdObject[];
}

const absoluteUrl = (pathOrUrl: string) => {
  if (/^https:\/\//i.test(pathOrUrl)) return pathOrUrl;
  return `${HACKATHON_SITE_URL}${pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`}`;
};

const pageId = (path: string) => `${absoluteUrl(path)}#webpage`;
const breadcrumbId = (path: string) => `${absoluteUrl(path)}#breadcrumb`;
const itemListId = (path: string) => `${absoluteUrl(path)}#itemlist`;

const organiserSchema: JsonLdObject = {
  "@type": "Organization",
  "@id": ORGANISER_ID,
  name: "Axolotl Emprise LLP",
  legalName: "Axolotl Emprise LLP",
  url: `${HACKATHON_SITE_URL}${HACKATHON_BASE_PATH}`,
};

function imageSchema(image = HACKATHON_SOCIAL_IMAGE, alt = HACKATHON_SOCIAL_IMAGE_ALT): JsonLdObject {
  return {
    "@type": "ImageObject",
    url: absoluteUrl(image),
    contentUrl: absoluteUrl(image),
    width: 1200,
    height: 630,
    caption: alt,
  };
}

function webPageSchema({
  title,
  description,
  path,
  image = HACKATHON_SOCIAL_IMAGE,
  imageAlt = HACKATHON_SOCIAL_IMAGE_ALT,
  pageType = "WebPage",
  mainEntityId,
  breadcrumbs,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  pageType?: "WebPage" | "CollectionPage";
  mainEntityId?: string;
  breadcrumbs?: BreadcrumbItem[];
}): JsonLdObject {
  return {
    "@type": pageType,
    "@id": pageId(path),
    url: absoluteUrl(path),
    name: title,
    description,
    inLanguage: "en-IN",
    primaryImageOfPage: imageSchema(image, imageAlt),
    publisher: { "@id": ORGANISER_ID },
    ...(mainEntityId ? { mainEntity: { "@id": mainEntityId } } : {}),
    ...(breadcrumbs ? { breadcrumb: { "@id": breadcrumbId(path) } } : {}),
  };
}

function breadcrumbSchema(path: string, items: BreadcrumbItem[]): JsonLdObject {
  return {
    "@type": "BreadcrumbList",
    "@id": breadcrumbId(path),
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

function graphSchema(items: JsonLdObject[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@graph": items,
  };
}

export function buildHackathonMeta({
  title,
  description,
  path,
  image = HACKATHON_SOCIAL_IMAGE,
  imageAlt = HACKATHON_SOCIAL_IMAGE_ALT,
  type = "website",
  publishedTime,
  schema = [],
}: HackathonSeoConfig): MetaDescriptor[] {
  const canonicalUrl = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return [
    { title },
    { name: "description", content: description },
    { name: "robots", content: "index, follow, max-image-preview:large" },
    { name: "author", content: "Axolotl Emprise LLP" },
    { name: "application-name", content: HACKATHON_SITE_NAME },
    { tagName: "link", rel: "canonical", href: canonicalUrl },
    { property: "og:type", content: type },
    { property: "og:site_name", content: HACKATHON_SITE_NAME },
    { property: "og:locale", content: "en_IN" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: canonicalUrl },
    { property: "og:image", content: imageUrl },
    { property: "og:image:secure_url", content: imageUrl },
    { property: "og:image:type", content: "image/jpeg" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: imageAlt },
    ...(publishedTime
      ? [{ property: "article:published_time", content: publishedTime } satisfies MetaDescriptor]
      : []),
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: imageUrl },
    { name: "twitter:image:alt", content: imageAlt },
    ...(schema.length ? [{ "script:ld+json": graphSchema(schema) } satisfies MetaDescriptor] : []),
  ];
}

export function buildHackathonNoIndexMeta(title: string, description: string): MetaDescriptor[] {
  return [
    { title },
    { name: "description", content: description },
    { name: "robots", content: "noindex, nofollow, noarchive" },
  ];
}

export function buildSiteMapSeoMeta(): MetaDescriptor[] {
  const title = "Site Map | UKIS Hackathon 2026";
  const description =
    "Browse the UKIS Hackathon homepage, problem statements, solutions, mentors, registration pages, and official rules.";
  const canonicalUrl = `${HACKATHON_SITE_URL}${HACKATHON_BASE_PATH}/site-map`;

  return [
    { title },
    { name: "description", content: description },
    { name: "robots", content: "noindex, follow, noarchive" },
    { tagName: "link", rel: "canonical", href: canonicalUrl },
  ];
}

export function buildHomeSeoMeta(): MetaDescriptor[] {
  const title = "UKIS 2026: Uttarakhand Innovation & Solutions Hackathon";
  const description =
    "Register for UKIS 2026, the Uttarakhand Innovation & Solutions Hackathon for students, developers, and professionals. Join solo or in a team of 2–4.";
  const path = HACKATHON_BASE_PATH;

  return buildHackathonMeta({
    title,
    description,
    path,
    schema: [webPageSchema({ title, description, path }), organiserSchema],
  });
}

export function buildProblemsSeoMeta(): MetaDescriptor[] {
  const title = "UKIS 2026 Problem Statements | Uttarakhand Hackathon";
  const description =
    "Explore 12 UKIS 2026 problem statements spanning AI, GovTech, civic services, mobility, disaster management, forests, wildlife, and urban planning.";
  const path = `${HACKATHON_BASE_PATH}/problems`;
  const breadcrumbs = [
    { name: "UKIS Hackathon", path: HACKATHON_BASE_PATH },
    { name: "Problem Statements", path },
  ];

  return buildHackathonMeta({
    title,
    description,
    path,
    schema: [
      webPageSchema({
        title,
        description,
        path,
        pageType: "CollectionPage",
        mainEntityId: itemListId(path),
        breadcrumbs,
      }),
      {
        "@type": "ItemList",
        "@id": itemListId(path),
        name: "UKIS 2026 problem statements",
        numberOfItems: problems.length,
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        itemListElement: problems.map((problem, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: `${problem.id}: ${problem.title}`,
          url: absoluteUrl(`${path}/${problem.id}`),
        })),
      },
      breadcrumbSchema(path, breadcrumbs),
      organiserSchema,
    ],
  });
}

function metaDescriptionForProblem(problem: Problem): string {
  const prefix = `${problem.id}: ${problem.title}. `;
  const maximumLength = 158;
  const availableLength = maximumLength - prefix.length;
  if (problem.description.length <= availableLength) return `${prefix}${problem.description}`;

  const shortened = problem.description.slice(0, Math.max(0, availableLength - 1));
  const lastSpace = shortened.lastIndexOf(" ");
  return `${prefix}${shortened.slice(0, lastSpace > 0 ? lastSpace : undefined)}…`;
}

export function buildProblemSeoMeta(problemId?: string): MetaDescriptor[] {
  const problem = problems.find((item) => item.id === problemId);
  if (!problem) {
    return buildHackathonNoIndexMeta(
      "Problem Not Found | UKIS Hackathon",
      "The requested UKIS Hackathon problem statement could not be found.",
    );
  }

  const path = `${HACKATHON_BASE_PATH}/problems/${problem.id}`;
  const title = `${problem.title} (${problem.id}) | UKIS 2026`;
  const description = metaDescriptionForProblem(problem);
  const owner = getProblemOwner(problem.problemOwnerId);
  const creativeWorkId = `${absoluteUrl(path)}#problem-statement`;
  const breadcrumbs = [
    { name: "UKIS Hackathon", path: HACKATHON_BASE_PATH },
    { name: "Problem Statements", path: `${HACKATHON_BASE_PATH}/problems` },
    { name: problem.id, path },
  ];

  return buildHackathonMeta({
    title,
    description,
    path,
    type: "article",
    publishedTime: problem.publishedAt,
    schema: [
      webPageSchema({ title, description, path, mainEntityId: creativeWorkId, breadcrumbs }),
      {
        "@type": "CreativeWork",
        "@id": creativeWorkId,
        url: absoluteUrl(path),
        name: problem.title,
        headline: `${problem.title} (${problem.id})`,
        description: problem.description,
        identifier: problem.id,
        datePublished: problem.publishedAt,
        inLanguage: "en-IN",
        genre: "Hackathon problem statement",
        about: [
          { "@type": "Thing", name: problem.category },
          { "@type": "Thing", name: problem.theme },
          {
            "@type": "Organization",
            name: owner.name,
            ...(owner.url ? { url: owner.url } : {}),
          },
        ],
        publisher: { "@id": ORGANISER_ID },
      },
      breadcrumbSchema(path, breadcrumbs),
      organiserSchema,
    ],
  });
}

export function buildSolutionsSeoMeta(): MetaDescriptor[] {
  const title = "UKIS 2026 Solutions | Uttarakhand Hackathon Projects";
  const description =
    "Browse accepted UKIS 2026 solutions and projects created for Uttarakhand-focused AI, GovTech, civic innovation, safety, environment, and planning challenges.";
  const path = `${HACKATHON_BASE_PATH}/solutions`;
  const breadcrumbs = [
    { name: "UKIS Hackathon", path: HACKATHON_BASE_PATH },
    { name: "Solutions", path },
  ];

  return buildHackathonMeta({
    title,
    description,
    path,
    schema: [
      webPageSchema({
        title,
        description,
        path,
        pageType: "CollectionPage",
        mainEntityId: itemListId(path),
        breadcrumbs,
      }),
      {
        "@type": "ItemList",
        "@id": itemListId(path),
        name: "Accepted UKIS 2026 solutions",
        itemListElement: [],
      },
      breadcrumbSchema(path, breadcrumbs),
      organiserSchema,
    ],
  });
}

export function buildMentorsSeoMeta(): MetaDescriptor[] {
  const title = "UKIS 2026 Mentors | Uttarakhand Hackathon";
  const description =
    "Meet the UKIS 2026 mentors supporting hackathon teams with software engineering, product, data, operations, strategy, analytics, and blockchain expertise.";
  const path = `${HACKATHON_BASE_PATH}/mentors`;
  const breadcrumbs = [
    { name: "UKIS Hackathon", path: HACKATHON_BASE_PATH },
    { name: "Mentors", path },
  ];

  return buildHackathonMeta({
    title,
    description,
    path,
    schema: [
      webPageSchema({
        title,
        description,
        path,
        pageType: "CollectionPage",
        mainEntityId: itemListId(path),
        breadcrumbs,
      }),
      {
        "@type": "ItemList",
        "@id": itemListId(path),
        name: "UKIS 2026 mentors",
        numberOfItems: MENTORS.length,
        itemListElement: MENTORS.map((mentor, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Person",
            name: mentor.name,
            jobTitle: mentor.designation,
            description: mentor.bio,
            knowsAbout: mentor.expertise,
            worksFor: { "@type": "Organization", name: mentor.organization },
            ...(mentor.image ? { image: absoluteUrl(mentor.image) } : {}),
            ...(mentor.linkedinUrl ? { sameAs: mentor.linkedinUrl } : {}),
          },
        })),
      },
      breadcrumbSchema(path, breadcrumbs),
      organiserSchema,
    ],
  });
}

function buildSimplePageSeoMeta({
  title,
  description,
  path,
  breadcrumbName,
}: {
  title: string;
  description: string;
  path: string;
  breadcrumbName: string;
}): MetaDescriptor[] {
  const breadcrumbs = [
    { name: "UKIS Hackathon", path: HACKATHON_BASE_PATH },
    { name: breadcrumbName, path },
  ];

  return buildHackathonMeta({
    title,
    description,
    path,
    schema: [
      webPageSchema({ title, description, path, breadcrumbs }),
      breadcrumbSchema(path, breadcrumbs),
      organiserSchema,
    ],
  });
}

export function buildParticipantRegistrationSeoMeta(): MetaDescriptor[] {
  return buildSimplePageSeoMeta({
    title: "Register for UKIS Hackathon 2026 | Solo or Teams",
    description:
      "Register for UKIS Hackathon 2026 as a solo participant or a team of 2, 3, or 4. Choose an Uttarakhand problem statement and submit one entry per person.",
    path: `${HACKATHON_BASE_PATH}/register/solution`,
    breadcrumbName: "Participant Registration",
  });
}

export function buildMentorRegistrationSeoMeta(): MetaDescriptor[] {
  return buildSimplePageSeoMeta({
    title: "Apply as a Mentor | UKIS Hackathon 2026",
    description:
      "Apply to mentor UKIS Hackathon 2026 teams and share practical expertise in engineering, product, data, design, operations, strategy, or civic innovation.",
    path: `${HACKATHON_BASE_PATH}/register/mentor`,
    breadcrumbName: "Mentor Application",
  });
}

export function buildTermsSeoMeta(): MetaDescriptor[] {
  return buildSimplePageSeoMeta({
    title: "UKIS 2026 Rules, Eligibility & Team Size",
    description:
      "Read the UKIS Hackathon 2026 rules, eligibility, submission requirements, judging terms, and team-size policy: participate solo or in one team of 2–4.",
    path: `${HACKATHON_BASE_PATH}/terms-and-conditions`,
    breadcrumbName: "Rules and Terms",
  });
}
