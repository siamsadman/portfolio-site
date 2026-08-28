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

const skillGroups = [
  {
    category: "BI and Analytics",
    items: [
      "Power BI Desktop",
      "Power BI Service",
      "DAX",
      "Power Query",
      "Microsoft Fabric",
      "Advanced time intelligence",
      "USERELATIONSHIP and role-playing dimensions",
      "Excel",
      "Tableau",
    ],
  },
  {
    category: "Data and Databases",
    items: [
      "T-SQL",
      "SQL Server",
      "MySQL",
      "Star and snowflake schema modelling",
      "Stored procedures",
      "Views",
      "ETL development",
      "Python for data cleaning",
    ],
  },
  {
    category: "Automation and RPA",
    items: [
      "Power Automate Cloud",
      "Power Automate Desktop unattended RPA",
      "Microsoft Graph API",
      "REST API integration",
      "Browser automation",
      "UiPath to Power Automate migration",
      "ServiceNow integration",
    ],
  },
  {
    category: "Identity and Cloud",
    items: [
      "Microsoft Entra ID user provisioning",
      "Active Directory group and licence management",
      "Microsoft 365 licensing (F3, E5)",
      "Secure credential vault integration",
    ],
  },
  {
    category: "Design and Delivery",
    items: [
      "Dashboard UX and visual design",
      "Figma",
      "Requirements gathering",
      "Stakeholder management",
      "DEV/UAT/PROD deployment",
    ],
  },
  {
    category: "Leadership",
    items: [
      "Team leadership (2–4 analysts)",
      "Client relationship management",
      "Multinational stakeholder communication",
    ],
  },
];

export default function Skills() {
  return (
    <section className="pt-6 pb-24 sm:pt-8">
      <PageContainer>
        <div className="max-w-3xl">
          <SectionHeading kicker="05 / Skills" title="Skills" />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={container}
            className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2"
          >
            {skillGroups.map((group) => (
              <motion.div key={group.category} variants={item}>
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                  {group.category}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-zinc-100 px-3.5 py-1.5 text-sm text-zinc-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </PageContainer>
    </section>
  );
}
