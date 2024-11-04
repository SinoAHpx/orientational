import { LocalStoragePreset } from "lowdb/browser";
import { ClassData } from "../../models/class-data.model";

export const database = await LocalStoragePreset("db.json", {
    classes: [
        {
            title: "艺术电影",
            teacher: null,
            startTime: "19:00",
            endTime: "20:35",
            room: "2-16教室",
            weekday: "星期四",
            weekDuration: 16,
            classFrequency: "每周",
            identifier: "1",
        },
        {
            title: "西方文明史",
            teacher: null,
            startTime: "8:30",
            endTime: "10:30",
            room: "1-16教室",
            weekday: "星期五",
            weekDuration: 16,
            classFrequency: "每周",
            identifier: "2",
        },
        {
            title: "中国农村问题",
            teacher: null,
            startTime: "15:25",
            endTime: "16:55",
            room: "2-16教室",
            weekday: "星期四",
            weekDuration: 16,
            classFrequency: "每周",
            identifier: "3",
        },
        {
            title: "马克思主义社会理论",
            teacher: null,
            startTime: "13:50",
            endTime: "17:10",
            room: "2-16教室",
            weekday: "星期四",
            weekDuration: 16,
            classFrequency: "每周",
            identifier: "4",
        },
        {
            title: "当代社会学理论前沿",
            teacher: null,
            startTime: "13:50",
            endTime: "15:25",
            room: "2-16教室",
            weekday: "星期四",
            weekDuration: 16,
            classFrequency: "每周",
            identifier: "5",
        },
        {
            title: "实验方法与实践",
            teacher: null,
            startTime: "15:55",
            endTime: "18:20",
            room: "2-16教室",
            weekday: "星期四",
            weekDuration: 16,
            classFrequency: "每周",
            identifier: "6",
        },
        {
            title: "逻辑(双语)",
            teacher: null,
            startTime: "19:00",
            endTime: "20:35",
            room: "2-16教室",
            weekday: "星期四",
            weekDuration: 16,
            classFrequency: "每周",
            identifier: "7",
        },
        {
            title: "大学英语",
            teacher: null,
            startTime: "8:00",
            endTime: "9:35",
            room: "2-16教室",
            weekday: "星期四",
            weekDuration: 16,
            classFrequency: "每周",
            identifier: "8",
        },
        {
            title: "特殊教育理论(一)—基于证据的",
            teacher: null,
            startTime: "15:55",
            endTime: "17:55",
            room: "2-16教室",
            weekday: "星期四",
            weekDuration: 16,
            classFrequency: "每周",
            identifier: "9",
        },
        {
            title: "人工智能导论",
            teacher: null,
            startTime: "8:00",
            endTime: "9:35",
            room: "2-16教室",
            weekday: "星期四",
            weekDuration: 16,
            classFrequency: "每周",
            identifier: "10",
        },
    ] as ClassData[],
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
