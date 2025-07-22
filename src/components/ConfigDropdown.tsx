'use client';

import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { MbscSelectChangeEvent, Select, setOptions } from '@mobiscroll/react';
import { FC, useEffect, useState } from 'react';
import { updateUrl } from '@/utils/updateUrl';
import { SelectedConfig } from './ConfigurationSelector';
import { Config } from '@/app/(frontend)/configurator/types';

setOptions({
    theme: 'ios',
    themeVariant: 'light'
});

const configJson: Record<string, { type: string; description: string; values?: string[]; value?: string; default: string }> = {
    theme: {
        type: 'string',
        description: 'Visual theme of the component.',
        values: ['ios', 'material', 'windows', 'auto'],
        default: 'ios'
    },
    mode: {
        type: 'string',
        description: 'Display mode of the component.',
        values: ['light', 'dark', 'system'],
        default: 'light'
    }
};

interface ConfigDropdownProps {
    onChange: (selected: SelectedConfig) => void;
    configs: Config;
    selectedPreset: string | null;
}

export const ConfigDropdown: FC<ConfigDropdownProps> = ({ onChange, configs, selectedPreset }) => {
    const [selectedConfigs, setSelectedConfigs] = useState<{ key: string; value: string }[]>([]);
    const [currentSelections, setCurrentSelections] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    const configKeys = Object.keys(configJson);
    const hasValidConfig = configKeys.length > 0;

    // Initialize currentSelections from configs.config.props
    useEffect(() => {
        const initialSelections = configKeys.filter(key => configs.config.props[key] !== undefined && configs.config.props[key] !== null);
        setCurrentSelections(initialSelections);
        setSelectedConfigs(
            initialSelections.map(key => ({
                key,
                value: configs.config.props[key] || configJson[key].default
            }))
        );
    }, [configs.config.props]);

    const getConfigData = () => {
        return configKeys.map(key => ({
            text: key,
            value: key
        }));
    };

    const handleConfigChange = (event: MbscSelectChangeEvent) => {
        const values = Array.isArray(event.value) ? event.value : event.value ? [event.value] : [];
        const newSelectedConfigs: { key: string; value: string }[] = [];
        const urlUpdateObject: Record<string, string> = {};
        const newSelections: string[] = [];

        // Extend existing configs.config.props
        const selectedObject: SelectedConfig = { ...configs.config.props };

        // Update with selected configurations
        values.forEach(key => {
            if (typeof key === 'string' && configKeys.includes(key)) {
                const defaultValue = configJson[key].default;
                newSelectedConfigs.push({ key, value: defaultValue });
                newSelections.push(key);
                selectedObject[key] = defaultValue;
                urlUpdateObject[key] = defaultValue;
            }
        });

        // Explicitly set deselected configurations to empty string in urlUpdateObject
        configKeys.forEach(key => {
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