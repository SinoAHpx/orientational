import {
    Button,
    Combobox,
    Dialog,
    DialogActions,
    DialogBody,
    DialogContent,
    DialogSurface,
    DialogTitle,
    DialogTrigger,
    Field,
    InfoLabel,
    Input,
    Option,
    Title2,
} from "@fluentui/react-components";
import { ClassData, defaultClassData } from "../../models/class-data.model";
import { useState } from "react";
import Flex from "../Universal/Flex";
import { TimePicker } from "@fluentui/react-timepicker-compat";

export default function AddClassDialog({
    open,
    onClose = null,
}: {
    data?: ClassData | null;
    open: boolean;
    onClose?: ((data: ClassData | null) => void) | null;
}) {
    const [classData, _setClassData] = useState(defaultClassData);

    const handleClose = () => {
        if (onClose) {
            onClose(null);
        }
    };

    const handleSave = () => {
        if (onClose) {
            onClose(classData);
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
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
                                <Combobox freeform={false}>
                                    <Option>Every week</Option>
                                    <Option>Every 2 weeks</Option>
                                    <Option>Every 3 weeks</Option>
                                </Combobox>
                            </Field>
                            <Field label="Teacher">
                                <Input placeholder="Teacher name" />
                            </Field>
                        </Flex>
                    </DialogContent>
                    <DialogActions>
                        <DialogTrigger action="close" disableButtonEnhancement>
                            <Button appearance="secondary">Close</Button>
                        </DialogTrigger>
                        <Button appearance="primary" onClick={handleSave}>
                            Add
                        </Button>
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    );
}
