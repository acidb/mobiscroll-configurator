// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Groups } from './collections/Groups'
import { Components } from './collections/Components'
import { Frameworks } from './collections/Frameworks'
import { Presets } from './collections/Presets'
import { Configs } from './collections/Configs'
import { Settings } from './collections/Settings';
import seedDatabase from './scripts/seed'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: { afterDashboard: ['./app/components/seedButton'] },
  },
  collections: [Users, Media, Groups, Components, Frameworks, Presets, Configs, Settings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
  endpoints: [
    {
      path: '/seed',
      method: 'post',
      handler: async (req) => {
        try {
          await seedDatabase(req.payload)
          return Response.json({ success: true }, { status: 200 })
        } catch (err) {
          const message = (err as Error).message ?? 'Unknown error'
          return Response.json({ success: false, message: `Error: ${message}` }, { status: 500 })
        }
      },
    },
  ],
})
