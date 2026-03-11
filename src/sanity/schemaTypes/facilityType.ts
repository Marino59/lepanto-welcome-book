import {defineField, defineType} from 'sanity'

export const facilityType = defineType({
  name: 'facility',
  title: 'Facility / Shop',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string' }),
    defineField({ name: 'address', title: 'Address', type: 'string' }),
    defineField({ name: 'icon', title: 'Icon (FontAwesome class)', type: 'string' }),
  ],
})
