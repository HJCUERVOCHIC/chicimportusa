import { sanityFetch } from './client'
import {
  activeBannersQuery,
  publishedTestimonialsQuery,
  featuredTestimonialsQuery,
  latestPostsQuery,
  allPostsQuery,
  postBySlugQuery,
  allPostSlugsQuery,
} from './queries'
import type { Banner, Testimonial, Post, PostSlug } from '@/types/sanity'

// ============================================
// BANNERS
// ============================================

export async function getActiveBanners(): Promise<Banner[]> {
  try {
    return await sanityFetch<Banner[]>({
      query: activeBannersQuery,
      tags: ['banners'],
      revalidate: 900, // 15 minutos
    })
  } catch (error) {
    console.error('Error fetching banners:', error)
    return []
  }
}

// ============================================
// TESTIMONIOS
// ============================================

export async function getPublishedTestimonials(): Promise<Testimonial[]> {
  try {
    return await sanityFetch<Testimonial[]>({
      query: publishedTestimonialsQuery,
      tags: ['testimonials'],
      revalidate: 1800, // 30 minutos
    })
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return []
  }
}

export async function getFeaturedTestimonials(limit: number = 6): Promise<Testimonial[]> {
  try {
    return await sanityFetch<Testimonial[]>({
      query: featuredTestimonialsQuery,
      params: { limit },
      tags: ['testimonials'],
      revalidate: 1800, // 30 minutos
    })
  } catch (error) {
    console.error('Error fetching featured testimonials:', error)
    return []
  }
}

// ============================================
// POSTS / NOTICIAS
// ============================================

export async function getLatestPosts(limit: number = 3): Promise<Post[]> {
  try {
    return await sanityFetch<Post[]>({
      query: latestPostsQuery,
      params: { limit },
      tags: ['posts'],
      revalidate: 600, // 10 minutos
    })
  } catch (error) {
    console.error('Error fetching latest posts:', error)
    return []
  }
}

export async function getAllPosts(): Promise<Post[]> {
  try {
    return await sanityFetch<Post[]>({
      query: allPostsQuery,
      tags: ['posts'],
      revalidate: 600, // 10 minutos
    })
  } catch (error) {
    console.error('Error fetching all posts:', error)
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    return await sanityFetch<Post | null>({
      query: postBySlugQuery,
      params: { slug },
      tags: ['posts', `post-${slug}`],
      revalidate: 600, // 10 minutos
    })
  } catch (error) {
    console.error('Error fetching post by slug:', error)
    return null
  }
}

export async function getAllPostSlugs(): Promise<PostSlug[]> {
  try {
    return await sanityFetch<PostSlug[]>({
      query: allPostSlugsQuery,
      tags: ['posts'],
      revalidate: 3600, // 1 hora
    })
  } catch (error) {
    console.error('Error fetching post slugs:', error)
    return []
  }
}
