import { CATEGORIES } from '../data/questions'

export function CategoryFilter({ value, onChange, counts = {} }) {
  return (
    <div className="panel-card">
      <div className="panel-title">Category Filter</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`pill ${value === cat ? 'active' : ''}`}
            onClick={() => onChange(cat)}
          >
            {cat}
            {counts[cat] !== undefined && (
              <span style={{ marginLeft: 4, opacity: 0.7 }}>({counts[cat]})</span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
