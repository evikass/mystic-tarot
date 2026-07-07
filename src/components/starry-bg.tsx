"use client"

import { useEffect, useRef } from "react"

/**
 * Анимированный звёздный фон с медленно плывущими частицами.
 * Использует canvas для производительности.
 */
export function StarryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

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

    type Star = {
      x: number
      y: number
      size: number
      baseAlpha: number
      twinkleSpeed: number
      twinkleOffset: number
      drift: number
    }

    type Particle = {
      x: number
      y: number
      size: number
      vx: number
      vy: number
      alpha: number
      hue: number
    }

    const stars: Star[] = []
    const particles: Particle[] = []

    const initStars = () => {
      stars.length = 0
      // На мобильных — меньше звёзд
      const divisor = isMobile ? 8000 : 4500
      const count = Math.floor((width * height) / divisor)
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.5 + 0.3,
          baseAlpha: Math.random() * 0.7 + 0.2,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          twinkleOffset: Math.random() * Math.PI * 2,
          drift: Math.random() * 0.05,
        })
      }
    }

    const initParticles = () => {
      particles.length = 0
      // На мобильных — значительно меньше частиц
      const divisor = isMobile ? 80000 : 30000
      const count = Math.floor((width * height) / divisor)
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 2 + 1,
          vx: (Math.random() - 0.5) * 0.3,
          vy: -Math.random() * 0.3 - 0.1,
          alpha: Math.random() * 0.5 + 0.2,
          hue: Math.random() < 0.6 ? 45 : (Math.random() < 0.5 ? 270 : 30), // золото / фиолет / оранжевый
        })
      }
    }

    initStars()
    initParticles()

    let frame = 0
    // На мобильных — пропускаем каждый 2-й кадр
    const frameSkip = isMobile ? 2 : 1
    let skipCounter = 0

    const animate = () => {
      animationId = requestAnimationFrame(animate)

      skipCounter++
      if (skipCounter < frameSkip) return
      skipCounter = 0

      frame++
      ctx.clearRect(0, 0, width, height)

      // Звёзды — мерцание
      stars.forEach((s) => {
        const alpha = s.baseAlpha + Math.sin(frame * s.twinkleSpeed + s.twinkleOffset) * 0.3
        s.y += s.drift
        if (s.y > height) s.y = 0
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 240, 200, ${Math.max(0.05, alpha)})`
        ctx.fill()
        if (s.size > 1 && !isMobile) {
          // Лёгкое свечение для крупных звёзд (только на десктопе)
          ctx.beginPath()
          ctx.arc(s.x, s.y, s.size * 2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(251, 191, 36, ${Math.max(0.02, alpha * 0.15)})`
          ctx.fill()
        }
      })

      // Частицы — поднимающиеся искры
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.y < -10) {
          p.y = height + 10
          p.x = Math.random() * width
        }
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3)
        grad.addColorStop(0, `hsla(${p.hue}, 80%, 65%, ${p.alpha})`)
        grad.addColorStop(1, `hsla(${p.hue}, 80%, 65%, 0)`)
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = `hsla(${p.hue}, 90%, 80%, ${p.alpha})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2)
        ctx.fill()
      })

      animationId = requestAnimationFrame(animate)
    }
    animate()

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      initStars()
      initParticles()
    }
    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
