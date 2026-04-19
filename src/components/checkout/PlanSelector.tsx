"use client";

import { Icon } from "@/components/ui/Icon";

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
  dailyPrice: number;
  selectedPlan: string | null;
  onSelect: (planId: string) => void;
};

export function PlanSelector({ dailyPrice, selectedPlan, onSelect }: Props) {
  const plans: Plan[] = [
    {
      id: "weekly",
      name: "Weekly",
      period: "7 days",
      pricePerDay: dailyPrice,
      totalPrice: dailyPrice * 7,
    },
    {
      id: "monthly",
      name: "Monthly",
      period: "30 days",
      pricePerDay: Math.round(dailyPrice * 0.9),
      totalPrice: Math.round(dailyPrice * 0.9) * 30,
      savings: "Save 10%",
      popular: true,
    },
    {
      id: "quarterly",
      name: "Quarterly",
      period: "90 days",
      pricePerDay: Math.round(dailyPrice * 0.8),
      totalPrice: Math.round(dailyPrice * 0.8) * 90,
      savings: "Save 20%",
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      {plans.map((plan) => (
        <button
          key={plan.id}
          type="button"
          onClick={() => onSelect(plan.id)}
          className={`relative flex items-center justify-between rounded-[16px] border px-5 py-5 text-left transition-all ${
            selectedPlan === plan.id
              ? "border-accent bg-accent/5 shadow-md"
              : "border-[var(--color-border)] bg-background hover:border-accent/30"
          }`}
        >
          {plan.popular && (
            <span className="absolute -top-2.5 right-4 rounded-full bg-accent px-3 py-0.5 text-[10px] font-medium text-white">
              Most popular
            </span>
          )}
          <div>
            <div className="text-base font-medium text-foreground">{plan.name}</div>
            <div className="mt-0.5 text-xs text-muted-foreground">{plan.period}</div>
          </div>
          <div className="text-right">
            <div className="font-serif text-lg text-foreground">
              &#x20B9;{plan.pricePerDay}/day
            </div>
            <div className="text-xs text-muted-foreground">
              &#x20B9;{plan.totalPrice.toLocaleString("en-IN")} total
            </div>
            {plan.savings && (
              <span className="mt-1 inline-block rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-medium text-green-700">
                {plan.savings}
              </span>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}
