export interface Settings {
    firstWeek: Date;
    totalWeeks: number;
}

export const defaultSettings: Settings = {
    firstWeek: new Date(),
    totalWeeks: 16
}