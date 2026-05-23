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

const latency = 180;

function wait<T>(value: T): Promise<T> {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(value), latency);
  });
}

export const designClient = {
  projects: () => wait(projects),
  project: (id: string) => wait(projects.find((project) => project.id === id) ?? projects[0]),
  rooms: () => wait(roomDetections),
  analysis: () => wait(analysisSignals),
  questionnaire: () => wait(questionnaireSections),
  layouts: () => wait(layoutVersions),
  materials: () => wait(materials),
  renders: () => wait(renderJobs),
  activity: () => wait(activityLog),
};
