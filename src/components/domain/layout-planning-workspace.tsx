"use client";

import { Armchair, BedDouble, LampFloor, Sofa } from "lucide-react";
import {
  GenerationLock,
  LockedGenerateButton,
  useDiscoveryGate,
} from "@/components/domain/discovery-gate";
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
import { useLayoutsQuery } from "@/lib/queries";
import { useDesignWorkspaceStore } from "@/stores/design-workspace-store";

export function LayoutPlanningWorkspace() {
  const { data: layouts = [] } = useLayoutsQuery();
  const selectedLayoutId = useDesignWorkspaceStore((state) => state.selectedLayoutId);
  const selectLayout = useDesignWorkspaceStore((state) => state.selectLayout);
  const selected = layouts.find((layout) => layout.id === selectedLayoutId) ?? layouts[0];
  const gate = useDiscoveryGate();

  return (
    <div className="h-full overflow-y-auto pr-1">
      <div className="space-y-4">
        <Surface className="p-5">
          <PageHeader
            eyebrow="Layout planning workspace"
            title="Edit furniture layouts with AI-aware constraints"
            description="A canvas-based planning surface with smart snapping, spacing validation, ergonomic warnings, and layout versions."
            action={<LockedGenerateButton>Generate AI layout</LockedGenerateButton>}
          />
        </Surface>
        {gate.locked && <GenerationLock />}
        <WorkspaceFrame
          left={
            <div className="space-y-3">
              <p className="text-sm font-medium">Furniture library</p>
              <SelectionCard title="Sofas" detail="12 matched to budget" icon={Sofa} active />
              <SelectionCard title="Lounge chairs" detail="8 compact options" icon={Armchair} />
              <SelectionCard title="Lighting" detail="Floor, pendant, wall" icon={LampFloor} />
              <SelectionCard title="Bedroom" detail="Beds and storage" icon={BedDouble} />
            </div>
          }
          center={<PlanCanvas mode="layout" />}
          right={
            <InspectorPanel title="Layout inspector" subtitle={selected?.name ?? "No layout"}>
              <MetricRow label="Clearance score" value={selected?.clearanceScore ?? 0} />
              <MetricRow label="Storage gain" value={selected ? Number(selected.storageGain.replace(/\D/g, "")) : 0} detail={selected?.storageGain} />
              <div className="space-y-2">
                {selected?.notes.map((note) => (
                  <div key={note} className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-3 text-sm text-white/58">
                    {note}
                  </div>
                ))}
              </div>
              <StatusPill label="Snap and spacing validation on" tone="cyan" />
            </InspectorPanel>
          }
          bottom={
            <Surface className="p-4">
              <div className="grid gap-3 md:grid-cols-3">
                {layouts.map((layout) => (
                  <button
                    key={layout.id}
                    type="button"
                    onClick={() => selectLayout(layout.id)}
                    className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 text-left transition-colors hover:bg-white/[0.045]"
                  >
                    <p className="text-sm font-medium">{layout.name}</p>
                    <p className="mt-1 font-mono text-xs text-white/34">{layout.branch}</p>
                  </button>
                ))}
              </div>
            </Surface>
          }
        />
      </div>
    </div>
  );
}
