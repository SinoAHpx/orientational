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
