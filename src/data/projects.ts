export interface Project {
  id: string;
  title: string;
  category: string;
  copy: string;
  tint: string;
  accent: string;
  liveDemo: boolean;
  /** Override the "Live Demo" button label, e.g. "Live Website" */
  liveDemoLabel?: string;
  github: boolean;
  featured?: boolean;
  featuredLabel?: string;
  /** Optional screenshots: [hero, secondary, tertiary] */
  images?: string[];
  /** Optional image labels matching the images array */
  imageLabels?: string[];
  // ── Modal detail fields ───────────────────────────────────────────────────
  overview?: string;
  problem?: string;
  solution?: string;
  keyFeatures?: string[];
  techStack?: string[];
  challenges?: string[];
  whatILearned?: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "01",
    title: "TalkLaws",
    category: "Client Project",
    copy: "Full-stack Next.js corporate website for a legal consultancy — multi-page architecture, responsive UI/UX, consultation booking, Google Maps integration, and production deployment on Vercel.",
    tint: "from-[#1a1a1a] to-[#0C0C0C]",
    accent: "#BBCCD7",
    liveDemo: true,
    liveDemoLabel: "Live Website",
    github: true,
    featured: true,
    featuredLabel: "Client Project",
    liveUrl: "https://www.talklaws.in/",
    githubUrl: "https://github.com/dhwaniagarwal17/Talklaws",
    images: [
      "/images/talklaws/Screenshot 2026-07-30 175932.png",
      "/images/talklaws/Screenshot 2026-07-15 123435.png",
      "/images/talklaws/Screenshot 2026-07-15 123459.png",
      "/images/talklaws/Screenshot 2026-07-15 123527.png",
      "/images/talklaws/Screenshot 2026-07-15 123547.png",
    ],
    imageLabels: [
      "Landing Page — Premium hero with modern branding and responsive layout",
      "Why TalkLaws — Editorial content layout focused on trust and business communication",
      "Ask the Company Secretary — Interactive FAQ with expandable legal guidance",
      "Contact Page — Consultation booking form with Google Maps integration",
      "Team Section — Dynamic profile cards with responsive layouts",
    ],
    overview:
      "TalkLaws is a production-deployed multi-page Next.js website for a legal consultancy. The project covers the complete product lifecycle — from UX design through to backend integration, database setup, and Vercel deployment. The site includes a landing page, services, industries, about, team, insights/articles, interactive FAQ, consultation booking, and Google Maps.",
    problem:
      "The client had no digital presence. Potential clients had no way to discover the firm's services or submit consultation requests — resulting in lost leads and a credibility gap against more established competitors.",
    solution:
      "Designed and built a complete multi-page Next.js website with TypeScript. Connected MongoDB for data management, integrated Resend for email workflows, added Google Maps on the contact page, and deployed on Vercel with custom domain configuration.",
    keyFeatures: [
      "Multi-page Next.js architecture: Landing, Services, Industries, About, Team, Insights, Contact",
      "Interactive FAQ and Ask the Company Secretary feature",
      "Consultation booking form with Resend email integration",
      "Google Maps integration on the Contact page",
      "MongoDB backend for data management",
      "Fully responsive across all devices and breakpoints",
      "Production deployment on Vercel with custom domain",
    ],
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "Mongoose", "Resend", "Google Maps", "Vercel"],
    challenges: [
      "Building a multi-page architecture with SEO and performance considerations",
      "Integrating multiple backend services cleanly in a production context",
      "Maintaining design consistency across all pages and screen sizes",
    ],
    whatILearned: [
      "Full Next.js application architecture and production deployment",
      "End-to-end client project management and communication",
      "Multi-service backend integration (email, maps, database)",
      "Vercel deployment with custom domains and environment variables",
    ],
  },
  {
    id: "02",
    title: "Personal Portfolio",
    category: "Personal Project",
    copy: "Interactive portfolio built using React, TypeScript, Tailwind CSS and Framer Motion with cinematic animations and immersive storytelling.",
    tint: "from-[#20211f] to-[#0C0C0C]",
    accent: "#D7CBA9",
    liveDemo: true,
    github: true,
    overview:
      "This portfolio is a custom-built React application designed to showcase my work with the same level of craft and attention to detail I bring to every project. It uses Framer Motion for cinematic entrance animations, a sticky scroll-stack for the projects section, and a premium dark aesthetic throughout.",
    problem:
      "Generic portfolio templates don't communicate personality or technical depth. I needed a portfolio that demonstrates what I can build, not just what I have built.",
    solution:
      "Built from scratch using React, TypeScript and Tailwind CSS. Every interaction — from the floating hero avatar to the sliding navbar pill — was designed intentionally. Framer Motion drives all animations with physics-based easing curves rather than linear transitions.",
    keyFeatures: [
      "Cinematic hero section with floating avatar and magnetic hover",
      "Sticky scroll-stack projects section with scale transforms",
      "Interactive case study modals with full project breakdowns",
      "Glassmorphism navbar with sliding active pill indicator",
      "Fully responsive across all breakpoints from 430px to 1920px",
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite", "Lucide React"],
    challenges: [
      "Achieving smooth 60fps animations across all devices without layout jank",
      "Designing a composition where the avatar naturally frames the typography",
      "Keeping the codebase maintainable while adding progressive complexity",
    ],
    whatILearned: [
      "Advanced Framer Motion patterns including layoutId, useScroll and useTransform",
      "Designing and implementing a full design system from scratch",
      "Performance optimisation for animation-heavy React applications",
      "Building complex sticky scroll interactions with Intersection Observer",
    ],
    liveUrl: "https://dhwani.dev",
    githubUrl: "https://github.com/dhwani/portfolio",
  },
  {
    id: "03",
    title: "Hostel Mess Management System",
    category: "Team Project",
    copy: "SQL-based hostel management system developed collaboratively featuring menu management, feedback handling and administrative functionality.",
    tint: "from-[#131722] to-[#0C0C0C]",
    accent: "#9FB6D9",
    liveDemo: false,
    github: true,
    images: [
      "/images/admin-dashboard.png",
      "/images/student-dashboard.png",
      "/images/login.png",
    ],
    imageLabels: ["Admin Dashboard", "Student Dashboard", "Login Screen"],
    overview:
      "A full-stack hostel mess management system built collaboratively as an academic team project. The system provides separate interfaces for administrators and students, enabling menu management, feedback collection and meal tracking through a MySQL-backed application.",
    problem:
      "Hostel mess operations are typically managed manually — menus are communicated informally, feedback is difficult to collect, and administrators have limited visibility into student preferences.",
    solution:
      "Built a role-based web application with separate admin and student dashboards. Admins can manage menus and view feedback; students can see the current menu and submit feedback. MySQL stores all data with a structured schema designed for reliability and query efficiency.",
    keyFeatures: [
      "Role-based authentication with separate admin and student dashboards",
      "Admin panel for menu management and feedback review",
      "Student portal for menu viewing and feedback submission",
      "MySQL database with normalised schema design",
      "Clean, readable UI with functional navigation",
    ],
    techStack: ["HTML", "CSS", "JavaScript", "PHP", "MySQL", "SQL"],
    challenges: [
      "Designing a normalised database schema to avoid redundancy",
      "Implementing session-based authentication without a modern framework",
      "Coordinating development across a team with shared database access",
    ],
    whatILearned: [
      "Relational database design and SQL query optimisation",
      "Role-based access control implementation",
      "Collaborative development with version control and task division",
      "Full-stack integration from UI through to database layer",
    ],
    githubUrl: "https://github.com/dhwani/hmms",
  },
];

export interface LearningProjectLink {
  label: string;
  href: string;
  disabled?: boolean;
}

export interface LearningProject {
  id: string;
  title: string;
  badge: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  // ── Modal fields ─────────────────────────────────────────────────────────
  overview: string;
  learningObjectives: string[];
  conceptsPracticed: string[];
  challenges: string;
  futureImprovements: string[];
  techStack: string[];
}

export const LEARNING_PROJECTS: LearningProject[] = [
  {
    id: "calculator",
    title: "Calculator",
    badge: "JavaScript Fundamentals",
    description:
      "A responsive calculator built to strengthen JavaScript fundamentals, DOM manipulation and application logic.",
    tags: ["HTML", "CSS", "JavaScript"],
    overview:
      "Built while learning JavaScript to understand how DOM manipulation, events and application state work together. The project required thinking through sequential operations and edge cases from the ground up.",
    learningObjectives: [
      "DOM Manipulation",
      "Event Handling",
      "JavaScript Functions",
      "Arithmetic Logic",
    ],
    conceptsPracticed: [
      "Selecting and updating DOM elements",
      "Attaching event listeners to buttons",
      "Managing application state in variables",
      "Parsing and evaluating arithmetic expressions",
    ],
    challenges:
      "Managing sequential operations correctly and handling edge cases such as multiple decimal points, division by zero, and chained calculations.",
    futureImprovements: [
      "Keyboard input support",
      "Scientific calculator mode",
      "Theme switcher",
    ],
    techStack: ["HTML", "CSS", "JavaScript"],
  },
  {
    id: "todo",
    title: "To-Do List",
    badge: "CRUD Application",
    description:
      "A lightweight task management application demonstrating dynamic DOM updates and client-side CRUD operations.",
    tags: ["HTML", "CSS", "JavaScript"],
    overview:
      "A task management application built to practice CRUD operations and dynamic DOM rendering. The project focused on creating, reading, updating and deleting tasks entirely on the client side without any page refresh.",
    learningObjectives: [
      "CRUD Operations",
      "Dynamic DOM Updates",
      "Array Manipulation",
      "Local Storage",
    ],
    conceptsPracticed: [
      "Creating and removing DOM nodes dynamically",
      "Storing and retrieving data from localStorage",
      "Filtering and mapping arrays to update the UI",
      "Handling form submission and input validation",
    ],
    challenges:
      "Managing task state updates without refreshing the page and keeping the UI in sync with the underlying data model.",
    futureImprovements: [
      "Task categories and labels",
      "Due dates and reminders",
      "Drag and drop reordering",
    ],
    techStack: ["HTML", "CSS", "JavaScript"],
  },
  {
    id: "countdown",
    title: "Countdown Timer",
    badge: "JavaScript Timing",
    description:
      "A real-time countdown application built to explore JavaScript Date APIs, timers and dynamic UI rendering.",
    tags: ["HTML", "CSS", "JavaScript"],
    overview:
      "A countdown timer built to understand JavaScript timing functions and live UI updates. The project required calculating the difference between two points in time and reflecting that difference in the UI every second.",
    learningObjectives: [
      "JavaScript Date API",
      "setInterval & clearInterval",
      "Time Calculations",
      "Dynamic Rendering",
    ],
    conceptsPracticed: [
      "Using Date.now() and Date objects for time arithmetic",
      "Running and clearing intervals reliably",
      "Converting milliseconds to days, hours, minutes and seconds",
      "Updating multiple DOM elements on each tick",
    ],
    challenges:
      "Keeping the timer accurate while updating the interface smoothly, and handling the edge case when the countdown reaches zero.",
    futureImprovements: [
      "Multiple simultaneous timers",
      "Browser notifications on completion",
      "Custom themes and sound alerts",
    ],
    techStack: ["HTML", "CSS", "JavaScript"],
  },
  {
    id: "ecommerce",
    title: "E-Commerce Landing Page",
    badge: "Responsive UI",
    description:
      "A responsive front-end landing page focused on modern layouts, reusable UI components and clean user experience.",
    tags: ["HTML", "CSS", "JavaScript"],
    overview:
      "A responsive e-commerce landing page created to practice modern frontend layouts and responsive design. The focus was on building a clean, consistent UI using Flexbox and CSS Grid that holds together across all screen sizes.",
    learningObjectives: [
      "Responsive Design",
      "Flexbox & CSS Grid",
      "UI Components",
      "Landing Page Design",
    ],
    conceptsPracticed: [
      "Building responsive grids with CSS Grid",
      "Creating flexible component layouts with Flexbox",
      "Writing reusable CSS component classes",
      "Applying mobile-first breakpoints",
    ],
    challenges:
      "Maintaining visual consistency and correct proportions across different screen sizes without a CSS framework.",
    futureImprovements: [
      "Product listing with filters",
      "Shopping cart functionality",
      "Backend integration",
      "Authentication flow",
    ],
    techStack: ["HTML", "CSS", "JavaScript"],
  },
];
