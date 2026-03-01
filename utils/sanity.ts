import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

export const sanity = createClient({
  projectId: '44elzz3z',
  dataset: 'production',
  apiVersion: '2026-03-01',
  useCdn: true
})

const builder = createImageUrlBuilder(sanity)
export const urlFor = (source: any) => builder.image(source)