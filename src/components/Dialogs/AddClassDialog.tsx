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
import { useRef } from "react";
import Flex from "../../Universal/Flex";
import { TimePicker } from "@fluentui/react-timepicker-compat";

export default function AddClassDialog({
    open,
    data = null,
    onClose = null,
}: {
    data?: ClassData | null;
    open: boolean;
    onClose?: ((data: ClassData) => void) | null;
}) {
    const titleRef = useRef<HTMLInputElement>(null);
    const roomRef = useRef<HTMLInputElement>(null);
    const startTimeRef = useRef<HTMLInputElement>(null);
    const endTimeRef = useRef<HTMLInputElement>(null);
    const weekdayRef = useRef<HTMLInputElement>(null);
    const weekDurationRef = useRef<HTMLInputElement>(null);
    const classFrequencyRef = useRef<HTMLInputElement>(null);
    const teacherRef = useRef<HTMLInputElement>(null);

    const isEdit = data !== null;

    return (
        <Dialog
            open={open}
            onOpenChange={() => {
                if (onClose) {
                    onClose({
                        title: titleRef.current?.value ?? "",
                        teacher: teacherRef.current?.value ?? null,
                        startTime: startTimeRef.current?.value ?? "7:00",
                        endTime: endTimeRef.current?.value ?? "8:00",
                        room: roomRef.current?.value ?? "",
                        weekday: weekdayRef.current?.value ?? "",
                        weekDuration: parseInt(
                            weekDurationRef.current?.value ?? "1"
                        ),
                        classFrequency:
                            classFrequencyRef.current?.value ?? "weekly",
                    });
                }
            }}
        >
            <DialogSurface>
                <DialogBody>
                    <DialogTitle>
                        <Title2>Add a class</Title2>
                    </DialogTitle>
                    <DialogContent>
                        <Flex direction="column" gap="5px">
                            <Field label="Class title" required>
                                <Input ref={titleRef} value={data?.title} />
                            </Field>
                            <Field label="Room / Building" required>
                                <Input ref={roomRef} value={data?.room} />
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
                                        value={data?.startTime}
                                        ref={startTimeRef}
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
                                        value={data?.endTime}
                                        ref={endTimeRef}
                                    />
                                </Field>
                            </Flex>
                            <Field label="Weekday" required>
                                <Combobox defaultValue={data?.weekday} ref={weekdayRef}>
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
                                    type="number"
                                    value={data?.weekDuration?.toString()}
                                    ref={weekDurationRef}
                                />
                            </Field>
                            <Field label="Class frequency">
                                <Combobox
                                    freeform={false}
                                    defaultValue="Every week"
                                    value={data?.classFrequency}
                                    ref={classFrequencyRef}
                                >
                                    <Option>Every week</Option>
                                    <Option>Every 2 weeks</Option>
                                    <Option>Every 3 weeks</Option>
                                </Combobox>
                            </Field>
                            <Field label="Teacher">
                                <Input
                                    value={data?.teacher ?? ""}
                                    placeholder="Teacher name"
                                    ref={teacherRef}
                                />
                            </Field>
                        </Flex>
                    </DialogContent>
                    <DialogActions>
                        <DialogTrigger action="close" disableButtonEnhancement>
                            <Button appearance="secondary">Close</Button>
                        </DialogTrigger>
                        {isEdit && (
                            <DialogTrigger action="close" disableButtonEnhancement>
                                <Button appearance="secondary"
                                    style={{ backgroundColor: "#da3b01", color: "white" }}
                                >
                                    Delete
                                </Button>
                            </DialogTrigger>
                        )}
                        <Button appearance="primary">{isEdit ? "Edit" : "Add"}</Button>
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    );
}
