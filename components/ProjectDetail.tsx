import Image from "next/image";
import PageContainer from "@/components/PageContainer";
import type { Project, ProjectSection } from "@/content/projects";

function hasContent(section: ProjectSection): boolean {
  if (section.type === "prose") return section.paragraphs.length > 0;
  if (section.type === "list") return section.items.length > 0;
  return section.images.length > 0;
}

// Minimal inline formatting for content strings: **bold** lead-ins and
// `code` spans for table/field names, as used verbatim in project READMEs.
function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={index}
          className="rounded bg-code px-1 py-0.5 text-[0.9em]"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

function SectionBlock({ section }: { section: ProjectSection }) {
  if (section.type === "gallery") {
    return (
      <div className="mt-16">
        <h2 className="text-xl font-bold text-heading">{section.heading}</h2>
        <div className="mt-6 flex flex-col gap-8">
          {section.images.map((image) => (
            <figure key={image.src}>
              {image.darkSrc ? (
                <>
                  <a
                    href={image.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block dark:hidden"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={1600}
                      height={900}
                      className="w-full rounded-2xl border border-border object-cover"
                    />
                  </a>
                  <a
                    href={image.darkSrc}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden dark:block"
                  >
                    <Image
                      src={image.darkSrc}
                      alt={image.alt}
                      width={1600}
                      height={900}
                      className="w-full rounded-2xl border border-border object-cover"
                    />
                  </a>
                </>
              ) : (
                <a
                  href={image.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={1600}
                    height={900}
                    className="w-full rounded-2xl border border-border object-cover"
                  />
                </a>
              )}
              <figcaption className="mt-2 text-xs text-muted">
                {image.alt} · Tap to view full-size
              </figcaption>
            </figure>
          ))}
        </div>
        {section.paragraphs && section.paragraphs.length > 0 && (
          <div className="mt-6 flex max-w-3xl flex-col gap-4">
            {section.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="text-base leading-relaxed text-foreground"
              >
                {renderInline(paragraph)}
              </p>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (section.type === "prose") {
    return (
      <div className="mt-16">
        <h2 className="text-xl font-bold text-heading">{section.heading}</h2>
        <div className="mt-6 flex max-w-3xl flex-col gap-4">
          {section.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="text-base leading-relaxed text-foreground"
            >
              {renderInline(paragraph)}
            </p>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-16">
      <h2 className="text-xl font-bold text-heading">{section.heading}</h2>
      {section.intro && (
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground">
          {renderInline(section.intro)}
        </p>
      )}
      <ul className="mt-6 max-w-3xl list-disc space-y-2 pl-5 text-base leading-relaxed text-foreground">
        {section.items.map((listItem) => (
          <li key={listItem}>{renderInline(listItem)}</li>
        ))}
      </ul>
      {section.images && section.images.length > 0 && (
        <div
          className={`mt-8 grid grid-cols-1 gap-x-10 gap-y-10 ${
            section.images.length > 1 ? "sm:grid-cols-2" : ""
          }`}
        >
          {section.images.map((image) => (
            <figure key={image.src}>
              <a
                href={image.src}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={1600}
                  height={900}
                  className="w-full rounded-2xl border border-border object-cover"
                />
              </a>
              <figcaption className="mt-2 text-xs text-muted">
                {image.alt} · Tap to view full-size
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProjectDetail({ project }: { project: Project }) {
  const sections = (project.sections ?? []).filter(hasContent);

  return (
    <section className="px-6 py-16 sm:px-10 sm:py-20 lg:px-16">
      <PageContainer>
        <a
          href="/#projects"
          className="text-sm font-medium text-accent hover:underline"
        >
          ← All projects
        </a>

        <h1 className="mt-6 text-3xl font-bold text-heading sm:text-4xl">
          {project.title}
        </h1>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-panel px-3 py-1 text-xs text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        {project.pages && project.pages.length > 0 && (
          <p className="mt-4 text-sm text-muted">
            {project.pagesLabel ?? "Report pages"}: {project.pages.join(" · ")}
          </p>
        )}

        {sections.map((section) => (
          <SectionBlock key={section.heading} section={section} />
        ))}

        <div className="mt-16 flex flex-wrap gap-3 border-t border-border pt-8">
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-heading transition-colors hover:border-accent hover:text-accent"
          >
            <svg
              viewBox="0 0 16 16"
              className="h-4 w-4 fill-current"
              aria-hidden="true"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
            View source on GitHub
          </a>
          {project.docsUrl && (
            <a
              href={project.docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-accent bg-accent px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
                <path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
                <path d="M3 6v13" />
                <path d="M12 6v13" />
                <path d="M21 6v13" />
              </svg>
              Live docs
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M7 17L17 7" />
                <path d="M8 7h9v9" />
              </svg>
            </a>
          )}
        </div>
      </PageContainer>
    </section>
  );
}
