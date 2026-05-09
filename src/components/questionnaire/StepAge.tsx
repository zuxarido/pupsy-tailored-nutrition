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
    <div className="flex flex-col items-center text-center">
      <h2 className="headline-xl text-[clamp(1.6rem,3.5vw,2.4rem)] text-foreground">
        How old is {profile.name || "your dog"}?
      </h2>
      <p className="mt-2 text-xs text-muted-foreground max-w-[340px]">
        Caloric needs change as dogs age.
      </p>

      <div className="stagger-children mt-6 flex flex-col gap-3 w-full max-w-[320px]">
        {ageOptions.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => select(opt.value)}
            className={`quiz-option group fade-in flex items-center gap-5 rounded-[20px] border p-4 transition-all hover:shadow-lg ${
              profile.age === opt.value
                ? "border-accent bg-accent/5 ring-1 ring-accent shadow-md"
                : "border-[var(--color-border)] bg-background hover:border-accent/40"
            }`}
          >
            <div className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors ${
              profile.age === opt.value ? "bg-accent text-white" : "bg-muted/50 text-accent group-hover:bg-accent/10"
            }`}>
              <Icon name={opt.icon} size={24} />
            </div>
            <div className="flex flex-col items-start text-left">
              <span className="text-base font-serif text-foreground leading-tight">{opt.label}</span>
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">{opt.detail}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
