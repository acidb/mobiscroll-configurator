import { fetchConfiguratorData } from '@/app/(payload)/fetchData'
import ConfiguratorClient from './ConfiguratorClient'
import { Group, Component, Framework, Preset } from './types'

export default async function ConfiguratorPage({
  searchParams,
}: {
  searchParams: { group?: string; component?: string; framework?: string }
}) {
  const { props } = await fetchConfiguratorData({ query: searchParams })

  return (
    <ConfiguratorClient
      groups={props.groups as Group[]}
      filteredComponents={props.filteredComponents as Component[]}
      frameworks={props.frameworks as unknown as Framework[]}
      filteredPresets={props.filteredPresets as Preset[]}
      selectedGroup={props.selectedGroup}
      selectedComponent={props.selectedComponent}
      selectedFramework={props.selectedFramework}
    />
  )
}
