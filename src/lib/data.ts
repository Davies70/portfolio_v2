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

export const projects: Project[] = [
  {
    title: 'DocuGuard',
    description:
      "An automated RAG system that audits technical documentation against changelogs to detect and 'self-heal' breaking changes using Groq/Llama 3.",
    src: 'https://images.unsplash.com/photo-1761857352384-aaae23a714a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwZGF0YSUyMHByb2Nlc3Npbmd8ZW58MXx8fHwxNzcwOTIzNTc5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    link: 'https://docu-guard-self-healing-rag.vercel.app/',
    github: 'https://github.com/Davies70/DocuGuard-Self-Healing-RAG',
    color: '#BBACAF',
    tech: ['NextJS', 'FastAPI', 'Python', 'LangChain', 'Llama 3'],
    architecture: {
      nodes: [
        { id: 'ui', label: 'Next.js UI', x: 15, y: 50 },
        { id: 'api', label: 'FastAPI', x: 45, y: 50 },
        { id: 'rag', label: 'LangChain RAG', x: 80, y: 25 },
        { id: 'llm', label: 'Llama 3', x: 80, y: 75 },
      ],
      connections: [
        { from: 'ui', to: 'api' },
        { from: 'api', to: 'rag' },
        { from: 'api', to: 'llm' },
        { from: 'rag', to: 'llm' },
      ],
    },
  },
  {
    title: 'Secure File Pipeline',
    description:
      'Full-stack serverless application for securely uploading, optimizing, and managing files. Features a React dashboard and an AWS Lambda/S3 backend.',
    src: 'https://images.unsplash.com/photo-1744868562210-fffb7fa882d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZXJ2ZXIlMjByb29tJTIwdGVjaG5vbG9neSUyMGluZnJhc3RydWN0dXJlfGVufDF8fHx8MTc3MDg2MDI0OHww&ixlib=rb-4.1.0&q=80&w=1080',
    link: 'https://secure-file-processing-ui.vercel.app/',
    github: 'https://github.com/Davies70/secure-file-upload',
    color: '#977F6D',
    tech: ['NextJS', 'AWS Lambda', 'S3', 'DynamoDB', 'Tailwind'],
    architecture: {
      nodes: [
        { id: 'client', label: 'React Client', x: 15, y: 50 },
        { id: 'gateway', label: 'API Gateway', x: 45, y: 50 },
        { id: 'lambda', label: 'Lambda Worker', x: 75, y: 50 },
        { id: 's3', label: 'S3 Storage', x: 75, y: 15 },
        { id: 'db', label: 'DynamoDB', x: 75, y: 85 },
      ],
      connections: [
        { from: 'client', to: 'gateway' },
        { from: 'gateway', to: 'lambda' },
        { from: 'client', to: 's3' },
        { from: 'lambda', to: 'db' },
      ],
    },
  },
  {
    title: 'CheapBites',
    description:
      'Geolocation-based discovery app for affordable restaurants nearby. Integrates Foursquare Places API and Leaflet maps for interactive filtering.',
    src: 'https://images.unsplash.com/photo-1659821589718-66ffaf73b920?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXQlMjBmb29kJTIwY2l0eSUyMG5pZ2h0fGVufDF8fHx8MTc3MDkyMzU4MHww&ixlib=rb-4.1.0&q=80&w=1080',
    link: 'https://cheapbites.vercel.app',
    github: 'https://github.com/Davies70/cheapbites',
    color: '#C2491D',
    tech: ['NextJS', 'TypeScript', 'MongoDB', 'Leaflet'],
    architecture: {
      nodes: [
        { id: 'ui', label: 'NextJS App', x: 20, y: 50 },
        { id: 'maps', label: 'Leaflet Maps', x: 50, y: 20 },
        { id: 'places', label: 'Foursquare API', x: 50, y: 80 },
        { id: 'api', label: 'Next API', x: 60, y: 50 },
        { id: 'db', label: 'MongoDB', x: 85, y: 50 },
      ],
      connections: [
        { from: 'ui', to: 'maps' },
        { from: 'ui', to: 'places' },
        { from: 'ui', to: 'api' },
        { from: 'api', to: 'db' },
      ],
    },
  },
  {
    title: 'ShopApocalypse',
    description:
      'A parody eCommerce experience for doomsday gear. Showcases complex UI animation and immersive storytelling using Framer Motion and GSAP.',
    src: 'https://images.unsplash.com/photo-1758618851158-006674a63063?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWN0aWNhbCUyMGdlYXIlMjB1cmJhbnxlbnwxfHx8fDE3NzA5MjM1ODB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    link: 'https://shopapocalypse.netlify.app/',
    github: 'https://github.com/Davies70/shopapocalypse',
    color: '#706D63',
    tech: ['React', 'Framer Motion', 'GSAP', 'TypeScript'],
    architecture: {
      nodes: [
        { id: 'core', label: 'React Core', x: 20, y: 50 },
        { id: 'state', label: 'Store State', x: 50, y: 50 },
        { id: 'framer', label: 'Framer Motion', x: 80, y: 25 },
        { id: 'gsap', label: 'GSAP Engine', x: 80, y: 75 },
      ],
      connections: [
        { from: 'core', to: 'state' },
        { from: 'core', to: 'framer' },
        { from: 'core', to: 'gsap' },
        { from: 'state', to: 'framer' },
        { from: 'state', to: 'gsap' },
      ],
    },
  },
  {
    title: 'ThrillerFiend',
    description:
      'Tracking platform for thriller fans integrating Google Books & NYT APIs. Features user ratings, reading logs, and Firebase persistence.',
    src: 'https://images.unsplash.com/photo-1586202690180-1967f682ef1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxteXN0ZXJ5JTIwYm9va3MlMjBub2lyJTIwc2hhZG93c3xlbnwxfHx8fDE3NzA5MjM1ODB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    link: 'https://thrillerfiend.netlify.app',
    github: 'https://github.com/Davies70/ThrillerFiend',
    color: '#B62429',
    tech: ['React', 'Firebase', 'MUI', 'Rest API'],
    architecture: {
      nodes: [
        { id: 'ui', label: 'React App', x: 15, y: 50 },
        { id: 'gbooks', label: 'Google Books', x: 45, y: 20 },
        { id: 'nyt', label: 'NYT API', x: 45, y: 80 },
        { id: 'auth', label: 'Firebase Auth', x: 80, y: 35 },
        { id: 'db', label: 'Firestore DB', x: 80, y: 65 },
      ],
      connections: [
        { from: 'ui', to: 'gbooks' },
        { from: 'ui', to: 'nyt' },
        { from: 'ui', to: 'auth' },
        { from: 'ui', to: 'db' },
      ],
    },
  },
  {
    title: 'InventoryManager API',
    description:
      'Serverless REST API for managing inventory at scale. Supports full CRUD operations and secure IAM-based access via AWS Lambda and DynamoDB.',
    src: 'https://images.unsplash.com/photo-1563884705074-7c8b15f16295?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZXJ2ZXIlMjBjYWJsZXMlMjBuZXR3b3JrJTIwaW5mcmFzdHJ1Y3R1cmV8ZW58MXx8fHwxNzcwOTIzNTgwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    link: '',
    github: 'https://github.com/Davies70/inventory-manager',
    color: '#232F3E',
    tech: ['AWS Lambda', 'API Gateway', 'DynamoDB', 'Serverless'],
    architecture: {
      nodes: [
        { id: 'client', label: 'External Client', x: 15, y: 50 },
        { id: 'gateway', label: 'API Gateway', x: 40, y: 50 },
        { id: 'iam', label: 'IAM Auth', x: 40, y: 20 },
        { id: 'lambda', label: 'Lambda CRUD', x: 65, y: 50 },
        { id: 'db', label: 'DynamoDB', x: 90, y: 50 },
      ],
      connections: [
        { from: 'client', to: 'gateway' },
        { from: 'gateway', to: 'iam' },
        { from: 'gateway', to: 'lambda' },
        { from: 'lambda', to: 'db' },
      ],
    },
  },
  {
    title: 'Sumbot',
    description:
      'Browser-based AI text summarizer using frequency-based scoring and Graph-based PageRank to extract key concepts from long-form text.',
    src: 'https://images.unsplash.com/photo-1750969185331-e03829f72c7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXVyYWwlMjBuZXR3b3JrJTIwYWJzdHJhY3QlMjBibHVlfGVufDF8fHx8MTc3MDkyMzU4MXww&ixlib=rb-4.1.0&q=80&w=1080',
    link: 'https://sumbot.netlify.app',
    github: 'https://github.com/Davies70/sumbot',
    color: '#4A90E2',
    tech: ['HTML', 'CSS', 'JavaScript', 'Algorithms'],
    architecture: {
      nodes: [
        { id: 'ui', label: 'Vanilla UI', x: 15, y: 50 },
        { id: 'parser', label: 'Text Parser', x: 40, y: 50 },
        { id: 'scorer', label: 'Freq Scorer', x: 65, y: 25 },
        { id: 'graph', label: 'PageRank', x: 65, y: 75 },
        { id: 'output', label: 'Summarizer', x: 90, y: 50 },
      ],
      connections: [
        { from: 'ui', to: 'parser' },
        { from: 'parser', to: 'scorer' },
        { from: 'parser', to: 'graph' },
        { from: 'scorer', to: 'output' },
        { from: 'graph', to: 'output' },
        { from: 'output', to: 'ui' },
      ],
    },
  },
];
