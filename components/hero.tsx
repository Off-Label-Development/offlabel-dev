"use client";

import { useEffect, useState } from "react";
import { EmailForm } from "./email-form";

const tediousTasks = [
  "Sorting invoices...",
  "Copying data to spreadsheets...",
  "Writing follow-up emails...",
  "Scheduling appointments...",
  "Generating reports...",
];

const freedomActivities = [
  "Tending your garden",
  "Coffee with a friend",
  "Coaching your kid's team",
  "An afternoon walk",
  "Actually taking lunch",
];

export function Hero() {
  const [phase, setPhase] = useState<"tedious" | "transition" | "freedom">("tedious");
  const [taskIndex, setTaskIndex] = useState(0);
  const [activityIndex, setActivityIndex] = useState(0);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setPhase("freedom");
      return;
    }

    const sequence = () => {
      // Cycle through tedious tasks
      const tediousInterval = setInterval(() => {
        setTaskIndex((prev) => (prev + 1) % tediousTasks.length);
      }, 1200);

      // After showing tedious tasks, transition
      setTimeout(() => {
        clearInterval(tediousInterval);
        setPhase("transition");
        
        // After transition, show freedom
        setTimeout(() => {
          setPhase("freedom");
          
          // Cycle through freedom activities
          const freedomInterval = setInterval(() => {
            setActivityIndex((prev) => (prev + 1) % freedomActivities.length);
          }, 2500);

          return () => clearInterval(freedomInterval);
        }, 1500);
      }, 6000);

      return () => clearInterval(tediousInterval);
    };

    sequence();
  }, []);

  return (
    <section className="relative pt-32 pb-20 px-6 md:pt-40 md:pb-28 overflow-hidden">
      <div className="mx-auto max-w-4xl">
        {/* Animation Container */}
        <div className="relative h-64 md:h-72 mb-8 flex items-center justify-center">
          {/* Tedious Phase */}
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ${
              phase === "tedious" ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <div className="relative">
              {/* Stack of papers visual */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <div className="w-16 h-20 bg-card border border-border rounded shadow-sm absolute -rotate-6 -left-1 -top-1" />
                  <div className="w-16 h-20 bg-card border border-border rounded shadow-sm absolute rotate-3 left-1 top-1" />
                  <div className="w-16 h-20 bg-card border border-border rounded shadow-md relative">
                    <div className="absolute inset-2 flex flex-col gap-1">
                      <div className="h-1 w-8 bg-muted rounded" />
                      <div className="h-1 w-10 bg-muted rounded" />
                      <div className="h-1 w-6 bg-muted rounded" />
                      <div className="h-1 w-9 bg-muted rounded" />
                    </div>
                  </div>
                </div>
                <div className="text-4xl animate-pulse">
                  <svg className="w-8 h-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <p className="text-xl md:text-2xl text-muted-foreground font-medium text-center min-h-[2rem]">
                {tediousTasks[taskIndex]}
              </p>
            </div>
          </div>

          {/* Transition Phase */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
              phase === "transition" ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <div className="text-center">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-primary/10 rounded-full mb-4">
                <svg className="w-6 h-6 text-primary animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span className="text-primary font-medium">AI is handling it...</span>
              </div>
            </div>
          </div>

          {/* Freedom Phase */}
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-1000 ${
              phase === "freedom" ? "opacity-100 scale-100" : "opacity-0 scale-110 pointer-events-none"
            }`}
          >
            <div className="text-center">
              {/* Plant/Garden icon */}
              <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10">
                <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
              </div>
              <p className="text-sm uppercase tracking-widest text-accent font-medium mb-2">
                Now you have time for
              </p>
              <p className="text-3xl md:text-4xl font-serif text-foreground min-h-[3rem] transition-opacity duration-500">
                {freedomActivities[activityIndex]}
              </p>
            </div>
          </div>
        </div>

        {/* Main headline - always visible */}
        <div className="text-center">
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
      </div>
      
      {/* Decorative element */}
      <div 
        className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-primary/5 via-accent/5 to-transparent rounded-full blur-3xl -z-10 pointer-events-none"
        aria-hidden="true"
      />
    </section>
  );
}
