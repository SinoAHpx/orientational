import {
    Button,
    Dialog,
    DialogActions,
    DialogBody,
    DialogContent,
    DialogSurface,
    DialogTitle,
    DialogTrigger,
    Field,
    Input,
    Title2,
} from "@fluentui/react-components";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { useRef } from "react";
import { Settings } from "../../models/settings.model";
import Flex from "../universal/Flex";
import { database, defaultData } from "../../utils/database";
import { useGlobalState } from "../../app/store";

export default function SettingsDialog({
    open,
    settings = null,
}: {
    open: boolean;
    settings?: Settings | null;
}) {
    const hideSettings = useGlobalState(s => s.closeSettingsDialog)

    const firstWeekRef = useRef<HTMLInputElement>(null);
    const totalWeekRef = useRef<HTMLInputElement>(null);

    const onSave = () => {
        // onClose?.({
        //     firstWeek: new Date(firstWeekRef.current?.value ?? ""),
        //     totalWeeks: parseInt(totalWeekRef.current?.value ?? "1"),
        // });
        hideSettings()
    };

    return (
        <Dialog
            open={open}
            onOpenChange={() => {
                hideSettings()
            }}
        >
            <DialogSurface>
                <DialogBody>
                    <DialogTitle>
                        <Title2>Settings</Title2>
                    </DialogTitle>
                    <DialogContent>
                        <Flex direction="column" gap="5px">
                            <Field label="First week at">
                                <DatePicker
                                    ref={firstWeekRef}
                                    value={
                                        settings?.firstWeek
                                            ? new Date(settings.firstWeek)
                                            : new Date()
                                    }
                                />
                            </Field>
                            <Field label="Total weeks">
                                <Input
                                    type="number"
                                    ref={totalWeekRef}
                                    defaultValue={settings?.totalWeeks?.toString()}
                                />
                            </Field>
                        </Flex>
                    </DialogContent>
                    <DialogActions>
                        <DialogTrigger action="close" disableButtonEnhancement>
                            <Button appearance="secondary">Close</Button>
                        </DialogTrigger>
                        <DialogTrigger action="close" disableButtonEnhancement>
                            <Button
                                onClick={async () => {
                                    database.data = defaultData;
                                    await database.write();

                                    window.location.reload();
                                }}
                                appearance="secondary"
                            >
                                Destroy
                            </Button>
                        </DialogTrigger>
                        <Button
                            onClick={() => {
                                onSave();
                            }}
                            appearance="primary"
                        >
                            Confirm
                        </Button>
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    );
}
