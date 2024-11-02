import Flex from "../Universal/Flex";
import { Title2 } from "@fluentui/react-components";

export default function WeekDaysView() {
    return (
        <Flex
            direction="column"
            justifyContent="space-around"
            style={{
                width: "150px",
                height: "calc(100vh - 120px)",
                justifyContent: "space-around",
                userSelect: "none",
            }}
        >
            <Title2>Monday</Title2>
            <Title2>Tuesday</Title2>
            <Title2>Wednesday</Title2>
            <Title2>Thursday</Title2>
            <Title2>Friday</Title2>
            <Title2>Saturday</Title2>
            <Title2>Sunday</Title2>
        </Flex>
    );
}
