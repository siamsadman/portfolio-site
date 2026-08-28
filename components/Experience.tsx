"use client";

import { motion, type Variants } from "framer-motion";
import PageContainer from "@/components/PageContainer";
import SectionHeading from "@/components/SectionHeading";
import {
  experience,
  type ExperienceEntry,
  type EngagementItem,
} from "@/content/experience";

const cardsContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const engagementsContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const engagementItem: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

function EngagementBlock({ item }: { item: EngagementItem }) {
  const kicker = item.kind === "client" ? "Client engagement" : item.label;

  return (
    <motion.div
      variants={engagementItem}
      className="border-l-2 border-border pl-4"
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-accent">
        {kicker}
      </p>

      {item.kind === "internal" && (
        <>
          <div className="mt-1 flex items-baseline gap-2">
            <h4 className="text-lg font-semibold text-foreground">
              {item.label}
            </h4>
            <span className="text-xs text-muted">{item.dateRange}</span>
          </div>
          <ul className="mt-2 max-w-[80ch] list-disc space-y-1 pl-4 text-base leading-relaxed text-foreground sm:text-lg">
            {item.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </>
      )}

      {item.kind === "client" && item.workstreams.length === 1 && (
        <>
          <div className="mt-1 flex flex-wrap items-baseline gap-2">
            <h4 className="text-lg font-semibold text-foreground">
              {item.client} — {item.workstreams[0].descriptor}
            </h4>
            <span className="text-xs text-muted">
              {item.workstreams[0].dateRange}
            </span>
          </div>
          {item.workstreams[0].note && (
            <p className="mt-1 text-sm italic text-muted">
              {item.workstreams[0].note}
            </p>
          )}
          <ul className="mt-2 max-w-[80ch] list-disc space-y-1 pl-4 text-base leading-relaxed text-foreground sm:text-lg">
            {item.workstreams[0].bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </>
      )}

      {item.kind === "client" && item.workstreams.length > 1 && (
        <>
          <h4 className="mt-1 text-lg font-semibold text-foreground">
            {item.client}
          </h4>
          <div className="mt-3 space-y-4 rounded-lg bg-elevated p-4">
            {item.workstreams.map((workstream) => (
              <div key={workstream.descriptor}>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">
                  Workstream
                </p>
                <div className="mt-0.5 flex flex-wrap items-baseline gap-2">
                  <p className="text-sm font-semibold text-foreground">
                    {workstream.descriptor}
                  </p>
                  <span className="text-xs text-muted">
                    {workstream.dateRange}
                  </span>
                </div>
                {workstream.note && (
                  <p className="mt-1 text-sm italic text-muted">
                    {workstream.note}
                  </p>
                )}
                <ul className="mt-2 max-w-[80ch] list-disc space-y-1 pl-4 text-base leading-relaxed text-foreground sm:text-lg">
                  {workstream.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
}

function ApsisCard({
  entry,
}: {
  entry: Extract<ExperienceEntry, { type: "engagements" }>;
}) {
  return (
    <motion.div
      variants={cardItem}
      className="rounded-2xl border border-border bg-card p-6 sm:p-8"
    >
      <h3 className="text-2xl font-bold text-heading sm:text-3xl">
        {entry.employer}
      </h3>
      <p className="mt-1 text-sm text-muted">
        {entry.location} · {entry.dateRange}
      </p>

      <div className="mt-4 flex flex-col gap-1">
        {entry.titles.map((title) => (
          <p
            key={title.title}
            className="text-sm font-medium text-secondary"
          >
            {title.title}
            {title.dateRange && (
              <span className="text-muted"> · {title.dateRange}</span>
            )}
          </p>
        ))}
        {entry.roleNote && (
          <p className="text-xs italic text-muted">{entry.roleNote}</p>
        )}
      </div>

      <motion.div
        variants={engagementsContainer}
        className="mt-6 flex flex-col gap-6"
      >
        {entry.engagements.map((item, index) => (
          <EngagementBlock
            key={item.kind === "client" ? item.client : item.label + index}
            item={item}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}

function EarlierRoles({
  entries,
}: {
  entries: Extract<ExperienceEntry, { type: "bullets" }>[];
}) {
  return (
    <motion.div
      variants={cardItem}
      className="rounded-2xl border border-border bg-card p-6 sm:p-8"
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">
        Earlier roles
      </p>
      <div className="mt-6 flex flex-col gap-6">
        {entries.map((entry) => (
          <div key={entry.id}>
            <h4 className="text-lg font-semibold text-heading">
              {entry.employer}
            </h4>
            <p className="text-sm text-muted">
              {entry.location} · {entry.dateRange}
              {entry.partTime && " · Part-time"}
            </p>
            <p className="mt-1 text-sm font-medium text-secondary">
              {entry.titles[0].title}
            </p>
            {entry.bullets.map((bullet) => (
              <p key={bullet} className="mt-2 text-base leading-relaxed text-foreground sm:text-lg">
                {bullet}
              </p>
            ))}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const apsisEntry = experience.find(
    (entry): entry is Extract<ExperienceEntry, { type: "engagements" }> =>
      entry.type === "engagements"
  );
  const earlierRoles = experience.filter(
    (entry): entry is Extract<ExperienceEntry, { type: "bullets" }> =>
      entry.type === "bullets"
  );

  return (
    <section id="experience" className="bg-panel pt-6 pb-24 sm:pt-8">
      <PageContainer>
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <SectionHeading kicker="02 / Experience" title="Experience" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardsContainer}
            className="flex flex-col gap-12"
          >
            {apsisEntry && <ApsisCard entry={apsisEntry} />}
            <EarlierRoles entries={earlierRoles} />
          </motion.div>
        </div>
      </PageContainer>
    </section>
  );
}
