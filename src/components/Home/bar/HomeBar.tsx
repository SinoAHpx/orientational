import {
    Button,
    Card,
    DialogTrigger,
} from "@fluentui/react-components";
import {
    AddRegular,
} from "@fluentui/react-icons";
import Flex from "../../universal/Flex";
import { useState } from "react";
import SettingsDialog from "../../dialogs/SettingsDialog";
import { ClassData } from "../../../models/class-data.model";
import { database } from "../../../utils/database";
import { Settings } from "../../../models/settings.model";
import UpdateClassDialog from "../../dialogs/UpdateClassDialog";
import { useGlobalState } from "../../../app/store";
import WeekDisplay from "./WeekDisplay";
import DataMigration from "./DataMigration";
import SearchBar from "./SearchBar";
import { getWeeksGap } from "../../../utils/time";

export default function HomeBar({
    style,
    onAdd,
}: {
    style?: React.CSSProperties;
    onAdd: (data: ClassData | null) => void;
}) {
    // const [showAddDialog, setShowAddDialog] = useState(false);
    // const [showSettingsDialog, setShowSettingsDialog] = useState(false);
    // const {settings, setSettings, setCurrentWeek} = uesGlobalState()
    const showUpdateDialog = useGlobalState(s => s.showUpdateDialog)
    const showSettingsDialog = useGlobalState(s => s.showSettingsDialog)

    const handleAddClick = () => {
        showUpdateDialog()
    };

    const handleSettingClick = () => {
        showSettingsDialog()
    };

    const handleSettings = async (settings: Settings | null) => {
        // if (settings == null) {
        //     setShowSettingsDialog(false);

        //     return;
        // }
        
        // database.data.settings = { ...settings };
        // await database.write();
        // setSettings(database.data.settings);
        // setShowSettingsDialog(false);

        // const weeks = getWeeksGap(new Date(), database.data.settings.firstWeek);
        // //todo: add prompt if weeks is bigger than total weeks
        // setCurrentWeek(weeks);
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
                    <SearchBar/>
                </Flex>
            </Card>
        </>
    );
}
