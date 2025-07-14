'use client'

import React from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import GroupSection from './GroupSection'
import FrameworkSection from './FrameworkSection'
import PresetSection from './PresetSection'
import { Group, Component, Framework, Preset } from './types'

export default function ConfiguratorClient({
  groups,
  filteredComponents,
  frameworks,
  filteredPresets,
  selectedGroup,
  selectedComponent,
  selectedFramework,
}: {
  groups: Group[]
  filteredComponents: Component[]
  frameworks: Framework[]
  filteredPresets: Preset[]
  selectedGroup: string | null
  selectedComponent: string | null
  selectedFramework: string | null
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const selectedPreset = searchParams.get('preset') || null

  const updateSelection = (key: string, value: string | null) => {
    const newQuery = new URLSearchParams(searchParams.toString())
    if (value) {
      newQuery.set(key, value)
    } else {
      newQuery.delete(key)
    }

    if (key === 'group') {
      newQuery.delete('component')
      newQuery.delete('framework')
      newQuery.delete('preset')
    } else if (key === 'component') {
      newQuery.delete('framework')
      newQuery.delete('preset')
    } else if (key === 'framework') {
      newQuery.delete('preset')
    }
    router.push(`${pathname}?${newQuery.toString()}`, { scroll: false })
  }

  return (
    <div className="container mx-auto p-4 px-12">
      <GroupSection
        groups={groups}
        filteredComponents={filteredComponents}
        selectedGroup={selectedGroup}
        selectedComponent={selectedComponent}
        updateSelection={updateSelection}
      />

      {selectedGroup && selectedComponent && (
        <FrameworkSection
          frameworks={frameworks}
          selectedFramework={selectedFramework}
          selectedComponent={selectedComponent}
          updateSelection={updateSelection}
        />
      )}

      {selectedGroup && selectedComponent && selectedFramework && (
        <PresetSection
          filteredPresets={filteredPresets}
          updateSelection={updateSelection}
          selectedPreset={selectedPreset}
        />
      )}
    </div>
  )
}
