import Link from "next/link";
import { ArrowRight, Building2, Home, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const onboarding = [
  { icon: Building2, title: "Studio profile", detail: "Set your role, services, and project type." },
  { icon: Home, title: "Project defaults", detail: "Choose units, room taxonomy, and export presets." },
  { icon: Users, title: "Client workflow", detail: "Configure approvals, comments, and presentation style." },
  { icon: Sparkles, title: "AI constraints", detail: "Define budget, vendors, privacy, and generation guardrails." },
];

export default function OnboardingPage() {
  return (
    <main className="min-h-screen bg-[#080909] p-6 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-48px)] max-w-6xl flex-col justify-center">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-cyan-100/58">
          Onboarding
        </p>
        <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight">
          Configure the workspace before the first floor plan.
        </h1>
        <Progress value={38} className="mt-8 h-1.5 max-w-2xl bg-white/[0.07]" />
        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {onboarding.map((item, index) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="rounded-2xl border border-white/[0.08] bg-[#111212]/88 p-5">
                <Icon className={index === 0 ? "size-5 text-cyan-100" : "size-5 text-white/44"} />
                <p className="mt-6 text-sm font-medium">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-white/46">{item.detail}</p>
              </article>
            );
          })}
        </div>
        <Button asChild className="mt-8 w-fit rounded-xl bg-cyan-100 text-black hover:bg-cyan-50">
          <Link href="/dashboard">
            Enter workspace
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </main>
  );
}
