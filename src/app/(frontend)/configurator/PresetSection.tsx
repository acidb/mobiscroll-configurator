import React from 'react'
import { Preset } from './types'

interface PresetSectionProps {
  filteredPresets: Preset[]
  updateSelection: (key: string, value: string | null) => void
  selectedPreset?: string | null
}

const PresetSection: React.FC<PresetSectionProps> = ({
  filteredPresets,
  updateSelection,
  selectedPreset,
}) => {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-900">3. Choose a starting point</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredPresets.length === 0 && (
          <p className="text-gray-400 italic">
            Select a component and framework to display presets.
          </p>
        )}
        {filteredPresets.map((preset) => {
          const isSelected = preset.slug === selectedPreset
          return (
            <div
              key={preset.slug}
              onClick={() => updateSelection('preset', preset.slug)}
              className={`
                p-6 rounded-lg border
                cursor-pointer
                transition-shadow duration-300 ease-in-out
                ${
                  isSelected
                    ? 'bg-indigo-100 border-indigo-500 shadow-lg'
                    : 'bg-white border-gray-200 hover:shadow-md hover:border-indigo-400'
                }
              `}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{preset.name}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{preset.description}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default PresetSection
