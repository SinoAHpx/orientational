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
    Title2,
} from "@fluentui/react-components";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { useRef, useState } from "react";

export default function SettingsDialog({
    open,
    onClose,
}: {
    open: boolean;
    onClose?: (firstWeek: Date | null) => void;
}) {
    const firstWeekRef = useRef<HTMLInputElement>(null);

    return (
        <Dialog
            open={open}
            onOpenChange={(_event, data) => {
                if (onClose) {
                    onClose(
                        data.open ? new Date(firstWeekRef.current?.value ?? '') : null
                    );
                }
            }}
        >
            <DialogSurface>
                <DialogBody>
                    <DialogTitle>
                        <Title2>Settings</Title2>
                    </DialogTitle>
                    <DialogContent>
                        <Field label="First week at">
                            <DatePicker ref={firstWeekRef} />
                        </Field>
                    </DialogContent>
                    <DialogActions>
                        <DialogTrigger action="close" disableButtonEnhancement>
                            <Button appearance="secondary">Close</Button>
                        </DialogTrigger>
                        <Button appearance="primary">Confirm</Button>
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    );
}
