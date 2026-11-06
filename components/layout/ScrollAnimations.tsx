"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const TARGETS = ".text-center, .grid > *, .space-y-3 > *";

/**
 * Fades page sections in on scroll. Content is only hidden once this runs, so the
 * site stays fully readable without JavaScript and anything on screen never flickers.
 */
export default function ScrollAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver((entries) => {
      for (const { isIntersecting, target } of entries) {
        if (!isIntersecting) continue;
        observer.unobserve(target);
        target.classList.add("is-visible");
        // Hand transitions back to the element so its hover effects keep working.
        setTimeout(() => {
          target.classList.remove("reveal", "is-visible");
          (target as HTMLElement).style.removeProperty("transition-delay");
        }, 1300);
      }
    }, { rootMargin: "0px 0px -8% 0px" });

    const sections = document.querySelectorAll("main > section:not(:first-of-type)");
    sections.forEach((section) => {
      const found = [...section.querySelectorAll<HTMLElement>(TARGETS)].filter((el) => !el.closest("form"));
      const targets = found.filter((el) => !found.some((other) => other !== el && other.contains(el)));
      targets.forEach((el) => {
        if (el.getBoundingClientRect().top < innerHeight) return;
        const position = el.parentElement ? [...el.parentElement.children].indexOf(el) : 0;
        el.style.transitionDelay = `${(position % 5) * 90}ms`;
        el.classList.add("reveal");
        observer.observe(el);
      });
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
