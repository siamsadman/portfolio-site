"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Extra delay in ms, used to stagger items in a grid. */
  delay?: number;
  /** Element to render, so lists keep valid markup (e.g. as="li"). */
  as?: ElementType;
};

/**
 * Fades and lifts its content in once, when it scrolls into view.
 *
 * Content is fully visible in the server-rendered HTML. Only after the page has
 * loaded does this hide an element that is still below the fold, then reveal it
 * on scroll. Elements already on screen, and visitors who prefer reduced motion,
 * are left alone. The styles are in globals.css under [data-reveal].
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || el.dataset.reveal === "shown") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    el.dataset.reveal = "hidden";
    el.style.transitionDelay = `${delay}ms`;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.reveal = "shown";
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
