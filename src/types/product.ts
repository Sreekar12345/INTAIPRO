import type { LucideIcon } from "lucide-react";

export type StageKey =
  | "intake"
  | "analysis"
  | "questionnaire"
  | "layouts"
  | "moodboards"
  | "materials"
  | "renders"
  | "documentation";

export type WorkspaceRoute = {
  href: string;
  label: string;
  icon: LucideIcon;
  stage?: StageKey;
};

export type Project = {
  id: string;
  name: string;
  location: string;
  squareFeet: number;
  styleDirection: string;
  stage: StageKey;
  progress: number;
  lastEdited: string;
  collaborators: string[];
  generationStatus: "idle" | "analyzing" | "generating" | "ready" | "review";
  thumbnail: string;
};

export type RoomDetection = {
  id: string;
  name: string;
  area: number;
  confidence: number;
  warnings: string[];
};

export type AnalysisSignal = {
  id: string;
  title: string;
  detail: string;
  score: number;
  type: "circulation" | "sunlight" | "storage" | "privacy" | "ventilation";
};

export type QuestionnaireSection = {
  id: string;
  title: string;
  prompt: string;
  progress: number;
  required: boolean;
  intent: string;
  recommendation: string;
  options: string[];
};

export type DesignIntelligenceProfile = {
  household: string;
  lifestyle: string;
  function: string;
  style: string;
  budget: string;
  constraints: string;
};

export type LayoutVersion = {
  id: string;
  name: string;
  branch: string;
  clearanceScore: number;
  storageGain: string;
  notes: string[];
};

export type MaterialItem = {
  id: string;
  name: string;
  category: string;
  finish: string;
  priceBand: string;
  tone: string;
  favorite: boolean;
};

export type RenderJob = {
  id: string;
  room: string;
  prompt: string;
  status: "queued" | "rendering" | "complete";
  camera: string;
  lighting: string;
  progress: number;
};
