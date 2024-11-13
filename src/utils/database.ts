import { LocalStoragePreset } from "lowdb/browser";
import { ClassData } from "../models/class-data.model";
import { defaultSettings, Settings } from "../models/settings.model";

export const defaultData = {
    classes: [] as ClassData[],
    settings: defaultSettings,
    memory: {
        currentWeek: 1,
    },
};

export const database = await LocalStoragePreset("db.json", defaultData);

export const pushData = async (data: ClassData) => {
    database.data.classes.push({
        ...data,
        teacher: data.teacher || "",
    });
    await database.write();
};

export const updateData = async (data: ClassData) => {
    const removed = database.data.classes.filter(
        (d) => d.identifier != data.identifier
    );
    if (data.title != "delete") {
        removed.push(data);
    }

    database.data.classes = removed;

    await database.write();
};

export const updateSettings = async (settings: Settings) => {
    database.data.settings = settings;
    await database.write();
};

export const updateCurrentWeek = async (week: number) => {
    database.data.memory.currentWeek = week;
    await database.write();
};
