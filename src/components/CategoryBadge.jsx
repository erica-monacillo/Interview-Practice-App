import { CATEGORY_META } from '../data/questions'

export function CategoryBadge({ category, size = 'md' }) {
  const padding = size === 'sm' ? '3px 9px' : '4px 11px'
  const fontSize = size === 'sm' ? '11px' : '12px'

  return (
    <span
      className="badge"
      style={{
        padding,
        fontSize,
      }}
    >
      {category}
    </span>
  )
}
