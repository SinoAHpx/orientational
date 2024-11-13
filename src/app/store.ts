import { create } from "zustand";
import { defaultSettings, Settings } from "../models/settings.model";
import { Dialog } from "@fluentui/react-components";
import { ClassData, defaultClassData } from "../models/class-data.model";
import { produce } from "immer";
import { database, updateData, updateSettings } from "../utils/database";
import { getClassVisibility } from "../utils/time";

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
    classes: ClassData[];
}

interface GlobalAction {
    setSettings: (settings: Settings | null) => void;
    setCurrentWeek: (week: number) => void;
    setClasses: (classes: ClassData[]) => void;

    showUpdateDialog: (classData?: ClassData | null) => void;
    showSettingsDialog: (settings?: Settings | null) => void;
    closeUpdateDialog: (classData?: ClassData | null) => void;
    closeSettingsDialog: (settings?: Settings | null) => void;
}

const setDialogState = (
    draft: any,
    type: "update" | "settings",
    isOpen: boolean,
    data: any
) => {
    draft.dialog[type].open = isOpen;
    draft.dialog[type].data = data;
    if (!isOpen && data !== null && data !== undefined) {
        if (type == "update") {
            updateData(data);
            data.visible = getClassVisibility(
                database.data.memory.currentWeek,
                data
            );
        }
        if (type == "settings") {
            updateSettings(data);
        }
    }
};
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
    classes: [],
    setClasses: (classes) =>
        set(
            produce((draft) => {
                draft.classes = classes.map((cls) => ({
                    ...cls,
                    visible: getClassVisibility(
                        database.data.memory.currentWeek,
                        cls
                    ),
                }));
            })
        ),
    setSettings: (settings) =>
        set((state) => ({ ...state, settings: settings || state.settings })),
    setCurrentWeek: (week) => set((state) => ({ ...state, currentWeek: week })),
    showUpdateDialog: (data) =>
        set(produce((draft) => setDialogState(draft, "update", true, data))),
    showSettingsDialog: (settings) =>
        set(
            produce((draft) =>
                setDialogState(draft, "settings", true, settings)
            )
        ),
    closeUpdateDialog: (data) =>
        set(produce((draft) => setDialogState(draft, "update", false, data))),
    closeSettingsDialog: (settings) =>
        set(
            produce((draft) =>
                setDialogState(draft, "settings", false, settings)
            )
        ),
}));
