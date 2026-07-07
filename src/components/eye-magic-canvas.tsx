"use client"

import { useEffect, useRef } from "react"

/**
 * EyeOfMystic — canvas-анимация мистического глаза.
 * v3: + flip burst (кольцо + взрыв частиц), + рунный круг, + смена цвета свечения.
 * Зрачок следит за курсором, свечение/скорость усиливаются при ховере.
 *
 * Canvas имеет pointer-events: none, поэтому позиция мыши и ховер
 * передаются от родительского компонента через refs.
 * Состояние flip передаётся через flippedRef.
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

interface BurstParticle {
  angle: number
  distance: number
  speed: number
  alpha: number
  alphaSpeed: number
  size: number
  color: string
}

interface FlipBurst {
  time: number
  maxTime: number
  ringRadius: number
}

interface EyeOfMysticCanvasProps {
  width: number
  height: number
  active: boolean
  mousePosRef?: React.RefObject<{ x: number; y: number } | null>
  isHoveredRef?: React.RefObject<boolean>
  flippedRef?: React.RefObject<boolean>
}

export function EyeOfMysticCanvas({ width, height, active, mousePosRef, isHoveredRef, flippedRef }: EyeOfMysticCanvasProps) {
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
    pupilOffsetX: 0,
    pupilOffsetY: 0,
    targetPupilOffsetX: 0,
    targetPupilOffsetY: 0,
    maxPupilOffset: 5,
    glowIntensity: 0.7,
    targetGlowIntensity: 0.7,
    orbitSpeedMultiplier: 1.0,
    targetOrbitSpeedMultiplier: 1.0,
    wasHovered: false,
    // Flip burst
    wasFlipped: false,
    flipBurst: null as FlipBurst | null,
    burstParticles: [] as BurstParticle[],
    // Rune circle
    runeAngle: 0,
    runeCount: 8,
    // Hue shift
    timeHue: 0,
  })

  useEffect(() => {
    // Dynamic particle count based on canvas size (fewer on mobile)
    const maxParticles = width < 160 ? 25 : 50
    const particles: Particle[] = []
    for (let i = 0; i < maxParticles; i++) {
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
  }, [width])

  const triggerFlipBurst = () => {
    const s = stateRef.current
    s.flipBurst = { time: 0, maxTime: 0.6, ringRadius: 0 }
    for (let i = 0; i < 15; i++) {
      s.burstParticles.push({
        angle: Math.random() * Math.PI * 2,
        distance: 30 + Math.random() * 15,
        speed: 2.5 + Math.random() * 3,
        alpha: 1.0,
        alphaSpeed: -1.5,
        size: 1.5 + Math.random() * 3,
        color: `hsl(${280 + Math.random() * 40}, 90%, 70%)`,
      })
    }
  }

  useEffect(() => {
    if (!active) {
      if (animRef.current) cancelAnimationFrame(animRef.current)
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
    const eyeRadius = Math.min(width, height) * 0.075
    const pupilRadius = eyeRadius * 0.33

    const s = stateRef.current
    s.lastTime = performance.now()

    const update = (deltaTime: number) => {
      // Flip detection
      const isFlipped = flippedRef?.current ?? false
      if (isFlipped !== s.wasFlipped) {
        triggerFlipBurst()
        s.wasFlipped = isFlipped
      }

      // Flip burst ring
      if (s.flipBurst) {
        s.flipBurst.time += deltaTime
        const progress = s.flipBurst.time / s.flipBurst.maxTime
        s.flipBurst.ringRadius = progress * 60
        if (s.flipBurst.time >= s.flipBurst.maxTime) {
          s.flipBurst = null
        }
      }

      // Burst particles
      for (let i = s.burstParticles.length - 1; i >= 0; i--) {
        const p = s.burstParticles[i]
        p.distance += p.speed * deltaTime * 60
        p.alpha += p.alphaSpeed * deltaTime
        if (p.alpha <= 0) s.burstParticles.splice(i, 1)
      }

      // Blink
      s.blinkTimer += deltaTime * 1000
      if (!s.isBlinking && s.blinkTimer >= s.nextBlink) {
        s.isBlinking = true
        s.blinkProgress = 0
        s.blinkTimer = 0
        s.nextBlink = Math.random() * 3000 + 2000
      }
      if (s.isBlinking) {
        s.blinkProgress += deltaTime / s.blinkDuration
        if (s.blinkProgress >= 1) {
          s.isBlinking = false
          s.blinkProgress = 0
          s.blinkTimer = 0
        }
      }

      // Pupil tracking
      if (mousePosRef?.current) {
        const dx = mousePosRef.current.x - centerX
        const dy = mousePosRef.current.y - centerY
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist > 0.01) {
          const normX = dx / dist
          const normY = dy / dist
          const limitedDist = Math.min(dist * 0.15, s.maxPupilOffset)
          s.targetPupilOffsetX = normX * limitedDist
          s.targetPupilOffsetY = normY * limitedDist
        } else {
          s.targetPupilOffsetX = 0
          s.targetPupilOffsetY = 0
        }
      } else {
        s.targetPupilOffsetX = 0
        s.targetPupilOffsetY = 0
      }

      // Hover
      const isHovered = isHoveredRef?.current ?? false
      if (isHovered !== s.wasHovered) {
        s.wasHovered = isHovered
        if (isHovered) {
          s.targetGlowIntensity = 1.0
          s.targetOrbitSpeedMultiplier = 1.7
        } else {
          s.targetGlowIntensity = 0.7
          s.targetOrbitSpeedMultiplier = 1.0
        }
      }

      // Lerp
      const lerp = 0.12
      s.pupilOffsetX += (s.targetPupilOffsetX - s.pupilOffsetX) * lerp
      s.pupilOffsetY += (s.targetPupilOffsetY - s.pupilOffsetY) * lerp
      s.glowIntensity += (s.targetGlowIntensity - s.glowIntensity) * lerp
      s.orbitSpeedMultiplier += (s.targetOrbitSpeedMultiplier - s.orbitSpeedMultiplier) * lerp

      // Particles
      for (const p of s.particles) {
        p.angle += p.speed * s.orbitSpeedMultiplier
        p.alpha += p.alphaSpeed
        if (p.alpha <= 0 || p.alpha >= 1) p.alphaSpeed *= -1
      }

      // Rune rotation
      s.runeAngle += deltaTime * 0.5

      // Hue shift
      s.timeHue += deltaTime * 10
    }

    const drawEye = () => {
      const x = centerX
      const y = centerY

      // Hue-shifting glow color
      const hue = 40 + Math.sin(s.timeHue * Math.PI / 180) * 10

      // Glow
      const glowGrad = ctx.createRadialGradient(x, y, eyeRadius * 0.8, x, y, eyeRadius * 1.8)
      glowGrad.addColorStop(0, `hsla(${hue}, 90%, 65%, ${0.7 * s.glowIntensity})`)
      glowGrad.addColorStop(0.5, `hsla(${hue}, 90%, 65%, ${0.2 * s.glowIntensity})`)
      glowGrad.addColorStop(1, "rgba(0, 0, 0, 0)")
      ctx.fillStyle = glowGrad
      ctx.beginPath()
      ctx.arc(x, y, eyeRadius * 1.8, 0, Math.PI * 2)
      ctx.fill()

      // Flip burst ring
      if (s.flipBurst) {
        ctx.save()
        const ringAlpha = 1 - s.flipBurst.time / s.flipBurst.maxTime
        ctx.strokeStyle = `hsla(${hue + 30}, 90%, 70%, ${ringAlpha})`
        ctx.lineWidth = 2
        ctx.shadowColor = "gold"
        ctx.shadowBlur = 10
        ctx.beginPath()
        ctx.arc(x, y, s.flipBurst.ringRadius, 0, Math.PI * 2)
        ctx.stroke()
        ctx.restore()
      }

      // Rune circle
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(s.runeAngle)
      ctx.strokeStyle = `hsla(${hue + 20}, 90%, 60%, 0.6)`
      ctx.lineWidth = 1.2
      ctx.shadowColor = `hsla(${hue + 20}, 90%, 60%, 0.5)`
      ctx.shadowBlur = 4
      for (let i = 0; i < s.runeCount; i++) {
        const angle = (i / s.runeCount) * Math.PI * 2
        ctx.beginPath()
        ctx.arc(0, 0, eyeRadius * 1.5, angle, angle + 0.3)
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(0, 0, eyeRadius * 1.8, angle - 0.15, angle + 0.15)
        ctx.stroke()
      }
      ctx.restore()

      // Eye
      ctx.save()
      ctx.translate(x, y)
      let scaleY = 1
      if (s.isBlinking) {
        scaleY = 1 - Math.sin(s.blinkProgress * Math.PI) * 0.9
      }
      ctx.scale(1, scaleY)

      // Sclera
      ctx.fillStyle = "#f5e6c8"
      ctx.beginPath()
      ctx.ellipse(0, 0, eyeRadius, eyeRadius * 1.2, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = "#b8860b"
      ctx.lineWidth = 1.5
      ctx.stroke()

      // Iris
      ctx.fillStyle = "#1a0f2e"
      ctx.beginPath()
      ctx.arc(0, 0, eyeRadius * 0.7, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = "#ffd700"
      ctx.lineWidth = 1
      ctx.stroke()

      // Pupil
      ctx.fillStyle = "#000"
      ctx.beginPath()
      ctx.arc(s.pupilOffsetX, s.pupilOffsetY, pupilRadius, 0, Math.PI * 2)
      ctx.fill()

      // Highlights
      ctx.fillStyle = "#fff"
      ctx.beginPath()
      ctx.arc(-3 + s.pupilOffsetX * 0.5, -4 + s.pupilOffsetY * 0.5, 2.5, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(5 + s.pupilOffsetX * 0.5, 5 + s.pupilOffsetY * 0.5, 1.5, 0, Math.PI * 2)
      ctx.fill()

      ctx.restore()

      // Eyelid
      if (scaleY > 0.3) {
        ctx.beginPath()
        ctx.ellipse(x, y - eyeRadius * 0.2, eyeRadius, eyeRadius * 0.1, 0, 0, Math.PI * 2)
        ctx.fillStyle = "#0a0510"
        ctx.fill()
      }
    }

    const drawParticles = () => {
      // Main particles
      for (const p of s.particles) {
        const px = centerX + Math.cos(p.angle) * p.distance
        const py = centerY + Math.sin(p.angle) * p.distance * 0.8
        ctx.globalAlpha = p.alpha
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(px, py, p.size * (0.8 + s.glowIntensity * 0.4), 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowColor = "gold"
        ctx.shadowBlur = 6 * s.glowIntensity
        ctx.fill()
      }
      ctx.shadowBlur = 0

      // Burst particles
      for (const p of s.burstParticles) {
        const px = centerX + Math.cos(p.angle) * p.distance
        const py = centerY + Math.sin(p.angle) * p.distance * 0.8
        ctx.globalAlpha = p.alpha
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(px, py, p.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowColor = "violet"
        ctx.shadowBlur = 8
        ctx.fill()
      }
      ctx.shadowBlur = 0
      ctx.globalAlpha = 1
    }

    const animate = () => {
      const now = performance.now()
      const deltaTime = (now - s.lastTime) / 1000
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
  }, [active, width, height, mousePosRef, isHoveredRef, flippedRef])

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
