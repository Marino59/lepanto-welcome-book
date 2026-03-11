import { defineField, defineType } from 'sanity'

export const sightseeingType = defineType({
  name: 'sightseeing',
  title: 'Luoghi da vedere',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nome',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Descrizione',
      type: 'text',
    }),
    defineField({
      name: 'address',
      title: 'Indirizzo',
      type: 'string',
    }),
    defineField({
      name: 'icon',
      title: 'Icona (FontAwesome class)',
      type: 'string',
      initialValue: 'landmark',
    }),
    defineField({
      name: 'mainImage',
      title: 'Immagine principale',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
