import {
    Badge,
    Button,
    Card,
    DialogTrigger,
    Input,
    Popover,
    PopoverSurface,
    PopoverTrigger,
    TeachingPopover,
    TeachingPopoverBody,
    TeachingPopoverFooter,
    TeachingPopoverHeader,
    TeachingPopoverSurface,
    TeachingPopoverTitle,
    TeachingPopoverTrigger,
    Text,
    Title3,
    Tooltip,
} from "@fluentui/react-components";
import {
    AddRegular,
    ChevronLeftRegular,
    ChevronRightRegular,
    SearchRegular,
} from "@fluentui/react-icons";
import Flex from "../Universal/Flex";
import { useRef, useState } from "react";
import SettingsDialog from "../Dialogs/SettingsDialog";
import { ClassData, defaultClassData } from "../../models/class-data.model";
import { database } from "../../utils/database";
import { Settings } from "../../models/settings.model";
import UpdateClassDialog from "../Dialogs/UpdateClassDialog";

export default function HomeBar({
    style,
    onAdd,
    onWeekChange,
}: {
    style?: React.CSSProperties;
    onAdd: (data: ClassData | null) => void;
    onWeekChange: (week: number) => void;
}) {
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [showSettingsDialog, setShowSettingsDialog] = useState(false);
    const [settings, setSettings] = useState(database.data.settings);
    const [currentWeek, setCurrentWeek] = useState(
        database.data.settings.currentWeek
    );
    const [searchResult, setSearchResult] = useState({
        open: false,
        data: defaultClassData,
    });

    const searchRef = useRef<HTMLInputElement>(null);

    const handleAddClick = () => {
        setShowAddDialog(true);
    };

    const handleSettingClick = () => {
        setShowSettingsDialog(true);
    };

    const handleSettings = async (settings: Settings | null) => {
        if (settings == null) {
            setShowSettingsDialog(false);
            return;
        }

        database.data.settings = { ...settings, currentWeek };
        await database.write();

        setSettings(database.data.settings);

        setShowSettingsDialog(false);
    };

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

        database.data.settings.currentWeek += i;
        await database.write();

        onWeekChange(database.data.settings.currentWeek);
    };

    const handleExport = () => {
        const json = JSON.stringify(database.data);
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "database_export.json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handleImport = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".json";

        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    const content = e.target?.result;
                    if (typeof content === "string") {
                        database.data = JSON.parse(content);
                        await database.write();
                    }
                } catch (error) {
                    console.error("Error importing file:", error);
                } finally {
                    reader.onload = null;
                    input.onchange = null;
                    input.remove();

                    window.location.reload();
                }
            };
            reader.readAsText(file);
        };

        input.click();
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
                                    <Button
                                        onClick={() => handleWeek("previous")}
                                    >
                                        <ChevronLeftRegular />
                                    </Button>
                                </Tooltip>
                                <Tooltip
                                    content="Next week"
                                    relationship="label"
                                >
                                    <Button onClick={() => handleWeek("next")}>
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
                    <UpdateClassDialog
                        
                        open={showAddDialog}
                        onClose={(data) => {
                            onAdd(data);
                            setShowAddDialog(false);
                        }}
                    />
                </Flex>

                <Flex gap="15px">
                    <Button onClick={handleExport}>Export</Button>
                    {database.data.classes.length == 0 ? (
                        <Button onClick={handleImport}>Import</Button>
                    ) : (
                        <TeachingPopover>
                            <TeachingPopoverTrigger>
                                <Button>Import</Button>
                            </TeachingPopoverTrigger>
                            <TeachingPopoverSurface>
                                <TeachingPopoverHeader>
                                    Tips
                                </TeachingPopoverHeader>
                                <TeachingPopoverBody>
                                    <TeachingPopoverTitle>
                                        This Action will override current
                                        classes
                                    </TeachingPopoverTitle>
                                    <Text>
                                        Press "continue" if you'd confirm.
                                    </Text>
                                </TeachingPopoverBody>
                                <TeachingPopoverFooter
                                    primary={{
                                        onClick: handleImport,
                                        children: "Continue",
                                    }}
                                    secondary="Cancel"
                                />
                            </TeachingPopoverSurface>
                        </TeachingPopover>
                    )}
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
                    <Input ref={searchRef} placeholder="Search for classes" />

                    <TeachingPopover
                        open={searchResult.open}
                        onOpenChange={() => {
                            if (
                                searchRef.current &&
                                searchRef.current.value != ""
                            ) {
                                const data = database.data.classes.filter((c) =>
                                    c.title.includes(searchRef.current!.value!)
                                )[0];
                                if (data === undefined || data === null) {
                                    return;
                                }

                                setSearchResult({
                                    open: !searchResult.open,
                                    data,
                                });
                            }
                        }}
                    >
                        <TeachingPopoverTrigger disableButtonEnhancement>
                            <Button icon={<SearchRegular />}>Search</Button>
                        </TeachingPopoverTrigger>
                        <TeachingPopoverSurface>
                            <TeachingPopoverHeader>
                                Searching
                            </TeachingPopoverHeader>
                            <TeachingPopoverBody>
                                <Title3>{searchResult.data.title}</Title3>
                                <Flex gap="10px">
                                    <Badge style={{ padding: "15px" }}>
                                        {searchResult.data.room}
                                    </Badge>
                                    <Badge
                                        color="informative"
                                        style={{ padding: "15px" }}
                                    >
                                        {searchResult.data.startTime}-
                                        {searchResult.data.endTime}
                                    </Badge>
                                </Flex>
                            </TeachingPopoverBody>
                        </TeachingPopoverSurface>
                    </TeachingPopover>
                </Flex>
            </Card>
        </>
    );
}
