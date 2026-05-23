export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-6 border-t border-border/50">
      <div className="mx-auto max-w-5xl flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p className="text-sm text-muted-foreground">
          {currentYear} Off-Label Development. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <a 
            href="mailto:hello@offlabel.dev" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Contact
          </a>
          <a 
            href="#" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Privacy
          </a>
        </div>
      </div>
    </footer>
  );
}
