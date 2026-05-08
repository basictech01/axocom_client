const SITE_URL = "https://www.axocom.in";
const SITE_NAME = "AxoCom";
const DEFAULT_IMAGE = "/images/logo2.png";

export interface SeoConfig {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article" | "profile";
  keywords?: string[];
}

const absoluteUrl = (pathOrUrl: string) => {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  return `${SITE_URL}${pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`}`;
};

export const buildSeoMeta = ({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
  imageAlt = `${SITE_NAME} preview image`,
  type = "website",
  keywords = [],
}: SeoConfig) => {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

  return [
    { title: fullTitle },
    { name: "description", content: description },
    { name: "robots", content: "index, follow, max-image-preview:large" },
    { name: "author", content: "Axolotl Emprise LLP" },
    { name: "application-name", content: SITE_NAME },
    ...(keywords.length ? [{ name: "keywords", content: keywords.join(", ") }] : []),
    { property: "og:type", content: type },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: imageUrl },
    { property: "og:image:secure_url", content: imageUrl },
    { property: "og:image:alt", content: imageAlt },
    { property: "og:locale", content: "en_IN" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: imageUrl },
    { name: "twitter:image:alt", content: imageAlt },
  ];
};

export const buildSeoLinks = ({ path }: SeoConfig) => [
  { rel: "canonical", href: absoluteUrl(path) },
];

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AxoCom",
  legalName: "Axolotl Emprise LLP",
  url: SITE_URL,
  logo: absoluteUrl("/images/logo2.png"),
  sameAs: [
    "https://www.youtube.com/@AxoComTechXMedia",
    "https://www.instagram.com/axocommedia/",
    "https://www.linkedin.com/company/axocom-tech-x-media/",
  ],
};

export const webPageSchema = ({ title, description, path, image = DEFAULT_IMAGE }: SeoConfig) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: title,
  description,
  url: absoluteUrl(path),
  image: absoluteUrl(image),
  publisher: organizationSchema,
});

export const eventSchema = ({
  name,
  description,
  path,
  image,
  startDate,
  endDate,
  locationName,
  locationAddress,
  eventAttendanceMode = "https://schema.org/OfflineEventAttendanceMode",
  eventStatus = "https://schema.org/EventScheduled",
}: {
  name: string;
  description: string;
  path: string;
  image: string;
  startDate: string;
  endDate?: string;
  locationName: string;
  locationAddress: string;
  eventAttendanceMode?: string;
  eventStatus?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Event",
  name,
  description,
  url: absoluteUrl(path),
  image: [absoluteUrl(image)],
  startDate,
  ...(endDate ? { endDate } : {}),
  eventAttendanceMode,
  eventStatus,
  location: {
    "@type": "Place",
    name: locationName,
    address: locationAddress,
  },
  organizer: organizationSchema,
});

export const structuredData = (items: unknown[]) =>
  JSON.stringify(items.length === 1 ? items[0] : items).replace(/</g, "\\u003c");
