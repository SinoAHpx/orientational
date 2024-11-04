import { LocalStoragePreset } from "lowdb/browser";
import { ClassData } from "../../models/class-data.model";
import { Settings } from "../../models/settings.model";

export const database = await LocalStoragePreset("db.json", {
    classes: [] as ClassData[],
    settings: {
        firstWeek: new Date(),
        totalWeeks: 16,
        currentWeek: 1
    } as Settings,
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
    console.log(data);
    if (data.title != "delete") {
        console.log('this should not display');
        
        removed.push(data);
    }
    console.log(removed);
    
    database.data.classes = removed;

    await database.write();
};
