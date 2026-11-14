import React, { useEffect, useState } from "react";
import { useParams } from "@tanstack/react-router";
import { getDeveloper } from "@/data/team";
import type { Developer } from "@/types";
import { DeveloperAvatar } from "./DeveloperAvatar";
import { Button } from "./ui/button";
import { Section, SectionHeading } from "./ui/section";
import { SocialIconLinks } from "./ui/smart-link";
import { TechBadgeList } from "./ui/tech-badge";

export function DeveloperDetails() {
  const { id } = useParams({ from: "/developers/$id" });
  const [developer, setDeveloper] = useState<Developer | null>(null);
  const [resumeUrl, setResumeUrl] = useState<string>("");

  useEffect(() => {
    if (id) {
      const dev = getDeveloper(id);
      setDeveloper(dev);
      // Combine the base path with the relative resume path
      const basePath = import.meta.env.BASE_URL || "/";
      setResumeUrl(dev.resume ? `${basePath}${dev.resume.replace(/^\/+/, "")}` : "");
    }
  }, [id]);

  if (!developer) {
    return <div>Loading...</div>;
  }

  return (
    <Section id="developer-details" labelledBy="developer-title" className="border-t border-border">
      <SectionHeading
        id="developer-title"
        eyebrow={developer.role}
        title={developer.name}
        description={developer.intro}
      />
      <div className="mt-14 grid gap-8 lg:grid-cols-2">
        <div>
          <DeveloperAvatar dev={developer} className="size-70" />
          <div className="mt-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Specialization
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              {developer.specialization}
            </p>
          </div>
          <TechBadgeList items={developer.technologies} className="mt-6" />
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
            <SocialIconLinks links={developer.links} name={developer.name} />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Resume</h2>
          {resumeUrl && (
            <div className="mt-4">
              {/* Use the full path for the embed */}
              <embed
                src={resumeUrl}
                type="application/pdf"
                width="100%"
                height="600px"
              />
              <Button asChild variant="outline" className="mt-4">
                <a href={resumeUrl} download>
                  Download Resume
                </a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}