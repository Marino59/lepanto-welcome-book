import {defineField, defineType} from 'sanity'

export const houseInfoType = defineType({
  name: 'houseInfo',
  title: 'House Information',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'address', title: 'Address', type: 'string' }),
    defineField({ name: 'heroImage', title: 'Hero Image', type: 'image' }),
    defineField({ name: 'history', title: 'Our History', type: 'text' }),
    defineField({ name: 'wifiPassword', title: 'Wi-Fi Password', type: 'string' }),
    defineField({ name: 'doorbellName', title: 'Doorbell Name', type: 'string' }),
  ],
})
