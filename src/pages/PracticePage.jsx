import { useState, useEffect, useCallback } from 'react'
import { QUESTIONS } from '../data/questions'
import { CategoryBadge } from '../components/CategoryBadge'
import { CategoryFilter } from '../components/CategoryFilter'
import { Timer } from '../components/Timer'
import { StarRating } from '../components/StarRating'
import { Icons } from '../components/Icons'

export function PracticePage({ answers, onSave, initialCategory = 'All' }) {
  const [category, setCategory]   = useState(initialCategory)
  const [question, setQuestion]   = useState(null)
  const [answerText, setAnswer]   = useState('')
  const [confidence, setConf]     = useState(0)
  const [elapsed, setElapsed]     = useState(0)
  const [timerKey, setTimerKey]   = useState(0)  // increment to reset timer
  const [saved, setSaved]         = useState(false)
  const [saving, setSaving]       = useState(false)

  // Questions available for the selected category
  const pool = category === 'All'
    ? QUESTIONS
    : QUESTIONS.filter((q) => q.category === category)

  // Pick a random question (avoid repeating current one)
  const pickQuestion = useCallback(() => {
    const available = question
      ? pool.filter((q) => q.id !== question.id)
      : pool
    const q = available[Math.floor(Math.random() * available.length)]
    setQuestion(q)
    setAnswer('')
    setConf(0)
    setSaved(false)
    setTimerKey((k) => k + 1)  // reset timer
  }, [pool, question])

  // Pick a question on first load and on category change
  useEffect(() => { pickQuestion() }, [category]) // eslint-disable-line react-hooks/exhaustive-deps

  // Count per category (for filter UI)
  const counts = {}
  answers.forEach((a) => { counts[a.category] = (counts[a.category] || 0) + 1 })

  const handleSave = async () => {
    if (!answerText.trim() || confidence === 0 || !question) return
    setSaving(true)
    const result = await onSave({
      question:   question.question,
      category:   question.category,
      answer:     answerText.trim(),
      confidence,
      elapsed,
    })
    setSaving(false)
    if (!result?.error) setSaved(true)
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Practice</h1>
        <p className="page-subtitle">One question at a time. Type your answer, rate your confidence, save it.</p>
      </div>

      <div className="practice-layout">
        {/* ── Question Card ── */}
        <div>
          {question && (
            <div className="question-card fade-up" key={question.id}>
              <div className="q-meta">
                <CategoryBadge category={question.category} />
                <span className="q-number">Q#{question.id}</span>
              </div>

              <p className="q-text">{question.question}</p>

              <label className="label" htmlFor="answer">Your Answer</label>
              <textarea
                id="answer"
                className="textarea"
                rows={8}
                value={answerText}
                onChange={(e) => { setAnswer(e.target.value); setSaved(false) }}
                placeholder="Type your answer here… explain your reasoning, use examples, think out loud."
              />

              <StarRating value={confidence} onChange={(v) => { setConf(v); setSaved(false) }} />

              <div className="q-actions">
                <button
                  className="btn btn-primary btn-lg"
                  onClick={handleSave}
                  disabled={!answerText.trim() || confidence === 0 || saved || saving}
                >
                  {saving
                    ? <><span className="spinner" style={{ width: 14, height: 14, borderWidth: 2 }} /> Saving…</>
                    : saved
                      ? '✓ Saved!'
                      : <><Icons.Save size={15} /> Save Answer</>
                  }
                </button>
                <button className="btn btn-secondary" onClick={pickQuestion}>
                  <Icons.Skip size={14} /> Next Question
                </button>
              </div>

              {saved && (
                <div className="save-success">
                  ✓ Answer saved! Click "Next Question" to keep practicing.
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── Sidebar ── */}
        <div className="sidebar-panel">
          <Timer resetKey={timerKey} onTick={setElapsed} />

          <CategoryFilter
            value={category}
            onChange={setCategory}
            counts={counts}
          />

          <div className="panel-card">
            <div className="panel-title">Session Info</div>
            {[
              { label: 'Available Qs',           val: pool.length },
              { label: 'Answered (this session)', val: answers.filter((a) => category === 'All' || a.category === category).length },
              { label: 'Total saved',             val: answers.length },
            ].map((r) => (
              <div key={r.label} className="info-row">
                <span className="info-label">{r.label}</span>
                <span className="info-val">{r.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
