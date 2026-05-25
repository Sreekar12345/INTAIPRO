import { AppShell } from "@/components/app-shell/app-shell";
import { ProjectDashboard } from "@/components/domain/project-dashboard";

export default function DashboardPage() {
  return (
    <AppShell>
      <ProjectDashboard />
    </AppShell>
  );
}
