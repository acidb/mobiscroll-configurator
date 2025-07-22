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
    configs: Config;
    settings: GroupedSettings;
    selectedPreset: string | null;
}

export const ConfigDropdown: FC<ConfigDropdownProps> = ({ onChange, configs, settings, selectedPreset }) => {
    const [selectedConfigs, setSelectedConfigs] = useState<{ key: string; value: string }[]>([]);
    const [currentSelections, setCurrentSelections] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    const flatKeys = Object.entries(settings).flatMap(([group, settingMap]) =>
        Object.keys(settingMap)
    );
    const hasValidConfig = flatKeys.length > 0;

    // Flatten settings into Mobiscroll group format
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

    // Init from existing config
    useEffect(() => {
        const initialSelections = flatKeys.filter(
            key => configs.config.props[key] !== undefined && configs.config.props[key] !== null
        );

        setCurrentSelections(initialSelections);
        setSelectedConfigs(
            initialSelections.map(key => ({
                key,
                value: configs.config.props[key]
            }))
        );
    }, [configs.config.props, settings]);

    const handleConfigChange = (event: MbscSelectChangeEvent) => {
        const values = Array.isArray(event.value) ? event.value : event.value ? [event.value] : [];
        const newSelectedConfigs: { key: string; value: string }[] = [];
        const urlUpdateObject: Record<string, string> = {};
        const newSelections: string[] = [];

        const selectedObject: SelectedConfig = { ...configs.config.props };

        values.forEach(key => {
            for (const group in settings) {
                if (settings[group][key]) {
                    const currentValue = configs.config.props[key];
                    const valueToUse = currentValue !== undefined && currentValue !== null
                        ? currentValue
                        : settings[group][key].default;

                    newSelectedConfigs.push({ key, value: valueToUse });
                    newSelections.push(key);
                    selectedObject[key] = valueToUse;
                    urlUpdateObject[key] = valueToUse;
                }
            }
        });

        // Remove deselected keys
        flatKeys.forEach(key => {
            if (!values.includes(key)) {
                delete selectedObject[key];
                urlUpdateObject[key] = '';
            }
        });

        setSelectedConfigs(newSelectedConfigs);
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
