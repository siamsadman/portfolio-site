import Image from "next/image";
import PageContainer from "@/components/PageContainer";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

const microsoftCerts = [
  {
    title: "Fabric Data Engineer Associate",
    code: "DP-700",
    url: "https://learn.microsoft.com/en-us/users/siamsadman/credentials/784b368bc24e1335",
  },
  {
    title: "Fabric Analytics Engineer Associate",
    code: "DP-600",
    url: "https://learn.microsoft.com/en-us/users/siamsadman/credentials/66d644d3f55928b",
  },
  {
    title: "Power BI Data Analyst Associate",
    code: "PL-300",
    url: "https://learn.microsoft.com/en-us/users/siamsadman/credentials/5bf3f8c4b813c762",
  },
];

const efsetUrl = "https://cert.efset.org/en/Wr6Sh8";

const labelClass =
  "font-mono text-xs tracking-[0.12em] text-muted uppercase";
const cardClass = "rounded-[18px] border border-line bg-card p-6";

function VerifyLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex min-h-11 flex-none items-center rounded-lg border border-border px-3.5 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-accent"
    >
      Verify ↗
    </a>
  );
}

export default function CertificationsEducation() {
  return (
    <section id="credentials" className="bg-background py-14 sm:py-16">
      <PageContainer>
        <SectionHeading kicker="Credentials" title="Certifications &amp; Education" />

        <Reveal className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] items-stretch gap-5">
          <div className={`${cardClass} flex flex-col justify-center`}>
            <p className={`${labelClass} mb-1`}>Microsoft certifications</p>
            <ul>
              {microsoftCerts.map((cert) => (
                <li
                  key={cert.code}
                  className="flex items-center gap-3.5 border-b border-line py-4 last:border-b-0 last:pb-0"
                >
                  <Image
                    src="/ms-associate-badge.svg"
                    alt=""
                    width={40}
                    height={40}
                    className="flex-none"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-base leading-tight font-bold text-heading">
                      {cert.title}
                    </p>
                    <p className="mt-0.5 font-mono text-xs text-muted">{cert.code}</p>
                  </div>
                  <VerifyLink href={cert.url} label={`Verify ${cert.code} certification`} />
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-5">
            <div className={`${cardClass} flex-1`}>
              <p className={`${labelClass} mb-1`}>Education</p>
              <p className="font-display mt-3 text-base leading-tight font-bold text-heading">
                B.Sc. in Computer Science
              </p>
              <p className="mt-1 text-sm text-muted">
                Prime University, Dhaka · 2012 · CGPA 3.44
              </p>
            </div>
            <div className={`${cardClass} flex-1`}>
              <p className={`${labelClass} mb-1`}>English</p>
              <div className="mt-3 flex items-center gap-3.5">
                <div className="min-w-0 flex-1">
                  <p className="font-display text-base leading-tight font-bold text-heading">
                    EF SET · C1 Advanced
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    Reading C2 · Listening C2 · Speaking C2 · Writing B2
                  </p>
                </div>
                <VerifyLink href={efsetUrl} label="Verify EF SET English certificate" />
              </div>
            </div>
          </div>
        </Reveal>
      </PageContainer>
    </section>
  );
}
