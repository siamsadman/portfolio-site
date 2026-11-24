# CLAUDE.md — Portfolio site build notes

Personal portfolio for a BI Developer / Reporting Analyst based in Dhaka, Bangladesh.
**It is a project-first portfolio site, no longer a CV page.** The CV exists as a
downloadable PDF (`public/Siam_Sadman_BI_Developer.pdf`, linked from the header and
Contact), but the site itself leads with the work.

- GitHub: https://github.com/siamsadman
- LinkedIn: https://www.linkedin.com/in/siam-sadman
- Live at: https://siamsadman.vercel.app

Career facts live in `CV_CONTENT.md` and `content/experience.ts`. Read them before
writing anything that states employers, titles, dates or metrics. (`CV_CONTENT.md` and the
CV PDF still carry the old Market Express wording and have not been refreshed yet.)

## Redesign status (branch `redesign`)

The redesign is built on the `redesign` branch and **not yet pushed or merged**; `main` is
still the old site. The owner commits and pushes himself (`git push -u origin redesign`
gives a Vercel preview). Never commit or push on his behalf.

**The approved redesign mockup wins any design conflict** with this file or with a
default. Do not reinterpret it.

## Stack

| | |
|---|---|
| Framework | Next.js 16.3.1, App Router, TypeScript |
| Styling | Tailwind CSS v4, tokens in `app/globals.css` |
| Theme | Light/dark, class-based toggle in the header, defaults to system preference |
| Fonts | Inter (body), Space Grotesk (headings), JetBrains Mono (kickers, chips) |
| Animation | CSS keyframes and a small `Reveal` wrapper (see Animations); Framer Motion installed but unused |
| Hosting | Vercel, Hobby plan; every push to a branch builds a preview |

No Three.js, no 3D. Not a requirement and not wanted.

## Design system

- **Tokens** live in `app/globals.css` (`:root` for light, `.dark` for dark) and are
  exposed to Tailwind through `@theme inline`: `background`, `panel`, `card`, `code`,
  `elevated`, `line`, `border`, `foreground`, `heading`, `secondary`, `muted`, `dot`,
  `accent`, `on-accent`. Use these names, never hard-coded hex, so both themes work.
  Accent is teal (`#0f766e` light, `#5eead4` dark).
- **Section kicker** — every section starts with `SectionHeading` (`kicker`, `title`,
  optional `intro`): a small mono uppercase label above the heading. Not numbered any more.
- **Primary button** is the accent-filled rounded rectangle used by the Hero
  (`rounded-[10px] bg-accent … text-on-accent`). Read `Hero.tsx` and `ProjectDetail.tsx`
  before adding any button; do not invent a new shape.
- **Logo**: `components/Logo.tsx` is the SS monogram (open teal ring, first S in the heading
  colour, second S in the accent colour). It sits before the name in the header and reads
  the theme tokens, so it follows light and dark. The same shape is `app/icon.svg` (switches
  with the OS theme), plus `app/favicon.ico` (mid-tone, transparent) and `app/apple-icon.png`
  (dark background). Keep all of them in step if the mark changes. Do not replace it with
  plain text or a gradient mark.
- **Icons** are inline SVG components in `components/Icons.tsx` (no icon package). Add new
  ones there. Check both themes.
- Keep tokens and spacing centralised so the owner (skilled in UI/UX, works in Figma) can
  refine the visual layer himself.

## Animations

What exists today, and nothing else:

- **Hero pipeline animation** (Bronze → Silver → Gold → dashboard): pure CSS keyframes
  `flowDot`, `nodePulse`, `barGrow` with classes `.fl-dot`, `.fl-node`, `.fl-bar` in
  `app/globals.css`, used in `Hero.tsx`. Each runs a 3 s loop.
- **Reduced motion is respected**: `prefers-reduced-motion` turns off those animations,
  hides the flowing dot and disables smooth scrolling. Any new motion must do the same.
- **Scroll reveal**: `components/Reveal.tsx` (a small client wrapper using
  IntersectionObserver, styles under `[data-reveal]` in `app/globals.css`). A block fades
  in with a 16 px rise over 0.5 s, once. Content is fully visible in the server-rendered
  HTML; only after load does it hide blocks still below the fold. Blocks already on screen
  and visitors with reduced motion are left alone. Applied to `SectionHeading`, project
  cards (second card in a row delayed 70 ms), the Apsis block and timeline entries in
  Experience, the Skills table and the Credentials grid. Use `as="li"` / `as="dl"` to keep
  valid markup. To animate another block, wrap it in `<Reveal>`; do not write new motion code.
- Smooth anchor scrolling (`scroll-behavior: smooth`, `scroll-padding-top: 5rem`) and a
  0.2 s background/colour transition when the theme toggles.
- Hover transitions on buttons and cards (`transition-colors` / `transition-opacity`).

**Deliberately not built:** parallax, animated number counters, page-load animation, and
animation on project detail bodies (only their headings reveal; screenshots must not
shift while being studied). `framer-motion` is still in `package.json` but nothing imports it any more (the unused
`ProofPoints.tsx` was deleted); remove it with `npm uninstall framer-motion` when convenient.
Any new motion must respect `prefers-reduced-motion`.

## Site structure (as built)

One scrolling homepage in this order (see `app/page.tsx`): **Hero → About → Projects →
Experience → Skills → Certifications & Education → Contact.** Projects comes before
Experience on purpose in the redesign. Do not reorder without being asked.

- **Hero**: kicker, headline "Enterprise reporting that people trust.", client line,
  one "View projects" button, certification chips, portrait, pipeline animation. The
  availability line is NOT in the hero (see below).
- **Projects**: filter chips (All / BI / Fabric / DE via `category`), four cards visible,
  then a "See all 7 projects" button. Cards are data-driven.
- **Experience**: data-driven from `content/experience.ts`.
- Navigation is a scroll-to-section menu on one page; each project opens its own detail
  page at `/projects/<slug>`.
- Deferred, not built: experience detail pages, a separate `/projects` index.

## Projects are data-driven

All project content lives in `content/projects.ts`. The homepage maps `projectOrder` to
cards; one dynamic route, `app/projects/[slug]/page.tsx`, renders every detail page with
`components/ProjectDetail.tsx`. **Adding a project must never require a new component:**
drop images in `public/projects/<slug>/`, add one entry to `content/projects.ts`, add its
slug to `projectOrder`, commit, push.

`projectOrder` controls BOTH the homepage card order and the prev/next links on detail
pages. Current order (by strength, Fabric and engineering first, the Olist trio kept
together as parts 1 to 3):

1. `bts-fabric-pipeline` — BTS Airline On-Time Performance (Fabric lakehouse)
2. `opensky-fabric-rti` — Live Aircraft Data (Fabric Real-Time Intelligence)
3. `grid-shift` — Grid Shift (Fabric App). Slug differs from the repo `ember-fabric-app`.
4. `olist-dbt-databricks` — Olist Pipeline (dbt on Databricks)
5. `olist-sales` — Sales & Revenue Performance (Power BI, Olist part 1 of 3)
6. `olist-logistics` — Logistics & Delivery Performance (part 2 of 3)
7. `olist-customer-satisfaction` — Customer Experience & Satisfaction (part 3 of 3)

All seven pages use the **shared project template**. Project fields: card fields (`kind`,
`cardTitle`, `cardText`, `outcome`, `cardTags`, `category`, card image 1280×720 which is
also the social-share image) and page fields (`eyebrow`, `numbers`, `archHeading`,
`layers`, `archNote`, `diagrams`, `findingsHeading` / `findingsNote` / `findings`,
`screensHeading` / `screens`, `sections`, `downloadUrl` / `downloadLabel`, `docsUrl`,
`demoUrl`). Page order: header (buttons: GitHub, Live docs, Download .pbix, Watch demo,
Screenshots) → key numbers → architecture layers → diagrams → findings → sections →
screens → prev/next.

Rendering notes: `renderInline` formats `**bold**`, `` `code` `` and `*italic*` in body
text, `archNote` and finding text, but **not** in `finding.title`. `CollapsibleList`
collapses at 4 items (only when there is more than one extra). Screenshots open in a
native `<dialog>` lightbox (`ZoomFigure`).

**Card `outcome` line** — one verified fact in accent colour under the card text, same
shape on every card (scale figure · result):

| Project | Outcome |
|---|---|
| BTS | 41.8M records · 71-period backfill, no failures |
| OpenSky | 54,587 events · 46,004 unique after cleaning |
| Grid Shift | 285,700 rows · 22 DAX measures |
| dbt | 25 models · 57 tests passing |
| Sales | 98K orders · 7 data problems fixed |
| Logistics | 99,441 orders · 91.9% on time |
| Customer Satisfaction | 98,410 reviews · late orders score 1.73 lower |

Every number on every page was checked against the repo, the live page and, for the three
Olist dashboards, the open `.pbix` model through the Power BI Modeling MCP. Re-check
before changing one; never round up or inflate.

**Project 7 (dbt on Databricks) — framing, settled.** A learning project on Databricks
Free Edition rebuilding the pipelines behind the three Olist dashboards. The page says
openly that the owner is new to dbt and Databricks and used AI (Claude) as a guide, and
states its limits (row filter tested with a simulated non-member only, Lakeflow stream
simulated, dashboard export untested on re-import). Do not add or reword dbt or Databricks
skills, or touch the CV, without the owner's explicit say-so.

**Positioning — settled, do not drift.** The hero, site title, bio and OG description
describe Power BI and reporting on purpose. The owner targets analyst and BI roles first,
MIS as fallback. Do not reposition around DP-700 or "Fabric Data Engineer" even though the
Fabric projects would support it.

Next planned projects: a SQL-focused project, then a Python-focused one.

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

> BI Developer and Reporting Analyst with 10+ years in enterprise reporting, building automated
> reporting pipelines and Power BI dashboards in production environments for clients
> including British American Tobacco Bangladesh, Arnott's Australia and TOLL Australia.

This line already appears across all three GitHub READMEs. Keep it consistent.

### Certifications — all held

- Microsoft Certified: Fabric Data Engineer Associate (**DP-700**) — October 2026
- Microsoft Certified: Fabric Analytics Engineer Associate (**DP-600**) — August 2026
- Microsoft Certified: Power BI Data Analyst Associate (**PL-300**) — July 2026
- EF SET English Certificate — C1 Advanced

### Availability — contact section only

One quiet line in the **Contact** section, phrased exactly as:

> Currently open to new roles — Dhaka or remote.

**Not in the hero.** In the hero it reads as anxious, signals unemployment to a reader who
was not asking, and is the fastest thing on the site to go stale. Do not mention visa
sponsorship or EOR arrangements anywhere on the site.

## Environment

- **Windows 11, PowerShell, natively.** Node, git, Python and Power BI Desktop run in
  Windows. WSL exists only as Docker infrastructure for databases; never route work
  through it.
- Project root: `L:\Python_Env\Portfolio_Website\portfolio-site`
- Node v24.19.0 at `L:\nodejs`, npm cache at `L:\npm-cache` (C: is space-constrained)
- Branch for this work is `redesign`; `main` auto-deploys to Vercel.
- Every PowerShell block starts with `Set-Location` to the project folder.
- Commit messages: use several `-m` flags (one per trailer line); pasting a multi-line
  commit breaks PSReadLine.

## Working style

- **One step at a time**, and say which choice you recommend whenever presenting a
  decision between options.
- Assume the owner is new to git and to JavaScript/React. Spell out commands.
- **Say when something is wrong or inconsistent.** Flagging is wanted. Design critique
  after each page is part of the routine.
- Accessibility basics are in place and must stay: skip-to-content link in `app/layout.tsx`,
  one `<main id="main">` per page (also on project pages and the 404), one `h1` per page,
  alt text on every image, 44 px minimum tap targets, visible focus rings, branded 404 at
  `app/not-found.tsx`. Text contrast was checked in both themes with no failures.
- The availability line "Currently open to new roles — Dhaka or remote." appears twice, in
  About and in Contact (the redesign mockup has it in both). Keep the wording identical.
- Verify before publishing: tsc (`npx tsc --noEmit`) passes, every project slug still
  present, pages load in both themes and at phone width.
- Don't publish content from untracked or internal files (for example
  `pipeline-settings-log.md`, `opensky-extras`) without asking.
- Written English is strong.

## Git rules learned the hard way

- **Never edit files on github.com.** Every web edit creates a commit the local repo lacks,
  the next push is rejected, and the live site drifts from local. This happened twice
  already. Edit locally, commit, push.
- If a push is rejected: `git fetch origin` → `git log --oneline origin/main` →
  `git pull --no-rebase` → resolve → push.
- Commit before starting significant work, so there is always a clean rollback point.
