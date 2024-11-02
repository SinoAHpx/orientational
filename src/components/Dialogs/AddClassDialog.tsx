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
import { timeLocalizer } from "../utils/time";

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

    const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
        if (onClose) {
            onClose(classData);
        }
        
        const formData = new FormData(e.currentTarget);
        
        const newClassData: ClassData = {
            title: formData.get('title') as string,
            room: formData.get('room') as string,
            startTime: formData.get('startTime') as string,
            endTime: formData.get('endTime') as string,
            weekday: formData.get('weekday') as string,
            weekDuration: parseInt(formData.get('weekDuration') as string),
            classFrequency: formData.get('classFrequency') as string,
            teacher: formData.get('teacher') as string,
        };
        e.preventDefault();
        
        if (onClose) {
            onClose(newClassData);
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogSurface>
                <form onSubmit={handleSave}>
                    <DialogBody>
                        <DialogTitle>
                            <Title2>Add a class</Title2>
                        </DialogTitle>
                        <DialogContent>
                            <Flex direction="column" gap="5px">
                                <Field label="Class title" required>
                                    <Input name="title" id="title" />
                                </Field>
                                <Field label="Room / Building" required>
                                    <Input name="room" id="room" />
                                </Field>
                                <Flex gap="15px">
                                    <Field
                                        style={{ width: "50%", margin: "auto" }}
                                        label="Start time"
                                        required
                                    >
                                        <TimePicker
                                            name="startTime"
                                            id="startTime"
                                            increment={5}
                                            startHour={7}
                                            endHour={23}
                                            formatDateToTimeString={timeLocalizer}
                                        />
                                    </Field>
                                    <Field
                                        style={{ width: "50%", margin: "auto" }}
                                        label="End time"
                                        required
                                    >
                                        <TimePicker
                                            name="endTime"
                                            id="endTime"
                                            increment={5}
                                            startHour={7}
                                            endHour={23}
                                            formatDateToTimeString={timeLocalizer}
                                        />
                                    </Field>
                                </Flex>
                                <Field label="Weekday" required>
                                    <Combobox name="weekday" id="weekday">
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
                                    <Input type="number" name="weekDuration" id="weekDuration" />
                                </Field>
                                <Field label="Class frequency">
                                    <Combobox name="classFrequency" freeform={false} id="classFrequency">
                                        <Option>Every week</Option>
                                        <Option>Every 2 weeks</Option>
                                        <Option>Every 3 weeks</Option>
                                    </Combobox>
                                </Field>
                                <Field label="Teacher">
                                    <Input
                                        name="teacher"
                                        placeholder="Teacher name"
                                        id="teacher"
                                    />
                                </Field>
                            </Flex>
                        </DialogContent>
                        <DialogActions>
                            <DialogTrigger
                                action="close"
                                disableButtonEnhancement
                            >
                                <Button appearance="secondary">Close</Button>
                            </DialogTrigger>
                            <Button appearance="primary" type="submit">
                                Add
                            </Button>
                        </DialogActions>
                    </DialogBody>
                </form>
            </DialogSurface>
        </Dialog>
    );
}
