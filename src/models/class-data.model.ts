export interface ClassData {
    title: string;
    teacher: string | null;
    startTime: string;
    endTime: string;
    room: string;
    weekday: string;
    weekDuration: number;
    classFrequency: string;
    identifier: string
}

export const defaultClassData: ClassData = {
    title: "",
    teacher: null,
    startTime: "7:00",
    endTime: "8:00", 
    room: "",
    weekday: "",
    weekDuration: 16,
    classFrequency: "Every week",
    identifier: 'default'
};