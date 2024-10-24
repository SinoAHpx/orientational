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
import Flex from "../Universal/Flex";

export default function HomeBar() {
    return (
        <>
            <Card
                size="large"
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <Flex gap="15px">
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
