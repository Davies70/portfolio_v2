export interface ArchNode {
  id: string;
  label: string;
  x: number;
  y: number;
}

export interface ArchConnection {
  from: string;
  to: string;
}

export interface Project {
  title: string;
  description: string;
  role: string;
  highlight: string;
  problem: string;
  impact: string;
  proofPoints: string[];
  src: string;
  link: string;
  github: string;
  color: string;
  tech: string[];
  architecture?: {
    nodes: ArchNode[];
    connections: ArchConnection[];
  };
}

export interface AboutMe {
  name: string;
  lastName: string;
  title: string;
  heroText: string;
  descriptionOne: string;
  descriptionTwo: string;
  tech: string[];
  image: string;
  email: string;
  social: { name: string; link: string }[];
  recognitions: string[];
}

export const projects: Project[] = [
  // {
  //   title: "DocuGuard",
  //   description:
  //     "An automated RAG system that audits technical documentation against changelogs to detect and 'self-heal' breaking changes using Groq/Llama 3.",
  //   src: "/assets/projects/1.jpg",
  //   link: "https://docu-guard-self-healing-rag.vercel.app/",
  //   github: "https://github.com/Davies70/DocuGuard-Self-Healing-RAG",
  //   color: "#BBACAF",
  //   tech: ["NextJS", "FastAPI", "Python", "LangChain", "Llama 3"],
  //   architecture: {
  //     nodes: [
  //       { id: "ui", label: "Next.js UI", x: 15, y: 50 },
  //       { id: "api", label: "FastAPI", x: 45, y: 50 },
  //       { id: "rag", label: "LangChain RAG", x: 80, y: 25 },
  //       { id: "llm", label: "Llama 3", x: 80, y: 75 },
  //     ],
  //     connections: [
  //       { from: "ui", to: "api" },
  //       { from: "api", to: "rag" },
  //       { from: "api", to: "llm" },
  //       { from: "rag", to: "llm" },
  //     ],
  //   },
  // },
  // {
  //   title: "Secure File Pipeline",
  //   description:
  //     "Full-stack serverless application for securely uploading, optimizing, and managing files. Features a React dashboard and an AWS Lambda/S3 backend.",
  //   src: "/assets/projects/2.jpg",
  //   link: "https://secure-file-processing-ui.vercel.app/",
  //   github: "https://github.com/Davies70/secure-file-upload",
  //   color: "#977F6D",
  //   tech: ["NextJS", "AWS Lambda", "S3", "DynamoDB", "Tailwind"],
  //   architecture: {
  //     nodes: [
  //       { id: "client", label: "React Client", x: 15, y: 50 },
  //       { id: "gateway", label: "API Gateway", x: 45, y: 50 },
  //       { id: "lambda", label: "Lambda Worker", x: 75, y: 50 },
  //       { id: "s3", label: "S3 Storage", x: 75, y: 15 },
  //       { id: "db", label: "DynamoDB", x: 75, y: 85 },
  //     ],
  //     connections: [
  //       { from: "client", to: "gateway" },
  //       { from: "gateway", to: "lambda" },
  //       { from: "client", to: "s3" },
  //       { from: "lambda", to: "db" },
  //     ],
  //   },
  // },
  // {
  //   title: "CheapBites",
  //   description:
  //     "Geolocation-based discovery app for affordable restaurants nearby. Integrates Foursquare Places API and Leaflet maps for interactive filtering.",
  //   src: "/assets/projects/3.jpg",
  //   link: "https://cheapbites.vercel.app",
  //   github: "https://github.com/Davies70/cheapbites",
  //   color: "#C2491D",
  //   tech: ["NextJS", "TypeScript", "MongoDB", "Leaflet"],
  //   architecture: {
  //     nodes: [
  //       { id: "ui", label: "NextJS App", x: 20, y: 50 },
  //       { id: "maps", label: "Leaflet Maps", x: 50, y: 20 },
  //       { id: "places", label: "Foursquare API", x: 50, y: 80 },
  //       { id: "api", label: "Next API", x: 60, y: 50 },
  //       { id: "db", label: "MongoDB", x: 85, y: 50 },
  //     ],
  //     connections: [
  //       { from: "ui", to: "maps" },
  //       { from: "ui", to: "places" },
  //       { from: "ui", to: "api" },
  //       { from: "api", to: "db" },
  //     ],
  //   },
  // },
  {
    title: "ReDi Events",
    description:
      "An event management web app for creating, joining, and coordinating community events. Features JWT-authenticated endpoints, structured design tokens, and a decoupled 3-tier architecture.",
    role: "Full-stack development, API routing, database schema design",
    highlight:
      "Built a modular system combining Next.js 16 App Router and Tailwind v4 on the front end with an Express/Prisma 7 layered architecture on PostgreSQL.",
    problem:
      "Community teams need a simple way to publish events, manage attendance, and keep authenticated user actions separated from public browsing.",
    impact:
      "Shows end-to-end product thinking: a typed UI, protected API surface, relational data model, and deployment-ready architecture.",
    proofPoints: [
      "JWT-protected endpoints for authenticated event actions",
      "Prisma schema structured around users, events, and participation",
      "Dockerized PostgreSQL setup for repeatable local development",
    ],
    src: "/assets/projects/8.svg",
    link: "https://redi-events.vercel.app/sign-in",
    github: "https://github.com/ReDI-School/S26-Full-Stack-Circle",
    color: "#2E8B8B",
    tech: [
      "Next.js 16",
      "React 19",
      "Express.js",
      "TypeScript",
      "Prisma 7",
      "PostgreSQL",
      "Tailwind v4",
      "Docker",
    ],
    architecture: {
      nodes: [
        { id: "client", label: "Next.js UI", x: 12, y: 50 },
        { id: "routes", label: "Express Routes", x: 38, y: 20 },
        { id: "controller", label: "Controllers", x: 38, y: 50 },
        { id: "service", label: "Services", x: 38, y: 80 },
        { id: "prisma", label: "Prisma ORM", x: 65, y: 80 },
        { id: "db", label: "PostgreSQL", x: 88, y: 50 },
      ],
      connections: [
        { from: "client", to: "routes" },
        { from: "routes", to: "controller" },
        { from: "controller", to: "service" },
        { from: "service", to: "prisma" },
        { from: "prisma", to: "db" },
      ],
    },
  },
  {
    title: "ShopApocalypse",
    description:
      "A concept eCommerce experience built around cinematic product storytelling, responsive shopping flows, and polished front-end motion.",
    role: "Front-end architecture, interaction design, animation systems",
    highlight:
      "Built a highly branded React experience with coordinated Framer Motion and GSAP interactions without losing page clarity.",
    problem:
      "The goal was to make a product catalogue feel memorable without turning the shopping path into a confusing animation demo.",
    impact:
      "Demonstrates taste, motion restraint, responsive layout decisions, and the ability to build a strong brand moment in React.",
    proofPoints: [
      "Coordinated page transitions and product interactions",
      "Responsive shopping flow across mobile and desktop",
      "Motion used to support product storytelling instead of hiding content",
    ],
    src: "/assets/projects/4.jpg",
    link: "https://shopapocalypse.netlify.app/",
    github: "https://github.com/Davies70/shopx",
    color: "#706D63",
    tech: ["React", "Framer Motion", "GSAP", "TypeScript"],
    architecture: {
      nodes: [
        { id: "core", label: "React Core", x: 20, y: 50 },
        { id: "state", label: "Store State", x: 50, y: 50 },
        { id: "framer", label: "Framer Motion", x: 80, y: 25 },
        { id: "gsap", label: "GSAP Engine", x: 80, y: 75 },
      ],
      connections: [
        { from: "core", to: "state" },
        { from: "core", to: "framer" },
        { from: "core", to: "gsap" },
        { from: "state", to: "framer" },
        { from: "state", to: "gsap" },
      ],
    },
  },
  {
    title: "ThrillerFiend",
    description:
      "A reading tracker for thriller fans that combines book discovery, saved reading logs, user ratings, and persistent account data.",
    role: "Product UI, API integration, Firebase persistence",
    highlight:
      "Integrated Google Books and NYT data with Firebase-backed user state for a focused, repeatable reading workflow.",
    problem:
      "Readers needed one place to discover thriller books, keep a personal log, and return to saved ratings across sessions.",
    impact:
      "Shows practical product design, third-party API handling, authenticated state, and persistent user workflows.",
    proofPoints: [
      "Google Books and NYT API integration",
      "Firebase-backed user ratings and reading logs",
      "Material UI interface tuned for repeated browsing",
    ],
    src: "/assets/projects/5.jpg",
    link: "https://thrillerfiend.netlify.app",
    github: "https://github.com/Davies70/ThrillerFiend",
    color: "#B62429",
    tech: ["React", "Firebase", "MUI", "Rest API"],
    architecture: {
      nodes: [
        { id: "ui", label: "React App", x: 15, y: 50 },
        { id: "gbooks", label: "Google Books", x: 45, y: 20 },
        { id: "nyt", label: "NYT API", x: 45, y: 80 },
        { id: "auth", label: "Firebase Auth", x: 80, y: 35 },
        { id: "db", label: "Firestore DB", x: 80, y: 65 },
      ],
      connections: [
        { from: "ui", to: "gbooks" },
        { from: "ui", to: "nyt" },
        { from: "ui", to: "auth" },
        { from: "ui", to: "db" },
      ],
    },
  },
  {
    title: "InventoryManager API",
    description:
      "A serverless REST API for inventory operations with CRUD endpoints, IAM-based access, and DynamoDB-backed persistence.",
    role: "API design, AWS Lambda, DynamoDB data modeling",
    highlight:
      "Designed a lean cloud backend that separates client access, authorization, Lambda handlers, and database operations.",
    problem:
      "Inventory data needs predictable CRUD operations, secure access, and a backend that can scale without server maintenance.",
    impact:
      "Signals backend depth through cloud architecture, IAM-aware access, API Gateway routing, and DynamoDB persistence.",
    proofPoints: [
      "Serverless Lambda handlers for inventory operations",
      "API Gateway boundary with IAM-based access",
      "DynamoDB data model for low-maintenance persistence",
    ],
    src: "/assets/projects/6.jpg",
    link: "",
    github: "https://github.com/Davies70/inventory-manager",
    color: "#232F3E",
    tech: ["AWS Lambda", "API Gateway", "DynamoDB", "Serverless"],
    architecture: {
      nodes: [
        { id: "client", label: "External Client", x: 15, y: 50 },
        { id: "gateway", label: "API Gateway", x: 40, y: 50 },
        { id: "iam", label: "IAM Auth", x: 40, y: 20 },
        { id: "lambda", label: "Lambda CRUD", x: 65, y: 50 },
        { id: "db", label: "DynamoDB", x: 90, y: 50 },
      ],
      connections: [
        { from: "client", to: "gateway" },
        { from: "gateway", to: "iam" },
        { from: "gateway", to: "lambda" },
        { from: "lambda", to: "db" },
      ],
    },
  },
  {
    title: "Sumbot.AI",
    description:
      "A browser-based summarizer that combines neural NLP, graph scoring, and Web Workers to keep heavy text processing off the main UI thread.",
    role: "AI workflow, worker architecture, front-end performance",
    highlight:
      "Used Transformers.js and PageRank-style scoring in a non-blocking worker pipeline for fast, responsive summarization.",
    problem:
      "Long text summarization can freeze browser interfaces when model and scoring work runs on the main thread.",
    impact:
      "Shows AI experimentation with practical front-end engineering: responsive UI, worker boundaries, and multiple scoring strategies.",
    proofPoints: [
      "Transformers.js pipeline for neural summarization",
      "PageRank-style graph scoring as a complementary method",
      "Web Worker architecture to keep the interface responsive",
    ],
    src: "/assets/projects/7.jpg",
    link: "https://sumbot.netlify.app",
    github: "https://github.com/Davies70/sumbot",
    color: "#3B82F6", // Modern Blue
    tech: ["Vite", "Tailwind v4", "Transformers.js", "Web Workers", "NLP"],
    architecture: {
      nodes: [
        { id: "ui", label: "Main Thread (UI)", x: 10, y: 50 },
        { id: "worker", label: "Web Worker", x: 35, y: 50 },
        { id: "neural", label: "Neural Engine (BART)", x: 65, y: 20 },
        { id: "graph", label: "PageRank Graph", x: 65, y: 50 },
        { id: "freq", label: "Freq Scorer", x: 65, y: 80 },
        { id: "render", label: "Typewriter Renderer", x: 90, y: 50 },
      ],
      connections: [
        { from: "ui", to: "worker" },
        { from: "worker", to: "neural" },
        { from: "worker", to: "graph" },
        { from: "worker", to: "freq" },
        { from: "neural", to: "render" },
        { from: "graph", to: "render" },
        { from: "freq", to: "render" },
        { from: "render", to: "ui" },
      ],
    },
  },
];

export const aboutMe: AboutMe = {
  name: "Davies",
  lastName: "Ajayi",
  title: "Full-Stack Developer",
  heroText: `Full-stack developer building fast React, Node, and cloud applications with clear UX, maintainable architecture, and enough product taste to make interfaces feel alive.`,
  descriptionOne: `I build end-to-end web applications with a practical mix of front-end craft, API design, and cloud fundamentals. My strongest work sits where product clarity and technical structure meet.`,
  descriptionTwo: `I care about readable code, responsive interfaces, accessible details, and systems another engineer can understand without needing extra context from the original builder.`,
  image: "/assets/me.webp",
  tech: [
    "React & Next.js",
    "TypeScript",
    "Node.js & Express",
    "AWS (Serverless & Cloud)",
    "MongoDB & PostgreSQL",
    "Python & Django",
    "Docker & CI/CD",
    "Tailwind CSS",
  ],
  email: "daviesajayi7@gmail.com",
  social: [
    { name: "LinkedIn", link: "https://www.linkedin.com/in/daviesajayi/" },
    { name: "GitHub", link: "https://github.com/Davies70" },
  ],
  recognitions: [
    "Advanced Full-Stack Circle - ReDI School of Digital Integration",
    "Software Engineering Certificate - ALX Holberton School",

    "Full-Stack Web Development Specialization - Coursera Certificate",

    "WCAG Compliance: Web Accessibility Best Practices - Coursera Certificate of Completion",
  ],
};
