"use client";

import { Pin, SplitSquareVertical, Star } from "lucide-react";
import {
  GenerationLock,
  LockedGenerateButton,
  useDiscoveryGate,
} from "@/components/domain/discovery-gate";
import {
  PageHeader,
  SelectionCard,
  Surface,
} from "@/components/workspace/workspace-primitives";
import { materials } from "@/lib/product-data";

export function MoodboardWorkspace() {
  const gate = useDiscoveryGate();

  return (
    <div className="h-full overflow-y-auto pr-1">
      <div className="space-y-4">
        <Surface className="p-5">
          <PageHeader
            eyebrow="Moodboard generator"
            title="Explore style, texture, palette, and atmosphere"
            description="AI-generated boards can be pinned, compared, branched, and saved into the design system for downstream renders and documentation."
            action={<LockedGenerateButton>Generate moodboard</LockedGenerateButton>}
          />
        </Surface>
        {gate.locked && <GenerationLock />}
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
          <Surface className={`p-4 ${gate.locked ? "opacity-55" : ""}`}>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {["Warm minimal", "Gallery calm", "Soft brutalism", "Natural monochrome", "Quiet luxury", "Compact Japandi"].map((board, index) => (
                <div key={board} className="min-h-64 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4">
                  <div className="mb-6 grid grid-cols-3 gap-2">
                    {materials.slice(index % 3, index % 3 + 3).map((item) => (
                      <div key={item.id} className="h-24 rounded-xl border border-white/[0.08]" style={{ backgroundColor: item.tone }} />
                    ))}
                  </div>
                  <p className="text-sm font-medium">{board}</p>
                  <p className="mt-1 text-xs text-white/40">Palette, texture, lighting mood</p>
                  <div className="mt-4 flex gap-2">
                    <Pin className="size-4 text-cyan-100/74" />
                    <SplitSquareVertical className="size-4 text-white/42" />
                  </div>
                </div>
              ))}
            </div>
          </Surface>
          <Surface className="p-4">
            <p className="text-sm font-medium">Saved variation controls</p>
            <div className="mt-4 space-y-3">
              <SelectionCard title="Pin material logic" detail="Lock palette for render prompts" active icon={Pin} />
              <SelectionCard title="Compare boards" detail="Side-by-side client review" icon={SplitSquareVertical} />
              <SelectionCard
                title={gate.locked ? "Promote style locked" : "Promote style"}
                detail={gate.locked ? "Complete discovery first" : "Use in layouts and renders"}
                icon={Star}
              />
            </div>
          </Surface>
        </div>
      </div>
    </div>
  );
}
