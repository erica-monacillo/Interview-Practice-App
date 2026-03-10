import { useState, useEffect, useRef } from 'react'
import { Icons } from './Icons'

export function Timer({ onTick, resetKey }) {
  const [elapsed, setElapsed] = useState(0)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef(null)

  // Reset when resetKey changes (new question loaded)
  useEffect(() => {
    setElapsed(0)
    setRunning(false)
  }, [resetKey])

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => setElapsed((e) => e + 1), 1000)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [running])

  // Notify parent of current elapsed time
  useEffect(() => { onTick?.(elapsed) }, [elapsed])

  const reset = () => { setElapsed(0); setRunning(false) }

  const format = (s) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0')
    const sec = (s % 60).toString().padStart(2, '0')
    return `${m}:${sec}`
  }

  const timerClass =
    !running && elapsed === 0 ? 'idle'
    : elapsed >= 300 ? 'danger'
    : elapsed >= 180 ? 'warning'
    : 'running'

  return (
    <div className="panel-card" style={{ textAlign: 'center' }}>
      <div className="panel-title" style={{ textAlign: 'center' }}>⏱ Timer</div>
      <div className={`timer-display ${timerClass}`}>{format(elapsed)}</div>
      <div className="timer-btns">
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => setRunning((r) => !r)}
        >
          {running ? '⏸ Pause' : elapsed === 0 ? '▶ Start' : '▶ Resume'}
        </button>
        <button className="btn btn-ghost btn-sm" onClick={reset} title="Reset timer">
          <Icons.Reset size={14} /> Reset
        </button>
      </div>
    </div>
  )
}
