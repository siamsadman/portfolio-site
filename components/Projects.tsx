"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PageContainer from "@/components/PageContainer";
import { projects, type Project, type ProjectCategory } from "@/content/projects";

// Order shown on the homepage (the first four are visible before "See all")
const homeOrder = [
  "olist-sales",
  "bts-fabric-pipeline",
  "opensky-fabric-rti",
  "grid-shift",
  "olist-logistics",
  "olist-customer-satisfaction",
  "olist-dbt-databricks",
];

const ordered: Project[] = homeOrder
  .map((slug) => projects.find((p) => p.slug === slug))
  .filter((p): p is Project => Boolean(p));

const filters: { id: "all" | ProjectCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "bi", label: "Power BI" },
  { id: "fabric", label: "Microsoft Fabric" },
  { id: "de", label: "Data engineering" },
];

const INITIAL_COUNT = 4;

export default function Projects() {
  const [filter, setFilter] = useState<"all" | ProjectCategory>("all");
  const [showAll, setShowAll] = useState(false);

  const filtered = ordered.filter((p) => filter === "all" || p.category === filter);
  const visible = showAll ? filtered : filtered.slice(0, INITIAL_COUNT);
  const canExpand = filtered.length > INITIAL_COUNT;

  return (
    <section id="projects" className="bg-background pt-[72px] pb-14">
      <PageContainer>
        <p className="mb-3 font-mono text-xs tracking-[0.12em] text-muted uppercase">
          Projects
        </p>
        <h2 className="mb-3 text-[clamp(1.5rem,2.8vw,2rem)] font-bold tracking-tight text-heading">
          Dashboards, pipelines and what they proved
        </h2>
        <p className="mb-7 max-w-[680px] text-[clamp(1rem,1.4vw,1.125rem)] text-muted">
          Selected builds across Power BI, Microsoft Fabric and dbt on Databricks.
          Each has a write-up that says what failed, not just what shipped.
        </p>

        <div className="mb-8 flex flex-wrap gap-2.5" role="group" aria-label="Filter projects">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => {
                setFilter(f.id);
                setShowAll(false);
              }}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                filter === f.id
                  ? "border-accent bg-accent text-on-accent"
                  : "border-border text-secondary hover:border-accent hover:text-accent"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {visible.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group flex flex-col overflow-hidden rounded-[18px] border border-line bg-card transition-colors hover:border-accent"
            >
              <div className="relative h-[190px] overflow-hidden sm:h-[220px] bg-elevated">
                {project.cardImage.darkSrc ? (
                  <>
                    <Image
                      src={project.cardImage.src}
                      alt={project.cardImage.alt}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover object-top dark:hidden"
                    />
                    <Image
                      src={project.cardImage.darkSrc}
                      alt=""
                      aria-hidden="true"
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="hidden object-cover object-top dark:block"
                    />
                  </>
                ) : (
                  <Image
                    src={project.cardImage.src}
                    alt={project.cardImage.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                )}
                <span className="absolute bottom-3 left-3 rounded-md bg-elevated px-2.5 py-1 font-mono text-xs font-medium text-secondary">
                  {project.kind}
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-3 p-6">
                <h3 className="text-xl leading-tight font-bold text-heading">
                  {project.cardTitle}
                </h3>
                <p className="flex-1 text-sm text-muted">{project.cardText}</p>
                <p className="text-sm font-semibold text-accent">{project.outcome}</p>
                <ul className="flex flex-wrap gap-2">
                  {project.cardTags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-md bg-elevated px-2.5 py-1 text-xs text-secondary"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
                <p className="text-sm font-semibold text-heading group-hover:text-accent">
                  View project →
                </p>
              </div>
            </Link>
          ))}
        </div>

        {canExpand && (
          <div className="mt-7 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="min-h-11 rounded-[10px] border border-border px-6 py-3 text-[0.9375rem] font-semibold text-secondary transition-colors hover:border-accent hover:text-accent"
            >
              {showAll ? "Show fewer projects" : `See all ${filtered.length} projects`}
            </button>
          </div>
        )}
      </PageContainer>
    </section>
  );
}
