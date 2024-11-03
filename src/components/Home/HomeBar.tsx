import {
    Badge,
    Button,
    Card,
    DialogTrigger,
    Input,
} from "@fluentui/react-components";
import { AddRegular, SearchRegular } from "@fluentui/react-icons";
import Flex from "../Universal/Flex";
import AddClassDialog from "../Dialogs/AddClassDialog";
import { useState } from "react";
import SettingsDialog from "../Settings/SettingsDialog";
import { ClassData } from "../../models/class-data.model";

interface HomeBarProps {
    style?: React.CSSProperties;
    onAdd: (data: ClassData | null) => void;
}

export default function HomeBar({ style, onAdd }: HomeBarProps) {
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
                    <DialogTrigger>
                        <Button
                            icon={<AddRegular />}
                            appearance="primary"
                            onClick={handleAddClick}
                        >
                            Add
                        </Button>
                    </DialogTrigger>
                    <AddClassDialog
                        open={showAddDialog}
                        onClose={(data) => {
                            onAdd(data);
                            setShowAddDialog(false);
                        }}
                    />
                </Flex>

                <Flex gap="15px">
                    <Button>Export</Button>
                    <Button>Import</Button>
                    <DialogTrigger>
                        <Button onClick={handleSettingClick}>Settings</Button>
                    </DialogTrigger>
                    <SettingsDialog
                        open={showSettingsDialog}
                        onClose={() => {
                            setShowSettingsialog(false);
                        }}
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
