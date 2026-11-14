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
      className="relative scroll-mt-20 overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-36 lg:pb-28"
    >
      <div aria-hidden className="absolute inset-0 bg-grid mask-fade-radial" />
      <div
        aria-hidden
        className="absolute -top-32 left-1/2 h-[360px] w-[90%] -translate-x-1/2 rounded-full glow-primary blur-3xl sm:h-[480px] lg:-top-40 lg:h-[520px]"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <div>
          <motion.p
            {...fade(0)}
            className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface/80 px-3 py-1 text-xs font-medium text-secondary-foreground backdrop-blur sm:px-3.5 sm:py-1.5 sm:text-[13px]"
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
            className="mt-6 text-balance text-3xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-[3.75rem] lg:leading-[1.05]"
          >
            Four Developers. One Vision.{" "}
            <span className="text-gradient">Limitless Possibilities.</span>
          </motion.h1>

          <motion.p
            {...fade(0.16)}
            className="mt-5 max-w-xl text-pretty text-base font-medium leading-relaxed text-secondary-foreground sm:text-lg"
          >
            We are a team of four technology professionals ready to turn your ideas into powerful
            digital solutions.
          </motion.p>
          <motion.p
            {...fade(0.22)}
            className="mt-3 max-w-xl text-pretty leading-relaxed text-muted-foreground sm:text-base"
          >
            From full-stack application development and AI-powered solutions to data science and
            DevOps automation, TechFour combines complementary technical expertise to build,
            innovate, and deliver.
          </motion.p>

          <motion.div {...fade(0.3)} className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild variant="hero" size="lg" className="sm:size-xl">
              <a href="#contact" onClick={go("contact")}>
                Hire Our Team <ArrowRight />
              </a>
            </Button>
            <Button asChild variant="glass" size="lg" className="sm:size-xl">
              <a href="#projects" onClick={go("projects")}>
                Explore Our Projects
              </a>
            </Button>
            <Button asChild variant="ghost" size="lg" className="px-3 sm:px-4 sm:size-xl">
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
          className="hidden lg:flex"
        >
          <CollaborationVisual />
        </motion.div>
      </div>

      <div className="relative mx-auto mt-12 max-w-7xl px-5 sm:px-8 lg:mt-16">
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
                  "group surface-card relative overflow-hidden rounded-2xl p-4 transition-colors hover:border-track/40 sm:p-5",
                )}
              >
                <div
                  aria-hidden
                  className="absolute -right-8 -top-8 size-28 rounded-full glow-track opacity-60 transition-opacity group-hover:opacity-100 sm:-right-10 sm:-top-10 sm:size-32"
                />
                <div className="relative flex items-start gap-3 sm:gap-4">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-track/30 bg-track/10 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105 sm:size-11">
                    <Icon className="size-4 text-track sm:size-5" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-[14px] font-semibold leading-snug text-foreground sm:text-[15px]">
                      {track.heroLabel}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">{dev.name}</p>
                  </div>
                </div>
                <p className="relative mt-3 font-mono text-[10px] leading-relaxed text-secondary-foreground/80 sm:mt-4 sm:text-[11px]">
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
