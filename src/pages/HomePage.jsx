import { QUESTIONS, CATEGORIES, CATEGORY_META } from '../data/questions'
import { CONF_COLORS, CONF_LABELS } from '../components/StarRating'

export function HomePage({ answers, onNavigate }) {
  const total   = answers.length
  const avg     = total
    ? (answers.reduce((s, a) => s + a.confidence, 0) / total).toFixed(1)
    : '—'
  const highConf = answers.filter((a) => a.confidence >= 4).length

  // Most practiced category
  const catMap = {}
  answers.forEach((a) => { catMap[a.category] = (catMap[a.category] || 0) + 1 })
  const topCat = Object.entries(catMap).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '—'

  return (
    <div>
      {/* ── Hero ── */}
      <div className="home-hero fade-up">
        <div>
          <h1 className="home-headline">
            Ace Your Next<br />
            <span className="grad">Tech Interview</span>
          </h1>
          <p className="home-desc">
            Practice with real-world questions, track your answers, rate your confidence,
            and watch your progress grow — one question at a time.
          </p>
          <div className="home-cta">
            <button
              className="btn btn-primary btn-lg"
              onClick={() => onNavigate('practice')}
            >
              Start Practicing →
            </button>
            <button
              className="btn btn-secondary btn-lg"
              onClick={() => onNavigate('stats')}
            >
              View Progress
            </button>
          </div>
        </div>

        {/* KPI grid */}
        <div className="kpi-grid fade-up-1">
          {[
            { num: total,             label: 'Questions Answered' },
            { num: avg,               label: 'Avg Confidence' },
            { num: QUESTIONS.length,  label: 'Total Questions' },
            { num: highConf,          label: 'High Confidence (4-5★)' },
          ].map((k) => (
            <div key={k.label} className="kpi-card">
              <div className="kpi-num">{k.num}</div>
              <div className="kpi-label">{k.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Category Cards ── */}
      <div className="fade-up-2">
        <h2 className="section-heading">Browse by Category</h2>
        <div className="cat-grid">
          {CATEGORIES.filter((c) => c !== 'All').map((cat) => {
            const meta  = CATEGORY_META[cat]
            const count = QUESTIONS.filter((q) => q.category === cat).length
            return (
              <div
                key={cat}
                className="cat-card"
                onClick={() => onNavigate('practice', cat)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && onNavigate('practice', cat)}
              >
                <div
                  className="cat-icon"
                  style={{ background: meta.light }}
                >
                  {meta.emoji}
                </div>
                <div className="cat-name" style={{ color: meta.accent }}>{cat}</div>
                <div className="cat-count">{count} questions</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Recent activity ── */}
      {answers.length > 0 && (
        <div style={{ marginTop: 36 }} className="fade-up-3">
          <h2 className="section-heading">Recent Activity</h2>
          <div className="activity-list">
            {answers.slice(0, 6).map((a) => {
              const meta = CATEGORY_META[a.category]
              return (
                <div key={a.id} className="activity-item">
                  <div className="act-dot" style={{ background: meta?.accent ?? '#6c8eff' }} />
                  <div className="act-body">
                    <div className="act-q">{a.question}</div>
                    <div className="act-cat">{a.category}</div>
                  </div>
                  <div className="act-stars" style={{ color: CONF_COLORS[a.confidence] }}>
                    {'★'.repeat(a.confidence)}{'☆'.repeat(5 - a.confidence)}
                  </div>
                  <div className="act-date">
                    {new Date(a.created_at ?? a.timestamp).toLocaleDateString()}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
