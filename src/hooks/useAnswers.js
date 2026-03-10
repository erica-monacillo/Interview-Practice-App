import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

/**
 * useAnswers
 * Manages all CRUD operations for the `answers` table in Supabase.
 * Automatically scopes queries to the currently authenticated user.
 */
export function useAnswers(userId) {
  const [answers, setAnswers]   = useState([])
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState(null)

  // ── Fetch all answers for this user ────────────────────────────────────────
  const fetchAnswers = useCallback(async () => {
    if (!userId) { setAnswers([]); return }
    setLoading(true)
    setError(null)

    const { data, error } = await supabase
      .from('answers')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('fetchAnswers error:', error)
      setError(error.message)
    } else {
      setAnswers(data || [])
    }
    setLoading(false)
  }, [userId])

  useEffect(() => { fetchAnswers() }, [fetchAnswers])

  // ── Save a new answer ───────────────────────────────────────────────────────
  const saveAnswer = useCallback(async (entry) => {
    if (!userId) return { error: 'Not authenticated' }

    const row = {
      user_id:    userId,
      question:   entry.question,
      category:   entry.category,
      answer:     entry.answer,
      confidence: entry.confidence,
      elapsed:    entry.elapsed ?? 0,
      // created_at is set automatically by Supabase (default: now())
    }

    const { data, error } = await supabase
      .from('answers')
      .insert(row)
      .select()
      .single()

    if (error) {
      console.error('saveAnswer error:', error)
      return { error: error.message }
    }

    // Prepend to local state so the UI updates instantly
    setAnswers((prev) => [data, ...prev])
    return { data }
  }, [userId])

  // ── Delete an answer by id ──────────────────────────────────────────────────
  const deleteAnswer = useCallback(async (id) => {
    const { error } = await supabase
      .from('answers')
      .delete()
      .eq('id', id)
      .eq('user_id', userId)   // extra safety: only delete own rows

    if (error) {
      console.error('deleteAnswer error:', error)
      return { error: error.message }
    }

    setAnswers((prev) => prev.filter((a) => a.id !== id))
    return { success: true }
  }, [userId])

  // ── Update an existing answer ───────────────────────────────────────────────
  const updateAnswer = useCallback(async (id, updates) => {
    const { data, error } = await supabase
      .from('answers')
      .update(updates)
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single()

    if (error) {
      console.error('updateAnswer error:', error)
      return { error: error.message }
    }

    setAnswers((prev) => prev.map((a) => (a.id === id ? data : a)))
    return { data }
  }, [userId])

  return { answers, loading, error, saveAnswer, deleteAnswer, updateAnswer, refetch: fetchAnswers }
}
