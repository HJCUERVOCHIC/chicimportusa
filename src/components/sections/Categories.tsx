import { Card } from '@/components/ui'

const categories = [
  {
    icon: '👟',
    name: 'Tenis y calzado original',
  },
  {
    icon: '👕',
    name: 'Ropa seleccionada',
  },
  {
    icon: '🎒',
    name: 'Accesorios',
  },
  {
    icon: '✨',
    name: 'Marcas reconocidas',
  },
]

export default function Categories() {
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-text text-center">
          Qué suele salir en los drops
        </h2>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Card key={category.name} variant="base" className="text-center">
              <span className="text-3xl">{category.icon}</span>
              <p className="mt-3 font-medium text-text">{category.name}</p>
            </Card>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted-2">
          La disponibilidad depende de cada drop.
        </p>
      </div>
    </section>
  )
}
