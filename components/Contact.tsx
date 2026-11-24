import PageContainer from "@/components/PageContainer";

const base =
  "inline-flex min-h-11 items-center gap-2 rounded-[10px] px-[18px] py-3";
const outlineLink = `${base} border border-border text-secondary transition-colors hover:border-accent hover:text-accent`;

const svgProps = {
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
  className: "shrink-0",
} as const;

const strokeProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

function MailIcon() {
  return (
    <svg {...svgProps} {...strokeProps}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg {...svgProps} {...strokeProps}>
      <path d="M12 4v11m0 0-4-4m4 4 4-4M5 20h14" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg {...svgProps} fill="currentColor">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11.5H3V9.75Zm6.5 0h3.83v1.57h.05c.53-1 1.84-2.07 3.79-2.07 4.05 0 4.8 2.66 4.8 6.13v5.87h-4v-5.2c0-1.24-.02-2.84-1.73-2.84-1.73 0-2 1.35-2 2.75v5.29h-4V9.75Z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg {...svgProps} fill="currentColor">
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.82 1.19 3.08 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="mt-12 border-t border-border bg-card">
      <PageContainer className="flex flex-wrap items-center justify-between gap-6 pt-10 pb-14">
        <div className="flex-[1_1_380px]">
          <p className="mb-3 font-mono text-xs tracking-[0.12em] text-muted uppercase">
            Contact
          </p>
          <h2 className="mb-1.5 text-xl font-bold text-heading">
            Currently open to new roles — Dhaka or remote.
          </h2>
          <p className="text-base text-secondary">
            Send a note and I will reply with a CV and project links.
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5 text-sm">
          <a
            href="mailto:siamsadman@gmail.com"
            className={`${base} bg-accent font-semibold text-on-accent transition-opacity hover:opacity-90`}
          >
            <MailIcon />
            siamsadman@gmail.com
          </a>
          <a
            href="/Siam_Sadman_BI_Developer.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={outlineLink}
          >
            <DownloadIcon />
            Download CV
          </a>
          <a
            href="https://www.linkedin.com/in/siam-sadman"
            target="_blank"
            rel="noopener noreferrer"
            className={outlineLink}
          >
            <LinkedInIcon />
            LinkedIn
          </a>
          <a
            href="https://github.com/siamsadman"
            target="_blank"
            rel="noopener noreferrer"
            className={outlineLink}
          >
            <GitHubIcon />
            GitHub
          </a>
        </div>
      </PageContainer>
    </section>
  );
}
