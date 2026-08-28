# CLAUDE.md — Portfolio site build notes

Personal portfolio for a BI Developer / Reporting Analyst based in Dhaka, Bangladesh.
It serves two purposes at once: a **CV** (as a web page *and* a downloadable PDF) and a
**project showcase** that must scale as new projects are added, without a redesign.

- GitHub: https://github.com/siamsadman
- LinkedIn: https://www.linkedin.com/in/siam-sadman
- Live at: https://siamsadman.vercel.app

CV content lives in `CV_CONTENT.md` in this repo. Read it before writing any section
that contains career information.

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

## Visual direction

**Closest structural reference: `nbarkiya.xyz`.** Homepage sections each show a few
items with a link through to detail pages. Follow that *structure*. Do not mirror its
visual design — the site should look like its own thing.

Elements deliberately borrowed from other references:

- **Numbered section markers** — a small, quiet `01 / Experience`, `02 / Projects` above
  each section heading. Adapted from a terminal-styled reference; keep it understated,
  not a full monospace brutalist theme.
- **Tech tags on project cards** — small pills (`Power BI`, `DAX`, `T-SQL`). These come
  from each project's `tags` field.

Modern, animated, polished. Scroll-triggered motion via Framer Motion. Should look like
someone who cares about presentation built it, not a static document.

The owner is genuinely skilled at UI/UX and works in Figma. Structure the visual layer
so he can refine it himself — keep design tokens and spacing consistent and centralised.

### Explicitly NOT in this build

Deferred, do not build, do not suggest until the owner raises them:

- A "currently building" / recent-activity block — the Microsoft Fabric project does not
  exist yet, and an empty promise is worse than silence
- Experience detail pages at `/experience/<slug>` — good idea, phase two, would roughly
  double the build
- A `/projects` index page with tag filtering — worthwhile at around six projects

Navigation is a **scroll-to-section menu on one page**, not separate route pages. It can
become real pages later without a rebuild.

## Site structure (decided)

One scrolling homepage. Each project card opens its **own detail page** at
`/projects/<slug>`. Detail pages carry the depth — full-size dashboard screenshots, the
data model, modelling decisions, validation approach — with a GitHub link at the bottom
for anyone who wants the files.

Rationale: the deciding reader is a BI lead, and depth is what they screen for. Many
hiring managers will not open a GitHub repo. Per-project URLs also mean a specific
project can be linked directly in a job application.

### Homepage section order (decided — do not reorder)

1. **Hero** — name, role line, the verbatim bio line, two buttons (view projects,
   download CV), and a portrait photo. **Not a dashboard screenshot**: Power BI
   dashboards are information-dense and become unreadable at hero size. They belong
   large, in the project cards. If no suitable portrait is supplied, the hero is
   text-only with generous whitespace.
2. **Experience**
3. **Technical proof points** — a compact three-item strip between Experience and
   Projects (the 91.9% validation catch, the 41-second import, the nine-page shared
   model). This is what stops a BI lead scrolling.
4. **Projects**
5. **Skills**
6. **Certifications & Education**
7. **Contact**

Experience comes before Projects deliberately. Twelve years and three multinational
clients is the credibility anchor; portfolio projects lead a page only when there is no
experience to lead with. Lead each Experience block with the **client and the work**,
not the job title.

### Projects must be data-driven

All project content lives in a single `content/projects.ts` array. The homepage maps over
it to render cards. One dynamic route at `app/projects/[slug]/page.tsx` renders every
detail page.

Detail bodies are a **per-project list of sections, not fixed slots**. Olist Sales might
declare *Screenshots → Data Model → Validation → Findings*; a Microsoft Fabric project
would declare *Architecture → Medallion Layers → Pipelines → Lineage*. Same template,
different section list.

**Adding a project must never require writing new components.** The steps must be: drop
images into `public/projects/<slug>/`, add one entry to `content/projects.ts`, commit,
push.

Include a `tags` field on every project (`Power BI`, `Fabric`, `SQL`, `Python`).

Experience should be data-driven the same way, in `content/experience.ts`.

### Build order — do not deviate

A half-built site is worse than a finished simple one:

1. Homepage, complete
2. One detail page (Olist Sales) as the reusable template
3. Deploy — the site is now live and linkable
4. Remaining two detail pages, same template

## Do NOT build these

Considered and deliberately rejected. Do not add them, do not suggest them again:

- **Skill percentage bars** ("DAX 85%", "Backend Engineering 95%"). Self-assigned numbers
  with no basis; disliked by senior reviewers. The published SQL validation work
  demonstrates competence instead.
- **A "Services I provide" section.** Signals freelancer-for-hire, not candidate.
- **"24/7 Support", "Happy Clients", "Projects Done", satisfaction percentages, WhatsApp
  contact button.** Vendor positioning, wrong audience.

Framing throughout is **Experience** and **Projects** — never Services or Support.

## Accuracy rules — these are strict

- **Never invent CV content.** Titles, employers, dates and metrics come from
  `CV_CONTENT.md` only. If something is missing, stop and ask. Never write placeholder
  achievements that read as real.
- **Never inflate a claim.** The owner is scrupulously honest and will correct anything
  overstated. Re-check any capability claim before it goes on the site. Do not call a
  bridge-heavy model a "star schema" when it isn't.
- **The owner undersells himself.** Probe for specifics rather than accepting vague
  framing, and do not let AI-assisted work be discounted — but never compensate by
  overstating.

### Confidentiality — this is a public site

- **Keep TOLL Australia internal system and portal names out of anything published.**
  Describe them generically ("three internal client portals").
- The BATB custom data extraction panel was built by Apsis's dev team, **not** by the
  owner. Do not credit it to him.

### Employer vs client — the one place this site could make a false claim

The employer is **Apsis Solutions Limited**. BATB, Arnott's and TOLL were *Apsis's
clients*. A client name must never be the top-level heading of an experience block. The
employer is the container; client engagements nest inside it, each labelled "Client
engagement". Full rule in `CV_CONTENT.md`.

### Bio line — use verbatim, do not reword

> BI Developer and Reporting Analyst with 12+ years of experience building automated
> reporting pipelines and Power BI dashboards in production environments for clients
> including British American Tobacco Bangladesh, Arnott's Australia and TOLL Australia.

This line already appears across all three GitHub READMEs. Keep it consistent.

### Certifications — all held

- Microsoft Certified: Fabric Analytics Engineer Associate (**DP-600**) — August 2026
- Microsoft Certified: Power BI Data Analyst Associate (**PL-300**) — July 2026
- EF SET English Certificate — C1 Advanced

### Availability — contact section only

One quiet line in the **Contact** section, phrased exactly as:

> Currently open to new roles — Dhaka, Gulf, or remote.

**Not in the hero.** In the hero it reads as anxious, signals unemployment to a reader who
was not asking, and is the fastest thing on the site to go stale. Do not mention visa
sponsorship or EOR arrangements anywhere on the site.

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

**Technical proof points — these drive the strip in section 03:**

- Caught an on-time rate reading 95% instead of the correct 91.9% through independent SQL
  validation of every DAX measure
- Deliberately disconnected a pre-flattened bridge table when DAX across two independent
  many-to-many paths returned plausible but wrong results — and documented why rather than
  hiding it
- Cut a 98,000-row SQL Server import from 10+ minutes to 41 seconds by correcting column
  type declarations
- Extended the model across all three parts without modifying any previously published
  table, treating earlier parts as live production assets

Next project to be built: **Microsoft Fabric / DP-600** — lakehouse, medallion
architecture, notebooks, pipelines, lineage view. SQL-focused and Python projects follow.

## Environment

- **Windows 11, PowerShell, natively.** Node, git, Python and Power BI Desktop all run in
  Windows. WSL exists only as Docker infrastructure for databases — never route work
  through it.
- Project root: `L:\Python_Env\Portfolio_Website\portfolio-site`
- Node v24.19.0 at `L:\nodejs`, npm cache at `L:\npm-cache` (C: is space-constrained)
- Git identity configured globally; branch is `main`; every push auto-deploys to Vercel

## Working style

- **One step at a time.** Give one step, then wait for confirmation before the next. Do
  not write ten files in a single pass, and do not move on to the next section
  unprompted.
- Assume the owner is **new to git and to JavaScript/React.** Spell out commands and say
  what they actually do.
- **Say when something is wrong or inconsistent.** Consistency passes on the dashboards
  caught real problems — mismatched KPI cards, misleading axis scales, a stale number in a
  callout. Flagging these is wanted, not unwelcome.
- Written English is strong.

## Git rules learned the hard way

- **Never edit files on github.com.** Every web edit creates a commit the local repo lacks,
  the next push is rejected, and the live site drifts from local. This happened twice
  already. Edit locally, commit, push.
- If a push is rejected: `git fetch origin` → `git log --oneline origin/main` →
  `git pull --no-rebase` → resolve → push.
- Commit before starting significant work, so there is always a clean rollback point.
