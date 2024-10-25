import {
    Badge,
    Button,
    Card,
    CardHeader,
    Subtitle2,
    Title3,
} from "@fluentui/react-components";
import { MoreHorizontal20Regular } from "@fluentui/react-icons";
import Flex from "../Universal/Flex";

export default function Class({
    data,
    onClick,
}: {
    data: {
        title: string;
        room: string;
        teacher?: string | null;
        startTime: string;
        endTime: string;
        weekday: string;
    };
    onClick?: () => void;
}) {
    return (
        <Card
            onClick={onClick}
            style={{
                margin: "20px",
                height: "105px",
            }}
        >
            <CardHeader
                action={
                    <Button
                        appearance="transparent"
                        icon={<MoreHorizontal20Regular />}
                        aria-label="More options"
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
                    <Subtitle2>{data.startTime} - {data.endTime}</Subtitle2>
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
    );
}
