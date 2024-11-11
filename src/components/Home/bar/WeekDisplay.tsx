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
import { uesGlobalState } from "../../../app/store";
import { database } from "../../../utils/database";
import { useEffect } from "react";
import { getWeeksGap } from "../../../utils/time";

export default function WeekDisplay() {
    const { currentWeek, setCurrentWeek } = uesGlobalState();

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

        setCurrentWeek(currentWeek + i);

        // database.data.memory.currentWeek = currentWeek + i;
        await database.write();
    };

    useEffect(() => {
        const initialGap = getWeeksGap(
            new Date(),
            database.data.settings.firstWeek
        );
        if (currentWeek < database.data.settings.totalWeeks) {
            setCurrentWeek(initialGap);
        }
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
