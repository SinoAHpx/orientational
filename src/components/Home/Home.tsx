import { useEffect, useState } from "react";
import ClassesViewer from "./ClassesView";
import HomeBar from "./HomeBar";
import { database, pushData, updateData } from "../utils/database";
import { ClassData } from "../../models/class-data.model";

export default function Home() {
    const [classes, setClasses] = useState<ClassData[]>([]);
    useEffect(() => {
        setClasses(database.data.classes);
    }, []);

    const handleAdd = async (data: ClassData | null) => {
        if (data == null) {
            return;
        }
        await pushData(data)

        setClasses([...database.data.classes]);
    }

    const handleEdit = async (data: ClassData | null) => {
        if (data == null) {
            return;
        }
        await updateData(data)

        setClasses([...database.data.classes]);
    }

    return (
        <>
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
                onAdd={handleAdd}
            />
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    margin: "0px",
                    padding: "0px",
                    overflowX: "auto",
                    top: '50%',
                    bottom: '50%',
                }}
            >
                <div style={{ flex: 1 }}>
                    <ClassesViewer
                        classes={classes}
                        onEdit={handleEdit}
                    />
                </div>
            </div>
        </>
    );
}
