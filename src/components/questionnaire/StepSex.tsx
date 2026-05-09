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
    <div className="flex flex-col items-center text-center">
      <h2 className="headline-xl text-[clamp(1.6rem,3.5vw,2.4rem)] text-foreground">
        Is {profile.name || "your dog"} male or female?
      </h2>
      <p className="mt-2 text-xs text-muted-foreground max-w-[340px]">
        This helps us factor in hormonal and metabolic differences.
      </p>

      {/* Sex selection */}
      <div className="stagger-children mt-6 flex flex-col gap-3 w-full max-w-[320px]">
        {[
          { value: "male", label: "Male", icon: "male" },
          { value: "female", label: "Female", icon: "female" },
        ].map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => handleSex(opt.value)}
            className={`quiz-option group fade-in flex items-center gap-5 rounded-[20px] border p-5 transition-all hover:shadow-lg ${
              profile.sex === opt.value
                ? "border-accent bg-accent/5 ring-1 ring-accent shadow-md"
                : "border-[var(--color-border)] bg-background hover:border-accent/40"
            }`}
          >
            <div className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors ${
              profile.sex === opt.value ? "bg-accent text-white" : "bg-muted/50 text-accent group-hover:bg-accent/10"
            }`}>
              <Icon name={opt.icon} size={24} />
            </div>
            <span className="text-lg font-serif text-foreground">{opt.label}</span>
          </button>
        ))}
      </div>

      {/* Neutered/Spayed toggle — only show after sex selected */}
      {profile.sex && (
        <div className="mt-6 w-full max-w-[400px]">
          <p className="text-sm font-medium text-foreground">
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
