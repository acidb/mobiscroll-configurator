import { getPayload } from 'payload'
import config from '../../payload.config'

export async function fetchConfiguratorData(context: any) {
  const payload = await getPayload({ config })
  const searchParams = await context.query
  const { group, component, framework } = searchParams

  try {
    const groupsResult = await payload.find({
      collection: 'groups',
    })

    const componentsResult = await payload.find({
      collection: 'components',
    })

    if (group) {
      const groupResult = await payload.find({
        collection: 'groups',
        where: { slug: { equals: group } },
      })
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

    const frameworksResult = await payload.find({
      collection: 'frameworks',
    })

    const presetsResult = await payload.find({
      collection: 'presets',
      where: componentId ? { component: { equals: componentId } } : {},
    })

    const selectedPreset = searchParams.preset
    const selectedPresetObj = presetsResult.docs.find(p => p.slug === selectedPreset)
    const selectedPresetId = selectedPresetObj?.id

    // Fetch the first non-addon configuration
    const nonAddonConfigResult = await payload.find({
      collection: 'configs',
      where: {
        and: [
          selectedPresetId ? { preset: { equals: selectedPresetId } } : {},
          { 'config.type': { not_equals: 'addon' } },
        ],
      },
      limit: 1,
    })

    // Fetch all addon configurations
    const addonConfigsResult = await payload.find({
      collection: 'configs',
      where: {
        and: [
          selectedPresetId ? { preset: { equals: selectedPresetId } } : {},
          { 'config.type': { equals: 'addon' } },
        ],
      },
    })

    // Combine non-addon and addon configs
    const configs = [...nonAddonConfigResult.docs, ...addonConfigsResult.docs]

    return {
      props: {
        groups: groupsResult.docs,
        components: componentsResult.docs,
        frameworks: frameworksResult.docs,
        filteredPresets: presetsResult.docs,
        selectedGroup: group || null,
        selectedComponent: component || null,
        selectedFramework: framework || null,
        configs: configs,
      },
    }
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