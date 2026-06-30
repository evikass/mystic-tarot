import { TarotCard, suitInfo } from "./tarot-data"
import type { ReactElement } from "react"

interface CardSVGProps {
  card: TarotCard
  isReversed?: boolean
  width?: number
  height?: number
  className?: string
}

// === Утилиты для символов ===
function getRankSymbol(rank?: string): string {
  switch (rank) {
    case "ace": return "A"
    case "two": return "II"
    case "three": return "III"
    case "four": return "IV"
    case "five": return "V"
    case "six": return "VI"
    case "seven": return "VII"
    case "eight": return "VIII"
    case "nine": return "IX"
    case "ten": return "X"
    case "page": return "П"
    case "knight": return "R"
    case "queen": return "Q"
    case "king": return "K"
    default: return ""
  }
}

function getSuitSymbol(suit: string): string {
  switch (suit) {
    case "wands": return "🜂"
    case "cups": return "🜄"
    case "swords": return "🜁"
    case "pentacles": return "🜃"
    default: return "✦"
  }
}

function getMajorSymbol(number: number): { roman: string; symbol: string } {
  const symbols: Record<number, string> = {
    0: "☉", 1: "☿", 2: "☾", 3: "♀", 4: "♂", 5: "♃", 6: "♊", 7: "♋",
    8: "♌", 9: "♍", 10: "♃", 11: "♎", 12: "♆", 13: "♏", 14: "♐",
    15: "♑", 16: "♂", 17: "♒", 18: "♓", 19: "☉", 20: "♇", 21: "♄",
  }
  const romans: Record<number, string> = {
    0: "0", 1: "I", 2: "II", 3: "III", 4: "IV", 5: "V", 6: "VI", 7: "VII",
    8: "VIII", 9: "IX", 10: "X", 11: "XI", 12: "XII", 13: "XIII", 14: "XIV",
    15: "XV", 16: "XVI", 17: "XVII", 18: "XVIII", 19: "XIX", 20: "XX", 21: "XXI"
  }
  return { roman: romans[number] || "", symbol: symbols[number] || "✦" }
}

// === Мистические узоры по краям карты (бордюр) — центр остаётся чистым для иллюстрации ===
function EdgeOrnaments({ accent }: { accent: string }) {
  return (
    <g opacity="0.85">
      {/* === ВЕРХНИЙ БОРДЮР (между угловой плашкой и центром) === */}
      {/* Линия-разделитель */}
      <line x1="50" y1="42" x2="150" y2="42" stroke={accent} strokeWidth="0.6" opacity="0.7"/>
      <line x1="55" y1="45" x2="145" y2="45" stroke={accent} strokeWidth="0.3" opacity="0.4"/>

      {/* Центральный медальон сверху — ромб с точкой */}
      <g transform="translate(100, 42)">
        <path d="M 0 -5 L 5 0 L 0 5 L -5 0 Z" fill="none" stroke={accent} strokeWidth="0.8" opacity="0.85"/>
        <path d="M 0 -3 L 3 0 L 0 3 L -3 0 Z" fill={accent} opacity="0.4"/>
        <circle r="1" fill={accent}/>
      </g>
      {/* Тройные точки по бокам от медальона */}
      <circle cx="80" cy="42" r="0.8" fill={accent} opacity="0.7"/>
      <circle cx="75" cy="42" r="0.6" fill={accent} opacity="0.5"/>
      <circle cx="70" cy="42" r="0.5" fill={accent} opacity="0.4"/>
      <circle cx="120" cy="42" r="0.8" fill={accent} opacity="0.7"/>
      <circle cx="125" cy="42" r="0.6" fill={accent} opacity="0.5"/>
      <circle cx="130" cy="42" r="0.5" fill={accent} opacity="0.4"/>
      {/* Декоративные завитки */}
      <path d="M 50 42 Q 53 39 56 42 Q 53 45 50 42" fill="none" stroke={accent} strokeWidth="0.4" opacity="0.6"/>
      <path d="M 150 42 Q 147 39 144 42 Q 147 45 150 42" fill="none" stroke={accent} strokeWidth="0.4" opacity="0.6"/>

      {/* === НИЖНИЙ БОРДЮР (над плашкой с названием) === */}
      <line x1="50" y1="258" x2="150" y2="258" stroke={accent} strokeWidth="0.6" opacity="0.7"/>
      <line x1="55" y1="261" x2="145" y2="261" stroke={accent} strokeWidth="0.3" opacity="0.4"/>

      {/* Центральный медальон снизу — звезда */}
      <g transform="translate(100, 258)">
        <path d="M 0 -5 L 1.5 -1.5 L 5 -1.5 L 2 1 L 3.5 5 L 0 2.5 L -3.5 5 L -2 1 L -5 -1.5 L -1.5 -1.5 Z" fill={accent} opacity="0.7"/>
        <circle r="0.8" fill="rgba(255,255,255,0.9)"/>
      </g>
      <circle cx="80" cy="258" r="0.8" fill={accent} opacity="0.7"/>
      <circle cx="75" cy="258" r="0.6" fill={accent} opacity="0.5"/>
      <circle cx="70" cy="258" r="0.5" fill={accent} opacity="0.4"/>
      <circle cx="120" cy="258" r="0.8" fill={accent} opacity="0.7"/>
      <circle cx="125" cy="258" r="0.6" fill={accent} opacity="0.5"/>
      <circle cx="130" cy="258" r="0.5" fill={accent} opacity="0.4"/>
      <path d="M 50 258 Q 53 255 56 258 Q 53 261 50 258" fill="none" stroke={accent} strokeWidth="0.4" opacity="0.6"/>
      <path d="M 150 258 Q 147 255 144 258 Q 147 261 150 258" fill="none" stroke={accent} strokeWidth="0.4" opacity="0.6"/>

      {/* === ЛЕВЫЙ БОРДЮР (вертикальные элементы) === */}
      {/* Древние руны сверху-середина-снизу */}
      <text x="25" y="100" fontSize="9" textAnchor="middle" fill={accent} opacity="0.7">ᚠ</text>
      <text x="25" y="160" fontSize="10" textAnchor="middle" fill={accent} opacity="0.8">ᛉ</text>
      <text x="25" y="220" fontSize="9" textAnchor="middle" fill={accent} opacity="0.7">ᛟ</text>
      {/* Тонкие вертикальные линии */}
      <line x1="20" y1="70" x2="20" y2="90" stroke={accent} strokeWidth="0.4" opacity="0.5"/>
      <line x1="20" y1="110" x2="20" y2="145" stroke={accent} strokeWidth="0.4" opacity="0.4"/>
      <line x1="20" y1="175" x2="20" y2="210" stroke={accent} strokeWidth="0.4" opacity="0.4"/>
      <line x1="20" y1="230" x2="20" y2="250" stroke={accent} strokeWidth="0.4" opacity="0.5"/>
      {/* Малые звёзды */}
      <text x="25" y="130" fontSize="4" textAnchor="middle" fill={accent} opacity="0.6">✦</text>
      <text x="25" y="190" fontSize="4" textAnchor="middle" fill={accent} opacity="0.6">✦</text>

      {/* === ПРАВЫЙ БОРДЮР (зеркально левому) === */}
      <text x="175" y="100" fontSize="9" textAnchor="middle" fill={accent} opacity="0.7">ᚦ</text>
      <text x="175" y="160" fontSize="10" textAnchor="middle" fill={accent} opacity="0.8">ᛗ</text>
      <text x="175" y="220" fontSize="9" textAnchor="middle" fill={accent} opacity="0.7">ᛇ</text>
      <line x1="180" y1="70" x2="180" y2="90" stroke={accent} strokeWidth="0.4" opacity="0.5"/>
      <line x1="180" y1="110" x2="180" y2="145" stroke={accent} strokeWidth="0.4" opacity="0.4"/>
      <line x1="180" y1="175" x2="180" y2="210" stroke={accent} strokeWidth="0.4" opacity="0.4"/>
      <line x1="180" y1="230" x2="180" y2="250" stroke={accent} strokeWidth="0.4" opacity="0.5"/>
      <text x="175" y="130" fontSize="4" textAnchor="middle" fill={accent} opacity="0.6">✦</text>
      <text x="175" y="190" fontSize="4" textAnchor="middle" fill={accent} opacity="0.6">✦</text>

      {/* === УГЛОВЫЕ ДЕКОРАТИВНЫЕ ЭЛЕМЕНТЫ (между плашками) === */}
      {/* Верхний-левый угол */}
      <path d="M 50 50 Q 50 55 45 55" fill="none" stroke={accent} strokeWidth="0.5" opacity="0.6"/>
      <path d="M 50 50 L 53 53" stroke={accent} strokeWidth="0.5" opacity="0.5"/>
      {/* Верхний-правый */}
      <path d="M 150 50 Q 150 55 155 55" fill="none" stroke={accent} strokeWidth="0.5" opacity="0.6"/>
      <path d="M 150 50 L 147 53" stroke={accent} strokeWidth="0.5" opacity="0.5"/>
      {/* Нижний-левый */}
      <path d="M 50 250 Q 50 245 45 245" fill="none" stroke={accent} strokeWidth="0.5" opacity="0.6"/>
      <path d="M 50 250 L 53 247" stroke={accent} strokeWidth="0.5" opacity="0.5"/>
      {/* Нижний-правый */}
      <path d="M 150 250 Q 150 245 155 245" fill="none" stroke={accent} strokeWidth="0.5" opacity="0.6"/>
      <path d="M 150 250 L 147 247" stroke={accent} strokeWidth="0.5" opacity="0.5"/>
    </g>
  )
}

// === Декоративная рамка с орнаментом ===
function OrnateBorder({ accent }: { accent: string }) {
  return (
    <g>
      {/* Внешняя рамка */}
      <rect x="6" y="6" width="188" height="308" fill="none" stroke={accent} strokeWidth="1.5" opacity="0.7" rx="6"/>
      <rect x="9" y="9" width="182" height="302" fill="none" stroke={accent} strokeWidth="0.5" opacity="0.5" rx="4"/>

      {/* Внутренняя двойная рамка */}
      <rect x="14" y="14" width="172" height="292" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" rx="3"/>

      {/* Угловые орнаменты — стилизованные лилии */}
      {[
        [18, 18], [182, 18], [18, 302], [182, 302],
      ].map(([x, y], i) => (
        <g key={i}>
          <path d={`M ${x} ${y} L ${x + (i % 2 === 0 ? 14 : -14)} ${y} L ${x + (i % 2 === 0 ? 14 : -14)} ${y + (i < 2 ? 2 : -2)} L ${x + (i % 2 === 0 ? 2 : -2)} ${y + (i < 2 ? 2 : -2)} L ${x + (i % 2 === 0 ? 2 : -2)} ${y + (i < 2 ? 14 : -14)} L ${x} ${y + (i < 2 ? 14 : -14)} Z`} fill={accent} opacity="0.8"/>
          <circle cx={x + (i % 2 === 0 ? 17 : -17)} cy={y + (i < 2 ? 17 : -17)} r="1.5" fill={accent} opacity="0.7"/>
          <circle cx={x + (i % 2 === 0 ? 17 : -17)} cy={y + (i < 2 ? 17 : -17)} r="3" fill="none" stroke={accent} strokeWidth="0.4" opacity="0.5"/>
        </g>
      ))}
    </g>
  )
}

// === Иллюстрации Старших Арканов — детализированные ===
function MajorArcanaArt({ card }: { card: TarotCard }) {
  const map: Record<string, ReactElement> = {
    // 0. ШУТ — путник на краю пропасти с собакой и солнцем
    "major-0": (
      <g>
        {/* Солнце с лучами */}
        <circle cx="155" cy="80" r="10" fill="#fbbf24" opacity="0.9"/>
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2
          return <line key={i} x1={155 + Math.cos(a) * 10} y1={80 + Math.sin(a) * 10} x2={155 + Math.cos(a) * 14} y2={80 + Math.sin(a) * 14} stroke="#fbbf24" strokeWidth="1" opacity="0.8"/>
        })}
        {/* Пейзаж — горы */}
        <path d="M 30 240 L 60 180 L 90 240 Z" fill="rgba(125,211,252,0.2)" stroke="#7dd3fc" strokeWidth="0.6" opacity="0.7"/>
        <path d="M 110 240 L 145 175 L 175 240 Z" fill="rgba(125,211,252,0.25)" stroke="#7dd3fc" strokeWidth="0.6" opacity="0.8"/>
        {/* Утёс под ногами */}
        <path d="M 60 240 L 100 200 L 140 240 Z" fill="rgba(45,27,78,0.6)" stroke="#7dd3fc" strokeWidth="0.8"/>
        {/* Фигура Шута */}
        <ellipse cx="100" cy="115" rx="9" ry="10" fill="rgba(255,255,255,0.6)" stroke="#7dd3fc" strokeWidth="1"/>
        {/* Шапка с красным пером */}
        <path d="M 92 110 Q 100 95 108 110 L 105 113 L 95 113 Z" fill="rgba(220,38,38,0.5)" stroke="#fbbf24" strokeWidth="0.8"/>
        <path d="M 108 105 Q 120 100 118 90 Q 115 95 110 95" fill="#dc2626" stroke="#fbbf24" strokeWidth="0.5"/>
        {/* Тело в пёстром костюме */}
        <path d="M 88 220 L 92 130 L 108 130 L 112 220 Z" fill="rgba(125,211,252,0.4)" stroke="#7dd3fc" strokeWidth="1"/>
        {/* Узоры на костюме */}
        <circle cx="100" cy="155" r="3" fill="#fbbf24" opacity="0.7"/>
        <circle cx="96" cy="180" r="2" fill="#dc2626" opacity="0.7"/>
        <circle cx="104" cy="180" r="2" fill="#a78bfa" opacity="0.7"/>
        <path d="M 95 200 L 105 200" stroke="#fbbf24" strokeWidth="0.6"/>
        {/* Ноги */}
        <path d="M 95 220 L 92 245" stroke="#7dd3fc" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M 105 220 L 110 240" stroke="#7dd3fc" strokeWidth="2.5" strokeLinecap="round"/>
        {/* Посох с узелком на плече */}
        <line x1="78" y1="220" x2="125" y2="115" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round"/>
        <ellipse cx="125" cy="115" rx="8" ry="6" fill="rgba(220,38,38,0.5)" stroke="#fbbf24" strokeWidth="1"/>
        <path d="M 122 113 L 128 117 M 122 117 L 128 113" stroke="#fbbf24" strokeWidth="0.5"/>
        {/* Маленькая собака у ног */}
        <ellipse cx="78" cy="238" rx="6" ry="3" fill="rgba(255,255,255,0.5)" stroke="#7dd3fc" strokeWidth="0.8"/>
        <circle cx="73" cy="236" r="2" fill="rgba(255,255,255,0.7)" stroke="#7dd3fc" strokeWidth="0.5"/>
        <path d="M 71 234 L 70 231 M 73 233 L 73 230" stroke="#7dd3fc" strokeWidth="0.5"/>
        {/* Розы у ног */}
        <circle cx="130" cy="245" r="3" fill="#dc2626" stroke="#fbbf24" strokeWidth="0.5"/>
        <circle cx="135" cy="248" r="2" fill="#dc2626" stroke="#fbbf24" strokeWidth="0.5"/>
      </g>
    ),

    // I. МАГ — фигура перед алтарем с 4 стихиями, лемниската над головой
    "major-1": (
      <g>
        {/* Лемниската (бесконечность) */}
        <path d="M 90 80 Q 95 73 100 80 Q 105 73 110 80 Q 105 87 100 80 Q 95 87 90 80 Z" fill="#fbbf24" stroke="#fef3c7" strokeWidth="0.5"/>
        {/* Сияние над головой */}
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * Math.PI - Math.PI
          return <line key={i} x1={100} y1={70} x2={100 + Math.cos(a) * 10} y2={70 + Math.sin(a) * 10} stroke="#fbbf24" strokeWidth="0.8" opacity="0.7"/>
        })}
        {/* Голова */}
        <circle cx="100" cy="100" r="9" fill="rgba(255,255,255,0.6)" stroke="#fbbf24" strokeWidth="1"/>
        {/* Тело в мантии */}
        <path d="M 86 220 L 90 115 L 110 115 L 114 220 Z" fill="rgba(251,191,36,0.3)" stroke="#fbbf24" strokeWidth="1.2"/>
        {/* Узор на мантии — змея */}
        <path d="M 95 140 Q 100 145 105 140 Q 110 145 105 150 Q 100 155 95 150 Q 90 155 95 160" fill="none" stroke="#fbbf24" strokeWidth="0.8"/>
        {/* Рука с жезлом вверх */}
        <line x1="92" y1="135" x2="68" y2="85" stroke="#7dd3fc" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="68" y1="85" x2="68" y2="68" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="68" cy="63" r="5" fill="#fbbf24" stroke="#fef3c7" strokeWidth="0.8"/>
        {/* Рука вниз к столу */}
        <line x1="108" y1="135" x2="130" y2="170" stroke="#7dd3fc" strokeWidth="2.5" strokeLinecap="round"/>
        {/* Алтарь/стол */}
        <rect x="125" y="180" width="55" height="6" fill="rgba(45,27,78,0.6)" stroke="#fbbf24" strokeWidth="1"/>
        <line x1="130" y1="186" x2="130" y2="215" stroke="#fbbf24" strokeWidth="1.5"/>
        <line x1="175" y1="186" x2="175" y2="215" stroke="#fbbf24" strokeWidth="1.5"/>
        {/* 4 символа стихий на столе */}
        {/* Чаша (Вода) */}
        <path d="M 138 170 L 141 180 L 151 180 L 154 170 Z" fill="rgba(96,165,250,0.6)" stroke="#7dd3fc" strokeWidth="1"/>
        <path d="M 146 168 Q 146 172 144 172 M 146 168 Q 146 172 148 172" fill="none" stroke="#7dd3fc" strokeWidth="0.4"/>
        {/* Меч (Воздух) */}
        <line x1="160" y1="160" x2="160" y2="180" stroke="#cbd5e1" strokeWidth="1.8"/>
        <line x1="156" y1="163" x2="164" y2="163" stroke="#fbbf24" strokeWidth="1.2"/>
        <circle cx="160" cy="158" r="1.5" fill="#fbbf24"/>
        {/* Пентакль (Земля) */}
        <circle cx="170" cy="175" r="4" fill="rgba(163,230,53,0.4)" stroke="#a3e635" strokeWidth="0.8"/>
        <path d="M 170 171 L 171.5 174 L 174 174 L 172 176 L 173 179 L 170 177 L 167 179 L 168 176 L 166 174 L 168.5 174 Z" fill="#a3e635"/>
        {/* Жезл (Огонь) уже в руке */}
        {/* Растения и цветы на полу */}
        <path d="M 30 245 L 35 240 L 32 235 L 38 230 L 35 225" fill="none" stroke="#86efac" strokeWidth="1"/>
        <circle cx="35" cy="240" r="2" fill="#dc2626"/>
        <circle cx="38" cy="230" r="2" fill="#fbbf24"/>
        <path d="M 165 245 L 170 240 L 168 235 L 172 230" fill="none" stroke="#86efac" strokeWidth="1"/>
        <circle cx="170" cy="240" r="2" fill="#dc2626"/>
      </g>
    ),

    // II. ВЕРХОВНАЯ ЖРИЦА — между двумя колоннами с луной и свитком Торы
    "major-2": (
      <g>
        {/* Левая колонна — тёмная (Боаз) */}
        <rect x="35" y="70" width="22" height="180" fill="rgba(28,43,67,0.7)" stroke="#a78bfa" strokeWidth="1.5"/>
        <rect x="32" y="65" width="28" height="8" fill="#a78bfa" opacity="0.8"/>
        <rect x="32" y="248" width="28" height="8" fill="#a78bfa" opacity="0.8"/>
        <text x="46" y="160" fontSize="14" textAnchor="middle" fill="#a78bfa" opacity="0.7" fontWeight="bold">B</text>
        {/* Капитель с орнаментом */}
        <path d="M 35 75 L 40 70 L 46 73 L 52 70 L 57 75" fill="none" stroke="#a78bfa" strokeWidth="0.8"/>

        {/* Правая колонна — светлая (Иахин) */}
        <rect x="143" y="70" width="22" height="180" fill="rgba(255,255,255,0.5)" stroke="#fbbf24" strokeWidth="1.5"/>
        <rect x="140" y="65" width="28" height="8" fill="#fbbf24" opacity="0.8"/>
        <rect x="140" y="248" width="28" height="8" fill="#fbbf24" opacity="0.8"/>
        <text x="154" y="160" fontSize="14" textAnchor="middle" fill="#fbbf24" opacity="0.7" fontWeight="bold">J</text>
        <path d="M 143 75 L 148 70 L 154 73 L 160 70 L 165 75" fill="none" stroke="#fbbf24" strokeWidth="0.8"/>

        {/* Завеса между колоннами с гранатами */}
        <path d="M 57 70 Q 100 75 143 70 L 143 250 Q 100 245 57 250 Z" fill="rgba(167,139,250,0.15)" stroke="#a78bfa" strokeWidth="0.8"/>
        {/* Узоры на завесе — гранаты */}
        {[
          [70, 100], [85, 130], [100, 100], [115, 130], [130, 100],
          [70, 180], [85, 210], [100, 180], [115, 210], [130, 180],
        ].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="3" fill="#dc2626" opacity="0.7" stroke="#fbbf24" strokeWidth="0.4"/>
            <path d={`M ${x-2} ${y-2} L ${x+2} ${y-2}`} stroke="#86efac" strokeWidth="0.6"/>
          </g>
        ))}

        {/* Фигура Жрицы */}
        <path d="M 88 230 L 92 130 Q 100 122 108 130 L 112 230 Z" fill="rgba(167,139,250,0.4)" stroke="#a78bfa" strokeWidth="1.2"/>
        <circle cx="100" cy="118" r="9" fill="rgba(255,255,255,0.6)" stroke="#a78bfa" strokeWidth="1"/>
        {/* Корона с тремя фазами луны */}
        <path d="M 91 110 L 95 100 Q 95 96 97 100" fill="none" stroke="#fbbf24" strokeWidth="1"/>
        <circle cx="100" cy="100" r="3" fill="#fbbf24"/>
        <path d="M 109 110 L 105 100 Q 105 96 103 100" fill="none" stroke="#fbbf24" strokeWidth="1"/>
        {/* Полумесяц у ног */}
        <path d="M 88 240 A 14 14 0 1 0 112 240 A 10 10 0 1 1 88 240 Z" fill="rgba(196,181,253,0.8)" stroke="#a78bfa" strokeWidth="0.8"/>
        {/* Свиток ТОРЫ в руках */}
        <rect x="84" y="155" width="32" height="14" fill="rgba(255,255,255,0.7)" stroke="#fbbf24" strokeWidth="0.8" rx="2"/>
        <text x="100" y="165" fontSize="5" textAnchor="middle" fill="#a78bfa" fontWeight="bold">TORA</text>
        {/* Скрытое лицо — частично закрыто завесой */}
        <path d="M 92 120 Q 100 124 108 120" fill="none" stroke="#a78bfa" strokeWidth="0.5"/>

        {/* Крест на груди */}
        <line x1="100" y1="140" x2="100" y2="170" stroke="#fbbf24" strokeWidth="0.8"/>
        <line x1="96" y1="150" x2="104" y2="150" stroke="#fbbf24" strokeWidth="0.8"/>
      </g>
    ),

    // III. ИМПЕРАТРИЦА — на троне с венком из 12 звёзд и пшеницей
    "major-3": (
      <g>
        {/* Лес-фон */}
        <path d="M 25 200 Q 35 150 45 200" fill="rgba(134,239,172,0.2)" stroke="#86efac" strokeWidth="0.5"/>
        <path d="M 45 200 Q 55 145 65 200" fill="rgba(134,239,172,0.25)" stroke="#86efac" strokeWidth="0.5"/>
        <path d="M 140 200 Q 150 145 160 200" fill="rgba(134,239,172,0.25)" stroke="#86efac" strokeWidth="0.5"/>
        <path d="M 155 200 Q 165 150 175 200" fill="rgba(134,239,172,0.2)" stroke="#86efac" strokeWidth="0.5"/>

        {/* Трон с подлокотниками-сфинксами */}
        <rect x="60" y="170" width="80" height="85" fill="rgba(134,239,172,0.2)" stroke="#86efac" strokeWidth="1.5"/>
        <rect x="55" y="100" width="90" height="12" fill="rgba(134,239,172,0.35)" stroke="#86efac" strokeWidth="1.5"/>
        {/* Узоры на троне — сердце и кресты */}
        <path d="M 100 220 Q 95 215 95 225 Q 95 232 100 235 Q 105 232 105 225 Q 105 215 100 220 Z" fill="rgba(220,38,38,0.4)" stroke="#fbbf24" strokeWidth="0.5"/>
        <path d="M 95 205 L 105 205" stroke="#fbbf24" strokeWidth="0.6"/>
        <path d="M 95 195 L 105 195" stroke="#fbbf24" strokeWidth="0.6"/>

        {/* Фигура Императрицы */}
        <path d="M 86 225 L 90 130 L 110 130 L 114 225 Z" fill="rgba(134,239,172,0.4)" stroke="#86efac" strokeWidth="1.2"/>
        {/* Платье с узорами — пшеница */}
        <path d="M 92 160 L 92 200 M 96 160 L 96 200 M 100 160 L 100 200 M 104 160 L 104 200 M 108 160 L 108 200" stroke="#fbbf24" strokeWidth="0.4" opacity="0.7"/>
        {[
          [92, 165], [96, 175], [100, 165], [104, 175], [108, 165],
          [96, 195], [104, 195]
        ].map(([x, y], i) => (
          <ellipse key={i} cx={x} cy={y} rx="1.5" ry="2" fill="#fbbf24" opacity="0.8"/>
        ))}
        <circle cx="100" cy="120" r="10" fill="rgba(255,255,255,0.6)" stroke="#86efac" strokeWidth="1"/>

        {/* Корона из 12 звёзд */}
        {Array.from({ length: 9 }).map((_, i) => {
          const angle = (i / 8) * Math.PI - Math.PI
          const x = 100 + Math.cos(angle) * 16
          const y = 105 + Math.sin(angle) * 6
          return <text key={i} x={x} y={y + 1} fontSize="5" textAnchor="middle" fill="#fbbf24">★</text>
        })}

        {/* Скипетр с globe (земной шар) */}
        <line x1="78" y1="160" x2="72" y2="130" stroke="#fbbf24" strokeWidth="2"/>
        <circle cx="72" cy="125" r="5" fill="rgba(134,239,172,0.5)" stroke="#fbbf24" strokeWidth="1"/>
        <path d="M 68 125 L 76 125 M 72 121 L 72 129" stroke="#fbbf24" strokeWidth="0.4"/>

        {/* Щит с символом Венеры ♀ */}
        <circle cx="130" cy="170" r="9" fill="rgba(134,239,172,0.4)" stroke="#fbbf24" strokeWidth="1.2"/>
        <circle cx="130" cy="167" r="3" fill="none" stroke="#fbbf24" strokeWidth="1"/>
        <line x1="130" y1="170" x2="130" y2="178" stroke="#fbbf24" strokeWidth="1.2"/>
        <line x1="127" y1="175" x2="133" y2="175" stroke="#fbbf24" strokeWidth="1.2"/>

        {/* Пшеница у ног */}
        <g>
          <line x1="80" y1="255" x2="80" y2="240" stroke="#fbbf24" strokeWidth="1"/>
          {[243, 247, 251].map((y, i) => (
            <g key={i}>
              <ellipse cx="78" cy={y} rx="1.5" ry="2" fill="#fbbf24"/>
              <ellipse cx="82" cy={y} rx="1.5" ry="2" fill="#fbbf24"/>
            </g>
          ))}
        </g>
        <g>
          <line x1="120" y1="255" x2="120" y2="240" stroke="#fbbf24" strokeWidth="1"/>
          {[243, 247, 251].map((y, i) => (
            <g key={i}>
              <ellipse cx="118" cy={y} rx="1.5" ry="2" fill="#fbbf24"/>
              <ellipse cx="122" cy={y} rx="1.5" ry="2" fill="#fbbf24"/>
            </g>
          ))}
        </g>

        {/* Река внизу */}
        <path d="M 25 257 Q 60 252 100 257 Q 140 262 175 257" fill="none" stroke="#60a5fa" strokeWidth="1.5"/>
        <path d="M 30 260 Q 65 256 100 260 Q 135 264 170 260" fill="none" stroke="#60a5fa" strokeWidth="0.8" opacity="0.6"/>
      </g>
    ),

    // IV. ИМПЕРАТОР — на каменном троне с орлом и скипетром-Анкх
    "major-4": (
      <g>
        {/* Горы вдалеке */}
        <path d="M 20 220 L 50 165 L 80 220 Z" fill="rgba(248,113,113,0.2)" stroke="#f87171" strokeWidth="0.5"/>
        <path d="M 120 220 L 150 165 L 180 220 Z" fill="rgba(248,113,113,0.25)" stroke="#f87171" strokeWidth="0.5"/>

        {/* Каменный трон */}
        <rect x="60" y="165" width="80" height="90" fill="rgba(127,29,29,0.4)" stroke="#f87171" strokeWidth="1.5"/>
        <rect x="55" y="95" width="90" height="12" fill="rgba(127,29,29,0.5)" stroke="#f87171" strokeWidth="1.5"/>
        {/* Орнамент на троне — 4 барельефа овнов */}
        {[
          [70, 200], [85, 200], [115, 200], [130, 200],
        ].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="4" fill="rgba(248,113,113,0.4)" stroke="#fbbf24" strokeWidth="0.5"/>
            <path d={`M ${x-3} ${y-1} Q ${x-5} ${y-4} ${x-2} ${y-3} Z`} fill="#fbbf24" opacity="0.7"/>
            <path d={`M ${x+3} ${y-1} Q ${x+5} ${y-4} ${x+2} ${y-3} Z`} fill="#fbbf24" opacity="0.7"/>
          </g>
        ))}

        {/* Фигура Императора */}
        <path d="M 86 220 L 90 130 L 110 130 L 114 220 Z" fill="rgba(248,113,113,0.4)" stroke="#f87171" strokeWidth="1.2"/>
        {/* Доспех с орлом */}
        <path d="M 92 145 L 108 145 L 105 165 L 95 165 Z" fill="rgba(251,191,36,0.5)" stroke="#fbbf24" strokeWidth="0.6"/>
        <path d="M 100 148 L 100 162 M 96 152 L 104 152" stroke="#dc2626" strokeWidth="0.5"/>
        <circle cx="100" cy="120" r="10" fill="rgba(255,255,255,0.6)" stroke="#f87171" strokeWidth="1"/>

        {/* Корона с зубцами */}
        <path d="M 90 105 L 90 95 L 94 100 L 96 92 L 100 100 L 104 92 L 106 100 L 110 95 L 110 105 Z" fill="#fbbf24" stroke="#fef3c7" strokeWidth="0.6"/>

        {/* Борода */}
        <path d="M 94 130 L 92 145 L 108 145 L 106 130 Z" fill="rgba(255,255,255,0.6)" stroke="#f87171" strokeWidth="0.5"/>
        <line x1="100" y1="130" x2="100" y2="143" stroke="#f87171" strokeWidth="0.5"/>

        {/* Скипетр-Анкх в левой руке */}
        <line x1="76" y1="155" x2="76" y2="200" stroke="#fbbf24" strokeWidth="2.5"/>
        <circle cx="76" cy="148" r="6" fill="none" stroke="#fbbf24" strokeWidth="2.5"/>
        <line x1="71" y1="155" x2="81" y2="155" stroke="#fbbf24" strokeWidth="2"/>

        {/* Глобус-шар в правой руке */}
        <line x1="124" y1="155" x2="130" y2="175" stroke="#7dd3fc" strokeWidth="2"/>
        <circle cx="130" cy="180" r="6" fill="rgba(96,165,250,0.4)" stroke="#fbbf24" strokeWidth="1"/>
        <path d="M 124 180 Q 130 178 136 180 M 130 174 L 130 186" stroke="#fbbf24" strokeWidth="0.4"/>

        {/* Орёл на спинке трона */}
        <path d="M 95 95 Q 100 88 105 95 L 103 102 L 97 102 Z" fill="#fbbf24" opacity="0.6" stroke="#fef3c7" strokeWidth="0.4"/>
        <path d="M 100 100 L 100 105 M 97 102 L 103 102" stroke="#fbbf24" strokeWidth="0.4"/>
      </g>
    ),

    // V. ИЕРОФАНТ — на троне с двумя учениками и ключами
    "major-5": (
      <g>
        {/* Трон с резными колоннами */}
        <rect x="60" y="180" width="80" height="70" fill="rgba(253,230,138,0.2)" stroke="#fde68a" strokeWidth="1.5"/>
        <rect x="55" y="100" width="90" height="12" fill="rgba(253,230,138,0.35)" stroke="#fde68a" strokeWidth="1.5"/>
        {/* Колонны трона с резьбой */}
        <rect x="62" y="112" width="6" height="68" fill="rgba(253,230,138,0.3)" stroke="#fde68a" strokeWidth="0.6"/>
        <rect x="132" y="112" width="6" height="68" fill="rgba(253,230,138,0.3)" stroke="#fde68a" strokeWidth="0.6"/>
        {/* Узоры на колоннах */}
        {[
          [65, 120], [65, 140], [65, 160],
          [135, 120], [135, 140], [135, 160],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="1.5" fill="#fde68a" opacity="0.7"/>
        ))}

        {/* Фигура Иерофанта в папской тиаре */}
        <path d="M 88 220 L 92 130 L 108 130 L 112 220 Z" fill="rgba(253,230,138,0.4)" stroke="#fde68a" strokeWidth="1.2"/>
        {/* Узоры на мантии — кресты */}
        <line x1="100" y1="155" x2="100" y2="180" stroke="#fbbf24" strokeWidth="0.8"/>
        <line x1="95" y1="165" x2="105" y2="165" stroke="#fbbf24" strokeWidth="0.8"/>
        <line x1="100" y1="185" x2="100" y2="210" stroke="#fbbf24" strokeWidth="0.8"/>
        <line x1="96" y1="195" x2="104" y2="195" stroke="#fbbf24" strokeWidth="0.8"/>

        <circle cx="100" cy="120" r="9" fill="rgba(255,255,255,0.6)" stroke="#fde68a" strokeWidth="1"/>

        {/* Тройная папская тиара */}
        <ellipse cx="100" cy="108" rx="9" ry="3" fill="#fbbf24" stroke="#fef3c7" strokeWidth="0.5"/>
        <ellipse cx="100" cy="103" rx="7" ry="3" fill="#fbbf24" stroke="#fef3c7" strokeWidth="0.5"/>
        <ellipse cx="100" cy="98" rx="5" ry="3" fill="#fbbf24" stroke="#fef3c7" strokeWidth="0.5"/>
        <line x1="100" y1="95" x2="100" y2="90" stroke="#fbbf24" strokeWidth="1.5"/>
        <circle cx="100" cy="88" r="2" fill="#fef3c7"/>

        {/* Жезл с тройным крестом */}
        <line x1="76" y1="160" x2="76" y2="215" stroke="#fbbf24" strokeWidth="2.5"/>
        <line x1="71" y1="170" x2="81" y2="170" stroke="#fbbf24" strokeWidth="2"/>
        <line x1="73" y1="175" x2="79" y2="175" stroke="#fbbf24" strokeWidth="2"/>
        <circle cx="76" cy="165" r="2" fill="#fbbf24"/>

        {/* Два ключи от неба и земли у ног */}
        <g transform="translate(60, 230)">
          <circle cx="0" cy="0" r="4" fill="none" stroke="#fde68a" strokeWidth="1.5"/>
          <line x1="0" y1="4" x2="0" y2="14" stroke="#fde68a" strokeWidth="1.5"/>
          <line x1="0" y1="10" x2="3" y2="10" stroke="#fde68a" strokeWidth="1.5"/>
          <line x1="0" y1="13" x2="3" y2="13" stroke="#fde68a" strokeWidth="1.5"/>
        </g>
        <g transform="translate(140, 230)">
          <circle cx="0" cy="0" r="4" fill="none" stroke="#fde68a" strokeWidth="1.5"/>
          <line x1="0" y1="4" x2="0" y2="14" stroke="#fde68a" strokeWidth="1.5"/>
          <line x1="0" y1="10" x2="-3" y2="10" stroke="#fde68a" strokeWidth="1.5"/>
          <line x1="0" y1="13" x2="-3" y2="13" stroke="#fde68a" strokeWidth="1.5"/>
        </g>

        {/* Два ученика внизу */}
        <g>
          <circle cx="35" cy="225" r="6" fill="rgba(96,165,250,0.6)" stroke="#fde68a" strokeWidth="0.8"/>
          <path d="M 30 250 L 32 230 L 38 230 L 40 250 Z" fill="rgba(96,165,250,0.4)" stroke="#fde68a" strokeWidth="0.8"/>
          {/* Тонзура */}
          <circle cx="35" cy="222" r="2" fill="rgba(255,255,255,0.5)"/>
        </g>
        <g>
          <circle cx="165" cy="225" r="6" fill="rgba(248,113,113,0.6)" stroke="#fde68a" strokeWidth="0.8"/>
          <path d="M 160 250 L 162 230 L 168 230 L 170 250 Z" fill="rgba(248,113,113,0.4)" stroke="#fde68a" strokeWidth="0.8"/>
          <circle cx="165" cy="222" r="2" fill="rgba(255,255,255,0.5)"/>
        </g>
      </g>
    ),

    // VI. ВЛЮБЛЁННЫЕ — ангел над мужчиной и женщиной у дерева
    "major-6": (
      <g>
        {/* Большое солнце над ангелом */}
        <circle cx="100" cy="45" r="10" fill="#fbbf24" opacity="0.9"/>
        {Array.from({ length: 10 }).map((_, i) => {
          const a = (i / 10) * Math.PI * 2
          return <line key={i} x1={100 + Math.cos(a) * 10} y1={45 + Math.sin(a) * 10} x2={100 + Math.cos(a) * 14} y2={45 + Math.sin(a) * 14} stroke="#fbbf24" strokeWidth="1" opacity="0.8"/>
        })}

        {/* Ангел Рафаил в облаках */}
        <ellipse cx="100" cy="75" rx="22" ry="8" fill="rgba(255,255,255,0.3)"/>
        <circle cx="100" cy="68" r="8" fill="rgba(255,255,255,0.6)" stroke="#fbbf24" strokeWidth="1"/>
        {/* Крылья большие */}
        <path d="M 80 70 Q 55 75 50 95 Q 70 85 85 88 Z" fill="rgba(255,255,255,0.5)" stroke="#fbbf24" strokeWidth="0.8"/>
        <path d="M 120 70 Q 145 75 150 95 Q 130 85 115 88 Z" fill="rgba(255,255,255,0.5)" stroke="#fbbf24" strokeWidth="0.8"/>
        {/* Перья на крыльях */}
        {[60, 65, 70, 75].map((x, i) => (
          <line key={i} x1={x} y1={85} x2={x} y2={92} stroke="#fbbf24" strokeWidth="0.4"/>
        ))}
        {[140, 135, 130, 125].map((x, i) => (
          <line key={i} x1={x} y1={85} x2={x} y2={92} stroke="#fbbf24" strokeWidth="0.4"/>
        ))}
        {/* Лук и стрела в руках */}
        <path d="M 88 80 Q 85 90 88 100" fill="none" stroke="#fbbf24" strokeWidth="1.2"/>
        <line x1="88" y1="82" x2="112" y2="82" stroke="#dc2626" strokeWidth="0.8"/>
        <path d="M 112 80 L 116 82 L 112 84" fill="#dc2626"/>

        {/* Мужчина слева (Адам) */}
        <path d="M 70 230 L 73 145 L 85 145 L 88 230 Z" fill="rgba(96,165,250,0.4)" stroke="#7dd3fc" strokeWidth="1"/>
        <circle cx="79" cy="135" r="8" fill="rgba(255,255,255,0.6)" stroke="#7dd3fc" strokeWidth="1"/>
        {/* Рука к ангелу */}
        <line x1="73" y1="155" x2="65" y2="120" stroke="#7dd3fc" strokeWidth="2"/>

        {/* Дерево позади мужчины — Знание добра и зла со змеем */}
        <line x1="55" y1="240" x2="55" y2="100" stroke="#86efac" strokeWidth="2.5"/>
        <ellipse cx="55" cy="95" rx="12" ry="15" fill="rgba(134,239,172,0.3)" stroke="#86efac" strokeWidth="1"/>
        {/* Плоды на дереве */}
        {[
          [50, 85], [60, 90], [55, 95], [52, 100], [58, 100]
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2" fill="#dc2626" stroke="#fbbf24" strokeWidth="0.3"/>
        ))}
        {/* Змей обвивает ствол */}
        <path d="M 55 110 Q 60 115 55 120 Q 50 125 55 130 Q 60 135 55 140" fill="none" stroke="#86efac" strokeWidth="1.5"/>
        <circle cx="55" cy="108" r="2" fill="#86efac"/>
        <path d="M 53 105 L 55 108 L 57 105" fill="#dc2626"/>

        {/* Женщина справа (Ева) */}
        <path d="M 113 230 L 115 145 L 127 145 L 130 230 Z" fill="rgba(249,168,212,0.4)" stroke="#f9a8d4" strokeWidth="1"/>
        <circle cx="121" cy="135" r="8" fill="rgba(255,255,255,0.6)" stroke="#f9a8d4" strokeWidth="1"/>
        {/* Рука к ангелу */}
        <line x1="127" y1="155" x2="135" y2="120" stroke="#f9a8d4" strokeWidth="2"/>

        {/* Дерево позади женщины — Жизни с плодами */}
        <line x1="145" y1="240" x2="145" y2="100" stroke="#86efac" strokeWidth="2.5"/>
        <ellipse cx="145" cy="95" rx="12" ry="15" fill="rgba(134,239,172,0.3)" stroke="#86efac" strokeWidth="1"/>
        {[
          [140, 85], [150, 90], [145, 95], [142, 100], [148, 100]
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2" fill="#fbbf24" stroke="#fef3c7" strokeWidth="0.3"/>
        ))}

        {/* Гора между ними */}
        <path d="M 88 240 L 100 195 L 112 240 Z" fill="rgba(220,38,38,0.3)" stroke="#f87171" strokeWidth="0.6"/>
        {/* Пламя на горе */}
        <path d="M 100 200 Q 95 195 100 190 Q 105 195 100 200" fill="#dc2626" opacity="0.7"/>
      </g>
    ),

    // VII. КОЛЕСНИЦА — воин в колеснице с двумя сфинксами
    "major-7": (
      <g>
        {/* Звёздный навес */}
        <path d="M 65 130 Q 100 105 135 130 L 135 145 L 65 145 Z" fill="rgba(96,165,250,0.4)" stroke="#60a5fa" strokeWidth="1.2"/>
        {/* Звёзды на навесе */}
        {[
          [75, 120], [85, 115], [95, 122], [105, 117], [115, 120], [125, 122],
          [80, 132], [90, 130], [100, 135], [110, 130], [120, 132]
        ].map(([x, y], i) => (
          <text key={i} x={x} y={y} fontSize="4" textAnchor="middle" fill="#fef3c7">✦</text>
        ))}

        {/* Корабль-кузов колесницы */}
        <rect x="70" y="145" width="60" height="50" fill="rgba(96,165,250,0.3)" stroke="#60a5fa" strokeWidth="1.5"/>
        {/* Узоры на кузове — лунные полумесяцы */}
        {[
          [80, 165], [100, 165], [120, 165]
        ].map(([x, y], i) => (
          <path key={i} d={`M ${x-3} ${y} A 3 3 0 1 1 ${x+3} ${y} A 2 2 0 1 0 ${x-3} ${y} Z`} fill="#fbbf24" opacity="0.7"/>
        ))}

        {/* Воин-возничий */}
        <circle cx="100" cy="125" r="9" fill="rgba(255,255,255,0.6)" stroke="#fbbf24" strokeWidth="1"/>
        {/* Шлем с венком */}
        <path d="M 91 122 Q 100 110 109 122" fill="rgba(248,113,113,0.5)" stroke="#fbbf24" strokeWidth="0.8"/>
        {[
          [93, 117], [97, 113], [100, 112], [103, 113], [107, 117]
        ].map(([x, y], i) => (
          <text key={i} x={x} y={y} fontSize="3" textAnchor="middle" fill="#fbbf24">★</text>
        ))}
        {/* Тело */}
        <path d="M 90 165 L 92 135 L 108 135 L 110 165 Z" fill="rgba(248,113,113,0.5)" stroke="#fbbf24" strokeWidth="1"/>
        {/* Нагрудник с квадратом */}
        <rect x="95" y="140" width="10" height="10" fill="rgba(251,191,36,0.6)" stroke="#fbbf24" strokeWidth="0.6"/>
        {/* Скипетр в руке */}
        <line x1="115" y1="155" x2="130" y2="140" stroke="#fbbf24" strokeWidth="2"/>
        <circle cx="132" cy="138" r="3" fill="#fbbf24" stroke="#fef3c7" strokeWidth="0.6"/>
        <line x1="130" y1="135" x2="134" y2="141" stroke="#fef3c7" strokeWidth="0.6"/>
        <line x1="134" y1="135" x2="130" y2="141" stroke="#fef3c7" strokeWidth="0.6"/>

        {/* Колёса с спицами */}
        {[80, 120].map((cx, idx) => (
          <g key={idx}>
            <circle cx={cx} cy="210" r="10" fill="rgba(45,27,78,0.5)" stroke="#fbbf24" strokeWidth="1.5"/>
            {Array.from({ length: 6 }).map((_, i) => {
              const a = (i / 6) * Math.PI * 2
              return <line key={i} x1={cx} y1={210} x2={cx + Math.cos(a) * 8} y2={210 + Math.sin(a) * 8} stroke="#fbbf24" strokeWidth="0.8"/>
            })}
            <circle cx={cx} cy={210} r="2" fill="#fbbf24"/>
          </g>
        ))}

        {/* Два сфинкса — один чёрный, один белый */}
        <g>
          <ellipse cx="45" cy="195" rx="20" ry="11" fill="rgba(28,43,67,0.7)" stroke="#7dd3fc" strokeWidth="1"/>
          <path d="M 32 195 Q 26 180 28 170 L 36 175 L 42 185 Z" fill="rgba(28,43,67,0.7)" stroke="#7dd3fc" strokeWidth="1"/>
          <circle cx="30" cy="172" r="3" fill="rgba(28,43,67,0.8)" stroke="#7dd3fc" strokeWidth="0.8"/>
          {/* Грива/крылья */}
          <path d="M 32 178 Q 28 175 25 180" fill="none" stroke="#7dd3fc" strokeWidth="0.6"/>
          <path d="M 35 175 Q 32 172 30 175" fill="none" stroke="#7dd3fc" strokeWidth="0.6"/>
          {/* Ноги */}
          <line x1="38" y1="204" x2="38" y2="220" stroke="#7dd3fc" strokeWidth="1.5"/>
          <line x1="52" y1="204" x2="52" y2="220" stroke="#7dd3fc" strokeWidth="1.5"/>
          <line x1="55" y1="195" x2="60" y2="195" stroke="#7dd3fc" strokeWidth="1"/>
        </g>
        <g>
          <ellipse cx="155" cy="195" rx="20" ry="11" fill="rgba(255,255,255,0.6)" stroke="#fbbf24" strokeWidth="1"/>
          <path d="M 168 195 Q 174 180 172 170 L 164 175 L 158 185 Z" fill="rgba(255,255,255,0.6)" stroke="#fbbf24" strokeWidth="1"/>
          <circle cx="170" cy="172" r="3" fill="rgba(255,255,255,0.8)" stroke="#fbbf24" strokeWidth="0.8"/>
          <path d="M 168 178 Q 172 175 175 180" fill="none" stroke="#fbbf24" strokeWidth="0.6"/>
          <path d="M 165 175 Q 168 172 170 175" fill="none" stroke="#fbbf24" strokeWidth="0.6"/>
          <line x1="162" y1="204" x2="162" y2="220" stroke="#fbbf24" strokeWidth="1.5"/>
          <line x1="148" y1="204" x2="148" y2="220" stroke="#fbbf24" strokeWidth="1.5"/>
          <line x1="145" y1="195" x2="140" y2="195" stroke="#fbbf24" strokeWidth="1"/>
        </g>

        {/* Земля у ног */}
        <line x1="20" y1="240" x2="180" y2="240" stroke="#86efac" strokeWidth="0.5"/>
        <line x1="20" y1="245" x2="180" y2="245" stroke="#86efac" strokeWidth="0.3" opacity="0.5"/>
      </g>
    ),

    // VIII. СИЛА — женщина укрощает льва
    "major-8": (
      <g>
        {/* Бесконечность над головой */}
        <path d="M 88 75 Q 93 70 100 75 Q 107 70 112 75 Q 107 80 100 75 Q 93 80 88 75 Z" fill="#fbbf24" stroke="#fef3c7" strokeWidth="0.6"/>

        {/* Горы вдалеке */}
        <path d="M 20 240 L 50 180 L 80 240 Z" fill="rgba(96,165,250,0.15)" stroke="#7dd3fc" strokeWidth="0.4"/>
        <path d="M 120 240 L 150 180 L 180 240 Z" fill="rgba(96,165,250,0.2)" stroke="#7dd3fc" strokeWidth="0.4"/>

        {/* Женщина — укротительница */}
        <path d="M 60 175 L 64 125 L 78 125 L 82 175 Z" fill="rgba(134,239,172,0.4)" stroke="#86efac" strokeWidth="1.2"/>
        {/* Цветочный венок на голове */}
        <path d="M 64 115 Q 73 105 82 115" fill="none" stroke="#86efac" strokeWidth="1.5"/>
        {[
          [66, 113], [70, 110], [74, 109], [78, 110], [80, 113]
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="1.5" fill={['#f9a8d4', '#fbbf24', '#f9a8d4', '#fbbf24', '#f9a8d4'][i]} stroke="#fef3c7" strokeWidth="0.3"/>
        ))}
        <circle cx="73" cy="118" r="8" fill="rgba(255,255,255,0.6)" stroke="#86efac" strokeWidth="1"/>
        {/* Длинные волосы */}
        <path d="M 65 122 Q 58 160 65 195 M 81 122 Q 88 160 81 195" fill="none" stroke="#fbbf24" strokeWidth="1.5" opacity="0.7"/>
        {/* Цветы в волосах свисают */}
        <line x1="62" y1="125" x2="58" y2="140" stroke="#86efac" strokeWidth="0.6"/>
        <circle cx="58" cy="140" r="1.5" fill="#f9a8d4"/>

        {/* Рука женщины к пасти льва */}
        <path d="M 80 160 Q 95 165 110 175" fill="none" stroke="#86efac" strokeWidth="2.5" strokeLinecap="round"/>

        {/* Лев большой */}
        <ellipse cx="130" cy="200" rx="32" ry="22" fill="rgba(251,191,36,0.4)" stroke="#fbbf24" strokeWidth="1.5"/>
        {/* Грива пышная — лучи вокруг головы */}
        {Array.from({ length: 18 }).map((_, i) => {
          const a = (i / 18) * Math.PI * 1.6 + Math.PI * 0.2
          const x1 = 155 + Math.cos(a) * 14
          const y1 = 190 + Math.sin(a) * 14
          const x2 = 155 + Math.cos(a) * 22
          const y2 = 190 + Math.sin(a) * 22
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#fbbf24" strokeWidth="1.5" opacity="0.7"/>
        })}
        {/* Голова льва */}
        <circle cx="155" cy="190" r="14" fill="rgba(251,191,36,0.6)" stroke="#fbbf24" strokeWidth="1.2"/>
        {/* Глаза льва — мирные */}
        <ellipse cx="150" cy="188" rx="1.5" ry="1" fill="#7c2d12"/>
        <ellipse cx="160" cy="188" rx="1.5" ry="1" fill="#7c2d12"/>
        {/* Нос и пасть */}
        <path d="M 153 193 L 157 193 L 155 196 Z" fill="#7c2d12"/>
        <path d="M 152 198 Q 155 200 158 198" fill="none" stroke="#7c2d12" strokeWidth="0.6"/>
        {/* Усы */}
        <line x1="148" y1="196" x2="140" y2="195" stroke="#fef3c7" strokeWidth="0.5"/>
        <line x1="148" y1="198" x2="140" y2="200" stroke="#fef3c7" strokeWidth="0.5"/>
        <line x1="162" y1="196" x2="170" y2="195" stroke="#fef3c7" strokeWidth="0.5"/>
        <line x1="162" y1="198" x2="170" y2="200" stroke="#fef3c7" strokeWidth="0.5"/>
        {/* Хвост с кисточкой */}
        <path d="M 100 205 Q 90 220 95 235" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="95" cy="237" r="3" fill="#fbbf24"/>

        {/* Лапы льва */}
        <ellipse cx="110" cy="225" rx="6" ry="3" fill="rgba(251,191,36,0.6)" stroke="#fbbf24" strokeWidth="0.8"/>
        <ellipse cx="150" cy="225" rx="6" ry="3" fill="rgba(251,191,36,0.6)" stroke="#fbbf24" strokeWidth="0.8"/>

        {/* Цветы у ног */}
        <circle cx="50" cy="245" r="3" fill="#f9a8d4" stroke="#fef3c7" strokeWidth="0.4"/>
        <circle cx="50" cy="245" r="1.5" fill="#fbbf24"/>
        <circle cx="170" cy="245" r="3" fill="#fbbf24" stroke="#fef3c7" strokeWidth="0.4"/>
        <circle cx="170" cy="245" r="1.5" fill="#dc2626"/>
      </g>
    ),

    // IX. ОТШЕЛЬНИК — старец с фонарём и посохом
    "major-9": (
      <g>
        {/* Снежные горы */}
        <path d="M 25 245 L 60 160 L 95 245 Z" fill="rgba(203,213,225,0.3)" stroke="#cbd5e1" strokeWidth="0.6"/>
        <path d="M 60 160 L 50 175 L 70 175 Z" fill="rgba(255,255,255,0.6)"/>
        <path d="M 105 245 L 140 160 L 175 245 Z" fill="rgba(203,213,225,0.3)" stroke="#cbd5e1" strokeWidth="0.6"/>
        <path d="M 140 160 L 130 175 L 150 175 Z" fill="rgba(255,255,255,0.6)"/>

        {/* Серый плащ с капюшоном */}
        <path d="M 75 240 L 70 130 Q 100 100 130 130 L 125 240 Z" fill="rgba(148,163,184,0.4)" stroke="#cbd5e1" strokeWidth="1.5"/>
        {/* Узоры на плаще — серые треугольники */}
        {[
          [85, 180], [100, 180], [115, 180],
          [92, 200], [108, 200],
          [100, 220],
        ].map(([x, y], i) => (
          <path key={i} d={`M ${x-4} ${y+3} L ${x} ${y-3} L ${x+4} ${y+3} Z`} fill="rgba(255,255,255,0.15)" stroke="#cbd5e1" strokeWidth="0.4"/>
        ))}

        {/* Капюшон */}
        <path d="M 84 130 Q 100 100 116 130 L 110 145 Q 100 120 90 145 Z" fill="rgba(148,163,184,0.6)" stroke="#cbd5e1" strokeWidth="1"/>

        {/* Голова старца */}
        <circle cx="100" cy="128" r="8" fill="rgba(255,255,255,0.5)" stroke="#cbd5e1" strokeWidth="0.8"/>
        {/* Длинная белая борода */}
        <path d="M 94 138 L 92 175 L 108 175 L 106 138 Z" fill="rgba(255,255,255,0.7)" stroke="#cbd5e1" strokeWidth="0.6"/>
        {/* Усы */}
        <path d="M 95 136 Q 100 138 105 136" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="0.8"/>
        {/* Глаза */}
        <ellipse cx="97" cy="127" rx="0.8" ry="0.5" fill="#7c3aed"/>
        <ellipse cx="103" cy="127" rx="0.8" ry="0.5" fill="#7c3aed"/>

        {/* Фонарь в правой руке */}
        <line x1="116" y1="160" x2="135" y2="155" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round"/>
        {/* Корпус фонаря */}
        <path d="M 130 148 L 145 148 L 145 168 L 130 168 Z" fill="rgba(251,191,36,0.3)" stroke="#fbbf24" strokeWidth="1.2"/>
        {/* Купол фонаря */}
        <path d="M 130 148 L 145 148 L 137 140 Z" fill="rgba(251,191,36,0.5)" stroke="#fbbf24" strokeWidth="1"/>
        {/* Звезда Соломона в фонаре */}
        <text x="137.5" y="161" fontSize="10" textAnchor="middle" fill="#fef3c7" stroke="#fbbf24" strokeWidth="0.3">✡</text>
        {/* Свечение фонаря */}
        <circle cx="137.5" cy="158" r="14" fill="none" stroke="#fbbf24" strokeWidth="0.4" opacity="0.3"/>
        <circle cx="137.5" cy="158" r="20" fill="none" stroke="#fbbf24" strokeWidth="0.3" opacity="0.2"/>

        {/* Посох в левой руке */}
        <line x1="80" y1="160" x2="68" y2="245" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round"/>
        {/* Набалдашник посоха */}
        <circle cx="78" cy="161" r="3" fill="#fbbf24" stroke="#fef3c7" strokeWidth="0.5"/>
        {/* Узоры на посохе */}
        {[180, 200, 220, 240].map((y, i) => (
          <circle key={i} cx={75 - (y-180)*0.13} cy={y} r="1" fill="#fbbf24" opacity="0.6"/>
        ))}
      </g>
    ),

    // X. КОЛЕСО ФОРТУНЫ — колесо с символами, сфинкс, змей и Анубис
    "major-10": (
      <g>
        {/* Облака по углам */}
        <ellipse cx="40" cy="80" rx="20" ry="7" fill="rgba(255,255,255,0.3)"/>
        <ellipse cx="160" cy="80" rx="20" ry="7" fill="rgba(255,255,255,0.3)"/>

        {/* Внешний обод колеса */}
        <circle cx="100" cy="160" r="60" fill="none" stroke="#fbbf24" strokeWidth="2.5"/>
        <circle cx="100" cy="160" r="56" fill="rgba(163,230,53,0.1)" stroke="#fbbf24" strokeWidth="1.2"/>
        <circle cx="100" cy="160" r="35" fill="rgba(251,191,36,0.2)" stroke="#fbbf24" strokeWidth="1"/>
        <circle cx="100" cy="160" r="20" fill="rgba(167,139,250,0.2)" stroke="#fbbf24" strokeWidth="0.8"/>

        {/* Спицы колеса — 8 штук */}
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * Math.PI * 2
          return <line key={i} x1="100" y1="160" x2={100 + Math.cos(a) * 60} y2={160 + Math.sin(a) * 60} stroke="#fbbf24" strokeWidth="1"/>
        })}

        {/* Буквы TARO по кругу (внешнее кольцо) */}
        {["T", "A", "R", "O"].map((l, i) => {
          const a = (i / 4) * Math.PI * 2 - Math.PI / 2
          const x = 100 + Math.cos(a) * 47
          const y = 165 + Math.sin(a) * 47
          return <text key={i} x={x} y={y} fontSize="10" textAnchor="middle" fill="#fef3c7" fontWeight="bold">{l}</text>
        })}
        {/* Еврейские буквы IHVH (Яхве) */}
        {["י", "ה", "ו", "ה"].map((l, i) => {
          const a = (i / 4) * Math.PI * 2 + Math.PI / 4
          const x = 100 + Math.cos(a) * 28
          const y = 165 + Math.sin(a) * 28
          return <text key={i} x={x} y={y} fontSize="8" textAnchor="middle" fill="#a78bfa" fontWeight="bold">{l}</text>
        })}

        {/* Центральный символ — вращающаяся свастика-крест */}
        <g transform="translate(100, 160)">
          <path d="M -8 -2 L 8 -2 L 8 -8 L 2 -8 L 2 -14 L -2 -14 L -2 -8 L -8 -8 Z" fill="#fbbf24" opacity="0.8"/>
          <path d="M -8 2 L 8 2 L 8 8 L 2 8 L 2 14 L -2 14 L -2 8 L -8 8 Z" fill="#a78bfa" opacity="0.8"/>
          <circle r="3" fill="#fef3c7"/>
        </g>

        {/* Сфинкс сверху — мудрость держит меч */}
        <path d="M 88 95 Q 100 80 112 95 L 108 115 L 92 115 Z" fill="rgba(251,191,36,0.7)" stroke="#fef3c7" strokeWidth="1"/>
        <ellipse cx="100" cy="90" r="6" fill="rgba(251,191,36,0.8)" stroke="#fef3c7" strokeWidth="0.8"/>
        {/* Корона на сфинксе */}
        <path d="M 96 84 L 96 80 L 100 83 L 104 80 L 104 84" fill="#fbbf24" stroke="#fef3c7" strokeWidth="0.4"/>
        {/* Меч в лапах */}
        <line x1="100" y1="105" x2="100" y2="120" stroke="#cbd5e1" strokeWidth="1.5"/>
        <line x1="96" y1="107" x2="104" y2="107" stroke="#fbbf24" strokeWidth="1"/>

        {/* Змей Тифон слева (спускается) */}
        <path d="M 30 200 Q 45 195 50 210 Q 55 220 70 215 Q 80 210 85 220" fill="none" stroke="rgba(28,163,150,0.8)" strokeWidth="2.5"/>
        <circle cx="32" cy="200" r="3" fill="rgba(28,163,150,0.9)"/>
        <path d="M 30 198 L 28 195 M 32 198 L 32 194" stroke="rgba(28,163,150,0.9)" strokeWidth="0.6"/>
        {/* Глаз змея */}
        <circle cx="32" cy="200" r="0.8" fill="#dc2626"/>

        {/* Анубис (шакал) справа — поднимается */}
        <path d="M 170 200 Q 155 195 150 210 Q 145 220 130 215 Q 120 210 115 220" fill="none" stroke="rgba(248,113,113,0.7)" strokeWidth="2.5"/>
        <ellipse cx="168" cy="198" rx="5" ry="4" fill="rgba(248,113,113,0.8)" stroke="#fef3c7" strokeWidth="0.6"/>
        {/* Уши шакала */}
        <path d="M 165 193 L 164 188 L 167 192 Z" fill="rgba(248,113,113,0.9)"/>
        <path d="M 171 193 L 172 188 L 169 192 Z" fill="rgba(248,113,113,0.9)"/>
        <circle cx="167" cy="198" r="0.8" fill="#fbbf24"/>
      </g>
    ),

    // XI. СПРАВЕДЛИВОСТЬ — фигура с мечом и весами
    "major-11": (
      <g>
        {/* Занавес фиолетовый */}
        <rect x="25" y="80" width="150" height="170" fill="rgba(167,139,250,0.1)" stroke="#a78bfa" strokeWidth="0.5"/>

        {/* Трон */}
        <rect x="60" y="170" width="80" height="80" fill="rgba(147,197,253,0.2)" stroke="#93c5fd" strokeWidth="1.5"/>
        <rect x="55" y="100" width="90" height="12" fill="rgba(147,197,253,0.35)" stroke="#93c5fd" strokeWidth="1.5"/>
        {/* Колонны трона */}
        <rect x="62" y="112" width="4" height="58" fill="rgba(147,197,253,0.4)" stroke="#93c5fd" strokeWidth="0.5"/>
        <rect x="134" y="112" width="4" height="58" fill="rgba(147,197,253,0.4)" stroke="#93c5fd" strokeWidth="0.5"/>

        {/* Фигура Правосудия */}
        <path d="M 86 220 L 90 130 L 110 130 L 114 220 Z" fill="rgba(147,197,253,0.4)" stroke="#93c5fd" strokeWidth="1.2"/>
        {/* Накидка красная */}
        <path d="M 88 145 L 90 130 L 110 130 L 112 145 L 100 150 Z" fill="rgba(220,38,38,0.4)" stroke="#f87171" strokeWidth="0.6"/>
        <circle cx="100" cy="120" r="9" fill="rgba(255,255,255,0.6)" stroke="#93c5fd" strokeWidth="1"/>

        {/* Корона с зубцами */}
        <path d="M 91 108 L 91 100 L 95 105 L 97 96 L 100 105 L 103 96 L 105 105 L 109 100 L 109 108 Z" fill="#fbbf24" stroke="#fef3c7" strokeWidth="0.6"/>
        <circle cx="100" cy="103" r="1.5" fill="#dc2626"/>

        {/* Весы в левой руке — сложные */}
        <line x1="78" y1="155" x2="60" y2="125" stroke="#7dd3fc" strokeWidth="2" strokeLinecap="round"/>
        {/* Стойка весов */}
        <line x1="55" y1="125" x2="75" y2="125" stroke="#fbbf24" strokeWidth="1.5"/>
        <circle cx="65" cy="125" r="2" fill="#fbbf24"/>
        {/* Цепочки к чашам */}
        <line x1="55" y1="125" x2="50" y2="140" stroke="#fbbf24" strokeWidth="0.5"/>
        <line x1="55" y1="125" x2="58" y2="140" stroke="#fbbf24" strokeWidth="0.5"/>
        <line x1="75" y1="125" x2="72" y2="140" stroke="#fbbf24" strokeWidth="0.5"/>
        <line x1="75" y1="125" x2="80" y2="140" stroke="#fbbf24" strokeWidth="0.5"/>
        {/* Левая чаша весов */}
        <path d="M 45 140 Q 50 150 55 140 L 56 145 Q 50 152 44 145 Z" fill="rgba(96,165,250,0.5)" stroke="#fbbf24" strokeWidth="0.8"/>
        {/* Сердце в левой чаше */}
        <path d="M 50 140 Q 48 137 48 140 Q 48 143 50 145 Q 52 143 52 140 Q 52 137 50 140 Z" fill="#dc2626"/>
        {/* Правая чаша весов */}
        <path d="M 70 140 Q 75 150 80 140 L 81 145 Q 75 152 69 145 Z" fill="rgba(96,165,250,0.5)" stroke="#fbbf24" strokeWidth="0.8"/>
        {/* Перо Маат в правой чаше */}
        <path d="M 75 138 Q 73 142 76 145 Q 78 142 75 138 Z" fill="#fbbf24" stroke="#fef3c7" strokeWidth="0.3"/>
        <line x1="75" y1="140" x2="75" y2="145" stroke="#fef3c7" strokeWidth="0.3"/>

        {/* Меч в правой руке — большой и детальный */}
        <line x1="122" y1="155" x2="138" y2="215" stroke="#cbd5e1" strokeWidth="2.5"/>
        {/* Лезвие с кантом */}
        <line x1="120" y1="160" x2="136" y2="210" stroke="#fef3c7" strokeWidth="0.5" opacity="0.6"/>
        <line x1="124" y1="160" x2="140" y2="210" stroke="#93c5fd" strokeWidth="0.5" opacity="0.6"/>
        {/* Гарда (перекрестье) */}
        <line x1="113" y1="160" x2="131" y2="160" stroke="#fbbf24" strokeWidth="2.5"/>
        {/* Рукоять */}
        <line x1="122" y1="155" x2="122" y2="148" stroke="#fbbf24" strokeWidth="2"/>
        {/* Набалдашник */}
        <circle cx="122" cy="146" r="2.5" fill="#fbbf24" stroke="#fef3c7" strokeWidth="0.5"/>
      </g>
    ),

    // XII. ПОВЕШЕННЫЙ — фигура вниз головой на Т-образном кресте
    "major-12": (
      <g>
        {/* Перекладина Т-креста (тау) */}
        <line x1="50" y1="80" x2="150" y2="80" stroke="#86efac" strokeWidth="3.5"/>
        <line x1="50" y1="80" x2="50" y2="72" stroke="#86efac" strokeWidth="2"/>
        <line x1="150" y1="80" x2="150" y2="72" stroke="#86efac" strokeWidth="2"/>
        {/* Узоры на перекладине — листья */}
        {[
          [70, 78], [85, 78], [100, 78], [115, 78], [130, 78]
        ].map(([x, y], i) => (
          <ellipse key={i} cx={x} cy={y} rx="2" ry="1" fill="#86efac" opacity="0.8"/>
        ))}

        {/* Веревка */}
        <line x1="100" y1="80" x2="100" y2="115" stroke="#fbbf24" strokeWidth="1.5"/>
        {/* Узел */}
        <circle cx="100" cy="115" r="2.5" fill="rgba(251,191,36,0.8)" stroke="#fbbf24" strokeWidth="0.5"/>

        {/* Ноги — одна прямая, другая скрещена */}
        <line x1="100" y1="115" x2="100" y2="140" stroke="#7dd3fc" strokeWidth="2.5"/>
        {/* Согнутая нога за прямой */}
        <path d="M 100 140 Q 115 138 115 152" fill="none" stroke="#7dd3fc" strokeWidth="2.5"/>

        {/* Тело головой вниз */}
        <path d="M 88 220 L 92 140 L 108 140 L 112 220 Z" fill="rgba(103,232,249,0.4)" stroke="#7dd3fc" strokeWidth="1.2"/>
        {/* Узоры на тунике — кресты */}
        <line x1="100" y1="170" x2="100" y2="195" stroke="#fbbf24" strokeWidth="0.6"/>
        <line x1="96" y1="180" x2="104" y2="180" stroke="#fbbf24" strokeWidth="0.6"/>
        <line x1="100" y1="200" x2="100" y2="215" stroke="#fbbf24" strokeWidth="0.6"/>
        <line x1="97" y1="208" x2="103" y2="208" stroke="#fbbf24" strokeWidth="0.6"/>

        {/* Голова внизу — с сиянием */}
        <circle cx="100" cy="225" r="9" fill="rgba(255,255,255,0.6)" stroke="#7dd3fc" strokeWidth="1"/>
        {/* Нимб-сияние вокруг головы */}
        <circle cx="100" cy="225" r="14" fill="none" stroke="#fbbf24" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.7"/>
        <circle cx="100" cy="225" r="18" fill="none" stroke="#fbbf24" strokeWidth="0.4" opacity="0.4"/>
        {/* Лучи сияния */}
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * Math.PI * 2
          return <line key={i} x1={100 + Math.cos(a) * 14} y1={225 + Math.sin(a) * 14} x2={100 + Math.cos(a) * 19} y2={225 + Math.sin(a) * 19} stroke="#fbbf24" strokeWidth="0.5" opacity="0.7"/>
        })}

        {/* Волосы свисают вниз */}
        <path d="M 95 232 L 93 245 M 100 234 L 100 248 M 105 232 L 107 245" stroke="#7dd3fc" strokeWidth="0.6" fill="none"/>

        {/* Руки за спиной */}
        <path d="M 92 175 Q 80 178 78 168" fill="none" stroke="#7dd3fc" strokeWidth="2"/>
        <path d="M 108 175 Q 120 178 122 168" fill="none" stroke="#7dd3fc" strokeWidth="2"/>

        {/* Деревья по бокам с плодами — 6 штук на каждом */}
        <line x1="35" y1="80" x2="35" y2="250" stroke="#86efac" strokeWidth="2.5" opacity="0.7"/>
        {[
          [35, 110], [35, 130], [35, 150], [35, 170], [35, 190], [35, 210]
        ].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="3" fill="#dc2626" stroke="#fbbf24" strokeWidth="0.4" opacity="0.8"/>
            <circle cx={x-2} cy={y-1} r="1" fill="#fef3c7" opacity="0.6"/>
          </g>
        ))}
        <line x1="165" y1="80" x2="165" y2="250" stroke="#86efac" strokeWidth="2.5" opacity="0.7"/>
        {[
          [165, 110], [165, 130], [165, 150], [165, 170], [165, 190], [165, 210]
        ].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="3" fill="#dc2626" stroke="#fbbf24" strokeWidth="0.4" opacity="0.8"/>
            <circle cx={x-2} cy={y-1} r="1" fill="#fef3c7" opacity="0.6"/>
          </g>
        ))}
      </g>
    ),

    // XIII. СМЕРТЬ — скелет на бледном коне с чёрным флагом-розой
    "major-13": (
      <g>
        {/* Солнце между двумя башнями — рассвет/закат */}
        <circle cx="100" cy="80" r="12" fill="rgba(251,191,36,0.7)"/>
        {Array.from({ length: 10 }).map((_, i) => {
          const a = (i / 10) * Math.PI * 2
          return <line key={i} x1={100 + Math.cos(a) * 12} y1={80 + Math.sin(a) * 12} x2={100 + Math.cos(a) * 16} y2={80 + Math.sin(a) * 16} stroke="#fbbf24" strokeWidth="0.8" opacity="0.7"/>
        })}
        {/* Две башни */}
        <rect x="40" y="100" width="18" height="40" fill="rgba(148,163,184,0.5)" stroke="#94a3b8" strokeWidth="0.8"/>
        <path d="M 38 100 L 49 90 L 60 100 Z" fill="rgba(220,38,38,0.5)" stroke="#94a3b8" strokeWidth="0.5"/>
        <rect x="142" y="100" width="18" height="40" fill="rgba(148,163,184,0.5)" stroke="#94a3b8" strokeWidth="0.8"/>
        <path d="M 140 100 L 151 90 L 162 100 Z" fill="rgba(220,38,38,0.5)" stroke="#94a3b8" strokeWidth="0.5"/>

        {/* Река под башнями */}
        <path d="M 30 130 Q 70 138 100 135 Q 130 132 170 138" fill="none" stroke="#60a5fa" strokeWidth="1.5"/>
        <path d="M 35 135 Q 75 142 100 140 Q 125 138 165 142" fill="none" stroke="#60a5fa" strokeWidth="0.8" opacity="0.6"/>

        {/* Конь бледный — детальный */}
        <ellipse cx="100" cy="200" rx="42" ry="22" fill="rgba(148,163,184,0.5)" stroke="#94a3b8" strokeWidth="1.5"/>
        {/* Голова коня */}
        <path d="M 50 200 Q 38 188 42 175 L 60 175 L 68 195 Z" fill="rgba(148,163,184,0.5)" stroke="#94a3b8" strokeWidth="1.5"/>
        {/* Глаз коня */}
        <circle cx="50" cy="188" r="1.5" fill="#dc2626"/>
        {/* Ноздри */}
        <ellipse cx="44" cy="190" rx="0.8" ry="0.6" fill="#7c2d12"/>
        {/* Уши */}
        <path d="M 56 178 L 55 173 L 58 176 Z" fill="rgba(148,163,184,0.7)"/>
        <path d="M 62 178 L 62 173 L 65 176 Z" fill="rgba(148,163,184,0.7)"/>
        {/* Грива */}
        <path d="M 60 175 Q 65 165 75 168 Q 70 175 65 180" fill="rgba(28,43,67,0.7)" stroke="#94a3b8" strokeWidth="0.6"/>
        <path d="M 70 175 Q 75 167 85 170" fill="none" stroke="rgba(28,43,67,0.6)" strokeWidth="1"/>
        {/* Ноги коня */}
        {[70, 90, 110, 130].map((x, i) => (
          <line key={i} x1={x} y1={218} x2={x} y2={245} stroke="#94a3b8" strokeWidth="2.5"/>
        ))}

        {/* Скелет-всадник с косой */}
        <ellipse cx="105" cy="155" rx="14" ry="20" fill="rgba(255,255,255,0.3)" stroke="#fef3c7" strokeWidth="1.2"/>
        {/* Ребра */}
        {[150, 158, 166, 174].map((y, i) => (
          <path key={i} d={`M 95 ${y} Q 105 ${y+3} 115 ${y}`} fill="none" stroke="#fef3c7" strokeWidth="0.6" opacity="0.7"/>
        ))}
        {/* Череп */}
        <circle cx="105" cy="130" r="10" fill="rgba(255,255,255,0.5)" stroke="#fef3c7" strokeWidth="1"/>
        {/* Глазницы */}
        <ellipse cx="100" cy="129" rx="2" ry="2.5" fill="#1a0a3a"/>
        <ellipse cx="110" cy="129" rx="2" ry="2.5" fill="#1a0a3a"/>
        {/* Свечение в глазах */}
        <circle cx="100" cy="129" r="0.6" fill="#fbbf24"/>
        <circle cx="110" cy="129" r="0.6" fill="#fbbf24"/>
        {/* Нос-треугольник */}
        <path d="M 104 134 L 106 134 L 105 137 Z" fill="#1a0a3a"/>
        {/* Зубы */}
        <path d="M 100 138 L 102 140 L 104 138 L 106 140 L 108 138 L 110 140" fill="none" stroke="#1a0a3a" strokeWidth="0.5"/>

        {/* Чёрный флаг с белой розой Тюдоров */}
        <line x1="120" y1="125" x2="120" y2="80" stroke="#fbbf24" strokeWidth="2.5"/>
        <path d="M 120 82 L 150 82 L 150 102 L 120 102 Z" fill="rgba(28,43,67,0.85)" stroke="#fbbf24" strokeWidth="1"/>
        {/* Роза Тюдоров — белая */}
        <circle cx="135" cy="92" r="6" fill="#fef3c7" stroke="#fbbf24" strokeWidth="0.6"/>
        <circle cx="135" cy="92" r="4" fill="none" stroke="#fbbf24" strokeWidth="0.5"/>
        <circle cx="135" cy="92" r="2" fill="#fbbf24"/>
        <path d="M 132 89 L 138 89 M 132 95 L 138 95 M 135 86 L 135 98" stroke="#fef3c7" strokeWidth="0.3"/>

        {/* Падший король у ног — с короной */}
        <path d="M 130 240 Q 138 230 145 235 L 150 250" fill="rgba(251,191,36,0.3)" stroke="#fbbf24" strokeWidth="0.6"/>
        <circle cx="138" cy="232" r="5" fill="rgba(255,255,255,0.5)" stroke="#fbbf24" strokeWidth="0.8"/>
        {/* Корона упала */}
        <path d="M 130 225 L 133 220 L 136 225 L 138 218 L 140 225 L 143 220 L 146 225" fill="#fbbf24" stroke="#fef3c7" strokeWidth="0.5"/>

        {/* Ребёнок у ног — смотрит на смерть с любопытством */}
        <circle cx="65" cy="245" r="4" fill="rgba(255,255,255,0.6)" stroke="#fbbf24" strokeWidth="0.6"/>
        <path d="M 62 249 L 60 258 L 70 258 L 68 249 Z" fill="rgba(134,239,172,0.4)" stroke="#86efac" strokeWidth="0.5"/>
      </g>
    ),

    // XIV. УМЕРЕННОСТЬ — ангел переливает воду между чашами
    "major-14": (
      <g>
        {/* Солнце на горизонте с короной */}
        <circle cx="100" cy="75" r="10" fill="#fbbf24" opacity="0.8"/>
        <path d="M 90 70 L 88 65 L 92 68 L 95 60 L 98 68 L 100 58 L 102 68 L 105 60 L 108 68 L 112 65 L 110 70" fill="#fbbf24" stroke="#fef3c7" strokeWidth="0.4"/>

        {/* Тропа к солнцу */}
        <path d="M 100 240 Q 110 250 130 245 L 145 220" fill="none" stroke="#fbbf24" strokeWidth="1.5" opacity="0.7"/>

        {/* Горы вдалеке */}
        <path d="M 120 230 L 135 195 L 150 230 Z" fill="rgba(134,239,172,0.3)" stroke="#86efac" strokeWidth="0.5"/>

        {/* Ангел Умеренности */}
        <path d="M 88 230 L 92 140 L 108 140 L 112 230 Z" fill="rgba(167,243,208,0.4)" stroke="#a7f3d0" strokeWidth="1.2"/>
        {/* Крылья большие детальные */}
        <path d="M 90 145 Q 65 155 60 185 Q 80 170 92 175 Z" fill="rgba(255,255,255,0.5)" stroke="#fbbf24" strokeWidth="0.8"/>
        <path d="M 110 145 Q 135 155 140 185 Q 120 170 108 175 Z" fill="rgba(255,255,255,0.5)" stroke="#fbbf24" strokeWidth="0.8"/>
        {/* Перья на крыльях */}
        {[65, 72, 79, 86].map((x, i) => (
          <line key={`l-${i}`} x1={x} y1={175} x2={x} y2={185} stroke="#fbbf24" strokeWidth="0.4"/>
        ))}
        {[114, 121, 128, 135].map((x, i) => (
          <line key={`r-${i}`} x1={x} y1={175} x2={x} y2={185} stroke="#fbbf24" strokeWidth="0.4"/>
        ))}

        {/* Голова ангела */}
        <circle cx="100" cy="128" r="9" fill="rgba(255,255,255,0.6)" stroke="#a7f3d0" strokeWidth="1"/>
        {/* Лилия в волосах — символ чистоты */}
        <path d="M 96 117 Q 100 113 104 117 L 102 121 L 98 121 Z" fill="#fef3c7" stroke="#a7f3d0" strokeWidth="0.5"/>
        <line x1="100" y1="113" x2="100" y2="118" stroke="#a7f3d0" strokeWidth="0.6"/>
        <text x="100" y="115" fontSize="4" textAnchor="middle" fill="#fbbf24">✦</text>

        {/* Две чаши в руках */}
        {/* Левая чаша */}
        <path d="M 76 170 L 80 188 L 92 188 L 96 170 Z" fill="rgba(96,165,250,0.6)" stroke="#60a5fa" strokeWidth="1.2"/>
        <ellipse cx="86" cy="170" rx="10" ry="2" fill="rgba(96,165,250,0.4)"/>
        {/* Правая чаша */}
        <path d="M 104 170 L 108 188 L 120 188 L 124 170 Z" fill="rgba(96,165,250,0.6)" stroke="#60a5fa" strokeWidth="1.2"/>
        <ellipse cx="114" cy="170" rx="10" ry="2" fill="rgba(96,165,250,0.4)"/>

        {/* Поток воды между чашами — ровная струя */}
        <path d="M 86 175 Q 100 165 114 175" fill="none" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M 86 178 Q 100 168 114 178" fill="none" stroke="#7dd3fc" strokeWidth="1.5" strokeLinecap="round"/>
        {/* Блики на воде */}
        <circle cx="100" cy="170" r="1" fill="#fef3c7" opacity="0.8"/>

        {/* Кувшинки на воде */}
        <ellipse cx="65" cy="240" rx="6" ry="2" fill="rgba(134,239,172,0.5)" stroke="#86efac" strokeWidth="0.5"/>
        <circle cx="65" cy="238" r="2" fill="#fef3c7" stroke="#fbbf24" strokeWidth="0.4"/>
        <ellipse cx="135" cy="240" rx="6" ry="2" fill="rgba(134,239,172,0.5)" stroke="#86efac" strokeWidth="0.5"/>
        <circle cx="135" cy="238" r="2" fill="#fef3c7" stroke="#fbbf24" strokeWidth="0.4"/>

        {/* Водоём внизу */}
        <ellipse cx="100" cy="250" rx="50" ry="5" fill="rgba(96,165,250,0.4)"/>
        <path d="M 60 250 Q 100 256 140 250" fill="none" stroke="#60a5fa" strokeWidth="0.6"/>
      </g>
    ),

    // XV. ДЬЯВОЛ — Бафомет над двумя прикованными фигурами
    "major-15": (
      <g>
        {/* Пьедестал */}
        <rect x="45" y="245" width="110" height="10" fill="rgba(127,29,29,0.6)" stroke="#dc2626" strokeWidth="1"/>

        {/* Бафомет — крылатое существо с рогами */}
        <ellipse cx="100" cy="160" rx="22" ry="32" fill="rgba(127,29,29,0.4)" stroke="#dc2626" strokeWidth="1.5"/>
        {/* Голова с козлиной бородкой */}
        <path d="M 85 130 Q 80 105 92 115 L 100 100 L 108 115 Q 120 105 115 130" fill="rgba(148,163,184,0.6)" stroke="#dc2626" strokeWidth="1.2"/>
        {/* Рога большие извилистые */}
        <path d="M 85 122 Q 75 100 70 80 Q 78 95 86 110 Z" fill="rgba(28,43,67,0.7)" stroke="#dc2626" strokeWidth="1"/>
        <path d="M 115 122 Q 125 100 130 80 Q 122 95 114 110 Z" fill="rgba(28,43,67,0.7)" stroke="#dc2626" strokeWidth="1"/>
        {/* Глаза горят */}
        <ellipse cx="94" cy="125" rx="1.5" ry="1" fill="#fbbf24"/>
        <ellipse cx="106" cy="125" rx="1.5" ry="1" fill="#fbbf24"/>
        <circle cx="94" cy="125" r="0.5" fill="#dc2626"/>
        <circle cx="106" cy="125" r="0.5" fill="#dc2626"/>
        {/* Борода козлиная */}
        <path d="M 96 138 L 95 150 L 100 152 L 105 150 L 104 138" fill="rgba(28,43,67,0.7)" stroke="#dc2626" strokeWidth="0.5"/>

        {/* Пентаграмма перевёрнутая на лбу */}
        <path d="M 100 110 L 96 117 L 89 117 L 94 122 L 92 129 L 100 125 L 108 129 L 106 122 L 111 117 L 104 117 Z" fill="rgba(251,191,36,0.9)" stroke="#fef3c7" strokeWidth="0.5"/>

        {/* Большая перевёрнутая пентаграмма на груди */}
        <g transform="translate(100, 175)">
          <circle r="14" fill="none" stroke="#fbbf24" strokeWidth="1" opacity="0.7"/>
          <path d="M 0 -2 L 8 9 L -8 4 L 8 4 L -8 9 Z" fill="rgba(251,191,36,0.8)" stroke="#fef3c7" strokeWidth="0.4"/>
        </g>

        {/* Крылья летучей мыши */}
        <path d="M 85 145 Q 60 145 50 175 Q 65 165 80 165 Q 70 170 75 180 Q 85 175 90 175 Z" fill="rgba(28,43,67,0.6)" stroke="#dc2626" strokeWidth="0.8"/>
        <path d="M 115 145 Q 140 145 150 175 Q 135 165 120 165 Q 130 170 125 180 Q 115 175 110 175 Z" fill="rgba(28,43,67,0.6)" stroke="#dc2626" strokeWidth="0.8"/>

        {/* Факел в руке */}
        <line x1="120" y1="175" x2="138" y2="160" stroke="#fbbf24" strokeWidth="1.5"/>
        <path d="M 134 152 Q 138 145 142 152 Q 144 158 138 160 Q 134 158 134 152" fill="#fbbf24" stroke="#fef3c7" strokeWidth="0.5"/>
        <path d="M 136 148 Q 138 145 140 148" fill="#dc2626"/>

        {/* Цепи к фигурам */}
        <line x1="80" y1="195" x2="68" y2="225" stroke="#fbbf24" strokeWidth="1.2"/>
        <line x1="60" y1="225" x2="76" y2="225" stroke="#fbbf24" strokeWidth="1.2"/>
        <circle cx="60" cy="225" r="2" fill="none" stroke="#fbbf24" strokeWidth="0.8"/>
        <circle cx="76" cy="225" r="2" fill="none" stroke="#fbbf24" strokeWidth="0.8"/>
        <line x1="120" y1="195" x2="132" y2="225" stroke="#fbbf24" strokeWidth="1.2"/>
        <line x1="124" y1="225" x2="140" y2="225" stroke="#fbbf24" strokeWidth="1.2"/>
        <circle cx="124" cy="225" r="2" fill="none" stroke="#fbbf24" strokeWidth="0.8"/>
        <circle cx="140" cy="225" r="2" fill="none" stroke="#fbbf24" strokeWidth="0.8"/>

        {/* Прикованный мужчина слева — с маленькими рожками */}
        <circle cx="68" cy="225" r="6" fill="rgba(96,165,250,0.6)" stroke="#7dd3fc" strokeWidth="0.8"/>
        <path d="M 65 220 L 64 217 M 71 220 L 72 217" stroke="#7dd3fc" strokeWidth="0.8"/>
        <path d="M 62 240 L 64 230 L 72 230 L 74 240 Z" fill="rgba(96,165,250,0.4)" stroke="#7dd3fc" strokeWidth="0.8"/>
        {/* Хвост с огнём */}
        <path d="M 60 240 Q 55 245 53 250" fill="none" stroke="#dc2626" strokeWidth="1"/>
        <circle cx="53" cy="250" r="1.5" fill="#fbbf24"/>

        {/* Прикованная женщина справа — с маленькими рожками */}
        <circle cx="132" cy="225" r="6" fill="rgba(249,168,212,0.6)" stroke="#f9a8d4" strokeWidth="0.8"/>
        <path d="M 129 220 L 128 217 M 135 220 L 136 217" stroke="#f9a8d4" strokeWidth="0.8"/>
        <path d="M 126 240 L 128 230 L 136 230 L 138 240 Z" fill="rgba(249,168,212,0.4)" stroke="#f9a8d4" strokeWidth="0.8"/>
        <path d="M 140 240 Q 145 245 147 250" fill="none" stroke="#dc2626" strokeWidth="1"/>
        <circle cx="147" cy="250" r="1.5" fill="#fbbf24"/>
      </g>
    ),

    // XVI. БАШНЯ — молния разрушает корону на башне
    "major-16": (
      <g>
        {/* Тёмные облака */}
        <ellipse cx="40" cy="55" rx="18" ry="7" fill="rgba(148,163,184,0.4)" stroke="#94a3b8" strokeWidth="0.5"/>
        <ellipse cx="160" cy="55" rx="18" ry="7" fill="rgba(148,163,184,0.4)" stroke="#94a3b8" strokeWidth="0.5"/>
        <ellipse cx="100" cy="50" rx="22" ry="8" fill="rgba(148,163,184,0.5)" stroke="#94a3b8" strokeWidth="0.5"/>

        {/* Молния с небес — большая зигзагом */}
        <path d="M 145 60 L 130 80 L 138 85 L 120 110 L 132 105 L 110 135 L 122 130 L 100 165" fill="none" stroke="#fef3c7" strokeWidth="3" strokeLinejoin="round"/>
        <path d="M 145 60 L 130 80 L 138 85 L 120 110 L 132 105 L 110 135 L 122 130 L 100 165" fill="none" stroke="#fbbf24" strokeWidth="1.5" strokeLinejoin="round" opacity="0.7"/>
        {/* Вспышки вокруг молнии */}
        {[
          [130, 75], [125, 100], [115, 125], [105, 150]
        ].map(([x, y], i) => (
          <g key={i}>
            <line x1={x} y1={y} x2={x-5} y2={y-3} stroke="#fef3c7" strokeWidth="0.8" opacity="0.6"/>
            <line x1={x} y1={y} x2={x+5} y2={y-3} stroke="#fef3c7" strokeWidth="0.8" opacity="0.6"/>
          </g>
        ))}
        {/* Капли-слёзы или искры */}
        {[
          [50, 110], [150, 110], [50, 140], [150, 140]
        ].map(([x, y], i) => (
          <text key={i} x={x} y={y} fontSize="6" textAnchor="middle" fill="#fbbf24" opacity="0.7">✦</text>
        ))}

        {/* Башня — высокая каменная */}
        <rect x="65" y="100" width="70" height="155" fill="rgba(148,163,184,0.5)" stroke="#94a3b8" strokeWidth="2"/>
        {/* Узоры на башне — кирпичная кладка */}
        <line x1="65" y1="130" x2="135" y2="130" stroke="#94a3b8" strokeWidth="0.4"/>
        <line x1="65" y1="160" x2="135" y2="160" stroke="#94a3b8" strokeWidth="0.4"/>
        <line x1="65" y1="190" x2="135" y2="190" stroke="#94a3b8" strokeWidth="0.4"/>
        <line x1="65" y1="220" x2="135" y2="220" stroke="#94a3b8" strokeWidth="0.4"/>
        {/* Вертикальные швы */}
        {[80, 100, 120].map((x, i) => (
          <g key={i}>
            <line x1={x} y1="100" x2={x} y2="130" stroke="#94a3b8" strokeWidth="0.3"/>
            <line x1={x-10} y1="130" x2={x-10} y2="160" stroke="#94a3b8" strokeWidth="0.3"/>
            <line x1={x} y1="160" x2={x} y2="190" stroke="#94a3b8" strokeWidth="0.3"/>
            <line x1={x-10} y1="190" x2={x-10} y2="220" stroke="#94a3b8" strokeWidth="0.3"/>
            <line x1={x} y1="220" x2={x} y2="255" stroke="#94a3b8" strokeWidth="0.3"/>
          </g>
        ))}

        {/* Крыша-шпиль */}
        <path d="M 60 100 L 100 70 L 140 100 Z" fill="rgba(220,38,38,0.6)" stroke="#dc2626" strokeWidth="1.5"/>

        {/* Корона падает со шпиля */}
        <path d="M 95 65 L 100 55 L 105 65 L 100 70 Z" fill="#fbbf24" stroke="#fef3c7" strokeWidth="0.6"/>
        <path d="M 92 65 L 95 60 M 96 63 L 100 56 M 104 63 L 100 56 M 108 65 L 105 60" stroke="#fbbf24" strokeWidth="0.8"/>

        {/* Окна башни —iluминированные */}
        <rect x="82" y="125" width="10" height="14" fill="rgba(251,191,36,0.7)" stroke="#fbbf24" strokeWidth="1"/>
        <rect x="108" y="125" width="10" height="14" fill="rgba(251,191,36,0.7)" stroke="#fbbf24" strokeWidth="1"/>
        <rect x="82" y="170" width="10" height="14" fill="rgba(251,191,36,0.7)" stroke="#fbbf24" strokeWidth="1"/>
        <rect x="108" y="170" width="10" height="14" fill="rgba(251,191,36,0.7)" stroke="#fbbf24" strokeWidth="1"/>

        {/* Дверь-арка внизу */}
        <path d="M 92 255 L 92 215 Q 100 200 108 215 L 108 255 Z" fill="rgba(220,38,38,0.6)" stroke="#fbbf24" strokeWidth="1"/>

        {/* Падающие фигуры — мужчина слева */}
        <circle cx="55" cy="115" r="5" fill="rgba(96,165,250,0.7)" stroke="#7dd3fc" strokeWidth="1"/>
        <path d="M 50 122 L 45 135 L 53 140 L 58 128 Z" fill="rgba(96,165,250,0.5)" stroke="#7dd3fc" strokeWidth="1"/>

        {/* Женщина справа */}
        <circle cx="148" cy="135" r="5" fill="rgba(249,168,212,0.7)" stroke="#f9a8d4" strokeWidth="1"/>
        <path d="M 152 142 L 156 155 L 148 158 L 144 145 Z" fill="rgba(249,168,212,0.5)" stroke="#f9a8d4" strokeWidth="1"/>

        {/* Шары — йоты-искры */}
        <circle cx="55" cy="100" r="2" fill="#fbbf24" opacity="0.7"/>
        <circle cx="148" cy="120" r="2" fill="#fbbf24" opacity="0.7"/>
        <circle cx="40" cy="80" r="1.5" fill="#fef3c7" opacity="0.7"/>
        <circle cx="160" cy="85" r="1.5" fill="#fef3c7" opacity="0.7"/>
      </g>
    ),

    // XVII. ЗВЕЗДА — обнажённая фигура у воды с 8 звёздами
    "major-17": (
      <g>
        {/* Большая 8-конечная звезда в центре */}
        <g transform="translate(100, 75)">
          <path d="M 0 -22 L 5 -7 L 22 -7 L 8 3 L 14 18 L 0 9 L -14 18 L -8 3 L -22 -7 L -5 -7 Z" fill="rgba(125,211,252,0.9)" stroke="#fef3c7" strokeWidth="0.6"/>
          <path d="M 0 -15 L 3 -5 L 15 -5 L 5 2 L 9 12 L 0 6 L -9 12 L -5 2 L -15 -5 L -3 -5 Z" fill="#fef3c7" opacity="0.8"/>
          <circle r="2" fill="#fbbf24"/>
        </g>

        {/* Семь малых звёзд вокруг */}
        {[
          [50, 60, 5], [70, 45, 4], [130, 45, 4], [150, 60, 5],
          [40, 100, 4], [160, 100, 4], [100, 35, 5]
        ].map(([x, y, s], i) => (
          <g key={i}>
            <path d={`M ${x} ${y-s} L ${x+s/3} ${y-s/3} L ${x+s} ${y-s/3} L ${x+s/2} ${y+s/4} L ${x+s*2/3} ${y+s} L ${x} ${y+s/2} L ${x-s*2/3} ${y+s} L ${x-s/2} ${y+s/4} L ${x-s} ${y-s/3} L ${x-s/3} ${y-s/3} Z`} fill="rgba(251,191,36,0.8)" stroke="#fef3c7" strokeWidth="0.4"/>
            <circle cx={x} cy={y} r="1" fill="#fef3c7"/>
          </g>
        ))}

        {/* Птица на дереве справа */}
        <line x1="160" y1="245" x2="160" y2="200" stroke="#86efac" strokeWidth="2"/>
        <ellipse cx="160" cy="195" rx="10" ry="8" fill="rgba(134,239,172,0.4)" stroke="#86efac" strokeWidth="1"/>
        <path d="M 158 180 Q 160 175 162 180 L 161 184 L 159 184 Z" fill="#fbbf24" stroke="#fef3c7" strokeWidth="0.4"/>
        <circle cx="160" cy="180" r="1" fill="#dc2626"/>

        {/* Фигура — коленопреклонённая женщина */}
        <ellipse cx="100" cy="180" rx="20" ry="28" fill="rgba(125,211,252,0.3)" stroke="#7dd3fc" strokeWidth="1.2"/>
        <circle cx="100" cy="145" r="10" fill="rgba(255,255,255,0.6)" stroke="#7dd3fc" strokeWidth="1"/>
        {/* Длинные волосы до пола */}
        <path d="M 91 150 Q 80 200 90 230 M 109 150 Q 120 200 110 230" fill="none" stroke="rgba(125,211,252,0.7)" strokeWidth="2"/>
        <path d="M 94 155 Q 88 200 92 225 M 106 155 Q 112 200 108 225" fill="none" stroke="rgba(125,211,252,0.5)" strokeWidth="1.2"/>

        {/* Левая рука с кувшином — наливает в воду */}
        <line x1="84" y1="180" x2="68" y2="200" stroke="#7dd3fc" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M 58 200 L 62 218 L 78 218 L 80 200 Z" fill="rgba(125,211,252,0.5)" stroke="#7dd3fc" strokeWidth="1.2"/>
        {/* Декоративный узор на кувшине */}
        <line x1="60" y1="208" x2="78" y2="208" stroke="#fbbf24" strokeWidth="0.4" opacity="0.7"/>
        <line x1="62" y1="212" x2="76" y2="212" stroke="#fbbf24" strokeWidth="0.4" opacity="0.7"/>
        {/* Поток воды */}
        <path d="M 70 218 Q 65 230 60 245" fill="none" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M 72 220 Q 67 232 62 247" fill="none" stroke="#7dd3fc" strokeWidth="1.2" strokeLinecap="round"/>
        {/* Брызги */}
        <circle cx="58" cy="240" r="0.8" fill="#fef3c7" opacity="0.8"/>
        <circle cx="55" cy="245" r="0.6" fill="#fef3c7" opacity="0.7"/>

        {/* Правая рука с кувшином — наливает на землю */}
        <line x1="116" y1="180" x2="132" y2="195" stroke="#7dd3fc" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M 126 195 L 130 208 L 144 208 L 142 195 Z" fill="rgba(125,211,252,0.5)" stroke="#7dd3fc" strokeWidth="1.2"/>
        <line x1="128" y1="201" x2="142" y2="201" stroke="#fbbf24" strokeWidth="0.4" opacity="0.7"/>
        {/* Поток на землю */}
        <path d="M 138 208 Q 142 218 148 225" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="148" cy="226" r="0.8" fill="#fef3c7" opacity="0.8"/>
        {/* Растения у потока */}
        <line x1="150" y1="235" x2="150" y2="225" stroke="#86efac" strokeWidth="0.8"/>
        <circle cx="150" cy="225" r="1.5" fill="#86efac"/>

        {/* Водоём внизу */}
        <ellipse cx="55" cy="252" rx="28" ry="6" fill="rgba(96,165,250,0.4)" stroke="#60a5fa" strokeWidth="0.6"/>
        <path d="M 30 252 Q 55 257 80 252" fill="none" stroke="#7dd3fc" strokeWidth="0.4"/>
        <path d="M 35 254 Q 55 258 75 254" fill="none" stroke="#7dd3fc" strokeWidth="0.3" opacity="0.6"/>

        {/* Земля/трава */}
        <path d="M 90 250 L 95 245 L 100 250 L 105 245 L 110 250" fill="none" stroke="#86efac" strokeWidth="0.6"/>
      </g>
    ),

    // XVIII. ЛУНА — луна между башнями, две собаки и рак
    "major-18": (
      <g>
        {/* Большая луна с лицом */}
        <circle cx="100" cy="80" r="26" fill="rgba(196,181,253,0.7)" stroke="#a78bfa" strokeWidth="2"/>
        {/* Лучи луны — 16 штук */}
        {Array.from({ length: 16 }).map((_, i) => {
          const a = (i / 16) * Math.PI * 2
          const x1 = 100 + Math.cos(a) * 26
          const y1 = 80 + Math.sin(a) * 26
          const x2 = 100 + Math.cos(a) * (i % 2 === 0 ? 36 : 32)
          const y2 = 80 + Math.sin(a) * (i % 2 === 0 ? 36 : 32)
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(196,181,253,0.7)" strokeWidth="1"/>
        })}
        {/* Лицо луны — профиль */}
        <path d="M 92 78 Q 88 85 92 92 Q 100 95 108 92 Q 112 85 108 78 Q 100 73 92 78 Z" fill="rgba(167,139,250,0.4)"/>
        <ellipse cx="95" cy="82" rx="1.5" ry="1" fill="#1a0a3a"/>
        <path d="M 96 87 Q 100 89 104 87" fill="none" stroke="#1a0a3a" strokeWidth="0.5"/>
        {/* Капли-слёзы с луны */}
        {[
          [85, 110], [115, 110]
        ].map(([x, y], i) => (
          <g key={i}>
            <path d={`M ${x} ${y} Q ${x+1} ${y+3} ${x} ${y+5}`} fill="rgba(196,181,253,0.7)"/>
            <text x={x} y={y-2} fontSize="5" textAnchor="middle" fill="rgba(196,181,253,0.8)">✦</text>
          </g>
        ))}

        {/* Две башни по бокам */}
        <rect x="35" y="120" width="20" height="135" fill="rgba(148,163,184,0.5)" stroke="#94a3b8" strokeWidth="1.5"/>
        <path d="M 32 120 L 45 100 L 58 120 Z" fill="rgba(220,38,38,0.5)" stroke="#94a3b8" strokeWidth="1"/>
        {/* Окна башни */}
        <rect x="42" y="140" width="6" height="10" fill="rgba(251,191,36,0.5)"/>
        <rect x="42" y="170" width="6" height="10" fill="rgba(251,191,36,0.5)"/>
        <rect x="42" y="200" width="6" height="10" fill="rgba(251,191,36,0.5)"/>

        <rect x="145" y="120" width="20" height="135" fill="rgba(148,163,184,0.5)" stroke="#94a3b8" strokeWidth="1.5"/>
        <path d="M 142 120 L 155 100 L 168 120 Z" fill="rgba(220,38,38,0.5)" stroke="#94a3b8" strokeWidth="1"/>
        <rect x="152" y="140" width="6" height="10" fill="rgba(251,191,36,0.5)"/>
        <rect x="152" y="170" width="6" height="10" fill="rgba(251,191,36,0.5)"/>
        <rect x="152" y="200" width="6" height="10" fill="rgba(251,191,36,0.5)"/>

        {/* Собака/волк слева — воет на луну */}
        <path d="M 70 235 Q 65 220 75 215 L 85 215 L 88 235 Z" fill="rgba(196,181,253,0.4)" stroke="#a78bfa" strokeWidth="1.2"/>
        <ellipse cx="72" cy="218" rx="6" ry="5" fill="rgba(196,181,253,0.5)" stroke="#a78bfa" strokeWidth="1"/>
        {/* Морда вытянута вверх */}
        <path d="M 70 215 L 65 205 L 70 210" fill="rgba(196,181,253,0.5)" stroke="#a78bfa" strokeWidth="0.8"/>
        <circle cx="68" cy="207" r="0.5" fill="#1a0a3a"/>
        {/* Уши */}
        <path d="M 68 213 L 67 207 L 70 211" fill="rgba(196,181,253,0.6)" stroke="#a78bfa" strokeWidth="0.5"/>
        <path d="M 76 213 L 76 207 L 78 211" fill="rgba(196,181,253,0.6)" stroke="#a78bfa" strokeWidth="0.5"/>
        {/* Пасть открыта — воет */}
        <path d="M 67 210 L 64 205 L 67 208" fill="#1a0a3a"/>
        <line x1="65" y1="208" x2="65" y2="210" stroke="#fef3c7" strokeWidth="0.4"/>

        {/* Собака/волк справа */}
        <path d="M 130 235 Q 135 220 125 215 L 115 215 L 112 235 Z" fill="rgba(196,181,253,0.4)" stroke="#a78bfa" strokeWidth="1.2"/>
        <ellipse cx="128" cy="218" rx="6" ry="5" fill="rgba(196,181,253,0.5)" stroke="#a78bfa" strokeWidth="1"/>
        <path d="M 130 215 L 135 205 L 130 210" fill="rgba(196,181,253,0.5)" stroke="#a78bfa" strokeWidth="0.8"/>
        <circle cx="132" cy="207" r="0.5" fill="#1a0a3a"/>
        <path d="M 124 213 L 124 207 L 122 211" fill="rgba(196,181,253,0.6)" stroke="#a78bfa" strokeWidth="0.5"/>
        <path d="M 132 213 L 133 207 L 130 211" fill="rgba(196,181,253,0.6)" stroke="#a78bfa" strokeWidth="0.5"/>
        <path d="M 133 210 L 136 205 L 133 208" fill="#1a0a3a"/>
        <line x1="135" y1="208" x2="135" y2="210" stroke="#fef3c7" strokeWidth="0.4"/>

        {/* Рак-скорпион в воде внизу */}
        <ellipse cx="100" cy="252" rx="18" ry="6" fill="rgba(220,38,38,0.5)" stroke="#dc2626" strokeWidth="1"/>
        {/* Тело рака — сегменты */}
        <path d="M 85 252 L 88 248 L 92 252 L 96 248 L 100 252 L 104 248 L 108 252 L 112 248 L 115 252" fill="none" stroke="#dc2626" strokeWidth="0.5"/>
        {/* Глаза рака на стебельках */}
        <line x1="84" y1="248" x2="82" y2="245" stroke="#dc2626" strokeWidth="0.6"/>
        <line x1="116" y1="248" x2="118" y2="245" stroke="#dc2626" strokeWidth="0.6"/>
        <circle cx="82" cy="245" r="1" fill="#fef3c7"/>
        <circle cx="118" cy="245" r="1" fill="#fef3c7"/>
        {/* Клешни */}
        <path d="M 82 251 Q 75 248 78 253 Q 80 252 82 252 Z" fill="rgba(220,38,38,0.6)" stroke="#dc2626" strokeWidth="0.6"/>
        <path d="M 118 251 Q 125 248 122 253 Q 120 252 118 252 Z" fill="rgba(220,38,38,0.6)" stroke="#dc2626" strokeWidth="0.6"/>
        {/* Лапки */}
        <line x1="88" y1="255" x2="85" y2="258" stroke="#dc2626" strokeWidth="0.5"/>
        <line x1="92" y1="256" x2="92" y2="258" stroke="#dc2626" strokeWidth="0.5"/>
        <line x1="108" y1="256" x2="108" y2="258" stroke="#dc2626" strokeWidth="0.5"/>
        <line x1="112" y1="255" x2="115" y2="258" stroke="#dc2626" strokeWidth="0.5"/>

        {/* Извилистая тропа между собаками */}
        <path d="M 100 240 Q 90 230 95 220 Q 105 210 95 200 Q 85 190 95 180 Q 105 170 95 160" fill="none" stroke="rgba(196,181,253,0.4)" strokeWidth="1" strokeDasharray="3 2"/>

        {/* Водоём */}
        <path d="M 70 250 Q 100 255 130 250" fill="none" stroke="#60a5fa" strokeWidth="0.8"/>
        <path d="M 72 254 Q 100 258 128 254" fill="none" stroke="#60a5fa" strokeWidth="0.5" opacity="0.6"/>
      </g>
    ),

    // XIX. СОЛНЦЕ — большое солнце с лицом, ребёнок на лошади, подсолнухи
    "major-19": (
      <g>
        {/* Большое солнце с лицом */}
        <circle cx="100" cy="80" r="32" fill="rgba(251,191,36,0.95)" stroke="#fef3c7" strokeWidth="2"/>
        {/* Прямые лучи — 8 длинных */}
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * Math.PI * 2
          const x1 = 100 + Math.cos(a) * 32
          const y1 = 80 + Math.sin(a) * 32
          const x2 = 100 + Math.cos(a) * 48
          const y2 = 80 + Math.sin(a) * 48
          return <line key={`straight-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(251,191,36,0.95)" strokeWidth="3"/>
        })}
        {/* Волнистые лучи — 8 между прямыми */}
        {Array.from({ length: 8 }).map((_, i) => {
          const a = ((i + 0.5) / 8) * Math.PI * 2
          const x1 = 100 + Math.cos(a) * 32
          const y1 = 80 + Math.sin(a) * 32
          const x2 = 100 + Math.cos(a) * 44
          const y2 = 80 + Math.sin(a) * 44
          const xm = 100 + Math.cos(a) * 38
          const ym = 80 + Math.sin(a) * 38
          return <path key={`wavy-${i}`} d={`M ${x1} ${y1} Q ${xm+1} ${ym} ${x2} ${y2}`} fill="none" stroke="rgba(251,191,36,0.8)" strokeWidth="1.5"/>
        })}

        {/* Лицо в солнце — радостное */}
        <circle cx="90" cy="75" r="2" fill="#7c2d12"/>
        <circle cx="110" cy="75" r="2" fill="#7c2d12"/>
        <path d="M 85 85 Q 100 100 115 85" fill="none" stroke="#7c2d12" strokeWidth="1.5"/>

        {/* Конь белый */}
        <ellipse cx="100" cy="200" rx="40" ry="16" fill="rgba(255,255,255,0.7)" stroke="#fef3c7" strokeWidth="1.5"/>
        {/* Голова коня */}
        <path d="M 60 200 Q 50 188 55 175 L 75 175 L 80 195 Z" fill="rgba(255,255,255,0.7)" stroke="#fef3c7" strokeWidth="1.5"/>
        {/* Грива золотая */}
        <path d="M 65 175 Q 60 165 70 162 Q 75 170 80 178" fill="rgba(251,191,36,0.7)" stroke="#fbbf24" strokeWidth="0.8"/>
        <path d="M 70 175 Q 70 168 78 168" fill="none" stroke="rgba(251,191,36,0.8)" strokeWidth="1"/>
        {/* Глаз коня */}
        <circle cx="65" cy="185" r="1" fill="#7c2d12"/>
        {/* Уши */}
        <path d="M 70 175 L 68 170 L 72 173 Z" fill="rgba(255,255,255,0.8)" stroke="#fef3c7" strokeWidth="0.5"/>
        <path d="M 76 175 L 76 170 L 80 173 Z" fill="rgba(255,255,255,0.8)" stroke="#fef3c7" strokeWidth="0.5"/>
        {/* Ноги коня */}
        {[70, 90, 110, 130].map((x, i) => (
          <line key={i} x1={x} y1={214} x2={x} y2={245} stroke="#fef3c7" strokeWidth="2.5"/>
        ))}

        {/* Ребёнок на коне — обнажённый, с венком */}
        <circle cx="105" cy="155" r="8" fill="rgba(255,255,255,0.8)" stroke="#fef3c7" strokeWidth="1.2"/>
        {/* Венок из цветов на голове */}
        <path d="M 98 150 Q 105 144 112 150" fill="none" stroke="#86efac" strokeWidth="1.2"/>
        {[
          [98, 150], [102, 147], [106, 146], [110, 147], [112, 150]
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="1.2" fill={['#f9a8d4', '#fbbf24', '#dc2626', '#fbbf24', '#f9a8d4'][i]}/>
        ))}
        {/* Тело ребёнка */}
        <path d="M 96 175 L 100 162 L 115 162 L 118 175 Z" fill="rgba(251,191,36,0.5)" stroke="#fbbf24" strokeWidth="1.2"/>
        {/* Рука с флагом */}
        <line x1="115" y1="165" x2="125" y2="140" stroke="#fef3c7" strokeWidth="1.5"/>
        <path d="M 125 140 L 145 140 L 142 158 L 125 155 Z" fill="rgba(220,38,38,0.7)" stroke="#fbbf24" strokeWidth="1"/>
        <line x1="125" y1="140" x2="125" y2="155" stroke="#fbbf24" strokeWidth="0.5"/>

        {/* Подсолнухи по бокам */}
        <g>
          <line x1="40" y1="245" x2="40" y2="220" stroke="#86efac" strokeWidth="1.5"/>
          <ellipse cx="38" cy="225" rx="3" ry="1" fill="#86efac"/>
          <ellipse cx="42" cy="232" rx="3" ry="1" fill="#86efac"/>
          {/* Цветок подсолнуха */}
          <circle cx="40" cy="217" r="6" fill="#fbbf24" stroke="#fef3c7" strokeWidth="0.6"/>
          <circle cx="40" cy="217" r="3" fill="#7c2d12"/>
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i / 8) * Math.PI * 2
            return <ellipse key={i} cx={40 + Math.cos(a) * 7} cy={217 + Math.sin(a) * 7} rx="2" ry="3.5" fill="#fbbf24" transform={`rotate(${a * 180 / Math.PI} ${40 + Math.cos(a) * 7} ${217 + Math.sin(a) * 7})`}/>
          })}
        </g>
        <g>
          <line x1="160" y1="245" x2="160" y2="220" stroke="#86efac" strokeWidth="1.5"/>
          <ellipse cx="158" cy="225" rx="3" ry="1" fill="#86efac"/>
          <ellipse cx="162" cy="232" rx="3" ry="1" fill="#86efac"/>
          <circle cx="160" cy="217" r="6" fill="#fbbf24" stroke="#fef3c7" strokeWidth="0.6"/>
          <circle cx="160" cy="217" r="3" fill="#7c2d12"/>
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i / 8) * Math.PI * 2
            return <ellipse key={i} cx={160 + Math.cos(a) * 7} cy={217 + Math.sin(a) * 7} rx="2" ry="3.5" fill="#fbbf24" transform={`rotate(${a * 180 / Math.PI} ${160 + Math.cos(a) * 7} ${217 + Math.sin(a) * 7})`}/>
          })}
        </g>

        {/* Стена-забор внизу */}
        <line x1="20" y1="248" x2="180" y2="248" stroke="#fbbf24" strokeWidth="0.8" opacity="0.6"/>
      </g>
    ),

    // XX. СУД — ангел с трубой над восстающими из гробов
    "major-20": (
      <g>
        {/* Ангел в облаках с трубой */}
        <ellipse cx="100" cy="85" rx="42" ry="14" fill="rgba(167,243,208,0.3)"/>
        {/* Крылья ангела большие */}
        <path d="M 75 88 Q 50 95 45 75 Q 65 85 78 92 Z" fill="rgba(255,255,255,0.6)" stroke="#fbbf24" strokeWidth="0.8"/>
        <path d="M 125 88 Q 150 95 155 75 Q 135 85 122 92 Z" fill="rgba(255,255,255,0.6)" stroke="#fbbf24" strokeWidth="0.8"/>
        {/* Перья на крыльях */}
        {[55, 62, 69, 76].map((x, i) => (
          <line key={`l-${i}`} x1={x} y1={86} x2={x} y2={93} stroke="#fbbf24" strokeWidth="0.4"/>
        ))}
        {[138, 145, 152, 159].map((x, i) => (
          <line key={`r-${i}`} x1={x} y1={86} x2={x} y2={93} stroke="#fbbf24" strokeWidth="0.4"/>
        ))}

        {/* Голова ангела */}
        <circle cx="100" cy="80" r="8" fill="rgba(255,255,255,0.7)" stroke="#fbbf24" strokeWidth="1"/>
        {/* Нимб над головой */}
        <ellipse cx="100" cy="71" rx="7" ry="2" fill="none" stroke="#fbbf24" strokeWidth="1.2"/>

        {/* Труба большая */}
        <line x1="100" y1="92" x2="140" y2="105" stroke="#fbbf24" strokeWidth="2.5"/>
        {/* Раструб трубы */}
        <path d="M 132 95 L 150 102 L 145 115 L 128 108 Z" fill="rgba(251,191,36,0.8)" stroke="#fef3c7" strokeWidth="1.2"/>
        {/* Крест на трубе — флаг */}
        <line x1="140" y1="98" x2="140" y2="108" stroke="#dc2626" strokeWidth="1.2"/>
        <line x1="136" y1="102" x2="144" y2="102" stroke="#dc2626" strokeWidth="1.2"/>

        {/* Звуковые волны от трубы */}
        <path d="M 150 105 Q 160 110 165 120" fill="none" stroke="#fbbf24" strokeWidth="0.8" opacity="0.5"/>
        <path d="M 155 108 Q 165 113 170 123" fill="none" stroke="#fbbf24" strokeWidth="0.6" opacity="0.4"/>
        <path d="M 160 110 Q 170 115 175 125" fill="none" stroke="#fbbf24" strokeWidth="0.5" opacity="0.3"/>

        {/* Три гроба внизу */}
        {/* Гроб слева — женщина восстающая */}
        <rect x="30" y="195" width="38" height="55" fill="rgba(148,163,184,0.6)" stroke="#94a3b8" strokeWidth="1.5"/>
        <path d="M 30 200 Q 49 195 68 200" fill="none" stroke="#94a3b8" strokeWidth="1"/>
        {/* Женщина восстающая */}
        <circle cx="49" cy="185" r="6" fill="rgba(249,168,212,0.7)" stroke="#f9a8d4" strokeWidth="0.8"/>
        {/* Длинные волосы */}
        <path d="M 45 188 L 42 200 M 53 188 L 56 200" stroke="#f9a8d4" strokeWidth="0.6"/>
        <path d="M 45 195 L 47 210 L 53 210 L 55 195 Z" fill="rgba(249,168,212,0.5)" stroke="#f9a8d4" strokeWidth="0.8"/>
        {/* Руки воздеты */}
        <line x1="44" y1="180" x2="40" y2="165" stroke="#f9a8d4" strokeWidth="1.2"/>
        <line x1="54" y1="180" x2="58" y2="165" stroke="#f9a8d4" strokeWidth="1.2"/>
        {/* Молитвенно сложены руки */}
        <line x1="49" y1="195" x2="49" y2="205" stroke="#f9a8d4" strokeWidth="0.8"/>

        {/* Гроб центральный — мужчина восстающий */}
        <rect x="81" y="195" width="38" height="55" fill="rgba(148,163,184,0.6)" stroke="#94a3b8" strokeWidth="1.5"/>
        <path d="M 81 200 Q 100 195 119 200" fill="none" stroke="#94a3b8" strokeWidth="1"/>
        <circle cx="100" cy="180" r="7" fill="rgba(96,165,250,0.7)" stroke="#7dd3fc" strokeWidth="0.8"/>
        {/* Борода */}
        <path d="M 96 187 L 96 195 L 104 195 L 104 187" fill="rgba(255,255,255,0.6)" stroke="#7dd3fc" strokeWidth="0.5"/>
        <path d="M 93 190 L 92 200 L 100 200 L 108 200 L 107 190 Z" fill="rgba(96,165,250,0.5)" stroke="#7dd3fc" strokeWidth="0.8"/>
        {/* Руки воздеты */}
        <line x1="94" y1="178" x2="88" y2="160" stroke="#7dd3fc" strokeWidth="1.5"/>
        <line x1="106" y1="178" x2="112" y2="160" stroke="#7dd3fc" strokeWidth="1.5"/>

        {/* Гроб правый — ребёнок */}
        <rect x="132" y="195" width="38" height="55" fill="rgba(148,163,184,0.6)" stroke="#94a3b8" strokeWidth="1.5"/>
        <path d="M 132 200 Q 151 195 170 200" fill="none" stroke="#94a3b8" strokeWidth="1"/>
        <circle cx="151" cy="188" r="5" fill="rgba(255,255,255,0.7)" stroke="#fef3c7" strokeWidth="0.8"/>
        <path d="M 148 192 L 146 205 L 156 205 L 154 192 Z" fill="rgba(255,255,255,0.5)" stroke="#fef3c7" strokeWidth="0.8"/>
        <line x1="148" y1="186" x2="144" y2="175" stroke="#fef3c7" strokeWidth="1"/>
        <line x1="154" y1="186" x2="158" y2="175" stroke="#fef3c7" strokeWidth="1"/>

        {/* Зигзаги-молнии от трубы */}
        <path d="M 80 110 L 75 130 L 80 130 L 75 150" fill="none" stroke="#fbbf24" strokeWidth="0.8" opacity="0.6"/>
        <path d="M 120 110 L 125 130 L 120 130 L 125 150" fill="none" stroke="#fbbf24" strokeWidth="0.8" opacity="0.6"/>
      </g>
    ),

    // XXI. МИР — фигура в венке с 4 символами евангелистов
    "major-21": (
      <g>
        {/* Овальный венок — большой и детальный */}
        <ellipse cx="100" cy="160" rx="48" ry="62" fill="none" stroke="rgba(134,239,172,0.8)" strokeWidth="4"/>
        <ellipse cx="100" cy="160" rx="44" ry="58" fill="rgba(134,239,172,0.15)" stroke="rgba(134,239,172,0.4)" strokeWidth="1.5"/>
        <ellipse cx="100" cy="160" rx="42" ry="56" fill="none" stroke="rgba(134,239,172,0.5)" strokeWidth="0.8" strokeDasharray="2 1"/>

        {/* Листья на венке — множество маленьких */}
        {Array.from({ length: 32 }).map((_, i) => {
          const a = (i / 32) * Math.PI * 2
          const x = 100 + Math.cos(a) * 46
          const y = 160 + Math.sin(a) * 60
          const rot = (a * 180 / Math.PI) + 90
          return (
            <ellipse
              key={i}
              cx={x}
              cy={y}
              rx="3"
              ry="1.5"
              fill="rgba(134,239,172,0.7)"
              stroke="#86efac"
              strokeWidth="0.3"
              transform={`rotate(${rot} ${x} ${y})`}
            />
          )
        })}

        {/* Фигура танцующая в центре */}
        <ellipse cx="100" cy="175" rx="13" ry="22" fill="rgba(52,211,153,0.5)" stroke="#34d399" strokeWidth="1.5"/>
        <circle cx="100" cy="148" r="9" fill="rgba(255,255,255,0.6)" stroke="#34d399" strokeWidth="1.2"/>
        {/* Лёгкий шарф */}
        <path d="M 86 165 Q 80 195 92 210" fill="none" stroke="rgba(52,211,153,0.7)" strokeWidth="2"/>
        <path d="M 114 165 Q 120 195 108 210" fill="none" stroke="rgba(52,211,153,0.7)" strokeWidth="2"/>
        {/* Второй шарф красный */}
        <path d="M 88 175 Q 85 200 95 215" fill="none" stroke="rgba(220,38,38,0.5)" strokeWidth="1.5"/>

        {/* Жезл в поднятой руке — двойной */}
        <line x1="110" y1="155" x2="125" y2="125" stroke="#fbbf24" strokeWidth="2"/>
        <line x1="125" y1="125" x2="130" y2="130" stroke="#fbbf24" strokeWidth="1.5"/>
        <line x1="125" y1="125" x2="120" y2="120" stroke="#fbbf24" strokeWidth="1.5"/>
        <circle cx="125" cy="125" r="2" fill="#fbbf24"/>

        {/* Вторая рука внизу с той же позой */}
        <line x1="90" y1="180" x2="78" y2="200" stroke="#34d399" strokeWidth="2"/>

        {/* Нога вытянута в танце */}
        <path d="M 95 195 L 90 220" stroke="#34d399" strokeWidth="2"/>
        <path d="M 105 195 L 110 218" stroke="#34d399" strokeWidth="2"/>

        {/* 4 символа евангелистов в углах */}
        {/* Лев (Марк) — верхний левый */}
        <g>
          <circle cx="35" cy="55" r="15" fill="rgba(251,191,36,0.3)" stroke="#fbbf24" strokeWidth="1.5"/>
          {/* Лев стилизованный */}
          <ellipse cx="35" cy="58" rx="9" ry="6" fill="rgba(251,191,36,0.6)" stroke="#fbbf24" strokeWidth="0.8"/>
          <circle cx="32" cy="55" r="4" fill="rgba(251,191,36,0.6)" stroke="#fbbf24" strokeWidth="0.8"/>
          {/* Грива-лучи */}
          {Array.from({ length: 6 }).map((_, i) => {
            const a = (i / 5) * Math.PI - Math.PI / 2
            return <line key={i} x1={32 + Math.cos(a) * 3} y1={55 + Math.sin(a) * 3} x2={32 + Math.cos(a) * 6} y2={55 + Math.sin(a) * 6} stroke="#fbbf24" strokeWidth="0.6"/>
          })}
          <circle cx="32" cy="54" r="0.8" fill="#7c2d12"/>
        </g>

        {/* Телец/Бык (Лука) — верхний правый */}
        <g>
          <circle cx="165" cy="55" r="15" fill="rgba(163,230,53,0.3)" stroke="#a3e635" strokeWidth="1.5"/>
          <ellipse cx="165" cy="60" rx="9" ry="5" fill="rgba(163,230,53,0.6)" stroke="#a3e635" strokeWidth="0.8"/>
          {/* Рога быка */}
          <path d="M 158 55 Q 154 50 156 47" fill="none" stroke="#fbbf24" strokeWidth="1.2"/>
          <path d="M 172 55 Q 176 50 174 47" fill="none" stroke="#fbbf24" strokeWidth="1.2"/>
          <circle cx="162" cy="56" r="0.8" fill="#7c2d12"/>
          <circle cx="168" cy="56" r="0.8" fill="#7c2d12"/>
          {/* Ноздри */}
          <circle cx="165" cy="62" r="0.6" fill="#7c2d12"/>
        </g>

        {/* Ангел (Матфей) — нижний левый */}
        <g>
          <circle cx="35" cy="245" r="15" fill="rgba(167,139,250,0.3)" stroke="#a78bfa" strokeWidth="1.5"/>
          {/* Ангел с крыльями */}
          <circle cx="35" cy="245" r="5" fill="rgba(255,255,255,0.7)" stroke="#a78bfa" strokeWidth="0.8"/>
          <path d="M 30 245 Q 25 240 27 250 Z" fill="rgba(255,255,255,0.5)" stroke="#a78bfa" strokeWidth="0.6"/>
          <path d="M 40 245 Q 45 240 43 250 Z" fill="rgba(255,255,255,0.5)" stroke="#a78bfa" strokeWidth="0.6"/>
          {/* Нимб */}
          <ellipse cx="35" cy="240" rx="3" ry="1" fill="none" stroke="#fbbf24" strokeWidth="0.6"/>
        </g>

        {/* Орёл (Иоанн) — нижний правый */}
        <g>
          <circle cx="165" cy="245" r="15" fill="rgba(96,165,250,0.3)" stroke="#60a5fa" strokeWidth="1.5"/>
          {/* Орёл стилизованный */}
          <ellipse cx="165" cy="245" rx="8" ry="5" fill="rgba(96,165,250,0.6)" stroke="#60a5fa" strokeWidth="0.8"/>
          {/* Крылья орла */}
          <path d="M 158 243 Q 152 240 154 250 Q 158 248 162 247 Z" fill="rgba(96,165,250,0.7)" stroke="#60a5fa" strokeWidth="0.6"/>
          <path d="M 172 243 Q 178 240 176 250 Q 172 248 168 247 Z" fill="rgba(96,165,250,0.7)" stroke="#60a5fa" strokeWidth="0.6"/>
          {/* Клюв */}
          <path d="M 162 245 L 159 247 L 162 247 Z" fill="#fbbf24"/>
          <circle cx="163" cy="244" r="0.8" fill="#7c2d12"/>
        </g>

        {/* Центральная звезда над фигурой */}
        <text x="100" y="135" fontSize="10" textAnchor="middle" fill="#fbbf24">✦</text>
      </g>
    ),
  }
  return map[card.id] || null
}

// === Младшие арканы — улучшенные ===
function MinorArcanaArt({ card }: { card: TarotCard }) {
  const suitColor = suitInfo[card.suit].color
  const rank = card.rank!

  // Туз — крупный символ с лучами и короной
  if (rank === "ace") {
    return (
      <g>
        {/* Рука из облака держит символ */}
        <ellipse cx="100" cy="95" rx="20" ry="8" fill="rgba(255,255,255,0.3)"/>
        <path d="M 88 100 L 108 100 L 110 115 L 100 110 L 90 115 Z" fill="rgba(255,255,255,0.5)" stroke={suitColor} strokeWidth="1.2"/>
        {/* Рукав */}
        <path d="M 88 105 Q 80 95 88 90 L 92 100 M 108 105 Q 116 95 108 90 L 104 100" fill="rgba(255,255,255,0.4)" stroke={suitColor} strokeWidth="0.6"/>

        {/* Большой символ масти */}
        <text x="100" y="200" fontSize="90" textAnchor="middle" fill={suitColor} opacity="0.85">{getSuitSymbol(card.suit)}</text>

        {/* Лучи вокруг символа */}
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2
          const x1 = 100 + Math.cos(a) * 55
          const y1 = 175 + Math.sin(a) * 55
          const x2 = 100 + Math.cos(a) * 65
          const y2 = 175 + Math.sin(a) * 65
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={suitColor} strokeWidth="1.2" opacity="0.5"/>
        })}

        {/* Декоративные завитки */}
        <path d="M 60 240 Q 70 245 80 240" fill="none" stroke={suitColor} strokeWidth="0.8" opacity="0.6"/>
        <path d="M 120 240 Q 130 245 140 240" fill="none" stroke={suitColor} strokeWidth="0.8" opacity="0.6"/>
        <text x="55" y="245" fontSize="6" fill={suitColor} opacity="0.6">✦</text>
        <text x="145" y="245" fontSize="6" fill={suitColor} opacity="0.6">✦</text>
      </g>
    )
  }

  // Числовые карты — узорное расположение символов
  if (["two","three","four","five","six","seven","eight","nine","ten"].includes(rank)) {
    const count = { two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10 }[rank]!
    const positions: Record<number, [number, number][]> = {
      2: [[100, 130], [100, 215]],
      3: [[100, 120], [100, 175], [100, 230]],
      4: [[70, 130], [130, 130], [70, 215], [130, 215]],
      5: [[70, 125], [130, 125], [100, 172], [70, 220], [130, 220]],
      6: [[70, 125], [130, 125], [70, 172], [130, 172], [70, 220], [130, 220]],
      7: [[70, 120], [130, 120], [100, 152], [70, 180], [130, 180], [70, 225], [130, 225]],
      8: [[70, 120], [130, 120], [100, 152], [70, 180], [130, 180], [70, 225], [130, 225], [100, 230]],
      9: [[70, 120], [130, 120], [70, 160], [130, 160], [100, 180], [70, 200], [130, 200], [70, 235], [130, 235]],
      10: [[70, 115], [130, 115], [70, 150], [130, 150], [70, 185], [130, 185], [70, 220], [130, 220], [100, 132], [100, 200]],
    }
    const pos = positions[count] || []

    return (
      <g>
        {/* Декоративная арока сверху */}
        <path d="M 50 110 Q 100 90 150 110" fill="none" stroke={suitColor} strokeWidth="0.8" opacity="0.5"/>
        {/* Цветы по краям арки */}
        <circle cx="50" cy="110" r="2.5" fill={suitColor} opacity="0.6"/>
        <circle cx="50" cy="110" r="1" fill="#fef3c7"/>
        <circle cx="150" cy="110" r="2.5" fill={suitColor} opacity="0.6"/>
        <circle cx="150" cy="110" r="1" fill="#fef3c7"/>

        {/* Символы масти */}
        {pos.map(([x, y], i) => (
          <g key={i}>
            <text x={x} y={y + 7} fontSize="22" textAnchor="middle" fill={suitColor} opacity="0.85">{getSuitSymbol(card.suit)}</text>
            {/* Маленькие искры вокруг */}
            {i % 2 === 0 && (
              <>
                <text x={x - 8} y={y + 3} fontSize="3" fill={suitColor} opacity="0.5">✦</text>
                <text x={x + 8} y={y + 3} fontSize="3" fill={suitColor} opacity="0.5">✦</text>
              </>
            )}
          </g>
        ))}

        {/* Декоративная арка снизу */}
        <path d="M 50 245 Q 100 260 150 245" fill="none" stroke={suitColor} strokeWidth="0.8" opacity="0.5"/>
        <circle cx="50" cy="245" r="2.5" fill={suitColor} opacity="0.6"/>
        <circle cx="150" cy="245" r="2.5" fill={suitColor} opacity="0.6"/>

        {/* Центральная декоративная звезда для нечётных карт */}
        {count % 2 === 1 && (
          <text x="100" y="178" fontSize="6" textAnchor="middle" fill={suitColor} opacity="0.4">✦</text>
        )}
      </g>
    )
  }

  // Фигурные карты — Паж, Рыцарь, Королева, Король
  const figureConfig: Record<string, { color: string; accessory: string }> = {
    page: { color: "rgba(167,243,208,0.4)", accessory: "П" },
    knight: { color: "rgba(251,191,36,0.4)", accessory: "R" },
    queen: { color: "rgba(249,168,212,0.4)", accessory: "Q" },
    king: { color: "rgba(251,191,36,0.5)", accessory: "K" },
  }
  const fc = figureConfig[rank]

  return (
    <g>
      {/* Конь для рыцаря */}
      {rank === "knight" && (
        <>
          <ellipse cx="100" cy="210" rx="35" ry="14" fill="rgba(148,163,184,0.4)" stroke="#94a3b8" strokeWidth="1.5"/>
          {/* Голова коня */}
          <path d="M 68 210 Q 60 198 64 188 L 76 190 L 80 205 Z" fill="rgba(148,163,184,0.5)" stroke="#94a3b8" strokeWidth="1.2"/>
          <circle cx="68" cy="195" r="1" fill="#1a0a3a"/>
          {/* Грива */}
          <path d="M 72 188 Q 75 180 80 185" fill="none" stroke="#fbbf24" strokeWidth="1"/>
          {/* Ноги */}
          {[75, 90, 110, 125].map((x, i) => (
            <line key={i} x1={x} y1="222" x2={x} y2="240" stroke="#94a3b8" strokeWidth="2"/>
          ))}
        </>
      )}

      {/* Трон для королевы и короля */}
      {(rank === "queen" || rank === "king") && (
        <>
          <rect x="65" y="185" width="70" height="65" fill="rgba(148,163,184,0.3)" stroke="#94a3b8" strokeWidth="1.5"/>
          <rect x="60" y="100" width="80" height="12" fill="rgba(148,163,184,0.4)" stroke="#94a3b8" strokeWidth="1.5"/>
          {/* Орнаменты на троне */}
          {[
            [75, 200], [100, 200], [125, 200],
            [75, 225], [100, 225], [125, 225]
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="2" fill={suitColor} opacity="0.6"/>
          ))}
        </>
      )}

      {/* Фигура */}
      <path d="M 88 195 L 92 130 L 108 130 L 112 195 Z" fill={fc.color} stroke={suitColor} strokeWidth="1.5"/>
      <circle cx="100" cy="120" r="11" fill="rgba(255,255,255,0.6)" stroke={suitColor} strokeWidth="1.5"/>

      {/* Корона для короля и королевы */}
      {(rank === "king" || rank === "queen") && (
        <g>
          <path d="M 90 105 L 95 92 L 100 105 L 105 92 L 110 105 Z" fill="#fbbf24" stroke="#fef3c7" strokeWidth="1"/>
          <circle cx="95" cy="92" r="1.5" fill="#dc2626"/>
          <circle cx="100" cy="92" r="1.5" fill="#a78bfa"/>
          <circle cx="105" cy="92" r="1.5" fill="#dc2626"/>
        </g>
      )}

      {/* Шлем для рыцаря */}
      {rank === "knight" && (
        <g>
          <path d="M 88 118 Q 100 100 112 118 L 110 128 L 90 128 Z" fill="rgba(148,163,184,0.6)" stroke="#94a3b8" strokeWidth="1.5"/>
          {/* Гребень на шлеме */}
          <path d="M 100 100 L 100 92 L 102 92 L 102 100" fill="#dc2626" stroke="#fef3c7" strokeWidth="0.4"/>
          {/* Забрало */}
          <line x1="92" y1="120" x2="108" y2="120" stroke="#1a0a3a" strokeWidth="0.5"/>
        </g>
      )}

      {/* Шапочка с пером для пажа */}
      {rank === "page" && (
        <g>
          <path d="M 90 112 Q 100 102 110 112 L 108 118 L 92 118 Z" fill="rgba(134,239,172,0.5)" stroke="#86efac" strokeWidth="1"/>
          <path d="M 110 108 Q 118 102 116 92 Q 113 100 110 100" fill="#dc2626" stroke="#fbbf24" strokeWidth="0.5"/>
        </g>
      )}

      {/* Символ масти в руках фигуры — крупно */}
      <g transform="translate(100, 160)">
        <circle r="9" fill={`${suitColor}33`} stroke={suitColor} strokeWidth="0.8"/>
        <text y="4" fontSize="14" textAnchor="middle" fill={suitColor} opacity="0.95">{getSuitSymbol(card.suit)}</text>
      </g>

      {/* Декоративные элементы вокруг */}
      <text x="50" y="160" fontSize="8" fill={suitColor} opacity="0.5">✦</text>
      <text x="150" y="160" fontSize="8" fill={suitColor} opacity="0.5">✦</text>

      {/* Буква ранга внизу */}
      <text x="100" y="245" fontSize="11" textAnchor="middle" fill={suitColor} opacity="0.7" fontWeight="bold">{fc.accessory}</text>
    </g>
  )
}

// === ГЛАВНЫЙ КОМПОНЕНТ КАРТЫ ===
export function CardSVG({ card, isReversed = false, width = 200, height = 320, className }: CardSVGProps) {
  const suitInfoData = suitInfo[card.suit]
  const isMajor = card.suit === "major"
  const majorSym = isMajor ? getMajorSymbol(card.number) : null
  const accentColor = card.accent || suitInfoData.color

  return (
    <svg
      viewBox="0 0 200 320"
      width={width}
      height={height}
      className={className}
      style={{
        transform: isReversed ? "rotate(180deg)" : "none",
        transition: "transform 0.4s ease",
      }}
    >
      <defs>
        {/* Богатый градиентный фон */}
        <linearGradient id={`bg-${card.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1a0f2e" stopOpacity="0.98"/>
          <stop offset="50%" stopColor="#2d1b4e" stopOpacity="0.98"/>
          <stop offset="100%" stopColor="#1a0f2e" stopOpacity="0.98"/>
        </linearGradient>
        {/* Лёгкое радиальное свечение — мягкое, не мешает иллюстрации */}
        <radialGradient id={`glow-${card.id}`} cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor={accentColor} stopOpacity="0.18"/>
          <stop offset="60%" stopColor={accentColor} stopOpacity="0.05"/>
          <stop offset="100%" stopColor={accentColor} stopOpacity="0"/>
        </radialGradient>
        {/* Звёздный паттерн — только в углах, центр чистый для иллюстрации */}
        <pattern id={`stars-${card.id}`} width="200" height="320" patternUnits="userSpaceOnUse">
          {/* Угловые созвездия */}
          <circle cx="15" cy="15" r="0.5" fill="rgba(255,255,255,0.4)"/>
          <circle cx="25" cy="22" r="0.4" fill="rgba(255,255,255,0.3)"/>
          <circle cx="185" cy="15" r="0.5" fill="rgba(255,255,255,0.4)"/>
          <circle cx="175" cy="22" r="0.4" fill="rgba(255,255,255,0.3)"/>
          <circle cx="15" cy="305" r="0.5" fill="rgba(255,255,255,0.4)"/>
          <circle cx="25" cy="298" r="0.4" fill="rgba(255,255,255,0.3)"/>
          <circle cx="185" cy="305" r="0.5" fill="rgba(255,255,255,0.4)"/>
          <circle cx="175" cy="298" r="0.4" fill="rgba(255,255,255,0.3)"/>
        </pattern>
      </defs>

      {/* Слои фона */}
      <rect x="0" y="0" width="200" height="320" fill={`url(#bg-${card.id})`} rx="10"/>
      <rect x="0" y="0" width="200" height="320" fill={`url(#stars-${card.id})`} rx="10"/>
      <rect x="0" y="0" width="200" height="320" fill={`url(#glow-${card.id})`} rx="10"/>

      {/* Декоративная рамка с орнаментом */}
      <OrnateBorder accent={accentColor}/>

      {/* Мистические узоры по краям — центр остаётся чистым */}
      <EdgeOrnaments accent={accentColor}/>

      {/* Верхняя метка — номер/ранг + символ масти */}
      <g>
        <rect x="14" y="14" width="32" height="22" fill="rgba(26,15,46,0.6)" stroke={accentColor} strokeWidth="0.6" rx="2"/>
        <text x="30" y="30" fontSize="13" textAnchor="middle" fill={accentColor} fontWeight="bold" opacity="0.95">
          {isMajor ? majorSym?.roman : getRankSymbol(card.rank)}
        </text>
      </g>
      <g>
        <rect x="154" y="14" width="32" height="22" fill="rgba(26,15,46,0.6)" stroke={accentColor} strokeWidth="0.6" rx="2"/>
        <text x="170" y="30" fontSize="13" textAnchor="middle" fill={accentColor} opacity="0.9">
          {isMajor ? majorSym?.symbol : suitInfoData.symbol}
        </text>
      </g>

      {/* Нижняя метка — зеркально */}
      <g>
        <rect x="154" y="284" width="32" height="22" fill="rgba(26,15,46,0.6)" stroke={accentColor} strokeWidth="0.6" rx="2"/>
        <text x="170" y="300" fontSize="13" textAnchor="middle" fill={accentColor} fontWeight="bold" opacity="0.95">
          {isMajor ? majorSym?.roman : getRankSymbol(card.rank)}
        </text>
      </g>
      <g>
        <rect x="14" y="284" width="32" height="22" fill="rgba(26,15,46,0.6)" stroke={accentColor} strokeWidth="0.6" rx="2"/>
        <text x="30" y="300" fontSize="13" textAnchor="middle" fill={accentColor} opacity="0.9">
          {isMajor ? majorSym?.symbol : suitInfoData.symbol}
        </text>
      </g>

      {/* Основная иллюстрация */}
      <g color={accentColor}>
        {isMajor ? <MajorArcanaArt card={card}/> : <MinorArcanaArt card={card}/>}
      </g>

      {/* Название карты внизу в декоративной плашке */}
      <rect x="40" y="265" width="120" height="14" fill="rgba(26,15,46,0.7)" stroke={accentColor} strokeWidth="0.5" rx="3" opacity="0.85"/>
      <text x="100" y="276" fontSize="10" textAnchor="middle" fill="rgba(255,255,255,0.95)" fontWeight="500">
        {card.name}
      </text>
    </svg>
  )
}

// === РУБАШКА КАРТЫ — улучшенная с мистическими узорами ===
export function CardBack({ width = 200, height = 320, className }: { width?: number; height?: number; className?: string }) {
  return (
    <svg viewBox="0 0 200 320" width={width} height={height} className={className}>
      <defs>
        <linearGradient id="cardback-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2d1b4e"/>
          <stop offset="50%" stopColor="#1a0f2e"/>
          <stop offset="100%" stopColor="#0f0820"/>
        </linearGradient>
        <radialGradient id="cardback-glow" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="rgba(251,191,36,0.35)"/>
          <stop offset="100%" stopColor="rgba(251,191,36,0)"/>
        </radialGradient>
        <pattern id="cardback-pattern" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M 15 0 L 30 15 L 15 30 L 0 15 Z" fill="none" stroke="rgba(251,191,36,0.25)" strokeWidth="0.5"/>
          <circle cx="15" cy="15" r="2" fill="rgba(251,191,36,0.45)"/>
          <circle cx="0" cy="0" r="0.6" fill="rgba(251,191,36,0.5)"/>
          <circle cx="30" cy="30" r="0.6" fill="rgba(251,191,36,0.5)"/>
          <circle cx="0" cy="30" r="0.5" fill="rgba(196,181,253,0.4)"/>
          <circle cx="30" cy="0" r="0.5" fill="rgba(196,181,253,0.4)"/>
        </pattern>
      </defs>

      {/* Фон */}
      <rect x="0" y="0" width="200" height="320" fill="url(#cardback-bg)" rx="10"/>
      <rect x="0" y="0" width="200" height="320" fill="url(#cardback-pattern)" rx="10"/>
      <rect x="0" y="0" width="200" height="320" fill="url(#cardback-glow)" rx="10"/>

      {/* Двойная рамка */}
      <rect x="6" y="6" width="188" height="308" fill="none" stroke="rgba(251,191,36,0.7)" strokeWidth="1.5" rx="6"/>
      <rect x="10" y="10" width="180" height="300" fill="none" stroke="rgba(251,191,36,0.4)" strokeWidth="0.5" rx="4"/>
      <rect x="13" y="13" width="174" height="294" fill="none" stroke="rgba(251,191,36,0.25)" strokeWidth="0.4" rx="3"/>

      {/* Угловые орнаменты — стилизованные лилии */}
      {[
        [18, 18, 0], [182, 18, 90], [182, 302, 180], [18, 302, 270],
      ].map(([x, y, rot], i) => (
        <g key={i} transform={`rotate(${rot} ${x} ${y})`}>
          <path d={`M ${x} ${y} L ${x + 14} ${y} L ${x + 14} ${y + 2} L ${x + 2} ${y + 2} L ${x + 2} ${y + 14} L ${x} ${y + 14} Z`} fill="rgba(251,191,36,0.75)"/>
          <path d={`M ${x + 3} ${y + 3} L ${x + 10} ${y + 3} M ${x + 3} ${y + 3} L ${x + 3} ${y + 10}`} stroke="rgba(251,191,36,0.9)" strokeWidth="0.4"/>
          <circle cx={x + 17} cy={y + 17} r="2.5" fill="rgba(251,191,36,0.7)"/>
          <circle cx={x + 17} cy={y + 17} r="5" fill="none" stroke="rgba(251,191,36,0.4)" strokeWidth="0.4"/>
        </g>
      ))}

      {/* Центральный медальон */}
      <g transform="translate(100, 160)">
        {/* Внешний круг с орнаментом */}
        <circle r="48" fill="none" stroke="rgba(251,191,36,0.7)" strokeWidth="1.5"/>
        <circle r="44" fill="rgba(251,191,36,0.05)" stroke="rgba(251,191,36,0.4)" strokeWidth="0.8" strokeDasharray="2 1"/>
        <circle r="40" fill="none" stroke="rgba(251,191,36,0.3)" strokeWidth="0.5"/>

        {/* Лучи вокруг — 16 штук */}
        {Array.from({ length: 16 }).map((_, i) => {
          const a = (i / 16) * Math.PI * 2
          const isLong = i % 2 === 0
          return <line key={i} x1={Math.cos(a) * 48} y1={Math.sin(a) * 48} x2={Math.cos(a) * (isLong ? 58 : 53)} y2={Math.sin(a) * (isLong ? 58 : 53)} stroke="rgba(251,191,36,0.6)" strokeWidth={isLong ? 1.2 : 0.6}/>
        })}

        {/* Звёзды на лучах */}
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * Math.PI * 2
          return <text key={i} x={Math.cos(a) * 60} y={Math.sin(a) * 60 + 2} fontSize="4" textAnchor="middle" fill="rgba(251,191,36,0.6)">✦</text>
        })}

        {/* Внутренний круг с пентаграммой */}
        <circle r="32" fill="rgba(26,15,46,0.4)" stroke="rgba(251,191,36,0.6)" strokeWidth="1"/>

        {/* 8-конечная звезда */}
        <path d="M 0 -28 L 6 -8 L 28 -10 L 10 4 L 22 22 L 0 10 L -22 22 L -10 4 L -28 -10 L -6 -8 Z" fill="rgba(251,191,36,0.5)" stroke="rgba(251,191,36,0.95)" strokeWidth="1.2"/>

        {/* Малая 4-конечная звезда в центре */}
        <path d="M 0 -16 L 3 -3 L 16 0 L 3 3 L 0 16 L -3 3 L -16 0 L -3 -3 Z" fill="rgba(251,191,36,0.7)" stroke="rgba(251,191,36,0.95)" strokeWidth="0.5"/>

        {/* Луна сверху */}
        <path d="M -10 -38 A 10 10 0 1 1 10 -38 A 7 7 0 1 0 -10 -38 Z" fill="rgba(196,181,253,0.8)"/>

        {/* Солнце снизу */}
        <circle cx="0" cy="38" r="6" fill="rgba(251,191,36,0.85)"/>
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * Math.PI * 2
          return <line key={i} x1={Math.cos(a) * 6} y1={38 + Math.sin(a) * 6} x2={Math.cos(a) * 10} y2={38 + Math.sin(a) * 10} stroke="rgba(251,191,36,0.8)" strokeWidth="1"/>
        })}

        {/* Глаз в центре */}
        <ellipse rx="9" ry="5" fill="rgba(255,255,255,0.25)" stroke="rgba(251,191,36,0.95)" strokeWidth="1"/>
        <circle r="2.5" fill="rgba(167,139,250,0.8)"/>
        <circle r="1" fill="rgba(251,191,36,0.95)"/>

        {/* Малые символы по сторонам */}
        <text x="-44" y="3" fontSize="6" textAnchor="middle" fill="rgba(251,191,36,0.6)">ᚠ</text>
        <text x="44" y="3" fontSize="6" textAnchor="middle" fill="rgba(251,191,36,0.6)">ᛉ</text>
      </g>

      {/* Декоративные символы по краям */}
      <text x="100" y="55" fontSize="16" textAnchor="middle" fill="rgba(251,191,36,0.7)">✦</text>
      <text x="100" y="285" fontSize="16" textAnchor="middle" fill="rgba(251,191,36,0.7)">✦</text>
      <text x="35" y="165" fontSize="13" textAnchor="middle" fill="rgba(251,191,36,0.5)">☾</text>
      <text x="165" y="165" fontSize="13" textAnchor="middle" fill="rgba(251,191,36,0.5)">☉</text>

      {/* Малые звёзды в полях */}
      <text x="50" y="80" fontSize="5" fill="rgba(251,191,36,0.5)">✦</text>
      <text x="150" y="80" fontSize="5" fill="rgba(251,191,36,0.5)">✦</text>
      <text x="50" y="245" fontSize="5" fill="rgba(251,191,36,0.5)">✦</text>
      <text x="150" y="245" fontSize="5" fill="rgba(251,191,36,0.5)">✦</text>
    </svg>
  )
}
