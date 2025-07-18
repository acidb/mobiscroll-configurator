import { CollectionConfig } from 'payload'

export const Presets: CollectionConfig = {
  slug: 'presets',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'component',
      type: 'relationship',
      relationTo: 'components',
      hasMany: true,
      required: true,
    },
    {
      name: 'frameworks',
      type: 'relationship',
      relationTo: 'frameworks',
      hasMany: true,
      required: true,
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tags',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },
    {
      name: 'recommended',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'sortOrder',
      type: 'number',
    },
  ],
}
