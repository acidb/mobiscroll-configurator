import React, { useState, useEffect } from 'react'
import { updateUrl } from '@/utils/updateUrl'
import { Config } from '@/app/(frontend)/configurator/types'

interface ConfigDropdownProps {
    onChange: (selected: Record<string, any>) => void
    configs: Config[]
    selectedPreset: string | null // Add selectedPreset prop
}

export function ConfigDropdown({ onChange, configs, selectedPreset }: ConfigDropdownProps) {
    const [selectedConfig, setSelectedConfig] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const hasNonAddonConfig = configs.some(
        (config) => config.preset?.slug === selectedPreset && config.config.type !== 'addon'
    )

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        const addonConfigTitle = urlParams.get('addonconfigtitle')

        if (!hasNonAddonConfig) {
            // If no non-addon config exists, reset selection
            setSelectedConfig('')
            setError('Please select a main configuration first')
            if (addonConfigTitle) {
                onChange({})
                updateUrl({})
            }
            return
        }

        if (addonConfigTitle) {
            const titleFromUrl = addonConfigTitle.replace(/-/g, ' ')
            const matchingConfig = configs.find(
                (config) => config.config.title === titleFromUrl && config.config.type === 'addon'
            )
            if (matchingConfig) {
                setSelectedConfig(matchingConfig.id)
                onChange({ addonconfigtitle: addonConfigTitle })
                setError(null)
            } else {
                setSelectedConfig('')
                setError(`Configuration "${titleFromUrl}" not found`)
                onChange({})
                updateUrl({})
            }
        } else {
            setSelectedConfig('')
            setError(null)
        }
    }, [configs, onChange, selectedPreset, hasNonAddonConfig])

    const handleConfigChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = event.target.value
        setSelectedConfig(selectedId)

        const selected = configs.find((config) => config.id === selectedId)
        if (selected) {
            const formattedTitle = selected.config.title.replace(/\s+/g, '-')
            const newSelected = { addonconfigtitle: formattedTitle }
            onChange(newSelected)
            updateUrl(newSelected)
        } else {
            onChange({})
            updateUrl({})
        }
    }

    return (
        <div className="w-full mb-6">
            <div className="mb-2">
                <span className="font-semibold text-gray-700 text-sm">Select Addon Configuration</span>
                <span className="block text-xs text-gray-400 mt-1">
                    Choose an existing configuration with type 'addon' for the selected preset
                </span>
            </div>
            {error && <div className="text-red-500 text-xs mb-2">{error}</div>}
            <select
                value={selectedConfig}
                onChange={handleConfigChange}
                className="w-full p-2 border rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
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
    )
}