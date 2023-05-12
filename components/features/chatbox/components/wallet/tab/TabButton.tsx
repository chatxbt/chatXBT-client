import React from "react";

interface Props {
    text: any;
    className: any;
    onClick: () => void;
    id: any;
    url: any;
}

const TabButton = ({ text, className, onClick, url, id }: Props) => {
    return (
        <div id={id}>
            <button onClick={onClick} className={className}>
                {text}
            </button>
            {className && <span></span>}
        </div>
    );
};

export default TabButton;
