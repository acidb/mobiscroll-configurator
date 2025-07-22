import React, { useState, useEffect } from 'react'
import { updateUrl } from '@/utils/updateUrl'
import { useScreenSize } from '@/utils/useScreenSize'
import { Settings2 } from 'lucide-react'
import StepperSection from '../app/(frontend)/configurator/StepperSection'
import { Component, Preset, Config, Group, User } from '@/app/(frontend)/configurator/types'
import { ConfigDropdown } from './ConfigDropdown'
import Link from 'next/link'
import { ViewConfig } from './ViewEditor'
import { ViewEditor } from './ViewEditor'



const templateOptions: Record<string, string[]> = {
    renderResource: ['resourceTemplate', 'resourceAvatarTemplate'],
};



type SelectedConfig = Record<string, string | number | boolean | null | ViewConfig>;


interface ConfigurationsSelectorProps {
    configurations: Record<string, string | number | boolean | null | ViewConfig>
    onChange: (selected: SelectedConfig) => void
    templates: Record<string, string>
    onTemplateChange: (selected: Record<string, string>) => void
    selected: SelectedConfig
    groups: Group[]
    components: Component[]
    filteredPresets: Preset[]
    selectedGroup: string | null
    selectedComponent: string | null
    selectedPreset: string | null
    updateSelection: (key: string, value: string | null) => void
    updateSelections: (updates: Record<string, string | null>) => void
    configs: Config[]
    user: User | null
}

export function ConfigurationsSelector({
    configurations,
    onChange,
    templates,
    onTemplateChange,
    selected,
    groups,
    components,
    filteredPresets,
    selectedGroup,
    selectedComponent,
    selectedPreset,
    updateSelection,
    updateSelections,
    configs,
    user,
}: ConfigurationsSelectorProps) {
    const screenSize = useScreenSize()
    const [isOpen, setIsOpen] = useState(screenSize === 'desktop')
    const toggleOpen = () => setIsOpen(prev => !prev)

    useEffect(() => {
        if (screenSize === 'desktop') {
            setIsOpen(true)
        } else {
            setIsOpen(false)
        }
    }, [screenSize])


    function updateValue(prop: string, value: string | number | boolean) {
        const newSelected = { ...selected, [prop]: value }
        onChange(newSelected)
        updateUrl(
            Object.fromEntries(
                Object.entries(newSelected).map(([k, v]) => [k, String(v)])
            )
        )
    }



    const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

    function toggleCollapsed(label: string) {
        setCollapsed(prev => ({
            ...prev,
            [label]: !prev[label]
        }));
    }

    const mergedConfig = {
        ...configurations,


    };



    function renderContent() {
        return (
            <div className="w-full space-y-4">
                {Object.entries(configurations).map(([key, value]) => {
                    if (typeof value === 'boolean') {
                        return (
                            <div key={key} className="flex items-center gap-3 justify-between">
                                <kbd
                                    className="kbd rounded-sm cursor-pointer select-none border-b-2 transition-all duration-100 active:scale-98 active:shadow-none active:border-b-1 focus:outline-none"
                                    onClick={() => onChange({ ...configurations, [key]: !value })}
                                    tabIndex={0}
                                >
                                    {key}
                                </kbd>
                                <input
                                    type="checkbox"
                                    checked={value}
                                    onChange={() => onChange({ ...configurations, [key]: !value })}
                                    className="toggle toggle-success"
                                />
                            </div>
                        );
                    }

                    if (templateOptions[key]) {
                        return (
                            <div key={key} className="flex gap-4 items-center mb-2">
                                <kbd
                                    className="kbd rounded-sm "
                                >
                                    {key}
                                </kbd>
                                <select
                                    value={templates[key] ?? ''}
                                    onChange={e => onTemplateChange({ ...templates, [key]: e.target.value })}
                                    className="input input-sm w-48"
                                >
                                    {templateOptions[key].map(opt => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                </select>
                            </div>
                        );
                    }

                    if (key === "view" && typeof value === "object" && value !== null) {
                        return (
                            <div key={key} className="mb-2">
                                <kbd className="kbd rounded-sm mb-2">{key}</kbd>
                                <ViewEditor
                                    view={value}
                                    onChange={updatedView =>
                                        onChange({
                                            ...configurations,
                                            [key]: updatedView,
                                        })
                                    }
                                />
                            </div>
                        );
                    }



                    if (typeof value === 'number') {
                        return (
                            <div key={key}>
                                <kbd>{key}</kbd>
                                <span>{value}</span>
                                <span className="ml-2 text-xs text-gray-400">[number]</span>
                            </div>
                        );
                    }

                    if (typeof value === 'string') {
                        return (
                            <div key={key}>
                                <kbd>{key}</kbd>
                                <span>{value}</span>
                                <span className="ml-2 text-xs text-gray-400">[string]</span>
                            </div>
                        );
                    }

              
                    return (
                        <div key={key}>
                            <kbd>{key}</kbd>
                            <span>{String(value)}</span>
                            <span className="ml-2 text-xs text-gray-400">[{typeof value}]</span>
                        </div>
                    );
                })}

             
            </div>
        );
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
                            <button className="text-gray-600 text-lg" onClick={toggleOpen}>
                                ✕
                            </button>
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
                        {renderContent()}
                    </div>
                )}
            </>
        )
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
                <span className="block text-xs text-gray-400 mt-1">
                    You can adjust your configurations by choosing other template or components
                </span>
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
            {user && selectedPreset && (
                <div className="mt-4">
                    <Link
                        href={`/admin/collections/configs/${configs[0].id}`}
                        className="btn bg-gray-100 hover:bg-gray-300 text-black w-full"
                    >
                        Edit the configuration
                    </Link>
                </div>
            )}
            {selectedPreset && (
                <div className="mt-6">
                    <ConfigDropdown onChange={onChange} configs={configs} selectedPreset={selectedPreset} />
                </div>
            )}

        </div>
    )
}