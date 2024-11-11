import { create } from "zustand";
import { Settings } from "../models/settings.model";

interface GlobalState {
    currentWeek: number;
    settings: Settings;
}

interface GlobalAction {
    setSettings: (settings: Settings | null) => void;
    setCurrentWeek: (week: number) => void;
}

export const uesGlobalState = create<GlobalState & GlobalAction>((set) => ({
    currentWeek: 0,
    settings: {
        firstWeek: new Date(),
        totalWeeks: 16,
    },
    setCurrentWeek: (week) => set((state) => ({ ...state, currentWeek: week })),
    setSettings: (settings) =>
        set((state) => {
            return settings != null ? { ...state, settings: settings } : state;
        }),
}));
