"use client"

import { useRef, useState, useEffect } from "react"
import { CardSVG, CardBack } from "@/lib/tarot-svg"
import type { TarotCard } from "@/lib/tarot-data"
import { cn } from "@/lib/utils"
import { playCardFlipSound, playClickSound } from "@/lib/sound-engine"

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
 * Premium tarot card with clean 3D tilt (Hearthstone-style).
 *
 * Design philosophy: LESS IS MORE.
 * The card illustration must always be clearly visible. No overlays
 * that obscure the art. Only:
 *   - Smooth 3D tilt on hover (lerp-based, no CSS transition conflict)
 *   - Subtle glow ring behind card on hover (NOT on top)
 *   - Reveal burst flash (one-shot, 0.9s)
 *   - 3 sparkle particles when revealed (outside the card, above it)
 *
 * Removed because they obscured the illustration:
 *   - Specular highlight (was covering half the card)
 *   - Inset card-glow box-shadow (was overlaying art from inside)
 *   - Continuous holo-shimmer sweep (was a "protuberance" over the art)
 *   - Foil/rainbow overlay
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
  const [isHovering, setIsHovering] = useState(false)
  const [showBurst, setShowBurst] = useState(false)
  const [wasRevealed, setWasRevealed] = useState(false)
  const rafRef = useRef<number | null>(null)

  // Reveal burst trigger + flip sound
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

  // Smooth lerp animation loop — updates tilt every frame
  useEffect(() => {
    if (!premium) return
    const animate = () => {
      const lerp = 0.15
      const dx = targetTilt.current.x - currentTilt.current.x
      const dy = targetTilt.current.y - currentTilt.current.y
      // Snap when very close to avoid endless micro-updates
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
  }, [premium])

  const handleClick = () => {
    if (!revealed && onReveal) {
      playClickSound()
      onReveal()
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!premium || !containerRef.current) return
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

  const handleMouseEnter = () => {
    if (premium) setIsHovering(true)
  }

  const handleMouseLeave = () => {
    if (premium) {
      setIsHovering(false)
      targetTilt.current = { x: 0, y: 0 }
    }
  }

  const flipRotation = revealed ? 180 : 0
  // NO CSS transition on transform — RAF handles smoothing
  const innerTransform = `rotateX(${tiltState.x}deg) rotateY(${flipRotation + tiltState.y}deg)`

  return (
    <div className={cn("flex flex-col items-center", className)} style={{ width }}>
      {showPosition && position && (
        <div className="mb-2 text-xs font-medium tracking-wider uppercase text-amber-200/80">
          {position}
        </div>
      )}

      {/* Outer wrapper handles idle float (separate from perspective/tilt) */}
      <div className="premium-card-float">
        {/* Inner wrapper handles 3D perspective */}
        <div
          className={cn("relative cursor-pointer", premium && "premium-card-container")}
          style={{ width, height, perspective: "1200px" }}
          ref={containerRef}
          onClick={handleClick}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Glow ring BEHIND card (z-index -1) — never on top of art */}
          {premium && isHovering && (
            <div className="glow-ring" style={{ borderRadius: "0.75rem" }}/>
          )}

          {/* The 3D-flipping inner element */}
          <div
            className="absolute inset-0"
            style={{
              transformStyle: "preserve-3d",
              transform: innerTransform,
              // NO transition — RAF smooths it
            }}
          >
            {/* ============ CARD BACK ============ */}
            <div
              className="absolute inset-0 transition-opacity duration-300"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                opacity: revealed ? 0 : 1,
                transitionDelay: revealed ? "0ms" : "350ms",
                borderRadius: "0.75rem",
              }}
            >
              <CardBack width={width} height={height} className="rounded-xl shadow-2xl shadow-purple-900/50"/>
            </div>

            {/* ============ CARD FACE ============ */}
            <div
              className="absolute inset-0"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                opacity: revealed ? 1 : 0,
                transition: "opacity 0.3s",
                transitionDelay: revealed ? "350ms" : "0ms",
                borderRadius: "0.75rem",
              }}
            >
              {card && (
                <div className="relative w-full h-full" style={{ borderRadius: "0.75rem", overflow: "hidden" }}>
                  <CardSVG
                    card={card}
                    isReversed={isReversed}
                    width={width}
                    height={height}
                    className="rounded-xl shadow-2xl shadow-purple-900/50"
                  />
                  {/* Reveal burst flash — one-shot, fades out */}
                  {showBurst && <div className="reveal-burst"/>}
                </div>
              )}
            </div>
          </div>

          {/* Floating sparkle particles — OUTSIDE the card, above it, never covering art */}
          {premium && revealed && (
            <div className="absolute inset-0 pointer-events-none overflow-visible" style={{ zIndex: 10 }}>
              {[
                { x: 20, y: 5, delay: 0, symbol: "✦" },
                { x: 80, y: 0, delay: 1.2, symbol: "✧" },
                { x: 50, y: -5, delay: 2.4, symbol: "✦" },
              ].map((s, i) => (
                <span
                  key={i}
                  className="sparkle-particle sparkle-slow"
                  style={{
                    left: `${s.x}%`,
                    top: `${s.y}%`,
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
              className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[10px] text-amber-200/60 whitespace-nowrap animate-pulse"
              style={{ pointerEvents: "none" }}
            >
              ✦ нажмите, чтобы открыть
            </div>
          )}
        </div>
      </div>

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
