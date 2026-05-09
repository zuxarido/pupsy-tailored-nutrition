"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

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
          <Link href="/" className="flex items-center transition-opacity hover:opacity-70">
            <img 
              src="/logo-transparent.png" 
              alt="Pupsy Logo" 
              className="h-7 w-auto" 
            />
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
      <div className="flex flex-1 items-start justify-center px-4 py-8 md:items-center md:py-12 bg-[radial-gradient(circle_at_top,_var(--color-accent)_0%,_transparent_35%)] bg-no-repeat">
        <div className="w-full max-w-[580px] rounded-[32px] border border-[var(--color-border)] bg-background p-6 md:p-10 shadow-[0_24px_64px_-12px_rgba(59,42,26,0.12)] relative">
          {/* Subtle background element to fill space */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-accent/[0.03] blur-3xl" />
          
          {/* Back button inside card */}
          {step > 1 && (
            <button
              onClick={onBack}
              className="absolute left-6 top-6 z-20 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground transition-colors hover:text-accent"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-3 w-3">
                <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back
            </button>
          )}

          <div key={step} className="quiz-step-enter relative z-10 flex flex-col items-center">
            {children}
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-5 pt-6 border-t border-[var(--color-border)] relative z-0 pointer-events-none">
             <div className="flex flex-col items-center gap-1.5">
                <Icon name="vet" size={14} className="text-accent/60" />
                <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-muted-foreground/80">Vet Formulated</span>
             </div>
             <div className="flex flex-col items-center gap-1.5">
                <Icon name="check" size={14} className="text-accent/60" />
                <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-muted-foreground/80">Human Grade</span>
             </div>
             <div className="flex flex-col items-center gap-1.5">
                <Icon name="cook" size={14} className="text-accent/60" />
                <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-muted-foreground/80">Freshly Cooked</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
