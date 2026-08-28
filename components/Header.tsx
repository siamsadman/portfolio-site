import PageContainer from "@/components/PageContainer";

const links = [
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/90 backdrop-blur-sm">
      <PageContainer>
        <div className="flex h-16 items-center justify-between">
          <a href="/#top" className="text-sm font-semibold text-navy">
            Siam Sadman
          </a>
          <nav className="flex gap-6">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-zinc-700 hover:text-teal"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </PageContainer>
    </header>
  );
}
