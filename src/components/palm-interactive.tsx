"use client"

import { useState } from "react"
import {
  palmLines,
  palmMounts,
  palmExtraLines,
  handTypes,
  type PalmLine,
  type PalmMount,
  type PalmExtraLine,
  type HandType,
} from "@/lib/psychology-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Hand, RotateCcw, Info } from "lucide-react"

type SelectionMode = "main-lines" | "extra-lines" | "mounts" | "hand-type"

export function PalmInteractive() {
  const [mode, setMode] = useState<SelectionMode>("main-lines")
  const [selectedMainLine, setSelectedMainLine] = useState<PalmLine | null>(null)
  const [selectedVariation, setSelectedVariation] = useState<number | null>(null)
  const [selectedExtraLine, setSelectedExtraLine] = useState<PalmExtraLine | null>(null)
  const [selectedMount, setSelectedMount] = useState<PalmMount | null>(null)
  const [selectedHandType, setSelectedHandType] = useState<HandType | null>(null)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  // Большая интерактивная SVG-ладонь — правильная анатомия
  // Правая ладонь, вид ладонью к зрителю:
  // - Большой палец слева, отходит от нижней трети
  // - 4 пальца сверху (указательный, средний, безымянный, мизинец)
  // - Запястье снизу
  const renderInteractivePalm = () => {
    // viewBox: 300 x 420
    // Пальцы сверху (y: 30-130), ладонь (y: 130-360), запястье (y: 360-390)
    // Большой палец слева (x: 20-70, отходит от y~200)

    // Координаты основных линий (анатомически правильно):
    // Линия Жизни: дуга от (95,140) вниз через (70,220) к (85,340) — огибает бугор Венеры (основание большого пальца слева)
    // Линия Головы: от (95,180) горизонтально вправо к (210,185)
    // Линия Сердца: от (85,155) горизонтально вправо к (215,150) — выше Головы
    // Линия Судьбы: вертикально от (145,350) вверх к (140,130) — к среднему пальцу
    // Линия Солнца: вертикально от (165,350) к (165,140) — к безымянному
    const lines: Record<string, string> = {
      // Основные
      life: "M 95 140 Q 68 180 65 240 Q 65 300 82 345",
      head: "M 95 185 Q 145 178 215 188",
      heart: "M 82 155 Q 145 140 218 152",
      fate: "M 145 355 L 140 135",
      sun: "M 170 355 L 168 145",
      // Дополнительные
      mars: "M 105 150 Q 85 190 82 245 Q 82 300 98 340",
      health: "M 160 350 Q 155 280 150 210",
      marriage: "M 242 145 L 245 160 M 238 148 L 240 163 M 246 142 L 248 157",
      children: "M 240 135 L 242 128 M 244 138 L 246 131 M 248 133 L 250 126",
      travel: "M 210 320 Q 220 328 230 322 M 215 335 Q 225 343 235 337",
      intuition: "M 225 310 Q 190 250 160 200",
      "girdle-venus": "M 95 135 Q 150 115 210 132",
      simian: "M 90 170 Q 150 162 215 172",
      "ring-solomon": "M 100 125 Q 112 113 124 125",
      "ring-saturn": "M 128 128 Q 140 116 152 128",
    }

    const isMainActive = (id: string) =>
      mode === "main-lines" && (hoveredItem === id || selectedMainLine?.id === id)
    const isExtraActive = (id: string) =>
      mode === "extra-lines" && (hoveredItem === id || selectedExtraLine?.id === id)
    const isMountActive = (id: string) =>
      mode === "mounts" && (hoveredItem === id || selectedMount?.id === id)

    const lc = (a: boolean) => a ? "#fbbf24" : "rgba(254,243,199,0.25)"
    const lw = (a: boolean) => a ? 3.5 : 2

    // Рендер кликабельной линии
    const renderLine = (id: string, dashArray?: string, extraClass = "") => {
      const isMain = ["life","head","heart","fate","sun"].includes(id)
      const isExtra = !isMain
      const active = isMain ? isMainActive(id) : isExtraActive(id)
      const clickHandler = isMain
        ? () => mode === "main-lines" && setSelectedMainLine(palmLines.find(l => l.id === id)!)
        : () => mode === "extra-lines" && setSelectedExtraLine(palmExtraLines.find(l => l.id === id)!)
      const hoverEnter = () => { if ((isMain && mode === "main-lines") || (isExtra && mode === "extra-lines")) setHoveredItem(id) }
      const opacity = active ? 1 : (isMain ? 0.5 : 0.3)

      return (
        <path d={lines[id]} fill="none"
          stroke={lc(active)} strokeWidth={lw(active)} strokeLinecap="round"
          strokeDasharray={dashArray}
          className={`transition-all ${((isMain && mode === "main-lines") || (isExtra && mode === "extra-lines")) ? "cursor-pointer" : ""} ${extraClass}`}
          onClick={clickHandler}
          onMouseEnter={hoverEnter}
          onMouseLeave={() => setHoveredItem(null)}
          opacity={opacity}
        />
      )
    }

    // Рендер кликабельного бугра
    const renderMount = (id: string, cx: number, cy: number, r: number, color: string, symbol: string) => {
      const active = isMountActive(id)
      return (
        <g
          className={mode === "mounts" ? "cursor-pointer" : ""}
          onClick={() => mode === "mounts" && setSelectedMount(palmMounts.find(m => m.id === id)!)}
          onMouseEnter={() => mode === "mounts" && setHoveredItem(id)}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <circle cx={cx} cy={cy} r={r}
            fill={active ? `${color}40` : `${color}15`}
            stroke={active ? color : `${color}30`}
            strokeWidth={active ? 2 : 1}
            className="transition-all"
          />
          <text x={cx} y={cy + 4} fontSize="8" textAnchor="middle" fill={`${color}99`}>{symbol}</text>
        </g>
      )
    }

    return (
      <svg viewBox="0 0 300 420" className="w-full h-full max-w-xs mx-auto">
        <defs>
          <radialGradient id="palm-bg" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="rgba(251,191,36,0.08)"/>
            <stop offset="100%" stopColor="rgba(167,139,250,0.04)"/>
          </radialGradient>
        </defs>

        {/* Заголовок */}
        <text x="150" y="18" fontSize="12" textAnchor="middle" fill="rgba(251,191,36,0.8)" fontWeight="bold" style={{ fontFamily: "var(--font-cinzel)" }}>
          Правая ладонь
        </text>
        <text x="150" y="30" fontSize="7" textAnchor="middle" fill="rgba(254,243,199,0.4)">
          активная рука · текущая жизнь
        </text>

        {/* === КОНТУР ЛАДОНИ с правильной анатомией === */}
        {/* Большой палец — слева, отходит от нижней трети ладони */}
        <path
          d="
            M 95 360
            C 78 360 70 350 68 330
            C 65 310 60 280 55 255
            C 50 235 45 220 40 210
            C 35 200 28 195 25 185
            C 22 175 25 165 35 162
            C 45 160 55 168 62 180
            C 68 192 72 205 78 215
            L 78 215
            C 72 195 68 170 68 145
            C 68 120 75 100 85 95
            C 92 92 98 98 98 110
            L 98 140
            L 103 140
            L 103 85
            C 103 65 113 50 125 50
            C 137 50 143 65 143 85
            L 143 140
            L 148 140
            L 148 70
            C 148 48 160 35 172 35
            C 184 35 190 48 190 70
            L 190 140
            L 195 140
            L 195 85
            C 195 68 205 58 215 58
            C 225 58 230 68 230 85
            L 230 150
            C 235 165 238 185 240 210
            C 242 250 240 290 235 320
            C 230 345 220 358 208 362
            L 95 360 Z"
          fill="url(#palm-bg)"
          stroke="rgba(251,191,36,0.45)"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Подписи пальцев */}
        <text x="60" y="175" fontSize="6" textAnchor="middle" fill="rgba(254,243,199,0.3)" transform="rotate(-30 60 175)">Б.</text>
        <text x="100" y="90" fontSize="6" textAnchor="middle" fill="rgba(254,243,199,0.3)">Ук.</text>
        <text x="125" y="55" fontSize="6" textAnchor="middle" fill="rgba(254,243,199,0.3)">Ср.</text>
        <text x="172" y="40" fontSize="6" textAnchor="middle" fill="rgba(254,243,199,0.3)">Без.</text>
        <text x="215" y="63" fontSize="6" textAnchor="middle" fill="rgba(254,243,199,0.3)">Миз.</text>

        {/* === БУГРЫ === */}
        {/* Бугор Венеры — основание большого пальца (слева внизу) */}
        {renderMount("venus", 75, 295, 32, "#ec4899", "♀")}
        {/* Бугор Юпитера — под указательным */}
        {renderMount("jupiter", 100, 175, 20, "#f59e0b", "♃")}
        {/* Бугор Сатурна — под средним */}
        {renderMount("saturn", 125, 175, 20, "#64748b", "♄")}
        {/* Бугор Аполлона — под безымянным */}
        {renderMount("apollo", 155, 175, 20, "#fbbf24", "☉")}
        {/* Бугор Меркурия — под мизинцем */}
        {renderMount("mercury", 185, 180, 18, "#60a5fa", "☿")}
        {/* Марс внутренний — между большим и указательным */}
        {renderMount("mars-positive", 88, 210, 16, "#dc2626", "♂")}
        {/* Марс внешний — под мизинцем с ребра */}
        {renderMount("mars-negative", 215, 215, 16, "#dc2626", "♂")}
        {/* Бугор Луны — справа внизу (противоположно Венере) */}
        {renderMount("moon", 215, 300, 28, "#94a3b8", "☾")}
        {/* Равнина Марса — центр ладони */}
        {renderMount("mars-plane", 140, 240, 20, "#a78bfa", "◇")}

        {/* === ОСНОВНЫЕ ЛИНИИ === */}
        {renderLine("life")}
        {renderLine("head")}
        {renderLine("heart")}
        {renderLine("fate")}
        {renderLine("sun")}

        {/* === ДОПОЛНИТЕЛЬНЫЕ ЛИНИИ === */}
        {renderLine("mars", "3 2")}
        {renderLine("health", "3 2")}
        {renderLine("marriage", "none")}
        {renderLine("children", "1 1")}
        {renderLine("travel", "2 2")}
        {renderLine("intuition", "3 2")}
        {renderLine("girdle-venus", "3 2")}
        {renderLine("simian", "4 2")}
        {renderLine("ring-solomon", "3 2")}
        {renderLine("ring-saturn", "3 2")}

        {/* Подпись при наведении */}
        {hoveredItem && (
          <text x="150" y="408" fontSize="9" textAnchor="middle" fill="#fbbf24" fontWeight="bold">
            {(() => {
              const ml = palmLines.find(l => l.id === hoveredItem)
              if (ml) return ml.russianName
              const el = palmExtraLines.find(l => l.id === hoveredItem)
              if (el) return el.name
              const mt = palmMounts.find(m => m.id === hoveredItem)
              if (mt) return mt.name
              return ""
            })()}
          </text>
        )}

        {/* Запястье */}
        <line x1="120" y1="362" x2="180" y2="362" stroke="rgba(251,191,36,0.15)" strokeWidth="1"/>
        <text x="150" y="378" fontSize="6" textAnchor="middle" fill="rgba(254,243,199,0.2)">запястье</text>
      </svg>
    )
  }

  const reset = () => {
    setSelectedMainLine(null)
    setSelectedVariation(null)
    setSelectedExtraLine(null)
    setSelectedMount(null)
    setSelectedHandType(null)
  }

  // SVG-силуэт типа руки
  const renderHandTypeSVG = (ht: HandType) => {
    const color = ht.element === "Земля" ? "#a3e635"
      : ht.element === "Воздух" ? "#7dd3fc"
      : ht.element === "Огонь" ? "#fb923c" : "#60a5fa"
    const bg = ht.element === "Земля" ? "rgba(163,230,53,0.1)"
      : ht.element === "Воздух" ? "rgba(125,211,252,0.1)"
      : ht.element === "Огонь" ? "rgba(251,146,60,0.1)" : "rgba(96,165,250,0.1)"

    // Земная: квадратная ладонь, короткие пальцы
    if (ht.id === "earth") return (
      <path d="M 15 80 C 8 78 5 70 8 62 C 11 55 16 53 20 57 L 20 70
        M 24 70 L 24 45 C 24 38 28 33 31 33 C 34 33 36 38 36 45 L 36 70
        M 40 70 L 40 40 C 40 33 44 28 47 28 C 50 28 52 33 52 40 L 52 70
        M 56 70 L 56 48 C 56 42 60 38 63 38 C 66 38 68 42 68 48 L 68 70
        M 72 70 L 72 55 C 72 51 75 48 78 48 C 81 48 83 51 83 55 L 83 65
        C 85 72 85 80 83 88 C 81 96 74 100 66 101 L 24 101 C 16 100 11 93 10 82 C 9 75 12 72 15 80 Z"
        fill={bg} stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
    )
    // Воздушная: квадратная ладонь, длинные пальцы
    if (ht.id === "air") return (
      <path d="M 15 85 C 8 83 5 75 8 67 C 11 60 16 58 20 62 L 20 85
        M 24 85 L 24 40 C 24 30 28 22 31 22 C 34 22 36 30 36 40 L 36 85
        M 40 85 L 40 32 C 40 20 44 12 47 12 C 50 12 52 20 52 32 L 52 85
        M 56 85 L 56 42 C 56 32 60 25 63 25 C 66 25 68 32 68 42 L 68 85
        M 72 85 L 72 55 C 72 50 75 46 78 46 C 81 46 83 50 83 55 L 83 68
        C 85 76 85 86 83 94 C 81 102 74 106 66 107 L 24 107 C 16 106 11 99 10 88 C 9 80 12 78 15 85 Z"
        fill={bg} stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
    )
    // Огненная: длинная ладонь, короткие пальцы
    if (ht.id === "fire") return (
      <path d="M 12 90 C 5 88 2 78 5 70 C 8 62 13 60 17 64 L 17 80
        M 21 80 L 21 52 C 21 45 25 40 28 40 C 31 40 33 45 33 52 L 33 80
        M 37 80 L 37 46 C 37 39 41 34 44 34 C 47 34 49 39 49 46 L 49 80
        M 53 80 L 53 54 C 53 47 57 43 60 43 C 63 43 65 47 65 54 L 65 80
        M 69 80 L 69 62 C 69 57 72 54 75 54 C 78 54 80 57 80 62 L 80 72
        C 82 82 82 94 80 104 C 78 114 70 120 60 121 L 18 121 C 8 120 2 110 1 96 C 0 84 5 88 12 90 Z"
        fill={bg} stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
    )
    // Водная: длинная ладонь, длинные пальцы
    return (
      <path d="M 12 95 C 5 93 2 83 5 75 C 8 67 13 65 17 69 L 17 85
        M 21 85 L 21 42 C 21 32 25 24 28 24 C 31 24 33 32 33 42 L 33 85
        M 37 85 L 37 35 C 37 23 41 15 44 15 C 47 15 49 23 49 35 L 49 85
        M 53 85 L 53 46 C 53 36 57 29 60 29 C 63 29 65 36 65 46 L 65 85
        M 69 85 L 69 60 C 69 55 72 51 75 51 C 78 51 80 55 80 60 L 80 72
        C 82 82 82 96 80 108 C 78 120 70 126 60 127 L 18 127 C 8 126 2 116 1 102 C 0 88 5 92 12 95 Z"
        fill={bg} stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
    )
  }

  return (
    <div>
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-amber-100 mb-2" style={{ fontFamily: "var(--font-cinzel)" }}>
          Интерактивная хиромантия
        </h3>
        <p className="text-sm text-amber-200/70 max-w-xl mx-auto">
          Нажмите на линию или бугор на ладони. Выберите режим — основные линии,
          дополнительные линии, бугры или тип руки.
        </p>
      </div>

      {/* Режимы */}
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        <Button variant={mode === "main-lines" ? "default" : "outline"} size="sm"
          onClick={() => { setMode("main-lines"); reset() }}
          className={mode === "main-lines" ? "btn-gold" : "border-amber-400/40 text-amber-200 hover:bg-amber-400/10"}>
          <Hand className="w-3.5 h-3.5 mr-1"/> Основные (5)
        </Button>
        <Button variant={mode === "extra-lines" ? "default" : "outline"} size="sm"
          onClick={() => { setMode("extra-lines"); reset() }}
          className={mode === "extra-lines" ? "btn-gold" : "border-amber-400/40 text-amber-200 hover:bg-amber-400/10"}>
          ✦ Доп. линии (10)
        </Button>
        <Button variant={mode === "mounts" ? "default" : "outline"} size="sm"
          onClick={() => { setMode("mounts"); reset() }}
          className={mode === "mounts" ? "btn-gold" : "border-amber-400/40 text-amber-200 hover:bg-amber-400/10"}>
          ⬤ Бугры (9)
        </Button>
        <Button variant={mode === "hand-type" ? "default" : "outline"} size="sm"
          onClick={() => { setMode("hand-type"); reset() }}
          className={mode === "hand-type" ? "btn-gold" : "border-amber-400/40 text-amber-200 hover:bg-amber-400/10"}>
          ✋ Тип руки (4)
        </Button>
      </div>

      {/* Подсказка */}
      <div className="text-center mb-4">
        <Badge variant="outline" className="border-amber-400/30 text-amber-200/70 text-xs">
          <Info className="w-3 h-3 mr-1"/>
          {mode === "main-lines" && "Нажмите на одну из 5 линий на ладони слева"}
          {mode === "extra-lines" && "Нажмите на пунктирную линию или выберите из списка справа"}
          {mode === "mounts" && "Нажмите на цветной круг-бугор на ладони"}
          {mode === "hand-type" && "Выберите тип вашей ладони"}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Левая колонка — ладонь или типы рук */}
        <div>
          {mode !== "hand-type" ? (
            <Card className="glass-mystic border-amber-400/30">
              <CardContent className="pt-6">
                {renderInteractivePalm()}
                {/* Легенда */}
                <div className="mt-4 space-y-1 text-xs text-amber-200/60">
                  {mode === "main-lines" && (
                    <>
                      <div className="flex items-center gap-2"><div className="w-4 h-0.5 bg-amber-300"/> Основные линии</div>
                      <div>Жизни · Головы · Сердца · Судьбы · Солнца</div>
                    </>
                  )}
                  {mode === "extra-lines" && (
                    <>
                      <div className="flex items-center gap-2"><div className="w-4 h-0.5 bg-amber-300 opacity-50"/> Дополнительные линии (10)</div>
                      <div>Марса · Здоровья · Брака · Детей · Путешествий · Интуиции</div>
                      <div>Кольцо Венеры · Симианская · Кольцо Соломона · Кольцо Сатурна</div>
                    </>
                  )}
                  {mode === "mounts" && (
                    <>
                      <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-pink-400/30"/> Бугры ладони</div>
                      <div>Венеры · Юпитера · Сатурна · Аполлона · Меркурия · Луны · Марса</div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            /* Типы рук с SVG-силуэтами */
            <div className="space-y-3">
              {handTypes.map((ht) => {
                const elementColor = ht.element === "Земля" ? "#a3e635"
                  : ht.element === "Воздух" ? "#7dd3fc"
                  : ht.element === "Огонь" ? "#fb923c" : "#60a5fa"
                const elementBg = ht.element === "Земля" ? "rgba(163,230,53,0.1)"
                  : ht.element === "Воздух" ? "rgba(125,211,252,0.1)"
                  : ht.element === "Огонь" ? "rgba(251,146,60,0.1)" : "rgba(96,165,250,0.1)"
                return (
                  <button key={ht.id} onClick={() => setSelectedHandType(ht)}
                    className={`w-full text-left glass-card rounded-xl p-4 transition-all border-2 ${
                      selectedHandType?.id === ht.id ? "border-amber-400/60 scale-[1.02]" : "border-amber-400/20 hover:border-amber-400/40"
                    }`}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-14 h-16 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: elementBg, border: `1px solid ${elementColor}40` }}>
                        <svg viewBox="0 0 90 130" className="w-10 h-14">
                          {renderHandTypeSVG(ht)}
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-amber-100">{ht.name}</h4>
                        <Badge variant="outline" className="text-xs mt-1" style={{
                          backgroundColor: elementBg, color: elementColor, borderColor: `${elementColor}40`,
                        }}>{ht.element}</Badge>
                      </div>
                    </div>
                    <p className="text-xs text-amber-200/70">{ht.description}</p>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Правая колонка — интерпретация */}
        <div className="space-y-4">
          {/* Основные линии */}
          {mode === "main-lines" && !selectedMainLine && (
            <Card className="glass-card border-amber-400/20">
              <CardContent className="pt-5 text-center">
                <Hand className="w-10 h-10 text-amber-300/50 mx-auto mb-2"/>
                <p className="text-sm text-amber-200/70">Нажмите на одну из 5 линий на ладони слева.</p>
              </CardContent>
            </Card>
          )}

          {mode === "main-lines" && selectedMainLine && selectedVariation === null && (
            <>
              <Card className="glass-mystic border-amber-400/40">
                <CardContent className="pt-5">
                  <Badge variant="outline" className="border-amber-400/40 text-amber-200 text-xs mb-2">
                    {selectedMainLine.element} · {selectedMainLine.principle}
                  </Badge>
                  <h3 className="text-xl font-bold text-gold-gradient mb-2" style={{ fontFamily: "var(--font-cinzel)" }}>
                    {selectedMainLine.russianName}
                  </h3>
                  <p className="text-xs text-amber-200/60 mb-3">{selectedMainLine.location}</p>
                  <p className="text-sm text-amber-100/85 leading-relaxed">{selectedMainLine.psychology}</p>
                </CardContent>
              </Card>
              <p className="text-sm text-amber-200/80 mb-2">Выберите вариант вашей линии:</p>
              <div className="space-y-2">
                {selectedMainLine.variations.map((v, i) => (
                  <button key={i} onClick={() => setSelectedVariation(i)}
                    className="w-full text-left glass-card rounded-xl p-3 hover:scale-[1.02] transition-all border-amber-400/20 hover:border-amber-400/50">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-amber-400/30 border border-amber-400/50 flex items-center justify-center text-xs font-bold text-amber-100 shrink-0">{i + 1}</div>
                      <div>
                        <h4 className="text-sm font-bold text-amber-100 mb-0.5">{v.type}</h4>
                        <p className="text-xs text-amber-200/60">{v.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <Button variant="outline" size="sm" onClick={() => setSelectedMainLine(null)} className="border-amber-400/40 text-amber-200 hover:bg-amber-400/10">
                <RotateCcw className="w-3 h-3 mr-1"/>Другая линия
              </Button>
            </>
          )}

          {mode === "main-lines" && selectedMainLine && selectedVariation !== null && (
            <>
              <Card className="glass-mystic border-amber-400/40">
                <CardContent className="pt-5">
                  <Badge variant="outline" className="border-amber-400/40 text-amber-200 text-xs mb-2">
                    {selectedMainLine.russianName}
                  </Badge>
                  <h3 className="text-xl font-bold text-gold-gradient mb-2" style={{ fontFamily: "var(--font-cinzel)" }}>
                    {selectedMainLine.variations[selectedVariation].type}
                  </h3>
                  <p className="text-sm text-amber-100/85 leading-relaxed mb-4">{selectedMainLine.variations[selectedVariation].psychology}</p>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="glass-card rounded-lg p-3">
                      <div className="text-xs text-emerald-300 mb-1">✦ Силы</div>
                      <ul className="text-xs text-amber-100/80 space-y-0.5">
                        {selectedMainLine.variations[selectedVariation].strengths.map((s, i) => <li key={i}>• {s}</li>)}
                      </ul>
                    </div>
                    <div className="glass-card rounded-lg p-3">
                      <div className="text-xs text-rose-300 mb-1">✦ Тень</div>
                      <ul className="text-xs text-amber-100/80 space-y-0.5">
                        {selectedMainLine.variations[selectedVariation].challenges.map((c, i) => <li key={i}>• {c}</li>)}
                      </ul>
                    </div>
                  </div>
                  <div className="glass-card rounded-lg p-3 border-purple-400/20">
                    <div className="text-xs text-purple-300 mb-1">✦ Аффирмация</div>
                    <p className="text-sm italic text-amber-100/90">{selectedMainLine.variations[selectedVariation].affirmation}</p>
                  </div>
                </CardContent>
              </Card>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setSelectedVariation(null)} className="border-amber-400/40 text-amber-200 hover:bg-amber-400/10">
                  <RotateCcw className="w-3 h-3 mr-1"/>Другой вариант
                </Button>
                <Button variant="outline" size="sm" onClick={() => { setSelectedMainLine(null); setSelectedVariation(null) }} className="border-amber-400/40 text-amber-200 hover:bg-amber-400/10">
                  <Hand className="w-3 h-3 mr-1"/>Другая линия
                </Button>
              </div>
            </>
          )}

          {/* Дополнительные линии */}
          {mode === "extra-lines" && !selectedExtraLine && (
            <Card className="glass-card border-amber-400/20">
              <CardContent className="pt-5">
                <p className="text-sm text-amber-200/70 mb-3">Нажмите на линию на ладони или выберите из списка:</p>
                <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                  {palmExtraLines.map((el) => (
                    <button key={el.id} onClick={() => setSelectedExtraLine(el)}
                      className="w-full text-left glass-card rounded-lg p-2.5 hover:scale-[1.02] transition-all border-amber-400/15 hover:border-amber-400/40">
                      <div className="text-sm font-medium text-amber-100">{el.name}</div>
                      <div className="text-xs text-amber-200/50">{el.location}</div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {mode === "extra-lines" && selectedExtraLine && (
            <Card className="glass-mystic border-amber-400/40">
              <CardContent className="pt-5">
                <Badge variant="outline" className="border-amber-400/40 text-amber-200 text-xs mb-2">{selectedExtraLine.location}</Badge>
                <h3 className="text-xl font-bold text-gold-gradient mb-2" style={{ fontFamily: "var(--font-cinzel)" }}>{selectedExtraLine.name}</h3>
                <p className="text-xs text-amber-200/60 mb-3">{selectedExtraLine.meaning}</p>
                <p className="text-sm text-amber-100/85 leading-relaxed mb-4">{selectedExtraLine.psychology}</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="glass-card rounded-lg p-3 border-emerald-400/20">
                    <div className="text-xs text-emerald-300 mb-1">Если есть:</div>
                    <p className="text-xs text-amber-100/80">{selectedExtraLine.presence}</p>
                  </div>
                  <div className="glass-card rounded-lg p-3 border-slate-400/20">
                    <div className="text-xs text-slate-300 mb-1">Если нет:</div>
                    <p className="text-xs text-amber-100/80">{selectedExtraLine.absence}</p>
                  </div>
                </div>
              </CardContent>
              <div className="px-5 pb-4">
                <Button variant="outline" size="sm" onClick={() => setSelectedExtraLine(null)} className="border-amber-400/40 text-amber-200 hover:bg-amber-400/10">
                  <RotateCcw className="w-3 h-3 mr-1"/>Другая линия
                </Button>
              </div>
            </Card>
          )}

          {/* Бугры */}
          {mode === "mounts" && !selectedMount && (
            <Card className="glass-card border-amber-400/20">
              <CardContent className="pt-5">
                <p className="text-sm text-amber-200/70 mb-3">Нажмите на круг-бугор на ладони или выберите из списка:</p>
                <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                  {palmMounts.map((m) => (
                    <button key={m.id} onClick={() => setSelectedMount(m)}
                      className="w-full text-left glass-card rounded-lg p-2.5 hover:scale-[1.02] transition-all border-amber-400/15 hover:border-amber-400/40">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-amber-300">{m.planet}</span>
                        <span className="text-sm font-medium text-amber-100">{m.name}</span>
                      </div>
                      <div className="text-xs text-amber-200/50">{m.location}</div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {mode === "mounts" && selectedMount && (
            <Card className="glass-mystic border-amber-400/40">
              <CardContent className="pt-5">
                <Badge variant="outline" className="border-amber-400/40 text-amber-200 text-xs mb-2">{selectedMount.planet} · {selectedMount.finger}</Badge>
                <h3 className="text-xl font-bold text-gold-gradient mb-2" style={{ fontFamily: "var(--font-cinzel)" }}>{selectedMount.name}</h3>
                <p className="text-xs text-amber-200/60 mb-3">{selectedMount.location}</p>
                <p className="text-sm text-amber-100/85 leading-relaxed mb-4">{selectedMount.psychology}</p>
                <div className="flex flex-wrap gap-2">
                  {selectedMount.qualities.map((q, i) => (
                    <Badge key={i} variant="outline" className="border-amber-400/30 text-amber-200 text-xs">{q}</Badge>
                  ))}
                </div>
              </CardContent>
              <div className="px-5 pb-4">
                <Button variant="outline" size="sm" onClick={() => setSelectedMount(null)} className="border-amber-400/40 text-amber-200 hover:bg-amber-400/10">
                  <RotateCcw className="w-3 h-3 mr-1"/>Другой бугор
                </Button>
              </div>
            </Card>
          )}

          {/* Тип руки */}
          {mode === "hand-type" && !selectedHandType && (
            <Card className="glass-card border-amber-400/20">
              <CardContent className="pt-5 text-center">
                <p className="text-sm text-amber-200/70">Выберите тип вашей ладони слева по форме и длине пальцев.</p>
              </CardContent>
            </Card>
          )}

          {mode === "hand-type" && selectedHandType && (
            <Card className="glass-mystic border-amber-400/40">
              <CardContent className="pt-5">
                <Badge variant="outline" className="text-xs mb-2 border" style={{
                  backgroundColor: selectedHandType.element === "Земля" ? "rgba(163,230,53,0.15)"
                    : selectedHandType.element === "Воздух" ? "rgba(125,211,252,0.15)"
                    : selectedHandType.element === "Огонь" ? "rgba(251,146,60,0.15)" : "rgba(96,165,250,0.15)",
                  color: selectedHandType.element === "Земля" ? "#a3e635"
                    : selectedHandType.element === "Воздух" ? "#7dd3fc"
                    : selectedHandType.element === "Огонь" ? "#fb923c" : "#60a5fa",
                  borderColor: selectedHandType.element === "Земля" ? "rgba(163,230,53,0.4)"
                    : selectedHandType.element === "Воздух" ? "rgba(125,211,252,0.4)"
                    : selectedHandType.element === "Огонь" ? "rgba(251,146,60,0.4)" : "rgba(96,165,250,0.4)",
                }}>{selectedHandType.element}</Badge>
                <h3 className="text-xl font-bold text-gold-gradient mb-2" style={{ fontFamily: "var(--font-cinzel)" }}>{selectedHandType.name}</h3>
                <p className="text-xs text-amber-200/60 mb-3">{selectedHandType.palmShape} ладонь · {selectedHandType.fingerLength} пальцы</p>
                <p className="text-sm text-amber-100/85 leading-relaxed mb-4">{selectedHandType.psychology}</p>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="glass-card rounded-lg p-3 border-emerald-400/20">
                    <div className="text-xs text-emerald-300 mb-1">✦ Силы</div>
                    <ul className="text-xs text-amber-100/80 space-y-0.5">
                      {selectedHandType.strengths.map((s, i) => <li key={i}>• {s}</li>)}
                    </ul>
                  </div>
                  <div className="glass-card rounded-lg p-3 border-rose-400/20">
                    <div className="text-xs text-rose-300 mb-1">✦ Тень</div>
                    <ul className="text-xs text-amber-100/80 space-y-0.5">
                      {selectedHandType.challenges.map((c, i) => <li key={i}>• {c}</li>)}
                    </ul>
                  </div>
                </div>
                <div className="glass-card rounded-lg p-3">
                  <div className="text-xs text-amber-300 mb-1">💼 Карьера</div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedHandType.careers.map((c, i) => (
                      <Badge key={i} variant="outline" className="text-xs border-amber-400/30 text-amber-200">{c}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <div className="px-5 pb-4">
                <Button variant="outline" size="sm" onClick={() => setSelectedHandType(null)} className="border-amber-400/40 text-amber-200 hover:bg-amber-400/10">
                  <RotateCcw className="w-3 h-3 mr-1"/>Другой тип
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
