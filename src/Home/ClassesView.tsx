import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
    makeStyles,
} from "@fluentui/react-components";
import { useMemo } from "react";
import Class from "./Class";

/**
 * Generates a sequence of time strings from 6:00 to 23:00.
 *
 * @returns {string[]} An array of time strings in the format "HH:00".
 */
const getTimeSequence = () => {
    const times = [];
    for (let hour = 7; hour < 23; hour++) {
        const formattedTime = `${hour}:00`;
        times.push(formattedTime);
    }
    //32 items
    return times;
};

const getColSpanBySchedule = (startTime: string, endTime: string) => {
    const start = startTime.split(':')
    const end = endTime.split(":")
    
    const startSeconds = parseInt(start[0]) * 3600 + parseInt(start[1]) * 60
    const endSeconds = parseInt(end[0]) * 3600 + parseInt(end[1]) * 60
    const gapSeconds = endSeconds - startSeconds
    const gapHours = Math.floor(gapSeconds / 3600)
    return gapHours + 1
};

const useStyle = makeStyles({
    row: {
        ":hover": {
            cursor: "default",
            backgroundColor: "inherit",
            color: "inherit",
            transform: "none",
            boxShadow: "none",
            outline: "none",
            textDecoration: "none",
            filter: "none",
            opacity: "1",
        },
        ":active": {
            cursor: "default",
            backgroundColor: "inherit",
            color: "inherit",
            transform: "none",
            boxShadow: "none",
            outline: "none",
            textDecoration: "none",
            filter: "none",
            opacity: "1",
        },
    },
});

export default function ClassesViewer({
    style,
    classes,
}: {
    style?: React.CSSProperties;
    classes: {
        title: string;
        room: string;
        teacher?: string | null;
        startTime: string;
        endTime: string;
        weekday: string;
    }[];
}) {
    const timeSequence: string[] = useMemo(() => getTimeSequence(), []);
    const styles = useStyle();
    const [
        mondayClasses,
        tuesdayClasses,
        wednesdayClasses,
        thursdayClasses,
        fridayClasses,
        saturdayClasses,
        sundayClasses,
    ] = useMemo(() => {
        const classesByDay = classes.reduce((acc, cls) => {
            acc[cls.weekday] = acc[cls.weekday] || [];
            acc[cls.weekday].push(cls);
            return acc;
        }, {} as Record<string, typeof classes>);

        const result = [
            classesByDay["Monday"] || [],
            classesByDay["Tuesday"] || [],
            classesByDay["Wednesday"] || [],
            classesByDay["Thursday"] || [],
            classesByDay["Friday"] || [],
            classesByDay["Saturday"] || [],
            classesByDay["Sunday"] || [],
        ].map((classes) =>
            classes.map((cls) => (
                <TableCell
                    colSpan={getColSpanBySchedule(cls.startTime, cls.endTime)}
                >
                    <Class
                        onClick={() => {}}
                        key={`${cls.title}-${cls.startTime}-${cls.endTime}`}
                        data={cls}
                    />
                </TableCell>
            ))
        );
        
        return result;
    }, [classes]);

    return (
        <div
            style={{
                ...style,
            }}
        >
            <Table
                style={{
                    width: "200vw",
                    maxWidth: "max(12000px, 98vw)",
                    margin: "auto",
                    userSelect: "none",
                }}
            >
                <TableHeader>
                    <TableRow>
                        {timeSequence.map((time) => (
                            <TableCell key={time}>{time}</TableCell>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow className={styles.row}>{mondayClasses}</TableRow>
                    <TableRow className={styles.row}>{tuesdayClasses}</TableRow>
                    <TableRow className={styles.row}>
                        {wednesdayClasses}
                    </TableRow>
                    <TableRow className={styles.row}>
                        {thursdayClasses}
                    </TableRow>
                    <TableRow className={styles.row}>{fridayClasses}</TableRow>
                    <TableRow className={styles.row}>
                        {saturdayClasses}
                    </TableRow>
                    <TableRow
                        className={styles.row}
                        style={{
                            borderBottom: "none",
                        }}
                    >
                        {sundayClasses}
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}
