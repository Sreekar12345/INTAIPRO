"use client";

import {
  ArrowRight,
  Check,
  Coffee,
  CookingPot,
  Home,
  Lightbulb,
  ShieldCheck,
  Sofa,
  Sparkles,
  Users,
  WalletCards,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  PageHeader,
  SelectionCard,
  StatusPill,
  Surface,
} from "@/components/workspace/workspace-primitives";
import { designIntelligenceProfile } from "@/lib/product-data";
import { useQuestionnaireQuery } from "@/lib/queries";
import { useDesignWorkspaceStore } from "@/stores/design-workspace-store";

const icons = [Home, Sofa, Users, Lightbulb, WalletCards, ShieldCheck, Coffee, CookingPot];

export function QuestionnaireWorkspace() {
  const { data: sections = [] } = useQuestionnaireQuery();
  const step = useDesignWorkspaceStore((state) => state.questionnaireStep);
  const setStep = useDesignWorkspaceStore((state) => state.setQuestionnaireStep);
  const completed = useDesignWorkspaceStore((state) => state.completedQuestionnaireSections);
  const profileReady = useDesignWorkspaceStore((state) => state.designProfileReady);
  const completeSection = useDesignWorkspaceStore((state) => state.completeQuestionnaireSection);
  const completeDiscovery = useDesignWorkspaceStore((state) => state.completeDiscovery);
  const active = sections[step] ?? sections[0];
  const requiredIds = sections.filter((section) => section.required).map((section) => section.id);
  const completeCount = requiredIds.filter((id) => completed.includes(id)).length;
  const completion = Math.round((completeCount / Math.max(requiredIds.length, 1)) * 100);
  const canGenerateProfile =
    completeCount === requiredIds.length ||
    (active?.required &&
      step === sections.length - 1 &&
      requiredIds.every((id) => id === active.id || completed.includes(id)));

  return (
    <div className="h-full overflow-y-auto pr-1">
      <div className="space-y-4">
        <Surface className="p-5">
          <PageHeader
            eyebrow="Mandatory client discovery"
            title="Complete discovery before AI generation"
            description="The platform follows a professional interior design intake: household, lifestyle, function, style, budget, and technical constraints must be captured before generation unlocks."
            action={
              <StatusPill
                label={profileReady ? "Generation unlocked" : `${completion}% discovery complete`}
                tone={profileReady ? "cyan" : "neutral"}
              />
            }
          />
        </Surface>

        <Surface className="p-4">
          <div className="grid gap-2 md:grid-cols-6">
            {["Create Project", "Upload Plan", "AI Parses", "Discovery", "Profile", "Generate"].map(
              (label, index) => {
                const activeIndex = profileReady ? 5 : 3;
                const complete = index < activeIndex;
                const activeStep = index === activeIndex;
                return (
                  <div
                    key={label}
                    className={`rounded-xl border p-3 ${
                      activeStep
                        ? "border-cyan-100/24 bg-cyan-100/[0.045]"
                        : "border-white/[0.07] bg-white/[0.025]"
                    }`}
                  >
                    <span
                      className={`mb-4 grid size-6 place-items-center rounded-full border text-[11px] ${
                        complete
                          ? "border-cyan-100 bg-cyan-100 text-black"
                          : "border-white/[0.1] text-white/38"
                      }`}
                    >
                      {complete ? <Check className="size-3.5" /> : index + 1}
                    </span>
                    <p className="text-sm font-medium">{label}</p>
                  </div>
                );
              }
            )}
          </div>
        </Surface>

        <div className="grid gap-4 xl:grid-cols-[320px_minmax(0,1fr)_340px]">
          <Surface className="p-4">
            <p className="text-sm font-medium">Required discovery categories</p>
            <div className="mt-4 space-y-2">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => setStep(index)}
                  className={`w-full rounded-xl border p-3 text-left transition-colors hover:bg-white/[0.045] ${
                    step === index
                      ? "border-cyan-100/24 bg-cyan-100/[0.045]"
                      : "border-white/[0.07] bg-white/[0.025]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{section.title}</span>
                    {completed.includes(section.id) && <Check className="size-4 text-cyan-100" />}
                  </div>
                  <Progress
                    value={completed.includes(section.id) ? 100 : step === index ? 42 : 0}
                    className="mt-3 h-1.5 bg-white/[0.07]"
                  />
                </button>
              ))}
            </div>
            <Button
              className="mt-4 w-full rounded-xl bg-cyan-100 text-black hover:bg-cyan-50"
              disabled={!canGenerateProfile}
              onClick={() => completeDiscovery(requiredIds)}
            >
              Generate Design Intelligence Profile
            </Button>
          </Surface>

          <Surface className="p-6">
            {active && (
              <div className="mx-auto max-w-3xl">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-cyan-100/58">
                  {active.title}
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight">{active.prompt}</h2>
                <p className="mt-4 text-sm leading-6 text-white/48">{active.intent}</p>
                <div className="mt-5 rounded-2xl border border-cyan-100/14 bg-cyan-100/[0.045] p-4">
                  <div className="flex gap-3">
                    <Sparkles className="mt-0.5 size-4 shrink-0 text-cyan-100" />
                    <p className="text-sm leading-6 text-white/62">{active.recommendation}</p>
                  </div>
                </div>
                <div className="mt-8 grid gap-3 md:grid-cols-2">
                  {active.options.map((option, index) => (
                    <SelectionCard
                      key={option}
                      title={option}
                      detail="Use as an active planning signal"
                      active={index === 0}
                      icon={icons[index % icons.length]}
                    />
                  ))}
                </div>
                <div className="mt-8 flex items-center justify-between">
                  <Button
                    variant="outline"
                    className="rounded-xl border-white/[0.09] bg-transparent text-white/58 hover:bg-white/[0.055] hover:text-white"
                    onClick={() => setStep(Math.max(0, step - 1))}
                  >
                    Back
                  </Button>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="rounded-xl border-white/[0.09] bg-transparent text-white/70 hover:bg-white/[0.055] hover:text-white"
                      onClick={() => active && completeSection(active.id)}
                    >
                      Save progress
                    </Button>
                    <Button
                      className="rounded-xl bg-cyan-100 text-black hover:bg-cyan-50"
                      onClick={() => {
                        if (active) completeSection(active.id);
                        setStep(Math.min(sections.length - 1, step + 1));
                      }}
                    >
                      Continue
                      <ArrowRight className="size-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </Surface>

          <Surface className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium">Design Intelligence Profile</p>
                <p className="mt-1 text-xs text-white/38">
                  Foundation for layouts, furniture, moodboards, materials, lighting, and renders.
                </p>
              </div>
              <StatusPill label={profileReady ? "ready" : "locked"} tone={profileReady ? "cyan" : "locked"} />
            </div>
            <div className="mt-4 space-y-3">
              {Object.entries(designIntelligenceProfile).map(([key, value]) => (
                <div
                  key={key}
                  className={`rounded-xl border p-3 ${
                    profileReady
                      ? "border-white/[0.07] bg-white/[0.025]"
                      : "border-white/[0.04] bg-white/[0.015] opacity-45"
                  }`}
                >
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-white/34">
                    {key}
                  </p>
                  <p className="mt-2 text-sm leading-5 text-white/58">{value}</p>
                </div>
              ))}
            </div>
          </Surface>
        </div>
      </div>
    </div>
  );
}
