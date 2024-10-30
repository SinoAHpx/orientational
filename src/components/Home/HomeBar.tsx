import {
    Badge,
    Button,
    Card,
    Input,
} from "@fluentui/react-components";
import { AddRegular, SearchRegular } from "@fluentui/react-icons";
import Flex from "../../Universal/Flex";
import AddClassDialog from "../Dialogs/AddClassDialog";
import { useState } from "react";
import SettingsDialog from "../Settings/SettingsDialog";

interface HomeBarProps {
    style?: React.CSSProperties;
}

export default function HomeBar({ style }: HomeBarProps) {
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [showSettingsDialog, setShowSettingsialog] = useState(false);
    const handleAddClick = () => {
        setShowAddDialog(true);
    };

    const handleSettingClick = () => {
        setShowSettingsialog(true);
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
                    <Badge
                        color="informative"
                        style={{ padding: "20px", alignSelf: "center" }}
                    >
                        {new Date().toLocaleString("en-US", {
                            month: "long",
                            day: "numeric",
                        })}
                        {/*todo: the week is actually mocking*/}, Week 7
                    </Badge>

                    <AddClassDialog
                        trigger={
                            <Button
                                icon={<AddRegular />}
                                appearance="primary"
                                onClick={handleAddClick}
                            >
                                Add
                            </Button>
                        }
                        open={showAddDialog}
                        onClose={() => {}}
                    />
                </Flex>

                <Flex gap="15px">
                    <Button>Export</Button>
                    <Button>Import</Button>
                    <SettingsDialog
                        trigger={
                            <Button onClick={handleSettingClick}>
                                Settings
                            </Button>
                        }
                        open={showSettingsDialog}
                    ></SettingsDialog>
                </Flex>

                <Flex gap="15px">
                    <Input placeholder="Search for classes" />
                    <Button icon={<SearchRegular />}>Search</Button>
                </Flex>
            </Card>
        </>
    );
}
