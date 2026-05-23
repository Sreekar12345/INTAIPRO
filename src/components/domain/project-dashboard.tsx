"use client";

import Link from "next/link";
import { ArrowRight, CircleDot, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  PageHeader,
  ProjectThumbnail,
  Surface,
  StatusPill,
} from "@/components/workspace/workspace-primitives";
import { activityLog, workflowStages } from "@/lib/product-data";
import { useProjectsQuery } from "@/lib/queries";
import { cn } from "@/lib/utils";

export function ProjectDashboard() {
  const { data: projects = [] } = useProjectsQuery();
  const activeProject = projects[0];

  return (
    <ScrollArea className="h-full rounded-[1.25rem]">
      <div className="space-y-4 pr-1">
        <Surface className="p-5">
          <PageHeader
            eyebrow="Project dashboard"
            title="Design work in progress"
            description="A focused command center for active interiors, AI processing states, collaborators, and the next workflow action."
            action={
              <Button asChild className="rounded-xl bg-cyan-100 text-black hover:bg-cyan-50">
                <Link href="/uploads">
                  Upload floor plan
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            }
          />
        </Surface>

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
          <Surface className="p-4">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Projects</p>
                <p className="mt-1 text-xs text-white/40">
                  Professional workspace cards with current stage and AI status.
                </p>
              </div>
              <StatusPill label={`${projects.length} active`} tone="cyan" />
            </div>
            <div className="grid gap-3 lg:grid-cols-2 2xl:grid-cols-3">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  href="/uploads"
                  className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] transition-colors hover:bg-white/[0.045]"
                >
                  <ProjectThumbnail
                    src={project.thumbnail}
                    alt={`${project.name} project thumbnail`}
                    className="h-40 rounded-none"
                  />
                  <div className="p-4">
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{project.name}</p>
                        <p className="mt-1 text-xs text-white/40">
                          {project.squareFeet.toLocaleString()} sq ft / {project.styleDirection}
                        </p>
                      </div>
                      <Badge
                        className={cn(
                          "rounded-full text-[11px]",
                          project.generationStatus === "generating"
                            ? "bg-cyan-100/12 text-cyan-100"
                            : "bg-white/[0.055] text-white/52"
                        )}
                      >
                        {project.generationStatus}
                      </Badge>
                    </div>
                    <div className="mb-2 flex items-center justify-between text-xs">
                      <span className="capitalize text-white/42">{project.stage}</span>
                      <span className="font-mono text-white/46">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-1.5 bg-white/[0.07]" />
                    <div className="mt-4 flex items-center justify-between text-xs text-white/38">
                      <span>{project.lastEdited}</span>
                      <span className="inline-flex items-center gap-1.5">
                        <Users className="size-3.5" />
                        {project.collaborators.length}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Surface>

          <Surface className="p-4">
            <p className="text-sm font-medium">Recent activity</p>
            <div className="mt-4 space-y-3">
              {activityLog.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={`${item.time}-${item.label}`} className="flex gap-3">
                    <span className="grid size-8 shrink-0 place-items-center rounded-xl border border-white/[0.07] bg-white/[0.03]">
                      <Icon className="size-4 text-cyan-100/76" />
                    </span>
                    <div>
                      <p className="text-sm leading-5 text-white/72">{item.label}</p>
                      <p className="mt-1 font-mono text-[11px] text-white/34">{item.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Surface>
        </div>

        <Surface className="p-4">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-medium">Current design stages</p>
            <StatusPill label={activeProject?.name ?? "No project"} />
          </div>
          <div className="grid gap-2 md:grid-cols-4 xl:grid-cols-8">
            {workflowStages.map((stage, index) => {
              const Icon = stage.icon;
              const complete = index < 3;
              return (
                <div
                  key={stage.key}
                  className={cn(
                    "rounded-2xl border border-white/[0.07] bg-white/[0.025] p-3",
                    complete && "border-cyan-100/18 bg-cyan-100/[0.035]"
                  )}
                >
                  <div className="mb-5 flex items-center justify-between">
                    <Icon className={cn("size-4", complete ? "text-cyan-100" : "text-white/36")} />
                    {complete && <CircleDot className="size-2.5 fill-cyan-100 text-cyan-100" />}
                  </div>
                  <p className="text-sm font-medium">{stage.label}</p>
                </div>
              );
            })}
          </div>
        </Surface>
      </div>
    </ScrollArea>
  );
}
