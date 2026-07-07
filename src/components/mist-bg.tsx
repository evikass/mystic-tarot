"use client"

import { useEffect, useRef } from "react"

/**
 * MistBackground — атмосферный параллакс-туман.
 *
 * Несколько слоёв полупрозрачных облаков, медленно плывущих по горизонтали
 * с разной скоростью (параллакс). Реагирует на движение мыши — лёгкое смещение.
 *
 * Использует canvas для производительности. pointer-events: none.
 */
export function MistBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId = 0
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    // === Детект мобильного устройства ===
    const isMobile = width < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)

    // === Туманные облака — 3 слоя с разной скоростью (параллакс) ===
    type MistCloud = {
      x: number
      y: number
      radius: number
      // скорость дрейфа (px/frame)
      vx: number
      // слой глубины (0 = далеко, 1 = близко) — влияет на параллакс
      depth: number
      // базовая прозрачность
      baseAlpha: number
      // цветовой оттенок (золото/фиолет/синий)
      hue: number
      // фаза для мерцания
      phase: number
      phaseSpeed: number
    }

    const clouds: MistCloud[] = []

    const initClouds = () => {
      clouds.length = 0
      // На мобильных — значительно меньше облаков
      const divisor = isMobile ? 50000 : 18000
      const count = Math.floor((width * height) / divisor)
      for (let i = 0; i < count; i++) {
        // Случайный слой (0..1) — большинство вдалеке
        const depth = Math.pow(Math.random(), 1.5) // bias toward far
        // На мобильных — меньше радиус
        const baseRadius = isMobile ? (40 + Math.random() * 80) : (60 + Math.random() * 120)
        const radius = baseRadius * (0.5 + depth * 0.8)
        // Выбор оттенка: 60% золото/охра, 25% фиолет, 15% синий
        const r = Math.random()
        const hue = r < 0.6 ? 42 + Math.random() * 15 : r < 0.85 ? 265 + Math.random() * 20 : 200 + Math.random() * 30

        clouds.push({
          x: Math.random() * (width + 200) - 100,
          y: Math.random() * height,
          radius,
          vx: (0.15 + depth * 0.4) * (Math.random() < 0.5 ? -1 : 1),
          depth,
          baseAlpha: (0.015 + Math.random() * 0.04) * (0.5 + depth * 0.6),
          hue,
          phase: Math.random() * Math.PI * 2,
          phaseSpeed: 0.002 + Math.random() * 0.004,
        })
      }
    }

    initClouds()

    let frame = 0
    // На мобильных — пропускаем каждый 2-й кадр для производительности
    const frameSkip = isMobile ? 2 : 1
    let skipCounter = 0

    const animate = () => {
      animationId = requestAnimationFrame(animate)

      // Throttle: на мобильных рисуем каждый 2-й кадр
      skipCounter++
      if (skipCounter < frameSkip) return
      skipCounter = 0

      frame++
      ctx.clearRect(0, 0, width, height)

      // Плавный lerp для мыши (параллакс) — на мобильных отключаем для производительности
      if (!isMobile) {
        mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.03
        mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.03
      }
      const mouseOffsetX = isMobile ? 0 : (mouseRef.current.x / width - 0.5) * 2
      const mouseOffsetY = isMobile ? 0 : (mouseRef.current.y / height - 0.5) * 2

      // Рисуем облака — отсортированы по глубине (дальние первыми)
      clouds
        .slice()
        .sort((a, b) => a.depth - b.depth)
        .forEach((c) => {
          // Дрейф
          c.x += c.vx
          c.phase += c.phaseSpeed

          // Wrap-around по горизонтали
          if (c.x < -c.radius * 2) c.x = width + c.radius
          if (c.x > width + c.radius * 2) c.x = -c.radius

          // Параллакс-смещение от мыши (ближние слои смещаются сильнее)
          const parallaxX = mouseOffsetX * c.depth * 30
          const parallaxY = mouseOffsetY * c.depth * 15

          // Мерцание прозрачности
          const alphaMod = 0.7 + Math.sin(c.phase) * 0.3
          const alpha = c.baseAlpha * alphaMod

          // Радиальная градиентная заливка — мягкое облако
          const drawX = c.x + parallaxX
          const drawY = c.y + parallaxY
          const r = Math.max(1, c.radius)

          const grad = ctx.createRadialGradient(drawX, drawY, 0, drawX, drawY, r)
          grad.addColorStop(0, `hsla(${c.hue}, 60%, 55%, ${alpha})`)
          grad.addColorStop(0.4, `hsla(${c.hue}, 50%, 45%, ${alpha * 0.5})`)
          grad.addColorStop(1, `hsla(${c.hue}, 40%, 35%, 0)`)

          ctx.fillStyle = grad
          ctx.beginPath()
          ctx.arc(drawX, drawY, r, 0, Math.PI * 2)
          ctx.fill()
        })

      animationId = requestAnimationFrame(animate)
    }
    animate()

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      initClouds()
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX
      mouseRef.current.targetY = e.clientY
    }

    // Для мобильных — device orientation (если доступно)
    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        // gamma: -90..90 (наклон влево/вправо)
        // beta: -180..180 (наклон вперёд/назад)
        mouseRef.current.targetX = ((e.gamma + 90) / 180) * width
        mouseRef.current.targetY = ((e.beta + 90) / 180) * height
      }
    }

    window.addEventListener("resize", handleResize)
    // На мобильных не слушаем mousemove (параллакс отключён)
    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("deviceorientation", handleDeviceOrientation)
    }

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("deviceorientation", handleDeviceOrientation)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  )
}
