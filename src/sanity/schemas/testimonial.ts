import { defineField, defineType } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonios',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      validation: (Rule) => Rule.required().error('El nombre es requerido'),
    }),
    defineField({
      name: 'quote',
      title: 'Testimonio',
      type: 'text',
      rows: 3,
      validation: (Rule) =>
        Rule.required()
          .min(20)
          .max(400)
          .error('El testimonio debe tener entre 20 y 400 caracteres'),
    }),
    defineField({
      name: 'photo',
      title: 'Foto (opcional)',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'city',
      title: 'Ciudad',
      type: 'string',
    }),
    defineField({
      name: 'product',
      title: 'Producto comprado',
      type: 'string',
      description: 'Ej: Air Jordan 1, Nike Dunk Low',
    }),
    defineField({
      name: 'rating',
      title: 'Calificación',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5),
      initialValue: 5,
    }),
    defineField({
      name: 'featured',
      title: 'Destacado',
      type: 'boolean',
      initialValue: false,
      description: 'Los testimonios destacados aparecen primero',
    }),
    defineField({
      name: 'order',
      title: 'Orden',
      type: 'number',
      initialValue: 0,
      description: 'Menor número = aparece primero',
    }),
    defineField({
      name: 'published',
      title: 'Publicado',
      type: 'boolean',
      initialValue: false,
      description: 'Solo los testimonios publicados aparecen en el sitio',
    }),
    defineField({
      name: 'date',
      title: 'Fecha',
      type: 'date',
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString().split('T')[0],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'city',
      media: 'photo',
      published: 'published',
    },
    prepare({ title, subtitle, media, published }) {
      return {
        title: `${published ? '✅' : '⏸️'} ${title}`,
        subtitle: subtitle || 'Sin ciudad',
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Destacados primero',
      name: 'featuredDesc',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'order', direction: 'asc' },
        { field: 'date', direction: 'desc' },
      ],
    },
  ],
})
