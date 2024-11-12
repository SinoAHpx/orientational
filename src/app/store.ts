import { create } from "zustand";
import { Settings } from "../models/settings.model";
import { Dialog } from "@fluentui/react-components";

interface Dialog {
    update: boolean;
    settings: boolean;
}

interface GlobalState {
    currentWeek: number;
    settings: Settings;
    dialog: Dialog;
}

interface GlobalAction {
    setSettings: (settings: Settings | null) => void;
    setCurrentWeek: (week: number) => void;
    showUpdateDialog: () => void;
    showSettingsDialog: () => void;
    hideUpdateDialog: () => void;
    hideSettingsDialog: () => void;
}

export const useGlobalState = create<GlobalState & GlobalAction>((set) => ({
    currentWeek: 0,
    settings: {
        firstWeek: new Date(),
        totalWeeks: 16,
    },
    dialog: {
        update: false,
        settings: false,
    },
    setSettings: (settings) =>
        set((state) => ({ ...state, settings: settings || state.settings })),
    setCurrentWeek: (week) => set((state) => ({ ...state, currentWeek: week })),
    showUpdateDialog: () =>
        set((state) => ({
            ...state,
            dialog: { update: true, settings: false },
        })),
    showSettingsDialog: () =>
        set((state) => ({
            ...state,
            dialog: { update: false, settings: true },
        })),
    hideUpdateDialog: () =>
        set((state) => ({
            ...state,
            dialog: { update: false, settings: false },
        })),
    hideSettingsDialog: () =>
        set((state) => ({
            ...state,
            dialog: { update: false, settings: false },
        })),
}));
