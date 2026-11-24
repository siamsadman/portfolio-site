type LogoProps = {
  className?: string;
};

/**
 * The SS monogram: an open ring around two S shapes, the first in the heading
 * colour and the second in the accent colour. Drawn in code so it follows the
 * light and dark theme tokens. The same shape is used in app/icon.svg.
 */
export default function Logo({ className = "h-9 w-9" }: LogoProps) {
  const s =
    "M13 5C12 2 9.5 1 7 1C3.5 1 1.5 3 1.5 5.5C1.5 8 3.5 9 7 11C10.5 13 12.5 14 12.5 16.5C12.5 19 10.5 21 7 21C4 21 1.8 19.5 1 17";
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle
        cx="24"
        cy="24"
        r="21"
        className="stroke-accent"
        strokeWidth="2"
        strokeDasharray="118 14"
        transform="rotate(-60 24 24)"
      />
      <path d={s} className="stroke-heading" strokeWidth="3" transform="translate(10 13)" />
      <path d={s} className="stroke-accent" strokeWidth="3" transform="translate(24 13)" />
    </svg>
  );
}
