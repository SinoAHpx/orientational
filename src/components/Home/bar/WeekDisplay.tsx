import {
    Popover,
    PopoverTrigger,
    Badge,
    PopoverSurface,
    Tooltip,
    Button,
} from "@fluentui/react-components";
import { ChevronLeftRegular, ChevronRightRegular } from "@fluentui/react-icons";

import Flex from "../../universal/Flex";
import { useGlobalState } from "../../../app/store";
import { database, updateCurrentWeek } from "../../../utils/database";
import { useEffect } from "react";

export default function WeekDisplay() {
    const { currentWeek, setCurrentWeek, setClasses } = useGlobalState();

    const handleWeek = async (type: "next" | "previous") => {
        if (currentWeek == 1 && type == "previous") {
            return;
        }
        if (
            currentWeek == database.data.settings.totalWeeks &&
            type == "next"
        ) {
            return;
        }
        const i = type == "next" ? 1 : -1;
        const week = currentWeek + i;

        setCurrentWeek(week);

        setClasses(database.data.classes);
        updateCurrentWeek(week);

    };

    // set initial week
    useEffect(() => {
        setCurrentWeek(database.data.memory.currentWeek)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Popover>
            <PopoverTrigger>
                <Badge
                    color="informative"
                    style={{
                        padding: "20px",
                        cursor: "pointer",
                        alignSelf: "center",
                    }}
                >
                    {new Date().toLocaleString("en-US", {
                        month: "long",
                        day: "numeric",
                    })}
                    {` / Week ${currentWeek}`}
                </Badge>
            </PopoverTrigger>
            <PopoverSurface>
                <Flex gap="10px">
                    <Tooltip content="Previous week" relationship="label">
                        <Button onClick={() => handleWeek("previous")}>
                            <ChevronLeftRegular />
                        </Button>
                    </Tooltip>
                    <Tooltip content="Next week" relationship="label">
                        <Button onClick={() => handleWeek("next")}>
                            <ChevronRightRegular />
                        </Button>
                    </Tooltip>
                </Flex>
            </PopoverSurface>
        </Popover>
    );
}
