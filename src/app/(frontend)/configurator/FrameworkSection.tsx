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
    <section className="mb-2">
      <div className="flex flex-wrap gap-4">
        {frameworks.map((framework) => {
          const isSelected = selectedFramework === framework.slug
          const isDisabled = !selectedComponent

          return (
            <button
              key={framework.slug}
              className={`
                 btn rounded-md p-4
                  ${isSelected ? 'btn-primary' : ''}
                  ${isDisabled ? 'btn-disabled' : ''}
                `}
              onClick={() => !isDisabled && updateSelection('framework', framework.slug)}
              disabled={isDisabled}
              aria-label={`Select ${framework.name} framework`}
              aria-disabled={isDisabled}
            >
              <div className="flex items-center space-x-2 ">
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
