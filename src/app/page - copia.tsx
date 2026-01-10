import {
  Hero,
  HowItWorks,
  Rules,
  Categories,
  Testimonials,
  FinalCTA,
  BannerCarousel,
  TestimonialsDynamic,
  LatestNews,
  PublicacionesPreview,
} from '@/components/sections'
import { 
  getActiveBanners, 
  getFeaturedTestimonials, 
  getLatestPosts 
} from '@/sanity/lib/fetchers'

// ISR: Revalidar cada 15 minutos
export const revalidate = 900

export default async function HomePage() {
  // Fetch data from Sanity (en paralelo)
  const [banners, testimonials, posts] = await Promise.all([
    getActiveBanners(),
    getFeaturedTestimonials(6),
    getLatestPosts(3),
  ])

  const hasBanners = banners && banners.length > 0
  const hasTestimonials = testimonials && testimonials.length > 0
  const hasPosts = posts && posts.length > 0

  return (
    <>
      {/* Banners dinámicos (si hay) */}
      {hasBanners && <BannerCarousel banners={banners} />}
      
      {/* Hero estático (siempre) */}
      <Hero />
      
      <HowItWorks />
      <Rules />
      <Categories />
      
      {/* Preview de publicaciones con enlace a página completa */}
      <PublicacionesPreview />
      
      {/* Testimonios: usar dinámicos si hay, sino estáticos */}
      {hasTestimonials ? (
        <TestimonialsDynamic testimonials={testimonials} />
      ) : (
        <Testimonials />
      )}
      
      {/* Últimas noticias (si hay) */}
      {hasPosts && <LatestNews posts={posts} />}
      
      <FinalCTA />
    </>
  )
}
