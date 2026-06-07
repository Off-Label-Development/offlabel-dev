"use client";

import { useEffect, useRef, useState } from "react";
import { EmailForm } from "./email-form";

type Mood = "tired" | "frustrated" | "exhausted" | "defeated" | "relieved";

type Activity = {
  label: string;
  icon: "flower" | "coffee" | "ball" | "walk" | "lunch";
};

const tediousTasks: { task: string; mood: Mood }[] = [
  { task: "Sorting invoices...", mood: "tired" },
  { task: "Copying data to spreadsheets...", mood: "frustrated" },
  { task: "Writing follow-up emails...", mood: "frustrated" },
  { task: "Scheduling appointments...", mood: "exhausted" },
  { task: "Generating reports...", mood: "defeated" },
];

const freedomActivities: Activity[] = [
  { label: "Tending your garden", icon: "flower" },
  { label: "Coffee with a friend", icon: "coffee" },
  { label: "Coaching your kid's team", icon: "ball" },
  { label: "An afternoon walk", icon: "walk" },
  { label: "Actually taking lunch", icon: "lunch" },
];

type Frame =
  | { kind: "tedious"; task: string; mood: Mood }
  | { kind: "ai" }
  | { kind: "freedom"; activity: Activity };

// Build the full looping timeline once.
const frames: Frame[] = [
  ...tediousTasks.map((t) => ({ kind: "tedious" as const, task: t.task, mood: t.mood })),
  { kind: "ai" as const },
  ...freedomActivities.map((a) => ({ kind: "freedom" as const, activity: a })),
];

const durationFor = (frame: Frame) =>
  frame.kind === "tedious" ? 1600 : frame.kind === "ai" ? 2000 : 2300;

export function Hero() {
  const [kind, setKind] = useState<Frame["kind"]>("tedious");
  const [task, setTask] = useState(tediousTasks[0].task);
  const [mood, setMood] = useState<Mood>(tediousTasks[0].mood);
  const [activity, setActivity] = useState<Activity>(freedomActivities[0]);
  const indexRef = useRef(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setKind("freedom");
      setActivity(freedomActivities[0]);
      return;
    }

    let timeout: ReturnType<typeof setTimeout>;

    const applyFrame = (frame: Frame) => {
      setKind(frame.kind);
      if (frame.kind === "tedious") {
        setTask(frame.task);
        setMood(frame.mood);
      } else if (frame.kind === "freedom") {
        setActivity(frame.activity);
      }
    };

    const schedule = () => {
      const frame = frames[indexRef.current];
      applyFrame(frame);
      timeout = setTimeout(() => {
        indexRef.current = (indexRef.current + 1) % frames.length;
        schedule();
      }, durationFor(frame));
    };

    schedule();

    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="relative pt-32 pb-20 px-6 md:pt-40 md:pb-28 overflow-hidden">
      <div className="mx-auto max-w-4xl flex flex-col items-center">
        {/* Animation Container */}
        <div className="relative w-full h-80 md:h-96 mb-8 flex items-center justify-center">
          {/* Tedious Phase */}
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center text-center transition-all duration-700 ${
              kind === "tedious"
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <CrtScene mood={mood} />
            <p className="mt-6 text-xl md:text-2xl text-muted-foreground font-medium min-h-[2rem]">
              {task}
            </p>
          </div>

          {/* Transition / AI Phase */}
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center text-center transition-all duration-700 ${
              kind === "ai"
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <CrtScene mood="relieved" />
            <div className="mt-6 inline-flex items-center gap-3 px-6 py-3 bg-primary/10 rounded-full">
              <svg
                className="w-5 h-5 text-primary animate-spin"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span className="text-primary font-medium">AI takes it from here...</span>
            </div>
          </div>

          {/* Freedom Phase */}
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center text-center transition-all duration-1000 ${
              kind === "freedom"
                ? "opacity-100 scale-100"
                : "opacity-0 scale-110 pointer-events-none"
            }`}
          >
            <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10">
              <ActivityIcon icon={activity.icon} />
            </div>
            <p className="text-sm uppercase tracking-widest text-accent font-medium mb-2">
              Now you have time for
            </p>
            <p className="text-3xl md:text-4xl font-serif text-foreground min-h-[3rem] transition-opacity duration-500">
              {activity.label}
            </p>
          </div>
        </div>

        {/* Main headline - always visible */}
        <div className="text-center">
          <h1 className="font-serif text-4xl font-medium leading-tight text-foreground md:text-5xl lg:text-6xl text-balance">
            AI that works for you, not the other way around
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto text-pretty">
            We help small businesses harness AI in practical, human-centered ways. No
            jargon, no hype — just real solutions that fit your workflow.
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

/* ----------------------------------------------------------------- */
/* Cartoon person at a CRT computer, expression driven by `mood`.     */
/* ----------------------------------------------------------------- */
function CrtScene({ mood }: { mood: Mood }) {
  const happy = mood === "relieved";

  return (
    <svg
      viewBox="0 0 200 170"
      className="w-48 h-44 md:w-56 md:h-52"
      role="img"
      aria-label={
        happy
          ? "Cartoon person relaxing as AI handles their work"
          : "Cartoon person feeling overwhelmed at an old computer"
      }
    >
      {/* Desk */}
      <rect x="14" y="138" width="172" height="10" rx="3" className="fill-muted" />
      <rect x="22" y="148" width="8" height="16" rx="2" className="fill-muted" />
      <rect x="170" y="148" width="8" height="16" rx="2" className="fill-muted" />

      {/* Person head + shoulders behind the monitor */}
      <Person mood={mood} />

      {/* CRT monitor */}
      <g>
        {/* Body */}
        <rect
          x="58"
          y="72"
          width="84"
          height="68"
          rx="8"
          className="fill-card stroke-foreground"
          strokeWidth="2.5"
        />
        {/* Screen */}
        <rect
          x="66"
          y="80"
          width="68"
          height="46"
          rx="4"
          className={happy ? "fill-primary/15" : "fill-muted"}
          stroke="currentColor"
          strokeWidth="1.5"
          style={{ color: "var(--color-border)" }}
        />
        {/* Screen content */}
        {happy ? (
          <g className="stroke-primary" strokeWidth="2.5" strokeLinecap="round">
            <path d="M82 103 l8 8 l18 -18" fill="none" />
          </g>
        ) : (
          <g className="fill-muted-foreground" opacity="0.6">
            <rect x="72" y="88" width="34" height="3" rx="1.5" />
            <rect x="72" y="96" width="46" height="3" rx="1.5" />
            <rect x="72" y="104" width="28" height="3" rx="1.5" />
            <rect x="72" y="112" width="40" height="3" rx="1.5" />
          </g>
        )}
        {/* Stand */}
        <rect x="92" y="140" width="16" height="6" className="fill-foreground" />
      </g>

      {/* Mood effects */}
      <MoodEffects mood={mood} />
    </svg>
  );
}

function Person({ mood }: { mood: Mood }) {
  const happy = mood === "relieved";
  const slump = mood === "exhausted" || mood === "defeated";

  // Head dips down a touch when worn out.
  const headY = slump ? 44 : 38;

  return (
    <g>
      {/* Shoulders */}
      <path
        d="M64 138 q36 -34 72 0 Z"
        className="fill-accent"
        opacity="0.9"
      />
      {/* Neck */}
      <rect x="93" y={headY + 18} width="14" height="14" rx="5" className="fill-[#E8C9A8]" />
      {/* Head */}
      <circle cx="100" cy={headY} r="20" className="fill-[#F2D6B6] stroke-foreground" strokeWidth="2" />
      {/* Hair */}
      <path
        d={`M80 ${headY - 4} q0 -22 20 -22 q20 0 20 22 q-10 -10 -20 -10 q-10 0 -20 10 Z`}
        className="fill-foreground"
      />

      {/* Face */}
      <Face mood={mood} cx={100} cy={headY} />

      {/* Hands gripping desk / relaxed */}
      {happy ? (
        <>
          <circle cx="50" cy="132" r="7" className="fill-[#F2D6B6] stroke-foreground" strokeWidth="1.5" />
          <circle cx="150" cy="132" r="7" className="fill-[#F2D6B6] stroke-foreground" strokeWidth="1.5" />
        </>
      ) : (
        <>
          <circle cx="56" cy="136" r="7" className="fill-[#F2D6B6] stroke-foreground" strokeWidth="1.5" />
          <circle cx="144" cy="136" r="7" className="fill-[#F2D6B6] stroke-foreground" strokeWidth="1.5" />
        </>
      )}
    </g>
  );
}

function Face({ mood, cx, cy }: { mood: Mood; cx: number; cy: number }) {
  const eyeY = cy - 1;
  const leftX = cx - 8;
  const rightX = cx + 8;

  return (
    <g className="stroke-foreground" strokeWidth="2" strokeLinecap="round" fill="none">
      {mood === "tired" && (
        <>
          {/* Droopy eyes */}
          <path d={`M${leftX - 4} ${eyeY} q4 3 8 0`} />
          <path d={`M${rightX - 4} ${eyeY} q4 3 8 0`} />
          {/* Eye bags */}
          <path d={`M${leftX - 3} ${eyeY + 4} q3 2 6 0`} strokeWidth="1.2" opacity="0.5" />
          <path d={`M${rightX - 3} ${eyeY + 4} q3 2 6 0`} strokeWidth="1.2" opacity="0.5" />
          {/* Slight frown */}
          <path d={`M${cx - 6} ${cy + 11} q6 -3 12 0`} />
        </>
      )}

      {mood === "frustrated" && (
        <>
          {/* Angled brows */}
          <path d={`M${leftX - 5} ${eyeY - 6} l9 4`} />
          <path d={`M${rightX + 5} ${eyeY - 6} l-9 4`} />
          {/* Eyes */}
          <circle cx={leftX} cy={eyeY + 1} r="1.6" className="fill-foreground" stroke="none" />
          <circle cx={rightX} cy={eyeY + 1} r="1.6" className="fill-foreground" stroke="none" />
          {/* Gritted mouth */}
          <path d={`M${cx - 7} ${cy + 11} h14`} />
          <path d={`M${cx - 3} ${cy + 8} v6 M${cx + 2} ${cy + 8} v6`} strokeWidth="1.2" />
        </>
      )}

      {mood === "exhausted" && (
        <>
          {/* Half-closed heavy eyes */}
          <path d={`M${leftX - 5} ${eyeY - 1} h10`} />
          <path d={`M${rightX - 5} ${eyeY - 1} h10`} />
          <path d={`M${leftX - 4} ${eyeY + 3} q4 1 8 0`} strokeWidth="1.2" opacity="0.5" />
          <path d={`M${rightX - 4} ${eyeY + 3} q4 1 8 0`} strokeWidth="1.2" opacity="0.5" />
          {/* Open weary mouth */}
          <ellipse cx={cx} cy={cy + 12} rx="4" ry="3" className="fill-foreground/70" stroke="none" />
        </>
      )}

      {mood === "defeated" && (
        <>
          {/* X / dead eyes */}
          <path d={`M${leftX - 4} ${eyeY - 4} l8 8 M${leftX + 4} ${eyeY - 4} l-8 8`} />
          <path d={`M${rightX - 4} ${eyeY - 4} l8 8 M${rightX + 4} ${eyeY - 4} l-8 8`} />
          {/* Flat defeated mouth */}
          <path d={`M${cx - 7} ${cy + 12} q7 -2 14 0`} />
        </>
      )}

      {mood === "relieved" && (
        <>
          {/* Happy closed eyes */}
          <path d={`M${leftX - 4} ${eyeY} q4 -4 8 0`} />
          <path d={`M${rightX - 4} ${eyeY} q4 -4 8 0`} />
          {/* Big smile */}
          <path d={`M${cx - 8} ${cy + 8} q8 9 16 0`} />
        </>
      )}
    </g>
  );
}

function MoodEffects({ mood }: { mood: Mood }) {
  if (mood === "tired" || mood === "exhausted") {
    // Sweat drop
    return (
      <path
        d="M128 40 q4 6 0 10 q-4 -4 0 -10 Z"
        className="fill-primary animate-bounce"
        opacity="0.7"
      />
    );
  }

  if (mood === "frustrated") {
    // Steam / anger marks
    return (
      <g className="stroke-accent" strokeWidth="2.5" strokeLinecap="round" fill="none">
        <path d="M132 30 q5 -5 0 -10" className="animate-pulse" />
        <path d="M140 34 q5 -5 0 -10" className="animate-pulse" />
      </g>
    );
  }

  if (mood === "defeated") {
    // ZzZ giving-up marks
    return (
      <g className="fill-muted-foreground font-bold" opacity="0.7">
        <text x="130" y="34" fontSize="10">
          z
        </text>
        <text x="138" y="26" fontSize="13">
          Z
        </text>
      </g>
    );
  }

  if (mood === "relieved") {
    // Sparkles
    return (
      <g className="fill-primary animate-pulse">
        <path d="M40 50 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2 Z" />
        <path d="M160 44 l1.5 4 l4 1.5 l-4 1.5 l-1.5 4 l-1.5 -4 l-4 -1.5 l4 -1.5 Z" />
      </g>
    );
  }

  return null;
}

/* ----------------------------------------------------------------- */
/* Activity icons relevant to each freedom item.                      */
/* ----------------------------------------------------------------- */
function ActivityIcon({ icon }: { icon: Activity["icon"] }) {
  const common = "w-10 h-10 text-primary";

  switch (icon) {
    case "flower":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 9a3 3 0 100 6 3 3 0 000-6zm0 0V4m0 0a2.5 2.5 0 11-2.5 2.5M12 4a2.5 2.5 0 102.5 2.5M9 12H4m0 0A2.5 2.5 0 116.5 9.5M4 12a2.5 2.5 0 102.5 2.5M15 12h5m0 0a2.5 2.5 0 11-2.5-2.5M20 12a2.5 2.5 0 10-2.5 2.5M12 15v6"
          />
        </svg>
      );
    case "coffee":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 10h13v4a5 5 0 01-5 5H9a5 5 0 01-5-5v-4zm13 1h2a2.5 2.5 0 010 5h-2M8 3c0 1-1 1.5-1 2.5M11.5 3c0 1-1 1.5-1 2.5M5 22h13"
          />
        </svg>
      );
    case "ball":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
          <circle cx="12" cy="12" r="9" strokeWidth={1.5} />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 7l3.5 2.5-1.3 4.2H9.8L8.5 9.5 12 7zm0 0V3m4.2 6.5L20 8m-3.8 5.7L19 17m-7 .2L8 21m-2.2-7.3L4 17m1.8-7.5L4 8"
          />
        </svg>
      );
    case "walk":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
          <circle cx="13" cy="4" r="1.8" strokeWidth={1.5} />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 7l2 2 3 1m-5-3l-2 5 2 3 1 4m-1-7l-3 2-1 4"
          />
        </svg>
      );
    case "lunch":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M5 3v8a2 2 0 002 2v8m0-18v6m3-6v6M19 3c-1.5 0-2.5 2-2.5 5s1 4 2.5 4m0-9v18"
          />
        </svg>
      );
    default:
      return null;
  }
}
