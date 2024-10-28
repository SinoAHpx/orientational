import { createContext } from "react";
import { ClassData } from "./class-data.model";

export interface EditDialogData {
    isOpen: boolean;
    data: ClassData;
}

export const DialogContext = createContext<EditDialogData>({
    isOpen: false,
    data: {} as ClassData,
});
