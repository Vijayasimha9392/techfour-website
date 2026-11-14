import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, FilePenLine, Star } from "lucide-react";
import { projects } from "@/data/projects";
import { getDeveloper } from "@/data/team";
import { getTrack, tracks } from "@/data/tracks";
import { isPlaceholderLink } from "@/lib/links";
import { cn } from "@/lib/utils";
import type { Project, TrackId } from "@/types";
import { ProjectThumb } from "./ProjectThumb";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Section, SectionHeading } from "./ui/section";
import { GithubIcon } from "./ui/social-icons";
import { SmartLink } from "./ui/smart-link";
import { TechBadgeList } from "./ui/tech-badge";

type Filter = "all" | TrackId;

export function filterProjects(list: Project[], filter: Filter) {
  const filtered = filter === "all" ? list : list.filter((p) => p.track === filter);
  // Featured real projects first, placeholders last.
  return [...filtered].sort(
    (a, b) =>
      Number(a.isPlaceholder) - Number(b.isPlaceholder) || Number(b.featured) - Number(a.featured),
  );
}

function PlaceholderTag() {
  return (
    <span className="inline-flex items-center gap-1 rounded-md border border-dashed border-warning/50 bg-background/80 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-warning backdrop-blur">
      <FilePenLine className="size-3" aria-hidden />
      Placeholder
    </span>
  );
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const track = getTrack(project.track);
  const owner = getDeveloper(project.ownerId);
  return (
    <article
      className={cn(
        track.colorClass,
        "group surface-card relative flex h-full flex-col overflow-hidden rounded-2xl transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-track/40",
        project.isPlaceholder && "border-dashed",
      )}
    >
      <div className="relative">
        <ProjectThumb project={project} />
        <div className="absolute left-3 top-3 flex gap-2">
          {project.isPlaceholder && <PlaceholderTag />}
          {project.featured && (
            <span className="inline-flex items-center gap-1 rounded-md bg-background/80 px-2 py-1 text-[10px] font-medium text-warning backdrop-blur">
              <Star className="size-3 fill-current" aria-hidden /> Featured
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-track">
          {track.categoryLabel}
        </p>
        <h3
          className={cn(
            "mt-2 text-lg font-semibold tracking-tight",
            project.isPlaceholder ? "text-muted-foreground" : "text-foreground",
          )}
        >
          {project.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
        <p className="mt-4 text-xs text-muted-foreground">
          Owner: <span className="text-secondary-foreground">{owner.name}</span>
        </p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          {project.technologies.length > 0 ? (
            <p className="truncate font-mono text-[11px] text-secondary-foreground/80">
              {project.technologies.slice(0, 3).join(" · ")}
            </p>
          ) : (
            <p className="font-mono text-[11px] italic text-muted-foreground">Add technologies</p>
          )}
          <Button variant="outline" size="sm" onClick={onOpen} className="shrink-0">
            Details
            <span className="sr-only"> for {project.title} by {owner.name}</span>
          </Button>
        </div>
      </div>
    </article>
  );
}

function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const track = project ? getTrack(project.track) : null;
  const owner = project ? getDeveloper(project.ownerId) : null;
  return (
    <Dialog open={!!project} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto rounded-2xl border-border-strong bg-popover p-0">
        {project && track && owner && (
          <div className={track.colorClass}>
            <ProjectThumb project={project} className="rounded-t-2xl" />
            <div className="p-6 sm:p-8">
              <DialogHeader className="text-left">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-track">
                    {track.categoryLabel}
                  </span>
                  {project.isPlaceholder && <PlaceholderTag />}
                </div>
                <DialogTitle className="mt-2 text-2xl font-semibold tracking-tight">
                  {project.title}
                </DialogTitle>
                <DialogDescription className="text-[15px] leading-relaxed">
                  {project.description}
                </DialogDescription>
              </DialogHeader>

              {project.isPlaceholder && (
                <p className="mt-5 rounded-xl border border-dashed border-warning/40 bg-warning/5 p-4 text-sm leading-relaxed text-secondary-foreground">
                  This is an editable placeholder, not a completed project. {owner.firstName} will
                  replace it with real project information.
                </p>
              )}

              <dl className="mt-6 grid gap-5 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-xs text-muted-foreground">Owner</dt>
                  <dd className="mt-1 font-medium text-foreground">
                    {owner.name}
                    <span className="block text-xs font-normal text-track">{owner.role}</span>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Technologies</dt>
                  <dd className="mt-2">
                    {project.technologies.length > 0 ? (
                      <TechBadgeList items={project.technologies} />
                    ) : (
                      <span className="italic text-muted-foreground">Add technologies</span>
                    )}
                  </dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-xs text-muted-foreground">Project details</dt>
                  <dd className="mt-1 leading-relaxed text-secondary-foreground">
                    {project.details}
                  </dd>
                </div>
              </dl>

              <div className="mt-8 flex flex-wrap gap-3">
                <SmartLink
                  href={project.repoUrl}
                  label="View source on GitHub"
                  placeholderHint="Add GitHub URL"
                  className="inline-flex h-10 items-center gap-2 rounded-lg border border-border-strong px-4 text-sm font-medium text-foreground transition-colors hover:border-track/50"
                >
                  <GithubIcon className="size-4" />
                  {isPlaceholderLink(project.repoUrl) ? "Repository: Add GitHub URL" : "Repository"}
                </SmartLink>
                <SmartLink
                  href={project.demoUrl}
                  label="Open live demo"
                  placeholderHint="Add live deployment URL"
                  className="inline-flex h-10 items-center gap-2 rounded-lg border border-border-strong px-4 text-sm font-medium text-foreground transition-colors hover:border-track/50"
                >
                  <ArrowUpRight className="size-4" />
                  {isPlaceholderLink(project.demoUrl) ? "Demo: Add live deployment URL" : "Live demo"}
                </SmartLink>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<Project | null>(null);
  const visible = useMemo(() => filterProjects(projects, filter), [filter]);
  const placeholderCount = projects.filter((p) => p.isPlaceholder).length;

  const filters: Array<{ id: Filter; label: string }> = [
    { id: "all", label: "All Projects" },
    ...tracks.map((t) => ({ id: t.id, label: t.filterLabel })),
  ];

  return (
    <Section id="projects" labelledBy="projects-title" className="border-t border-border">
      <SectionHeading
        id="projects-title"
        eyebrow="Projects"
        title="Our Work Speaks Through Our Projects"
        description="Explore the projects developed by our team through academic work, personal development, and practical software engineering initiatives."
      />

      {/* {placeholderCount > 0 && (
        <p className="mt-6 inline-flex items-center gap-2 rounded-lg border border-dashed border-warning/40 bg-warning/5 px-3 py-2 text-xs text-secondary-foreground">
          <FilePenLine className="size-3.5 text-warning" aria-hidden />
          {placeholderCount} of {projects.length} entries are placeholders awaiting real project
          details.
        </p>
      )} */}

      <div
        role="group"
        aria-label="Filter projects by category"
        className="mt-10 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]"
      >
        {filters.map((f) => {
          const count =
            f.id === "all" ? projects.length : projects.filter((p) => p.track === f.id).length;
          const isActive = filter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => setFilter(f.id)}
              className={cn(
                "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors",
                isActive
                  ? "border-primary/50 bg-primary/15 text-foreground"
                  : "border-border-strong text-muted-foreground hover:border-primary/30 hover:text-foreground",
              )}
            >
              {f.label}
              <span
                className={cn(
                  "rounded-full px-1.5 font-mono text-[10px]",
                  isActive ? "bg-primary/25 text-foreground" : "bg-muted text-muted-foreground",
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} projects
      </p>

      <motion.ul layout className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project) => (
            <motion.li
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <ProjectCard project={project} onOpen={() => setSelected(project)} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <ProjectDialog project={selected} onClose={() => setSelected(null)} />
    </Section>
  );
}
