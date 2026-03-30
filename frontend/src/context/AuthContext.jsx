import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const AuthContext = createContext(null)

const API_BASE = 'http://127.0.0.1:8000/api'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [tokens, setTokens] = useState(() => {
    const stored = localStorage.getItem('ll_tokens')
    return stored ? JSON.parse(stored) : null
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Persist tokens
  useEffect(() => {
    if (tokens) {
      localStorage.setItem('ll_tokens', JSON.stringify(tokens))
    } else {
      localStorage.removeItem('ll_tokens')
    }
  }, [tokens])

  // Fetch user profile on mount / token change
  const fetchProfile = useCallback(async () => {
    if (!tokens?.access) {
      setUser(null)
      setLoading(false)
      return
    }
    try {
      const res = await fetch(`${API_BASE}/profile`, {
        headers: { Authorization: `Bearer ${tokens.access}` }
      })
      if (res.ok) {
        const data = await res.json()
        setUser(data)
      } else if (res.status === 401) {
        // Try refresh
        const refreshed = await refreshToken()
        if (!refreshed) {
          logout()
        }
      }
    } catch {
      // Network error — keep existing state
    } finally {
      setLoading(false)
    }
  }, [tokens?.access])

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  // Refresh token
  const refreshToken = async () => {
    if (!tokens?.refresh) return false
    try {
      const res = await fetch(`${API_BASE}/token/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh: tokens.refresh })
      })
      if (res.ok) {
        const data = await res.json()
        setTokens(prev => ({ ...prev, access: data.access, refresh: data.refresh || prev.refresh }))
        return true
      }
    } catch {
      // ignore
    }
    return false
  }

  // Login
  const login = async (username, password) => {
    setError(null)
    try {
      const res = await fetch(`${API_BASE}/token/pair`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      const data = await res.json()
      if (res.ok) {
        setTokens({ access: data.access, refresh: data.refresh })
        // Fetch profile after token set
        const profileRes = await fetch(`${API_BASE}/profile`, {
          headers: { Authorization: `Bearer ${data.access}` }
        })
        if (profileRes.ok) {
          setUser(await profileRes.json())
        }
        return { success: true }
      } else {
        const msg = data.detail || data.error || 'Invalid credentials'
        setError(msg)
        return { success: false, error: msg }
      }
    } catch (err) {
      const msg = 'Network error. Is the backend running?'
      setError(msg)
      return { success: false, error: msg }
    }
  }

  // Signup
  const signup = async (payload) => {
    setError(null)
    try {
      const res = await fetch(`${API_BASE}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      if (res.ok || res.status === 201) {
        setTokens({ access: data.access, refresh: data.refresh })
        setUser(data.user)
        return { success: true }
      } else {
        const msg = data.error || 'Signup failed'
        setError(msg)
        return { success: false, error: msg }
      }
    } catch {
      const msg = 'Network error. Is the backend running?'
      setError(msg)
      return { success: false, error: msg }
    }
  }

  // Logout
  const logout = () => {
    setTokens(null)
    setUser(null)
    localStorage.removeItem('ll_tokens')
  }

  const value = {
    user,
    tokens,
    loading,
    error,
    isAuthenticated: !!tokens?.access,
    login,
    signup,
    logout,
    clearError: () => setError(null)
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
