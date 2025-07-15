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

    const componentsResult = await payload.find({
      collection: 'components',
      where: groupId ? { group: { equals: groupId } } : {},
    })

    const frameworksResult = await payload.find({
      collection: 'frameworks',
    })

    const presetsResult = await payload.find({
      collection: 'presets',
      where: componentId ? { component: { equals: componentId } } : {},
    })

    const selectedPreset = searchParams.preset;
    const selectedPresetObj = presetsResult.docs.find(p => p.slug === selectedPreset);
    const selectedPresetId = selectedPresetObj?.id;


    const configsResult = await payload.find({
      collection: 'configs',
      where: selectedPresetId ? { preset: { equals: selectedPresetId } } : {},
      limit: 1,
    });

    return {
      props: {
        groups: groupsResult.docs,
        filteredComponents: componentsResult.docs,
        frameworks: frameworksResult.docs,
        filteredPresets: presetsResult.docs,
        selectedGroup: group || null,
        selectedComponent: component || null,
        selectedFramework: framework || null,
        configs: configsResult.docs,
      },
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    return {
      props: {
        groups: [],
        filteredComponents: [],
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
