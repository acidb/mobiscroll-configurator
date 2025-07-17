import React from 'react'
import { Group, Component } from './types'
import { Calendar1,Wrench,CalendarDays } from 'lucide-react';

interface GroupSectionProps {
  groups: Group[]
  components: Component[]
  selectedGroup?: string
  selectedComponent: string | null
  updateSelection: (key: string, value: string | null) => void
  selectComponent: (groupSlug: string, componentId: string) => void
}

const GroupSection: React.FC<GroupSectionProps> = ({
  groups,
  components,
  selectedGroup,
  selectedComponent,
  updateSelection,
  selectComponent,
}) => {
  const currentGroupSlug =
    selectedGroup ||
    (groups.length > 0 ? groups[0].slug : null)

  const groupComponents = components
    .filter((c) =>
      typeof c.group === 'string'
        ? c.group === currentGroupSlug
        : c.group?.slug === currentGroupSlug
    )
    .sort((a, b) => a.sortOrder - b.sortOrder)

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold font-lora text-gray-800 mb-6">
        1. Choose a <span className="text-blue-700">group</span> and{' '}
        <span className="text-blue-700">component</span>
      </h2>

      <div className="flex flex-row flex-wrap gap-4 mb-8">
        {groups
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .map((group) => (
            <button
              key={group.slug}
              className={`
                 flex flex-row items-center justify-left px-4 py-3 rounded-xl border gap-3
                ${currentGroupSlug === group.slug
                  ? 'border-blue-700 bg-blue-50 text-blue-900 font-semibold'
                  : 'border-gray-200 bg-white text-gray-700'}
                transition
                shadow-sm hover:border-blue-400
              `}
              onClick={() => updateSelection('group', group.slug)}
            >
              {group.slug === 'util' ? (
                <Wrench />
              ) : group.slug === 'eventcalendar' ? (
                <CalendarDays />
              ) : (
                <Calendar1 />
              )}
              {group.name}
            </button>
          ))}
      </div>

      <div className="flex flex-row flex-wrap gap-4 mb-8">
        {groupComponents.length === 0 && (
          <div className="text-gray-400 italic">No components in this group.</div>
        )}

        {groupComponents.map((component) => (
          <button
            key={component.id}
            className={`
      flex flex-row items-center justify-left px-4 py-3 rounded-xl border gap-3 min-w-[250px]
      ${selectedComponent === component.view ? 'border-blue-700 bg-blue-50 text-blue-900 font-semibold' : 'border-gray-200 bg-white text-gray-700'}
      hover:border-blue-400
    `}

            onClick={() => updateSelection('component', component.view)}
          >
            <img
              src={"https://placehold.co/40x40?text=?"}
              alt={component.label}
              className="w-8 h-8 object-contain rounded p-1 bg-gray-100"
            />
            {component.label}


          </button>
        ))}
      </div>
    </section>
  )
}

export default GroupSection
