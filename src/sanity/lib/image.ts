import imageUrlBuilder from '@sanity/image-url'
import { client } from './client'

const builder = imageUrlBuilder(client)

export function urlForImage(source: unknown) {
  if (!source) return null
  return builder.image(source as Parameters<typeof builder.image>[0])
}

// Helper para obtener URL con dimensiones específicas
export function getImageUrl(source: unknown, width?: number, height?: number): string | null {
  if (!source) return null
  
  let imageBuilder = builder.image(source as Parameters<typeof builder.image>[0])
  
  if (width) imageBuilder = imageBuilder.width(width)
  if (height) imageBuilder = imageBuilder.height(height)
  
  return imageBuilder.auto('format').quality(85).url()
}
