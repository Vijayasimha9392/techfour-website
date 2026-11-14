export const site = {
  name: "TechFour",
  tagline: "Four Specialized Developers. One Collaborative Team. Ready to Build Your Next Big Idea.",
  footerTagline: "Building Ideas. Engineering Solutions. Creating Impact.",
  description:
    "TechFour is a collaborative team of four software developers — Java Full Stack & AI, .NET, AI + Data Engineering and DevOps — available for freelance projects and individual full-time roles.",
  footerDescription:
    "A collaborative team of four developers with complementary skills across full-stack, .NET, AI + Data Engineering and DevOps — available as a team or individually.",
};

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "team", label: "Team" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "careers", label: "Careers" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof navItems)[number]["id"];
