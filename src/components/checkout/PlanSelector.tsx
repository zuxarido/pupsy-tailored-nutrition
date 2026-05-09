"use client";

import { Icon } from "@/components/ui/Icon";
import { getPricing } from "@/lib/pricing";

type Plan = {
  id: string;
  name: string;
  period: string;
  pricePerDay: number;
  totalPrice: number;
  savings?: string;
  popular?: boolean;
};

type Props = {
  dailyGrams: number;
  selectedPlan: string | null;
  onSelect: (planId: string) => void;
  planType: "full" | "half";
  onTypeChange: (type: "full" | "half") => void;
};

export function PlanSelector({ dailyGrams, selectedPlan, onSelect, planType, onTypeChange }: Props) {
  const pricingData = getPricing(dailyGrams || 500);
  const pricing = planType === "full" ? pricingData.full : pricingData.half;

  const weeklyDailyEquiv = Math.round(pricing.weekly / 7);
  const monthlyDailyEquiv = Math.round(pricing.monthly / 30);
  
  // Calculate savings compared to weekly
  const monthlySavingsPct = Math.round(((weeklyDailyEquiv - monthlyDailyEquiv) / weeklyDailyEquiv) * 100);

  const plans: Plan[] = [
    {
      id: "daily",
      name: "Daily",
      period: "1 day trial",
      pricePerDay: pricing.daily,
      totalPrice: pricing.daily,
    },
    {
      id: "weekly",
      name: "Weekly",
      period: "7 days",
      pricePerDay: weeklyDailyEquiv,
      totalPrice: pricing.weekly,
    },
    {
      id: "monthly",
      name: "Monthly",
      period: "30 days",
      pricePerDay: monthlyDailyEquiv,
      totalPrice: pricing.monthly,
      savings: `Save ${monthlySavingsPct}%`,
      popular: true,
    }
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Plan Type Toggle */}
      <div className="flex flex-col gap-3">
        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Plan Type</label>
        <div className="flex p-1 bg-muted/30 rounded-xl border border-[var(--color-border)]">
          <button
            onClick={() => onTypeChange("full")}
            className={`flex-1 py-3 text-sm font-medium rounded-lg transition-all ${planType === "full" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
          >
            Full Plan (2 meals)
          </button>
          <button
            onClick={() => onTypeChange("half")}
            className={`flex-1 py-3 text-sm font-medium rounded-lg transition-all ${planType === "half" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
          >
            Topper (1 meal)
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {plans.map((plan) => (
          <button
            key={plan.id}
            type="button"
            onClick={() => onSelect(plan.id)}
            className={`relative flex items-center justify-between rounded-[16px] border px-6 py-6 text-left transition-all ${
              selectedPlan === plan.id
                ? "border-accent bg-accent/5 shadow-md"
                : "border-[var(--color-border)] bg-background hover:border-accent/30"
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-3 right-6 rounded-full bg-accent px-4 py-1 text-[11px] font-bold text-white uppercase tracking-widest shadow-sm">
                Best Value
              </span>
            )}
            <div>
              <div className="text-lg font-serif text-foreground">{plan.name}</div>
              <div className="mt-1 text-sm text-muted-foreground">{plan.period}</div>
            </div>
            <div className="text-right">
              <div className="font-serif text-xl text-foreground">
                &#x20B9;{plan.pricePerDay}<span className="text-sm font-sans">/day</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                &#x20B9;{plan.totalPrice.toLocaleString("en-IN")} total
              </div>
              {plan.savings && (
                <span className="mt-2 inline-block rounded-full bg-green-100 px-3 py-1 text-[11px] font-bold text-green-800 tracking-wide">
                  {plan.savings}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
