import { ClassData } from "../../models/class-data.model";

export const timeLocalizer = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
};
 
export const timeSequence = (() => {
    const times = [];
    for (let hour = 7; hour < 23; hour++) {
        times.push(`${hour}:00`);
        times.push(`${hour}:30`);
    }
    return times;
})();

export const getRoundedTime = (time: string) => {
    const [hours, minutes] = time.split(":").map((s) => parseInt(s));
    const roundedMinutes = minutes >= 30 ? "30" : "00";
    return `${hours}:${roundedMinutes}`;
};

export const getNumeralWeekday = (weekday: string) => {
    switch (weekday) {
        case "Monday":
            return 1;
        case "Tuesday":
            return 2;
        case "Wednesday":
            return 3;
        case "Thursday":
            return 4;
        case "Friday":
            return 5;
        case "Saturday":
            return 6;
        case "Sunday":
            return 7;
        default:
            return 0;
    }
};

export const getTimeStamp = () => {
    return Date.now().toString();
}

export const getClassVisibility = (week: number, data: ClassData) => {
    if (data.weekDuration < week) {
        return false
    }
    if (data.classFrequency == 'Every week') {
        return true
    }
    if (data.classFrequency == 'Every 2 weeks') {
        return week % 2 == 0
    }
    if (data.classFrequency == 'Every 3 weeks') {
        return week % 3 == 0
    }

    return true
}