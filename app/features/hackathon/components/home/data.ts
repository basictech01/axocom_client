/** Static content for the UKIS Hackathon homepage - verified project copy only */

import { MENTORS } from "~/features/hackathon/lib/mentors";

export const HERO = {
  eyebrow: "Uttarakhand Innovation & Solutions Hackathon",
  headlineLead: "Not just a hackathon.",
  headlineAccent: "A journey.",
  support:
    "A state-wide innovation series bringing builders from across the world together to solve real-world problems — from Uttarakhand and beyond.",
  meta: [
    { label: "Format", value: "Online and on-ground" },
    { label: "Cities", value: "Dehradun · Roorkee · Rudrapur" },
    { label: "Focus", value: "Real products, real problems" },
  ],
} as const;

export const PARTNERS = [
  {
    name: "PACE",
    role: "Hiring & Mentorship Partner",
    logo: "/paceLogo.png",
    logoIncludesName: true,
  },
  {
    name: "AxoCom",
    role: "Media Partner",
    logo: "/axocomLogo.png",
    logoIncludesName: false,
  },
] as const;

export const WHAT_UKIS = {
  eyebrow: "About the series",
  title: "What UKIS Is",
  body: [
    "UKIS surfaces real-world problems and invites builders from across the world to work on them — backed by mentors and hands-on support at every stage.",
    "The strongest solutions move beyond the hackathon toward pilots, implementation, incubation, and funding. In doing so, UKIS becomes the bridge between industry, problem solvers, and government.",
  ],
  principles: [
    {
      title: "Real problems",
      description: "Challenges rooted in Uttarakhand’s civic and developmental needs.",
    },
    {
      title: "Hands-on building",
      description: "Builders explore, ideate and develop products around real problems.",
    },
    {
      title: "Expert guidance",
      description: "Mentorship from engineers and leaders at leading technology companies.",
    },
    {
      title: "Path beyond",
      description: "Selected ideas may be refined further with support from Axolotl Emprise LLP.",
    },
  ],
} as const;

export const PHASES = [
  {
    id: "phase-1",
    number: "01",
    phase: "Stage 1",
    title: "Online Hackathon",
    description:
      "Where ideas begin. Open to students, developers and professionals working on published problems.",
    points: ["Exploration", "Ideation", "Early product building"],
  },
  {
    id: "phase-2",
    number: "02",
    phase: "Stage 2",
    title: "Evaluation & Shortlisting",
    description:
      "Submissions are evaluated on problem relevance, practicality of solution, and execution approach. Selected participants move forward in the journey.",
    points: ["Problem relevance", "Practicality", "Execution approach"],
  },
  {
    id: "phase-3",
    number: "03",
    phase: "Stage 3",
    title: "On-Ground Hackathons",
    description:
      "The series continues as a three-city offline journey across Uttarakhand: Rudrapur, Roorkee and Dehradun, with a final hackathon and culmination.",
    points: ["Rudrapur · Roorkee · Dehradun", "Final hackathon & culmination"],
  },
] as const;

export const PARTICIPANTS = [
  {
    category: "Students",
    description: "Learn by building real solutions for state challenges alongside peers and mentors.",
    note: "Intended photo: students collaborating around a laptop at a UKIS workshop",
    image: "/hackathon/prop10.webp",
  },
  {
    category: "Developers",
    description: "Ship prototypes that address published problems and grow through expert feedback.",
    note: "Intended photo: developer presenting a working prototype on stage",
    image: "/hackathon/prop8.webp",
  },
  {
    category: "Working professionals",
    description: "Apply industry experience to Uttarakhand’s real-world problems and mentor others.",
    note: "Intended photo: mixed group of professionals in discussion with a mentor",
    image: "/hackathon/prop9.webp",
  },
] as const;

export const LEADERSHIP = [
  {
    name: "Lt Gen (Retd) Gurmit Singh",
    role: "Hon'ble Governor, Uttarakhand",
    image: "/images/governor_Gen_Gurmit_Singh.jpeg",
    linkedin: "https://www.linkedin.com/in/ltgengurmit/",
  },
  {
    name: "Shri Pushkar Singh Dhami",
    role: "Hon'ble Chief Minister, Uttarakhand",
    image: "/images/cm_pushkar_singh_dhami.jpg",
    linkedin: "https://www.linkedin.com/in/pushkar-singh-dhami-986b66260/",
  },
  {
    name: "Shri Pradeep Batra",
    role: "IT Minister & Good Governance, Uttarakhand",
    image: "/images/summitDeligate/shri_pradeep_batra_it_minister_govt_uttarakhand.jpg",
  },
] as const;

export const FINAL_GOAL = {
  title: "Final goal",
  body: "This is not about winning a competition. This is about building real products, solving real problems in Uttarakhand, and creating solutions that can be developed further, supported, and taken towards real-world implementation.",
} as const;

export const BEYOND = {
  title: "Beyond the hackathon",
  body: "Selected ideas from the series may be supported and guided by Axolotl Emprise LLP, refined into real products (apps/platforms), and explored for potential presentation to relevant stakeholders.",
} as const;

export const CONTRAST_CTA = {
  eyebrow: "Uttarakhand Innovation & Solutions Hackathon",
  title: "Build for Uttarakhand",
  body: "Explore the problems, meet the community of builders, and learn how UKIS connects real challenges with solutions across the state.",
} as const;

/** Five standalone homepage sections for organisational involvement */
export const ORG_SECTIONS = [
  {
    id: "challenge-sponsors",
    eyebrow: "Challenge Sponsors",
    title: "Support one specific problem",
    body: [
      "Challenge Sponsors support one specific problem, its operations, prize or conditional pilot fund.",
      "As a challenge or pilot partner, a company gets a structured way to bring a real business, CSR or public-interest problem. Builders work around the approved challenge, with mentor and expert engagement, approved challenge-level visibility and content, product demonstrations, evidence and an outcome report. There is also a possible route to test a strong solution under a separately agreed pilot.",
    ],
    pointsLabel: "What challenge sponsors get",
    points: [
      "A structured way to bring a real business, CSR or public-interest problem",
      "Builder participation around the approved challenge",
      "Mentor and expert engagement",
      "Approved challenge-level visibility and content",
      "Product demonstrations, evidence and an outcome report",
      "A possible route to test a strong solution under a separately agreed pilot",
    ],
    /** Set to a public path when ready, e.g. "/hackathon/challenge-sponsors.webp" */
    image: "/hackathon/pt5.png",
    imageLabel: "Challenge sponsor session or problem showcase",
  },
  {
    id: "technology-partners",
    eyebrow: "Technology Partners",
    title: "Cloud, tools, engineers and workshops",
    body: [
      "Technology Partners provide cloud credits, APIs, software, cybersecurity, data tools, engineers and workshops.",
      "As a technology partner, a company gets a relevant route to support builders working on real problems, product education and adoption, approved technical content and solution case-study opportunities, and aggregated programme insights without access to private participant data.",
    ],
    pointsLabel: "What technology partners get",
    points: [
      "A relevant route to provide cloud credits, APIs, software, tools, engineers and workshops",
      "Product education and adoption by builders working on real problems",
      "Approved technical content and solution case-study opportunities",
      "Aggregated programme insights without access to private participant data",
    ],
    image: "",
    imageLabel: "Builders using tools, APIs or workshop floor",
  },
  {
    id: "hiring-partners",
    eyebrow: "Hiring Partners",
    title: "Mentors, interviews, internships and jobs",
    body: [
      "Hiring Partners take part through mentors, interviews, internships, apprenticeships, contracts and jobs.",
      "A technology company, consultancy, recruitment agency, staffing firm or other employer can get consent-based access to builders evaluated through real work rather than CVs alone, with verified solution links, work samples and participant contributions.",
    ],
    pointsLabel: "What hiring partners get",
    points: [
      "Consent-based access to builders evaluated through real work rather than CVs alone",
      "Verified solution links, work samples and participant contributions",
      "Role matching for internships, apprenticeships, contract roles and employment",
      "Structured showcases and interview coordination",
      "Opportunities to mentor teams or sponsor relevant challenges",
    ],
    image: "/hackathon/pt6.png",
    imageLabel: "Mentor interview or hiring showcase moment",
  },
  {
    id: "knowledge-partners",
    eyebrow: "Knowledge and University Partners",
    title: "Participants, faculty, research and facilities",
    body: [
      "Knowledge and University Partners contribute participants, faculty, research, evaluators and facilities.",
      "Universities, research groups and knowledge institutions help connect campus talent and research with real Uttarakhand problems. They get a structured route from an operational or research issue to evidence-backed solution exploration, with access to builders, mentors and technology partners around the problem.",
    ],
    pointsLabel: "What knowledge and university partners get",
    points: [
      "A discovery and scoping process that converts an issue into a clear, neutral and measurable challenge",
      "A public problem page explaining the approved context, users, constraints, resources and desired outcomes",
      "Access to builders, mentors and relevant technology partners around the problem",
      "Progress visibility through agreed reviews without having to manage each solution team",
      "Working-product demonstrations, verified evidence, limitations and deployment considerations",
      "Approved visibility for enabling responsible innovation in Uttarakhand",
    ],
    image: "",
    imageLabel: "Campus, faculty or university research setting",
  },
  {
    id: "hiring-opportunity",
    eyebrow: "Hiring opportunity",
    title: "Hire the best talent of Uttarakhand",
    body: [
      "For students and professionals, UKIS is a chance to showcase real talent through work, not résumés. By solving published problems in the open, you build a track record that speaks for itself.",
      "Through our hiring partners and PACE, we give standout builders visibility across an industry actively looking for real-world problem solvers. UKIS becomes the bridge between that talent and the companies that need it.",
    ],
    pointsLabel: "How hiring works here",
    points: [
      "Consent-based access to builders evaluated through real work rather than CVs alone",
      "Verified solution links, work samples and participant contributions",
      "Role matching for internships, apprenticeships, contract roles and employment",
      "Structured showcases and interview coordination",
      "Opportunities to mentor teams or sponsor relevant challenges",
    ],
    image: "/hackathon/pt7.png",
    imageLabel: "Uttarakhand builders presenting or demo day",
  },
] as const;

export const SPEAKERS = MENTORS.map((mentor) => ({
  name: mentor.name,
  role: mentor.designation,
  organisation: mentor.organization,
  initials: mentor.initials,
  image: mentor.image ?? "",
  linkedin: mentor.linkedinUrl ?? "",
}));

export const MENTOR_GUIDES = SPEAKERS;

export const FINAL_CTA = {
  title: "Join the journey",
  body: "Whether you are a student, a developer, or a working professional, if you want to build something meaningful for Uttarakhand, UKIS is the programme for you.",
} as const;
