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
import { useState } from "react";

export default function SettingsDialog({
    trigger,
    open,
}: {
    trigger: JSX.Element;
    open: boolean;
}) {
    const [isOpen, setIsOpen] = useState(open);

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(_event, data) => {
                setIsOpen(data.open);
            }}
        >
            <DialogTrigger>{trigger}</DialogTrigger>
            <DialogSurface>
                <DialogBody>
                    <DialogTitle>
                        <Title2>Settings</Title2>
                    </DialogTitle>
                    <DialogContent>
                        <Field label="First week at">
                            <DatePicker />
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
