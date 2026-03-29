"use client"

import * as React from "react"
import { ThemeProviderContext } from "@/contexts/theme-context"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

export function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  React.useEffect(() => {
    if (typeof window === "undefined") return
    const root = window.document.documentElement
    root.classList.remove("light")
    if (!root.classList.contains("dark")) {
      root.classList.add("dark")
    }
  }, [])

  const value = {
    theme: "dark" as Theme,
    setTheme: () => {},
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}
