import {
    Badge,
    Button,
    Card,
    DialogTrigger,
    Input,
} from "@fluentui/react-components";
import { AddRegular, SearchRegular } from "@fluentui/react-icons";
import Flex from "../Universal/Flex";
import AddClassDialog from "../Dialogs/AddClassDialog";
import { DialogContext } from "../models/dialog-context.model";
import { useState } from "react";

interface HomeBarProps {
    style?: React.CSSProperties;
}

export default function HomeBar({ style }: HomeBarProps) {
    const [showDialog, setShowDialog] = useState(false);
    const handleAddClick = () => {
        setShowDialog(true);
    };

    return (
        <>
            <Card
                size="large"
                style={{
                    ...style,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <Flex gap="15px">
                    <Badge
                        color="informative"
                        style={{ padding: "20px", alignSelf: "center" }}
                    >
                        {new Date().toLocaleString("en-US", {
                            month: "long",
                            day: "numeric",
                        })}
                        {/*todo: the week is actually mocking*/}, Week 7
                    </Badge>

                    <AddClassDialog
                        trigger={
                            <Button
                                icon={<AddRegular />}
                                appearance="primary"
                                onClick={handleAddClick}
                            >
                                Add
                            </Button>
                        }
                        open={showDialog}
                        onClose={() => {}}
                    />

                    {/* <DialogTrigger>
                        
                    </DialogTrigger> */}
                </Flex>

                <Flex gap="15px">
                    <Button>Export</Button>
                    <Button>Import</Button>
                    <Button>Settings</Button>
                </Flex>

                <Flex gap="15px">
                    <Input placeholder="Search for classes" />
                    <Button icon={<SearchRegular />}>Search</Button>
                </Flex>
            </Card>
        </>
    );
}
