import { getPayload } from 'payload';
import config from '../../payload.config';

export async function fetchConfiguratorData(context: any) {
  const payload = await getPayload({ config });
  const searchParams = await context.query;

  const { group, component, framework, preset, ...restParams } = searchParams || {};

  const unusedParams = restParams || {};

  try {
    const groupsResult = await payload.find({ collection: 'groups' });
    const componentsResult = await payload.find({ collection: 'components' });

    let componentId = null;
    let componentSettings = null;

    if (component) {
      const componentResult = await payload.find({
        collection: 'components',
        where: { view: { equals: component } },
        limit: 1,
      });

      const matchedComponent = componentResult.docs[0];
      componentId = matchedComponent?.id || null;

      if (componentId) {
        const settingsResult = await payload.find({
          collection: 'settings',
          where: {
            components: { contains: componentId },
          },
          limit: 1,
        });

        componentSettings = settingsResult.docs[0]?.settings || null;
      }
    }

    const frameworksResult = await payload.find({ collection: 'frameworks' });

    const presetsResult = await payload.find({
      collection: 'presets',
      where: componentId ? { component: { equals: componentId } } : {},
    });

    const selectedPreset = preset;
    const selectedPresetObj = presetsResult.docs.find(p => p.slug === selectedPreset);
    const selectedPresetId = selectedPresetObj?.id;

    const configResult = await payload.find({
      collection: 'configs',
      where: selectedPresetId ? { preset: { equals: selectedPresetId } } : {},
      limit: 1,
    });

    return {
      props: {
        groups: groupsResult.docs,
        components: componentsResult.docs,
        frameworks: frameworksResult.docs,
        filteredPresets: presetsResult.docs,
        selectedGroup: group || null,
        selectedComponent: component || null,
        selectedFramework: framework || null,
        componentSettings,
        config: configResult.docs[0],
        configProps: unusedParams,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        groups: [],
        components: [],
        frameworks: [],
        filteredPresets: [],
        selectedGroup: null,
        selectedComponent: null,
        selectedFramework: null,
        componentSettings: null,
        config: [],
        configProps: {},
      },
    };
  }
}