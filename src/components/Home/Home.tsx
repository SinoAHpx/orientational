import { useEffect, useState } from "react";
import ClassesViewer from "./ClassesView";
import HomeBar from "./HomeBar";
import WeekDaysView from "./WeekDaysView";
import { database } from "../utils/database";
import { ClassData } from "../../models/class-data.model";

export default function Home() {
    const [classes, setClasses] = useState<ClassData[]>([]);
    useEffect(() => {
        setClasses(database.data.classes);

    }, []);
    const handleAdd = async (data: ClassData | null) => {
        console.log(data);
        
        if (data == null) {
            return;
        }
        
    
        database.data.classes.push({
            ...data,
            teacher: data.teacher || ""
        });
        await database.write();
        console.log("right after write:");
        console.log(database.data.classes);

        setClasses(database.data.classes);
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
                }}
            >
                <WeekDaysView />
                <div style={{ flex: 1 }}>
                    <ClassesViewer
                        style={{
                            height: "calc(100vh - 120px)",
                        }}
                        classes={classes}
                    />
                </div>
            </div>
        </>
    );
}
