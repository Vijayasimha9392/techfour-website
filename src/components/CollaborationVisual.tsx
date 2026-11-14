import { tracks } from "@/data/tracks";
import { getDeveloper } from "@/data/team";
import { cn } from "@/lib/utils";
import { LogoMark } from "./Logo";

/** Positions (percent of the square) for the four developer nodes. */
const positions = [
  { left: "50%", top: "11%" },
  { left: "89%", top: "50%" },
  { left: "50%", top: "89%" },
  { left: "11%", top: "50%" },
];
const svgPoints = [
  [200, 44],
  [356, 200],
  [200, 356],
  [44, 200],
];

/** Abstract illustration: four specialists connected through one shared core. */
export function CollaborationVisual() {
  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[460px]"
      role="img"
      aria-label="Diagram of four developers — Java Full Stack + AI, .NET, AI + Data Engineering and DevOps — connected to one shared TechFour core"
    >
      <div aria-hidden className="absolute inset-[18%] rounded-full glow-primary blur-2xl" />

      <svg viewBox="0 0 400 400" aria-hidden className="absolute inset-0 size-full">
        <circle cx="200" cy="200" r="156" fill="none" className="stroke-border-strong" strokeDasharray="2 6" />
        <circle cx="200" cy="200" r="104" fill="none" className="stroke-border" />
        <g className="origin-center animate-spin-slow" style={{ transformOrigin: "200px 200px" }}>
          <circle cx="200" cy="96" r="2.5" className="fill-cyan" />
          <circle cx="304" cy="200" r="2" className="fill-violet" />
        </g>
        {svgPoints.map(([x, y], i) => (
          <line
            key={i}
            x1="200"
            y1="200"
            x2={x}
            y2={y}
            className={cn(tracks[i].colorClass, "stroke-track/60 animate-dash")}
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />
        ))}
        {/* outer ring segments linking neighbours */}
        <path
          d="M200 44 L356 200 L200 356 L44 200 Z"
          fill="none"
          className="stroke-border-strong"
          strokeWidth="1"
        />
      </svg>

      {/* Core */}
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
        <div className="glass flex size-24 items-center justify-center rounded-3xl shadow-glow sm:size-28">
          <LogoMark className="size-12 sm:size-14" />
        </div>
        <span className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          one team
        </span>
      </div>

      {/* Nodes */}
      {tracks.map((track, i) => {
        const Icon = track.icon;
        const dev = getDeveloper(track.ownerId);
        return (
          <div
            key={track.id}
            className={cn(
              track.colorClass,
              "absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center",
            )}
            style={positions[i]}
          >
            <div
              className="glass flex size-14 items-center justify-center rounded-2xl animate-float sm:size-16"
              style={{ animationDelay: `${i * -1.5}s` }}
            >
              <Icon className="size-6 text-track sm:size-7" aria-hidden />
            </div>
            <span className="mt-2 whitespace-nowrap rounded-full border border-border bg-background/80 px-2.5 py-1 text-[11px] font-medium text-foreground backdrop-blur">
              {dev.firstName}
            </span>
          </div>
        );
      })}
    </div>
  );
}
