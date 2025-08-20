"use client";

import { useEffect } from "react";

/**
 * Lightweight intersection-observer that toggles `is-visible` on elements
 * with `data-animate`. Supports optional `data-delay` in ms.
 */
export default function AnimateOnView() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-animate]")
    );

    if (prefersReduced) {
      nodes.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            const delayAttr = el.getAttribute("data-delay");
            const delay = delayAttr ? parseInt(delayAttr, 10) : 0;
            if (delay > 0) {
              setTimeout(() => el.classList.add("is-visible"), delay);
            } else {
              el.classList.add("is-visible");
            }
            io.unobserve(el);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );

    nodes.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
