"use client"

import { useEffect, useRef } from "react"

/**
 * EyeOfMystic — canvas-анимация мистического глаза поверх рубашки карты.
 * Реалистичное моргающее око с золотым свечением и вращающимися частицами.
 *
 * Адаптировано из vanilla JS кода пользователя в React/TypeScript.
 * Canvas накладывается поверх SVG рубашки (pointer-events: none).
 */

interface Particle {
  angle: number
  distance: number
  speed: number
  size: number
  alpha: number
  alphaSpeed: number
  color: string
}

interface EyeOfMysticCanvasProps {
  width: number
  height: number
  /** Показывать ли анимацию (false когда карта раскрыта) */
  active: boolean
}

export function EyeOfMysticCanvas({ width, height, active }: EyeOfMysticCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number | null>(null)
  const stateRef = useRef({
    blinkTimer: 0,
    blinkDuration: 0.15,
    isBlinking: false,
    blinkProgress: 0,
    nextBlink: Math.random() * 3000 + 2000,
    lastTime: 0,
    particles: [] as Particle[],
  })

  // Init particles once
  useEffect(() => {
    const particles: Particle[] = []
    for (let i = 0; i < 40; i++) {
      particles.push({
        angle: Math.random() * Math.PI * 2,
        distance: 35 + Math.random() * 25,
        speed: (Math.random() - 0.5) * 0.015,
        size: 0.8 + Math.random() * 2.2,
        alpha: Math.random(),
        alphaSpeed: 0.005 + Math.random() * 0.02,
        color: `hsl(${40 + Math.random() * 20}, 90%, 70%)`,
      })
    }
    stateRef.current.particles = particles
  }, [])

  useEffect(() => {
    if (!active) {
      if (animRef.current) cancelAnimationFrame(animRef.current)
      // Clear canvas
      const canvas = canvasRef.current
      if (canvas) {
        const ctx = canvas.getContext("2d")
        if (ctx) ctx.clearRect(0, 0, width, height)
      }
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const centerX = width / 2
    const centerY = height / 2
    const eyeRadius = Math.min(width, height) * 0.075  // ~24 для 320px
    const pupilRadius = eyeRadius * 0.33

    const s = stateRef.current
    s.lastTime = performance.now()

    const update = (deltaTime: number) => {
      // Моргание
      s.blinkTimer += deltaTime
      if (!s.isBlinking && s.blinkTimer >= s.nextBlink) {
        s.isBlinking = true
        s.blinkProgress = 0
        s.blinkTimer = 0
        s.nextBlink = Math.random() * 3000 + 2000
      }
      if (s.isBlinking) {
        s.blinkProgress += deltaTime / (s.blinkDuration * 1000)
        if (s.blinkProgress >= 1) {
          s.isBlinking = false
          s.blinkProgress = 0
          s.blinkTimer = 0
        }
      }

      // Частицы
      for (const p of s.particles) {
        p.angle += p.speed
        p.alpha += p.alphaSpeed
        if (p.alpha <= 0 || p.alpha >= 1) {
          p.alphaSpeed *= -1
        }
      }
    }

    const drawEye = () => {
      const x = centerX
      const y = centerY

      // Свечение вокруг глаза
      const glowGrad = ctx.createRadialGradient(x, y, eyeRadius * 0.8, x, y, eyeRadius * 1.8)
      glowGrad.addColorStop(0, "rgba(212, 175, 55, 0.7)")
      glowGrad.addColorStop(0.5, "rgba(212, 175, 55, 0.2)")
      glowGrad.addColorStop(1, "rgba(0, 0, 0, 0)")
      ctx.fillStyle = glowGrad
      ctx.beginPath()
      ctx.arc(x, y, eyeRadius * 1.8, 0, Math.PI * 2)
      ctx.fill()

      // Глазное яблоко (овал)
      ctx.save()
      ctx.translate(x, y)
      let scaleY = 1
      if (s.isBlinking) {
        const t = s.blinkProgress
        scaleY = 1 - Math.sin(t * Math.PI) * 0.9
      }
      ctx.scale(1, scaleY)

      // Белок
      ctx.fillStyle = "#f5e6c8"
      ctx.beginPath()
      ctx.ellipse(0, 0, eyeRadius, eyeRadius * 1.2, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = "#b8860b"
      ctx.lineWidth = 1.5
      ctx.stroke()

      // Радужка
      ctx.fillStyle = "#1a0f2e"
      ctx.beginPath()
      ctx.arc(0, 0, eyeRadius * 0.7, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = "#ffd700"
      ctx.lineWidth = 1
      ctx.stroke()

      // Зрачок
      ctx.fillStyle = "#000"
      ctx.beginPath()
      ctx.arc(0, 0, pupilRadius, 0, Math.PI * 2)
      ctx.fill()

      // Блики
      ctx.fillStyle = "#fff"
      ctx.beginPath()
      ctx.arc(-3, -4, 2.5, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(5, 5, 1.5, 0, Math.PI * 2)
      ctx.fill()

      ctx.restore()

      // Верхнее веко
      if (scaleY > 0.3) {
        ctx.beginPath()
        ctx.ellipse(x, y - eyeRadius * 0.2, eyeRadius, eyeRadius * 0.1, 0, 0, Math.PI * 2)
        ctx.fillStyle = "#0a0510"
        ctx.fill()
      }
    }

    const drawParticles = () => {
      for (const p of s.particles) {
        const px = centerX + Math.cos(p.angle) * p.distance
        const py = centerY + Math.sin(p.angle) * p.distance * 0.8
        ctx.globalAlpha = p.alpha
        ctx.fillStyle = p.color
        ctx.shadowColor = "gold"
        ctx.shadowBlur = 6
        ctx.beginPath()
        ctx.arc(px, py, p.size, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      ctx.shadowBlur = 0
    }

    const animate = () => {
      const now = performance.now()
      const deltaTime = now - s.lastTime
      s.lastTime = now

      update(deltaTime)
      ctx.clearRect(0, 0, width, height)
      drawEye()
      drawParticles()

      animRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [active, width, height])

  if (!active) return null

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="eye-magic"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 2,
        borderRadius: "12px",
      }}
    />
  )
}
