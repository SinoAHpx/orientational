import {
    Badge,
    Button,
    Card,
    Divider,
    Input,
    Menu,
    MenuButtonProps,
    MenuTrigger,
    SplitButton,
} from "@fluentui/react-components";
import { AddRegular, SearchRegular } from "@fluentui/react-icons";

export default function HomeBar() {
    return (
        <>
            <Card
                size="large"
                style={{ display: "flex", flexDirection: "row" }}
            >
                <Badge color="informative" style={{ padding: "20px" }}>
                    {new Date().toLocaleString("en-US", {
                        month: "long",
                        day: "numeric",
                    })}
                    {/*todo: the week is actually mocking*/}, Week 7
                </Badge>

                <Button icon={<AddRegular />} appearance="primary">
                    Add
                </Button>
                <Divider vertical />
                <Button>Export</Button>
                <Button>Import</Button>
                <Button>Settings</Button>
                <Divider vertical />
                <Input placeholder="Search for classes" />
                <Button icon={<SearchRegular />}>Search</Button>
            </Card>
        </>
    );
}
