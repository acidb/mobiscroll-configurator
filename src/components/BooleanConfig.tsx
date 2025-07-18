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
    id,
}) => (
    <div className="flex items-center justify-between py-2 ">

        <kbd className="kbd rounded-sm"> {label}</kbd>

        <button
            type="button"
            id={id}
            className={`
        relative w-11 h-6 rounded-full transition bg-gray-200
       ${value ? "bg-green-500" : "bg-gray-200"}
        focus:outline-none focus:ring-2 focus:ring-blue-400
      `}
            aria-pressed={value}
            aria-label={label}
            onClick={() => onChange(!value)}
        >
            <span
                className={`
          absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transition-transform
          ${value ? "translate-x-5" : ""}
        `}
            />
        </button>

    </div>


);
