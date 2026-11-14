/**
 * Returns true for empty values and the sample placeholders used in src/data
 * ("#", "your-…", "example.com", "XXXXX"). Placeholder links are rendered as
 * "not added yet" instead of clickable links so the site never ships broken links.
 */
export function isPlaceholderLink(value?: string | null): boolean {
  if (!value) return true;
  const v = value.trim();
  if (v === "" || v === "#") return true;
  return /your-|example\.com|X{3,}/i.test(v);
}

/** Secure attributes for links that open a new tab. */
export const externalLinkProps = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;
