"use client";

import { FileArchive, FileText, Image, Presentation } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  LockedRow,
  PageHeader,
  SelectionCard,
  Surface,
} from "@/components/workspace/workspace-primitives";

export function ExportCenter() {
  return (
    <div className="h-full overflow-y-auto pr-1">
      <div className="space-y-4">
        <Surface className="p-5">
          <PageHeader
            eyebrow="Export center"
            title="Package concepts into execution-ready outputs"
            description="Export PDFs, BOQ, renders, execution drawings, client presentations, branding presets, and documentation bundles."
            action={<Button className="rounded-xl bg-cyan-100 text-black hover:bg-cyan-50"><FileArchive className="size-4" />Build package</Button>}
          />
        </Surface>
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
          <Surface className="grid gap-3 p-4 md:grid-cols-2">
            <SelectionCard title="Client presentation" detail="Concept deck with narrative and selected renders" active icon={Presentation} />
            <SelectionCard title="Render pack" detail="High-resolution room images" icon={Image} />
            <SelectionCard title="Bill of quantities" detail="Material and furniture specification" icon={FileText} />
            <SelectionCard title="Execution drawings" detail="Plans, elevations, annotations" icon={FileArchive} />
          </Surface>
          <Surface className="p-4">
            <p className="text-sm font-medium">Export settings</p>
            <div className="mt-4 space-y-3">
              <LockedRow label="Studio branding" />
              <LockedRow label="Client watermark" />
              <LockedRow label="Metric dimensions" />
              <LockedRow label="Material SKU visibility" />
            </div>
          </Surface>
        </div>
      </div>
    </div>
  );
}
