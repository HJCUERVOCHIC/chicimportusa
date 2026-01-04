import Image from 'next/image'

const categories = [
  {
    title: 'Tenis Deportivos',
    description: 'Running, basketball, training y más de las mejores marcas.',
    image: '/img/categoria-deportivos.jpg',
  },
  {
    title: 'Tenis Casuales',
    description: 'Sneakers y estilos urbanos para el día a día.',
    image: '/img/categoria-casuales.jpg',
  },
  {
    title: 'Ediciones Especiales',
    description: 'Lanzamientos exclusivos y colaboraciones limitadas.',
    image: '/img/categoria-ediciones.jpg',
  },
  {
    title: 'Ropa Deportiva',
    description: 'Conjuntos, camisetas, shorts y más para entrenar con estilo.',
    image: '/img/categoria-ropa-deportiva.jpg',
  },
  {
    title: 'Ropa Casual',
    description: 'Hoodies, t-shirts, joggers y prendas urbanas importadas.',
    image: '/img/categoria-ropa-casual.jpg',
  },
  {
    title: 'Accesorios',
    description: 'Gorras, bolsos, medias y complementos de marca.',
    image: '/img/categoria-accesorios.jpg',
  },
]

export default function Categories() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Título */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text tracking-tight text-center">
          Lo que publicamos
        </h2>

        {/* Subtítulo */}
        <p className="mt-4 md:mt-5 text-base md:text-lg text-muted text-center max-w-2xl mx-auto leading-relaxed">
          Tenis, ropa y accesorios importados desde Estados Unidos. Cada publicación incluye productos disponibles de estas categorías.
        </p>

        {/* Grid de categorías */}
        <div className="mt-10 md:mt-14 grid gap-5 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <div
              key={category.title}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden"
            >
              {/* Imagen de fondo */}
              <Image
                src={category.image}
                alt={category.title}
                fill
                loading="eager"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />

              {/* Overlay gradiente */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

              {/* Contenido */}
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold text-white">
                  {category.title}
                </h3>
                <p className="mt-1 text-sm text-white/80 leading-relaxed">
                  {category.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Nota */}
        <p className="mt-10 md:mt-12 text-sm text-muted-2 text-center">
          Las referencias varían en cada publicación según disponibilidad.
        </p>
      </div>
    </section>
  )
}
