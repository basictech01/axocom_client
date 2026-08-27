/**
 * Hiring Partners shown on the UKIS Hackathon homepage.
 * Add or edit partners here manually as new companies are onboarded.
 */

export interface HiringPartner {
  id: string;
  name: string;
  role: string;
  logo: string;
  logoWidth: number;
  logoHeight: number;
  /** External website. When omitted, the card renders without a link. */
  url?: string;
}

export const HIRING_PARTNERS: HiringPartner[] = [
  {
    id: "hiring-pace",
    name: "PACE",
    role: "Hiring & Mentorship Partner",
    logo: "/paceLogo.png",
    logoWidth: 509,
    logoHeight: 250,
  },
  {
    id: "hiring-cruv-dimension",
    name: "Cruv Dimension",
    role: "Hiring Partner",
    logo: "/images/cruv.png",
    logoWidth: 214,
    logoHeight: 164,
    url: "https://cruv.org/",
  },
  {
    id: "hiring-metasquare",
    name: "MetaSquare",
    role: "Hiring Partner",
    logo: "/hackathon/metasquare.png",
    logoWidth: 268,
    logoHeight: 260,
    url: "https://metasquare.tech/",
  },
];
