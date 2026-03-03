'use client'

import { useEffect, useState } from 'react'
import { useTheme } from './ThemeProvider'

/**
 * Toggle de theme para debug.
 * Solo visible si:
 * - Query param: ?themeDebug=1
 * - Env var: NEXT_PUBLIC_THEME_DEBUG=true
 */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Verificar si debe mostrarse
    const urlParams = new URLSearchParams(window.location.search)
    const queryDebug = urlParams.get('themeDebug') === '1'
    const envDebug = process.env.NEXT_PUBLIC_THEME_DEBUG === 'true'
    
    setIsVisible(queryDebug || envDebug)
  }, [])

  if (!isVisible) return null

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-4 left-4 z-50 px-3 py-2 text-xs font-mono rounded-lg shadow-lg transition-all duration-200 border"
      style={{
        backgroundColor: theme === 'v1' ? '#FFFFFF' : '#121316',
        color: theme === 'v1' ? '#111111' : '#F5F5F5',
        borderColor: theme === 'v1' ? '#E5E7EB' : '#2A2B2E',
      }}
      title="Toggle theme (debug mode)"
    >
      Theme: <span className="font-bold">{theme.toUpperCase()}</span>
      <span className="ml-2 opacity-60">→ {theme === 'v1' ? 'v2' : 'v1'}</span>
    </button>
  )
}
