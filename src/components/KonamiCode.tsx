'use client'

import { useEffect, useState } from 'react'

const KONAMI = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA',
]

export default function KonamiCode() {
  const [active, setActive]     = useState(false)
  const [sequence, setSequence] = useState<string[]>([])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      setSequence((prev) => {
        const next = [...prev, e.code].slice(-KONAMI.length)
        if (next.length === KONAMI.length && next.every((k, i) => k === KONAMI[i])) {
          setActive(true)
          return []
        }
        return next
      })
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  function handleClose() {
    setActive(false)
    document.body.classList.remove('konami-active')
  }

  useEffect(() => {
    if (active) {
      document.body.classList.add('konami-active')
      console.log('🎊 Easter egg activated! 🎊')
    } else {
      document.body.classList.remove('konami-active')
    }
  }, [active])

  if (!active) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.85)' }}
      onClick={handleClose}
    >
      <div
        className="rounded-2xl p-10 text-center max-w-md mx-4 relative"
        style={{
          background: 'var(--color-dark-gray)',
          border: '2px solid var(--color-accent-red)',
          boxShadow: '0 0 40px rgba(220,53,69,0.5)',
          animation: 'rainbow 2s infinite',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-5xl mb-4">🎉</div>
        <h3
          className="text-accent-red text-2xl font-bold mb-3"
          style={{ fontFamily: 'var(--font-oswald)', textTransform: 'uppercase' }}
        >
          EASTER EGG ACTIVATED!
        </h3>
        <h4 className="text-white text-xl mb-4" style={{ fontFamily: 'var(--font-oswald)' }}>
          Congratulations!
        </h4>
        <p className="text-gray-300 mb-2">You found the secret Konami Code!</p>
        <p className="text-gray-400 italic mb-6">
          <strong className="text-white">Kurt says:</strong>{' '}
          &ldquo;If you&apos;re geeky enough to know the Konami Code, you&apos;re alright by me.&rdquo;
        </p>
        <button
          onClick={handleClose}
          className="btn-occult-danger px-8 py-3 text-lg"
        >
          Awesome!
        </button>
      </div>
    </div>
  )
}
