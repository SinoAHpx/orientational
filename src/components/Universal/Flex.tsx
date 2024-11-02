import React from "react";

type FlexProps = {
    style?: React.CSSProperties;
    className?: string;
    direction?: "row" | "column";
    children: React.ReactNode;
    justifyContent?:
        | "flex-start"
        | "flex-end"
        | "center"
        | "space-between"
        | "space-around"
        | "space-evenly";
    alignItems?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
    gap?: string;
};

export default function Flex({
    style,
    className,
    direction = "row",
    gap,
    justifyContent,
    alignItems,
    children,
}: FlexProps) {
    return (
        <div
            style={{
                ...style,
                display: "flex",
                flexDirection: direction,
                justifyContent,
                alignItems,
                gap,
            }}
            className={className}
        >
            {children}
        </div>
    );
}
