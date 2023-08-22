import React from "react";

interface Props {
    isSelected: boolean;
    children: any;
}

const TabRenderer = ({ isSelected, children }: Props) => {
    if (isSelected) {
        return <>{children}</>;
    }
    return null;
};

export default TabRenderer;
