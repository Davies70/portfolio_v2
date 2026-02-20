import { link } from "fs";

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
  {
    title: "DocuGuard",
    description:
      "An automated RAG system that audits technical documentation against changelogs to detect and 'self-heal' breaking changes using Groq/Llama 3.",
    src: "/assets/projects/1.jpg",
    link: "https://docu-guard-self-healing-rag.vercel.app/",
    github: "https://github.com/Davies70/DocuGuard-Self-Healing-RAG",
    color: "#BBACAF",
    tech: ["NextJS", "FastAPI", "Python", "LangChain", "Llama 3"],
    architecture: {
      nodes: [
        { id: "ui", label: "Next.js UI", x: 15, y: 50 },
        { id: "api", label: "FastAPI", x: 45, y: 50 },
        { id: "rag", label: "LangChain RAG", x: 80, y: 25 },
        { id: "llm", label: "Llama 3", x: 80, y: 75 },
      ],
      connections: [
        { from: "ui", to: "api" },
        { from: "api", to: "rag" },
        { from: "api", to: "llm" },
        { from: "rag", to: "llm" },
      ],
    },
  },
  {
    title: "Secure File Pipeline",
    description:
      "Full-stack serverless application for securely uploading, optimizing, and managing files. Features a React dashboard and an AWS Lambda/S3 backend.",
    src: "/assets/projects/2.jpg",
    link: "https://secure-file-processing-ui.vercel.app/",
    github: "https://github.com/Davies70/secure-file-upload",
    color: "#977F6D",
    tech: ["NextJS", "AWS Lambda", "S3", "DynamoDB", "Tailwind"],
    architecture: {
      nodes: [
        { id: "client", label: "React Client", x: 15, y: 50 },
        { id: "gateway", label: "API Gateway", x: 45, y: 50 },
        { id: "lambda", label: "Lambda Worker", x: 75, y: 50 },
        { id: "s3", label: "S3 Storage", x: 75, y: 15 },
        { id: "db", label: "DynamoDB", x: 75, y: 85 },
      ],
      connections: [
        { from: "client", to: "gateway" },
        { from: "gateway", to: "lambda" },
        { from: "client", to: "s3" },
        { from: "lambda", to: "db" },
      ],
    },
  },
  {
    title: "CheapBites",
    description:
      "Geolocation-based discovery app for affordable restaurants nearby. Integrates Foursquare Places API and Leaflet maps for interactive filtering.",
    src: "/assets/projects/3.jpg",
    link: "https://cheapbites.vercel.app",
    github: "https://github.com/Davies70/cheapbites",
    color: "#C2491D",
    tech: ["NextJS", "TypeScript", "MongoDB", "Leaflet"],
    architecture: {
      nodes: [
        { id: "ui", label: "NextJS App", x: 20, y: 50 },
        { id: "maps", label: "Leaflet Maps", x: 50, y: 20 },
        { id: "places", label: "Foursquare API", x: 50, y: 80 },
        { id: "api", label: "Next API", x: 60, y: 50 },
        { id: "db", label: "MongoDB", x: 85, y: 50 },
      ],
      connections: [
        { from: "ui", to: "maps" },
        { from: "ui", to: "places" },
        { from: "ui", to: "api" },
        { from: "api", to: "db" },
      ],
    },
  },
  {
    title: "ShopApocalypse",
    description:
      "A parody eCommerce experience for doomsday gear. Showcases complex UI animation and immersive storytelling using Framer Motion and GSAP.",
    src: "/assets/projects/4.jpg",
    link: "https://shopapocalypse.netlify.app/",
    github: "https://github.com/Davies70/shopapocalypse",
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
      "Tracking platform for thriller fans integrating Google Books & NYT APIs. Features user ratings, reading logs, and Firebase persistence.",
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
      "Serverless REST API for managing inventory at scale. Supports full CRUD operations and secure IAM-based access via AWS Lambda and DynamoDB.",
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
      "High-performance browser-based summarizer using Neural AI (Transformers.js) and Graph-based PageRank. Offloads heavy computation to Web Workers for a non-blocking UI experience.",
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
  heroText: ` Crafting exceptional digital experiences through code, design, and
              innovation. I build modern, high-performance applications with
              attention to detail and long-term maintainability.`,
  descriptionOne: `I'm a versatile full-stack developer passionate about crafting responsive interfaces and scalable back-end systems. With hands-on experience building end-to-end solutions, I specialize in transforming ambitious ideas into efficient, digital realities.`,
  descriptionTwo: `My approach combines technical optimization with user-focused design, ensuring every application not only functions flawlessly under the hood but also delivers a seamless, captivating experience for the user`,
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
    "Software Engineering Certificate – ALX Holberton School",

    "Full-Stack Web Development Specialization – Coursera Certificate",

    "WCAG Compliance: Web Accessibility Best Practices – Coursera Certificate of Completion.",
  ],
};
