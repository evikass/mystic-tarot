"use client"

import { useState, useEffect, useRef } from "react"

/**
 * TypewriterText — построчное проявление текста с задержкой.
 * Каждая строка появляется с задержкой и fade-in анимацией.
 */
interface TypewriterTextProps {
  lines: { label?: string; text: string; color?: string; icon?: string }[]
  /** Задержка между строками (мс) */
  delay?: number
  /** Начальная задержка перед первой строкой (мс) */
  initialDelay?: number
}

export function TypewriterText({ lines, delay = 300, initialDelay = 200 }: TypewriterTextProps) {
  const [visibleCount, setVisibleCount] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setVisibleCount(0)
    let currentDelay = initialDelay

    lines.forEach((_, i) => {
      setTimeout(() => {
        setVisibleCount(i + 1)
      }, currentDelay)
      currentDelay += delay
    })

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [lines, delay, initialDelay])

  return (
    <div className="space-y-3">
      {lines.map((line, i) => (
        <div
          key={i}
          className="transition-all duration-500"
          style={{
            opacity: i < visibleCount ? 1 : 0,
            transform: i < visibleCount ? "translateY(0)" : "translateY(8px)",
          }}
        >
          {line.label && (
            <div className="flex items-center gap-2 mb-1">
              {line.icon && <span>{line.icon}</span>}
              <span
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: line.color || "#fbbf24" }}
              >
                {line.label}
              </span>
            </div>
          )}
          <p className="text-sm text-amber-100/85 leading-relaxed" style={{ color: line.color }}>
            {line.text}
          </p>
        </div>
      ))}
    </div>
  )
}
