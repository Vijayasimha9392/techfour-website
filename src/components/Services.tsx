import { ArrowRight, User, Users } from "lucide-react";
import { services } from "@/data/services";
import { getDeveloper } from "@/data/team";
import { getTrack } from "@/data/tracks";
import { requestContact } from "@/lib/contact-intent";
import { cn } from "@/lib/utils";
import { Reveal } from "./ui/reveal";
import { Section, SectionHeading } from "./ui/section";

export function Services() {
  return (
    <Section id="services" labelledBy="services-title" className="border-t border-border">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          id="services-title"
          eyebrow="Services"
          title="Technology Solutions for Real-World Challenges"
          description="Engage TechFour as a collaborative team for end-to-end work, or bring in the individual specialist your project needs."
        />
        <Reveal delay={0.1} className="grid shrink-0 gap-3 sm:grid-cols-2 lg:w-[440px]">
          <div className="rounded-2xl border border-border-strong bg-surface p-4">
            <Users className="size-5 text-primary" aria-hidden />
            <p className="mt-3 text-sm font-semibold text-foreground">Hire the team</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              All four collaborate on one project, frontend to deployment.
            </p>
          </div>
          <div className="rounded-2xl border border-border-strong bg-surface p-4">
            <User className="size-5 text-cyan" aria-hidden />
            <p className="mt-3 text-sm font-semibold text-foreground">Hire individually</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Each developer is also available on their own.
            </p>
          </div>
        </Reveal>
      </div>

      <ul className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, i) => {
          const Icon = service.icon;
          const lead = getDeveloper(service.developerIds[0]);
          const track = getTrack(lead.track);
          const owners = service.developerIds.map((id) => getDeveloper(id).name).join(" & ");
          return (
            <li key={service.id} className={cn(track.colorClass, "bg-background")}>
              <Reveal delay={(i % 4) * 0.05} className="h-full">
                <article className="group relative flex h-full flex-col p-6 transition-colors duration-300 hover:bg-surface sm:p-7">
                  <span className="flex size-11 items-center justify-center rounded-xl border border-track/30 bg-track/10 transition-transform duration-300 group-hover:scale-105">
                    <Icon className="size-5 text-track" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-[17px] font-semibold leading-snug text-foreground">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                  <p className="mt-4 font-mono text-[11px] leading-relaxed text-secondary-foreground/80">
                    {service.technologies.join(" · ")}
                  </p>
                  <div className="mt-auto pt-6">
                    <p className="text-xs text-muted-foreground">
                      Led by <span className="font-medium text-track">{owners}</span>
                    </p>
                    <a
                      href="#contact"
                      onClick={(e) => {
                        e.preventDefault();
                        requestContact({ service: service.title });
                      }}
                      className="mt-3 inline-flex items-center gap-1.5 rounded text-sm font-medium text-foreground transition-colors hover:text-track"
                    >
                      Discuss this service
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </a>
                  </div>
                </article>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
