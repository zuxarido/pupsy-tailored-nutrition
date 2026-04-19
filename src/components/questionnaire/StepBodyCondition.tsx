import type { DogProfile } from "@/types/dog-profile";
import { Icon } from "@/components/ui/Icon";

type Props = {
  profile: DogProfile;
  update: (patch: Partial<DogProfile>) => void;
  next: () => void;
};

const conditions = [
  { value: "too-thin", label: "Too Thin", desc: "Ribs and bones clearly visible", icon: "scale" },
  { value: "lean", label: "Lean", desc: "Ribs easily felt, visible waist", icon: "dog" },
  { value: "just-right", label: "Just Right", desc: "Ribs felt with slight cover", icon: "puppy" },
  { value: "chunky", label: "Chunky", desc: "Ribs hard to feel, rounded shape", icon: "paw" },
  { value: "overweight", label: "Overweight", desc: "No visible waist, heavy build", icon: "scale" },
];

export function StepBodyCondition({ profile, update, next }: Props) {
  const select = (value: string) => {
    update({ bodyCondition: value });
    next();
  };

  return (
    <div className="flex flex-col">
      <h2 className="headline-xl text-[clamp(1.8rem,4vw,2.8rem)] text-foreground">
        How does {profile.name || "your dog"}&rsquo;s body look?
      </h2>
      <p className="mt-3 text-sm text-muted-foreground">
        This helps us understand if {profile.name || "they"} needs to gain, lose, or maintain weight.
      </p>

      <div className="stagger-children mt-8 flex flex-col gap-3">
        {conditions.map((c) => (
          <button
            key={c.value}
            type="button"
            onClick={() => select(c.value)}
            className={`quiz-option fade-in flex items-center gap-4 rounded-[16px] border px-5 py-4 text-left ${
              profile.bodyCondition === c.value
                ? "border-accent bg-accent/5 shadow-md"
                : "border-[var(--color-border)] bg-background"
            }`}
          >
            <Icon name={c.icon} size={24} className="text-accent" />
            <div>
              <div className="text-sm font-medium text-foreground">{c.label}</div>
              <div className="text-xs text-muted-foreground">{c.desc}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
