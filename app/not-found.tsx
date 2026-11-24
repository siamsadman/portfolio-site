import Link from "next/link";
import PageContainer from "@/components/PageContainer";

export default function NotFound() {
  return (
    <main id="main" className="flex flex-1 items-center bg-background py-20">
      <PageContainer>
        <p className="mb-3 font-mono text-xs tracking-[0.12em] text-muted uppercase">
          404
        </p>
        <h1 className="mb-4 text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold tracking-tight text-heading">
          That page doesn&apos;t exist
        </h1>
        <p className="mb-8 max-w-[520px] text-base text-secondary sm:text-lg">
          The link may be old or mistyped. The projects and the rest of the site are one click away.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/#projects"
            className="inline-flex min-h-11 items-center justify-center rounded-[10px] bg-accent px-6 py-3 text-sm font-semibold text-on-accent transition-opacity hover:opacity-90"
          >
            View projects
          </Link>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center justify-center rounded-[10px] border border-border px-6 py-3 text-sm text-secondary transition-colors hover:border-accent hover:text-accent"
          >
            Back to home
          </Link>
        </div>
      </PageContainer>
    </main>
  );
}
