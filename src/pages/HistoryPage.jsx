import { useState } from 'react'
import { CATEGORIES } from '../data/questions'
import { CategoryBadge } from '../components/CategoryBadge'
import { Icons } from '../components/Icons'
import { CONF_LABELS, CONF_COLORS } from '../components/StarRating'

function MiniStars({ value }) {
  return (
    <div className="mini-stars">
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          className="mini-star"
          style={{ color: n <= value ? CONF_COLORS[value] : '#2a2e40' }}
        >
          ★
        </span>
      ))}
    </div>
  )
}

export function HistoryPage({ answers, onDelete }) {
  const [category, setCategory] = useState('All')
  const [sortBy,   setSortBy]   = useState('newest')
  const [search,   setSearch]   = useState('')
  const [deleting, setDeleting] = useState(null)

  let filtered = category === 'All'
    ? answers
    : answers.filter((a) => a.category === category)

  if (search.trim()) {
    const q = search.toLowerCase()
    filtered = filtered.filter(
      (a) =>
        a.question.toLowerCase().includes(q) ||
        a.answer.toLowerCase().includes(q)
    )
  }

  if (sortBy === 'newest')     filtered = [...filtered].sort((a, b) => (b.created_at ?? b.timestamp).localeCompare(a.created_at ?? a.timestamp))
  if (sortBy === 'oldest')     filtered = [...filtered].sort((a, b) => (a.created_at ?? a.timestamp).localeCompare(b.created_at ?? b.timestamp))
  if (sortBy === 'confidence') filtered = [...filtered].sort((a, b) => b.confidence - a.confidence)

  const handleDelete = async (id) => {
    setDeleting(id)
    await onDelete(id)
    setDeleting(null)
  }

  const formatTime = (s) => {
    if (!s) return null
    const m = Math.floor(s / 60)
    const sec = s % 60
    return m > 0 ? `${m}m ${sec}s` : `${sec}s`
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Answer History</h1>
        <p className="page-subtitle">{answers.length} saved answers across all categories</p>
      </div>

      {/* Controls */}
      <div className="history-controls">
        <div style={{ position: 'relative', flex: '1 1 220px' }}>
          <Icons.Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)', pointerEvents: 'none' }} />
          <input
            className="input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions or answers…"
            style={{ paddingLeft: 36 }}
          />
        </div>
        <select
          className="select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{ flex: '0 0 auto', width: 'auto' }}
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="confidence">By confidence</option>
        </select>
      </div>

      {/* Category pills */}
      <div className="history-pills">
        {CATEGORIES.map((cat) => {
          const count = cat === 'All'
            ? answers.length
            : answers.filter((a) => a.category === cat).length
          return (
            <button
              key={cat}
              type="button"
              className={`pill ${category === cat ? 'active' : ''}`}
              onClick={() => setCategory(cat)}
            >
              {cat} ({count})
            </button>
          )
        })}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="icon">📝</div>
          <h3>{answers.length === 0 ? 'No answers yet' : 'No results found'}</h3>
          <p>
            {answers.length === 0
              ? 'Head to the Practice page to answer your first question!'
              : 'Try adjusting your search term or category filter.'}
          </p>
        </div>
      ) : (
        <div className="history-list">
          {filtered.map((a) => (
            <div key={a.id} className="history-card">
              <div className="hc-header">
                <p className="hc-question">{a.question}</p>
                <div className="hc-meta">
                  <CategoryBadge category={a.category} size="sm" />
                  <button
                    className="btn btn-danger btn-icon"
                    onClick={() => handleDelete(a.id)}
                    disabled={deleting === a.id}
                    title="Delete this answer"
                  >
                    {deleting === a.id
                      ? <span className="spinner" style={{ width: 13, height: 13, borderWidth: 2 }} />
                      : <Icons.Trash size={14} />
                    }
                  </button>
                </div>
              </div>

              <div className="hc-answer">{a.answer}</div>

              <div className="hc-footer">
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <MiniStars value={a.confidence} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: CONF_COLORS[a.confidence] }}>
                    {CONF_LABELS[a.confidence]}
                  </span>
                  {formatTime(a.elapsed) && (
                    <span style={{ fontSize: 12, color: 'var(--muted)' }}>
                      ⏱ {formatTime(a.elapsed)}
                    </span>
                  )}
                </div>
                <div className="hc-date">
                  {new Date(a.created_at ?? a.timestamp).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
