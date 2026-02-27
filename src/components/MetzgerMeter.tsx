'use client'

import { useState } from 'react'
import Image from 'next/image'
import { initialPollOptions } from '@/lib/data'
import type { PollOption } from '@/lib/types'

export default function MetzgerMeter() {
  const [options, setOptions]       = useState<PollOption[]>(initialPollOptions)
  const [totalVotes, setTotalVotes] = useState(2847)
  const [votedId, setVotedId]       = useState<string | null>(null)

  function handleVote(optionId: string) {
    if (votedId) return // already voted

    setVotedId(optionId)

    setOptions((prev) => {
      const newVotes = prev.map((o) =>
        o.id === optionId ? { ...o, votes: o.votes + 1 } : o
      )
      const total = newVotes.reduce((s, o) => s + o.votes, 0)
      return newVotes.map((o) => ({
        ...o,
        percentage: Math.round((o.votes / total) * 100),
      }))
    })

    setTotalVotes((v) => v + 1)

    // Re-enable after 3 seconds
    setTimeout(() => setVotedId(null), 3000)
  }

  return (
    <section
      className="metzger-meter py-20 relative"
      style={{ background: 'var(--color-dark-gray)' }}
    >
      {/* Ouija Board Background */}
      <div className="ouija-polling-bg absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <Image
          src="/images/ouija-board.svg"
          alt=""
          width={150}
          height={113}
          className="ouija-poll-left"
        />
        <Image
          src="/images/ouija-board.svg"
          alt=""
          width={150}
          height={113}
          className="ouija-poll-right"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-center">
          <div className="w-full max-w-4xl">
            {/* Header */}
            <div className="text-center mb-10">
              <h2 className="section-title text-accent-red">
                <span className="mr-3">⚡</span>
                THE METZGER METER
              </h2>
              <p className="section-subtitle">
                Vote for Kurt&apos;s most savage moment and see what the cult thinks
              </p>
            </div>

            {/* Poll Card */}
            <div className="rounded-2xl p-6" style={{ background: 'var(--color-primary-black)' }}>
              <h4
                className="text-center text-accent-red mb-4 text-xl"
                style={{ fontFamily: 'var(--font-oswald)', textTransform: 'uppercase' }}
              >
                🔥 SAVAGE MOMENT OF THE MONTH
              </h4>
              <p className="text-center text-white text-lg mb-8">
                Which Kurt Metzger moment made you question everything?
              </p>

              {/* Poll Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {options.map((option) => {
                  const isVoted = votedId === option.id
                  const justVoted = isVoted

                  return (
                    <div
                      key={option.id}
                      className="p-4 rounded-lg border transition-colors duration-300"
                      style={{
                        background: 'var(--color-light-gray)',
                        borderColor: justVoted ? 'var(--color-accent-red)' : 'rgba(255,255,255,0.1)',
                      }}
                    >
                      <h5
                        className="text-accent-red mb-2"
                        style={{ fontFamily: 'var(--font-oswald)', textTransform: 'uppercase' }}
                      >
                        {option.emoji} {option.label}
                      </h5>
                      <p className="text-gray-400 text-sm mb-3">{option.description}</p>

                      {/* Progress Bar */}
                      <div className="vote-bar mb-2">
                        <div
                          className="vote-progress"
                          style={{ width: `${option.percentage}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <span
                          className="text-accent-red font-bold"
                          style={{ fontFamily: 'var(--font-oswald)' }}
                        >
                          {option.percentage}%
                        </span>
                        <button
                          onClick={() => handleVote(option.id)}
                          disabled={!!votedId}
                          className={`text-sm px-4 py-1.5 rounded font-bold transition-all duration-300 ${
                            justVoted
                              ? 'bg-green-600 text-white border-0 cursor-default'
                              : votedId
                              ? 'opacity-50 cursor-not-allowed btn-occult-outline-danger'
                              : 'btn-occult-outline-danger'
                          }`}
                          style={{ fontFamily: 'var(--font-oswald)', letterSpacing: '1px' }}
                        >
                          {justVoted ? '✓ VOTED!' : 'VOTE'}
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Poll Stats */}
              <div className="grid grid-cols-3 gap-6 mt-8 text-center">
                {[
                  { value: totalVotes.toLocaleString(), label: 'Total Votes', color: 'text-accent-red' },
                  { value: 'NUCLEAR',                   label: 'Current Savage Level', color: 'text-occult-gold' },
                  { value: '∞',                         label: 'Minds Blown', color: 'text-blue-400' },
                ].map(({ value, label, color }) => (
                  <div key={label}>
                    <div
                      className={`${color} text-3xl font-bold`}
                      style={{ fontFamily: 'var(--font-oswald)' }}
                    >
                      {value}
                    </div>
                    <div className="text-gray-400 text-sm mt-1">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
