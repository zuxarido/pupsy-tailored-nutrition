"use client";

import { useState, useEffect } from "react";
import { QuestionnaireLayout } from "@/components/questionnaire/QuestionnaireLayout";
import { StepOwnerName } from "@/components/questionnaire/StepOwnerName";
import { StepName } from "@/components/questionnaire/StepName";
import { StepBreed } from "@/components/questionnaire/StepBreed";
import { StepAge } from "@/components/questionnaire/StepAge";
import { StepSex } from "@/components/questionnaire/StepSex";
import { StepWeight } from "@/components/questionnaire/StepWeight";
import { StepBodyCondition } from "@/components/questionnaire/StepBodyCondition";
import { StepActivity } from "@/components/questionnaire/StepActivity";
import { StepHealth } from "@/components/questionnaire/StepHealth";
import { StepCurrentFood } from "@/components/questionnaire/StepCurrentFood";
import { StepResults } from "@/components/questionnaire/StepResults";
import { defaultProfile } from "@/types/dog-profile";
import type { DogProfile } from "@/types/dog-profile";
import { Icon } from "@/components/ui/Icon";

export type { DogProfile };

const STORAGE_KEY = "pupsy_dog_profile";
const STEP_KEY = "pupsy_step";
const TOTAL_STEPS = 11;

export default function GetStartedPage() {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<DogProfile>(defaultProfile);
  const [showResume, setShowResume] = useState(false);
  const [savedStep, setSavedStep] = useState(1);

  // Check for saved progress on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const rawStep = localStorage.getItem(STEP_KEY);
      if (raw && rawStep) {
        const parsed = JSON.parse(raw) as DogProfile;
        const parsedStep = parseInt(rawStep, 10);
        if (parsed.name && parsedStep > 1) {
          setProfile(parsed);
          setSavedStep(parsedStep);
          setShowResume(true);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Persist on change
  useEffect(() => {
    if (step > 1) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      localStorage.setItem(STEP_KEY, String(step));
    }
  }, [profile, step]);

  const update = (patch: Partial<DogProfile>) => {
    setProfile((prev) => ({ ...prev, ...patch }));
  };

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  // Resume prompt
  if (showResume) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6">
        <div className="w-full max-w-[400px] text-center">
          <Icon name="paw" size={40} className="text-accent mx-auto" />
          <h2 className="headline-xl mt-4 text-2xl text-foreground">
            Welcome back!
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            You were building a plan for <strong>{profile.name}</strong> (step {savedStep} of {TOTAL_STEPS}).
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <button
              onClick={() => {
                setStep(savedStep);
                setShowResume(false);
              }}
              className="btn-pill-primary w-full"
            >
              Continue where I left off
            </button>
            <button
              onClick={() => {
                setProfile(defaultProfile);
                setStep(1);
                setShowResume(false);
                localStorage.removeItem(STORAGE_KEY);
                localStorage.removeItem(STEP_KEY);
              }}
              className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
            >
              Start over
            </button>
          </div>
        </div>
      </div>
    );
  }

  const stepProps = { profile, update, next };

  return (
    <QuestionnaireLayout step={step} totalSteps={TOTAL_STEPS} onBack={back}>
      {step === 1 && <StepOwnerName {...stepProps} />}
      {step === 2 && <StepName {...stepProps} />}
      {step === 3 && <StepBreed {...stepProps} />}
      {step === 4 && <StepAge {...stepProps} />}
      {step === 5 && <StepSex {...stepProps} />}
      {step === 6 && <StepWeight {...stepProps} />}
      {step === 7 && <StepBodyCondition {...stepProps} />}
      {step === 8 && <StepActivity {...stepProps} />}
      {step === 9 && <StepHealth {...stepProps} />}
      {step === 10 && <StepCurrentFood {...stepProps} />}
      {step === 11 && <StepResults profile={profile} />}
    </QuestionnaireLayout>
  );
}
