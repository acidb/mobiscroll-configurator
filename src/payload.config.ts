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

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      beforeDashboard: ['@/components/DashBoardDescription'],
      graphics: {
        Logo: '@/components/MobiscrollLogo',
        Icon: '@/components/MobiscrollLogo',
      }
    },
    theme: "light"
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
      path: '/timeline-events',
      method: 'get',
      handler: async () => {
        try {
          const response = await fetch('https://trial.mobiscroll.com/timeline-events/');
          const text = await response.text();

          const match = text.match(/\([\s\n]*(\[.*\])[\s\n]*\)/s);
          if (match && match[1]) {
            const data = JSON.parse(match[1]);
            return Response.json(data);
          } else {
            return Response.json({ error: 'Failed to parse Mobiscroll JSONP.', raw: text }, { status: 500 });
          }
        } catch (e) {
          return Response.json({ error: e || 'Something went wrong.' }, { status: 500 });
        }
      },
    },

  ],




})
