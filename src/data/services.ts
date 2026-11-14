import {
  BrainCircuit,
  ChartColumn,
  Cloud,
  Coffee,
  CodeXml,
  Layers,
  Sparkles,
  Workflow,
} from "lucide-react";
import type { Service } from "@/types";

export const services: Service[] = [
  {
    id: "full-stack",
    title: "Full Stack Web Application Development",
    description:
      "Web applications built end to end — responsive React.js front ends connected to secure Spring Boot back ends and relational databases.",
    technologies: ["React.js", "JavaScript", "Spring Boot", "REST APIs", "MySQL, AI Integration"],
    developerIds: ["vijayasimha"],
    icon: CodeXml,
  },
  {
    id: "java-backend",
    title: "Java & Spring Boot Backend Development",
    description:
      "Backend services and REST APIs in Java and Spring Boot, with clean data models and maintainable business logic.",
    technologies: ["Java", "Core Java", "Spring Boot", "REST APIs", "MySQL"],
    developerIds: ["vijayasimha"],
    icon: Coffee,
  },
  {
    id: "dotnet",
    title: ".NET Application Development",
    description:
      "Business and enterprise-style applications on .NET — ASP.NET Core Web APIs and backend systems backed by SQL Server.",
    technologies: ["C#", ".NET", "ASP.NET Core", "Web API", "SQL Server"],
    developerIds: ["shekar"],
    icon: Layers,
  },
  {
    id: "ai-integration",
    title: "AI Integration & Intelligent Applications",
    description:
      "Adding AI capabilities to new or existing applications, from model-backed features to data-driven functionality inside your product.",
    technologies: ["AI Integration", "Java", "Python", "Machine Learning", "REST APIs"],
    developerIds: ["vijayasimha", "dinesh"],
    icon: Sparkles,
  },
  {
    id: "data-science",
    title: "AI + Data Engineering",
    description:
      "Exploring your data, building machine learning and predictive models in Python, and explaining what the results mean.",
    technologies: ["Python", "Machine Learning", "Predictive Modeling", "Data Science"],
    developerIds: ["dinesh"],
    icon: BrainCircuit,
  },
  {
    id: "analytics",
    title: "Data Analytics & Visualization",
    description:
      "Cleaning, analysing and visualising data so trends and insights are easy to understand and act on.",
    technologies: ["Python", "Data Analytics", "Data Visualization"],
    developerIds: ["dinesh"],
    icon: ChartColumn,
  },
  {
    id: "devops",
    title: "DevOps & CI/CD Automation",
    description:
      "Automated build, test and release pipelines plus containerised workflows that make shipping software repeatable.",
    technologies: ["CI/CD", "Docker", "Kubernetes", "Linux", "Automation"],
    developerIds: ["manikanta"],
    icon: Workflow,
  },
  {
    id: "cloud",
    title: "Cloud Deployment & Infrastructure",
    description:
      "Deploying applications to the cloud and setting up infrastructure with reliability and maintainability in mind.",
    technologies: ["Cloud Computing", "Docker", "Kubernetes", "Linux", "Deployment"],
    developerIds: ["manikanta"],
    icon: Cloud,
  },
];
