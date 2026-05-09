import { useState } from "react";
import type { DogProfile } from "@/types/dog-profile";

type Props = {
  profile: DogProfile;
  update: (patch: Partial<DogProfile>) => void;
  next: () => void;
};

export function StepWeight({ profile, update, next }: Props) {
  const [weight, setWeight] = useState(profile.weight);
  const [idealWeight, setIdealWeight] = useState(profile.idealWeight);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!weight.trim()) return;
    update({ weight: weight.trim(), idealWeight: idealWeight.trim() });
    next();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center text-center w-full">
      <h2 className="headline-xl text-[clamp(1.6rem,3.5vw,2.4rem)] text-foreground">
        How much does {profile.name || "your dog"} weigh?
      </h2>
      <p className="mt-2 text-xs text-muted-foreground max-w-[340px]">
        We&rsquo;ll use this to calculate exact daily portions.
      </p>

      <div className="mt-8">
        <label className="text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground">
          Current weight (kg)
        </label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="e.g. 25"
          autoFocus
          min="0.5"
          max="100"
          step="0.5"
          className="mt-2 w-full rounded-xl border border-[var(--color-input)] bg-background px-5 py-4 text-lg text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      <div className="mt-5">
        <label className="text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground">
          Ideal weight (optional)
        </label>
        <input
          type="number"
          value={idealWeight}
          onChange={(e) => setIdealWeight(e.target.value)}
          placeholder="Leave blank if unsure"
          min="0.5"
          max="100"
          step="0.5"
          className="mt-2 w-full rounded-xl border border-[var(--color-input)] bg-background px-5 py-4 text-lg text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      <button
        type="submit"
        disabled={!weight.trim()}
        className="btn-pill-primary mt-8 w-full disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Continue
      </button>
    </form>
  );
}
