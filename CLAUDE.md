# CLAUDE.md — Portfolio site build notes

Personal portfolio for a BI Developer / Reporting Analyst based in Dhaka, Bangladesh.
It serves two purposes at once: a **CV** (as a web page *and* a downloadable PDF) and a
**project showcase** that must scale as new projects are added, without a redesign.

- GitHub: https://github.com/siamsadman
- LinkedIn: https://www.linkedin.com/in/siam-sadman
- Live at: https://siamsadman.vercel.app

Timeline: this is a **two-week build**, not an open-ended project. Job applications run
daily in parallel; the site is an amplifier, not a blocker.

## Stack

| | |
|---|---|
| Framework | Next.js 16.3.1, App Router, TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| Hosting | Vercel, Hobby plan |
| Domain | `siamsadman.vercel.app` (custom domain possible later) |

No Three.js, no 3D. Not a requirement and not wanted.

CV brand colours, worth carrying into the site: navy `#1F3A5F`, teal `#0E7C86`.

## Site structure (decided)

One scrolling homepage. Each project card opens its **own detail page** at
`/projects/<slug>`. Detail pages carry the depth — full-size dashboard screenshots,
the data model, modelling decisions, validation approach — with a GitHub link at the
bottom for anyone who wants the files.

Rationale: the deciding reader is a BI lead, and depth is what they screen for. Many
hiring managers will not open a GitHub repo. Per-project URLs also mean a specific
project can be linked directly in a job application.

**Build order — do not deviate.** A half-built site is worse than a finished simple one:

1. Homepage, complete
2. One detail page (Olist Sales) as the reusable template
3. Deploy — the site is now live and linkable
4. Remaining two detail pages, same template

Projects must be data-driven. All project content lives in a single content/projects.ts array. The homepage maps over it to render cards; one dynamic route at app/projects/[slug]/page.tsx renders every detail page. Detail bodies are a per-project list of sections, not fixed slots, so structurally different projects (Fabric, SQL, Python) fit the same template. Adding a project must never require writing new components. Include a tags field on every project for future filtering.

## Do NOT build these

Considered and deliberately rejected. Do not add them, do not suggest them again:

- **Skill percentage bars** ("DAX 85%"). Self-assigned numbers with no basis; disliked
  by senior reviewers. The published SQL validation work demonstrates competence instead.
- **A "Services I provide" section.** Signals freelancer-for-hire, not candidate.
- **"24/7 Support", project-count stats, WhatsApp contact button.** Vendor positioning,
  wrong audience.

Framing throughout is **Experience** and **Projects** — never Services or Support.

## Accuracy rules — these are strict

- **Never invent CV content.** Titles, employers, dates and metrics come from the source
  CVs only. If something is missing, stop and ask. Never write placeholder achievements
  that read as real.
- **Never inflate a claim.** The owner is scrupulously honest and will correct anything
  overstated. Re-check any capability claim before it goes on the site. Do not call a
  bridge-heavy model a "star schema" when it isn't.
- **The owner undersells himself.** Probe for specifics rather than accepting vague
  framing, and do not let AI-assisted work be discounted — but never compensate by
  overstating.

### Confidentiality — public site

- **Keep TOLL Australia internal system and portal names out of anything published.**
  Describe them generically ("three internal client portals").
- The BATB custom data extraction panel was built by Apsis's dev team, **not** by the
  owner. Do not credit it to him.

### Bio line — use verbatim, do not reword

> BI Developer and Reporting Analyst with 12+ years of experience building automated
> reporting pipelines and Power BI dashboards in production environments for clients
> including British American Tobacco Bangladesh, Arnott's Australia and TOLL Australia.

This line already appears across all three GitHub READMEs. Keep it consistent.

### Certifications — all held

- Microsoft Certified: Fabric Analytics Engineer Associate (**DP-600**) — August 2026
- Microsoft Certified: Power BI Data Analyst Associate (**PL-300**) — July 2026
- EF SET English Certificate — C1 Advanced

### Availability

Last working day at Apsis Solutions was 23 August 2026. **Available to join immediately** —
this zero-notice availability is a genuine advantage for UAE/Gulf roles and should be
visible on the site. Targeting Dhaka roles, employer-sponsored UAE/Gulf roles, and
genuine remote (EOR-based) work.

## Projects

Three completed Power BI dashboards on the Olist Brazilian E-Commerce dataset (Kaggle).
Nine dashboard pages total across the series, on one shared dimensional model. Each repo
has three dashboard screenshots plus a data model diagram in `images/`.

| # | Project | Palette | Repo |
|---|---|---|---|
| 1 | Sales & Revenue Performance | blue | `olist-sales-dashboard` |
| 2 | Logistics & Delivery Performance | teal/navy | `olist-logistics-dashboard` |
| 3 | Customer Experience & Satisfaction | coral/gold | `olist-customer-satisfaction-dashboard` |

The screenshots are the strongest asset on the site. Unlike a developer portfolio where
projects are screenshots of websites, these artifacts are *dashboards* — visually rich and
immediately legible as skilled work. Show them large.

**Technical talking points worth surfacing on the site, not just in the repos:**

- Caught an on-time rate reading 95% instead of the correct 91.9% through independent SQL
  validation of every DAX measure
- Deliberately disconnected a pre-flattened bridge table when DAX across two independent
  many-to-many paths returned plausible but wrong results — and documented why rather than
  hiding it
- Cut a 98,000-row SQL Server import from 10+ minutes to 41 seconds by correcting column
  type declarations
- Extended the model across all three parts without modifying any previously published
  table, treating earlier parts as live production assets

Future work to accommodate without redesign: Microsoft Fabric (lakehouse, medallion
architecture, notebooks, pipelines), SQL-focused projects, Python projects.

## Environment

- **Windows 11, PowerShell, natively.** Node, git, Python and Power BI Desktop all run in
  Windows. WSL exists only as Docker infrastructure for databases — never route work
  through it.
- Project root: `L:\Python_Env\Portfolio_Website\portfolio-site`
- Node v24.19.0 at `L:\nodejs`, npm cache at `L:\npm-cache` (C: is space-constrained)
- Git identity configured globally; branch is `main`; pushes auto-deploy to Vercel

## Working style

- **One step at a time.** Give one step, then wait for confirmation before the next. Do
  not write ten files in a single pass.
- Assume the owner is **new to git and to JavaScript/React.** Spell out commands and say
  what they actually do.
- **Say when something is wrong or inconsistent.** Consistency passes on the dashboards
  caught real problems — mismatched KPI cards, misleading axis scales, a stale number in a
  callout. Flagging these is wanted, not unwelcome.
- The owner is genuinely skilled at UI/UX and works in Figma. Structure the visual layer so
  it is easy for him to refine himself.
- Written English is strong.

## Git rules learned the hard way

- **Never edit files on github.com.** Every web edit creates a commit the local repo lacks,
  the next push is rejected, and the live site drifts from local. This happened twice
  already. Edit locally, commit, push.
- If a push is rejected: `git fetch origin` → `git log --oneline origin/main` →
  `git pull --no-rebase` → resolve → push.
- Commit before starting significant work, so there is always a clean rollback point.
