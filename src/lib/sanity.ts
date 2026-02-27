// =====================================================
// Sanity CMS Client + Data Fetching
// =====================================================

import { createClient } from '@sanity/client'
import type { TourDate, Video, Quote, BlogPost } from './types'
import {
  fallbackTourDates,
  sampleVideos,
  sampleQuotes,
  sampleBlogPosts,
} from './data'

// ── Sanity Client ──────────────────────────────────
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'dummy-project',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
})

// Returns true only when real Sanity credentials are configured
function hasSanityConfig(): boolean {
  return (
    !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'dummy-project' &&
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'placeholder'
  )
}

// ── Data Fetching Functions ────────────────────────

export async function getTourDates(): Promise<TourDate[]> {
  if (!hasSanityConfig()) return fallbackTourDates

  try {
    const dates = await sanityClient.fetch<TourDate[]>(
      `*[_type == "tourDate"] | order(date asc) {
        _id,
        date,
        venue,
        city,
        status,
        ticketUrl,
        price,
        showTime
      }`
    )
    return dates.length ? dates : fallbackTourDates
  } catch {
    return fallbackTourDates
  }
}

export async function getVideos(category?: string): Promise<Video[]> {
  if (!hasSanityConfig()) return sampleVideos

  try {
    const filter =
      category && category !== 'all'
        ? `*[_type == "video" && category == "${category}"]`
        : `*[_type == "video"]`

    const videos = await sanityClient.fetch<Video[]>(
      `${filter} | order(_createdAt desc) {
        _id,
        "id": youtubeId,
        title,
        description,
        category,
        "thumbnail": "https://img.youtube.com/vi/" + youtubeId + "/maxresdefault.jpg"
      }`
    )
    return videos.length ? videos : sampleVideos
  } catch {
    return sampleVideos
  }
}

export async function getQuotes(): Promise<Quote[]> {
  if (!hasSanityConfig()) return sampleQuotes

  try {
    const quotes = await sanityClient.fetch<Quote[]>(
      `*[_type == "quote"] { _id, text, author }`
    )
    return quotes.length ? quotes : sampleQuotes
  } catch {
    return sampleQuotes
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!hasSanityConfig()) return sampleBlogPosts

  try {
    const posts = await sanityClient.fetch<BlogPost[]>(
      `*[_type == "blogPost"] | order(date desc) {
        _id,
        title,
        excerpt,
        date,
        readTime,
        "imageUrl": image.asset->url
      }`
    )
    return posts.length ? posts : sampleBlogPosts
  } catch {
    return sampleBlogPosts
  }
}
