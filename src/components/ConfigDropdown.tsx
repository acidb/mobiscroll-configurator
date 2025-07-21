import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Select, setOptions } from '@mobiscroll/react';
import { FC, useEffect, useState } from 'react';
import { updateUrl } from '@/utils/updateUrl';
import { Config } from '@/app/(frontend)/configurator/types';

setOptions({
    theme: 'ios',
    themeVariant: 'light'
});

interface ConfigDropdownProps {
    onChange: (selected: Record<string, any>) => void;
    configs: Config[];
    selectedPreset: string | null;
}

export const ConfigDropdown: FC<ConfigDropdownProps> = ({ onChange, configs, selectedPreset }) => {
    const [selectedConfig, setSelectedConfig] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const hasNonAddonConfig = configs.some(
        (config) => config.preset?.slug === selectedPreset && config.config.type !== 'addon'
    );

    const filteredConfigs = configs.filter(
        (config) => config.config.type === 'addon' && config.preset?.slug === selectedPreset
    );

    const configData = [
        { text: 'Select a configuration', value: '' },
        ...filteredConfigs.map(config => ({
            text: config.config.title || 'Untitled',
            value: config.id
        }))
    ];

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

    const handleConfigChange = (event: any) => {
        const selectedId = event.value;
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
            <div className="mb-4 px-4">
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
            <Select
                data={configData}
                display="center"
                inputStyle="outline"
                filter = {true}
                labelStyle="stacked"
                placeholder="Select a config"
                value={selectedConfig}
                onChange={handleConfigChange}
                disabled={!hasNonAddonConfig || configs.length === 0}

            />
        </div>
    );
};