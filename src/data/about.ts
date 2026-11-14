import { Database, MonitorSmartphone, Rocket, Server } from "lucide-react";
import type { DeveloperId, Track } from "@/types";
import type { LucideIcon } from "lucide-react";

export const strengths = [
  "Four specialized technical professionals",
  "Complementary technology stacks",
  "Collaborative problem-solving",
  "End-to-end software development capabilities",
  "Clean, scalable, and maintainable code",
  "Continuous learning and innovation",
  "Commitment to professional growth and quality",
];

export interface FlowStage {
  step: string;
  title: string;
  summary: string;
  technologies: string[];
  ownerIds: DeveloperId[];
  icon: LucideIcon;
  colorClass: Track["colorClass"];
}

/** How the four specializations connect on an end-to-end project. */
export const collaborationFlow: FlowStage[] = [
  {
    step: "01",
    title: "Frontend",
    summary: "Interfaces people use",
    technologies: ["React.js", "JavaScript", "TypeScript", "HTML", "CSS", "Tailwind CSS", "UI/UX Design", "Responsive Design", "API Integration"],
    ownerIds: ["vijayasimha"],
    icon: MonitorSmartphone,
    colorClass: "track-java",
  },
  {
    step: "02",
    title: "Backend",
    summary: "APIs, services & databases",
    technologies: ["Spring Boot", "ASP.NET Core", "MySQL", "SQL Server", "REST APIs", "GraphQL", "API Design", "API Testing", "Security", "Authentication"],
    ownerIds: ["vijayasimha", "shekar"],
    icon: Server,
    colorClass: "track-dotnet",
  },
  {
    step: "03",
    title: "AI + Data Engineering",
    summary: "Insights in AI + Data Engineering and machine learning",
    technologies: ["Python", "AI", "LLM", "RAG", "Lang Chain", "LangGraph" ,"Machine Learning", "Analytics", "Data preprocessing", "Model training"],
    ownerIds: ["dinesh"],
    icon: Database,
    colorClass: "track-data",
  },
  {
    step: "04",
    title: "DevOps",
    summary: "Build, ship & operate",
    technologies: ["Linux", "CI/CD", "Docker", "Kubernetes", "Cloud", "Terraform", "Monitoring", "Logging"],
    ownerIds: ["manikanta"],
    icon: Rocket,
    colorClass: "track-devops",
  },
];
