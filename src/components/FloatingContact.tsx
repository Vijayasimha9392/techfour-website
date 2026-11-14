import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { requestContact } from "@/lib/contact-intent";

/** Appears after the hero and hides while the contact section is on screen. */
export function FloatingContact() {
  const [pastHero, setPastHero] = useState(false);
  const [atContact, setAtContact] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const contact = document.getElementById("contact");
    const footer = document.querySelector("footer");
    const observer = new IntersectionObserver(
      (entries) => setAtContact(entries.some((e) => e.isIntersecting)),
      { threshold: 0.05 },
    );
    if (contact) observer.observe(contact);
    if (footer) observer.observe(footer);
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const show = pastHero && !atContact;

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            requestContact({});
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-5 right-5 z-30 inline-flex h-12 items-center gap-2 rounded-full bg-gradient-brand px-5 text-sm font-semibold text-primary-foreground shadow-glow sm:bottom-8 sm:right-8"
        >
          <MessageSquare className="size-4" aria-hidden />
          Let's talk
        </motion.a>
      )}
    </AnimatePresence>
  );
}
