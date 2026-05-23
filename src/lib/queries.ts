import { useQuery } from "@tanstack/react-query";
import { designClient } from "@/lib/api/design-client";
import {
  activityLog,
  analysisSignals,
  layoutVersions,
  materials,
  projects,
  questionnaireSections,
  renderJobs,
  roomDetections,
} from "@/lib/product-data";

export const queryKeys = {
  projects: ["projects"] as const,
  project: (id: string) => ["project", id] as const,
  rooms: ["rooms"] as const,
  analysis: ["analysis"] as const,
  questionnaire: ["questionnaire"] as const,
  layouts: ["layouts"] as const,
  materials: ["materials"] as const,
  renders: ["renders"] as const,
  activity: ["activity"] as const,
};

export function useProjectsQuery() {
  return useQuery({
    queryKey: queryKeys.projects,
    queryFn: designClient.projects,
    initialData: projects,
  });
}

export function useProjectQuery(id: string) {
  return useQuery({
    queryKey: queryKeys.project(id),
    queryFn: () => designClient.project(id),
    initialData: projects.find((project) => project.id === id) ?? projects[0],
  });
}

export function useRoomsQuery() {
  return useQuery({
    queryKey: queryKeys.rooms,
    queryFn: designClient.rooms,
    initialData: roomDetections,
  });
}

export function useAnalysisQuery() {
  return useQuery({
    queryKey: queryKeys.analysis,
    queryFn: designClient.analysis,
    initialData: analysisSignals,
  });
}

export function useQuestionnaireQuery() {
  return useQuery({
    queryKey: queryKeys.questionnaire,
    queryFn: designClient.questionnaire,
    initialData: questionnaireSections,
  });
}

export function useLayoutsQuery() {
  return useQuery({
    queryKey: queryKeys.layouts,
    queryFn: designClient.layouts,
    initialData: layoutVersions,
  });
}

export function useMaterialsQuery() {
  return useQuery({
    queryKey: queryKeys.materials,
    queryFn: designClient.materials,
    initialData: materials,
  });
}

export function useRendersQuery() {
  return useQuery({
    queryKey: queryKeys.renders,
    queryFn: designClient.renders,
    initialData: renderJobs,
  });
}

export function useActivityQuery() {
  return useQuery({
    queryKey: queryKeys.activity,
    queryFn: designClient.activity,
    initialData: activityLog,
  });
}
