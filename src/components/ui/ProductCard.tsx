import Image from 'next/image'
import Badge from './Badge'
import Button from './Button'
import { Product } from '@/types'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="rounded-xl border border-border bg-white overflow-hidden">
      {/* Imagen */}
      <div className="relative w-full aspect-square bg-gray-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Contenido */}
      <div className="p-4 space-y-2">
        <p className="text-sm text-muted">{product.brand}</p>
        <h3 className="font-semibold text-text">{product.name}</h3>
        <p className="text-sm font-medium text-text">{product.price_ref}</p>
        
        <div className="pt-2 flex items-center justify-between gap-2">
          <Badge>Publicación cerrada</Badge>
          <Button 
            variant="ghost" 
            isWhatsApp 
            className="text-sm px-3 py-1.5"
          >
            Recibir publicaciones
          </Button>
        </div>
      </div>
    </div>
  )
}
