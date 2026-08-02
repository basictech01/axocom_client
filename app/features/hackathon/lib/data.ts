/**
 * Shared catalogue and types for the hackathon programme.
 * Problems remain static. Public solutions are loaded from the API.
 * Public mentors are maintained in lib/mentors.ts.
 */

export interface Problem {
  id: string;
  title: string;
  category: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  publishedAt: string;
  solutionCount: number;
  /**
   * Optional problem sponsor shown above the title.
   * Government body that shared the problem, or a company that sponsored it.
   * Leave unset when there is no sponsor yet.
   */
  sponsor?: string;
  whatsappGroup?: string;
}

/**
 * Static problem catalogue.
 * To attach a sponsor for a problem, set `sponsor` to the organisation or company name, e.g.:
 *   sponsor: "ITDA Uttarakhand"
 * Omit `sponsor` when none is assigned yet.
 */
export const problems: Problem[] = [
  {
    id: "P-001",
    title: "AI-Powered Rural Healthcare Access",
    category: "Healthcare & AI",
    description:
      "Design a solution that leverages artificial intelligence to bridge the gap between urban medical expertise and rural healthcare needs. The system should enable remote diagnosis support, medication tracking, and emergency response coordination for communities with limited medical infrastructure.",
    difficulty: "Advanced",
    publishedAt: "2026-07-01",
    solutionCount: 0,
  },
  {
    id: "P-002",
    title: "Sustainable Waste Management Tracking",
    category: "Sustainability",
    description:
      "Build a real-time waste management tracking system that monitors collection routes, sorting accuracy, recycling rates, and environmental impact metrics for municipal waste programs. Include predictive analytics for optimizing collection schedules.",
    difficulty: "Intermediate",
    publishedAt: "2026-07-05",
    solutionCount: 0,
  },
  {
    id: "P-003",
    title: "Digital Financial Literacy for Students",
    category: "Education & FinTech",
    description:
      "Create an engaging, gamified platform that teaches financial literacy to students aged 12-18. The platform should cover budgeting, saving, investing basics, and debt management through interactive challenges and real-world scenarios.",
    difficulty: "Beginner",
    publishedAt: "2026-07-10",
    solutionCount: 0,
  },
  {
    id: "P-004",
    title: "Smart Agriculture Water Conservation",
    category: "Agriculture & IoT",
    description:
      "Develop an IoT-enabled water conservation system for small and medium farms. The solution should monitor soil moisture, weather patterns, and crop needs to automate irrigation scheduling while reducing water usage by at least 30%.",
    difficulty: "Advanced",
    publishedAt: "2026-07-15",
    solutionCount: 0,
  },
  {
    id: "P-005",
    title: "Accessible E-Government Services",
    category: "Civic Tech",
    description:
      "Design a multilingual, accessibility-first platform that simplifies government service access for citizens. Focus on document submission, status tracking, and notification systems that work for users with varying digital literacy levels.",
    difficulty: "Intermediate",
    publishedAt: "2026-07-20",
    solutionCount: 0,
  },
];

export function getProblemById(id: string): Problem | undefined {
  return problems.find((p) => p.id === id);
}

export function getTotalProblems(): number {
  return problems.length;
}
