import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { useRuntimeConfig } from '#imports'

const config = useRuntimeConfig()

export const sanity = createClient({
  projectId: config.public.sanityProjectId as string,
  dataset: config.public.sanityDataset as string,
  apiVersion: config.public.sanityApiVersion as string,
  useCdn: true
})

const builder = imageUrlBuilder(sanity)

// keep it simple: accept any image source (Sanity image objects vary)
export const urlFor = (source: any) => builder.image(source)