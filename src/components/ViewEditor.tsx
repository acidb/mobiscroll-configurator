import React from "react";
export type ViewType = "month" | "week" | "day";

export interface ViewModeConfig {
    type?: ViewType;
    eventDisplay?: string;
    startTime?: string;
    endTime?: string;
    allDay?: boolean;
}

export interface ViewConfig {
    calendar?: ViewModeConfig;
    timeline?: ViewModeConfig;
    agenda?: ViewModeConfig;
    schedule?: ViewModeConfig;
}

interface ViewEditorProps {
    view: ViewConfig;
    onChange: (view: ViewConfig) => void;
}

const TABS: { label: string; value: ViewType }[] = [
    { label: "Month", value: "month" },
    { label: "Week", value: "week" },
    { label: "Day", value: "day" },
];

export const ViewEditor: React.FC<ViewEditorProps> = ({ view, onChange }) => {
    return (
        <div className="flex flex-col gap-4">
            {Object.entries(view).map(([mode, config]) => {
                if (!config) return null;
                return (
                    <div key={mode}>
                        <div className="flex items-center gap-2 mb-2">
                            <kbd className="kbd rounded-sm text-xs px-2 py-0.5">{mode}</kbd>
                        </div>
                        <div className="flex flex-col gap-1 mb-2">
                            {Object.entries(config).map(([key, value]) => (
                                <div key={key} className="flex items-center gap-3 justify-between">
                                    <kbd className="kbd rounded-sm text-xs px-2 py-0.5">{key}</kbd>

                                    {key === "type" && (
                                        <div className="ml-3"> 
                                            <div className="flex items-center gap-2">
                                                {TABS.map(tab => (
                                                    <label
                                                        key={tab.value}
                                                        className={`
                                                            tab px-2 py-1 text-xs rounded-md border 
                                                            ${config.type === tab.value
                                                                ? 'tab-active bg-blue-100 border-blue-400 text-blue-700'
                                                                : 'bg-white border-gray-200 text-gray-500'}
                                                            cursor-pointer transition-all
                                                        `}
                                                        style={{
                                                            minWidth: 56,
                                                            minHeight: 24,
                                                        }}
                                                    >
                                                        <input
                                                            type="radio"
                                                            name={`my_tabs_${mode}`}
                                                            className="sr-only"
                                                            aria-label={tab.label}
                                                            checked={config.type === tab.value}
                                                            onChange={() =>
                                                                onChange({
                                                                    ...view,
                                                                    [mode]: {
                                                                        ...config,
                                                                        type: tab.value,
                                                                    },
                                                                })
                                                            }
                                                        />
                                                        {tab.label}
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
