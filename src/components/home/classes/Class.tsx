import {
    Badge,
    Button,
    Card,
    CardHeader,
    Subtitle2,
    Title3,
    Tooltip,
} from "@fluentui/react-components";
import { MoreHorizontal20Regular } from "@fluentui/react-icons";
import Flex from "../../universal/Flex";
import { ClassData } from "../../../models/class-data.model";
import {
    getNumeralWeekday,
    getRoundedTime,
    timeSequence,
} from "../../../utils/time";

const getStartPosition = (cls: ClassData) => {
    const roundedTime = getRoundedTime(cls.startTime);
    return timeSequence.indexOf(roundedTime) + 1;
};

const getEndPosition = (cls: ClassData) => {
    const roundedTime = getRoundedTime(cls.endTime);
    return timeSequence.indexOf(roundedTime) + 2;
};

export default function Class({
    data,
    onClick,
}: {
    data: ClassData;
    onClick?: (data: ClassData) => void;
}) {
    return (
        <Tooltip
            content={`${data.weekday} ${data.startTime} - ${data.endTime}`}
            relationship="description"
        >
            <Card
                onClick={() => {}}
                style={{
                    gridColumn: `${getStartPosition(data)} / ${getEndPosition(
                        data
                    )}`,
                    gridRowStart: getNumeralWeekday(data.weekday),
                    margin: "20px",
                    height: "105px",
                    visibility: data.visible ? "visible" : "hidden",
                }}
            >
                <CardHeader
                    action={
                        <Button
                            appearance="transparent"
                            icon={<MoreHorizontal20Regular />}
                            aria-label="More options"
                            onClick={() => onClick?.(data)}
                        />
                    }
                    header={<Title3>{data.title}</Title3>}
                />
                <Flex gap="10px" alignItems="center">
                    <Badge
                        style={{
                            padding: "15px",
                        }}
                    >
                        <Subtitle2>{data.room}</Subtitle2>
                    </Badge>
                    <Badge
                        color="informative"
                        style={{
                            padding: "15px",
                        }}
                    >
                        <Subtitle2>
                            {data.startTime} - {data.endTime}
                        </Subtitle2>
                    </Badge>
                    {data.teacher && (
                        <Badge
                            color="success"
                            style={{
                                padding: "15px",
                            }}
                        >
                            <Subtitle2>{data.teacher}</Subtitle2>
                        </Badge>
                    )}
                </Flex>
            </Card>
        </Tooltip>
    );
}
