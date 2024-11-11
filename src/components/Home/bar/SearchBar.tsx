import {
    Input,
    TeachingPopover,
    TeachingPopoverTrigger,
    Button,
    TeachingPopoverSurface,
    TeachingPopoverHeader,
    TeachingPopoverBody,
    Title3,
    Badge,
} from "@fluentui/react-components";
import { database } from "../../../utils/database";
import Flex from "../../universal/Flex";
import { useState, useRef } from "react";
import { defaultClassData } from "../../../models/class-data.model";
import { SearchRegular } from "@fluentui/react-icons";

export default function SearchBar() {
    const [searchResult, setSearchResult] = useState({
        open: false,
        data: defaultClassData,
    });
    
    const searchRef = useRef<HTMLInputElement>(null);

    return (
        <>
            <Input ref={searchRef} placeholder="Search for classes" />

            <TeachingPopover
                open={searchResult.open}
                onOpenChange={() => {
                    if (searchRef.current && searchRef.current.value != "") {
                        const data = database.data.classes.filter((c) =>
                            c.title.includes(searchRef.current!.value!)
                        )[0];
                        if (data === undefined || data === null) {
                            return;
                        }

                        setSearchResult({
                            open: !searchResult.open,
                            data,
                        });
                    }
                }}
            >
                <TeachingPopoverTrigger disableButtonEnhancement>
                    <Button icon={<SearchRegular />}>Search</Button>
                </TeachingPopoverTrigger>
                <TeachingPopoverSurface>
                    <TeachingPopoverHeader>Searching</TeachingPopoverHeader>
                    <TeachingPopoverBody>
                        <Title3>{searchResult.data.title}</Title3>
                        <Flex gap="10px">
                            <Badge style={{ padding: "15px" }}>
                                {searchResult.data.room}
                            </Badge>
                            <Badge
                                color="informative"
                                style={{ padding: "15px" }}
                            >
                                {searchResult.data.startTime}-
                                {searchResult.data.endTime}
                            </Badge>
                        </Flex>
                    </TeachingPopoverBody>
                </TeachingPopoverSurface>
            </TeachingPopover>
        </>
    );
}
