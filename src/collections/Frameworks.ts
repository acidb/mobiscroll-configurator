import { CollectionConfig } from 'payload'

export const Frameworks: CollectionConfig = {
  slug: 'frameworks',
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
      name: 'template',
      type: 'code',
      required: true,
    },
    {
      name: 'icon',
      type: 'text',
    },
    {
      name: 'sortOrder',
      type: 'number',
    },
  ],
}
