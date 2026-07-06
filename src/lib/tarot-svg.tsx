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
        {/* Небо — васнецовский закат */}
        <rect x="14" y="42" width="172" height="160" fill="rgba(204,153,51,0.08)" rx="2"/>
        <path d="M 14 42 L 186 42 L 186 110 Q 150 90 100 95 Q 50 90 14 110 Z" fill="rgba(255,180,80,0.06)"/>
        {/* Облака — резные, васнецовские */}
        <path d="M 25 60 Q 35 55 45 60 Q 55 55 65 62 Q 60 68 50 66 Q 40 70 30 65 Q 22 65 25 60 Z" fill="rgba(255,255,255,0.08)"/>
        <path d="M 130 55 Q 140 50 150 55 Q 165 52 175 58 Q 168 65 158 62 Q 148 66 138 62 Q 128 62 130 55 Z" fill="rgba(255,255,255,0.08)"/>

        {/* Дальние холмы с городом */}
        <path d="M 14 175 Q 40 168 60 172 Q 75 165 90 170 Q 105 165 120 170 Q 140 165 160 172 Q 175 168 186 173 L 186 200 L 14 200 Z" fill="rgba(120,80,40,0.18)" stroke="#5a3a20" strokeWidth="0.3"/>
        {/* Купола далёкого города */}
        <path d="M 35 175 L 35 162 Q 35 158 38 158 Q 41 158 41 162 L 41 175 Z" fill="rgba(120,20,20,0.25)" stroke="#5a3a20" strokeWidth="0.3"/>
        <path d="M 37 158 Q 38 154 39 158" fill="#ffd700" opacity="0.4"/>
        <path d="M 145 175 L 145 164 Q 145 160 148 160 Q 151 160 151 164 L 151 175 Z" fill="rgba(120,20,20,0.25)" stroke="#5a3a20" strokeWidth="0.3"/>
        <path d="M 147 160 Q 148 156 149 160" fill="#ffd700" opacity="0.4"/>

        {/* Лесные деревья — детальные резные стволы */}
        <path d="M 18 245 L 18 100 Q 19 88 22 82 L 24 78 L 26 82 Q 29 88 30 100 L 30 245 Z" fill="rgba(80,55,30,0.5)" stroke="#5a3a20" strokeWidth="0.5"/>
        {/* Крона дерева — пышная, ярусами */}
        <path d="M 14 95 Q 24 70 36 88 Q 28 75 38 78 Q 32 65 44 80 Q 38 60 50 75 Q 44 70 48 88 Q 38 95 30 92 Q 22 95 14 95 Z" fill="rgba(34,80,34,0.45)" stroke="#2d6e2d" strokeWidth="0.4"/>
        <path d="M 12 110 Q 22 90 32 105 Q 24 95 36 100 Q 28 88 40 100 Q 32 92 44 108 Q 34 110 24 108 Q 14 110 12 110 Z" fill="rgba(34,80,34,0.4)" stroke="#2d6e2d" strokeWidth="0.4"/>

        <path d="M 170 245 L 170 95 Q 171 83 174 77 L 176 73 L 178 77 Q 181 83 182 95 L 182 245 Z" fill="rgba(80,55,30,0.5)" stroke="#5a3a20" strokeWidth="0.5"/>
        <path d="M 166 90 Q 176 65 188 83 Q 180 70 190 73 Q 184 60 196 75 Q 190 70 194 88 Q 184 95 176 92 Q 168 95 166 90 Z" fill="rgba(34,80,34,0.45)" stroke="#2d6e2d" strokeWidth="0.4"/>
        <path d="M 164 105 Q 174 85 184 100 Q 176 90 188 95 Q 180 83 192 95 Q 184 87 196 103 Q 186 105 176 103 Q 166 105 164 105 Z" fill="rgba(34,80,34,0.4)" stroke="#2d6e2d" strokeWidth="0.4"/>

        {/* Земля — травянистая поляна */}
        <path d="M 14 200 Q 50 195 100 200 Q 150 195 186 200 L 186 250 L 14 250 Z" fill="rgba(90,60,30,0.18)" stroke="#5a3a20" strokeWidth="0.3"/>
        {/* Травинки */}
        <path d="M 30 230 Q 32 222 34 230" fill="none" stroke="#2d6e2d" strokeWidth="0.5"/>
        <path d="M 38 232 Q 40 224 42 232" fill="none" stroke="#2d6e2d" strokeWidth="0.5"/>
        <path d="M 120 235 Q 122 227 124 235" fill="none" stroke="#2d6e2d" strokeWidth="0.5"/>
        <path d="M 130 232 Q 132 224 134 232" fill="none" stroke="#2d6e2d" strokeWidth="0.5"/>
        <path d="M 160 230 Q 162 222 164 230" fill="none" stroke="#2d6e2d" strokeWidth="0.5"/>

        {/* Бесконечность над головой — золотая, плетёная */}
        <path d="M 86 76 Q 92 70 96 76 Q 100 82 104 76 Q 108 70 114 76 Q 108 84 104 78 Q 100 72 96 78 Q 92 84 86 76 Z" fill="none" stroke="#ffd700" strokeWidth="1.2"/>
        <path d="M 86 76 Q 92 70 96 76 Q 100 82 104 76 Q 108 70 114 76 Q 108 84 104 78 Q 100 72 96 78 Q 92 84 86 76 Z" fill="none" stroke="#b8860b" strokeWidth="0.4"/>

        {/* ===== ДЕВА — сказочная ведунья ===== */}
        <g className="svg-breathe" style={{ transformOrigin: "100px 165px" }}>
          {/* Длинные русые волосы — струящиеся */}
          <path d="M 86 100 Q 76 130 78 175 Q 80 200 86 225 L 92 225 Q 88 200 88 175 Q 86 145 92 115 Z" fill="rgba(180,140,70,0.55)" stroke="#8b5a2b" strokeWidth="0.4"/>
          <path d="M 114 100 Q 124 130 122 175 Q 120 200 114 225 L 108 225 Q 112 200 112 175 Q 114 145 108 115 Z" fill="rgba(180,140,70,0.55)" stroke="#8b5a2b" strokeWidth="0.4"/>

          {/* Шея */}
          <path d="M 96 118 L 96 128 L 104 128 L 104 118 Z" fill="rgba(232,200,160,0.9)" stroke="#8b5a2b" strokeWidth="0.3"/>

          {/* Лицо — сложный path с овальным контуром */}
          <path d="M 92 110 Q 90 100 94 93 Q 97 89 100 88 Q 103 89 106 93 Q 110 100 108 110 Q 109 116 107 120 Q 104 124 100 124 Q 96 124 93 120 Q 91 116 92 110 Z"
            fill="rgba(232,200,160,0.92)" stroke="#8b5a2b" strokeWidth="0.4"/>

          {/* Волосы надо лбом — пряди */}
          <path d="M 92 95 Q 96 90 100 91 Q 104 90 108 95 Q 106 96 104 95 Q 100 93 96 95 Q 94 96 92 95 Z" fill="rgba(180,140,70,0.7)" stroke="#8b5a2b" strokeWidth="0.3"/>

          {/* Брови — изогнутые */}
          <path d="M 93 103 Q 95 101 97 102" fill="none" stroke="#5a3a20" strokeWidth="0.6" strokeLinecap="round"/>
          <path d="M 103 102 Q 105 101 107 103" fill="none" stroke="#5a3a20" strokeWidth="0.6" strokeLinecap="round"/>

          {/* Глаза — миндалевидные с белком, радужкой, зрачком */}
          <path d="M 93 107 Q 95 106 97 107 Q 97 108 95 109 Q 93 108 93 107 Z" fill="rgba(255,255,255,0.85)"/>
          <path d="M 103 107 Q 105 106 107 107 Q 107 108 105 109 Q 103 108 103 107 Z" fill="rgba(255,255,255,0.85)"/>
          <circle cx="95" cy="107.5" r="0.9" fill="#5a3a20"/>
          <circle cx="105" cy="107.5" r="0.9" fill="#5a3a20"/>
          <circle cx="95.3" cy="107.2" r="0.3" fill="rgba(255,255,255,0.9)"/>
          <circle cx="105.3" cy="107.2" r="0.3" fill="rgba(255,255,255,0.9)"/>

          {/* Нос — тонкий, прямой */}
          <path d="M 100 110 L 99 116 Q 99 117 100 117 Q 101 117 101 116 Z" fill="none" stroke="#8b5a2b" strokeWidth="0.4" strokeLinecap="round"/>

          {/* Рот — мягкая улыбка */}
          <path d="M 96 119 Q 100 121 104 119" fill="none" stroke="#991b1b" strokeWidth="0.6" strokeLinecap="round"/>
          <path d="M 97 119 Q 100 120 103 119 Q 100 120 97 119" fill="rgba(180,60,60,0.3)"/>

          {/* Румянец */}
          <ellipse cx="94" cy="114" rx="1.5" ry="1" fill="rgba(220,120,80,0.25)"/>
          <ellipse cx="106" cy="114" rx="1.5" ry="1" fill="rgba(220,120,80,0.25)"/>

          {/* Венок из цветов и листьев — детальный */}
          <path d="M 88 96 Q 92 92 95 94 Q 92 95 90 96 Q 88 96 88 96 Z" fill="rgba(34,100,40,0.7)" stroke="#2d6e2d" strokeWidth="0.3"/>
          <path d="M 105 94 Q 108 92 112 96 Q 110 96 108 95 Q 106 95 105 94 Z" fill="rgba(34,100,40,0.7)" stroke="#2d6e2d" strokeWidth="0.3"/>
          <path d="M 92 90 Q 96 88 100 89 Q 104 88 108 90" fill="none" stroke="rgba(34,100,40,0.7)" strokeWidth="0.5"/>
          {/* Цветки в венке */}
          <circle cx="92" cy="91" r="1.6" fill="rgba(220,60,60,0.7)" stroke="#991b1b" strokeWidth="0.3"/>
          <circle cx="100" cy="89" r="1.6" fill="#ffd700" opacity="0.7" stroke="#b8860b" strokeWidth="0.3"/>
          <circle cx="108" cy="91" r="1.6" fill="rgba(220,180,200,0.7)" stroke="#991b1b" strokeWidth="0.3"/>
          {/* Лепестки */}
          <path d="M 90.5 90 Q 92 88 93.5 90" fill="none" stroke="rgba(220,60,60,0.5)" strokeWidth="0.3"/>
          <path d="M 98.5 87.5 Q 100 86 101.5 87.5" fill="none" stroke="#b8860b" strokeWidth="0.3"/>
          <path d="M 106.5 90 Q 108 88 109.5 90" fill="none" stroke="rgba(220,180,200,0.5)" strokeWidth="0.3"/>

          {/* Платье — белое с золотым растительным узором */}
          <path d="M 80 225 Q 82 195 86 175 Q 88 152 92 130 L 108 130 Q 112 152 114 175 Q 118 195 120 225 Q 100 230 80 225 Z"
            fill="rgba(245,230,200,0.35)" stroke="#b8860b" strokeWidth="0.6"/>
          {/* Складки платья */}
          <path d="M 88 140 Q 90 180 88 220" fill="none" stroke="rgba(180,140,70,0.35)" strokeWidth="0.4"/>
          <path d="M 100 140 Q 100 180 100 220" fill="none" stroke="rgba(180,140,70,0.35)" strokeWidth="0.4"/>
          <path d="M 112 140 Q 110 180 112 220" fill="none" stroke="rgba(180,140,70,0.35)" strokeWidth="0.4"/>

          {/* Золотой растительный узор на платье — переплетающийся */}
          <path d="M 84 155 Q 92 150 100 155 Q 108 150 116 155 Q 110 162 100 158 Q 90 162 84 155 Z" fill="none" stroke="#ffd700" strokeWidth="0.5" opacity="0.7"/>
          <path d="M 90 158 Q 92 156 94 158 Q 92 160 90 158 Z" fill="#ffd700" opacity="0.5"/>
          <path d="M 106 158 Q 108 156 110 158 Q 108 160 106 158 Z" fill="#ffd700" opacity="0.5"/>
          <path d="M 84 195 Q 92 190 100 195 Q 108 190 116 195 Q 110 202 100 198 Q 90 202 84 195 Z" fill="none" stroke="#ffd700" strokeWidth="0.5" opacity="0.7"/>
          <path d="M 88 220 Q 94 217 100 220 Q 106 217 112 220" fill="none" stroke="#ffd700" strokeWidth="0.4" opacity="0.6"/>

          {/* Золотой пояс с медальоном */}
          <path d="M 82 178 Q 100 175 118 178 L 118 184 Q 100 181 82 184 Z" fill="rgba(255,215,0,0.4)" stroke="#b8860b" strokeWidth="0.5"/>
          <circle cx="100" cy="181" r="3" fill="rgba(255,215,0,0.5)" stroke="#b8860b" strokeWidth="0.5"/>
          <path d="M 97 181 Q 100 178 103 181 Q 100 184 97 181 Z" fill="#991b1b" opacity="0.6"/>
          <circle cx="100" cy="181" r="0.6" fill="#ffd700"/>

          {/* Левая рука — на морде льва */}
          <path d="M 88 145 Q 78 165 65 178 Q 58 184 56 188" fill="none" stroke="rgba(232,200,160,0.9)" strokeWidth="3.5" strokeLinecap="round"/>
          <path d="M 88 145 Q 78 165 65 178 Q 58 184 56 188" fill="none" stroke="#8b5a2b" strokeWidth="0.4"/>
          {/* Ладонь */}
          <path d="M 52 188 Q 56 184 60 188 Q 58 192 54 193 Q 51 191 52 188 Z" fill="rgba(232,200,160,0.9)" stroke="#8b5a2b" strokeWidth="0.4"/>
          {/* Пальцы */}
          <path d="M 53 191 Q 52 195 54 197" fill="none" stroke="rgba(232,200,160,0.9)" strokeWidth="1.2"/>
          <path d="M 56 192 Q 56 196 58 198" fill="none" stroke="rgba(232,200,160,0.9)" strokeWidth="1.2"/>
          <path d="M 58 191 Q 59 195 60 197" fill="none" stroke="rgba(232,200,160,0.9)" strokeWidth="1.2"/>

          {/* Правая рука — опущена */}
          <path d="M 112 145 Q 118 165 120 195" fill="none" stroke="rgba(232,200,160,0.9)" strokeWidth="3" strokeLinecap="round"/>
          <path d="M 112 145 Q 118 165 120 195" fill="none" stroke="#8b5a2b" strokeWidth="0.4"/>
        </g>

        {/* ===== ЛЕВ — сказочный, с пышной золотой гривой ===== */}
        <g>
          {/* Тело — вытянутое, мощное */}
          <path d="M 42 218 Q 38 210 42 200 Q 50 195 60 196 Q 70 195 78 200 Q 82 210 80 218 Q 80 225 78 230 Q 70 232 60 232 Q 50 232 44 230 Q 40 225 42 218 Z"
            fill="rgba(184,134,11,0.5)" stroke="#5a3a20" strokeWidth="0.6"/>

          {/* Лапы передние — детальные с когтями */}
          <path d="M 48 228 L 46 245 L 52 245 L 50 228 Z" fill="rgba(184,134,11,0.55)" stroke="#5a3a20" strokeWidth="0.4"/>
          <path d="M 60 230 L 58 246 L 64 246 L 62 230 Z" fill="rgba(184,134,11,0.55)" stroke="#5a3a20" strokeWidth="0.4"/>
          {/* Когти */}
          <path d="M 46 244 L 45 247" fill="none" stroke="#3a2010" strokeWidth="0.5"/>
          <path d="M 49 244 L 49 247" fill="none" stroke="#3a2010" strokeWidth="0.5"/>
          <path d="M 52 244 L 53 247" fill="none" stroke="#3a2010" strokeWidth="0.5"/>
          <path d="M 58 245 L 57 248" fill="none" stroke="#3a2010" strokeWidth="0.5"/>
          <path d="M 61 245 L 61 248" fill="none" stroke="#3a2010" strokeWidth="0.5"/>
          <path d="M 64 245 L 65 248" fill="none" stroke="#3a2010" strokeWidth="0.5"/>

          {/* Лапы задние */}
          <path d="M 70 228 L 68 244 L 74 244 L 72 228 Z" fill="rgba(184,134,11,0.55)" stroke="#5a3a20" strokeWidth="0.4"/>
          <path d="M 78 226 L 76 244 L 82 244 L 80 226 Z" fill="rgba(184,134,11,0.55)" stroke="#5a3a20" strokeWidth="0.4"/>

          {/* Хвост — с кисточкой */}
          <path d="M 80 210 Q 90 215 95 225 Q 100 230 102 235" fill="none" stroke="#8b5a2b" strokeWidth="1.5" strokeLinecap="round"/>
          <ellipse cx="102" cy="235" rx="2" ry="3" fill="rgba(180,140,70,0.7)" stroke="#8b5a2b" strokeWidth="0.3"/>

          {/* Грива — пышная, ярусами золотых завитков */}
          <path d="M 32 210 Q 28 200 32 192 Q 28 195 30 188 Q 32 192 34 188 Q 32 195 36 192 Q 34 200 38 198 Q 36 205 40 203 Q 38 210 42 208 Q 40 215 44 213 Q 42 220 46 218 Q 44 225 48 223"
            fill="none" stroke="#ffd700" strokeWidth="1" opacity="0.6"/>
          <path d="M 30 215 Q 26 210 28 200 Q 32 195 38 196 Q 34 200 38 205 Q 34 208 38 212 Q 34 215 38 218 Q 34 220 38 224"
            fill="rgba(255,215,0,0.15)" stroke="#b8860b" strokeWidth="0.5"/>

          {/* Голова — детальная */}
          <path d="M 38 215 Q 32 210 34 202 Q 38 196 46 196 Q 54 196 56 202 Q 58 210 56 215 Q 54 220 50 222 Q 44 222 40 220 Q 36 218 38 215 Z"
            fill="rgba(232,200,160,0.55)" stroke="#5a3a20" strokeWidth="0.6"/>

          {/* Морда льва — выпуклая */}
          <path d="M 42 218 Q 40 212 44 210 Q 48 208 52 210 Q 56 212 54 218 Q 52 222 48 222 Q 44 222 42 218 Z"
            fill="rgba(232,200,160,0.7)" stroke="#5a3a20" strokeWidth="0.5"/>

          {/* Глаза льва — полуприкрытые, мирные */}
          <path d="M 38 207 Q 40 206 42 207 Q 42 208 40 208 Q 38 208 38 207 Z" fill="rgba(255,255,255,0.7)"/>
          <circle cx="40" cy="207.3" r="0.8" fill="#3a2010"/>
          <path d="M 38 207 Q 40 206.5 42 207" fill="none" stroke="#3a2010" strokeWidth="0.4"/>

          {/* Нос льва — крупный, тёмный */}
          <path d="M 44 215 Q 46 213 48 215 Q 48 217 46 217 Q 44 217 44 215 Z" fill="rgba(80,40,20,0.7)" stroke="#3a2010" strokeWidth="0.3"/>

          {/* Рот льва — приоткрытый мягко */}
          <path d="M 44 219 Q 46 220 48 219" fill="none" stroke="#3a2010" strokeWidth="0.4"/>
          <path d="M 46 219 L 46 221" fill="none" stroke="#3a2010" strokeWidth="0.3"/>

          {/* Усы */}
          <path d="M 42 217 Q 36 218 32 220" fill="none" stroke="rgba(232,200,160,0.6)" strokeWidth="0.3"/>
          <path d="M 42 219 Q 36 220 32 222" fill="none" stroke="rgba(232,200,160,0.6)" strokeWidth="0.3"/>
          <path d="M 50 217 Q 56 218 60 220" fill="none" stroke="rgba(232,200,160,0.6)" strokeWidth="0.3"/>
          <path d="M 50 219 Q 56 220 60 222" fill="none" stroke="rgba(232,200,160,0.6)" strokeWidth="0.3"/>

          {/* Уши — маленькие, округлые */}
          <path d="M 48 198 Q 50 195 52 198 Q 50 200 48 198 Z" fill="rgba(184,134,11,0.6)" stroke="#5a3a20" strokeWidth="0.3"/>
        </g>

        {/* Цветы на поляне — детальные */}
        <g>
          <circle cx="125" cy="240" r="2" fill="rgba(220,60,60,0.7)" stroke="#991b1b" strokeWidth="0.3"/>
          <path d="M 123 240 Q 125 238 127 240 Q 125 242 123 240" fill="rgba(255,180,180,0.5)"/>
          <path d="M 125 240 L 125 245" fill="none" stroke="#2d6e2d" strokeWidth="0.5"/>
          <path d="M 124 243 Q 122 242 122 244" fill="none" stroke="#2d6e2d" strokeWidth="0.3"/>

          <circle cx="140" cy="235" r="1.8" fill="#ffd700" opacity="0.7" stroke="#b8860b" strokeWidth="0.3"/>
          <path d="M 138.5 234 Q 140 232 141.5 234 Q 140 236 138.5 234" fill="rgba(255,235,150,0.6)"/>
          <path d="M 140 235 L 140 240" fill="none" stroke="#2d6e2d" strokeWidth="0.5"/>

          <circle cx="155" cy="242" r="1.8" fill="rgba(220,180,200,0.7)" stroke="#991b1b" strokeWidth="0.3"/>
          <path d="M 153.5 241 Q 155 239 156.5 241 Q 155 243 153.5 241" fill="rgba(255,220,230,0.5)"/>
          <path d="M 155 242 L 155 247" fill="none" stroke="#2d6e2d" strokeWidth="0.5"/>
        </g>
      </g>
    ),

    // IX. ОТШЕЛЬНИК — сказочный старец с фонарём в лесу
    "major-9": (
      <g>
        {/* Тёмный ночной лес — сумеречный */}
        <rect x="14" y="42" width="172" height="208" fill="rgba(20,30,15,0.18)" rx="2"/>
        {/* Луна — узкий серп */}
        <path d="M 45 60 Q 38 65 40 75 Q 50 70 50 60 Q 50 55 45 60 Z" fill="rgba(240,235,200,0.5)" stroke="#b8860b" strokeWidth="0.4"/>
        <path d="M 44 60 Q 41 65 42 72" fill="none" stroke="rgba(180,140,70,0.4)" strokeWidth="0.3"/>

        {/* Звёзды */}
        <circle cx="80" cy="55" r="0.8" fill="#ffd700" opacity="0.7"/>
        <circle cx="120" cy="50" r="0.6" fill="#ffd700" opacity="0.6"/>
        <circle cx="160" cy="58" r="0.7" fill="#ffd700" opacity="0.7"/>
        <circle cx="100" cy="48" r="0.5" fill="#ffd700" opacity="0.5"/>

        {/* Деревья — детальные резные стволы с морщинами коры */}
        <path d="M 18 250 L 18 60 Q 19 50 22 44 L 24 40 L 26 44 Q 29 50 30 60 L 30 250 Z" fill="rgba(50,35,20,0.6)" stroke="#3a2010" strokeWidth="0.5"/>
        {/* Кора — вертикальные морщины */}
        <path d="M 20 80 Q 21 130 20 200" fill="none" stroke="#3a2010" strokeWidth="0.3"/>
        <path d="M 24 70 Q 25 140 24 210" fill="none" stroke="#3a2010" strokeWidth="0.3"/>
        <path d="M 28 90 Q 28 150 27 220" fill="none" stroke="#3a2010" strokeWidth="0.3"/>
        {/* Ветви */}
        <path d="M 22 90 Q 14 85 8 95" fill="none" stroke="#3a2010" strokeWidth="0.8"/>
        <path d="M 26 110 Q 32 105 38 115" fill="none" stroke="#3a2010" strokeWidth="0.7"/>
        {/* Крона — пышная тёмная */}
        <path d="M 6 100 Q 14 75 24 88 Q 16 70 28 78 Q 22 60 34 75 Q 28 70 32 92 Q 22 95 14 92 Q 8 95 6 100 Z" fill="rgba(20,50,20,0.6)" stroke="#1e1e50" strokeWidth="0.3"/>
        <path d="M 4 130 Q 12 105 22 120 Q 14 110 26 115 Q 18 100 30 115 Q 22 110 34 128 Q 24 130 14 128 Q 6 130 4 130 Z" fill="rgba(20,50,20,0.55)" stroke="#1e1e50" strokeWidth="0.3"/>

        <path d="M 170 250 L 170 55 Q 171 45 174 39 L 176 35 L 178 39 Q 181 45 182 55 L 182 250 Z" fill="rgba(50,35,20,0.6)" stroke="#3a2010" strokeWidth="0.5"/>
        <path d="M 172 75 Q 173 135 172 195" fill="none" stroke="#3a2010" strokeWidth="0.3"/>
        <path d="M 176 65 Q 177 140 176 205" fill="none" stroke="#3a2010" strokeWidth="0.3"/>
        <path d="M 180 85 Q 180 150 179 215" fill="none" stroke="#3a2010" strokeWidth="0.3"/>
        <path d="M 178 95 Q 184 90 190 100" fill="none" stroke="#3a2010" strokeWidth="0.7"/>
        <path d="M 174 115 Q 168 110 162 120" fill="none" stroke="#3a2010" strokeWidth="0.7"/>
        <path d="M 162 95 Q 170 70 180 83 Q 172 65 184 73 Q 178 55 190 70 Q 184 65 188 87 Q 178 90 170 87 Q 164 90 162 95 Z" fill="rgba(20,50,20,0.6)" stroke="#1e1e50" strokeWidth="0.3"/>
        <path d="M 160 125 Q 168 100 178 115 Q 170 105 182 110 Q 174 95 186 110 Q 178 105 190 123 Q 180 125 170 123 Q 162 125 160 125 Z" fill="rgba(20,50,20,0.55)" stroke="#1e1e50" strokeWidth="0.3"/>

        {/* Деревья вдалеке */}
        <path d="M 50 250 L 50 100 Q 51 90 54 85 L 56 82 L 58 85 Q 61 90 62 100 L 62 250 Z" fill="rgba(40,30,15,0.4)" stroke="#3a2010" strokeWidth="0.3"/>
        <path d="M 44 110 Q 50 95 56 105 Q 50 100 58 105 Q 52 95 60 110 Q 52 112 46 110 Q 42 112 44 110 Z" fill="rgba(20,50,20,0.4)" stroke="#1e1e50" strokeWidth="0.2"/>
        <path d="M 140 250 L 140 95 Q 141 85 144 80 L 146 77 L 148 80 Q 151 85 152 95 L 152 250 Z" fill="rgba(40,30,15,0.4)" stroke="#3a2010" strokeWidth="0.3"/>
        <path d="M 134 105 Q 140 90 146 100 Q 140 95 148 100 Q 142 90 150 105 Q 142 107 136 105 Q 132 107 134 105 Z" fill="rgba(20,50,20,0.4)" stroke="#1e1e50" strokeWidth="0.2"/>

        {/* Земля — поросшая мхом */}
        <path d="M 14 210 Q 50 205 100 210 Q 150 205 186 210 L 186 250 L 14 250 Z" fill="rgba(50,55,30,0.3)" stroke="#3a2010" strokeWidth="0.3"/>
        {/* Камни на земле */}
        <path d="M 25 235 Q 22 230 25 226 Q 30 224 33 228 Q 35 233 32 236 Q 28 238 25 235 Z" fill="rgba(80,70,55,0.4)" stroke="#5a3a20" strokeWidth="0.3"/>
        <path d="M 165 240 Q 162 234 166 230 Q 172 228 174 233 Q 175 238 171 240 Q 167 242 165 240 Z" fill="rgba(80,70,55,0.4)" stroke="#5a3a20" strokeWidth="0.3"/>
        {/* Травинки */}
        <path d="M 60 230 Q 62 222 64 230" fill="none" stroke="#2d6e2d" strokeWidth="0.4" opacity="0.7"/>
        <path d="M 130 232 Q 132 224 134 232" fill="none" stroke="#2d6e2d" strokeWidth="0.4" opacity="0.7"/>

        {/* ===== СТАРЕЦ-ОТШЕЛЬНИК ===== */}
        <g className="svg-breathe" style={{ transformOrigin: "100px 170px" }}>
          {/* Мантия — длинная, серо-коричневая, складки */}
          <path d="M 76 235 Q 78 200 82 175 Q 84 150 88 130 L 112 130 Q 116 150 118 175 Q 122 200 124 235 Q 100 240 76 235 Z"
            fill="rgba(80,70,60,0.55)" stroke="#3a2010" strokeWidth="0.6"/>
          {/* Складки мантии */}
          <path d="M 84 145 Q 86 190 84 230" fill="none" stroke="rgba(40,30,20,0.5)" strokeWidth="0.4"/>
          <path d="M 92 145 Q 94 190 92 230" fill="none" stroke="rgba(40,30,20,0.4)" strokeWidth="0.3"/>
          <path d="M 100 145 Q 100 190 100 230" fill="none" stroke="rgba(40,30,20,0.4)" strokeWidth="0.3"/>
          <path d="M 108 145 Q 106 190 108 230" fill="none" stroke="rgba(40,30,20,0.4)" strokeWidth="0.3"/>
          <path d="M 116 145 Q 114 190 116 230" fill="none" stroke="rgba(40,30,20,0.5)" strokeWidth="0.4"/>

          {/* Золотой растительный узор на мантии */}
          <path d="M 86 160 Q 94 156 100 160 Q 106 156 114 160 Q 108 166 100 162 Q 92 166 86 160 Z" fill="none" stroke="#ffd700" strokeWidth="0.4" opacity="0.6"/>
          <path d="M 86 195 Q 94 191 100 195 Q 106 191 114 195 Q 108 201 100 197 Q 92 201 86 195 Z" fill="none" stroke="#ffd700" strokeWidth="0.4" opacity="0.6"/>
          <path d="M 88 220 Q 94 217 100 220 Q 106 217 112 220" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.5"/>

          {/* Пояс — верёвочный */}
          <path d="M 82 175 Q 100 173 118 175 L 118 180 Q 100 178 82 180 Z" fill="rgba(120,90,50,0.6)" stroke="#5a3a20" strokeWidth="0.4"/>
          {/* Узел пояса */}
          <circle cx="100" cy="177" r="2" fill="rgba(120,90,50,0.7)" stroke="#5a3a20" strokeWidth="0.3"/>
          <path d="M 98 179 Q 96 183 94 181" fill="none" stroke="rgba(120,90,50,0.6)" strokeWidth="0.5"/>
          <path d="M 102 179 Q 104 183 106 181" fill="none" stroke="rgba(120,90,50,0.6)" strokeWidth="0.5"/>

          {/* Шея */}
          <path d="M 96 118 L 96 128 L 104 128 L 104 118 Z" fill="rgba(232,200,160,0.85)" stroke="#8b5a2b" strokeWidth="0.3"/>

          {/* Капюшон — большой, нависающий */}
          <path d="M 82 110 Q 78 85 90 75 Q 100 70 110 75 Q 122 85 118 110 Q 116 118 112 120 L 88 120 Q 84 118 82 110 Z"
            fill="rgba(60,50,45,0.7)" stroke="#3a2010" strokeWidth="0.6"/>
          {/* Тень от капюшона на лице */}
          <path d="M 88 105 Q 90 95 100 92 Q 110 95 112 105 Q 108 100 100 98 Q 92 100 88 105 Z" fill="rgba(20,15,10,0.3)"/>

          {/* Лицо — старческое, морщинистое */}
          <path d="M 93 110 Q 91 102 94 96 Q 97 92 100 91 Q 103 92 106 96 Q 109 102 107 110 Q 108 116 106 120 Q 103 124 100 124 Q 97 124 94 120 Q 92 116 93 110 Z"
            fill="rgba(232,200,160,0.85)" stroke="#8b5a2b" strokeWidth="0.4"/>

          {/* Морщины на лбу */}
          <path d="M 95 100 Q 100 99 105 100" fill="none" stroke="rgba(120,80,40,0.5)" strokeWidth="0.3"/>
          <path d="M 95 103 Q 100 102 105 103" fill="none" stroke="rgba(120,80,40,0.4)" strokeWidth="0.3"/>

          {/* Брови — седые, густые */}
          <path d="M 93 106 Q 95 104 97 105 Q 96 107 94 107 Z" fill="rgba(220,220,225,0.7)" stroke="#5a3a20" strokeWidth="0.2"/>
          <path d="M 103 105 Q 105 104 107 106 Q 106 107 104 107 Z" fill="rgba(220,220,225,0.7)" stroke="#5a3a20" strokeWidth="0.2"/>

          {/* Глаза — мудрые, полуоткрытые */}
          <path d="M 93 109 Q 95 108 97 109 Q 97 110 95 111 Q 93 110 93 109 Z" fill="rgba(255,255,255,0.7)"/>
          <path d="M 103 109 Q 105 108 107 109 Q 107 110 105 111 Q 103 110 103 109 Z" fill="rgba(255,255,255,0.7)"/>
          <circle cx="95" cy="109.5" r="0.8" fill="#3a2010"/>
          <circle cx="105" cy="109.5" r="0.8" fill="#3a2010"/>
          {/* Мешки под глазами */}
          <path d="M 93 112 Q 95 113 97 112" fill="none" stroke="rgba(120,80,40,0.4)" strokeWidth="0.3"/>
          <path d="M 103 112 Q 105 113 107 112" fill="none" stroke="rgba(120,80,40,0.4)" strokeWidth="0.3"/>

          {/* Нос — длинный, с горбинкой */}
          <path d="M 100 112 L 99 118 Q 98 119 99 120 Q 100 121 101 120 Q 102 119 101 118 Z" fill="none" stroke="#8b5a2b" strokeWidth="0.4" strokeLinecap="round"/>
          {/* Ноздри */}
          <path d="M 98.5 120 Q 99 121 99.5 120" fill="none" stroke="#5a3a20" strokeWidth="0.2"/>
          <path d="M 100.5 120 Q 101 121 101.5 120" fill="none" stroke="#5a3a20" strokeWidth="0.2"/>

          {/* Седая борода — длинная, струящаяся */}
          <path d="M 93 120 Q 90 130 92 145 Q 94 160 96 175 Q 98 180 100 180 Q 102 180 104 175 Q 106 160 108 145 Q 110 130 107 120 Q 105 124 100 124 Q 95 124 93 120 Z"
            fill="rgba(220,220,225,0.65)" stroke="#8b5a2b" strokeWidth="0.4"/>
          {/* Пряди бороды */}
          <path d="M 95 125 Q 94 145 96 170" fill="none" stroke="rgba(180,180,185,0.6)" strokeWidth="0.4"/>
          <path d="M 100 125 Q 100 150 100 175" fill="none" stroke="rgba(180,180,185,0.6)" strokeWidth="0.4"/>
          <path d="M 105 125 Q 106 145 104 170" fill="none" stroke="rgba(180,180,185,0.6)" strokeWidth="0.4"/>
          {/* Усы */}
          <path d="M 94 120 Q 96 122 100 121 Q 104 122 106 120" fill="rgba(220,220,225,0.7)" stroke="#8b5a2b" strokeWidth="0.3"/>

          {/* Руки — старческие, морщинистые */}
          {/* Левая рука — держит посох */}
          <path d="M 90 150 Q 84 175 78 200" fill="none" stroke="rgba(232,200,160,0.85)" strokeWidth="3" strokeLinecap="round"/>
          {/* Правая рука — с фонарём */}
          <path d="M 110 150 Q 116 165 120 180" fill="none" stroke="rgba(232,200,160,0.85)" strokeWidth="3" strokeLinecap="round"/>
        </g>

        {/* ===== ПОСОХ — деревянный, резной, с навершием ===== */}
        <g>
          <path d="M 78 200 L 76 90 Q 76 86 78 86 Q 80 86 80 90 L 80 200 Z" fill="rgba(80,55,30,0.85)" stroke="#3a2010" strokeWidth="0.5"/>
          {/* Резьба на посохе */}
          <path d="M 76 100 Q 80 102 76 104" fill="none" stroke="#3a2010" strokeWidth="0.3"/>
          <path d="M 76 130 Q 80 132 76 134" fill="none" stroke="#3a2010" strokeWidth="0.3"/>
          <path d="M 76 160 Q 80 162 76 164" fill="none" stroke="#3a2010" strokeWidth="0.3"/>
          {/* Навершие — золотой кристалл */}
          <path d="M 73 88 L 76 80 L 79 88 L 78 92 L 74 92 Z" fill="rgba(255,215,0,0.4)" stroke="#b8860b" strokeWidth="0.4"/>
          <circle cx="76.5" cy="86" r="1.5" fill="rgba(255,235,150,0.6)" stroke="#b8860b" strokeWidth="0.3"/>
          <path d="M 76 82 L 76 88" fill="none" stroke="#ffd700" strokeWidth="0.3"/>
        </g>

        {/* ===== ФОНАРЬ — резной, золотой, светящийся ===== */}
        <g>
          {/* Подвеска */}
          <path d="M 122 100 L 124 110 L 120 110 Z" fill="rgba(80,55,30,0.8)" stroke="#3a2010" strokeWidth="0.3"/>
          {/* Корпус фонаря — резной */}
          <path d="M 117 110 L 117 130 L 129 130 L 129 110 Q 129 108 127 108 L 119 108 Q 117 108 117 110 Z" fill="rgba(80,55,30,0.7)" stroke="#3a2010" strokeWidth="0.5"/>
          {/* Стёкла фонаря — 4 грани */}
          <path d="M 118 112 L 122 112 L 122 128 L 118 128 Z" fill="rgba(255,200,80,0.4)" stroke="#b8860b" strokeWidth="0.3"/>
          <path d="M 124 112 L 128 112 L 128 128 L 124 128 Z" fill="rgba(255,200,80,0.4)" stroke="#b8860b" strokeWidth="0.3"/>
          {/* Свечение — вокруг фонаря */}
          <circle cx="123" cy="120" r="14" fill="rgba(255,215,0,0.12)" stroke="none"/>
          <circle cx="123" cy="120" r="9" fill="rgba(255,200,80,0.18)" stroke="none"/>
          <circle cx="123" cy="120" r="5" fill="rgba(255,235,150,0.5)" stroke="none"/>
          {/* Пламя свечи внутри */}
          <path d="M 123 124 Q 121 121 122 118 Q 123 115 124 118 Q 125 121 123 124 Z" fill="rgba(255,180,40,0.8)"/>
          <path d="M 123 123 Q 122 121 123 119 Q 124 121 123 123 Z" fill="rgba(255,235,180,0.7)"/>

          {/* Декоративные узоры на корпусе */}
          <path d="M 117 110 Q 123 108 129 110" fill="none" stroke="#ffd700" strokeWidth="0.4" opacity="0.7"/>
          <path d="M 117 130 Q 123 132 129 130" fill="none" stroke="#ffd700" strokeWidth="0.4" opacity="0.7"/>
          {/* Шпиль сверху */}
          <path d="M 123 100 L 121 108 L 125 108 Z" fill="rgba(255,215,0,0.5)" stroke="#b8860b" strokeWidth="0.3"/>
          <circle cx="123" cy="100" r="0.8" fill="#ffd700"/>
        </g>
      </g>
    ),

    // X. КОЛЕСО ФОРТУНЫ — сказовое колесо с рунами
    "major-10": (
      <g>
        {/* Фон — закатное небо с Ochre */}
        <rect x="14" y="42" width="172" height="208" fill="rgba(204,153,51,0.08)" rx="2"/>
        {/* Облака — васнецовские резные */}
        <path d="M 25 65 Q 35 60 45 65 Q 55 60 65 65 Q 60 70 50 68 Q 40 72 30 67 Q 22 68 25 65 Z" fill="rgba(255,255,255,0.1)"/>
        <path d="M 130 60 Q 140 55 150 60 Q 165 57 175 62 Q 168 68 158 65 Q 148 70 138 66 Q 128 67 130 60 Z" fill="rgba(255,255,255,0.1)"/>
        <path d="M 70 80 Q 80 76 90 80 Q 88 84 80 83 Q 72 84 70 80 Z" fill="rgba(255,255,255,0.08)"/>

        {/* Лучи света от колеса */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(deg => {
          const rad = deg * Math.PI / 180
          return <line key={deg} x1={100} y1={155} x2={100 + Math.cos(rad) * 80} y2={155 + Math.sin(rad) * 80} stroke="rgba(255,215,0,0.08)" strokeWidth="0.5"/>
        })}

        {/* Дальние холмы */}
        <path d="M 14 230 Q 50 222 100 226 Q 150 222 186 230 L 186 250 L 14 250 Z" fill="rgba(120,80,40,0.2)" stroke="#5a3a20" strokeWidth="0.3"/>

        {/* ===== КОЛЕСО ФОРТУНЫ — резное, золотое, детальное ===== */}
        {/* Внешний обод — широкий, с золотом */}
        <circle cx="100" cy="155" r="48" fill="none" stroke="#b8860b" strokeWidth="3"/>
        <circle cx="100" cy="155" r="48" fill="none" stroke="#ffd700" strokeWidth="0.5" opacity="0.7"/>
        {/* Средний обод — с резьбой */}
        <circle cx="100" cy="155" r="42" fill="none" stroke="#8b5a2b" strokeWidth="1.2"/>
        <circle cx="100" cy="155" r="38" fill="rgba(184,134,11,0.15)" stroke="#5a3a20" strokeWidth="0.6"/>
        {/* Внутренний круг — центр колеса */}
        <circle cx="100" cy="155" r="14" fill="rgba(184,134,11,0.35)" stroke="#b8860b" strokeWidth="1"/>
        <circle cx="100" cy="155" r="10" fill="rgba(120,80,40,0.3)" stroke="#5a3a20" strokeWidth="0.4"/>

        {/* Спицы — резные, с украшениями */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => {
          const rad = deg * Math.PI / 180
          return (
            <g key={deg}>
              <line x1={100 + Math.cos(rad) * 14} y1={155 + Math.sin(rad) * 14} x2={100 + Math.cos(rad) * 42} y2={155 + Math.sin(rad) * 42} stroke="#5a3a20" strokeWidth="1.5"/>
              <line x1={100 + Math.cos(rad) * 14} y1={155 + Math.sin(rad) * 14} x2={100 + Math.cos(rad) * 42} y2={155 + Math.sin(rad) * 42} stroke="#ffd700" strokeWidth="0.4" opacity="0.5"/>
              {/* Декор на спице */}
              <circle cx={100 + Math.cos(rad) * 28} cy={155 + Math.sin(rad) * 28} r="1.5" fill="rgba(255,215,0,0.5)" stroke="#b8860b" strokeWidth="0.3"/>
            </g>
          )
        })}

        {/* Руны на ободе */}
        {["ᚠ", "ᚢ", "ᚦ", "ᚨ", "ᚱ", "ᚲ", "ᚷ", "ᚹ"].map((rune, i) => {
          const a = (i / 8) * Math.PI * 2 - Math.PI / 2
          return <text key={i} x={100 + Math.cos(a) * 45} y={155 + Math.sin(a) * 45 + 2} fontSize="5" textAnchor="middle" fill="#ffd700" opacity="0.85" fontWeight="bold">{rune}</text>
        })}

        {/* Центральный медальон — символ солнца */}
        <circle cx="100" cy="155" r="6" fill="rgba(255,215,0,0.4)" stroke="#b8860b" strokeWidth="0.5"/>
        <path d="M 97 155 Q 100 150 103 155 Q 100 160 97 155 Z" fill="#991b1b" opacity="0.7"/>
        <circle cx="100" cy="155" r="1.5" fill="#ffd700"/>

        {/* ===== СФИНКС — на вершине колеса ===== */}
        <g>
          {/* Тело сфинкса — лежащее */}
          <path d="M 90 115 Q 88 110 90 105 Q 95 102 105 102 Q 112 102 114 108 Q 116 113 114 118 Q 108 120 100 119 Q 92 119 90 115 Z"
            fill="rgba(184,134,11,0.55)" stroke="#5a3a20" strokeWidth="0.5"/>
          {/* Голова сфинкса — женская с убором */}
          <path d="M 96 105 Q 94 99 96 95 Q 99 92 102 92 Q 105 92 107 95 Q 109 99 107 105 Q 108 108 106 110 Q 103 112 100 112 Q 97 112 95 110 Q 94 108 96 105 Z"
            fill="rgba(232,200,160,0.7)" stroke="#5a3a20" strokeWidth="0.5"/>
          {/* Лицо сфинкса */}
          <circle cx="99" cy="100" r="0.4" fill="#3a2010"/>
          <circle cx="103" cy="100" r="0.4" fill="#3a2010"/>
          <path d="M 100 104 Q 101 105 102 104" fill="none" stroke="#991b1b" strokeWidth="0.3"/>
          {/* Убор сфинкса — золотой, с орлом */}
          <path d="M 94 96 Q 96 92 100 91 Q 104 92 106 96 Q 104 95 100 94 Q 96 95 94 96 Z" fill="rgba(255,215,0,0.5)" stroke="#b8860b" strokeWidth="0.4"/>
          <path d="M 99 91 L 100 88 L 101 91 Z" fill="#ffd700"/>
          {/* Лапы */}
          <path d="M 92 116 L 90 120 L 94 120 Z" fill="rgba(184,134,11,0.6)" stroke="#5a3a20" strokeWidth="0.3"/>
          <path d="M 110 117 L 108 121 L 112 121 Z" fill="rgba(184,134,11,0.6)" stroke="#5a3a20" strokeWidth="0.3"/>
        </g>

        {/* ===== ЗМЕЙ — обвивается вокруг колеса снизу ===== */}
        <g>
          {/* Тело змея — S-образное */}
          <path d="M 60 200 Q 75 190 90 200 Q 105 210 120 200 Q 135 190 145 200 Q 150 205 148 212"
            fill="none" stroke="rgba(80,60,40,0.7)" strokeWidth="3" strokeLinecap="round"/>
          <path d="M 60 200 Q 75 190 90 200 Q 105 210 120 200 Q 135 190 145 200 Q 150 205 148 212"
            fill="none" stroke="#3a2010" strokeWidth="0.5"/>
          {/* Чешуйчатый узор */}
          <path d="M 70 198 Q 72 196 74 198" fill="none" stroke="rgba(255,215,0,0.4)" strokeWidth="0.3"/>
          <path d="M 85 199 Q 87 197 89 199" fill="none" stroke="rgba(255,215,0,0.4)" strokeWidth="0.3"/>
          <path d="M 100 201 Q 102 199 104 201" fill="none" stroke="rgba(255,215,0,0.4)" strokeWidth="0.3"/>
          <path d="M 115 199 Q 117 197 119 199" fill="none" stroke="rgba(255,215,0,0.4)" strokeWidth="0.3"/>
          <path d="M 130 197 Q 132 195 134 197" fill="none" stroke="rgba(255,215,0,0.4)" strokeWidth="0.3"/>
          {/* Голова змея */}
          <path d="M 148 212 Q 152 213 154 215 Q 154 218 150 218 Q 147 216 148 212 Z"
            fill="rgba(80,60,40,0.8)" stroke="#3a2010" strokeWidth="0.5"/>
          <circle cx="151" cy="214" r="0.6" fill="#ffd700"/>
          {/* Язык */}
          <path d="M 154 216 L 156 215 L 156 217" fill="none" stroke="#991b1b" strokeWidth="0.4"/>
          {/* Хвост */}
          <path d="M 60 200 Q 55 200 52 198 Q 50 195 52 192" fill="none" stroke="rgba(80,60,40,0.7)" strokeWidth="2.5" strokeLinecap="round"/>
        </g>

        {/* ===== СФИНКС СОБАКА (Анубис) — слева ===== */}
        <g>
          {/* Тело — лежащее */}
          <path d="M 38 220 Q 35 215 38 210 Q 45 208 55 210 Q 60 213 58 220 Q 50 224 42 222 Q 36 222 38 220 Z"
            fill="rgba(60,40,30,0.65)" stroke="#3a2010" strokeWidth="0.5"/>
          {/* Голова — собачья, с длинными ушами */}
          <path d="M 40 215 Q 38 210 40 205 Q 44 202 48 204 Q 50 208 49 213 Q 48 216 44 217 Q 41 217 40 215 Z"
            fill="rgba(60,40,30,0.7)" stroke="#3a2010" strokeWidth="0.5"/>
          {/* Уши — длинные, остроконечные */}
          <path d="M 39 207 Q 36 200 38 196 L 41 204 Z" fill="rgba(60,40,30,0.8)" stroke="#3a2010" strokeWidth="0.4"/>
          <path d="M 47 205 Q 50 200 49 195 L 46 203 Z" fill="rgba(60,40,30,0.8)" stroke="#3a2010" strokeWidth="0.4"/>
          {/* Глаза */}
          <circle cx="42" cy="211" r="0.5" fill="#ffd700"/>
          {/* Нос */}
          <path d="M 40 213 Q 41 214 42 213" fill="rgba(20,15,10,0.7)"/>
          {/* Лапы */}
          <path d="M 52 220 L 50 224 L 54 224 Z" fill="rgba(60,40,30,0.7)" stroke="#3a2010" strokeWidth="0.3"/>
          <path d="M 56 220 L 54 224 L 58 224 Z" fill="rgba(60,40,30,0.7)" stroke="#3a2010" strokeWidth="0.3"/>
          {/* Хвост */}
          <path d="M 58 215 Q 65 210 68 215" fill="none" stroke="rgba(60,40,30,0.7)" strokeWidth="2" strokeLinecap="round"/>
        </g>

        {/* ===== СФИНКС КОШКА (Бастет) — справа ===== */}
        <g>
          {/* Тело — лежащее */}
          <path d="M 142 220 Q 140 215 142 210 Q 148 208 158 210 Q 162 213 160 220 Q 154 224 146 222 Q 140 222 142 220 Z"
            fill="rgba(220,200,160,0.55)" stroke="#8b5a2b" strokeWidth="0.5"/>
          {/* Голова — кошачья */}
          <path d="M 152 215 Q 150 210 152 205 Q 156 202 160 204 Q 162 208 161 213 Q 160 216 156 217 Q 153 217 152 215 Z"
            fill="rgba(232,200,160,0.75)" stroke="#8b5a2b" strokeWidth="0.5"/>
          {/* Уши — кошачьи, треугольные */}
          <path d="M 152 207 L 150 200 L 154 204 Z" fill="rgba(232,200,160,0.75)" stroke="#8b5a2b" strokeWidth="0.3"/>
          <path d="M 159 205 L 161 200 L 162 205 Z" fill="rgba(232,200,160,0.75)" stroke="#8b5a2b" strokeWidth="0.3"/>
          {/* Внутренность ушей */}
          <path d="M 152 204 L 151 201 L 153 203 Z" fill="rgba(180,60,60,0.5)"/>
          <path d="M 160 203 L 161 201 L 161 204 Z" fill="rgba(180,60,60,0.5)"/>
          {/* Глаза — кошачьи, с вертикальным зрачком */}
          <ellipse cx="155" cy="211" rx="0.8" ry="0.6" fill="#ffd700"/>
          <ellipse cx="159" cy="211" rx="0.8" ry="0.6" fill="#ffd700"/>
          <path d="M 155 211 L 155 211" stroke="#3a2010" strokeWidth="0.3"/>
          {/* Нос */}
          <path d="M 156 213 Q 157 214 158 213" fill="rgba(180,60,60,0.6)"/>
          {/* Лапы */}
          <path d="M 144 220 L 142 224 L 146 224 Z" fill="rgba(220,200,160,0.7)" stroke="#8b5a2b" strokeWidth="0.3"/>
          <path d="M 148 220 L 146 224 L 150 224 Z" fill="rgba(220,200,160,0.7)" stroke="#8b5a2b" strokeWidth="0.3"/>
          {/* Хвост — длинный, загнутый */}
          <path d="M 160 215 Q 168 213 170 218 Q 172 222 168 225" fill="none" stroke="rgba(220,200,160,0.7)" strokeWidth="2" strokeLinecap="round"/>
        </g>

        {/* Декоративные завитки — васнецовские */}
        <path d="M 25 100 Q 30 95 35 100 Q 30 105 25 100 Z" fill="none" stroke="rgba(255,215,0,0.3)" strokeWidth="0.4"/>
        <path d="M 165 100 Q 170 95 175 100 Q 170 105 165 100 Z" fill="none" stroke="rgba(255,215,0,0.3)" strokeWidth="0.4"/>
      </g>
    ),

    // XI. СПРАВЕДЛИВОСТЬ — сказочный судья с мечом и весами
    "major-11": (
      <g>
        {/* Храмовый фон — арка с резными колоннами */}
        <path d="M 24 250 L 24 80 Q 24 50 56 50 L 144 50 Q 176 50 176 80 L 176 250 Z" fill="rgba(30,20,50,0.1)" stroke="#b8860b" strokeWidth="0.4" opacity="0.4"/>

        {/* Колонны резные — детальные */}
        <path d="M 28 250 L 28 80 L 36 80 L 36 250 Z" fill="rgba(80,55,30,0.35)" stroke="#5a3a20" strokeWidth="0.4"/>
        {/* Капитель колонны */}
        <path d="M 26 80 L 38 80 L 38 75 Q 36 73 32 73 Q 28 73 26 75 Z" fill="rgba(184,134,11,0.4)" stroke="#b8860b" strokeWidth="0.5"/>
        {/* База колонны */}
        <path d="M 26 245 L 38 245 L 38 250 L 26 250 Z" fill="rgba(184,134,11,0.4)" stroke="#b8860b" strokeWidth="0.5"/>
        {/* Резьба на колонне — вертикальные каннелюры */}
        <path d="M 30 90 L 30 240" fill="none" stroke="#5a3a20" strokeWidth="0.3"/>
        <path d="M 32 90 L 32 240" fill="none" stroke="#5a3a20" strokeWidth="0.3"/>
        <path d="M 34 90 L 34 240" fill="none" stroke="#5a3a20" strokeWidth="0.3"/>
        {/* Завитки на капители */}
        <path d="M 27 76 Q 30 73 33 76 Q 30 79 27 76 Z" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.6"/>
        <path d="M 35 76 Q 38 73 37 76 Q 35 79 35 76 Z" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.6"/>

        {/* Правая колонна */}
        <path d="M 164 250 L 164 80 L 172 80 L 172 250 Z" fill="rgba(80,55,30,0.35)" stroke="#5a3a20" strokeWidth="0.4"/>
        <path d="M 162 80 L 174 80 L 174 75 Q 172 73 168 73 Q 164 73 162 75 Z" fill="rgba(184,134,11,0.4)" stroke="#b8860b" strokeWidth="0.5"/>
        <path d="M 162 245 L 174 245 L 174 250 L 162 250 Z" fill="rgba(184,134,11,0.4)" stroke="#b8860b" strokeWidth="0.5"/>
        <path d="M 166 90 L 166 240" fill="none" stroke="#5a3a20" strokeWidth="0.3"/>
        <path d="M 168 90 L 168 240" fill="none" stroke="#5a3a20" strokeWidth="0.3"/>
        <path d="M 170 90 L 170 240" fill="none" stroke="#5a3a20" strokeWidth="0.3"/>
        <path d="M 163 76 Q 166 73 169 76 Q 166 79 163 76 Z" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.6"/>
        <path d="M 171 76 Q 174 73 173 76 Q 171 79 171 76 Z" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.6"/>

        {/* Арка над колоннами — резная */}
        <path d="M 24 80 Q 24 50 56 50 L 144 50 Q 176 50 176 80" fill="none" stroke="#b8860b" strokeWidth="0.8"/>
        {/* Декор арки — золотые завитки */}
        <path d="M 40 60 Q 50 55 60 60 Q 55 65 50 62 Q 45 65 40 60 Z" fill="none" stroke="#ffd700" strokeWidth="0.4" opacity="0.5"/>
        <path d="M 140 60 Q 150 55 160 60 Q 155 65 150 62 Q 145 65 140 60 Z" fill="none" stroke="#ffd700" strokeWidth="0.4" opacity="0.5"/>
        <path d="M 95 52 Q 100 48 105 52 Q 100 56 95 52 Z" fill="rgba(255,215,0,0.4)" stroke="#b8860b" strokeWidth="0.3"/>

        {/* Пол — мраморный */}
        <path d="M 24 240 L 176 240 L 176 250 L 24 250 Z" fill="rgba(80,70,55,0.3)" stroke="#5a3a20" strokeWidth="0.3"/>
        {/* Швы мраморных плит */}
        <line x1="60" y1="240" x2="60" y2="250" stroke="#5a3a20" strokeWidth="0.2"/>
        <line x1="100" y1="240" x2="100" y2="250" stroke="#5a3a20" strokeWidth="0.2"/>
        <line x1="140" y1="240" x2="140" y2="250" stroke="#5a3a20" strokeWidth="0.2"/>

        {/* Занавес за судьёй — бордовый, с золотой бахромой */}
        <path d="M 50 80 Q 48 160 50 240 L 70 240 Q 72 160 70 80 Z" fill="rgba(120,20,20,0.2)" stroke="#991b1b" strokeWidth="0.4"/>
        <path d="M 130 80 Q 128 160 130 240 L 150 240 Q 152 160 150 80 Z" fill="rgba(120,20,20,0.2)" stroke="#991b1b" strokeWidth="0.4"/>
        {/* Бахрома */}
        <path d="M 52 240 Q 53 245 54 240" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.6"/>
        <path d="M 56 240 Q 57 245 58 240" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.6"/>
        <path d="M 60 240 Q 61 245 62 240" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.6"/>
        <path d="M 132 240 Q 133 245 134 240" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.6"/>
        <path d="M 136 240 Q 137 245 138 240" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.6"/>
        <path d="M 140 240 Q 141 245 142 240" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.6"/>

        {/* ===== СУДЬЯ-ЦАРЬ ===== */}
        <g className="svg-breathe" style={{ transformOrigin: "100px 170px" }}>
          {/* Облачение — тёмно-бордовое, длинное, с золотым шитьём */}
          <path d="M 76 240 Q 78 200 82 175 Q 84 150 88 125 L 112 125 Q 116 150 118 175 Q 122 200 124 240 Q 100 245 76 240 Z"
            fill="rgba(100,20,20,0.55)" stroke="#5a1010" strokeWidth="0.6"/>
          {/* Складки облачения */}
          <path d="M 84 140 Q 86 190 84 235" fill="none" stroke="rgba(60,10,10,0.5)" strokeWidth="0.4"/>
          <path d="M 92 140 Q 94 190 92 235" fill="none" stroke="rgba(60,10,10,0.4)" strokeWidth="0.3"/>
          <path d="M 100 140 Q 100 190 100 235" fill="none" stroke="rgba(60,10,10,0.4)" strokeWidth="0.3"/>
          <path d="M 108 140 Q 106 190 108 235" fill="none" stroke="rgba(60,10,10,0.4)" strokeWidth="0.3"/>
          <path d="M 116 140 Q 114 190 116 235" fill="none" stroke="rgba(60,10,10,0.5)" strokeWidth="0.4"/>

          {/* Золотая кайма по вороту */}
          <path d="M 88 125 L 112 125 L 112 132 L 88 132 Z" fill="rgba(255,215,0,0.4)" stroke="#b8860b" strokeWidth="0.5"/>
          <path d="M 90 130 Q 100 128 110 130" fill="none" stroke="#991b1b" strokeWidth="0.4"/>

          {/* Растительный узор на облачении — переплетающийся */}
          <path d="M 84 160 Q 92 156 100 160 Q 108 156 116 160 Q 110 166 100 162 Q 92 166 84 160 Z" fill="none" stroke="#ffd700" strokeWidth="0.4" opacity="0.7"/>
          <path d="M 90 162 Q 92 160 94 162 Q 92 164 90 162 Z" fill="#ffd700" opacity="0.5"/>
          <path d="M 106 162 Q 108 160 110 162 Q 108 164 106 162 Z" fill="#ffd700" opacity="0.5"/>
          <path d="M 84 195 Q 92 191 100 195 Q 108 191 116 195 Q 110 201 100 197 Q 92 201 84 195 Z" fill="none" stroke="#ffd700" strokeWidth="0.4" opacity="0.7"/>
          <path d="M 84 220 Q 92 217 100 220 Q 108 217 116 220" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.6"/>

          {/* Золотой пояс с медальоном */}
          <path d="M 80 180 Q 100 178 120 180 L 120 186 Q 100 184 80 186 Z" fill="rgba(255,215,0,0.4)" stroke="#b8860b" strokeWidth="0.5"/>
          <circle cx="100" cy="183" r="3" fill="rgba(255,215,0,0.5)" stroke="#b8860b" strokeWidth="0.5"/>
          <path d="M 97 183 Q 100 180 103 183 Q 100 186 97 183 Z" fill="#991b1b" opacity="0.6"/>
          <circle cx="100" cy="183" r="0.6" fill="#ffd700"/>

          {/* Шея */}
          <path d="M 96 112 L 96 125 L 104 125 L 104 112 Z" fill="rgba(232,200,160,0.9)" stroke="#8b5a2b" strokeWidth="0.3"/>

          {/* Лицо — серьёзное, овальное */}
          <path d="M 92 105 Q 90 95 94 88 Q 97 84 100 83 Q 103 84 106 88 Q 110 95 108 105 Q 109 111 107 115 Q 104 119 100 119 Q 96 119 93 115 Q 91 111 92 105 Z"
            fill="rgba(232,200,160,0.92)" stroke="#8b5a2b" strokeWidth="0.4"/>

          {/* Морщины на лбу — зрелость */}
          <path d="M 95 92 Q 100 91 105 92" fill="none" stroke="rgba(120,80,40,0.4)" strokeWidth="0.3"/>
          <path d="M 95 95 Q 100 94 105 95" fill="none" stroke="rgba(120,80,40,0.3)" strokeWidth="0.3"/>

          {/* Брови — нахмуренные */}
          <path d="M 93 99 Q 95 97 97 98" fill="none" stroke="#5a3a20" strokeWidth="0.6" strokeLinecap="round"/>
          <path d="M 103 98 Q 105 97 107 99" fill="none" stroke="#5a3a20" strokeWidth="0.6" strokeLinecap="round"/>

          {/* Глаза — строгие */}
          <path d="M 93 102 Q 95 101 97 102 Q 97 103 95 104 Q 93 103 93 102 Z" fill="rgba(255,255,255,0.85)"/>
          <path d="M 103 102 Q 105 101 107 102 Q 107 103 105 104 Q 103 103 103 102 Z" fill="rgba(255,255,255,0.85)"/>
          <circle cx="95" cy="102.5" r="0.9" fill="#3a2010"/>
          <circle cx="105" cy="102.5" r="0.9" fill="#3a2010"/>

          {/* Нос — прямой */}
          <path d="M 100 105 L 99 112 Q 99 113 100 113 Q 101 113 101 112 Z" fill="none" stroke="#8b5a2b" strokeWidth="0.4" strokeLinecap="round"/>

          {/* Усы и борода — тёмные, подстриженные */}
          <path d="M 95 115 Q 100 117 105 115" fill="rgba(60,40,30,0.7)"/>
          <path d="M 94 116 Q 92 122 95 124 L 105 124 Q 108 122 106 116" fill="rgba(80,60,40,0.5)" stroke="#5a3a20" strokeWidth="0.3"/>

          {/* Рот — плотно сжатый */}
          <path d="M 96 116 Q 100 117 104 116" fill="none" stroke="#991b1b" strokeWidth="0.5" strokeLinecap="round"/>

          {/* ===== КОРОНА — золотая, царская, с зубцами и камнями ===== */}
          <path d="M 88 88 L 90 78 L 93 86 L 96 75 L 100 85 L 104 75 L 107 86 L 110 78 L 112 88 Z"
            fill="rgba(255,215,0,0.5)" stroke="#b8860b" strokeWidth="0.5"/>
          {/* Ободок короны */}
          <path d="M 88 88 L 112 88 L 112 91 L 88 91 Z" fill="rgba(255,215,0,0.4)" stroke="#b8860b" strokeWidth="0.4"/>
          {/* Камни на зубцах */}
          <circle cx="90" cy="80" r="1" fill="#991b1b" stroke="#5a1010" strokeWidth="0.2"/>
          <circle cx="96" cy="78" r="1" fill="#2d6e2d" stroke="#1e1e50" strokeWidth="0.2"/>
          <circle cx="100" cy="80" r="1.2" fill="#991b1b" stroke="#5a1010" strokeWidth="0.2"/>
          <circle cx="104" cy="78" r="1" fill="#2d6e2d" stroke="#1e1e50" strokeWidth="0.2"/>
          <circle cx="110" cy="80" r="1" fill="#991b1b" stroke="#5a1010" strokeWidth="0.2"/>
          {/* Центральный камень */}
          <path d="M 99 89 L 100 86 L 101 89 L 100 91 Z" fill="#991b1b" stroke="#b8860b" strokeWidth="0.3"/>

          {/* Руки — вытянутые, держат меч и весы */}
          {/* Левая рука — с весами */}
          <path d="M 88 145 Q 78 155 70 165" fill="none" stroke="rgba(232,200,160,0.9)" strokeWidth="3" strokeLinecap="round"/>
          <path d="M 88 145 Q 78 155 70 165" fill="none" stroke="#8b5a2b" strokeWidth="0.4"/>
          {/* Правая рука — на мече */}
          <path d="M 112 145 Q 118 160 120 175" fill="none" stroke="rgba(232,200,160,0.9)" strokeWidth="3" strokeLinecap="round"/>
          <path d="M 112 145 Q 118 160 120 175" fill="none" stroke="#8b5a2b" strokeWidth="0.4"/>
        </g>

        {/* ===== МЕЧ — вертикальный, золотой рукоятью вверх ===== */}
        <g>
          {/* Клинок — длинный, прямой */}
          <path d="M 99 130 L 99 215 L 101 215 L 101 130 Z" fill="rgba(200,200,210,0.55)" stroke="#5a3a20" strokeWidth="0.4"/>
          <path d="M 100 130 L 100 215" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.3"/>
          {/* Острие */}
          <path d="M 99 215 L 100 220 L 101 215 Z" fill="rgba(200,200,210,0.7)" stroke="#5a3a20" strokeWidth="0.3"/>
          {/* Гарда — золотая, резная */}
          <path d="M 92 130 L 108 130 L 108 134 L 92 134 Z" fill="rgba(255,215,0,0.5)" stroke="#b8860b" strokeWidth="0.5"/>
          <path d="M 92 132 Q 89 134 92 136" fill="none" stroke="#b8860b" strokeWidth="0.4"/>
          <path d="M 108 132 Q 111 134 108 136" fill="none" stroke="#b8860b" strokeWidth="0.4"/>
          {/* Рукоять — золотая, обмотанная */}
          <path d="M 98 122 L 98 130 L 102 130 L 102 122 Z" fill="rgba(255,215,0,0.4)" stroke="#b8860b" strokeWidth="0.4"/>
          <path d="M 98 124 L 102 124" fill="none" stroke="#991b1b" strokeWidth="0.3"/>
          <path d="M 98 127 L 102 127" fill="none" stroke="#991b1b" strokeWidth="0.3"/>
          {/* Навершие — золотой шар с камнем */}
          <circle cx="100" cy="120" r="2.5" fill="rgba(255,215,0,0.5)" stroke="#b8860b" strokeWidth="0.4"/>
          <circle cx="100" cy="120" r="1" fill="#991b1b"/>
        </g>

        {/* ===== ВЕСЫ — детальные, золотые ===== */}
        <g>
          {/* Столб весов */}
          <path d="M 69 165 L 69 115 L 71 115 L 71 165 Z" fill="rgba(80,55,30,0.7)" stroke="#5a3a20" strokeWidth="0.4"/>
          {/* Коромысло — горизонтальная перекладина */}
          <path d="M 55 115 L 85 115 L 85 117 L 55 117 Z" fill="rgba(255,215,0,0.5)" stroke="#b8860b" strokeWidth="0.4"/>
          {/* Декор коромысла — завитки */}
          <path d="M 55 116 Q 52 113 50 116 Q 52 119 55 116 Z" fill="rgba(255,215,0,0.4)" stroke="#b8860b" strokeWidth="0.3"/>
          <path d="M 85 116 Q 88 113 90 116 Q 88 119 85 116 Z" fill="rgba(255,215,0,0.4)" stroke="#b8860b" strokeWidth="0.3"/>
          {/* Центральный шарнир */}
          <circle cx="70" cy="116" r="2" fill="rgba(255,215,0,0.5)" stroke="#b8860b" strokeWidth="0.4"/>
          <circle cx="70" cy="116" r="0.8" fill="#991b1b"/>
          {/* Цепи к чашам */}
          <path d="M 60 117 L 60 125" fill="none" stroke="rgba(180,140,70,0.7)" strokeWidth="0.3"/>
          <path d="M 64 117 L 64 125" fill="none" stroke="rgba(180,140,70,0.7)" strokeWidth="0.3"/>
          <path d="M 76 117 L 76 125" fill="none" stroke="rgba(180,140,70,0.7)" strokeWidth="0.3"/>
          <path d="M 80 117 L 80 125" fill="none" stroke="rgba(180,140,70,0.7)" strokeWidth="0.3"/>
          {/* Левая чаша — золотая, полукруглая */}
          <path d="M 56 125 Q 56 135 62 135 Q 68 135 68 125 Z" fill="rgba(255,215,0,0.4)" stroke="#b8860b" strokeWidth="0.5"/>
          <path d="M 56 125 L 68 125" fill="none" stroke="#b8860b" strokeWidth="0.5"/>
          {/* Декор чаши */}
          <path d="M 58 130 Q 62 132 66 130" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.6"/>
          {/* Правая чаша */}
          <path d="M 72 125 Q 72 135 78 135 Q 84 135 84 125 Z" fill="rgba(255,215,0,0.4)" stroke="#b8860b" strokeWidth="0.5"/>
          <path d="M 72 125 L 84 125" fill="none" stroke="#b8860b" strokeWidth="0.5"/>
          <path d="M 74 130 Q 78 132 82 130" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.6"/>
          {/* Сердце на правой чаше — символ взвешивания */}
          <path d="M 78 124 Q 76 122 77 120 Q 78 119 78 121 Q 78 119 79 120 Q 80 122 78 124 Z" fill="rgba(180,30,30,0.7)" stroke="#5a1010" strokeWidth="0.3"/>
        </g>
      </g>
    ),

    // XII. ПОВЕШЕННЫЙ — сказочный юноша, подвешенный за ногу на дубе
    "major-12": (
      <g>
        {/* Сумеречный лесной фон */}
        <rect x="14" y="42" width="172" height="208" fill="rgba(50,40,25,0.15)" rx="2"/>
        {/* Облака */}
        <path d="M 30 60 Q 40 55 50 60 Q 55 58 60 62 Q 55 66 45 64 Q 35 65 30 60 Z" fill="rgba(255,255,255,0.08)"/>

        {/* ===== ДУБ — могучий, васнецовский, детальный ===== */}
        {/* Ствол — толстый, морщинистый */}
        <path d="M 92 245 L 92 80 Q 93 70 96 65 L 100 60 L 104 65 Q 107 70 108 80 L 108 245 Z" fill="rgba(74,53,36,0.75)" stroke="#3a2010" strokeWidth="0.6"/>
        {/* Морщины коры — вертикальные */}
        <path d="M 94 90 Q 95 160 94 230" fill="none" stroke="#3a2010" strokeWidth="0.4"/>
        <path d="M 97 85 Q 98 160 97 235" fill="none" stroke="#3a2010" strokeWidth="0.3"/>
        <path d="M 100 80 Q 100 160 100 240" fill="none" stroke="#3a2010" strokeWidth="0.3"/>
        <path d="M 103 85 Q 103 160 103 235" fill="none" stroke="#3a2010" strokeWidth="0.3"/>
        <path d="M 106 90 Q 105 160 106 230" fill="none" stroke="#3a2010" strokeWidth="0.4"/>
        {/* Трещины коры */}
        <path d="M 96 110 Q 94 130 96 150" fill="none" stroke="#3a2010" strokeWidth="0.4"/>
        <path d="M 104 170 Q 106 190 104 210" fill="none" stroke="#3a2010" strokeWidth="0.4"/>

        {/* Ветви дуба — мощные, изогнутые */}
        <path d="M 95 80 Q 80 75 65 80 Q 55 85 50 95" fill="none" stroke="#5a3a20" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M 95 80 Q 80 75 65 80 Q 55 85 50 95" fill="none" stroke="#3a2010" strokeWidth="0.5"/>
        <path d="M 105 80 Q 120 75 135 80 Q 145 85 150 95" fill="none" stroke="#5a3a20" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M 105 80 Q 120 75 135 80 Q 145 85 150 95" fill="none" stroke="#3a2010" strokeWidth="0.5"/>
        {/* Малые ветви */}
        <path d="M 70 80 Q 65 72 60 70" fill="none" stroke="#5a3a20" strokeWidth="1.2"/>
        <path d="M 80 78 Q 78 70 75 65" fill="none" stroke="#5a3a20" strokeWidth="1"/>
        <path d="M 130 80 Q 135 72 140 70" fill="none" stroke="#5a3a20" strokeWidth="1.2"/>
        <path d="M 120 78 Q 122 70 125 65" fill="none" stroke="#5a3a20" strokeWidth="1"/>

        {/* Листва — пышная, ярусами */}
        <path d="M 50 95 Q 40 80 50 70 Q 60 65 70 75 Q 60 60 75 65 Q 70 55 85 65 Q 80 60 90 75 Q 80 80 70 78 Q 60 82 50 95 Z" fill="rgba(34,100,40,0.4)" stroke="#2d6e2d" strokeWidth="0.4"/>
        <path d="M 60 85 Q 70 75 80 82 Q 75 70 85 78 Q 80 70 90 80 Q 85 88 75 85 Q 65 88 60 85 Z" fill="rgba(34,100,40,0.45)" stroke="#2d6e2d" strokeWidth="0.3"/>
        <path d="M 110 95 Q 120 80 130 70 Q 140 65 150 75 Q 140 60 125 65 Q 130 55 115 65 Q 120 60 110 75 Q 120 80 130 78 Q 140 82 150 95 Z" fill="rgba(34,100,40,0.4)" stroke="#2d6e2d" strokeWidth="0.4"/>
        <path d="M 120 85 Q 130 75 140 82 Q 135 70 125 78 Q 130 70 120 80 Q 125 88 135 85 Q 145 88 140 85 Z" fill="rgba(34,100,40,0.45)" stroke="#2d6e2d" strokeWidth="0.3"/>

        {/* Верёвка — привязана к ветви */}
        <path d="M 65 80 Q 75 85 100 88 Q 125 85 135 80" fill="none" stroke="rgba(120,90,50,0.7)" strokeWidth="0.6"/>
        <path d="M 100 88 L 100 105" fill="none" stroke="rgba(120,90,50,0.8)" strokeWidth="2" strokeLinecap="round"/>
        {/* Узел верёвки */}
        <circle cx="100" cy="89" r="2" fill="rgba(120,90,50,0.8)" stroke="#5a3a20" strokeWidth="0.4"/>
        <path d="M 98 91 Q 96 93 98 95" fill="none" stroke="rgba(120,90,50,0.7)" strokeWidth="0.5"/>
        <path d="M 102 91 Q 104 93 102 95" fill="none" stroke="rgba(120,90,50,0.7)" strokeWidth="0.5"/>

        {/* Земля с травой */}
        <path d="M 14 230 Q 50 225 100 230 Q 150 225 186 230 L 186 250 L 14 250 Z" fill="rgba(60,50,30,0.3)" stroke="#3a2010" strokeWidth="0.3"/>
        {/* Камни у основания */}
        <path d="M 50 235 Q 47 230 50 226 Q 55 224 58 228 Q 60 233 57 236 Q 53 238 50 235 Z" fill="rgba(80,70,55,0.5)" stroke="#5a3a20" strokeWidth="0.3"/>
        <path d="M 140 235 Q 137 230 140 226 Q 145 224 148 228 Q 150 233 147 236 Q 143 238 140 235 Z" fill="rgba(80,70,55,0.5)" stroke="#5a3a20" strokeWidth="0.3"/>

        {/* ===== ФИГУРА ЮНОШИ — подвешена за ногу, головой вниз ===== */}
        <g>
          {/* Нога привязана к верёвке */}
          <path d="M 97 105 L 97 118 L 103 118 L 103 105 Z" fill="rgba(232,200,160,0.85)" stroke="#8b5a2b" strokeWidth="0.4"/>
          {/* Башмак — привязан к верёвке */}
          <path d="M 95 105 L 105 105 L 105 110 L 95 110 Z" fill="rgba(80,55,30,0.85)" stroke="#3a2010" strokeWidth="0.4"/>
          <path d="M 96 108 L 104 108" fill="none" stroke="#3a2010" strokeWidth="0.3"/>

          {/* Согнутая вторая нога */}
          <path d="M 105 118 Q 115 122 113 132 Q 110 138 105 135" fill="none" stroke="rgba(232,200,160,0.85)" strokeWidth="3" strokeLinecap="round"/>
          <path d="M 105 118 Q 115 122 113 132 Q 110 138 105 135" fill="none" stroke="#8b5a2b" strokeWidth="0.4"/>
          {/* Второй башмак */}
          <path d="M 102 132 L 110 132 L 110 137 L 102 137 Z" fill="rgba(80,55,30,0.85)" stroke="#3a2010" strokeWidth="0.4"/>

          {/* Тело — перевёрнутое, в рубахе */}
          <path d="M 90 215 Q 88 180 90 150 Q 92 130 95 118 L 105 118 Q 108 130 110 150 Q 112 180 110 215 Q 100 220 90 215 Z"
            fill="rgba(184,134,11,0.45)" stroke="#5a3a20" strokeWidth="0.6"/>
          {/* Складки рубахи */}
          <path d="M 94 145 Q 95 180 94 210" fill="none" stroke="rgba(120,80,40,0.5)" strokeWidth="0.4"/>
          <path d="M 100 145 Q 100 180 100 210" fill="none" stroke="rgba(120,80,40,0.4)" strokeWidth="0.3"/>
          <path d="M 106 145 Q 105 180 106 210" fill="none" stroke="rgba(120,80,40,0.5)" strokeWidth="0.4"/>

          {/* Золотой растительный узор на рубахе */}
          <path d="M 92 165 Q 100 161 108 165 Q 103 171 100 167 Q 97 171 92 165 Z" fill="none" stroke="#ffd700" strokeWidth="0.4" opacity="0.6"/>
          <path d="M 92 195 Q 100 191 108 195 Q 103 201 100 197 Q 97 201 92 195 Z" fill="none" stroke="#ffd700" strokeWidth="0.4" opacity="0.6"/>

          {/* Пояс */}
          <path d="M 90 145 Q 100 143 110 145 L 110 150 Q 100 148 90 150 Z" fill="rgba(120,90,50,0.7)" stroke="#5a3a20" strokeWidth="0.4"/>

          {/* Руки — за спиной, связаны */}
          <path d="M 92 130 Q 85 138 88 148" fill="none" stroke="rgba(232,200,160,0.85)" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M 108 130 Q 115 138 112 148" fill="none" stroke="rgba(232,200,160,0.85)" strokeWidth="2.5" strokeLinecap="round"/>
          {/* Связанные кисти */}
          <ellipse cx="88" cy="148" rx="2.5" ry="2" fill="rgba(232,200,160,0.85)" stroke="#8b5a2b" strokeWidth="0.4"/>
          <ellipse cx="112" cy="148" rx="2.5" ry="2" fill="rgba(232,200,160,0.85)" stroke="#8b5a2b" strokeWidth="0.4"/>
          {/* Верёвка связывающая руки */}
          <path d="M 88 148 Q 100 152 112 148" fill="none" stroke="rgba(120,90,50,0.8)" strokeWidth="0.8"/>
          <path d="M 88 150 Q 100 154 112 150" fill="none" stroke="rgba(120,90,50,0.7)" strokeWidth="0.6"/>

          {/* Голова — внизу, детальная */}
          <path d="M 93 218 Q 91 213 94 208 Q 97 205 100 205 Q 103 205 106 208 Q 109 213 107 218 Q 108 222 106 225 Q 103 228 100 228 Q 97 228 94 225 Q 92 222 93 218 Z"
            fill="rgba(232,200,160,0.9)" stroke="#8b5a2b" strokeWidth="0.4"/>

          {/* Волосы — свисают вниз */}
          <path d="M 94 220 Q 91 230 93 240" fill="none" stroke="rgba(120,80,40,0.8)" strokeWidth="1.5"/>
          <path d="M 97 222 Q 95 232 97 242" fill="none" stroke="rgba(120,80,40,0.8)" strokeWidth="1.5"/>
          <path d="M 100 223 Q 100 233 100 243" fill="none" stroke="rgba(120,80,40,0.8)" strokeWidth="1.5"/>
          <path d="M 103 222 Q 105 232 103 242" fill="none" stroke="rgba(120,80,40,0.8)" strokeWidth="1.5"/>
          <path d="M 106 220 Q 109 230 107 240" fill="none" stroke="rgba(120,80,40,0.8)" strokeWidth="1.5"/>

          {/* Глаза — закрытые или полузакрытые */}
          <path d="M 95 215 Q 97 215 99 215" fill="none" stroke="#5a3a20" strokeWidth="0.4"/>
          <path d="M 101 215 Q 103 215 105 215" fill="none" stroke="#5a3a20" strokeWidth="0.4"/>
          {/* Ресницы */}
          <path d="M 96 216 L 96 217" stroke="#3a2010" strokeWidth="0.3"/>
          <path d="M 98 216 L 98 217" stroke="#3a2010" strokeWidth="0.3"/>
          <path d="M 102 216 L 102 217" stroke="#3a2010" strokeWidth="0.3"/>
          <path d="M 104 216 L 104 217" stroke="#3a2010" strokeWidth="0.3"/>

          {/* Брови — спокойные */}
          <path d="M 94 212 Q 97 211 99 212" fill="none" stroke="#5a3a20" strokeWidth="0.5"/>
          <path d="M 101 212 Q 103 211 106 212" fill="none" stroke="#5a3a20" strokeWidth="0.5"/>

          {/* Нос */}
          <path d="M 100 217 L 99 221 Q 100 222 101 221 Z" fill="none" stroke="#8b5a2b" strokeWidth="0.3"/>

          {/* Рот — мягкий, безмятежный */}
          <path d="M 97 224 Q 100 225 103 224" fill="none" stroke="#991b1b" strokeWidth="0.4" strokeLinecap="round"/>

          {/* Нимб вокруг головы — золотой */}
          <ellipse cx="100" cy="227" rx="11" ry="3.5" fill="none" stroke="#ffd700" strokeWidth="1" opacity="0.7"/>
          <ellipse cx="100" cy="227" rx="13" ry="4" fill="none" stroke="rgba(255,215,0,0.4)" strokeWidth="0.5"/>
          {/* Свечение нимба */}
          <ellipse cx="100" cy="227" rx="14" ry="4.5" fill="rgba(255,215,0,0.08)" stroke="none"/>
        </g>

        {/* Декоративные листья вокруг */}
        <path d="M 30 200 Q 35 195 40 200 Q 35 205 30 200 Z" fill="rgba(34,100,40,0.4)" stroke="#2d6e2d" strokeWidth="0.3"/>
        <path d="M 165 200 Q 170 195 175 200 Q 170 205 165 200 Z" fill="rgba(34,100,40,0.4)" stroke="#2d6e2d" strokeWidth="0.3"/>
        {/* Падающие листья */}
        <path d="M 50 130 Q 53 128 56 130 Q 53 132 50 130 Z" fill="rgba(180,100,40,0.4)" stroke="#8b5a2b" strokeWidth="0.3"/>
        <path d="M 155 145 Q 158 143 161 145 Q 158 147 155 145 Z" fill="rgba(180,100,40,0.4)" stroke="#8b5a2b" strokeWidth="0.3"/>
        <path d="M 60 175 Q 63 173 66 175 Q 63 177 60 175 Z" fill="rgba(180,100,40,0.4)" stroke="#8b5a2b" strokeWidth="0.3"/>
      </g>
    ),

    // XIII. СМЕРТЬ — сказочный всадник на бледном коне с чёрным стягом
    "major-13": (
      <g>
        {/* Мрачный фон — васнецовский закат */}
        <rect x="14" y="42" width="172" height="208" fill="rgba(60,30,15,0.18)" rx="2"/>
        {/* Закатное небо с полосами */}
        <path d="M 14 42 L 186 42 L 186 100 Q 150 80 100 85 Q 50 80 14 100 Z" fill="rgba(180,80,30,0.15)"/>
        <path d="M 14 70 Q 50 65 100 70 Q 150 65 186 70 L 186 95 Q 150 80 100 85 Q 50 80 14 95 Z" fill="rgba(120,40,20,0.12)"/>

        {/* Бледное солнце — зловещее */}
        <circle cx="100" cy="75" r="13" fill="rgba(200,180,150,0.25)" stroke="#8b5a2b" strokeWidth="0.6"/>
        <circle cx="100" cy="75" r="9" fill="rgba(220,200,170,0.2)" stroke="none"/>
        <circle cx="100" cy="75" r="6" fill="rgba(240,220,190,0.2)" stroke="none"/>

        {/* Облака — рваные, тёмные */}
        <path d="M 25 60 Q 35 55 45 60 Q 55 56 65 62 Q 60 65 50 63 Q 40 66 30 63 Q 22 63 25 60 Z" fill="rgba(40,25,15,0.4)"/>
        <path d="M 130 55 Q 140 50 150 55 Q 165 52 175 58 Q 168 62 158 59 Q 148 63 138 59 Q 128 60 130 55 Z" fill="rgba(40,25,15,0.4)"/>

        {/* Дальние холмы — тёмные */}
        <path d="M 14 200 Q 40 195 60 198 Q 75 192 90 196 Q 105 192 120 196 Q 140 192 160 198 Q 175 195 186 200 L 186 220 L 14 220 Z" fill="rgba(50,30,20,0.3)" stroke="#3a2010" strokeWidth="0.3"/>

        {/* Мёртвые деревья — детальные, искривлённые */}
        <path d="M 25 250 L 25 100 Q 23 90 26 80 L 22 70 L 28 80 L 25 100 Z" fill="rgba(50,35,25,0.45)" stroke="#3a2010" strokeWidth="0.5"/>
        {/* Ветви мёртвого дерева */}
        <path d="M 25 110 Q 18 105 12 110" fill="none" stroke="#3a2010" strokeWidth="1.2"/>
        <path d="M 25 130 Q 32 125 38 130" fill="none" stroke="#3a2010" strokeWidth="1"/>
        <path d="M 14 110 Q 10 105 8 100" fill="none" stroke="#3a2010" strokeWidth="0.8"/>
        <path d="M 38 130 Q 42 125 45 120" fill="none" stroke="#3a2010" strokeWidth="0.7"/>
        {/* Малые ветви */}
        <path d="M 12 110 Q 8 108 5 112" fill="none" stroke="#3a2010" strokeWidth="0.5"/>
        <path d="M 32 125 Q 35 122 38 124" fill="none" stroke="#3a2010" strokeWidth="0.5"/>

        <path d="M 175 250 L 175 95 Q 173 85 176 75 L 172 65 L 178 75 L 175 95 Z" fill="rgba(50,35,25,0.45)" stroke="#3a2010" strokeWidth="0.5"/>
        <path d="M 175 105 Q 168 100 162 105" fill="none" stroke="#3a2010" strokeWidth="1.2"/>
        <path d="M 175 125 Q 182 120 188 125" fill="none" stroke="#3a2010" strokeWidth="1"/>
        <path d="M 162 105 Q 158 100 155 95" fill="none" stroke="#3a2010" strokeWidth="0.8"/>
        <path d="M 188 125 Q 192 120 195 115" fill="none" stroke="#3a2010" strokeWidth="0.7"/>
        <path d="M 162 105 Q 158 102 155 105" fill="none" stroke="#3a2010" strokeWidth="0.5"/>

        {/* Земля — выжженная */}
        <path d="M 14 220 Q 50 215 100 218 Q 150 215 186 220 L 186 250 L 14 250 Z" fill="rgba(60,40,25,0.3)" stroke="#3a2010" strokeWidth="0.3"/>
        {/* Трещины на земле */}
        <path d="M 30 235 L 40 240 L 35 245" fill="none" stroke="#3a2010" strokeWidth="0.4"/>
        <path d="M 130 230 L 145 235 L 140 245" fill="none" stroke="#3a2010" strokeWidth="0.4"/>

        {/* ===== КОНЬ — бледный, сказочный, мощный ===== */}
        <g>
          {/* Тело коня — мощное */}
          <path d="M 55 205 Q 50 195 55 188 Q 70 183 90 184 Q 105 184 110 190 Q 113 200 110 210 Q 100 215 80 215 Q 60 215 55 205 Z"
            fill="rgba(200,190,170,0.45)" stroke="#5a3a20" strokeWidth="0.6"/>
          {/* Грива — длинная, развевающаяся */}
          <path d="M 60 185 Q 50 178 45 185 Q 40 180 38 188 Q 35 184 32 192 Q 30 188 28 196" fill="none" stroke="rgba(60,40,30,0.7)" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M 58 188 Q 48 184 44 190 Q 38 188 36 195" fill="none" stroke="rgba(60,40,30,0.6)" strokeWidth="1" strokeLinecap="round"/>

          {/* Голова коня — детальная */}
          <path d="M 50 195 Q 42 188 42 178 Q 45 172 52 175 Q 58 180 58 188 Q 58 195 55 198 Z"
            fill="rgba(200,190,170,0.5)" stroke="#5a3a20" strokeWidth="0.5"/>
          {/* Морда */}
          <path d="M 42 188 Q 40 192 43 196 Q 47 197 49 194 Q 48 190 42 188 Z"
            fill="rgba(220,210,190,0.6)" stroke="#5a3a20" strokeWidth="0.4"/>
          {/* Ноздря */}
          <ellipse cx="44" cy="192" rx="0.8" ry="1.2" fill="rgba(60,40,30,0.7)"/>
          {/* Глаз коня — горящий */}
          <ellipse cx="49" cy="183" rx="1" ry="0.8" fill="rgba(255,80,40,0.7)" stroke="#3a2010" strokeWidth="0.2"/>
          <circle cx="49" cy="183" r="0.4" fill="#ffd700"/>
          {/* Уши */}
          <path d="M 52 175 L 51 170 L 54 174 Z" fill="rgba(200,190,170,0.6)" stroke="#5a3a20" strokeWidth="0.3"/>
          <path d="M 55 174 L 54 169 L 57 173 Z" fill="rgba(200,190,170,0.6)" stroke="#5a3a20" strokeWidth="0.3"/>

          {/* Ноги коня — детальные с копытами */}
          <path d="M 62 210 L 60 232 L 64 232 L 65 210 Z" fill="rgba(200,190,170,0.5)" stroke="#5a3a20" strokeWidth="0.4"/>
          <path d="M 60 232 L 58 235 L 66 235 L 64 232 Z" fill="rgba(40,25,15,0.8)" stroke="#3a2010" strokeWidth="0.3"/>

          <path d="M 78 212 L 76 234 L 80 234 L 80 212 Z" fill="rgba(200,190,170,0.5)" stroke="#5a3a20" strokeWidth="0.4"/>
          <path d="M 76 234 L 74 237 L 82 237 L 80 234 Z" fill="rgba(40,25,15,0.8)" stroke="#3a2010" strokeWidth="0.3"/>

          <path d="M 92 212 L 90 234 L 94 234 L 95 212 Z" fill="rgba(200,190,170,0.5)" stroke="#5a3a20" strokeWidth="0.4"/>
          <path d="M 90 234 L 88 237 L 96 237 L 94 234 Z" fill="rgba(40,25,15,0.8)" stroke="#3a2010" strokeWidth="0.3"/>

          <path d="M 105 210 L 103 232 L 107 232 L 108 210 Z" fill="rgba(200,190,170,0.5)" stroke="#5a3a20" strokeWidth="0.4"/>
          <path d="M 103 232 L 101 235 L 109 235 L 107 232 Z" fill="rgba(40,25,15,0.8)" stroke="#3a2010" strokeWidth="0.3"/>

          {/* Хвост — длинный, развевающийся */}
          <path d="M 110 200 Q 120 205 122 215 Q 124 225 120 235" fill="none" stroke="rgba(60,40,30,0.7)" strokeWidth="2" strokeLinecap="round"/>
          <path d="M 110 200 Q 118 208 118 220 Q 116 228 114 235" fill="none" stroke="rgba(60,40,30,0.5)" strokeWidth="1.2" strokeLinecap="round"/>

          {/* Седло — чёрное с золотом */}
          <path d="M 70 188 Q 80 184 90 188 L 90 195 Q 80 192 70 195 Z" fill="rgba(40,25,15,0.7)" stroke="#5a3a20" strokeWidth="0.4"/>
          <path d="M 74 190 Q 80 188 86 190" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.6"/>
        </g>

        {/* ===== ВСАДНИК — СМЕРТЬ, в чёрных доспехах с капюшоном ===== */}
        <g className="svg-breathe" style={{ transformOrigin: "80px 165px" }}>
          {/* Плащ — чёрный, развевающийся */}
          <path d="M 65 195 Q 60 175 65 145 L 95 145 Q 100 175 95 195 Q 80 200 65 195 Z"
            fill="rgba(40,25,15,0.65)" stroke="#3a2010" strokeWidth="0.6"/>
          {/* Складки плаща */}
          <path d="M 70 150 Q 68 175 70 195" fill="none" stroke="rgba(20,10,5,0.5)" strokeWidth="0.4"/>
          <path d="M 80 150 Q 80 175 80 195" fill="none" stroke="rgba(20,10,5,0.4)" strokeWidth="0.3"/>
          <path d="M 90 150 Q 92 175 90 195" fill="none" stroke="rgba(20,10,5,0.5)" strokeWidth="0.4"/>

          {/* Развевающиеся края плаща */}
          <path d="M 65 145 Q 55 140 50 150 Q 48 160 52 165" fill="none" stroke="rgba(40,25,15,0.65)" strokeWidth="2" strokeLinecap="round"/>
          <path d="M 95 145 Q 105 142 110 152 Q 112 162 108 168" fill="none" stroke="rgba(40,25,15,0.65)" strokeWidth="2" strokeLinecap="round"/>

          {/* Золотой растительный узор на плаще */}
          <path d="M 72 165 Q 80 161 88 165 Q 83 170 80 167 Q 77 170 72 165 Z" fill="none" stroke="#ffd700" strokeWidth="0.4" opacity="0.5"/>
          <path d="M 72 180 Q 80 176 88 180 Q 83 185 80 182 Q 77 185 72 180 Z" fill="none" stroke="#ffd700" strokeWidth="0.4" opacity="0.5"/>

          {/* Капюшон — большой, нависающий */}
          <path d="M 67 145 Q 62 130 75 122 Q 88 122 92 130 Q 96 138 93 145 Q 88 142 80 142 Q 72 142 67 145 Z"
            fill="rgba(20,10,5,0.85)" stroke="#3a2010" strokeWidth="0.5"/>

          {/* Лицо — скрыто в тени капюшона, череп */}
          <path d="M 75 138 Q 73 132 77 128 Q 80 126 83 128 Q 87 132 85 138 Q 84 142 80 142 Q 76 142 75 138 Z"
            fill="rgba(20,10,5,0.95)" stroke="#3a2010" strokeWidth="0.4"/>
          {/* Глазницы — горящие */}
          <ellipse cx="77" cy="134" rx="1" ry="0.8" fill="rgba(255,40,20,0.9)"/>
          <ellipse cx="83" cy="134" rx="1" ry="0.8" fill="rgba(255,40,20,0.9)"/>
          {/* Зубы черепа */}
          <path d="M 76 140 L 76 142 M 78 140 L 78 142 M 80 140 L 80 142 M 82 140 L 82 142 M 84 140 L 84 142" stroke="rgba(180,160,130,0.5)" strokeWidth="0.2"/>

          {/* Рука — в чёрной перчатке, держит поводья */}
          <path d="M 70 165 Q 65 175 60 180" fill="none" stroke="rgba(40,25,15,0.85)" strokeWidth="3" strokeLinecap="round"/>
          <path d="M 58 180 L 56 184 L 60 184 Z" fill="rgba(40,25,15,0.85)" stroke="#3a2010" strokeWidth="0.3"/>

          {/* Другая рука — со стягом */}
          <path d="M 90 165 Q 95 155 100 145" fill="none" stroke="rgba(40,25,15,0.85)" strokeWidth="3" strokeLinecap="round"/>
          <path d="M 99 144 L 102 140 L 104 144 Z" fill="rgba(40,25,15,0.85)" stroke="#3a2010" strokeWidth="0.3"/>
        </g>

        {/* ===== ЧЁРНЫЙ СТЯГ с БЕЛОЙ РОЗОЙ ===== */}
        <g>
          {/* Древко стяга */}
          <path d="M 102 145 L 110 80 L 112 80 L 104 145 Z" fill="rgba(80,55,30,0.85)" stroke="#3a2010" strokeWidth="0.4"/>
          {/* Наконечник древка */}
          <path d="M 109 80 L 111 75 L 113 80 Z" fill="rgba(255,215,0,0.5)" stroke="#b8860b" strokeWidth="0.3"/>

          {/* Полотно стяга — чёрное, развевающееся */}
          <path d="M 110 85 Q 130 82 142 88 Q 140 105 142 122 Q 128 118 110 122 Q 112 105 110 85 Z"
            fill="rgba(20,10,5,0.85)" stroke="#3a2010" strokeWidth="0.5"/>
          {/* Складки полотна */}
          <path d="M 115 90 Q 120 100 115 115" fill="none" stroke="rgba(60,40,30,0.5)" strokeWidth="0.3"/>
          <path d="M 125 87 Q 130 100 128 118" fill="none" stroke="rgba(60,40,30,0.5)" strokeWidth="0.3"/>
          <path d="M 135 88 Q 138 102 136 120" fill="none" stroke="rgba(60,40,30,0.5)" strokeWidth="0.3"/>

          {/* Белая роза на стяге — детальная */}
          <g>
            {/* Лепестки — многослойные */}
            <path d="M 122 100 Q 118 96 122 92 Q 128 92 128 100 Q 128 105 122 105 Q 116 105 116 100 Q 116 96 122 100 Z"
              fill="rgba(245,235,210,0.85)" stroke="#8b5a2b" strokeWidth="0.4"/>
            {/* Внутренние лепестки */}
            <path d="M 122 97 Q 120 95 122 94 Q 125 94 125 97 Q 125 100 122 100 Q 119 100 119 97 Q 119 95 122 97 Z"
              fill="rgba(255,245,220,0.9)" stroke="#8b5a2b" strokeWidth="0.3"/>
            {/* Центр розы */}
            <circle cx="122" cy="98" r="1" fill="rgba(180,30,30,0.6)" stroke="#5a1010" strokeWidth="0.2"/>
            {/* Листья розы */}
            <path d="M 115 100 Q 112 98 113 102 Q 116 102 115 100 Z" fill="rgba(34,100,40,0.7)" stroke="#2d6e2d" strokeWidth="0.3"/>
            <path d="M 130 100 Q 133 98 132 102 Q 129 102 130 100 Z" fill="rgba(34,100,40,0.7)" stroke="#2d6e2d" strokeWidth="0.3"/>
          </g>
        </g>

        {/* ===== Павшие фигуры у ног коня ===== */}
        {/* Павший король — с короной */}
        <g>
          <ellipse cx="125" cy="237" rx="9" ry="3.5" fill="rgba(120,20,20,0.4)" stroke="#5a1010" strokeWidth="0.4"/>
          {/* Корона павшего */}
          <path d="M 122 232 L 124 228 L 126 232 L 128 228 L 130 232 Z" fill="rgba(255,215,0,0.5)" stroke="#b8860b" strokeWidth="0.3"/>
          <circle cx="124" cy="230" r="0.6" fill="#991b1b"/>
          <circle cx="128" cy="230" r="0.6" fill="#991b1b"/>
          {/* Рука павшего */}
          <path d="M 132 234 Q 138 232 140 234" fill="none" stroke="rgba(232,200,160,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
        </g>
        {/* Другая павшая фигура */}
        <ellipse cx="42" cy="240" rx="7" ry="2.5" fill="rgba(60,40,30,0.4)" stroke="#3a2010" strokeWidth="0.3"/>
        <path d="M 38 238 Q 36 235 39 234" fill="none" stroke="rgba(232,200,160,0.4)" strokeWidth="1.2" strokeLinecap="round"/>

        {/* Декоративные васнецовские завитки */}
        <path d="M 20 220 Q 25 215 30 220 Q 25 225 20 220 Z" fill="none" stroke="rgba(255,215,0,0.25)" strokeWidth="0.4"/>
        <path d="M 170 220 Q 175 215 180 220 Q 175 225 170 220 Z" fill="none" stroke="rgba(255,215,0,0.25)" strokeWidth="0.4"/>
      </g>
    ),

    // XIV. УМЕРЕННОСТЬ — сказочный ангел с двумя кувшинами
    "major-14": (
      <g>
        {/* Речной пейзаж — васнецовский, утренний */}
        <rect x="14" y="42" width="172" height="120" fill="rgba(204,153,51,0.08)" rx="2"/>
        {/* Закатное небо — мягкое */}
        <path d="M 14 42 L 186 42 L 186 80 Q 150 70 100 75 Q 50 70 14 80 Z" fill="rgba(255,200,150,0.12)"/>
        {/* Облака — резные */}
        <path d="M 25 60 Q 35 55 45 60 Q 55 56 65 60 Q 60 65 50 63 Q 40 65 30 62 Q 22 62 25 60 Z" fill="rgba(255,255,255,0.12)"/>
        <path d="M 130 55 Q 140 50 150 55 Q 165 52 175 58 Q 168 62 158 59 Q 148 63 138 59 Q 128 60 130 55 Z" fill="rgba(255,255,255,0.12)"/>

        {/* Холмы дальние */}
        <path d="M 14 150 Q 50 140 100 145 Q 150 140 186 150 L 186 165 L 14 165 Z" fill="rgba(120,80,40,0.18)" stroke="#5a3a20" strokeWidth="0.3"/>
        {/* Дальние деревья на холме */}
        <path d="M 30 145 L 30 138 L 32 134 L 34 138 L 34 145 Z" fill="rgba(34,100,40,0.4)" stroke="#2d6e2d" strokeWidth="0.3"/>
        <path d="M 165 145 L 165 138 L 167 134 L 169 138 L 169 145 Z" fill="rgba(34,100,40,0.4)" stroke="#2d6e2d" strokeWidth="0.3"/>

        {/* Цветочный луг */}
        <path d="M 14 165 Q 50 162 100 165 Q 150 162 186 165 L 186 210 L 14 210 Z" fill="rgba(90,60,30,0.2)" stroke="#5a3a20" strokeWidth="0.3"/>
        {/* Цветы на лугу */}
        <g>
          <circle cx="30" cy="195" r="1.8" fill="rgba(220,60,60,0.7)" stroke="#991b1b" strokeWidth="0.3"/>
          <path d="M 28 195 Q 30 193 32 195 Q 30 197 28 195" fill="rgba(255,180,180,0.5)"/>
          <path d="M 30 195 L 30 200" fill="none" stroke="#2d6e2d" strokeWidth="0.4"/>

          <circle cx="170" cy="195" r="1.8" fill="#ffd700" opacity="0.7" stroke="#b8860b" strokeWidth="0.3"/>
          <path d="M 168.5 194 Q 170 192 171.5 194 Q 170 196 168.5 194" fill="rgba(255,235,150,0.6)"/>
          <path d="M 170 195 L 170 200" fill="none" stroke="#2d6e2d" strokeWidth="0.4"/>

          <circle cx="50" cy="200" r="1.5" fill="rgba(220,180,200,0.7)" stroke="#991b1b" strokeWidth="0.3"/>
          <path d="M 50 200 L 50 205" fill="none" stroke="#2d6e2d" strokeWidth="0.4"/>

          <circle cx="150" cy="200" r="1.5" fill="rgba(180,60,60,0.7)" stroke="#991b1b" strokeWidth="0.3"/>
          <path d="M 150 200 L 150 205" fill="none" stroke="#2d6e2d" strokeWidth="0.4"/>
        </g>
        {/* Трава */}
        <path d="M 25 200 Q 27 192 29 200" fill="none" stroke="#2d6e2d" strokeWidth="0.5"/>
        <path d="M 35 202 Q 37 194 39 202" fill="none" stroke="#2d6e2d" strokeWidth="0.5"/>
        <path d="M 155 202 Q 157 194 159 202" fill="none" stroke="#2d6e2d" strokeWidth="0.5"/>
        <path d="M 165 200 Q 167 192 169 200" fill="none" stroke="#2d6e2d" strokeWidth="0.5"/>

        {/* Река — детальная с волнами */}
        <path d="M 14 205 Q 100 200 186 205 L 186 245 L 14 245 Z" fill="rgba(70,100,130,0.25)" stroke="#4a6a8a" strokeWidth="0.5"/>
        {/* Волны на реке */}
        <path d="M 20 215 Q 30 213 40 215 Q 50 217 60 215" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.4"/>
        <path d="M 70 220 Q 80 218 90 220 Q 100 222 110 220" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.4"/>
        <path d="M 120 225 Q 130 223 140 225 Q 150 227 160 225" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.4"/>
        <path d="M 25 235 Q 35 233 45 235 Q 55 237 65 235" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.4"/>
        <path d="M 125 235 Q 135 233 145 235 Q 155 237 165 235" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.4"/>

        {/* Земной берег снизу */}
        <path d="M 14 245 L 186 245 L 186 250 L 14 250 Z" fill="rgba(80,55,30,0.3)" stroke="#3a2010" strokeWidth="0.3"/>

        {/* ===== АНГЕЛ-УМЕРЕННОСТЬ ===== */}
        <g className="svg-breathe" style={{ transformOrigin: "100px 160px" }}>
          {/* Охряное одеяние с золотым шитьём — длинное */}
          <path d="M 80 215 Q 82 195 86 175 Q 88 155 92 130 L 108 130 Q 112 155 114 175 Q 118 195 120 215 Q 100 220 80 215 Z"
            fill="rgba(184,134,11,0.45)" stroke="#5a3a20" strokeWidth="0.6"/>
          {/* Складки одежды */}
          <path d="M 86 145 Q 88 180 86 215" fill="none" stroke="rgba(120,80,40,0.5)" strokeWidth="0.4"/>
          <path d="M 94 145 Q 96 180 94 215" fill="none" stroke="rgba(120,80,40,0.4)" strokeWidth="0.3"/>
          <path d="M 100 145 Q 100 180 100 215" fill="none" stroke="rgba(120,80,40,0.4)" strokeWidth="0.3"/>
          <path d="M 106 145 Q 104 180 106 215" fill="none" stroke="rgba(120,80,40,0.4)" strokeWidth="0.3"/>
          <path d="M 114 145 Q 112 180 114 215" fill="none" stroke="rgba(120,80,40,0.5)" strokeWidth="0.4"/>

          {/* Растительный золотой узор на одеянии */}
          <path d="M 84 160 Q 92 156 100 160 Q 108 156 116 160 Q 110 166 100 162 Q 92 166 84 160 Z" fill="none" stroke="#ffd700" strokeWidth="0.4" opacity="0.7"/>
          <path d="M 90 162 Q 92 160 94 162 Q 92 164 90 162 Z" fill="#ffd700" opacity="0.5"/>
          <path d="M 106 162 Q 108 160 110 162 Q 108 164 106 162 Z" fill="#ffd700" opacity="0.5"/>
          <path d="M 84 190 Q 92 186 100 190 Q 108 186 116 190 Q 110 196 100 192 Q 92 196 84 190 Z" fill="none" stroke="#ffd700" strokeWidth="0.4" opacity="0.7"/>

          {/* Золотой пояс */}
          <path d="M 82 175 Q 100 173 118 175 L 118 180 Q 100 178 82 180 Z" fill="rgba(255,215,0,0.4)" stroke="#b8860b" strokeWidth="0.5"/>
          <circle cx="100" cy="177" r="2.5" fill="rgba(255,215,0,0.5)" stroke="#b8860b" strokeWidth="0.4"/>
          {/* Медальон на поясе — треугольный символ */}
          <path d="M 98 177 L 100 174 L 102 177 Z" fill="#991b1b" opacity="0.7"/>

          {/* Шея */}
          <path d="M 96 120 L 96 130 L 104 130 L 104 120 Z" fill="rgba(232,200,160,0.9)" stroke="#8b5a2b" strokeWidth="0.3"/>

          {/* Лицо — детальное, овальное, кроткое */}
          <path d="M 92 110 Q 90 100 94 93 Q 97 89 100 88 Q 103 89 106 93 Q 110 100 108 110 Q 109 116 107 120 Q 104 124 100 124 Q 96 124 93 120 Q 91 116 92 110 Z"
            fill="rgba(232,200,160,0.92)" stroke="#8b5a2b" strokeWidth="0.4"/>

          {/* Волосы — золотистые, длинные */}
          <path d="M 88 100 Q 84 130 86 165" fill="none" stroke="rgba(180,140,70,0.7)" strokeWidth="2.5"/>
          <path d="M 112 100 Q 116 130 114 165" fill="none" stroke="rgba(180,140,70,0.7)" strokeWidth="2.5"/>
          <path d="M 92 95 Q 96 90 100 91 Q 104 90 108 95 Q 106 96 104 95 Q 100 93 96 95 Q 94 96 92 95 Z" fill="rgba(180,140,70,0.7)" stroke="#8b5a2b" strokeWidth="0.3"/>

          {/* Брови — мягкие */}
          <path d="M 93 102 Q 95 100 97 101" fill="none" stroke="#5a3a20" strokeWidth="0.5" strokeLinecap="round"/>
          <path d="M 103 101 Q 105 100 107 102" fill="none" stroke="#5a3a20" strokeWidth="0.5" strokeLinecap="round"/>

          {/* Глаза — миндалевидные, мирные */}
          <path d="M 93 106 Q 95 105 97 106 Q 97 107 95 108 Q 93 107 93 106 Z" fill="rgba(255,255,255,0.85)"/>
          <path d="M 103 106 Q 105 105 107 106 Q 107 107 105 108 Q 103 107 103 106 Z" fill="rgba(255,255,255,0.85)"/>
          <circle cx="95" cy="106.5" r="0.9" fill="#5a3a20"/>
          <circle cx="105" cy="106.5" r="0.9" fill="#5a3a20"/>
          <circle cx="95.3" cy="106.2" r="0.3" fill="rgba(255,255,255,0.9)"/>
          <circle cx="105.3" cy="106.2" r="0.3" fill="rgba(255,255,255,0.9)"/>

          {/* Нос */}
          <path d="M 100 110 L 99 116 Q 99 117 100 117 Q 101 117 101 116 Z" fill="none" stroke="#8b5a2b" strokeWidth="0.4" strokeLinecap="round"/>

          {/* Рот — мягкая улыбка */}
          <path d="M 96 119 Q 100 121 104 119" fill="none" stroke="#991b1b" strokeWidth="0.5" strokeLinecap="round"/>

          {/* Румянец */}
          <ellipse cx="94" cy="114" rx="1.5" ry="1" fill="rgba(220,120,80,0.25)"/>
          <ellipse cx="106" cy="114" rx="1.5" ry="1" fill="rgba(220,120,80,0.25)"/>

          {/* Золотой нимб — детальный */}
          <ellipse cx="100" cy="86" rx="11" ry="3.5" fill="none" stroke="#ffd700" strokeWidth="1.2" opacity="0.85"/>
          <ellipse cx="100" cy="86" rx="13" ry="4" fill="none" stroke="rgba(255,215,0,0.5)" strokeWidth="0.5"/>
          <ellipse cx="100" cy="86" rx="14" ry="4.5" fill="rgba(255,215,0,0.1)" stroke="none"/>
          {/* Свечение нимба */}
          <ellipse cx="100" cy="86" rx="15" ry="5" fill="rgba(255,215,0,0.06)" stroke="none"/>

          {/* ===== Крылья — большие, сказочные, с золотыми перьями ===== */}
          {/* Левое крыло — многоярусное */}
          <path d="M 88 130 Q 70 120 55 130 Q 50 145 55 160 Q 60 170 70 165 Q 75 155 80 145 Z"
            fill="rgba(255,255,255,0.4)" stroke="#b8860b" strokeWidth="0.4"/>
          {/* Перья — крупные, ярусами */}
          <path d="M 56 132 Q 64 138 60 150" fill="none" stroke="#b8860b" strokeWidth="0.4" opacity="0.6"/>
          <path d="M 60 128 Q 68 134 66 148" fill="none" stroke="#b8860b" strokeWidth="0.4" opacity="0.6"/>
          <path d="M 64 126 Q 72 132 72 146" fill="none" stroke="#b8860b" strokeWidth="0.4" opacity="0.6"/>
          <path d="M 68 126 Q 76 132 78 144" fill="none" stroke="#b8860b" strokeWidth="0.4" opacity="0.6"/>
          <path d="M 72 128 Q 80 134 82 144" fill="none" stroke="#b8860b" strokeWidth="0.4" opacity="0.6"/>
          <path d="M 76 130 Q 82 136 84 144" fill="none" stroke="#b8860b" strokeWidth="0.4" opacity="0.6"/>
          {/* Золотые кончики перьев */}
          <path d="M 56 132 Q 58 130 60 132 Q 58 134 56 132 Z" fill="#ffd700" opacity="0.5"/>
          <path d="M 60 128 Q 62 126 64 128 Q 62 130 60 128 Z" fill="#ffd700" opacity="0.5"/>
          <path d="M 64 126 Q 66 124 68 126 Q 66 128 64 126 Z" fill="#ffd700" opacity="0.5"/>
          <path d="M 68 126 Q 70 124 72 126 Q 70 128 68 126 Z" fill="#ffd700" opacity="0.5"/>
          <path d="M 72 128 Q 74 126 76 128 Q 74 130 72 128 Z" fill="#ffd700" opacity="0.5"/>

          {/* Правое крыло */}
          <path d="M 112 130 Q 130 120 145 130 Q 150 145 145 160 Q 140 170 130 165 Q 125 155 120 145 Z"
            fill="rgba(255,255,255,0.4)" stroke="#b8860b" strokeWidth="0.4"/>
          <path d="M 144 132 Q 136 138 140 150" fill="none" stroke="#b8860b" strokeWidth="0.4" opacity="0.6"/>
          <path d="M 140 128 Q 132 134 134 148" fill="none" stroke="#b8860b" strokeWidth="0.4" opacity="0.6"/>
          <path d="M 136 126 Q 128 132 128 146" fill="none" stroke="#b8860b" strokeWidth="0.4" opacity="0.6"/>
          <path d="M 132 126 Q 124 132 122 144" fill="none" stroke="#b8860b" strokeWidth="0.4" opacity="0.6"/>
          <path d="M 128 128 Q 120 134 118 144" fill="none" stroke="#b8860b" strokeWidth="0.4" opacity="0.6"/>
          <path d="M 124 130 Q 118 136 116 144" fill="none" stroke="#b8860b" strokeWidth="0.4" opacity="0.6"/>
          <path d="M 144 132 Q 142 130 140 132 Q 142 134 144 132 Z" fill="#ffd700" opacity="0.5"/>
          <path d="M 140 128 Q 138 126 136 128 Q 138 130 140 128 Z" fill="#ffd700" opacity="0.5"/>
          <path d="M 136 126 Q 134 124 132 126 Q 134 128 136 126 Z" fill="#ffd700" opacity="0.5"/>
          <path d="M 132 126 Q 130 124 128 126 Q 130 128 132 126 Z" fill="#ffd700" opacity="0.5"/>
          <path d="M 128 128 Q 126 126 124 128 Q 126 130 128 128 Z" fill="#ffd700" opacity="0.5"/>

          {/* Руки — вытянутые в стороны, держат кувшины */}
          {/* Левая рука */}
          <path d="M 88 145 Q 78 155 70 165" fill="none" stroke="rgba(232,200,160,0.9)" strokeWidth="3" strokeLinecap="round"/>
          <path d="M 88 145 Q 78 155 70 165" fill="none" stroke="#8b5a2b" strokeWidth="0.4"/>
          {/* Правая рука */}
          <path d="M 112 145 Q 122 155 130 165" fill="none" stroke="rgba(232,200,160,0.9)" strokeWidth="3" strokeLinecap="round"/>
          <path d="M 112 145 Q 122 155 130 165" fill="none" stroke="#8b5a2b" strokeWidth="0.4"/>
        </g>

        {/* ===== ЛЕВЫЙ КУВШИН — медный, детальный ===== */}
        <g>
          {/* Корпус */}
          <path d="M 64 175 Q 60 180 62 195 Q 64 205 70 207 Q 76 205 78 195 Q 80 180 76 175 Z"
            fill="rgba(184,115,51,0.5)" stroke="#5a3a20" strokeWidth="0.5"/>
          {/* Горло кувшина */}
          <path d="M 66 175 L 66 170 L 74 170 L 74 175 Z" fill="rgba(184,115,51,0.55)" stroke="#5a3a20" strokeWidth="0.4"/>
          {/* Венчик */}
          <path d="M 65 170 Q 70 168 75 170 L 75 172 Q 70 170 65 172 Z" fill="rgba(220,140,60,0.6)" stroke="#5a3a20" strokeWidth="0.3"/>
          {/* Ручка */}
          <path d="M 78 178 Q 84 180 84 188 Q 84 195 78 195" fill="none" stroke="rgba(184,115,51,0.7)" strokeWidth="1.5"/>
          {/* Узоры на кувшине */}
          <path d="M 64 188 Q 70 186 76 188" fill="none" stroke="#ffd700" strokeWidth="0.4" opacity="0.6"/>
          <path d="M 65 198 Q 70 196 75 198" fill="none" stroke="#ffd700" strokeWidth="0.4" opacity="0.6"/>
          {/* Вода в кувшине */}
          <ellipse cx="70" cy="171" rx="3.5" ry="1.2" fill="rgba(100,150,200,0.5)" stroke="#4a6a8a" strokeWidth="0.3"/>
        </g>

        {/* ===== ПРАВЫЙ КУВШИН — медный, детальный ===== */}
        <g>
          <path d="M 122 175 Q 118 180 120 195 Q 122 205 128 207 Q 134 205 136 195 Q 138 180 134 175 Z"
            fill="rgba(184,115,51,0.5)" stroke="#5a3a20" strokeWidth="0.5"/>
          <path d="M 124 175 L 124 170 L 132 170 L 132 175 Z" fill="rgba(184,115,51,0.55)" stroke="#5a3a20" strokeWidth="0.4"/>
          <path d="M 123 170 Q 128 168 133 170 L 133 172 Q 128 170 123 172 Z" fill="rgba(220,140,60,0.6)" stroke="#5a3a20" strokeWidth="0.3"/>
          {/* Ручка */}
          <path d="M 122 178 Q 116 180 116 188 Q 116 195 122 195" fill="none" stroke="rgba(184,115,51,0.7)" strokeWidth="1.5"/>
          {/* Узоры */}
          <path d="M 122 188 Q 128 186 134 188" fill="none" stroke="#ffd700" strokeWidth="0.4" opacity="0.6"/>
          <path d="M 123 198 Q 128 196 133 198" fill="none" stroke="#ffd700" strokeWidth="0.4" opacity="0.6"/>
        </g>

        {/* ===== Струя воды между кувшинами — детальная ===== */}
        <path d="M 74 172 Q 100 165 126 172" fill="none" stroke="rgba(100,150,200,0.5)" strokeWidth="1.5"/>
        <path d="M 76 173 Q 100 168 124 173" fill="none" stroke="rgba(150,200,255,0.6)" strokeWidth="0.8"/>
        {/* Капли воды */}
        <circle cx="90" cy="170" r="0.5" fill="rgba(150,200,255,0.7)"/>
        <circle cx="100" cy="168" r="0.6" fill="rgba(150,200,255,0.7)"/>
        <circle cx="110" cy="170" r="0.5" fill="rgba(150,200,255,0.7)"/>
        {/* Блики */}
        <circle cx="80" cy="172" r="0.3" fill="rgba(255,255,255,0.8)"/>
        <circle cx="120" cy="172" r="0.3" fill="rgba(255,255,255,0.8)"/>

        {/* Кувшинка на реке */}
        <g>
          <ellipse cx="40" cy="230" rx="4" ry="2" fill="rgba(34,100,40,0.6)" stroke="#2d6e2d" strokeWidth="0.3"/>
          <path d="M 38 230 Q 40 228 42 230 Q 40 232 38 230 Z" fill="rgba(220,180,200,0.6)" stroke="#991b1b" strokeWidth="0.2"/>
          <circle cx="40" cy="230" r="0.6" fill="#ffd700"/>
        </g>
        <g>
          <ellipse cx="160" cy="232" rx="4" ry="2" fill="rgba(34,100,40,0.6)" stroke="#2d6e2d" strokeWidth="0.3"/>
          <path d="M 158 232 Q 160 230 162 232 Q 160 234 158 232 Z" fill="rgba(255,255,255,0.7)" stroke="#b8860b" strokeWidth="0.2"/>
          <circle cx="160" cy="232" r="0.6" fill="#ffd700"/>
        </g>
      </g>
    ),

    // XV. ДЬЯВОЛ — сказочный рогатый дух над двумя фигурами
    "major-15": (
      <g>
        {/* Мрачная пещера — васнецовская */}
        <rect x="14" y="42" width="172" height="208" fill="rgba(40,15,10,0.22)" rx="2"/>
        {/* Огненное зарево снизу */}
        <path d="M 14 200 L 186 200 L 186 250 L 14 250 Z" fill="rgba(180,60,20,0.15)"/>
        <path d="M 14 230 L 186 230 L 186 250 L 14 250 Z" fill="rgba(255,100,30,0.12)"/>

        {/* Скалы по бокам — детальные, резные */}
        <path d="M 14 250 L 14 80 L 18 70 L 22 78 L 26 65 L 30 75 L 35 60 L 40 75 L 45 80 L 45 250 Z"
          fill="rgba(60,35,20,0.5)" stroke="#3a2010" strokeWidth="0.5"/>
        {/* Текстура скалы */}
        <path d="M 18 100 Q 22 130 20 170" fill="none" stroke="#3a2010" strokeWidth="0.4"/>
        <path d="M 28 90 Q 32 130 30 180" fill="none" stroke="#3a2010" strokeWidth="0.4"/>
        <path d="M 38 100 Q 40 140 38 200" fill="none" stroke="#3a2010" strokeWidth="0.4"/>
        {/* Трещины */}
        <path d="M 22 130 L 26 145 L 24 160" fill="none" stroke="#3a2010" strokeWidth="0.4"/>
        <path d="M 32 180 L 28 200 L 32 220" fill="none" stroke="#3a2010" strokeWidth="0.4"/>

        <path d="M 186 250 L 186 80 L 182 70 L 178 78 L 174 65 L 170 75 L 165 60 L 160 75 L 155 80 L 155 250 Z"
          fill="rgba(60,35,20,0.5)" stroke="#3a2010" strokeWidth="0.5"/>
        <path d="M 182 100 Q 178 130 180 170" fill="none" stroke="#3a2010" strokeWidth="0.4"/>
        <path d="M 172 90 Q 168 130 170 180" fill="none" stroke="#3a2010" strokeWidth="0.4"/>
        <path d="M 162 100 Q 160 140 162 200" fill="none" stroke="#3a2010" strokeWidth="0.4"/>
        <path d="M 178 130 L 174 145 L 176 160" fill="none" stroke="#3a2010" strokeWidth="0.4"/>
        <path d="M 168 180 L 172 200 L 168 220" fill="none" stroke="#3a2010" strokeWidth="0.4"/>

        {/* Пентаграмма — перевёрнутая, в верхней части */}
        <path d="M 100 55 L 105 70 L 120 70 L 108 80 L 112 95 L 100 86 L 88 95 L 92 80 L 80 70 L 95 70 Z"
          fill="none" stroke="rgba(255,215,0,0.5)" strokeWidth="0.6"/>
        <path d="M 100 55 L 105 70 L 120 70 L 108 80 L 112 95 L 100 86 L 88 95 L 92 80 L 80 70 L 95 70 Z"
          fill="rgba(255,215,0,0.05)" stroke="none"/>

        {/* ===== ДЬЯВОЛ — рогатый, крылатый ===== */}
        <g className="svg-breathe" style={{ transformOrigin: "100px 130px" }}>
          {/* Тело — тёмно-бордовое, мускулистое */}
          <path d="M 86 165 Q 84 145 88 125 Q 90 110 92 100 L 108 100 Q 110 110 112 125 Q 116 145 114 165 Q 100 170 86 165 Z"
            fill="rgba(80,20,20,0.6)" stroke="#5a1010" strokeWidth="0.6"/>
          {/* Складки тела */}
          <path d="M 92 110 Q 92 140 92 165" fill="none" stroke="rgba(40,10,10,0.5)" strokeWidth="0.4"/>
          <path d="M 100 110 Q 100 140 100 165" fill="none" stroke="rgba(40,10,10,0.4)" strokeWidth="0.3"/>
          <path d="M 108 110 Q 108 140 108 165" fill="none" stroke="rgba(40,10,10,0.5)" strokeWidth="0.4"/>

          {/* Золотой растительный узор на теле Дьявола */}
          <path d="M 88 130 Q 96 126 104 130 Q 100 135 96 132 Q 92 135 88 130 Z" fill="none" stroke="#ffd700" strokeWidth="0.4" opacity="0.6"/>
          <path d="M 88 150 Q 96 146 104 150 Q 100 155 96 152 Q 92 155 88 150 Z" fill="none" stroke="#ffd700" strokeWidth="0.4" opacity="0.6"/>

          {/* Голова — детальная, с чертами зверя */}
          <path d="M 92 95 Q 90 85 94 78 Q 97 74 100 73 Q 103 74 106 78 Q 110 85 108 95 Q 109 102 107 106 Q 104 110 100 110 Q 96 110 93 106 Q 91 102 92 95 Z"
            fill="rgba(80,50,35,0.7)" stroke="#3a2010" strokeWidth="0.5"/>

          {/* Рога — большие, загнутые, детальные */}
          <path d="M 92 78 Q 86 68 80 60 Q 76 56 78 64 Q 82 75 88 80 Z"
            fill="rgba(50,30,20,0.85)" stroke="#3a2010" strokeWidth="0.5"/>
          <path d="M 108 78 Q 114 68 120 60 Q 124 56 122 64 Q 118 75 112 80 Z"
            fill="rgba(50,30,20,0.85)" stroke="#3a2010" strokeWidth="0.5"/>
          {/* Блики на рогах */}
          <path d="M 85 70 Q 82 65 80 60" fill="none" stroke="rgba(180,140,70,0.4)" strokeWidth="0.3"/>
          <path d="M 115 70 Q 118 65 120 60" fill="none" stroke="rgba(180,140,70,0.4)" strokeWidth="0.3"/>

          {/* Борода — козлиная, седая */}
          <path d="M 96 106 Q 95 115 96 122 Q 98 124 100 122 Q 102 124 104 122 Q 105 115 104 106 Z"
            fill="rgba(180,160,130,0.7)" stroke="#3a2010" strokeWidth="0.3"/>

          {/* Глаза — горящие золотом */}
          <ellipse cx="96" cy="90" rx="1.2" ry="0.9" fill="rgba(255,80,20,0.9)"/>
          <ellipse cx="104" cy="90" rx="1.2" ry="0.9" fill="rgba(255,80,20,0.9)"/>
          <circle cx="96" cy="90" r="0.5" fill="#ffd700"/>
          <circle cx="104" cy="90" r="0.5" fill="#ffd700"/>

          {/* Брови — злые */}
          <path d="M 93 87 Q 96 85 99 87" fill="none" stroke="#3a2010" strokeWidth="0.5"/>
          <path d="M 101 87 Q 104 85 107 87" fill="none" stroke="#3a2010" strokeWidth="0.5"/>

          {/* Нос — крупный */}
          <path d="M 100 92 L 99 98 Q 99 99 100 99 Q 101 99 101 98 Z" fill="none" stroke="#3a2010" strokeWidth="0.3"/>

          {/* Рот — оскал с клыками */}
          <path d="M 95 102 Q 100 105 105 102" fill="none" stroke="#3a2010" strokeWidth="0.4"/>
          {/* Клыки */}
          <path d="M 96 102 L 96 105 L 97 105 Z" fill="rgba(245,235,210,0.8)"/>
          <path d="M 104 102 L 104 105 L 103 105 Z" fill="rgba(245,235,210,0.8)"/>

          {/* ===== Крылья — летучая мышь, крупные, детальные ===== */}
          {/* Левое крыло */}
          <path d="M 88 110 Q 70 100 55 115 Q 50 130 55 145 Q 65 135 75 130 Q 70 140 72 150 Q 80 142 88 138 Q 82 148 84 158 Q 90 150 92 140 Z"
            fill="rgba(60,30,20,0.5)" stroke="#3a2010" strokeWidth="0.5"/>
          {/* Перепонки крыла */}
          <path d="M 75 110 Q 70 130 65 140" fill="none" stroke="#3a2010" strokeWidth="0.4"/>
          <path d="M 80 110 Q 76 135 72 150" fill="none" stroke="#3a2010" strokeWidth="0.4"/>
          <path d="M 85 110 Q 82 140 80 155" fill="none" stroke="#3a2010" strokeWidth="0.4"/>

          {/* Правое крыло */}
          <path d="M 112 110 Q 130 100 145 115 Q 150 130 145 145 Q 135 135 125 130 Q 130 140 128 150 Q 120 142 112 138 Q 118 148 116 158 Q 110 150 108 140 Z"
            fill="rgba(60,30,20,0.5)" stroke="#3a2010" strokeWidth="0.5"/>
          <path d="M 125 110 Q 130 130 135 140" fill="none" stroke="#3a2010" strokeWidth="0.4"/>
          <path d="M 120 110 Q 124 135 128 150" fill="none" stroke="#3a2010" strokeWidth="0.4"/>
          <path d="M 115 110 Q 118 140 120 155" fill="none" stroke="#3a2010" strokeWidth="0.4"/>

          {/* Рука с факелом */}
          <path d="M 92 130 Q 85 125 80 118" fill="none" stroke="rgba(80,50,35,0.85)" strokeWidth="3" strokeLinecap="round"/>
          <path d="M 92 130 Q 85 125 80 118" fill="none" stroke="#3a2010" strokeWidth="0.4"/>
        </g>

        {/* ===== ФАКЕЛ в руке Дьявола ===== */}
        <g>
          {/* Древко факела */}
          <path d="M 78 120 L 78 100 L 81 100 L 81 120 Z" fill="rgba(80,55,30,0.85)" stroke="#3a2010" strokeWidth="0.4"/>
          {/* Металлический наконечник */}
          <path d="M 76 100 L 83 100 L 83 95 L 76 95 Z" fill="rgba(184,115,51,0.7)" stroke="#5a3a20" strokeWidth="0.4"/>
          {/* Пламя — большое, детальное */}
          <path d="M 77 95 Q 75 85 79 80 Q 81 85 81 80 Q 83 85 84 80 Q 85 90 82 95 Z"
            fill="rgba(255,140,30,0.7)" stroke="#b8860b" strokeWidth="0.4"/>
          <path d="M 78 93 Q 78 87 80 84 Q 82 87 82 84 Q 83 90 81 93 Z"
            fill="rgba(255,200,80,0.7)" stroke="none"/>
          <path d="M 79 91 Q 79 88 80 86 Q 81 88 81 91 Z"
            fill="rgba(255,255,200,0.7)" stroke="none"/>
          {/* Искры */}
          <circle cx="76" cy="78" r="0.4" fill="rgba(255,200,80,0.6)"/>
          <circle cx="85" cy="76" r="0.3" fill="rgba(255,200,80,0.5)"/>
        </g>

        {/* ===== Пьедестал — каменный, с резьбой ===== */}
        <path d="M 55 210 L 145 210 L 145 240 L 55 240 Z" fill="rgba(60,35,20,0.5)" stroke="#3a2010" strokeWidth="0.5"/>
        {/* Резьба пьедестала */}
        <path d="M 60 215 Q 65 213 70 215" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.4"/>
        <path d="M 130 215 Q 135 213 140 215" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.4"/>
        {/* Крюки для цепей на пьедестале */}
        <circle cx="65" cy="218" r="1.5" fill="rgba(80,55,30,0.8)" stroke="#3a2010" strokeWidth="0.3"/>
        <circle cx="135" cy="218" r="1.5" fill="rgba(80,55,30,0.8)" stroke="#3a2010" strokeWidth="0.3"/>

        {/* ===== Две фигуры у ног — прикованные ===== */}
        {/* Левая фигура — юноша */}
        <g>
          {/* Тело */}
          <path d="M 68 235 Q 67 220 70 215 L 80 215 Q 83 220 82 235 Q 75 240 68 235 Z"
            fill="rgba(184,134,11,0.4)" stroke="#5a3a20" strokeWidth="0.4"/>
          {/* Голова */}
          <path d="M 71 213 Q 70 207 73 204 Q 75 203 77 204 Q 80 207 79 213 Q 79 216 75 216 Q 71 216 71 213 Z"
            fill="rgba(232,200,160,0.8)" stroke="#8b5a2b" strokeWidth="0.4"/>
          {/* Волосы */}
          <path d="M 71 207 Q 73 204 75 203 Q 77 204 79 207 Q 77 206 75 205 Q 73 206 71 207 Z" fill="rgba(120,80,40,0.6)"/>
          {/* Глаза */}
          <circle cx="74" cy="209" r="0.4" fill="#3a2010"/>
          <circle cx="76.5" cy="209" r="0.4" fill="#3a2010"/>
          {/* Рот */}
          <path d="M 74 213 Q 75 213.5 76 213" fill="none" stroke="#991b1b" strokeWidth="0.3"/>

          {/* Маленькие рожки на голове юноши */}
          <path d="M 72 204 Q 70 200 72 198 Q 73 200 72 204 Z" fill="rgba(50,30,20,0.8)" stroke="#3a2010" strokeWidth="0.2"/>
          <path d="M 78 204 Q 80 200 78 198 Q 77 200 78 204 Z" fill="rgba(50,30,20,0.8)" stroke="#3a2010" strokeWidth="0.2"/>

          {/* Ошейник */}
          <ellipse cx="75" cy="217" rx="4" ry="1.2" fill="none" stroke="#5a3a20" strokeWidth="0.6"/>
          <circle cx="75" cy="218" r="0.8" fill="rgba(120,90,50,0.8)"/>

          {/* Цепь от ошейника к пьедесталу */}
          <path d="M 75 219 Q 70 222 65 220" fill="none" stroke="rgba(120,90,50,0.8)" strokeWidth="0.5" strokeDasharray="1.5 1"/>
        </g>

        {/* Правая фигура — девица */}
        <g>
          <path d="M 118 235 Q 117 220 120 215 L 130 215 Q 133 220 132 235 Q 125 240 118 235 Z"
            fill="rgba(120,20,20,0.4)" stroke="#5a1010" strokeWidth="0.4"/>
          {/* Голова */}
          <path d="M 121 213 Q 120 207 123 204 Q 125 203 127 204 Q 130 207 129 213 Q 129 216 125 216 Q 121 216 121 213 Z"
            fill="rgba(232,200,160,0.8)" stroke="#8b5a2b" strokeWidth="0.4"/>
          {/* Волосы — длинные */}
          <path d="M 121 210 Q 117 215 119 230" fill="none" stroke="rgba(120,80,40,0.7)" strokeWidth="1.2"/>
          <path d="M 129 210 Q 133 215 131 230" fill="none" stroke="rgba(120,80,40,0.7)" strokeWidth="1.2"/>
          {/* Глаза */}
          <circle cx="124" cy="209" r="0.4" fill="#3a2010"/>
          <circle cx="126.5" cy="209" r="0.4" fill="#3a2010"/>
          {/* Рот */}
          <path d="M 124 213 Q 125 213.5 126 213" fill="none" stroke="#991b1b" strokeWidth="0.3"/>

          {/* Маленькие рожки */}
          <path d="M 122 204 Q 120 200 122 198 Q 123 200 122 204 Z" fill="rgba(50,30,20,0.8)" stroke="#3a2010" strokeWidth="0.2"/>
          <path d="M 128 204 Q 130 200 128 198 Q 127 200 128 204 Z" fill="rgba(50,30,20,0.8)" stroke="#3a2010" strokeWidth="0.2"/>

          {/* Ошейник */}
          <ellipse cx="125" cy="217" rx="4" ry="1.2" fill="none" stroke="#5a3a20" strokeWidth="0.6"/>
          <circle cx="125" cy="218" r="0.8" fill="rgba(120,90,50,0.8)"/>

          {/* Цепь от ошейника */}
          <path d="M 125 219 Q 130 222 135 220" fill="none" stroke="rgba(120,90,50,0.8)" strokeWidth="0.5" strokeDasharray="1.5 1"/>
        </g>

        {/* Цепь между фигурами */}
        <path d="M 79 217 Q 100 215 121 217" fill="none" stroke="rgba(120,90,50,0.8)" strokeWidth="0.5" strokeDasharray="2 1.5"/>
      </g>
    ),

    // XVI. БАШНЯ — сказочная башня, разрушаемая молнией
    "major-16": (
      <g>
        {/* Грозовое небо — тёмно-фиолетовое */}
        <rect x="14" y="42" width="172" height="208" fill="rgba(40,30,50,0.22)" rx="2"/>
        {/* Зарево грозы */}
        <path d="M 14 80 L 186 80 L 186 50 L 14 50 Z" fill="rgba(80,40,90,0.15)"/>

        {/* Тёмные облака — рваные, детальные */}
        <path d="M 20 70 Q 35 60 50 65 Q 65 55 80 65 Q 95 60 110 68 Q 95 75 80 72 Q 65 78 50 72 Q 35 75 20 70 Z" fill="rgba(40,25,50,0.5)"/>
        <path d="M 90 60 Q 105 50 120 58 Q 135 50 150 60 Q 165 55 180 65 Q 165 70 150 65 Q 135 72 120 65 Q 105 70 90 60 Z" fill="rgba(40,25,50,0.5)"/>

        {/* ===== МОЛНИЯ — мощная, золотая, зигзагом ===== */}
        <path d="M 100 50 L 95 70 L 105 75 L 95 95 L 105 100 L 95 120" fill="none" stroke="#ffd700" strokeWidth="2" opacity="0.95"/>
        <path d="M 100 50 L 95 70 L 105 75 L 95 95 L 105 100 L 95 120" fill="none" stroke="rgba(255,255,200,0.9)" strokeWidth="0.8"/>
        {/* Свечение молнии */}
        <path d="M 100 50 L 95 70 L 105 75 L 95 95 L 105 100 L 95 120" fill="none" stroke="rgba(255,215,0,0.3)" strokeWidth="5"/>
        {/* Точка удара */}
        <circle cx="95" cy="120" r="4" fill="rgba(255,215,0,0.5)" stroke="#b8860b" strokeWidth="0.4"/>
        <circle cx="95" cy="120" r="2" fill="rgba(255,255,200,0.7)"/>

        {/* Дождь — косые линии */}
        <path d="M 30 90 L 25 100" stroke="rgba(150,180,200,0.4)" strokeWidth="0.4"/>
        <path d="M 50 95 L 45 105" stroke="rgba(150,180,200,0.4)" strokeWidth="0.4"/>
        <path d="M 70 100 L 65 110" stroke="rgba(150,180,200,0.4)" strokeWidth="0.4"/>
        <path d="M 140 95 L 135 105" stroke="rgba(150,180,200,0.4)" strokeWidth="0.4"/>
        <path d="M 160 100 L 155 110" stroke="rgba(150,180,200,0.4)" strokeWidth="0.4"/>
        <path d="M 175 95 L 170 105" stroke="rgba(150,180,200,0.4)" strokeWidth="0.4"/>

        {/* Дальние холмы — тёмные */}
        <path d="M 14 220 Q 50 215 100 218 Q 150 215 186 220 L 186 250 L 14 250 Z" fill="rgba(60,35,25,0.4)" stroke="#3a2010" strokeWidth="0.4"/>

        {/* ===== БАШНЯ — каменная, васнецовская, детальная ===== */}
        {/* Основной корпус башни */}
        <path d="M 78 240 L 78 110 L 122 110 L 122 240 Z" fill="rgba(80,60,45,0.65)" stroke="#3a2010" strokeWidth="0.7"/>

        {/* Каменная кладка — горизонтальные швы */}
        <line x1="78" y1="140" x2="122" y2="140" stroke="#3a2010" strokeWidth="0.4"/>
        <line x1="78" y1="170" x2="122" y2="170" stroke="#3a2010" strokeWidth="0.4"/>
        <line x1="78" y1="200" x2="122" y2="200" stroke="#3a2010" strokeWidth="0.4"/>
        <line x1="78" y1="225" x2="122" y2="225" stroke="#3a2010" strokeWidth="0.4"/>
        {/* Каменная кладка — вертикальные швы (смещённые) */}
        <line x1="90" y1="110" x2="90" y2="140" stroke="#3a2010" strokeWidth="0.3"/>
        <line x1="110" y1="110" x2="110" y2="140" stroke="#3a2010" strokeWidth="0.3"/>
        <line x1="85" y1="140" x2="85" y2="170" stroke="#3a2010" strokeWidth="0.3"/>
        <line x1="100" y1="140" x2="100" y2="170" stroke="#3a2010" strokeWidth="0.3"/>
        <line x1="115" y1="140" x2="115" y2="170" stroke="#3a2010" strokeWidth="0.3"/>
        <line x1="90" y1="170" x2="90" y2="200" stroke="#3a2010" strokeWidth="0.3"/>
        <line x1="110" y1="170" x2="110" y2="200" stroke="#3a2010" strokeWidth="0.3"/>
        <line x1="85" y1="200" x2="85" y2="225" stroke="#3a2010" strokeWidth="0.3"/>
        <line x1="100" y1="200" x2="100" y2="225" stroke="#3a2010" strokeWidth="0.3"/>
        <line x1="115" y1="200" x2="115" y2="225" stroke="#3a2010" strokeWidth="0.3"/>

        {/* Зубцы башни — резные, детальные */}
        <path d="M 78 110 L 78 100 L 84 100 L 84 108 L 90 108 L 90 100 L 96 100 L 96 108 L 102 108 L 102 100 L 108 100 L 108 108 L 114 108 L 114 100 L 120 100 L 120 110 Z"
          fill="rgba(80,60,45,0.75)" stroke="#3a2010" strokeWidth="0.5"/>

        {/* Купол башни — разрушен, золотой каркас */}
        <path d="M 84 100 Q 100 88 116 100" fill="none" stroke="#b8860b" strokeWidth="0.6"/>
        {/* Шпиль — сломанный */}
        <path d="M 100 88 L 100 78 L 102 78 L 102 88 Z" fill="rgba(80,55,30,0.7)" stroke="#3a2010" strokeWidth="0.3"/>
        <path d="M 100 78 L 98 70" fill="none" stroke="rgba(80,55,30,0.7)" strokeWidth="1"/>

        {/* Окна башни — арочные, с решётками */}
        <path d="M 95 145 Q 95 135 100 135 Q 105 135 105 145 L 105 155 L 95 155 Z" fill="rgba(255,140,0,0.3)" stroke="#b8860b" strokeWidth="0.5"/>
        {/* Решётка окна */}
        <line x1="100" y1="135" x2="100" y2="155" stroke="#5a3a20" strokeWidth="0.3"/>
        <line x1="95" y1="145" x2="105" y2="145" stroke="#5a3a20" strokeWidth="0.3"/>

        <path d="M 95 185 Q 95 175 100 175 Q 105 175 105 185 L 105 195 L 95 195 Z" fill="rgba(255,140,0,0.25)" stroke="#b8860b" strokeWidth="0.5"/>
        <line x1="100" y1="175" x2="100" y2="195" stroke="#5a3a20" strokeWidth="0.3"/>
        <line x1="95" y1="185" x2="105" y2="185" stroke="#5a3a20" strokeWidth="0.3"/>

        {/* Дверь башни — резная, арочная */}
        <path d="M 92 240 L 92 215 Q 92 205 100 205 Q 108 205 108 215 L 108 240 Z" fill="rgba(50,30,15,0.7)" stroke="#3a2010" strokeWidth="0.5"/>
        {/* Резьба двери */}
        <path d="M 96 215 Q 100 213 104 215" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.5"/>
        <path d="M 96 225 Q 100 223 104 225" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.5"/>

        {/* ===== ТРЕЩИНА от молнии — крупная, зигзагом ===== */}
        <path d="M 95 110 L 92 130 L 98 145 L 90 165 L 100 180 L 92 200 L 102 220 L 96 240" fill="none" stroke="rgba(255,215,0,0.8)" strokeWidth="1.5"/>
        <path d="M 95 110 L 92 130 L 98 145 L 90 165 L 100 180 L 92 200 L 102 220 L 96 240" fill="none" stroke="rgba(255,255,200,0.9)" strokeWidth="0.5"/>
        {/* Свет из трещины */}
        <path d="M 92 130 L 98 145" fill="none" stroke="rgba(255,140,30,0.5)" strokeWidth="0.8"/>
        <path d="M 100 180 L 102 220" fill="none" stroke="rgba(255,140,30,0.5)" strokeWidth="0.8"/>

        {/* ===== Две фигуры, падающие из башни ===== */}
        {/* Левая фигура — царь, с короной */}
        <g>
          {/* Тело — в красной мантии */}
          <path d="M 70 165 Q 68 155 70 145 L 80 145 Q 82 155 80 165 Q 75 170 70 165 Z"
            fill="rgba(120,20,20,0.55)" stroke="#5a1010" strokeWidth="0.5"/>
          {/* Голова */}
          <path d="M 72 142 Q 71 137 74 134 Q 76 133 78 134 Q 81 137 80 142 Q 80 145 76 145 Q 72 145 72 142 Z"
            fill="rgba(232,200,160,0.85)" stroke="#8b5a2b" strokeWidth="0.4"/>
          {/* Глаза — испуганные */}
          <circle cx="75" cy="139" r="0.4" fill="#3a2010"/>
          <circle cx="78" cy="139" r="0.4" fill="#3a2010"/>
          {/* Рот — открыт в крике */}
          <ellipse cx="76.5" cy="142" rx="0.6" ry="0.8" fill="#3a2010"/>
          {/* Корона — падающая с головы */}
          <path d="M 73 134 L 75 130 L 77 132 L 79 130 L 80 134 Z" fill="rgba(255,215,0,0.6)" stroke="#b8860b" strokeWidth="0.3"/>
          <circle cx="76.5" cy="132" r="0.4" fill="#991b1b"/>
          {/* Руки — раскинуты в падении */}
          <path d="M 72 150 Q 65 155 60 165" fill="none" stroke="rgba(232,200,160,0.85)" strokeWidth="2" strokeLinecap="round"/>
          <path d="M 80 150 Q 86 152 90 158" fill="none" stroke="rgba(232,200,160,0.85)" strokeWidth="2" strokeLinecap="round"/>
          {/* Ноги — в падении */}
          <path d="M 74 165 Q 70 175 67 185" fill="none" stroke="rgba(232,200,160,0.85)" strokeWidth="2" strokeLinecap="round"/>
          <path d="M 78 165 Q 80 175 82 183" fill="none" stroke="rgba(232,200,160,0.85)" strokeWidth="2" strokeLinecap="round"/>
        </g>

        {/* Правая фигура — в синей одежде */}
        <g>
          {/* Тело */}
          <path d="M 115 160 Q 113 150 115 140 L 125 140 Q 127 150 125 160 Q 120 165 115 160 Z"
            fill="rgba(30,30,80,0.55)" stroke="#1e1e50" strokeWidth="0.5"/>
          {/* Голова */}
          <path d="M 117 138 Q 116 133 119 130 Q 121 129 123 130 Q 126 133 125 138 Q 125 141 121 141 Q 117 141 117 138 Z"
            fill="rgba(232,200,160,0.85)" stroke="#8b5a2b" strokeWidth="0.4"/>
          {/* Глаза */}
          <circle cx="120" cy="135" r="0.4" fill="#3a2010"/>
          <circle cx="123" cy="135" r="0.4" fill="#3a2010"/>
          {/* Рот */}
          <ellipse cx="121.5" cy="138" rx="0.6" ry="0.8" fill="#3a2010"/>
          {/* Волосы */}
          <path d="M 117 134 Q 121 130 125 134 Q 123 132 121 131 Q 119 132 117 134 Z" fill="rgba(120,80,40,0.6)"/>
          {/* Руки */}
          <path d="M 117 148 Q 112 152 108 158" fill="none" stroke="rgba(232,200,160,0.85)" strokeWidth="2" strokeLinecap="round"/>
          <path d="M 125 148 Q 132 152 136 160" fill="none" stroke="rgba(232,200,160,0.85)" strokeWidth="2" strokeLinecap="round"/>
          {/* Ноги */}
          <path d="M 118 160 Q 122 170 124 180" fill="none" stroke="rgba(232,200,160,0.85)" strokeWidth="2" strokeLinecap="round"/>
          <path d="M 122 160 Q 126 170 128 178" fill="none" stroke="rgba(232,200,160,0.85)" strokeWidth="2" strokeLinecap="round"/>
        </g>

        {/* ===== Камни, летящие вниз — детальные ===== */}
        <g>
          <path d="M 65 195 Q 62 192 65 188 Q 70 188 70 193 Q 68 197 65 195 Z" fill="rgba(80,60,45,0.7)" stroke="#3a2010" strokeWidth="0.3" transform="rotate(15 67 192)"/>
          <path d="M 138 190 Q 135 187 138 183 Q 143 183 143 188 Q 141 192 138 190 Z" fill="rgba(80,60,45,0.7)" stroke="#3a2010" strokeWidth="0.3" transform="rotate(-20 140 187)"/>
          <path d="M 55 210 Q 53 208 55 205 Q 58 205 58 208 Q 57 211 55 210 Z" fill="rgba(80,60,45,0.6)" stroke="#3a2010" strokeWidth="0.3" transform="rotate(30 56 208)"/>
          <path d="M 148 215 Q 146 213 148 210 Q 151 210 151 213 Q 150 216 148 215 Z" fill="rgba(80,60,45,0.6)" stroke="#3a2010" strokeWidth="0.3" transform="rotate(-15 149 213)"/>
        </g>

        {/* Дым и пепел */}
        <path d="M 90 130 Q 95 125 100 130 Q 105 125 110 130" fill="none" stroke="rgba(120,100,90,0.4)" strokeWidth="0.5"/>
        <path d="M 85 140 Q 92 135 100 140 Q 108 135 115 140" fill="none" stroke="rgba(120,100,90,0.3)" strokeWidth="0.4"/>
        {/* Искры */}
        <circle cx="75" cy="155" r="0.4" fill="rgba(255,180,40,0.7)"/>
        <circle cx="125" cy="150" r="0.4" fill="rgba(255,180,40,0.7)"/>
        <circle cx="65" cy="170" r="0.3" fill="rgba(255,180,40,0.6)"/>
        <circle cx="135" cy="175" r="0.3" fill="rgba(255,180,40,0.6)"/>
      </g>
    ),

    // XVII. ЗВЕЗДА — сказочная дева у источника под звёздным небом
    "major-17": (
      <g>
        {/* Звёздное небо — васнецовское, тёмно-синее */}
        <rect x="14" y="42" width="172" height="130" fill="rgba(30,20,50,0.18)" rx="2"/>
        {/* Полосы Млечного пути */}
        <path d="M 14 80 Q 60 70 100 75 Q 140 70 186 80 L 186 95 Q 140 85 100 90 Q 60 85 14 95 Z" fill="rgba(150,180,200,0.05)"/>

        {/* Звёзды — крупные, золотые, мерцающие */}
        {[[40,60],[60,55],[80,65],[100,50],[120,60],[140,58],[160,65],[50,80],[80,75],[130,75],[150,80],[170,70]].map(([x,y]: any, i: number) => (
          <g key={i}>
            <path d={`M${x},${y-3} L${x+0.6},${y-0.6} L${x+3},${y} L${x+0.6},${y+0.6} L${x},${y+3} L${x-0.6},${y+0.6} L${x-3},${y} L${x-0.6},${y-0.6} Z`} fill="#ffd700" opacity="0.7"/>
            <circle cx={x} cy={y} r="0.4" fill="rgba(255,255,255,0.9)"/>
          </g>
        ))}

        {/* Большая звезда — центральная, с лучами */}
        <g>
          <path d="M 100 85 L 102 92 L 109 93 L 103 97 L 105 104 L 100 100 L 95 104 L 97 97 L 91 93 L 98 92 Z" fill="#ffd700" opacity="0.8" stroke="#b8860b" strokeWidth="0.4"/>
          {/* Лучи большой звезды */}
          <line x1="100" y1="80" x2="100" y2="75" stroke="#ffd700" strokeWidth="0.5" opacity="0.6"/>
          <line x1="100" y1="108" x2="100" y2="113" stroke="#ffd700" strokeWidth="0.5" opacity="0.6"/>
          <line x1="86" y1="93" x2="80" y2="93" stroke="#ffd700" strokeWidth="0.5" opacity="0.6"/>
          <line x1="120" y1="93" x2="114" y2="93" stroke="#ffd700" strokeWidth="0.5" opacity="0.6"/>
          <circle cx="100" cy="93" r="3" fill="rgba(255,215,0,0.15)"/>
          <circle cx="100" cy="93" r="2" fill="rgba(255,255,200,0.4)"/>
        </g>

        {/* Холмы дальние */}
        <path d="M 14 170 Q 50 160 100 165 Q 150 160 186 170 L 186 195 L 14 195 Z" fill="rgba(120,80,40,0.2)" stroke="#5a3a20" strokeWidth="0.3"/>
        {/* Дальние деревья */}
        <path d="M 30 165 L 30 158 L 32 154 L 34 158 L 34 165 Z" fill="rgba(34,100,40,0.4)" stroke="#2d6e2d" strokeWidth="0.3"/>
        <path d="M 165 165 L 165 158 L 167 154 L 169 158 L 169 165 Z" fill="rgba(34,100,40,0.4)" stroke="#2d6e2d" strokeWidth="0.3"/>

        {/* Цветочный луг */}
        <path d="M 14 195 Q 50 192 100 195 Q 150 192 186 195 L 186 250 L 14 250 Z" fill="rgba(60,50,30,0.2)" stroke="#5a3a20" strokeWidth="0.3"/>
        {/* Цветы */}
        <g>
          <circle cx="30" cy="225" r="1.8" fill="rgba(220,60,60,0.7)" stroke="#991b1b" strokeWidth="0.3"/>
          <path d="M 28 225 Q 30 223 32 225 Q 30 227 28 225" fill="rgba(255,180,180,0.5)"/>
          <path d="M 30 225 L 30 230" fill="none" stroke="#2d6e2d" strokeWidth="0.4"/>

          <circle cx="170" cy="225" r="1.8" fill="#ffd700" opacity="0.7" stroke="#b8860b" strokeWidth="0.3"/>
          <path d="M 168.5 224 Q 170 222 171.5 224 Q 170 226 168.5 224" fill="rgba(255,235,150,0.6)"/>
          <path d="M 170 225 L 170 230" fill="none" stroke="#2d6e2d" strokeWidth="0.4"/>

          <circle cx="60" cy="235" r="1.5" fill="rgba(220,180,200,0.7)" stroke="#991b1b" strokeWidth="0.3"/>
          <path d="M 60 235 L 60 240" fill="none" stroke="#2d6e2d" strokeWidth="0.4"/>
          <circle cx="140" cy="235" r="1.5" fill="rgba(180,60,60,0.7)" stroke="#991b1b" strokeWidth="0.3"/>
          <path d="M 140 235 L 140 240" fill="none" stroke="#2d6e2d" strokeWidth="0.4"/>
        </g>

        {/* ===== Источник / озеро — с волнами ===== */}
        <ellipse cx="100" cy="225" rx="35" ry="9" fill="rgba(70,100,130,0.35)" stroke="#4a6a8a" strokeWidth="0.5"/>
        {/* Волны */}
        <path d="M 70 222 Q 80 220 90 222 Q 100 224 110 222 Q 120 220 130 222" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.4"/>
        <path d="M 75 228 Q 85 226 95 228 Q 105 230 115 228 Q 125 226 130 228" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.4"/>
        {/* Отражение звезды в воде */}
        <path d="M 97 230 L 99 233 L 102 233 L 100 235 L 101 238 L 100 236 L 99 238 L 100 235 L 98 233 L 101 233 Z" fill="rgba(255,215,0,0.3)"/>

        {/* Дерево — берёза, детальное */}
        <path d="M 30 250 L 30 130 L 32 125 L 34 130 L 34 250 Z" fill="rgba(220,220,220,0.3)" stroke="#8b5a2b" strokeWidth="0.4"/>
        {/* Береста — пятна */}
        <path d="M 31 150 Q 33 152 31 154" fill="none" stroke="#3a2010" strokeWidth="0.4"/>
        <path d="M 31 180 Q 33 182 31 184" fill="none" stroke="#3a2010" strokeWidth="0.4"/>
        <path d="M 31 210 Q 33 212 31 214" fill="none" stroke="#3a2010" strokeWidth="0.4"/>
        {/* Крона берёзы — пышная */}
        <path d="M 22 130 Q 32 110 42 125 Q 38 105 50 120 Q 46 105 32 115 Q 26 120 22 130 Z" fill="rgba(34,100,40,0.4)" stroke="#2d6e2d" strokeWidth="0.4"/>
        <path d="M 24 140 Q 32 125 40 135 Q 36 122 44 132 Q 38 120 32 132 Q 26 135 24 140 Z" fill="rgba(34,100,40,0.35)" stroke="#2d6e2d" strokeWidth="0.3"/>

        {/* Птица на ветке */}
        <path d="M 38 125 Q 41 122 44 125 Q 41 124 38 125 Z" fill="rgba(80,60,40,0.6)" stroke="#3a2010" strokeWidth="0.3"/>

        {/* ===== ДЕВА — у источника, на колене ===== */}
        <g className="svg-breathe" style={{ transformOrigin: "100px 195px" }}>
          {/* Одеяние — светлое, длинное */}
          <path d="M 80 230 Q 82 215 86 200 Q 88 180 92 160 L 108 160 Q 112 180 114 200 Q 118 215 120 230 Q 100 235 80 230 Z"
            fill="rgba(220,200,170,0.35)" stroke="#b8860b" strokeWidth="0.5"/>
          {/* Складки одеяния */}
          <path d="M 86 175 Q 88 205 86 230" fill="none" stroke="rgba(180,140,70,0.4)" strokeWidth="0.4"/>
          <path d="M 94 175 Q 96 205 94 230" fill="none" stroke="rgba(180,140,70,0.3)" strokeWidth="0.3"/>
          <path d="M 100 175 Q 100 205 100 230" fill="none" stroke="rgba(180,140,70,0.3)" strokeWidth="0.3"/>
          <path d="M 106 175 Q 104 205 106 230" fill="none" stroke="rgba(180,140,70,0.3)" strokeWidth="0.3"/>
          <path d="M 114 175 Q 112 205 114 230" fill="none" stroke="rgba(180,140,70,0.4)" strokeWidth="0.4"/>

          {/* Золотой растительный узор на одеянии */}
          <path d="M 84 195 Q 92 191 100 195 Q 108 191 116 195 Q 110 201 100 197 Q 92 201 84 195 Z" fill="none" stroke="#ffd700" strokeWidth="0.4" opacity="0.6"/>

          {/* Шея */}
          <path d="M 96 148 L 96 160 L 104 160 L 104 148 Z" fill="rgba(232,200,160,0.9)" stroke="#8b5a2b" strokeWidth="0.3"/>

          {/* Лицо — детальное, овальное, кроткое */}
          <path d="M 92 140 Q 90 130 94 123 Q 97 119 100 118 Q 103 119 106 123 Q 110 130 108 140 Q 109 146 107 150 Q 104 154 100 154 Q 96 154 93 150 Q 91 146 92 140 Z"
            fill="rgba(232,200,160,0.92)" stroke="#8b5a2b" strokeWidth="0.4"/>

          {/* Брови — мягкие */}
          <path d="M 93 130 Q 95 128 97 129" fill="none" stroke="#5a3a20" strokeWidth="0.5" strokeLinecap="round"/>
          <path d="M 103 129 Q 105 128 107 130" fill="none" stroke="#5a3a20" strokeWidth="0.5" strokeLinecap="round"/>

          {/* Глаза — мирные */}
          <path d="M 93 134 Q 95 133 97 134 Q 97 135 95 136 Q 93 135 93 134 Z" fill="rgba(255,255,255,0.85)"/>
          <path d="M 103 134 Q 105 133 107 134 Q 107 135 105 136 Q 103 135 103 134 Z" fill="rgba(255,255,255,0.85)"/>
          <circle cx="95" cy="134.5" r="0.9" fill="#5a3a20"/>
          <circle cx="105" cy="134.5" r="0.9" fill="#5a3a20"/>

          {/* Нос */}
          <path d="M 100 138 L 99 144 Q 99 145 100 145 Q 101 145 101 144 Z" fill="none" stroke="#8b5a2b" strokeWidth="0.4"/>

          {/* Рот — мягкая улыбка */}
          <path d="M 96 147 Q 100 149 104 147" fill="none" stroke="#991b1b" strokeWidth="0.5" strokeLinecap="round"/>

          {/* Румянец */}
          <ellipse cx="94" cy="142" rx="1.5" ry="1" fill="rgba(220,120,80,0.25)"/>
          <ellipse cx="106" cy="142" rx="1.5" ry="1" fill="rgba(220,120,80,0.25)"/>

          {/* Длинные волосы — струящиеся, тёмные */}
          <path d="M 88 130 Q 82 165 84 200" fill="none" stroke="rgba(80,50,30,0.8)" strokeWidth="3" strokeLinecap="round"/>
          <path d="M 112 130 Q 118 165 116 200" fill="none" stroke="rgba(80,50,30,0.8)" strokeWidth="3" strokeLinecap="round"/>
          <path d="M 90 125 Q 92 160 94 195" fill="none" stroke="rgba(80,50,30,0.6)" strokeWidth="2" strokeLinecap="round"/>
          <path d="M 110 125 Q 108 160 106 195" fill="none" stroke="rgba(80,50,30,0.6)" strokeWidth="2" strokeLinecap="round"/>
          {/* Пряди волос */}
          <path d="M 92 123 Q 96 120 100 121 Q 104 120 108 123 Q 106 124 104 123 Q 100 121 96 123 Q 94 124 92 123 Z" fill="rgba(80,50,30,0.8)"/>

          {/* Руки — вытянутые с кувшинами */}
          {/* Левая рука — вниз, льёт в воду */}
          <path d="M 90 175 Q 84 185 80 195" fill="none" stroke="rgba(232,200,160,0.9)" strokeWidth="3" strokeLinecap="round"/>
          <path d="M 90 175 Q 84 185 80 195" fill="none" stroke="#8b5a2b" strokeWidth="0.4"/>
          {/* Правая рука — на земле, льёт на траву */}
          <path d="M 110 175 Q 116 185 120 195" fill="none" stroke="rgba(232,200,160,0.9)" strokeWidth="3" strokeLinecap="round"/>
          <path d="M 110 175 Q 116 185 120 195" fill="none" stroke="#8b5a2b" strokeWidth="0.4"/>
        </g>

        {/* ===== ЛЕВЫЙ КУВШИН — медный, в левой руке ===== */}
        <g>
          <path d="M 76 195 Q 72 200 74 213 Q 76 220 80 220 Q 84 220 86 213 Q 88 200 84 195 Z" fill="rgba(184,115,51,0.5)" stroke="#5a3a20" strokeWidth="0.5"/>
          {/* Горло */}
          <path d="M 77 195 L 77 190 L 83 190 L 83 195 Z" fill="rgba(184,115,51,0.55)" stroke="#5a3a20" strokeWidth="0.4"/>
          {/* Ручка */}
          <path d="M 86 197 Q 90 200 90 207 Q 90 213 86 215" fill="none" stroke="rgba(184,115,51,0.7)" strokeWidth="1.2"/>
          {/* Узоры */}
          <path d="M 76 208 Q 80 206 84 208" fill="none" stroke="#ffd700" strokeWidth="0.4" opacity="0.6"/>
          <path d="M 75 215 Q 80 213 85 215" fill="none" stroke="#ffd700" strokeWidth="0.4" opacity="0.6"/>
        </g>

        {/* ===== ПРАВЫЙ КУВШИН — медный, в правой руке ===== */}
        <g>
          <path d="M 114 195 Q 110 200 112 213 Q 114 220 118 220 Q 122 220 124 213 Q 126 200 122 195 Z" fill="rgba(184,115,51,0.5)" stroke="#5a3a20" strokeWidth="0.5"/>
          <path d="M 115 195 L 115 190 L 121 190 L 121 195 Z" fill="rgba(184,115,51,0.55)" stroke="#5a3a20" strokeWidth="0.4"/>
          <path d="M 114 197 Q 110 200 110 207 Q 110 213 114 215" fill="none" stroke="rgba(184,115,51,0.7)" strokeWidth="1.2"/>
          <path d="M 114 208 Q 118 206 122 208" fill="none" stroke="#ffd700" strokeWidth="0.4" opacity="0.6"/>
          <path d="M 113 215 Q 118 213 123 215" fill="none" stroke="#ffd700" strokeWidth="0.4" opacity="0.6"/>
        </g>

        {/* ===== Струи воды из кувшинов ===== */}
        {/* Левая струя — в озеро */}
        <path d="M 78 195 Q 76 210 75 220" fill="none" stroke="rgba(100,150,200,0.5)" strokeWidth="1"/>
        <path d="M 80 196 Q 78 210 78 222" fill="none" stroke="rgba(150,200,255,0.6)" strokeWidth="0.6"/>
        {/* Капли */}
        <circle cx="76" cy="215" r="0.4" fill="rgba(150,200,255,0.7)"/>
        <circle cx="77" cy="218" r="0.3" fill="rgba(150,200,255,0.6)"/>
        {/* Правая струя — на землю */}
        <path d="M 122 195 Q 124 210 126 220" fill="none" stroke="rgba(100,150,200,0.5)" strokeWidth="1"/>
        <path d="M 120 196 Q 122 210 124 222" fill="none" stroke="rgba(150,200,255,0.6)" strokeWidth="0.6"/>
        <circle cx="125" cy="215" r="0.4" fill="rgba(150,200,255,0.7)"/>
        <circle cx="124" cy="218" r="0.3" fill="rgba(150,200,255,0.6)"/>

        {/* Птица летящая в небе */}
        <path d="M 50 100 Q 53 98 56 100 Q 53 99 50 100 Z" fill="rgba(80,60,40,0.5)"/>
        <path d="M 150 110 Q 153 108 156 110 Q 153 109 150 110 Z" fill="rgba(80,60,40,0.5)"/>
      </g>
    ),

    // XVIII. ЛУНА — сказочный ночной пейзаж с двумя башнями
    "major-18": (
      <g>
        {/* Ночное небо — тёмно-синее, васнецовское */}
        <rect x="14" y="42" width="172" height="208" fill="rgba(20,20,50,0.25)" rx="2"/>
        {/* Полосы сумерек */}
        <path d="M 14 100 L 186 100 L 186 80 L 14 80 Z" fill="rgba(60,40,80,0.15)"/>

        {/* ===== ЛУНА — крупная, детальная, с лицом ===== */}
        {/* Свечение вокруг */}
        <circle cx="100" cy="80" r="22" fill="rgba(255,250,220,0.08)" stroke="none"/>
        <circle cx="100" cy="80" r="19" fill="rgba(255,250,220,0.12)" stroke="none"/>
        {/* Основной диск */}
        <circle cx="100" cy="80" r="16" fill="rgba(220,220,200,0.45)" stroke="#b8860b" strokeWidth="0.8"/>
        <circle cx="100" cy="80" r="14" fill="rgba(255,250,220,0.35)"/>
        {/* Лучи луны — длинные, тонкие */}
        {Array.from({length: 16}).map((_, i) => {
          const a = (i / 16) * Math.PI * 2
          return (
            <g key={i}>
              <line x1={100 + Math.cos(a) * 16} y1={80 + Math.sin(a) * 16} x2={100 + Math.cos(a) * 26} y2={80 + Math.sin(a) * 26} stroke="#b8860b" strokeWidth="0.5" opacity="0.5"/>
              <line x1={100 + Math.cos(a) * 16} y1={80 + Math.sin(a) * 16} x2={100 + Math.cos(a) * 26} y2={80 + Math.sin(a) * 26} stroke="rgba(255,215,0,0.3)" strokeWidth="0.3"/>
            </g>
          )
        })}
        {/* Лицо луны — профиль, детальный */}
        <path d="M 96 75 Q 94 78 96 82 Q 98 84 100 84 Q 102 84 104 82 Q 106 78 104 75 Q 102 72 100 72 Q 98 72 96 75 Z" fill="rgba(180,140,70,0.3)" stroke="#8b5a2b" strokeWidth="0.3"/>
        <circle cx="97" cy="78" r="0.6" fill="#5a3a20"/>
        <path d="M 97 81 Q 100 82 103 81" fill="none" stroke="#8b5a2b" strokeWidth="0.3"/>
        {/* Кратеры луны */}
        <circle cx="106" cy="76" r="1" fill="rgba(120,80,40,0.2)"/>
        <circle cx="108" cy="83" r="0.7" fill="rgba(120,80,40,0.2)"/>

        {/* Звёзды */}
        <circle cx="40" cy="60" r="0.6" fill="#ffd700" opacity="0.6"/>
        <circle cx="160" cy="55" r="0.7" fill="#ffd700" opacity="0.7"/>
        <circle cx="170" cy="100" r="0.5" fill="#ffd700" opacity="0.5"/>
        <circle cx="25" cy="105" r="0.5" fill="#ffd700" opacity="0.5"/>

        {/* Капли росы / слёзы — падающие */}
        {[[50,115],[70,108],[130,108],[150,115],[60,130],[140,130]].map(([x,y]: any, i: number) => (
          <g key={i}>
            <ellipse cx={x} cy={y} rx="1.5" ry="3" fill="rgba(100,150,200,0.4)" stroke="#4a6a8a" strokeWidth="0.3"/>
            <circle cx={x} cy={y-1} r="0.4" fill="rgba(255,255,255,0.6)"/>
          </g>
        ))}

        {/* ===== Две башни — сказочные, с куполами, детальные ===== */}
        {/* Левая башня */}
        <path d="M 35 250 L 35 140 L 55 140 L 55 250 Z" fill="rgba(60,40,30,0.5)" stroke="#3a2010" strokeWidth="0.5"/>
        {/* Каменная кладка */}
        <line x1="35" y1="170" x2="55" y2="170" stroke="#3a2010" strokeWidth="0.3"/>
        <line x1="35" y1="200" x2="55" y2="200" stroke="#3a2010" strokeWidth="0.3"/>
        <line x1="35" y1="225" x2="55" y2="225" stroke="#3a2010" strokeWidth="0.3"/>
        <line x1="45" y1="140" x2="45" y2="170" stroke="#3a2010" strokeWidth="0.3"/>
        <line x1="42" y1="170" x2="42" y2="200" stroke="#3a2010" strokeWidth="0.3"/>
        <line x1="48" y1="200" x2="48" y2="225" stroke="#3a2010" strokeWidth="0.3"/>
        {/* Зубцы левой башни */}
        <path d="M 35 140 L 35 132 L 40 132 L 40 138 L 45 138 L 45 132 L 50 132 L 50 138 L 55 138 L 55 140 Z" fill="rgba(60,40,30,0.55)" stroke="#3a2010" strokeWidth="0.4"/>
        {/* Окно левой башни — арочное, с решёткой */}
        <path d="M 42 165 Q 42 158 45 158 Q 48 158 48 165 L 48 175 L 42 175 Z" fill="rgba(255,180,40,0.4)" stroke="#b8860b" strokeWidth="0.4"/>
        <line x1="45" y1="158" x2="45" y2="175" stroke="#5a3a20" strokeWidth="0.3"/>
        <line x1="42" y1="166" x2="48" y2="166" stroke="#5a3a20" strokeWidth="0.3"/>

        {/* Купол левой башни — золотой, луковичный */}
        <path d="M 38 132 Q 38 120 45 115 Q 52 120 52 132 Z" fill="rgba(255,215,0,0.4)" stroke="#b8860b" strokeWidth="0.5"/>
        <path d="M 41 125 Q 45 122 49 125" fill="none" stroke="#991b1b" strokeWidth="0.4"/>
        <path d="M 42 128 Q 45 126 48 128" fill="none" stroke="#991b1b" strokeWidth="0.3"/>
        {/* Шпиль левой */}
        <line x1="45" y1="115" x2="45" y2="106" stroke="#b8860b" strokeWidth="0.8"/>
        <circle cx="45" cy="105" r="1.5" fill="#ffd700" stroke="#b8860b" strokeWidth="0.3"/>
        <path d="M 45 105 L 45 100" fill="none" stroke="#ffd700" strokeWidth="0.5"/>

        {/* Правая башня */}
        <path d="M 145 250 L 145 140 L 165 140 L 165 250 Z" fill="rgba(60,40,30,0.5)" stroke="#3a2010" strokeWidth="0.5"/>
        <line x1="145" y1="170" x2="165" y2="170" stroke="#3a2010" strokeWidth="0.3"/>
        <line x1="145" y1="200" x2="165" y2="200" stroke="#3a2010" strokeWidth="0.3"/>
        <line x1="145" y1="225" x2="165" y2="225" stroke="#3a2010" strokeWidth="0.3"/>
        <line x1="155" y1="140" x2="155" y2="170" stroke="#3a2010" strokeWidth="0.3"/>
        <line x1="158" y1="170" x2="158" y2="200" stroke="#3a2010" strokeWidth="0.3"/>
        <line x1="152" y1="200" x2="152" y2="225" stroke="#3a2010" strokeWidth="0.3"/>
        {/* Зубцы */}
        <path d="M 145 140 L 145 132 L 150 132 L 150 138 L 155 138 L 155 132 L 160 132 L 160 138 L 165 138 L 165 140 Z" fill="rgba(60,40,30,0.55)" stroke="#3a2010" strokeWidth="0.4"/>
        {/* Окно правой */}
        <path d="M 152 165 Q 152 158 155 158 Q 158 158 158 165 L 158 175 L 152 175 Z" fill="rgba(255,180,40,0.4)" stroke="#b8860b" strokeWidth="0.4"/>
        <line x1="155" y1="158" x2="155" y2="175" stroke="#5a3a20" strokeWidth="0.3"/>
        <line x1="152" y1="166" x2="158" y2="166" stroke="#5a3a20" strokeWidth="0.3"/>
        {/* Купол правой */}
        <path d="M 148 132 Q 148 120 155 115 Q 162 120 162 132 Z" fill="rgba(255,215,0,0.4)" stroke="#b8860b" strokeWidth="0.5"/>
        <path d="M 151 125 Q 155 122 159 125" fill="none" stroke="#991b1b" strokeWidth="0.4"/>
        <path d="M 152 128 Q 155 126 158 128" fill="none" stroke="#991b1b" strokeWidth="0.3"/>
        <line x1="155" y1="115" x2="155" y2="106" stroke="#b8860b" strokeWidth="0.8"/>
        <circle cx="155" cy="105" r="1.5" fill="#ffd700" stroke="#b8860b" strokeWidth="0.3"/>
        <path d="M 155 105 L 155 100" fill="none" stroke="#ffd700" strokeWidth="0.5"/>

        {/* Извилистая тропа — между башнями */}
        <path d="M 70 250 Q 80 230 85 215 Q 92 200 95 185 Q 100 175 100 165" fill="none" stroke="rgba(184,134,11,0.25)" strokeWidth="1.5" strokeDasharray="3 2"/>
        <path d="M 130 250 Q 120 230 115 215 Q 108 200 105 185 Q 100 175 100 165" fill="none" stroke="rgba(184,134,11,0.25)" strokeWidth="1.5" strokeDasharray="3 2"/>

        {/* ===== ВОЛК / собака слева — воющий на луну ===== */}
        <g>
          {/* Тело — стоящее на задних лапах */}
          <path d="M 60 225 Q 58 218 60 212 Q 65 208 72 210 Q 75 215 73 222 Q 70 228 65 228 Q 60 228 60 225 Z"
            fill="rgba(60,40,30,0.7)" stroke="#3a2010" strokeWidth="0.5"/>
          {/* Голова — задранная вверх */}
          <path d="M 65 212 Q 62 205 65 200 Q 70 198 72 202 Q 74 208 71 213 Z"
            fill="rgba(60,40,30,0.8)" stroke="#3a2010" strokeWidth="0.5"/>
          {/* Морда — вытянутая */}
          <path d="M 65 204 Q 60 202 60 198 Q 63 197 66 200 Z" fill="rgba(80,55,30,0.8)" stroke="#3a2010" strokeWidth="0.4"/>
          {/* Нос */}
          <circle cx="61" cy="198.5" r="0.6" fill="#3a2010"/>
          {/* Глаз — горящий */}
          <circle cx="68" cy="205" r="0.6" fill="rgba(255,180,40,0.8)"/>
          {/* Уши — острые */}
          <path d="M 65 200 L 63 195 L 66 199 Z" fill="rgba(60,40,30,0.85)" stroke="#3a2010" strokeWidth="0.3"/>
          <path d="M 71 200 L 73 195 L 70 199 Z" fill="rgba(60,40,30,0.85)" stroke="#3a2010" strokeWidth="0.3"/>
          {/* Хвост — поднятый */}
          <path d="M 73 220 Q 78 215 80 210" fill="none" stroke="rgba(60,40,30,0.7)" strokeWidth="1.5" strokeLinecap="round"/>
          {/* Лапы передние — прижаты к груди */}
          <path d="M 65 215 L 63 220" fill="none" stroke="rgba(60,40,30,0.7)" strokeWidth="1"/>
          <path d="M 70 215 L 72 220" fill="none" stroke="rgba(60,40,30,0.7)" strokeWidth="1"/>
        </g>

        {/* ===== СОБАКА справа — воющая ===== */}
        <g>
          <path d="M 128 225 Q 126 218 128 212 Q 133 208 140 210 Q 143 215 141 222 Q 138 228 133 228 Q 128 228 128 225 Z"
            fill="rgba(120,90,60,0.6)" stroke="#5a3a20" strokeWidth="0.5"/>
          <path d="M 133 212 Q 130 205 133 200 Q 138 198 140 202 Q 142 208 139 213 Z"
            fill="rgba(120,90,60,0.7)" stroke="#5a3a20" strokeWidth="0.5"/>
          <path d="M 133 204 Q 128 202 128 198 Q 131 197 134 200 Z" fill="rgba(150,120,80,0.7)" stroke="#5a3a20" strokeWidth="0.4"/>
          <circle cx="129" cy="198.5" r="0.6" fill="#3a2010"/>
          <circle cx="136" cy="205" r="0.6" fill="rgba(255,180,40,0.8)"/>
          <path d="M 133 200 L 131 195 L 134 199 Z" fill="rgba(120,90,60,0.75)" stroke="#5a3a20" strokeWidth="0.3"/>
          <path d="M 139 200 L 141 195 L 138 199 Z" fill="rgba(120,90,60,0.75)" stroke="#5a3a20" strokeWidth="0.3"/>
          <path d="M 141 220 Q 146 215 148 210" fill="none" stroke="rgba(120,90,60,0.6)" strokeWidth="1.5" strokeLinecap="round"/>
        </g>

        {/* ===== Вода / лужа с раком ===== */}
        <ellipse cx="100" cy="240" rx="28" ry="7" fill="rgba(70,100,130,0.3)" stroke="#4a6a8a" strokeWidth="0.5"/>
        {/* Волны воды */}
        <path d="M 75 240 Q 85 238 95 240 Q 105 242 115 240 Q 120 238 125 240" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.4"/>
        <path d="M 78 245 Q 88 243 98 245 Q 108 247 118 245" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.4"/>

        {/* ===== РАК / скорпион в воде ===== */}
        <g>
          {/* Тело рака — сегментированное */}
          <ellipse cx="100" cy="240" rx="6" ry="3" fill="rgba(120,80,60,0.6)" stroke="#5a3a20" strokeWidth="0.4"/>
          {/* Сегменты */}
          <path d="M 96 240 Q 100 238 104 240" fill="none" stroke="#3a2010" strokeWidth="0.3"/>
          <path d="M 95 242 Q 100 240 105 242" fill="none" stroke="#3a2010" strokeWidth="0.3"/>
          {/* Клешни — детальные */}
          <path d="M 94 238 Q 90 235 88 237 Q 86 240 89 240 Z" fill="rgba(120,80,60,0.7)" stroke="#5a3a20" strokeWidth="0.3"/>
          <path d="M 106 238 Q 110 235 112 237 Q 114 240 111 240 Z" fill="rgba(120,80,60,0.7)" stroke="#5a3a20" strokeWidth="0.3"/>
          {/* Глаза рака */}
          <circle cx="98" cy="238.5" r="0.4" fill="#3a2010"/>
          <circle cx="102" cy="238.5" r="0.4" fill="#3a2010"/>
          {/* Усики */}
          <path d="M 97 237 Q 95 233 93 230" fill="none" stroke="#5a3a20" strokeWidth="0.3"/>
          <path d="M 103 237 Q 105 233 107 230" fill="none" stroke="#5a3a20" strokeWidth="0.3"/>
          {/* Ноги */}
          <path d="M 96 242 L 92 245" fill="none" stroke="#5a3a20" strokeWidth="0.3"/>
          <path d="M 98 243 L 96 246" fill="none" stroke="#5a3a20" strokeWidth="0.3"/>
          <path d="M 102 243 L 104 246" fill="none" stroke="#5a3a20" strokeWidth="0.3"/>
          <path d="M 104 242 L 108 245" fill="none" stroke="#5a3a20" strokeWidth="0.3"/>
        </g>

        {/* Земля — берег */}
        <path d="M 14 230 Q 50 225 100 228 Q 150 225 186 230 L 186 250 L 14 250 Z" fill="rgba(60,40,25,0.3)" stroke="#3a2010" strokeWidth="0.3"/>
      </g>
    ),

    // XIX. СОЛНЦЕ — сказочное солнце над цветущим садом
    "major-19": (
      <g>
        {/* Тёплое небо — золотистое */}
        <rect x="14" y="42" width="172" height="208" fill="rgba(204,153,51,0.15)" rx="2"/>
        {/* Полосы света */}
        <path d="M 14 42 L 186 42 L 186 80 Q 150 70 100 75 Q 50 70 14 80 Z" fill="rgba(255,200,100,0.15)"/>

        {/* ===== СОЛНЦЕ — большое, васнецовское, с лицом ===== */}
        {/* Внешнее свечение */}
        <circle cx="100" cy="90" r="30" fill="rgba(255,215,0,0.08)" stroke="none"/>
        <circle cx="100" cy="90" r="26" fill="rgba(255,215,0,0.12)" stroke="none"/>
        {/* Лучи — чередующиеся прямые и волнистые */}
        {Array.from({length: 16}).map((_, i) => {
          const a = (i / 16) * Math.PI * 2
          const x1 = 100 + Math.cos(a) * 24
          const y1 = 90 + Math.sin(a) * 24
          const x2 = 100 + Math.cos(a) * 36
          const y2 = 90 + Math.sin(a) * 36
          return (
            <g key={i}>
              {i % 2 === 0 ? (
                <path d={`M ${x1} ${y1} L ${x2} ${y2}`} stroke="#b8860b" strokeWidth="1.5" opacity="0.7"/>
              ) : (
                <path d={`M ${x1} ${y1} Q ${100 + Math.cos(a) * 30} ${90 + Math.sin(a) * 30 - 2} ${x2} ${y2}`} stroke="#ffd700" strokeWidth="1" opacity="0.6" fill="none"/>
              )}
              <path d={`M ${x1} ${y1} L ${x2} ${y2}`} stroke="rgba(255,215,0,0.4)" strokeWidth="0.5"/>
            </g>
          )
        })}
        {/* Основной диск солнца */}
        <circle cx="100" cy="90" r="22" fill="rgba(255,215,0,0.4)" stroke="#b8860b" strokeWidth="1"/>
        <circle cx="100" cy="90" r="18" fill="rgba(255,200,80,0.5)"/>
        <circle cx="100" cy="90" r="14" fill="rgba(255,235,150,0.4)"/>

        {/* Лицо солнца — детальное */}
        {/* Глаза */}
        <ellipse cx="94" cy="87" rx="1.5" ry="1.2" fill="rgba(255,255,255,0.85)"/>
        <ellipse cx="106" cy="87" rx="1.5" ry="1.2" fill="rgba(255,255,255,0.85)"/>
        <circle cx="94" cy="87.5" r="0.8" fill="#5a3a20"/>
        <circle cx="106" cy="87.5" r="0.8" fill="#5a3a20"/>
        {/* Брови */}
        <path d="M 92 84 Q 94 83 96 84" fill="none" stroke="#5a3a20" strokeWidth="0.4"/>
        <path d="M 104 84 Q 106 83 108 84" fill="none" stroke="#5a3a20" strokeWidth="0.4"/>
        {/* Нос */}
        <path d="M 100 90 L 99 95 Q 100 96 101 95 Z" fill="none" stroke="#5a3a20" strokeWidth="0.4"/>
        {/* Рот — широкая улыбка */}
        <path d="M 92 97 Q 100 102 108 97" fill="none" stroke="#5a3a20" strokeWidth="0.6" strokeLinecap="round"/>
        <path d="M 93 98 Q 100 100 107 98 Q 100 101 93 98" fill="rgba(180,60,60,0.5)"/>
        {/* Румянец */}
        <ellipse cx="91" cy="92" rx="2" ry="1.2" fill="rgba(220,120,80,0.4)"/>
        <ellipse cx="109" cy="92" rx="2" ry="1.2" fill="rgba(220,120,80,0.4)"/>

        {/* Дальние холмы */}
        <path d="M 14 175 Q 50 168 100 172 Q 150 168 186 175 L 186 200 L 14 200 Z" fill="rgba(120,80,40,0.2)" stroke="#5a3a20" strokeWidth="0.3"/>

        {/* Цветущий сад */}
        <path d="M 14 200 Q 50 195 100 200 Q 150 195 186 200 L 186 250 L 14 250 Z" fill="rgba(90,60,30,0.25)" stroke="#5a3a20" strokeWidth="0.3"/>

        {/* ===== Подсолнухи — детальные ===== */}
        {[[28,212],[172,212],[58,218],[142,218]].map(([x,y]: any, i: number) => (
          <g key={i}>
            {/* Стебель */}
            <path d={`M ${x} ${y} Q ${x+1} ${y-10} ${x} ${y-18}`} fill="none" stroke="#2d6e2d" strokeWidth="1.2"/>
            {/* Листья */}
            <path d={`M ${x} ${y-8} Q ${x-3} ${y-10} ${x-5} ${y-7} Q ${x-2} ${y-6} ${x} ${y-8} Z`} fill="rgba(34,100,40,0.6)" stroke="#2d6e2d" strokeWidth="0.3"/>
            <path d={`M ${x+1} ${y-12} Q ${x+4} ${y-14} ${x+6} ${y-11} Q ${x+3} ${y-10} ${x+1} ${y-12} Z`} fill="rgba(34,100,40,0.6)" stroke="#2d6e2d" strokeWidth="0.3"/>
            {/* Лепестки — золотые */}
            {Array.from({length: 8}).map((_, j) => {
              const a = (j / 8) * Math.PI * 2
              return <ellipse key={j} cx={x + Math.cos(a) * 4.5} cy={y - 18 + Math.sin(a) * 4.5} rx="3" ry="1.2" fill="rgba(255,215,0,0.7)" stroke="#b8860b" strokeWidth="0.3" transform={`rotate(${j * 45} ${x + Math.cos(a) * 4.5} ${y - 18 + Math.sin(a) * 4.5})`}/>
            })}
            {/* Сердцевина */}
            <circle cx={x} cy={y - 18} r="3" fill="rgba(120,80,40,0.8)" stroke="#3a2010" strokeWidth="0.3"/>
            {/* Семечки */}
            <circle cx={x} cy={y - 18} r="0.4" fill="rgba(40,25,15,0.7)"/>
            <circle cx={x + 1} cy={y - 18.5} r="0.3" fill="rgba(40,25,15,0.7)"/>
            <circle cx={x - 1} cy={y - 17.5} r="0.3" fill="rgba(40,25,15,0.7)"/>
          </g>
        ))}

        {/* Цветы ромашки */}
        <g>
          {[45, 75, 125, 155].map((x, i) => (
            <g key={i}>
              <line x1={x} y1="235" x2={x} y2="225" stroke="#2d6e2d" strokeWidth="0.5"/>
              {[0, 60, 120, 180, 240, 300].map(deg => {
                const rad = deg * Math.PI / 180
                return <ellipse key={deg} cx={x + Math.cos(rad) * 2} cy={224 + Math.sin(rad) * 2} rx="1.5" ry="0.5" fill="rgba(255,255,255,0.8)" stroke="#b8860b" strokeWidth="0.2" transform={`rotate(${deg} ${x + Math.cos(rad) * 2} ${224 + Math.sin(rad) * 2})`}/>
              })}
              <circle cx={x} cy={224} r="1" fill="rgba(255,215,0,0.8)" stroke="#b8860b" strokeWidth="0.2"/>
            </g>
          ))}
        </g>

        {/* Трава */}
        <path d="M 25 230 Q 27 222 29 230" fill="none" stroke="#2d6e2d" strokeWidth="0.5"/>
        <path d="M 50 232 Q 52 224 54 232" fill="none" stroke="#2d6e2d" strokeWidth="0.5"/>
        <path d="M 145 232 Q 147 224 149 232" fill="none" stroke="#2d6e2d" strokeWidth="0.5"/>
        <path d="M 165 230 Q 167 222 169 230" fill="none" stroke="#2d6e2d" strokeWidth="0.5"/>

        {/* ===== БЕЛЫЙ КОНЬ — детальный ===== */}
        <g>
          {/* Тело коня */}
          <path d="M 84 195 Q 80 188 84 184 Q 95 180 110 182 Q 118 184 118 192 Q 118 200 112 202 Q 100 205 88 202 Q 82 200 84 195 Z"
            fill="rgba(245,240,230,0.5)" stroke="#5a3a20" strokeWidth="0.5"/>
          {/* Голова коня */}
          <path d="M 115 188 Q 120 184 122 178 Q 120 174 116 176 Q 113 182 113 188 Z"
            fill="rgba(245,240,230,0.55)" stroke="#5a3a20" strokeWidth="0.4"/>
          {/* Грива — пышная */}
          <path d="M 116 180 Q 119 175 122 172 Q 124 178 120 184" fill="rgba(220,200,160,0.5)" stroke="#8b5a2b" strokeWidth="0.4"/>
          <path d="M 114 184 Q 117 180 120 180" fill="none" stroke="rgba(120,80,40,0.6)" strokeWidth="0.5"/>
          {/* Глаз коня */}
          <ellipse cx="118" cy="182" rx="0.6" ry="0.5" fill="#3a2010"/>
          {/* Ноздря */}
          <ellipse cx="121" cy="186" rx="0.4" ry="0.6" fill="rgba(60,40,30,0.7)"/>
          {/* Уши */}
          <path d="M 116 178 L 115 174 L 117 178 Z" fill="rgba(245,240,230,0.6)" stroke="#5a3a20" strokeWidth="0.3"/>

          {/* Ноги коня */}
          <path d="M 88 202 L 86 222 L 90 222 L 90 202 Z" fill="rgba(245,240,230,0.5)" stroke="#5a3a20" strokeWidth="0.4"/>
          <path d="M 86 222 L 84 224 L 90 224 L 90 222 Z" fill="rgba(120,80,40,0.7)" stroke="#3a2010" strokeWidth="0.3"/>
          <path d="M 102 202 L 100 222 L 104 222 L 104 202 Z" fill="rgba(245,240,230,0.5)" stroke="#5a3a20" strokeWidth="0.4"/>
          <path d="M 100 222 L 98 224 L 104 224 L 104 222 Z" fill="rgba(120,80,40,0.7)" stroke="#3a2010" strokeWidth="0.3"/>
          <path d="M 112 200 L 114 222 L 118 222 L 116 200 Z" fill="rgba(245,240,230,0.5)" stroke="#5a3a20" strokeWidth="0.4"/>
          <path d="M 114 222 L 112 224 L 118 224 L 116 222 Z" fill="rgba(120,80,40,0.7)" stroke="#3a2010" strokeWidth="0.3"/>

          {/* Хвост */}
          <path d="M 84 192 Q 78 200 80 215" fill="none" stroke="rgba(220,200,160,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M 84 192 Q 80 200 82 212" fill="none" stroke="rgba(120,80,40,0.5)" strokeWidth="1" strokeLinecap="round"/>
        </g>

        {/* ===== ЮНОША на коне ===== */}
        <g className="svg-breathe" style={{ transformOrigin: "100px 175px" }}>
          {/* Тело — в охряной рубахе с золотым узором */}
          <path d="M 90 185 Q 88 175 92 165 L 108 165 Q 112 175 110 185 Q 100 188 90 185 Z"
            fill="rgba(184,134,11,0.5)" stroke="#5a3a20" strokeWidth="0.5"/>
          {/* Складки рубахи */}
          <path d="M 94 167 Q 95 178 94 185" fill="none" stroke="rgba(120,80,40,0.5)" strokeWidth="0.3"/>
          <path d="M 100 167 Q 100 178 100 185" fill="none" stroke="rgba(120,80,40,0.4)" strokeWidth="0.3"/>
          <path d="M 106 167 Q 105 178 106 185" fill="none" stroke="rgba(120,80,40,0.5)" strokeWidth="0.3"/>

          {/* Золотой растительный узор */}
          <path d="M 92 175 Q 100 172 108 175 Q 103 180 100 177 Q 97 180 92 175 Z" fill="none" stroke="#ffd700" strokeWidth="0.4" opacity="0.7"/>

          {/* Шея */}
          <path d="M 96 156 L 96 165 L 104 165 L 104 156 Z" fill="rgba(232,200,160,0.9)" stroke="#8b5a2b" strokeWidth="0.3"/>

          {/* Лицо — детальное, детское */}
          <path d="M 92 150 Q 90 142 94 137 Q 97 134 100 133 Q 103 134 106 137 Q 110 142 108 150 Q 109 154 107 157 Q 104 160 100 160 Q 96 160 93 157 Q 91 154 92 150 Z"
            fill="rgba(232,200,160,0.92)" stroke="#8b5a2b" strokeWidth="0.4"/>

          {/* Глаза — большие, детские */}
          <path d="M 93 145 Q 95 144 97 145 Q 97 146 95 147 Q 93 146 93 145 Z" fill="rgba(255,255,255,0.85)"/>
          <path d="M 103 145 Q 105 144 107 145 Q 107 146 105 147 Q 103 146 103 145 Z" fill="rgba(255,255,255,0.85)"/>
          <circle cx="95" cy="145.5" r="1" fill="#5a3a20"/>
          <circle cx="105" cy="145.5" r="1" fill="#5a3a20"/>

          {/* Брови */}
          <path d="M 93 142 Q 95 141 97 142" fill="none" stroke="#5a3a20" strokeWidth="0.4"/>
          <path d="M 103 142 Q 105 141 107 142" fill="none" stroke="#5a3a20" strokeWidth="0.4"/>

          {/* Нос */}
          <path d="M 100 148 L 99 153 Q 100 154 101 153 Z" fill="none" stroke="#8b5a2b" strokeWidth="0.3"/>

          {/* Рот — улыбка */}
          <path d="M 96 156 Q 100 158 104 156" fill="none" stroke="#991b1b" strokeWidth="0.5"/>

          {/* Румянец */}
          <ellipse cx="94" cy="152" rx="1.5" ry="1" fill="rgba(220,120,80,0.4)"/>
          <ellipse cx="106" cy="152" rx="1.5" ry="1" fill="rgba(220,120,80,0.4)"/>

          {/* Волосы — русые */}
          <path d="M 92 142 Q 96 138 100 138 Q 104 138 108 142 Q 106 140 104 139 Q 100 137 96 139 Q 94 140 92 142 Z" fill="rgba(180,140,70,0.7)" stroke="#8b5a2b" strokeWidth="0.3"/>

          {/* Венок из цветов на голове */}
          <path d="M 92 140 Q 96 137 100 138 Q 104 137 108 140" fill="none" stroke="rgba(34,100,40,0.7)" strokeWidth="0.5"/>
          <circle cx="94" cy="138" r="1.3" fill="rgba(220,60,60,0.7)" stroke="#991b1b" strokeWidth="0.3"/>
          <circle cx="100" cy="137" r="1.3" fill="#ffd700" opacity="0.7" stroke="#b8860b" strokeWidth="0.3"/>
          <circle cx="106" cy="138" r="1.3" fill="rgba(220,180,200,0.7)" stroke="#991b1b" strokeWidth="0.3"/>

          {/* Руки — раскинуты в радости */}
          <path d="M 92 170 Q 86 178 82 188" fill="none" stroke="rgba(232,200,160,0.9)" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M 108 170 Q 114 178 118 188" fill="none" stroke="rgba(232,200,160,0.9)" strokeWidth="2.5" strokeLinecap="round"/>
        </g>

        {/* Знамя в руке юноши */}
        <g>
          <path d="M 80 188 L 78 165 L 80 165 L 82 188 Z" fill="rgba(80,55,30,0.85)" stroke="#3a2010" strokeWidth="0.3"/>
          <path d="M 78 165 L 95 168 L 95 180 L 78 178 Z" fill="rgba(255,215,0,0.5)" stroke="#b8860b" strokeWidth="0.4"/>
          <path d="M 84 170 Q 88 173 92 170" fill="none" stroke="#991b1b" strokeWidth="0.4"/>
          <path d="M 84 175 Q 88 178 92 175" fill="none" stroke="#991b1b" strokeWidth="0.3"/>
        </g>
      </g>
    ),

    // XX. СУД — сказочный ангел с трубой над воскресающими
    "major-20": (
      <g>
        {/* Небесный фон — золотистый */}
        <rect x="14" y="42" width="172" height="208" fill="rgba(204,153,51,0.12)" rx="2"/>
        {/* Свечение небес */}
        <path d="M 14 80 L 186 80 L 186 50 L 14 50 Z" fill="rgba(255,215,0,0.08)"/>
        {/* Облака — резные, васнецовские */}
        <path d="M 20 70 Q 35 60 50 65 Q 65 55 80 65 Q 70 70 60 68 Q 50 72 40 68 Q 25 72 20 70 Z" fill="rgba(255,255,255,0.18)"/>
        <path d="M 110 60 Q 125 50 140 58 Q 155 50 170 60 Q 165 65 155 62 Q 145 68 135 64 Q 120 66 110 60 Z" fill="rgba(255,255,255,0.18)"/>
        <path d="M 65 90 Q 80 82 95 88 Q 110 80 125 90 Q 115 95 105 92 Q 90 96 80 92 Q 70 95 65 90 Z" fill="rgba(255,255,255,0.15)"/>

        {/* Звёзды небесные */}
        <circle cx="30" cy="55" r="0.6" fill="#ffd700" opacity="0.7"/>
        <circle cx="170" cy="50" r="0.7" fill="#ffd700" opacity="0.7"/>
        <circle cx="60" cy="100" r="0.5" fill="#ffd700" opacity="0.5"/>
        <circle cx="140" cy="105" r="0.5" fill="#ffd700" opacity="0.5"/>

        {/* ===== АНГЕЛ с трубой — в облаках, детальный ===== */}
        <g className="svg-breathe" style={{ transformOrigin: "100px 100px" }}>
          {/* Тело — в белой мантии */}
          <path d="M 86 125 Q 84 110 88 95 L 112 95 Q 116 110 114 125 Q 100 130 86 125 Z"
            fill="rgba(255,250,235,0.4)" stroke="#b8860b" strokeWidth="0.5"/>
          {/* Складки мантии */}
          <path d="M 92 100 Q 92 115 92 125" fill="none" stroke="rgba(180,140,70,0.4)" strokeWidth="0.4"/>
          <path d="M 100 100 Q 100 115 100 125" fill="none" stroke="rgba(180,140,70,0.3)" strokeWidth="0.3"/>
          <path d="M 108 100 Q 108 115 108 125" fill="none" stroke="rgba(180,140,70,0.4)" strokeWidth="0.4"/>

          {/* Золотой растительный узор */}
          <path d="M 88 110 Q 96 106 104 110 Q 100 115 96 112 Q 92 115 88 110 Z" fill="none" stroke="#ffd700" strokeWidth="0.4" opacity="0.7"/>

          {/* Золотой пояс */}
          <path d="M 86 115 Q 100 113 114 115 L 114 119 Q 100 117 86 119 Z" fill="rgba(255,215,0,0.4)" stroke="#b8860b" strokeWidth="0.4"/>

          {/* Шея */}
          <path d="M 96 85 L 96 95 L 104 95 L 104 85 Z" fill="rgba(232,200,160,0.9)" stroke="#8b5a2b" strokeWidth="0.3"/>

          {/* Лицо — детальное, кроткое */}
          <path d="M 92 78 Q 90 70 94 64 Q 97 60 100 59 Q 103 60 106 64 Q 110 70 108 78 Q 109 83 107 86 Q 104 89 100 89 Q 96 89 93 86 Q 91 83 92 78 Z"
            fill="rgba(232,200,160,0.92)" stroke="#8b5a2b" strokeWidth="0.4"/>

          {/* Волосы — золотистые */}
          <path d="M 92 70 Q 96 65 100 65 Q 104 65 108 70 Q 106 68 104 67 Q 100 64 96 67 Q 94 68 92 70 Z" fill="rgba(180,140,70,0.7)" stroke="#8b5a2b" strokeWidth="0.3"/>

          {/* Глаза */}
          <path d="M 93 73 Q 95 72 97 73 Q 97 74 95 75 Q 93 74 93 73 Z" fill="rgba(255,255,255,0.85)"/>
          <path d="M 103 73 Q 105 72 107 73 Q 107 74 105 75 Q 103 74 103 73 Z" fill="rgba(255,255,255,0.85)"/>
          <circle cx="95" cy="73.5" r="0.8" fill="#5a3a20"/>
          <circle cx="105" cy="73.5" r="0.8" fill="#5a3a20"/>

          {/* Брови */}
          <path d="M 93 71 Q 95 70 97 71" fill="none" stroke="#5a3a20" strokeWidth="0.4"/>
          <path d="M 103 71 Q 105 70 107 71" fill="none" stroke="#5a3a20" strokeWidth="0.4"/>

          {/* Нос */}
          <path d="M 100 76 L 99 82 Q 100 83 101 82 Z" fill="none" stroke="#8b5a2b" strokeWidth="0.4"/>

          {/* Рот */}
          <path d="M 96 85 Q 100 86 104 85" fill="none" stroke="#991b1b" strokeWidth="0.5"/>

          {/* Золотой нимб */}
          <ellipse cx="100" cy="60" rx="11" ry="3.5" fill="none" stroke="#ffd700" strokeWidth="1" opacity="0.85"/>
          <ellipse cx="100" cy="60" rx="13" ry="4" fill="none" stroke="rgba(255,215,0,0.5)" strokeWidth="0.5"/>
          <ellipse cx="100" cy="60" rx="14" ry="4.5" fill="rgba(255,215,0,0.1)" stroke="none"/>

          {/* ===== Крылья — крупные, многоярусные ===== */}
          {/* Левое крыло */}
          <path d="M 88 95 Q 70 85 55 95 Q 50 110 55 125 Q 65 115 75 110 Q 70 120 72 130 Q 80 122 88 118 Z"
            fill="rgba(255,255,255,0.5)" stroke="#b8860b" strokeWidth="0.5"/>
          {/* Перья — детальные */}
          <path d="M 58 98 Q 66 105 64 118" fill="none" stroke="#b8860b" strokeWidth="0.4" opacity="0.6"/>
          <path d="M 62 95 Q 70 102 70 116" fill="none" stroke="#b8860b" strokeWidth="0.4" opacity="0.6"/>
          <path d="M 66 93 Q 74 100 76 114" fill="none" stroke="#b8860b" strokeWidth="0.4" opacity="0.6"/>
          <path d="M 70 93 Q 78 100 80 114" fill="none" stroke="#b8860b" strokeWidth="0.4" opacity="0.6"/>
          <path d="M 74 95 Q 82 102 84 114" fill="none" stroke="#b8860b" strokeWidth="0.4" opacity="0.6"/>
          {/* Золотые кончики перьев */}
          <path d="M 58 98 Q 60 96 62 98 Q 60 100 58 98 Z" fill="#ffd700" opacity="0.5"/>
          <path d="M 62 95 Q 64 93 66 95 Q 64 97 62 95 Z" fill="#ffd700" opacity="0.5"/>
          <path d="M 66 93 Q 68 91 70 93 Q 68 95 66 93 Z" fill="#ffd700" opacity="0.5"/>
          <path d="M 70 93 Q 72 91 74 93 Q 72 95 70 93 Z" fill="#ffd700" opacity="0.5"/>
          <path d="M 74 95 Q 76 93 78 95 Q 76 97 74 95 Z" fill="#ffd700" opacity="0.5"/>

          {/* Правое крыло */}
          <path d="M 112 95 Q 130 85 145 95 Q 150 110 145 125 Q 135 115 125 110 Q 130 120 128 130 Q 120 122 112 118 Z"
            fill="rgba(255,255,255,0.5)" stroke="#b8860b" strokeWidth="0.5"/>
          <path d="M 142 98 Q 134 105 136 118" fill="none" stroke="#b8860b" strokeWidth="0.4" opacity="0.6"/>
          <path d="M 138 95 Q 130 102 130 116" fill="none" stroke="#b8860b" strokeWidth="0.4" opacity="0.6"/>
          <path d="M 134 93 Q 126 100 124 114" fill="none" stroke="#b8860b" strokeWidth="0.4" opacity="0.6"/>
          <path d="M 130 93 Q 122 100 120 114" fill="none" stroke="#b8860b" strokeWidth="0.4" opacity="0.6"/>
          <path d="M 126 95 Q 118 102 116 114" fill="none" stroke="#b8860b" strokeWidth="0.4" opacity="0.6"/>
          <path d="M 142 98 Q 140 96 138 98 Q 140 100 142 98 Z" fill="#ffd700" opacity="0.5"/>
          <path d="M 138 95 Q 136 93 134 95 Q 136 97 138 95 Z" fill="#ffd700" opacity="0.5"/>
          <path d="M 134 93 Q 132 91 130 93 Q 132 95 134 93 Z" fill="#ffd700" opacity="0.5"/>
          <path d="M 130 93 Q 128 91 126 93 Q 128 95 130 93 Z" fill="#ffd700" opacity="0.5"/>
          <path d="M 126 95 Q 124 93 122 95 Q 124 97 126 95 Z" fill="#ffd700" opacity="0.5"/>

          {/* Рука держит трубу */}
          <path d="M 110 110 Q 118 108 124 105" fill="none" stroke="rgba(232,200,160,0.9)" strokeWidth="2.5" strokeLinecap="round"/>
        </g>

        {/* ===== ТРУБА — золотая, длинная, детальная ===== */}
        <g>
          {/* Мундштук */}
          <path d="M 124 105 L 126 102 L 128 105 L 126 108 Z" fill="rgba(255,215,0,0.6)" stroke="#b8860b" strokeWidth="0.4"/>
          {/* Трубка */}
          <path d="M 128 105 L 145 95 L 147 96 L 130 107 Z" fill="rgba(255,215,0,0.5)" stroke="#b8860b" strokeWidth="0.4"/>
          {/* Раструб — широкий, раскрытый */}
          <path d="M 145 95 L 158 88 L 162 95 L 158 102 L 145 99 Z" fill="rgba(255,215,0,0.55)" stroke="#b8860b" strokeWidth="0.5"/>
          {/* Блики на раструбе */}
          <path d="M 150 92 Q 156 90 158 96" fill="none" stroke="rgba(255,255,200,0.7)" strokeWidth="0.4"/>
          {/* Декор трубы — кольца */}
          <path d="M 134 102 Q 136 101 138 102" fill="none" stroke="#b8860b" strokeWidth="0.5"/>
          <path d="M 134 105 Q 136 106 138 105" fill="none" stroke="#b8860b" strokeWidth="0.5"/>
          {/* Знамя на трубе — золотое с крестом */}
          <path d="M 138 98 L 138 88 L 144 90 L 144 100 Z" fill="rgba(255,215,0,0.5)" stroke="#b8860b" strokeWidth="0.4"/>
          <path d="M 140 92 L 142 92 M 141 91 L 141 95" stroke="#991b1b" strokeWidth="0.5"/>
        </g>

        {/* Звуковые волны от трубы */}
        <path d="M 160 85 Q 168 80 172 85" fill="none" stroke="rgba(255,215,0,0.5)" strokeWidth="0.5"/>
        <path d="M 162 92 Q 172 87 176 92" fill="none" stroke="rgba(255,215,0,0.4)" strokeWidth="0.4"/>
        <path d="M 162 100 Q 172 105 176 100" fill="none" stroke="rgba(255,215,0,0.4)" strokeWidth="0.4"/>

        {/* ===== Горы дальние ===== */}
        <path d="M 14 200 Q 50 195 100 198 Q 150 195 186 200 L 186 250 L 14 250 Z" fill="rgba(120,80,40,0.25)" stroke="#5a3a20" strokeWidth="0.3"/>

        {/* ===== Земля с травой ===== */}
        <path d="M 14 200 Q 50 195 100 198 Q 150 195 186 200 L 186 250 L 14 250 Z" fill="rgba(80,55,30,0.2)" stroke="#3a2010" strokeWidth="0.3"/>

        {/* ===== Три фигуры — воскресающие из гробов ===== */}
        {/* Левая — мужчина с поднятыми руками */}
        <g>
          {/* Гроб левый */}
          <path d="M 42 225 L 68 225 L 68 240 L 42 240 Z" fill="rgba(74,53,36,0.65)" stroke="#3a2010" strokeWidth="0.5"/>
          {/* Крышка гроба — открытая, откинутая */}
          <path d="M 42 225 L 68 225 L 68 220 L 42 220 Z" fill="rgba(80,55,30,0.6)" stroke="#3a2010" strokeWidth="0.4"/>
          {/* Доски гроба */}
          <line x1="42" y1="232" x2="68" y2="232" stroke="#3a2010" strokeWidth="0.3"/>
          <line x1="50" y1="225" x2="50" y2="240" stroke="#3a2010" strokeWidth="0.3"/>
          <line x1="60" y1="225" x2="60" y2="240" stroke="#3a2010" strokeWidth="0.3"/>

          {/* Фигура мужчины */}
          {/* Тело — в синей одежде */}
          <path d="M 50 220 Q 48 212 50 205 L 60 205 Q 62 212 60 220 Q 55 222 50 220 Z"
            fill="rgba(30,30,80,0.55)" stroke="#1e1e50" strokeWidth="0.4"/>
          {/* Голова */}
          <path d="M 53 200 Q 52 195 55 192 Q 58 191 60 192 Q 62 195 60 200 Q 60 203 56 203 Q 53 203 53 200 Z"
            fill="rgba(232,200,160,0.85)" stroke="#8b5a2b" strokeWidth="0.4"/>
          {/* Волосы — седые */}
          <path d="M 53 196 Q 56 193 60 196 Q 58 194 56 193 Q 54 194 53 196 Z" fill="rgba(180,170,150,0.7)"/>
          {/* Борода — седая */}
          <path d="M 55 202 Q 54 207 56 209 L 60 209 Q 62 207 60 202" fill="rgba(180,170,150,0.7)" stroke="#8b5a2b" strokeWidth="0.3"/>
          {/* Глаза — закрытые или открытые в удивлении */}
          <circle cx="56" cy="198" r="0.5" fill="#3a2010"/>
          <circle cx="58" cy="198" r="0.5" fill="#3a2010"/>
          {/* Рот */}
          <path d="M 56 201 Q 57 202 58 201" fill="none" stroke="#991b1b" strokeWidth="0.3"/>
          {/* Руки — подняты вверх */}
          <path d="M 52 208 Q 48 200 47 188" fill="none" stroke="rgba(232,200,160,0.85)" strokeWidth="2" strokeLinecap="round"/>
          <path d="M 58 208 Q 62 200 63 188" fill="none" stroke="rgba(232,200,160,0.85)" strokeWidth="2" strokeLinecap="round"/>
        </g>

        {/* Центральная — женщина */}
        <g>
          <path d="M 87 225 L 113 225 L 113 240 L 87 240 Z" fill="rgba(74,53,36,0.65)" stroke="#3a2010" strokeWidth="0.5"/>
          <path d="M 87 225 L 113 225 L 113 220 L 87 220 Z" fill="rgba(80,55,30,0.6)" stroke="#3a2010" strokeWidth="0.4"/>
          <line x1="87" y1="232" x2="113" y2="232" stroke="#3a2010" strokeWidth="0.3"/>
          <line x1="95" y1="225" x2="95" y2="240" stroke="#3a2010" strokeWidth="0.3"/>
          <line x1="105" y1="225" x2="105" y2="240" stroke="#3a2010" strokeWidth="0.3"/>

          {/* Фигура женщины */}
          <path d="M 95 220 Q 93 212 95 205 L 105 205 Q 107 212 105 220 Q 100 222 95 220 Z"
            fill="rgba(120,20,20,0.55)" stroke="#5a1010" strokeWidth="0.4"/>
          {/* Голова */}
          <path d="M 96 200 Q 95 195 98 192 Q 101 191 103 192 Q 105 195 104 200 Q 104 203 100 203 Q 96 203 96 200 Z"
            fill="rgba(232,200,160,0.85)" stroke="#8b5a2b" strokeWidth="0.4"/>
          {/* Волосы — длинные */}
          <path d="M 96 196 Q 98 192 100 192 Q 102 192 104 196 Q 102 194 100 193 Q 98 194 96 196 Z" fill="rgba(120,80,40,0.7)"/>
          <path d="M 96 200 Q 92 210 94 220" fill="none" stroke="rgba(120,80,40,0.7)" strokeWidth="1.5"/>
          <path d="M 104 200 Q 108 210 106 220" fill="none" stroke="rgba(120,80,40,0.7)" strokeWidth="1.5"/>
          {/* Глаза закрыты */}
          <path d="M 97 199 Q 98 199 99 199" fill="none" stroke="#5a3a20" strokeWidth="0.4"/>
          <path d="M 101 199 Q 102 199 103 199" fill="none" stroke="#5a3a20" strokeWidth="0.4"/>
          {/* Рот */}
          <path d="M 98 202 Q 100 203 102 202" fill="none" stroke="#991b1b" strokeWidth="0.3"/>
          {/* Руки — молитвенно сложены */}
          <path d="M 95 212 Q 100 209 105 212" fill="none" stroke="rgba(232,200,160,0.85)" strokeWidth="2" strokeLinecap="round"/>
        </g>

        {/* Правая — ребёнок */}
        <g>
          <path d="M 132 225 L 158 225 L 158 240 L 132 240 Z" fill="rgba(74,53,36,0.65)" stroke="#3a2010" strokeWidth="0.5"/>
          <path d="M 132 225 L 158 225 L 158 220 L 132 220 Z" fill="rgba(80,55,30,0.6)" stroke="#3a2010" strokeWidth="0.4"/>
          <line x1="132" y1="232" x2="158" y2="232" stroke="#3a2010" strokeWidth="0.3"/>
          <line x1="140" y1="225" x2="140" y2="240" stroke="#3a2010" strokeWidth="0.3"/>
          <line x1="150" y1="225" x2="150" y2="240" stroke="#3a2010" strokeWidth="0.3"/>

          {/* Фигура ребёнка — меньше */}
          <path d="M 142 220 Q 140 213 142 208 L 152 208 Q 154 213 152 220 Q 147 222 142 220 Z"
            fill="rgba(34,100,40,0.55)" stroke="#2d6e2d" strokeWidth="0.4"/>
          {/* Голова — детская */}
          <path d="M 144 205 Q 143 200 146 197 Q 149 196 151 197 Q 153 200 152 205 Q 152 208 148 208 Q 144 208 144 205 Z"
            fill="rgba(232,200,160,0.85)" stroke="#8b5a2b" strokeWidth="0.4"/>
          {/* Волосы — русые */}
          <path d="M 144 201 Q 148 197 152 201 Q 150 199 148 198 Q 146 199 144 201 Z" fill="rgba(180,140,70,0.7)"/>
          {/* Глаза — большие */}
          <circle cx="146.5" cy="203" r="0.5" fill="#3a2010"/>
          <circle cx="149.5" cy="203" r="0.5" fill="#3a2010"/>
          {/* Рот */}
          <path d="M 147 206 Q 148 207 149 206" fill="none" stroke="#991b1b" strokeWidth="0.3"/>
          {/* Руки — одна поднята */}
          <path d="M 144 212 Q 140 205 142 196" fill="none" stroke="rgba(232,200,160,0.85)" strokeWidth="2" strokeLinecap="round"/>
          <path d="M 152 212 Q 156 208 156 200" fill="none" stroke="rgba(232,200,160,0.85)" strokeWidth="2" strokeLinecap="round"/>
        </g>

        {/* Трава */}
        <path d="M 25 240 Q 27 232 29 240" fill="none" stroke="#2d6e2d" strokeWidth="0.5"/>
        <path d="M 75 240 Q 77 232 79 240" fill="none" stroke="#2d6e2d" strokeWidth="0.5"/>
        <path d="M 120 240 Q 122 232 124 240" fill="none" stroke="#2d6e2d" strokeWidth="0.5"/>
        <path d="M 165 240 Q 167 232 169 240" fill="none" stroke="#2d6e2d" strokeWidth="0.5"/>
      </g>
    ),

    // XXI. МИР — сказочная дева в венке, окружённая сказочными существами
    "major-21": (
      <g>
        {/* Тёплый фон — закатное небо */}
        <rect x="14" y="42" width="172" height="208" fill="rgba(204,153,51,0.1)" rx="2"/>
        {/* Полосы света */}
        <path d="M 14 42 L 186 42 L 186 80 Q 150 70 100 75 Q 50 70 14 80 Z" fill="rgba(255,200,100,0.1)"/>
        {/* Звёзды */}
        <circle cx="40" cy="60" r="0.5" fill="#ffd700" opacity="0.7"/>
        <circle cx="160" cy="55" r="0.6" fill="#ffd700" opacity="0.7"/>
        <circle cx="100" cy="50" r="0.5" fill="#ffd700" opacity="0.6"/>
        <circle cx="80" cy="65" r="0.4" fill="#ffd700" opacity="0.5"/>
        <circle cx="125" cy="65" r="0.4" fill="#ffd700" opacity="0.5"/>

        {/* ===== ВЕНК — большой, растительный, васнецовский ===== */}
        {/* Основной овал венка */}
        <ellipse cx="100" cy="150" rx="55" ry="80" fill="none" stroke="#2d6e2d" strokeWidth="2" opacity="0.6"/>
        <ellipse cx="100" cy="150" rx="52" ry="77" fill="none" stroke="rgba(34,100,40,0.4)" strokeWidth="1"/>
        <ellipse cx="100" cy="150" rx="58" ry="83" fill="none" stroke="rgba(34,100,40,0.3)" strokeWidth="0.8"/>

        {/* Растения на венке — детальные, чередующиеся */}
        {Array.from({length: 24}).map((_, i) => {
          const a = (i / 24) * Math.PI * 2
          const x = 100 + Math.cos(a) * 55
          const y = 150 + Math.sin(a) * 80
          const x2 = 100 + Math.cos(a) * 52
          const y2 = 150 + Math.sin(a) * 76
          if (i % 3 === 0) {
            // Цветок красный
            return (
              <g key={i}>
                <circle cx={x} cy={y} r="2.5" fill="rgba(220,60,60,0.7)" stroke="#991b1b" strokeWidth="0.3"/>
                <path d={`M ${x-2} ${y} Q ${x} ${y-2} ${x+2} ${y} Q ${x} ${y+2} ${x-2} ${y} Z`} fill="rgba(255,180,180,0.5)"/>
                <circle cx={x} cy={y} r="0.8" fill="#ffd700"/>
                {/* Листья */}
                <path d={`M ${x-3} ${y} Q ${x-5} ${y-2} ${x-6} ${y}`} fill="rgba(34,100,40,0.6)" stroke="#2d6e2d" strokeWidth="0.2"/>
                <path d={`M ${x+3} ${y} Q ${x+5} ${y+2} ${x+6} ${y}`} fill="rgba(34,100,40,0.6)" stroke="#2d6e2d" strokeWidth="0.2"/>
              </g>
            )
          } else if (i % 3 === 1) {
            // Цветок золотой
            return (
              <g key={i}>
                {Array.from({length: 5}).map((_, j) => {
                  const ja = (j / 5) * Math.PI * 2
                  return <ellipse key={j} cx={x + Math.cos(ja) * 1.5} cy={y + Math.sin(ja) * 1.5} rx="1.2" ry="0.5" fill="#ffd700" opacity="0.7" stroke="#b8860b" strokeWidth="0.2" transform={`rotate(${j * 72} ${x + Math.cos(ja) * 1.5} ${y + Math.sin(ja) * 1.5})`}/>
                })}
                <circle cx={x} cy={y} r="1" fill="rgba(120,80,40,0.7)"/>
              </g>
            )
          } else {
            // Листья зелёные
            return (
              <g key={i}>
                <path d={`M ${x2} ${y2} Q ${x2 + Math.cos(a) * 4} ${y2 + Math.sin(a) * 4 - 2} ${x2 + Math.cos(a) * 6} ${y2 + Math.sin(a) * 6}`} fill="rgba(34,100,40,0.6)" stroke="#2d6e2d" strokeWidth="0.3"/>
                <path d={`M ${x2} ${y2} Q ${x2 - Math.cos(a) * 3} ${y2 - Math.sin(a) * 3 - 1} ${x2 - Math.cos(a) * 5} ${y2 - Math.sin(a) * 5}`} fill="rgba(34,100,40,0.5)" stroke="#2d6e2d" strokeWidth="0.3"/>
              </g>
            )
          }
        })}

        {/* ===== ДЕВА — в центре венка ===== */}
        <g className="svg-breathe" style={{ transformOrigin: "100px 160px" }}>
          {/* Лёгкое покрывало — струящееся */}
          <path d="M 80 215 Q 82 195 86 175 Q 88 152 92 130 L 108 130 Q 112 152 114 175 Q 118 195 120 215 Q 100 220 80 215 Z"
            fill="rgba(245,230,200,0.35)" stroke="#b8860b" strokeWidth="0.5"/>
          {/* Складки покрывала */}
          <path d="M 86 145 Q 88 180 86 215" fill="none" stroke="rgba(180,140,70,0.4)" strokeWidth="0.4"/>
          <path d="M 94 145 Q 96 180 94 215" fill="none" stroke="rgba(180,140,70,0.3)" strokeWidth="0.3"/>
          <path d="M 100 145 Q 100 180 100 215" fill="none" stroke="rgba(180,140,70,0.3)" strokeWidth="0.3"/>
          <path d="M 106 145 Q 104 180 106 215" fill="none" stroke="rgba(180,140,70,0.3)" strokeWidth="0.3"/>
          <path d="M 114 145 Q 112 180 114 215" fill="none" stroke="rgba(180,140,70,0.4)" strokeWidth="0.4"/>

          {/* Золотой растительный узор на покрывале */}
          <path d="M 84 160 Q 92 156 100 160 Q 108 156 116 160 Q 110 166 100 162 Q 92 166 84 160 Z" fill="none" stroke="#ffd700" strokeWidth="0.4" opacity="0.7"/>
          <path d="M 84 195 Q 92 191 100 195 Q 108 191 116 195 Q 110 201 100 197 Q 92 201 84 195 Z" fill="none" stroke="#ffd700" strokeWidth="0.4" opacity="0.7"/>

          {/* Золотой пояс */}
          <path d="M 82 175 Q 100 173 118 175 L 118 180 Q 100 178 82 180 Z" fill="rgba(255,215,0,0.4)" stroke="#b8860b" strokeWidth="0.5"/>
          <circle cx="100" cy="177" r="2.5" fill="rgba(255,215,0,0.5)" stroke="#b8860b" strokeWidth="0.4"/>
          <path d="M 97 177 Q 100 174 103 177 Q 100 180 97 177 Z" fill="#991b1b" opacity="0.7"/>

          {/* Шея */}
          <path d="M 96 120 L 96 130 L 104 130 L 104 120 Z" fill="rgba(232,200,160,0.9)" stroke="#8b5a2b" strokeWidth="0.3"/>

          {/* Лицо — детальное, кроткое */}
          <path d="M 92 110 Q 90 100 94 93 Q 97 89 100 88 Q 103 89 106 93 Q 110 100 108 110 Q 109 116 107 120 Q 104 124 100 124 Q 96 124 93 120 Q 91 116 92 110 Z"
            fill="rgba(232,200,160,0.92)" stroke="#8b5a2b" strokeWidth="0.4"/>

          {/* Глаза */}
          <path d="M 93 104 Q 95 103 97 104 Q 97 105 95 106 Q 93 105 93 104 Z" fill="rgba(255,255,255,0.85)"/>
          <path d="M 103 104 Q 105 103 107 104 Q 107 105 105 106 Q 103 105 103 104 Z" fill="rgba(255,255,255,0.85)"/>
          <circle cx="95" cy="104.5" r="0.9" fill="#5a3a20"/>
          <circle cx="105" cy="104.5" r="0.9" fill="#5a3a20"/>

          {/* Брови */}
          <path d="M 93 102 Q 95 100 97 101" fill="none" stroke="#5a3a20" strokeWidth="0.5" strokeLinecap="round"/>
          <path d="M 103 101 Q 105 100 107 102" fill="none" stroke="#5a3a20" strokeWidth="0.5" strokeLinecap="round"/>

          {/* Нос */}
          <path d="M 100 108 L 99 114 Q 99 115 100 115 Q 101 115 101 114 Z" fill="none" stroke="#8b5a2b" strokeWidth="0.4"/>

          {/* Рот — мягкая улыбка */}
          <path d="M 96 117 Q 100 119 104 117" fill="none" stroke="#991b1b" strokeWidth="0.5" strokeLinecap="round"/>

          {/* Румянец */}
          <ellipse cx="94" cy="112" rx="1.5" ry="1" fill="rgba(220,120,80,0.25)"/>
          <ellipse cx="106" cy="112" rx="1.5" ry="1" fill="rgba(220,120,80,0.25)"/>

          {/* Длинные волосы — струящиеся */}
          <path d="M 88 100 Q 84 135 86 175" fill="none" stroke="rgba(180,140,70,0.8)" strokeWidth="3" strokeLinecap="round"/>
          <path d="M 112 100 Q 116 135 114 175" fill="none" stroke="rgba(180,140,70,0.8)" strokeWidth="3" strokeLinecap="round"/>
          <path d="M 92 95 Q 96 90 100 91 Q 104 90 108 95 Q 106 96 104 95 Q 100 93 96 95 Q 94 96 92 95 Z" fill="rgba(180,140,70,0.7)" stroke="#8b5a2b" strokeWidth="0.3"/>

          {/* Венок из цветов на голове */}
          <path d="M 88 96 Q 96 92 100 93 Q 104 92 112 96" fill="none" stroke="rgba(34,100,40,0.7)" strokeWidth="0.5"/>
          <circle cx="92" cy="94" r="1.6" fill="rgba(220,60,60,0.7)" stroke="#991b1b" strokeWidth="0.3"/>
          <circle cx="100" cy="92" r="1.6" fill="#ffd700" opacity="0.7" stroke="#b8860b" strokeWidth="0.3"/>
          <circle cx="108" cy="94" r="1.6" fill="rgba(220,180,200,0.7)" stroke="#991b1b" strokeWidth="0.3"/>
          {/* Лепестки */}
          <path d="M 90.5 92 Q 92 90 93.5 92" fill="none" stroke="rgba(220,60,60,0.5)" strokeWidth="0.3"/>
          <path d="M 98.5 90 Q 100 88 101.5 90" fill="none" stroke="#b8860b" strokeWidth="0.3"/>
          <path d="M 106.5 92 Q 108 90 109.5 92" fill="none" stroke="rgba(220,180,200,0.5)" strokeWidth="0.3"/>

          {/* Руки — держат платок */}
          <path d="M 88 145 Q 80 155 76 165" fill="none" stroke="rgba(232,200,160,0.9)" strokeWidth="3" strokeLinecap="round"/>
          <path d="M 112 145 Q 120 155 124 165" fill="none" stroke="rgba(232,200,160,0.9)" strokeWidth="3" strokeLinecap="round"/>
        </g>

        {/* Платок в руках девы — красный, развевающийся */}
        <path d="M 76 165 Q 100 162 124 165 Q 122 175 100 172 Q 78 175 76 165 Z" fill="rgba(180,30,30,0.5)" stroke="#991b1b" strokeWidth="0.4"/>
        {/* Узор на платке */}
        <path d="M 80 168 Q 100 165 120 168" fill="none" stroke="#ffd700" strokeWidth="0.4" opacity="0.6"/>
        {/* Бахрома платка */}
        <path d="M 76 165 Q 74 168 75 170" fill="none" stroke="#991b1b" strokeWidth="0.3"/>
        <path d="M 124 165 Q 126 168 125 170" fill="none" stroke="#991b1b" strokeWidth="0.3"/>

        {/* ===== Четыре сказочных существа в углах ===== */}
        {/* ЛЕВ — вверху слева (зодиакальный знак Льва) */}
        <g>
          {/* Тело льва — лежащее */}
          <path d="M 32 75 Q 28 70 32 65 Q 38 62 45 65 Q 50 68 48 73 Q 45 78 38 77 Q 32 78 32 75 Z"
            fill="rgba(184,134,11,0.55)" stroke="#5a3a20" strokeWidth="0.4"/>
          {/* Голова льва */}
          <path d="M 36 70 Q 34 65 38 62 Q 42 62 44 66 Q 45 70 42 72 Q 38 73 36 70 Z"
            fill="rgba(232,200,160,0.7)" stroke="#5a3a20" strokeWidth="0.4"/>
          {/* Грива — пышная, золотая */}
          <path d="M 32 68 Q 28 64 30 60 Q 28 64 26 68 Q 30 65 32 68 Z" fill="rgba(255,215,0,0.6)" stroke="#b8860b" strokeWidth="0.3"/>
          <path d="M 36 60 Q 34 56 38 56 Q 36 60 38 62 Z" fill="rgba(255,215,0,0.5)" stroke="#b8860b" strokeWidth="0.3"/>
          <path d="M 44 62 Q 46 58 48 62 Q 46 60 44 62 Z" fill="rgba(255,215,0,0.5)" stroke="#b8860b" strokeWidth="0.3"/>
          {/* Глаз */}
          <circle cx="40" cy="68" r="0.5" fill="#3a2010"/>
          {/* Нос */}
          <path d="M 41 70 Q 42 71 41 71" fill="rgba(60,40,30,0.7)"/>
        </g>

        {/* ОРЁЛ — вверху справа (зодиакальный знак Скорпиона, но традиционно — орёл) */}
        <g>
          {/* Тело орла */}
          <path d="M 155 70 Q 152 65 158 62 Q 165 62 168 67 Q 170 72 165 75 Q 158 75 155 70 Z"
            fill="rgba(80,55,30,0.7)" stroke="#3a2010" strokeWidth="0.4"/>
          {/* Голова орла */}
          <path d="M 154 65 Q 152 60 156 58 Q 160 60 158 65 Z" fill="rgba(232,200,160,0.7)" stroke="#5a3a20" strokeWidth="0.4"/>
          {/* Клюв — загнутый */}
          <path d="M 153 62 L 150 63 L 154 64 Z" fill="rgba(255,215,0,0.6)" stroke="#5a3a20" strokeWidth="0.3"/>
          {/* Глаз */}
          <circle cx="156" cy="62" r="0.5" fill="#ffd700"/>
          {/* Крылья — раскинутые */}
          <path d="M 160 65 Q 170 55 175 65 Q 168 62 162 67" fill="rgba(80,55,30,0.6)" stroke="#3a2010" strokeWidth="0.4"/>
          <path d="M 162 70 Q 172 65 178 72 Q 170 70 164 72" fill="rgba(80,55,30,0.5)" stroke="#3a2010" strokeWidth="0.3"/>
          {/* Перья на крыльях */}
          <path d="M 165 60 Q 168 58 172 60" fill="none" stroke="#3a2010" strokeWidth="0.3"/>
          <path d="M 168 63 Q 171 61 175 63" fill="none" stroke="#3a2010" strokeWidth="0.3"/>
          {/* Хвост */}
          <path d="M 168 72 Q 174 75 172 80" fill="none" stroke="rgba(80,55,30,0.7)" strokeWidth="1" strokeLinecap="round"/>
        </g>

        {/* БЫК — внизу слева (зодиакальный знак Тельца) */}
        <g>
          {/* Тело быка */}
          <path d="M 30 230 Q 26 225 30 220 Q 38 218 45 221 Q 50 224 48 230 Q 45 235 38 234 Q 30 235 30 230 Z"
            fill="rgba(80,50,35,0.6)" stroke="#3a2010" strokeWidth="0.4"/>
          {/* Голова быка */}
          <path d="M 34 226 Q 32 222 36 220 Q 40 220 42 224 Q 44 228 40 230 Q 36 230 34 226 Z"
            fill="rgba(120,80,40,0.7)" stroke="#3a2010" strokeWidth="0.4"/>
          {/* Рога — загнутые */}
          <path d="M 34 222 Q 30 218 28 222 Q 30 220 32 222 Z" fill="rgba(220,200,160,0.7)" stroke="#3a2010" strokeWidth="0.3"/>
          <path d="M 42 222 Q 46 218 48 222 Q 46 220 44 222 Z" fill="rgba(220,200,160,0.7)" stroke="#3a2010" strokeWidth="0.3"/>
          {/* Глаза */}
          <circle cx="36" cy="226" r="0.5" fill="#3a2010"/>
          <circle cx="40" cy="226" r="0.5" fill="#3a2010"/>
          {/* Ноздри */}
          <circle cx="37" cy="228" r="0.3" fill="rgba(20,15,10,0.7)"/>
          <circle cx="39" cy="228" r="0.3" fill="rgba(20,15,10,0.7)"/>
          {/* Копыта */}
          <path d="M 30 232 L 28 235 L 32 235 Z" fill="rgba(40,25,15,0.8)" stroke="#3a2010" strokeWidth="0.2"/>
          <path d="M 48 232 L 46 235 L 50 235 Z" fill="rgba(40,25,15,0.8)" stroke="#3a2010" strokeWidth="0.2"/>
        </g>

        {/* АНГЕЛ — внизу справа (зодиакальный знак Водолея, но традиционно — ангел) */}
        <g>
          {/* Тело ангела — в белой мантии */}
          <path d="M 152 230 Q 150 222 154 218 L 168 218 Q 172 222 170 230 Q 161 235 152 230 Z"
            fill="rgba(255,250,235,0.6)" stroke="#b8860b" strokeWidth="0.4"/>
          {/* Голова */}
          <path d="M 156 218 Q 154 213 158 210 Q 162 209 164 210 Q 168 213 166 218 Q 166 221 161 221 Q 156 221 156 218 Z"
            fill="rgba(232,200,160,0.85)" stroke="#8b5a2b" strokeWidth="0.4"/>
          {/* Волосы — золотистые */}
          <path d="M 156 214 Q 161 210 166 214 Q 164 212 161 211 Q 158 212 156 214 Z" fill="rgba(180,140,70,0.7)"/>
          {/* Глаза */}
          <circle cx="159" cy="216" r="0.5" fill="#3a2010"/>
          <circle cx="163" cy="216" r="0.5" fill="#3a2010"/>
          {/* Рот */}
          <path d="M 160 219 Q 161 220 162 219" fill="none" stroke="#991b1b" strokeWidth="0.3"/>
          {/* Золотой нимб */}
          <ellipse cx="161" cy="207" rx="7" ry="2.5" fill="none" stroke="#ffd700" strokeWidth="0.8" opacity="0.85"/>
          <ellipse cx="161" cy="207" rx="9" ry="3" fill="rgba(255,215,0,0.1)" stroke="none"/>
          {/* Крылья — маленькие */}
          <path d="M 154 222 Q 148 218 146 226 Q 152 222 156 224" fill="rgba(255,255,255,0.5)" stroke="#b8860b" strokeWidth="0.4"/>
          <path d="M 170 222 Q 176 218 178 226 Q 172 222 168 224" fill="rgba(255,255,255,0.5)" stroke="#b8860b" strokeWidth="0.4"/>
          {/* Перья на крыльях */}
          <path d="M 150 220 Q 152 222 150 226" fill="none" stroke="#b8860b" strokeWidth="0.3"/>
          <path d="M 172 220 Q 170 222 172 226" fill="none" stroke="#b8860b" strokeWidth="0.3"/>
        </g>
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
