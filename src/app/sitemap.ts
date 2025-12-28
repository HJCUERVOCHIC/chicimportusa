import { MetadataRoute } from 'next'
import { getAllPosts } from '@/sanity/lib/fetchers'

const BASE_URL = 'https://chicimportusa.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Páginas estáticas
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/como-funciona`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/publicaciones`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/noticias`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/whatsapp`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  // Páginas dinámicas (noticias)
  let dynamicPages: MetadataRoute.Sitemap = []
  
  try {
    const posts = await getAllPosts()
    dynamicPages = posts.map((post) => ({
      url: `${BASE_URL}/noticias/${post.slug.current}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  } catch (error) {
    console.error('Error generating sitemap:', error)
  }

  return [...staticPages, ...dynamicPages]
}
