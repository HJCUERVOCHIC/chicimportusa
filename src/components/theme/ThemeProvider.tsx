'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type Theme = 'v1' | 'v2'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const STORAGE_KEY = 'ci_theme'

function getInitialTheme(): Theme {
  // Solo ejecutar en cliente
  if (typeof window === 'undefined') {
    // En servidor, usar env var o fallback
    const envTheme = process.env.NEXT_PUBLIC_THEME as Theme
    return envTheme === 'v2' ? 'v2' : 'v1'
  }

  // 1. Query param tiene prioridad
  const urlParams = new URLSearchParams(window.location.search)
  const queryTheme = urlParams.get('theme') as Theme
  if (queryTheme === 'v1' || queryTheme === 'v2') {
    // Persistir en localStorage si viene por query
    localStorage.setItem(STORAGE_KEY, queryTheme)
    return queryTheme
  }

  // 2. localStorage
  const storedTheme = localStorage.getItem(STORAGE_KEY) as Theme
  if (storedTheme === 'v1' || storedTheme === 'v2') {
    return storedTheme
  }

  // 3. Env var
  const envTheme = process.env.NEXT_PUBLIC_THEME as Theme
  if (envTheme === 'v1' || envTheme === 'v2') {
    return envTheme
  }

  // 4. Fallback
  return 'v1'
}

function applyThemeClass(theme: Theme) {
  if (typeof document === 'undefined') return
  
  const root = document.documentElement
  root.classList.remove('theme-v1', 'theme-v2')
  root.classList.add(`theme-${theme}`)
}

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>('v1')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const initialTheme = getInitialTheme()
    setThemeState(initialTheme)
    applyThemeClass(initialTheme)
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      applyThemeClass(theme)
    }
  }, [theme, mounted])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem(STORAGE_KEY, newTheme)
  }

  const toggleTheme = () => {
    const newTheme = theme === 'v1' ? 'v2' : 'v1'
    setTheme(newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

// Hook para uso seguro (no lanza error si no hay provider)
export function useThemeSafe() {
  const context = useContext(ThemeContext)
  return context ?? { theme: 'v1' as Theme, setTheme: () => {}, toggleTheme: () => {} }
}
