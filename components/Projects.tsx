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
    <section id="projects" className="pt-6 pb-24 sm:pt-8">
      <PageContainer>
        <div className="max-w-3xl">
          <SectionHeading kicker="04 / Projects" title="Projects" />

          <p className="mb-12 text-sm text-zinc-500 sm:text-base">
            Nine pages across three dashboards, built on one shared
            dimensional model — the Olist Brazilian E-Commerce dataset
            (Kaggle).
          </p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={container}
            className="flex flex-col gap-16"
          >
            {projects.map((project) => (
              <motion.div key={project.slug} variants={item}>
                <Link href={`/projects/${project.slug}`} className="group block">
                  <div className="overflow-hidden rounded-2xl border border-zinc-200">
                    <Image
                      src={project.cardImage.src}
                      alt={project.cardImage.alt}
                      width={1280}
                      height={720}
                      className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-navy group-hover:text-teal sm:text-2xl">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-700 sm:text-base">
                    {project.summary}
                  </p>

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
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </PageContainer>
    </section>
  );
}
