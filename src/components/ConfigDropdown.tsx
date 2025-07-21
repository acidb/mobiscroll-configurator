import React, { useState, useEffect } from 'react';
import { updateUrl } from '@/utils/updateUrl';
import { Config } from '@/app/(frontend)/configurator/types';

interface ConfigDropdownProps {
    onChange: (selected: Record<string, any>) => void;
    configs: Config[];
    selectedPreset: string | null;
}

export function ConfigDropdown({ onChange, configs, selectedPreset }: ConfigDropdownProps) {
    const [selectedConfig, setSelectedConfig] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const hasNonAddonConfig = configs.some(
        (config) => config.preset?.slug === selectedPreset && config.config.type !== 'addon'
    );

    const filteredConfigs = configs.filter(
        (config) => config.config.type === 'addon' && config.preset?.slug === selectedPreset
    );

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const addonConfigTitle = urlParams.get('addonconfigtitle');

        if (!hasNonAddonConfig) {
            setSelectedConfig('');
            setError('Please select a main configuration first');
            if (addonConfigTitle) {
                onChange({});
                updateUrl({});
            }
            return;
        }

        if (addonConfigTitle) {
            const titleFromUrl = addonConfigTitle.replace(/-/g, ' ');
            const matchingConfig = configs.find(
                (config) => config.config.title === titleFromUrl && config.config.type === 'addon'
            );
            if (matchingConfig) {
                setSelectedConfig(matchingConfig.id);
                onChange({ addonconfigtitle: addonConfigTitle });
                setError(null);
            } else {
                setSelectedConfig('');
                setError(`Configuration "${titleFromUrl}" not found`);
                onChange({});
                updateUrl({});
            }
        } else {
            setSelectedConfig('');
            setError(null);
        }
    }, [configs, onChange, selectedPreset, hasNonAddonConfig]);

    const handleConfigChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = event.target.value;
        setSelectedConfig(selectedId);

        const selected = configs.find((config) => config.id === selectedId);
        if (selected) {
            const formattedTitle = selected.config.title.replace(/\s+/g, '-');
            const newSelected = { addonconfigtitle: formattedTitle };
            onChange(newSelected);
            updateUrl(newSelected);
        } else {
            onChange({});
            updateUrl({ addonconfigtitle: '' });
        }
    };

    if (filteredConfigs.length === 0) {
        return null;
    }

    return (
        <div className="w-full mb-8">
            <div className="mb-4">
                <label className="text-sm font-semibold text-gray-900">Select Addon Configuration</label>
                <p className="text-xs text-gray-500 mt-1">
                    Choose an existing addon configuration for the selected preset
                </p>
            </div>
            {error && (
                <div className="text-red-600 text-xs font-medium bg-red-50 rounded-lg p-3 mb-3 transition-all duration-200">
                    {error}
                </div>
            )}
            <div className="relative">
                <select
                    value={selectedConfig}
                    onChange={handleConfigChange}
                    className="
                        w-full p-3.5 pr-10 
                        bg-gray-100 
                        text-gray-900 
                        text-sm 
                        rounded-xl 
                        border-none 
                        shadow-sm 
                        focus:outline-none 
                        focus:ring-2 
                        focus:ring-blue-400 
                        hover:bg-gray-50 
                        transition-all 
                        duration-300 
                        disabled:bg-gray-200 
                        disabled:text-gray-400 
                        disabled:cursor-not-allowed 
                        appearance-none
                    "
                    disabled={!hasNonAddonConfig || configs.length === 0}
                >
                    <option value="" className="text-gray-500">
                        Select a configuration
                    </option>
                    {filteredConfigs.map((config) => (
                        <option key={config.id} value={config.id} className="text-gray-900">
                            {config.config.title || 'Untitled'}
                        </option>
                    ))}
                </select>
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                    <svg
                        className="w-4 h-4 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
}