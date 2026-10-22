"use client";

import { useEffect } from "react";

// Fades elements marked with [data-reveal] into view as they scroll in.
export default function Reveal() {
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15 }
    );
    items.forEach((item) => observer.observe(item));
    document.documentElement.classList.add("reveal-ready");
    return () => observer.disconnect();
  }, []);

  return null;
}
