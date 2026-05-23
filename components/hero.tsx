import { EmailForm } from "./email-form";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-6 md:pt-40 md:pb-28">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-accent mb-4">
          Practical AI for Small Business
        </p>
        <h1 className="font-serif text-4xl font-medium leading-tight text-foreground md:text-5xl lg:text-6xl text-balance">
          AI that works for you, not the other way around
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto text-pretty">
          We help small businesses harness AI in practical, human-centered ways. 
          No jargon, no hype — just real solutions that fit your workflow.
        </p>
        <div className="mt-10 max-w-md mx-auto">
          <EmailForm />
          <p className="mt-3 text-sm text-muted-foreground">
            Join our newsletter for practical AI tips. No spam, ever.
          </p>
        </div>
      </div>
      
      {/* Decorative element */}
      <div 
        className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-primary/5 via-accent/5 to-transparent rounded-full blur-3xl -z-10 pointer-events-none"
        aria-hidden="true"
      />
    </section>
  );
}
