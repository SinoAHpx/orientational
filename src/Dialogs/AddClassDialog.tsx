import {
    Dialog,
    DialogBody,
    DialogSurface,
    DialogTitle,
    Title1,
} from "@fluentui/react-components";
import { ClassData } from "../models/class-data.model";

interface EditDialogData {
    isOpen: boolean;
    data: ClassData;
}



export default function AddClassDialog() {
    return (
        <Dialog>
            <DialogSurface>
                <DialogBody>
                    <DialogTitle>
                        <Title1>Hello, this is me</Title1>
                    </DialogTitle>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    );
}
