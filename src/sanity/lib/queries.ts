import { groq } from 'next-sanity'

// ============================================
// BANNERS
// ============================================

// Obtener banners activos (con validación de fechas)
export const activeBannersQuery = groq`
  *[_type == "banner" && active == true && 
    (startAt == null || startAt <= now()) && 
    (endAt == null || endAt >= now())
  ] | order(order asc) {
    _id,
    title,
    subtitle,
    imageDesktop,
    imageMobile,
    ctaText,
    ctaUrl,
    order
  }
`

// ============================================
// TESTIMONIOS
// ============================================

// Obtener testimonios publicados
export const publishedTestimonialsQuery = groq`
  *[_type == "testimonial" && published == true] | order(featured desc, order asc, date desc) {
    _id,
    name,
    quote,
    photo,
    city,
    product,
    rating,
    featured
  }
`

// Obtener testimonios destacados (máximo N)
export const featuredTestimonialsQuery = groq`
  *[_type == "testimonial" && published == true] | order(featured desc, order asc, date desc) [0...$limit] {
    _id,
    name,
    quote,
    photo,
    city,
    product,
    rating,
    featured
  }
`

// ============================================
// POSTS / NOTICIAS
// ============================================

// Obtener últimas noticias (para Home)
export const latestPostsQuery = groq`
  *[_type == "post" && published == true] | order(publishedAt desc) [0...$limit] {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    publishedAt,
    tags
  }
`

// Obtener todas las noticias publicadas
export const allPostsQuery = groq`
  *[_type == "post" && published == true] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    publishedAt,
    tags
  }
`

// Obtener post por slug
export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug && published == true][0] {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    content,
    publishedAt,
    tags
  }
`

// Obtener slugs de todos los posts (para generateStaticParams)
export const allPostSlugsQuery = groq`
  *[_type == "post" && published == true] {
    "slug": slug.current
  }
`
