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

/**
 * Premium animated tarot card — Hearthstone / Marvel Snap style.
 *
 * Key design principles (vs the previous jittery version):
 *  - Smooth lerp-based tilt via requestAnimationFrame (no abrupt jumps)
 *  - Subtle idle float (gentle breathing, ±2px)
 *  - Reduced tilt range (±8° instead of ±12°) — feels premium, not gimmicky
 *  - Specular highlight follows the tilt direction (fake light source)
 *  - Glow ring + aura only on revealed cards (less visual noise)
 *  - Fewer sparkles (3 instead of 7), longer life
 *  - Slower shimmer sweep (4s instead of 2.5s)
 *  - Inner content parallax (face moves slightly with tilt for depth)
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
  // Target tilt (where the mouse is)
  const targetTilt = useRef({ x: 0, y: 0 })
  // Current tilt (smoothly interpolated)
  const [currentTilt, setCurrentTilt] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [showBurst, setShowBurst] = useState(false)
  const [wasRevealed, setWasRevealed] = useState(false)
  const rafRef = useRef<number | null>(null)

  // Reveal burst trigger
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

  // Smooth lerp animation loop
  useEffect(() => {
    if (!premium) return
    const animate = () => {
      setCurrentTilt(prev => {
        // Lerp factor 0.12 = smooth but responsive
        const lerp = 0.12
        const nx = prev.x + (targetTilt.current.x - prev.x) * lerp
        const ny = prev.y + (targetTilt.current.y - prev.y) * lerp
        // Snap to zero when very close (avoids endless micro-updates)
        if (Math.abs(nx) < 0.05 && Math.abs(ny) < 0.05 && Math.abs(targetTilt.current.x) < 0.05 && Math.abs(targetTilt.current.y) < 0.05) {
          return { x: 0, y: 0 }
        }
        return { x: nx, y: ny }
      })
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [premium])

  const handleClick = () => {
    if (!revealed && onReveal) {
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
    // Reduced range for premium feel (±8°)
    targetTilt.current = {
      x: Math.max(-1, Math.min(1, dy)) * -8,
      y: Math.max(-1, Math.min(1, dx)) * 8,
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

  // Combined transform: idle float + tilt + flip
  const flipRotation = revealed ? 180 : 0
  const innerTransform = `rotateX(${currentTilt.x}deg) rotateY(${flipRotation + currentTilt.y}deg)`

  // Specular highlight position (fake light from top-left)
  const specularX = 50 - currentTilt.y * 2  // moves opposite to tilt
  const specularY = 50 + currentTilt.x * 2

  return (
    <div className={cn("flex flex-col items-center", className)} style={{ width }}>
      {showPosition && position && (
        <div className="mb-2 text-xs font-medium tracking-wider uppercase text-amber-200/80">
          {position}
        </div>
      )}

      <div
        ref={containerRef}
        className={cn("relative cursor-pointer group premium-card-float", premium && "premium-card-container")}
        style={{
          width,
          height,
        }}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Glow ring (behind card) — only on hover, subtle */}
        {premium && isHovering && (
          <div className="glow-ring" style={{ borderRadius: "0.75rem" }}/>
        )}

        {/* Rotating aura — only when revealed */}
        {premium && revealed && (
          <div className="card-aura active"/>
        )}

        {/* The 3D-flipping inner element */}
        <div
          className="absolute inset-0"
          style={{
            transformStyle: "preserve-3d",
            transform: innerTransform,
            transition: "transform 0.4s ease-out",
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
            {/* Slow shimmer on back */}
            {!revealed && premium && (
              <div className="holo-shimmer holo-slow" style={{ borderRadius: "0.75rem" }}/>
            )}
            {/* Specular highlight on back */}
            {!revealed && premium && isHovering && (
              <div
                className="specular-highlight"
                style={{
                  background: `radial-gradient(circle at ${specularX}% ${specularY}%, rgba(255,255,255,0.25) 0%, transparent 40%)`,
                }}
              />
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
                {/* Slow holographic shimmer on face */}
                {premium && revealed && (
                  <div className="holo-shimmer holo-slow" style={{ borderRadius: "0.75rem" }}/>
                )}
                {/* Specular highlight that follows tilt */}
                {premium && revealed && (
                  <div
                    className="specular-highlight"
                    style={{
                      background: `radial-gradient(circle at ${specularX}% ${specularY}%, rgba(255,255,255,0.2) 0%, transparent 45%)`,
                    }}
                  />
                )}
                {/* Reveal burst flash */}
                {showBurst && <div className="reveal-burst"/>}
              </div>
            )}
          </div>
        </div>

        {/* Floating sparkle particles — fewer and slower */}
        {premium && revealed && (
          <div className="absolute inset-0 pointer-events-none overflow-visible" style={{ zIndex: 10 }}>
            {[
              { x: 20, y: 30, delay: 0, symbol: "✦" },
              { x: 80, y: 25, delay: 1.2, symbol: "✧" },
              { x: 50, y: 15, delay: 2.4, symbol: "✦" },
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
