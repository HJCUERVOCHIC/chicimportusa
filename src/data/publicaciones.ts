import { PublicacionesData, Testimonial } from '@/types'

export const publicacionesData: PublicacionesData = {
  publicaciones: [
    {
      id: 'pub-2025-01',
      title: 'Publicación Enero 2025',
      date: '2025-01-15',
      status: 'closed',
      products: [
        {
          id: 'prod-1',
          name: 'Nike Air Force 1 \'07',
          brand: 'Nike',
          category: 'Tenis',
          image: '/img/placeholder-sneaker.jpg',
          price_ref: '$450.000',
          status: 'closed',
        },
        {
          id: 'prod-2',
          name: 'Air Jordan 1 Retro High OG',
          brand: 'Jordan',
          category: 'Tenis',
          image: '/img/placeholder-sneaker.jpg',
          price_ref: '$680.000',
          status: 'closed',
        },
        {
          id: 'prod-3',
          name: 'New Balance 550',
          brand: 'New Balance',
          category: 'Tenis',
          image: '/img/placeholder-sneaker.jpg',
          price_ref: '$520.000',
          status: 'closed',
        },
        {
          id: 'prod-4',
          name: 'Essentials Hoodie',
          brand: 'Fear of God',
          category: 'Ropa',
          image: '/img/placeholder-clothing.jpg',
          price_ref: '$380.000',
          status: 'closed',
        },
      ],
    },
    {
      id: 'pub-2024-12',
      title: 'Publicación Diciembre 2024',
      date: '2024-12-10',
      status: 'closed',
      products: [
        {
          id: 'prod-5',
          name: 'Nike Dunk Low',
          brand: 'Nike',
          category: 'Tenis',
          image: '/img/placeholder-sneaker.jpg',
          price_ref: '$420.000',
          status: 'closed',
        },
        {
          id: 'prod-6',
          name: 'Adidas Samba OG',
          brand: 'Adidas',
          category: 'Tenis',
          image: '/img/placeholder-sneaker.jpg',
          price_ref: '$380.000',
          status: 'closed',
        },
      ],
    },
  ],
}

export const testimonialsData: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Carlos M.',
    location: 'Bogotá',
    text: 'Excelente comunicación y producto 100% original. El proceso fue transparente de inicio a fin.',
    product: 'Air Jordan 1',
  },
  {
    id: 'test-2',
    name: 'María L.',
    location: 'Medellín',
    text: 'Primera vez comprando por drops y la experiencia fue genial. Todo llegó perfecto.',
    product: 'Nike Dunk Low',
  },
  {
    id: 'test-3',
    name: 'Andrés R.',
    location: 'Cali',
    text: 'Me encanta el modelo de drops. Precios justos y productos verificados.',
    product: 'New Balance 550',
  },
]
