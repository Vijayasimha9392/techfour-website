import { BrainCircuit, Coffee, Infinity as InfinityIcon, Layers } from "lucide-react";
import type { Track, TrackId } from "@/types";

export const tracks: Track[] = [
  {
    id: "java-ai",
    filterLabel: "Java Full Stack & AI",
    categoryLabel: "Java Full Stack & AI",
    heroLabel: "Java Full Stack + AI",
    ownerId: "vijayasimha",
    icon: Coffee,
    colorClass: "track-java",
  },
  {
    id: "dotnet",
    filterLabel: ".NET Development",
    categoryLabel: ".NET Development",
    heroLabel: ".NET Development",
    ownerId: "shekar",
    icon: Layers,
    colorClass: "track-dotnet",
  },
  {
    id: "data-science",
    filterLabel: "AI + Data Engineering",
    categoryLabel: "AI + Data Engineering",
    heroLabel: "AI + Data Engineering",
    ownerId: "dinesh",
    icon: BrainCircuit,
    colorClass: "track-data",
  },
  {
    id: "devops",
    filterLabel: "DevOps & Cloud",
    categoryLabel: "DevOps & Cloud Engineering",
    heroLabel: "DevOps & Cloud Engineering",
    ownerId: "manikanta",
    icon: InfinityIcon,
    colorClass: "track-devops",
  },
];

export function getTrack(id: TrackId): Track {
  const track = tracks.find((t) => t.id === id);
  if (!track) throw new Error(`Unknown track: ${id}`);
  return track;
}
