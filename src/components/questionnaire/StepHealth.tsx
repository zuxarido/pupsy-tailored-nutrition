import { useState } from "react";
import type { DogProfile } from "@/types/dog-profile";

type Props = {
  profile: DogProfile;
  update: (patch: Partial<DogProfile>) => void;
  next: () => void;
};

const healthOptions = [
  "None",
  "Sensitive stomach",
  "Skin / coat issues",
  "Joint problems",
  "Diabetes",
  "Chicken allergy",
  "Grain allergy",
  "Kidney issues",
  "Overweight",
  "Other",
];

export function StepHealth({ profile, update, next }: Props) {
  const [selected, setSelected] = useState<string[]>(profile.healthConditions);

  const toggle = (condition: string) => {
    if (condition === "None") {
      setSelected(["None"]);
      return;
    }
    setSelected((prev) => {
      const without = prev.filter((c) => c !== "None");
      if (without.includes(condition)) {
        return without.filter((c) => c !== condition);
      }
      return [...without, condition];
    });
  };

  const handleContinue = () => {
    update({ healthConditions: selected });
    next();
  };

  return (
    <div className="flex flex-col">
      <h2 className="headline-xl text-[clamp(1.8rem,4vw,2.8rem)] text-foreground">
        Any health conditions or allergies?
      </h2>
      <p className="mt-3 text-sm text-muted-foreground">
        Select all that apply. We&rsquo;ll tailor {profile.name || "your dog"}&rsquo;s recipe accordingly.
      </p>

      <div className="stagger-children mt-8 flex flex-wrap gap-2.5">
        {healthOptions.map((opt) => {
          const isSelected = selected.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() => toggle(opt)}
              className={`quiz-option fade-in rounded-full border px-4 py-2.5 text-sm ${
                isSelected
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-[var(--color-border)] bg-background text-foreground hover:border-accent/50"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={handleContinue}
        disabled={selected.length === 0}
        className="btn-pill-primary mt-8 w-full disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Continue
      </button>
    </div>
  );
}
