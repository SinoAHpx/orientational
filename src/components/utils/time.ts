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