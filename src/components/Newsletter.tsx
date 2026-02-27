'use client'

import { useState, FormEvent } from 'react'
import Image from 'next/image'

export default function Newsletter() {
  const [email, setEmail]       = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError]       = useState('')

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.')
      return
    }
    setError('')
    // In production: call your newsletter API here
    console.log(`Subscribing ${email} to newsletter`)
    setSubmitted(true)
    setEmail('')
  }

  return (
    <section
      id="newsletter"
      className="newsletter-section py-20 relative overflow-hidden"
    >
      {/* Background Stars */}
      <div className="cult-background absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="pentagram-symbol pentagram-symbol-1">⭐</div>
        <div className="pentagram-symbol pentagram-symbol-2">⭐</div>
        <div className="pentagram-symbol pentagram-symbol-3">⭐</div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            <div className="cult-recruitment mystical-border p-10 text-center relative">
              {/* Pentagram Ritual Circle */}
              <div className="pentagram-ritual-circle" aria-hidden="true">
                <Image
                  src="/images/baphomet-pentagram.svg"
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>

              <div className="relative z-10">
                {/* Header */}
                <h2
                  className="text-4xl md:text-5xl font-bold text-accent-red mb-3 glitch-text"
                  style={{ fontFamily: 'var(--font-oswald)', textTransform: 'uppercase' }}
                  data-text="JOIN THE UNHOLY ALLIANCE"
                >
                  💀 JOIN THE UNHOLY ALLIANCE
                </h2>
                <div
                  className="inline-block px-6 py-2 rounded-full text-white text-sm font-bold mb-6"
                  style={{ background: 'var(--color-accent-red)', fontFamily: 'var(--font-oswald)' }}
                >
                  🔥 EXCLUSIVE CULT MEMBER BENEFITS
                </div>

                {/* Benefits */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {[
                    {
                      icon: '⚡',
                      title: 'Exclusive Roasts',
                      desc: 'First access to unreleased savage content',
                    },
                    {
                      icon: '📅',
                      title: 'VIP Tour Alerts',
                      desc: 'Early bird tickets to witness the destruction live',
                    },
                    {
                      icon: '👑',
                      title: 'Inner Circle',
                      desc: 'Behind-the-scenes content from the dark lord himself',
                    },
                  ].map(({ icon, title, desc }) => (
                    <div key={title}>
                      <div className="text-accent-red text-3xl mb-2">{icon}</div>
                      <h5
                        className="text-white font-bold mb-1"
                        style={{ fontFamily: 'var(--font-oswald)', textTransform: 'uppercase' }}
                      >
                        {title}
                      </h5>
                      <p className="text-gray-400 text-sm">{desc}</p>
                    </div>
                  ))}
                </div>

                {/* Form */}
                {submitted ? (
                  <div className="py-4">
                    <div className="text-3xl mb-2">🎉</div>
                    <h4
                      className="text-accent-red text-xl font-bold"
                      style={{ fontFamily: 'var(--font-oswald)' }}
                    >
                      RITUAL COMPLETE!
                    </h4>
                    <p className="text-gray-300 mt-2">
                      Your soul now belongs to the Church of Metzger. Welcome, cultist.
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="text-accent-red font-bold mb-2">
                      Ready to pledge your eternal comedic soul?
                    </p>
                    <p className="text-gray-400 italic mb-4">
                      Enter your email to complete the unholy ritual...
                    </p>
                    <form onSubmit={handleSubmit} noValidate>
                      <div className="flex gap-0 mb-3">
                        <div
                          className="flex items-center px-3 border border-accent-red border-r-0 rounded-l-lg"
                          style={{ background: 'var(--color-dark-gray)' }}
                        >
                          <span className="text-accent-red">✉</span>
                        </div>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="sacrifice.your.email@here.com"
                          required
                          className="newsletter-input flex-1"
                          style={{ borderRadius: 0 }}
                          aria-label="Email address"
                        />
                        <button
                          type="submit"
                          className="btn-occult-danger rounded-none rounded-r-lg px-6"
                        >
                          🔥 COMPLETE RITUAL
                        </button>
                      </div>
                      {error && (
                        <p className="text-accent-red text-sm">{error}</p>
                      )}
                    </form>
                  </>
                )}

                {/* Disclaimer */}
                <div className="text-gray-500 text-xs mt-4">
                  ℹ By subscribing, you pledge eternal loyalty to the Church of Metzger.
                  Your soul belongs to comedy now. No refunds. No escape.
                </div>

                {/* Member Count */}
                <div
                  className="inline-block mt-4 px-4 py-2 rounded-lg"
                  style={{ background: 'var(--color-primary-black)' }}
                >
                  <span className="text-accent-red font-bold text-2xl" style={{ fontFamily: 'var(--font-oswald)' }}>
                    1,337
                  </span>{' '}
                  <span className="text-gray-400">devoted cultists have joined</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
