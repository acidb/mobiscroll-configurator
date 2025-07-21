import React from "react";

interface BooleanConfigProps {
    value: boolean;
    onChange: (val: boolean) => void;
    label: string;
    id?: string;
}

export const BooleanConfig: React.FC<BooleanConfigProps> = ({
    value,
    onChange,
    label,
}) => (
    <div className="flex items-center justify-between py-2 ">
        <kbd
            className="
                kbd rounded-sm cursor-pointer select-none
                border-b-2
                transition-all duration-100
                active:scale-98
                active:shadow-none
                active:border-b-1
                focus:outline-none
            "
            onClick={() => onChange(!value)}
            tabIndex={0}
        >
            {label}
        </kbd>

        <input type="checkbox" checked={value} onChange={() => onChange(!value)} className="toggle toggle-success" />
    </div>


);
