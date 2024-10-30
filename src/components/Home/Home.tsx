import { useEffect, useState } from "react";
import ClassesViewer from "./ClassesView";
import HomeBar from "./HomeBar";
import WeekDaysView from "./WeekDaysView";

export default function Home() {
    const [classes, setClasses] = useState([]);
    useEffect(() => {
        //this is just mocking data, wait to fetch from real API
        fetch("./mocking.json")
            .then((response) => response.json())
            .then((json) => setClasses(json));
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
