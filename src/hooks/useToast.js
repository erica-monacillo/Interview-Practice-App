import { useState, useCallback } from 'react'

/**
 * useToast
 * Returns { toast, showToast }.
 * toast = { message, type }  |  null
 * type  = 'success' | 'error' | 'info'
 */
export function useToast() {
  const [toast, setToast] = useState(null)

  const showToast = useCallback((message, type = 'success', duration = 2800) => {
    setToast({ message, type })
    setTimeout(() => setToast(null), duration)
  }, [])

  return { toast, showToast }
}
