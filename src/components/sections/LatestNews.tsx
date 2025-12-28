import Image from 'next/image'
import Link from 'next/link'
import { Card, Button } from '@/components/ui'
import { getImageUrl } from '@/sanity/lib/image'
import type { Post } from '@/types/sanity'

interface LatestNewsProps {
  posts: Post[]
}

export default function LatestNews({ posts }: LatestNewsProps) {
  // Si no hay posts, no renderizar nada
  if (!posts || posts.length === 0) {
    return null
  }

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-text">
            Últimas noticias
          </h2>
          <p className="mt-4 text-muted leading-relaxed max-w-2xl mx-auto">
            Mantente al día con las novedades de ChicImportUSA.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {posts.slice(0, 3).map((post) => {
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
                      <div className="flex gap-2 mb-2">
                        {post.tags.slice(0, 2).map((tag) => (
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
                    <h3 className="font-semibold text-text group-hover:text-accent transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Extracto */}
                    <p className="mt-2 text-sm text-muted line-clamp-2">
                      {post.excerpt}
                    </p>

                    {/* Fecha */}
                    <p className="mt-3 text-xs text-muted-2">
                      {dateStr}
                    </p>
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>

        <div className="mt-10 text-center">
          <Button variant="secondary" href="/noticias">
            Ver todas las noticias
          </Button>
        </div>
      </div>
    </section>
  )
}
