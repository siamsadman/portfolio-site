type SectionHeadingProps = {
  kicker: string;
  title: string;
};

export default function SectionHeading({ kicker, title }: SectionHeadingProps) {
  return (
    <div className="mb-12">
      <p className="font-mono text-sm font-medium tracking-wide text-accent">
        {kicker}
      </p>
      <h2 className="mt-2 text-3xl font-bold text-heading sm:text-4xl">{title}</h2>
    </div>
  );
}
