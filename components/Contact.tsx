"use client";

import { motion, type Variants } from "framer-motion";
import PageContainer from "@/components/PageContainer";
import SectionHeading from "@/components/SectionHeading";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Contact() {
  return (
    <section id="contact" className="border-t border-border bg-background pt-24 pb-24 sm:pt-32">
      <PageContainer>
        <div className="max-w-3xl">
          <SectionHeading kicker="07 / Contact" title="Contact" />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={container}
            className="flex flex-col gap-6"
          >
            <motion.div variants={item} className="flex flex-wrap gap-4">
              <a
                href="mailto:siamsadman@gmail.com"
                className="rounded-full bg-heading px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-accent"
              >
                siamsadman@gmail.com
              </a>
              <a
                href="https://www.linkedin.com/in/siam-sadman"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-heading px-6 py-3 text-sm font-medium text-heading transition-colors hover:bg-heading hover:text-background"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/siamsadman"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-heading px-6 py-3 text-sm font-medium text-heading transition-colors hover:bg-heading hover:text-background"
              >
                GitHub
              </a>
            </motion.div>

            <motion.p variants={item} className="text-sm text-muted">
              Currently open to new roles — Dhaka, Gulf, or remote.
            </motion.p>
          </motion.div>
        </div>
      </PageContainer>
    </section>
  );
}
