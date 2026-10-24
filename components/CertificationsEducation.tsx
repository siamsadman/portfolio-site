"use client";

import { motion, type Variants } from "framer-motion";
import PageContainer from "@/components/PageContainer";
import SectionHeading from "@/components/SectionHeading";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } },
};

type Certification = {
  title: string;
  date?: string;
  detail?: string;
  url?: string;
};

const certifications: Certification[] = [
  {
    title: "Microsoft Certified: Fabric Data Engineer Associate (DP-700)",
    date: "October 2026",
    url: "https://learn.microsoft.com/en-us/users/siamsadman/credentials/784b368bc24e1335",
  },
  {
    title: "Microsoft Certified: Fabric Analytics Engineer Associate (DP-600)",
    date: "August 2026",
    url: "https://learn.microsoft.com/en-us/users/siamsadman/credentials/66d644d3f55928b",
  },
  {
    title: "Microsoft Certified: Power BI Data Analyst Associate (PL-300)",
    date: "July 2026",
    url: "https://learn.microsoft.com/en-us/users/siamsadman/credentials/5bf3f8c4b813c762",
  },
  {
    title: "EF SET English Certificate — C1 Advanced",
    detail: "Reading C2 · Listening C2 · Speaking C2 · Writing B2",
    url: "https://cert.efset.org/en/Wr6Sh8",
  },
];

export default function CertificationsEducation() {
  return (
    <section className="bg-panel pt-6 pb-24 sm:pt-8">
      <PageContainer>
        <div className="mx-auto max-w-3xl">
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
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                Certifications
              </p>
              <div className="mt-4 flex flex-col gap-4">
                {certifications.map((cert) => {
                  const body = (
                    <>
                      <p className="text-base font-medium text-foreground group-hover:text-accent">
                        {cert.title}
                        {cert.date && (
                          <span className="text-muted"> · {cert.date}</span>
                        )}
                      </p>
                      {cert.detail && (
                        <p className="mt-1 text-sm text-muted">
                          {cert.detail}
                        </p>
                      )}
                      {cert.url && (
                        <p className="mt-1 flex items-center gap-1 text-xs font-medium text-accent">
                          Verify
                          <span className="inline-block transition-transform group-hover:translate-x-1">
                            ↗
                          </span>
                        </p>
                      )}
                    </>
                  );
                  return cert.url ? (
                    <a
                      key={cert.title}
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block w-fit"
                    >
                      {body}
                    </a>
                  ) : (
                    <div key={cert.title} className="group block w-fit">
                      {body}
                    </div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div variants={item}>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                Education
              </p>
              <div className="mt-4">
                <p className="text-base font-medium text-foreground">
                  B.Sc. in Computer Science
                </p>
                <p className="mt-1 text-sm text-muted">
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
