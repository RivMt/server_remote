import React from "react";

type ButtonProps = {
    onClick: () => void
    children: React.ReactNode
}

const ActionButton = ({onClick, children}: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className="btn-action"
        >
            <div className="btn-content">
                {children}
            </div>
        </button>
    )
}

export default ActionButton