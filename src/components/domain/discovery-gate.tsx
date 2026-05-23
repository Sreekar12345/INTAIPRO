"use client";

import Link from "next/link";
import { Lock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { questionnaireSections } from "@/lib/product-data";
import { useDesignWorkspaceStore } from "@/stores/design-workspace-store";
import { cn } from "@/lib/utils";

export function useDiscoveryGate() {
  const completed = useDesignWorkspaceStore(
    (state) => state.completedQuestionnaireSections
  );
  const profileReady = useDesignWorkspaceStore((state) => state.designProfileReady);
  const requiredIds = questionnaireSections
    .filter((section) => section.required)
    .map((section) => section.id);
  const completeCount = requiredIds.filter((id) => completed.includes(id)).length;
  const percent = Math.round((completeCount / requiredIds.length) * 100);

  return {
    locked: !profileReady,
    profileReady,
    completeCount,
    totalCount: requiredIds.length,
    percent,
    requiredIds,
  };
}

export function GenerationLock({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const gate = useDiscoveryGate();

  if (!gate.locked) {
    return (
      <div
        className={cn(
          "rounded-2xl border border-cyan-100/18 bg-cyan-100/[0.055] p-4",
          className
        )}
      >
        <div className="flex items-start gap-3">
          <Sparkles className="mt-0.5 size-4 text-cyan-100" />
          <div>
            <p className="text-sm font-medium text-white">
              Design Intelligence Profile ready
            </p>
            <p className="mt-1 text-xs leading-5 text-white/48">
              AI design generation is unlocked for layouts, moodboards, materials,
              lighting, and renders.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-white/[0.08] bg-black/20">
          <Lock className="size-4 text-cyan-100" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-white">
            Complete Design Discovery To Unlock AI Design Generation
          </p>
          {!compact && (
            <p className="mt-1 text-xs leading-5 text-white/46">
              Professional design generation stays locked until project creation,
              floor plan parsing, and all required client discovery categories are
              complete.
            </p>
          )}
          <div className="mt-3 flex items-center gap-3">
            <Progress value={gate.percent} className="h-1.5 bg-white/[0.07]" />
            <span className="whitespace-nowrap font-mono text-[11px] text-white/38">
              {gate.completeCount}/{gate.totalCount}
            </span>
          </div>
          <Button
            asChild
            size="sm"
            className="mt-4 rounded-xl bg-cyan-100 text-black hover:bg-cyan-50"
          >
            <Link href="/questionnaire">Continue discovery</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export function LockedGenerateButton({
  children = "Generate Design",
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const gate = useDiscoveryGate();

  if (!gate.locked) {
    return (
      <Button className={cn("rounded-xl bg-cyan-100 text-black hover:bg-cyan-50", className)}>
        <Sparkles className="size-4" />
        {children}
      </Button>
    );
  }

  return (
    <Button
      disabled
      className={cn(
        "rounded-xl bg-white/[0.08] text-white/34 hover:bg-white/[0.08]",
        className
      )}
    >
      <Lock className="size-4" />
      Discovery required
    </Button>
  );
}
