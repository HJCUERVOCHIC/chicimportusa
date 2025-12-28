import { defineField, defineType } from 'sanity'

export const banner = defineType({
  name: 'banner',
  title: 'Banners',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required().error('El título es requerido'),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'string',
    }),
    defineField({
      name: 'imageDesktop',
      title: 'Imagen Desktop',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required().error('La imagen de desktop es requerida'),
    }),
    defineField({
      name: 'imageMobile',
      title: 'Imagen Mobile (opcional)',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Si no se sube, se usará la imagen de desktop',
    }),
    defineField({
      name: 'ctaText',
      title: 'Texto del botón',
      type: 'string',
      initialValue: 'Unirme al WhatsApp',
    }),
    defineField({
      name: 'ctaUrl',
      title: 'URL del botón',
      type: 'url',
      initialValue: 'https://wa.me/573150619888',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https', 'tel'],
        }),
    }),
    defineField({
      name: 'active',
      title: 'Activo',
      type: 'boolean',
      initialValue: true,
      description: 'Solo los banners activos se muestran',
    }),
    defineField({
      name: 'startAt',
      title: 'Fecha de inicio (opcional)',
      type: 'datetime',
      description: 'El banner se mostrará a partir de esta fecha',
    }),
    defineField({
      name: 'endAt',
      title: 'Fecha de fin (opcional)',
      type: 'datetime',
      description: 'El banner dejará de mostrarse después de esta fecha',
    }),
    defineField({
      name: 'order',
      title: 'Orden',
      type: 'number',
      initialValue: 0,
      description: 'Menor número = aparece primero en el carrusel',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'imageDesktop',
      active: 'active',
    },
    prepare({ title, subtitle, media, active }) {
      return {
        title: `${active ? '🟢' : '🔴'} ${title}`,
        subtitle: subtitle || 'Sin subtítulo',
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Orden ascendente',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
