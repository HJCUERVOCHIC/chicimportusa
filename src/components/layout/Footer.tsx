import Link from 'next/link'
import { Button } from '@/components/ui'

export default function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Columna 1: Marca y CTA */}
          <div className="space-y-4">
            <p className="font-semibold text-text text-lg">ChicImportUSA</p>
            <p className="text-sm leading-relaxed text-muted">
              Publicaciones periódicas de moda original desde USA
            </p>
            <Button isWhatsApp>
              Unirme al WhatsApp
            </Button>
          </div>

          {/* Columna 2: Links y legal */}
          <div className="space-y-4">
            <div className="flex gap-6 text-sm text-muted">
              <Link href="/como-funciona" className="hover:text-text transition">
                Cómo funciona
              </Link>
              <Link href="/publicaciones" className="hover:text-text transition">
                Publicaciones
              </Link>
            </div>
            
            <div className="flex gap-4 text-sm text-muted-2">
              <Link href="/privacidad" className="hover:text-muted transition">
                Privacidad
              </Link>
              <span>·</span>
              <Link href="/terminos" className="hover:text-muted transition">
                Términos
              </Link>
            </div>
          </div>
        </div>

        {/* Nota legal */}
        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-sm leading-relaxed text-muted">
            ChicImportUSA gestiona pedidos exclusivamente sobre productos en cada publicación. 
            No manejamos stock permanente ni búsqueda de productos por encargo.
          </p>
          
          {/* Enlace de administración - discreto */}
          <div className="mt-6 flex justify-end">
            <a 
              href="https://admin.chicimportusa.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-muted-2/50 hover:text-muted transition"
            >
              Admin
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
