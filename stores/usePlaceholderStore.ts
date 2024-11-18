import { create } from 'zustand';

interface PlaceholderState {
  isBlocked: boolean;
  setBlocked: (blocked: boolean) => void;
}

const usePlaceholderStore = create<PlaceholderState>((set) => ({
  isBlocked: false,
  setBlocked: (blocked: boolean) => set({ isBlocked: blocked }),
}));

export default usePlaceholderStore;
