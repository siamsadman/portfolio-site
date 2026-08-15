# CLAUDE.md — Portfolio site build notes

Personal portfolio for a Senior BI/Reporting Analyst. It serves two purposes at once:
a **CV** (as a web page *and* a downloadable PDF) and a **project showcase** that must
scale as new projects are added without a redesign.

- GitHub: https://github.com/siamsadman
- LinkedIn: https://www.linkedin.com/in/siam-sadman

## Stack

| | |
|---|---|
| Framework | Next.js 16.3.1, App Router, TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| Hosting | Vercel, Hobby plan |
| Domain | `siamsadman.vercel.app` (custom domain possible later) |

No Three.js, no 3D. Not a requirement and not wanted.

## Site structure (decided)

One scrolling homepage. Each project card opens its **own detail page** at
`/projects/<slug>`. Detail pages carry the depth — full-size dashboard screenshots,
the data model, modeling decisions, validation approach — with a GitHub link at the
bottom for anyone who wants the files.

Rationale: the deciding reader is a BI lead, and depth is what they screen for. Many
hiring managers will not open a GitHub repo. Per-project URLs also mean a specific
project can be linked directly in a job application.

**Build order — do not deviate.** A half-built site is worse than a finished simple one:

1. Homepage, complete
2. One detail page (Olist Sales) as the template
3. Deploy to Vercel — the site is now live and linkable
4. Remaining two detail pages, same template

## Do NOT build these

These were considered and deliberately rejected. Do not add them, and do not suggest
them again:

- **Skill percentage bars** ("DAX 85%"). Self-assigned numbers with no basis; disliked
  by senior reviewers. Published validation queries demonstrate competence instead.
- **A "Services I provide" section.** Signals freelancer-for-hire, not candidate.
- **"24/7 Support", project-count stats, WhatsApp contact button.** Vendor positioning,
  wrong audience.

Framing throughout is **Experience** and **Projects** — never Services or Support.

## Content rules

- **Never invent CV content.** Job titles, employers, dates, and metrics must come from
  the site owner. If something is missing, stop and ask — do not write placeholder
  achievements that look real.
- **Bio line, used verbatim:** "Senior BI/Reporting Analyst with 9+ years of experience."
  It already appears across three GitHub READMEs and two LinkedIn posts. Keep it
  consistent; do not reword it.
- Microsoft PL-300 certified (July 2026). DP-600 under consideration — do not state it
  as held or in progress.

## Projects

Three completed Power BI dashboards on the Olist Brazilian E-Commerce dataset (Kaggle).
Each repo has three dashboard screenshots plus a data model diagram in `images/`.

| # | Project | Palette | Repo |
|---|---|---|---|
| 1 | Sales & Revenue Performance | blue | `olist-sales-dashboard` |
| 2 | Logistics & Delivery Performance | teal/navy | `olist-logistics-dashboard` |
| 3 | Customer Experience & Satisfaction | coral/gold | `olist-customer-satisfaction-dashboard` |

The screenshots are the strongest asset on the site — unlike a developer portfolio,
these artifacts are colourful and immediately legible as skilled work. Lean on them
hard; show them large.

Future work to accommodate without redesign: Microsoft Fabric / DP-600, SQL-focused
projects, Python projects.

## Environment

- **Windows 11, PowerShell, natively.** Node, git, and Power BI Desktop all run in
  Windows. WSL exists only as Docker infrastructure for databases — never route work
  through it.
- Project root: `L:\Python_Env\Portfolio_Website\portfolio-site`
- Node at `L:\nodejs`, npm cache at `L:\npm-cache` (C: drive is space-constrained)
- Git identity configured globally; branch is `main`

## Working style

- **One step at a time.** Give one step, then wait for confirmation before the next.
  Do not write ten files in a single pass.
- Assume the owner is **new to git and to JavaScript/React.** Spell out commands and
  say what they actually do.
- **Say when something is wrong or inconsistent.** Consistency passes on the dashboards
  caught real problems — mismatched KPI cards, misleading axis scales, a stale number in
  a callout. Flagging these is wanted, not unwelcome.
- **Flag inaccurate claims**, e.g. describing a bridge-heavy model as a "star schema"
  when it isn't.

## Git rules learned the hard way

- **Never edit files on github.com.** Every web edit creates a commit the local repo
  lacks, and the next push is rejected. This happened twice already.
- If a push is rejected: `git fetch origin` → `git log --oneline origin/main` →
  `git pull --no-rebase` → resolve → push.
- Commit before starting significant work, so there is always a clean rollback point.
