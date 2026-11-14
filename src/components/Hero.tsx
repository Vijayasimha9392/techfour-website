import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import type { MouseEvent } from "react";
import { tracks } from "@/data/tracks";
import { getDeveloper } from "@/data/team";
import { scrollToSection } from "@/lib/contact-intent";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { CollaborationVisual } from "./CollaborationVisual";

const go = (id: string) => (e: MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  scrollToSection(id);
};

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] as const },
});

export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative scroll-mt-20 overflow-hidden pt-28 pb-20 sm:pt-36 lg:pb-28"
    >
      <div aria-hidden className="absolute inset-0 bg-grid mask-fade-radial" />
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full glow-primary blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.p
            {...fade(0)}
            className="inline-flex items-center gap-2.5 rounded-full border border-border-strong bg-surface/80 px-3.5 py-1.5 text-xs font-medium text-secondary-foreground backdrop-blur sm:text-[13px]"
          >
            <span className="relative flex size-2" aria-hidden>
              <span className="absolute inset-0 rounded-full bg-success animate-ping-soft" />
              <span className="relative size-2 rounded-full bg-success" />
            </span>
            Available for Freelance Projects &amp; Individual Full-Time Opportunities
          </motion.p>

          <motion.h1
            {...fade(0.08)}
            id="hero-title"
            className="mt-7 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[3.75rem]"
          >
            Four Developers. One Vision.{" "}
            <span className="text-gradient">Limitless Possibilities.</span>
          </motion.h1>

          <motion.p
            {...fade(0.16)}
            className="mt-6 max-w-xl text-pretty text-lg font-medium leading-relaxed text-secondary-foreground sm:text-xl"
          >
            We are a team of four technology professionals ready to turn your ideas into powerful
            digital solutions.
          </motion.p>
          <motion.p
            {...fade(0.22)}
            className="mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground"
          >
            From full-stack application development and AI-powered solutions to data science and
            DevOps automation, TechFour combines complementary technical expertise to build,
            innovate, and deliver.
          </motion.p>

          <motion.div {...fade(0.3)} className="mt-9 flex flex-wrap items-center gap-3">
            <Button asChild variant="hero" size="xl">
              <a href="#contact" onClick={go("contact")}>
                Hire Our Team <ArrowRight />
              </a>
            </Button>
            <Button asChild variant="glass" size="xl">
              <a href="#projects" onClick={go("projects")}>
                Explore Our Projects
              </a>
            </Button>
            <Button asChild variant="ghost" size="xl" className="px-4">
              <a href="#team" onClick={go("team")}>
                Meet Our Developers
              </a>
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <CollaborationVisual />
        </motion.div>
      </div>

      <div className="relative mx-auto mt-16 max-w-7xl px-5 sm:px-8 lg:mt-20">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {tracks.map((track, i) => {
            const Icon = track.icon;
            const dev = getDeveloper(track.ownerId);
            return (
              <motion.li
                key={track.id}
                {...fade(0.4 + i * 0.07)}
                className={cn(
                  track.colorClass,
                  "group surface-card relative overflow-hidden rounded-2xl p-5 transition-colors hover:border-track/40",
                )}
              >
                <div
                  aria-hidden
                  className="absolute -right-10 -top-10 size-32 rounded-full glow-track opacity-60 transition-opacity group-hover:opacity-100"
                />
                <div className="relative flex items-start gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-track/30 bg-track/10 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
                    <Icon className="size-5 text-track" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-[15px] font-semibold leading-snug text-foreground">
                      {track.heroLabel}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">{dev.name}</p>
                  </div>
                </div>
                <p className="relative mt-4 font-mono text-[11px] leading-relaxed text-secondary-foreground/80">
                  {dev.primaryTechnologies.join(" · ")}
                </p>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
