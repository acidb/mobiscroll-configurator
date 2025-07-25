import { CollectionConfig } from 'payload'

export const Configs: CollectionConfig = {
  slug: 'configs',
  admin: {
    useAsTitle: 'preset',
    components: {
      beforeList: ['@/components/ConfigDescription'],
    },
  },
  fields: [
    {
      name: 'preset',
      type: 'relationship',
      relationTo: 'presets',
      required: true,
    },
    {
      name: 'config',
      type: 'json',
      required: true,
    },
    {
      name: 'version',
      type: 'text',
    },
    {
      name: 'createdBy',
      type: 'text',
    },
  ],
}
