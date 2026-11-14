import { ArrowRight, Briefcase, Building2, Check, Minus, UserCheck } from "lucide-react";
import { team } from "@/data/team";
import { getTrack } from "@/data/tracks";
import { requestContact } from "@/lib/contact-intent";
import { cn } from "@/lib/utils";
import type { Developer } from "@/types";
import { Button } from "./ui/button";
import { Reveal } from "./ui/reveal";
import { Section, SectionHeading } from "./ui/section";
import { SocialIconLinks } from "./ui/smart-link";

const hiringModes = [
  {
    icon: UserCheck,
    title: "Recruiters can hire individually",
    body: "Each developer applies and interviews independently for roles that match their specialization.",
  },
  {
    icon: Building2,
    title: "Businesses can hire us as a team",
    body: "For freelance and collaborative projects, TechFour works together across the full stack.",
  },
  {
    icon: Briefcase,
    title: "No package deal required",
    body: "Individual job applications never require hiring all four developers — each makes their own career decisions.",
  },
];

function Indicator({ on, label }: { on: boolean; label: string }) {
  return (
    <li className="flex items-center gap-2 text-sm">
      <span
        className={cn(
          "flex size-5 items-center justify-center rounded-full",
          on ? "bg-success/15 text-success" : "bg-muted text-muted-foreground",
        )}
      >
        {on ? <Check className="size-3" aria-hidden /> : <Minus className="size-3" aria-hidden />}
      </span>
      <span className={on ? "text-secondary-foreground" : "text-muted-foreground line-through"}>
        {label}
      </span>
      <span className="sr-only">{on ? "(yes)" : "(not currently)"}</span>
    </li>
  );
}

function AvailabilityCard({ dev }: { dev: Developer }) {
  const track = getTrack(dev.track);
  return (
    <article
      aria-labelledby={`career-${dev.id}`}
      className={cn(
        track.colorClass,
        "group relative flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-track/40",
      )}
    >
      <span aria-hidden className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-track/70 to-transparent" />
      <h3 id={`career-${dev.id}`} className="text-lg font-semibold tracking-tight text-foreground">
        {dev.name}
      </h3>
      <p className="mt-1 text-sm font-medium text-track">{dev.role}</p>
      <p className="mt-4 font-mono text-[11px] leading-relaxed text-secondary-foreground/80">
        {dev.primaryTechnologies.join(" · ")}
      </p>
      <ul className="mt-5 space-y-2.5">
        <Indicator on={dev.availability.fullTime} label="Open to Full-Time Roles" />
        <Indicator on={dev.availability.freelance} label="Available for Freelance Projects" />
      </ul>
      <div className="mt-auto flex items-center justify-between gap-3 pt-6">
        <SocialIconLinks links={dev.links} name={dev.name} include={["linkedin", "github"]} />
        <Button
          asChild
          variant="outline"
          size="sm"
          className="h-9 group-hover:border-track/50"
        >
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              requestContact({
                developerPreference: dev.name,
                inquiryType: "Full-Time Employment",
              });
            }}
          >
            Hire {dev.firstName}
            <span className="sr-only"> ({dev.role})</span>
          </a>
        </Button>
      </div>
    </article>
  );
}

export function Careers() {
  return (
    <Section id="careers" labelledBy="careers-title" className="overflow-hidden border-t border-border">
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[420px] bg-grid mask-fade-radial opacity-70" />

      <SectionHeading
        id="careers-title"
        eyebrow="Careers & Availability"
        title={
          <>
            Currently Open to <span className="text-gradient">Exciting Opportunities!</span>
          </>
        }
        description="Our developers are actively looking for full-time opportunities where we can contribute our technical expertise, solve challenging problems, and grow professionally."
      />

      <ul className="mt-12 grid gap-4 md:grid-cols-3">
        {hiringModes.map((mode, i) => {
          const Icon = mode.icon;
          return (
            <li key={mode.title}>
              <Reveal delay={i * 0.05} className="flex h-full gap-4 rounded-2xl border border-border-strong bg-background/60 p-5">
                <Icon className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                <div>
                  <h3 className="text-[15px] font-semibold text-foreground">{mode.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{mode.body}</p>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ul>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {team.map((dev, i) => (
          <li key={dev.id}>
            <Reveal delay={i * 0.06} className="h-full">
              <AvailabilityCard dev={dev} />
            </Reveal>
          </li>
        ))}
      </ul>

      <Reveal className="mt-12 flex justify-center">
        <Button asChild variant="hero" size="xl">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              requestContact({});
            }}
          >
            Connect With Our Team for Hiring <ArrowRight />
          </a>
        </Button>
      </Reveal>
    </Section>
  );
}
