import type { Developer, DeveloperId } from "@/types";

/**
 * Developer profiles. Edit names, roles, skills, links and availability here —
 * the Team, Careers, Services, Projects and Footer sections all read from this file.
 */

export const team: Developer[] = [
  {
    id: "vijayasimha",
    name: "Vijayasimha Tammineni",
    firstName: "Vijayasimha",
    initials: "VT",
    role: "Java Full Stack Developer (AI)",
    track: "java-ai",
    intro:
      "Java Full Stack Developer building end-to-end applications — from Spring Boot services and REST APIs to React.js interfaces — with a focus on integrating AI into practical software.",
    specialization:
      "Backend development, full-stack applications, REST API development, database management, and AI-powered applications.",
    technologies: [
      "Java",
      "Core Java",
      "Spring Boot",
      "JPA",
      "REST APIs",
      "React.js",
      "JavaScript",
      "MySQL",
      "API Testing",
      "Data Structures and Algorithms",
      "AI Integration",
      "Full Stack Development",
    ],
    primaryTechnologies: ["Java", "Spring Boot", "React.js", "AI Integration"],
    links: {
      linkedin: "https://www.linkedin.com/in/vijayasimha-tammineni-491a99284",
      github: "https://github.com/Vijayasimha9392",
      portfolio: "#",
      email: "vijayasimhatammineni@gmail.com",
    },
    availability: { fullTime: true, freelance: true },
    image: "/images/team/vijayasimha.jpeg",
  },
  {
    id: "shekar",
    name: "Shekar D",
    firstName: "Shekar",
    initials: "SD",
    role: ".NET Developer",
    track: "dotnet",
    intro:
      ".NET Developer working with C# and ASP.NET Core to build structured backend systems, Web APIs and database-driven applications on SQL Server.",
    specialization:
      "Enterprise applications, backend systems, API development, and database-driven applications.",
    technologies: ["C#", ".NET", "ASP.NET Core", "Web API", "SQL Server", "Backend Development"],
    primaryTechnologies: ["C#", "ASP.NET Core", "Web API", "SQL Server"],
    links: {
      linkedin: "https://www.linkedin.com/in/lakshmi-shekar-dangeti-973ab5391",
      github: "https://github.com/lshekar45",
      portfolio: "#",
      email: "lakshmishekardangeti25@gmail.com",
    },
    availability: { fullTime: true, freelance: true },
    image: "/images/team/shekar.jpeg",
  },
  {
    id: "dinesh",
    name: "Dinesh Boini",
    firstName: "Dinesh",
    initials: "DB",
    role: "AI & Data Engineer",
    track: "data-science",
    intro:
      "AI & Data Engineer building intelligent applications — from RAG-powered LLM chatbots and LangGraph multi-agent workflows to machine learning models and predictive analytics systems.",
    specialization:
      "Artificial Intelligence, Generative AI, Large Language Models, RAG, LangChain/LangGraph, Machine Learning, Deep Learning, and Data Analytics.",
    technologies: [
      "Python",
      "SQL",
      "LangGraph",
      "LangChain",
      "LangSmith",
      "RAG",
      "LLMs",
      "Vector Databases",
      "Machine Learning",
      "Deep Learning",
      "NLP",
      "Streamlit",
    ],
    primaryTechnologies: ["Python", "Generative AI", "LangGraph", "Machine Learning"],
    links: {
      linkedin: "https://www.linkedin.com/in/dinesh-boini-5911221b6",
      github: "https://github.com/DineshBoini",
      portfolio: "#",
      email: "dineshboini2003@gmail.com",
    },
    availability: { fullTime: true, freelance: true },
    image: "/images/team/dinesh.jpeg",
  },
  {
    id: "manikanta",
    name: "Manikanta M",
    firstName: "Manikanta",
    initials: "MM",
    role: "DevOps Engineer",
    track: "devops",
    intro:
      "DevOps Engineer automating how software is built, tested and shipped — with CI/CD pipelines, containers, Kubernetes and cloud deployment on Linux.",
    specialization:
      "Infrastructure automation, CI/CD pipelines, cloud deployment, and application reliability.",
    technologies: [
      "DevOps",
      "CI/CD",
      "Docker",
      "Kubernetes",
      "Cloud Computing",
      "Linux",
      "Automation",
      "Deployment",
    ],
    primaryTechnologies: ["CI/CD", "Docker", "Kubernetes", "Cloud Computing"],
    links: {
      linkedin: "https://www.linkedin.com/in/manikantamangalapalli",
      github: "#",
      portfolio: "#",
      email: "mangalapallimanikanta9898@gmail.com",
    },
    availability: { fullTime: true, freelance: true },
    image: "/images/team/manikanta.jpeg",
  },
];

export function getDeveloper(id: DeveloperId): Developer {
  const dev = team.find((d) => d.id === id);
  if (!dev) throw new Error(`Unknown developer: ${id}`);
  return dev;
}