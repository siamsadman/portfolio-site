"use client";

import { motion, type Variants } from "framer-motion";
import PageContainer from "@/components/PageContainer";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const proofPoints = [
  {
    stat: "95% → 91.9%",
    label: "Independent SQL validation",
    detail:
      "Caught an on-time rate reading 95% instead of the correct 91.9% through independent SQL validation of every DAX measure.",
  },
  {
    stat: "10+ min → 41s",
    label: "SQL Server import",
    detail:
      "Cut a 98,000-row SQL Server import from 10+ minutes to 41 seconds by correcting column type declarations.",
  },
  {
    stat: "9 pages · 1 model",
    label: "One shared dimensional model",
    detail:
      "Nine dashboard pages across three dashboards share one dimensional model — extended across all three parts without modifying any previously published table, treating earlier parts as live production assets.",
  },
];

export default function ProofPoints() {
  return (
    <section className="bg-background pt-6 pb-24 sm:pt-8">
      <PageContainer>
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-10 font-mono text-sm font-medium tracking-wide text-accent"
          >
            03 / Validation
          </motion.p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={container}
            className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2"
          >
            {proofPoints.map((point) => (
              <motion.div
                key={point.label}
                variants={item}
                className="flex flex-col gap-2"
              >
                <p className="text-3xl font-bold text-accent sm:text-4xl">
                  {point.stat}
                </p>
                <p className="text-sm font-semibold text-foreground sm:text-base">
                  {point.label}
                </p>
                <p className="text-sm leading-relaxed text-muted sm:text-base">
                  {point.detail}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </PageContainer>
    </section>
  );
}
