import { LocalStoragePreset } from "lowdb/browser";
import { ClassData } from "../../models/class-data.model";

export const database = await LocalStoragePreset("db.json", {
    classes: [] as ClassData[],
});

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
    removed.push(data);
    database.data.classes = removed;

    await database.write();
};
