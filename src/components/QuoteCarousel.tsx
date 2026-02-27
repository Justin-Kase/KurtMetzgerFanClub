'use client'

import { useState, useEffect, useCallback } from 'react'
import type { Quote } from '@/lib/types'

interface QuoteCarouselProps {
  quotes: Quote[]
}

export default function QuoteCarousel({ quotes }: QuoteCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible]       = useState(true)

  const goTo = useCallback(
    (index: number) => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentIndex((index + quotes.length) % quotes.length)
        setIsVisible(true)
      }, 300)
    },
    [quotes.length]
  )

  // Auto-advance every 6 seconds
  useEffect(() => {
    if (quotes.length <= 1) return
    const timer = setInterval(() => goTo(currentIndex + 1), 6000)
    return () => clearInterval(timer)
  }, [currentIndex, goTo, quotes.length])

  if (!quotes.length) return null

  const quote = quotes[currentIndex]

  return (
    <section id="quotes" className="py-20" style={{ background: 'var(--color-primary-black)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="section-title">
            <span className="text-accent-red mr-3">❝</span>
            METZGER WISDOM
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="quote-carousel-container">
            {/* Large decorative quote marks */}
            <div
              className="text-accent-red/20 text-8xl absolute top-2 left-6 leading-none select-none"
              style={{ fontFamily: 'Georgia, serif' }}
              aria-hidden="true"
            >
              &ldquo;
            </div>
            <div
              className="text-accent-red/20 text-8xl absolute bottom-2 right-6 leading-none select-none"
              style={{ fontFamily: 'Georgia, serif' }}
              aria-hidden="true"
            >
              &rdquo;
            </div>

            <div
              className="px-8 py-4 transition-opacity duration-300"
              style={{ opacity: isVisible ? 1 : 0 }}
            >
              <p className="quote-text">
                &ldquo;{quote.text}&rdquo;
              </p>
              <p className="quote-author">— {quote.author}</p>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-center gap-6 mt-6">
              <button
                onClick={() => goTo(currentIndex - 1)}
                className="btn-occult-outline-danger px-4 py-2 text-sm"
                aria-label="Previous quote"
              >
                ← PREV
              </button>

              {/* Dot indicators */}
              <div className="flex gap-2">
                {quotes.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Go to quote ${i + 1}`}
                    className="w-2.5 h-2.5 rounded-full border-0 cursor-pointer transition-all duration-300"
                    style={{
                      background: i === currentIndex ? 'var(--color-accent-red)' : 'rgba(255,255,255,0.3)',
                    }}
                  />
                ))}
              </div>

              <button
                onClick={() => goTo(currentIndex + 1)}
                className="btn-occult-outline-danger px-4 py-2 text-sm"
                aria-label="Next quote"
              >
                NEXT →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
