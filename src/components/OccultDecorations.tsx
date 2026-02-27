// OccultDecorations — Server Component
// Fixed background pentagram, ouija, and floating symbol elements

export default function OccultDecorations() {
  return (
    <>
      {/* Large Pentagram Background (fixed, behind everything) */}
      <div className="pentagram-background">
        <img
          src="/images/baphomet-pentagram.svg"
          alt=""
          className="pentagram-large top-left"
        />
        <img
          src="/images/pentagram.svg"
          alt=""
          className="pentagram-large top-right"
        />
        <img
          src="/images/baphomet-pentagram.svg"
          alt=""
          className="pentagram-large bottom-center"
        />
      </div>

      {/* Central Dramatic Pentagram */}
      <div className="central-pentagram">
        <img
          src="/images/baphomet-pentagram.svg"
          alt=""
          className="central-pentagram-img"
        />
      </div>

      {/* Mystical Constellation — floating symbols */}
      <div className="occult-constellation" aria-hidden="true">
        <div className="mystical-symbol">☥</div>
        <div className="mystical-symbol">⚡</div>
        <div className="mystical-symbol">🔮</div>
        <div className="mystical-symbol">🌙</div>
        <div className="mystical-symbol">💀</div>
        <div className="mystical-symbol">👁</div>
      </div>
    </>
  )
}
