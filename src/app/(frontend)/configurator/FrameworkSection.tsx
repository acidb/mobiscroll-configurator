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
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">2. Choose a framework</h2>
      <div className="flex flex-wrap gap-4">
        {frameworks.map((framework) => {
          const isSelected = selectedFramework === framework.slug
          const isDisabled = !selectedComponent

          return (
            <button
              key={framework.slug}
              className={`
                  flex items-center justify-center p-4 rounded-lg shadow-md transition-all duration-300
                  ${isSelected ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-blue-100'}
                  ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
              onClick={() => !isDisabled && updateSelection('framework', framework.slug)}
              disabled={isDisabled}
              aria-label={`Select ${framework.name} framework`}
              aria-disabled={isDisabled}
            >
              <div className="flex items-center space-x-2">
                <img src={framework.icon} alt={framework.name} className="w-8 h-8" />
                <span className="font-medium">{framework.name}</span>
              </div>
            </button>
          )
        })}
      </div>
    </section>
  )
}

export default FrameworkSection
