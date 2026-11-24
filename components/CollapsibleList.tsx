"use client";

import { Children, useState, type ReactNode } from "react";

// Shows the first `limit` items and puts the rest under "Show more".
// Lists at or under `limit + 1` items render in full: hiding a single
// item behind a button is not worth the click.
export default function CollapsibleList({
  children,
  limit = 4,
}: {
  children: ReactNode;
  limit?: number;
}) {
  const [open, setOpen] = useState(false);
  const items = Children.toArray(children);
  const collapsible = items.length > limit + 1;
  const shown = collapsible && !open ? items.slice(0, limit) : items;

  return (
    <div>
      <ul className="max-w-3xl list-disc space-y-2 pl-5 text-base leading-relaxed text-secondary">
        {shown}
      </ul>
      {collapsible && (
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-accent transition-opacity hover:opacity-80"
        >
          {open ? "Show less" : "Show more"}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      )}
    </div>
  );
}
