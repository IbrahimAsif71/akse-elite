import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { useRuntimeConfig } from '#imports'

const config = useRuntimeConfig()

export const sanity = createClient({
  projectId: config.public.sanityProjectId as string,
  dataset: config.public.sanityDataset as string,
  apiVersion: config.public.sanityApiVersion as string,
  useCdn: true
})

const builder = imageUrlBuilder(sanity)
export const urlFor = (source: SanityImageSource) => builder.image(source)