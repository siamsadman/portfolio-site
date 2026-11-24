import PageContainer from "@/components/PageContainer";

export default function About() {
  return (
    <section id="about" className="bg-background pt-6 pb-4 sm:pt-8">
      <PageContainer>
        <p className="mb-3.5 font-mono text-xs tracking-[0.12em] text-muted uppercase">
          About
        </p>
        <div className="flex max-w-[820px] flex-col gap-4 text-[clamp(1rem,1.4vw,1.125rem)] leading-[1.65] text-secondary">
          <p>
            Based in Dhaka, Bangladesh. I have spent 10+ years in enterprise
            reporting, starting with Excel and SQL Server reports, moving into
            Power BI around 2021 and now building on Microsoft Fabric. For nine
            and a half of those years I led the reporting team at Apsis
            Solutions, supporting multinational clients.
          </p>
          <p>
            My habit is to check the numbers before anyone else has to, and to
            write down the modelling decisions and the problems I hit along the
            way. The project write-ups below show how that works in practice.
          </p>
        </div>
        <p className="mt-6 inline-flex items-center gap-2.5 rounded-2xl border border-border px-4 py-2 text-sm text-secondary">
          <span
            aria-hidden="true"
            className="block h-2 w-2 rounded-full bg-accent"
          />
          Currently open to new roles — Dhaka or remote.
        </p>
      </PageContainer>
    </section>
  );
}
