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
import { ClassData } from "../../models/class-data.model";
import Flex from "../Universal/Flex";
import { TimePicker } from "@fluentui/react-timepicker-compat";
import { timeLocalizer } from "../utils/time";
import { useRef } from "react";

export default function AddClassDialog({
    open,
    onClose,
}: {
    data?: ClassData | null;
    open: boolean;
    onClose: (data: ClassData | null) => void;
}) {
    const titleRef = useRef<HTMLInputElement>(null);
    const roomRef = useRef<HTMLInputElement>(null);
    const startTimeRef = useRef<HTMLInputElement>(null);
    const endTimeRef = useRef<HTMLInputElement>(null);
    const weekdayRef = useRef<HTMLInputElement>(null);
    const weekDurationRef = useRef<HTMLInputElement>(null);
    const classFrequencyRef = useRef<HTMLInputElement>(null);
    const teacherRef = useRef<HTMLInputElement>(null);

    const handleClose = () => {
        onClose(null);
    };

    const handleSave = () => {
        if (titleRef.current && roomRef.current && startTimeRef.current && endTimeRef.current && weekdayRef.current && weekDurationRef.current && classFrequencyRef.current && teacherRef.current) {
            const newClassData: ClassData = {
                title: titleRef.current.value,
                room: roomRef.current.value,
                startTime: startTimeRef.current.value,
                endTime: endTimeRef.current.value,
                weekday: weekdayRef.current.value,
                weekDuration: parseInt(weekDurationRef.current.value),
                classFrequency: classFrequencyRef.current.value,
                teacher: teacherRef.current.value,
            };

            onClose(newClassData);
        }
    };

    return (
        <Dialog open={open} onOpenChange={() => handleClose()}>
            <DialogSurface>
                <DialogBody>
                    <DialogTitle>
                        <Title2>Add a class</Title2>
                    </DialogTitle>
                    <DialogContent>
                        <Flex direction="column" gap="5px">
                            <Field label="Class title" required>
                                <Input ref={titleRef} name="title" id="title" />
                            </Field>
                            <Field label="Room / Building" required>
                                <Input ref={roomRef} name="room" id="room" />
                            </Field>
                            <Flex gap="15px">
                                <Field
                                    style={{ width: "50%", margin: "auto" }}
                                    label="Start time"
                                    required
                                >
                                    <TimePicker
                                        ref={startTimeRef}
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
                                        ref={endTimeRef}
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
                                <Combobox ref={weekdayRef} name="weekday" id="weekday">
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
                                <Input
                                    ref={weekDurationRef}
                                    type="number"
                                    name="weekDuration"
                                    id="weekDuration"
                                />
                            </Field>
                            <Field label="Class frequency">
                                <Combobox
                                    ref={classFrequencyRef}
                                    name="classFrequency"
                                    freeform={false}
                                    id="classFrequency"
                                >
                                    <Option>Every week</Option>
                                    <Option>Every 2 weeks</Option>
                                    <Option>Every 3 weeks</Option>
                                </Combobox>
                            </Field>
                            <Field label="Teacher">
                                <Input
                                    ref={teacherRef}
                                    name="teacher"
                                    placeholder="Teacher name"
                                    id="teacher"
                                />
                            </Field>
                        </Flex>
                    </DialogContent>
                    <DialogActions>
                        <DialogTrigger action="close" disableButtonEnhancement>
                            <Button appearance="secondary">Close</Button>
                        </DialogTrigger>
                        <Button
                            onClick={handleSave}
                            appearance="primary"
                        >
                            Add
                        </Button>
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    );
}
