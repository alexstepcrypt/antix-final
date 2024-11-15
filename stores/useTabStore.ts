import { create } from 'zustand';

type Tab = "team" | "advisors";

interface ITabStore {
   tab: Tab;
   setTab: (tab: Tab) => void;
}

export const useTabStore = create<ITabStore>(set => ({
   tab: "team",
   setTab: (tab: Tab) => set({ tab })
}));