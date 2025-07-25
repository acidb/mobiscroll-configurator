import React from 'react'
import { Framework } from './types'

interface FrameworkSectionProps {
  frameworks: Framework[]
  selectedFramework: string | null
  selectedComponent: string | null
  updateSelection: (key: string, value: string | null) => void
}

const FrameworkSection: React.FC<FrameworkSectionProps> = ({
  frameworks,
  selectedFramework,
  selectedComponent,
  updateSelection,
}) => {
  const isDisabled = !selectedComponent

  return (
    <div className="flex items-center gap-2">
      {selectedFramework && (
        <img
          src={
            frameworks.find((f) => f.slug === selectedFramework)?.icon
          }
          alt="Selected framework"
          className="w-5"
        />
      )}

      <select
        className="select select-xs w-24  px-2 py-1 rounded bg-white text-blue-600 hover:bg-blue-100 shadow-sm disabled:opacity-50"
        disabled={isDisabled}
        value={selectedFramework ?? ''}
        onChange={(e) => updateSelection('framework', e.target.value || null)}
      >
        <option disabled value="">
          Framework
        </option>
        {frameworks.map((framework) => (
          <option key={framework.slug} value={framework.slug}>
            {framework.name}
          </option>
        ))}
      </select>


    </div>

  )
}

export default FrameworkSection
