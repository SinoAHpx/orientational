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
import Flex from "../Universal/Flex";
import { TimePicker } from "@fluentui/react-timepicker-compat";
import { timeLocalizer } from "../utils/time";

export default function EditClassDialog({
    open,
    data,
    onClose = null,
}: {
    data: ClassData;
    open: boolean;
    onClose?: ((data: ClassData) => void) | null;
}) {
    const [classData, setClassData] = useState(data);
    useEffect(() => {
        setClassData(data);
    }, [data]);

    const handleClose = () => {
        if (onClose) {
            onClose(defaultClassData);
        }
    };

    const handleSave = () => {
        if (onClose) {
            onClose(classData);
        }
    };

    const handleInputChange = (field: keyof ClassData, value: any) => {
        setClassData((prev) => ({
            ...prev,
            [field]: value,
        }));
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
                                <Input
                                    value={classData.title}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "title",
                                            e.target.value
                                        )
                                    }
                                />
                            </Field>
                            <Field label="Room / Building" required>
                                <Input
                                    value={classData.room}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "room",
                                            e.target.value
                                        )
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
                                        value={classData.startTime}
                                        onTimeChange={(_e, d) =>
                                            handleInputChange(
                                                "startTime",
                                                timeLocalizer(d.selectedTime!)
                                            )
                                        }
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
                                        value={classData.endTime}
                                        onTimeChange={(_e, d) =>
                                            handleInputChange(
                                                "endTime",
                                                timeLocalizer(d.selectedTime!)
                                            )
                                        }
                                        increment={5}
                                        startHour={7}
                                        endHour={23}
                                        formatDateToTimeString={timeLocalizer}
                                    />
                                </Field>
                            </Flex>
                            <Field label="Weekday" required>
                                <Combobox value={classData.weekday}>
                                    <Option
                                        onClick={() =>
                                            handleInputChange(
                                                "weekday",
                                                "Monday"
                                            )
                                        }
                                    >
                                        Monday
                                    </Option>
                                    <Option
                                        onClick={() =>
                                            handleInputChange(
                                                "weekday",
                                                "Tuesday"
                                            )
                                        }
                                    >
                                        Tuesday
                                    </Option>
                                    <Option
                                        onClick={() =>
                                            handleInputChange(
                                                "weekday",
                                                "Wednesday"
                                            )
                                        }
                                    >
                                        Wednesday
                                    </Option>
                                    <Option
                                        onClick={() =>
                                            handleInputChange(
                                                "weekday",
                                                "Thursday"
                                            )
                                        }
                                    >
                                        Thursday
                                    </Option>
                                    <Option
                                        onClick={() =>
                                            handleInputChange(
                                                "weekday",
                                                "Friday"
                                            )
                                        }
                                    >
                                        Friday
                                    </Option>
                                    <Option
                                        onClick={() =>
                                            handleInputChange(
                                                "weekday",
                                                "Saturday"
                                            )
                                        }
                                    >
                                        Saturday
                                    </Option>
                                    <Option
                                        onClick={() =>
                                            handleInputChange(
                                                "weekday",
                                                "Sunday"
                                            )
                                        }
                                    >
                                        Sunday
                                    </Option>
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
                                    value={classData.weekDuration.toString()}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "weekDuration",
                                            parseInt(e.target.value)
                                        )
                                    }
                                />
                            </Field>
                            <Field label="Class frequency">
                                <Combobox
                                    freeform={false}
                                    value={classData.classFrequency}
                                >
                                    <Option
                                        onClick={() =>
                                            handleInputChange(
                                                "classFrequency",
                                                "Every week"
                                            )
                                        }
                                    >
                                        Every week
                                    </Option>
                                    <Option
                                        onClick={() =>
                                            handleInputChange(
                                                "classFrequency",
                                                "Every 2 weeks"
                                            )
                                        }
                                    >
                                        Every 2 weeks
                                    </Option>
                                    <Option
                                        onClick={() =>
                                            handleInputChange(
                                                "classFrequency",
                                                "Every 3 weeks"
                                            )
                                        }
                                    >
                                        Every 3 weeks
                                    </Option>
                                </Combobox>
                            </Field>
                            <Field label="Teacher">
                                <Input
                                    placeholder="Teacher name"
                                    value={classData.teacher ?? ""}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "teacher",
                                            e.target.value
                                        )
                                    }
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
                            onClick={() => onClose && onClose(classData)}
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
