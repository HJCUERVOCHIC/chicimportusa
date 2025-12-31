import Image from 'next/image'

const categories = [
  {
    title: 'Tenis deportivos',
    description: 'Referencias diseñadas para entrenamiento, actividad física y comodidad en movimiento.',
    image: '/img/categoria-deportivos.jpg',
  },
  {
    title: 'Tenis casuales',
    description: 'Modelos versátiles para el día a día, combinando diseño y confort.',
    image: '/img/categoria-casuales.jpg',
  },
  {
    title: 'Ediciones seleccionadas',
    description: 'Publicaciones especiales con referencias destacadas según disponibilidad.',
    image: '/img/categoria-ediciones.jpg',
  },
]

export default function Categories() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Título */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text tracking-tight text-center">
          Tenis deportivos y casuales que solemos publicar
        </h2>

        {/* Texto introductorio */}
        <p className="mt-5 md:mt-6 text-base md:text-lg text-muted text-center max-w-2xl mx-auto leading-relaxed">
          En nuestras publicaciones encontrarás una selección cuidada de tenis pensados para el uso diario, el deporte y el estilo casual.
        </p>

        {/* Grid de categorías */}
        <div className="mt-12 md:mt-16 grid gap-6 md:gap-8 md:grid-cols-3">
          {categories.map((category) => (
            <article 
              key={category.title}
              className="group"
            >
              {/* Imagen */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#F5F5F5]">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Contenido */}
              <div className="mt-5">
                <h3 className="text-lg md:text-xl font-semibold text-text">
                  {category.title}
                </h3>
                <p className="mt-2 text-sm md:text-base text-muted leading-relaxed">
                  {category.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
