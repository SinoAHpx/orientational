export interface ClassData {
    title: string;
    teacher: string;
    startTime: string;
    endTime: string;
    room: string;
    weekday: string;
    weekDuration: number;
    classFrequency: string;
    identifier: string;
    visible: boolean
}

export const defaultClassData: ClassData = {
    title: "",
    teacher: "",
    startTime: "7:00",
    endTime: "8:00", 
    room: "",
    weekday: "",
    weekDuration: 16,
    classFrequency: "Every week",
    identifier: 'default',
    visible: true
};