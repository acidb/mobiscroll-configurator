'use client';

import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { MbscEventcalendarView, MbscSelectChangeEvent, Select, setOptions } from '@mobiscroll/react';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { updateUrl } from '@/utils/updateUrl';
import { SelectedConfig } from './ConfigurationSelector';
import { Config, GroupedSettings } from '@/app/(frontend)/configurator/types';
import { Plus } from 'lucide-react';

setOptions({
    theme: 'ios',
    themeVariant: 'light'
});

interface ConfigDropdownProps {
    onChange: (selected: SelectedConfig) => void;
    config: Config | null;
    settings: GroupedSettings;
    selectedPreset: string | null;
}

export const ConfigDropdown: FC<ConfigDropdownProps> = ({ onChange, config, settings }) => {
    const [currentSelections, setCurrentSelections] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const selectRef = useRef<any>(null);

    const flatKeys = useMemo(() => {
        return Object.entries(settings).flatMap(([_, settingMap]) =>
            Object.keys(settingMap)
        );
    }, [settings]);

    const hasValidConfig = flatKeys.length > 0;

    const getConfigData = () => {
        const result: { text: string; value: string; group: string }[] = [];
        for (const group in settings) {
            const settingGroup = settings[group];
            for (const key in settingGroup) {
                result.push({
                    text: key,
                    value: key,
                    group: group
                });
            }
        }
        return result;
    };

    useEffect(() => {
        const initialSelections = flatKeys.filter(
            key => config?.config.props[key] !== undefined && config.config.props[key] !== null
        );

        setCurrentSelections(initialSelections);
    }, [config?.config.props, settings, flatKeys]);

    const handleConfigChange = (event: MbscSelectChangeEvent) => {
        const values = Array.isArray(event.value) ? event.value : event.value ? [event.value] : [];
        const urlUpdateObject: Record<string, string | number | boolean | null | MbscEventcalendarView> = {};
        const newSelections: string[] = [];

        const selectedObject: SelectedConfig = { ...config?.config.props };

        values.forEach(key => {
            for (const group in settings) {
                if (settings[group][key]) {
                    const currentValue = config?.config.props[key];
                    const valueToUse = currentValue !== undefined && currentValue !== null
                        ? currentValue
                        : settings[group][key].default;

                    newSelections.push(key);
                    selectedObject[key] = valueToUse;
                    urlUpdateObject[key] = valueToUse;
                }
            }
        });

        flatKeys.forEach(key => {
            if (!values.includes(key)) {
                delete selectedObject[key];
                urlUpdateObject[key] = '';
            }
        });

        setCurrentSelections(newSelections);
        setError(null);

        onChange(selectedObject);
        updateUrl(urlUpdateObject);
    };

    const openSelect = () => {
        if (selectRef.current) {
            selectRef.current.open();
        }
    };

    if (!hasValidConfig) return null;

    return (
        <div>
            <button
                className="btn btn-sm bg-emerald-500 hover:bg-emerald-600 text-white shadow flex items-center gap-1 px-3 transition-colors duration-200"
                title="Add new configuration"
                type="button"
                onClick={openSelect}
            >
                <Plus size={18} />
                <span className="font-semibold">Add</span>
            </button>
            <Select
                ref={selectRef}
                data={getConfigData()}
                display="center"
                inputStyle="outline"
                filter={true}
                labelStyle="stacked"
                placeholder="Select configurations"
                value={currentSelections}
                onChange={handleConfigChange}
                disabled={!hasValidConfig}
                selectMultiple={true}
                showInput={false}
            />
        </div>
    );
};