import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

/**
 * useAuth
 * Wraps Supabase Auth: tracks session, exposes signUp / signIn / signOut.
 */
export function useAuth() {
  const [user, setUser]       = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get the current session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth state changes (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  // ── Sign up with email + password ───────────────────────────────────────────
  // Note: Email confirmation must be disabled in Supabase project settings
  const signUp = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: { emailRedirectTo: null }
    })
    return { data, error }
  }

  // ── Sign in with email + password ───────────────────────────────────────────
  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    return { data, error }
  }

  // ── Sign out ────────────────────────────────────────────────────────────────
  const signOut = async () => {
    await supabase.auth.signOut()
  }

  return { user, loading, signUp, signIn, signOut }
}
