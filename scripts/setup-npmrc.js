import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const registry = process.env.NPM_REGISTRY_URL;
const token = process.env.NPM_TOKEN;

if (!registry || !token) {
  throw new Error('NPM_REGISTRY_URL and NPM_TOKEN must be set');
}

const scope = '@mobiscroll'; // Replace with your scope or leave blank if not using a scope

const npmrcContent = `
legacy-peer-deps=true
${scope}:registry=${registry}
//${registry.replace(/^https?:\/\//, '')}:_authToken=${token}
`;

fs.writeFileSync('.npmrc', npmrcContent.trim(), 'utf8'); 