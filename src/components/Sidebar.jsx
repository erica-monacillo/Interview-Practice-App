import { Icons } from './Icons'

const NAV_ITEMS = [
  { id: 'home',     label: 'Home',     Icon: Icons.Home },
  { id: 'practice', label: 'Practice', Icon: Icons.Practice },
  { id: 'history',  label: 'History',  Icon: Icons.History },
  { id: 'stats',    label: 'Stats',    Icon: Icons.Stats },
]

export function Sidebar({ page, onNavigate, isOpen, onClose, user, onSignOut, answersCount }) {
  const initial = user?.email?.[0]?.toUpperCase() ?? '?'

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`nav-overlay ${isOpen ? 'open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        {/* Logo */}
        <div className="sidebar-logo">
          <div className="sidebar-logo-dot" />
          InterviewPrep
        </div>

        {/* Navigation links */}
        <nav className="sidebar-nav">
          {NAV_ITEMS.map(({ id, label, Icon }) => (
            <div
              key={id}
              className={`sidebar-item ${page === id ? 'active' : ''}`}
              onClick={() => { onNavigate(id); onClose(); }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onNavigate(id)}
            >
              <Icon size={16} className="nav-icon" />
              {label}
              {id === 'history' && answersCount > 0 && (
                <span className="sidebar-badge">{answersCount}</span>
              )}
            </div>
          ))}
        </nav>

        <div className="sidebar-divider" />

        {/* User info */}
        {user && (
          <>
            <div className="sidebar-user">
              <div className="user-avatar">{initial}</div>
              <div style={{ overflow: 'hidden' }}>
                <div className="user-name">{user.email?.split('@')[0]}</div>
                <div className="user-email">{user.email}</div>
              </div>
            </div>
            <div
              className="sidebar-item"
              onClick={onSignOut}
              role="button"
              tabIndex={0}
              style={{ color: 'var(--red)' }}
            >
              <Icons.Logout size={16} />
              Sign Out
            </div>
          </>
        )}

        <div className="sidebar-divider" />

        <p className="sidebar-footer">
          55 questions · 6 categories<br />
          Built for your portfolio 🚀
        </p>
      </aside>
    </>
  )
}
