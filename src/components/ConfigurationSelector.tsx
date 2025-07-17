import React, { useState, useEffect } from 'react';
import { updateUrl } from '@/utils/updateUrl';
import { useScreenSize } from '@/utils/useScreenSize';
import { ResourceList } from './ResourceList';
import { DataList } from './DataList';
import { BooleanConfig } from './BooleanConfig';
import { Settings2, ChartPie } from 'lucide-react';
import StepperSection from '../app/(frontend)/configurator/StepperSection'
import { Component, Framework, Preset, Config, Group } from '../app/(frontend)/configurator/types'


const ENUM_OPTIONS: Record<string, string[]> = {
    groupBy: ["date", "resource"],
};

interface pGroup {
    label: string;
    description: string;
    match: (key: string, value: unknown) => boolean;
}

const GROUPS: pGroup[] = [
    {
        label: "Toggle Options",
        description: "You can adjust the component by turning the options on and off.",
        match: (key: string, value: unknown): boolean => typeof value === 'boolean',
    },
    {
        label: "Numeric Options",
        description: "Configure detailed options by providing a number value.",
        match: (key: string, value: unknown): boolean => typeof value === 'number',
    },
    {
        label: "Unknown Options",
        description: "These options will be rendered as text right now but they will be adjusted in the future.",
        match: (key: string, value: unknown): boolean => typeof value === 'object',
    },
    {
        label: "String Options",
        description: "These options will be rendered as text right now but they will be adjusted in the future.",
        match: (key: string, value: unknown): boolean => typeof value === 'string',
    },
];

type SelectedConfig = Record<string, any>;

interface ConfigurationsSelectorProps {
    configurations: Record<string, any>;
    onChange: (selected: SelectedConfig) => void;
    selected: SelectedConfig;

    groups: Group[];
    components: Component[];
    filteredPresets: Preset[];
    selectedGroup: string | null;
    selectedComponent: string | null;
    selectedPreset: string | null;
    updateSelection: (key: string, value: string | null) => void;
    updateSelections: (updates: Record<string, string | null>) => void;
}

export function ConfigurationsSelector({
    configurations,
    onChange,
    selected,

    groups,
    components,
    filteredPresets,
    selectedGroup,
    selectedComponent,
    selectedPreset,
    updateSelection,
    updateSelections,
}: ConfigurationsSelectorProps) {

    const screenSize = useScreenSize();
    const [isOpen, setIsOpen] = useState(screenSize === 'desktop');
    const toggleOpen = () => setIsOpen(prev => !prev);

    useEffect(() => {
        if (screenSize === 'desktop') {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }, [screenSize]);

    function updateValue(prop: string, value: any) {
        const newSelected = { ...selected, [prop]: value };
        onChange(newSelected);
        updateUrl(newSelected);
    }

    if (screenSize === 'mobile' || screenSize === 'tablet') {
        return (
            <>
                {!isOpen && (
                    <button
                        className="fixed right-4 bottom-4 md:left-4 md:top-4 md:right-auto md:bottom-auto z-50 bg-white text-gray-700 border rounded-md px-3 py-2 shadow hover:bg-gray-100"
                        onClick={toggleOpen}
                    >
                        ☰ Config
                    </button>


                )}
                {isOpen && (
                    <div className="fixed top-0 left-0 h-full w-[80%] max-w-sm z-40 bg-white shadow-lg p-6 overflow-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-gray-800 mb-1">Configurations</h2>
                            <button
                                className="text-gray-600 text-lg"
                                onClick={toggleOpen}
                            >
                                ✕
                            </button>
                        </div>
                        {renderContent()}
                    </div>
                )}
            </>
        );
    }

    function renderContent() {
        return (
            <div className="w-full min-h-screen h-screen space-y-8">

                {GROUPS.map((group, gi) => {
                    const fields = Object.entries(configurations).filter(([key, value]) =>
                        group.match(key, value)
                    );
                    if (!fields.length) return null;

                    return (
                        <div key={gi} className="mb-6">
                            <div className="mb-2">
                                <span className="font-semibold text-gray-700 text-sm">{group.label}</span>
                                <span className="block text-xs text-gray-400 mt-1">{group.description}</span>
                            </div>

                            <div className="space-y-3">
                                {fields.map(([prop, value], idx) => {

                                    if (typeof value === 'boolean') {
                                        return (

                                            <BooleanConfig
                                                key={prop}
                                                value={!!selected[prop]}
                                                onChange={val => updateValue(prop, val)}
                                                label={prop}
                                                id={prop}
                                            />

                                        );
                                    }

                                    if (typeof value === 'number') {
                                        return (
                                            <div key={prop} className="flex flex-row justify-between items-start">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">{prop}</code>
                                                </label>
                                                <input
                                                    type="number"
                                                    id={prop}
                                                    value={selected[prop] ?? value}
                                                    onChange={e => updateValue(prop, Number(e.target.value))}
                                                    className="input input-bordered w-24 text-sm ml-3"
                                                />
                                            </div>
                                        );
                                    }

                                    if (typeof value === 'object') {
                                        if (prop === 'resources' && Array.isArray(value)) {
                                            return <ResourceList key={idx} resources={value} />;
                                        }
                                        if (prop === 'data' && Array.isArray(value)) {
                                            return <DataList key={idx} data={value} />;
                                        }
                                        return (
                                            <div key={idx}>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">{prop}</code>
                                                </label>
                                                <pre className="bg-gray-100 rounded p-2 text-xs overflow-auto max-h-40">
                                                    {JSON.stringify(value, null, 2)}
                                                </pre>
                                            </div>
                                        );
                                    }

                                    if (typeof value === 'string') {
                                        return (
                                            <div key={idx}>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">{prop}</code>
                                                </label>
                                                <input
                                                    type="text"
                                                    id={prop}
                                                    value={selected[prop] ?? value}
                                                    onChange={e => updateValue(prop, e.target.value)}
                                                    className="input input-bordered w-full text-sm mt-1"
                                                />
                                            </div>
                                        );
                                    }

                                    return null;
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }

    return (
        <div
            className="
                sticky top-16 
                h-[calc(100vh-4rem)]
                xl:border xl:border-gray-200 xl:rounded-2xl xl:p-2 
                bg-white
                flex flex-col
            "
            style={{ maxHeight: 'calc(100vh - 64px)' }}
        >

            <div className="flex gap-2 justify-left items-center mb-4 px-1 py-2">
                <div className="flex items-center bg-blue-500 rounded-xl p-2">
                    <Settings2 className="text-white" size={20} />
                </div>
                <span className="font-semibold text-gray-800 text-l">Configurations</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold text-gray-700 text-sm">Your configuration</span>
                <span className="block text-xs text-gray-400 mt-1">You can adjust you configurations by choosing other template or components </span>
            </div>

            <StepperSection
                groups={groups}
                components={components}
                filteredPresets={filteredPresets}
                selectedGroup={selectedGroup}
                selectedComponent={selectedComponent}
                selectedPreset={selectedPreset}
                updateSelection={updateSelection}
                updateSelections={updateSelections}
            />
            <div className="flex-1 overflow-y-auto pr-1">{renderContent()}</div>
        </div>

    );
}
