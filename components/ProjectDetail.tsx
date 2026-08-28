import Image from "next/image";
import Link from "next/link";
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
          className="rounded bg-zinc-100 px-1 py-0.5 text-[0.9em]"
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
        <h2 className="text-xl font-bold text-navy">{section.heading}</h2>
        <div className="mt-6 flex flex-col gap-8">
          {section.images.map((image) => (
            <figure key={image.src}>
              <Image
                src={image.src}
                alt={image.alt}
                width={1600}
                height={900}
                className="w-full rounded-2xl border border-zinc-200 object-cover"
              />
              <figcaption className="mt-2 text-xs text-zinc-500">
                {image.alt}
              </figcaption>
            </figure>
          ))}
        </div>
        {section.paragraphs && section.paragraphs.length > 0 && (
          <div className="mt-6 flex max-w-3xl flex-col gap-4">
            {section.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="text-base leading-relaxed text-zinc-800"
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
        <h2 className="text-xl font-bold text-navy">{section.heading}</h2>
        <div className="mt-6 flex max-w-3xl flex-col gap-4">
          {section.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="text-base leading-relaxed text-zinc-800"
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
      <h2 className="text-xl font-bold text-navy">{section.heading}</h2>
      {section.intro && (
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-800">
          {renderInline(section.intro)}
        </p>
      )}
      <ul className="mt-6 max-w-3xl list-disc space-y-2 pl-5 text-base leading-relaxed text-zinc-800">
        {section.items.map((listItem) => (
          <li key={listItem}>{renderInline(listItem)}</li>
        ))}
      </ul>
    </div>
  );
}

export default function ProjectDetail({ project }: { project: Project }) {
  const sections = (project.sections ?? []).filter(hasContent);

  return (
    <section className="px-6 py-16 sm:px-10 sm:py-20 lg:px-16">
      <PageContainer>
        <Link
          href="/#projects"
          className="text-sm font-medium text-teal hover:underline"
        >
          ← All projects
        </Link>

        <h1 className="mt-6 text-3xl font-bold text-navy sm:text-4xl">
          {project.title}
        </h1>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-700"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="mt-4 text-sm text-zinc-500">
          Report pages: {project.pages.join(" · ")}
        </p>

        {sections.map((section) => (
          <SectionBlock key={section.heading} section={section} />
        ))}

        <div className="mt-16 border-t border-zinc-200 pt-8">
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-navy hover:text-teal"
          >
            View source on GitHub →
          </a>
        </div>
      </PageContainer>
    </section>
  );
}
