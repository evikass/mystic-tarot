"use client"

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
}

/**
 * Анимированная карта с эффектом переворота.
 * При `revealed=false` показывает рубашку, при `true` — лицо.
 * Клик по карте вызывает onReveal.
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
}: TarotCardViewProps) {
  const handleClick = () => {
    if (!revealed && onReveal) {
      onReveal()
    }
  }

  return (
    <div className={cn("flex flex-col items-center", className)} style={{ width }}>
      {showPosition && position && (
        <div className="mb-2 text-xs font-medium tracking-wider uppercase text-amber-200/80">
          {position}
        </div>
      )}
      <div
        className="relative cursor-pointer group"
        style={{
          width,
          height,
          perspective: "1000px",
        }}
        onClick={handleClick}
      >
        <div
          className="absolute inset-0 transition-transform duration-700"
          style={{
            transformStyle: "preserve-3d",
            transform: revealed ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Рубашка */}
          <div
            className="absolute inset-0 transition-opacity duration-300 group-hover:scale-105"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              opacity: revealed ? 0 : 1,
              transitionDelay: revealed ? "0ms" : "350ms",
            }}
          >
            <CardBack width={width} height={height} className="rounded-xl shadow-2xl shadow-purple-900/50 drop-shadow-[0_0_15px_rgba(251,191,36,0.15)]"/>
          </div>
          {/* Лицо карты */}
          <div
            className="absolute inset-0 transition-opacity duration-300"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              opacity: revealed ? 1 : 0,
              transitionDelay: revealed ? "350ms" : "0ms",
            }}
          >
            {card && (
              <CardSVG card={card} isReversed={isReversed} width={width} height={height} className="rounded-xl shadow-2xl shadow-purple-900/50 drop-shadow-[0_0_15px_rgba(251,191,36,0.25)]"/>
            )}
          </div>
        </div>
      </div>
      {card && revealed && (
        <div className="mt-3 text-center animate-fade-in">
          <div className="text-sm font-semibold text-amber-100">
            {card.name}
            {isReversed && <span className="ml-1 text-xs text-rose-300">(перевёрнута)</span>}
          </div>
          <div className="text-xs text-amber-200/70 mt-1">{card.keyword}</div>
        </div>
      )}
    </div>
  )
}
