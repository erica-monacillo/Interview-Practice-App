import { CATEGORIES, CATEGORY_META } from '../data/questions'
import { CONF_LABELS, CONF_COLORS } from '../components/StarRating'
import { CategoryBadge } from '../components/CategoryBadge'

const TILE_COLORS = ['#6c8eff', '#4cdf8a', '#ffd166', '#ff6b6b', '#e06fff', '#47e0e0']

function BarChart({ title, rows, max }) {
  return (
    <div className="chart-card">
      <h3 className="chart-title">{title}</h3>
      <div className="bar-list">
        {rows.map(({ label, value, color }, i) => (
          <div key={label} className="bar-row">
            <div className="bar-lbl" title={label}>{label}</div>
            <div className="bar-track">
              <div
                className="bar-fill"
                style={{
                  width:      `${Math.max((value / max) * 100, value > 0 ? 4 : 0)}%`,
                  background: color ?? TILE_COLORS[i % TILE_COLORS.length],
                }}
              />
            </div>
            <div className="bar-val">{typeof value === 'number' && !Number.isInteger(value) ? value.toFixed(1) : value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function StatsPage({ answers }) {
  const total = answers.length

  if (total === 0) {
    return (
      <div>
        <div className="page-header">
          <h1 className="page-title">Progress Stats</h1>
          <p className="page-subtitle">Your interview readiness at a glance</p>
        </div>
        <div className="empty-state">
          <div className="icon">📊</div>
          <h3>No data yet</h3>
          <p>Answer some questions in the Practice section to start seeing your stats here!</p>
        </div>
      </div>
    )
  }

  const avg = answers.reduce((s, a) => s + a.confidence, 0) / total

  // Per-category counts + avg confidence
  const cats = CATEGORIES.filter((c) => c !== 'All')
  const catData = cats.map((cat) => {
    const subset = answers.filter((a) => a.category === cat)
    const catAvg = subset.length
      ? subset.reduce((s, a) => s + a.confidence, 0) / subset.length
      : 0
    return { cat, count: subset.length, avg: catAvg }
  })

  const maxCount = Math.max(...catData.map((c) => c.count), 1)

  // Most practiced
  const topCat = [...catData].sort((a, b) => b.count - a.count)[0]

  // Confidence distribution
  const confDist = [1, 2, 3, 4, 5].map((n) => ({
    n,
    count: answers.filter((a) => a.confidence === n).length,
    pct:   Math.round((answers.filter((a) => a.confidence === n).length / total) * 100),
  }))

  const highConf = answers.filter((a) => a.confidence >= 4).length

  const kpiTiles = [
    {
      icon: '🏆',
      bg:   '#6c8eff18', color: '#6c8eff',
      num:  total,
      label: 'Total Answered',
    },
    {
      icon: '⭐',
      bg:   '#ffd16618', color: '#ffd166',
      num:  avg.toFixed(1),
      label: 'Avg Confidence',
    },
    {
      icon: '🔥',
      bg:   '#ff6b6b18', color: '#ff6b6b',
      num:  highConf,
      label: 'High Confidence (4-5★)',
    },
    {
      icon: CATEGORY_META[topCat.cat]?.emoji ?? '🎯',
      bg:   CATEGORY_META[topCat.cat]?.light ?? '#6c8eff1a',
      color: CATEGORY_META[topCat.cat]?.accent ?? '#6c8eff',
      num:  topCat.cat.split(' ')[0],
      label: 'Most Practiced Category',
    },
  ]

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Progress Stats</h1>
        <p className="page-subtitle">Track your interview readiness over time</p>
      </div>

      {/* KPI Tiles */}
      <div className="kpi-tiles fade-up">
        {kpiTiles.map((t) => (
          <div key={t.label} className="kpi-tile">
            <div className="tile-icon" style={{ background: t.bg, color: t.color }}>
              <span style={{ fontSize: 18 }}>{t.icon}</span>
            </div>
            <div className="tile-num" style={{ color: t.color }}>{t.num}</div>
            <div className="tile-label">{t.label}</div>
          </div>
        ))}
      </div>

      {/* Bar charts row */}
      <div className="charts-row fade-up-1">
        <BarChart
          title="Questions by Category"
          rows={catData.map((d, i) => ({
            label: d.cat,
            value: d.count,
            color: TILE_COLORS[i],
          }))}
          max={maxCount}
        />
        <BarChart
          title="Avg Confidence per Category"
          rows={catData.filter((d) => d.count > 0).map((d) => ({
            label: d.cat,
            value: d.avg,
            color: CONF_COLORS[Math.round(d.avg)] ?? '#6c8eff',
          }))}
          max={5}
        />
      </div>

      {/* Confidence distribution */}
      <div className="chart-card fade-up-2" style={{ marginTop: 20 }}>
        <h3 className="chart-title">Confidence Distribution</h3>
        <div className="conf-dist">
          {confDist.map(({ n, count, pct }) => (
            <div
              key={n}
              className="conf-tile"
              style={{ borderColor: count > 0 ? `${CONF_COLORS[n]}40` : undefined }}
            >
              <div className="ct-stars" style={{ color: CONF_COLORS[n] }}>{'★'.repeat(n)}</div>
              <div className="ct-count">{count}</div>
              <div className="ct-pct">{pct}%</div>
              <div className="ct-name">{CONF_LABELS[n]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent activity */}
      <div className="chart-card fade-up-3" style={{ marginTop: 20 }}>
        <h3 className="chart-title">Recent Activity</h3>
        <div className="activity-list">
          {answers.slice(0, 8).map((a) => {
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
    </div>
  )
}
