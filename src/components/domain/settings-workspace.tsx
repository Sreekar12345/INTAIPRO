"use client";

import { Bell, Palette, Shield, UserRound } from "lucide-react";
import {
  PageHeader,
  SelectionCard,
  Surface,
} from "@/components/workspace/workspace-primitives";

export function SettingsWorkspace() {
  return (
    <div className="h-full overflow-y-auto pr-1">
      <div className="space-y-4">
        <Surface className="p-5">
          <PageHeader
            eyebrow="Settings"
            title="Studio preferences and product configuration"
            description="User settings, brand controls, notification rules, workspace defaults, and AI safety preferences."
          />
        </Surface>
        <Surface className="grid gap-3 p-4 md:grid-cols-2 xl:grid-cols-4">
          <SelectionCard title="Profile" detail="Name, role, workspace access" icon={UserRound} />
          <SelectionCard title="Brand system" detail="Logo, typography, exports" icon={Palette} />
          <SelectionCard title="Notifications" detail="Approvals, renders, comments" icon={Bell} />
          <SelectionCard title="AI policy" detail="Budget, vendors, privacy" icon={Shield} />
        </Surface>
      </div>
    </div>
  );
}
