import type { Metadata } from 'next'
import PublicacionesEmbed from '@/components/sections/PublicacionesEmbed'

export const metadata: Metadata = {
  title: 'Ver Publicaciones | ChicImportUSA',
  description: 'Explora las publicaciones activas de productos importados desde Estados Unidos. Tenis, ropa deportiva, casual y accesorios disponibles.',
  openGraph: {
    title: 'Ver Publicaciones | ChicImportUSA',
    description: 'Explora las publicaciones activas de productos importados desde Estados Unidos.',
    type: 'website',
  },
}

export default function PublicacionesPage() {
  return (
    <main className="min-h-screen bg-white">
      <PublicacionesEmbed />
    </main>
  )
}
