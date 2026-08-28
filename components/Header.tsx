import PageContainer from "@/components/PageContainer";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <PageContainer>
        <div className="flex h-16 items-center justify-between">
          <a
            href="/#top"
            className="font-[family-name:var(--font-corinthia)] text-3xl font-bold text-heading"
          >
            Siam Sadman
          </a>
          <div className="flex items-center gap-6">
            <nav className="flex gap-6">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-secondary hover:text-accent"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </PageContainer>
    </header>
  );
}
