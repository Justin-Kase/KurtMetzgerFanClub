import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY
const CHANNEL_ID = 'UCnXoI0GGii2VbBRIIQ2bimw' // Kurt Metzger (official)

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category') || 'all'

  if (!YOUTUBE_API_KEY) {
    console.warn('YOUTUBE_API_KEY not set, returning empty results')
    return NextResponse.json({ videos: [], usingPlaceholder: true })
  }

  try {
    let searchQuery = ''
    let maxResults = 20

    // Build search query based on category
    switch (category) {
      case 'podcasts':
        // Search for podcast appearances
        searchQuery = 'Kurt Metzger podcast interview appearance'
        break
      case 'jimmy-dore':
        searchQuery = 'Kurt Metzger Jimmy Dore'
        maxResults = 20
        break
      case 'specials':
        searchQuery = 'Kurt Metzger stand up special comedy'
        break
      default:
        // For 'all', just get recent videos from the channel
        const searchUrl = new URL('https://www.googleapis.com/youtube/v3/search')
        searchUrl.searchParams.set('key', YOUTUBE_API_KEY)
        searchUrl.searchParams.set('channelId', CHANNEL_ID)
        searchUrl.searchParams.set('part', 'snippet')
        searchUrl.searchParams.set('type', 'video')
        searchUrl.searchParams.set('order', 'date')
        searchUrl.searchParams.set('maxResults', '20')

        const response = await fetch(searchUrl.toString(), {
          next: { revalidate: 3600 },
        })

        if (!response.ok) {
          throw new Error(`YouTube API error: ${response.status}`)
        }

        const data = await response.json()
        const videos = data.items.map((item: any) => ({
          _id: item.id.videoId,
          id: item.id.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url,
          category: 'all',
        }))

        return NextResponse.json({ videos, usingPlaceholder: false })
    }

    // For specific categories, do a keyword search
    const searchUrl = new URL('https://www.googleapis.com/youtube/v3/search')
    searchUrl.searchParams.set('key', YOUTUBE_API_KEY)
    searchUrl.searchParams.set('part', 'snippet')
    searchUrl.searchParams.set('q', searchQuery)
    searchUrl.searchParams.set('type', 'video')
    searchUrl.searchParams.set('order', 'relevance')
    searchUrl.searchParams.set('maxResults', maxResults.toString())

    const response = await fetch(searchUrl.toString(), {
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`)
    }

    const data = await response.json()
    const videos = data.items.map((item: any) => ({
      _id: item.id.videoId,
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url,
      category,
    }))

    return NextResponse.json({ videos, usingPlaceholder: false })
  } catch (error) {
    console.error('Error fetching YouTube videos:', error)
    return NextResponse.json({ videos: [], usingPlaceholder: true, error: String(error) })
  }
}
