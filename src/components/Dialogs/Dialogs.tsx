import { useGlobalState } from "../../app/store";
import { database } from "../../utils/database";
import SettingsDialog from "./SettingsDialog";
import UpdateClassDialog from "./UpdateClassDialog";

export default function Dialogs() {
    const dialog = useGlobalState(s => s.dialog)
    const hideUpdate = useGlobalState(s => s.hideUpdateDialog)
    const hideSettings = useGlobalState(s => s.hideSettingsDialog)

    return (
        <>
            <UpdateClassDialog
                open={dialog.update.open}
                data={dialog.update.data}
                onClose={() => {
                    hideUpdate()
                }}
            />
            <SettingsDialog
                        settings={database.data.settings}
                        open={dialog.settings.open}
                        onClose={() => {
                            hideSettings()
                        }}
                    />
        </>
    );
}
