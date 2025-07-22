import { fetchConfiguratorData } from '@/app/(payload)/fetchData'
import ConfiguratorClient from './ConfiguratorClient'
import { Group, Component, Framework, Preset, Config, Setting, GroupedSettings } from './types'
import { headers as getHeaders } from 'next/headers'
import { getPayload } from 'payload'
import config from '@/payload.config'

export default async function ConfiguratorPage({
  searchParams,
}: {
  searchParams: { group?: string; component?: string; framework?: string }
}) {
  const { props } = await fetchConfiguratorData({ query: searchParams })
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  return (
    <ConfiguratorClient
      groups={props.groups as Group[]}
      components={props.components as Component[]}
      frameworks={props.frameworks as unknown as Framework[]}
      filteredPresets={props.filteredPresets as unknown as Preset[]}
      selectedGroup={props.selectedGroup}
      selectedComponent={props.selectedComponent}
      selectedFramework={props.selectedFramework}
      settings={props.componentSettings as unknown as GroupedSettings}
      config={props.config as unknown as Config}
      user={user}
    />
  )
}
