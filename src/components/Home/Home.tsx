import { useEffect, useState } from "react";
import ClassesViewer from "./Classes/ClassesView";
import HomeBar from "./HomeBar/HomeBar";
import { database, pushData, updateData } from "../../utils/database";
import { ClassData } from "../../models/class-data.model";
import { getClassVisibility } from "../../utils/time";
import { Settings } from "../../models/settings.model";
export default function Home() {
    const [classes, setClasses] = useState<ClassData[]>([]);
    useEffect(() => {
        // const currentWeek = new Date()
        // const weeks = getWeeksGap(currentWeek, database.data.settings.firstWeek)
        // console.log(`Week gap: ${weeks}`);

        // database.data.settings.currentWeek = weeks
        // database.write()

        setClasses(database.data.classes);
    }, []);

    const handleEdit = async (data: ClassData | null, type: "add" | "edit") => {
        if (data == null) {
            return;
        }

        const newData = {
            ...data,
            visible: getClassVisibility(
                database.data.settings.currentWeek,
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

    const handleSettingChange = (setting: Settings) => {};

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
                onAdd={(d) => handleEdit(d, "add")}
                onWeekChange={handleWeekChange}
                onSettingsChange={handleSettingChange}
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
