import React, { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import { Group, Component } from './types'

interface GroupSectionProps {
  groups: Group[]
  filteredComponents: Component[]
  selectedGroup: string | null
  selectedComponent: string | null
  updateSelection: (key: string, value: string | null) => void
}

const GroupSection: React.FC<GroupSectionProps> = ({
  groups,
  filteredComponents,
  selectedGroup,
  selectedComponent,
  updateSelection,
}) => {
  const [openGroup, setOpenGroup] = useState<string | null>(null)

  const toggleGroup = (slug: string) => {
    setOpenGroup((prev) => (prev === slug ? null : slug))
  }

  const isGroupOpen = (slug: string) => openGroup === slug

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold font-lora text-gray-800 mb-6">
        1. Choose a <span className="text-blue-700">component</span> and{' '}
        <span className="text-blue-700">view</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {groups
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .map((group) => {
            const isOpen = isGroupOpen(group.slug)
            const isSelected = selectedGroup === group.slug

            return (
              <div
                key={group.slug}
                className="relative border border-gray-200 rounded-lg shadow-sm bg-white overflow-visible transition-all duration-200 hover:shadow-md"
              >
                <button
                  type="button"
                  className={`flex w-full items-center justify-between p-4 text-left font-lora text-gray-800 transition-colors duration-200 hover:bg-blue-50 ${
                    isSelected ? 'bg-blue-100 border-l-4 border-blue-500' : ''
                  }`}
                  onClick={() => {
                    if (!isGroupOpen(group.slug)) {
                      updateSelection('group', group.slug)
                    }
                    toggleGroup(group.slug)
                  }}
                  aria-expanded={isOpen}
                  aria-controls={`group-${group.slug}`}
                >
                  <span className="font-bold text-base">{group.name}</span>
                  <FaChevronDown
                    className={`text-gray-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                </button>
                <div
                  id={`group-${group.slug}`}
                  className={`
                    absolute left-0 right-0 top-full z-20 origin-top
                    transition-all duration-300 bg-white shadow-lg rounded-b-lg border border-gray-200
                    ${isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'}
                  `}
                >
                  <ul className="divide-y divide-gray-100">
                    {filteredComponents
                      .sort((a, b) => a.sortOrder - b.sortOrder)
                      .map((component) => (
                        <li
                          key={component.view}
                          className={`
                            p-4 text-sm font-lora text-gray-700 cursor-pointer transition-colors duration-200 hover:bg-blue-50
                            ${selectedComponent === component.view ? 'bg-blue-100 font-semibold' : ''}
                          `}
                          onClick={(e) => {
                            e.stopPropagation()
                            updateSelection('component', component.view)
                            setOpenGroup(null)
                          }}
                          role="option"
                          aria-selected={selectedComponent === component.view}
                        >
                          {component.label}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            )
          })}
      </div>
    </section>
  )
}

export default GroupSection