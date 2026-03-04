import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

// Tipos de documentos de Sanity que manejamos
type DocumentType = 'banner' | 'testimonial' | 'post'

// Mapeo de tipo de documento a tags y rutas
const revalidationConfig: Record<DocumentType, { tags: string[], paths: string[] }> = {
  banner: {
    tags: ['banners'],
    paths: ['/'],
  },
  testimonial: {
    tags: ['testimonials'],
    paths: ['/'],
  },
  post: {
    tags: ['posts'],
    paths: ['/', '/noticias'],
  },
}

export async function POST(request: NextRequest) {
  try {
    const secret = request.nextUrl.searchParams.get('secret')
    
    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json(
        { message: 'Invalid secret' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const documentType = body._type as DocumentType
    
    if (!documentType || !revalidationConfig[documentType]) {
      return NextResponse.json(
        { message: 'Unknown document type', type: documentType },
        { status: 400 }
      )
    }

    const config = revalidationConfig[documentType]
    const revalidatedTags: string[] = []
    const revalidatedPaths: string[] = []

    // Revalidar tags (Next.js 16: async)
    for (const tag of config.tags) {
      await revalidateTag(tag)
      revalidatedTags.push(tag)
    }

    // Revalidar rutas (Next.js 16: async)
    for (const path of config.paths) {
      await revalidatePath(path)
      revalidatedPaths.push(path)
    }

    // Si es un post, también revalidar la página específica y su tag
    if (documentType === 'post' && body.slug?.current) {
      const slug = body.slug.current
      await revalidateTag(`post-${slug}`)
      await revalidatePath(`/noticias/${slug}`)
      revalidatedTags.push(`post-${slug}`)
      revalidatedPaths.push(`/noticias/${slug}`)
    }

    return NextResponse.json({
      revalidated: true,
      tags: revalidatedTags,
      paths: revalidatedPaths,
      documentType,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { message: 'Error revalidating', error: String(error) },
      { status: 500 }
    )
  }
}

// GET para pruebas manuales
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')
  const path = request.nextUrl.searchParams.get('path')
  const tag = request.nextUrl.searchParams.get('tag')
  
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json(
      { message: 'Invalid secret' },
      { status: 401 }
    )
  }

  try {
    const result: { path?: string; tag?: string } = {}

    if (tag) {
      await revalidateTag(tag)
      result.tag = tag
    }

    if (path) {
      await revalidatePath(path)
      result.path = path
    }

    if (!tag && !path) {
      await revalidatePath('/')
      result.path = '/'
    }

    return NextResponse.json({
      revalidated: true,
      ...result,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      { message: 'Error revalidating', error: String(error) },
      { status: 500 }
    )
  }
}