"use client"

import { useRef, useState, useEffect } from "react"
import { CardSVG, CardBack } from "@/lib/tarot-svg"
import type { TarotCard } from "@/lib/tarot-data"
import { cn } from "@/lib/utils"
import { playCardFlipSound, playClickSound } from "@/lib/sound-engine"
import { EyeOfMysticCanvas } from "@/components/eye-magic-canvas"

interface TarotCardViewProps {
  card: TarotCard | null
  isReversed?: boolean
  revealed?: boolean
  width?: number
  height?: number
  onReveal?: () => void
  className?: string
  position?: string
  showPosition?: boolean
  premium?: boolean
}

/**
 * Premium tarot card with:
 *  - CSS 3D flip (0.8s cubic-bezier transition via .flipped class)
 *  - RAF-based tilt on hover (only before flip — on the card back)
 *  - Magical glow on card back (::after with glowPulse animation)
 *  - Intensified glow on hover (glowIntense animation)
 *  - Reveal burst flash + flip sound on reveal
 *
 * Layer structure (tilt and flip on SEPARATE elements to avoid conflict):
 *   .tarot-card        — perspective container, cursor
 *     .tarot-card-tilt — RAF tilt (no transition), disabled after flip
 *       .tarot-card-inner — CSS transition 0.8s for flip (.flipped → rotateY 180)
 *         .tarot-card-back  — backface hidden, has ::after glow
 *         .tarot-card-front — backface hidden, rotateY(180deg)
 */
export function TarotCardView({
  card,
  isReversed = false,
  revealed = false,
  width = 200,
  height = 320,
  onReveal,
  className,
  position,
  showPosition = false,
  premium = true,
}: TarotCardViewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const targetTilt = useRef({ x: 0, y: 0 })
  const currentTilt = useRef({ x: 0, y: 0 })
  const [tiltState, setTiltState] = useState({ x: 0, y: 0 })
  const [showBurst, setShowBurst] = useState(false)
  const [wasRevealed, setWasRevealed] = useState(false)
  const rafRef = useRef<number | null>(null)

  // Reveal burst + flip sound
  useEffect(() => {
    if (revealed && !wasRevealed) {
      setWasRevealed(true)
      setShowBurst(true)
      playCardFlipSound()
      const t = setTimeout(() => setShowBurst(false), 900)
      return () => clearTimeout(t)
    }
    if (!revealed && wasRevealed) {
      setWasRevealed(false)
    }
  }, [revealed, wasRevealed])

  // Smooth lerp tilt — only active when NOT revealed (on the back)
  useEffect(() => {
    if (!premium) return
    const animate = () => {
      // After reveal, smoothly return tilt to zero
      if (revealed) {
        targetTilt.current = { x: 0, y: 0 }
      }
      const lerp = 0.15
      const dx = targetTilt.current.x - currentTilt.current.x
      const dy = targetTilt.current.y - currentTilt.current.y
      if (Math.abs(dx) < 0.05 && Math.abs(dy) < 0.05) {
        currentTilt.current = { x: targetTilt.current.x, y: targetTilt.current.y }
      } else {
        currentTilt.current = {
          x: currentTilt.current.x + dx * lerp,
          y: currentTilt.current.y + dy * lerp,
        }
      }
      setTiltState({ ...currentTilt.current })
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [premium, revealed])

  const handleClick = () => {
    if (!revealed && onReveal) {
      playClickSound()
      onReveal()
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!premium || !containerRef.current || revealed) return
    const rect = containerRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    targetTilt.current = {
      x: Math.max(-1, Math.min(1, dy)) * -10,
      y: Math.max(-1, Math.min(1, dx)) * 10,
    }
  }

  const handleMouseLeave = () => {
    if (premium) {
      targetTilt.current = { x: 0, y: 0 }
    }
  }

  // Tilt transform (only on .tarot-card-tilt, no transition — RAF smooths)
  const tiltTransform = `rotateX(${tiltState.x}deg) rotateY(${tiltState.y}deg)`

  return (
    <div className={cn("flex flex-col items-center", className)} style={{ width }}>
      {showPosition && position && (
        <div className="mb-2 text-xs font-medium tracking-wider uppercase text-amber-200/80">
          {position}
        </div>
      )}

      {/* Idle float wrapper */}
      <div className="premium-card-float">
        {/* === .tarot-card — perspective container === */}
        <div
          ref={containerRef}
          className={cn("tarot-card", revealed && "flipped")}
          style={{ width, height }}
          onClick={handleClick}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* === .tarot-card-tilt — RAF tilt (no transition) === */}
          <div
            className="tarot-card-tilt"
            style={{
              transform: tiltTransform,
            }}
          >
            {/* === .tarot-card-inner — CSS flip transition (0.8s) === */}
            <div className="tarot-card-inner">

              {/* === Рубашка (.tarot-card-back) — видна до flip === */}
              <div className="tarot-card-back">
                <CardBack width={width} height={height} className="rounded-xl"/>
                {/* Canvas с моргающим оком и частицами поверх SVG рубашки */}
                {premium && (
                  <EyeOfMysticCanvas
                    width={width}
                    height={height}
                    active={!revealed}
                  />
                )}
                {/* ::after glow is in CSS (glowPulse / glowIntense) */}
              </div>

              {/* === Лицевая сторона (.tarot-card-front) — видна после flip === */}
              <div className="tarot-card-front">
                {card && (
                  <>
                    <CardSVG
                      card={card}
                      isReversed={isReversed}
                      width={width}
                      height={height}
                      className="rounded-xl"
                    />
                    {/* Reveal burst flash — one-shot */}
                    {showBurst && <div className="reveal-burst"/>}
                  </>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Floating sparkle particles — above card, when revealed */}
      {premium && revealed && (
        <div className="relative pointer-events-none" style={{ width, height: 0, zIndex: 10 }}>
          {[
            { x: 20, y: -10, delay: 0, symbol: "✦" },
            { x: 80, y: -15, delay: 1.2, symbol: "✧" },
            { x: 50, y: -20, delay: 2.4, symbol: "✦" },
          ].map((s, i) => (
            <span
              key={i}
              className="sparkle-particle sparkle-slow"
              style={{
                left: `${s.x}%`,
                top: `${s.y}px`,
                animationDelay: `${s.delay}s`,
                fontSize: "12px",
              }}
            >
              {s.symbol}
            </span>
          ))}
        </div>
      )}

      {/* "Click to reveal" hint */}
      {!revealed && premium && (
        <div
          className="mt-2 text-[10px] text-amber-200/60 whitespace-nowrap animate-pulse"
          style={{ pointerEvents: "none" }}
        >
          ✦ нажмите, чтобы открыть
        </div>
      )}

      {card && revealed && (
        <div className="mt-5 text-center animate-fade-in">
          <div className="text-sm font-semibold text-amber-100" style={{ fontFamily: "var(--font-cinzel)" }}>
            {card.name}
            {isReversed && <span className="ml-1 text-xs text-rose-300">(перевёрнута)</span>}
          </div>
          <div className="text-xs text-amber-200/70 mt-1">{card.keyword}</div>
        </div>
      )}
    </div>
  )
}
