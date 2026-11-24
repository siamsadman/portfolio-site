"use client";

import { useState } from "react";
import PageContainer from "@/components/PageContainer";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { experience, timeline, earlierCareer } from "@/content/experience";

const VISIBLE_BULLETS = 2;

function shortRange(range?: string) {
  // "Jan 2022 – Aug 2026" -> "2022 – 2026"
  return (range ?? "").replace(/[A-Za-z]+\s(\d{4})/g, "$1");
}

export default function Experience() {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const apsis = experience.find((e) => e.id === "apsis");
  // Ladder reads oldest to newest
  const ladder = apsis ? [...apsis.titles].reverse() : [];

  return (
    <section id="experience" className="bg-background py-14 sm:py-16">
      <PageContainer>
        <div className="max-w-[1100px]">
          <SectionHeading
            kicker="Experience"
            title="From requirements to production, for global clients"
          />

          {apsis && (
            <Reveal className="mb-10 rounded-[18px] border border-line bg-card p-7">
              <div className="mb-4 flex flex-wrap justify-between gap-2">
                <div>
                  <h3 className="text-xl font-bold text-heading">{apsis.employer}</h3>
                  {apsis.about && (
                    <p className="mt-0.5 text-sm text-muted">{apsis.about}</p>
                  )}
                </div>
                <p className="text-sm text-muted">
                  {apsis.location} · {apsis.dateRange}
                  {apsis.roleNote ? ` · ${apsis.roleNote}` : ""}
                </p>
              </div>
              <ol className="flex flex-col items-start gap-2 text-sm sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
                {ladder.map((t, i) => (
                  <li key={t.title} className="contents">
                    {i > 0 && (
                      <span aria-hidden="true" className="hidden text-dot sm:inline">
                        →
                      </span>
                    )}
                    <span
                      className={`rounded-lg px-3.5 py-2 ${
                        i === ladder.length - 1
                          ? "bg-accent/15 text-heading"
                          : "bg-elevated text-secondary"
                      }`}
                    >
                      {t.title}
                      <br />
                      <span className="text-muted">{shortRange(t.dateRange)}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </Reveal>
          )}

          <ol className="ml-2 flex flex-col gap-8 border-l-2 border-line pl-9">
            {timeline.map((item) => {
              const isOpen = !!open[item.id];
              const all = [...item.bullets, ...item.more];
              const hiddenCount = Math.max(0, all.length - VISIBLE_BULLETS);
              const bullets = isOpen ? all : all.slice(0, VISIBLE_BULLETS);
              return (
                <Reveal
                  as="li"
                  key={item.id}
                  className="relative rounded-2xl border border-line bg-card p-[26px]"
                >
                  <span
                    aria-hidden="true"
                    className="absolute top-[30px] -left-[47px] h-3.5 w-3.5 rounded-full border-[3px] border-background bg-dot"
                  />
                  <p className="mb-2 font-mono text-xs text-muted">{item.when}</p>
                  <h3 className="mb-0.5 text-xl font-bold text-heading">{item.title}</h3>
                  <p className="mb-4 text-sm text-muted">{item.org}</p>
                  <ul className="flex list-disc flex-col gap-2 pl-5 text-base text-secondary">
                    {bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                  {hiddenCount > 0 && (
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpen((o) => ({ ...o, [item.id]: !o[item.id] }))}
                      className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-accent transition-opacity hover:opacity-80"
                    >
                      {isOpen ? "Show less" : "Show more"}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                        aria-hidden="true"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>
                  )}
                </Reveal>
              );
            })}
          </ol>

          <div className="mt-14">
            <p className="mb-4 font-mono text-xs tracking-[0.12em] text-muted uppercase">
              Earlier career
            </p>
            <ul className="flex flex-col gap-4">
              {earlierCareer.map((role) => (
                <li
                  key={role.id}
                  className="rounded-[18px] border border-line bg-card p-7"
                >
                  <div className="mb-4 flex flex-wrap justify-between gap-2">
                    <div>
                      <h3 className="text-xl font-bold text-heading">{role.employer}</h3>
                      {role.about && (
                        <p className="mt-0.5 text-sm text-muted">{role.about}</p>
                      )}
                    </div>
                    <p className="text-sm text-muted">
                      {role.location} · {role.when}
                    </p>
                  </div>
                  <p className="inline-block rounded-lg bg-elevated px-3.5 py-2 text-sm text-secondary">
                    {role.title}
                  </p>
                  {role.note && (
                    <p className="mt-4 max-w-[760px] text-base text-secondary">
                      {role.note}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
