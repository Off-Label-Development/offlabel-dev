import { EmailForm } from "./email-form";

export function Connect() {
  return (
    <section id="connect" className="py-20 px-6 bg-secondary/50">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl text-balance">
          {"Let's start a conversation"}
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Curious how AI could work for your business? Drop your email and {"we'll"} 
          reach out with some ideas — no pressure, no pitch.
        </p>
        <div className="mt-10 max-w-md mx-auto">
          <EmailForm />
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          Or email us directly at{" "}
          <a 
            href="mailto:hello@offlabel.dev" 
            className="text-primary hover:underline underline-offset-2"
          >
            hello@offlabel.dev
          </a>
        </p>
      </div>
    </section>
  );
}
