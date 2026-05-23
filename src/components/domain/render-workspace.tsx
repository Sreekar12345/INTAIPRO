"use client";

import { Camera, History, SlidersHorizontal } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import {
  GenerationLock,
  LockedGenerateButton,
  useDiscoveryGate,
} from "@/components/domain/discovery-gate";
import {
  InspectorPanel,
  PageHeader,
  PlanCanvas,
  SelectionCard,
  StatusPill,
  Surface,
  WorkspaceFrame,
} from "@/components/workspace/workspace-primitives";
import { useRendersQuery } from "@/lib/queries";
import { useDesignWorkspaceStore } from "@/stores/design-workspace-store";

export function RenderWorkspace() {
  const { data: jobs = [] } = useRendersQuery();
  const intensity = useDesignWorkspaceStore((state) => state.renderIntensity);
  const setRenderIntensity = useDesignWorkspaceStore((state) => state.setRenderIntensity);
  const gate = useDiscoveryGate();

  return (
    <div className="h-full overflow-y-auto pr-1">
      <div className="space-y-4">
        <Surface className="p-5">
          <PageHeader
            eyebrow="AI render workspace"
            title="Generate, refine, queue, and compare room renders"
            description="A generation studio with prompt refinement, camera controls, lighting settings, history, queue state, and before/after comparison."
            action={<LockedGenerateButton>Start render</LockedGenerateButton>}
          />
        </Surface>
        {gate.locked && <GenerationLock />}
        <WorkspaceFrame
          left={
            <div className="space-y-3">
              <p className="text-sm font-medium">Render queue</p>
              {jobs.map((job) => (
                <div key={job.id} className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{job.room}</p>
                    <StatusPill label={job.status} tone={job.status === "rendering" ? "cyan" : "neutral"} />
                  </div>
                  <Progress value={job.progress} className="mt-3 h-1.5 bg-white/[0.07]" />
                </div>
              ))}
            </div>
          }
          center={<PlanCanvas mode="render" />}
          right={
            <InspectorPanel title="Generation controls" subtitle="Prompt, camera, lighting">
              <Textarea className="min-h-32 rounded-2xl border-white/[0.08] bg-black/20" defaultValue="Warm minimal living room, smoked oak floor, low modular sofa, travertine table, soft afternoon light." />
              <SelectionCard title="Camera angle" detail="35 mm corner view" active icon={Camera} />
              <SelectionCard title="Lighting" detail="Soft afternoon with low glare" icon={SlidersHorizontal} />
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-white/48">Style intensity</span>
                  <span className="font-mono text-xs text-white/50">{intensity}</span>
                </div>
                <Slider value={[intensity]} max={100} step={1} onValueChange={([value]) => setRenderIntensity(value)} />
              </div>
              <LockedGenerateButton className="w-full">Generate variation</LockedGenerateButton>
            </InspectorPanel>
          }
          bottom={
            <Surface className="p-4">
              <div className="mb-4 flex items-center gap-2">
                <History className="size-4 text-cyan-100/74" />
                <p className="text-sm font-medium">Generation history</p>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                {jobs.map((job) => (
                  <div key={`${job.id}-history`} className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
                    <p className="text-sm font-medium">{job.room}</p>
                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-white/42">{job.prompt}</p>
                  </div>
                ))}
              </div>
            </Surface>
          }
        />
      </div>
    </div>
  );
}
