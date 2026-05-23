const approaches = [
  {
    title: "Listen First",
    description:
      "We start by understanding your business — your challenges, your workflow, your team. AI solutions only work when they fit your reality.",
  },
  {
    title: "Start Small",
    description:
      "No massive overhauls. We identify quick wins that build confidence and deliver value before scaling to bigger initiatives.",
  },
  {
    title: "Stay Practical",
    description:
      "We focus on solutions you can actually use. If it requires a PhD to operate, it's not the right fit for your business.",
  },
];

export function Approach() {
  return (
    <section id="approach" className="py-20 px-6 bg-secondary/50">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl text-balance">
            Our approach is refreshingly simple
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {"We believe AI should adapt to how you work — not the other way around."}
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
          {approaches.map((item, index) => (
            <div
              key={item.title}
              className="relative bg-card rounded-[var(--radius)] p-8 border border-border/50 hover:border-border transition-colors"
            >
              <span className="absolute -top-4 left-6 inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                {index + 1}
              </span>
              <h3 className="text-xl font-semibold text-foreground mt-2">
                {item.title}
              </h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
