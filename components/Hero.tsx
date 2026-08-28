"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <section className="flex min-h-[90vh] items-center px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[3fr_2fr] lg:items-center">
        <motion.div
          className="order-1 flex justify-center lg:order-2"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        >
          <div className="rounded-[2rem] border border-teal/30 bg-zinc-100 p-3">
            <Image
              src="/portrait.jpg"
              alt="Portrait of Siam Sadman"
              width={360}
              height={360}
              priority
              className="h-64 w-64 rounded-[1.5rem] object-cover sm:h-80 sm:w-80"
            />
          </div>
        </motion.div>

        <motion.div
          className="order-2 flex flex-col items-center gap-6 text-center lg:order-1 lg:items-start lg:text-left"
          initial="hidden"
          animate="visible"
          variants={container}
        >
          <motion.h1
            variants={item}
            className="text-4xl font-bold tracking-tight text-navy sm:text-5xl lg:text-6xl"
          >
            Siam Sadman
          </motion.h1>

          <motion.p
            variants={item}
            className="text-lg font-medium text-teal sm:text-xl"
          >
            <span className="whitespace-nowrap">Power BI Developer</span>{" "}
            <span className="whitespace-nowrap">
              · Microsoft Fabric Analytics Engineer
            </span>
          </motion.p>

          <motion.p
            variants={item}
            className="max-w-xl text-base leading-relaxed text-zinc-800 sm:text-lg"
          >
            BI Developer and Reporting Analyst with 12+ years of experience
            building automated reporting pipelines and Power BI dashboards in
            production environments for clients including British American
            Tobacco Bangladesh, Arnott&apos;s Australia and TOLL Australia.
          </motion.p>

          <motion.div
            variants={item}
            className="flex flex-wrap justify-center gap-4 lg:justify-start"
          >
            <a
              href="#projects"
              className="rounded-full bg-navy px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-teal"
            >
              View projects
            </a>
            <a
              href="/Siam_Sadman_BI_Developer.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-navy px-6 py-3 text-sm font-medium text-navy transition-colors hover:bg-navy hover:text-white"
            >
              Download CV
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
