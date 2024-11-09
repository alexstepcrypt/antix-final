import { create } from "zustand";

interface StageState {
    price: number | null;
    discount: number | null;
    setPrice: (price: number) => void;
    setDiscount: (discount: number) => void;
}

const useStageStore = create<StageState>((set) => ({
    price: null,
    discount: null,
    setPrice: (price) => set({ price }),
    setDiscount: (discount) => set({ discount }),
}));

export default useStageStore;
