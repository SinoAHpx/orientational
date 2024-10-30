import {
    Button,
    Combobox,
    Dialog,
    DialogActions,
    DialogBody,
    DialogContent,
    DialogOpenChangeData,
    DialogSurface,
    DialogTitle,
    DialogTrigger,
    Field,
    InfoLabel,
    Input,
    Label,
    LabelProps,
    Option,
    Title1,
    Title2,
} from "@fluentui/react-components";
import { ClassData } from "../../models/class-data.model";
import { KeyboardEvent, MouseEvent, useState } from "react";
import Flex from "../../Universal/Flex";
import { TimePicker } from "@fluentui/react-timepicker-compat";

export default function AddClassDialog({
    trigger,
    open,
    data = null,
    onClose = null,
}: {
    trigger: JSX.Element;
    data?: ClassData | null;
    open: boolean;
    onClose?: ((data: ClassData) => void) | null;
}) {
    const [isOpen, setIsOpen] = useState(open);
    const handleClose = (
        _event:
            | KeyboardEvent<HTMLElement>
            | MouseEvent<HTMLElement, globalThis.MouseEvent>,
        data: DialogOpenChangeData
    ) => {
        setIsOpen(data.open);
    };

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(event, data) => handleClose(event, data)}
        >
            <DialogTrigger disableButtonEnhancement>{trigger}</DialogTrigger>
            <DialogSurface>
                <DialogBody>
                    <DialogTitle>
                        <Title2>Add a class</Title2>
                    </DialogTitle>
                    <DialogContent>
                        <Flex direction="column" gap="5px">
                            <Field label="Class title" required>
                                <Input />
                            </Field>
                            <Field label="Room / Building" required>
                                <Input />
                            </Field>
                            <Flex gap="15px">
                                <Field
                                    style={{ width: "50%", margin: "auto" }}
                                    label="Start time"
                                    required
                                >
                                    <TimePicker
                                        increment={5}
                                        startHour={7}
                                        endHour={23}
                                    />
                                </Field>
                                <Field
                                    style={{ width: "50%", margin: "auto" }}
                                    label="End time"
                                    required
                                >
                                    <TimePicker
                                        increment={5}
                                        startHour={7}
                                        endHour={23}
                                    />
                                </Field>
                            </Flex>
                            <Field label="Weekday" required>
                                <Combobox>
                                    <Option>Monday</Option>
                                    <Option>Tuesday</Option>
                                    <Option>Wednesday</Option>
                                    <Option>Thursday</Option>
                                    <Option>Friday</Option>
                                    <Option>Saturday</Option>
                                    <Option>Sunday</Option>
                                </Combobox>
                            </Field>
                            <Field
                                label={
                                    <InfoLabel info="How many weeks will this class persist.">
                                        Week duration
                                    </InfoLabel>
                                }
                            >
                                <Input type="number" />
                            </Field>
                            <Field label="Class frequency">
                                <Combobox
                                    freeform={false}
                                    defaultValue="Every week"
                                >
                                    <Option>Every week</Option>
                                    <Option>Every 2 weeks</Option>
                                    <Option>Every 3 weeks</Option>
                                </Combobox>
                            </Field>
                            <Field label="Teacher">
                                <Input />
                            </Field>
                        </Flex>
                    </DialogContent>
                    <DialogActions>
                        <DialogTrigger action="close" disableButtonEnhancement>
                            <Button appearance="secondary">Close</Button>
                        </DialogTrigger>
                        <Button appearance="primary">Add</Button>
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    );
}
