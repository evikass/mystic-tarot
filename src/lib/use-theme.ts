"use client"

import { useEffect, useState, useCallback } from "react"

export type Theme = "dark" | "light"

const STORAGE_KEY = "mystic-tarot-theme"

/**
 * Theme hook — reads saved theme from localStorage on mount, applies .light class
 * to <html>, and exposes a toggle function. Default theme is dark (mystic).
 *
 * The initial inline script in layout.tsx applies the class BEFORE hydration to
 * prevent a flash of wrong theme; this hook keeps the React state in sync.
 */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("dark")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    try {
      const saved = (localStorage.getItem(STORAGE_KEY) as Theme | null) ?? "dark"
      setThemeState(saved)
      applyThemeClass(saved)
    } catch {
      // ignore
    }
    setMounted(true)
  }, [])

  const applyThemeClass = (t: Theme) => {
    if (typeof document === "undefined") return
    if (t === "light") {
      document.documentElement.classList.add("light")
    } else {
      document.documentElement.classList.remove("light")
    }
  }

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t)
    applyThemeClass(t)
    try {
      localStorage.setItem(STORAGE_KEY, t)
    } catch {
      // ignore
    }
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark")
  }, [theme, setTheme])

  return { theme, setTheme, toggleTheme, mounted }
}
