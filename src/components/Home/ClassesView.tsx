import { Title1, Subtitle1 } from "@fluentui/react-components";
import { ClassData, defaultClassData } from "../../models/class-data.model";
import { timeSequence } from "../utils/time";
import Class from "./Class";
import EditClassDialog from "../Dialogs/EditClassdialog";
import { useState } from "react";

export default function ClassesViewer({
    extraStyle,
    classes,
    onEdit,
}: {
    extraStyle?: React.CSSProperties;
    classes: ClassData[];
    onEdit: (data: ClassData | null) => void;
}) {
    const [edit, setEdit] = useState({
        open: false,
        data: defaultClassData,
    });

    return (
        <>
            <EditClassDialog
                open={edit.open}
                data={edit.data}
                onClose={(data) => {
                    setEdit({
                        ...edit,
                        open: false,
                    });

                    onEdit(data);
                }}
            />
            <div
                style={{
                    ...extraStyle,
                    display: "grid",
                    gridTemplateColumns: "200px repeat(32, 1fr)",
                    gridTemplateRows: "50px repeat(7, 1fr)",
                    width: "800vw",
                }}
            >
                <div
                    style={{
                        gridColumn: "span 1",
                        gridRowStart: "2",
                        gridRowEnd: "9",
                        gridTemplateRows: "repeat(7, 1fr)",
                        display: "grid",
                        alignItems: "center",
                    }}
                >
                    <Title1 align="center">Monday</Title1>
                    <Title1 align="center">Tuesday</Title1>
                    <Title1 align="center">Wednesday</Title1>
                    <Title1 align="center">Thursday</Title1>
                    <Title1 align="center">Friday</Title1>
                    <Title1 align="center">Saturday</Title1>
                    <Title1 align="center">Sunday</Title1>
                </div>
                <div
                    style={{
                        display: "grid",
                        gridColumnStart: "2",
                        gridColumnEnd: "34",
                        gridTemplateColumns: "repeat(32, 1fr)",
                        alignItems: "center",
                    }}
                >
                    {timeSequence.map((time) => (
                        <Subtitle1 align="center">{time}</Subtitle1>
                    ))}
                </div>
                <div
                    style={{
                        gridColumnStart: "2",
                        gridColumnEnd: "34",
                        gridRowStart: "2",
                        gridRowEnd: "9",
                        gridTemplateColumns: "repeat(32, 1fr)",
                        gridTemplateRows: "repeat(7, 1fr)",
                        display: "grid",
                    }}
                >
                    {classes.map((cls) => (
                        <Class
                            data={cls}
                            onClick={(data) => {
                                setEdit({
                                    open: true,
                                    data: data,
                                });
                            }}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
