import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

// Tipos de documentos de Sanity que manejamos
type DocumentType = 'banner' | 'testimonial' | 'post'

// Mapeo de tipo de documento a rutas a revalidar
const pathsToRevalidate: Record<DocumentType, string[]> = {
  banner: ['/'],
  testimonial: ['/'],
  post: ['/', '/noticias'],
}

export async function POST(request: NextRequest) {
  try {
    // Verificar el secret
    const secret = request.nextUrl.searchParams.get('secret')
    
    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json(
        { message: 'Invalid secret' },
        { status: 401 }
      )
    }

    // Obtener el body del webhook de Sanity
    const body = await request.json()
    
    // Sanity envía el tipo de documento en _type
    const documentType = body._type as DocumentType
    
    if (!documentType || !pathsToRevalidate[documentType]) {
      return NextResponse.json(
        { message: 'Unknown document type', type: documentType },
        { status: 400 }
      )
    }

    // Revalidar las rutas correspondientes
    const paths = pathsToRevalidate[documentType]
    
    for (const path of paths) {
      revalidatePath(path)
    }

    // Si es un post, también revalidar la página específica
    if (documentType === 'post' && body.slug?.current) {
      revalidatePath(`/noticias/${body.slug.current}`)
    }

    return NextResponse.json({
      revalidated: true,
      paths,
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

// También permitir GET para pruebas manuales
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')
  const path = request.nextUrl.searchParams.get('path') || '/'
  
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json(
      { message: 'Invalid secret' },
      { status: 401 }
    )
  }

  try {
    revalidatePath(path)
    return NextResponse.json({
      revalidated: true,
      path,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      { message: 'Error revalidating', error: String(error) },
      { status: 500 }
    )
  }
}
