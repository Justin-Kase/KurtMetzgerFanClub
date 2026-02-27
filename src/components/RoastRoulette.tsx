'use client'

import { useState } from 'react'
import Image from 'next/image'
import { roastJokes } from '@/lib/data'

const SAVAGE_LEVELS = ['TAME', 'SPICY', 'SAVAGE', 'NUCLEAR', 'APOCALYPTIC']

export default function RoastRoulette() {
  const [roastText, setRoastText]       = useState<string | null>(null)
  const [roastCount, setRoastCount]     = useState(0)
  const [isAnimating, setIsAnimating]   = useState(false)
  const [challengeActive, setChallengeActive] = useState(false)
  const [challengeCount, setChallengeCount]   = useState(0)

  function unleashDestruction() {
    setIsAnimating(true)
    setTimeout(() => {
      const joke = roastJokes[Math.floor(Math.random() * roastJokes.length)]
      setRoastText(joke)
      setRoastCount((c) => c + 1)
      setIsAnimating(false)

      if (challengeActive) {
        setChallengeCount((c) => {
          const next = c + 1
          if (next >= 5) {
            setTimeout(() => {
              alert("You survived 5 roasts! Kurt is... mildly impressed.")
              setChallengeActive(false)
              setChallengeCount(0)
            }, 500)
          }
          return next
        })
      }
    }, 150)
  }

  function startChallenge() {
    setChallengeActive(true)
    setChallengeCount(0)
    unleashDestruction()
  }

  const savageLevel = SAVAGE_LEVELS[Math.min(Math.floor(roastCount / 2), SAVAGE_LEVELS.length - 1)]
  const destructionMeter = Math.min(roastCount * 12.5, 100)

  return (
    <section className="roast-roulette py-20 relative overflow-hidden">
      {/* Fire Particles */}
      <div className="roulette-bg-effects" aria-hidden="true">
        <div className="fire-particle fire-1">🔥</div>
        <div className="fire-particle fire-2">🔥</div>
        <div className="fire-particle fire-3">🔥</div>
        <div className="fire-particle fire-4">🔥</div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-center">
          <div className="w-full max-w-4xl">
            {/* Section Header */}
            <div className="text-center mb-10">
              <h3
                className="text-4xl md:text-5xl font-bold text-accent-red mb-3 glitch-text"
                style={{ fontFamily: 'var(--font-oswald)', textTransform: 'uppercase' }}
                data-text="CHAMBER OF SAVAGE DESTRUCTION"
              >
                💀 CHAMBER OF SAVAGE DESTRUCTION
              </h3>
              <p className="text-xl text-gray-300 mb-4 italic">
                Dare you face the wrath of Metzger&apos;s most brutal takedowns?
              </p>
              <div
                className="inline-block px-6 py-2 rounded-full text-white text-sm font-bold"
                style={{ background: 'var(--color-accent-red)', fontFamily: 'var(--font-oswald)' }}
              >
                ⚠ WARNING: Savage content ahead. Proceed at your own risk.
              </div>
            </div>

            {/* Roast Chamber Box */}
            <div className="roast-chamber mystical-border mx-auto relative">
              {/* Corner Pentagrams */}
              <Image src="/images/pentagram.svg" alt="" width={40} height={40} className="pentagram-corner top-left" />
              <Image src="/images/pentagram.svg" alt="" width={40} height={40} className="pentagram-corner top-right" />
              <Image src="/images/pentagram.svg" alt="" width={40} height={40} className="pentagram-corner bottom-left" />
              <Image src="/images/pentagram.svg" alt="" width={40} height={40} className="pentagram-corner bottom-right" />

              <div className="p-8 md:p-12 rounded-2xl">
                {/* Roast Display */}
                <div className="mb-8">
                  <div
                    className="text-accent-red/30 text-6xl text-center leading-none select-none mb-2"
                    style={{ fontFamily: 'Georgia, serif' }}
                    aria-hidden="true"
                  >
                    &ldquo;
                  </div>
                  <p
                    className="roast-text text-2xl md:text-3xl font-bold font-mono text-center"
                    style={{ opacity: isAnimating ? 0 : 1 }}
                  >
                    {roastText ?? (
                      <>
                        Ready to witness comedic annihilation?
                        <br />
                        <small className="text-gray-500 text-xl font-normal">
                          Click below to unleash the beast...
                        </small>
                      </>
                    )}
                  </p>
                  <div
                    className="text-accent-red/30 text-6xl text-center leading-none select-none mt-2"
                    style={{ fontFamily: 'Georgia, serif' }}
                    aria-hidden="true"
                  >
                    &rdquo;
                  </div>
                </div>

                {/* Controls */}
                <div className="text-center">
                  <button
                    onClick={unleashDestruction}
                    className="btn-occult-danger pulse-btn px-10 py-4 text-xl mb-4"
                  >
                    🔥 UNLEASH DESTRUCTION 🔥
                  </button>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    {[
                      { value: roastCount, label: 'Roasts Delivered', color: 'text-accent-red' },
                      { value: savageLevel, label: 'Savage Level', color: 'text-occult-gold' },
                      { value: `${Math.round(destructionMeter)}%`, label: 'Destruction', color: 'text-blue-400' },
                    ].map(({ value, label, color }) => (
                      <div
                        key={label}
                        className="p-3 rounded-lg"
                        style={{ background: 'var(--color-primary-black)' }}
                      >
                        <div className={`font-bold text-xl ${color}`} style={{ fontFamily: 'var(--font-oswald)' }}>
                          {value}
                        </div>
                        <div className="text-gray-400 text-sm">{label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Challenge Mode */}
                  {!challengeActive ? (
                    <div className="mt-6">
                      <button
                        onClick={startChallenge}
                        className="btn-occult-outline-danger text-sm px-6 py-2"
                      >
                        ⚡ CHALLENGE MODE
                      </button>
                      <p className="text-gray-500 text-sm mt-2">
                        Can you handle 5 roasts in a row without crying?
                      </p>
                    </div>
                  ) : (
                    <div className="mt-6 p-3 rounded-lg border border-accent-red/50">
                      <p className="text-accent-red font-bold" style={{ fontFamily: 'var(--font-oswald)' }}>
                        CHALLENGE MODE: {challengeCount}/5 ROASTS
                      </p>
                      <div className="vote-bar mt-2">
                        <div className="vote-progress" style={{ width: `${(challengeCount / 5) * 100}%` }} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
