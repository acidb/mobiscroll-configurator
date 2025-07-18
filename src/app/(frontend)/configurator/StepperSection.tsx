import React, { useState } from "react";
import { Group, Component, Preset } from "./types";
import { Calendar1, Wrench, CalendarDays } from "lucide-react";
import { X } from "lucide-react";


interface StepperSectionProps {
    groups: Group[];
    components: Component[];
    filteredPresets: Preset[];
    selectedGroup: string | null;
    selectedComponent: string | null;
    selectedPreset: string | null;
    updateSelection: (key: string, value: string | null) => void;
    updateSelections: (updates: Record<string, string | null>) => void;
}


const StepperSection: React.FC<StepperSectionProps> = ({
    groups,
    components,
    filteredPresets,
    selectedGroup,
    selectedComponent,
    selectedPreset,
    updateSelection,
    updateSelections
}) => {
    const [open, setOpen] = useState<"group" | "component" | "preset" | null>("group");

    const groupObj = groups.find((g) => g.slug === selectedGroup);
    const groupComponents = components.filter((c) =>
        typeof c.group === "string"
            ? c.group === selectedGroup
            : c.group?.slug === selectedGroup
    );
    const componentObj = components.find((c) => c.view === selectedComponent);
    const presetObj = filteredPresets.find((p) => p.slug === selectedPreset);

    React.useEffect(() => {
        if (selectedGroup && open === "group") setOpen("component");
    }, [selectedGroup]);
    React.useEffect(() => {
        if (selectedComponent && open === "component") setOpen("preset");
    }, [selectedComponent]);
    React.useEffect(() => {
        if (selectedPreset && open === "preset") setOpen(null);
    }, [selectedPreset]);


    React.useEffect(() => {
        if (!selectedGroup) {
            setOpen('group');
        } else if (selectedGroup && !selectedComponent) {
            setOpen('component');
        } else if (selectedGroup && selectedComponent && !selectedPreset) {
            setOpen('preset');
        } else if (selectedGroup && selectedComponent && selectedPreset) {
            setOpen(null);
        }
    }, [selectedGroup, selectedComponent, selectedPreset]);




    return (
        <div className="w-full mb-2 border-b-1 border-gray-200">

            <div className="flex flex-row flex-wrap gap-2 mb-2 w-full">
                {selectedGroup && (
                    <button
                        className="btn btn-sm w-auto max-w-xs truncate hover:btn-error"
                        onClick={() => updateSelection("group", null)}
                    >
                        <span className="truncate">{groupObj?.name}</span>
                        <X size={14} className="ml-1 shrink-0" />
                    </button>
                )}
                {selectedComponent && (
                    <button
                        className="btn btn-sm w-auto max-w-xs truncate hover:btn-error"
                        onClick={() => updateSelection("component", null)}
                    >
                        <span className="truncate">{componentObj?.label}</span>
                        <X size={14} className="ml-1 shrink-0" />
                    </button>
                )}
                {selectedPreset && (
                    <button
                        className="btn btn-sm w-auto max-w-xs truncate hover:btn-error"
                        onClick={() => updateSelection("preset", null)}
                    >
                        <span className="truncate">{presetObj?.name}</span>
                        <X size={14} className="ml-1 shrink-0" />
                    </button>
                )}
            </div>
            <div className={`collapse rounded-none ${open === "group" ? "collapse-open" : "collapse-close"}`}>
                <div className="collapse-content">

                    <span className="block text-xs text-gray-400 mt-1 italic">
                        Step 1. Start by choosing a group below.
                    </span>

                    <div className="flex flex-wrap gap-3">
                        {groups.map((group) => (
                            <ul
                                key={group.slug}
                                className={`
                                    list p-4
                                    cursor-pointer
                                    border-b
                                    transition
                                    duration-200
                                    ease-in-out
                                    w-full
                                    hover:bg-blue-50 hover:shadow hover:border-blue-300
                                `}
                                onClick={() => updateSelection("group", group.slug)}
                            >


                                <h3 className="flex flex-row items-center justify-left gap-2 text-mg font-semibold text-gray-900 mb-2">
                                    {group.slug === "util" ? (
                                        <Wrench size={22} />
                                    ) : group.slug === "eventcalendar" ? (
                                        <CalendarDays size={22} />
                                    ) : (
                                        <Calendar1 size={22} />
                                    )}
                                    {group.name}
                                </h3>
                                <p className="text-gray-600 text-xs leading-relaxed">
                                    Everything you need for a mobile friendly calendaring and scheduling experience. With the calendar view, scheduler time grid, timeline, week view,

                                </p>

                            </ul>
                        ))}
                    </div>
                </div>

            </div>

            <div className={`collapse  rounded-none ${open === "component" ? "collapse-open" : "collapse-close"}`}>


                <div className="collapse-content">
                    {selectedGroup ? (
                        <>
                            <span className="block text-xs text-gray-400 mt-1 italic">
                                Step 2. Select a component.
                            </span>
                            <div className="flex flex-wrap gap-3">

                                {groupComponents.length === 0 && (
                                    <div className="text-gray-400 italic">
                                        No components in this group.
                                    </div>
                                )}
                                {groupComponents.map((component) => (

                                    <ul
                                        key={component.id}
                                        className={`
                                    list p-4
                                    cursor-pointer
                                    border-b
                                    transition
                                    duration-200
                                    ease-in-out
                                    w-full
                                    hover:bg-blue-50 hover:shadow hover:border-blue-300
                                `}

                                        onClick={() => updateSelection("component", component.view)}
                                    >

                                        <h3 className="flex flex-row items-center justify-left gap-2 text-mg font-semibold text-gray-900 mb-2">
                                            <svg width="24" height="24">
                                                <use xlinkHref="/media/demo-home-icon-sprite.svg#calendar-icon" />
                                            </svg>

                                            {component.label}
                                        </h3>
                                        <p className="text-gray-600 text-xs leading-relaxed">
                                            Everything you need for a mobile friendly calendaring and scheduling experience. With the calendar view, scheduler time grid, timeline, week view,

                                        </p>
                                    </ul>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="text-gray-400">Select a group first.</div>
                    )}
                </div>
            </div>

            <div className={`collapse rounded-none ${open === "preset" ? "collapse-open" : "collapse-close"}`}>
                <div className="collapse-content">
                    {selectedComponent ? (
                        filteredPresets.length === 0 ? (
                            <p className="text-gray-400 italic">
                                Select a preset.
                            </p>
                        ) : (
                            <div className="flex flex-col gap-2">
                                <span className="block text-xs text-gray-400 mt-1 italic">
                                    Step 3. Select a component to display presets.
                                </span>
                                {filteredPresets.map((preset) => {
                                    const isSelected = preset.slug === selectedPreset;
                                    return (
                                        <ul
                                            key={preset.slug}

                                            onClick={() => updateSelections({ preset: preset.slug, framework: "react" })}

                                            className={`
        list p-4
        cursor-pointer
        border-b
        transition
        duration-200
        ease-in-out
        ${isSelected ? "bg-indigo-100 border-indigo-400 shadow-md" : "border-gray-200"}
        hover:bg-blue-50 hover:shadow hover:border-blue-300
    `}
                                        >
                                            <h3 className="text-mg font-semibold text-gray-900 mb-2">
                                                {preset.name}
                                            </h3>
                                            <p className="text-gray-600 text-xs leading-relaxed">
                                                {preset.description}
                                            </p>
                                        </ul>
                                    );
                                })}
                            </div>
                        )
                    ) : (
                        <div className="text-gray-400">Select a component first.</div>
                    )}
                </div>
            </div>


        </div>
    );
};

export default StepperSection;
