import { cn } from "@/lib/utils";
import { site } from "@/data/site";

/** Four-cell mark: one cell per developer track. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={cn("size-8", className)}>
      <rect x="1" y="1" width="30" height="30" rx="9" className="fill-surface-raised stroke-border-strong" strokeWidth="1" />
      <rect x="7" y="7" width="8" height="8" rx="2.5" className="track-java fill-track" />
      <rect x="17" y="7" width="8" height="8" rx="2.5" className="track-dotnet fill-track" />
      <rect x="7" y="17" width="8" height="8" rx="2.5" className="track-data fill-track" />
      <rect x="17" y="17" width="8" height="8" rx="2.5" className="track-devops fill-track" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="text-[17px] font-semibold tracking-tight text-foreground">
        Tech<span className="text-gradient">Four</span>
        <span className="sr-only"> — {site.name} home</span>
      </span>
    </span>
  );
}
