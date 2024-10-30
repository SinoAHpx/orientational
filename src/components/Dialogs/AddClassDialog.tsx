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
import { useEffect, useState } from "react";
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
    const isEdit = data !== null;
    console.log(data);

    const [classData, setClassData] = useState<ClassData>(
        data ?? {
            title: "awd",
            room: "",
            startTime: "7:00",
            endTime: "8:00",
            weekday: "",
            weekDuration: 1,
            classFrequency: "weekly",
            teacher: "",
        }
    );

    useEffect(() => {
        setClassData(data ?? defaultClassData);
    }, [data]);

    return (
        <Dialog
            open={open}
            onOpenChange={() => {
                if (onClose) {
                    onClose(classData!);
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
                                <Input
                                    value={classData?.title}
                                    onChange={(e) =>
                                        setClassData({
                                            ...classData,
                                            title: e.target.value,
                                        })
                                    }
                                />
                            </Field>
                            <Field label="Room / Building" required>
                                <Input
                                    value={classData?.room}
                                    onChange={(e) =>
                                        setClassData({
                                            ...classData,
                                            room: e.target.value,
                                        })
                                    }
                                />
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
                                        value={classData?.startTime}
                                        onChange={(e) =>
                                            setClassData({
                                                ...classData,
                                                startTime: e.target.value,
                                            })
                                        }
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
                                        value={classData?.endTime}
                                        onChange={(e) =>
                                            setClassData({
                                                ...classData,
                                                endTime: e.target.value,
                                            })
                                        }
                                    />
                                </Field>
                            </Flex>
                            <Field label="Weekday" required>
                                <Combobox
                                    defaultValue={classData?.weekday}
                                    onChange={(e) =>
                                        setClassData({
                                            ...classData,
                                            weekday: e.target.value,
                                        })
                                    }
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
                                    type="number"
                                    value={classData?.weekDuration?.toString()}
                                    onChange={(e) =>
                                        setClassData({
                                            ...classData,
                                            weekDuration: parseInt(
                                                e.target.value
                                            ),
                                        })
                                    }
                                />
                            </Field>
                            <Field label="Class frequency">
                                <Combobox
                                    freeform={false}
                                    value={classData?.classFrequency}
                                    onChange={(e) =>
                                        setClassData({
                                            ...classData,
                                            classFrequency: e.target.value,
                                        })
                                    }
                                >
                                    <Option>Every week</Option>
                                    <Option>Every 2 weeks</Option>
                                    <Option>Every 3 weeks</Option>
                                </Combobox>
                            </Field>
                            <Field label="Teacher">
                                <Input
                                    placeholder="Teacher name"
                                    value={classData?.teacher ?? ""}
                                    onChange={(e) =>
                                        setClassData({
                                            ...classData,
                                            teacher: e.target.value,
                                        })
                                    }
                                />
                            </Field>
                        </Flex>
                    </DialogContent>
                    <DialogActions>
                        <DialogTrigger action="close" disableButtonEnhancement>
                            <Button appearance="secondary">Close</Button>
                        </DialogTrigger>
                        {isEdit && (
                            <DialogTrigger
                                action="close"
                                disableButtonEnhancement
                            >
                                <Button
                                    appearance="secondary"
                                    style={{
                                        backgroundColor: "#da3b01",
                                        color: "white",
                                    }}
                                >
                                    Delete
                                </Button>
                            </DialogTrigger>
                        )}
                        <Button appearance="primary">
                            {isEdit ? "Edit" : "Add"}
                        </Button>
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    );
}
