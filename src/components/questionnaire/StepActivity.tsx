import type { DogProfile } from "@/types/dog-profile";
import { Icon } from "@/components/ui/Icon";

type Props = {
  profile: DogProfile;
  update: (patch: Partial<DogProfile>) => void;
  next: () => void;
};

const activityLevels = [
  {
    value: "low",
    label: "Low",
    desc: "Short walks, mostly indoor",
    icon: "couch",
  },
  {
    value: "moderate",
    label: "Moderate",
    desc: "1-2 hours of activity per day",
    icon: "walk",
  },
  {
    value: "high",
    label: "High",
    desc: "Runs, sports, very active",
    icon: "run",
  },
];

export function StepActivity({ profile, update, next }: Props) {
  const select = (value: string) => {
    update({ activity: value });
    next();
  };

  return (
    <div className="flex flex-col items-center">
      {/* Illustration */}
      <img
        src="/quiz-dog-active.png"
        alt="An active dog running"
        className="quiz-illustration mb-4 h-36 w-36 object-contain md:h-48 md:w-48"
      />

      <h2 className="headline-xl text-center text-[clamp(1.8rem,4vw,2.8rem)] text-foreground">
        How active is {profile.name || "your dog"}?
      </h2>
      <p className="mt-3 text-center text-sm text-muted-foreground">
        Active dogs need more calories. We'll adjust portions accordingly.
      </p>

      <div className="stagger-children mt-8 flex w-full flex-col gap-3">
        {activityLevels.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => select(opt.value)}
            className={`quiz-option fade-in flex items-center gap-4 rounded-[16px] border px-5 py-5 text-left ${
              profile.activity === opt.value
                ? "border-accent bg-accent/5 shadow-md"
                : "border-[var(--color-border)] bg-background"
            }`}
          >
            <Icon name={opt.icon} size={28} className="text-accent" />
            <div>
              <div className="text-base font-medium text-foreground">{opt.label}</div>
              <div className="text-sm text-muted-foreground">{opt.desc}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
