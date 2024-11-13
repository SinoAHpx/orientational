import { useEffect } from "react";
import ClassesViewer from "./classes/ClassesView";
import HomeBar from "./bar/HomeBar";
import { database } from "../../utils/database";
import { useGlobalState } from "../../app/store";
import Dialogs from "../dialogs/Dialogs";

export default function Home() {
    const classes = useGlobalState(s => s.classes)
    const setClasses = useGlobalState(s => s.setClasses)

    useEffect(() => {
        setClasses(database.data.classes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                    />
                </div>
            </div>
        </>
    );
}
