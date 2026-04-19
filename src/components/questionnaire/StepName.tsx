import { useState } from "react";
import type { DogProfile } from "@/types/dog-profile";


type Props = {
  profile: DogProfile;
  update: (patch: Partial<DogProfile>) => void;
  next: () => void;
};

export function StepName({ profile, update, next }: Props) {
  const [value, setValue] = useState(profile.name);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    update({ name: value.trim() });
    next();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      {/* Illustration */}
      <img
        src="/quiz-dog-welcome.png"
        alt="A happy puppy welcoming you"
        className="quiz-illustration mb-2 h-40 w-40 object-contain md:h-52 md:w-52"
      />

      <h2 className="headline-xl text-center text-[clamp(1.8rem,4vw,2.8rem)] text-foreground">
        What&rsquo;s your dog&rsquo;s name?
      </h2>
      <p className="mt-3 text-center text-sm text-muted-foreground">
        We&rsquo;ll personalise everything around them.
      </p>

      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="e.g. Bruno, Luna, Max…"
        autoFocus
        className="mt-8 w-full rounded-2xl border border-[var(--color-input)] bg-background px-5 py-4 text-center text-lg text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent"
      />

      <button
        type="submit"
        disabled={!value.trim()}
        className="btn-pill-primary mt-8 w-full disabled:cursor-not-allowed disabled:opacity-40"
      >
        Continue
      </button>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        Takes about 2 minutes · No signup required
      </p>
    </form>
  );
}
