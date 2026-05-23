"use client";

import { AlertTriangle, Eye, Layers3, Ruler, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  InspectorPanel,
  MetricRow,
  MiniStageRail,
  PageHeader,
  PlanCanvas,
  StatusPill,
  Surface,
  UploadDropzone,
  WorkspaceFrame,
} from "@/components/workspace/workspace-primitives";
import { useRoomsQuery } from "@/lib/queries";
import { useDesignWorkspaceStore } from "@/stores/design-workspace-store";

export function UploadWorkspace() {
  const uploadPhase = useDesignWorkspaceStore((state) => state.uploadPhase);
  const setUploadPhase = useDesignWorkspaceStore((state) => state.setUploadPhase);
  const { data: rooms = [] } = useRoomsQuery();
  const hasPlan = uploadPhase !== "empty";

  return (
    <div className="h-full overflow-y-auto pr-1">
      <div className="space-y-4">
        <Surface className="p-5">
          <PageHeader
            eyebrow="Floor plan upload workspace"
            title="Parse, scale, and validate the plan"
            description="A CAD-lite intake workspace for upload, room detection overlays, scaling tools, measurements, and structural validation."
            action={
              <Button
                className="rounded-xl bg-cyan-100 text-black hover:bg-cyan-50"
                onClick={() => setUploadPhase(hasPlan ? "empty" : "detected")}
              >
                {hasPlan ? "Reset plan" : "Upload plan"}
              </Button>
            }
          />
        </Surface>

        {!hasPlan ? (
          <WorkspaceFrame
            center={<div className="p-4"><UploadDropzone onUpload={() => setUploadPhase("detected")} /></div>}
            right={<UploadInspector empty />}
          />
        ) : (
          <WorkspaceFrame
            left={
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Detected rooms</p>
                  <p className="mt-1 text-xs text-white/38">Editable room structure</p>
                </div>
                {rooms.map((room) => (
                  <button
                    key={room.id}
                    className="flex w-full items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] p-3 text-left"
                    type="button"
                  >
                    <Layers3 className="size-4 text-cyan-100/74" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">{room.name}</span>
                      <span className="text-xs text-white/38">{room.area} m2</span>
                    </span>
                    <span className="font-mono text-[11px] text-white/38">{room.confidence}%</span>
                  </button>
                ))}
              </div>
            }
            center={<PlanCanvas mode="analysis" />}
            right={<UploadInspector />}
            bottom={
              <Surface className="p-4">
                <MiniStageRail activeIndex={1} />
              </Surface>
            }
          />
        )}
      </div>
    </div>
  );
}

function UploadInspector({ empty = false }: { empty?: boolean }) {
  if (empty) {
    return (
      <InspectorPanel title="Plan inspector" subtitle="Waiting for upload">
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
          <p className="text-sm font-medium">Validation starts after upload.</p>
          <p className="mt-2 text-sm leading-6 text-white/44">
            The frontend is prepared for dimensions, structural warnings, windows,
            plumbing zones, layers, snapping, and annotation controls.
          </p>
        </div>
      </InspectorPanel>
    );
  }

  return (
    <InspectorPanel title="Plan inspector" subtitle="Dimensions and detection">
      <MetricRow label="Scale confidence" value={96} detail="Reference wall validated at 4200 mm" />
      <MetricRow label="Window detection" value={87} />
      <MetricRow label="Plumbing zones" value={74} />
      <div className="space-y-2">
        {([
          ["Dimensions", "Primary span 8.4 m", Ruler],
          ["Layers", "Walls, windows, annotations", Eye],
          ["Warnings", "Kitchen chase needs review", AlertTriangle],
        ] satisfies [string, string, LucideIcon][]).map(([title, detail, Icon]) => (
          <div key={String(title)} className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-3">
            <div className="flex items-center gap-2">
              <Icon className="size-4 text-cyan-100/74" />
              <p className="text-sm font-medium">{title}</p>
            </div>
            <p className="mt-1 text-xs text-white/40">{detail}</p>
          </div>
        ))}
      </div>
      <StatusPill label="Annotation layer active" tone="cyan" />
      <Progress value={72} className="h-1.5 bg-white/[0.07]" />
    </InspectorPanel>
  );
}
