import React from "react";
import { Datepicker, MbscEventcalendarView } from "@mobiscroll/react";

const ENUM_OPTIONS: Record<string, string[]> = {
    type: ["month", "week", "day", "year"],
    eventDisplay: ["fill", "exact"],
    scroll: ["horizontal", "vertical"],
    eventHeight: ["variable", "equal"],
    resolution: ["month", "day", "year", "week", "hour", "quarter"],
    resolutionHorizontal: ["month", "day", "year", "week", "hour", "quarter"],
    resolutionVertical: ["day"],
};

const ENUM_COLORS: Record<string, "blue" | "green" | "default"> = {
    type: "blue",
    eventDisplay: "green",
    scroll: "default",
    eventHeight: "default",
    resolution: "default",
    resolutionHorizontal: "default",
    resolutionVertical: "default",
};

type EnumTabBarProps = {
    value: string;
    options: string[];
    onChange: (val: string) => void;
    color?: "blue" | "green" | "default";
    name: string;
};

const colorMap = {
    blue: {
        active: "tab-active bg-blue-100 border-blue-400 text-blue-700",
        inactive: "bg-white border-gray-200 text-gray-500"
    },
    green: {
        active: "tab-active bg-green-100 border-green-400 text-green-700",
        inactive: "bg-white border-gray-200 text-gray-500"
    },
    default: {
        active: "tab-active bg-gray-100 border-gray-400 text-gray-700",
        inactive: "bg-white border-gray-200 text-gray-500"
    }
};

const EnumTabBar: React.FC<EnumTabBarProps> = ({ value, options, onChange, color = "default", name }) => (
    <div className="flex items-center gap-2">
        {options.map(option => (
            <label
                key={option}
                className={`
                    tab px-2 py-1 text-xs rounded-md border
                    ${value === option
                        ? colorMap[color].active
                        : colorMap[color].inactive}
                    cursor-pointer transition-all
                `}
                style={{
                    minWidth: 56,
                    minHeight: 24,
                }}
            >
                <input
                    type="radio"
                    name={name}
                    className="sr-only"
                    aria-label={option}
                    checked={value === option}
                    onChange={() => onChange(option)}
                />
                {option}
            </label>
        ))}
    </div>
);

export type ViewEditorProps = {
    view: MbscEventcalendarView;
    onChange: (view: MbscEventcalendarView) => void;
};

export const ViewEditor: React.FC<ViewEditorProps> = ({ view, onChange }) => {
    return (
        <div className="flex flex-col gap-4">
            {Object.entries(view).map(([mode, config]) => {
                if (!config) return null;
                return (
                    <div key={mode}>
                        <div className="flex items-center gap-3 justify-between ml-3 border-b-1 border-gray-200 py-2">
                            <kbd className="kbd rounded-sm text-xs px-2 py-0.5">{mode}</kbd>
                        </div>
                        <div className="flex flex-col gap-1 mb-2">
                            {Object.entries(config).map(([key, value]) => {

                                if (
                                    typeof value === "object" &&
                                    value !== null &&
                                    !Array.isArray(value)
                                )
                                    return null;
                                if (Array.isArray(value)) return null;

                                return (
                                    <div
                                        key={key}
                                        className="flex items-center gap-3 justify-between ml-6 border-b-1 border-gray-200 py-2"
                                    >
                                        <kbd className="kbd rounded-sm text-xs px-2 py-0.5">{key}</kbd>
                                        {typeof value === "boolean" && (
                                            <input
                                                type="checkbox"
                                                className="toggle toggle-success"
                                                checked={!!value}
                                                onChange={e =>
                                                    onChange({
                                                        ...view,
                                                        [mode]: {
                                                            ...config,
                                                            [key]: e.target.checked
                                                        }
                                                    })
                                                }
                                            />
                                        )}

                                        {(key === "startTime" || key === "endTime") ? (
                                            <Datepicker
                                                controls={['time']}
                                                timeFormat="HH:mm"
                                                touchUi={true}
                                                display="anchored"
                                                value={value as string}
                                                onChange={(e) => {
                                                    const date = e.value as Date;
                                                    const formattedTime = date
                                                        ? `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
                                                        : '';

                                                    onChange({
                                                        ...view,
                                                        [mode]: {
                                                            ...config,
                                                            [key]: formattedTime,
                                                        },
                                                    });
                                                }}
                                                inputProps={{
                                                    className: "input input-xs w-20 max-w-[80px] text-xs rounded-sm h-8 px-2",
                                                    style: {
                                                        fontSize: '0.75rem',
                                                        height: '2rem',
                                                    },

                                                }}
                                            />


                                        ) : (
                                            typeof value === "string" && !ENUM_OPTIONS[key] && (
                                                <input
                                                    className="input input-xs w-32"
                                                    value={value}
                                                    onChange={e =>
                                                        onChange({
                                                            ...view,
                                                            [mode]: {
                                                                ...config,
                                                                [key]: e.target.value,
                                                            },
                                                        })
                                                    }
                                                />
                                            )
                                        )}

                                        {typeof value === "number" && (
                                            <input
                                                type="number"
                                                className="input input-xs w-20"
                                                value={value}
                                                onChange={e =>
                                                    onChange({
                                                        ...view,
                                                        [mode]: {
                                                            ...config,
                                                            [key]: Number(e.target.value)
                                                        }
                                                    })
                                                }
                                            />
                                        )}
                                        {ENUM_OPTIONS[key] && (
                                            <EnumTabBar
                                                value={value as string}
                                                options={ENUM_OPTIONS[key]}
                                                onChange={val =>
                                                    onChange({
                                                        ...view,
                                                        [mode]: {
                                                            ...config,
                                                            [key]: val
                                                        }
                                                    })
                                                }
                                                color={ENUM_COLORS[key] || "default"}
                                                name={`tabs_${mode}_${key}`}
                                            />
                                        )}

                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
