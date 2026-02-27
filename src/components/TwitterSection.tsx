// TwitterSection — Server Component (static mock tweets; extend with API if needed)

import type { Tweet } from '@/lib/types'

interface TwitterSectionProps {
  tweets: Tweet[]
}

export default function TwitterSection({ tweets }: TwitterSectionProps) {
  return (
    <section className="py-20" style={{ background: 'var(--color-dark-gray)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-title">
            <span className="text-blue-400 mr-3">𝕏</span>
            LATEST TWEETS
          </h2>
        </div>

        <div className="max-w-2xl mx-auto space-y-4">
          {tweets.map((tweet, i) => (
            <div key={i} className="tweet">
              <div className="tweet-author">{tweet.author}</div>
              <div className="tweet-content">{tweet.content}</div>
              <div className="tweet-time">{tweet.time}</div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="https://twitter.com/kurtmetzger"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-occult-outline text-sm px-6 py-2 inline-flex items-center gap-2"
            style={{ borderColor: '#1da1f2', color: '#1da1f2' }}
          >
            𝕏 FOLLOW @KURTMETZGER
          </a>
        </div>
      </div>
    </section>
  )
}
