import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
    makeStyles,
} from "@fluentui/react-components";
import { useState } from "react";
import Class from "./Class";
import { ClassData, defaultClassData } from "../../models/class-data.model";
import AddClassDialog from "../Dialogs/AddClassDialog";
import EditClassDialog from "../Dialogs/EditClassdialog";
import { getRoundedTime } from "../utils/time";
import { timeSequence } from "../utils/time";
import { database } from "../utils/database";

const getClassOccupiedSpaces = (cls: ClassData) => {
    const start = cls.startTime.split(":");
    const end = cls.endTime.split(":");
    const startSeconds = parseInt(start[0]) * 3600 + parseInt(start[1]) * 60;
    const endSeconds = parseInt(end[0]) * 3600 + parseInt(end[1]) * 60;
    const gapSeconds = endSeconds - startSeconds;

    const spaces = Math.floor(gapSeconds / 1800);
    return spaces + 1;
};

const getFilledRow = (
    weekdayClasses: ClassData[],
    overallClick: (classData: ClassData) => void
): JSX.Element[] => {
    const cells = [];

    for (const cls of weekdayClasses) {
        const currentClassIndex = weekdayClasses.indexOf(cls);
        const classSpaces = getClassOccupiedSpaces(cls);
        const spaces =
            currentClassIndex == 0
                ? timeSequence.indexOf(getRoundedTime(cls.startTime))
                : timeSequence.indexOf(getRoundedTime(cls.startTime)) -
                  timeSequence.indexOf(
                      getRoundedTime(
                          weekdayClasses[currentClassIndex - 1].startTime
                      )
                  ) -
                  classSpaces;

        for (let index = 0; index < spaces; index++) {
            cells.push(<TableCell />);
        }
        cells.push(
            <TableCell colSpan={classSpaces}>
                <Class
                    key={cls.title + cls.startTime}
                    onClick={() => overallClick(cls)}
                    data={cls}
                />
            </TableCell>
        );
    }
    return cells;
};

const getWeekdayRows = (
    classes: ClassData[],
    overallClick: (classData: ClassData) => void
): JSX.Element[][] => {
    //this seems to be complicated, however its main purpose is to
    //convert classes into respective weekdays bunches
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
    ].map((classes) => getFilledRow(classes, overallClick));

    return result;
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
    classes: ClassData[];
}) {
    const styles = useStyle();
    const [showAddClassDialog, setShowAddClassDialog] = useState(false);
    const [showEditClassDialog, setShowEditClassDialog] = useState(false);
    const [clickedClassData, setClickedClassData] =
        useState<ClassData>(defaultClassData);

    const [
        mondayClasses,
        tuesdayClasses,
        wednesdayClasses,
        thursdayClasses,
        fridayClasses,
        saturdayClasses,
        sundayClasses,
    ] = getWeekdayRows(classes, (classData: ClassData) => {
        setClickedClassData(classData);
        setShowEditClassDialog(true);
    });

    const handleAdd = async (data: ClassData | null) => {
        console.log("Before database update:", database.data.classes);
        
        if (data === null) {
            return;
        }
    
        database.data.classes.push({
            ...data,
            teacher: data.teacher || ""
        });
        await database.write();
    
        console.log("After database update:", database.data.classes);
    }

    return (
        <div
            style={{
                ...style,
            }}
        >
            <AddClassDialog
                open={showAddClassDialog}
                onClose={async (data) => {
                    await handleAdd(data)
                    console.log('shitaiwdhiawhdawd');
                    setShowAddClassDialog(false);
                }}
            />
            <EditClassDialog
                data={clickedClassData}
                open={showEditClassDialog}
                onClose={() => setShowEditClassDialog(false)}
            />
            <Table
                style={{
                    width: "400vw",
                    maxWidth: "max(5000px, 98vw)",
                    margin: "auto",
                    userSelect: "none",
                }}
            >
                <TableHeader>
                    <TableRow>
                        {timeSequence.map((time) => (
                            <TableCell key={`time-${time}`}>{time}</TableCell>
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
