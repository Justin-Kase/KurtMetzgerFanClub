'use client'

import { useState, useEffect } from 'react'

interface Stream {
  id: string
  title: string
  thumbnail: string
  publishedAt: string
  url: string
}

export default function DerpSection() {
  const [streams, setStreams] = useState<Stream[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/youtube/streams')
      .then((res) => res.json())
      .then((data) => {
        setStreams(data.streams)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to fetch streams:', err)
        setLoading(false)
      })
  }, [])

  function formatDate(dateStr: string) {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  return (
    <section id="derp" className="py-20 relative overflow-hidden">
      {/* Occult border */}
      <div className="mystical-border absolute inset-0 pointer-events-none opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2
            className="text-4xl md:text-5xl font-bold mb-4 uppercase tracking-wider"
            style={{
              fontFamily: 'var(--font-oswald)',
              textShadow: '0 0 20px var(--color-occult-purple), 0 0 40px rgba(220, 53, 69, 0.5)',
              color: 'var(--color-accent-red)',
            }}
          >
            🤪 DERP STREAMS 🤪
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            The latest live stream shenanigans from the void
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-accent-red border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-400 mt-4">Summoning streams from the abyss...</p>
          </div>
        )}

        {/* Video Player Modal */}
        {selectedVideo && (
          <div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <div 
              className="relative w-full max-w-5xl aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute -top-12 right-0 text-white hover:text-accent-red text-2xl font-bold"
              >
                ✕ Close
              </button>
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                className="w-full h-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* Streams Grid */}
        {!loading && streams.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {streams.map((stream) => (
              <button
                key={stream.id}
                onClick={() => setSelectedVideo(stream.id)}
                className="group block bg-dark-card rounded-lg overflow-hidden border border-occult-purple/30 hover:border-accent-red/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent-red/20 text-left cursor-pointer w-full"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video bg-gray-900">
                  <img
                    src={stream.thumbnail}
                    alt={stream.title}
                    className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-accent-red/80 flex items-center justify-center">
                      <span className="text-white text-2xl">▶</span>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                    STREAM
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="text-white text-sm font-semibold mb-2 line-clamp-2 group-hover:text-accent-red transition-colors">
                    {stream.title}
                  </h3>
                  <p className="text-gray-500 text-xs">{formatDate(stream.publishedAt)}</p>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && streams.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No streams found in the void... yet.</p>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-12">
          <a
            href="https://www.youtube.com/@kurtmetzgercomedy/streams"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-accent-red text-white font-bold uppercase tracking-wider rounded hover:bg-red-600 transition-colors"
            style={{
              fontFamily: 'var(--font-oswald)',
              textShadow: '0 0 10px rgba(0,0,0,0.5)',
            }}
          >
            Watch More Streams →
          </a>
        </div>
      </div>
    </section>
  )
}
