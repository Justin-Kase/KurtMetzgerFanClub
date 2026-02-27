// =====================================================
// Kurt Metzger Fanclub — TypeScript Type Definitions
// =====================================================

export interface TourDate {
  _id?: string
  date: string
  venue: string
  city: string
  status: 'available' | 'sold-out' | 'presale'
  ticketUrl: string
  price?: string
  showTime?: string
}

export interface Video {
  _id?: string
  id: string
  title: string
  description: string
  thumbnail?: string
  category: 'all' | 'specials' | 'jimmy-dore' | 'podcasts'
}

export interface Quote {
  _id?: string
  text: string
  author: string
}

export interface BlogPost {
  _id?: string
  title: string
  excerpt: string
  date: string
  readTime: string
  imageUrl?: string
  slug?: string
  author?: string
}

export interface Tweet {
  author: string
  content: string
  time: string
}

export interface PollOption {
  id: string
  label: string
  emoji: string
  description: string
  votes: number
  percentage: number
}

export type VideoCategory = 'all' | 'specials' | 'jimmy-dore' | 'podcasts'
