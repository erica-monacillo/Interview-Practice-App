import { Icons } from './Icons'

const NAV_ITEMS = [
  { id: 'home',     label: 'Home',     Icon: Icons.Home },
  { id: 'practice', label: 'Practice', Icon: Icons.Practice },
  { id: 'history',  label: 'History',  Icon: Icons.History },
  { id: 'stats',    label: 'Stats',    Icon: Icons.Stats },
]

export function Navbar({ page, onNavigate, user, onSignOut, answersCount }) {
  const initial = user?.email?.[0]?.toUpperCase() ?? '?'

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <img src="/logo.png" alt="Logo" className="navbar-logo-img" />
          <span className="navbar-logo-text">InterviewForge</span>
        </div>

        {/* Links */}
        <div className="navbar-links">
          {NAV_ITEMS.map(({ id, label, Icon }) => (
            <button
              key={id}
              className={`nav-link ${page === id ? 'active' : ''}`}
              onClick={() => onNavigate(id)}
            >
              <Icon size={16} className="nav-icon" />
              <span>{label}</span>
              {id === 'history' && answersCount > 0 && (
                <span className="nav-badge">{answersCount}</span>
              )}
            </button>
          ))}
        </div>

        {/* User / Auth */}
        <div className="navbar-user-section">
          {user && (
            <>
              <div className="navbar-user">
                <div className="user-avatar">{initial}</div>
                <div className="user-email-text">{user.email?.split('@')[0]}</div>
              </div>
              <button
                className="btn btn-ghost btn-icon"
                onClick={onSignOut}
                title="Sign Out"
                style={{ color: 'var(--muted)' }}
              >
                <Icons.Logout size={18} />
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
