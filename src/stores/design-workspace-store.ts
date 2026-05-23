import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { StageKey } from "@/types/product";

export type UploadPhase = "empty" | "uploading" | "parsing" | "detected";

type DesignWorkspaceState = {
  activeProjectId: string;
  activeStage: StageKey;
  uploadPhase: UploadPhase;
  selectedRoomId: string;
  selectedLayoutId: string;
  renderIntensity: number;
  questionnaireStep: number;
  completedQuestionnaireSections: string[];
  designProfileReady: boolean;
  compareMode: boolean;
  setActiveProject: (id: string) => void;
  setActiveStage: (stage: StageKey) => void;
  setUploadPhase: (phase: UploadPhase) => void;
  selectRoom: (id: string) => void;
  selectLayout: (id: string) => void;
  setRenderIntensity: (value: number) => void;
  setQuestionnaireStep: (step: number) => void;
  completeQuestionnaireSection: (id: string) => void;
  completeDiscovery: (ids: string[]) => void;
  toggleCompareMode: () => void;
};

export const useDesignWorkspaceStore = create<DesignWorkspaceState>()(
  persist(
    (set) => ({
      activeProjectId: "hudson-loft",
      activeStage: "intake",
      uploadPhase: "empty",
      selectedRoomId: "living",
      selectedLayoutId: "layout-a",
      renderIntensity: 62,
      questionnaireStep: 0,
      completedQuestionnaireSections: [],
      designProfileReady: false,
      compareMode: false,
      setActiveProject: (id) => set({ activeProjectId: id }),
      setActiveStage: (stage) => set({ activeStage: stage }),
      setUploadPhase: (phase) => set({ uploadPhase: phase }),
      selectRoom: (id) => set({ selectedRoomId: id }),
      selectLayout: (id) => set({ selectedLayoutId: id }),
      setRenderIntensity: (value) => set({ renderIntensity: value }),
      setQuestionnaireStep: (step) => set({ questionnaireStep: step }),
      completeQuestionnaireSection: (id) =>
        set((state) => ({
          completedQuestionnaireSections: state.completedQuestionnaireSections.includes(id)
            ? state.completedQuestionnaireSections
            : [...state.completedQuestionnaireSections, id],
        })),
      completeDiscovery: (ids) =>
        set({
          completedQuestionnaireSections: ids,
          designProfileReady: true,
          activeStage: "layouts",
        }),
      toggleCompareMode: () => set((state) => ({ compareMode: !state.compareMode })),
    }),
    {
      name: "interior-design-workspace",
      partialize: (state) => ({
        activeProjectId: state.activeProjectId,
        activeStage: state.activeStage,
        uploadPhase: state.uploadPhase,
        selectedRoomId: state.selectedRoomId,
        selectedLayoutId: state.selectedLayoutId,
        renderIntensity: state.renderIntensity,
        questionnaireStep: state.questionnaireStep,
        completedQuestionnaireSections: state.completedQuestionnaireSections,
        designProfileReady: state.designProfileReady,
        compareMode: state.compareMode,
      }),
      storage: createJSONStorage(() => localStorage),
    }
  )
);
