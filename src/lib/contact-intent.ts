/**
 * Lets any CTA on the page jump to the contact form and pre-fill it
 * (e.g. "Hire Shekar" selects Shekar D as the developer preference).
 */
export interface ContactIntent {
  inquiryType?: string;
  developerPreference?: string;
  service?: string;
}

const EVENT = "techfour:contact-intent";

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  history.replaceState(null, "", `#${id}`);
}

export function requestContact(intent: ContactIntent = {}) {
  window.dispatchEvent(new CustomEvent<ContactIntent>(EVENT, { detail: intent }));
  scrollToSection("contact");
}

export function onContactIntent(cb: (intent: ContactIntent) => void) {
  const handler = (e: Event) => cb((e as CustomEvent<ContactIntent>).detail ?? {});
  window.addEventListener(EVENT, handler);
  return () => window.removeEventListener(EVENT, handler);
}
