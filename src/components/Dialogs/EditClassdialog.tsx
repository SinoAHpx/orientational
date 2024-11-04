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
    Toast,
    ToastBody,
    Toaster,
    ToastTitle,
    useId,
    useToastController,
} from "@fluentui/react-components";
import { ClassData } from "../../models/class-data.model";
import { useRef } from "react";
import Flex from "../Universal/Flex";
import { TimePicker } from "@fluentui/react-timepicker-compat";
import { timeLocalizer } from "../utils/time";

export default function EditClassDialog({
    open,
    onClose,
    data,
}: {
    open: boolean;
    onClose: (data: ClassData | null) => void;
    data: ClassData;
}) {
    const titleRef = useRef<HTMLInputElement>(null);
    const roomRef = useRef<HTMLInputElement>(null);
    const startTimeRef = useRef<HTMLInputElement>(null);
    const endTimeRef = useRef<HTMLInputElement>(null);
    const weekdayRef = useRef<HTMLInputElement>(null);
    const weekDurationRef = useRef<HTMLInputElement>(null);
    const classFrequencyRef = useRef<HTMLInputElement>(null);
    const teacherRef = useRef<HTMLInputElement>(null);

    const toasterId = useId("alert");
    const { dispatchToast } = useToastController(toasterId);
    const notify = () =>
        dispatchToast(
            <Toast>
                <ToastTitle>Alert</ToastTitle>
                <ToastBody>Please fill the required fields.</ToastBody>
            </Toast>,
            { intent: "error" }
        );

    const handleClose = () => {
        onClose(null);
    };

    const handleDelete = () => {
        onClose({ ...data, title: "delete" });
    };

    const handleSave = () => {
        if (
            titleRef.current &&
            roomRef.current &&
            startTimeRef.current &&
            endTimeRef.current &&
            weekdayRef.current &&
            weekDurationRef.current &&
            classFrequencyRef.current &&
            teacherRef.current
        ) {
            const newClassData: ClassData = {
                title: titleRef.current.value,
                room: roomRef.current.value,
                startTime: startTimeRef.current.value,
                endTime: endTimeRef.current.value,
                weekday: weekdayRef.current.value,
                weekDuration: parseInt(weekDurationRef.current.value) || 16,
                classFrequency: classFrequencyRef.current.value,
                teacher: teacherRef.current.value,
                identifier: data.identifier,
            };
            //#region check required fields
            if (
                titleRef.current.value == "" ||
                roomRef.current.value == "" ||
                startTimeRef.current.value == "" ||
                endTimeRef.current.value == "" ||
                weekdayRef.current.value == ""
            ) {
                notify();
                return;
            }
            //#endregion

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
                        <Toaster toasterId={toasterId} />
                        <Flex direction="column" gap="5px">
                            <Field label="Class title" required>
                                <Input
                                    defaultValue={data.title}
                                    ref={titleRef}
                                    name="title"
                                    id="title"
                                />
                            </Field>
                            <Field label="Room / Building" required>
                                <Input
                                    defaultValue={data.room}
                                    ref={roomRef}
                                    name="room"
                                    id="room"
                                />
                            </Field>
                            <Flex gap="15px">
                                <Field
                                    style={{ width: "50%", margin: "auto" }}
                                    label="Start time"
                                    required
                                >
                                    <TimePicker
                                        defaultValue={data.startTime}
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
                                        defaultValue={data.endTime}
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
                                <Combobox
                                    defaultValue={data.weekday}
                                    ref={weekdayRef}
                                    name="weekday"
                                    id="weekday"
                                >
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
                                    defaultValue={data.weekDuration.toString()}
                                    ref={weekDurationRef}
                                    type="number"
                                    name="weekDuration"
                                    id="weekDuration"
                                />
                            </Field>
                            <Field label="Class frequency">
                                <Combobox
                                    defaultValue={data.classFrequency}
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
                                    defaultValue={data.teacher || ""}
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
                        <Button onClick={handleDelete} appearance="secondary">
                            Delete
                        </Button>
                        <Button onClick={handleSave} appearance="primary">
                            Add
                        </Button>
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    );
}
