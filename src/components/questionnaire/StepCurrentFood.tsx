import type { DogProfile } from "@/types/dog-profile";
import { Icon } from "@/components/ui/Icon";

type Props = {
  profile: DogProfile;
  update: (patch: Partial<DogProfile>) => void;
  next: () => void;
};

const foodOptions = [
  { value: "kibble", label: "Kibble", icon: "kibble" },
  { value: "wet-food", label: "Wet food", icon: "wet-food" },
  { value: "home-cooked", label: "Home-cooked", icon: "home-cook" },
  { value: "raw", label: "Raw diet", icon: "raw-food" },
  { value: "mix", label: "Mix of everything", icon: "mix" },
  { value: "nothing-consistent", label: "Nothing consistent", icon: "shrug" },
];

export function StepCurrentFood({ profile, update, next }: Props) {
  const select = (value: string) => {
    update({ currentFood: value });
    next();
  };

  return (
    <div className="flex flex-col items-center">


      <h2 className="headline-xl text-center text-[clamp(1.8rem,4vw,2.8rem)] text-foreground">
        What are you feeding {profile.name || "your dog"} now?
      </h2>
      <p className="mt-3 text-center text-sm text-muted-foreground">
        No judgement — we just want to understand the starting point.
      </p>

      <div className="stagger-children mt-8 grid w-full grid-cols-1 gap-3">
        {foodOptions.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => select(opt.value)}
            className={`quiz-option fade-in flex items-center gap-4 rounded-[16px] border px-5 py-4 text-left ${
              profile.currentFood === opt.value
                ? "border-accent bg-accent/5 shadow-md"
                : "border-[var(--color-border)] bg-background"
            }`}
          >
            <Icon name={opt.icon} size={24} className="text-accent" />
            <span className="text-sm font-medium text-foreground">{opt.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
