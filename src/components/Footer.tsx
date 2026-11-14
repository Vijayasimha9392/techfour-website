import type { MouseEvent } from "react";
import { Mail } from "lucide-react";
import { teamContact } from "@/data/contact";
import { navItems, site } from "@/data/site";
import { team } from "@/data/team";
import { isPlaceholderLink } from "@/lib/links";
import { scrollToSection } from "@/lib/contact-intent";
import { Logo } from "./Logo";
import { GithubIcon, LinkedinIcon } from "./ui/social-icons";
import { SmartLink } from "./ui/smart-link";

const go = (id: string) => (e: MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  scrollToSection(id);
};

const linkClass =
  "inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground";

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-surface/60">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {site.footerDescription}
            </p>
            <p className="mt-6 text-sm font-medium text-gradient">{site.footerTagline}</p>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-foreground">
              Navigate
            </h2>
            <ul className="mt-5 space-y-3">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} onClick={go(item.id)} className={linkClass}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-foreground">
              LinkedIn
            </h2>
            <ul className="mt-5 space-y-3">
              {team.map((dev) => (
                <li key={dev.id}>
                  <SmartLink href={dev.links.linkedin} className={linkClass} placeholderHint="LinkedIn link not added yet">
                    <LinkedinIcon className="size-3.5" />
                    {dev.name}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-foreground">
              GitHub
            </h2>
            <ul className="mt-5 space-y-3">
              {team.map((dev) => (
                <li key={dev.id}>
                  <SmartLink href={dev.links.github} className={linkClass} placeholderHint="GitHub link not added yet">
                    <GithubIcon className="size-3.5" />
                    {dev.name}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          {isPlaceholderLink(teamContact.email) ? (
            <span className="inline-flex items-center gap-2" title="Team email not added yet">
              <Mail className="size-3.5" aria-hidden /> {teamContact.email}
            </span>
          ) : (
            <a href={`mailto:${teamContact.email}`} className={linkClass}>
              <Mail className="size-3.5" aria-hidden /> {teamContact.email}
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
