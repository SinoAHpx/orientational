import {
    Button,
    TeachingPopover,
    TeachingPopoverTrigger,
    TeachingPopoverSurface,
    TeachingPopoverHeader,
    TeachingPopoverBody,
    TeachingPopoverTitle,
    TeachingPopoverFooter,
    Text,
} from "@fluentui/react-components";
import { database } from "../../../utils/database";
import { useState } from "react";

export default function DataMigration() {
    const [showExportHint, setShowExportHint] = useState(false);

    const handleExport = () => {
        if (database.data.classes.length == 0) {
            setShowExportHint(true);
        } else {
            const json = JSON.stringify(database.data);
            const blob = new Blob([json], { type: "application/json" });
            const url = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = "database_export.json";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }
    };

    const handleImport = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".json";

        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    const content = e.target?.result;
                    if (typeof content === "string") {
                        database.data = JSON.parse(content);
                        await database.write();
                    }
                } catch (error) {
                    console.error("Error importing file:", error);
                } finally {
                    reader.onload = null;
                    input.onchange = null;
                    input.remove();

                    window.location.reload();
                }
            };
            reader.readAsText(file);
        };

        input.click();
    };

    //todo: abstract teach popover to a standalone component
    return (
        <>
            <TeachingPopover open={showExportHint} onOpenChange={() => {
                setShowExportHint(!showExportHint)
            }}>
                <TeachingPopoverTrigger>
                    <Button onClick={handleExport}>Export</Button>
                </TeachingPopoverTrigger>
                <TeachingPopoverSurface>
                    <TeachingPopoverHeader>Tips</TeachingPopoverHeader>
                    <TeachingPopoverBody>
                        <TeachingPopoverTitle>
                            There's no classes to export.
                        </TeachingPopoverTitle>
                    </TeachingPopoverBody>
                    <TeachingPopoverFooter primary={"ok"} />
                </TeachingPopoverSurface>
            </TeachingPopover>
            {database.data.classes.length == 0 ? (
                <Button onClick={handleImport}>Import</Button>
            ) : (
                <TeachingPopover>
                    <TeachingPopoverTrigger>
                        <Button>Import</Button>
                    </TeachingPopoverTrigger>
                    <TeachingPopoverSurface>
                        <TeachingPopoverHeader>Tips</TeachingPopoverHeader>
                        <TeachingPopoverBody>
                            <TeachingPopoverTitle>
                                This Action will override current classes
                            </TeachingPopoverTitle>
                            <Text>Press "continue" if you'd confirm.</Text>
                        </TeachingPopoverBody>
                        <TeachingPopoverFooter
                            primary={{
                                onClick: handleImport,
                                children: "Continue",
                            }}
                            secondary="Cancel"
                        />
                    </TeachingPopoverSurface>
                </TeachingPopover>
            )}
        </>
    );
}
