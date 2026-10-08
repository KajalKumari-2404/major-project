import { create } from "zustand";

const useUIStore = create((set) => ({
  isDarkMode: false,

  toggleDarkMode: () =>
    set((state) => ({
      isDarkMode: !state.isDarkMode,
    })),
}));

export default useUIStore;