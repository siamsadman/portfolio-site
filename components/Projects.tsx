"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import PageContainer from "@/components/PageContainer";
import SectionHeading from "@/components/SectionHeading";
import { projects } from "@/content/projects";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Projects() {
  return (
    <section id="projects" className="bg-panel pt-6 pb-24 sm:pt-8">
      <PageContainer>
        <SectionHeading kicker="04 / Projects" title="Projects" />

        <p className="mb-12 max-w-2xl text-sm text-muted sm:text-base">
          Nine pages across three dashboards, built on one shared dimensional
          model — the Olist Brazilian E-Commerce dataset (Kaggle).
        </p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={container}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <motion.div key={project.slug} variants={item}>
              <Link
                href={`/projects/${project.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-md"
              >
                <div className="overflow-hidden rounded-xl">
                  <Image
                    src={project.cardImage.src}
                    alt={project.cardImage.alt}
                    width={1280}
                    height={720}
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>

                <h3 className="mt-4 text-lg font-bold text-heading group-hover:text-accent">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-secondary">
                  {project.summary}
                </p>

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

                <p className="mt-auto flex items-center gap-1 pt-4 text-sm font-medium text-accent">
                  View project
                  <span className="inline-block transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </PageContainer>
    </section>
  );
}
