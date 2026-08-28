import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetail from "@/components/ProjectDetail";
import { projects } from "@/content/projects";

function getBuiltProject(slug: string) {
  const project = projects.find((p) => p.slug === slug);
  if (!project || !project.sections || project.sections.length === 0) {
    return undefined;
  }
  return project;
}

export function generateStaticParams() {
  return projects
    .filter((p) => p.sections && p.sections.length > 0)
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getBuiltProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Siam Sadman`,
    description: project.summary,
  };
}

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getBuiltProject(slug);
  if (!project) notFound();

  return <ProjectDetail project={project} />;
}
