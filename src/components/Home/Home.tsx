import { useEffect, useState } from "react";
import ClassesViewer from "./classes/ClassesView";
import HomeBar from "./bar/HomeBar";
import { database, pushData, updateData } from "../../utils/database";
import { ClassData } from "../../models/class-data.model";
import { getClassVisibility } from "../../utils/time";
import { useGlobalState } from "../../app/store";
import Dialogs from "../dialogs/Dialogs";

export default function Home() {
    const [classes, setClasses] = useState<ClassData[]>([]);
    const currentWeek = useGlobalState(s => s.currentWeek)

    useEffect(() => {
        setClasses(database.data.classes);
    }, []);

    const handleEdit = async (data: ClassData | null, type: "add" | "edit") => {
        if (data == null) {
            return;
        }

        const newData = {
            ...data,
            visible: getClassVisibility(
                currentWeek,
                data
            ),
        };

        if (type == "add") {
            await pushData(newData);
        } else {
            await updateData(newData);
        }

        setClasses([...database.data.classes]);
    };

    const handleWeekChange = async (currentWeek: number) => {
        database.data.classes = database.data.classes.map((cls) => {
            return {
                ...cls,
                visible: getClassVisibility(currentWeek, cls),
            };
        });
        await database.write();

        setClasses([...database.data.classes]);
    };



    return (
        <>
            <Dialogs />
            <HomeBar
                style={{
                    position: "sticky",
                    top: 0,
                    left: 0,
                    right: 0,
                    width: "98vw",
                    height: "75px",
                    margin: "auto",
                    zIndex: 1000,
                }}
                onAdd={(d) => handleEdit(d, "add")}
            />
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    margin: "0px",
                    padding: "0px",
                    overflowX: "auto",
                    top: "50%",
                    bottom: "50%",
                }}
            >
                <div style={{ flex: 1 }}>
                    <ClassesViewer
                        classes={classes}
                        onEdit={(d) => handleEdit(d, "edit")}
                    />
                </div>
            </div>
        </>
    );
}
