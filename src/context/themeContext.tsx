import { type ReactNode, createContext, useLayoutEffect, useEffect, useRef, useMemo } from 'react'
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

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useStorageTheme('theme')
  const oldTheme = usePrevious(theme)

  useLayoutEffect(() => {
    document.documentElement.classList.remove(oldTheme)
    document.documentElement.classList.add(theme)
    document.documentElement.style.colorScheme = theme
  }, [theme, oldTheme])

  function toggleTheme() {
    if (theme === 'light') setTheme('dark')
    else setTheme('light')
  }

  const value = useMemo(() => ({ theme, toggleTheme }), [theme])

  return <ThemeContext.Provider value={value}> {children} </ThemeContext.Provider>
}
