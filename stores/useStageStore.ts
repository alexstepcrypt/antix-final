import { create } from "zustand";

interface StageState {
    stageData: any;
    setStageData: (data: any) => void;
}


const useStageStore = create<StageState>((set) => ({
  stageData: null,
  setStageData: (data) => set({ stageData: data }),
}));

export default useStageStore;

