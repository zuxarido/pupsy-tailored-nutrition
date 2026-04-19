import type { DogProfile } from "@/types/dog-profile";
import { Icon } from "@/components/ui/Icon";

type Props = {
  profile: DogProfile;
  update: (patch: Partial<DogProfile>) => void;
  next: () => void;
};

export function StepSex({ profile, update, next }: Props) {
  const handleSex = (sex: string) => {
    update({ sex });
  };

  const handleNeutered = (neutered: boolean) => {
    update({ neutered });
    next();
  };

  return (
    <div className="flex flex-col">
      <h2 className="headline-xl text-[clamp(1.8rem,4vw,2.8rem)] text-foreground">
        Is {profile.name || "your dog"} male or female?
      </h2>
      <p className="mt-3 text-sm text-muted-foreground">
        This helps us factor in hormonal and metabolic differences.
      </p>

      {/* Sex selection */}
      <div className="stagger-children mt-8 grid grid-cols-2 gap-3">
        {[
          { value: "male", label: "Male", icon: "male" },
          { value: "female", label: "Female", icon: "female" },
        ].map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => handleSex(opt.value)}
            className={`quiz-option fade-in flex flex-col items-center gap-2.5 rounded-[16px] border p-6 ${
              profile.sex === opt.value
                ? "border-accent bg-accent/5 shadow-md"
                : "border-[var(--color-border)] bg-background"
            }`}
          >
            <Icon name={opt.icon} size={32} className="text-accent" />
            <span className="text-sm font-medium text-foreground">{opt.label}</span>
          </button>
        ))}
      </div>

      {/* Neutered/Spayed toggle — only show after sex selected */}
      {profile.sex && (
        <div className="mt-8">
          <p className="text-sm text-foreground">
            Is {profile.name || "your dog"} {profile.sex === "female" ? "spayed" : "neutered"}?
          </p>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {[
              { value: true, label: "Yes" },
              { value: false, label: "No" },
            ].map((opt) => (
              <button
                key={String(opt.value)}
                type="button"
                onClick={() => handleNeutered(opt.value)}
                className={`quiz-option rounded-[12px] border px-5 py-3.5 text-sm ${
                  profile.neutered === opt.value
                    ? "border-accent bg-accent/5 shadow-md"
                    : "border-[var(--color-border)] bg-background"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
