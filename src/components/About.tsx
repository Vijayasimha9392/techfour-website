import { Check } from "lucide-react";
import { collaborationFlow, strengths } from "@/data/about";
import { getDeveloper } from "@/data/team";
import { cn } from "@/lib/utils";
import { Reveal } from "./ui/reveal";
import { Section, SectionHeading } from "./ui/section";

export function About() {
  return (
    <Section id="about" labelledBy="about-title" className="border-t border-border">
      <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <SectionHeading
          id="about-title"
          eyebrow="About TechFour"
          title="Meet the Team Behind the Technology"
          description="TechFour is a team of four dedicated developers with complementary technical skills and a shared passion for building innovative software solutions. Our individual specializations allow us to approach challenges from multiple technical perspectives and collaborate on end-to-end development projects."
        />

        <Reveal delay={0.1}>
          <h3 className="text-sm font-medium text-muted-foreground">What we bring</h3>
          <ul className="mt-5 grid gap-x-6 gap-y-4 sm:grid-cols-2">
            {strengths.map((s) => (
              <li key={s} className="flex items-start gap-3 text-[15px] text-secondary-foreground">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/15">
                  <Check className="size-3 text-primary" aria-hidden />
                </span>
                {s}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      {/* Collaboration flow */}
      <Reveal delay={0.1} className="mt-20">
        <div className="surface-card relative overflow-hidden rounded-3xl p-6 sm:p-10">
          <div aria-hidden className="absolute inset-0 bg-grid-fine opacity-60 mask-fade-radial" />
          <div className="relative flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                How we work together
              </p>
              <h3 className="mt-2 text-xl font-semibold text-foreground sm:text-2xl">
                One project, four connected disciplines
              </h3>
            </div>
            <p className="max-w-sm text-sm text-muted-foreground">
              Each specialist owns a layer of the stack, and every layer hands off cleanly to the
              next.
            </p>
          </div>

          <ol className="relative mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {collaborationFlow.map((stage, i) => {
              const Icon = stage.icon;
              const owners = stage.ownerIds.map((id) => getDeveloper(id).firstName).join(" & ");
              return (
                <li key={stage.title} className={cn(stage.colorClass, "relative lg:px-3")}>
                  {i < collaborationFlow.length - 1 && (
                    <span
                      aria-hidden
                      className="absolute left-[calc(50%+2rem)] right-[calc(-50%+2rem)] top-7 hidden h-px bg-gradient-to-r from-track/60 to-border-strong lg:block"
                    />
                  )}
                  <div className="flex flex-col items-start rounded-2xl border border-border bg-background/50 p-5 lg:items-center lg:border-0 lg:bg-transparent lg:p-0 lg:text-center">
                    <span className="relative flex size-14 items-center justify-center rounded-2xl border border-track/35 bg-track/10">
                      <Icon className="size-6 text-track" aria-hidden />
                      <span className="absolute -right-2 -top-2 rounded-md border border-border-strong bg-surface-raised px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                        {stage.step}
                      </span>
                    </span>
                    <h4 className="mt-4 text-base font-semibold text-foreground">{stage.title}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{stage.summary}</p>
                    <p className="mt-3 font-mono text-[11px] text-secondary-foreground/80">
                      {stage.technologies.join(" · ")}
                    </p>
                    <p className="mt-3 text-xs font-medium text-track">{owners}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </Reveal>
    </Section>
  );
}
