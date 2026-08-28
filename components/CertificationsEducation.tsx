"use client";

import { motion, type Variants } from "framer-motion";
import PageContainer from "@/components/PageContainer";
import SectionHeading from "@/components/SectionHeading";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const certifications = [
  {
    title: "Microsoft Certified: Fabric Analytics Engineer Associate (DP-600)",
    date: "August 2026",
  },
  {
    title: "Microsoft Certified: Power BI Data Analyst Associate (PL-300)",
    date: "July 2026",
  },
  {
    title: "EF SET English Certificate — C1 Advanced",
    detail: "Reading C2 · Listening C2 · Speaking C2 · Writing B2",
  },
];

export default function CertificationsEducation() {
  return (
    <section className="pt-6 pb-24 sm:pt-8">
      <PageContainer>
        <div className="max-w-3xl">
          <SectionHeading
            kicker="06 / Certifications & Education"
            title="Certifications & Education"
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={container}
            className="flex flex-col gap-12"
          >
            <motion.div variants={item}>
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                Certifications
              </p>
              <div className="mt-4 flex flex-col gap-4">
                {certifications.map((cert) => (
                  <div key={cert.title}>
                    <p className="text-base font-medium text-zinc-900">
                      {cert.title}
                      {cert.date && (
                        <span className="text-zinc-400"> · {cert.date}</span>
                      )}
                    </p>
                    {cert.detail && (
                      <p className="mt-1 text-sm text-zinc-500">
                        {cert.detail}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={item}>
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                Education
              </p>
              <div className="mt-4">
                <p className="text-base font-medium text-zinc-900">
                  B.Sc. in Computer Science
                </p>
                <p className="mt-1 text-sm text-zinc-500">
                  Prime University, Dhaka · 2012 · CGPA 3.44
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </PageContainer>
    </section>
  );
}
