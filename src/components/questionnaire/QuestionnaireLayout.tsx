"use client";

import type { ReactNode } from "react";
import Link from "next/link";

type Props = {
  step: number;
  totalSteps: number;
  onBack: () => void;
  children: ReactNode;
};

export function QuestionnaireLayout({ step, totalSteps, onBack, children }: Props) {
  const progress = ((step) / totalSteps) * 100;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Pupsy header */}
      <header className="sticky top-0 z-50 w-full border-b border-[var(--color-border)] bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[900px] items-center justify-between px-6 py-3">
          {/* Logo — links back home */}
          <Link href="/" className="font-serif text-xl tracking-tight text-foreground transition-opacity hover:opacity-70">
            Pupsy<span style={{ color: "var(--color-accent)" }}>.</span>
          </Link>

          {/* Progress & controls */}
          <div className="flex items-center gap-4">
            {/* Step indicator */}
            <span className="hidden text-xs text-muted-foreground sm:block">
              Step {step} of {totalSteps}
            </span>

            {/* Progress bar */}
            <div className="w-24 sm:w-32">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${progress}%`,
                    backgroundColor: "var(--color-accent)",
                  }}
                />
              </div>
            </div>

            {/* Back button */}
            {step > 1 ? (
              <button
                onClick={onBack}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
                aria-label="Go back"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                  <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ) : (
              <Link
                href="/"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
                aria-label="Close"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Step content — animated */}
      <div className="flex flex-1 items-start justify-center px-6 py-10 md:items-center md:py-16">
        <div key={step} className="quiz-step-enter w-full max-w-[520px]">
          {children}
        </div>
      </div>
    </div>
  );
}
