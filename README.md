# Siam Sadman — portfolio site

Source for [siamsadman.vercel.app](https://siamsadman.vercel.app): the portfolio of a BI
developer and reporting analyst in Dhaka, Bangladesh. It leads with seven project
write-ups (Power BI, Microsoft Fabric, dbt on Databricks), followed by experience, skills
and certifications.

Built with Next.js 16 (App Router), TypeScript and Tailwind CSS v4. Hosted on Vercel.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:3000
npx tsc --noEmit   # type check
npm run lint
npm run build      # production build
```

## How it is organised

| Path | What it holds |
|---|---|
| `app/page.tsx` | The homepage: Hero, About, Projects, Experience, Skills, Certifications, Contact |
| `app/projects/[slug]/page.tsx` | One dynamic route that renders every project page |
| `app/not-found.tsx` | The 404 page |
| `app/icon.svg`, `app/favicon.ico`, `app/apple-icon.png` | Site icons (the SS monogram) |
| `content/projects.ts` | All project content, plus `projectOrder` |
| `content/experience.ts` | Experience and earlier career |
| `components/` | Page sections, `ProjectDetail` (the shared project template), `Logo`, `Reveal` (scroll animation) |
| `public/projects/<slug>/` | Screenshots and diagrams for each project |
| `app/globals.css` | Light and dark colour tokens, and the CSS animations |

## Adding a project

No new component is needed.

1. Put the images in `public/projects/<slug>/`.
2. Add one entry to `content/projects.ts`.
3. Add its slug to `projectOrder` in the same file. That list sets the homepage card order
   and the previous and next links on project pages.

`CLAUDE.md` has the full step-by-step guide, a copy-and-fill entry skeleton and the
checklist to run before publishing. Start there.

## Working on it

Design rules, content rules and what is deliberately not built are in
[`CLAUDE.md`](./CLAUDE.md). Read it before changing the layout or any claim on the site.
Every number on a project page was checked against its repository and the live work, so
re-check before editing one.

`CV_CONTENT.md` holds the CV source text. The downloadable CV is
`public/Siam_Sadman_BI_Developer.pdf`.

## Deploying

Every push to a branch builds a Vercel preview. Pushing to `main` deploys to production.
Edit locally and push, never on github.com, so the repository and the live site stay in step.
