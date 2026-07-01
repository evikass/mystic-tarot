"use client"

import { useState } from "react"
import { geometryArchetypes, type GeometryArchetype } from "@/lib/psychology-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Sparkles, Hexagon, RotateCcw, CheckCircle2 } from "lucide-react"

type SceneType =
  | "symbol"
  | "object"
  | "nature"
  | "abstract"
  | "movement"
  | "light"
  | "structure"
  | "energy"

interface QuizOption {
  label: string
  sceneType: SceneType
  shapes: GeometryArchetype["shape"][]
  primaryShape: GeometryArchetype["shape"]
  palette: string[]
}

interface QuizQuestion {
  question: string
  subtitle?: string
  options: QuizOption[]
}

// Палитры для разных настроений
const P = {
  gold: "#fbbf24",
  purple: "#7c3aed",
  cyan: "#0891b2",
  emerald: "#16a34a",
  rose: "#ec4899",
  slate: "#94a3b8",
  amber: "#ea580c",
  blue: "#1d4ed8",
}

// 8 вопросов × 4 варианта = 32 SVG-сцены
const quizQuestions: QuizQuestion[] = [
  {
    question: "Выберите символ, который резонирует с вами",
    subtitle: "Не думайте — выбирайте первое, что откликнулось",
    options: [
      { label: "Солнечный диск", sceneType: "symbol", shapes: ["circle"], primaryShape: "circle", palette: [P.gold, P.amber] },
      { label: "Кристалл кварца", sceneType: "symbol", shapes: ["hexagon"], primaryShape: "hexagon", palette: [P.cyan, P.slate] },
      { label: "Звёздный свет", sceneType: "symbol", shapes: ["star"], primaryShape: "star", palette: [P.gold, P.blue] },
      { label: "Лунный серп", sceneType: "symbol", shapes: ["crescent"], primaryShape: "crescent", palette: [P.slate, P.purple] },
    ],
  },
  {
    question: "Какой предмет притягивает ваше внимание?",
    subtitle: "Выберите объект, который вам ближе",
    options: [
      { label: "Ключ", sceneType: "object", shapes: ["cross", "circle"], primaryShape: "cross", palette: [P.gold, P.amber] },
      { label: "Зеркало", sceneType: "object", shapes: ["circle", "eye"], primaryShape: "eye", palette: [P.slate, P.cyan] },
      { label: "Песочные часы", sceneType: "object", shapes: ["triangle", "infinity"], primaryShape: "infinity", palette: [P.gold, P.amber] },
      { label: "Свеча", sceneType: "object", shapes: ["triangle", "star"], primaryShape: "triangle", palette: [P.gold, P.amber] },
    ],
  },
  {
    question: "Что вы видите в природе?",
    subtitle: "Выберите природный мотив",
    options: [
      { label: "Раковина моллюска", sceneType: "nature", shapes: ["spiral"], primaryShape: "spiral", palette: [P.rose, P.cyan] },
      { label: "Снежинка", sceneType: "nature", shapes: ["star", "hexagon"], primaryShape: "star", palette: [P.cyan, P.slate] },
      { label: "Горный хребет", sceneType: "nature", shapes: ["triangle"], primaryShape: "triangle", palette: [P.slate, P.emerald] },
      { label: "Капля росы", sceneType: "nature", shapes: ["circle"], primaryShape: "circle", palette: [P.cyan, P.slate] },
    ],
  },
  {
    question: "Какая абстракция вам ближе?",
    subtitle: "Выберите геометрическую композицию",
    options: [
      { label: "Симметрия мозаики", sceneType: "abstract", shapes: ["square", "hexagon"], primaryShape: "hexagon", palette: [P.gold, P.purple] },
      { label: "Лабиринт", sceneType: "abstract", shapes: ["square", "spiral"], primaryShape: "square", palette: [P.slate, P.cyan] },
      { label: "Мандала", sceneType: "abstract", shapes: ["circle", "star"], primaryShape: "circle", palette: [P.gold, P.rose] },
      { label: "Древо сефирот", sceneType: "abstract", shapes: ["cross", "circle"], primaryShape: "cross", palette: [P.purple, P.gold] },
    ],
  },
  {
    question: "Какое движение вас завораживает?",
    subtitle: "Выберите динамику",
    options: [
      { label: "Вихрь", sceneType: "movement", shapes: ["spiral"], primaryShape: "spiral", palette: [P.purple, P.cyan] },
      { label: "Колебание маятника", sceneType: "movement", shapes: ["infinity"], primaryShape: "infinity", palette: [P.gold, P.amber] },
      { label: "Восход", sceneType: "movement", shapes: ["triangle", "circle"], primaryShape: "triangle", palette: [P.amber, P.gold] },
      { label: "Круговорот", sceneType: "movement", shapes: ["circle"], primaryShape: "circle", palette: [P.emerald, P.cyan] },
    ],
  },
  {
    question: "Какой свет вам приятнее?",
    subtitle: "Выберите источник света",
    options: [
      { label: "Звезда", sceneType: "light", shapes: ["star"], primaryShape: "star", palette: [P.gold, P.blue] },
      { label: "Глаз в треугольнике", sceneType: "light", shapes: ["eye", "triangle"], primaryShape: "eye", palette: [P.gold, P.purple] },
      { label: "Луна", sceneType: "light", shapes: ["crescent", "circle"], primaryShape: "crescent", palette: [P.slate, P.purple] },
      { label: "Полярное сияние", sceneType: "light", shapes: ["spiral", "infinity"], primaryShape: "spiral", palette: [P.emerald, P.purple] },
    ],
  },
  {
    question: "Какая структура кажется правильной?",
    subtitle: "Выберите архитектурный мотив",
    options: [
      { label: "Купол храма", sceneType: "structure", shapes: ["circle", "triangle"], primaryShape: "circle", palette: [P.gold, P.amber] },
      { label: "Соты", sceneType: "structure", shapes: ["hexagon"], primaryShape: "hexagon", palette: [P.gold, P.amber] },
      { label: "Готическая арка", sceneType: "structure", shapes: ["triangle"], primaryShape: "triangle", palette: [P.slate, P.purple] },
      { label: "Лемниската над алтарём", sceneType: "structure", shapes: ["infinity", "cross"], primaryShape: "infinity", palette: [P.gold, P.purple] },
    ],
  },
  {
    question: "Какая энергия вам ближе?",
    subtitle: "Последний вопрос — выберите символ энергии",
    options: [
      { label: "Око провидения", sceneType: "energy", shapes: ["eye", "triangle"], primaryShape: "eye", palette: [P.gold, P.purple] },
      { label: "Древо жизни", sceneType: "energy", shapes: ["cross", "circle"], primaryShape: "cross", palette: [P.emerald, P.gold] },
      { label: "Чаша Грааля", sceneType: "energy", shapes: ["triangle", "circle"], primaryShape: "triangle", palette: [P.gold, P.cyan] },
      { label: "Свастика-коловрат", sceneType: "energy", shapes: ["cross", "spiral"], primaryShape: "cross", palette: [P.gold, P.amber] },
    ],
  },
]

// === Рендер формы ===
function renderShape(
  shape: GeometryArchetype["shape"],
  cx: number,
  cy: number,
  size: number,
  color: string,
  fill: boolean = false
) {
  const r = size / 2
  const fillProp = fill ? color : "none"
  const strokeProp = fill ? "none" : color
  const sw = fill ? 0 : 2

  switch (shape) {
    case "circle":
      return <circle cx={cx} cy={cy} r={r} fill={fillProp} stroke={strokeProp} strokeWidth={sw}/>
    case "square":
      return <rect x={cx - r} y={cy - r} width={size} height={size} fill={fillProp} stroke={strokeProp} strokeWidth={sw} rx="2"/>
    case "triangle":
      return (
        <path
          d={`M ${cx} ${cy - r} L ${cx + r * 0.866} ${cy + r * 0.5} L ${cx - r * 0.866} ${cy + r * 0.5} Z`}
          fill={fillProp} stroke={strokeProp} strokeWidth={sw}
        />
      )
    case "spiral":
      return (
        <path
          d={`M ${cx} ${cy} Q ${cx + r * 0.5} ${cy} ${cx + r * 0.5} ${cy + r * 0.5} Q ${cx + r * 0.5} ${cy + r} ${cx} ${cy + r} Q ${cx - r} ${cy + r} ${cx - r} ${cy} Q ${cx - r} ${cy - r} ${cx} ${cy - r} Q ${cx + r * 0.7} ${cy - r} ${cx + r * 0.7} ${cy + r * 0.3}`}
          fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"
        />
      )
    case "cross":
      return (
        <g fill={fillProp} stroke={strokeProp} strokeWidth={sw}>
          <rect x={cx - r * 0.2} y={cy - r} width={r * 0.4} height={size}/>
          <rect x={cx - r * 0.6} y={cy - r * 0.2} width={r * 1.2} height={r * 0.4}/>
        </g>
      )
    case "star":
      return (
        <path
          d={`M ${cx} ${cy - r} L ${cx + r * 0.22} ${cy - r * 0.3} L ${cx + r} ${cy - r * 0.3} L ${cx + r * 0.4} ${cy + r * 0.2} L ${cx + r * 0.6} ${cy + r} L ${cx} ${cy + r * 0.5} L ${cx - r * 0.6} ${cy + r} L ${cx - r * 0.4} ${cy + r * 0.2} L ${cx - r} ${cy - r * 0.3} L ${cx - r * 0.22} ${cy - r * 0.3} Z`}
          fill={fillProp} stroke={strokeProp} strokeWidth={sw}
        />
      )
    case "hexagon":
      return (
        <path
          d={`M ${cx} ${cy - r} L ${cx + r * 0.866} ${cy - r * 0.5} L ${cx + r * 0.866} ${cy + r * 0.5} L ${cx} ${cy + r} L ${cx - r * 0.866} ${cy + r * 0.5} L ${cx - r * 0.866} ${cy - r * 0.5} Z`}
          fill={fillProp} stroke={strokeProp} strokeWidth={sw}
        />
      )
    case "infinity":
      return (
        <path
          d={`M ${cx - r} ${cy} C ${cx - r} ${cy - r * 0.6} ${cx - r * 0.3} ${cy - r * 0.6} ${cx} ${cy} C ${cx + r * 0.3} ${cy + r * 0.6} ${cx + r} ${cy + r * 0.6} ${cx + r} ${cy} C ${cx + r} ${cy - r * 0.6} ${cx + r * 0.3} ${cy - r * 0.6} ${cx} ${cy} C ${cx - r * 0.3} ${cy + r * 0.6} ${cx - r} ${cy + r * 0.6} ${cx - r} ${cy} Z`}
          fill="none" stroke={color} strokeWidth="2.5"
        />
      )
    case "crescent":
      return (
        <path
          d={`M ${cx + r * 0.3} ${cy - r} A ${r} ${r} 0 1 0 ${cx + r * 0.3} ${cy + r} A ${r * 0.7} ${r * 0.7} 0 1 1 ${cx + r * 0.3} ${cy - r} Z`}
          fill={color}
        />
      )
    case "eye":
      return (
        <g>
          <path
            d={`M ${cx - r} ${cy} Q ${cx} ${cy - r * 0.6} ${cx + r} ${cy} Q ${cx} ${cy + r * 0.6} ${cx - r} ${cy} Z`}
            fill="none" stroke={color} strokeWidth="2"
          />
          <circle cx={cx} cy={cy} r={r * 0.35} fill={color}/>
          <circle cx={cx} cy={cy} r={r * 0.15} fill="#1a0a3a"/>
        </g>
      )
    default:
      return null
  }
}

// === Рендер SVG-сцены ===
function renderScene(option: QuizOption, qIdx: number) {
  const { sceneType, primaryShape, shapes, palette } = option
  const [c1, c2] = palette
  const uid = `gq-${qIdx}-${primaryShape}`

  switch (sceneType) {
    case "symbol": {
      // Крупный символ с лучами/декором
      return (
        <svg viewBox="0 0 200 120" className="w-full h-full">
          <rect width="200" height="120" fill="rgba(26,10,58,0.3)" rx="8"/>
          {/* Декоративные лучи */}
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i / 12) * Math.PI * 2
            return (
              <line key={i} x1={100 + Math.cos(a) * 35} y1={60 + Math.sin(a) * 35}
                x2={100 + Math.cos(a) * (i % 2 === 0 ? 55 : 48)} y2={60 + Math.sin(a) * (i % 2 === 0 ? 55 : 48)}
                stroke={i % 2 === 0 ? c1 : c2} strokeWidth={i % 2 === 0 ? 1.5 : 0.8} opacity="0.5"/>
            )
          })}
          {renderShape(primaryShape, 100, 60, 50, c1, true)}
          {renderShape(primaryShape, 100, 60, 50, c2, false)}
          {/* Внешний круг */}
          <circle cx="100" cy="60" r="55" fill="none" stroke={c1} strokeWidth="0.5" opacity="0.3"/>
        </svg>
      )
    }

    case "object": {
      // Реальные предметы с формами
      return (
        <svg viewBox="0 0 200 120" className="w-full h-full">
          <rect width="200" height="120" fill="rgba(26,10,58,0.3)" rx="8"/>
          {(() => {
            // Ключ
            if (primaryShape === "cross") {
              return (
                <g>
                  {/* Кольцо ключа */}
                  <circle cx="60" cy="60" r="20" fill="none" stroke={c1} strokeWidth="3"/>
                  <circle cx="60" cy="60" r="10" fill="none" stroke={c1} strokeWidth="2"/>
                  {/* Стержень */}
                  <rect x="80" y="57" width="80" height="6" fill={c1}/>
                  {/* Зубцы */}
                  <rect x="130" y="63" width="6" height="10" fill={c1}/>
                  <rect x="145" y="63" width="6" height="14" fill={c1}/>
                  {/* Блик */}
                  <circle cx="55" cy="55" r="3" fill={c2} opacity="0.6"/>
                </g>
              )
            }
            // Зеркало (глаз)
            if (primaryShape === "eye") {
              return (
                <g>
                  {/* Рамка зеркала */}
                  <ellipse cx="100" cy="60" rx="40" ry="30" fill="none" stroke={c1} strokeWidth="3"/>
                  <ellipse cx="100" cy="60" rx="35" ry="25" fill={c2} opacity="0.2"/>
                  {/* Отражение — глаз */}
                  <path d="M 75 60 Q 100 48 125 60 Q 100 72 75 60 Z" fill="none" stroke={c1} strokeWidth="2"/>
                  <circle cx="100" cy="60" r="8" fill={c1}/>
                  <circle cx="100" cy="60" r="3" fill="#1a0a3a"/>
                  {/* Блик */}
                  <circle cx="97" cy="57" r="2" fill="#fef3c7"/>
                  {/* Ручка */}
                  <rect x="98" y="88" width="4" height="15" fill={c1}/>
                </g>
              )
            }
            // Песочные часы (infinity)
            if (primaryShape === "infinity") {
              return (
                <g>
                  {/* Песочные часы */}
                  <path d="M 70 30 L 130 30 L 100 60 L 130 90 L 70 90 L 100 60 Z" fill="none" stroke={c1} strokeWidth="2.5"/>
                  {/* Песок сверху */}
                  <path d="M 75 35 L 125 35 L 105 55 L 95 55 Z" fill={c2} opacity="0.6"/>
                  {/* Песок снизу */}
                  <path d="M 85 85 L 115 85 L 110 75 L 90 75 Z" fill={c2} opacity="0.4"/>
                  {/* Падающая струйка */}
                  <line x1="100" y1="58" x2="100" y2="72" stroke={c2} strokeWidth="1" opacity="0.7"/>
                  {/* Лемниската сверху */}
                  <path d="M 85 20 C 90 15 95 15 100 20 C 105 25 110 25 115 20 C 110 25 105 25 100 20 C 95 15 90 15 85 20 Z" fill="none" stroke={c1} strokeWidth="1.5" opacity="0.5"/>
                </g>
              )
            }
            // Свеча (triangle)
            return (
              <g>
                {/* Подсвечник */}
                <rect x="80" y="95" width="40" height="6" fill={c1}/>
                <rect x="85" y="90" width="30" height="5" fill={c1} opacity="0.8"/>
                {/* Свеча */}
                <rect x="92" y="55" width="16" height="35" fill={c2} opacity="0.7" stroke={c1} strokeWidth="0.5"/>
                {/* Фитиль */}
                <line x1="100" y1="55" x2="100" y2="48" stroke="#1a0a3a" strokeWidth="1"/>
                {/* Пламя — треугольник */}
                <path d="M 100 30 Q 95 40 100 48 Q 105 40 100 30 Z" fill={c1}/>
                <path d="M 100 35 Q 97 42 100 48 Q 103 42 100 35 Z" fill={c2} opacity="0.6"/>
                {/* Свечение */}
                <circle cx="100" cy="40" r="15" fill={c1} opacity="0.15"/>
              </g>
            )
          })()}
        </svg>
      )
    }

    case "nature": {
      return (
        <svg viewBox="0 0 200 120" className="w-full h-full">
          <rect width="200" height="120" fill="rgba(26,10,58,0.3)" rx="8"/>
          {(() => {
            // Раковина (spiral)
            if (primaryShape === "spiral") {
              return (
                <g>
                  <path
                    d="M 100 60 Q 110 60 110 70 Q 110 85 95 85 Q 75 85 75 65 Q 75 40 100 40 Q 130 40 130 65 Q 130 95 95 95 Q 55 95 55 60 Q 55 20 100 20"
                    fill="none" stroke={c1} strokeWidth="2.5" strokeLinecap="round"
                  />
                  <path
                    d="M 100 60 Q 110 60 110 70 Q 110 85 95 85 Q 75 85 75 65 Q 75 40 100 40 Q 130 40 130 65 Q 130 95 95 95 Q 55 95 55 60 Q 55 20 100 20"
                    fill="none" stroke={c2} strokeWidth="1" opacity="0.5"
                  />
                </g>
              )
            }
            // Снежинка (star)
            if (primaryShape === "star") {
              return (
                <g>
                  {Array.from({ length: 6 }).map((_, i) => {
                    const a = (i / 6) * Math.PI * 2
                    const x2 = 100 + Math.cos(a) * 40
                    const y2 = 60 + Math.sin(a) * 40
                    return (
                      <g key={i}>
                        <line x1="100" y1="60" x2={x2} y2={y2} stroke={c1} strokeWidth="2"/>
                        {/* Веточки */}
                        <line x1={100 + Math.cos(a) * 25} y1={60 + Math.sin(a) * 25} x2={100 + Math.cos(a) * 25 + Math.cos(a + 0.5) * 8} y2={60 + Math.sin(a) * 25 + Math.sin(a + 0.5) * 8} stroke={c2} strokeWidth="1.5"/>
                        <line x1={100 + Math.cos(a) * 25} y1={60 + Math.sin(a) * 25} x2={100 + Math.cos(a) * 25 + Math.cos(a - 0.5) * 8} y2={60 + Math.sin(a) * 25 + Math.sin(a - 0.5) * 8} stroke={c2} strokeWidth="1.5"/>
                      </g>
                    )
                  })}
                  <circle cx="100" cy="60" r="4" fill={c1}/>
                </g>
              )
            }
            // Горы (triangle)
            if (primaryShape === "triangle") {
              return (
                <g>
                  {/* Задние горы */}
                  <path d="M 20 95 L 60 40 L 100 95 Z" fill={c2} opacity="0.4"/>
                  <path d="M 80 95 L 130 35 L 180 95 Z" fill={c2} opacity="0.5"/>
                  {/* Передняя гора */}
                  <path d="M 40 95 L 100 25 L 160 95 Z" fill={c1} opacity="0.7"/>
                  {/* Снежная шапка */}
                  <path d="M 90 38 L 100 25 L 110 38 L 105 35 L 100 32 L 95 35 Z" fill="#fef3c7" opacity="0.8"/>
                  {/* Солнце/луна */}
                  <circle cx="150" cy="30" r="8" fill={c2} opacity="0.6"/>
                </g>
              )
            }
            // Капля росы (circle)
            return (
              <g>
                {/* Лист */}
                <ellipse cx="100" cy="80" rx="60" ry="15" fill={c2} opacity="0.3"/>
                <path d="M 50 80 Q 100 70 150 80" fill="none" stroke={c2} strokeWidth="1.5" opacity="0.5"/>
                {/* Капли */}
                <circle cx="80" cy="75" r="10" fill={c1} opacity="0.7"/>
                <circle cx="80" cy="73" r="3" fill="#fef3c7" opacity="0.5"/>
                <circle cx="115" cy="78" r="6" fill={c1} opacity="0.5"/>
                <circle cx="115" cy="77" r="2" fill="#fef3c7" opacity="0.4"/>
              </g>
            )
          })()}
        </svg>
      )
    }

    case "abstract": {
      return (
        <svg viewBox="0 0 200 120" className="w-full h-full">
          <rect width="200" height="120" fill="rgba(26,10,58,0.3)" rx="8"/>
          {(() => {
            // Симметрия мозаики (hexagon)
            if (primaryShape === "hexagon") {
              return (
                <g>
                  {Array.from({ length: 7 }).map((_, i) => {
                    const cx = i === 6 ? 100 : 100 + (i % 3 - 1) * 30
                    const cy = i === 6 ? 60 : 60 + (Math.floor(i / 3) - 0.5) * 26
                    return (
                      <g key={i}>
                        <path
                          d={`M ${cx} ${cy - 15} L ${cx + 13} ${cy - 7.5} L ${cx + 13} ${cy + 7.5} L ${cx} ${cy + 15} L ${cx - 13} ${cy + 7.5} L ${cx - 13} ${cy - 7.5} Z`}
                          fill={i % 2 === 0 ? c1 : c2} opacity={i === 6 ? 0.9 : 0.6}
                          stroke={i % 2 === 0 ? c2 : c1} strokeWidth="0.8"
                        />
                      </g>
                    )
                  })}
                </g>
              )
            }
            // Лабиринт (square)
            if (primaryShape === "square") {
              return (
                <g fill="none" stroke={c1} strokeWidth="2">
                  <rect x="40" y="20" width="120" height="80" stroke={c1}/>
                  <rect x="55" y="35" width="90" height="50" stroke={c1} opacity="0.7"/>
                  <rect x="70" y="50" width="60" height="20" stroke={c1} opacity="0.5"/>
                  <rect x="85" y="55" width="30" height="10" stroke={c2} opacity="0.6"/>
                  {/* Центральная точка */}
                  <circle cx="100" cy="60" r="3" fill={c2}/>
                </g>
              )
            }
            // Мандала (circle)
            if (primaryShape === "circle") {
              return (
                <g>
                  <circle cx="100" cy="60" r="45" fill="none" stroke={c1} strokeWidth="1" opacity="0.5"/>
                  <circle cx="100" cy="60" r="35" fill="none" stroke={c2} strokeWidth="0.5" opacity="0.4" strokeDasharray="2 2"/>
                  {Array.from({ length: 8 }).map((_, i) => {
                    const a = (i / 8) * Math.PI * 2
                    return (
                      <g key={i}>
                        <ellipse cx={100 + Math.cos(a) * 22} cy={60 + Math.sin(a) * 22} rx="10" ry="5"
                          fill={i % 2 === 0 ? c1 : c2} opacity="0.6"
                          transform={`rotate(${(a * 180 / Math.PI) + 90} ${100 + Math.cos(a) * 22} ${60 + Math.sin(a) * 22})`}
                        />
                      </g>
                    )
                  })}
                  <circle cx="100" cy="60" r="10" fill={c1}/>
                  <circle cx="100" cy="60" r="4" fill={c2}/>
                </g>
              )
            }
            // Древо сефирот (cross)
            return (
              <g>
                {/* 10 сефирот в виде дерева */}
                {[
                  [100, 20], [70, 45], [130, 45], [70, 70], [100, 60], [130, 70], [70, 95], [100, 90], [130, 95], [100, 105]
                ].map(([x, y], i) => (
                  <g key={i}>
                    <circle cx={x} cy={y} r="8" fill={i % 2 === 0 ? c1 : c2} opacity="0.7" stroke={i % 2 === 0 ? c2 : c1} strokeWidth="1"/>
                  </g>
                ))}
                {/* Связи */}
                <g stroke={c1} strokeWidth="0.8" opacity="0.4">
                  <line x1="100" y1="20" x2="70" y2="45"/>
                  <line x1="100" y1="20" x2="130" y2="45"/>
                  <line x1="70" y1="45" x2="70" y2="70"/>
                  <line x1="130" y1="45" x2="130" y2="70"/>
                  <line x1="70" y1="45" x2="100" y2="60"/>
                  <line x1="130" y1="45" x2="100" y2="60"/>
                  <line x1="70" y1="70" x2="100" y2="90"/>
                  <line x1="130" y1="70" x2="100" y2="90"/>
                  <line x1="100" y1="60" x2="100" y2="90"/>
                  <line x1="70" y1="95" x2="100" y2="105"/>
                  <line x1="130" y1="95" x2="100" y2="105"/>
                  <line x1="100" y1="90" x2="100" y2="105"/>
                </g>
              </g>
            )
          })()}
        </svg>
      )
    }

    case "movement": {
      return (
        <svg viewBox="0 0 200 120" className="w-full h-full">
          <rect width="200" height="120" fill="rgba(26,10,58,0.3)" rx="8"/>
          {(() => {
            // Вихрь (spiral)
            if (primaryShape === "spiral") {
              return (
                <g>
                  <path
                    d="M 100 60 Q 115 60 115 75 Q 115 95 95 95 Q 65 95 65 60 Q 65 25 100 25 Q 145 25 145 60 Q 145 105 95 105 Q 35 105 35 60"
                    fill="none" stroke={c1} strokeWidth="2.5" strokeLinecap="round"
                  />
                  {/* Движение-частицы */}
                  <circle cx="35" cy="60" r="3" fill={c2}/>
                  <circle cx="50" cy="40" r="2" fill={c2} opacity="0.7"/>
                  <circle cx="55" cy="85" r="2" fill={c2} opacity="0.5"/>
                </g>
              )
            }
            // Маятник (infinity)
            if (primaryShape === "infinity") {
              return (
                <g>
                  {/* Точка подвеса */}
                  <circle cx="100" cy="20" r="4" fill={c1}/>
                  {/* Нить */}
                  <line x1="100" y1="20" x2="70" y2="80" stroke={c1} strokeWidth="1" opacity="0.6"/>
                  <line x1="100" y1="20" x2="130" y2="80" stroke={c1} strokeWidth="1" opacity="0.3"/>
                  {/* Траектория — лемниската */}
                  <path
                    d="M 60 80 C 60 65 80 65 100 80 C 120 95 140 95 140 80 C 140 65 120 65 100 80 C 80 95 60 95 60 80 Z"
                    fill="none" stroke={c2} strokeWidth="2" opacity="0.7"
                  />
                  {/* Груз */}
                  <circle cx="70" cy="80" r="6" fill={c1}/>
                  <circle cx="130" cy="80" r="6" fill={c1} opacity="0.4"/>
                </g>
              )
            }
            // Восход (triangle)
            if (primaryShape === "triangle") {
              return (
                <g>
                  {/* Солнце восходит из-за горы */}
                  <path d="M 30 95 L 100 50 L 170 95 Z" fill={c2} opacity="0.4"/>
                  {/* Лучи восходящего солнца — треугольники */}
                  {Array.from({ length: 7 }).map((_, i) => {
                    const x = 60 + i * 12
                    return (
                      <path key={i} d={`M ${x} 70 L ${x - 4} 80 L ${x + 4} 80 Z`} fill={c1} opacity={0.8 - i * 0.05}/>
                    )
                  })}
                  {/* Диск солнца */}
                  <circle cx="100" cy="65" r="12" fill={c1} opacity="0.8"/>
                  {/* Линия горизонта */}
                  <line x1="20" y1="95" x2="180" y2="95" stroke={c1} strokeWidth="1" opacity="0.4"/>
                </g>
              )
            }
            // Круговорот (circle)
            return (
              <g>
                {/* Большой круг-цикл */}
                <circle cx="100" cy="60" r="40" fill="none" stroke={c1} strokeWidth="2.5"/>
                {/* Стрелки движения */}
                {Array.from({ length: 4 }).map((_, i) => {
                  const a = (i / 4) * Math.PI * 2 + Math.PI / 4
                  const x = 100 + Math.cos(a) * 40
                  const y = 60 + Math.sin(a) * 40
                  return (
                    <path key={i}
                      d={`M ${x - 5 * Math.cos(a - 0.5)} ${y - 5 * Math.sin(a - 0.5)} L ${x} ${y} L ${x - 5 * Math.cos(a + 0.5)} ${y - 5 * Math.sin(a + 0.5)}`}
                      fill="none" stroke={c2} strokeWidth="2"
                    />
                  )
                })}
                {/* Сезоны в круге */}
                {Array.from({ length: 4 }).map((_, i) => {
                  const a = (i / 4) * Math.PI * 2
                  const x = 100 + Math.cos(a) * 20
                  const y = 60 + Math.sin(a) * 20
                  return <circle key={i} cx={x} cy={y} r="4" fill={i % 2 === 0 ? c1 : c2} opacity="0.6"/>
                })}
              </g>
            )
          })()}
        </svg>
      )
    }

    case "light": {
      return (
        <svg viewBox="0 0 200 120" className="w-full h-full">
          <defs>
            <radialGradient id={`light-${uid}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={c1} stopOpacity="0.4"/>
              <stop offset="100%" stopColor={c1} stopOpacity="0"/>
            </radialGradient>
          </defs>
          <rect width="200" height="120" fill="rgba(26,10,58,0.3)" rx="8"/>
          <rect width="200" height="120" fill={`url(#light-${uid})`} rx="8"/>
          {(() => {
            // Звезда (star)
            if (primaryShape === "star") {
              return (
                <g>
                  {/* Большая звезда */}
                  <path
                    d="M 100 25 L 108 50 L 135 50 L 113 65 L 121 90 L 100 75 L 79 90 L 87 65 L 65 50 L 92 50 Z"
                    fill={c1} stroke={c2} strokeWidth="1"
                  />
                  {/* Малые звёзды вокруг */}
                  {[
                    [40, 30, 0.4], [160, 35, 0.5], [170, 80, 0.3], [35, 85, 0.4]
                  ].map(([x, y, s], i) => (
                    <path key={i}
                      d={`M ${x} ${y - 8 * s} L ${x + 2 * s} ${y - 2 * s} L ${x + 8 * s} ${y - 2 * s} L ${x + 3 * s} ${y + 2 * s} L ${x + 5 * s} ${y + 8 * s} L ${x} ${y + 4 * s} L ${x - 5 * s} ${y + 8 * s} L ${x - 3 * s} ${y + 2 * s} L ${x - 8 * s} ${y - 2 * s} L ${x - 2 * s} ${y - 2 * s} Z`}
                      fill={c2} opacity="0.6"
                    />
                  ))}
                </g>
              )
            }
            // Глаз в треугольнике (eye)
            if (primaryShape === "eye") {
              return (
                <g>
                  {/* Треугольник */}
                  <path d="M 100 20 L 160 100 L 40 100 Z" fill="none" stroke={c1} strokeWidth="2"/>
                  {/* Лучи от треугольника */}
                  {Array.from({ length: 6 }).map((_, i) => {
                    const a = (i / 6) * Math.PI * 2
                    return (
                      <line key={i} x1={100 + Math.cos(a) * 50} y1={60 + Math.sin(a) * 50}
                        x2={100 + Math.cos(a) * 65} y2={60 + Math.sin(a) * 65}
                        stroke={c2} strokeWidth="1" opacity="0.5"
                      />
                    )
                  })}
                  {/* Глаз */}
                  <path d="M 75 60 Q 100 45 125 60 Q 100 75 75 60 Z" fill="none" stroke={c1} strokeWidth="2"/>
                  <circle cx="100" cy="60" r="10" fill={c1}/>
                  <circle cx="100" cy="60" r="4" fill="#1a0a3a"/>
                  <circle cx="97" cy="57" r="2" fill="#fef3c7"/>
                </g>
              )
            }
            // Луна (crescent)
            if (primaryShape === "crescent") {
              return (
                <g>
                  {/* Полумесяц большой */}
                  <path
                    d="M 115 30 A 35 35 0 1 0 115 100 A 25 25 0 1 1 115 30 Z"
                    fill={c1} opacity="0.9"
                  />
                  {/* Звёзды вокруг */}
                  {[
                    [50, 30], [60, 70], [170, 40], [175, 85], [40, 95]
                  ].map(([x, y], i) => (
                    <g key={i}>
                      <circle cx={x} cy={y} r="1.5" fill={c2}/>
                      <line x1={x - 3} y1={y} x2={x + 3} y2={y} stroke={c2} strokeWidth="0.5" opacity="0.5"/>
                      <line x1={x} y1={y - 3} x2={x} y2={y + 3} stroke={c2} strokeWidth="0.5" opacity="0.5"/>
                    </g>
                  ))}
                </g>
              )
            }
            // Полярное сияние (spiral)
            return (
              <g>
                {/* Ленты сияния */}
                {Array.from({ length: 5 }).map((_, i) => (
                  <path key={i}
                    d={`M ${20 + i * 5} ${90 + i * 5} Q ${60} ${30 + i * 8} ${100} ${40 + i * 6} Q ${140} ${50 + i * 4} ${180 - i * 5} ${80 - i * 3}`}
                    fill="none" stroke={i % 2 === 0 ? c1 : c2} strokeWidth="2.5" opacity={0.7 - i * 0.1}
                  />
                ))}
                {/* Звёзды */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <circle key={i} cx={(i * 37) % 200} cy={(i * 23) % 30} r="1" fill="#fef3c7" opacity="0.6"/>
                ))}
              </g>
            )
          })()}
        </svg>
      )
    }

    case "structure": {
      return (
        <svg viewBox="0 0 200 120" className="w-full h-full">
          <rect width="200" height="120" fill="rgba(26,10,58,0.3)" rx="8"/>
          {(() => {
            // Купол (circle)
            if (primaryShape === "circle") {
              return (
                <g>
                  {/* Основание храма */}
                  <rect x="50" y="80" width="100" height="20" fill={c2} opacity="0.5" stroke={c1} strokeWidth="1"/>
                  {/* Колонны */}
                  {[60, 80, 100, 120, 140].map((x, i) => (
                    <rect key={i} x={x - 2} y="60" width="4" height="20" fill={c1} opacity="0.6"/>
                  ))}
                  {/* Купол — полукруг */}
                  <path d="M 50 80 A 50 50 0 0 1 150 80" fill={c1} opacity="0.7" stroke={c2} strokeWidth="1.5"/>
                  {/* Главка */}
                  <line x1="100" y1="30" x2="100" y2="20" stroke={c1} strokeWidth="2"/>
                  <circle cx="100" cy="18" r="3" fill={c2}/>
                  {/* Декор купола */}
                  <circle cx="100" cy="65" r="8" fill="none" stroke={c2} strokeWidth="1" opacity="0.5"/>
                </g>
              )
            }
            // Соты (hexagon)
            if (primaryShape === "hexagon") {
              return (
                <g>
                  {Array.from({ length: 7 }).map((_, i) => {
                    const cx = i === 6 ? 100 : 100 + (i % 3 - 1) * 30
                    const cy = i === 6 ? 60 : 60 + (Math.floor(i / 3) - 0.5) * 26
                    return (
                      <path key={i}
                        d={`M ${cx} ${cy - 15} L ${cx + 13} ${cy - 7.5} L ${cx + 13} ${cy + 7.5} L ${cx} ${cy + 15} L ${cx - 13} ${cy + 7.5} L ${cx - 13} ${cy - 7.5} Z`}
                        fill={i === 6 ? c1 : c2} opacity={i === 6 ? 0.8 : 0.5}
                        stroke={c1} strokeWidth="1"
                      />
                    )
                  })}
                </g>
              )
            }
            // Готическая арка (triangle)
            if (primaryShape === "triangle") {
              return (
                <g>
                  {/* Арка */}
                  <path d="M 60 100 L 60 60 Q 60 30 100 20 Q 140 30 140 60 L 140 100" fill="none" stroke={c1} strokeWidth="2.5"/>
                  {/* Внутренний треугольник (стрельчатая арка) */}
                  <path d="M 75 100 L 100 35 L 125 100" fill="none" stroke={c2} strokeWidth="1.5" opacity="0.6"/>
                  {/* Витраж-роза */}
                  <circle cx="100" cy="50" r="10" fill="none" stroke={c1} strokeWidth="1" opacity="0.5"/>
                  {Array.from({ length: 6 }).map((_, i) => {
                    const a = (i / 6) * Math.PI * 2
                    return <line key={i} x1="100" y1="50" x2={100 + Math.cos(a) * 9} y2={50 + Math.sin(a) * 9} stroke={c2} strokeWidth="0.8" opacity="0.5"/>
                  })}
                  {/* Основание */}
                  <rect x="50" y="100" width="100" height="6" fill={c1} opacity="0.4"/>
                </g>
              )
            }
            // Лемниската над алтарём (infinity)
            return (
              <g>
                {/* Алтарь */}
                <rect x="70" y="80" width="60" height="25" fill={c2} opacity="0.4" stroke={c1} strokeWidth="1"/>
                <rect x="75" y="78" width="50" height="4" fill={c1} opacity="0.6"/>
                {/* Лемниската над алтарём */}
                <path
                  d="M 70 50 C 70 35 85 35 100 50 C 115 65 130 65 130 50 C 130 35 115 35 100 50 C 85 65 70 65 70 50 Z"
                  fill="none" stroke={c1} strokeWidth="2.5"
                />
                {/* Свечение */}
                <circle cx="100" cy="50" r="20" fill={c1} opacity="0.1"/>
                {/* Лучи */}
                {Array.from({ length: 8 }).map((_, i) => {
                  const a = (i / 8) * Math.PI * 2
                  return (
                    <line key={i} x1={100 + Math.cos(a) * 25} y1={50 + Math.sin(a) * 25}
                      x2={100 + Math.cos(a) * 35} y2={50 + Math.sin(a) * 35}
                      stroke={c2} strokeWidth="1" opacity="0.4"
                    />
                  )
                })}
              </g>
            )
          })()}
        </svg>
      )
    }

    case "energy": {
      return (
        <svg viewBox="0 0 200 120" className="w-full h-full">
          <rect width="200" height="120" fill="rgba(26,10,58,0.3)" rx="8"/>
          {(() => {
            // Око провидения (eye)
            if (primaryShape === "eye") {
              return (
                <g>
                  {/* Треугольник */}
                  <path d="M 100 15 L 165 105 L 35 105 Z" fill="none" stroke={c1} strokeWidth="2"/>
                  {/* Лучи */}
                  {Array.from({ length: 12 }).map((_, i) => {
                    const a = (i / 12) * Math.PI * 2
                    return (
                      <line key={i} x1={100 + Math.cos(a) * 55} y1={60 + Math.sin(a) * 55}
                        x2={100 + Math.cos(a) * 70} y2={60 + Math.sin(a) * 70}
                        stroke={i % 2 === 0 ? c1 : c2} strokeWidth="1" opacity="0.5"
                      />
                    )
                  })}
                  {/* Глаз */}
                  <path d="M 70 60 Q 100 40 130 60 Q 100 80 70 60 Z" fill="none" stroke={c1} strokeWidth="2"/>
                  <circle cx="100" cy="60" r="12" fill={c1} opacity="0.8"/>
                  <circle cx="100" cy="60" r="5" fill="#1a0a3a"/>
                  <circle cx="96" cy="56" r="2" fill="#fef3c7"/>
                </g>
              )
            }
            // Древо жизни (cross)
            if (primaryShape === "cross") {
              return (
                <g>
                  {/* Ствол */}
                  <rect x="96" y="50" width="8" height="50" fill={c2} opacity="0.7"/>
                  {/* Ветви — крест горизонтальный */}
                  <rect x="60" y="55" width="80" height="6" fill={c2} opacity="0.6"/>
                  {/* Корни */}
                  <path d="M 96 100 L 80 110 M 104 100 L 120 110" stroke={c2} strokeWidth="2" opacity="0.5"/>
                  {/* Крона — круги (сефирот) */}
                  {[
                    [100, 30], [70, 45], [130, 45], [70, 75], [100, 70], [130, 75]
                  ].map(([x, y], i) => (
                    <circle key={i} cx={x} cy={y} r="7" fill={c1} opacity={0.7 - i * 0.05} stroke={c2} strokeWidth="0.8"/>
                  ))}
                  {/* Свечение */}
                  <circle cx="100" cy="60" r="35" fill={c1} opacity="0.08"/>
                </g>
              )
            }
            // Чаша Грааля (triangle)
            if (primaryShape === "triangle") {
              return (
                <g>
                  {/* Чаша — перевёрнутый треугольник */}
                  <path d="M 65 50 L 135 50 L 100 90 Z" fill={c1} opacity="0.6" stroke={c2} strokeWidth="1.5"/>
                  {/* Ножка */}
                  <rect x="96" y="90" width="8" height="12" fill={c2} opacity="0.6"/>
                  {/* Основание */}
                  <rect x="80" y="102" width="40" height="5" fill={c2} opacity="0.5"/>
                  {/* Свечение из чаши */}
                  <path d="M 75 50 L 100 30 L 125 50" fill="none" stroke={c1} strokeWidth="1.5" opacity="0.6"/>
                  {/* Лучи */}
                  {Array.from({ length: 7 }).map((_, i) => {
                    const a = -Math.PI / 2 + (i - 3) * 0.3
                    return (
                      <line key={i} x1={100} y1={30} x2={100 + Math.cos(a) * 25} y2={30 + Math.sin(a) * 25}
                        stroke={c1} strokeWidth="1" opacity={0.5 - Math.abs(i - 3) * 0.08}
                      />
                    )
                  })}
                </g>
              )
            }
            // Коловрат (cross + spiral)
            return (
              <g>
                {/* Центр */}
                <circle cx="100" cy="60" r="8" fill={c1}/>
                {/* 4 загнутых луча */}
                {Array.from({ length: 4 }).map((_, i) => {
                  const a = (i / 4) * Math.PI * 2
                  const x1 = 100 + Math.cos(a) * 8
                  const y1 = 60 + Math.sin(a) * 8
                  const x2 = 100 + Math.cos(a) * 40
                  const y2 = 60 + Math.sin(a) * 40
                  const xm = 100 + Math.cos(a + 0.4) * 30
                  const ym = 60 + Math.sin(a + 0.4) * 30
                  return (
                    <path key={i}
                      d={`M ${x1} ${y1} L ${x2} ${y2} Q ${xm} ${ym} ${100 + Math.cos(a + 0.6) * 25} ${60 + Math.sin(a + 0.6) * 25}`}
                      fill="none" stroke={c1} strokeWidth="3" strokeLinecap="round"
                    />
                  )
                })}
                {/* Внешний круг */}
                <circle cx="100" cy="60" r="45" fill="none" stroke={c2} strokeWidth="0.5" opacity="0.4"/>
              </g>
            )
          })()}
        </svg>
      )
    }

    default:
      return null
  }
}

function findArchetype(shape: string): GeometryArchetype | undefined {
  return geometryArchetypes.find((g) => g.shape === shape)
}

export function GeometryQuiz() {
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
    // Основная форма получает 2 очка, вторичные — 1 очко
    newScores[option.primaryShape] = (newScores[option.primaryShape] || 0) + 2
    for (const shape of option.shapes) {
      if (shape !== option.primaryShape) {
        newScores[shape] = (newScores[shape] || 0) + 1
      }
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
  const primaryShape = sortedScores[0]?.[0]
  const primaryScore = sortedScores[0]?.[1] || 0
  const secondaryShape = sortedScores[1]?.[0]
  const secondaryScore = sortedScores[1]?.[1] || 0
  const primaryArchetype = primaryShape ? findArchetype(primaryShape) : null
  const secondaryArchetype = secondaryShape ? findArchetype(secondaryShape) : null
  const hasSecondary = secondaryArchetype && secondaryScore >= primaryScore - 2
  const totalPoints = Object.values(scores).reduce((a, b) => a + b, 0) || 1

  // === Стартовый экран ===
  if (!started && !showResult) {
    return (
      <div>
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-amber-100 mb-2" style={{ fontFamily: "var(--font-cinzel)" }}>
            Архетип по геометрической форме
          </h3>
          <p className="text-sm text-amber-200/70 max-w-xl mx-auto">
            Не просто выбор формы — а путь из 8 вопросов с символами, предметами, природными
            мотивами и сакральными образами. Ваш архетип складывается из суммы всех выбранных форм.
          </p>
        </div>

        <Card className="glass-mystic border-amber-400/30 mb-6 max-w-2xl mx-auto">
          <CardContent className="pt-6 text-center">
            {/* Превью форм */}
            <div className="flex justify-center gap-2 mb-4 flex-wrap">
              {geometryArchetypes.slice(0, 6).map((g) => (
                <div
                  key={g.shape}
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: "radial-gradient(circle, rgba(251,191,36,0.15), transparent 70%)",
                    border: "1px solid rgba(251,191,36,0.3)",
                  }}
                >
                  <svg viewBox="0 0 60 60" className="w-8 h-8">
                    {renderShape(g.shape, 30, 30, 30, "#fbbf24")}
                  </svg>
                </div>
              ))}
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-amber-300 text-sm">
                +4
              </div>
            </div>
            <p className="text-sm text-amber-100/80 mb-4 leading-relaxed">
              Вы пройдёте <strong className="text-amber-200">8 вопросов</strong>, выбирая
              визуальные сцены — символы, предметы, природные мотивы, абстракции. Каждый выбор
              добавляет очки к 1-2 геометрическим архетипам. В конце вы узнаете свой доминирующий
              архетип и спектр всех выбранных форм.
            </p>
            <div className="grid grid-cols-3 gap-2 mb-4 text-xs text-amber-200/70">
              <div className="glass-card rounded-lg p-2">
                <div className="text-amber-300 font-bold">8</div>
                <div>вопросов</div>
              </div>
              <div className="glass-card rounded-lg p-2">
                <div className="text-amber-300 font-bold">32</div>
                <div>визуальных сцены</div>
              </div>
              <div className="glass-card rounded-lg p-2">
                <div className="text-amber-300 font-bold">10</div>
                <div>архетипов</div>
              </div>
            </div>
            <Button onClick={() => setStarted(true)} className="btn-gold px-8 py-3">
              <Sparkles className="w-5 h-5 mr-2"/>
              Начать геометрический тест
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
        {/* Спектр всех выбранных форм */}
        <Card className="glass-mystic border-amber-400/40 mb-5">
          <CardContent className="pt-6">
            <div className="text-center mb-4">
              <div className="text-xs uppercase tracking-wider text-amber-300 mb-1">Ваш геометрический спектр</div>
              <p className="text-sm text-amber-200/70">Сумма всех выбранных форм за 8 вопросов</p>
            </div>
            {/* Спектр-бар */}
            <div className="flex h-6 rounded-full overflow-hidden mb-3">
              {sortedScores.map(([shape, score]) => {
                const archetype = findArchetype(shape)
                const width = (score / totalPoints) * 100
                const color = archetype ? (shape === primaryShape ? "#fbbf24" : "#a78bfa") : "#94a3b8"
                return (
                  <div
                    key={shape}
                    style={{
                      width: `${width}%`,
                      background: color,
                      minWidth: width > 5 ? "auto" : "2px",
                    }}
                    title={`${archetype?.name.split(" — ")[0]}: ${score} очков`}
                  />
                )
              })}
            </div>
            {/* Легенда спектра */}
            <div className="flex flex-wrap gap-2 justify-center">
              {sortedScores.slice(0, 6).map(([shape, score]) => {
                const archetype = findArchetype(shape)
                const pct = Math.round((score / totalPoints) * 100)
                const isPrimary = shape === primaryShape
                return (
                  <Badge
                    key={shape}
                    variant="outline"
                    className="border text-xs"
                    style={{
                      backgroundColor: isPrimary ? "rgba(251,191,36,0.15)" : "rgba(167,139,250,0.15)",
                      color: isPrimary ? "#fbbf24" : "#c4b5fd",
                      borderColor: isPrimary ? "rgba(251,191,36,0.5)" : "rgba(167,139,250,0.5)",
                    }}
                  >
                    <span className="mr-1.5">{archetype?.symbol}</span>
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
            background: `linear-gradient(135deg, rgba(251,191,36,0.2), rgba(26,10,58,0.6))`,
            border: `1px solid rgba(251,191,36,0.5)`,
          }}
        >
          <CardContent className="pt-6">
            <div className="flex items-center gap-4 mb-4">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center shrink-0"
                style={{
                  background: "radial-gradient(circle, rgba(251,191,36,0.2), rgba(167,139,250,0.1))",
                  border: "1px solid rgba(251,191,36,0.4)",
                }}
              >
                <svg viewBox="0 0 60 60" className="w-14 h-14">
                  {renderShape(primaryArchetype.shape, 30, 30, 36, "#fbbf24")}
                </svg>
              </div>
              <div>
                <Badge variant="outline" className="text-xs mb-1 border-amber-400/40 text-amber-200">
                  Основной архетип · {primaryScore} очков
                </Badge>
                <h3
                  className="text-2xl font-bold mb-1 text-gold-gradient"
                  style={{ fontFamily: "var(--font-cinzel)" }}
                >
                  {primaryArchetype.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-amber-400/40 text-amber-200 text-xs">
                    {primaryArchetype.element}
                  </Badge>
                  <Badge variant="outline" className="border-purple-400/40 text-purple-200 text-xs">
                    {primaryArchetype.principle}
                  </Badge>
                </div>
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
              background: `linear-gradient(135deg, rgba(167,139,250,0.15), rgba(26,10,58,0.5))`,
              border: `1px solid rgba(167,139,250,0.4)`,
            }}
          >
            <CardContent className="pt-5">
              <div className="flex items-center gap-3">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                  style={{
                    background: "radial-gradient(circle, rgba(167,139,250,0.2), transparent 70%)",
                    border: "1px solid rgba(167,139,250,0.4)",
                  }}
                >
                  <svg viewBox="0 0 60 60" className="w-10 h-10">
                    {renderShape(secondaryArchetype.shape, 30, 30, 30, "#c4b5fd")}
                  </svg>
                </div>
                <div className="flex-1">
                  <Badge variant="outline" className="text-xs mb-1 border-purple-400/40 text-purple-200">
                    Вторичный архетип · {secondaryScore} очков
                  </Badge>
                  <h4
                    className="text-lg font-bold text-purple-200"
                    style={{ fontFamily: "var(--font-cinzel)" }}
                  >
                    {secondaryArchetype.name}
                  </h4>
                  <p className="text-xs text-amber-200/70">{secondaryArchetype.element} · {secondaryArchetype.principle}</p>
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
            style={{ background: "rgba(26,10,58,0.5)" }}
          >
            {/* SVG-сцена */}
            <div className="aspect-[5/3] w-full overflow-hidden">
              {renderScene(option, currentQ)}
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
