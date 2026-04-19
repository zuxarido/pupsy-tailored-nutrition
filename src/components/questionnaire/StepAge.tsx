import type { DogProfile } from "@/types/dog-profile";
import { Icon } from "@/components/ui/Icon";

type Props = {
  profile: DogProfile;
  update: (patch: Partial<DogProfile>) => void;
  next: () => void;
};

const ageOptions = [
  { value: "puppy", label: "Puppy", detail: "0-12 months", icon: "puppy" },
  { value: "young-adult", label: "Young Adult", detail: "1-3 years", icon: "dog" },
  { value: "adult", label: "Adult", detail: "3-7 years", icon: "dog" },
  { value: "senior", label: "Senior", detail: "7+ years", icon: "paw" },
];

export function StepAge({ profile, update, next }: Props) {
  const select = (value: string) => {
    update({ age: value });
    next();
  };

  return (
    <div className="flex flex-col">
      <h2 className="headline-xl text-[clamp(1.8rem,4vw,2.8rem)] text-foreground">
        How old is {profile.name || "your dog"}?
      </h2>
      <p className="mt-3 text-sm text-muted-foreground">
        Nutritional needs change at every life stage.
      </p>

      <div className="stagger-children mt-8 grid grid-cols-2 gap-3">
        {ageOptions.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => select(opt.value)}
            className={`quiz-option fade-in flex flex-col items-center gap-2.5 rounded-[16px] border p-6 ${
              profile.age === opt.value
                ? "border-accent bg-accent/5 shadow-md"
                : "border-[var(--color-border)] bg-background"
            }`}
          >
            <Icon name={opt.icon} size={32} className="text-accent" />
            <span className="text-sm font-medium text-foreground">{opt.label}</span>
            <span className="text-xs text-muted-foreground">{opt.detail}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
