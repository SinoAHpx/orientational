import { create } from "zustand";
import { defaultSettings, Settings } from "../models/settings.model";
import { Dialog } from "@fluentui/react-components";
import { ClassData, defaultClassData } from "../models/class-data.model";
import { produce } from "immer";

interface DialogData<T> {
    open: boolean;
    data: T | null;
}

interface Dialog {
    update: DialogData<ClassData>;
    settings: DialogData<Settings>;
}

interface GlobalState {
    currentWeek: number;
    settings: Settings;
    dialog: Dialog;
}

interface GlobalAction {
    setSettings: (settings: Settings | null) => void;
    setCurrentWeek: (week: number) => void;
    showUpdateDialog: (classData?: ClassData | null) => void;
    showSettingsDialog: (settings?: Settings | null) => void;
    hideUpdateDialog: () => void;
    hideSettingsDialog: () => void;
}

export const useGlobalState = create<GlobalState & GlobalAction>((set) => ({
    currentWeek: 0,
    settings: defaultSettings,
    dialog: {
        update: {
            open: false,
            data: defaultClassData,
        },
        settings: {
            open: false,
            data: defaultSettings,
        },
    },
    setSettings: (settings) =>
        set((state) => ({ ...state, settings: settings || state.settings })),
    setCurrentWeek: (week) => set((state) => ({ ...state, currentWeek: week })),
    showUpdateDialog: (data?: ClassData | null) =>
        set(
            produce((state) => {
                state.dialog.update = {
                    open: true,
                    data,
                };
            })
        ),
    showSettingsDialog: (settings?: Settings | null) =>
        set(
            produce((state) => {
                state.dialog.settings = {
                    open: true,
                    settings,
                };
            })
        ),
    hideUpdateDialog: () =>
        set(
            produce((state) => ({
                state.dialog.update = {
                    open: false
                }
            }))
        ),
    hideSettingsDialog: () =>
        set((state) => ({
            ...state,
            dialog: { update: false, settings: false },
        })),
}));
