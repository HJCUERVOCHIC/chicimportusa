// Tipos para los documentos de Sanity

import type { PortableTextBlock } from '@portabletext/types'

// Tipo para imágenes de Sanity
export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
}

// Banner
export interface Banner {
  _id: string
  title: string
  subtitle?: string
  imageDesktop: SanityImage
  imageMobile?: SanityImage
  ctaText?: string
  ctaUrl?: string
  order: number
}

// Testimonio
export interface Testimonial {
  _id: string
  name: string
  quote: string
  photo?: SanityImage
  city?: string
  product?: string
  rating?: number
  featured: boolean
}

// Post / Noticia
export interface Post {
  _id: string
  title: string
  slug: {
    current: string
  }
  excerpt: string
  coverImage: SanityImage
  content?: PortableTextBlock[]
  publishedAt: string
  tags?: string[]
}

// Para generateStaticParams
export interface PostSlug {
  slug: string
}
