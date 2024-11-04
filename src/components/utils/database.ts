import { LocalStoragePreset } from "lowdb/browser";
import { ClassData } from "../../models/class-data.model";

export const database = await LocalStoragePreset("db.json", {
    classes: [
        // {
        //     title: "数据结构",
        //     teacher: "王教授",
        //     startTime: "09:30",
        //     endTime: "12:40",
        //     room: "计算机楼-101",
        //     weekday: "Monday",
        //     weekDuration: 16,
        //     classFrequency: "Every week",
        // },
        // {
        //     title: "计算机网络",
        //     teacher: "张教授",
        //     startTime: "14:00",
        //     endTime: "15:15",
        //     room: "计算机楼-305",
        //     weekday: "Tuesday",
        //     weekDuration: 16,
        //     classFrequency: "Every week",
        // },
        // {
        //     title: "操作系统",
        //     teacher: "陈教授",
        //     startTime: "15:30",
        //     endTime: "16:45",
        //     room: "计算机楼-401",
        //     weekday: "Tuesday",
        //     weekDuration: 16,
        //     classFrequency: "Every week",
        // },
        // {
        //     title: "软件工程",
        //     teacher: "刘教授",
        //     startTime: "09:00",
        //     endTime: "10:15",
        //     room: "计算机楼-201",
        //     weekday: "Wednesday",
        //     weekDuration: 16,
        //     classFrequency: "Every week",
        // },
        // {
        //     title: "数据库系统",
        //     teacher: "黄教授",
        //     startTime: "13:30",
        //     endTime: "14:45",
        //     room: "计算机楼-102",
        //     weekday: "Wednesday",
        //     weekDuration: 16,
        //     classFrequency: "Every week",
        // },
        // {
        //     title: "计算机组成原理",
        //     teacher: "赵教授",
        //     startTime: "08:00",
        //     endTime: "09:15",
        //     room: "计算机楼-103",
        //     weekday: "Thursday",
        //     weekDuration: 16,
        //     classFrequency: "Every week",
        // },
        // {
        //     title: "编译原理",
        //     teacher: "钱教授",
        //     startTime: "10:30",
        //     endTime: "11:45",
        //     room: "计算机楼-204",
        //     weekday: "Thursday",
        //     weekDuration: 16,
        //     classFrequency: "Every week",
        // },
        // {
        //     title: "算法分析与设计",
        //     teacher: "孙教授",
        //     startTime: "14:00",
        //     endTime: "15:15",
        //     room: "计算机楼-306",
        //     weekday: "Thursday",
        //     weekDuration: 16,
        //     classFrequency: "Every week",
        // },
        // {
        //     title: "人工智能导论",
        //     teacher: "周教授",
        //     startTime: "09:30",
        //     endTime: "10:45",
        //     room: "计算机楼-402",
        //     weekday: "Friday",
        //     weekDuration: 16,
        //     classFrequency: "Every week",
        // },
        // {
        //     title: "机器学习",
        //     teacher: "吴教授",
        //     startTime: "13:30",
        //     endTime: "14:45",
        //     room: "计算机楼-203",
        //     weekday: "Friday",
        //     weekDuration: 16,
        //     classFrequency: "Every week",
        // },
        // {
        //     title: "深度学习实践",
        //     teacher: "郑教授",
        //     startTime: "15:30",
        //     endTime: "16:45",
        //     room: "计算机楼-104",
        //     weekday: "Friday",
        //     weekDuration: 16,
        //     classFrequency: "Every week",
        // },
    ] as ClassData[],
});

export const pushData = async (data: ClassData) => {
    database.data.classes.push({
        ...data,
        teacher: data.teacher || ""
    });
    await database.write();
}

export const updateData = async (data: ClassData) => {
    const removed = database.data.classes.filter(d => d.identifier != data.identifier)
    removed.push(data)
    database.data.classes = removed

    await database.write()
}