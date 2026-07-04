"use client"

import { useRef, useState, useEffect } from "react"
import { CardSVG, CardBack } from "@/lib/tarot-svg"
import type { TarotCard } from "@/lib/tarot-data"
import { cn } from "@/lib/utils"

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
  /** Disable premium effects (for tiny preview cards) */
  premium?: boolean
}

// Stable sparkle positions per card (avoids re-randomizing on every render)
const SPARKLE_SLOTS = [
  { x: 10, y: 20, delay: 0, symbol: "✦" },
  { x: 85, y: 15, delay: 0.5, symbol: "✧" },
  { x: 50, y: 8, delay: 1.0, symbol: "✦" },
  { x: 15, y: 75, delay: 1.5, symbol: "✧" },
  { x: 90, y: 80, delay: 2.0, symbol: "✦" },
  { x: 75, y: 50, delay: 0.8, symbol: "✧" },
  { x: 25, y: 50, delay: 1.3, symbol: "✦" },
]

/**
 * Premium animated tarot card with:
 *  - 3D flip on reveal (rotateY)
 *  - 3D tilt-on-hover (card follows mouse / touch)
 *  - Holographic shimmer sweep (continuous)
 *  - Animated glow ring border (on hover)
 *  - Rotating conic-gradient aura (behind card)
 *  - Floating sparkle particles (when revealed)
 *  - Reveal burst flash (one-shot when flipping)
 *  - Foil/rainbow overlay on face
 *  - Card-deal entrance animation
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
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [showBurst, setShowBurst] = useState(false)
  const [wasRevealed, setWasRevealed] = useState(false)

  // Trigger reveal burst once when card flips to revealed
  useEffect(() => {
    if (revealed && !wasRevealed) {
      setWasRevealed(true)
      setShowBurst(true)
      const t = setTimeout(() => setShowBurst(false), 900)
      return () => clearTimeout(t)
    }
    if (!revealed && wasRevealed) {
      setWasRevealed(false)
    }
  }, [revealed, wasRevealed])

  const handleClick = () => {
    if (!revealed && onReveal) {
      onReveal()
    }
  }

  // Mouse move → 3D tilt
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!premium || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    // Clamp and scale
    setTilt({
      x: Math.max(-1, Math.min(1, dy)) * -12,  // rotateX: -12 to 12 deg
      y: Math.max(-1, Math.min(1, dx)) * 12,   // rotateY: -12 to 12 deg
    })
  }

  const handleMouseEnter = () => {
    if (premium) setIsHovering(true)
  }

  const handleMouseLeave = () => {
    if (premium) {
      setIsHovering(false)
      setTilt({ x: 0, y: 0 })
    }
  }

  // Combined transform: tilt + flip
  const flipRotation = revealed ? 180 : 0
  const innerTransform = `rotateX(${tilt.x}deg) rotateY(${flipRotation + tilt.y}deg)`

  return (
    <div className={cn("flex flex-col items-center", className)} style={{ width }}>
      {showPosition && position && (
        <div className="mb-2 text-xs font-medium tracking-wider uppercase text-amber-200/80">
          {position}
        </div>
      )}

      <div
        ref={containerRef}
        className={cn("relative cursor-pointer group", premium && "premium-card-container")}
        style={{
          width,
          height,
        }}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Glow ring (behind card, visible on hover) */}
        {premium && <div className="glow-ring" style={{ borderRadius: "0.75rem" }}/>}

        {/* Rotating aura (behind card, when revealed) */}
        {premium && (
          <div className={cn("card-aura", revealed && "active")}/>
        )}

        {/* The 3D-flipping inner element */}
        <div
          className="absolute inset-0 transition-transform duration-700 ease-out"
          style={{
            transformStyle: "preserve-3d",
            transform: innerTransform,
            transitionDuration: isHovering ? "100ms" : "700ms",
          }}
        >
          {/* ============ CARD BACK ============ */}
          <div
            className={cn(
              "absolute inset-0 transition-opacity duration-300",
              !revealed && premium && "card-glow",
            )}
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              opacity: revealed ? 0 : 1,
              transitionDelay: revealed ? "0ms" : "350ms",
              borderRadius: "0.75rem",
            }}
          >
            <CardBack width={width} height={height} className="rounded-xl shadow-2xl shadow-purple-900/50"/>
            {/* Animated shimmer on back when not revealed */}
            {!revealed && premium && (
              <div className="holo-shimmer active" style={{ borderRadius: "0.75rem" }}/>
            )}
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
                {/* Foil/rainbow overlay on face */}
                {premium && <div className="foil-overlay"/>}
                {/* Holographic shimmer sweep on face */}
                {premium && revealed && (
                  <div className="holo-shimmer active" style={{ borderRadius: "0.75rem" }}/>
                )}
                {/* Reveal burst flash */}
                {showBurst && <div className="reveal-burst"/>}
              </div>
            )}
          </div>
        </div>

        {/* Floating sparkle particles (when revealed) */}
        {premium && revealed && (
          <div className="absolute inset-0 pointer-events-none overflow-visible" style={{ zIndex: 10 }}>
            {SPARKLE_SLOTS.map((s, i) => (
              <span
                key={i}
                className="sparkle-particle"
                style={{
                  left: `${s.x}%`,
                  top: `${s.y}%`,
                  animationDelay: `${s.delay}s`,
                  fontSize: "14px",
                }}
              >
                {s.symbol}
              </span>
            ))}
          </div>
        )}

        {/* "Click to reveal" hint pulse */}
        {!revealed && premium && (
          <div
            className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[10px] text-amber-200/60 whitespace-nowrap animate-pulse"
            style={{ pointerEvents: "none" }}
          >
            ✦ нажмите, чтобы открыть
          </div>
        )}
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
