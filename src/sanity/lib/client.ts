import { createClient } from 'next-sanity'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

// Cliente principal con CDN (para producción)
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Siempre usar CDN para lecturas públicas
  perspective: 'published', // Solo contenido publicado
  stega: {
    enabled: false, // Desactivar visual editing en producción
  },
})

// Cliente sin CDN (para previews y revalidación)
export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: 'previewDrafts',
})

// Helper para fetch con caché de Next.js
export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
  revalidate = 3600, // 1 hora por defecto
}: {
  query: string
  params?: Record<string, unknown>
  tags?: string[]
  revalidate?: number | false
}): Promise<T> {
  return client.fetch<T>(query, params, {
    next: {
      revalidate,
      tags,
    },
  })
}
