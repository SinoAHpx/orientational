import { useGlobalState } from "../../app/store";
import { database } from "../../utils/database";
import SettingsDialog from "./SettingsDialog";
import UpdateClassDialog from "./UpdateClassDialog";

export default function Dialogs() {
    const dialog = useGlobalState(s => s.dialog)

    return (
        <>
            <UpdateClassDialog
                open={dialog.update.open}
                data={dialog.update.data}
            />
            <SettingsDialog
                        settings={database.data.settings}
                        open={dialog.settings.open}
                    />
        </>
    );
}
