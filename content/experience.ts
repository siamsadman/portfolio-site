export type Title = {
  title: string;
  dateRange?: string;
};

// A client relationship can span more than one workstream running over
// different (possibly overlapping) date ranges — BATB is both "Reporting
// operations leadership" (2017 – June 2025) and, concurrently, "Business
// intelligence modernisation" (2021 – 2025). These render as two workstreams
// inside one client block, never as two separate client engagements.
export type Workstream = {
  descriptor: string;
  dateRange: string;
  note?: string;
  bullets: string[];
};

export type ClientEngagement = {
  kind: "client";
  client: string;
  workstreams: Workstream[];
};

export type InternalSupportItem = {
  kind: "internal";
  label: string;
  dateRange: string;
  bullets: string[];
};

export type EngagementItem = ClientEngagement | InternalSupportItem;

type EmployerBase = {
  id: string;
  employer: string;
  location: string;
  dateRange: string;
  partTime?: boolean;
  titles: Title[];
  roleNote?: string;
};

export type ExperienceEntry =
  | (EmployerBase & { type: "engagements"; engagements: EngagementItem[] })
  | (EmployerBase & { type: "bullets"; bullets: string[] });

export const experience: ExperienceEntry[] = [
  {
    id: "apsis",
    employer: "Apsis Solutions Limited",
    location: "Dhaka, Bangladesh",
    dateRange: "Feb 2017 – Aug 2026",
    roleNote: "Reporting team lead throughout tenure",
    titles: [
      { title: "Reporting Analyst (BI & Analytics)", dateRange: "Jan 2022 – Aug 2026" },
      { title: "Senior Reporting Officer", dateRange: "Jan 2019 – Dec 2021" },
      { title: "Reporting Officer", dateRange: "Feb 2017 – Dec 2018" },
    ],
    type: "engagements",
    engagements: [
      {
        kind: "client",
        client: "British American Tobacco Bangladesh",
        workstreams: [
          {
            descriptor: "Reporting operations leadership",
            dateRange: "2017 – June 2025",
            bullets: [
              "Led a team of 2–4 analysts delivering approximately 130 scheduled and ad-hoc reports per month to BATB's central analytics function, regional managers and area managers.",
              "Owned the full reporting lifecycle for BATB's CRM and sales force automation platform, from requirement gathering through delivery, covering sales, distribution, trade and campaign reporting.",
              "Designed reusable Power Query report templates that converted recurring manual Excel production into paste-and-refresh outputs, reducing hands-on effort and enabling team-wide self-service.",
              "Developed T-SQL queries against the CRM and transactional databases, handling datasets from hundreds to millions of rows.",
              "Acted as the client's primary reporting point of contact, sustaining the engagement across a vendor transfer and eight subsequent years.",
            ],
          },
          {
            descriptor: "Business intelligence modernisation",
            dateRange: "2021 – 2025",
            bullets: [
              "Introduced Power BI capability to BATB and delivered 10–12 dashboards covering sales, distribution and campaign analytics, moving the account from manual Excel output to interactive reporting.",
              "Delivered BI work concurrently with reporting team leadership, contributing to two project teams simultaneously.",
            ],
          },
        ],
      },
      {
        kind: "client",
        client: "Arnott's Australia",
        workstreams: [
          {
            descriptor: "Power BI delivery",
            dateRange: "2021 (3–4 months)",
            bullets: [
              "Joined the Apsis Power BI delivery team for Arnott's Australia P&L reporting, building 4–5 dashboards and authoring hundreds of time-intelligence DAX measures (LY, LM, LQ) with USERELATIONSHIP logic for heavily filtered multi-date models.",
            ],
          },
        ],
      },
      {
        kind: "client",
        client: "TOLL Australia",
        workstreams: [
          {
            descriptor: "Power Platform automation",
            dateRange: "Sept – Dec 2025",
            note: "Preceded by a self-directed month learning Power Automate (Aug 2025) before project start.",
            bullets: [
              "Primary builder on a two-person team re-engineering a failing UiPath user onboarding process into Power Automate, delivering five production automations across DEV, UAT and PROD environments.",
              "Built unattended Power Automate Desktop RPA handling batches of up to 200 users per run, executing twice daily — Microsoft Entra ID provisioning via Graph API, Adobe licensing API, Active Directory security group and licence assignment (M365 F3/E5), and browser automation across three internal client portals.",
              "Implemented input sanitisation, step-level validation and a dedicated error-handling subflow with automated ServiceNow ticket creation and stakeholder notification; the solution ran in production with no reported failures.",
              "Developed the reverse offboarding automation to revoke access and licensing across the same systems.",
              "Automated a daily licence cost allocation report reconciling employee data, active Microsoft licence inventory and annual pricing into department-level cost output, reducing production time to under 30 seconds.",
            ],
          },
        ],
      },
      {
        kind: "internal",
        label: "Internal delivery support",
        dateRange: "2026",
        bullets: [
          "Supported internal ERP and CRM teams with SQL development and reporting; designed application UI and UX in Figma for internal products.",
        ],
      },
    ],
  },
  {
    id: "market-express",
    employer: "Market Express Limited",
    location: "Dhaka",
    dateRange: "2016 – Feb 2017",
    titles: [{ title: "Reporting Officer" }],
    type: "bullets",
    bullets: [
      "Established the reporting service for British American Tobacco Bangladesh. BATB subsequently consolidated the engagement under Apsis Solutions, the vendor operating its CRM platform, and the team transferred with the account.",
    ],
  },
  {
    id: "ks-international",
    employer: "K.S. International",
    location: "Dhaka",
    dateRange: "2014 – 2016",
    titles: [{ title: "Digital Media Developer" }],
    type: "bullets",
    bullets: [],
  },
  {
    id: "hub-ltd",
    employer: "The Hub Ltd.",
    location: "Dhaka",
    dateRange: "2011 – 2014",
    partTime: true,
    titles: [{ title: "Information Service Department Manager" }],
    type: "bullets",
    bullets: [],
  },
];
