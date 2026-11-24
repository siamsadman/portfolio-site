export type Title = {
  title: string;
  dateRange?: string;
};

// A client relationship can span more than one workstream running over
// different (possibly overlapping) date ranges — BATB is both "Reporting
// operations leadership" (Jul 2016 – June 2025) and, concurrently, "Business
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
  about?: string; // one-line description of the employer
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
    about: "A software company (CRM, ERP and managed services)",
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
            dateRange: "Jul 2016 – June 2025",
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
    dateRange: "Jul 2016 – Feb 2017",
    titles: [{ title: "Reporting Officer" }],
    type: "bullets",
    bullets: [
      "One of two analysts running British American Tobacco Bangladesh's reporting. The engagement moved under Apsis in 2017, and the team moved with it.",
    ],
  },
  {
    id: "ks-international",
    employer: "K.S. International",
    location: "Dhaka",
    dateRange: "2014 – Jun 2016",
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

// ---------------------------------------------------------------------------
// Homepage timeline (redesign). Condensed from the full records above; this is
// what the Experience section renders. Newest first. TOLL's internal system
// names stay out of public copy.
// ---------------------------------------------------------------------------
export type TimelineItem = {
  id: string;
  when: string;
  title: string;
  org: string;
  bullets: string[]; // always visible
  more: string[]; // behind "Show N more"
};

export const timeline: TimelineItem[] = [
  {
    id: "internal",
    when: "2026",
    title: "Internal delivery support",
    org: "Apsis Solutions Limited",
    bullets: [
      "Supported internal ERP and CRM teams with SQL development and reporting.",
      "Designed application UI and UX in Figma for internal products.",
    ],
    more: [],
  },
  {
    id: "toll",
    when: "Sep – Dec 2025",
    title: "Power Platform automation",
    org: "TOLL Australia",
    bullets: [
      "Primary builder on a two-person team re-engineering a failing onboarding process into Power Automate: five production automations across DEV, UAT and PROD.",
      "Unattended RPA handling batches of up to 200 users per run, twice daily, including Microsoft Entra ID provisioning via Graph API.",
      "Error-handling subflow with automated ticketing and stakeholder notification; ran in production with no reported failures.",
    ],
    more: [
      "Built the reverse offboarding automation to revoke access and licensing.",
      "Automated a daily licence cost allocation report, cutting production time to under 30 seconds.",
    ],
  },
  {
    id: "batb",
    when: "Jul 2016 – Jun 2025",
    title: "Reporting operations lead, then BI modernisation",
    org: "British American Tobacco Bangladesh",
    bullets: [
      "Led 2–4 analysts delivering about 130 scheduled and ad-hoc reports a month.",
      "Owned the full reporting lifecycle for the CRM and sales force automation platform, from requirements to delivery.",
      "Introduced Power BI to the account and delivered 10–12 dashboards between 2021 and 2025.",
    ],
    more: [
      "Built reusable Power Query templates that turned manual Excel production into paste-and-refresh outputs.",
      "Wrote T-SQL against CRM and transactional databases, from hundreds to millions of rows.",
      "Stayed the primary reporting contact across a vendor transfer and eight further years.",
    ],
  },
  {
    id: "arnotts",
    when: "2021 · 3–4 months",
    title: "Power BI delivery",
    org: "Arnott's Australia",
    bullets: [
      "Built 4–5 P&L dashboards as part of the Apsis delivery team.",
      "Authored hundreds of time-intelligence DAX measures (LY, LM, LQ) with USERELATIONSHIP logic for heavily filtered multi-date models.",
    ],
    more: [],
  },
];

export type EarlierRole = {
  id: string;
  employer: string;
  location: string;
  when: string;
  title: string;
  about?: string; // one-line description of the employer
  note?: string; // what the role involved
};

export const earlierCareer: EarlierRole[] = [
  {
    id: "market-express",
    employer: "Market Express Limited",
    location: "Dhaka",
    when: "Jul 2016 – Feb 2017",
    title: "Reporting Officer",
    about: "A trade marketing and manpower provider for consumer brands",
    note: "One of two analysts running British American Tobacco Bangladesh's reporting. The engagement moved under Apsis in 2017, and the team moved with it.",
  },
  {
    id: "ks-international",
    employer: "K.S. International",
    location: "Dhaka",
    when: "2014 – Jun 2016",
    title: "Digital Media Developer",
    about: "A fire safety equipment importer",
    note: "Built and maintained the company website, covering both front-end design and back-end code. Also designed fire alarm systems for office and factory sites in AutoCAD.",
  },
  {
    id: "hub-ltd",
    employer: "The Hub Ltd.",
    location: "Dhaka",
    when: "2011 – 2014 · Part-time",
    title: "Information Service Department Manager",
    about: "An imported furniture showroom (now closed)",
    note: "Built and maintained the central customer database in MS Access for marketing, keeping the data available and accurate. Also co-designed the company website and ran promotional and social media campaigns.",
  },
];
