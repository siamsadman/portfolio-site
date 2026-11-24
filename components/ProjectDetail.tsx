import Image from "next/image";
import Link from "next/link";
import PageContainer from "@/components/PageContainer";
import CollapsibleList from "@/components/CollapsibleList";
import SectionHeading from "@/components/SectionHeading";
import ZoomFigure from "@/components/ZoomFigure";
import { ArrowUpRightIcon, BookIcon, GithubIcon } from "@/components/Icons";
import {
  projectOrder,
  projects,
  type Project,
  type ProjectSection,
} from "@/content/projects";

function hasContent(section: ProjectSection): boolean {
  if (section.type === "prose") return section.paragraphs.length > 0;
  if (section.type === "list") return section.items.length > 0;
  return section.images.length > 0;
}

// Minimal inline formatting for content strings: **bold** lead-ins and
// `code` spans for table/field names, as used verbatim in project READMEs.
function renderInline(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g);
  return parts.map((part, index) => {
    if (part.length > 4 && part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{renderInline(part.slice(2, -2))}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={index} className="rounded bg-code px-1 py-0.5 text-[0.9em]">
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.length > 2 && part.startsWith("*") && part.endsWith("*")) {
      return <em key={index}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="flex max-w-3xl flex-col gap-4">
      {items.map((paragraph) => (
        <p key={paragraph} className="text-base leading-relaxed text-secondary">
          {renderInline(paragraph)}
        </p>
      ))}
    </div>
  );
}

const blockClass = "py-10 sm:py-12";

function SectionBlock({ section }: { section: ProjectSection }) {
  const kicker = section.kicker ?? "Details";

  if (section.type === "gallery") {
    return (
      <div className={blockClass}>
        <SectionHeading kicker={kicker} title={section.heading} />
        <div className="flex flex-col gap-8">
          {section.images.map((image) => (
            <ZoomFigure key={image.src} image={image} />
          ))}
        </div>
        {section.paragraphs && section.paragraphs.length > 0 && (
          <div className="mt-6">
            <Paragraphs items={section.paragraphs} />
          </div>
        )}
      </div>
    );
  }

  if (section.type === "prose") {
    return (
      <div className={blockClass}>
        <SectionHeading kicker={kicker} title={section.heading} />
        <Paragraphs items={section.paragraphs} />
      </div>
    );
  }

  return (
    <div className={blockClass}>
      <SectionHeading kicker={kicker} title={section.heading} />
      {section.intro && (
        <div className="mb-6">
          <Paragraphs items={section.intro.split("\n\n")} />
        </div>
      )}
      <CollapsibleList>
        {section.items.map((listItem) => (
          <li key={listItem}>{renderInline(listItem)}</li>
        ))}
      </CollapsibleList>
      {section.images && section.images.length > 0 && (
        <div
          className={`mt-8 grid grid-cols-1 gap-x-10 gap-y-10 ${
            section.images.length > 1 ? "sm:grid-cols-2" : ""
          }`}
        >
          {section.images.map((image) => (
            <ZoomFigure key={image.src} image={image} />
          ))}
        </div>
      )}
    </div>
  );
}

function Neighbour({
  project,
  direction,
}: {
  project: Project;
  direction: "prev" | "next";
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`flex-[1_1_280px] rounded-2xl border border-line bg-card p-5 transition-colors hover:border-accent ${
        direction === "next" ? "sm:text-right" : ""
      }`}
    >
      <div className="mb-1.5 text-sm text-muted">
        {direction === "prev" ? "← Previous" : "Next →"}
      </div>
      <div className="font-display text-base font-bold text-heading">
        {project.cardTitle}
      </div>
    </Link>
  );
}

export default function ProjectDetail({ project }: { project: Project }) {
  const sections = (project.sections ?? []).filter(hasContent);

  const built = projectOrder
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is Project => Boolean(p && p.sections && p.sections.length));
  const index = built.findIndex((p) => p.slug === project.slug);
  const prev = index > 0 ? built[index - 1] : undefined;
  const next = index >= 0 && index < built.length - 1 ? built[index + 1] : undefined;

  return (
    <PageContainer className="py-12 sm:py-16">
      <div className="mx-auto max-w-[980px]">
        <Link
          href="/#projects"
          className="inline-flex min-h-11 items-center text-sm font-medium text-accent hover:underline"
        >
          ← All projects
        </Link>

        {/* Header */}
        <header className="pt-6 pb-4">
          <p className="mb-4 font-mono text-xs tracking-[0.12em] text-muted uppercase">
            {project.eyebrow ?? project.kind}
          </p>
          <h1 className="mb-5 text-[clamp(2rem,4.6vw,3rem)] leading-[1.1] font-bold tracking-tight text-heading">
            {project.title}
          </h1>
          <p className="mb-7 max-w-[760px] text-base text-secondary sm:text-lg">
            {project.summary}
          </p>
          <ul className="mb-7 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-md bg-elevated px-2.5 py-1 text-xs text-secondary"
              >
                {tag}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3 text-sm">
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-[10px] bg-accent px-6 py-3 font-semibold text-on-accent transition-opacity hover:opacity-90"
            >
              <GithubIcon />
              View on GitHub
              <ArrowUpRightIcon />
            </a>
            {project.docsUrl && (
              <a
                href={project.docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-[10px] border border-border px-6 py-3 text-secondary transition-colors hover:border-accent hover:text-accent"
              >
                <BookIcon />
                Live docs
                <ArrowUpRightIcon />
              </a>
            )}
            {project.screens && (
              <a
                href="#screens"
                className="inline-flex min-h-11 items-center rounded-[10px] border border-border px-6 py-3 text-secondary transition-colors hover:border-accent hover:text-accent"
              >
                Report screenshots ↓
              </a>
            )}
          </div>
          {project.pages && project.pages.length > 0 && (
            <p className="mt-6 text-sm text-muted">
              {project.pagesLabel ?? "Report pages"}: {project.pages.join(" · ")}
            </p>
          )}
        </header>

        {/* Key numbers */}
        {project.numbers && (
          <div className="grid grid-cols-1 gap-4 py-6 sm:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
            {project.numbers.map((n) => (
              <div
                key={n.label}
                className="rounded-[14px] border border-line bg-card p-5"
              >
                <div className="font-display text-[clamp(1.375rem,2.4vw,1.75rem)] leading-tight font-bold text-accent">
                  {n.big}
                </div>
                <div className="mt-1.5 text-sm text-muted">{n.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Architecture: layer cards with animated connectors */}
        {project.layers && (
          <div className={blockClass}>
            <SectionHeading
              kicker="Architecture"
              title={project.archHeading ?? "How it is built"}
            />
            <div className="mb-5 grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_36px_minmax(0,1fr)_36px_minmax(0,1fr)] md:gap-2">
              {project.layers.map((layer, i) => (
                <div key={layer.label} className="contents">
                  {i > 0 && (
                    <div
                      aria-hidden="true"
                      className="relative hidden h-0.5 self-center bg-line md:block"
                    >
                      <span
                        className="fl-dot"
                        style={{ animationDelay: `${i - 1}s` }}
                      />
                    </div>
                  )}
                  <div
                    className={`flex flex-col gap-2.5 rounded-2xl border bg-card p-6 md:min-h-[230px] ${
                      layer.highlight ? "border-accent" : "border-line"
                    }`}
                  >
                    <div className="font-mono text-xs tracking-[0.12em] text-muted">
                      {layer.label}
                    </div>
                    <h3 className="text-xl leading-tight font-bold text-heading">
                      {layer.title}
                    </h3>
                    <p className="flex-1 text-sm text-secondary">{layer.text}</p>
                    <p className="border-t border-line pt-3 text-sm text-muted">
                      <span className="font-semibold text-accent">Gate: </span>
                      {layer.gate}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {project.archNote && (
              <p className="max-w-[760px] text-base text-secondary">
                {project.archNote}
              </p>
            )}
            {project.diagrams && project.diagrams.length > 0 && (
              <div className="mt-8 grid grid-cols-1 items-start gap-6 sm:grid-cols-2">
                {project.diagrams.map((image) => (
                  <ZoomFigure key={image.src} image={image} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Findings */}
        {project.findings && (
          <div className={blockClass}>
            <SectionHeading
              kicker="What I found"
              title={project.findingsHeading ?? "What validation found"}
            />
            <div className="flex flex-col gap-4">
              {project.findings.map((f) => (
                <div
                  key={f.title}
                  className="flex flex-wrap items-start gap-x-7 gap-y-3 rounded-2xl border border-line bg-card p-6"
                >
                  <div className="font-display text-[1.375rem] leading-tight font-bold text-accent sm:flex-[0_0_190px]">
                    {f.big}
                  </div>
                  <div className="flex-[1_1_320px]">
                    <h3 className="mb-1.5 text-base font-semibold text-heading">
                      {f.title}
                    </h3>
                    <p className="text-base text-secondary">{f.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {sections.map((section) => (
          <SectionBlock key={section.heading} section={section} />
        ))}

        {/* Screens */}
        {project.screens && (
          <div id="screens" className={`${blockClass} scroll-mt-24`}>
            <SectionHeading
              kicker="Screens"
              title={project.screensHeading ?? "The report"}
            />
            <div className="flex flex-col gap-8">
              {project.screens.images.map((image) => (
                <ZoomFigure key={image.src} image={image} />
              ))}
            </div>
            {project.screens.paragraphs && (
              <div className="mt-6">
                <Paragraphs items={project.screens.paragraphs} />
              </div>
            )}
          </div>
        )}

        {/* Previous / next */}
        {(prev || next) && (
          <nav
            aria-label="More projects"
            className="flex flex-wrap gap-4 border-t border-border pt-10"
          >
            {prev ? <Neighbour project={prev} direction="prev" /> : <span className="flex-[1_1_280px]" />}
            {next ? <Neighbour project={next} direction="next" /> : <span className="flex-[1_1_280px]" />}
          </nav>
        )}
      </div>
    </PageContainer>
  );
}
