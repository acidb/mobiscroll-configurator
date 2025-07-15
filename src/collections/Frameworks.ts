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
    // TODO remove after the migration to templates
    {
      name: 'template',
      type: 'code',
      required: true,
    },
    {
      name: 'templates',
      type: 'array',
      label: 'Templates',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        // TODO add a language selector
        // {
        //   name: 'language',
        //   type: 'select',
        //   required: true,
        //   defaultValue: 'javascript',
        //   options: [
        //     { label: 'JavaScript', value: 'javascript' },
        //     { label: 'TypeScript', value: 'typescript' },
        //     { label: 'HTML', value: 'html' },
        //     { label: 'JSON', value: 'json' },
        //     { label: 'CSS', value: 'css' },
        //     { label: 'SCSS', value: 'scss' },
        //   ],
        // },
        {
          name: 'template',
          type: 'code',
          required: true,
          admin: {
            language: 'javascript',
          }
        },
      ],
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
