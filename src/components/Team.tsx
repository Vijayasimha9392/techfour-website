import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { team } from "@/data/team";
import { getTrack } from "@/data/tracks";
import { requestContact } from "@/lib/contact-intent";
import { cn } from "@/lib/utils";
import type { Developer } from "@/types";
import { DeveloperAvatar } from "./DeveloperAvatar";
import { Button } from "./ui/button";
import { Reveal } from "./ui/reveal";
import { Section, SectionHeading } from "./ui/section";
import { SocialIconLinks } from "./ui/smart-link";
import { TechBadgeList } from "./ui/tech-badge";

export function AvailabilityPill({ dev }: { dev: Developer }) {
  const { fullTime, freelance } = dev.availability;
  const available = fullTime || freelance;
  const label =
    fullTime && freelance
      ? "Open to work"
      : fullTime
        ? "Open to full-time"
        : freelance
          ? "Freelance only"
          : "Not available";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium",
        available
          ? "border-success/30 bg-success/10 text-success"
          : "border-border-strong bg-muted text-muted-foreground",
      )}
    >
      <span aria-hidden className={cn("size-1.5 rounded-full", available ? "bg-success" : "bg-muted-foreground")} />
      {label}
    </span>
  );
}

function DeveloperCard({ dev }: { dev: Developer }) {
  const track = getTrack(dev.track);
  return (
    <article
      aria-labelledby={`dev-${dev.id}`}
      className={cn(
        track.colorClass,
        "group surface-card relative flex h-full flex-col overflow-hidden rounded-3xl p-6 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-track/40 sm:p-8",
      )}
    >
      <div
        aria-hidden
        className="absolute -right-24 -top-24 size-64 rounded-full glow-track opacity-40 transition-opacity duration-500 group-hover:opacity-90"
      />
      <div className="relative flex items-start gap-4">
        <DeveloperAvatar dev={dev} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 id={`dev-${dev.id}`} className="text-xl font-semibold tracking-tight text-foreground">
              {dev.name}
            </h3>
          </div>
          <p className="mt-1 text-sm font-medium text-track">{dev.role}</p>
          <div className="mt-2.5">
            <AvailabilityPill dev={dev} />
          </div>
        </div>
      </div>

      <p className="relative mt-6 text-[15px] leading-relaxed text-secondary-foreground">
        {dev.intro}
      </p>

      <div className="relative mt-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          Specialization
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{dev.specialization}</p>
      </div>

      <TechBadgeList items={dev.technologies} className="relative mt-6" />

      <div className="flex-1" aria-hidden />
      <div className="relative mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
        <SocialIconLinks links={dev.links} name={dev.name} />
        <div className="flex gap-2">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="h-9 px-3.5 group-hover:border-track/50"
          >
            {/* <a
              href={`/developers/${dev.id}`}
            >
              View Details <ArrowRight />
            </a> */}
          </Button>
          <div className="flex gap-2">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="h-9 px-3.5 group-hover:border-track/50"
            >
              <Link to={`/developers/${dev.id}`}>
                View Details <ArrowRight />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="h-9 px-3.5 group-hover:border-track/50"
            >
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  requestContact({
                    developerPreference: dev.name,
                    inquiryType: "Individual Developer Hiring",
                  });
                }}
              >
                Contact {dev.firstName} <ArrowRight />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}

export function Team() {
  return (
    <Section id="team" labelledBy="team-title" className="border-t border-border">
      <SectionHeading
        id="team-title"
        eyebrow="Our Team"
        title="Meet Our Developers"
        description="Four specialists, each available to hire individually — and stronger together on end-to-end projects."
      />
      <ul className="mt-14 grid gap-5 lg:grid-cols-2">
        {team.map((dev, i) => (
          <li key={dev.id}>
            <Reveal delay={i * 0.06} className="h-full">
              <DeveloperCard dev={dev} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}