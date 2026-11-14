import { describe, expect, it } from "vitest";
import { projects } from "@/data/projects";
import { team } from "@/data/team";
import { isPlaceholderLink } from "@/lib/links";
import { filterProjects } from "@/components/Projects";

describe("project portfolio", () => {
  it("has 12 entries, three per developer", () => {
    expect(projects).toHaveLength(12);
    for (const dev of team) {
      expect(projects.filter((p) => p.ownerId === dev.id)).toHaveLength(3);
    }
  });

  it("filters by category", () => {
    expect(filterProjects(projects, "all")).toHaveLength(12);
    const devops = filterProjects(projects, "devops");
    expect(devops).toHaveLength(3);
    expect(devops.every((p) => p.ownerId === "manikanta")).toBe(true);
  });
});

describe("placeholder links", () => {
  it("treats the sample URLs as placeholders, so they never render as live links", () => {
    expect(isPlaceholderLink("https://www.linkedin.com/in/your-linkedin-profile/")).toBe(true);
    expect(isPlaceholderLink("https://github.com/your-github-username")).toBe(true);
    expect(isPlaceholderLink("#")).toBe(true);
    expect(isPlaceholderLink("")).toBe(true);
    expect(isPlaceholderLink("your-team-email@example.com")).toBe(true);
    expect(isPlaceholderLink("+91 XXXXX XXXXX")).toBe(true);
  });

  it("treats real URLs as live links", () => {
    expect(isPlaceholderLink("https://github.com/vercel")).toBe(false);
  });
});
