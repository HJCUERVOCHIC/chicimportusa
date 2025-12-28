// Tipos para el modelo de datos de ChicImportUSA

export type DropStatus = 'active' | 'closed'
export type ProductStatus = 'available' | 'closed'

export interface Product {
  id: string
  name: string
  brand: string
  category: string
  image: string
  price_ref: string
  status: ProductStatus
}

export interface Drop {
  id: string
  title: string
  date: string
  status: DropStatus
  products: Product[]
}

export interface DropsData {
  drops: Drop[]
}

// Tipos para testimonios
export interface Testimonial {
  id: string
  name: string
  location: string
  text: string
  product?: string
}

// Constantes
export const WHATSAPP_LINK = 'https://wa.me/573150619888'
export const WHATSAPP_CTA_TEXT = 'Unirme al WhatsApp'
