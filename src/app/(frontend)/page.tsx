// import { headers as getHeaders } from 'next/headers'
// import { getPayload } from 'payload'
// import React from 'react'
// import Link from 'next/link'
// import config from '@/payload.config'
// import './styles.css'
// import ConfiguratorClient from './configurator/ConfiguratorClient'

// export default async function HomePage() {
//   const headers = await getHeaders()
//   const payloadConfig = await config
//   const payload = await getPayload({ config: payloadConfig })
//   const { user } = await payload.auth({ headers })


//   return (
//     <ConfiguratorClient />
//   )
// }

import { fetchConfiguratorData } from '@/app/(payload)/fetchData'
import ConfiguratorClient from './configurator/ConfiguratorClient'
import { Group, Component, Framework, Preset, Config, GroupedSettings } from './configurator/types'
import { headers as getHeaders } from 'next/headers'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { MbscEventcalendarView } from '@mobiscroll/react'

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
      configProps={props.configProps as Record<string, string | number | boolean | null | undefined | MbscEventcalendarView>}
    />
  )
}
