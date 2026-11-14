import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { site } from "@/data/site";

const About = lazy(() => import("@/components/About").then((m) => ({ default: m.About })));
const Team = lazy(() => import("@/components/Team").then((m) => ({ default: m.Team })));
const Services = lazy(() => import("@/components/Services").then((m) => ({ default: m.Services })));
const Projects = lazy(() => import("@/components/Projects").then((m) => ({ default: m.Projects })));
const Careers = lazy(() => import("@/components/Careers").then((m) => ({ default: m.Careers })));
const Contact = lazy(() => import("@/components/Contact").then((m) => ({ default: m.Contact })));
const Footer = lazy(() => import("@/components/Footer").then((m) => ({ default: m.Footer })));
const FloatingContact = lazy(() => import("@/components/FloatingContact").then((m) => ({ default: m.FloatingContact })));

const title = "TechFour — Four Specialized Developers. One Collaborative Team.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: site.description },
      { property: "og:title", content: title },
      { property: "og:description", content: site.description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: site.description },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <Suspense fallback={<div className="py-24 text-center text-muted-foreground">Loading...</div>}>
          <About />
          <Team />
          <Services />
          <Projects />
          <Careers />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
        <FloatingContact />
      </Suspense>
    </>
  );
}
