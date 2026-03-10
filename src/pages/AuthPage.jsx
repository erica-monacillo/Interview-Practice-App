import { useState } from 'react'

export function AuthPage({ onSignUp, onSignIn }) {
  const [mode, setMode]         = useState('signin')  // 'signin' | 'signup'
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw]     = useState(false)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')
  const [success, setSuccess]   = useState('')

  const handleSubmit = async () => {
    setError('')
    setSuccess('')
    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.')
      return
    }
    setLoading(true)

    if (mode === 'signup') {
      const { error } = await onSignUp(email.trim(), password)
      if (error) {
        setError(error.message)
      } else {
        setSuccess('Account created successfully! You can now sign in.')
        setMode('signin')
      }
    } else {
      const { error } = await onSignIn(email.trim(), password)
      if (error) setError(error.message)
    }
    setLoading(false)
  }

  const handleKey = (e) => { if (e.key === 'Enter') handleSubmit() }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="auth-logo-dot" />
          InterviewPrep
        </div>

        <h2 className="auth-title">
          {mode === 'signin' ? 'Welcome back' : 'Create account'}
        </h2>
        <p className="auth-subtitle">
          {mode === 'signin'
            ? 'Sign in to access your practice history and stats.'
            : 'Start tracking your interview prep journey.'}
        </p>

        <div className="auth-form">
          {error   && <div className="auth-error">⚠ {error}</div>}
          {success && (
            <div style={{ background: '#4cdf8a18', border: '1px solid #4cdf8a28', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: 'var(--green)' }}>
              ✓ {success}
            </div>
          )}

          {/* Email */}
          <div>
            <label className="label" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKey}
              autoComplete="email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="label" htmlFor="password">Password</label>
            <div style={{ position: 'relative' }}>
              <input
                id="password"
                type={showPw ? 'text' : 'password'}
                className="input"
                placeholder={mode === 'signup' ? 'Min 6 characters' : 'Your password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKey}
                autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                style={{ paddingRight: 42 }}
              />
              <button
                type="button"
                onClick={() => setShowPw((s) => !s)}
                style={{
                  position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)',
                  display: 'flex', alignItems: 'center',
                }}
                aria-label={showPw ? 'Hide password' : 'Show password'}
              >
                {showPw ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <button
            className="btn btn-primary btn-lg"
            onClick={handleSubmit}
            disabled={loading}
            style={{ width: '100%', justifyContent: 'center' }}
          >
            {loading
              ? <><span className="spinner" style={{ width: 16, height: 16 }} /> Loading…</>
              : mode === 'signin' ? 'Sign In' : 'Create Account'
            }
          </button>
        </div>

        <div className="auth-footer">
          {mode === 'signin' ? "Don't have an account?" : 'Already have an account?'}
          <button onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setError(''); setSuccess('') }}>
            {mode === 'signin' ? 'Sign Up' : 'Sign In'}
          </button>
        </div>
      </div>
    </div>
  )
}
