import { cn } from "@/lib/utils";

export function TechBadge({ children, className }: { children: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-border-strong bg-surface px-2 py-1 font-mono text-[11px] leading-none text-secondary-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function TechBadgeList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)} aria-label="Technologies">
      {items.map((t) => (
        <li key={t}>
          <TechBadge>{t}</TechBadge>
        </li>
      ))}
    </ul>
  );
}
