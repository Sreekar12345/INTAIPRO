"use client";

import { Activity, Eye, Sun, Wind } from "lucide-react";
import {
  InspectorPanel,
  MetricRow,
  PageHeader,
  PlanCanvas,
  SelectionCard,
  StatusPill,
  Surface,
  WorkspaceFrame,
} from "@/components/workspace/workspace-primitives";
import { useAnalysisQuery } from "@/lib/queries";

export function AnalysisWorkspace() {
  const { data: signals = [] } = useAnalysisQuery();

  return (
    <div className="h-full overflow-y-auto pr-1">
      <div className="space-y-4">
        <Surface className="p-5">
          <PageHeader
            eyebrow="AI analysis workspace"
            title="Understand circulation, light, privacy, and storage"
            description="The intelligence layer overlays spatial signals on the plan and exposes reasoning for professional review."
            action={<StatusPill label="4 suggestions found" tone="cyan" />}
          />
        </Surface>
        <WorkspaceFrame
          left={
            <div className="space-y-3">
              <p className="text-sm font-medium">Analysis overlays</p>
              <SelectionCard title="Circulation" detail="Path width and turning radius" active icon={Activity} />
              <SelectionCard title="Sunlight" detail="Glare and daylight direction" icon={Sun} />
              <SelectionCard title="Ventilation" detail="Cross-flow opportunities" icon={Wind} />
              <SelectionCard title="Privacy" detail="Sightlines and thresholds" icon={Eye} />
            </div>
          }
          center={<PlanCanvas mode="analysis" />}
          right={
            <InspectorPanel title="AI reasoning" subtitle="Expandable spatial findings">
              {signals.map((signal) => (
                <div key={signal.id} className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-sm font-medium">{signal.title}</p>
                    <span className="font-mono text-xs text-white/46">{signal.score}%</span>
                  </div>
                  <p className="text-xs leading-5 text-white/44">{signal.detail}</p>
                </div>
              ))}
            </InspectorPanel>
          }
          bottom={
            <Surface className="grid gap-4 p-4 md:grid-cols-4">
              <MetricRow label="Circulation" value={92} />
              <MetricRow label="Dead space" value={71} />
              <MetricRow label="Sunlight fit" value={86} />
              <MetricRow label="Storage opportunity" value={89} />
            </Surface>
          }
        />
      </div>
    </div>
  );
}
