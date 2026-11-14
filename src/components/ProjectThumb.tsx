import type { Project } from "@/types";
import { getTrack } from "@/data/tracks";
import { cn } from "@/lib/utils";

/** Neutral, track-themed illustration used until a real thumbnail is added. */
export function ProjectThumb({ project, className }: { project: Project; className?: string }) {
  const track = getTrack(project.track);
  const Icon = track.icon;

  if (project.thumbnail) {
    return (
      <img
        src={project.thumbnail}
        alt={`${project.title} preview`}
        loading="lazy"
        className={cn("aspect-[16/10] w-full object-cover", className)}
      />
    );
  }

  return (
    <div
      aria-hidden
      className={cn(
        track.colorClass,
        "relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden bg-surface",
        className,
      )}
    >
      <div className="absolute inset-0 bg-grid-fine opacity-80" />
      <div className="absolute left-1/2 top-1/2 size-56 -translate-x-1/2 -translate-y-1/2 rounded-full glow-track" />
      <svg viewBox="0 0 320 200" className="absolute inset-0 size-full" preserveAspectRatio="none">
        <path
          d="M0 150 C 60 120, 100 170, 160 130 S 260 80, 320 110"
          fill="none"
          className="stroke-track/35"
          strokeWidth="1.5"
        />
        <path
          d="M0 170 C 80 150, 120 190, 200 160 S 280 130, 320 140"
          fill="none"
          className="stroke-border-strong"
          strokeWidth="1"
        />
      </svg>
      <div className="glass relative flex size-14 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">
        <Icon className="size-6 text-track" />
      </div>
      <span className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        {project.id}
      </span>
    </div>
  );
}
