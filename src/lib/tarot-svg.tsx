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
    // 0. ШУТ — детализированная сказочная иллюстрация в стиле Васнецова
    "major-0": (
      <g>
        {/* ===== НЕБО — васнецовский закат ===== */}
        <path d="M 14 42 L 186 42 L 186 170 L 14 170 Z" fill="rgba(204,140,50,0.08)"/>
        <path d="M 14 42 L 186 42 L 186 120 L 14 120 Z" fill="rgba(218,165,32,0.06)"/>

        {/* ===== СОЛНЦЕ — большое, васнецовское, с лучами ===== */}
        <circle cx="150" cy="70" r="18" fill="rgba(255,180,40,0.15)"/>
        <circle cx="150" cy="70" r="12" fill="rgba(255,200,80,0.3)" stroke="#b8860b" strokeWidth="0.6"/>
        {/* Длинные лучи */}
        {Array.from({ length: 16 }).map((_, i) => {
          const a = (i / 16) * Math.PI * 2
          const isLong = i % 2 === 0
          const r1 = 13, r2 = isLong ? 26 : 20
          return <line key={i} x1={150 + Math.cos(a) * r1} y1={70 + Math.sin(a) * r1} x2={150 + Math.cos(a) * r2} y2={70 + Math.sin(a) * r2} stroke="#b8860b" strokeWidth={isLong ? 0.8 : 0.4} opacity="0.4"/>
        })}

        {/* ===== ГОРИЗОНТ — васнецовские горы ===== */}
        <path d="M 14 175 Q 40 155 60 165 Q 80 145 100 160 Q 120 150 140 165 Q 160 155 186 170 L 186 200 L 14 200 Z" fill="rgba(139,90,43,0.1)" stroke="#8b5a2b" strokeWidth="0.4"/>
        {/* Дальние горы — силуэты */}
        <path d="M 20 180 L 45 145 L 70 180 Z" fill="rgba(100,70,40,0.12)" stroke="#6b4520" strokeWidth="0.3"/>
        <path d="M 60 180 L 95 135 L 130 180 Z" fill="rgba(100,70,40,0.15)" stroke="#6b4520" strokeWidth="0.3"/>
        <path d="M 110 180 L 145 140 L 180 180 Z" fill="rgba(100,70,40,0.1)" stroke="#6b4520" strokeWidth="0.3"/>

        {/* ===== УТЁС — детализированный, с трещинами ===== */}
        <path d="M 50 205 L 55 195 L 65 188 L 75 185 L 85 190 L 95 188 L 105 192 L 115 190 L 125 195 L 135 200 L 145 205 L 145 255 L 50 255 Z" fill="rgba(74,53,36,0.6)" stroke="#5a3a20" strokeWidth="0.6"/>
        {/* Трещины в утёсе */}
        <path d="M 70 200 L 72 215 L 68 230" fill="none" stroke="#4a3525" strokeWidth="0.4"/>
        <path d="M 100 195 L 103 210 L 98 225 L 102 240" fill="none" stroke="#4a3525" strokeWidth="0.4"/>
        <path d="M 120 200 L 118 220 L 122 235" fill="none" stroke="#4a3525" strokeWidth="0.4"/>
        {/* Травинка на утёсе */}
        <path d="M 80 190 L 79 183 L 81 180" fill="none" stroke="#2d6e2d" strokeWidth="0.5"/>

        {/* ===== ТРАВА — изумрудная, васнецовская ===== */}
        <path d="M 14 230 Q 35 225 50 230 Q 65 225 80 230 L 80 255 L 14 255 Z" fill="rgba(34,100,40,0.15)"/>
        <path d="M 120 235 Q 140 230 160 235 Q 175 230 186 235 L 186 255 L 120 255 Z" fill="rgba(34,100,40,0.15)"/>
        {/* Травинки */}
        {[[20,230],[28,228],[36,230],[44,229],[130,234],[138,232],[146,234],[154,233],[162,234],[170,233]].map(([x,y], i) => (
          <path key={i} d={`M ${x} ${y} L ${x-1} ${y-4} M ${x+1} ${y} L ${x+2} ${y-5}`} fill="none" stroke="#2d6e2d" strokeWidth="0.3" opacity="0.4"/>
        ))}

        {/* ===== ФИГУРА ШУТА — детализированная ===== */}
        <g className="svg-breathe" style={{ transformOrigin: "100px 180px" }}>

          {/* === НОГИ — в сафьяновых сапогах === */}
          {/* Левая нога */}
          <path d="M 92 215 L 90 235 L 87 245 L 84 248 L 89 250 L 94 248 L 93 240 L 95 225 Z" fill="rgba(80,30,20,0.5)" stroke="#5a2010" strokeWidth="0.4"/>
          {/* Орнамент на сапоге */}
          <path d="M 86 242 Q 89 240 92 242" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.4"/>
          {/* Правая нога */}
          <path d="M 108 215 L 110 235 L 113 242 L 116 245 L 111 248 L 106 246 L 107 238 L 105 225 Z" fill="rgba(80,30,20,0.5)" stroke="#5a2010" strokeWidth="0.4"/>
          <path d="M 108 240 Q 111 238 114 240" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.4"/>

          {/* === ТЕЛО — охровый кафтан с бордовой отделкой === */}
          {/* Основная часть кафтана — сложный path */}
          <path d="M 85 220 Q 83 200 84 175 Q 85 155 88 135 Q 89 128 92 125 L 108 125 Q 111 128 112 135 Q 115 155 116 175 Q 117 200 115 220 L 110 225 L 90 225 Z"
            fill="rgba(184,134,11,0.35)" stroke="#8b5a2b" strokeWidth="0.6"/>
          {/* Бордовая отделка — воротник */}
          <path d="M 88 128 Q 92 126 100 127 Q 108 126 112 128 L 112 133 Q 108 131 100 132 Q 92 131 88 133 Z"
            fill="rgba(120,20,20,0.5)" stroke="#8b1a1a" strokeWidth="0.3"/>
          {/* Бордовая отделка — подол */}
          <path d="M 85 215 Q 100 218 115 215 L 115 225 Q 100 228 85 225 Z"
            fill="rgba(120,20,20,0.5)" stroke="#8b1a1a" strokeWidth="0.3"/>
          {/* Золотые пуговицы */}
          <circle cx="100" cy="140" r="1.2" fill="#ffd700" stroke="#b8860b" strokeWidth="0.2"/>
          <circle cx="100" cy="155" r="1.2" fill="#ffd700" stroke="#b8860b" strokeWidth="0.2"/>
          <circle cx="100" cy="170" r="1.2" fill="#ffd700" stroke="#b8860b" strokeWidth="0.2"/>
          <circle cx="100" cy="185" r="1.2" fill="#ffd700" stroke="#b8860b" strokeWidth="0.2"/>
          <circle cx="100" cy="200" r="1.2" fill="#ffd700" stroke="#b8860b" strokeWidth="0.2"/>

          {/* Васнецовский растительный узор на кафтане — сложные кривые */}
          <path d="M 93 145 Q 96 142 100 144 Q 104 142 107 145 Q 104 148 100 146 Q 96 148 93 145"
            fill="none" stroke="#ffd700" strokeWidth="0.4" opacity="0.5"/>
          <path d="M 93 160 Q 96 157 100 159 Q 104 157 107 160 Q 104 163 100 161 Q 96 163 93 160"
            fill="none" stroke="#ffd700" strokeWidth="0.4" opacity="0.5"/>
          <path d="M 93 175 Q 96 172 100 174 Q 104 172 107 175 Q 104 178 100 176 Q 96 178 93 175"
            fill="none" stroke="#ffd700" strokeWidth="0.4" opacity="0.5"/>
          {/* Центральный медальон-розетка */}
          <circle cx="100" cy="165" r="3" fill="none" stroke="#ffd700" strokeWidth="0.4" opacity="0.4"/>
          <path d="M 97 165 Q 100 161 103 165 Q 100 169 97 165" fill="rgba(180,30,30,0.3)" stroke="#ffd700" strokeWidth="0.3"/>

          {/* === РУКИ === */}
          {/* Левая рука — держит посох */}
          <path d="M 84 145 Q 78 155 76 170 Q 75 180 78 185" fill="none" stroke="rgba(232,200,160,0.8)" strokeWidth="3" strokeLinecap="round"/>
          {/* Рукав с золотым узором */}
          <path d="M 84 140 Q 80 150 78 165 Q 76 175 78 180" fill="none" stroke="rgba(184,134,11,0.3)" strokeWidth="5" strokeLinecap="round"/>
          {/* Правая рука */}
          <path d="M 116 145 Q 120 160 118 175" fill="none" stroke="rgba(232,200,160,0.8)" strokeWidth="3" strokeLinecap="round"/>

          {/* === ШЕЯ === */}
          <path d="M 96 122 L 96 128 L 104 128 L 104 122" fill="rgba(232,200,160,0.8)" stroke="#8b5a2b" strokeWidth="0.3"/>

          {/* === ГОЛОВА — детализированное лицо === */}
          {/* Лицевой овал */}
          <path d="M 92 108 Q 91 100 94 95 Q 97 91 100 90 Q 103 91 106 95 Q 109 100 108 108 Q 108 114 106 117 Q 103 120 100 120 Q 97 120 94 117 Q 92 114 92 108 Z"
            fill="rgba(232,200,160,0.85)" stroke="#8b5a2b" strokeWidth="0.4"/>
          {/* Русые кудри — сложные */}
          <path d="M 91 100 Q 88 96 90 92 Q 93 89 96 91 Q 98 88 101 89 Q 104 87 107 90 Q 110 88 112 93 Q 113 97 110 100 Q 108 98 106 99 Q 104 97 102 98 Q 100 96 98 98 Q 96 97 94 99 Q 92 98 91 100 Z"
            fill="rgba(139,90,43,0.5)" stroke="#8b5a2b" strokeWidth="0.3"/>
          {/* Глаза */}
          <ellipse cx="96" cy="106" rx="1.8" ry="1.2" fill="rgba(255,255,255,0.6)" stroke="#5a3a20" strokeWidth="0.2"/>
          <ellipse cx="104" cy="106" rx="1.8" ry="1.2" fill="rgba(255,255,255,0.6)" stroke="#5a3a20" strokeWidth="0.2"/>
          <circle cx="96.5" cy="106" r="0.8" fill="rgba(60,40,30,0.7)"/>
          <circle cx="104.5" cy="106" r="0.8" fill="rgba(60,40,30,0.7)"/>
          {/* Брови */}
          <path d="M 94 103 Q 96 102 98 103" fill="none" stroke="#5a3a20" strokeWidth="0.4"/>
          <path d="M 102 103 Q 104 102 106 103" fill="none" stroke="#5a3a20" strokeWidth="0.4"/>
          {/* Нос */}
          <path d="M 100 108 L 99 112 L 101 112" fill="none" stroke="#8b5a2b" strokeWidth="0.3"/>
          {/* Улыбка */}
          <path d="M 96 114 Q 100 117 104 114" fill="none" stroke="#8b1a1a" strokeWidth="0.4"/>
          {/* Румянец */}
          <circle cx="93" cy="111" r="1.5" fill="rgba(200,80,60,0.15)"/>
          <circle cx="107" cy="111" r="1.5" fill="rgba(200,80,60,0.15)"/>

          {/* === КОЛПАК — красный, скомороший, с бубенцом === */}
          <path d="M 91 100 Q 88 92 92 85 Q 96 80 100 78 Q 104 80 108 85 Q 112 92 109 100 Q 106 98 100 99 Q 94 98 91 100 Z"
            fill="rgba(153,27,27,0.7)" stroke="#8b1a1a" strokeWidth="0.5"/>
          {/* Золотой растительный узор на колпаке */}
          <path d="M 94 92 Q 96 89 98 91 Q 100 88 102 91 Q 104 89 106 92"
            fill="none" stroke="#ffd700" strokeWidth="0.4" opacity="0.5"/>
          <path d="M 95 88 Q 97 86 99 87 Q 101 86 103 88"
            fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.4"/>
          {/* Бубенец на кончике */}
          <circle cx="100" cy="76" r="2.5" fill="#ffd700" stroke="#b8860b" strokeWidth="0.4"/>
          <path d="M 100 73 L 100 71" stroke="#b8860b" strokeWidth="0.3"/>
          <path d="M 98 76 L 102 76" stroke="#b8860b" strokeWidth="0.3"/>
        </g>

        {/* ===== ПОСОХ — берестяной, с узелком ===== */}
        <path d="M 78 225 Q 82 200 88 175 Q 95 150 105 125 Q 115 110 122 105" fill="none" stroke="#6b4520" strokeWidth="2.2" strokeLinecap="round"/>
        {/* Узелок на конце посоха — бордовый с золотым шнурком */}
        <path d="M 120 103 Q 118 98 122 95 Q 128 93 130 97 Q 132 102 128 106 Q 123 108 120 103 Z"
          fill="rgba(120,20,20,0.5)" stroke="#8b1a1a" strokeWidth="0.4"/>
        {/* Золотой шнурок */}
        <path d="M 118 100 Q 120 97 122 100 Q 124 103 122 105" fill="none" stroke="#ffd700" strokeWidth="0.5"/>

        {/* ===== СОБАЧКА — детализированная, рыжая ===== */}
        <g className="svg-drift" style={{ transformOrigin: "75px 238px" }}>
          {/* Тело */}
          <path d="M 68 238 Q 66 234 70 232 Q 78 230 84 233 Q 86 236 84 240 Q 80 242 72 242 Q 68 241 68 238 Z"
            fill="rgba(184,134,11,0.5)" stroke="#8b5a2b" strokeWidth="0.4"/>
          {/* Голова */}
          <path d="M 66 235 Q 63 233 62 230 Q 63 227 66 228 Q 68 230 68 233 Z"
            fill="rgba(184,134,11,0.6)" stroke="#8b5a2b" strokeWidth="0.4"/>
          {/* Уши — висячие */}
          <path d="M 64 230 Q 61 229 60 233 Q 61 235 64 234" fill="rgba(139,90,43,0.4)" stroke="#8b5a2b" strokeWidth="0.3"/>
          {/* Глаз */}
          <circle cx="65" cy="230" r="0.7" fill="rgba(60,40,30,0.7)"/>
          {/* Нос */}
          <circle cx="62" cy="229" r="0.6" fill="rgba(60,40,30,0.6)"/>
          {/* Хвост — задранный */}
          <path d="M 84 235 Q 88 230 86 225" fill="none" stroke="#8b5a2b" strokeWidth="0.6"/>
          {/* Лапы */}
          <line x1="71" y1="241" x2="71" y2="245" stroke="#8b5a2b" strokeWidth="0.8"/>
          <line x1="80" y1="241" x2="80" y2="245" stroke="#8b5a2b" strokeWidth="0.8"/>
        </g>

        {/* ===== РОЗЫ — алые, детализированные ===== */}
        {/* Большая роза */}
        <g>
          <circle cx="128" cy="243" r="4" fill="rgba(160,20,20,0.6)" stroke="#8b1a1a" strokeWidth="0.3"/>
          <path d="M 125 241 Q 128 239 131 241 Q 130 244 128 243 Q 126 244 125 241" fill="rgba(200,40,40,0.4)" stroke="#8b1a1a" strokeWidth="0.2"/>
          <circle cx="128" cy="242" r="1" fill="rgba(255,200,200,0.3)"/>
        </g>
        {/* Маленькая роза */}
        <circle cx="134" cy="247" r="2.5" fill="rgba(160,20,20,0.5)" stroke="#8b1a1a" strokeWidth="0.3"/>
        <circle cx="134" cy="247" r="1" fill="rgba(200,40,40,0.3)"/>
        {/* Стебли */}
        <path d="M 128 247 Q 126 252 123 254" fill="none" stroke="#2d6e2d" strokeWidth="0.5"/>
        <path d="M 134 249 Q 136 253 138 252" fill="none" stroke="#2d6e2d" strokeWidth="0.5"/>
        {/* Листья */}
        <path d="M 125 250 Q 122 249 121 252 Q 124 253 125 250" fill="rgba(34,100,40,0.2)" stroke="#2d6e2d" strokeWidth="0.3"/>
        <path d="M 136 251 Q 139 250 140 253 Q 137 254 136 251" fill="rgba(34,100,40,0.2)" stroke="#2d6e2d" strokeWidth="0.3"/>

        {/* ===== МАЛЕНЬКАЯ ПТИЦА НА ТРАВЕ ===== */}
        <path d="M 150 240 Q 153 237 156 239 Q 155 242 152 242" fill="rgba(139,90,43,0.3)" stroke="#8b5a2b" strokeWidth="0.2"/>
        <circle cx="156" cy="239" r="0.5" fill="rgba(60,40,30,0.5)"/>
      </g>
    ),

    // I. МАГ — детализированный волхв в стиле Васнецова
    "major-1": (
      <g>
        {/* ===== ХРАМОВЫЙ ФОН — арочный проём ===== */}
        <path d="M 28 250 L 28 80 Q 28 52 55 50 L 145 50 Q 172 52 172 80 L 172 250 Z" fill="rgba(30,20,50,0.1)" stroke="#b8860b" strokeWidth="0.4" opacity="0.4"/>
        {/* Лемниската — золотая, над головой */}
        <path d="M 88 78 Q 93 71 100 78 Q 107 71 112 78 Q 107 85 100 78 Q 93 85 88 78 Z" fill="#ffd700" stroke="#fef3c7" strokeWidth="0.4" opacity="0.8"/>
        {/* Лучи сияния */}
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * Math.PI - Math.PI
          return <line key={i} x1={100} y1={68} x2={100 + Math.cos(a) * 12} y2={68 + Math.sin(a) * 12} stroke="#b8860b" strokeWidth="0.5" opacity="0.4"/>
        })}

        {/* ===== ФИГУРА ВОЛХВА ===== */}
        <g className="svg-breathe" style={{ transformOrigin: "100px 170px" }}>

          {/* === НОГИ === */}
          <path d="M 92 220 L 90 245 L 87 250 L 93 252 L 96 248 L 95 230 Z" fill="rgba(30,30,80,0.4)" stroke="#1a1a50" strokeWidth="0.3"/>
          <path d="M 108 220 L 110 245 L 113 250 L 107 252 L 104 248 L 105 230 Z" fill="rgba(30,30,80,0.4)" stroke="#1a1a50" strokeWidth="0.3"/>

          {/* === МАНТИЯ — индиго, сложный path === */}
          <path d="M 82 230 Q 80 210 82 185 Q 83 160 85 140 Q 86 130 88 125 L 112 125 Q 114 130 115 140 Q 117 160 118 185 Q 120 210 118 230 L 112 235 L 88 235 Z"
            fill="rgba(30,30,80,0.5)" stroke="#1a1a50" strokeWidth="0.5"/>

          {/* Золотая кайма — воротник */}
          <path d="M 86 128 Q 92 125 100 126 Q 108 125 114 128 L 114 134 Q 108 131 100 132 Q 92 131 86 134 Z"
            fill="rgba(255,215,0,0.25)" stroke="#b8860b" strokeWidth="0.3"/>
          {/* Золотая кайма — подол */}
          <path d="M 82 222 Q 100 226 118 222 L 118 232 Q 100 236 82 232 Z"
            fill="rgba(255,215,0,0.2)" stroke="#b8860b" strokeWidth="0.3"/>

          {/* Васнецовские растительные узоры на мантии */}
          <path d="M 90 145 Q 95 141 100 143 Q 105 141 110 145 Q 105 149 100 147 Q 95 149 90 145" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.4"/>
          <path d="M 90 165 Q 95 161 100 163 Q 105 161 110 165 Q 105 169 100 167 Q 95 169 90 165" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.4"/>
          <path d="M 90 185 Q 95 181 100 183 Q 105 181 110 185 Q 105 189 100 187 Q 95 189 90 185" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.4"/>
          <path d="M 90 205 Q 95 201 100 203 Q 105 201 110 205 Q 105 209 100 207 Q 95 209 90 205" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.4"/>
          {/* Медальоны между узорами */}
          <circle cx="100" cy="155" r="1.5" fill="rgba(255,215,0,0.3)" stroke="#b8860b" strokeWidth="0.2"/>
          <circle cx="100" cy="175" r="1.5" fill="rgba(255,215,0,0.3)" stroke="#b8860b" strokeWidth="0.2"/>
          <circle cx="100" cy="195" r="1.5" fill="rgba(255,215,0,0.3)" stroke="#b8860b" strokeWidth="0.2"/>

          {/* === РУКИ === */}
          {/* Левая — держит жезл вверх */}
          <path d="M 86 138 Q 78 120 70 95 Q 68 85 68 78" fill="none" stroke="rgba(232,200,160,0.85)" strokeWidth="3" strokeLinecap="round"/>
          {/* Правая — к алтарю */}
          <path d="M 114 138 Q 122 150 128 165" fill="none" stroke="rgba(232,200,160,0.85)" strokeWidth="3" strokeLinecap="round"/>

          {/* === ШЕЯ === */}
          <path d="M 96 120 L 96 126 L 104 126 L 104 120" fill="rgba(232,200,160,0.85)" stroke="#8b5a2b" strokeWidth="0.3"/>

          {/* === ГОЛОВА — мудрый старец === */}
          <path d="M 93 105 Q 91 97 94 92 Q 97 88 100 87 Q 103 88 106 92 Q 109 97 107 105 Q 107 112 105 115 Q 103 118 100 118 Q 97 118 95 115 Q 93 112 93 105 Z"
            fill="rgba(232,200,160,0.85)" stroke="#8b5a2b" strokeWidth="0.4"/>
          {/* Седая борода — длинная, клином */}
          <path d="M 94 110 Q 91 120 93 130 Q 95 138 100 140 Q 105 138 107 130 Q 109 120 106 110 Q 104 112 100 112 Q 96 112 94 110 Z"
            fill="rgba(220,220,230,0.5)" stroke="#8b5a2b" strokeWidth="0.3"/>
          {/* Усы */}
          <path d="M 95 109 Q 98 107 100 108 Q 102 107 105 109" fill="none" stroke="rgba(200,200,210,0.4)" strokeWidth="0.8"/>
          {/* Глаза — мудрые, прищуренные */}
          <path d="M 94 101 Q 96 100 98 101" fill="none" stroke="#5a3a20" strokeWidth="0.5"/>
          <path d="M 102 101 Q 104 100 106 101" fill="none" stroke="#5a3a20" strokeWidth="0.5"/>
          <circle cx="96" cy="101" r="0.6" fill="rgba(60,40,30,0.7)"/>
          <circle cx="104" cy="101" r="0.6" fill="rgba(60,40,30,0.7)"/>
          {/* Брови — седые, густые */}
          <path d="M 93 98 Q 96 96 99 98" fill="none" stroke="rgba(200,200,210,0.5)" strokeWidth="0.8"/>
          <path d="M 101 98 Q 104 96 107 98" fill="none" stroke="rgba(200,200,210,0.5)" strokeWidth="0.8"/>
          {/* Нос */}
          <path d="M 100 103 L 99 108 L 101 108" fill="none" stroke="#8b5a2b" strokeWidth="0.3"/>
          {/* Морщины на лбу */}
          <path d="M 95 94 Q 100 93 105 94" fill="none" stroke="#8b5a2b" strokeWidth="0.2" opacity="0.3"/>
          <path d="M 96 91 Q 100 90 104 91" fill="none" stroke="#8b5a2b" strokeWidth="0.2" opacity="0.3"/>

          {/* Седые волосы */}
          <path d="M 92 96 Q 89 92 91 88 Q 94 86 96 89 Q 100 86 104 89 Q 106 86 109 88 Q 111 92 108 96" fill="rgba(200,200,210,0.3)" stroke="#8b5a2b" strokeWidth="0.3"/>
        </g>

        {/* ===== ЖЕЗЛ — берестяный, с золотым навершием ===== */}
        <path d="M 68 220 Q 68 180 68 140 Q 68 100 68 75" fill="none" stroke="#6b4520" strokeWidth="2.2" strokeLinecap="round"/>
        {/* Золотое навершие — шар с лучами */}
        <circle cx="68" cy="68" r="6" fill="rgba(255,215,0,0.25)" stroke="#b8860b" strokeWidth="0.6"/>
        <circle cx="68" cy="68" r="3.5" fill="rgba(255,200,80,0.4)"/>
        {/* Блик на шаре */}
        <ellipse cx="66" cy="66" rx="1.5" ry="1" fill="rgba(255,255,230,0.4)"/>

        {/* ===== АЛТАРЬ — деревянный, резной ===== */}
        <path d="M 120 178 L 178 178 L 176 184 L 122 184 Z" fill="rgba(74,53,36,0.7)" stroke="#5a3a20" strokeWidth="0.5"/>
        {/* Ножки стола */}
        <path d="M 124 184 L 122 215 L 126 215 L 128 184 Z" fill="rgba(74,53,36,0.6)" stroke="#5a3a20" strokeWidth="0.4"/>
        <path d="M 172 184 L 170 215 L 174 215 L 176 184 Z" fill="rgba(74,53,36,0.6)" stroke="#5a3a20" strokeWidth="0.4"/>
        {/* Резной узор на столешнице */}
        <path d="M 130 181 Q 140 179 150 181 Q 160 179 170 181" fill="none" stroke="#ffd700" strokeWidth="0.2" opacity="0.3"/>

        {/* ===== ЧАША — медная, детализированная ===== */}
        <path d="M 134 165 L 136 178 L 148 178 L 150 165 Z" fill="rgba(184,115,51,0.5)" stroke="#b8860b" strokeWidth="0.5"/>
        <ellipse cx="142" cy="165" rx="6" ry="1.8" fill="rgba(100,150,200,0.3)" stroke="#b8860b" strokeWidth="0.3"/>
        {/* Блик на чаше */}
        <path d="M 137 168 Q 138 173 138 176" fill="none" stroke="rgba(255,230,180,0.3)" strokeWidth="0.4"/>
        {/* Узел на ножке */}
        <circle cx="142" cy="165" r="0.8" fill="#b8860b"/>

        {/* ===== МЕЧ — стальной, с золотой рукоятью ===== */}
        {/* Лезвие */}
        <path d="M 159 158 L 161 158 L 161 178 L 159 178 Z" fill="rgba(180,180,190,0.5)" stroke="#8b8b8b" strokeWidth="0.3"/>
        {/* Блик на лезвии */}
        <line x1="160" y1="160" x2="160" y2="176" stroke="rgba(220,220,230,0.4)" strokeWidth="0.3"/>
        {/* Гарда */}
        <path d="M 155 158 L 165 158 L 165 160 L 155 160 Z" fill="#ffd700" stroke="#b8860b" strokeWidth="0.3"/>
        {/* Рукоять */}
        <rect x="158.5" y="155" width="3" height="4" fill="#8b5a2b" stroke="#5a3a20" strokeWidth="0.2"/>
        {/* Навершие */}
        <circle cx="160" cy="154" r="1.5" fill="#ffd700" stroke="#b8860b" strokeWidth="0.3"/>

        {/* ===== ПЕНТАКЛЬ — золотая монета ===== */}
        <circle cx="170" cy="173" r="4.5" fill="rgba(255,215,0,0.2)" stroke="#ffd700" strokeWidth="0.6"/>
        {/* Пентаграмма */}
        <path d="M 170 169 L 171.2 172 L 174 172 L 171.8 173.5 L 172.5 176.5 L 170 174.5 L 167.5 176.5 L 168.2 173.5 L 166 172 L 168.8 172 Z"
          fill="rgba(255,215,0,0.4)" stroke="#b8860b" strokeWidth="0.2"/>
        {/* Блик */}
        <ellipse cx="168" cy="171" rx="1" ry="0.6" fill="rgba(255,255,230,0.3)"/>

        {/* ===== РАСТЕНИЯ У НОГ — васнецовские травы ===== */}
        <path d="M 28 245 L 31 235 L 29 228 L 34 222 L 32 215" fill="none" stroke="#2d6e2d" strokeWidth="0.6"/>
        <circle cx="31" cy="235" r="1.5" fill="rgba(160,20,20,0.5)"/>
        <circle cx="34" cy="222" r="1.5" fill="#ffd700" opacity="0.4"/>
        {/* Листья */}
        <path d="M 30 232 Q 27 230 26 233 Q 29 234 30 232" fill="rgba(34,100,40,0.15)" stroke="#2d6e2d" strokeWidth="0.3"/>
        <path d="M 33 225 Q 36 223 37 226 Q 34 227 33 225" fill="rgba(34,100,40,0.15)" stroke="#2d6e2d" strokeWidth="0.3"/>
        {/* Правые растения */}
        <path d="M 168 245 L 170 235 L 168 228 L 172 222" fill="none" stroke="#2d6e2d" strokeWidth="0.6"/>
        <circle cx="170" cy="235" r="1.5" fill="rgba(160,20,20,0.5)"/>
        <path d="M 169 232 Q 172 230 173 233 Q 170 234 169 232" fill="rgba(34,100,40,0.15)" stroke="#2d6e2d" strokeWidth="0.3"/>
      </g>
    ),

    // II. ЖРИЦА — детализированная ведунья в стиле Васнецова
    "major-2": (
      <g>
        {/* ===== ЛЕВАЯ КОЛОННА — тёмное дерево, резное ===== */}
        <path d="M 26 250 L 26 58 L 30 54 L 46 54 L 50 58 L 50 250 Z" fill="rgba(60,40,25,0.6)" stroke="#5a3a20" strokeWidth="0.5"/>
        {/* Капитель */}
        <path d="M 22 58 L 54 58 L 52 50 L 24 50 Z" fill="rgba(74,53,36,0.7)" stroke="#5a3a20" strokeWidth="0.4"/>
        {/* База */}
        <path d="M 22 250 L 54 250 L 52 258 L 24 258 Z" fill="rgba(74,53,36,0.7)" stroke="#5a3a20" strokeWidth="0.4"/>
        {/* Резной узор — 3 уровня */}
        <path d="M 30 90 Q 38 85 46 90 Q 38 95 30 90" fill="none" stroke="#b8860b" strokeWidth="0.4" opacity="0.4"/>
        <path d="M 30 130 Q 38 125 46 130 Q 38 135 30 130" fill="none" stroke="#b8860b" strokeWidth="0.4" opacity="0.4"/>
        <path d="M 30 170 Q 38 165 46 170 Q 38 175 30 170" fill="none" stroke="#b8860b" strokeWidth="0.4" opacity="0.4"/>
        <path d="M 30 210 Q 38 205 46 210 Q 38 215 30 210" fill="none" stroke="#b8860b" strokeWidth="0.4" opacity="0.4"/>

        {/* ===== ПРАВАЯ КОЛОННА — светлое дерево ===== */}
        <path d="M 150 250 L 150 58 L 154 54 L 170 54 L 174 58 L 174 250 Z" fill="rgba(139,90,43,0.35)" stroke="#8b5a2b" strokeWidth="0.5"/>
        <path d="M 146 58 L 178 58 L 176 50 L 148 50 Z" fill="rgba(184,134,11,0.5)" stroke="#b8860b" strokeWidth="0.4"/>
        <path d="M 146 250 L 178 250 L 176 258 L 148 258 Z" fill="rgba(184,134,11,0.5)" stroke="#b8860b" strokeWidth="0.4"/>
        <path d="M 154 90 Q 162 85 170 90 Q 162 95 154 90" fill="none" stroke="#ffd700" strokeWidth="0.4" opacity="0.4"/>
        <path d="M 154 130 Q 162 125 170 130 Q 162 135 154 130" fill="none" stroke="#ffd700" strokeWidth="0.4" opacity="0.4"/>
        <path d="M 154 170 Q 162 165 170 170 Q 162 175 154 170" fill="none" stroke="#ffd700" strokeWidth="0.4" opacity="0.4"/>
        <path d="M 154 210 Q 162 205 170 210 Q 162 215 154 210" fill="none" stroke="#ffd700" strokeWidth="0.4" opacity="0.4"/>

        {/* ===== ЗАВЕСА между колоннами ===== */}
        <path d="M 50 58 Q 100 65 150 58 L 150 250 Q 100 245 50 250 Z" fill="rgba(30,30,80,0.12)" stroke="#b8860b" strokeWidth="0.4" opacity="0.4"/>
        {/* Растительный узор на завесе */}
        <path d="M 60 90 Q 70 85 80 90 Q 90 85 100 90 Q 110 85 120 90 Q 130 85 140 90" fill="none" stroke="#ffd700" strokeWidth="0.2" opacity="0.3"/>
        <path d="M 60 150 Q 70 145 80 150 Q 90 145 100 150 Q 110 145 120 150 Q 130 145 140 150" fill="none" stroke="#ffd700" strokeWidth="0.2" opacity="0.3"/>
        <path d="M 60 210 Q 70 205 80 210 Q 90 205 100 210 Q 110 205 120 210 Q 130 205 140 210" fill="none" stroke="#ffd700" strokeWidth="0.2" opacity="0.3"/>
        {/* Гранаты на завесе */}
        <circle cx="70" cy="110" r="2.5" fill="rgba(120,20,20,0.4)" stroke="#8b1a1a" strokeWidth="0.2"/>
        <path d="M 68 108 Q 70 106 72 108" fill="none" stroke="#2d6e2d" strokeWidth="0.3"/>
        <circle cx="130" cy="110" r="2.5" fill="rgba(120,20,20,0.4)" stroke="#8b1a1a" strokeWidth="0.2"/>
        <path d="M 128 108 Q 130 106 132 108" fill="none" stroke="#2d6e2d" strokeWidth="0.3"/>
        <circle cx="100" cy="180" r="2.5" fill="rgba(120,20,20,0.4)" stroke="#8b1a1a" strokeWidth="0.2"/>

        {/* ===== ФИГУРА ЖРИЦЫ ===== */}
        <g className="svg-breathe" style={{ transformOrigin: "100px 160px" }}>
          {/* Ноги — скрыты под мантией */}
          <path d="M 92 235 L 90 248 L 96 250 L 100 248 L 104 250 L 110 248 L 108 235 Z" fill="rgba(30,30,80,0.3)" stroke="#1a1a50" strokeWidth="0.3"/>

          {/* Мантия — тёмно-синяя, сложный path */}
          <path d="M 80 235 Q 78 215 80 190 Q 81 165 84 145 Q 85 130 88 120 L 112 120 Q 115 130 116 145 Q 119 165 120 190 Q 122 215 120 235 L 112 240 L 88 240 Z"
            fill="rgba(30,30,80,0.5)" stroke="#1a1a50" strokeWidth="0.4"/>

          {/* Золотой растительный узор */}
          <path d="M 88 140 Q 93 136 100 138 Q 107 136 112 140 Q 107 144 100 142 Q 93 144 88 140" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.4"/>
          <path d="M 88 170 Q 93 166 100 168 Q 107 166 112 170 Q 107 174 100 172 Q 93 174 88 170" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.4"/>
          <path d="M 88 200 Q 93 196 100 198 Q 107 196 112 200 Q 107 204 100 202 Q 93 204 88 200" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.4"/>

          {/* Руки — сложенные */}
          <path d="M 84 145 Q 80 155 82 170" fill="none" stroke="rgba(232,200,160,0.8)" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M 116 145 Q 120 155 118 170" fill="none" stroke="rgba(232,200,160,0.8)" strokeWidth="2.5" strokeLinecap="round"/>

          {/* Шея */}
          <path d="M 96 115 L 96 122 L 104 122 L 104 115" fill="rgba(232,200,160,0.85)" stroke="#8b5a2b" strokeWidth="0.3"/>

          {/* Голова — детализированная */}
          <path d="M 93 103 Q 91 95 94 90 Q 97 86 100 85 Q 103 86 106 90 Q 109 95 107 103 Q 107 110 105 113 Q 103 116 100 116 Q 97 116 95 113 Q 93 110 93 103 Z"
            fill="rgba(232,200,160,0.85)" stroke="#8b5a2b" strokeWidth="0.4"/>
          {/* Тёмные волосы — длинные, струящиеся */}
          <path d="M 91 100 Q 88 96 90 92 Q 93 89 96 91 Q 100 88 104 91 Q 107 89 110 92 Q 112 96 109 100" fill="rgba(50,30,20,0.5)" stroke="#3a2010" strokeWidth="0.3"/>
          <path d="M 91 105 Q 86 120 84 140" fill="none" stroke="rgba(50,30,20,0.4)" strokeWidth="2"/>
          <path d="M 109 105 Q 114 120 116 140" fill="none" stroke="rgba(50,30,20,0.4)" strokeWidth="2"/>
          {/* Глаза — полузакрытые, загадочные */}
          <path d="M 94 100 Q 96 99 98 100" fill="none" stroke="#5a3a20" strokeWidth="0.4"/>
          <path d="M 102 100 Q 104 99 106 100" fill="none" stroke="#5a3a20" strokeWidth="0.4"/>
          <circle cx="96" cy="100" r="0.6" fill="rgba(60,40,30,0.7)"/>
          <circle cx="104" cy="100" r="0.6" fill="rgba(60,40,30,0.7)"/>
          {/* Брови */}
          <path d="M 93 97 Q 96 96 99 97" fill="none" stroke="#3a2010" strokeWidth="0.4"/>
          <path d="M 101 97 Q 104 96 107 97" fill="none" stroke="#3a2010" strokeWidth="0.4"/>
          {/* Нос */}
          <path d="M 100 102 L 99 107 L 101 107" fill="none" stroke="#8b5a2b" strokeWidth="0.3"/>
          {/* Рот — спокойный, сомкнутый */}
          <path d="M 97 111 Q 100 112 103 111" fill="none" stroke="#8b1a1a" strokeWidth="0.3"/>

          {/* Корона-полумесяц */}
          <path d="M 91 92 Q 100 84 109 92" fill="none" stroke="#ffd700" strokeWidth="1.2"/>
          <circle cx="100" cy="87" r="2" fill="rgba(196,181,253,0.5)" stroke="#ffd700" strokeWidth="0.3"/>
          {/* Крест на груди */}
          <line x1="100" y1="125" x2="100" y2="142" stroke="#ffd700" strokeWidth="0.8"/>
          <line x1="96" y1="132" x2="104" y2="132" stroke="#ffd700" strokeWidth="0.8"/>
        </g>

        {/* Свиток на коленях */}
        <path d="M 86 215 L 114 215 L 114 225 L 86 225 Z" fill="rgba(184,134,11,0.35)" stroke="#b8860b" strokeWidth="0.4" rx="2"/>
        <line x1="90" y1="220" x2="110" y2="220" stroke="#8b5a2b" strokeWidth="0.2" opacity="0.3"/>
      </g>
    ),

    // III. ИМПЕРАТРИЦА — детализированная царица в стиле Васнецова
    "major-3": (
      <g>
        {/* ===== ЛЕСНОЙ ПЕЙЗАЖ ===== */}
        <rect x="14" y="42" width="172" height="200" fill="rgba(34,80,34,0.05)" rx="2"/>
        {/* Деревья */}
        <path d="M 20 250 L 20 90 L 24 80 L 28 90 L 28 250 Z" fill="rgba(34,80,34,0.1)" stroke="#2d6e2d" strokeWidth="0.3"/>
        <path d="M 172 250 L 172 85 L 176 75 L 180 85 L 180 250 Z" fill="rgba(34,80,34,0.1)" stroke="#2d6e2d" strokeWidth="0.3"/>
        {/* Кроны */}
        <ellipse cx="24" cy="85" rx="12" ry="10" fill="rgba(34,100,40,0.08)" stroke="#2d6e2d" strokeWidth="0.3"/>
        <ellipse cx="176" cy="80" rx="12" ry="10" fill="rgba(34,100,40,0.08)" stroke="#2d6e2d" strokeWidth="0.3"/>

        {/* Пшеничное поле */}
        <path d="M 14 225 Q 50 220 100 225 Q 150 220 186 225 L 186 255 L 14 255 Z" fill="rgba(184,134,11,0.15)" stroke="#b8860b" strokeWidth="0.3"/>
        {/* Колосья */}
        {Array.from({length: 10}).map((_, i) => (
          <g key={i}>
            <line x1={20 + i * 17} y1="225" x2={20 + i * 17} y2="213" stroke="#8b5a2b" strokeWidth="0.4"/>
            <path d={`M ${18 + i * 17} 214 L ${20 + i * 17} 211 L ${22 + i * 17} 214`} fill="none" stroke="#b8860b" strokeWidth="0.3"/>
            <path d={`M ${18 + i * 17} 218 L ${20 + i * 17} 215 L ${22 + i * 17} 218`} fill="none" stroke="#b8860b" strokeWidth="0.3"/>
          </g>
        ))}

        {/* ===== ТРОН — деревянный, резной ===== */}
        <path d="M 72 235 L 72 155 L 128 155 L 128 235 Z" fill="rgba(74,53,36,0.5)" stroke="#5a3a20" strokeWidth="0.5"/>
        <path d="M 68 155 L 132 155 L 132 140 L 68 140 Z" fill="rgba(139,90,43,0.5)" stroke="#5a3a20" strokeWidth="0.4"/>
        {/* Резной узор */}
        <path d="M 76 175 Q 88 170 100 175 Q 112 170 124 175" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.3"/>
        <path d="M 76 200 Q 88 195 100 200 Q 112 195 124 200" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.3"/>
        <path d="M 76 220 Q 88 215 100 220 Q 112 215 124 220" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.3"/>

        {/* ===== ФИГУРА ЦАРИЦЫ ===== */}
        <g className="svg-breathe" style={{ transformOrigin: "100px 180px" }}>
          {/* Платье — бордовое, сложный path */}
          <path d="M 78 230 Q 76 210 79 185 Q 81 160 84 140 Q 85 125 88 118 L 112 118 Q 115 125 116 140 Q 119 160 121 185 Q 124 210 122 230 L 114 238 L 86 238 Z"
            fill="rgba(100,20,20,0.4)" stroke="#8b1a1a" strokeWidth="0.5"/>
          {/* Золотая кайма — воротник */}
          <path d="M 85 122 Q 92 118 100 119 Q 108 118 115 122 L 115 128 Q 108 124 100 125 Q 92 124 85 128 Z" fill="rgba(255,215,0,0.25)" stroke="#b8860b" strokeWidth="0.3"/>
          {/* Золотая кайма — подол */}
          <path d="M 78 222 Q 100 226 122 222 L 122 232 Q 100 236 78 232 Z" fill="rgba(255,215,0,0.2)" stroke="#b8860b" strokeWidth="0.3"/>
          {/* Растительные узоры */}
          <path d="M 88 145 Q 94 141 100 143 Q 106 141 112 145 Q 106 149 100 147 Q 94 149 88 145" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.4"/>
          <path d="M 88 175 Q 94 171 100 173 Q 106 171 112 175 Q 106 179 100 177 Q 94 179 88 175" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.4"/>
          <path d="M 88 205 Q 94 201 100 203 Q 106 201 112 205 Q 106 209 100 207 Q 94 209 88 205" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.4"/>
          {/* Медальоны */}
          <circle cx="100" cy="160" r="2" fill="rgba(255,215,0,0.3)" stroke="#b8860b" strokeWidth="0.2"/>
          <circle cx="100" cy="190" r="2" fill="rgba(255,215,0,0.3)" stroke="#b8860b" strokeWidth="0.2"/>

          {/* Руки */}
          <path d="M 84 135 Q 76 145 72 160" fill="none" stroke="rgba(232,200,160,0.85)" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M 116 135 Q 124 148 130 160" fill="none" stroke="rgba(232,200,160,0.85)" strokeWidth="2.5" strokeLinecap="round"/>

          {/* Шея */}
          <path d="M 96 113 L 96 120 L 104 120 L 104 113" fill="rgba(232,200,160,0.85)" stroke="#8b5a2b" strokeWidth="0.3"/>

          {/* Голова — детализированная */}
          <path d="M 93 100 Q 91 92 94 87 Q 97 83 100 82 Q 103 83 106 87 Q 109 92 107 100 Q 107 107 105 110 Q 103 113 100 113 Q 97 113 95 110 Q 93 107 93 100 Z"
            fill="rgba(232,200,160,0.85)" stroke="#8b5a2b" strokeWidth="0.4"/>
          {/* Русые волосы */}
          <path d="M 91 96 Q 88 92 90 88 Q 93 85 96 87 Q 100 84 104 87 Q 107 85 110 88 Q 112 92 109 96" fill="rgba(139,90,43,0.5)" stroke="#8b5a2b" strokeWidth="0.3"/>
          <path d="M 91 102 Q 86 120 88 135" fill="none" stroke="rgba(139,90,43,0.4)" strokeWidth="2"/>
          <path d="M 109 102 Q 114 120 112 135" fill="none" stroke="rgba(139,90,43,0.4)" strokeWidth="2"/>
          {/* Глаза */}
          <ellipse cx="96" cy="97" rx="1.5" ry="1" fill="rgba(255,255,255,0.6)" stroke="#5a3a20" strokeWidth="0.2"/>
          <ellipse cx="104" cy="97" rx="1.5" ry="1" fill="rgba(255,255,255,0.6)" stroke="#5a3a20" strokeWidth="0.2"/>
          <circle cx="96.5" cy="97" r="0.6" fill="rgba(60,40,30,0.7)"/>
          <circle cx="104.5" cy="97" r="0.6" fill="rgba(60,40,30,0.7)"/>
          {/* Брови */}
          <path d="M 93 94 Q 96 93 99 94" fill="none" stroke="#5a3a20" strokeWidth="0.4"/>
          <path d="M 101 94 Q 104 93 107 94" fill="none" stroke="#5a3a20" strokeWidth="0.4"/>
          {/* Нос, рот */}
          <path d="M 100 99 L 99 104 L 101 104" fill="none" stroke="#8b5a2b" strokeWidth="0.3"/>
          <path d="M 96 108 Q 100 109 104 108" fill="none" stroke="#8b1a1a" strokeWidth="0.3"/>
          {/* Румянец */}
          <circle cx="92" cy="105" r="1.2" fill="rgba(200,80,60,0.12)"/>
          <circle cx="108" cy="105" r="1.2" fill="rgba(200,80,60,0.12)"/>

          {/* Золотая корона с зубцами и самоцветами */}
          <path d="M 90 90 L 90 82 L 94 86 L 97 80 L 100 85 L 103 80 L 106 86 L 110 82 L 110 90 Z" fill="rgba(255,215,0,0.3)" stroke="#b8860b" strokeWidth="0.4"/>
          <circle cx="94" cy="86" r="1" fill="rgba(180,30,30,0.5)"/>
          <circle cx="100" cy="82" r="1" fill="rgba(30,30,80,0.4)"/>
          <circle cx="106" cy="86" r="1" fill="rgba(180,30,30,0.5)"/>
        </g>

        {/* Скипетр */}
        <path d="M 130 160 Q 135 145 138 125" fill="none" stroke="#6b4520" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="138" cy="122" r="3" fill="#ffd700" stroke="#b8860b" strokeWidth="0.4"/>
        <ellipse cx="137" cy="121" rx="1" ry="0.6" fill="rgba(255,255,230,0.4)"/>

        {/* Щит с орлом */}
        <ellipse cx="72" cy="240" rx="9" ry="7" fill="rgba(184,134,11,0.3)" stroke="#b8860b" strokeWidth="0.4"/>
        <path d="M 68 238 L 72 242 L 76 238 L 72 234 Z" fill="rgba(255,215,0,0.2)" stroke="#b8860b" strokeWidth="0.2"/>
      </g>
    ),

    // IV. ИМПЕРАТОР — детализированный царь-богатырь в стиле Васнецова
    "major-4": (
      <g>
        {/* ===== КРЕПОСТНАЯ СТЕНА ===== */}
        <rect x="14" y="42" width="172" height="208" fill="rgba(100,80,60,0.06)" rx="2"/>
        {/* Каменные блоки */}
        {Array.from({length: 4}).map((_, row) => (
          Array.from({length: 5}).map((_, col) => (
            <rect key={`${row}-${col}`} x={18 + col * 34} y={55 + row * 22} width="30" height="18" fill="none" stroke="rgba(100,80,60,0.15)" strokeWidth="0.3"/>
          ))
        ))}

        {/* ===== ТРОН — каменный ===== */}
        <path d="M 70 240 L 70 140 L 130 140 L 130 240 Z" fill="rgba(80,60,45,0.5)" stroke="#5a3a20" strokeWidth="0.5"/>
        <path d="M 66 140 L 134 140 L 134 120 L 66 120 Z" fill="rgba(139,90,43,0.4)" stroke="#5a3a20" strokeWidth="0.4"/>
        {/* Орнамент */}
        <path d="M 76 165 Q 100 160 124 165" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.3"/>
        <path d="M 76 195 Q 100 190 124 195" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.3"/>

        {/* ===== ФИГУРА ЦАРЯ ===== */}
        <g className="svg-breathe" style={{ transformOrigin: "100px 180px" }}>
          {/* Ноги в сапогах */}
          <path d="M 90 235 L 88 248 L 85 252 L 91 254 L 94 250 L 93 230 Z" fill="rgba(60,40,30,0.5)" stroke="#3a2010" strokeWidth="0.3"/>
          <path d="M 110 235 L 112 248 L 115 252 L 109 254 L 106 250 L 107 230 Z" fill="rgba(60,40,30,0.5)" stroke="#3a2010" strokeWidth="0.3"/>

          {/* Кольчуга — сложный path */}
          <path d="M 80 230 Q 78 210 81 185 Q 83 160 85 140 Q 86 125 88 118 L 112 118 Q 114 125 115 140 Q 117 160 119 185 Q 122 210 120 230 L 112 238 L 88 238 Z"
            fill="rgba(50,50,60,0.4)" stroke="#3a3a40" strokeWidth="0.4"/>
          {/* Чешуйчатый узор кольчуги */}
          {Array.from({length: 5}).map((_, row) => (
            Array.from({length: 4}).map((_, col) => (
              <path key={`k-${row}-${col}`} d={`M ${88 + col * 6} ${135 + row * 18} q 3 -2 6 0 q 3 -2 6 0`} fill="none" stroke="rgba(160,160,170,0.25)" strokeWidth="0.3"/>
            ))
          ))}
          {/* Красный плащ */}
          <path d="M 82 230 L 76 120 L 70 230 Z" fill="rgba(100,20,20,0.3)" stroke="#8b1a1a" strokeWidth="0.3"/>
          <path d="M 118 230 L 124 120 L 130 230 Z" fill="rgba(100,20,20,0.3)" stroke="#8b1a1a" strokeWidth="0.3"/>

          {/* Руки */}
          <path d="M 84 135 Q 76 150 72 165" fill="none" stroke="rgba(232,200,160,0.85)" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M 116 135 Q 124 148 130 162" fill="none" stroke="rgba(232,200,160,0.85)" strokeWidth="2.5" strokeLinecap="round"/>

          {/* Шея */}
          <path d="M 96 113 L 96 120 L 104 120 L 104 113" fill="rgba(232,200,160,0.85)" stroke="#8b5a2b" strokeWidth="0.3"/>

          {/* Голова — с бородой */}
          <path d="M 93 98 Q 91 90 94 85 Q 97 81 100 80 Q 103 81 106 85 Q 109 90 107 98 Q 107 105 105 108 Q 103 111 100 111 Q 97 111 95 108 Q 93 105 93 98 Z"
            fill="rgba(232,200,160,0.85)" stroke="#8b5a2b" strokeWidth="0.4"/>
          {/* Русая борода */}
          <path d="M 93 103 Q 90 115 94 122 L 106 122 Q 110 115 107 103 Q 105 105 100 105 Q 96 105 93 103 Z" fill="rgba(139,90,43,0.4)" stroke="#8b5a2b" strokeWidth="0.3"/>
          {/* Усы */}
          <path d="M 94 102 Q 97 100 100 101 Q 103 100 106 102" fill="none" stroke="rgba(110,70,40,0.4)" strokeWidth="0.6"/>
          {/* Глаза */}
          <ellipse cx="96" cy="95" rx="1.5" ry="1" fill="rgba(255,255,255,0.6)" stroke="#5a3a20" strokeWidth="0.2"/>
          <ellipse cx="104" cy="95" rx="1.5" ry="1" fill="rgba(255,255,255,0.6)" stroke="#5a3a20" strokeWidth="0.2"/>
          <circle cx="96.5" cy="95" r="0.6" fill="rgba(60,40,30,0.7)"/>
          <circle cx="104.5" cy="95" r="0.6" fill="rgba(60,40,30,0.7)"/>
          {/* Брови — густые */}
          <path d="M 93 92 Q 96 90 99 92" fill="none" stroke="#5a3a20" strokeWidth="0.5"/>
          <path d="M 101 92 Q 104 90 107 92" fill="none" stroke="#5a3a20" strokeWidth="0.5"/>
          {/* Нос */}
          <path d="M 100 97 L 99 102 L 101 102" fill="none" stroke="#8b5a2b" strokeWidth="0.3"/>

          {/* Шапка Мономаха */}
          <path d="M 90 88 Q 100 72 110 88 L 108 92 L 92 92 Z" fill="rgba(255,215,0,0.3)" stroke="#b8860b" strokeWidth="0.5"/>
          {/* Меховая опушка */}
          <path d="M 90 88 L 110 88 L 110 91 L 90 91 Z" fill="rgba(180,30,30,0.35)"/>
          {/* Крест на шапке */}
          <line x1="100" y1="74" x2="100" y2="68" stroke="#ffd700" strokeWidth="0.6"/>
          <line x1="97" y1="71" x2="103" y2="71" stroke="#ffd700" strokeWidth="0.6"/>
          <circle cx="100" cy="78" r="1.5" fill="#ffd700" stroke="#b8860b" strokeWidth="0.2"/>
        </g>

        {/* Скипетр */}
        <path d="M 130 162 Q 136 148 140 128" fill="none" stroke="#6b4520" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="140" cy="125" r="3.5" fill="#ffd700" stroke="#b8860b" strokeWidth="0.4"/>
        <ellipse cx="139" cy="124" rx="1" ry="0.6" fill="rgba(255,255,230,0.4)"/>
        {/* Держава */}
        <circle cx="72" cy="165" r="4" fill="rgba(255,215,0,0.2)" stroke="#b8860b" strokeWidth="0.5"/>
        <line x1="72" y1="161" x2="72" y2="157" stroke="#ffd700" strokeWidth="0.8"/>
        <circle cx="72" cy="155" r="1.5" fill="#ffd700" stroke="#b8860b" strokeWidth="0.2"/>
      </g>
    ),

    // V. ИЕРОФАНТ — детализированный патриарх в стиле Васнецова
    "major-5": (
      <g>
        {/* ===== ХРАМ ===== */}
        <path d="M 28 250 L 28 80 Q 28 52 55 50 L 145 50 Q 172 52 172 80 L 172 250 Z" fill="rgba(30,20,50,0.08)" stroke="#b8860b" strokeWidth="0.3" opacity="0.3"/>
        {/* Купол — луковичный */}
        <path d="M 85 52 Q 82 35 100 28 Q 118 35 115 52" fill="rgba(120,20,20,0.15)" stroke="#b8860b" strokeWidth="0.4"/>
        <line x1="100" y1="28" x2="100" y2="20" stroke="#ffd700" strokeWidth="0.6"/>
        <circle cx="100" cy="20" r="1.5" fill="#ffd700"/>
        {/* Крест на куполе */}
        <line x1="100" y1="24" x2="100" y2="18" stroke="#ffd700" strokeWidth="0.5"/>
        <line x1="97" y1="21" x2="103" y2="21" stroke="#ffd700" strokeWidth="0.5"/>

        {/* Два монаха по бокам */}
        {/* Левый */}
        <ellipse cx="52" cy="128" rx="6" ry="7" fill="rgba(232,200,160,0.6)" stroke="#8b5a2b" strokeWidth="0.4"/>
        <path d="M 44 235 L 44 140 L 60 140 L 60 235 Z" fill="rgba(60,40,20,0.35)" stroke="#5a3a20" strokeWidth="0.4"/>
        <path d="M 48 128 Q 52 124 56 128" fill="none" stroke="#5a3a20" strokeWidth="0.3"/>
        {/* Правый */}
        <ellipse cx="148" cy="128" rx="6" ry="7" fill="rgba(232,200,160,0.6)" stroke="#8b5a2b" strokeWidth="0.4"/>
        <path d="M 140 235 L 140 140 L 156 140 L 156 235 Z" fill="rgba(60,40,20,0.35)" stroke="#5a3a20" strokeWidth="0.4"/>
        <path d="M 144 128 Q 148 124 152 128" fill="none" stroke="#5a3a20" strokeWidth="0.3"/>

        {/* ===== ФИГУРА ПАТРИАРХА ===== */}
        <g className="svg-breathe" style={{ transformOrigin: "100px 170px" }}>
          {/* Облачение — золотое, сложный path */}
          <path d="M 78 235 Q 76 215 79 185 Q 81 160 83 140 Q 84 125 86 118 L 114 118 Q 116 125 117 140 Q 119 160 121 185 Q 124 215 122 235 L 114 240 L 86 240 Z"
            fill="rgba(184,134,11,0.35)" stroke="#b8860b" strokeWidth="0.5"/>
          {/* Кайма */}
          <path d="M 84 122 Q 92 118 100 119 Q 108 118 116 122 L 116 128 Q 108 124 100 125 Q 92 124 84 128 Z" fill="rgba(255,215,0,0.25)" stroke="#b8860b" strokeWidth="0.3"/>
          <path d="M 78 225 Q 100 230 122 225 L 122 235 Q 100 240 78 235 Z" fill="rgba(255,215,0,0.2)" stroke="#b8860b" strokeWidth="0.3"/>
          {/* Узоры */}
          <path d="M 88 145 Q 94 141 100 143 Q 106 141 112 145 Q 106 149 100 147 Q 94 149 88 145" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.4"/>
          <path d="M 88 175 Q 94 171 100 173 Q 106 171 112 175 Q 106 179 100 177 Q 94 179 88 175" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.4"/>
          <path d="M 88 205 Q 94 201 100 203 Q 106 201 112 205 Q 106 209 100 207 Q 94 209 88 205" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.4"/>

          {/* Руки */}
          <path d="M 82 135 Q 74 155 72 180" fill="none" stroke="rgba(232,200,160,0.85)" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M 118 135 Q 126 150 128 165" fill="none" stroke="rgba(232,200,160,0.85)" strokeWidth="2.5" strokeLinecap="round"/>

          {/* Шея */}
          <path d="M 96 113 L 96 120 L 104 120 L 104 113" fill="rgba(232,200,160,0.85)" stroke="#8b5a2b" strokeWidth="0.3"/>

          {/* Голова — мудрый старец */}
          <path d="M 93 98 Q 91 90 94 85 Q 97 81 100 80 Q 103 81 106 85 Q 109 90 107 98 Q 107 105 105 108 Q 103 111 100 111 Q 97 111 95 108 Q 93 105 93 98 Z"
            fill="rgba(232,200,160,0.85)" stroke="#8b5a2b" strokeWidth="0.4"/>
          {/* Седая борода */}
          <path d="M 93 103 Q 90 118 94 125 L 106 125 Q 110 118 107 103 Q 105 105 100 105 Q 96 105 93 103 Z" fill="rgba(220,220,230,0.4)" stroke="#8b5a2b" strokeWidth="0.3"/>
          <path d="M 94 102 Q 97 100 100 101 Q 103 100 106 102" fill="none" stroke="rgba(200,200,210,0.4)" strokeWidth="0.6"/>
          {/* Глаза */}
          <path d="M 94 94 Q 96 93 98 94" fill="none" stroke="#5a3a20" strokeWidth="0.4"/>
          <path d="M 102 94 Q 104 93 106 94" fill="none" stroke="#5a3a20" strokeWidth="0.4"/>
          <circle cx="96" cy="94" r="0.5" fill="rgba(60,40,30,0.7)"/>
          <circle cx="104" cy="94" r="0.5" fill="rgba(60,40,30,0.7)"/>
          {/* Брови */}
          <path d="M 93 91 Q 96 89 99 91" fill="none" stroke="rgba(200,200,210,0.4)" strokeWidth="0.6"/>
          <path d="M 101 91 Q 104 89 107 91" fill="none" stroke="rgba(200,200,210,0.4)" strokeWidth="0.6"/>
          {/* Нос */}
          <path d="M 100 96 L 99 101 L 101 101" fill="none" stroke="#8b5a2b" strokeWidth="0.3"/>

          {/* Митра — золотая, резная */}
          <path d="M 89 88 L 100 68 L 111 88 Z" fill="rgba(255,215,0,0.3)" stroke="#b8860b" strokeWidth="0.5"/>
          <path d="M 92 82 Q 100 78 108 82" fill="none" stroke="#ffd700" strokeWidth="0.3"/>
          <path d="M 95 76 Q 100 73 105 76" fill="none" stroke="#ffd700" strokeWidth="0.3"/>
          {/* Крест на митре */}
          <line x1="100" y1="68" x2="100" y2="62" stroke="#ffd700" strokeWidth="0.5"/>
          <line x1="97" y1="65" x2="103" y2="65" stroke="#ffd700" strokeWidth="0.5"/>
        </g>

        {/* Посох — золотой, с крестом наверху */}
        <path d="M 70 235 Q 70 190 70 140 Q 70 90 70 70" fill="none" stroke="#6b4520" strokeWidth="2.5" strokeLinecap="round"/>
        {/* Навершие — шар */}
        <circle cx="70" cy="65" r="5" fill="rgba(255,215,0,0.25)" stroke="#b8860b" strokeWidth="0.5"/>
        <circle cx="70" cy="65" r="3" fill="rgba(255,200,80,0.3)"/>
        {/* Крест на шаре */}
        <line x1="70" y1="60" x2="70" y2="52" stroke="#ffd700" strokeWidth="0.8"/>
        <line x1="66" y1="56" x2="74" y2="56" stroke="#ffd700" strokeWidth="0.8"/>
      </g>
    ),

    // VI. ВЛЮБЛЁННЫЕ — детализированные сказочные юноша и девица
    "major-6": (
      <g>
        {/* Сад */}
        <rect x="14" y="42" width="172" height="200" fill="rgba(34,80,34,0.05)" rx="2"/>
        {/* Деревья */}
        <circle cx="28" cy="88" r="14" fill="rgba(34,100,40,0.1)" stroke="#2d6e2d" strokeWidth="0.3"/>
        <line x1="28" y1="100" x2="28" y2="250" stroke="#5a3a20" strokeWidth="2"/>
        <circle cx="172" cy="88" r="14" fill="rgba(34,100,40,0.1)" stroke="#2d6e2d" strokeWidth="0.3"/>
        <line x1="172" y1="100" x2="172" y2="250" stroke="#5a3a20" strokeWidth="2"/>

        {/* Ангел/солнце сверху */}
        <circle cx="100" cy="65" r="8" fill="rgba(255,215,0,0.25)" stroke="#b8860b" strokeWidth="0.4"/>
        <circle cx="100" cy="65" r="5" fill="rgba(255,200,80,0.3)"/>
        {Array.from({length: 8}).map((_, i) => {
          const a = (i / 8) * Math.PI * 2
          return <line key={i} x1={100 + Math.cos(a) * 8} y1={65 + Math.sin(a) * 8} x2={100 + Math.cos(a) * 13} y2={65 + Math.sin(a) * 13} stroke="#b8860b" strokeWidth="0.4" opacity="0.4"/>
        })}
        {/* Крылья ангела */}
        <path d="M 92 65 Q 78 58 70 68 Q 80 64 92 68" fill="rgba(255,255,255,0.08)" stroke="#b8860b" strokeWidth="0.3"/>
        <path d="M 108 65 Q 122 58 130 68 Q 120 64 108 68" fill="rgba(255,255,255,0.08)" stroke="#b8860b" strokeWidth="0.3"/>

        {/* ===== ЮНОША слева ===== */}
        <g>
          {/* Рубаха охровая */}
          <path d="M 62 230 Q 60 210 63 185 Q 64 165 66 150 L 78 150 Q 80 165 81 185 Q 84 210 82 230 Z"
            fill="rgba(184,134,11,0.3)" stroke="#8b5a2b" strokeWidth="0.4"/>
          <path d="M 65 155 Q 72 151 78 155" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.3"/>
          <path d="M 64 185 Q 72 181 80 185" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.3"/>
          {/* Ноги */}
          <path d="M 68 230 L 66 245 L 64 250 L 70 252 L 71 235 Z" fill="rgba(60,40,30,0.4)" stroke="#3a2010" strokeWidth="0.3"/>
          <path d="M 78 230 L 80 245 L 82 250 L 76 252 L 75 235 Z" fill="rgba(60,40,30,0.4)" stroke="#3a2010" strokeWidth="0.3"/>
          {/* Голова */}
          <path d="M 69 140 Q 68 133 70 128 Q 72 124 75 123 Q 78 124 80 128 Q 82 133 81 140 Q 81 146 79 149 Q 77 152 75 152 Q 73 152 71 149 Q 69 146 69 140 Z"
            fill="rgba(232,200,160,0.85)" stroke="#8b5a2b" strokeWidth="0.4"/>
          {/* Русые волосы */}
          <path d="M 68 134 Q 66 130 68 126 Q 71 123 75 124 Q 79 123 82 126 Q 84 130 82 134" fill="rgba(139,90,43,0.5)" stroke="#8b5a2b" strokeWidth="0.3"/>
          {/* Глаза */}
          <circle cx="72" cy="138" r="0.6" fill="rgba(60,40,30,0.7)"/>
          <circle cx="78" cy="138" r="0.6" fill="rgba(60,40,30,0.7)"/>
          <path d="M 70 136 Q 72 135 74 136" fill="none" stroke="#5a3a20" strokeWidth="0.3"/>
          <path d="M 76 136 Q 78 135 80 136" fill="none" stroke="#5a3a20" strokeWidth="0.3"/>
          {/* Нос, рот */}
          <path d="M 75 140 L 74 144 L 76 144" fill="none" stroke="#8b5a2b" strokeWidth="0.3"/>
          <path d="M 72 147 Q 75 148 78 147" fill="none" stroke="#8b1a1a" strokeWidth="0.3"/>
        </g>

        {/* ===== ДЕВИЦА справа ===== */}
        <g>
          {/* Сарафан бордовый */}
          <path d="M 118 230 Q 116 210 119 185 Q 120 165 122 150 L 134 150 Q 136 165 137 185 Q 140 210 138 230 Z"
            fill="rgba(100,20,20,0.35)" stroke="#8b1a1a" strokeWidth="0.4"/>
          <path d="M 121 155 Q 128 151 134 155" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.3"/>
          <path d="M 120 185 Q 128 181 136 185" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.3"/>
          {/* Ноги */}
          <path d="M 124 230 L 122 245 L 120 250 L 126 252 L 127 235 Z" fill="rgba(60,40,30,0.4)" stroke="#3a2010" strokeWidth="0.3"/>
          <path d="M 134 230 L 136 245 L 138 250 L 132 252 L 131 235 Z" fill="rgba(60,40,30,0.4)" stroke="#3a2010" strokeWidth="0.3"/>
          {/* Голова */}
          <path d="M 125 140 Q 124 133 126 128 Q 128 124 131 123 Q 134 124 136 128 Q 138 133 137 140 Q 137 146 135 149 Q 133 152 131 152 Q 129 152 127 149 Q 125 146 125 140 Z"
            fill="rgba(232,200,160,0.85)" stroke="#8b5a2b" strokeWidth="0.4"/>
          {/* Русая коса */}
          <path d="M 125 134 Q 122 145 124 160" fill="none" stroke="rgba(110,70,40,0.4)" strokeWidth="2"/>
          <path d="M 137 134 Q 140 145 138 160" fill="none" stroke="rgba(110,70,40,0.4)" strokeWidth="2"/>
          {/* Глаза */}
          <circle cx="128" cy="138" r="0.6" fill="rgba(60,40,30,0.7)"/>
          <circle cx="134" cy="138" r="0.6" fill="rgba(60,40,30,0.7)"/>
          <path d="M 126 136 Q 128 135 130 136" fill="none" stroke="#5a3a20" strokeWidth="0.3"/>
          <path d="M 132 136 Q 134 135 136 136" fill="none" stroke="#5a3a20" strokeWidth="0.3"/>
          {/* Нос, рот */}
          <path d="M 131 140 L 130 144 L 132 144" fill="none" stroke="#8b5a2b" strokeWidth="0.3"/>
          <path d="M 128 147 Q 131 148 134 147" fill="none" stroke="#8b1a1a" strokeWidth="0.3"/>
          {/* Румянец */}
          <circle cx="126" cy="143" r="1" fill="rgba(200,80,60,0.12)"/>
          <circle cx="136" cy="143" r="1" fill="rgba(200,80,60,0.12)"/>
        </g>

        {/* Цветы между ними */}
        <circle cx="100" cy="220" r="2.5" fill="rgba(160,20,20,0.5)" stroke="#8b1a1a" strokeWidth="0.2"/>
        <path d="M 97 220 Q 100 216 103 220 Q 100 224 97 220" fill="rgba(200,40,40,0.3)"/>
        <circle cx="96" cy="224" r="1.5" fill="#ffd700" opacity="0.4"/>
        <circle cx="104" cy="224" r="1.5" fill="#ffd700" opacity="0.4"/>
        <line x1="100" y1="222" x2="100" y2="235" stroke="#2d6e2d" strokeWidth="0.5"/>
      </g>
    ),

    // VII. КОЛЕСНИЦА — детализированный богатырь в сказочной колеснице
    "major-7": (
      <g>
        {/* Небо */}
        <rect x="14" y="42" width="172" height="100" fill="rgba(204,153,51,0.06)" rx="2"/>
        {/* Город на горизонте */}
        <path d="M 35 155 L 35 130 Q 35 120 40 120 Q 45 120 45 130 L 45 155" fill="rgba(120,20,20,0.12)" stroke="#b8860b" strokeWidth="0.3"/>
        <path d="M 150 155 L 150 125 Q 150 115 155 115 Q 160 115 160 125 L 160 155" fill="rgba(120,20,20,0.12)" stroke="#b8860b" strokeWidth="0.3"/>
        {/* Земля */}
        <path d="M 14 195 Q 100 190 186 195 L 186 255 L 14 255 Z" fill="rgba(139,90,43,0.1)"/>

        {/* Колесница — резная */}
        <path d="M 68 170 L 132 170 L 128 205 L 72 205 Z" fill="rgba(139,90,43,0.4)" stroke="#5a3a20" strokeWidth="0.5"/>
        <path d="M 72 180 Q 100 175 128 180" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.3"/>
        <path d="M 72 195 Q 100 190 128 195" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.3"/>

        {/* Колёса — детализированные */}
        {[78, 122].map(cx => (
          <g key={cx}>
            <circle cx={cx} cy="210" r="11" fill="none" stroke="#5a3a20" strokeWidth="1.5"/>
            <circle cx={cx} cy="210" r="5" fill="rgba(74,53,36,0.4)" stroke="#5a3a20" strokeWidth="0.5"/>
            {/* Спицы */}
            {[0, 60, 120, 180, 240, 300].map(deg => {
              const rad = deg * Math.PI / 180
              return <line key={deg} x1={cx + Math.cos(rad) * 5} y1={210 + Math.sin(rad) * 5} x2={cx + Math.cos(rad) * 11} y2={210 + Math.sin(rad) * 11} stroke="#5a3a20" strokeWidth="0.4"/>
            })}
          </g>
        ))}

        {/* ===== БОГАТЫРЬ ===== */}
        <g className="svg-breathe" style={{ transformOrigin: "100px 150px" }}>
          {/* Доспех */}
          <path d="M 86 168 L 88 138 L 112 138 L 114 168 Z" fill="rgba(50,50,60,0.4)" stroke="#3a3a40" strokeWidth="0.4"/>
          {/* Чешуя */}
          {Array.from({length: 3}).map((_, row) => (
            Array.from({length: 3}).map((_, col) => (
              <path key={`d-${row}-${col}`} d={`M ${89 + col * 7} ${143 + row * 8} q 3 -2 6 0`} fill="none" stroke="rgba(160,160,170,0.2)" strokeWidth="0.3"/>
            ))
          ))}
          {/* Красный плащ */}
          <path d="M 86 168 L 80 138 L 78 168 Z" fill="rgba(100,20,20,0.35)"/>
          <path d="M 114 168 L 120 138 L 122 168 Z" fill="rgba(100,20,20,0.35)"/>

          {/* Шея */}
          <path d="M 96 130 L 96 138 L 104 138 L 104 130" fill="rgba(232,200,160,0.85)" stroke="#8b5a2b" strokeWidth="0.3"/>

          {/* Голова */}
          <path d="M 93 125 Q 91 118 94 113 Q 97 109 100 108 Q 103 109 106 113 Q 109 118 107 125 Q 107 131 105 134 Q 103 137 100 137 Q 97 137 95 134 Q 93 131 93 125 Z"
            fill="rgba(232,200,160,0.85)" stroke="#8b5a2b" strokeWidth="0.4"/>
          {/* Глаза */}
          <circle cx="96" cy="120" r="0.6" fill="rgba(60,40,30,0.7)"/>
          <circle cx="104" cy="120" r="0.6" fill="rgba(60,40,30,0.7)"/>
          <path d="M 94 118 Q 96 117 98 118" fill="none" stroke="#5a3a20" strokeWidth="0.3"/>
          <path d="M 102 118 Q 104 117 106 118" fill="none" stroke="#5a3a20" strokeWidth="0.3"/>
          {/* Нос, рот */}
          <path d="M 100 122 L 99 127 L 101 127" fill="none" stroke="#8b5a2b" strokeWidth="0.3"/>
          <path d="M 96 130 Q 100 131 104 130" fill="none" stroke="#8b1a1a" strokeWidth="0.3"/>

          {/* Шлем — золотой, остроконечный */}
          <path d="M 90 118 Q 100 102 110 118 L 108 122 L 92 122 Z" fill="rgba(255,215,0,0.2)" stroke="#b8860b" strokeWidth="0.4"/>
          <line x1="100" y1="102" x2="100" y2="94" stroke="#ffd700" strokeWidth="0.5"/>
          <circle cx="100" cy="93" r="1.5" fill="#ffd700" stroke="#b8860b" strokeWidth="0.2"/>
        </g>

        {/* Конь левый — тёмный */}
        <g>
          <ellipse cx="45" cy="185" rx="13" ry="6" fill="rgba(50,35,25,0.35)" stroke="#5a3a20" strokeWidth="0.4"/>
          <path d="M 33 180 L 28 163 L 32 158 L 36 165 L 38 180" fill="rgba(50,35,25,0.35)" stroke="#5a3a20" strokeWidth="0.3"/>
          <path d="M 32 172 Q 28 168 30 162" fill="none" stroke="#3a2010" strokeWidth="0.5"/>
          <circle cx="31" cy="164" r="0.6" fill="rgba(60,40,30,0.6)"/>
          <line x1="40" y1="190" x2="38" y2="198" stroke="#5a3a20" strokeWidth="1.2"/>
          <line x1="50" y1="190" x2="52" y2="198" stroke="#5a3a20" strokeWidth="1.2"/>
        </g>
        {/* Конь правый — светлый */}
        <g>
          <ellipse cx="155" cy="185" rx="13" ry="6" fill="rgba(220,200,160,0.25)" stroke="#8b5a2b" strokeWidth="0.4"/>
          <path d="M 167 180 L 172 163 L 168 158 L 164 165 L 162 180" fill="rgba(220,200,160,0.25)" stroke="#8b5a2b" strokeWidth="0.3"/>
          <circle cx="169" cy="164" r="0.6" fill="rgba(60,40,30,0.5)"/>
          <line x1="150" y1="190" x2="148" y2="198" stroke="#8b5a2b" strokeWidth="1.2"/>
          <line x1="160" y1="190" x2="162" y2="198" stroke="#8b5a2b" strokeWidth="1.2"/>
        </g>
        {/* Поводья */}
        <path d="M 38 175 L 68 165" fill="none" stroke="#5a3a20" strokeWidth="0.5"/>
        <path d="M 162 175 L 132 165" fill="none" stroke="#5a3a20" strokeWidth="0.5"/>
      </g>
    ),

    // VIII. СИЛА — сказочная дева укрощает льва
    "major-8": (
      <g>
        {/* Лесная поляна */}
        <rect x="14" y="50" width="172" height="200" fill="rgba(34,80,34,0.06)" rx="2"/>
        {/* Деревья силуэты */}
        <path d="M 20 250 L 20 90 L 25 80 L 30 90 L 30 250 Z" fill="rgba(34,80,34,0.1)" stroke="#2d6e2d" strokeWidth="0.4"/>
        <path d="M 170 250 L 170 80 L 175 70 L 180 80 L 180 250 Z" fill="rgba(34,80,34,0.1)" stroke="#2d6e2d" strokeWidth="0.4"/>
        {/* Трава */}
        <path d="M 14 240 Q 50 235 100 240 Q 150 235 186 240 L 186 250 L 14 250 Z" fill="rgba(34,100,40,0.1)"/>
        {/* Бесконечность над головой */}
        <path d="M 92 75 Q 97 68 100 75 Q 103 68 108 75 Q 103 82 100 75 Q 97 82 92 75 Z" fill="#ffd700" opacity="0.8"/>
        {/* Фигура девы */}
        <g className="svg-breathe" style={{ transformOrigin: "100px 160px" }}>
          {/* Голова с венком */}
          <ellipse cx="100" cy="100" rx="8" ry="9" fill="rgba(232,200,160,0.9)" stroke="#8b5a2b" strokeWidth="0.6"/>
          {/* Венок из цветов */}
          <circle cx="92" cy="96" r="2" fill="rgba(180,30,30,0.6)"/>
          <circle cx="100" cy="91" r="2" fill="#ffd700" opacity="0.6"/>
          <circle cx="108" cy="96" r="2" fill="rgba(34,100,40,0.5)"/>
          {/* Русые волосы */}
          <path d="M 92 106 Q 86 125 88 145" fill="none" stroke="rgba(139,90,43,0.5)" strokeWidth="2"/>
          <path d="M 108 106 Q 114 125 112 145" fill="none" stroke="rgba(139,90,43,0.5)" strokeWidth="2"/>
          {/* Платье — белое с золотым поясом */}
          <path d="M 80 225 L 84 115 L 116 115 L 120 225 Z" fill="rgba(245,230,200,0.3)" stroke="#b8860b" strokeWidth="0.6"/>
          {/* Золотой пояс */}
          <rect x="84" y="160" width="32" height="4" fill="rgba(255,215,0,0.3)" stroke="#b8860b" strokeWidth="0.3"/>
          {/* Растительный узор */}
          <path d="M 90 135 Q 100 130 110 135 Q 105 142 100 139 Q 95 142 90 135" fill="none" stroke="#ffd700" strokeWidth="0.3"/>
          <path d="M 90 185 Q 100 180 110 185 Q 105 192 100 189 Q 95 192 90 185" fill="none" stroke="#ffd700" strokeWidth="0.3"/>
        </g>
        {/* Лев — сказочный, с золотой гривой */}
        <g>
          {/* Тело */}
          <ellipse cx="65" cy="215" rx="18" ry="10" fill="rgba(139,90,43,0.4)" stroke="#8b5a2b" strokeWidth="0.6"/>
          {/* Голова */}
          <circle cx="48" cy="205" r="9" fill="rgba(184,134,11,0.4)" stroke="#8b5a2b" strokeWidth="0.5"/>
          {/* Грива — золотая, пышная */}
          <path d="M 42 195 Q 38 200 42 210 Q 36 205 40 215 Q 38 210 44 218" fill="none" stroke="#ffd700" strokeWidth="0.8" opacity="0.5"/>
          {/* Глаз */}
          <circle cx="46" cy="203" r="1" fill="rgba(180,30,30,0.6)"/>
          {/* Лапы */}
          <line x1="55" y1="222" x2="55" y2="235" stroke="#8b5a2b" strokeWidth="2"/>
          <line x1="75" y1="222" x2="75" y2="235" stroke="#8b5a2b" strokeWidth="2"/>
          {/* Хвост */}
          <path d="M 82 215 Q 90 220 88 230" fill="none" stroke="#8b5a2b" strokeWidth="0.8"/>
        </g>
        {/* Рука девы на льве */}
        <line x1="85" y1="175" x2="60" y2="205" stroke="rgba(232,200,160,0.9)" strokeWidth="2.5" strokeLinecap="round"/>
        {/* Цветы на поляне */}
        <circle cx="130" cy="240" r="2" fill="rgba(180,30,30,0.7)" stroke="#b8860b" strokeWidth="0.3"/>
        <circle cx="140" cy="235" r="1.5" fill="#ffd700" opacity="0.6"/>
      </g>
    ),

    // IX. ОТШЕЛЬНИК — сказочный старец с фонарём в лесу
    "major-9": (
      <g>
        {/* Тёмный лес */}
        <rect x="14" y="42" width="172" height="208" fill="rgba(20,30,15,0.15)" rx="2"/>
        {/* Деревья — высокие тёмные силуэты */}
        <path d="M 20 250 L 20 60 L 25 50 L 30 60 L 30 250 Z" fill="rgba(20,40,15,0.2)" stroke="#2d6e2d" strokeWidth="0.4"/>
        <path d="M 170 250 L 170 55 L 175 45 L 180 55 L 180 250 Z" fill="rgba(20,40,15,0.2)" stroke="#2d6e2d" strokeWidth="0.4"/>
        <path d="M 50 250 L 50 80 L 55 70 L 60 80 L 60 250 Z" fill="rgba(20,40,15,0.12)" stroke="#2d6e2d" strokeWidth="0.3"/>
        <path d="M 140 250 L 140 75 L 145 65 L 150 75 L 150 250 Z" fill="rgba(20,40,15,0.12)" stroke="#2d6e2d" strokeWidth="0.3"/>
        {/* Фигура старца-отшельника */}
        <g className="svg-breathe" style={{ transformOrigin: "100px 170px" }}>
          {/* Голова с бородой */}
          <ellipse cx="100" cy="100" rx="7" ry="8" fill="rgba(232,200,160,0.9)" stroke="#8b5a2b" strokeWidth="0.6"/>
          {/* Седая борода — длинная */}
          <path d="M 94 105 Q 90 130 95 145 L 105 145 Q 110 130 106 105" fill="rgba(220,220,225,0.4)" stroke="#8b5a2b" strokeWidth="0.3"/>
          {/* Капюшон — серый */}
          <path d="M 88 100 Q 85 85 100 78 Q 115 85 112 100" fill="rgba(80,70,60,0.4)" stroke="#8b5a2b" strokeWidth="0.5"/>
          {/* Мантия — тёмно-серая с золотым узором */}
          <path d="M 78 235 L 82 110 L 118 110 L 122 235 Z" fill="rgba(80,70,60,0.4)" stroke="#8b5a2b" strokeWidth="0.6"/>
          <path d="M 90 140 Q 100 135 110 140 Q 105 147 100 144 Q 95 147 90 140" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.5"/>
          <path d="M 90 180 Q 100 175 110 180 Q 105 187 100 184 Q 95 187 90 180" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.5"/>
        </g>
        {/* Фонарь в руке — золотой, светящийся */}
        <g>
          {/* Шест */}
          <line x1="115" y1="200" x2="130" y2="130" stroke="#8b5a2b" strokeWidth="2" strokeLinecap="round"/>
          {/* Корпус фонаря */}
          <rect x="126" y="120" width="10" height="14" fill="rgba(255,215,0,0.15)" stroke="#b8860b" strokeWidth="0.6" rx="2"/>
          {/* Свечение фонаря */}
          <circle cx="131" cy="127" r="8" fill="rgba(255,215,0,0.12)" stroke="none"/>
          <circle cx="131" cy="127" r="4" fill="rgba(255,200,80,0.4)"/>
        </g>
        {/* Посох в другой руке */}
        <line x1="85" y1="200" x2="72" y2="90" stroke="#8b5a2b" strokeWidth="2.5" strokeLinecap="round"/>
      </g>
    ),

    // X. КОЛЕСО ФОРТУНЫ — сказовое колесо с рунами
    "major-10": (
      <g>
        {/* Фон — тёплая охра */}
        <rect x="14" y="42" width="172" height="208" fill="rgba(204,153,51,0.06)" rx="2"/>
        {/* Облака — васнецовские */}
        <ellipse cx="50" cy="70" rx="20" ry="6" fill="rgba(255,255,255,0.06)"/>
        <ellipse cx="150" cy="65" rx="18" ry="5" fill="rgba(255,255,255,0.06)"/>
        {/* Колесо — большое, деревянное с золотом */}
        <circle cx="100" cy="155" r="40" fill="none" stroke="#b8860b" strokeWidth="2"/>
        <circle cx="100" cy="155" r="34" fill="none" stroke="#8b5a2b" strokeWidth="0.8"/>
        <circle cx="100" cy="155" r="10" fill="rgba(184,134,11,0.3)" stroke="#b8860b" strokeWidth="0.8"/>
        {/* Спицы колёса */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => {
          const rad = deg * Math.PI / 180
          return <line key={deg} x1={100 + Math.cos(rad) * 10} y1={155 + Math.sin(rad) * 10} x2={100 + Math.cos(rad) * 40} y2={155 + Math.sin(rad) * 40} stroke="#8b5a2b" strokeWidth="0.8"/>
        })}
        {/* Руны на ободе */}
        {["ᚠ", "ᚢ", "ᚦ", "ᚨ", "ᚱ", "ᚲ", "ᚷ", "ᚹ"].map((rune, i) => {
          const a = (i / 8) * Math.PI * 2 - Math.PI / 2
          return <text key={i} x={100 + Math.cos(a) * 37} y={155 + Math.sin(a) * 37 + 2} fontSize="4" textAnchor="middle" fill="#ffd700" opacity="0.7">{rune}</text>
        })}
        {/* Сфинкс наверху колеса — сказочное существо */}
        <ellipse cx="100" cy="108" rx="7" ry="5" fill="rgba(184,134,11,0.3)" stroke="#b8860b" strokeWidth="0.5"/>
        <circle cx="100" cy="104" r="3" fill="rgba(232,200,160,0.6)" stroke="#8b5a2b" strokeWidth="0.4"/>
        {/* Змей снизу колеса */}
        <path d="M 85 200 Q 90 195 100 200 Q 110 195 115 200" fill="none" stroke="rgba(60,40,30,0.5)" strokeWidth="1.2"/>
        <circle cx="116" cy="199" r="1.5" fill="rgba(60,40,30,0.5)"/>
        {/* Джекал/собака слева */}
        <ellipse cx="55" cy="185" rx="6" ry="4" fill="rgba(139,90,43,0.3)" stroke="#8b5a2b" strokeWidth="0.4"/>
        {/* Анубис/существо справа */}
        <ellipse cx="145" cy="185" rx="6" ry="4" fill="rgba(220,200,160,0.2)" stroke="#8b5a2b" strokeWidth="0.4"/>
      </g>
    ),

    // XI. СПРАВЕДЛИВОСТЬ — сказочный судья с мечом и весами
    "major-11": (
      <g>
        {/* Храмовый фон — арка */}
        <path d="M 30 250 L 30 80 Q 30 55 55 55 L 145 55 Q 170 55 170 80 L 170 250 Z" fill="rgba(30,20,50,0.1)" stroke="#b8860b" strokeWidth="0.4" opacity="0.3"/>
        {/* Фигура судьи-царя */}
        <g className="svg-breathe" style={{ transformOrigin: "100px 170px" }}>
          {/* Голова с короной */}
          <ellipse cx="100" cy="95" rx="8" ry="9" fill="rgba(232,200,160,0.9)" stroke="#8b5a2b" strokeWidth="0.6"/>
          {/* Борода */}
          <path d="M 94 100 Q 91 113 96 118 L 104 118 Q 109 113 106 100" fill="rgba(139,90,43,0.4)" stroke="#8b5a2b" strokeWidth="0.3"/>
          {/* Корона */}
          <path d="M 91 90 L 93 84 L 97 88 L 100 82 L 103 88 L 107 84 L 109 90 Z" fill="rgba(255,215,0,0.3)" stroke="#b8860b" strokeWidth="0.5"/>
          {/* Облачение — тёмно-красное с золотом */}
          <path d="M 80 230 L 84 112 L 116 112 L 120 230 Z" fill="rgba(100,20,20,0.4)" stroke="#b8860b" strokeWidth="0.6"/>
          {/* Кайма */}
          <path d="M 84 112 L 116 112 L 116 117 L 84 117 Z" fill="rgba(255,215,0,0.2)"/>
          <path d="M 90 140 Q 100 135 110 140 Q 105 147 100 144 Q 95 147 90 140" fill="none" stroke="#ffd700" strokeWidth="0.3"/>
          <path d="M 90 180 Q 100 175 110 180 Q 105 187 100 184 Q 95 187 90 180" fill="none" stroke="#ffd700" strokeWidth="0.3"/>
        </g>
        {/* Меч — вертикально, золотая рукоять */}
        <line x1="100" y1="130" x2="100" y2="200" stroke="rgba(180,180,190,0.6)" strokeWidth="2"/>
        <line x1="94" y1="135" x2="106" y2="135" stroke="#ffd700" strokeWidth="1.2"/>
        <circle cx="100" cy="128" r="2.5" fill="#ffd700" stroke="#b8860b" strokeWidth="0.4"/>
        {/* Весы — в левой руке */}
        <line x1="75" y1="150" x2="75" y2="110" stroke="#8b5a2b" strokeWidth="1.5"/>
        <line x1="65" y1="110" x2="85" y2="110" stroke="#8b5a2b" strokeWidth="0.8"/>
        {/* Чаши весов */}
        <path d="M 60 110 Q 60 118 65 118 Q 70 118 70 110" fill="rgba(184,134,11,0.3)" stroke="#b8860b" strokeWidth="0.5"/>
        <path d="M 80 110 Q 80 118 85 118 Q 90 118 90 110" fill="rgba(184,134,11,0.3)" stroke="#b8860b" strokeWidth="0.5"/>
        <line x1="65" y1="110" x2="65" y2="105" stroke="#8b5a2b" strokeWidth="0.4"/>
        <line x1="85" y1="110" x2="85" y2="105" stroke="#8b5a2b" strokeWidth="0.4"/>
      </g>
    ),

    // XII. ПОВЕШЕННЫЙ — сказочный юноша, подвешенный за ногу на дубе
    "major-12": (
      <g>
        {/* Дуб — могучий, васнецовский */}
        <rect x="95" y="55" width="10" height="40" fill="rgba(74,53,36,0.6)" stroke="#8b5a2b" strokeWidth="0.5"/>
        {/* Ветви дуба */}
        <path d="M 100 55 Q 80 50 70 60" fill="none" stroke="#8b5a2b" strokeWidth="1.5"/>
        <path d="M 100 55 Q 120 50 130 60" fill="none" stroke="#8b5a2b" strokeWidth="1.5"/>
        {/* Листва */}
        <circle cx="75" cy="58" r="10" fill="rgba(34,100,40,0.1)" stroke="#2d6e2d" strokeWidth="0.3"/>
        <circle cx="125" cy="58" r="10" fill="rgba(34,100,40,0.1)" stroke="#2d6e2d" strokeWidth="0.3"/>
        {/* Нимб вокруг головы (перевёрнут) */}
        <ellipse cx="100" cy="220" rx="10" ry="3" fill="none" stroke="#ffd700" strokeWidth="0.8" opacity="0.5"/>
        {/* Фигура юноши — подвешена за ногу, головой вниз */}
        <g>
          {/* Нога привязана к ветви */}
          <line x1="100" y1="95" x2="100" y2="110" stroke="#8b5a2b" strokeWidth="2.5"/>
          {/* Тело — перевёрнутое */}
          <path d="M 92 215 L 95 110 L 105 110 L 108 215 Z" fill="rgba(184,134,11,0.3)" stroke="#8b5a2b" strokeWidth="0.6"/>
          {/* Растительный узор */}
          <path d="M 96 150 Q 100 147 104 150 Q 101 155 100 153 Q 99 155 96 150" fill="none" stroke="#ffd700" strokeWidth="0.3"/>
          <path d="M 96 180 Q 100 177 104 180 Q 101 185 100 183 Q 99 185 96 180" fill="none" stroke="#ffd700" strokeWidth="0.3"/>
          {/* Руки за спиной */}
          <path d="M 92 130 Q 85 135 88 145" fill="none" stroke="rgba(232,200,160,0.7)" strokeWidth="2"/>
          <path d="M 108 130 Q 115 135 112 145" fill="none" stroke="rgba(232,200,160,0.7)" strokeWidth="2"/>
          {/* Голова (внизу) */}
          <ellipse cx="100" cy="218" rx="7" ry="8" fill="rgba(232,200,160,0.9)" stroke="#8b5a2b" strokeWidth="0.5"/>
          {/* Волосы (вниз) */}
          <path d="M 94 222 Q 92 228 95 232" fill="none" stroke="rgba(139,90,43,0.5)" strokeWidth="1.5"/>
          <path d="M 106 222 Q 108 228 105 232" fill="none" stroke="rgba(139,90,43,0.5)" strokeWidth="1.5"/>
        </g>
        {/* Другая нога — согнута */}
        <path d="M 108 110 Q 115 115 112 125" fill="none" stroke="rgba(139,90,43,0.5)" strokeWidth="2"/>
      </g>
    ),

    // XIII. СМЕРТЬ — сказочный всадник на бледном коне с чёрным стягом
    "major-13": (
      <g>
        {/* Мрачный фон — васнецовский закат */}
        <rect x="14" y="42" width="172" height="208" fill="rgba(60,30,15,0.12)" rx="2"/>
        {/* Бледное солнце */}
        <circle cx="100" cy="75" r="10" fill="rgba(200,180,150,0.2)" stroke="#8b5a2b" strokeWidth="0.5"/>
        {/* Мёртвые деревья */}
        <path d="M 25 250 L 25 100 L 22 90 L 28 100 L 25 250 Z" fill="rgba(50,35,25,0.15)" stroke="#5a3a20" strokeWidth="0.3"/>
        <path d="M 175 250 L 175 95 L 172 85 L 178 95 L 175 250 Z" fill="rgba(50,35,25,0.15)" stroke="#5a3a20" strokeWidth="0.3"/>
        {/* Конь — бледный, сказочный */}
        <ellipse cx="80" cy="200" rx="25" ry="10" fill="rgba(200,190,170,0.25)" stroke="#8b5a2b" strokeWidth="0.5"/>
        {/* Голова коня */}
        <path d="M 55 195 Q 48 188 50 180 Q 55 178 58 185" fill="rgba(200,190,170,0.25)" stroke="#8b5a2b" strokeWidth="0.5"/>
        {/* Грива */}
        <path d="M 55 188 Q 50 185 52 195" fill="none" stroke="#8b5a2b" strokeWidth="0.6"/>
        {/* Ноги коня */}
        <line x1="65" y1="208" x2="63" y2="235" stroke="#8b5a2b" strokeWidth="2"/>
        <line x1="75" y1="208" x2="77" y2="235" stroke="#8b5a2b" strokeWidth="2"/>
        <line x1="90" y1="208" x2="88" y2="235" stroke="#8b5a2b" strokeWidth="2"/>
        <line x1="100" y1="208" x2="102" y2="235" stroke="#8b5a2b" strokeWidth="2"/>
        {/* Хвост */}
        <path d="M 104 198 Q 110 205 108 220" fill="none" stroke="#8b5a2b" strokeWidth="0.8"/>
        {/* Фигура всадника — в чёрном плаще с капюшоном */}
        <g className="svg-breathe" style={{ transformOrigin: "80px 170px" }}>
          {/* Капюшон */}
          <path d="M 72 150 Q 68 135 80 130 Q 92 135 88 150" fill="rgba(40,25,15,0.5)" stroke="#5a3a20" strokeWidth="0.5"/>
          {/* Лицо — скрыто в тени капюшона */}
          <ellipse cx="80" cy="145" rx="5" ry="6" fill="rgba(60,40,30,0.4)"/>
          {/* Плащ — чёрный, развевающийся */}
          <path d="M 68 195 L 65 140 L 95 140 L 92 195 Z" fill="rgba(40,25,15,0.4)" stroke="#5a3a20" strokeWidth="0.5"/>
          {/* Золотой растительный узор на плаще */}
          <path d="M 74 160 Q 80 156 86 160 Q 82 165 80 163 Q 78 165 74 160" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.4"/>
          <path d="M 74 180 Q 80 176 86 180 Q 82 185 80 183 Q 78 185 74 180" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.4"/>
        </g>
        {/* Чёрный стяг с белой розой */}
        <line x1="92" y1="195" x2="105" y2="120" stroke="#8b5a2b" strokeWidth="1.5"/>
        <path d="M 105 120 L 120 122 L 118 138 L 103 136 Z" fill="rgba(40,25,15,0.5)" stroke="#5a3a20" strokeWidth="0.4"/>
        {/* Белая роза на стяге */}
        <circle cx="111" cy="130" r="3" fill="rgba(245,230,200,0.7)" stroke="#b8860b" strokeWidth="0.3"/>
        <circle cx="111" cy="130" r="1.5" fill="rgba(180,30,30,0.5)"/>
        {/* Павшие фигуры у ног коня */}
        <ellipse cx="120" cy="235" rx="8" ry="3" fill="rgba(60,40,30,0.2)" stroke="#5a3a20" strokeWidth="0.3"/>
        <ellipse cx="45" cy="238" rx="6" ry="2" fill="rgba(60,40,30,0.15)" stroke="#5a3a20" strokeWidth="0.3"/>
      </g>
    ),

    // XIV. УМЕРЕННОСТЬ — сказочный ангел с двумя кувшинами
    "major-14": (
      <g>
        {/* Речной пейзаж — васнецовский */}
        <rect x="14" y="42" width="172" height="100" fill="rgba(204,153,51,0.06)" rx="2"/>
        {/* Холмы */}
        <path d="M 14 150 Q 50 140 100 145 Q 150 140 186 150 L 186 160 L 14 160 Z" fill="rgba(139,90,43,0.08)"/>
        {/* Река */}
        <path d="M 14 210 Q 100 200 186 210 L 186 230 L 14 230 Z" fill="rgba(70,100,130,0.1)" stroke="#4a6a8a" strokeWidth="0.3"/>
        {/* Цветы на берегу */}
        <circle cx="30" cy="225" r="1.5" fill="rgba(180,30,30,0.6)"/>
        <circle cx="170" cy="225" r="1.5" fill="#ffd700" opacity="0.5"/>
        {/* Крапива/трава */}
        <path d="M 25 215 L 27 205 M 30 215 L 32 208" fill="none" stroke="#2d6e2d" strokeWidth="0.4"/>
        <path d="M 170 215 L 168 205 M 175 215 L 173 208" fill="none" stroke="#2d6e2d" strokeWidth="0.4"/>
        {/* Фигура ангела */}
        <g className="svg-breathe" style={{ transformOrigin: "100px 160px" }}>
          {/* Голова с нимбом */}
          <ellipse cx="100" cy="95" rx="7" ry="8" fill="rgba(232,200,160,0.9)" stroke="#8b5a2b" strokeWidth="0.5"/>
          {/* Золотой нимб */}
          <ellipse cx="100" cy="88" rx="9" ry="3" fill="none" stroke="#ffd700" strokeWidth="0.6" opacity="0.6"/>
          {/* Крылья — сказочные, с золотыми перьями */}
          <path d="M 85 120 Q 70 115 60 135 Q 72 125 85 130" fill="rgba(255,255,255,0.1)" stroke="#b8860b" strokeWidth="0.4"/>
          <path d="M 115 120 Q 130 115 140 135 Q 128 125 115 130" fill="rgba(255,255,255,0.1)" stroke="#b8860b" strokeWidth="0.4"/>
          {/* Охряное одеяние с золотым узором */}
          <path d="M 82 210 L 85 108 L 115 108 L 118 210 Z" fill="rgba(184,134,11,0.3)" stroke="#b8860b" strokeWidth="0.5"/>
          <path d="M 90 135 Q 100 130 110 135 Q 105 142 100 139 Q 95 142 90 135" fill="none" stroke="#ffd700" strokeWidth="0.3"/>
          <path d="M 90 170 Q 100 165 110 170 Q 105 177 100 174 Q 95 177 90 170" fill="none" stroke="#ffd700" strokeWidth="0.3"/>
        </g>
        {/* Два кувшина — медные, вода переливается */}
        {/* Левый кувшин */}
        <path d="M 78 160 L 76 145 L 84 145 L 82 160 Z" fill="rgba(184,115,51,0.4)" stroke="#b8860b" strokeWidth="0.5"/>
        <ellipse cx="80" cy="145" rx="4" ry="1.5" fill="rgba(100,150,200,0.3)"/>
        {/* Правый кувшин */}
        <path d="M 118 160 L 116 145 L 124 145 L 122 160 Z" fill="rgba(184,115,51,0.4)" stroke="#b8860b" strokeWidth="0.5"/>
        {/* Струя воды между кувшинами */}
        <path d="M 80 147 Q 100 155 120 147" fill="none" stroke="rgba(100,150,200,0.3)" strokeWidth="0.8"/>
        {/* Руки ангела */}
        <line x1="88" y1="130" x2="80" y2="145" stroke="rgba(232,200,160,0.9)" strokeWidth="2"/>
        <line x1="112" y1="130" x2="120" y2="145" stroke="rgba(232,200,160,0.9)" strokeWidth="2"/>
      </g>
    ),

    // XV. ДЬЯВОЛ — сказочный рогатый дух над двумя фигурами
    "major-15": (
      <g>
        {/* Мрачная пещера */}
        <rect x="14" y="42" width="172" height="208" fill="rgba(40,15,10,0.15)" rx="2"/>
        {/* Скалы по бокам */}
        <path d="M 14 250 L 14 80 L 30 60 L 40 80 L 40 250 Z" fill="rgba(60,35,20,0.15)" stroke="#5a3a20" strokeWidth="0.4"/>
        <path d="M 186 250 L 186 80 L 170 60 L 160 80 L 160 250 Z" fill="rgba(60,35,20,0.15)" stroke="#5a3a20" strokeWidth="0.4"/>
        {/* Фигура Дьявола — рогатый, с крыльями */}
        <g className="svg-breathe" style={{ transformOrigin: "100px 130px" }}>
          {/* Голова с рогами */}
          <ellipse cx="100" cy="90" rx="8" ry="9" fill="rgba(80,50,35,0.5)" stroke="#5a3a20" strokeWidth="0.5"/>
          {/* Рога — тёмные, загнутые */}
          <path d="M 93 85 Q 88 75 85 68" fill="none" stroke="#5a3a20" strokeWidth="1.5"/>
          <path d="M 107 85 Q 112 75 115 68" fill="none" stroke="#5a3a20" strokeWidth="1.5"/>
          {/* Глаза — золотые */}
          <circle cx="97" cy="89" r="1" fill="#ffd700"/>
          <circle cx="103" cy="89" r="1" fill="#ffd700"/>
          {/* Тело — тёмно-красное */}
          <path d="M 88 165 L 90 100 L 110 100 L 112 165 Z" fill="rgba(80,20,20,0.4)" stroke="#5a3a20" strokeWidth="0.5"/>
          {/* Крылья — летучая мышь */}
          <path d="M 88 110 Q 70 105 60 125 Q 72 115 88 120" fill="rgba(60,30,20,0.3)" stroke="#5a3a20" strokeWidth="0.4"/>
          <path d="M 112 110 Q 130 105 140 125 Q 128 115 112 120" fill="rgba(60,30,20,0.3)" stroke="#5a3a20" strokeWidth="0.4"/>
        </g>
        {/* Факел в руке Дьявола */}
        <line x1="88" y1="140" x2="75" y2="120" stroke="#5a3a20" strokeWidth="1.5"/>
        <ellipse cx="75" cy="116" rx="3" ry="5" fill="rgba(255,140,0,0.4)" stroke="#b8860b" strokeWidth="0.3"/>
        {/* Две фигуры у ног — прикованные */}
        {/* Левая фигура — юноша */}
        <ellipse cx="75" cy="210" rx="5" ry="6" fill="rgba(232,200,160,0.6)" stroke="#8b5a2b" strokeWidth="0.4"/>
        <path d="M 68 235 L 70 218 L 80 218 L 82 235 Z" fill="rgba(184,134,11,0.25)" stroke="#8b5a2b" strokeWidth="0.4"/>
        {/* Пеньковые рожки на шее */}
        <ellipse cx="75" cy="216" rx="4" ry="1.5" fill="none" stroke="#5a3a20" strokeWidth="0.5"/>
        {/* Правая фигура — девица */}
        <ellipse cx="125" cy="210" rx="5" ry="6" fill="rgba(232,200,160,0.6)" stroke="#8b5a2b" strokeWidth="0.4"/>
        <path d="M 118 235 L 120 218 L 130 218 L 132 235 Z" fill="rgba(120,20,20,0.25)" stroke="#8b5a2b" strokeWidth="0.4"/>
        <ellipse cx="125" cy="216" rx="4" ry="1.5" fill="none" stroke="#5a3a20" strokeWidth="0.5"/>
        {/* Цепь между ними */}
        <line x1="79" y1="216" x2="121" y2="216" stroke="#5a3a20" strokeWidth="0.5" strokeDasharray="2 1"/>
        {/* Пентаграмма на лбу Дьявола */}
        <path d="M 100 86 L 101 89 L 103 89 L 101.5 90.5 L 102 92.5 L 100 91 L 98 92.5 L 98.5 90.5 L 97 89 L 99 89 Z" fill="#ffd700" opacity="0.5"/>
      </g>
    ),

    // XVI. БАШНЯ — сказочная башня, разрушаемая молнией
    "major-16": (
      <g>
        {/* Грозовое небо */}
        <rect x="14" y="42" width="172" height="208" fill="rgba(40,30,50,0.12)" rx="2"/>
        {/* Облака */}
        <ellipse cx="50" cy="65" rx="20" ry="6" fill="rgba(80,60,70,0.1)"/>
        <ellipse cx="150" cy="60" rx="18" ry="5" fill="rgba(80,60,70,0.1)"/>
        {/* Молния — золотая, зигзагом */}
        <path d="M 100 55 L 95 75 L 105 80 L 98 100" fill="none" stroke="#ffd700" strokeWidth="1.5" opacity="0.8"/>
        <circle cx="98" cy="100" r="3" fill="rgba(255,215,0,0.3)"/>
        {/* Башня — каменная, васнецовская */}
        <rect x="80" y="110" width="40" height="120" fill="rgba(80,60,45,0.5)" stroke="#8b5a2b" strokeWidth="0.8"/>
        {/* Зубцы башни */}
        <path d="M 78 110 L 78 100 L 84 100 L 84 108 L 90 108 L 90 100 L 96 100 L 96 108 L 102 108 L 102 100 L 108 100 L 108 108 L 114 108 L 114 100 L 120 100 L 120 110 Z" fill="rgba(80,60,45,0.6)" stroke="#8b5a2b" strokeWidth="0.5"/>
        {/* Окно — арочное */}
        <path d="M 95 145 Q 95 135 100 135 Q 105 135 105 145 L 105 155 L 95 155 Z" fill="rgba(255,140,0,0.2)" stroke="#b8860b" strokeWidth="0.4"/>
        {/* Трещина от молнии */}
        <path d="M 100 110 L 97 130 L 103 150 L 98 170" fill="none" stroke="#ffd700" strokeWidth="0.8" opacity="0.6"/>
        {/* Две фигуры, падающие из башни */}
        {/* Левая фигура */}
        <ellipse cx="82" cy="130" rx="4" ry="5" fill="rgba(232,200,160,0.6)" stroke="#8b5a2b" strokeWidth="0.4"/>
        <path d="M 78 145 L 80 135 L 84 135 L 86 145 Z" fill="rgba(120,20,20,0.3)" stroke="#8b5a2b" strokeWidth="0.3"/>
        {/* Правая фигура */}
        <ellipse cx="118" cy="125" rx="4" ry="5" fill="rgba(232,200,160,0.6)" stroke="#8b5a2b" strokeWidth="0.4"/>
        <path d="M 114 140 L 116 130 L 120 130 L 122 140 Z" fill="rgba(30,30,80,0.3)" stroke="#8b5a2b" strokeWidth="0.3"/>
        {/* Камни, летящие вниз */}
        <rect x="68" y="180" width="4" height="4" fill="rgba(80,60,45,0.4)" stroke="#8b5a2b" strokeWidth="0.3" transform="rotate(15 70 182)"/>
        <rect x="130" y="175" width="3" height="3" fill="rgba(80,60,45,0.3)" stroke="#8b5a2b" strokeWidth="0.3" transform="rotate(-20 131 176)"/>
        {/* Земля */}
        <path d="M 14 235 Q 100 230 186 235 L 186 250 L 14 250 Z" fill="rgba(139,90,43,0.1)"/>
      </g>
    ),

    // XVII. ЗВЕЗДА — сказочная дева у источника под звёздным небом
    "major-17": (
      <g>
        {/* Звёздное небо — васнецовское */}
        <rect x="14" y="42" width="172" height="120" fill="rgba(30,20,50,0.1)" rx="2"/>
        {/* Звёзды — крупные, золотые */}
        {[[40,60],[60,55],[100,50],[140,58],[160,65],[80,70],[130,75],[50,80]].map(([x,y], i) => (
          <path key={i} d={`M${x},${y-4} L${x+0.8},${y-0.8} L${x+4},${y} L${x+0.8},${y+0.8} L${x},${y+4} L${x-0.8},${y+0.8} L${x-4},${y} L${x-0.8},${y-0.8} Z`} fill="#ffd700" opacity="0.5"/>
        ))}
        {/* Большая звезда — центральная */}
        <path d="M 100 85 L 102 92 L 109 93 L 103 97 L 105 104 L 100 100 L 95 104 L 97 97 L 91 93 L 98 92 Z" fill="#ffd700" opacity="0.6" stroke="#b8860b" strokeWidth="0.3"/>
        {/* Пейзаж — холмы и вода */}
        <path d="M 14 170 Q 100 160 186 170 L 186 250 L 14 250 Z" fill="rgba(139,90,43,0.06)"/>
        {/* Источник/вода */}
        <ellipse cx="100" cy="220" rx="30" ry="8" fill="rgba(70,100,130,0.1)" stroke="#4a6a8a" strokeWidth="0.3"/>
        {/* Дерево — берёза */}
        <path d="M 30 250 L 30 120 L 33 115 L 36 120 L 36 250 Z" fill="rgba(220,220,220,0.1)" stroke="#8b5a2b" strokeWidth="0.3"/>
        <circle cx="33" cy="105" r="10" fill="rgba(34,100,40,0.08)" stroke="#2d6e2d" strokeWidth="0.3"/>
        {/* Фигура девы — поливает воду */}
        <g className="svg-breathe" style={{ transformOrigin: "100px 180px" }}>
          <ellipse cx="100" cy="135" rx="7" ry="8" fill="rgba(232,200,160,0.9)" stroke="#8b5a2b" strokeWidth="0.5"/>
          {/* Длинные волосы */}
          <path d="M 93 140 Q 88 165 90 185" fill="none" stroke="rgba(60,30,20,0.4)" strokeWidth="2"/>
          <path d="M 107 140 Q 112 165 110 185" fill="none" stroke="rgba(60,30,20,0.4)" strokeWidth="2"/>
          {/* Одеяние — светлое */}
          <path d="M 85 230 L 88 145 L 112 145 L 115 230 Z" fill="rgba(220,200,170,0.2)" stroke="#b8860b" strokeWidth="0.4"/>
        </g>
        {/* Два кувшина — медные */}
        <path d="M 82 195 L 80 180 L 88 180 L 86 195 Z" fill="rgba(184,115,51,0.3)" stroke="#b8860b" strokeWidth="0.4"/>
        <path d="M 114 195 L 112 180 L 120 180 L 118 195 Z" fill="rgba(184,115,51,0.3)" stroke="#b8860b" strokeWidth="0.4"/>
        {/* Струи воды */}
        <path d="M 84 195 Q 82 210 78 220" fill="none" stroke="rgba(100,150,200,0.2)" strokeWidth="0.6"/>
        <path d="M 116 195 Q 118 210 122 220" fill="none" stroke="rgba(100,150,200,0.2)" strokeWidth="0.6"/>
        {/* Руки */}
        <line x1="90" y1="165" x2="84" y2="180" stroke="rgba(232,200,160,0.9)" strokeWidth="2"/>
        <line x1="110" y1="165" x2="116" y2="180" stroke="rgba(232,200,160,0.9)" strokeWidth="2"/>
      </g>
    ),

    // XVIII. ЛУНА — сказочный ночной пейзаж с двумя башнями
    "major-18": (
      <g>
        {/* Ночное небо */}
        <rect x="14" y="42" width="172" height="208" fill="rgba(20,20,50,0.15)" rx="2"/>
        {/* Луна — крупная, васнецовская */}
        <circle cx="100" cy="80" r="16" fill="rgba(220,220,200,0.2)" stroke="#b8860b" strokeWidth="0.6"/>
        <circle cx="100" cy="80" r="12" fill="rgba(255,250,220,0.15)"/>
        {/* Лучи луны */}
        {Array.from({length: 12}).map((_, i) => {
          const a = (i / 12) * Math.PI * 2
          return <line key={i} x1={100 + Math.cos(a) * 16} y1={80 + Math.sin(a) * 16} x2={100 + Math.cos(a) * 22} y2={80 + Math.sin(a) * 22} stroke="#b8860b" strokeWidth="0.4" opacity="0.3"/>
        })}
        {/* Капли росы/слёзы */}
        {[[50,110],[70,105],[130,105],[150,110]].map(([x,y], i) => (
          <ellipse key={i} cx={x} cy={y} rx="1.5" ry="3" fill="rgba(100,150,200,0.2)"/>
        ))}
        {/* Две башни — сказочные, с куполами */}
        {/* Левая */}
        <path d="M 35 250 L 35 140 L 45 130 L 55 140 L 55 250 Z" fill="rgba(60,40,30,0.3)" stroke="#8b5a2b" strokeWidth="0.5"/>
        <path d="M 40 140 L 40 115 Q 40 105 45 105 Q 50 105 50 115 L 50 140" fill="rgba(120,20,20,0.15)" stroke="#b8860b" strokeWidth="0.4"/>
        {/* Правая */}
        <path d="M 145 250 L 145 140 L 155 130 L 165 140 L 165 250 Z" fill="rgba(60,40,30,0.3)" stroke="#8b5a2b" strokeWidth="0.5"/>
        <path d="M 150 140 L 150 115 Q 150 105 155 105 Q 160 105 160 115 L 160 140" fill="rgba(120,20,20,0.15)" stroke="#b8860b" strokeWidth="0.4"/>
        {/* Извилистая тропа */}
        <path d="M 70 250 Q 80 220 90 200 Q 100 190 100 170" fill="none" stroke="rgba(184,134,11,0.15)" strokeWidth="1" strokeDasharray="2 1"/>
        {/* Волк/собака слева — воющий */}
        <path d="M 65 220 L 60 215 L 65 210 L 70 215 Z" fill="rgba(60,40,30,0.3)" stroke="#8b5a2b" strokeWidth="0.3"/>
        <path d="M 62 210 L 60 205 M 68 210 L 70 205" fill="none" stroke="#8b5a2b" strokeWidth="0.3"/>
        {/* Рак/скорпион в воде */}
        <ellipse cx="100" cy="235" rx="6" ry="3" fill="rgba(80,60,50,0.2)" stroke="#8b5a2b" strokeWidth="0.3"/>
        {/* Вода/лужа */}
        <ellipse cx="100" cy="240" rx="25" ry="6" fill="rgba(70,100,130,0.08)" stroke="#4a6a8a" strokeWidth="0.2"/>
      </g>
    ),

    // XIX. СОЛНЦЕ — сказочное солнце над цветущим садом
    "major-19": (
      <g>
        {/* Тёплое небо */}
        <rect x="14" y="42" width="172" height="208" fill="rgba(204,153,51,0.1)" rx="2"/>
        {/* Солнце — большое, васнецовское, с лицом */}
        <circle cx="100" cy="90" r="22" fill="rgba(255,215,0,0.25)" stroke="#b8860b" strokeWidth="1"/>
        <circle cx="100" cy="90" r="16" fill="rgba(255,200,80,0.3)"/>
        {/* Лучи — растительные, васнецовские */}
        {Array.from({length: 12}).map((_, i) => {
          const a = (i / 12) * Math.PI * 2
          return <line key={i} x1={100 + Math.cos(a) * 22} y1={90 + Math.sin(a) * 22} x2={100 + Math.cos(a) * 32} y2={90 + Math.sin(a) * 32} stroke="#b8860b" strokeWidth="0.8" opacity="0.4"/>
        })}
        {/* Лицо солнца — глаза и улыбка */}
        <circle cx="95" cy="87" r="1.5" fill="rgba(139,90,43,0.6)"/>
        <circle cx="105" cy="87" r="1.5" fill="rgba(139,90,43,0.6)"/>
        <path d="M 94 94 Q 100 98 106 94" fill="none" stroke="rgba(139,90,43,0.5)" strokeWidth="0.6"/>
        {/* Цветущий сад */}
        <path d="M 14 200 Q 100 195 186 200 L 186 250 L 14 250 Z" fill="rgba(34,100,40,0.08)"/>
        {/* Подсолнухи — васнецовские */}
        {[[30,210],[170,210],[55,215],[145,215]].map(([x,y], i) => (
          <g key={i}>
            <line x1={x} y1={y} x2={x} y2={y-15} stroke="#2d6e2d" strokeWidth="0.5"/>
            <circle cx={x} cy={y-17} r="3" fill="rgba(139,90,43,0.4)" stroke="#b8860b" strokeWidth="0.3"/>
            {Array.from({length: 6}).map((_, j) => {
              const a = (j / 6) * Math.PI * 2
              return <ellipse key={j} cx={x + Math.cos(a) * 4} cy={y - 17 + Math.sin(a) * 4} rx="2" ry="1" fill="rgba(255,215,0,0.3)" transform={`rotate(${j * 60} ${x + Math.cos(a) * 4} ${y - 17 + Math.sin(a) * 4})`}/>
            })}
          </g>
        ))}
        {/* Фигура ребёнка/юноши на белом коне */}
        <g className="svg-breathe" style={{ transformOrigin: "100px 180px" }}>
          {/* Голова с венком */}
          <ellipse cx="100" cy="155" rx="6" ry="7" fill="rgba(232,200,160,0.9)" stroke="#8b5a2b" strokeWidth="0.4"/>
          <circle cx="95" cy="151" r="1.5" fill="rgba(180,30,30,0.5)"/>
          <circle cx="105" cy="151" r="1.5" fill="#ffd700" opacity="0.5"/>
          {/* Тело — в охряной рубахе */}
          <path d="M 92 185 L 94 163 L 106 163 L 108 185 Z" fill="rgba(184,134,11,0.3)" stroke="#8b5a2b" strokeWidth="0.4"/>
        </g>
        {/* Белый конь */}
        <ellipse cx="100" cy="195" rx="15" ry="7" fill="rgba(245,240,230,0.2)" stroke="#8b5a2b" strokeWidth="0.4"/>
        <path d="M 115 190 Q 122 185 120 195" fill="rgba(245,240,230,0.2)" stroke="#8b5a2b" strokeWidth="0.3"/>
        <line x1="92" y1="200" x2="90" y2="220" stroke="#8b5a2b" strokeWidth="1.5"/>
        <line x1="108" y1="200" x2="110" y2="220" stroke="#8b5a2b" strokeWidth="1.5"/>
      </g>
    ),

    // XX. СУД — сказочный ангел с трубой над воскресающими
    "major-20": (
      <g>
        {/* Небесный фон */}
        <rect x="14" y="42" width="172" height="208" fill="rgba(204,153,51,0.06)" rx="2"/>
        {/* Облака — васнецовские */}
        <ellipse cx="50" cy="70" rx="20" ry="6" fill="rgba(255,255,255,0.06)"/>
        <ellipse cx="150" cy="65" rx="18" ry="5" fill="rgba(255,255,255,0.06)"/>
        {/* Ангел с трубой — в облаках */}
        <g>
          {/* Голова с нимбом */}
          <ellipse cx="100" cy="80" rx="7" ry="8" fill="rgba(232,200,160,0.7)" stroke="#b8860b" strokeWidth="0.4"/>
          <ellipse cx="100" cy="73" rx="9" ry="3" fill="none" stroke="#ffd700" strokeWidth="0.5" opacity="0.5"/>
          {/* Крылья */}
          <path d="M 88 95 Q 70 88 60 100 Q 75 92 88 98" fill="rgba(255,255,255,0.1)" stroke="#b8860b" strokeWidth="0.3"/>
          <path d="M 112 95 Q 130 88 140 100 Q 125 92 112 98" fill="rgba(255,255,255,0.1)" stroke="#b8860b" strokeWidth="0.3"/>
          {/* Тело */}
          <path d="M 90 120 L 92 90 L 108 90 L 110 120 Z" fill="rgba(184,134,11,0.2)" stroke="#b8860b" strokeWidth="0.4"/>
        </g>
        {/* Труба — золотая, длинная */}
        <line x1="108" y1="105" x2="130" y2="85" stroke="#ffd700" strokeWidth="1.5"/>
        <ellipse cx="132" cy="83" rx="4" ry="3" fill="rgba(255,215,0,0.3)" stroke="#b8860b" strokeWidth="0.4"/>
        {/* Звуковые волны от трубы */}
        <path d="M 135 80 Q 142 75 145 80" fill="none" stroke="#ffd700" strokeWidth="0.4" opacity="0.3"/>
        <path d="M 138 85 Q 148 80 152 85" fill="none" stroke="#ffd700" strokeWidth="0.4" opacity="0.2"/>
        {/* Земля */}
        <path d="M 14 210 Q 100 205 186 210 L 186 250 L 14 250 Z" fill="rgba(139,90,43,0.08)"/>
        {/* Три фигуры — воскресающие из гробов */}
        {/* Левая — мужчина с поднятыми руками */}
        <ellipse cx="55" cy="200" rx="5" ry="6" fill="rgba(232,200,160,0.7)" stroke="#8b5a2b" strokeWidth="0.4"/>
        <path d="M 50 215 L 50 207 L 60 207 L 60 215 Z" fill="rgba(184,134,11,0.25)" stroke="#8b5a2b" strokeWidth="0.3"/>
        <line x1="52" y1="207" x2="48" y2="195" stroke="rgba(232,200,160,0.7)" strokeWidth="1.5"/>
        <line x1="58" y1="207" x2="62" y2="195" stroke="rgba(232,200,160,0.7)" strokeWidth="1.5"/>
        {/* Центральная — женщина с закрытыми глазами */}
        <ellipse cx="100" cy="200" rx="5" ry="6" fill="rgba(232,200,160,0.7)" stroke="#8b5a2b" strokeWidth="0.4"/>
        <path d="M 95 215 L 95 207 L 105 207 L 105 215 Z" fill="rgba(120,20,20,0.2)" stroke="#8b5a2b" strokeWidth="0.3"/>
        <path d="M 97 199 L 99 199 M 101 199 L 103 199" stroke="#8b5a2b" strokeWidth="0.4"/>
        {/* Правая — ребёнок */}
        <ellipse cx="145" cy="205" rx="4" ry="5" fill="rgba(232,200,160,0.7)" stroke="#8b5a2b" strokeWidth="0.4"/>
        <path d="M 141 217 L 141 210 L 149 210 L 149 217 Z" fill="rgba(30,30,80,0.2)" stroke="#8b5a2b" strokeWidth="0.3"/>
        {/* Гробы — деревянные, васнецовские */}
        <rect x="42" y="220" width="26" height="8" fill="rgba(74,53,36,0.3)" stroke="#8b5a2b" strokeWidth="0.3" rx="2"/>
        <rect x="87" y="220" width="26" height="8" fill="rgba(74,53,36,0.3)" stroke="#8b5a2b" strokeWidth="0.3" rx="2"/>
        <rect x="132" y="220" width="26" height="8" fill="rgba(74,53,36,0.3)" stroke="#8b5a2b" strokeWidth="0.3" rx="2"/>
      </g>
    ),

    // XXI. МИР — сказочная дева в венке, окружённая сказочными существами
    "major-21": (
      <g>
        {/* Тёплый фон */}
        <rect x="14" y="42" width="172" height="208" fill="rgba(204,153,51,0.06)" rx="2"/>
        {/* Венок — большой, растительный, васнецовский */}
        <ellipse cx="100" cy="150" rx="55" ry="75" fill="none" stroke="#2d6e2d" strokeWidth="0.8" opacity="0.3"/>
        {/* Растения на венке */}
        {Array.from({length: 16}).map((_, i) => {
          const a = (i / 16) * Math.PI * 2
          const x = 100 + Math.cos(a) * 55
          const y = 150 + Math.sin(a) * 75
          return <circle key={i} cx={x} cy={y} r="2.5" fill={i % 3 === 0 ? "rgba(180,30,30,0.3)" : i % 3 === 1 ? "#ffd700" : "rgba(34,100,40,0.3)"} opacity="0.5"/>
        })}
        {/* Листья на венке */}
        {Array.from({length: 8}).map((_, i) => {
          const a = (i / 8) * Math.PI * 2
          const x = 100 + Math.cos(a) * 52
          const y = 150 + Math.sin(a) * 70
          return <path key={i} d={`M ${x} ${y} L ${x + Math.cos(a) * 4} ${y + Math.sin(a) * 4}`} stroke="#2d6e2d" strokeWidth="0.5" opacity="0.3"/>
        })}
        {/* Фигура девы — в центре венка */}
        <g className="svg-breathe" style={{ transformOrigin: "100px 160px" }}>
          {/* Голова с венком */}
          <ellipse cx="100" cy="110" rx="7" ry="8" fill="rgba(232,200,160,0.9)" stroke="#8b5a2b" strokeWidth="0.5"/>
          {/* Венок из цветов на голове */}
          <circle cx="93" cy="106" r="1.5" fill="rgba(180,30,30,0.5)"/>
          <circle cx="100" cy="103" r="1.5" fill="#ffd700" opacity="0.5"/>
          <circle cx="107" cy="106" r="1.5" fill="rgba(34,100,40,0.4)"/>
          {/* Длинные волосы */}
          <path d="M 93 116 Q 88 140 90 160" fill="none" stroke="rgba(60,30,20,0.4)" strokeWidth="2"/>
          <path d="M 107 116 Q 112 140 110 160" fill="none" stroke="rgba(60,30,20,0.4)" strokeWidth="2"/>
          {/* Лёгкое покрывало */}
          <path d="M 85 210 L 88 120 L 112 120 L 115 210 Z" fill="rgba(245,230,200,0.15)" stroke="#b8860b" strokeWidth="0.4"/>
          {/* Золотой пояс */}
          <rect x="88" y="165" width="24" height="3" fill="rgba(255,215,0,0.2)" stroke="#b8860b" strokeWidth="0.2"/>
          {/* Платок в руке */}
          <line x1="88" y1="150" x2="80" y2="160" stroke="rgba(180,30,30,0.3)" strokeWidth="0.8"/>
          <line x1="112" y1="150" x2="120" y2="160" stroke="rgba(180,30,30,0.3)" strokeWidth="0.8"/>
        </g>
        {/* Четыре сказочных существа в углах */}
        {/* Лев — вверху слева (Лев) */}
        <ellipse cx="40" cy="70" rx="7" ry="5" fill="rgba(184,134,11,0.2)" stroke="#b8860b" strokeWidth="0.3"/>
        <path d="M 34 66 Q 30 62 34 58" fill="none" stroke="#ffd700" strokeWidth="0.4" opacity="0.3"/>
        {/* Орёл — вверху справа */}
        <path d="M 155 65 Q 165 60 170 68 Q 160 66 155 70" fill="rgba(60,40,30,0.2)" stroke="#8b5a2b" strokeWidth="0.3"/>
        {/* Бык — внизу слева */}
        <ellipse cx="40" cy="230" rx="7" ry="5" fill="rgba(80,50,35,0.2)" stroke="#8b5a2b" strokeWidth="0.3"/>
        <path d="M 35 226 L 33 222 M 45 226 L 47 222" fill="none" stroke="#8b5a2b" strokeWidth="0.4"/>
        {/* Ангел — внизу справа */}
        <ellipse cx="160" cy="230" rx="5" ry="6" fill="rgba(232,200,160,0.4)" stroke="#b8860b" strokeWidth="0.3"/>
        <path d="M 154 225 Q 150 220 152 230" fill="rgba(255,255,255,0.1)" stroke="#b8860b" strokeWidth="0.2"/>
      </g>
    ),
  }
  return map[card.id] || null
}

// === Младшие арканы — улучшенные ===
function MinorArcanaArt({ card }: { card: TarotCard }) {
  const suitColor = suitInfo[card.suit].color
  const rank = card.rank!

  // === ВАСНЕЦОВСКИЕ ТУЗЫ — рука из облака, золотой орнамент ===
  if (rank === "ace") {
    return (
      <g>
        {/* Облако — васнецовское */}
        <ellipse cx="100" cy="90" rx="25" ry="10" fill="rgba(255,250,230,0.08)"/>
        <ellipse cx="85" cy="88" rx="12" ry="6" fill="rgba(255,250,230,0.06)"/>
        <ellipse cx="115" cy="88" rx="12" ry="6" fill="rgba(255,250,230,0.06)"/>
        {/* Рука из облака */}
        <path d="M 88 100 L 108 100 L 110 115 L 100 110 L 90 115 Z" fill="rgba(232,200,160,0.6)" stroke="#8b5a2b" strokeWidth="0.8"/>
        {/* Рукав — с золотым растительным узором */}
        <path d="M 88 105 Q 80 95 88 90 L 92 100 M 108 105 Q 116 95 108 90 L 104 100" fill="rgba(184,134,11,0.2)" stroke="#b8860b" strokeWidth="0.5"/>
        {/* Большой символ масти */}
        <text x="100" y="200" fontSize="80" textAnchor="middle" fill={suitColor} opacity="0.8">{getSuitSymbol(card.suit)}</text>
        {/* Лучи — растительные, васнецовские */}
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * Math.PI * 2
          return <line key={i} x1={100 + Math.cos(a) * 50} y1={180 + Math.sin(a) * 50} x2={100 + Math.cos(a) * 62} y2={180 + Math.sin(a) * 62} stroke="#b8860b" strokeWidth="0.6" opacity="0.3"/>
        })}
        {/* Декоративные растительные завитки */}
        <path d="M 50 240 Q 60 248 70 240 Q 65 244 60 242" fill="none" stroke="#b8860b" strokeWidth="0.5" opacity="0.4"/>
        <path d="M 130 240 Q 140 248 150 240 Q 145 244 140 242" fill="none" stroke="#b8860b" strokeWidth="0.5" opacity="0.4"/>
        {/* Цветы */}
        <circle cx="55" cy="242" r="2" fill="rgba(180,30,30,0.4)" stroke="#b8860b" strokeWidth="0.3"/>
        <circle cx="145" cy="242" r="2" fill="#ffd700" opacity="0.4" stroke="#b8860b" strokeWidth="0.3"/>
      </g>
    )
  }

  // === ВАСНЕЦОВСКИЕ ЧИСЛОВЫЕ КАРТЫ — узорное расположение с растительным орнаментом ===
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
        {/* Васнецовская арка с растительным орнаментом */}
        <path d="M 45 110 Q 100 85 155 110" fill="none" stroke="#b8860b" strokeWidth="0.6" opacity="0.4"/>
        {/* Цветы на арке */}
        <circle cx="45" cy="110" r="2.5" fill="rgba(180,30,30,0.4)" stroke="#b8860b" strokeWidth="0.3"/>
        <circle cx="155" cy="110" r="2.5" fill="#ffd700" opacity="0.4" stroke="#b8860b" strokeWidth="0.3"/>
        {/* Листья */}
        <path d="M 50 108 Q 55 100 60 108" fill="none" stroke="#2d6e2d" strokeWidth="0.4" opacity="0.3"/>
        <path d="M 140 108 Q 145 100 150 108" fill="none" stroke="#2d6e2d" strokeWidth="0.4" opacity="0.3"/>

        {/* Символы масти */}
        {pos.map(([x, y], i) => (
          <g key={i}>
            <text x={x} y={y + 7} fontSize="20" textAnchor="middle" fill={suitColor} opacity="0.8">{getSuitSymbol(card.suit)}</text>
            {/* Растительные искры */}
            {i % 2 === 0 && (
              <>
                <circle cx={x - 7} cy={y} r="0.8" fill="#ffd700" opacity="0.3"/>
                <circle cx={x + 7} cy={y} r="0.8" fill="#ffd700" opacity="0.3"/>
              </>
            )}
          </g>
        ))}

        {/* Васнецовская арка снизу */}
        <path d="M 45 245 Q 100 260 155 245" fill="none" stroke="#b8860b" strokeWidth="0.6" opacity="0.4"/>
        <circle cx="45" cy="245" r="2" fill="rgba(34,100,40,0.3)" stroke="#b8860b" strokeWidth="0.3"/>
        <circle cx="155" cy="245" r="2" fill="rgba(180,30,30,0.3)" stroke="#b8860b" strokeWidth="0.3"/>

        {/* Центральная декоративная розетка для нечётных */}
        {count % 2 === 1 && (
          <g>
            <circle cx="100" cy="175" r="3" fill="none" stroke="#b8860b" strokeWidth="0.4" opacity="0.3"/>
            <path d="M 97 175 Q 100 170 103 175 Q 100 180 97 175" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.3"/>
          </g>
        )}
      </g>
    )
  }

  // === ВАСНЕЦОВСКИЕ ФИГУРНЫЕ КАРТЫ — сказочные персонажи ===
  const figureConfig: Record<string, { color: string; accessory: string }> = {
    page: { color: "rgba(184,134,11,0.3)", accessory: "П" },
    knight: { color: "rgba(60,60,70,0.4)", accessory: "R" },
    queen: { color: "rgba(120,20,20,0.35)", accessory: "Q" },
    king: { color: "rgba(30,30,80,0.4)", accessory: "K" },
  }
  const fc = figureConfig[rank]

  return (
    <g>
      {/* === Конь для рыцаря — сказочный, васнецовский === */}
      {rank === "knight" && (
        <>
          <ellipse cx="100" cy="210" rx="32" ry="13" fill="rgba(139,90,43,0.3)" stroke="#8b5a2b" strokeWidth="0.8"/>
          {/* Голова коня */}
          <path d="M 68 210 Q 60 198 64 188 L 76 190 L 80 205 Z" fill="rgba(139,90,43,0.35)" stroke="#8b5a2b" strokeWidth="0.6"/>
          <circle cx="68" cy="195" r="1" fill="rgba(60,40,30,0.6)"/>
          {/* Грива — золотая */}
          <path d="M 72 188 Q 75 178 80 185" fill="none" stroke="#ffd700" strokeWidth="0.8" opacity="0.4"/>
          {/* Ноги */}
          {[75, 90, 110, 125].map((x, i) => (
            <line key={i} x1={x} y1="222" x2={x} y2="240" stroke="#8b5a2b" strokeWidth="1.8"/>
          ))}
          {/* Хвост */}
          <path d="M 132 210 Q 138 215 136 225" fill="none" stroke="#8b5a2b" strokeWidth="0.6"/>
        </>
      )}

      {/* === Трон для королевы и короля — деревянный, резной === */}
      {(rank === "queen" || rank === "king") && (
        <>
          <path d="M 65 250 L 65 185 L 135 185 L 135 250 Z" fill="rgba(74,53,36,0.4)" stroke="#8b5a2b" strokeWidth="0.6"/>
          <path d="M 60 185 L 140 185 L 140 170 L 60 170 Z" fill="rgba(139,90,43,0.4)" stroke="#8b5a2b" strokeWidth="0.4"/>
          {/* Резной растительный узор на троне */}
          <path d="M 75 200 Q 85 195 95 200 Q 105 195 115 200 Q 125 195 135 200" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.3"/>
          <path d="M 75 225 Q 85 220 95 225 Q 105 220 115 225 Q 125 220 135 225" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.3"/>
        </>
      )}

      {/* === Фигура персонажа === */}
      {/* Тело — в васнецовской одежде */}
      <path d="M 86 195 L 90 125 L 110 125 L 114 195 Z" fill={fc.color} stroke="#8b5a2b" strokeWidth="0.6"/>
      {/* Растительный узор на одежде */}
      <path d="M 93 145 Q 100 140 107 145 Q 103 150 100 148 Q 97 150 93 145" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.4"/>
      <path d="M 93 170 Q 100 165 107 170 Q 103 175 100 173 Q 97 175 93 170" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.4"/>
      {/* Голова — с тёплым тоном кожи */}
      <circle cx="100" cy="118" r="9" fill="rgba(232,200,160,0.7)" stroke="#8b5a2b" strokeWidth="0.6"/>

      {/* === Корона для короля и королевы — золотая, с самоцветами === */}
      {(rank === "king" || rank === "queen") && (
        <g>
          <path d="M 90 105 L 93 92 L 97 98 L 100 88 L 103 98 L 107 92 L 110 105 Z" fill="rgba(255,215,0,0.3)" stroke="#b8860b" strokeWidth="0.5"/>
          <circle cx="93" cy="92" r="1.2" fill="rgba(180,30,30,0.6)"/>
          <circle cx="100" cy="88" r="1.2" fill="rgba(30,30,80,0.5)"/>
          <circle cx="107" cy="92" r="1.2" fill="rgba(180,30,30,0.6)"/>
        </g>
      )}

      {/* === Шлем для рыцаря — золотой, остроконечный === */}
      {rank === "knight" && (
        <g>
          <path d="M 89 115 Q 100 98 111 115 L 109 125 L 91 125 Z" fill="rgba(255,215,0,0.15)" stroke="#b8860b" strokeWidth="0.5"/>
          <line x1="100" y1="98" x2="100" y2="90" stroke="#ffd700" strokeWidth="0.6"/>
          <circle cx="100" cy="89" r="1.5" fill="#ffd700"/>
          {/* Забрало */}
          <line x1="93" y1="118" x2="107" y2="118" stroke="#5a3a20" strokeWidth="0.4"/>
        </g>
      )}

      {/* === Шапочка с пером для пажа — охряная === */}
      {rank === "page" && (
        <g>
          <path d="M 91 112 Q 100 100 109 112 L 107 118 L 93 118 Z" fill="rgba(184,134,11,0.3)" stroke="#b8860b" strokeWidth="0.4"/>
          <path d="M 109 108 Q 117 100 115 90 Q 112 98 109 98" fill="rgba(180,30,30,0.4)" stroke="#b8860b" strokeWidth="0.3"/>
        </g>
      )}

      {/* === Символ масти в руках — медальон с растительным узором === */}
      <g transform="translate(100, 158)">
        <circle r="10" fill={`${suitColor}22`} stroke="#b8860b" strokeWidth="0.5"/>
        {/* Растительный узор вокруг медальона */}
        <path d="M -8 -8 Q -4 -12 0 -8 Q 4 -12 8 -8" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.3"/>
        <text y="5" fontSize="14" textAnchor="middle" fill={suitColor} opacity="0.9">{getSuitSymbol(card.suit)}</text>
      </g>

      {/* Декоративные цветы по бокам */}
      <circle cx="48" cy="160" r="1.5" fill="rgba(180,30,30,0.3)" stroke="#b8860b" strokeWidth="0.3"/>
      <circle cx="152" cy="160" r="1.5" fill="#ffd700" opacity="0.3" stroke="#b8860b" strokeWidth="0.3"/>

      {/* Буква ранга внизу — с золотым орнаментом */}
      <text x="100" y="245" fontSize="11" textAnchor="middle" fill={suitColor} opacity="0.6" fontWeight="bold" style={{ fontFamily: "var(--font-cinzel)" }}>{fc.accessory}</text>
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
        {/* Богатый градиент фона — васнецовская палитра: охра/умбра */}
        <linearGradient id={`bg-${card.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2a1a0e" stopOpacity="0.98"/>
          <stop offset="50%" stopColor="#3d2818" stopOpacity="0.98"/>
          <stop offset="100%" stopColor="#2a1a0e" stopOpacity="0.98"/>
        </linearGradient>
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

      {/* Слои фона — без радиального свечения (оно просвечивало сквозь иллюстрацию при 3D-наклоне) */}
      <rect x="0" y="0" width="200" height="320" fill={`url(#bg-${card.id})`} rx="10"/>
      <rect x="0" y="0" width="200" height="320" fill={`url(#stars-${card.id})`} rx="10"/>

      {/* Декоративная рамка с орнаментом + анимированная пунктирная обводка */}
      <OrnateBorder accent={accentColor}/>
      {/* Бегущая пунктирная обводка как "портал" */}
      <rect x="11" y="11" width="178" height="298" fill="none" stroke={accentColor} strokeWidth="0.5" rx="4" strokeDasharray="4 3" opacity="0.5">
        <animate attributeName="stroke-dashoffset" from="0" to="56" dur="25s" repeatCount="indefinite"/>
      </rect>

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

// === РУБАШКА КАРТЫ — оптимизированная: 1 SMIL animateTransform, остальные эффекты в canvas ===
let cardBackCounter = 0
export function CardBack({ width = 200, height = 320, className }: { width?: number; height?: number; className?: string }) {
  const uid = `cb${cardBackCounter++}`

  return (
    <svg viewBox="0 0 200 340" width={width} height={height} className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id={`${uid}-bg`} cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#1a1025"/>
          <stop offset="100%" stopColor="#0a0510"/>
        </radialGradient>
        <linearGradient id={`${uid}-gold`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffd700"/>
          <stop offset="50%" stopColor="#b8860b"/>
          <stop offset="100%" stopColor="#ffd700"/>
        </linearGradient>
        {/* Угловой орнамент */}
        <g id={`${uid}-corner`}>
          <circle cx="0" cy="0" r="2" fill={`url(#${uid}-gold)`}/>
          <line x1="0" y1="0" x2="14" y2="0" stroke={`url(#${uid}-gold)`} strokeWidth="0.8"/>
          <line x1="0" y1="0" x2="0" y2="14" stroke={`url(#${uid}-gold)`} strokeWidth="0.8"/>
          <path d="M14,0 Q14,14 0,14" fill="none" stroke={`url(#${uid}-gold)`} strokeWidth="0.8"/>
          <circle cx="14" cy="0" r="1.5" fill={`url(#${uid}-gold)`}/>
          <circle cx="0" cy="14" r="1.5" fill={`url(#${uid}-gold)`}/>
        </g>
      </defs>

      {/* Фон */}
      <rect width="200" height="340" rx="12" fill={`url(#${uid}-bg)`} stroke={`url(#${uid}-gold)`} strokeWidth="2"/>

      {/* Рамки */}
      <rect x="8" y="8" width="184" height="324" rx="8" fill="none" stroke={`url(#${uid}-gold)`} strokeWidth="1" opacity="0.6"/>
      <rect x="16" y="16" width="168" height="308" rx="6" fill="none" stroke={`url(#${uid}-gold)`} strokeWidth="0.5" strokeDasharray="4 4" opacity="0.4"/>

      {/* Угловые орнаменты */}
      <use href={`#${uid}-corner`} x="16" y="16"/>
      <use href={`#${uid}-corner`} transform="translate(184, 16) scale(-1, 1)"/>
      <use href={`#${uid}-corner`} transform="translate(16, 324) scale(1, -1)"/>
      <use href={`#${uid}-corner`} transform="translate(184, 324) scale(-1, -1)"/>

      {/* Центральный глаз — единственный animateTransform (пульсация) */}
      <g transform="translate(100, 160)">
        <animateTransform
          attributeName="transform"
          type="scale"
          values="1;1.05;1"
          dur="3s"
          repeatCount="indefinite"
          additive="sum"
        />
        <circle r="36" fill="none" stroke={`url(#${uid}-gold)`} strokeWidth="1.5" opacity="0.8"/>
        <circle r="22" fill="none" stroke={`url(#${uid}-gold)`} strokeWidth="1" opacity="0.6"/>
        <circle r="12" fill="rgba(167,139,250,0.2)" stroke={`url(#${uid}-gold)`} strokeWidth="0.8" opacity="0.7"/>
        <circle r="5" fill={`url(#${uid}-gold)`} opacity="0.9"/>
        <circle cx="-2" cy="-2" r="1.5" fill="rgba(255,255,255,0.8)"/>
      </g>

      {/* Звёзды — статичные, без SMIL (мерцание добавит canvas поверх) */}
      {[
        [40, 50], [160, 70], [50, 260], [150, 270],
        [100, 80], [30, 200], [170, 220], [100, 305],
      ].map(([x, y], i) => (
        <path
          key={i}
          d={`M${x},${y-5} L${x+1.2},${y-1.2} L${x+5},${y} L${x+1.2},${y+1.2} L${x},${y+5} L${x-1.2},${y+1.2} L${x-5},${y} L${x-1.2},${y-1.2} Z`}
          fill={`url(#${uid}-gold)`}
          opacity="0.5"
        />
      ))}
    </svg>
  )
}
