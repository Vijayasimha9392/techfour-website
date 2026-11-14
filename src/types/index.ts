import type { LucideIcon } from "lucide-react";

export type TrackId = "java-ai" | "dotnet" | "data-science" | "devops";
export type DeveloperId = "vijayasimha" | "shekar" | "dinesh" | "manikanta";

export interface Track {
  id: TrackId;
  /** Label used in project filters */
  filterLabel: string;
  /** Label used for project categories */
  categoryLabel: string;
  /** Label used on hero technology cards */
  heroLabel: string;
  ownerId: DeveloperId;
  icon: LucideIcon;
  /** One of the track-* utilities defined in styles.css */
  colorClass: "track-java" | "track-dotnet" | "track-data" | "track-devops";
}

export interface SocialLinks {
  linkedin: string;
  github: string;
  portfolio: string;
  email?: string;
}

export interface Availability {
  fullTime: boolean;
  freelance: boolean;
}

export interface Developer {
  id: DeveloperId;
  name: string;
  firstName: string;
  initials: string;
  role: string;
  track: TrackId;
  intro: string;
  specialization: string;
  technologies: string[];
  primaryTechnologies: string[];
  links: SocialLinks;
  availability: Availability;
  /** Optional path to a real profile photo, e.g. "/images/team/vijayasimha.jpg" */
  image?: string;
  /** Optional path to resume file, e.g. "/resumes/vijayasimha.pdf" */
  resume?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  developerIds: DeveloperId[];
  icon: LucideIcon;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  details: string;
  ownerId: DeveloperId;
  track: TrackId;
  technologies: string[];
  /** Optional path to a thumbnail, e.g. "/projects/my-app.png" */
  thumbnail?: string;
  repoUrl: string;
  demoUrl: string;
  featured: boolean;
  /** Keep true until the entry is replaced with a real project */
  isPlaceholder: boolean;
}

export type ContactResult =
  | { ok: true }
  | { ok: false; code: "not_configured" | "too_fast" | "send_failed"; message: string };
