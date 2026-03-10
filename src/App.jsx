import { useState } from 'react'
import { useAuth }    from './hooks/useAuth'
import { useAnswers } from './hooks/useAnswers'
import { useToast }   from './hooks/useToast'

import { Sidebar }      from './components/Sidebar'
import { Toast }        from './components/Toast'
import { AuthPage }     from './pages/AuthPage'
import { HomePage }     from './pages/HomePage'
import { PracticePage } from './pages/PracticePage'
import { HistoryPage }  from './pages/HistoryPage'
import { StatsPage }    from './pages/StatsPage'
import { Icons }        from './components/Icons'

export default function App() {
  const { user, loading: authLoading, signUp, signIn, signOut } = useAuth()
  const { answers, loading: answersLoading, saveAnswer, deleteAnswer } = useAnswers(user?.id)
  const { toast, showToast } = useToast()

  const [page,             setPage]     = useState('home')
  const [practiceCategory, setPracCat]  = useState('All')
  const [navOpen,          setNavOpen]  = useState(false)

  // ── Navigate helper ────────────────────────────────────────────────────────
  const navigate = (dest, category) => {
    if (category) setPracCat(category)
    setPage(dest)
    setNavOpen(false)
    // Scroll to top on page change
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // ── Save answer (calls hook + shows toast) ─────────────────────────────────
  const handleSave = async (entry) => {
    const result = await saveAnswer(entry)
    if (result?.error) {
      showToast(`Failed to save: ${result.error}`, 'error')
    } else {
      showToast('Answer saved successfully!', 'success')
    }
    return result
  }

  // ── Delete answer ──────────────────────────────────────────────────────────
  const handleDelete = async (id) => {
    const result = await deleteAnswer(id)
    if (result?.error) {
      showToast(`Failed to delete: ${result.error}`, 'error')
    } else {
      showToast('Answer deleted.', 'info')
    }
  }

  // ── Sign out ───────────────────────────────────────────────────────────────
  const handleSignOut = async () => {
    await signOut()
    setPage('home')
    showToast('Signed out.', 'info')
  }

  // ── Loading screen (checking auth session) ─────────────────────────────────
  if (authLoading) {
    return (
      <div className="loading-screen">
        <div className="spinner" style={{ width: 32, height: 32, borderWidth: 3 }} />
        <span>Loading…</span>
      </div>
    )
  }

  // ── Not authenticated → show AuthPage ─────────────────────────────────────
  if (!user) {
    return (
      <>
        <AuthPage onSignUp={signUp} onSignIn={signIn} />
        <Toast toast={toast} />
      </>
    )
  }

  // ── Authenticated → main app ───────────────────────────────────────────────
  return (
    <div className="app-layout">
      {/* Mobile nav toggle button */}
      <button
        className="mobile-toggle"
        onClick={() => setNavOpen((o) => !o)}
        aria-label="Toggle navigation"
      >
        <Icons.Menu size={20} />
      </button>

      {/* Sidebar navigation */}
      <Sidebar
        page={page}
        onNavigate={navigate}
        isOpen={navOpen}
        onClose={() => setNavOpen(false)}
        user={user}
        onSignOut={handleSignOut}
        answersCount={answers.length}
      />

      {/* Main page area */}
      <main className="page-main">
        {/* Show a spinner while answers are loading on first visit */}
        {answersLoading && answers.length === 0 ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', gap: 12, color: 'var(--muted)' }}>
            <div className="spinner" />
            Loading your answers…
          </div>
        ) : (
          <>
            {page === 'home'     && <HomePage     answers={answers} onNavigate={navigate} />}
            {page === 'practice' && <PracticePage answers={answers} onSave={handleSave} initialCategory={practiceCategory} />}
            {page === 'history'  && <HistoryPage  answers={answers} onDelete={handleDelete} />}
            {page === 'stats'    && <StatsPage    answers={answers} />}
          </>
        )}
      </main>

      <Toast toast={toast} />
    </div>
  )
}
