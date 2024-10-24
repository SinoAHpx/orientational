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

/**
 * Generates a sequence of time strings from 6:00 to 23:00.
 *
 * @returns {string[]} An array of time strings in the format "HH:00".
 */
const getTimeSequence = () => {
    const times = [];
    for (let hour = 6; hour < 24; hour++) {
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
        <div style={{
            ...style,
        }}>
            <Table
                style={{
                    width: "150vw",
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
                            <Card onClick={() => {}}>
                                <CardHeader header="Introduction to React" />
                                <Text>Professor: Dr. Smith</Text>
                                <Text>Room: CS-101</Text>
                                <Text>Seats: 30/40</Text>
                            </Card>
                        </TableCell>
                    </TableRow>
                    <TableRow className={styles.cell}>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell colSpan={5}>
                            <Card onClick={() => {}}>
                                <CardHeader header="Advanced JavaScript" />
                                <Text>Professor: Dr. Johnson</Text>
                                <Text>Room: CS-202</Text>
                                <Text>Seats: 25/35</Text>
                            </Card>
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
                            <Card onClick={() => {}}>
                                <CardHeader header="Web Development" />
                                <Text>Professor: Dr. Williams</Text>
                                <Text>Room: CS-305</Text>
                                <Text>Seats: 40/50</Text>
                            </Card>
                        </TableCell>
                    </TableRow>
                    <TableRow className={styles.cell}>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell colSpan={5}>
                            <Card onClick={() => {}}>
                                <CardHeader header="Database Systems" />
                                <Text>Professor: Dr. Brown</Text>
                                <Text>Room: CS-401</Text>
                                <Text>Seats: 35/45</Text>
                            </Card>
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
                            <Card onClick={() => {}}>
                                <CardHeader header="Software Engineering" />
                                <Text>Professor: Dr. Davis</Text>
                                <Text>Room: CS-203</Text>
                                <Text>Seats: 28/35</Text>
                            </Card>
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
                        <TableCell colSpan={5}>
                            <Card onClick={() => {}}>
                                <CardHeader header="Data Structures" />
                                <Text>Professor: Dr. Miller</Text>
                                <Text>Room: CS-102</Text>
                                <Text>Seats: 32/40</Text>
                            </Card>
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
                        <TableCell colSpan={5}>
                            <Card onClick={() => {}}>
                                <CardHeader header="Computer Networks" />
                                <Text>Professor: Dr. Wilson</Text>
                                <Text>Room: CS-304</Text>
                                <Text>Seats: 38/45</Text>
                            </Card>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}
