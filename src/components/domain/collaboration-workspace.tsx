"use client";

import { Check, MessageSquare, Users } from "lucide-react";
import {
  PageHeader,
  SelectionCard,
  Surface,
} from "@/components/workspace/workspace-primitives";

export function CollaborationWorkspace() {
  return (
    <div className="h-full overflow-y-auto pr-1">
      <div className="space-y-4">
        <Surface className="p-5">
          <PageHeader
            eyebrow="Collaboration & comments"
            title="Review decisions with clients, designers, and AI context"
            description="A professional approval layer for comments, annotations, collaborators, and design decisions."
          />
        </Surface>
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
          <Surface className="p-4">
            <div className="space-y-3">
              {[
                ["Mira Shah", "Keep the dining pendant, but soften the sofa profile.", "10:24"],
                ["Jon Reed", "Can we compare the TV wall in plaster and smoked mirror?", "10:31"],
                ["Atelier AI", "Generated two material alternatives for the media wall.", "10:42"],
              ].map(([name, message, time]) => (
                <div key={message} className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-sm font-medium">{name}</p>
                    <span className="font-mono text-[11px] text-white/34">{time}</span>
                  </div>
                  <p className="text-sm leading-6 text-white/52">{message}</p>
                </div>
              ))}
            </div>
          </Surface>
          <Surface className="p-4">
            <p className="text-sm font-medium">Approvals</p>
            <div className="mt-4 space-y-3">
              <SelectionCard title="Layout direction" detail="Approved by homeowner" active icon={Check} />
              <SelectionCard title="Material palette" detail="Needs review" icon={MessageSquare} />
              <SelectionCard title="Collaborators" detail="3 active reviewers" icon={Users} />
            </div>
          </Surface>
        </div>
      </div>
    </div>
  );
}
