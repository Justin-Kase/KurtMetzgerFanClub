'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import type { Quote } from '@/lib/types'

interface HeroSectionProps {
  quotes: Quote[]
}

export default function HeroSection({ quotes }: HeroSectionProps) {
  const [floatingQuote, setFloatingQuote] = useState(
    "\"I don't apologize for being right...\""
  )

  useEffect(() => {
    if (!quotes.length) return
    const interval = setInterval(() => {
      const q = quotes[Math.floor(Math.random() * quotes.length)]
      setFloatingQuote(`"${q.text.slice(0, 50)}${q.text.length > 50 ? '...' : ''}"`)
    }, 5000)
    return () => clearInterval(interval)
  }, [quotes])

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function handleRandomQuote() {
    if (!quotes.length) return
    const q = quotes[Math.floor(Math.random() * quotes.length)]
    setFloatingQuote(`"${q.text}"`)
  }

  return (
    <section id="hero" className="hero-section">
      <div className="hero-overlay" aria-hidden="true" />

      {/* Ouija Board side decorations */}
      <div className="ouija-background absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <Image
          src="/images/ouija-board.svg"
          alt=""
          width={200}
          height={150}
          className="ouija-board-bg ouija-left"
        />
        <Image
          src="/images/ouija-board.svg"
          alt=""
          width={200}
          height={150}
          className="ouija-board-bg ouija-right"
        />
      </div>

      {/* Floating ambient symbols */}
      <div className="occult-background absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="floating-symbol symbol-1">⚡</div>
        <div className="floating-symbol symbol-2">🔥</div>
        <div className="floating-symbol symbol-3">⭐</div>
        <div className="floating-symbol symbol-4">💀</div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center min-h-screen py-24 gap-8">

          {/* Left — Content */}
          <div className="hero-content flex-1 text-center lg:text-left flex flex-col justify-center order-2 lg:order-1">
            <div className="mb-3">
              <span
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded text-white text-sm font-bold"
                style={{
                  background: 'var(--color-accent-red)',
                  fontFamily: 'var(--font-oswald)',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                }}
              >
                💀 UNOFFICIAL FANCLUB
              </span>
            </div>

            <h1
              className="hero-title glitch-text mb-4"
              data-text="DARK COMEDY'S BRIGHTEST FLAME"
            >
              <span className="block">DARK COMEDY&apos;S</span>
              <span className="block text-accent-red glow-text">BRIGHTEST FLAME</span>
            </h1>

            <p className="hero-subtitle mb-6">
              Welcome to the <strong>unholy sanctuary</strong> of Kurt Metzger devotion.
              <br />
              <em>Witness the unfiltered truth of comedy&apos;s most savage prophet.</em>
            </p>

            {/* Stats */}
            <div className="mb-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                {[
                  { num: '1000+', label: 'Savage Roasts' },
                  { num: '50+',   label: 'Truth Bombs'   },
                  { num: '∞',     label: 'Dark Wisdom'   },
                ].map(({ num, label }) => (
                  <div key={label}>
                    <div className="text-accent-red font-bold text-2xl" style={{ fontFamily: 'var(--font-oswald)' }}>
                      {num}
                    </div>
                    <div className="text-gray-400 text-sm">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="hero-buttons flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <a
                href="#videos"
                onClick={(e) => handleNavClick(e, '#videos')}
                className="btn-occult-danger pulse-btn text-center justify-center px-6 py-3 text-lg"
              >
                ▶ ENTER THE VOID
              </a>
              <a
                href="https://kurtmetzgercomedy.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-occult-outline text-center justify-center px-6 py-3 text-lg"
              >
                🔗 OFFICIAL SHRINE
              </a>
              <button
                onClick={handleRandomQuote}
                className="btn-occult-outline-danger text-center justify-center px-6 py-3 text-lg"
              >
                🎲 PROPHECY
              </button>
            </div>
          </div>

          {/* Right — Portrait */}
          <div className="flex-1 order-1 lg:order-2 relative flex justify-center">
            <div className="hero-image-container relative">
              {/* Symbol rings */}
              <div className="symbol-ring symbol-ring-1">🔥</div>
              <div className="symbol-ring symbol-ring-2">⚡</div>
              <div className="symbol-ring symbol-ring-3">⭐</div>

              <div className="relative">
                <Image
                  src="/images/JudgeKurt.jpeg"
                  alt="Kurt Metzger — Dark Comedy's Brightest Flame"
                  width={450}
                  height={550}
                  className="hero-portrait"
                  priority
                />
                <div
                  className="absolute inset-0 rounded-lg pointer-events-none"
                  style={{
                    background: 'linear-gradient(to bottom, transparent 60%, rgba(10,10,10,0.8))',
                  }}
                />
              </div>

              {/* Floating quote bubble */}
              <div className="floating-quote">
                {floatingQuote}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <div className="scroll-text">DESCEND INTO DARKNESS</div>
          <div className="scroll-arrow text-white/50 text-xl animate-bounce">⌄</div>
        </div>
      </div>
    </section>
  )
}
