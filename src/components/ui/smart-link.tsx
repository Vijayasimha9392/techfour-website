import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { externalLinkProps, isPlaceholderLink } from "@/lib/links";
import { socialIcon } from "./social-icons";
import type { SocialLinks } from "@/types";

/**
 * Renders an external link, or a muted "not added yet" chip when the URL is
 * still a placeholder — so editable sample links never become broken links.
 */
export function SmartLink({
  href,
  children,
  className,
  placeholderClassName,
  placeholderHint = "Link not added yet",
  label,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  placeholderClassName?: string;
  placeholderHint?: string;
  label?: string;
}) {
  if (isPlaceholderLink(href)) {
    return (
      <span
        className={cn(className, "cursor-not-allowed opacity-50", placeholderClassName)}
        title={placeholderHint}
        aria-disabled="true"
      >
        {children}
        <span className="sr-only">
          {label ? `${label}: ` : ""}
          {placeholderHint}
        </span>
      </span>
    );
  }
  return (
    <a href={href} {...externalLinkProps} className={className} aria-label={label}>
      {children}
    </a>
  );
}

const socialLabels: Record<keyof SocialLinks, string> = {
  linkedin: "LinkedIn",
  github: "GitHub",
  portfolio: "Portfolio",
};

export function SocialIconLinks({
  links,
  name,
  include = ["linkedin", "github", "portfolio"],
  className,
}: {
  links: SocialLinks;
  name: string;
  include?: Array<keyof SocialLinks>;
  className?: string;
}) {
  return (
    <ul className={cn("flex items-center gap-1.5", className)}>
      {include.map((key) => {
        const Icon = socialIcon[key];
        return (
          <li key={key}>
            <SmartLink
              href={links[key]}
              label={`${name} on ${socialLabels[key]}`}
              placeholderHint={`${socialLabels[key]} link not added yet`}
              className="inline-flex size-9 items-center justify-center rounded-lg border border-border-strong bg-surface text-muted-foreground transition-colors hover:border-track/50 hover:text-foreground"
            >
              <Icon className="size-4" />
            </SmartLink>
          </li>
        );
      })}
    </ul>
  );
}
