export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="#" className="text-lg font-semibold text-foreground tracking-tight">
          Off-Label
        </a>
        <ul className="hidden sm:flex items-center gap-8">
          <li>
            <a
              href="#approach"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Our Approach
            </a>
          </li>
          <li>
            <a
              href="#services"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Services
            </a>
          </li>
          <li>
            <a
              href="#connect"
              className="rounded-[var(--radius)] bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Get in Touch
            </a>
          </li>
        </ul>
        <a
          href="#connect"
          className="sm:hidden rounded-[var(--radius)] bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Connect
        </a>
      </nav>
    </header>
  );
}
