import {defineField, defineType} from 'sanity'

export const emergencyNumberType = defineType({
  name: 'emergencyNumber',
  title: 'Emergency Number',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string' }),
    defineField({ name: 'number', title: 'Phone Number', type: 'string' }),
    defineField({ name: 'icon', title: 'Icon (FontAwesome class)', type: 'string' }),
  ],
})
