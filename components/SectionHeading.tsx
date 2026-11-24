type SectionHeadingProps = {
  kicker: string; // small mono label above the heading
  title: string;
  intro?: string; // optional one-line description under the heading
};

export default function SectionHeading({ kicker, title, intro }: SectionHeadingProps) {
  return (
    <div className="mb-7">
      <p className="mb-3 font-mono text-xs tracking-[0.12em] text-muted uppercase">
        {kicker}
      </p>
      <h2 className="text-[clamp(1.5rem,2.8vw,2rem)] font-bold tracking-tight text-heading">
        {title}
      </h2>
      {intro && (
        <p className="mt-3 max-w-[680px] text-base text-muted sm:text-lg">{intro}</p>
      )}
    </div>
  );
}
