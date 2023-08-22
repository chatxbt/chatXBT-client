import React, { useState } from "react";
import TabButton from "./TabButton";

interface ArrObj {
    title: string;
    url: string;
}

interface Props {
    children: any;
    tabs: ArrObj[];
    selected: string;
    setSelected: (props: string) => void;
    classNameHeader?: string;
    classNameTabContainer?: string;
    classNameMainContainer?: string;
    classNameActive?: string;
    classNameAdd?: string;
    onClick?: () => void;
    addBtn?: boolean;
    id?: string;
}

const TabComponent = ({
    children,
    tabs,
    selected,
    setSelected,
    classNameActive,
    classNameHeader,
    classNameTabContainer,
    classNameMainContainer,
    classNameAdd,
    onClick,
    addBtn,
    id
}: Props) => {
    return (
        <>
            <div className={classNameTabContainer}>
                <div className={classNameHeader}>
                    {tabs &&
                        tabs.map((data, index) => {
                            const active = data.title === selected ? classNameActive : "";
                            // const { nav } = data;
                            return (
                                <TabButton
                                    key={index}
                                    text={data.title}
                                    className={active}
                                    url={data.url}
                                    onClick={() => setSelected(data.title)}
                                    id={id}
                                />
                            );
                        })}
                </div>
                <div className={classNameMainContainer}>{children}</div>
            </div>
        </>
    );
};

export default TabComponent;
