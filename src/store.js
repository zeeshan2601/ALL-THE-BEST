import { create } from "zustand";

export const useStore = create((set) => ({
  name: "",
  stage: "input",
  noClicks: 0,

  setName: (name) => set({ name }),
  goToQuestion: () => set({ stage: "question" }),
  clickNo: () => set((state) => ({ noClicks: state.noClicks + 1 })),
  clickYes: () => set({ stage: "wishes" }),
  reset: () => set({ name: "", stage: "input", noClicks: 0 }),
}));