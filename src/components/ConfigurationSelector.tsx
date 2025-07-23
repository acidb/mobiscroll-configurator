import React, { useState, useEffect, useRef } from 'react'
import { updateUrl } from '@/utils/updateUrl'
import { useScreenSize } from '@/utils/useScreenSize'
import { Info, Settings2, Trash2, PencilOff, Pencil, Plus, ExternalLink } from 'lucide-react'

import { DescriptionTooltip } from './DescriptionTooltip'
import StepperSection from '../app/(frontend)/configurator/StepperSection'
import { Component, Preset, Config, Group, User, Setting, GroupedSettings } from '@/app/(frontend)/configurator/types'
import { ConfigDropdown } from './ConfigDropdown'
import Link from 'next/link'
import { ViewEditor } from './ViewEditor'
import { MbscEventcalendarView, Datepicker } from "@mobiscroll/react";

const templateOptions: Record<string, string[]> = {
    renderResource: ['resourceTemplate', 'resourceAvatarTemplate'],
    renderLabelContent: ['renderLabelContentTemplate'],
};

export type SelectedConfig = Record<string, string | number | boolean | null | MbscEventcalendarView>;

interface ConfigurationsSelectorProps {
    configurations: Record<string, string | number | boolean | null | MbscEventcalendarView>
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
    settings: GroupedSettings
    config: Config | null
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
    settings,
    config,
    user,
}: ConfigurationsSelectorProps) {
    const screenSize = useScreenSize()
    const [isOpen, setIsOpen] = useState(screenSize === 'desktop')
    const [openDescription, setOpenDescription] = useState<string | null>(null);
    const [editMode, setEditMode] = useState(false);


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

    function findSettingByKey(key: string): Setting | undefined {
        for (const group in settings) {
            if (settings[group][key]) {
                return settings[group][key];
            }
        }
        return undefined;
    }


    const infoRefs = useRef<Record<string, React.RefObject<SVGSVGElement | null>>>({});

    Object.keys(configurations).forEach(key => {
        if (!infoRefs.current[key]) {
            infoRefs.current[key] = React.createRef<SVGSVGElement>();
        }
    });



    function renderContent() {
        return (
            <div className="w-full space-y-4 mt-2">

                {Object.entries(configurations).map(([key, value]) => {
                    const setting = findSettingByKey(key);

                    const options = Array.isArray(setting?.values) && setting.values.length > 0
                        ? setting.values
                        : Array.isArray(setting?.type)
                            ? setting.type
                            : [];

                    if (setting?.display === 'toggle') {
                        return (
                            <div key={key} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <kbd
                                        className="kbd rounded-sm cursor-pointer select-none border-b-2 transition-all duration-100 active:scale-98 active:shadow-none active:border-b-1 focus:outline-none"
                                        onClick={() => {
                                            const updated = { ...configurations, [key]: !value };
                                            onChange(updated);
                                            updateUrl(
                                                Object.fromEntries(
                                                    Object.entries(updated).map(([k, v]) => [
                                                        k,
                                                        typeof v === 'object' && v !== null
                                                            ? JSON.stringify(v)
                                                            : String(v)
                                                    ])
                                                )
                                            );
                                        }}
                                        tabIndex={0}
                                    >
                                        {key}
                                    </kbd>
                                    <span className="relative flex items-center cursor-pointer" tabIndex={0} style={{ lineHeight: 0 }}>
                                        <Info
                                            ref={infoRefs.current[key]}
                                            className="text-success"
                                            size={18}
                                            onClick={() => setOpenDescription(openDescription === key ? null : key)}
                                        />
                                        <DescriptionTooltip
                                            anchorRef={infoRefs.current[key]}
                                            open={openDescription === key}
                                            onClose={() => setOpenDescription(null)}
                                            title={key}
                                            description={setting.description}
                                        />
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={!!value}
                                        onChange={() => {
                                            const updated = { ...configurations, [key]: !value };
                                            onChange(updated);
                                            updateUrl(
                                                Object.fromEntries(
                                                    Object.entries(updated).map(([k, v]) => [
                                                        k,
                                                        typeof v === 'object' && v !== null
                                                            ? JSON.stringify(v)
                                                            : String(v)
                                                    ])
                                                )
                                            );
                                        }}

                                        className="toggle toggle-success"
                                    />
                                    {editMode && (
                                        <Trash2
                                            className="text-error cursor-pointer hover:scale-110 transition-transform"
                                            size={28}
                                            onClick={() => {
                                                if (window.confirm(`Delete "${key}" setting?`)) {
                                                    const updated = { ...configurations };
                                                    delete updated[key];
                                                    onChange(updated);

                                                    const urlUpdate = {
                                                        ...Object.fromEntries(Object.entries(updated).map(([k, v]) => [k, String(v)])),
                                                        [key]: '',
                                                    };

                                                    updateUrl(urlUpdate);
                                                }
                                            }}
                                        />

                                    )}

                                </div>
                            </div>
                        );
                    }
                    if (templateOptions[key]) {
                        return (
                            <div key={key} className="flex items-center gap-3 justify-between">
                                <div className="flex items-center gap-2">
                                    <kbd className="kbd rounded-sm ">
                                        {key}
                                    </kbd>

                                    <span className="relative flex items-center cursor-pointer" tabIndex={0} style={{ lineHeight: 0 }}>
                                        <Info
                                            ref={infoRefs.current[key]}
                                            className="text-success"
                                            size={18}
                                            onClick={() => setOpenDescription(openDescription === key ? null : key)}
                                        />
                                        <DescriptionTooltip
                                            anchorRef={infoRefs.current[key]}
                                            open={openDescription === key}
                                            onClose={() => setOpenDescription(null)}
                                            title={key}
                                            description={'setting.description'}
                                        />
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <select
                                        value={templates[key] ?? ''}
                                        onChange={e => {
                                            const updatedTemplates = { ...templates, [key]: e.target.value };
                                            onTemplateChange(updatedTemplates);
                                            updateUrl({ ...configurations, templates: JSON.stringify(updatedTemplates) });
                                        }}
                                        className={`select select-xs rounded-sm 
                                            ${editMode ? 'w-25' : 'w-35'}
                                            `}
                                    >
                                        {templateOptions[key].map(opt => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                    </select>

                                    {editMode && (
                                        <Trash2
                                            className="text-error cursor-pointer hover:scale-110 transition-transform"
                                            size={28}
                                            onClick={() => {
                                                if (window.confirm(`Delete "${key}" setting?`)) {
                                                    const updated = { ...configurations };
                                                    delete updated[key];
                                                    onChange(updated);

                                                    const urlUpdate = {
                                                        ...Object.fromEntries(Object.entries(updated).map(([k, v]) => [k, String(v)])),
                                                        [key]: '',
                                                    };

                                                    updateUrl(urlUpdate);
                                                }
                                            }}
                                        />

                                    )}
                                </div>

                            </div>
                        );
                    }
                    if (key === "view" && typeof value === "object" && value !== null) {
                        return (
                            <div key={key} className="mb-2">
                                <kbd className="kbd rounded-sm mb-2">{key}</kbd>
                                <ViewEditor
                                    view={value}
                                    onChange={updatedView => {
                                        const updated = { ...configurations, [key]: updatedView };
                                        onChange(updated);
                                        updateUrl(
                                            Object.fromEntries(
                                                Object.entries(updated).map(([k, v]) => [
                                                    k,
                                                    typeof v === 'object' && v !== null
                                                        ? JSON.stringify(v)
                                                        : String(v)
                                                ])
                                            )
                                        );
                                    }}
                                />
                            </div>
                        );
                    }
                    if (setting?.display === 'tabs') {
                        return (
                            <div key={key} className="flex gap-3 justify-between">
                                <div className="flex items-center gap-2">
                                    <kbd className="kbd rounded-sm ">
                                        {key}
                                    </kbd>

                                    <span className="relative flex items-center cursor-pointer" tabIndex={0} style={{ lineHeight: 0 }}>
                                        <Info
                                            ref={infoRefs.current[key]}
                                            className="text-success"
                                            size={18}
                                            onClick={() => setOpenDescription(openDescription === key ? null : key)}
                                        />
                                        <DescriptionTooltip
                                            anchorRef={infoRefs.current[key]}
                                            open={openDescription === key}
                                            onClose={() => setOpenDescription(null)}
                                            title={key}
                                            description={setting.description}
                                        />
                                    </span>
                                </div>
                                <div className="flex flex-wrap justify-end  gap-2">
                                    {options.map(opt => (
                                        <label
                                            key={opt}
                                            className={` tab px-2 py-1 text-xs rounded-md border 
                                                     ${value === opt
                                                    ? 'tab-active bg-blue-100 border-blue-400 text-blue-700'
                                                    : 'bg-white border-gray-200 text-gray-500'}
                                                      cursor-pointer transition-all`}
                                        >
                                            <input
                                                type="radio"
                                                name={`my_${key}`}
                                                className="sr-only"
                                                checked={value === opt}
                                                onChange={() => updateValue(key, opt)}
                                            />
                                            {opt}
                                        </label>
                                    ))}
                                </div>

                                {editMode && (
                                    <Trash2
                                        className="text-error cursor-pointer hover:scale-110 transition-transform"
                                        size={28}
                                        onClick={() => {
                                            if (window.confirm(`Delete "${key}" setting?`)) {
                                                const updated = { ...configurations };
                                                delete updated[key];
                                                onChange(updated);

                                                const urlUpdate = {
                                                    ...Object.fromEntries(Object.entries(updated).map(([k, v]) => [k, String(v)])),
                                                    [key]: '',
                                                };

                                                updateUrl(urlUpdate);
                                            }
                                        }}
                                    />

                                )}
                            </div>

                        );
                    }
                    if (setting?.display === 'date') {
                        return (
                            <div key={key} className="flex items-center gap-3 justify-between">
                                <kbd className="kbd rounded-sm mb-2">{key}</kbd>
                                <Datepicker
                                    value={value || ''}
                                    onChange={ev => {
                                        updateValue(key, ev.value instanceof Date ? ev.value.toISOString() : (ev.value?.toString() || ''));

                                    }}
                                    className="input input-xs w-24 rounded-sm"
                                />

                            </div>
                        );
                    }
                    return (
                        <div key={key} className="mb-2">
                            <kbd className="kbd rounded-sm">{key}</kbd>
                            <span className="ml-2">{String(value)}</span>
                            <span className="ml-2 text-xs text-gray-400">[{typeof value}]</span>
                            {setting && (
                                <div className="text-xs text-gray-500 ml-1">
                                    <div>Type: {Array.isArray(setting.type) ? setting.type.join(', ') : setting.type}</div>
                                    <div>Default: {setting.default}</div>
                                    {setting.values && setting.values.length > 0 && (
                                        <div>Values: [{setting.values.join(', ')}]</div>
                                    )}
                                </div>
                            )}
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
        z-50
      "
            style={{ maxHeight: 'calc(100vh - 64px)' }}
        >
            <div className="flex gap-2 justify-between items-center mb-4 px-1 py-2">
                <div className="flex items-center gap-2">
                    <div className="flex items-center bg-blue-500 rounded-xl p-2">
                        <Settings2 className="text-white" size={20} />
                    </div>
                    <span className="font-semibold text-gray-800 text-l">Configurations</span>
                </div>
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

            {selectedGroup && selectedComponent && selectedPreset && (
                <div className="flex justify-between items-center border-b border-gray-200 py-2">
                    <div>
                        {user && selectedPreset && config?.id && (
                            <Link
                                href={`/admin/collections/configs/${config.id}`}
                                className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white shadow flex items-center gap-1 px-3 transition-colors duration-200"
                                title="Edit this configuration"
                            >
                                <ExternalLink size={18} />
                                <span className="font-semibold">Edit this config</span>
                            </Link>
                        )}
                    </div>

                    <div className="flex gap-2">
                        {selectedPreset && (
                            <div>
                                <ConfigDropdown onChange={onChange} config={config} settings={settings} selectedPreset={selectedPreset} />
                            </div>
                        )}
                        <button
                            className={`btn btn-sm shadow flex items-center gap-1 px-3 transition-all duration-300
                ${editMode
                                    ? 'bg-orange-500 hover:bg-orange-600 text-white'
                                    : 'bg-gray-200 hover:bg-orange-100 text-gray-600'
                                }`}
                            title={editMode ? 'Exit edit mode' : 'Edit configuration'}
                            onClick={() => setEditMode(e => !e)}
                            type="button"
                        >
                            <span className="transition-opacity duration-200">
                                {editMode ? <PencilOff size={18} /> : <Pencil size={18} />}
                            </span>
                            <span className="font-semibold transition-opacity duration-200">
                                {editMode ? 'Exit Edit' : 'Edit'}
                            </span>
                        </button>
                    </div>
                </div>


            )}
            {selectedGroup && selectedComponent && selectedPreset && (
                <div className="flex-1 overflow-y-auto pr-1">{renderContent()}</div>

            )}

        </div>
    )
}