import { create } from "zustand";

const useHabitStore = create((set) => ({
  habits: [],
  addHabit: (habit) =>
    set((state) => ({
      habits: [...state.habits, habit],
    })),
}));

export default useHabitStore;
