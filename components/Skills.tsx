import PageContainer from "@/components/PageContainer";
import SectionHeading from "@/components/SectionHeading";

const skillRows = [
  {
    label: "BI and analytics",
    text: "Power BI Desktop and Service · DAX · Power Query · Advanced time intelligence · USERELATIONSHIP and role-playing dimensions · Excel · Dashboard UX and visual design",
  },
  {
    label: "Microsoft Fabric",
    text: "Lakehouse and medallion architecture · Direct Lake semantic models · Delta Lake · PySpark · Data Factory pipelines and incremental loading · Dataflow Gen2 · Real-Time Intelligence · KQL · Activator · Fabric Apps (preview) · TMDL and Git integration",
  },
  {
    label: "Databricks and dbt",
    text: "dbt models, tests, seeds and docs · Databricks Asset Bundles and serverless jobs · Lakeflow pipelines · Unity Catalog row filters",
  },
  {
    label: "Data and databases",
    text: "T-SQL · SQL Server · MySQL · Star and snowflake modelling · Stored procedures · ETL development · Python",
  },
  {
    label: "Automation",
    text: "Power Automate Cloud and Desktop RPA · Microsoft Graph API · REST API integration · Microsoft Entra ID provisioning · UiPath to Power Automate migration",
  },
  {
    label: "Delivery and leadership",
    text: "Team leadership · Requirements gathering · Stakeholder management · Client relationship management · DEV/UAT/PROD deployment",
  },
];

export default function Skills() {
  return (
    <section id="skills" className="bg-background py-14 sm:py-16">
      <PageContainer>
        <SectionHeading kicker="Skills" title="What I work with" />
        <dl className="rounded-[18px] border border-line bg-card px-6 py-2">
          {skillRows.map((row) => (
            <div
              key={row.label}
              className="flex flex-wrap gap-x-6 gap-y-1.5 border-b border-line py-4 last:border-b-0"
            >
              <dt className="flex-[0_0_180px] pt-0.5 font-mono text-xs tracking-[0.12em] text-muted uppercase">
                {row.label}
              </dt>
              <dd className="flex-[1_1_360px] text-base text-secondary">
                {row.text}
              </dd>
            </div>
          ))}
        </dl>
      </PageContainer>
    </section>
  );
}
