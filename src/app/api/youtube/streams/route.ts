import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY
const CHANNEL_ID = 'UCnXoI0GGii2VbBRIIQ2bimw' // Kurt Metzger (official)

export async function GET() {
  if (!YOUTUBE_API_KEY) {
    console.warn('YOUTUBE_API_KEY not set, returning placeholder data')
    // Return placeholder data if API key not configured
    const placeholderStreams = Array.from({ length: 10 }, (_, i) => ({
      id: `stream-${i}`,
      title: `Live Stream #${10 - i} - Kurt Metzger Comedy`,
      thumbnail: '/images/video-placeholder.jpg',
      publishedAt: new Date(Date.now() - i * 7 * 24 * 60 * 60 * 1000).toISOString(),
      url: `https://www.youtube.com/@kurtmetzgercomedy/streams`,
    }))
    
    return NextResponse.json({ streams: placeholderStreams, usingPlaceholder: true })
  }

  try {
    // Fetch recent videos/streams from YouTube
    const searchUrl = new URL('https://www.googleapis.com/youtube/v3/search')
    searchUrl.searchParams.set('key', YOUTUBE_API_KEY)
    searchUrl.searchParams.set('channelId', CHANNEL_ID)
    searchUrl.searchParams.set('part', 'snippet')
    searchUrl.searchParams.set('type', 'video')
    searchUrl.searchParams.set('order', 'date')
    searchUrl.searchParams.set('maxResults', '10')

    const response = await fetch(searchUrl.toString(), {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`)
    }

    const data = await response.json()

    const streams = data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url,
      publishedAt: item.snippet.publishedAt,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    }))

    return NextResponse.json({ streams, usingPlaceholder: false })
  } catch (error) {
    console.error('Error fetching YouTube streams:', error)
    
    // Fallback to placeholder on error
    const placeholderStreams = Array.from({ length: 10 }, (_, i) => ({
      id: `stream-${i}`,
      title: `Live Stream #${10 - i} - Kurt Metzger Comedy`,
      thumbnail: '/images/video-placeholder.jpg',
      publishedAt: new Date(Date.now() - i * 7 * 24 * 60 * 60 * 1000).toISOString(),
      url: `https://www.youtube.com/@kurtmetzgercomedy/streams`,
    }))
    
    return NextResponse.json({ streams: placeholderStreams, usingPlaceholder: true, error: String(error) })
  }
}
