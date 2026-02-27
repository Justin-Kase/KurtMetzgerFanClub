// Footer — Client Component (for dynamic copyright year)

'use client'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer
      className="py-8 text-white"
      style={{ background: 'var(--color-primary-black)', borderTop: '1px solid rgba(255,255,255,0.1)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm m-0">
            &copy; {currentYear} Kurt Metzger Fanclub. Unofficial fan site.
          </p>

          <div className="flex items-center gap-6">
            <a
              href="https://kurtmetzgercomedy.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors text-xl"
              title="Official Website"
            >
              🌐
            </a>
            <a
              href="https://www.youtube.com/user/kurtmetzgercomedy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-red-500 transition-colors text-xl"
              title="YouTube Channel"
            >
              📺
            </a>
            <a
              href="https://twitter.com/kurtmetzger"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors text-xl"
              title="Twitter/X Profile"
            >
              𝕏
            </a>
            <a
              href="https://en.wikipedia.org/wiki/Kurt_Metzger"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors text-xl"
              title="Wikipedia Page"
            >
              📖
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
