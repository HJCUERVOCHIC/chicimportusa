import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { Button } from '@/components/ui'
import { FinalCTA } from '@/components/sections'
import { getPostBySlug, getAllPostSlugs } from '@/sanity/lib/fetchers'
import { getImageUrl, urlForImage } from '@/sanity/lib/image'

// ISR: Revalidar cada 5 minutos
export const revalidate = 300

// Generar rutas estáticas
export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map((item) => ({
    slug: item.slug,
  }))
}

// Metadata dinámica
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  
  if (!post) {
    return {
      title: 'Noticia no encontrada | ChicImportUSA',
    }
  }

  return {
    title: `${post.title} | ChicImportUSA`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      images: post.coverImage ? [getImageUrl(post.coverImage, 1200, 630) || ''] : [],
    },
  }
}

// Componentes personalizados para Portable Text
const portableTextComponents = {
  types: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image: ({ value }: { value: any }) => {
      const imageUrl = urlForImage(value)?.width(800).auto('format').url()
      if (!imageUrl) return null
      
      return (
        <figure className="my-8">
          <Image
            src={imageUrl}
            alt={value.alt || 'Imagen del artículo'}
            width={800}
            height={500}
            className="rounded-lg w-full"
          />
          {value.caption && (
            <figcaption className="text-center text-sm text-muted mt-2">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
  marks: {
    link: ({ children, value }: { children: React.ReactNode; value: { href: string } }) => {
      const isExternal = value.href.startsWith('http')
      return (
        <a
          href={value.href}
          className="text-accent hover:underline"
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      )
    },
  },
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-2xl font-semibold text-text mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-xl font-semibold text-text mt-6 mb-3">{children}</h3>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-accent pl-4 my-6 italic text-muted">
        {children}
      </blockquote>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-muted leading-relaxed mb-4">{children}</p>
    ),
  },
}

export default async function NoticiaPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const coverUrl = getImageUrl(post.coverImage, 1200, 600)
  const dateStr = new Date(post.publishedAt).toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <>
      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 pt-6">
        <Link 
          href="/noticias" 
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-text transition"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver a noticias
        </Link>
      </div>

      {/* Artículo */}
      <article className="py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          {/* Header del artículo */}
          <header className="mb-8">
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm font-medium text-accent"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Título */}
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-text">
              {post.title}
            </h1>

            {/* Fecha */}
            <p className="mt-4 text-muted">
              {dateStr}
            </p>

            {/* Extracto */}
            <p className="mt-4 text-lg text-muted leading-relaxed">
              {post.excerpt}
            </p>
          </header>

          {/* Imagen de portada */}
          {coverUrl && (
            <div className="relative aspect-[2/1] rounded-xl overflow-hidden mb-8">
              <Image
                src={coverUrl}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Contenido */}
          {post.content && (
            <div className="prose prose-lg max-w-none">
              <PortableText 
                value={post.content} 
                components={portableTextComponents}
              />
            </div>
          )}

          {/* CTA al final del artículo */}
          <div className="mt-12 p-6 bg-gray-50 rounded-xl text-center">
            <p className="text-lg font-semibold text-text mb-4">
              ¿Te interesa lo que hacemos?
            </p>
            <Button isWhatsApp>
              Unirme al WhatsApp
            </Button>
          </div>
        </div>
      </article>

      {/* CTA Final */}
      <FinalCTA />
    </>
  )
}
