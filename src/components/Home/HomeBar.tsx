import {
    Badge,
    Button,
    Card,
    DialogTrigger,
    Input,
    Popover,
    PopoverSurface,
    PopoverTrigger,
    Tooltip,
} from "@fluentui/react-components";
import {
    AddRegular,
    ChevronLeftRegular,
    ChevronRightRegular,
    SearchRegular,
} from "@fluentui/react-icons";
import Flex from "../Universal/Flex";
import AddClassDialog from "../Dialogs/AddClassDialog";
import { useState } from "react";
import SettingsDialog from "../Settings/SettingsDialog";
import { ClassData } from "../../models/class-data.model";
import { database } from "../utils/database";
import { Settings } from "../../models/settings.model";

interface HomeBarProps {
    style?: React.CSSProperties;
    onAdd: (data: ClassData | null) => void;
}

export default function HomeBar({ style, onAdd }: HomeBarProps) {
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [showSettingsDialog, setShowSettingsialog] = useState(false);
    const [settings, setSettings] = useState(database.data.settings);
    const [currentWeek, setCurrentWeek] = useState(
        database.data.settings.currentWeek
    );

    const handleAddClick = () => {
        setShowAddDialog(true);
    };

    const handleSettingClick = () => {
        setShowSettingsialog(true);
    };

    const handleSettings = async (settings: Settings | null) => {
        if (settings == null) {
            setShowSettingsialog(false)
            return;
        }

        database.data.settings = { ...settings, currentWeek };
        await database.write();

        setSettings(database.data.settings);

        setShowSettingsialog(false);
    };

    const handlePreviousWeek = async () => {
        if (currentWeek == 1) {
            return;
        }
        setCurrentWeek(currentWeek - 1);

        database.data.settings.currentWeek -= 1;
        await database.write();
    };

    const handleNextWeek = async () => {
        if (currentWeek == database.data.settings.totalWeeks) {
            return;
        }
        setCurrentWeek(currentWeek + 1);

        database.data.settings.currentWeek += 1;
        await database.write();
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
                                <Tooltip
                                    content="Previous week"
                                    relationship="label"
                                >
                                    <Button onClick={handlePreviousWeek}>
                                        <ChevronLeftRegular />
                                    </Button>
                                </Tooltip>
                                <Tooltip
                                    content="Next week"
                                    relationship="label"
                                >
                                    <Button onClick={handleNextWeek}>
                                        <ChevronRightRegular />
                                    </Button>
                                </Tooltip>
                            </Flex>
                        </PopoverSurface>
                    </Popover>
                    <Button
                        icon={<AddRegular />}
                        appearance="primary"
                        onClick={handleAddClick}
                    >
                        Add
                    </Button>
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
                        settings={settings}
                        open={showSettingsDialog}
                        onClose={handleSettings}
                    />
                </Flex>

                <Flex gap="15px">
                    <Input placeholder="Search for classes" />
                    <Button icon={<SearchRegular />}>Search</Button>
                </Flex>
            </Card>
        </>
    );
}
