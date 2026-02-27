'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const navLinks = [
  { href: '#hero',       icon: '🏠', label: 'SANCTUM'    },
  { href: '#tours',      icon: '📅', label: 'TOUR DATES' },
  { href: '#blog',       icon: '📜', label: 'PRESS'      },
  { href: '#derp',       icon: '🤪', label: 'DERP'       },
  { href: '#newsletter', icon: '✉',  label: 'JOIN CULT'  },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled]   = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setMenuOpen(false)
  }

  return (
    <nav
      className="occult-nav fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled
          ? 'rgba(26, 26, 26, 0.98)'
          : 'rgba(26, 26, 26, 0.95)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-2 text-accent-red no-underline"
            style={{
              fontFamily: 'var(--font-oswald)',
              fontSize: '1.5rem',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              textShadow: '0 0 10px var(--color-occult-purple)',
            }}
          >
            <div className="relative w-7 h-7">
              <Image
                src="/images/baphomet-pentagram.svg"
                alt=""
                fill
                className="pentagram-nav-icon object-contain"
              />
              <span className="absolute inset-0 flex items-center justify-center text-accent-red text-xs">
                🔥
              </span>
            </div>
            METZGER FANCLUB
          </a>

          {/* Desktop Nav Links */}
          <ul className="hidden lg:flex items-center gap-6 list-none m-0 p-0">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="nav-link-occult flex items-center gap-1 py-2"
                >
                  <span className="text-sm">{link.icon}</span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2 cursor-pointer bg-transparent border-0"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <span
              className="block w-6 h-0.5 bg-white transition-all duration-300"
              style={{ transform: menuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none' }}
            />
            <span
              className="block w-6 h-0.5 bg-white transition-all duration-300"
              style={{ opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="block w-6 h-0.5 bg-white transition-all duration-300"
              style={{ transform: menuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none' }}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden border-t border-occult-purple/30 py-4">
            <ul className="list-none m-0 p-0 flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="nav-link-occult flex items-center gap-2 px-4 py-2 rounded hover:bg-white/5"
                  >
                    <span>{link.icon}</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  )
}
