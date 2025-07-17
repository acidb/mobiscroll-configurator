import { fetchConfiguratorData } from '@/app/(payload)/fetchData'
import ConfiguratorClient from './ConfiguratorClient'
import { Group, Component, Framework, Preset, Config } from './types'

type ConfiguratorPageProps = {
  searchParams?: Promise<{ group?: string; component?: string; framework?: string }>
}

export default async function ConfiguratorPage({ searchParams }: ConfiguratorPageProps) {
  const { props } = await fetchConfiguratorData({ query: searchParams })

  return (
    <ConfiguratorClient
      groups={props.groups as Group[]}
      components={props.components as Component[]}
      frameworks={props.frameworks as unknown as Framework[]}
      filteredPresets={props.filteredPresets as Preset[]}
      selectedGroup={props.selectedGroup}
      selectedComponent={props.selectedComponent}
      selectedFramework={props.selectedFramework}
      configs={props.configs as unknown as Config[]}
    />
  )
}
