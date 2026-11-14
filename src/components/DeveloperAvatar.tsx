import type { Developer } from "@/types";
import { getTrack } from "@/data/tracks";
import { cn } from "@/lib/utils";

/** Profile image if provided in src/data/team.ts, otherwise an initials placeholder. */
export function DeveloperAvatar({ dev, className }: { dev: Developer; className?: string }) {
  const track = getTrack(dev.track);
  return (
    <div
      className={cn(
        track.colorClass,
        "relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-track/40 bg-track/10",
        className,
      )}
    >
      {dev.image ? (
        <img src={dev.image} alt={`Portrait of ${dev.name}`} className="size-full object-cover" />
      ) : (
        <>
          <span aria-hidden className="absolute inset-0 bg-grid-fine opacity-70" />
          <span className="relative text-lg font-semibold tracking-tight text-track">
            {dev.initials}
          </span>
          <span className="sr-only">Profile photo placeholder for {dev.name}</span>
        </>
      )}
    </div>
  );
}
