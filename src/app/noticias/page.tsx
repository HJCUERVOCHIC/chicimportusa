import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Card, Button } from '@/components/ui'
import { FinalCTA } from '@/components/sections'
import { getAllPosts } from '@/sanity/lib/fetchers'
import { getImageUrl } from '@/sanity/lib/image'

export const metadata: Metadata = {
  title: 'Noticias | ChicImportUSA',
  description: 'Últimas noticias y novedades de ChicImportUSA. Mantente al día con nuestras publicaciones.',
}

// ISR: Revalidar cada 5 minutos
export const revalidate = 300

export default async function NoticiasPage() {
  const posts = await getAllPosts()

  return (
    <>
      {/* Header de página */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-text">
            Noticias
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted max-w-3xl">
            Mantente al día con las últimas novedades de ChicImportUSA.
          </p>
        </div>
      </section>

      {/* Listado de noticias */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted text-lg">
                No hay noticias publicadas aún.
              </p>
              <div className="mt-6">
                <Button isWhatsApp>
                  Unirme al WhatsApp
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => {
                const imageUrl = getImageUrl(post.coverImage, 400, 250)
                const dateStr = new Date(post.publishedAt).toLocaleDateString('es-CO', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })

                return (
                  <Link 
                    key={post._id} 
                    href={`/noticias/${post.slug.current}`}
                    className="group"
                  >
                    <Card variant="base" className="h-full overflow-hidden p-0">
                      {/* Imagen */}
                      {imageUrl && (
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <Image
                            src={imageUrl}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      )}

                      {/* Contenido */}
                      <div className="p-5">
                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-2">
                            {post.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="text-xs font-medium text-accent"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Título */}
                        <h2 className="font-semibold text-lg text-text group-hover:text-accent transition-colors line-clamp-2">
                          {post.title}
                        </h2>

                        {/* Extracto */}
                        <p className="mt-2 text-sm text-muted line-clamp-3">
                          {post.excerpt}
                        </p>

                        {/* Fecha */}
                        <p className="mt-4 text-xs text-muted-2">
                          {dateStr}
                        </p>
                      </div>
                    </Card>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Final */}
      <FinalCTA />
    </>
  )
}
