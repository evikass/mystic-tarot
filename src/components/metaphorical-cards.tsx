"use client"

import { useState, useCallback } from "react"
import { Sparkles, RotateCcw, Eye, EyeOff } from "lucide-react"
import { drawMetaphoricalCards, type MetaphoricalCard } from "@/lib/metaphorical-cards-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TypewriterText } from "@/lib/use-typewriter"
import { playCardDrawSound } from "@/lib/sound-engine"
import { cn } from "@/lib/utils"

const SPREADS = [
  {
    id: "single",
    name: "Карта дня",
    description: "Одна карта — образ для размышления на сегодня",
    count: 1,
    positions: ["Образ дня"],
  },
  {
    id: "triple",
    name: "Три образа",
    description: "Ситуация · Ресурс · Действие",
    count: 3,
    positions: ["Ситуация", "Ресурс", "Действие"],
  },
  {
    id: "five",
    name: "Глубинный расклад",
    description: "Пять карт для глубокого самоанализа",
    count: 5,
    positions: ["Основа", "Что мешает", "Что помогает", "Следующий шаг", "Итог"],
  },
]

export function MetaphoricalCardsSection() {
  const [selectedSpread, setSelectedSpread] = useState<string>("triple")
  const [drawnCards, setDrawnCards] = useState<MetaphoricalCard[]>([])
  const [revealedIndexes, setRevealedIndexes] = useState<number[]>([])
  const [isDrawing, setIsDrawing] = useState(false)

  const currentSpread = SPREADS.find(s => s.id === selectedSpread)!
  const allRevealed = drawnCards.length > 0 && revealedIndexes.length === drawnCards.length

  const draw = useCallback(() => {
    playCardDrawSound()
    setIsDrawing(true)
    setDrawnCards([])
    setRevealedIndexes([])

    setTimeout(() => {
      const cards = drawMetaphoricalCards(currentSpread.count)
      setDrawnCards(cards)
      setIsDrawing(false)
    }, 800)
  }, [currentSpread])

  const revealCard = (i: number) => {
    if (!revealedIndexes.includes(i)) {
      setRevealedIndexes([...revealedIndexes, i])
    }
  }

  const revealAll = () => {
    setRevealedIndexes(drawnCards.map((_, i) => i))
  }

  return (
    <div className="py-8">
      <div className="text-center mb-10">
        <div className="section-divider mb-6"><span>Самопознание</span></div>
        <h2 className="text-4xl sm:text-5xl font-bold mb-3 text-mystic-gradient inline-block" style={{ fontFamily: "var(--font-cinzel)", lineHeight: 1.25, paddingTop: "0.2em" }}>
          Метафорические карты
        </h2>
        <p className="text-amber-200/70 max-w-2xl mx-auto">
          Метафорические ассоциативные карты (МАК) — это инструмент для самопознания и психотерапии.
          Каждый образ — зеркало вашей психики. Вытяните карту и позвольте бессознательному говорить.
        </p>
      </div>

      {/* Выбор расклада */}
      {drawnCards.length === 0 && !isDrawing && (
        <div className="max-w-3xl mx-auto mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {SPREADS.map(spread => (
              <button
                key={spread.id}
                onClick={() => setSelectedSpread(spread.id)}
                className={cn(
                  "p-4 rounded-xl border text-left transition-all",
                  selectedSpread === spread.id
                    ? "border-amber-400/50 bg-amber-400/10"
                    : "border-amber-400/20 hover:border-amber-400/40 hover:bg-amber-400/5"
                )}
              >
                <div className="text-base font-bold text-amber-100 mb-1">{spread.name}</div>
                <div className="text-xs text-amber-200/60">{spread.description}</div>
              </button>
            ))}
          </div>

          <div className="text-center">
            <Button onClick={draw} className="btn-gold px-10 py-4 text-lg">
              <Sparkles className="w-5 h-5 mr-2" />
              Вытянуть карты
            </Button>
          </div>
        </div>
      )}

      {/* Анимация тасования */}
      {isDrawing && (
        <div className="flex flex-col items-center gap-4 py-12">
          <div className="spinner-mystic" />
          <p className="text-amber-200/80 animate-pulse" style={{ fontFamily: "var(--font-cormorant)" }}>
            Тасую колоду образов...
          </p>
        </div>
      )}

      {/* Вытянутые карты */}
      {drawnCards.length > 0 && !isDrawing && (
        <div>
          <div className="cards-dealt flex flex-wrap justify-center gap-4 sm:gap-6 mb-8">
            {drawnCards.map((card, i) => {
              const revealed = revealedIndexes.includes(i)
              return (
                <div key={i} className="flex flex-col items-center">
                  {currentSpread.positions[i] && (
                    <div className="text-xs uppercase tracking-wider text-amber-200/70 mb-2 text-center max-w-[140px]">
                      {currentSpread.positions[i]}
                    </div>
                  )}

                  {/* Карта — рубашка или лицо */}
                  <div
                    onClick={() => !revealed && revealCard(i)}
                    className="relative cursor-pointer transition-transform hover:scale-105"
                    style={{ width: 140, height: 200 }}
                  >
                    {!revealed ? (
                      /* Рубашка карты */
                      <div
                        className="w-full h-full rounded-xl flex items-center justify-center border-2 border-amber-400/30"
                        style={{
                          background: "linear-gradient(135deg, #1a1025 0%, #0a0510 100%)",
                          boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
                        }}
                      >
                        <div className="text-center">
                          <div className="text-3xl mb-2 opacity-50">🔮</div>
                          <div className="text-[10px] text-amber-200/40 uppercase tracking-widest">МАК</div>
                          <div className="text-[10px] text-amber-200/30 mt-1">Нажмите</div>
                        </div>
                      </div>
                    ) : (
                      /* Лицевая сторона карты */
                      <div
                        className="w-full h-full rounded-xl flex flex-col items-center justify-between p-3 border-2"
                        style={{
                          borderColor: `${card.color}50`,
                          background: `linear-gradient(135deg, ${card.color}15 0%, #1a1025 100%)`,
                          boxShadow: `0 4px 20px ${card.color}30`,
                        }}
                      >
                        {/* Эмодзи-образ */}
                        <div className="text-4xl sm:text-5xl mt-2">{card.emoji}</div>

                        {/* Название */}
                        <div className="text-center">
                          <div className="text-sm font-bold text-amber-100" style={{ fontFamily: "var(--font-cinzel)" }}>
                            {card.name}
                          </div>
                        </div>

                        {/* Ключевые слова */}
                        <div className="flex flex-wrap justify-center gap-1 mb-1">
                          {card.keywords.map(kw => (
                            <span
                              key={kw}
                              className="text-[8px] px-1.5 py-0.5 rounded"
                              style={{
                                backgroundColor: `${card.color}20`,
                                color: card.color,
                              }}
                            >
                              {kw}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Кнопка "Открыть все" */}
          {!allRevealed && drawnCards.length > 1 && (
            <div className="text-center mb-6">
              <Button onClick={revealAll} variant="outline" className="border-amber-400/40 text-amber-200 hover:bg-amber-400/10">
                <Eye className="w-4 h-4 mr-2" />
                Открыть все
              </Button>
            </div>
          )}

          {/* Интерпретации */}
          {allRevealed && (
            <div className="max-w-3xl mx-auto space-y-4 animate-fade-in">
              {drawnCards.map((card, i) => (
                <Card
                  key={i}
                  className="glass-mystic border-amber-400/20"
                  style={{
                    opacity: 0,
                    animation: `cardInterpretReveal 0.5s ease-out ${i * 0.3}s forwards`,
                    borderColor: `${card.color}30`,
                  }}
                >
                  <CardContent className="p-5">
                    {/* Заголовок */}
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-3xl">{card.emoji}</span>
                      <div>
                        {currentSpread.positions[i] && (
                          <Badge
                            className="border text-[10px] mb-1"
                            style={{
                              backgroundColor: `${card.color}25`,
                              color: card.color,
                              borderColor: `${card.color}50`,
                            }}
                          >
                            {currentSpread.positions[i]}
                          </Badge>
                        )}
                        <h4 className="text-lg font-bold text-amber-100" style={{ fontFamily: "var(--font-cinzel)" }}>
                          {card.name}
                        </h4>
                      </div>
                    </div>

                    {/* Вопрос */}
                    <div className="mb-3 p-3 rounded-lg" style={{ backgroundColor: `${card.color}10` }}>
                      <div className="text-xs text-amber-200/60 mb-1">Вопрос для размышления:</div>
                      <p className="text-sm font-medium text-amber-100 italic" style={{ fontFamily: "var(--font-cormorant)" }}>
                        {card.question}
                      </p>
                    </div>

                    {/* Интерпретация */}
                    <p className="text-sm text-amber-100/80 leading-relaxed mb-3">
                      <TypewriterText
                        text={card.interpretation}
                        speed={25}
                        enabled={allRevealed}
                      />
                    </p>

                    {/* Свет и Тень */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                      <div className="p-2 rounded-lg" style={{ backgroundColor: "rgba(34,197,94,0.08)" }}>
                        <div className="text-[10px] text-green-300/70 mb-1 flex items-center gap-1">
                          ☀️ Ресурс
                        </div>
                        <p className="text-xs text-amber-100/70">{card.light}</p>
                      </div>
                      <div className="p-2 rounded-lg" style={{ backgroundColor: "rgba(220,38,38,0.08)" }}>
                        <div className="text-[10px] text-rose-300/70 mb-1 flex items-center gap-1">
                          🌑 Тень
                        </div>
                        <p className="text-xs text-amber-100/70">{card.shadow}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <div className="text-center">
                <Button onClick={draw} variant="outline" className="border-amber-400/40 text-amber-200 hover:bg-amber-400/10">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Новый расклад
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
