import {defineField, defineType, useFormValue} from 'sanity'
import type {ObjectInputProps} from 'sanity'
import {assetSlots} from '../app/cms/catalog'

const site = 'https://storolone.github.io/Ruby2'

function SlotPreview(props: ObjectInputProps) {
  const documentId = useFormValue(['_id'])
  const id = typeof documentId === 'string' ? documentId.replace(/^drafts\./, '') : ''
  const slot = assetSlots.find(item => item.id === id)

  return <>
    {slot && <figure style={{margin: '0 0 1.25rem'}}>
      <img src={site + slot.path} alt={slot.title} style={{display: 'block', maxWidth: '100%', maxHeight: 220, objectFit: 'contain'}} />
      <figcaption style={{marginTop: '0.5rem'}}>{slot.title} · Sitedeki orijinal fotoğraf</figcaption>
    </figure>}
    {props.renderDefault(props)}
  </>
}

export const rubyPhotoSlot = defineType({
  name: 'rubyPhotoSlot',
  title: 'Mevcut fotoğrafı değiştir',
  type: 'document',
  components: {input: SlotPreview},
  fields: [defineField({
    name: 'image',
    title: 'Yeni fotoğraf',
    type: 'image',
    options: {accept: 'image/jpeg,image/png,image/webp,image/avif'},
    description: 'Yayınladığınızda fotoğraf aynı yerde değişir.',
    validation: rule => rule.required().assetRequired(),
  })],
  preview: {
    select: {id: '_id', image: 'image'},
    prepare({id, image}) {
      const slot = assetSlots.find(item => item.id === id?.replace(/^drafts\./, ''))
      return {title: slot?.title ?? 'Mevcut fotoğraf', media: image}
    },
  },
})
