import { useState } from 'react'
import { Icons } from './Icons'

const CONF_LABELS = ['', 'Shaky', 'Getting there', 'Decent', 'Confident', 'Nailed it!']
const CONF_COLORS = ['', '#ff6b6b', '#ffb347', '#ffd166', '#4cdf8a', '#6c8eff']

export function StarRating({ value, onChange }) {
  const [hover, setHover] = useState(0)

  return (
    <div style={{ marginTop: 22 }}>
      <label className="label">Confidence Level</label>
      <div className="star-row">
        {[1, 2, 3, 4, 5].map((n) => {
          const isLit      = n <= value
          const isHoverLit = n <= hover && n > value
          return (
            <button
              key={n}
              type="button"
              className={`star-btn ${isLit ? 'lit' : ''} ${isHoverLit ? 'hover-lit' : ''}`}
              onClick={() => onChange(n)}
              onMouseEnter={() => setHover(n)}
              onMouseLeave={() => setHover(0)}
              aria-label={`Rate ${n} star${n > 1 ? 's' : ''}`}
              style={{ color: isLit ? CONF_COLORS[value] : undefined }}
            >
              <Icons.Star size={24} filled={isLit || isHoverLit} />
            </button>
          )
        })}
      </div>
      <p className="conf-hint">
        {value
          ? `${CONF_LABELS[value]} (${value}/5)`
          : 'Tap a star to rate your confidence'}
      </p>
    </div>
  )
}

// Re-export constants so other components can use them
export { CONF_LABELS, CONF_COLORS }
