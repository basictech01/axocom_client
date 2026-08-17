/**
 * Hiring Partners shown on the UKIS Hackathon homepage.
 * Add or edit partners here manually as new companies are onboarded.
 */

export interface HiringPartner {
  id: string;
  name: string;
  role: string;
  logo: string;
  /** External website. When omitted, the card renders without a link. */
  url?: string;
}

export const HIRING_PARTNERS: HiringPartner[] = [
  {
    id: "hiring-pace",
    name: "PACE",
    role: "Hiring & Mentorship Partner",
    logo: "/paceLogo.png",
  },
  {
    id: "hiring-cruv-dimension",
    name: "Cruv Dimension",
    role: "Hiring Partner",
    logo: "/images/cruv.png",
    url: "https://cruv.org/",
  },
  {
    id: "hiring-metasquare",
    name: "MetaSquare",
    role: "Hiring Partner",
    logo: "/hackathon/metasquare.png",
    url: "https://metasquare.tech/",
  },
];
