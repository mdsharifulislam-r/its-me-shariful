export const profile = {
  name: "MD Shariful Islam",
  role: "Backend Developer",
  location: "Dhaka, Bangladesh",
  email: "eng.mdshariful.islam.7@gmail.com",
  phone: "+8801883847915",
  website: "https://your-portfolio.com",
  summary:
    "Backend Developer with expertise in NestJS, Express.js, TypeScript, MongoDB, MySQL, Redis, Docker, AWS, and microservices architecture. Experienced in building scalable backend systems, APIs, payment integrations, caching strategies, DevOps workflows, and cloud-based applications.",
  social: {
    github: "https://github.com/mdsharifulislam-r",
    linkedin: "https://www.linkedin.com/in/md-shariful-islam-2a8b40439/",
  },
};

export const experience = [
  {
    id: "01",
    role: "Backend Developer",
    company: "Dream71",
    period: "2025 - Present",
    description:
      "Developing scalable backend applications using NestJS, Express.js, TypeScript, MongoDB, MySQL, Redis, Docker, and AWS. Responsible for system architecture, API development, performance optimization, payment integrations, cloud deployment, and microservices-based solutions.",
  },
    {
    id: "02",
    role: "MERN Stack Developer",
    company: "BD Task Ltd",
    period: "2024 - 2025",
    description:
      "Developing scalable backend applications using NestJS, Express.js, TypeScript, MongoDB, MySQL, Redis, Docker, and AWS. Responsible for system architecture, API development, performance optimization, payment integrations, cloud deployment, and microservices-based solutions.",
  },
];

export const education = [
  {
    id: "01",
    degree: "Diploma in Computer Science and Technology",
    school: "Cumilla Polytechnic Institute",
    period: "2020- 2021",
    description:
      "Focused on computer science fundamentals, software development, backend engineering, databases, networking, and cloud technologies while building real-world full-stack and backend applications.",
  },
];

export const skills = [
  "NestJS",
  "Express.js",
  "TypeScript",
  "Node.js",
  "MongoDB",
  "MySQL",
  "Redis",
  "Docker",
  "AWS",
  "Microservices",
  "REST API",
  "System Design",
];

export type Project = {
  title: string;
  description: string;
  tech: string[];
  demoUrl?: string;
  githubUrl?: string;
  status: "live" | "pending";
};

export const projects: Project[] = [
  {
  title: "Sendit - AI-Powered Logistics Platform",
  description:
    "A scalable logistics and courier management platform built with NestJS, featuring real-time shipment tracking, vendor management, authentication, payment integration, cloud deployment, and a modern API-driven architecture.",
  tech: [
    "NestJS",
    "TypeScript",
    "MongoDB",
    "Redis",
    "Docker",
    "AWS",
    "Stripe",
    "JWT"
  ],
  demoUrl: "https://github.com/mdsharifulislam-r/sendit-app-backend",
  githubUrl: "https://github.com/mdsharifulislam-r/sendit-app-backend",
  status: "live"
},
  {
    title: "BackBuilder",
    description:
      "A visual backend builder platform that allows users to create backend applications graphically using node-based workflows for endpoints, middleware, controllers, services, and database operations.",
    tech: [
      "NestJS",
      "React",
      "TypeScript",
      "React Flow",
      "MongoDB",
    ],
    demoUrl: "https://back-builder-omega.vercel.app/",
    githubUrl: "https://github.com/mdsharifulislam-r/Backbuilder",
    status: "live",
  },
{
  title: "Coursify - Learning Management Platform",
  description:
    "A full-featured learning management platform with course creation, student enrollment, progress tracking, secure authentication, payment integration, and a scalable cloud-ready backend architecture.",
  tech: [
    "NestJS",
    "TypeScript",
    "MongoDB",
    "Redis",
    "Docker",
    "AWS",
    "Stripe",
    "JWT"
  ],
  demoUrl: "https://coursify-zeta-nine.vercel.app/",
  githubUrl: "https://github.com/mdsharifulislam-r/Coursify",
  status: "live"
}

];