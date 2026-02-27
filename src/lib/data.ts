// =====================================================
// Kurt Metzger Fanclub — Static / Fallback Data
// =====================================================

import type { Quote, Video, BlogPost, Tweet, PollOption, TourDate } from './types'

export const sampleQuotes: Quote[] = [
  {
    _id: '1',
    text: "I don't apologize for being right. I apologize for you being wrong.",
    author: 'Kurt Metzger',
  },
  {
    _id: '2',
    text: 'Comedy is just truth delivered with perfect timing.',
    author: 'Kurt Metzger',
  },
  {
    _id: '3',
    text: "If you're offended by my comedy, you're probably the joke.",
    author: 'Kurt Metzger',
  },
  {
    _id: '4',
    text: "I'm not controversial, reality is controversial.",
    author: 'Kurt Metzger',
  },
  {
    _id: '5',
    text: 'The best comedy comes from the darkest places.',
    author: 'Kurt Metzger',
  },
]

export const sampleVideos: Video[] = [
  {
    _id: '1',
    id: 'dQw4w9WgXcQ',
    title: "Kurt Metzger — Best of Stand-up",
    description: "A compilation of Kurt's funniest and most savage moments",
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    category: 'specials',
  },
  {
    _id: '2',
    id: 'dQw4w9WgXcQ',
    title: 'Jimmy Dore Show Appearance',
    description: "Kurt's latest appearance on The Jimmy Dore Show",
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    category: 'jimmy-dore',
  },
  {
    _id: '3',
    id: 'dQw4w9WgXcQ',
    title: 'Podcast Highlights',
    description: 'Best moments from various podcast appearances',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    category: 'podcasts',
  },
]

export const sampleBlogPosts: BlogPost[] = [
  {
    _id: '1',
    title: "The Art of the Roast: Dissecting Metzger's Style",
    excerpt:
      "An in-depth analysis of what makes Kurt's roasting technique so devastatingly effective...",
    date: 'December 10, 2024',
    readTime: '5 min read',
    slug: 'the-art-of-the-roast',
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80',
  },
  {
    _id: '2',
    title: "From Radio to Stage: Kurt's Comedy Evolution",
    excerpt:
      "Tracing the journey from radio appearances to becoming one of comedy's most uncompromising voices...",
    date: 'December 8, 2024',
    readTime: '7 min read',
    slug: 'from-radio-to-stage',
    imageUrl: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80',
  },
  {
    _id: '3',
    title: 'The Jimmy Dore Connection: Political Comedy Gold',
    excerpt:
      "How Kurt's appearances on The Jimmy Dore Show have become must-watch television...",
    date: 'December 5, 2024',
    readTime: '4 min read',
    slug: 'jimmy-dore-connection',
    imageUrl: 'https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=800&q=80',
  },
]

export const sampleTweets: Tweet[] = [
  {
    author: '@KurtMetzger',
    content:
      "Just finished another set. The audience laughed so hard, I think I broke a few ribs... theirs, not mine.",
    time: '2 hours ago',
  },
  {
    author: '@KurtMetzger',
    content:
      "People keep asking if I have a filter. Yes, I do. It's called 'make it funnier.'",
    time: '1 day ago',
  },
  {
    author: '@KurtMetzger',
    content: 'New material brewing. Warning: may contain traces of uncomfortable truths.',
    time: '3 days ago',
  },
]

export const roastJokes: string[] = [
  "Your opinion is like a broken clock — occasionally right, but mostly worthless.",
  "I've seen more intelligence in a Magic 8-Ball.",
  "You're proof that evolution can go in reverse.",
  "If stupidity was a superpower, you'd be unstoppable.",
  "You're like a human participation trophy — nobody asked for you, but here you are.",
  "I'd explain it to you, but I don't have any crayons.",
  "You're the reason warning labels exist.",
  "If brains were dynamite, you wouldn't have enough to blow your nose.",
]

export const initialPollOptions: PollOption[] = [
  {
    id: 'roast-battle',
    label: 'Epic Roast Battle Destruction',
    emoji: '🔥',
    description:
      'When Kurt obliterated his opponent so hard they reconsidered their life choices',
    votes: 1281,
    percentage: 45,
  },
  {
    id: 'jimmy-dore',
    label: 'Jimmy Dore Show Takedown',
    emoji: '📺',
    description: "That time Kurt's political commentary left everyone speechless",
    votes: 996,
    percentage: 35,
  },
  {
    id: 'podcast-rant',
    label: 'Legendary Podcast Rant',
    emoji: '🎙️',
    description: '15 minutes of pure, unfiltered truth that broke the internet',
    votes: 342,
    percentage: 12,
  },
  {
    id: 'twitter-war',
    label: 'Epic Twitter War Victory',
    emoji: '🐦',
    description:
      'When Kurt single-handedly ended multiple careers in 280 characters',
    votes: 228,
    percentage: 8,
  },
]

export const fallbackTourDates: TourDate[] = [
  { 
    date: '2026-02-27', 
    venue: "The Howlin' Wolf", 
    city: 'New Orleans, LA', 
    status: 'available', 
    ticketUrl: 'https://laughlife.standuptix.com/events/kurt-metzger', 
    price: '$25-35', 
    showTime: '8:00 PM' 
  },
  { 
    date: '2026-02-28', 
    venue: 'Club 337', 
    city: 'Lafayette, LA', 
    status: 'available', 
    ticketUrl: 'https://www.lafayettecomedy.com/events/kurt-metzger', 
    price: '$20-30', 
    showTime: '7:30 PM' 
  },
  { 
    date: '2026-03-27', 
    venue: "Soul Joel's Comedy Club", 
    city: 'Pottstown, PA', 
    status: 'available', 
    ticketUrl: 'https://souljoels.com/shop/tickets/kurtmetzger/', 
    price: '$25-30', 
    showTime: '8:00 PM' 
  },
]
