"use client";

import { useState } from "react";
import PageContainer from "@/components/PageContainer";
import { experience, timeline, earlierCareer } from "@/content/experience";

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
    <section id="experience" className="bg-background pt-[72px] pb-14">
      <PageContainer>
        <div className="max-w-[1100px]">
          <p className="mb-3 font-mono text-xs tracking-[0.12em] text-muted uppercase">
            Experience
          </p>
          <h2 className="mb-7 text-[clamp(1.5rem,2.8vw,2rem)] font-bold tracking-tight text-heading">
            From requirements to production, for global clients
          </h2>

          {apsis && (
            <div className="mb-10 rounded-[18px] border border-line bg-card p-7">
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
              <ol className="flex flex-wrap items-center gap-3 text-sm">
                {ladder.map((t, i) => (
                  <li key={t.title} className="contents">
                    {i > 0 && (
                      <span aria-hidden="true" className="text-dot">
                        →
                      </span>
                    )}
                    <span
                      className={`rounded-lg border px-3.5 py-2 ${
                        i === ladder.length - 1
                          ? "border-accent text-heading"
                          : "border-border text-secondary"
                      }`}
                    >
                      {t.title}
                      <br />
                      <span className="text-muted">{shortRange(t.dateRange)}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          <ol className="ml-2 flex flex-col gap-8 border-l-2 border-line pl-9">
            {timeline.map((item) => {
              const isOpen = !!open[item.id];
              const bullets = isOpen ? [...item.bullets, ...item.more] : item.bullets;
              return (
                <li
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
                  <ul className="flex list-disc flex-col gap-2 pl-5 text-[0.9375rem] text-secondary">
                    {bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                  {item.more.length > 0 && (
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpen((o) => ({ ...o, [item.id]: !o[item.id] }))}
                      className="mt-4 rounded-lg border border-border px-4 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-accent"
                    >
                      {isOpen ? "Show less" : `Show ${item.more.length} more`}
                    </button>
                  )}
                </li>
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
                  <p className="inline-block rounded-lg border border-border px-3.5 py-2 text-sm text-secondary">
                    {role.title}
                  </p>
                  {role.note && (
                    <p className="mt-4 max-w-[760px] text-[0.9375rem] text-secondary">
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
