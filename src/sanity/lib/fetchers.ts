import { client } from './client'
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
    return await client.fetch(activeBannersQuery)
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
    return await client.fetch(publishedTestimonialsQuery)
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return []
  }
}

export async function getFeaturedTestimonials(limit: number = 6): Promise<Testimonial[]> {
  try {
    return await client.fetch(featuredTestimonialsQuery, { limit })
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
    return await client.fetch(latestPostsQuery, { limit })
  } catch (error) {
    console.error('Error fetching latest posts:', error)
    return []
  }
}

export async function getAllPosts(): Promise<Post[]> {
  try {
    return await client.fetch(allPostsQuery)
  } catch (error) {
    console.error('Error fetching all posts:', error)
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    return await client.fetch(postBySlugQuery, { slug })
  } catch (error) {
    console.error('Error fetching post by slug:', error)
    return null
  }
}

export async function getAllPostSlugs(): Promise<PostSlug[]> {
  try {
    return await client.fetch(allPostSlugsQuery)
  } catch (error) {
    console.error('Error fetching post slugs:', error)
    return []
  }
}
