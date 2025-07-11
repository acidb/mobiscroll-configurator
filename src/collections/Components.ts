import { CollectionConfig } from 'payload'

export const Components: CollectionConfig = {
  slug: 'components',
  admin: {
    useAsTitle: 'label',
  },
  fields: [
    {
      name: 'group',
      type: 'relationship',
      relationTo: 'groups',
      required: true,
    },
    {
      name: 'view',
      type: 'text',
      required: true,
    },
    {
      name: 'label',
      type: 'text',
      required: true,
    },
    {
      name: 'sortOrder',
      type: 'number',
    },
  ],
}
