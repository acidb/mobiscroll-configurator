import React, { useState, useEffect } from 'react';
import { updateUrl } from '@/utils/updateUrl';
import { Config } from '@/app/(frontend)/configurator/types';

interface ConfigDropdownProps {
    onChange: (selected: Record<string, string>) => void
    configs: Config[]
    selectedPreset: string | null
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
            updateUrl({});
        }
    };

    if (filteredConfigs.length === 0) {
        return null;
    }

    return (
        <div className="w-full mb-6">

            <div className="flex flex-col items-center justify-between cursor-pointer select-none py-3 px-2 gap-2">
                <div>
                    <span className="font-semibold text-gray-700 text-sm">Select Addon Configuration</span>
                    <span className="block text-xs text-gray-400"> Choose an existing configuration with type addon for the selected preset</span>
                </div>

                {error && <div className="text-red-500 text-xs mb-2">{error}</div>}
                <select
                    value={selectedConfig}
                    onChange={handleConfigChange}
                    className="select rounded-md"
                    disabled={!hasNonAddonConfig || configs.length === 0}
                >
                    <option value="">Select a configuration</option>
                    {configs
                        .filter((config) => config.config.type === 'addon' && config.preset?.slug === selectedPreset)
                        .map((config) => (
                            <option key={config.id} value={config.id}>
                                {config.config.title || 'Untitled'}
                            </option>
                        ))}
                </select>

            </div>


        </div>
    );
}