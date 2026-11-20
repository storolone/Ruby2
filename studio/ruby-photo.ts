import {defineField, defineType} from 'sanity'
import {sections} from '../app/cms/sections'

function imageField(name: string, title: string, isPair: boolean) {
  return defineField({
    name,
    title,
    type: 'image',
    options: {accept: 'image/jpeg,image/png,image/webp,image/avif'},
    hidden: ({document}) => !document?.section || (document.section === 'scalp') !== isPair,
    validation: (rule) => rule.custom((value, {document}) => {
      if (!document?.section || (document.section === 'scalp') !== isPair) return true
      return value?.asset ? true : 'Fotoğraf seçin.'
    }),
  })
}

export const rubyPhoto = defineType({
  name: 'rubyPhoto',
  title: 'Fotoğraf',
  type: 'document',
  fields: [
    defineField({
      name: 'section',
      title: 'Bölüm',
      type: 'string',
      options: {list: sections.map(([value, title]) => ({value, title}))},
      validation: (rule) => rule.required().custom((value) =>
        !value || sections.some(([id]) => id === value) ? true : 'Listeden bir bölüm seçin.',
      ),
    }),
    imageField('image', 'Fotoğraf', false),
    imageField('before', 'Öncesi', true),
    imageField('after', 'Sonrası', true),
    defineField({
      name: 'caption',
      title: 'Açıklama (isteğe bağlı)',
      type: 'string',
      validation: (rule) => rule.max(160),
    }),
  ],
  preview: {
    select: {section: 'section', caption: 'caption', image: 'image', after: 'after'},
    prepare({section, caption, image, after}) {
      const title = sections.find(([value]) => value === section)?.[1] || 'Bölüm seçin'
      return {title, subtitle: caption, media: section === 'scalp' ? after : image}
    },
  },
})
