'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import type { Video, VideoCategory } from '@/lib/types'

interface VideosSectionProps {
  initialVideos: Video[]
}

const categories: { value: VideoCategory | 'all'; label: string; icon: string }[] = [
  { value: 'specials',   label: 'Comedy Specials',       icon: '⭐' },
  { value: 'jimmy-dore', label: 'Jimmy Dore Show',       icon: '🎤' },
  { value: 'podcasts',   label: 'Podcast Appearances',   icon: '🎙️' },
]

interface VideoModalProps {
  videoId: string
  title: string
  onClose: () => void
}

function VideoModal({ videoId, title, onClose }: VideoModalProps) {
  return (
    <div
      className="video-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Playing: ${title}`}
    >
      <div
        className="video-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h5 className="text-white font-bold m-0" style={{ fontFamily: 'var(--font-oswald)' }}>
            {title}
          </h5>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white text-2xl leading-none bg-transparent border-0 cursor-pointer"
            aria-label="Close video"
          >
            ✕
          </button>
        </div>
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )
}

export default function VideosSection({ initialVideos }: VideosSectionProps) {
  const [activeCategory, setActiveCategory] = useState<VideoCategory | 'all'>('podcasts')
  const [playingVideo, setPlayingVideo] = useState<Video | null>(null)
  const [videos, setVideos] = useState<Video[]>(initialVideos)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Fetch videos when category changes (except for initial load)
    if (activeCategory === 'all') {
      setVideos(initialVideos)
      return
    }

    setLoading(true)
    fetch(`/api/youtube/videos?category=${activeCategory}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.videos && data.videos.length > 0) {
          setVideos(data.videos)
        } else {
          // Fallback to filtered initial videos
          setVideos(initialVideos.filter((v) => v.category === activeCategory))
        }
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to fetch videos:', err)
        // Fallback to filtered initial videos
        setVideos(initialVideos.filter((v) => v.category === activeCategory))
        setLoading(false)
      })
  }, [activeCategory, initialVideos])

  return (
    <>
      <section id="videos" className="py-20 relative" style={{ background: 'var(--color-dark-gray)' }}>
        {/* Section bg pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-5"
          style={{
            backgroundImage:
              'radial-gradient(circle at 50% 50%, var(--color-accent-red) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="section-title glitch-effect">
              <span className="text-accent-red mr-3">▶</span>
              SACRED VISIONS
            </h2>
            <p className="section-subtitle">
              Witness the prophet&apos;s finest moments of comedic destruction
            </p>
            <div className="section-divider">
              <span className="divider-symbol text-lg">⚡</span>
              <span className="divider-line" />
              <span className="divider-symbol text-lg">🔥</span>
              <span className="divider-line" />
              <span className="divider-symbol text-lg">⚡</span>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex justify-center flex-wrap gap-3 mb-10">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`category-btn ${activeCategory === cat.value ? 'active' : ''}`}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block w-12 h-12 border-4 border-accent-red border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-400 mt-4">Summoning videos from the void...</p>
            </div>
          )}

          {/* Video Grid */}
          {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videos.map((video) => (
                <div key={video._id ?? video.id} className="video-card" onClick={() => setPlayingVideo(video)}>
                  <div className="video-thumbnail">
                    {video.thumbnail ? (
                      <Image
                        src={video.thumbnail}
                        alt={video.title}
                        fill
                        className="object-cover opacity-70"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : null}
                    <div className="play-button">▶</div>
                  </div>
                  <div className="video-info">
                    <h5>{video.title}</h5>
                    <p>{video.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && videos.length === 0 && (
            <p className="text-center text-gray-400 py-12">
              No videos in this category yet. Check back soon!
            </p>
          )}

          {/* YouTube CTA */}
          <div className="text-center mt-12">
            <a
              href="https://www.youtube.com/user/kurtmetzgercomedy"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-occult-danger text-lg px-8 py-3 inline-flex"
            >
              📺 VIEW ALL ON YOUTUBE
            </a>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {playingVideo && (
        <VideoModal
          videoId={playingVideo.id}
          title={playingVideo.title}
          onClose={() => setPlayingVideo(null)}
        />
      )}
    </>
  )
}
