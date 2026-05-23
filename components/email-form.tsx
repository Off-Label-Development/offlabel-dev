"use client";

import { useState } from "react";

export function EmailForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("submitting");
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    setStatus("success");
    setEmail("");
  };

  if (status === "success") {
    return (
      <div className="rounded-[var(--radius)] bg-primary/10 border border-primary/20 p-6 text-center">
        <p className="text-lg font-medium text-primary">
          Thanks for your interest!
        </p>
        <p className="mt-1 text-muted-foreground">
          {"We'll be in touch soon with practical AI insights."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:gap-0">
      <label htmlFor="email" className="sr-only">
        Email address
      </label>
      <input
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        disabled={status === "submitting"}
        className="flex-1 rounded-[var(--radius)] sm:rounded-r-none border border-input bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:opacity-50 transition-all"
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-[var(--radius)] sm:rounded-l-none bg-primary px-6 py-3 font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 transition-all cursor-pointer"
      >
        {status === "submitting" ? "Joining..." : "Stay in the loop"}
      </button>
    </form>
  );
}
