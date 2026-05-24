import { QUESTIONS, CATEGORIES, CATEGORY_META } from '../data/questions'
import { CONF_COLORS } from '../components/StarRating'

export function HomePage({ answers, onNavigate }) {
  const total   = answers.length
  const avg     = total
    ? (answers.reduce((s, a) => s + a.confidence, 0) / total).toFixed(1)
    : '—'
  const highConf = answers.filter((a) => a.confidence >= 4).length

  return (
    <div className="dashboard-grid">
      <div className="dash-left fade-up">
        {/* ── Welcome Banner ── */}
        <div className="welcome-banner">
          <h1 className="home-headline">Welcome back!</h1>
          <p className="home-desc">
            Practice with real-world questions, track your answers, rate your confidence,
            and watch your progress grow.
          </p>
          
          <div style={{ marginTop: 24, marginBottom: 24, padding: 16, background: 'var(--bg)', borderRadius: 8, border: '1px solid var(--border)', maxWidth: 400 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 8 }}>
              <span style={{ color: 'var(--muted)' }}>Question Bank Completion</span>
              <span style={{ fontWeight: 600 }}>{new Set(answers.map(a => a.question)).size} / {QUESTIONS.length} ({Math.round((new Set(answers.map(a => a.question)).size / QUESTIONS.length) * 100) || 0}%)</span>
            </div>
            <div className="bar-track">
              <div className="bar-fill" style={{ width: `${Math.round((new Set(answers.map(a => a.question)).size / QUESTIONS.length) * 100) || 0}%` }}></div>
            </div>
          </div>
          <div className="home-cta">
            <button
              className="btn btn-primary btn-lg"
              onClick={() => onNavigate('practice')}
            >
              Start Practicing →
            </button>
            <button
              className="btn btn-danger btn-lg"
              onClick={() => onNavigate('practice', 'WeakAreas')}
              title="Practice questions you rated 3 stars or lower"
            >
              Review Weak Areas
            </button>
            <button
              className="btn btn-secondary btn-lg"
              onClick={() => onNavigate('stats')}
            >
              View Progress
            </button>
          </div>
        </div>

        {/* ── KPI Bento ── */}
        <div className="bento-kpis fade-up-1">
          {[
            { num: total,             label: 'Questions',       icon: '📝' },
            { num: avg,               label: 'Avg Confidence',  icon: '⭐' },
            { num: QUESTIONS.length,  label: 'Total Qs',        icon: '📚' },
            { num: highConf,          label: 'High Conf',       icon: '🚀' },
          ].map((k) => (
            <div key={k.label} className="bento-kpi-card">
              <div className="bk-icon">{k.icon}</div>
              <div className="bk-num">{k.num}</div>
              <div className="bk-label">{k.label}</div>
            </div>
          ))}
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
                  <div className="cat-icon">
                    {meta.emoji}
                  </div>
                  <div className="cat-name">{cat}</div>
                  <div className="cat-count">{count} questions</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="dash-right fade-up-3">
        {/* ── Recent activity ── */}
        <h2 className="section-heading">Recent Activity</h2>
        {answers.length > 0 ? (
          <div className="activity-list">
            {answers.slice(0, 8).map((a) => {
              const meta = CATEGORY_META[a.category]
              return (
                <div key={a.id} className="activity-item">
                  <div className="act-dot" />
                  <div className="act-body">
                    <div className="act-q">{a.question}</div>
                    <div className="act-cat">{a.category}</div>
                  </div>
                  <div className="act-stars">
                    {'★'.repeat(a.confidence)}{'☆'.repeat(5 - a.confidence)}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="card" style={{ padding: '32px 24px', textAlign: 'center' }}>
            <p style={{ color: 'var(--muted)', fontSize: 14 }}>No recent activity. Start practicing to see history here.</p>
          </div>
        )}
      </div>
    </div>
  )
}
