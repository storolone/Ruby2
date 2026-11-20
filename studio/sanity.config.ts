import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {rubyPhoto} from './ruby-photo'
import {rubyPhotoSlot} from './photo-slot'
import {gallerySections} from '../app/cms/catalog'

export default defineConfig({
  name: 'ruby',
  title: 'Ruby · Görsel yönetimi',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  plugins: [structureTool({
    title: 'Görseller',
    structure: (S) => S.list().title('Görsel kategorileri').items(gallerySections.map(category =>
      S.listItem().id(category.id).title(category.title).child(
        S.list().id(category.id).title(category.title).items([
          S.listItem().id('added').title('Yeni fotoğraf ekle / eklenenleri düzenle').child(
            S.documentList().title('Eklenen fotoğraflar').schemaType('rubyPhoto')
              .filter('_type == "rubyPhoto" && section == $section')
              .params({section: category.id})
              .initialValueTemplates([S.initialValueTemplateItem('ruby-photo-section', {section: category.id})]),
          ),
          S.divider(),
          ...category.slots.map(slot => S.listItem().id(slot.id).title(slot.title).child(
            S.document().schemaType('rubyPhotoSlot').documentId(slot.id).title(slot.title),
          )),
        ]),
      ),
    )),
  })],
  document: {
    newDocumentOptions: (options) => options.filter(option => option.templateId !== 'rubyPhotoSlot'),
  },
  schema: {
    types: [rubyPhoto, rubyPhotoSlot],
    templates: (previous) => [
      ...previous,
      {id: 'ruby-photo-section', title: 'Fotoğraf ekle', schemaType: 'rubyPhoto',
        parameters: [{name: 'section', type: 'string'}], value: ({section}: {section?: string}) => ({section})},
    ],
  },
})
