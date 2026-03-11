import { createClient, type SanityClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

let _client: SanityClient | null = null;

export function useSanity() {
  if (!_client) {
    const config = useRuntimeConfig();
    _client = createClient({
      projectId: config.public.sanityProjectId as string,
      dataset: config.public.sanityDataset as string,
      apiVersion: config.public.sanityApiVersion as string,
      useCdn: true,
    });
  }
  return _client;
}

export function urlFor(source: any) {
  return createImageUrlBuilder(useSanity()).image(source);
}
