import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login, error, clearError } = useAuth()
  const [form, setForm] = useState({ username: '', password: '' })
  const [submitting, setSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [shake, setShake] = useState(false)

  const handleChange = (e) => {
    clearError()
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.username || !form.password) return
    setSubmitting(true)
    const result = await login(form.username, form.password)
    setSubmitting(false)
    if (!result.success) {
      setShake(true)
      setTimeout(() => setShake(false), 600)
    }
  }

  return (
    <div className="auth-page">
      {/* Decorative background elements */}
      <div className="auth-bg-pattern" />
      <div className="auth-bg-glow auth-bg-glow--1" />
      <div className="auth-bg-glow auth-bg-glow--2" />

      {/* Top Navigation */}
      <header className="auth-header">
        <div className="auth-header__brand">
          <div className="auth-header__logo">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 8c.7-1 1-2.2 1-3.5C18 2 16 0 16 0s-2 2-2 4.5c0 1.3.3 2.5 1 3.5" />
              <path d="M12 19c-4.3 0-8-2.5-8-7 0-3.5 2-6 4-7.5C10 3 12 2 12 2s2 1 4 2.5c2 1.5 4 4 4 7.5 0 4.5-3.7 7-8 7Z" />
              <path d="M12 22v-3" />
            </svg>
          </div>
          <span className="auth-header__title">The Living Ledger</span>
        </div>
        <nav className="auth-header__nav">
          <a href="#" className="auth-header__link">System Map</a>
          <a href="#" className="auth-header__link">Resources</a>
          <a href="#" className="auth-header__link">Governance</a>
          <Link to="/signup" className="auth-header__link auth-header__link--active">Create Account</Link>
        </nav>
      </header>

      {/* Main Card */}
      <main className="auth-main">
        <div className={`auth-card ${shake ? 'auth-card--shake' : ''}`}>
          {/* Logo */}
          <div className="auth-card__icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 8c.7-1 1-2.2 1-3.5C18 2 16 0 16 0s-2 2-2 4.5c0 1.3.3 2.5 1 3.5" />
              <path d="M12 19c-4.3 0-8-2.5-8-7 0-3.5 2-6 4-7.5C10 3 12 2 12 2s2 1 4 2.5c2 1.5 4 4 7.5 0 4.5-3.7 7-8 7Z" />
              <path d="M12 22v-3" />
            </svg>
          </div>

          <h1 className="auth-card__title">Welcome Back</h1>
          <p className="auth-card__subtitle">INSTITUTIONAL FOOD REDISTRIBUTION SYSTEM</p>

          {/* Error Banner */}
          {error && (
            <div className="auth-error">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            {/* Username */}
            <div className="auth-field">
              <label className="auth-field__label" htmlFor="login-username">USERNAME</label>
              <div className="auth-field__input-wrap">
                <span className="auth-field__icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <input
                  id="login-username"
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  value={form.username}
                  onChange={handleChange}
                  autoComplete="username"
                  required
                  className="auth-field__input"
                />
              </div>
            </div>

            {/* Password */}
            <div className="auth-field">
              <label className="auth-field__label" htmlFor="login-password">PASSWORD</label>
              <div className="auth-field__input-wrap">
                <span className="auth-field__icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="••••••••••••"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                  className="auth-field__input"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  className="auth-field__toggle"
                  onClick={() => setShowPassword(v => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                      <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="auth-forgot">
              <a href="#" className="auth-forgot__link">Forgot password?</a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="auth-submit"
            >
              {submitting ? (
                <span className="auth-submit__spinner" />
              ) : (
                <>
                  Sign In
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Switch to Signup */}
          <p className="auth-switch">
            Don't have an account?&nbsp;
            <Link to="/signup" className="auth-switch__link">Create Account</Link>
          </p>

          {/* Legal */}
          <div className="auth-legal">
            BY SIGNING IN, YOU AGREE TO OUR <a href="#">SYSTEM GOVERNANCE STANDARDS</a> AND <a href="#">RESOURCE SHARING PROTOCOL</a>.
          </div>

          {/* Feature Icons */}
          <div className="auth-features">
            <span className="auth-features__icon" title="Sustainability">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22c5.5-3 9-7.5 9-12a9 9 0 0 0-18 0c0 4.5 3.5 9 9 12z" />
                <path d="M12 8v8" /><path d="M8 12h8" />
              </svg>
            </span>
            <span className="auth-features__icon" title="AI Powered">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </span>
            <span className="auth-features__icon" title="Analytics">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
              </svg>
            </span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="auth-footer">
        <span>© 2024 THE LIVING LEDGER. ALL RIGHTS RESERVED.</span>
        <div className="auth-footer__links">
          <a href="#">PRIVACY POLICY</a>
          <a href="#">TERMS OF SERVICE</a>
          <a href="#">COOKIE POLICY</a>
          <a href="#">ACCESSIBILITY</a>
        </div>
      </footer>
    </div>
  )
}
