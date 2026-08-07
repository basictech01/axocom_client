/**
 * Shared catalogue and types for the hackathon programme.
 * Problems remain static. Public solutions are loaded from the API.
 * Public mentors are maintained in lib/mentors.ts.
 */
import type { ProblemOwnerId } from "~/features/hackathon/lib/problem-owners";

export interface Problem {
  id: string;
  title: string;
  theme: string;
  category: string;
  problemOwnerId: ProblemOwnerId;
  description: string;
  capabilities: string[];
  applications?: string[];
  outcomes: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  publishedAt: string;
  solutionCount: number;
  /**
   * Optional company or programme sponsor shown above the title.
   * The organisation whose challenge this is uses `problemOwnerId`.
   */
  sponsor?: string;
  whatsappGroup?: string;
}

/**
 * Static problem catalogue.
 * To attach a challenge sponsor, set `sponsor` to the supporting company or
 * programme name. The organisation presenting the problem uses `problemOwnerId`.
 */
export const problems: Problem[] = [
  {
    id: "P-001",
    title: "AI-Powered Government Knowledge Repository",
    theme: "Transforming Government Files into an Intelligent Knowledge Bank",
    category: "Knowledge Management & AI",
    problemOwnerId: "itda",
    description:
      "Develop a secure, conversational AI interface that turns decades of Government Orders, circulars, notifications, policies, manuals and departmental records into a searchable institutional knowledge bank with verifiable source references.",
    capabilities: [
      "Search Government Orders and departmental records using natural language",
      "Retrieve applicable rules and regulations within seconds",
      "Find precedent cases and suggest relevant regulations",
      "Answer officer queries conversationally with citations to source documents",
    ],
    applications: [
      "RFP preparation and tender processing",
      "Administrative approvals and departmental correspondence",
      "Legal references and financial sanction processes",
    ],
    outcomes: [
      "Reduced file-processing time",
      "Standardised and evidence-based decision-making",
      "Reduced dependency on manual searches",
      "Long-term institutional knowledge retention",
    ],
    difficulty: "Advanced",
    publishedAt: "2026-08-06",
    solutionCount: 0,
  },
  {
    id: "P-002",
    title: "AI-Assisted DPR and RFP Generation",
    theme: "AI as a Government Drafting Assistant",
    category: "GovTech & Document Automation",
    problemOwnerId: "budget",
    description:
      "Build an AI drafting assistant that helps officers prepare compliant DPRs and RFPs while consistently applying financial, procurement, security, SLA, penalty and other mandatory government frameworks.",
    capabilities: [
      "Draft DPRs and RFP documents from officer requirements",
      "Suggest mandatory clauses and verify General Financial Rules compliance",
      "Incorporate procurement and cybersecurity provisions",
      "Create evaluation criteria, SLA templates and penalty structures",
      "Flag missing or inconsistent compliance requirements before review",
    ],
    outcomes: [
      "Faster document preparation",
      "Improved document quality and completeness",
      "Uniform documentation across departments",
      "Fewer procedural and compliance errors",
    ],
    difficulty: "Advanced",
    publishedAt: "2026-08-06",
    solutionCount: 0,
  },
  {
    id: "P-003",
    title: "AI-Driven Integrated Beneficiary Data Governance",
    theme: "One Citizen, One Digital Identity Across Government Schemes",
    category: "Data Governance & Welfare",
    problemOwnerId: "social-welfare",
    description:
      "Create a privacy-conscious data intelligence platform that connects beneficiary records across departments to provide a holistic view of scheme participation while improving inclusion, integrity and policy planning.",
    capabilities: [
      "Integrate beneficiary databases across departments and schemes",
      "Identify duplicate beneficiaries and potentially fraudulent claims",
      "Highlight eligible citizens who are excluded from relevant schemes",
      "Detect overlap among welfare programmes",
      "Provide role-based, department-wise dashboards",
    ],
    applications: [
      "Build a unified view of benefits received through Housing, Social Welfare, Agriculture and Rural Development",
      "Identify deserving beneficiaries who remain excluded while protecting citizen data",
    ],
    outcomes: [
      "Better targeting of welfare schemes",
      "Reduced leakages and duplicate benefits",
      "Increased transparency",
      "Improved evidence-based policy planning",
    ],
    difficulty: "Advanced",
    publishedAt: "2026-08-06",
    solutionCount: 0,
  },
  {
    id: "P-004",
    title: "AI Civic Cleanliness and Encroachment Monitoring",
    theme: "From Passive CCTV Monitoring to Proactive Civic Response",
    category: "Computer Vision & Civic Governance",
    problemOwnerId: "water-sanitation-mission",
    description:
      "Develop a computer-vision system that analyses authorised civic camera feeds to detect sanitation and public-space issues, route actionable alerts to the responsible department and track each issue through closure.",
    capabilities: [
      "Detect garbage accumulation and illegal dumping",
      "Identify encroachments in monitored public spaces",
      "Classify issue type, location and severity",
      "Generate alerts, identify the responsible department and recommend action",
      "Track response status and verify closure",
    ],
    outcomes: [
      "Faster sanitation and enforcement response",
      "Cleaner, safer public spaces",
      "Improved inter-departmental accountability",
      "Better citizen services",
    ],
    difficulty: "Advanced",
    publishedAt: "2026-08-06",
    solutionCount: 0,
  },
  {
    id: "P-005",
    title: "AI Traffic, Parking and Congestion Intelligence",
    theme: "Real-Time Mobility Management for Uttarakhand",
    category: "Computer Vision & Mobility",
    problemOwnerId: "transport",
    description:
      "Build an AI traffic-management platform that converts authorised live camera feeds into real-time insights on parking, congestion and traffic violations, with privacy-aware alerts and operational dashboards.",
    capabilities: [
      "Detect illegal parking and vehicles parked beyond permitted duration",
      "Identify traffic congestion and traffic-rule violations",
      "Classify severity and generate location-aware alerts",
      "Recommend routing, enforcement or traffic-management actions",
      "Monitor incident response and closure",
    ],
    outcomes: [
      "Faster response to mobility disruptions",
      "Improved traffic flow and parking compliance",
      "Better urban mobility planning",
      "Safer roads and public spaces",
    ],
    difficulty: "Advanced",
    publishedAt: "2026-08-06",
    solutionCount: 0,
  },
  {
    id: "P-006",
    title: "AI Public Infrastructure Hazard Monitoring",
    theme: "Early Detection of Civic and Monsoon Hazards",
    category: "Computer Vision & Infrastructure",
    problemOwnerId: "public-works",
    description:
      "Create an AI monitoring and response system that detects emerging infrastructure hazards from authorised civic feeds, prioritises incidents by public-safety risk and helps departments verify timely resolution.",
    capabilities: [
      "Detect fallen trees, tilting electric poles and hanging electrical wires",
      "Identify waterlogging and damaged public infrastructure",
      "Classify severity and prioritise public-safety risks",
      "Notify the responsible department and recommend immediate action",
      "Monitor repair progress and closure evidence",
    ],
    outcomes: [
      "Earlier detection of dangerous conditions",
      "Faster emergency and maintenance response",
      "Reduced public-safety risk during monsoon events",
      "Improved infrastructure maintenance planning",
    ],
    difficulty: "Advanced",
    publishedAt: "2026-08-06",
    solutionCount: 0,
  },
  {
    id: "P-007",
    title: "Drone Analytics for Crowd and Event Safety",
    theme: "AI-Enabled Aerial Monitoring for Public Safety",
    category: "Drone Analytics & Public Safety",
    problemOwnerId: "police",
    description:
      "Develop a responsible drone-imagery analytics platform that gives incident commanders rapid situational awareness during large gatherings and public events without relying on continuous manual observation.",
    capabilities: [
      "Estimate crowd density and movement from aerial imagery",
      "Detect dangerous congestion, blocked routes and emerging crowd risks",
      "Map safe access, evacuation and emergency-response corridors",
      "Generate severity-based alerts for authorised control rooms",
      "Provide live operational views for large public events",
    ],
    outcomes: [
      "Improved crowd management",
      "Faster situational awareness",
      "Better emergency coordination",
      "Safer large public events",
    ],
    difficulty: "Advanced",
    publishedAt: "2026-08-06",
    solutionCount: 0,
  },
  {
    id: "P-008",
    title: "Drone-Based Disaster and Infrastructure Assessment",
    theme: "Rapid Aerial Intelligence for Emergency Response",
    category: "Drone Analytics & Disaster Management",
    problemOwnerId: "dmmc",
    description:
      "Build an AI system that analyses drone imagery to assess disasters, inspect inaccessible infrastructure and produce prioritised, map-based intelligence for response teams and planners.",
    capabilities: [
      "Monitor landslides, floods and river obstructions",
      "Assess road damage and inspect critical infrastructure",
      "Compare pre-event and post-event imagery to estimate impact",
      "Classify affected areas by severity and accessibility",
      "Generate actionable maps and reports for response teams",
    ],
    outcomes: [
      "Faster disaster assessment",
      "Improved emergency response",
      "Safer inspection of inaccessible areas",
      "Better recovery and infrastructure planning",
    ],
    difficulty: "Advanced",
    publishedAt: "2026-08-06",
    solutionCount: 0,
  },
  {
    id: "P-009",
    title: "AI Forest Health and Fire Intelligence",
    theme: "Protecting Uttarakhand's Forests Through Geospatial Intelligence",
    category: "GIS, Forestry & Environment",
    problemOwnerId: "forest",
    description:
      "Create a geospatial AI platform that continuously analyses satellite, GIS and drone data to detect threats to forests, measure ecosystem change and support timely conservation action.",
    capabilities: [
      "Detect illegal tree felling and natural forest degradation",
      "Identify and track emerging forest fires",
      "Assess regeneration and vegetation recovery over time",
      "Prioritise high-risk areas for field verification",
      "Provide evidence-based alerts and conservation dashboards",
    ],
    outcomes: [
      "Earlier warning of forest threats",
      "Better conservation and enforcement targeting",
      "Improved forest regeneration assessment",
      "Data-driven environmental governance",
    ],
    difficulty: "Advanced",
    publishedAt: "2026-08-06",
    solutionCount: 0,
  },
  {
    id: "P-010",
    title: "AI Wildlife and Human-Conflict Intelligence",
    theme: "Geospatial Intelligence for Wildlife Protection",
    category: "GIS, Wildlife & Conservation",
    problemOwnerId: "forest",
    description:
      "Develop an AI-assisted wildlife intelligence system that combines approved field, sensor and geospatial data to understand animal movement, protect habitats and anticipate human-wildlife conflict.",
    capabilities: [
      "Track animal movement patterns using approved, non-invasive data",
      "Monitor habitat change and fragmentation",
      "Detect indicators of possible poaching activity for field verification",
      "Predict human-wildlife conflict risk zones",
      "Deliver timely alerts to authorised conservation teams",
    ],
    outcomes: [
      "Stronger wildlife and habitat protection",
      "Earlier, targeted conflict-prevention measures",
      "Better allocation of conservation resources",
      "Improved evidence for environmental planning",
    ],
    difficulty: "Advanced",
    publishedAt: "2026-08-06",
    solutionCount: 0,
  },
  {
    id: "P-011",
    title: "AI Mountain Disaster Early-Warning Intelligence",
    theme: "Building Disaster Resilience Through Geospatial Analysis",
    category: "GIS, Climate & Disaster Management",
    problemOwnerId: "dmmc",
    description:
      "Build a geospatial early-warning platform that combines historical and near-real-time environmental data to monitor mountain hazards and communicate explainable risk assessments to disaster-management teams.",
    capabilities: [
      "Monitor glaciers and analyse snow-cover change",
      "Assess flash-flood and landslide risk",
      "Monitor fragile mountain slopes for meaningful change",
      "Combine weather, terrain, hydrology and remote-sensing layers",
      "Issue explainable, severity-based warnings for high-risk locations",
    ],
    outcomes: [
      "Earlier warning of mountain hazards",
      "Improved disaster preparedness and response",
      "Better prioritisation of field monitoring",
      "Greater climate and disaster resilience",
    ],
    difficulty: "Advanced",
    publishedAt: "2026-08-06",
    solutionCount: 0,
  },
  {
    id: "P-012",
    title: "AI Geospatial Intelligence for Urban Planning",
    theme: "Transparent and Sustainable Infrastructure Growth",
    category: "GIS & Urban Planning",
    problemOwnerId: "town-country-planning",
    description:
      "Develop a geospatial change-detection platform that helps planning authorities identify unauthorised development, protect roads and rivers from encroachment and understand infrastructure expansion over time.",
    capabilities: [
      "Detect road and river encroachments",
      "Identify potentially unauthorised construction for official verification",
      "Track infrastructure expansion using time-series imagery",
      "Overlay detected changes with planning and environmental GIS layers",
      "Provide evidence, severity indicators and department-wise dashboards",
    ],
    outcomes: [
      "Faster identification of planning violations",
      "Better protection of roads, rivers and public land",
      "More transparent urban development monitoring",
      "Data-driven infrastructure planning",
    ],
    difficulty: "Advanced",
    publishedAt: "2026-08-06",
    solutionCount: 0,
  },
];

export function getProblemById(id: string): Problem | undefined {
  return problems.find((p) => p.id === id);
}

export function getTotalProblems(): number {
  return problems.length;
}
