import Image from "next/image";
import PageContainer from "@/components/PageContainer";

const certChips = ["DP-700", "DP-600", "PL-300"];

const pipelineNodes = [
  { name: "Bronze", note: "raw", delay: "0s" },
  { name: "Silver", note: "clean", delay: "1s" },
  { name: "Gold", note: "model", delay: "2s" },
];

const portraitClass =
  "absolute bottom-0 left-[6%] h-auto w-[88%] [mask-image:linear-gradient(to_bottom,#000_82%,transparent_100%)]";

export default function Hero() {
  return (
    <section id="top" className="bg-background pt-16 pb-14 sm:pt-20 sm:pb-16 lg:pt-24">
      <PageContainer className="flex flex-wrap items-center gap-12 lg:gap-14">
        {/* Left: message */}
        <div className="min-w-0 flex-[1_1_520px]">
          <p className="mb-5 font-mono text-xs tracking-[0.12em] text-muted uppercase">
            Power BI Developer · Microsoft Fabric Analytics Engineer
          </p>
          <h1 className="mb-6 text-[clamp(2rem,4.6vw,3rem)] leading-[1.1] font-bold tracking-tight text-heading">
            Enterprise reporting that people trust.
          </h1>
          <p className="mb-8 max-w-[600px] text-[clamp(1rem,1.4vw,1.125rem)] text-secondary">
            Power BI dashboards and automated reporting for British American Tobacco
            Bangladesh, Arnott&apos;s Australia and TOLL Australia.
          </p>
          <a
            href="#projects"
            className="mb-9 inline-flex items-center justify-center rounded-[10px] bg-accent px-7 py-3.5 text-[0.9375rem] font-semibold text-on-accent transition-opacity hover:opacity-90"
          >
            View projects
          </a>

          <ul className="flex flex-wrap gap-2.5">
            {certChips.map((chip) => (
              <li
                key={chip}
                className="inline-flex items-center gap-2 rounded-full border border-line py-1.5 pr-3.5 pl-2 font-mono text-xs text-secondary"
              >
                <Image
                  src="/ms-associate-badge.svg"
                  alt="Microsoft Certified Associate badge"
                  width={28}
                  height={28}
                />
                {chip}
              </li>
            ))}
          </ul>
        </div>

        {/* Right: portrait, stat, pipeline */}
        <div className="flex min-w-[280px] flex-[0_1_420px] flex-col items-center gap-12">
          <div className="relative flex w-full justify-center">
            <div className="relative h-[380px] w-[min(320px,100%)] overflow-hidden rounded-[28px] border border-border bg-[radial-gradient(ellipse_at_50%_28%,var(--elevated)_0%,var(--card)_75%)]">
              <Image
                src="/portrait-light.webp"
                alt="Portrait of Siam Sadman"
                width={500}
                height={603}
                priority
                className={`${portraitClass} dark:hidden`}
              />
              <Image
                src="/portrait-dark.webp"
                alt=""
                aria-hidden="true"
                width={500}
                height={603}
                priority
                className={`${portraitClass} hidden dark:block`}
              />
            </div>
            <div className="absolute -bottom-6 left-3 rounded-xl border border-border border-l-4 border-l-accent bg-card px-5 py-3.5">
              <p className="font-display text-[1.75rem] leading-tight font-bold text-heading">
                10+ yrs
              </p>
              <p className="text-sm text-muted">
                in enterprise reporting
                <br />
                9.5 of them as team lead
              </p>
            </div>
          </div>

          <div
            role="img"
            aria-label="Animated data pipeline: raw data flows through bronze, silver and gold layers into a dashboard"
            className="flex w-full items-center gap-1.5 rounded-2xl border border-line bg-card px-4 py-[18px]"
          >
            {pipelineNodes.map((node) => (
              <div key={node.name} className="contents">
                <div
                  className="fl-node min-w-[62px] rounded-[10px] border border-border bg-card px-2.5 py-2 text-center"
                  style={{ animationDelay: node.delay }}
                >
                  <p className="font-mono text-xs text-secondary">{node.name}</p>
                  <p className="text-xs text-muted">{node.note}</p>
                </div>
                <div className="relative h-0.5 min-w-4 flex-[1_1_20px] bg-line">
                  <span className="fl-dot" style={{ animationDelay: node.delay }} />
                </div>
              </div>
            ))}
            <div className="flex h-[34px] items-end gap-1 px-1.5" aria-hidden="true">
              {[
                { h: 14, d: "0s" },
                { h: 24, d: "0.4s" },
                { h: 18, d: "0.8s" },
                { h: 30, d: "1.2s" },
              ].map((bar) => (
                <span
                  key={bar.d}
                  className="fl-bar block w-1.5 rounded-[2px] bg-accent"
                  style={{ height: bar.h, animationDelay: bar.d }}
                />
              ))}
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
