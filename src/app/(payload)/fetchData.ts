import { getPayload } from 'payload'
import config from '../../payload.config'

const cache = new Map<string, any>()

export async function fetchConfiguratorData(context: any) {
  const searchParams = await context.query
  const key = JSON.stringify(searchParams)

  if (cache.has(key)) {
    return cache.get(key)
  }

  const payload = await getPayload({ config })
  const { group, component, framework } = searchParams

  try {
    const groupsResult = await payload.find({ collection: 'groups' })
    const componentsResult = await payload.find({ collection: 'components' })

    let groupId = null
    if (group) {
      const groupResult = await payload.find({
        collection: 'groups',
        where: { slug: { equals: group } },
      })
      groupId = groupResult.docs[0]?.id || null
    }

    let componentId = null
    if (component) {
      const componentResult = await payload.find({
        collection: 'components',
        where: { view: { equals: component } },
        limit: 1,
      })
      componentId = componentResult.docs[0]?.id || null
    }

    const frameworksResult = await payload.find({ collection: 'frameworks' })
    const presetsResult = await payload.find({
      collection: 'presets',
      where: componentId ? { component: { equals: componentId } } : {},
    })

    const selectedPreset = searchParams.preset
    const selectedPresetObj = presetsResult.docs.find(p => p.slug === selectedPreset)
    const selectedPresetId = selectedPresetObj?.id

    const configsResult = await payload.find({
      collection: 'configs',
      where: selectedPresetId ? { preset: { equals: selectedPresetId } } : {},
      limit: 1,
    })

    const result = {
      props: {
        groups: groupsResult.docs,
        components: componentsResult.docs,
        frameworks: frameworksResult.docs,
        filteredPresets: presetsResult.docs,
        selectedGroup: group || null,
        selectedComponent: component || null,
        selectedFramework: framework || null,
        configs: configsResult.docs,
      },
    }

    cache.set(key, result)
    return result
  } catch (error) {
    console.error('Error fetching data:', error)
    return {
      props: {
        groups: [],
        components: [],
        frameworks: [],
        filteredPresets: [],
        selectedGroup: null,
        selectedComponent: null,
        selectedFramework: null,
        configs: [],
      },
    }
  }
}

