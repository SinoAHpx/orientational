import {
    Card,
    CardHeader,
    Text,
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
    //18 items
    return times;
};

const useStyle = makeStyles({
    cell: {
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
}: {
    style?: React.CSSProperties;
}) {
    const timeSequence: string[] = useMemo(() => getTimeSequence(), []);
    const styles = useStyle();
    return (
        <div
            style={{
                ...style,
            }}
        >
            <Table
                style={{
                    width: "150vw",
                    maxWidth: "max(2000px, 98vw)",
                    margin: "auto",
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
                    <TableRow className={styles.cell}>
                        <TableCell colSpan={5}>
                            <Class
                                title="数据结构"
                                teacher="王教授"
                                schedule="09:30-10:40"
                                room="计算机楼-101"
                                onClick={() => {}}
                            />
                        </TableCell>
                    </TableRow>
                    <TableRow className={styles.cell}>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell colSpan={5}>
                            <Class
                                title="高级JavaScript编程"
                                teacher="李教授"
                                schedule="10:25-11:35"
                                room="计算机楼-202"
                                onClick={() => {}}
                            />
                        </TableCell>
                    </TableRow>
                    <TableRow className={styles.cell}>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell colSpan={5}>
                            <Class
                                title="网络开发"
                                teacher="张教授"
                                schedule="11:40-12:50"
                                room="计算机楼-305"
                                onClick={() => {}}
                            />
                        </TableCell>
                    </TableRow>
                    <TableRow className={styles.cell}>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell colSpan={5}>
                            <Class
                                title="数据库系统"
                                schedule="13:35-14:45"
                                room="计算机楼-401"
                                onClick={() => {}}
                            />
                        </TableCell>
                    </TableRow>
                    <TableRow className={styles.cell}>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell colSpan={5}>
                            <Class
                                title="软件工程"
                                teacher="陈教授"
                                schedule="14:28-15:35"
                                room="计算机楼-203"
                                onClick={() => {}}
                            />
                        </TableCell>
                    </TableRow>
                    <TableRow className={styles.cell}>
                        <TableCell colSpan={5}>
                            <Class
                                title="数据结构"
                                teacher="吴教授"
                                schedule="15:32-16:40"
                                room="计算机楼-102"
                                onClick={() => {}}
                            />
                        </TableCell>
                    </TableRow>
                    <TableRow className={styles.cell} style={{
                        borderBottom: 'none'
                    }}>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell colSpan={5}>
                            <Class
                                title="计算机网络"
                                teacher="赵教授"
                                schedule="16:38-17:45"
                                room="计算机楼-304"
                                onClick={() => {}}
                            />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}
