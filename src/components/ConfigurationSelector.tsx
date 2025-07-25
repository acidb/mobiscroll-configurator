import React, { useState, useEffect, useRef } from 'react'
import { updateUrl } from '@/utils/updateUrl'
import { useScreenSize } from '@/utils/useScreenSize'
import { Info, Settings2, Trash2, PencilOff, Pencil, ExternalLink } from 'lucide-react'

import { DescriptionTooltip } from './DescriptionTooltip'
import StepperSection from '../app/(frontend)/configurator/StepperSection'
import { Component, Preset, Config, Group, User, Setting, GroupedSettings } from '@/app/(frontend)/configurator/types'
import { ConfigDropdown } from './ConfigDropdown'
import Link from 'next/link'
import { ViewEditor } from './ViewEditor'
import { MbscEventcalendarView } from "@mobiscroll/react";

/* Finalizing New Template Add

    !!! IMPORTANT: Only follow these steps AFTER you have completed the previous steps in './reactTemplates.tsx'

    Now that you have created your template, you need to connect it to an existing renderer. Here’s how:

    Let's say your new template is named 'yourTemplateName' and you want to connect it to the 'renderAgenda' renderer.

    * STEP 1: Find the renderer in 'templateOptions'
        - Locate the renderer you want (e.g., 'renderAgenda') in the 'templateOptions' object.

    * STEP 2: The entry should look like this:
          renderAgenda: ['renderAgenda', ...],

    * STEP 3: Add your new template name to the array:
          renderAgenda: ['renderAgenda', 'yourTemplateName'],

    * STEP 4: Test your new template to ensure it works as expected.

    !!! IMPORTANT: PLEASE DO NOT DELETE OR MODIFY templates that were not created by you.

*/
const templateOptions: Record<string, string[]> = {
    renderAgenda: ['renderAgenda'],
    renderAgendaEmpty: ['renderAgendaEmpty'],
    renderBufferAfter: ['renderBufferAfter'],
    renderBufferBefore: ['renderBufferBefore'],
    renderDay: ['renderDay'],
    renderDayContent: ['renderDayContent'],
    renderDayFooter: ['renderDayFooter'],
    renderEvent: ['renderEvent'],
    renderEventContent: ['renderEventContent'],
    renderHeader: ['renderHeader'],
    renderHour: ['renderHour'],
    renderHourFooter: ['renderHourFooter'],
    renderLabel: ['renderLabel'],
    renderLabelContent: ['renderLabelContent'],
    renderMonth: ['renderMonth'],
    renderMonthFooter: ['renderMonthFooter'],
    renderQuarter: ['renderQuarter'],
    renderQuarterFooter: ['renderQuarterFooter'],
    renderResource: ['renderResource'],
    renderResourceEmpty: ['renderResourceEmpty'],
    renderResourceFooter: ['renderResourceFooter'],
    renderResourceHeader: ['renderResourceHeader'],
    renderScheduleEvent: ['renderScheduleEvent'],
    renderScheduleEventContent: ['renderScheduleEventContent'],
    renderSidebar: ['renderSidebar'],
    renderSidebarFooter: ['renderSidebarFooter'],
    renderSidebarHeader: ['renderSidebarHeader'],
    renderSlot: ['renderSlot'],
    renderWeek: ['renderWeek'],
    renderWeekFooter: ['renderWeekFooter'],
    renderYear: ['renderYear'],
    renderYearFooter: ['renderYearFooter'],
};

/* Finalizing New Event Add

    !!! IMPORTANT: Only follow these steps AFTER you have completed the previous steps in './reactHooks.tsx' and './LivePreview.tsx'.

    Now that you have created your new function, you need to connect it to an existing event. Here’s how to do it:

    Let's say your new function is named 'yourEventName' and you want to connect it to the 'onCellClick' event.

    * STEP 1: Find the event in 'hookOptions'
        - Locate the event you want (e.g., 'onCellClick') in the 'hookOptions' object.

    * STEP 2: The entry should look like this:
          onCellClick: ['defaultEventHandler', ... ],

    * STEP 3: Add your new function’s name to the array:
          onCellClick: ['defaultEventHandler', 'yourEventName'],

    * STEP 4: Test your new function to ensure it works correctly.

    !!! IMPORTANT: PLEASE DO NOT DELETE OR MODIFY functions you did not create.

*/
const hookOptions: Record<string, string[]> = {
    onCellClick: ['defaultEventHandler'],
    onCellDoubleClick: ['defaultEventHandler'],
    onCellHoverIn: ['defaultEventHandler'],
    onCellHoverOut: ['defaultEventHandler'],
    onCellRightClick: ['defaultEventHandler'],
    onDestroy: ['defaultEventHandler'],
    onEventClick: ['myEventClick', 'defaultEventHandler'],
    onEventCreate: ['defaultEventHandler'],
    onEventCreateFailed: ['defaultEventHandler'],
    onEventCreated: ['defaultEventHandler'],
    onEventDelete: ['defaultEventHandler'],
    onEventDeleted: ['defaultEventHandler'],
    onEventDoubleClick: ['defaultEventHandler'],
    onEventDragEnd: ['defaultEventHandler'],
    onEventDragEnter: ['defaultEventHandler'],
    onEventDragLeave: ['defaultEventHandler'],
    onEventDragStart: ['defaultEventHandler'],
    onEventHoverIn: ['defaultEventHandler'],
    onEventHoverOut: ['defaultEventHandler'],
    onEventRightClick: ['defaultEventHandler'],
    onEventUpdate: ['defaultEventHandler'],
    onEventUpdateFailed: ['defaultEventHandler'],
    onEventUpdated: ['defaultEventHandler'],
    onInit: ['defaultEventHandler'],
    onLabelClick: ['defaultEventHandler'],
    onPageChange: ['defaultEventHandler'],
    onPageLoaded: ['defaultEventHandler'],
    onPageLoading: ['defaultEventHandler'],
    onResourceClick: ['defaultEventHandler'],
    onResourceCollapse: ['defaultEventHandler'],
    onResourceCreate: ['defaultEventHandler'],
    onResourceCreated: ['defaultEventHandler'],
    onResourceDelete: ['defaultEventHandler'],
    onResourceDeleted: ['defaultEventHandler'],
    onResourceDoubleClick: ['defaultEventHandler'],
    onResourceDragEnter: ['defaultEventHandler'],
    onResourceDragLeave: ['defaultEventHandler'],
    onResourceExpand: ['defaultEventHandler'],
    onResourceOrderUpdate: ['defaultEventHandler'],
    onResourceRightClick: ['defaultEventHandler'],
    onSelectedDateChange: ['defaultEventHandler'],
    onSelectedEventsChange: ['defaultEventHandler'],
    onVirtualLoading: ['defaultEventHandler'],

};

/* 
  This file is ConfiguratorSelector.tsx — the element you see on the left side of the screen in the Mobiscroll Configurator.

  In this element, you first choose the desired group, then the component, and then the preset.
  
  After making your selections, the selected config’s settings will appear, which you can adjust.
  These settings can be modified via toggles, dropdowns, tab bars, and other controls.
*/

export type SelectedConfig = Record<string, string | number | boolean | null | MbscEventcalendarView>;

interface ConfigurationsSelectorProps {
    configurations: Record<string, string | number | boolean | null | MbscEventcalendarView>
    onChange: (selected: SelectedConfig) => void
    templates: Record<string, string>
    onTemplateChange: (selected: Record<string, string>) => void
    hooks: Record<string, string>
    onHooksChange: (selected: Record<string, string>) => void
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
    hooks,
    onHooksChange,
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
            <div className="w-full space-y-4 mt-2 mb-6">


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
                                            className="text-success cursor-pointer hover:scale-110 transition-transform"
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
                                            size={18}
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
                    if (setting?.display === 'dropdown') {
                        const templateGroup =
                            (typeof setting.values === "string" && templateOptions[setting.values]) || templateOptions[key];
                        const hookGroup =
                            (typeof setting.values === "string" && hookOptions[setting.values]) || hookOptions[key];

                        return (
                            <div key={key} className="flex items-center gap-3 justify-between">
                                <div className="flex items-center gap-2">
                                    <kbd
                                        className="kbd rounded-sm mb-2 truncate overflow-hidden whitespace-nowrap text-xs"
                                        title={key}
                                    >
                                        {key}
                                    </kbd>
                                    <span className="relative flex items-center cursor-pointer" tabIndex={0} style={{ lineHeight: 0 }}>
                                        <Info
                                            ref={infoRefs.current[key]}
                                            className="text-success cursor-pointer hover:scale-110 transition-transform"
                                            size={14}
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
                                    {templateGroup && (
                                        <select
                                            value={templates[key] ?? ''}
                                            onChange={e => {
                                                const updatedTemplates = { ...templates, [key]: e.target.value };
                                                onTemplateChange(updatedTemplates);
                                                updateUrl({ ...configurations, templates: JSON.stringify(updatedTemplates) });
                                            }}
                                            className={`select select-xs rounded-sm ${editMode ? 'w-28' : 'w-36'}`}
                                            style={{ minWidth: 110 }}
                                        >
                                            {templateGroup.map(opt => (
                                                <option key={opt} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                    )}

                                    {hookGroup && (
                                        <select
                                            value={hooks[key] ?? ''}
                                            onChange={e => {
                                                const updatedHooks = { ...hooks, [key]: e.target.value };
                                                onHooksChange(updatedHooks);
                                                updateUrl({ ...configurations, hooks: JSON.stringify(updatedHooks) });
                                            }}
                                            className={`select select-xs rounded-sm ${editMode ? 'w-28' : 'w-36'}`}
                                            style={{ minWidth: 110 }}
                                        >
                                            {hookGroup.map(opt => (
                                                <option key={opt} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                    )}

                                    {!templateGroup && !hookGroup && (
                                        <span className="text-xs text-gray-400">No options</span>
                                    )}

                                    {editMode && (
                                        <Trash2
                                            className="text-error cursor-pointer hover:scale-110 transition-transform"
                                            size={18}
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
                                            className="text-success cursor-pointer hover:scale-110 transition-transform"
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
                                        size={18}
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
                                <div className="flex items-center gap-2">
                                    <kbd className="kbd rounded-sm ">
                                        {key}
                                    </kbd>

                                    <span className="relative flex items-center cursor-pointer" tabIndex={0} style={{ lineHeight: 0 }}>
                                        <Info
                                            ref={infoRefs.current[key]}
                                            className="text-success cursor-pointer hover:scale-110 transition-transform"
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
                                        type="date"
                                        value={value ? String(value).slice(0, 10) : ''}
                                        onChange={e => updateValue(key, e.target.value.toString())}
                                        className="input input-xs w-28 rounded-sm"
                                    />
                                    {editMode && (
                                        <Trash2
                                            className="text-error cursor-pointer hover:scale-110 transition-transform"
                                            size={18}
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

                    return (
                        <div key={key} className="flex items-center gap-3 justify-between">
                            <div className="flex items-center gap-2">
                                <kbd className="kbd rounded-sm ">
                                    {key}
                                </kbd>

                                <span className="relative flex items-center cursor-pointer" tabIndex={0} style={{ lineHeight: 0 }}>
                                    <Info
                                        ref={infoRefs.current[key]}
                                        className="text-success cursor-pointer hover:scale-110 transition-transform"
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
                            <span className="ml-2">{String(value)}</span>
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
                        {selectedGroup && selectedComponent && selectedPreset && (
                            <div className="flex justify-between items-center border-b border-gray-200 py-2">
                                <div>
                                    {user && selectedPreset && config?.id && (
                                        <Link
                                            href={`/admin/collections/configs/${config.id}`}
                                            className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white shadow flex items-center gap-1 px-3 transition-all duration-300"

                                            title="Edit this configuration"
                                        >
                                            <span className="font-semibold">Edit this config</span>
                                            <ExternalLink size={14} />

                                        </Link>
                                    )}
                                </div>


                                <div className="flex gap-2">
                                    {selectedPreset && (
                                        <div>
                                            <ConfigDropdown onChange={onChange} onTemplateChange={onTemplateChange} onHooksChange={onHooksChange} config={config} settings={settings} selectedPreset={selectedPreset} hooks={hooks} templates={templates} />
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
        overflow-y-auto
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
                                    className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white shadow flex items-center gap-1 px-3 transition-all duration-300"

                                    title="Edit this configuration"
                                >
                                    <span className="font-semibold">Edit this config</span>
                                    <ExternalLink size={14} />

                                </Link>
                            )}
                        </div>


                        <div className="flex gap-2">
                            {selectedPreset && (
                                <div>
                                    <ConfigDropdown onChange={onChange} onTemplateChange={onTemplateChange} onHooksChange={onHooksChange} config={config} settings={settings} selectedPreset={selectedPreset} hooks={hooks} templates={templates} />
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