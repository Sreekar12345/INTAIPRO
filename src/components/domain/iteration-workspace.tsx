"use client";

import { GitBranch, GitCompare, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  PageHeader,
  SelectionCard,
  Surface,
} from "@/components/workspace/workspace-primitives";
import { layoutVersions } from "@/lib/product-data";

export function IterationWorkspace() {
  return (
    <div className="h-full overflow-y-auto pr-1">
      <div className="space-y-4">
        <Surface className="p-5">
          <PageHeader
            eyebrow="Design iteration system"
            title="Branch concepts, compare changes, restore checkpoints"
            description="Versioning inspired by Figma history and Git branching, built for interior concept exploration and client approvals."
            action={<Button className="rounded-xl bg-cyan-100 text-black hover:bg-cyan-50"><GitBranch className="size-4" />New branch</Button>}
          />
        </Surface>
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
          <Surface className="p-4">
            <div className="space-y-3">
              {layoutVersions.map((version) => (
                <div key={version.id} className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{version.name}</p>
                      <p className="mt-1 font-mono text-xs text-white/34">{version.branch}</p>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-xl border-white/[0.09] bg-transparent text-white/56 hover:bg-white/[0.055] hover:text-white">Restore</Button>
                  </div>
                </div>
              ))}
            </div>
          </Surface>
          <Surface className="p-4">
            <p className="text-sm font-medium">Version tools</p>
            <div className="mt-4 space-y-3">
              <SelectionCard title="Compare concepts" detail="Side-by-side design review" active icon={GitCompare} />
              <SelectionCard title="Duplicate design" detail="Create a branch from current state" icon={GitBranch} />
              <SelectionCard title="Restore checkpoint" detail="Return to a previous approved version" icon={RotateCcw} />
            </div>
          </Surface>
        </div>
      </div>
    </div>
  );
}
