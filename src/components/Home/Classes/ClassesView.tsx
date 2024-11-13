import { Title1, Subtitle1 } from "@fluentui/react-components";
import { ClassData } from "../../../models/class-data.model";
import { timeSequence } from "../../../utils/time";
import Class from "./Class";
import Flex from "../../universal/Flex";
import { useGlobalState } from "../../../app/store";

export default function ClassesViewer({
    extraStyle,
    classes,
}: {
    extraStyle?: React.CSSProperties;
    classes: ClassData[];
}) {
    const showUpdateDialog = useGlobalState((s) => s.showUpdateDialog);

    return (
        <>
            {classes.length != 0 ? (
                <div
                    style={{
                        ...extraStyle,
                        display: "grid",
                        gridTemplateColumns: "200px repeat(32, 1fr)",
                        gridTemplateRows: "50px repeat(7, 1fr)",
                        width: "min(300vw, 4000px)",
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
                                    showUpdateDialog(data);
                                }}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <Flex
                    justifyContent="center"
                    alignItems="center"
                    style={{ height: "50vh" }}
                >
                    <Title1>Please add a class to continue.</Title1>
                </Flex>
            )}
        </>
    );
}
