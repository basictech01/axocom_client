/** Static content for the UKIS Hackathon homepage — verified project copy only */

export const HERO = {
  eyebrow: "Uttarakhand Innovation & Solutions Hackathon",
  headlineLead: "Not just a hackathon.",
  headlineAccent: "A journey.",
  support:
    "A state-wide innovation series bringing builders from across Uttarakhand together to solve real-world problems through multi-stage collaboration.",
  meta: [
    { label: "Phase 1", value: "Online · Currently Live" },
    { label: "Cities", value: "Dehradun · Roorkee · Rudrapur" },
    { label: "Focus", value: "Real products, real problems" },
  ],
} as const;

export const PARTNERS = [
  { abbr: "ANI", name: "Asian News International" },
  { abbr: "PTI", name: "Press Trust of India" },
  { abbr: "ET", name: "The Economic Times" },
] as const;

export const WHAT_UKIS = {
  eyebrow: "About the series",
  title: "What UKIS Is",
  body: [
    "The Uttarakhand Innovation & Solutions Hackathon is designed as a multi-stage innovation series, bringing together builders from across the state to solve real-world problems.",
    "It begins online and evolves into on-ground hackathons across key cities of Uttarakhand.",
  ],
  principles: [
    {
      title: "Real problems",
      description: "Published challenges rooted in Uttarakhand’s civic and developmental needs.",
    },
    {
      title: "Immediate building",
      description: "Participants start exploring, ideating and building right after registration.",
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

/** Domain rows derived from existing published problem categories */
export const DOMAINS = [
  {
    number: "01",
    title: "Healthcare & AI",
    description:
      "Bridge urban medical expertise and rural healthcare needs with intelligent, accessible systems.",
    problemId: "P-001",
    image: "/hackathon/prop3.webp",
  },
  {
    number: "02",
    title: "Sustainability",
    description:
      "Track waste, recycling and environmental impact for municipal programmes across the state.",
    problemId: "P-002",
    image: "/hackathon/prop4.webp",
  },
  {
    number: "03",
    title: "Education & FinTech",
    description:
      "Build engaging platforms that teach financial literacy to students through real scenarios.",
    problemId: "P-003",
    image: "/hackathon/prop5.cms",
  },
  {
    number: "04",
    title: "Agriculture & IoT",
    description:
      "Help farms conserve water with soil, weather and crop-aware irrigation systems.",
    problemId: "P-004",
    image: "/hackathon/prop6.webp",
  },
  {
    number: "05",
    title: "Civic Tech",
    description:
      "Simplify government service access with multilingual, accessibility-first digital tools.",
    problemId: "P-005",
    image: "/hackathon/prop7.webp",
  },
] as const;

export const PHASES = [
  {
    id: "phase-1",
    number: "01",
    phase: "Phase 1",
    status: "Currently Live",
    title: "Online Hackathon",
    description:
      "This is where ideas begin. Open to students, developers, and professionals. Participants start building immediately after registration.",
    dateLabel: "Open now",
    points: ["Exploration", "Ideation", "Early product building"],
  },
  {
    id: "phase-2",
    number: "02",
    phase: "Phase 2",
    status: null,
    title: "Evaluation & Shortlisting",
    description:
      "Final submissions are evaluated on problem relevance, practicality of solution, and execution approach. Selected participants move forward in the journey.",
    dateLabel: "Date to be announced",
    points: ["Problem relevance", "Practicality", "Execution approach"],
  },
  {
    id: "phase-3",
    number: "03",
    phase: "Phase 3",
    status: null,
    title: "On-Ground Hackathons",
    description:
      "The hackathon evolves into a three-city offline journey across Uttarakhand Rudrapur, Roorkee and Dehradun with a final hackathon and culmination.",
    dateLabel: "Date to be announced",
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

export const OFFLINE_ROUNDS = {
  title: "What happens in offline rounds",
  points: [
    "Deeper problem solving",
    "Mentorship from experts",
    "Real-world validation of ideas",
    "Collaboration with other builders",
  ],
  closing:
    "This is where ideas become stronger, more refined, and closer to real implementation.",
} as const;

export const FINAL_GOAL = {
  title: "Final goal",
  body: "This is not about winning a competition. This is about building real products, solving real problems in Uttarakhand, and creating solutions that can be developed further, supported, and taken towards real-world implementation.",
} as const;

export const BEYOND = {
  title: "Beyond the hackathon",
  body: "Selected ideas from the series may be supported and guided by Axolotl Emprise LLP, refined into real products (apps/platforms), and explored for potential presentation to relevant stakeholders.",
} as const;

export const CONTRAST_CTA = {
  eyebrow: "Phase 1 is live",
  title: "Start building for Uttarakhand today",
  body: "Register your solution, explore published problems, and join a community of builders creating real impact across the state.",
} as const;

export const SPEAKERS = [
  { name: "Rohan Pant", role: "Program Manager, Amazon", initials: "RP" },
  { name: "Virendra Pal", role: "Operations Manager, Amazon", initials: "VP" },
  { name: "Kevin Patel", role: "Software Engineer, Google", initials: "KP" },
  { name: "Anmol Dixit", role: "Senior Software Engineer, Rubrik", initials: "AD" },
  { name: "Ayush Gupta", role: "Data Engineer, Zeta", initials: "AG" },
  { name: "Sagar Singh", role: "Software Developer, Scapia", initials: "SS" },
] as const;

export const FINAL_CTA = {
  title: "Join the journey",
  body: "Whether you are a student, a developer, or a working professional if you want to build something meaningful for Uttarakhand, this is where it starts.",
} as const;
