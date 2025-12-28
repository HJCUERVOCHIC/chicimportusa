import imageUrlBuilder from '@sanity/image-url'
import { client } from './client'

const builder = imageUrlBuilder(client)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlForImage(source: any) {
  if (!source) return null
  return builder.image(source)
}

// Helper para obtener URL con dimensiones específicas
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getImageUrl(source: any, width?: number, height?: number): string | null {
  if (!source) return null
  
  let imageBuilder = builder.image(source)
  
  if (width) imageBuilder = imageBuilder.width(width)
  if (height) imageBuilder = imageBuilder.height(height)
  
  return imageBuilder.auto('format').quality(85).url()
}
