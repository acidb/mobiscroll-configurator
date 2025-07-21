import { CollectionConfig } from 'payload'

export const Settings: CollectionConfig = {
    slug: 'settings',
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
            name: 'components',
            type: 'relationship',
            relationTo: 'components',
            required: true,
            hasMany: true,
        },
        {
            name: 'settings',
            type: 'json',
            required: true,
        },
        {
            name: 'title',
            type: 'text',
        },
    ],
}