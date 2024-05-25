import { type ReactNode, createContext, useLayoutEffect, useEffect, useRef, useMemo, useContext } from 'react'
import { useStorageTheme } from '../hooks'
import { type ThemeContextState } from '../models/theme-context.model'

function usePrevious(theme: string): string {
  const ref = useRef<string>()
  useEffect(() => {
    ref.current = theme
  })
  return ref.current!
}

export const ThemeContext = createContext<ThemeContextState>({} as ThemeContextState)

export const useTheme = (): ThemeContextState => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useStorageTheme('theme')
  const oldTheme = usePrevious(theme)

  useLayoutEffect(() => {
    const root = window.document.documentElement

    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light'

      root.classList.add(systemTheme)
      root.style.colorScheme = systemTheme
      return
    }

    root.classList.remove(oldTheme)
    root.classList.add(theme)
    root.style.colorScheme = theme
  }, [theme, oldTheme])

  function toggleTheme(theme: string) {
    // if (theme === 'light') setTheme('dark')
    // else setTheme('light')
    setTheme(theme)
  }

  const value = useMemo(() => ({ theme, toggleTheme }), [theme])

  return <ThemeContext.Provider value={value}> {children} </ThemeContext.Provider>
}
