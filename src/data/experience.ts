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
    // Images will be added here once screenshots are ready:
    // images: ["/images/talklaws-home.png", "/images/talklaws-services.png", ...],
    summary:
      "Designed and developed a modern corporate website for a legal consultancy — responsive UI, professional branding, and backend-powered enquiry management.",
    tags: ["React", "Node.js", "Express", "Tailwind CSS", "Responsive Design"],
    overview:
      "TalkLaws is a corporate website built for a legal consultancy to establish a strong online presence and simplify client communication. The project spanned end-to-end: from initial wireframes through to production deployment.",
    problem:
      "The client had no digital presence. Potential clients had no way to understand the firm's services or submit enquiries online, resulting in lost leads and a perception gap versus more established competitors.",
    myRole:
      "Solo developer and designer — responsible for the full product lifecycle from discovery, design, and development through to deployment and handoff.",
    contributions: [
      "Designed the complete UI and visual identity from scratch",
      "Built a fully responsive, accessible frontend in React",
      "Integrated a Node.js + Express backend for enquiry handling",
      "Implemented email delivery via EmailJS",
      "Managed production deployment and post-launch fixes",
    ],
    technologies: ["React", "JavaScript", "Node.js", "Express", "Tailwind CSS", "EmailJS"],
    challenges: [
      "Balancing a professional legal aesthetic with modern design sensibilities",
      "Building a reliable contact pipeline without a database",
      "Ensuring accessibility compliance across all device sizes",
    ],
    keyLearnings: [
      "Client communication and expectation management",
      "Responsive design across breakpoints",
      "Full-stack integration without over-engineering",
      "Professional deployment workflow",
    ],
    deliverables: ["Live corporate website", "Backend enquiry system", "Responsive design system", "GitHub repository"],
    links: [
      { label: "Live Website", href: "https://talklaws.com" },
      { label: "GitHub Repository", href: "https://github.com/dhwani" },
    ],
  },
  {
    id: "sedax",
    category: "Internship",
    title: "Software Development Intern",
    org: "Sedax Technologies",
    metadata: "Internship • Summer 2026",
    duration: "Summer 2026",
    status: "Ongoing",
    images: ["/images/sedax.webp"],
    imageLabels: ["Sedax Technologies"],
    summary:
      "Enterprise digital identity solutions — researching Aadhaar eKYC workflows, product analysis, and documenting onboarding processes.",
    tags: ["eKYC", "Aadhaar", "Research", "Enterprise Software", "Business Analysis"],
    overview:
      "Worked with the product and engineering team to understand digital identity verification systems and enterprise onboarding workflows, comparing Sedax's solutions against industry alternatives.",
    problem:
      "Enterprise clients needed a clear comparison of available eKYC solutions to make informed integration decisions. Existing documentation was fragmented and lacked structured analysis.",
    myRole:
      "Research intern — analysing, documenting, and presenting eKYC workflow comparisons and product positioning insights.",
    contributions: [
      "Studied Aadhaar-based eKYC workflows end-to-end",
      "Compared Sedax solutions with Protean and other providers",
      "Analysed pricing models and implementation trade-offs",
      "Documented enterprise onboarding workflows in detail",
      "Contributed to internal product discussions",
    ],
    technologies: ["Identity Verification", "eKYC", "Enterprise Software", "Business Analysis", "Research"],
    challenges: [
      "Navigating complex regulatory frameworks around digital identity in India",
      "Synthesising technical and commercial information into clear documentation",
    ],
    keyLearnings: [
      "Enterprise software development lifecycle",
      "Product thinking and competitive analysis",
      "Stakeholder communication in a professional setting",
      "Analytical problem solving under ambiguity",
    ],
    deliverables: ["Research notes", "Comparative analysis report", "Workflow documentation", "Presentations"],
    certificateNote: "Certificate will be added after internship completion.",
    links: [
      { label: "Company Website", href: "https://sedax.in" },
      { label: "Certificate (Coming Soon)", href: "#", disabled: true },
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
