'use client';

import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { MbscSelectChangeEvent, Select, setOptions } from '@mobiscroll/react';
import { FC, useEffect, useState } from 'react';
import { updateUrl } from '@/utils/updateUrl';
import { SelectedConfig } from './ConfigurationSelector';
import { Config, GroupedSettings } from '@/app/(frontend)/configurator/types';

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

    const flatKeys = Object.entries(settings).flatMap(([settingMap]) =>
        Object.keys(settingMap)
    );
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
    }, [config?.config.props, settings]);

    const handleConfigChange = (event: MbscSelectChangeEvent) => {
        const values = Array.isArray(event.value) ? event.value : event.value ? [event.value] : [];
        const urlUpdateObject: Record<string, string> = {};
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


    if (!hasValidConfig) return null;

    return (
        <div className="w-full mb-8">
            <div className="mb-4 px-4">
                <label className="text-sm font-semibold text-gray-900">Select Configuration</label>
                <p className="text-xs text-gray-500 mt-1">
                    Choose configuration values for the selected preset
                </p>
            </div>
            {error && (
                <div className="text-red-600 text-xs font-medium bg-red-50 rounded-lg p-3 mb-3 transition-all duration-200">
                    {error}
                </div>
            )}
            <Select
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
            />
        </div>
    );
};
