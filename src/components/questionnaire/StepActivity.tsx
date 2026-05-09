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


      <h2 className="headline-xl text-center text-[clamp(1.6rem,3.5vw,2.4rem)] text-foreground">
        How active is {profile.name || "your dog"}?
      </h2>
      <p className="mt-2 text-center text-xs text-muted-foreground max-w-[340px]">
        Active dogs need more calories. We&rsquo;ll adjust portions accordingly.
      </p>

      <div className="stagger-children mt-6 flex w-full flex-col gap-3 max-w-[340px]">
        {activityLevels.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => select(opt.value)}
            className={`quiz-option group fade-in flex items-center gap-5 rounded-[20px] border p-4 transition-all hover:shadow-lg ${
              profile.activity === opt.value
                ? "border-accent bg-accent/5 ring-1 ring-accent shadow-md"
                : "border-[var(--color-border)] bg-background hover:border-accent/40"
            }`}
          >
            <div className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors ${
              profile.activity === opt.value ? "bg-accent text-white" : "bg-muted/50 text-accent group-hover:bg-accent/10"
            }`}>
              <Icon name={opt.icon} size={24} />
            </div>
            <div className="flex flex-col items-start text-left">
              <span className="text-base font-serif text-foreground leading-tight">{opt.label}</span>
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">{opt.desc}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
