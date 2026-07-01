"use client"

import { useState } from "react"
import { colorArchetypes, type ColorArchetype } from "@/lib/psychology-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Sparkles, Palette, RotateCcw, ArrowRight, CheckCircle2 } from "lucide-react"

type SceneType = "landscape" | "mandala" | "gradient" | "time" | "element" | "flower" | "pattern"

interface QuizOption {
  label: string
  sceneType: SceneType
  palette: string[]
  colors: string[]
}

interface QuizQuestion {
  question: string
  subtitle?: string
  options: QuizOption[]
}

// 8 вопросов × 4 варианта = 32 SVG-сцены
const quizQuestions: QuizQuestion[] = [
  {
    question: "Выберите пейзаж, который вас притягивает",
    subtitle: "Не думайте — выбирайте первое, что откликнулось",
    options: [
      { label: "Закат над океаном", sceneType: "landscape", palette: ["#dc2626", "#ea580c", "#ca8a04"], colors: ["#dc2626", "#ea580c", "#ca8a04"] },
      { label: "Туманный лес на рассвете", sceneType: "landscape", palette: ["#94a3b8", "#16a34a", "#0891b2"], colors: ["#94a3b8", "#16a34a"] },
      { label: "Горные вершины в сумерках", sceneType: "landscape", palette: ["#1d4ed8", "#7c3aed", "#0f172a"], colors: ["#1d4ed8", "#7c3aed"] },
      { label: "Заснеженная равнина", sceneType: "landscape", palette: ["#fef3c7", "#0891b2", "#94a3b8"], colors: ["#fef3c7", "#0891b2"] },
    ],
  },
  {
    question: "Какая атмосфера вам ближе?",
    subtitle: "Представьте себя в этом месте",
    options: [
      { label: "Тепло костра", sceneType: "element", palette: ["#dc2626", "#ea580c", "#fbbf24"], colors: ["#dc2626", "#ea580c"] },
      { label: "Сад после дождя", sceneType: "element", palette: ["#16a34a", "#94a3b8", "#0891b2"], colors: ["#16a34a", "#94a3b8"] },
      { label: "Старая библиотека", sceneType: "element", palette: ["#ca8a04", "#fbbf24", "#92400e"], colors: ["#ca8a04"] },
      { label: "Лунная дорожка на воде", sceneType: "element", palette: ["#94a3b8", "#0891b2", "#0f172a"], colors: ["#94a3b8", "#0891b2", "#0f172a"] },
    ],
  },
  {
    question: "Выберите мандалу",
    subtitle: "Какая из них резонирует с вашим внутренним состоянием?",
    options: [
      { label: "Огненная", sceneType: "mandala", palette: ["#dc2626", "#ea580c", "#fbbf24"], colors: ["#dc2626", "#ea580c", "#fbbf24"] },
      { label: "Цветочная", sceneType: "mandala", palette: ["#16a34a", "#ec4899", "#fbbf24"], colors: ["#16a34a", "#ec4899"] },
      { label: "Космическая", sceneType: "mandala", palette: ["#1d4ed8", "#7c3aed", "#94a3b8"], colors: ["#1d4ed8", "#7c3aed", "#94a3b8"] },
      { label: "Кристальная", sceneType: "mandala", palette: ["#fef3c7", "#0891b2", "#94a3b8"], colors: ["#fef3c7", "#0891b2"] },
    ],
  },
  {
    question: "Какой градиент резонирует с вашим состоянием?",
    subtitle: "Выберите цветовой поток",
    options: [
      { label: "Тёплый — от красного к жёлтому", sceneType: "gradient", palette: ["#dc2626", "#ea580c", "#fbbf24"], colors: ["#dc2626", "#ea580c", "#fbbf24"] },
      { label: "Природный — от зелёного к голубому", sceneType: "gradient", palette: ["#16a34a", "#0891b2"], colors: ["#16a34a", "#0891b2"] },
      { label: "Глубокий — от синего к фиолетовому", sceneType: "gradient", palette: ["#1d4ed8", "#7c3aed"], colors: ["#1d4ed8", "#7c3aed"] },
      { label: "Контрастный — от чёрного к белому", sceneType: "gradient", palette: ["#0f172a", "#94a3b8", "#fef3c7"], colors: ["#0f172a", "#94a3b8", "#fef3c7"] },
    ],
  },
  {
    question: "Выберите время суток",
    subtitle: "Когда вы чувствуете себя наиболее живым(ой)?",
    options: [
      { label: "Рассвет", sceneType: "time", palette: ["#ec4899", "#ca8a04", "#ea580c"], colors: ["#ec4899", "#ca8a04", "#ea580c"] },
      { label: "Полдень", sceneType: "time", palette: ["#fbbf24", "#0891b2", "#fef3c7"], colors: ["#fbbf24", "#0891b2"] },
      { label: "Сумерки", sceneType: "time", palette: ["#ea580c", "#7c3aed", "#0f172a"], colors: ["#ea580c", "#7c3aed"] },
      { label: "Полночь", sceneType: "time", palette: ["#0f172a", "#94a3b8", "#1d4ed8"], colors: ["#0f172a", "#94a3b8", "#1d4ed8"] },
    ],
  },
  {
    question: "Какая стихия вам ближе?",
    subtitle: "Выберите элемент, с которым чувствуете связь",
    options: [
      { label: "Огонь", sceneType: "element", palette: ["#dc2626", "#ea580c", "#fbbf24"], colors: ["#dc2626", "#ea580c"] },
      { label: "Земля", sceneType: "element", palette: ["#16a34a", "#ca8a04", "#92400e"], colors: ["#16a34a", "#ca8a04"] },
      { label: "Воздух", sceneType: "element", palette: ["#fbbf24", "#fef3c7", "#0891b2"], colors: ["#fbbf24", "#fef3c7", "#0891b2"] },
      { label: "Вода", sceneType: "element", palette: ["#0891b2", "#1d4ed8", "#94a3b8"], colors: ["#0891b2", "#1d4ed8", "#94a3b8"] },
    ],
  },
  {
    question: "Выберите цветок",
    subtitle: "Какой из них символизирует вашу внутреннюю суть?",
    options: [
      { label: "Алая роза", sceneType: "flower", palette: ["#dc2626", "#ec4899", "#16a34a"], colors: ["#dc2626", "#ec4899"] },
      { label: "Подсолнух", sceneType: "flower", palette: ["#fbbf24", "#ca8a04", "#16a34a"], colors: ["#fbbf24", "#ca8a04"] },
      { label: "Лотос", sceneType: "flower", palette: ["#ec4899", "#7c3aed", "#fef3c7"], colors: ["#ec4899", "#7c3aed", "#fef3c7"] },
      { label: "Колокольчик", sceneType: "flower", palette: ["#0891b2", "#7c3aed", "#16a34a"], colors: ["#0891b2", "#7c3aed"] },
    ],
  },
  {
    question: "Какой узор вам приятнее?",
    subtitle: "Последний вопрос — выберите орнамент",
    options: [
      { label: "Геометрический огненный", sceneType: "pattern", palette: ["#dc2626", "#ea580c", "#fbbf24"], colors: ["#dc2626", "#ea580c", "#fbbf24"] },
      { label: "Растительный орнамент", sceneType: "pattern", palette: ["#16a34a", "#0891b2", "#ca8a04"], colors: ["#16a34a"] },
      { label: "Звёздное небо", sceneType: "pattern", palette: ["#0f172a", "#94a3b8", "#1d4ed8"], colors: ["#0f172a", "#94a3b8", "#1d4ed8"] },
      { label: "Морские волны", sceneType: "pattern", palette: ["#0891b2", "#16a34a", "#94a3b8"], colors: ["#0891b2", "#16a34a"] },
    ],
  },
]

// === Рендер SVG-сцен ===
function renderScene(option: QuizOption, idx: number) {
  const { sceneType, palette } = option
  const [c1, c2, c3] = palette
  const uid = `q${idx}`

  switch (sceneType) {
    case "landscape":
      return (
        <svg viewBox="0 0 200 120" className="w-full h-full">
          <defs>
            <linearGradient id={`sky-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={c1}/>
              <stop offset="100%" stopColor={c2}/>
            </linearGradient>
          </defs>
          <rect width="200" height="85" fill={`url(#sky-${uid})`}/>
          <circle cx="100" cy="50" r="20" fill={c3 || c1} opacity="0.85"/>
          {sceneType === "landscape" && (c1 === "#dc2626" || c1 === "#ea580c") && (
            <circle cx="100" cy="50" r="28" fill={c1} opacity="0.2"/>
          )}
          <rect y="85" width="200" height="35" fill={c2} opacity="0.5"/>
          <ellipse cx="100" cy="95" rx="35" ry="3" fill={c3 || c1} opacity="0.3"/>
        </svg>
      )

    case "mandala":
      return (
        <svg viewBox="0 0 120 120" className="w-full h-full">
          <circle cx="60" cy="60" r="52" fill="none" stroke={c1} strokeWidth="1.5" opacity="0.5"/>
          <circle cx="60" cy="60" r="42" fill="none" stroke={c2} strokeWidth="1" opacity="0.4" strokeDasharray="2 2"/>
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i / 8) * Math.PI * 2
            const x = 60 + Math.cos(a) * 28
            const y = 60 + Math.sin(a) * 28
            return (
              <ellipse
                key={i}
                cx={x} cy={y} rx="14" ry="7"
                fill={palette[i % palette.length]}
                opacity="0.7"
                transform={`rotate(${(a * 180 / Math.PI) + 90} ${x} ${y})`}
              />
            )
          })}
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i / 8) * Math.PI * 2 + Math.PI / 8
            return (
              <circle
                key={i}
                cx={60 + Math.cos(a) * 48}
                cy={60 + Math.sin(a) * 48}
                r="3"
                fill={palette[i % palette.length]}
                opacity="0.6"
              />
            )
          })}
          <circle cx="60" cy="60" r="12" fill={c3 || c1}/>
          <circle cx="60" cy="60" r="5" fill={c2}/>
        </svg>
      )

    case "gradient":
      return (
        <svg viewBox="0 0 200 100" className="w-full h-full">
          <defs>
            <linearGradient id={`grad-${uid}`} x1="0" y1="0" x2="1" y2="0">
              {palette.map((c, i) => (
                <stop key={i} offset={`${(i / (palette.length - 1)) * 100}%`} stopColor={c}/>
              ))}
            </linearGradient>
          </defs>
          <rect width="200" height="100" fill={`url(#grad-${uid})`} rx="8"/>
          {/* Декоративные блики */}
          <ellipse cx="50" cy="30" rx="30" ry="15" fill="rgba(255,255,255,0.15)"/>
          <ellipse cx="150" cy="70" rx="25" ry="12" fill="rgba(0,0,0,0.1)"/>
        </svg>
      )

    case "time":
      return (
        <svg viewBox="0 0 200 120" className="w-full h-full">
          <defs>
            <linearGradient id={`time-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={c1}/>
              <stop offset="60%" stopColor={c2 || c1}/>
              <stop offset="100%" stopColor={c3 || c2 || c1}/>
            </linearGradient>
          </defs>
          <rect width="200" height="120" fill={`url(#time-${uid})`} rx="8"/>
          {/* Светило */}
          {(() => {
            const isNight = c1 === "#0f172a"
            const cx = 100
            const cy = isNight ? 40 : 35
            return (
              <>
                <circle cx={cx} cy={cy} r="18" fill={isNight ? "#94a3b8" : "#fef3c7"} opacity="0.9"/>
                {!isNight && Array.from({ length: 8 }).map((_, i) => {
                  const a = (i / 8) * Math.PI * 2
                  return (
                    <line key={i} x1={cx + Math.cos(a) * 22} y1={cy + Math.sin(a) * 22}
                      x2={cx + Math.cos(a) * 28} y2={cy + Math.sin(a) * 28}
                      stroke="#fef3c7" strokeWidth="1.5" opacity="0.6"/>
                  )
                })}
                {isNight && (
                  <circle cx={cx + 5} cy={cy - 3} r="14" fill={c1} opacity="0.8"/>
                )}
              </>
            )
          })()}
          {/* Горизонт */}
          <rect y="85" width="200" height="35" fill={c3 || c2 || c1} opacity="0.4" rx="0 0 8 8"/>
        </svg>
      )

    case "element":
      return (
        <svg viewBox="0 0 120 120" className="w-full h-full">
          <rect width="120" height="120" fill="rgba(26,10,58,0.3)" rx="8"/>
          {(() => {
            const isFire = c1 === "#dc2626" || c1 === "#ea580c"
            const isWater = c1 === "#0891b2" || c1 === "#94a3b8"
            const isEarth = c1 === "#16a34a" || c1 === "#ca8a04"
            const isAir = c1 === "#fbbf24" || c1 === "#fef3c7"

            if (isFire) {
              // Пламя
              return (
                <g>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <path
                      key={i}
                      d={`M ${30 + i * 15} 95 Q ${25 + i * 15} 60 ${35 + i * 15} 50 Q ${40 + i * 15} 40 ${30 + i * 15} 30 Q ${45 + i * 15} 35 ${42 + i * 15} 55 Q ${50 + i * 15} 65 ${40 + i * 15} 95 Z`}
                      fill={palette[i % palette.length]}
                      opacity={0.6 + i * 0.08}
                    />
                  ))}
                </g>
              )
            }
            if (isWater) {
              // Волны
              return (
                <g>
                  {Array.from({ length: 4 }).map((_, i) => (
                    <path
                      key={i}
                      d={`M 0 ${40 + i * 18} Q 30 ${30 + i * 18} 60 ${40 + i * 18} T 120 ${40 + i * 18}`}
                      fill="none"
                      stroke={palette[i % palette.length]}
                      strokeWidth="3"
                      opacity={0.5 + i * 0.1}
                    />
                  ))}
                  {/* Лунная дорожка */}
                  {c1 === "#94a3b8" && (
                    <ellipse cx="60" cy="30" rx="15" ry="8" fill="#fef3c7" opacity="0.3"/>
                  )}
                </g>
              )
            }
            if (isEarth) {
              // Листья / кристаллы
              return (
                <g>
                  {c1 === "#ca8a04" ? (
                    // Книги / библиотека
                    <>
                      {[40, 55, 70, 85].map((x, i) => (
                        <rect key={i} x={x} y={30 + (i % 2) * 5} width="10" height={60 - (i % 2) * 5}
                          fill={palette[i % palette.length]} opacity="0.7" rx="1"/>
                      ))}
                      <rect x="35" y="88" width="65" height="5" fill={c2} opacity="0.5"/>
                    </>
                  ) : (
                    // Растения
                    <>
                      {[30, 55, 80].map((x, i) => (
                        <g key={i}>
                          <line x1={x} y1="100" x2={x} y2={40 + i * 5} stroke={c1} strokeWidth="2"/>
                          <ellipse cx={x - 8} cy={50 + i * 5} rx="6" ry="12" fill={palette[i % palette.length]} opacity="0.7" transform={`rotate(-30 ${x - 8} ${50 + i * 5})`}/>
                          <ellipse cx={x + 8} cy={55 + i * 5} rx="6" ry="12" fill={palette[(i + 1) % palette.length]} opacity="0.7" transform={`rotate(30 ${x + 8} ${55 + i * 5})`}/>
                        </g>
                      ))}
                    </>
                  )}
                </g>
              )
            }
            // Воздух — спирали
            return (
              <g>
                {Array.from({ length: 3 }).map((_, i) => (
                  <path
                    key={i}
                    d={`M ${30 + i * 25} 90 Q ${20 + i * 25} 50 ${40 + i * 25} 30 Q ${55 + i * 25} 20 ${45 + i * 25} 50 Q ${35 + i * 25} 70 ${50 + i * 25} 80`}
                    fill="none"
                    stroke={palette[i % palette.length]}
                    strokeWidth="2.5"
                    opacity="0.7"
                    strokeLinecap="round"
                  />
                ))}
              </g>
            )
          })()}
        </svg>
      )

    case "flower":
      return (
        <svg viewBox="0 0 120 120" className="w-full h-full">
          <rect width="120" height="120" fill="rgba(26,10,58,0.2)" rx="8"/>
          {/* Стебель */}
          <line x1="60" y1="100" x2="60" y2="55" stroke="#16a34a" strokeWidth="2.5" opacity="0.6"/>
          {/* Листья */}
          <ellipse cx="50" cy="80" rx="8" ry="4" fill="#16a34a" opacity="0.5" transform="rotate(-30 50 80)"/>
          <ellipse cx="70" cy="75" rx="8" ry="4" fill="#16a34a" opacity="0.5" transform="rotate(30 70 75)"/>
          {/* Лепестки */}
          {Array.from({ length: 6 }).map((_, i) => {
            const a = (i / 6) * Math.PI * 2
            const x = 60 + Math.cos(a) * 16
            const y = 45 + Math.sin(a) * 16
            return (
              <ellipse
                key={i}
                cx={x} cy={y} rx="12" ry="8"
                fill={palette[i % palette.length]}
                opacity="0.75"
                transform={`rotate(${(a * 180 / Math.PI) + 90} ${x} ${y})`}
              />
            )
          })}
          {/* Центр */}
          <circle cx="60" cy="45" r="8" fill={c2 || c1}/>
          <circle cx="60" cy="45" r="4" fill={c3 || c2 || c1} opacity="0.8"/>
        </svg>
      )

    case "pattern":
      return (
        <svg viewBox="0 0 200 100" className="w-full h-full">
          <rect width="200" height="100" fill={c1} opacity="0.2" rx="8"/>
          {(() => {
            const isFire = c1 === "#dc2626" || c1 === "#ea580c"
            const isStars = c1 === "#0f172a"
            const isWaves = c1 === "#0891b2"

            if (isFire) {
              // Геометрические треугольники
              return (
                <g>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <polygon
                      key={i}
                      points={`${20 + i * 32},70 ${36 + i * 32},40 ${52 + i * 32},70`}
                      fill={palette[i % palette.length]}
                      opacity={0.5 + (i % 2) * 0.2}
                    />
                  ))}
                  {Array.from({ length: 5 }).map((_, i) => (
                    <polygon
                      key={`b${i}`}
                      points={`${30 + i * 35},90 ${45 + i * 35},65 ${60 + i * 35},90`}
                      fill={palette[(i + 1) % palette.length]}
                      opacity="0.4"
                    />
                  ))}
                </g>
              )
            }
            if (isStars) {
              // Звёздное небо
              return (
                <g>
                  {Array.from({ length: 20 }).map((_, i) => {
                    const x = (i * 37) % 200
                    const y = (i * 23) % 90 + 5
                    const r = (i % 3) + 1
                    return (
                      <circle key={i} cx={x} cy={y} r={r} fill={palette[i % palette.length]} opacity={0.4 + (i % 3) * 0.2}/>
                    )
                  })}
                  {/* Большая звезда */}
                  <path d="M 100 20 L 103 30 L 113 30 L 105 36 L 108 46 L 100 40 L 92 46 L 95 36 L 87 30 L 97 30 Z"
                    fill="#fef3c7" opacity="0.9"/>
                  {/* Луна */}
                  <circle cx="40" cy="25" r="10" fill="#94a3b8" opacity="0.6"/>
                </g>
              )
            }
            if (isWaves) {
              // Морские волны
              return (
                <g>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <path
                      key={i}
                      d={`M 0 ${15 + i * 17} Q 25 ${5 + i * 17} 50 ${15 + i * 17} T 100 ${15 + i * 17} T 150 ${15 + i * 17} T 200 ${15 + i * 17}`}
                      fill="none"
                      stroke={palette[i % palette.length]}
                      strokeWidth="2.5"
                      opacity={0.5 + i * 0.1}
                    />
                  ))}
                </g>
              )
            }
            // Растительный орнамент
            return (
              <g>
                {Array.from({ length: 5 }).map((_, i) => {
                  const x = 20 + i * 38
                  return (
                    <g key={i}>
                      <line x1={x} y1="90" x2={x} y2="30" stroke={palette[i % palette.length]} strokeWidth="2" opacity="0.6"/>
                      <circle cx={x} cy="25" r="6" fill={palette[i % palette.length]} opacity="0.6"/>
                      <ellipse cx={x - 7} cy="50" rx="5" ry="8" fill={palette[(i + 1) % palette.length]} opacity="0.5" transform={`rotate(-40 ${x - 7} 50)`}/>
                      <ellipse cx={x + 7} cy="60" rx="5" ry="8" fill={palette[(i + 2) % palette.length]} opacity="0.5" transform={`rotate(40 ${x + 7} 60)`}/>
                    </g>
                  )
                })}
              </g>
            )
          })()}
        </svg>
      )

    default:
      return null
  }
}

function findArchetype(hex: string): ColorArchetype | undefined {
  return colorArchetypes.find((c) => c.color === hex)
}

export function ColorQuiz() {
  const [currentQ, setCurrentQ] = useState(0)
  const [scores, setScores] = useState<Record<string, number>>({})
  const [showResult, setShowResult] = useState(false)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [started, setStarted] = useState(false)

  const totalQuestions = quizQuestions.length
  const question = quizQuestions[currentQ]

  const handleSelect = (option: QuizOption, optIdx: number) => {
    if (selectedOption !== null) return
    setSelectedOption(optIdx)

    const newScores = { ...scores }
    for (const color of option.colors) {
      newScores[color] = (newScores[color] || 0) + 1
    }
    setScores(newScores)

    setTimeout(() => {
      setSelectedOption(null)
      if (currentQ < totalQuestions - 1) {
        setCurrentQ(currentQ + 1)
      } else {
        setShowResult(true)
      }
    }, 600)
  }

  const handleRestart = () => {
    setCurrentQ(0)
    setScores({})
    setShowResult(false)
    setSelectedOption(null)
    setStarted(false)
  }

  // Расчёт результата
  const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1])
  const primaryHex = sortedScores[0]?.[0]
  const primaryScore = sortedScores[0]?.[1] || 0
  const secondaryHex = sortedScores[1]?.[0]
  const secondaryScore = sortedScores[1]?.[1] || 0
  const primaryArchetype = primaryHex ? findArchetype(primaryHex) : null
  const secondaryArchetype = secondaryHex ? findArchetype(secondaryHex) : null
  const hasSecondary = secondaryArchetype && secondaryScore >= primaryScore - 1
  const totalPoints = Object.values(scores).reduce((a, b) => a + b, 0) || 1

  // === Стартовый экран ===
  if (!started && !showResult) {
    return (
      <div>
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-amber-100 mb-2" style={{ fontFamily: "var(--font-cinzel)" }}>
            Архетип по цвету
          </h3>
          <p className="text-sm text-amber-200/70 max-w-xl mx-auto">
            Не просто выбор цвета — а путь из 8 вопросов с пейзажами, мандалами, градиентами
            и сценами. Ваш архетип складывается из суммы всех выбранных оттенков.
          </p>
        </div>

        <Card className="glass-mystic border-amber-400/30 mb-6 max-w-2xl mx-auto">
          <CardContent className="pt-6 text-center">
            <div className="flex justify-center gap-2 mb-4 flex-wrap">
              {colorArchetypes.slice(0, 6).map((c) => (
                <div
                  key={c.color}
                  className="w-10 h-10 rounded-full"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${c.color}, ${c.color}80)`,
                    boxShadow: `0 0 10px ${c.color}40`,
                    border: `1px solid ${c.color}60`,
                  }}
                />
              ))}
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-amber-300 text-sm">
                +6
              </div>
            </div>
            <p className="text-sm text-amber-100/80 mb-4 leading-relaxed">
              Вы пройдёте <strong className="text-amber-200">8 вопросов</strong>, выбирая
              визуальные сцены — пейзажи, мандалы, цветы, стихии. Каждый выбор добавляет
              очки к 1-3 цветовым архетипам. В конце вы узнаете свой доминирующий архетип
              и спектр всех выбранных оттенков.
            </p>
            <div className="grid grid-cols-3 gap-2 mb-4 text-xs text-amber-200/70">
              <div className="glass-card rounded-lg p-2">
                <div className="text-amber-300 font-bold">8</div>
                <div>вопросов</div>
              </div>
              <div className="glass-card rounded-lg p-2">
                <div className="text-amber-300 font-bold">32</div>
                <div>визуальных сцен</div>
              </div>
              <div className="glass-card rounded-lg p-2">
                <div className="text-amber-300 font-bold">12</div>
                <div>архетипов</div>
              </div>
            </div>
            <Button onClick={() => setStarted(true)} className="btn-gold px-8 py-3">
              <Sparkles className="w-5 h-5 mr-2"/>
              Начать цветовой тест
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // === Результат ===
  if (showResult && primaryArchetype) {
    return (
      <div className="max-w-3xl mx-auto animate-fade-in">
        {/* Спектр всех выбранных цветов */}
        <Card className="glass-mystic border-amber-400/40 mb-5">
          <CardContent className="pt-6">
            <div className="text-center mb-4">
              <div className="text-xs uppercase tracking-wider text-amber-300 mb-1">Ваш цветовой спектр</div>
              <p className="text-sm text-amber-200/70">Сумма всех выбранных оттенков за 8 вопросов</p>
            </div>
            {/* Спектр-бар */}
            <div className="flex h-6 rounded-full overflow-hidden mb-3">
              {sortedScores.map(([hex, score]) => {
                const archetype = findArchetype(hex)
                const width = (score / totalPoints) * 100
                return (
                  <div
                    key={hex}
                    style={{
                      width: `${width}%`,
                      background: hex,
                      minWidth: width > 5 ? "auto" : "2px",
                    }}
                    title={`${archetype?.name.split(" — ")[0]}: ${score} очков`}
                  />
                )
              })}
            </div>
            {/* Легенда спектра */}
            <div className="flex flex-wrap gap-2 justify-center">
              {sortedScores.slice(0, 6).map(([hex, score]) => {
                const archetype = findArchetype(hex)
                const pct = Math.round((score / totalPoints) * 100)
                return (
                  <Badge
                    key={hex}
                    variant="outline"
                    className="border text-xs"
                    style={{
                      backgroundColor: `${hex}20`,
                      color: hex,
                      borderColor: `${hex}50`,
                    }}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full inline-block mr-1.5"
                      style={{ background: hex }}
                    />
                    {archetype?.name.split(" — ")[0]} · {pct}%
                  </Badge>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Основной архетип */}
        <Card
          className="mb-5 relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${primaryArchetype.color}30, rgba(26,10,58,0.6))`,
            border: `1px solid ${primaryArchetype.color}60`,
          }}
        >
          <CardContent className="pt-6">
            <div className="flex items-center gap-4 mb-4">
              <div
                className="w-20 h-20 rounded-full shrink-0"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${primaryArchetype.color}, ${primaryArchetype.color}80)`,
                  boxShadow: `0 0 30px ${primaryArchetype.color}80`,
                  border: `2px solid ${primaryArchetype.color}`,
                }}
              />
              <div>
                <Badge variant="outline" className="text-xs mb-1 border" style={{
                  backgroundColor: `${primaryArchetype.color}20`,
                  color: primaryArchetype.color,
                  borderColor: `${primaryArchetype.color}50`,
                }}>
                  Основной архетип · {primaryScore} очков
                </Badge>
                <h3
                  className="text-2xl font-bold mb-1"
                  style={{ color: primaryArchetype.color, fontFamily: "var(--font-cinzel)" }}
                >
                  {primaryArchetype.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border text-xs" style={{
                    backgroundColor: `${primaryArchetype.color}20`,
                    color: primaryArchetype.color,
                    borderColor: `${primaryArchetype.color}50`,
                  }}>
                    {primaryArchetype.chakra}
                  </Badge>
                  <Badge variant="outline" className="border-amber-400/40 text-amber-200 text-xs">
                    {primaryArchetype.element}
                  </Badge>
                </div>
                <p className="text-amber-100/80 text-sm mt-1 italic">{primaryArchetype.energy}</p>
              </div>
            </div>
            <p className="text-amber-100/85 text-sm leading-relaxed">{primaryArchetype.psychology}</p>
          </CardContent>
        </Card>

        {/* Вторичный архетип */}
        {hasSecondary && secondaryArchetype && (
          <Card
            className="mb-5 relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${secondaryArchetype.color}20, rgba(26,10,58,0.5))`,
              border: `1px solid ${secondaryArchetype.color}40`,
            }}
          >
            <CardContent className="pt-5">
              <div className="flex items-center gap-3">
                <div
                  className="w-14 h-14 rounded-full shrink-0"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${secondaryArchetype.color}, ${secondaryArchetype.color}80)`,
                    boxShadow: `0 0 20px ${secondaryArchetype.color}60`,
                    border: `2px solid ${secondaryArchetype.color}`,
                  }}
                />
                <div className="flex-1">
                  <Badge variant="outline" className="text-xs mb-1 border" style={{
                    backgroundColor: `${secondaryArchetype.color}20`,
                    color: secondaryArchetype.color,
                    borderColor: `${secondaryArchetype.color}50`,
                  }}>
                    Вторичный архетип · {secondaryScore} очков
                  </Badge>
                  <h4
                    className="text-lg font-bold"
                    style={{ color: secondaryArchetype.color, fontFamily: "var(--font-cinzel)" }}
                  >
                    {secondaryArchetype.name}
                  </h4>
                  <p className="text-xs text-amber-200/70">{secondaryArchetype.chakra} · {secondaryArchetype.element}</p>
                </div>
              </div>
              <p className="text-xs text-amber-100/75 leading-relaxed mt-3">
                {secondaryArchetype.psychology.slice(0, 200)}...
              </p>
            </CardContent>
          </Card>
        )}

        {/* Силы и тень */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          <Card className="glass-card border-emerald-400/20">
            <CardHeader>
              <CardTitle className="text-base text-emerald-200">✦ Силы</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-1.5">
                {primaryArchetype.strengths.map((s, i) => (
                  <li key={i} className="text-xs text-amber-100/85 flex gap-2">
                    <span className="text-emerald-400">✦</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="glass-card border-rose-400/20">
            <CardHeader>
              <CardTitle className="text-base text-rose-200">✦ Тень</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-1.5">
                {primaryArchetype.challenges.map((c, i) => (
                  <li key={i} className="text-xs text-amber-100/85 flex gap-2">
                    <span className="text-rose-400">✦</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Путь роста + аффирмация */}
        <Card className="glass-card border-amber-400/20 mb-5">
          <CardContent className="pt-5">
            <div className="text-xs text-amber-300/70 mb-1">🌱 Путь роста</div>
            <p className="text-sm text-amber-100/85">{primaryArchetype.path}</p>
          </CardContent>
        </Card>

        <Card className="glass-mystic border-purple-400/30 mb-5">
          <CardContent className="pt-5">
            <div className="text-xs text-purple-300 mb-1">✦ Аффирмация</div>
            <p className="text-lg italic text-amber-100 text-center">{primaryArchetype.affirmation}</p>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button onClick={handleRestart} className="btn-gold px-8 py-3">
            <RotateCcw className="w-5 h-5 mr-2"/>
            Пройти заново
          </Button>
        </div>
      </div>
    )
  }

  // === Вопрос ===
  return (
    <div className="max-w-3xl mx-auto">
      {/* Прогресс */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-amber-200/60 mb-2">
          <span>Вопрос {currentQ + 1} из {totalQuestions}</span>
          <span>{Math.round(((currentQ) / totalQuestions) * 100)}%</span>
        </div>
        <Progress value={(currentQ / totalQuestions) * 100} className="bg-purple-950/60"/>
      </div>

      {/* Заголовок вопроса */}
      <div className="text-center mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-amber-100 mb-1" style={{ fontFamily: "var(--font-cinzel)" }}>
          {question.question}
        </h3>
        {question.subtitle && (
          <p className="text-sm text-amber-200/60">{question.subtitle}</p>
        )}
      </div>

      {/* Варианты ответов */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {question.options.map((option, i) => (
          <button
            key={i}
            onClick={() => handleSelect(option, i)}
            disabled={selectedOption !== null}
            className={`group rounded-2xl overflow-hidden transition-all border-2 ${
              selectedOption === i
                ? "scale-105 border-amber-400 shadow-lg shadow-amber-400/20"
                : selectedOption !== null
                ? "opacity-40 border-amber-400/10"
                : "border-amber-400/20 hover:border-amber-400/50 hover:scale-[1.02] cursor-pointer"
            }`}
            style={{
              background: "rgba(26,10,58,0.5)",
            }}
          >
            {/* SVG-сцена */}
            <div className="aspect-[5/3] w-full overflow-hidden">
              {renderScene(option, currentQ * 4 + i)}
            </div>
            {/* Подпись */}
            <div className="p-2 sm:p-3 flex items-center justify-between gap-2">
              <span className="text-xs sm:text-sm text-amber-100/90 font-medium text-left">
                {option.label}
              </span>
              {selectedOption === i && (
                <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0"/>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Индикатор ожидания */}
      {selectedOption !== null && (
        <div className="text-center mt-4">
          <p className="text-sm text-amber-200/60 animate-pulse" style={{ fontFamily: "var(--font-cormorant)" }}>
            {currentQ < totalQuestions - 1 ? "Переходим к следующему вопросу..." : "Подсчёт результатов..."}
          </p>
        </div>
      )}
    </div>
  )
}
