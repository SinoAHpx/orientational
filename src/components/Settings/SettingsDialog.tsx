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
import Flex from "../Universal/Flex";

export default function SettingsDialog({
    open,
    onClose,
    settings = null,
}: {
    open: boolean;
    onClose?: (settings: Settings | null) => void;
    settings?: Settings | null;
}) {
    const firstWeekRef = useRef<HTMLInputElement>(null);
    const totalWeekRef = useRef<HTMLInputElement>(null);

    const onSave = () => {
        onClose?.({
            firstWeek: new Date(firstWeekRef.current?.value ?? ""),
            totalWeeks: parseInt(totalWeekRef.current?.value ?? "1"),
            currentWeek: 1,
        });
    };

    return (
        <Dialog
            open={open}
            onOpenChange={() => {
                if (onClose) {
                    onClose(null);
                }
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
                                    value={settings?.firstWeek ? new Date(settings.firstWeek) : new Date()}
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
