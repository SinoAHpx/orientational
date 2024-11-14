import { Button, Card, DialogTrigger } from "@fluentui/react-components";
import { AddRegular } from "@fluentui/react-icons";
import Flex from "../../universal/Flex.tsx";
import { useGlobalState } from "../../../app/store.ts";
import WeekDisplay from "./WeekDisplay.tsx";
import DataMigration from "./DataMigration.tsx";
import SearchBar from "./SearchBar.tsx";

export default function HomeBar({ style }: { style?: React.CSSProperties }) {
    const showUpdateDialog = useGlobalState((s) => s.showUpdateDialog);
    const showSettingsDialog = useGlobalState((s) => s.showSettingsDialog);

    const handleAddClick = () => {
        showUpdateDialog();
    };

    const handleSettingClick = () => {
        showSettingsDialog();
    };

    return (
        <>
            <Card
                size="large"
                style={{
                    ...style,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <Flex gap="15px">
                    <WeekDisplay />
                    <Button
                        icon={<AddRegular />}
                        appearance="primary"
                        onClick={handleAddClick}
                    >
                        Add
                    </Button>
                </Flex>

                <Flex gap="15px">
                    <DataMigration />
                    <DialogTrigger>
                        <Button onClick={handleSettingClick}>Settings</Button>
                    </DialogTrigger>
                </Flex>

                <Flex gap="15px">
                    <SearchBar />
                </Flex>
            </Card>
        </>
    );
}
