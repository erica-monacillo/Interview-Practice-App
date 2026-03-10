import { CATEGORY_META } from '../data/questions'

export function CategoryBadge({ category, size = 'md' }) {
  const meta = CATEGORY_META[category] || { accent: '#6c8eff', light: '#6c8eff1a' }
  const padding = size === 'sm' ? '3px 9px' : '4px 11px'
  const fontSize = size === 'sm' ? '11px' : '12px'

  return (
    <span
      className="badge"
      style={{
        background: meta.light,
        color:      meta.accent,
        padding,
        fontSize,
      }}
    >
      {category}
    </span>
  )
}
