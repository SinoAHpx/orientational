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
import { useEffect, useRef, useState } from "react";
import Flex from "../../Universal/Flex";
import { TimePicker } from "@fluentui/react-timepicker-compat";

export default function EditClassDialog({
    open,
    data,
    onClose = null,
}: {
    data?: ClassData | null;
    open: boolean;
    onClose?: ((data: ClassData | null) => void) | null;
}) {
    const [classData, setClassData] = useState(data);

    const titleRef = useRef<HTMLInputElement>(null);
    const roomRef = useRef<HTMLInputElement>(null);
    const startTimeRef = useRef<HTMLInputElement>(null);
    const endTimeRef = useRef<HTMLInputElement>(null);
    const weekdayRef = useRef<HTMLInputElement>(null);
    const weekDurationRef = useRef<HTMLInputElement>(null);
    const classFrequencyRef = useRef<HTMLInputElement>(null);
    const teacherRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        console.log(1);
        if (data && titleRef.current && roomRef.current && startTimeRef.current && 
            endTimeRef.current && weekdayRef.current && weekDurationRef.current && 
            classFrequencyRef.current && teacherRef.current) {
                    
            titleRef.current.value = data.title;
            roomRef.current.value = data.room;
            startTimeRef.current.value = data.startTime;
            endTimeRef.current.value = data.endTime;
            weekdayRef.current.value = data.weekday;
            weekDurationRef.current.value = data.weekDuration.toString();
            classFrequencyRef.current.value = data.classFrequency;
            teacherRef.current.value = data.teacher ?? "";
        }
    }, []);

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

    console.log(2);
    

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
                                <Input ref={titleRef} />
                            </Field>
                            <Field label="Room / Building" required>
                                <Input ref={roomRef} />
                            </Field>
                            <Flex gap="15px">
                                <Field
                                    style={{ width: "50%", margin: "auto" }}
                                    label="Start time"
                                    required
                                >
                                    <TimePicker
                                        ref={startTimeRef}
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
                                        ref={endTimeRef}
                                        increment={5}
                                        startHour={7}
                                        endHour={23}
                                    />
                                </Field>
                            </Flex>
                            <Field label="Weekday" required>
                                <Combobox ref={weekdayRef}>
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
                                <Input ref={weekDurationRef} type="number" />
                            </Field>
                            <Field label="Class frequency">
                                <Combobox
                                    ref={classFrequencyRef}
                                    freeform={false}
                                >
                                    <Option>Every week</Option>
                                    <Option>Every 2 weeks</Option>
                                    <Option>Every 3 weeks</Option>
                                </Combobox>
                            </Field>
                            <Field label="Teacher">
                                <Input
                                    ref={teacherRef}
                                    placeholder="Teacher name"
                                />
                            </Field>
                        </Flex>
                    </DialogContent>
                    <DialogActions>
                        <DialogTrigger action="close" disableButtonEnhancement>
                            <Button appearance="secondary">Close</Button>
                        </DialogTrigger>
                        <Button
                                appearance="secondary"
                                style={{
                                    backgroundColor: "#da3b01",
                                    color: "white",
                                }}
                                onClick={() => onClose && onClose(null)}
                            >
                                Delete
                            </Button>
                        <Button appearance="primary" onClick={handleSave}>
                            Add
                        </Button>
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    );
}
