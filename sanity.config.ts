import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schema } from './src/sanity/schema'

export default defineConfig({
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'fpczyqs3',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  title: 'Welcome Book Studio',
  
  plugins: [structureTool()],
  
  schema: {
    types: schema.types,
  },
})
