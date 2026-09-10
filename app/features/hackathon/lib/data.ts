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
  {
    id: "P-013",
    title: "Citizen-First UI/UX Redesign of Apuni Sarkar e-Services",
    theme: "Making Uttarakhand's Digital Public Services Simple and Mobile-Friendly",
    category: "Digital Public Services, Accessibility & UX",
    problemOwnerId: "itda",
    description:
      "Redesign Uttarakhand's Apuni Sarkar e-services portal (https://eservices.uk.gov.in/) to address mobile usability and navigation challenges so everyday citizens, including people with limited digital literacy, can independently find and use government services. This ITDA challenge requires a detailed user-study report and comprehensive UI/UX research, not just a visual makeover. Validate the redesigned experience with citizens. As an optional enhancement, a conversational AI agent should let citizens access every citizen-facing function offered by the portal through voice or text and complete tasks end to end, not merely answer questions or navigate to pages. The conversational experience must complement, not replace, an intuitive accessible interface.",
    capabilities: [
      "Conduct consent-based interviews and task observations with a diverse mix of rural and urban citizens, older adults, people with disabilities and first-time digital-service users; document participant profiles, methodology and anonymised evidence",
      "Audit existing mobile and desktop journeys, information architecture, content and accessibility; benchmark comparable public-service portals and prioritise issues by user impact",
      "Use research-backed personas, journey maps and usability findings to simplify service discovery and organise navigation around citizen needs rather than requiring knowledge of departments",
      "Design responsive, mobile-first journeys for registration, service applications, document uploads, application-status tracking and certificate downloads, including clear validation and error recovery",
      "Provide plain-language Hindi and English content, clear document requirements and progress indicators, with layouts suitable for small screens and low-bandwidth connections",
      "Design and test against WCAG 2.2 AA accessibility criteria, including keyboard navigation, screen-reader labels, readable contrast and touch-friendly controls",
      "Run task-based usability tests on the existing experience and redesigned prototype; compare task completion, time on task, errors and user satisfaction, and iterate based on findings",
      "Optional conversational AI: inventory every existing citizen-facing portal function and provide equivalent Hindi/English voice-and-text workflows, including service discovery, eligibility and document guidance, registration and account management, application completion and submission, document uploads, payments where offered, status tracking, certificate downloads and verification, and grievances or support",
      "For the conversational AI enhancement, collect and validate information through dialogue, retain task context, let citizens review and correct details, execute authorised operations and return verifiable status, acknowledgements or downloadable results rather than only redirecting to pages; use secure embedded controls for uploads, authentication and payments where needed",
      "For the conversational AI enhancement, enforce authentication and user permissions, protect personal data, keep passwords and OTPs out of chat, require explicit confirmation before submissions, payments or other consequential actions, and provide clear failure recovery and a usable non-AI fallback; use approved integrations or clearly labelled sandbox demonstrations without claiming simulated actions succeeded on the live portal",
    ],
    applications: [
      "Find the right service and understand the requirements for income, domicile or caste certificates",
      "Register and complete an application from a mobile phone with minimal assistance",
      "Check application status, download or verify certificates, and find grievance or support channels",
      "Optionally request a certificate in everyday language, provide application details conversationally, upload supporting documents, review and confirm submission, complete any applicable payment securely, and receive an acknowledgement through the same conversational workflow",
      "Optionally manage an account, track an application, download or verify a certificate, or submit and follow up on a grievance through conversation, with equivalent access to every other citizen-facing portal function",
    ],
    outcomes: [
      "Required detailed user-study report covering research questions, recruitment and participant profiles, methods, anonymised findings, pain points, personas, journey maps and study limitations",
      "Required comprehensive UI/UX research report covering the current-site audit, comparative benchmarking, accessibility assessment, revised information architecture and evidence-linked design decisions",
      "An interactive mobile-first prototype with desktop adaptations, key end-to-end citizen journeys and a reusable, accessible UI component system",
      "If the AI enhancement is included, a conversational prototype with a function-by-function parity matrix covering every existing citizen-facing portal capability, end-to-end task demonstrations and usability evidence; document authentication and confirmation steps, integration dependencies and any mocked or unsupported operations explicitly",
      "A usability-validation report comparing baseline and redesigned task performance, documenting design iterations and remaining issues without unsupported improvement claims",
      "A prioritised implementation handoff for ITDA, including design specifications, accessibility recommendations, technical dependencies and a phased rollout plan",
      "Easier independent access to government services, fewer navigation and form errors, and reduced reliance on intermediaries, supported by citizen-testing evidence",
    ],
    difficulty: "Advanced",
    publishedAt: "2026-09-09",
    solutionCount: 0,
  },
  {
  "id": "P-014",
  "title": "AI-Driven Social Media Trends & Automated Public Communication Pipeline",
  "theme": "Scalable, Intelligent Government Communication",
  "category": "Media & Communication AI",
  "problemOwnerId": "information-public-relations",
  "description": "Government departments need a unified AI engine to monitor social trends, identify citizen information gaps, and deploy factual, non-partisan public awareness campaigns. This solution must integrate NLP-driven trend analysis, AI content generation, and multi-channel distribution into a single, highly auditable workflow.",
  "capabilities": [
    "Monitor authorized social platforms using NLP to identify emerging civic topics, hashtags, and recurring citizen queries.",
    "Convert trend data into actionable campaign briefs detailing objectives, verified sources, and publishing schedules.",
    "Generate context-aware Hindi and English assets (social posts, video scripts, infographics) using a multilingual RAG engine grounded strictly in approved government data.",
    "Provide an intuitive workspace with reusable templates and plain-language tools for non-technical communication officers.",
    "Enforce strict role-based access control (RBAC), routing drafts for fact-checking and explicit officer approval prior to publication.",
    "Schedule and publish across official channels via API integrations, featuring automated tracking, failure handling, and rollback controls.",
    "Adhere strictly to platform policies and privacy laws, ensuring zero individual profiling, fabricated engagement, or partisan targeting."
  ],
  "applications": [
    "Rapidly deploy scheme awareness campaigns explaining government services, eligibility, and application deadlines.",
    "Publish coordinated public-health, weather, and disaster alerts using verified data.",
    "Auto-generate dynamic, plain-language explainers and FAQs to answer trending citizen questions.",
    "Sync departmental event announcements and citizen-service outreach across all official channels efficiently."
  ],
  "outcomes": [
    "Drastic reduction in staff time required for content drafting and trend research.",
    "Faster deployment of verified public advisories without bypassing strict accountability and approval chains.",
    "Consistent, high-quality, and multilingual messaging across all government departments.",
    "Delivery of an auditable, end-to-end prototype proving trend discovery, RAG-based generation, secure approvals, and automated publishing."
  ],
  "difficulty": "Advanced",
  "publishedAt": "2026-09-09",
  "solutionCount": 0
}
];

export function getProblemById(id: string): Problem | undefined {
  return problems.find((p) => p.id === id);
}

export function getTotalProblems(): number {
  return problems.length;
}
