"use client"

import { useState, useEffect, useRef } from "react"

/**
 * useTypewriter — React-хук для эффекта печатной машинки.
 *
 * Текст появляется по буквам с заданной скоростью.
 * Перезапускается при изменении text или key (для повторных раскладов).
 *
 * @param text — полный текст для печати
 * @param speed — скорость в мс на символ (по умолчанию 30)
 * @param enabled — включена ли анимация (по умолчанию true)
 *
 * @returns { displayedText, isDone } — отображаемый текст и флаг завершения
 */
export function useTypewriter(text: string, speed: number = 30, enabled: boolean = true) {
  const [displayedText, setDisplayedText] = useState(enabled ? "" : text)
  const [isDone, setIsDone] = useState(!enabled)
  const indexRef = useRef(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    // Сбрасываем при изменении текста
    indexRef.current = 0
    setDisplayedText(enabled ? "" : text)
    setIsDone(!enabled)

    if (!enabled) {
      setDisplayedText(text)
      setIsDone(true)
      return
    }

    // Очищаем предыдущий интервал
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    // Если текст пустой — сразу завершаем
    if (!text) {
      setIsDone(true)
      return
    }

    intervalRef.current = setInterval(() => {
      indexRef.current++
      if (indexRef.current >= text.length) {
        setDisplayedText(text)
        setIsDone(true)
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
        }
      } else {
        setDisplayedText(text.slice(0, indexRef.current))
      }
    }, speed)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [text, speed, enabled])

  return { displayedText, isDone }
}

/**
 * TypewriterText — компонент для отображения текста с эффектом печатной машинки.
 * Включает мигающий курсор до завершения печати.
 *
 * @example
 * <TypewriterText text="Твой путь озарён светом звёзд..." speed={40} />
 */
export function TypewriterText({
  text,
  speed = 30,
  enabled = true,
  className,
  cursorClassName,
}: {
  text: string
  speed?: number
  enabled?: boolean
  className?: string
  cursorClassName?: string
}) {
  const { displayedText, isDone } = useTypewriter(text, speed, enabled)

  return (
    <span className={className}>
      {displayedText}
      {!isDone && (
        <span
          className={cursorClassName || "typewriter-cursor"}
          aria-hidden="true"
        >
          ▌
        </span>
      )}
    </span>
  )
}
