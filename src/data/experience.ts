export interface CaseStudyLink {
  label: string;
  href: string;
  disabled?: boolean;
}

export type CaseStudyStatus = "Completed" | "Ongoing" | "In Progress";

export interface CaseStudyItem {
  id: string;
  /** Marks the hero/featured card – only one item should have this true */
  featured?: boolean;
  /** Adds a "Featured Achievement" badge on the card */
  featuredAchievement?: boolean;
  category: string;
  title: string;
  org: string;
  /** Human-readable type + year, e.g. "Client Project • 2026" */
  metadata: string;
  duration: string;
  status: CaseStudyStatus;
  summary: string;
  tags: string[];
  /**
   * Gallery images shown in the modal and as card cover.
   * First image is always the cover. Single image = no gallery controls.
   */
  images?: string[];
  /** Captions matching the images array. Falls back to filename if omitted. */
  imageLabels?: string[];
  // ── Modal fields ──────────────────────────────────────────────────────────
  overview: string;
  problem: string;
  myRole: string;
  contributions: string[];
  technologies: string[];
  challenges: string[];
  keyLearnings: string[];
  deliverables: string[];
  certificateNote?: string;
  statusNote?: string;
  links: CaseStudyLink[];
}

export const CASE_STUDIES: CaseStudyItem[] = [
  {
    id: "talklaws",
    featured: true,
    category: "Client Project",
    title: "TalkLaws",
    org: "TalkLaws Legal Consultancy",
    metadata: "Client Project • 2026",
    duration: "2026",
    status: "Completed",
    images: [
      "/images/talklaws/Screenshot 2026-07-30 175932.png",
      "/images/talklaws/Screenshot 2026-07-15 123435.png",
      "/images/talklaws/Screenshot 2026-07-15 123459.png",
      "/images/talklaws/Screenshot 2026-07-15 123527.png",
      "/images/talklaws/Screenshot 2026-07-15 123547.png",
    ],
    imageLabels: [
      "Landing Page — Premium hero with modern branding, responsive layout and clear value proposition",
      "Why TalkLaws — Editorial content layout focused on trust, clarity and business communication",
      "Ask the Company Secretary — Interactive FAQ with expandable legal guidance",
      "Contact Page — Consultation booking form with Google Maps integration",
      "Team Section — Dynamic profile cards with responsive layout",
    ],
    summary:
      "Designed and developed a full-stack Next.js corporate website for a legal consultancy — multi-page architecture, modern UI/UX, Google Maps integration, interactive FAQ, consultation booking, and production deployment on Vercel.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "MongoDB", "Vercel"],
    overview:
      "TalkLaws is a production-deployed multi-page Next.js website for a legal consultancy. The project covers the complete product lifecycle — from UX design and frontend development through to backend API integration, database setup, and Vercel deployment. The site includes a landing page, services, industries, about, team, insights/articles, interactive FAQ, and a consultation booking form with Google Maps.",
    problem:
      "The client had no digital presence. Potential clients had no way to discover the firm's services, understand their expertise, or submit consultation requests — resulting in lost leads and a credibility gap against more established competitors.",
    myRole:
      "Solo developer and designer — responsible for the full product lifecycle: UX design, frontend, backend, database, deployment, and post-launch support.",
    contributions: [
      "Designed the complete multi-page UI and visual identity from scratch",
      "Built a fully responsive Next.js frontend with TypeScript",
      "Developed multi-page architecture: Landing, Services, Industries, About, Team, Insights, Contact",
      "Implemented interactive FAQ and Ask the Company Secretary feature",
      "Integrated consultation booking form with email workflow via Resend",
      "Added Google Maps integration on the Contact page",
      "Connected MongoDB backend for data management",
      "Deployed on Vercel with custom domain and environment configuration",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "Mongoose", "Resend", "Google Maps", "Vercel"],
    challenges: [
      "Balancing a professional legal aesthetic with modern, approachable design",
      "Building a reliable multi-page architecture with SEO considerations",
      "Integrating multiple backend services (email, maps, database) cleanly",
      "Ensuring consistent responsiveness across all pages and breakpoints",
    ],
    keyLearnings: [
      "Full Next.js application architecture and deployment",
      "End-to-end client project management and communication",
      "Production deployment with Vercel, custom domains and environment variables",
      "Multi-service backend integration in a production context",
    ],
    deliverables: ["Production Next.js website", "MongoDB backend", "Email enquiry system", "Google Maps integration", "Vercel deployment"],
    links: [
      { label: "Live Website", href: "https://www.talklaws.in/" },
      { label: "GitHub Repository", href: "https://github.com/dhwaniagarwal17/Talklaws" },
    ],
  },
  {
    id: "sedax",
    category: "Internship",
    title: "Technical Intern",
    org: "Sedax Data Solutions Private Limited",
    metadata: "Internship • May 2026 – July 2026",
    duration: "May 2026 – July 2026",
    status: "Completed",
    images: ["/images/sedax.webp"],
    imageLabels: ["Sedax Data Solutions Private Limited"],
    summary:
      "Contributed to technical documentation, enterprise proposal assistance, technical research, B2G opportunity tracking, frontend development, and government digital identity infrastructure while working as a Technical Intern.",
    tags: ["Frontend Development", "Technical Documentation", "Technical Research", "Aadhaar eKYC", "Digital Identity", "Enterprise Solutions", "B2G"],
    overview:
      "Completed a technical internship at Sedax Data Solutions Pvt. Ltd., contributing across multiple areas including frontend development, technical documentation, B2G opportunity tracking, and research into government digital identity infrastructure including Aadhaar eKYC systems.",
    problem:
      "Enterprise and government clients required clear technical proposals, well-structured documentation, and research-backed analysis of digital identity solutions to make informed integration decisions.",
    myRole:
      "Technical Intern — contributing to frontend development tasks, assisting with enterprise proposals, conducting technical research, and tracking B2G opportunities.",
    contributions: [
      "Contributed to frontend development tasks for internal and client-facing products",
      "Assisted with enterprise proposal documentation and presentation materials",
      "Conducted technical research on Aadhaar eKYC and digital identity infrastructure",
      "Tracked and analysed B2G (Business-to-Government) opportunities",
      "Documented government digital identity workflows and integration requirements",
      "Participated in team discussions and contributed to product thinking",
    ],
    technologies: ["Frontend Development", "Technical Documentation", "Aadhaar eKYC", "Digital Identity", "Enterprise Solutions", "B2G", "Research"],
    challenges: [
      "Understanding complex government digital identity regulatory frameworks",
      "Synthesising technical and commercial information into clear proposals",
      "Contributing meaningfully across multiple domains simultaneously",
    ],
    keyLearnings: [
      "Enterprise software development and documentation practices",
      "Government digital infrastructure and identity verification systems",
      "B2G opportunity identification and proposal writing",
      "Professional stakeholder communication in a corporate environment",
    ],
    deliverables: ["Technical documentation", "Enterprise proposals", "Research reports", "B2G opportunity analysis", "Internship completion certificate"],
    links: [
      { label: "Company Website", href: "https://sedax.in" },
      { label: "View Certificate", href: "/images/sedax-internship-certificate.pdf" },
    ],
  },
  {
    id: "whitepaper",
    category: "Research",
    title: "AI in Wearable Technology",
    org: "Independent Research",
    metadata: "Research • 2026",
    duration: "2026",
    status: "In Progress",
    summary:
      "White paper exploring energy-efficient AI techniques for wearable devices — balancing inference performance, battery life, and real-world usability.",
    tags: ["AI", "Machine Learning", "Wearables", "Edge AI", "Technical Writing"],
    overview:
      "Research focused on integrating AI into wearable devices while balancing computational capability, battery life, and real-world usability — covering health monitoring, activity recognition, edge inference, and privacy.",
    problem:
      "Wearable AI is constrained by power budgets that desktop and cloud AI ignores. Existing literature lacks a unified treatment of the energy–accuracy trade-off across real consumer use cases.",
    myRole:
      "Sole author — conducting literature review, synthesising findings, and writing the complete white paper.",
    contributions: [
      "Conducted a comprehensive literature review across academic and industry sources",
      "Analysed energy-efficiency trade-offs in edge AI inference",
      "Documented health monitoring and activity recognition use cases",
      "Explored privacy and on-device data security considerations",
      "Structured and authored the complete white paper",
    ],
    technologies: ["Technical Writing", "Research Methodology", "Literature Review", "AI / ML", "Edge AI"],
    challenges: [
      "Synthesising a fragmented research landscape into a coherent narrative",
      "Maintaining academic rigour while making content accessible",
    ],
    keyLearnings: [
      "Academic research methodology",
      "Technical writing and structured documentation",
      "AI hardware–software co-design principles",
      "Privacy-first design thinking",
    ],
    deliverables: ["White paper PDF", "Abstract", "Research presentation"],
    statusNote: "In Progress",
    links: [{ label: "Read Paper", href: "#", disabled: true }],
  },
  {
    id: "mars",
    category: "Engineering",
    title: "Mechanical Innovation Team",
    org: "MARS",
    metadata: "Engineering Team • 2025 – Present",
    duration: "2024 – 2026",
    status: "Completed",
    images: [
      "/images/gimbal.jpeg",
      "/images/gimbal cad.jpeg",
    ],
    imageLabels: [
      "Physical prototype of the robotic manipulator",
      "SolidWorks CAD design used during development",
    ],
    summary:
      "Multidisciplinary robotics team — contributing to mechanical design and CAD modelling for a two-axis camera gimbal system.",
    tags: ["SolidWorks", "CAD", "Mechanical Design", "Robotics", "Teamwork"],
    overview:
      "Worked as part of a multidisciplinary engineering team on mechanical systems and robotics projects, with primary contribution on a two-axis camera gimbal system.",
    problem:
      "The team needed a stable, lightweight gimbal mechanism capable of compensating for platform vibration while remaining manufacturable with available tooling.",
    myRole:
      "Mechanical design contributor — responsible for component design, CAD modelling, and iterative refinement based on testing feedback.",
    contributions: [
      "Designed components for a two-axis gimbal system",
      "Created and iterated on CAD models in SolidWorks",
      "Collaborated with cross-functional team members on integration",
      "Participated in design reviews and implemented feedback",
    ],
    technologies: ["SolidWorks", "Mechanical Design", "CAD", "Robotics", "Engineering Design"],
    challenges: [
      "Balancing structural rigidity with weight constraints",
      "Iterating rapidly within team design review cycles",
    ],
    keyLearnings: [
      "Mechanical design iteration under real constraints",
      "Cross-functional team collaboration",
      "CAD modelling best practices in SolidWorks",
      "Engineering design trade-off analysis",
    ],
    deliverables: ["CAD models", "Design iteration documentation", "Project contribution records"],
    links: [],
  },
  {
    id: "nasa",
    featuredAchievement: true,
    category: "Research",
    title: "NASA / IASC Asteroid Search",
    org: "International Astronomical Search Collaboration",
    metadata: "Research • 2024",
    duration: "2024",
    status: "Completed",
    images: [
      "/images/asteroid certificate.jpeg",
      "/images/magazine.jpeg",
      "/images/asteroid shortlist.jpeg",
    ],
    imageLabels: [
      "International Astronomical Search Collaboration Certificate",
      "Featured article describing the project",
      "Asteroid search campaign participation and contributions",
    ],
    summary:
      "Participated in NASA-affiliated IASC asteroid search campaign — analysing real telescope data, contributing to asteroid detection, and receiving an official certificate of participation.",
    tags: ["Astronomy", "Data Analysis", "Research", "NASA", "IASC"],
    overview:
      "Participated in the International Astronomical Search Collaboration (IASC) asteroid search campaign, a NASA-affiliated citizen science programme. Analysed real photometric data from telescope observations to identify and report potential asteroid candidates.",
    problem:
      "Asteroid detection at scale requires distributed human analysis of large telescope datasets. IASC enables students and researchers worldwide to contribute meaningfully to real astronomical discovery pipelines.",
    myRole:
      "Research participant — independently analysing telescope image data, identifying candidate asteroids, and submitting findings through the IASC reporting pipeline.",
    contributions: [
      "Analysed real photometric telescope data for asteroid candidates",
      "Applied astrometric techniques to distinguish asteroids from background stars",
      "Submitted validated observations through the official IASC pipeline",
      "Received official certificate of participation from IASC",
      "Featured in school publication for the achievement",
    ],
    technologies: ["Astrometry", "Data Analysis", "Astronomical Imaging", "Scientific Research"],
    challenges: [
      "Distinguishing genuine asteroid motion from image artefacts and noise",
      "Applying precise measurement techniques to faint moving objects",
    ],
    keyLearnings: [
      "Real-world astronomical data analysis",
      "Scientific observation and reporting methodology",
      "Citizen science research workflows",
      "Applying analytical rigour to ambiguous data",
    ],
    deliverables: ["IASC Certificate of Participation", "Asteroid observation reports", "Magazine feature"],
    links: [],
  },
];
