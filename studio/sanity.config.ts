import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {rubyPhoto} from './ruby-photo'

export default defineConfig({
  name: 'ruby',
  title: 'Ruby · Görsel yönetimi',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  plugins: [structureTool({
    title: 'Görseller',
    structure: (S) => S.documentTypeList('rubyPhoto').title('Görseller'),
  })],
  schema: {types: [rubyPhoto]},
})
