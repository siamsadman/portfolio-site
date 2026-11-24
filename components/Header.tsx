"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";
import PageContainer from "@/components/PageContainer";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "credentials", label: "Certifications" },
];

const cvHref = "/Siam_Sadman_BI_Developer.pdf";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  // Scroll-spy: highlight the section nearest the top of the viewport (home page only)
  useEffect(() => {
    if (!isHome) return;
    function onScroll() {
      // The section whose top is closest to (but not below) the header line wins,
      // regardless of the order of the nav links.
      let current = "";
      let best = -Infinity;
      for (const link of links) {
        const el = document.getElementById(link.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= 120 && top > best) {
          best = top;
          current = link.id;
        }
      }
      setActive(current);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  // Close the phone menu on Escape
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const linkClass = (id: string) =>
    `text-sm font-medium transition-colors hover:text-accent ${
      active === id ? "text-accent" : "text-muted"
    }`;

  const outlineBtn =
    "items-center justify-center rounded-[10px] border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent";
  const filledBtn =
    "items-center justify-center rounded-[10px] bg-accent px-4 py-2 text-sm font-semibold text-on-accent transition-opacity hover:opacity-90";

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/85 backdrop-blur-md">
      <PageContainer>
        <div className="flex h-16 items-center justify-between gap-4">
          <a
            href="/#top"
            className="font-display inline-flex items-center gap-2.5 text-xl font-bold text-heading"
          >
            <Logo className="h-9 w-9 flex-none" />
            Siam Sadman
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {links.map((link) => (
              <a
                key={link.id}
                href={`/#${link.id}`}
                className={linkClass(link.id)}
                aria-current={active === link.id ? "true" : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              href={cvHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`${outlineBtn} hidden lg:inline-flex`}
            >
              Download CV
            </a>
            <a href="/#contact" className={`${filledBtn} hidden lg:inline-flex`}>
              Get in touch
            </a>

            {/* Phone menu button */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="flex h-11 w-11 items-center justify-center rounded-[10px] border border-line text-secondary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:border-accent active:bg-elevated active:text-accent lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="h-5 w-5"
                aria-hidden="true"
              >
                {open ? (
                  <path d="M6 6l12 12M18 6L6 18" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </PageContainer>

      {/* Phone menu panel */}
      {open && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full border-b border-line bg-background/95 shadow-xl shadow-black/20 backdrop-blur-md lg:hidden"
        >
          <PageContainer className="flex flex-col gap-1 py-4">
            {links.map((link) => (
              <a
                key={link.id}
                href={`/#${link.id}`}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-secondary transition-colors active:bg-elevated active:text-accent">
                {link.label}
              </a>
            ))}
            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <a
                href={cvHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className={`${outlineBtn} flex flex-1 py-3`}
              >
                Download CV
              </a>
              <a
                href="/#contact"
                onClick={() => setOpen(false)}
                className={`${filledBtn} flex flex-1 py-3`}
              >
                Get in touch
              </a>
            </div>
          </PageContainer>
        </div>
      )}
    </header>
  );
}
