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

    // X. КОЛЕСО ФОРТУНЫ — детальное резное колесо с рунами, вращающееся
    "major-10": (
      <g>
        {/* Фон — закатное небо с Ochre */}
        <rect x="14" y="42" width="172" height="208" fill="rgba(204,153,51,0.1)" rx="2"/>
        {/* Закатное небо — полосы */}
        <path d="M 14 42 L 186 42 L 186 90 Q 150 75 100 80 Q 50 75 14 90 Z" fill="rgba(220,140,60,0.18)"/>
        <path d="M 14 55 L 186 55 L 186 95 Q 150 80 100 85 Q 50 80 14 95 Z" fill="rgba(180,80,30,0.12)"/>

        {/* Восходящее солнце */}
        <g>
          <circle cx="100" cy="85" r="14" fill="rgba(255,200,80,0.15)" stroke="none"/>
          <path d="M 90 85 Q 90 75 100 75 Q 110 75 110 85 Z" fill="rgba(255,180,60,0.45)" stroke="#b8860b" strokeWidth="0.4"/>
          {/* Лучи */}
          {[-60, -40, -20, 0, 20, 40, 60].map(deg => {
            const rad = deg * Math.PI / 180
            return <line key={deg} x1={100 + Math.cos(rad - Math.PI/2) * 11} y1={85 + Math.sin(rad - Math.PI/2) * 11} x2={100 + Math.cos(rad - Math.PI/2) * 18} y2={85 + Math.sin(rad - Math.PI/2) * 18} stroke="#ffd700" strokeWidth="0.5" opacity="0.5"/>
          })}
        </g>

        {/* Облака — васнецовские резные */}
        <path d="M 25 60 Q 35 55 45 60 Q 55 56 65 62 Q 60 65 50 63 Q 40 66 30 63 Q 22 63 25 60 Z" fill="rgba(255,255,255,0.18)"/>
        <path d="M 130 55 Q 140 50 150 55 Q 165 52 175 58 Q 168 62 158 59 Q 148 63 138 59 Q 128 60 130 55 Z" fill="rgba(255,255,255,0.18)"/>
        <path d="M 70 100 Q 80 96 90 100 Q 88 104 80 103 Q 72 104 70 100 Z" fill="rgba(255,255,255,0.12)"/>

        {/* Звёзды небесные */}
        <circle cx="35" cy="55" r="0.6" fill="#ffd700" opacity="0.7"/>
        <circle cx="165" cy="50" r="0.7" fill="#ffd700" opacity="0.7"/>
        <circle cx="50" cy="105" r="0.5" fill="#ffd700" opacity="0.5"/>
        <circle cx="150" cy="100" r="0.5" fill="#ffd700" opacity="0.5"/>

        {/* Дальние холмы с городом */}
        <path d="M 14 215 Q 50 208 100 212 Q 150 208 186 215 L 186 250 L 14 250 Z" fill="rgba(120,80,40,0.25)" stroke="#5a3a20" strokeWidth="0.3"/>
        {/* Купола далёкого города */}
        <path d="M 35 215 L 35 205 Q 35 201 38 201 Q 41 201 41 205 L 41 215 Z" fill="rgba(120,20,20,0.35)" stroke="#5a3a20" strokeWidth="0.3"/>
        <path d="M 37 201 Q 38 197 39 201" fill="rgba(255,215,0,0.5)"/>
        <path d="M 145 215 L 145 206 Q 145 202 148 202 Q 151 202 151 206 L 151 215 Z" fill="rgba(120,20,20,0.35)" stroke="#5a3a20" strokeWidth="0.3"/>
        <path d="M 147 202 Q 148 198 149 202" fill="rgba(255,215,0,0.5)"/>
        <path d="M 85 215 L 85 209 Q 85 206 87 206 Q 89 206 89 209 L 89 215 Z" fill="rgba(120,20,20,0.3)" stroke="#5a3a20" strokeWidth="0.2"/>
        <path d="M 110 215 L 110 209 Q 110 206 112 206 Q 114 206 114 209 L 114 215 Z" fill="rgba(120,20,20,0.3)" stroke="#5a3a20" strokeWidth="0.2"/>

        {/* Лучи света от колеса */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(deg => {
          const rad = deg * Math.PI / 180
          return <line key={deg} x1={100} y1={155} x2={100 + Math.cos(rad) * 80} y2={155 + Math.sin(rad) * 80} stroke="rgba(255,215,0,0.1)" strokeWidth="0.6"/>
        })}

        {/* ===== ОПОРА КОЛЕСА — резной деревянный стояк ===== */}
        <path d="M 70 210 L 70 195 L 130 195 L 130 210 Z" fill="rgba(80,55,30,0.6)" stroke="#3a2010" strokeWidth="0.5"/>
        {/* Резьба на опоре */}
        <path d="M 75 200 Q 85 198 95 200 Q 105 198 115 200 Q 120 198 125 200" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.6"/>
        <path d="M 75 205 Q 85 203 95 205 Q 105 203 115 205 Q 120 203 125 205" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.5"/>
        {/* Ножки опоры */}
        <path d="M 70 210 L 65 215 L 135 215 L 130 210 Z" fill="rgba(60,40,25,0.7)" stroke="#3a2010" strokeWidth="0.4"/>

        {/* ============================================================
            КОЛЕСО ФОРТУНЫ — детальное, резное, ВРАЩАЮЩЕЕСЯ
            ============================================================ */}
        <g className="svg-wheel-spin">
          {/* Внешний обод — широкий, с золотом, 3 слоя */}
          <circle cx="100" cy="155" r="50" fill="none" stroke="#b8860b" strokeWidth="3.5"/>
          <circle cx="100" cy="155" r="50" fill="none" stroke="#ffd700" strokeWidth="0.8" opacity="0.8"/>
          <circle cx="100" cy="155" r="47" fill="none" stroke="#5a3a20" strokeWidth="0.6"/>

          {/* Точки по внешнему ободу — 24 шт */}
          {Array.from({length: 24}).map((_, i) => {
            const a = (i / 24) * Math.PI * 2
            return <circle key={i} cx={100 + Math.cos(a) * 50} cy={155 + Math.sin(a) * 50} r="0.5" fill="#ffd700" opacity="0.8"/>
          })}

          {/* Средний обод — с растительным узором */}
          <circle cx="100" cy="155" r="44" fill="none" stroke="#8b5a2b" strokeWidth="1.5"/>
          <circle cx="100" cy="155" r="42" fill="rgba(184,134,11,0.18)" stroke="#5a3a20" strokeWidth="0.6"/>

          {/* Растительные завитки на среднем ободе */}
          {Array.from({length: 8}).map((_, i) => {
            const a = (i / 8) * Math.PI * 2 + Math.PI / 16
            const x = 100 + Math.cos(a) * 43
            const y = 155 + Math.sin(a) * 43
            return <path key={i} d={`M ${x-2} ${y} Q ${x} ${y-1.5} ${x+2} ${y} Q ${x} ${y+1.5} ${x-2} ${y} Z`} fill="none" stroke="#ffd700" strokeWidth="0.4" opacity="0.6"/>
          })}

          {/* Спицы — 8 шт, резные, с украшениями */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => {
            const rad = deg * Math.PI / 180
            const x1 = 100 + Math.cos(rad) * 14
            const y1 = 155 + Math.sin(rad) * 14
            const x2 = 100 + Math.cos(rad) * 42
            const y2 = 155 + Math.sin(rad) * 42
            return (
              <g key={deg}>
                {/* Основная спица — толстая, с золотой каймой */}
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#5a3a20" strokeWidth="2.2"/>
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#ffd700" strokeWidth="0.6" opacity="0.6"/>
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,200,0.5)" strokeWidth="0.3"/>
                {/* Декоративные точки на спице */}
                <circle cx={100 + Math.cos(rad) * 22} cy={155 + Math.sin(rad) * 22} r="1.2" fill="rgba(255,215,0,0.6)" stroke="#b8860b" strokeWidth="0.3"/>
                <circle cx={100 + Math.cos(rad) * 32} cy={155 + Math.sin(rad) * 32} r="1.2" fill="rgba(255,215,0,0.6)" stroke="#b8860b" strokeWidth="0.3"/>
              </g>
            )
          })}

          {/* Руны на ободе — крупнее, ярче */}
          {["ᚠ", "ᚢ", "ᚦ", "ᚨ", "ᚱ", "ᚲ", "ᚷ", "ᚹ"].map((rune, i) => {
            const a = (i / 8) * Math.PI * 2 - Math.PI / 2
            return (
              <g key={i}>
                {/* Подложка под руну */}
                <circle cx={100 + Math.cos(a) * 47} cy={155 + Math.sin(a) * 47} r="3" fill="rgba(40,25,15,0.6)" stroke="#b8860b" strokeWidth="0.3"/>
                <text x={100 + Math.cos(a) * 47} y={155 + Math.sin(a) * 47 + 2} fontSize="5.5" textAnchor="middle" fill="#ffd700" opacity="1" fontWeight="bold">{rune}</text>
              </g>
            )
          })}

          {/* Внутренний круг колеса — центр */}
          <circle cx="100" cy="155" r="14" fill="rgba(184,134,11,0.5)" stroke="#b8860b" strokeWidth="1.2"/>
          <circle cx="100" cy="155" r="11" fill="rgba(120,80,40,0.5)" stroke="#5a3a20" strokeWidth="0.5"/>
          <circle cx="100" cy="155" r="8" fill="rgba(255,215,0,0.3)" stroke="#b8860b" strokeWidth="0.4"/>

          {/* Центральный медальон — символ солнца/Колеса Фортуны */}
          {/* 4 буквы TARO по кругу */}
          {["T", "A", "R", "O"].map((letter, i) => {
            const a = (i / 4) * Math.PI * 2 - Math.PI / 2
            return <text key={i} x={100 + Math.cos(a) * 5.5} y={155 + Math.sin(a) * 5.5 + 1.5} fontSize="3" textAnchor="middle" fill="#ffd700" fontWeight="bold">{letter}</text>
          })}
          {/* Центральная точка */}
          <circle cx="100" cy="155" r="1.5" fill="#991b1b"/>
          <circle cx="100" cy="155" r="0.5" fill="#ffd700"/>

          {/* Декоративные стрелки-указатели на ободе — 4 шт */}
          {[45, 135, 225, 315].map(deg => {
            const rad = deg * Math.PI / 180
            const x = 100 + Math.cos(rad) * 38
            const y = 155 + Math.sin(rad) * 38
            const x2 = 100 + Math.cos(rad) * 35
            const y2 = 155 + Math.sin(rad) * 35
            return <path key={deg} d={`M ${x} ${y} L ${x + Math.cos(rad + 2.5) * 3} ${y + Math.sin(rad + 2.5) * 3} L ${x2} ${y2} L ${x + Math.cos(rad - 2.5) * 3} ${y + Math.sin(rad - 2.5) * 3} Z`} fill="rgba(255,215,0,0.5)" stroke="#b8860b" strokeWidth="0.3"/>
          })}
        </g>

        {/* ============================================================
            СФИНКС — на вершине колеса (НЕ вращается, статичный)
            ============================================================ */}
        <g className="svg-breathe" style={{ transformOrigin: "100px 100px" }}>
          {/* Подставка под сфинксом */}
          <ellipse cx="100" cy="108" rx="12" ry="2" fill="rgba(40,25,15,0.5)" stroke="#3a2010" strokeWidth="0.3"/>

          {/* Тело сфинкса — лежащее, детальное */}
          <path d="M 88 108 Q 86 102 90 100 Q 95 98 105 98 Q 114 98 115 104 Q 116 108 114 110 Q 108 112 100 111 Q 92 112 88 108 Z"
            fill="rgba(220,180,120,0.75)" stroke="#5a3a20" strokeWidth="0.5"/>
          {/* Складки на теле */}
          <path d="M 95 104 Q 100 102 105 104" fill="none" stroke="rgba(120,80,40,0.5)" strokeWidth="0.3"/>
          {/* Крылья сфинкса — маленькие, сложенные */}
          <path d="M 92 102 Q 88 96 92 94 Q 95 98 95 102 Z" fill="rgba(255,215,0,0.4)" stroke="#b8860b" strokeWidth="0.3"/>
          <path d="M 110 102 Q 114 96 110 94 Q 107 98 107 102 Z" fill="rgba(255,215,0,0.4)" stroke="#b8860b" strokeWidth="0.3"/>

          {/* Голова сфинкса — женская с убором */}
          <path d="M 96 100 Q 94 92 96 88 Q 99 85 102 85 Q 105 85 107 88 Q 109 92 107 100 Q 108 104 106 106 Q 103 108 100 108 Q 97 108 95 106 Q 94 104 96 100 Z"
            fill="rgba(232,200,160,0.85)" stroke="#5a3a20" strokeWidth="0.5"/>
          {/* Лицо сфинкса */}
          <ellipse cx="99" cy="93" rx="0.8" ry="0.6" fill="rgba(255,255,255,0.85)"/>
          <ellipse cx="103" cy="93" rx="0.8" ry="0.6" fill="rgba(255,255,255,0.85)"/>
          <circle cx="99" cy="93.3" r="0.4" fill="#3a2010"/>
          <circle cx="103" cy="93.3" r="0.4" fill="#3a2010"/>
          {/* Брови */}
          <path d="M 98 91 Q 99 90 100 91" fill="none" stroke="#5a3a20" strokeWidth="0.3"/>
          <path d="M 102 91 Q 103 90 104 91" fill="none" stroke="#5a3a20" strokeWidth="0.3"/>
          {/* Нос */}
          <path d="M 101 94 L 100 97 Q 101 97.5 102 97" fill="none" stroke="#8b5a2b" strokeWidth="0.3"/>
          {/* Рот */}
          <path d="M 99 99 Q 101 100 103 99" fill="none" stroke="#991b1b" strokeWidth="0.3"/>

          {/* Убор сфинкса — золотой, с орлом */}
          <path d="M 94 89 Q 96 85 100 84 Q 104 85 106 89 Q 104 88 100 87 Q 96 88 94 89 Z" fill="rgba(255,215,0,0.6)" stroke="#b8860b" strokeWidth="0.4"/>
          {/* Орёл на уборе */}
          <path d="M 99 84 L 100 81 L 101 84 Z" fill="#ffd700"/>
          <path d="M 98 84 Q 100 82 102 84" fill="none" stroke="#991b1b" strokeWidth="0.3"/>
          {/* Лапы */}
          <path d="M 90 109 L 88 113 L 92 113 Z" fill="rgba(220,180,120,0.8)" stroke="#5a3a20" strokeWidth="0.3"/>
          <path d="M 110 110 L 108 114 L 112 114 Z" fill="rgba(220,180,120,0.8)" stroke="#5a3a20" strokeWidth="0.3"/>
        </g>

        {/* ============================================================
            ЗМЕЙ (Тюфон) — обвивается вокруг колеса (статичный)
            ============================================================ */}
        <g>
          {/* Тело змея — S-образное, обвивает основание колеса */}
          <path d="M 55 200 Q 65 195 75 200 Q 85 205 95 200 Q 105 195 115 200 Q 125 205 135 200 Q 145 195 150 200"
            fill="none" stroke="rgba(60,40,30,0.85)" strokeWidth="4" strokeLinecap="round"/>
          <path d="M 55 200 Q 65 195 75 200 Q 85 205 95 200 Q 105 195 115 200 Q 125 205 135 200 Q 145 195 150 200"
            fill="none" stroke="rgba(120,80,40,0.7)" strokeWidth="3" strokeLinecap="round"/>
          <path d="M 55 200 Q 65 195 75 200 Q 85 205 95 200 Q 105 195 115 200 Q 125 205 135 200 Q 145 195 150 200"
            fill="none" stroke="#3a2010" strokeWidth="0.5"/>
          {/* Чешуйчатый узор — детальный */}
          {[58, 68, 78, 88, 98, 108, 118, 128, 138, 148].map((x, i) => (
            <g key={i}>
              <path d={`M ${x} ${i % 2 === 0 ? 199 : 201} Q ${x + 2} ${i % 2 === 0 ? 197 : 203} ${x + 4} ${i % 2 === 0 ? 199 : 201}`} fill="none" stroke="rgba(255,215,0,0.5)" strokeWidth="0.4"/>
              <circle cx={x + 2} cy={i % 2 === 0 ? 198 : 202} r="0.3" fill="rgba(255,215,0,0.4)"/>
            </g>
          ))}
          {/* Голова змея — слева, детальная */}
          <path d="M 52 200 Q 47 200 45 203 Q 45 207 50 207 Q 53 205 52 200 Z"
            fill="rgba(60,40,30,0.9)" stroke="#3a2010" strokeWidth="0.5"/>
          {/* Глаз змея */}
          <ellipse cx="49" cy="203" rx="0.8" ry="0.6" fill="#ffd700" stroke="#3a2010" strokeWidth="0.2"/>
          <ellipse cx="49" cy="203" rx="0.3" ry="0.4" fill="#3a2010"/>
          {/* Язык змея — раздвоенный */}
          <path d="M 45 205 L 42 204 L 43 206" fill="none" stroke="#991b1b" strokeWidth="0.5"/>
          <path d="M 45 205 L 42 206 L 43 207" fill="none" stroke="#991b1b" strokeWidth="0.4"/>
          {/* Хвост змея — справа, сужающийся */}
          <path d="M 150 200 Q 156 198 158 195 Q 159 192 157 190" fill="none" stroke="rgba(60,40,30,0.85)" strokeWidth="3" strokeLinecap="round"/>
          <path d="M 158 195 Q 160 193 161 191" fill="none" stroke="rgba(60,40,30,0.7)" strokeWidth="2" strokeLinecap="round"/>
        </g>

        {/* ============================================================
            АНУБИС (Сфинкс-Собака) — слева, восходит (статичный)
            ============================================================ */}
        <g>
          {/* Тело — лежащее */}
          <path d="M 30 215 Q 27 211 30 207 Q 38 205 48 207 Q 53 209 51 215 Q 43 218 35 217 Q 28 217 30 215 Z"
            fill="rgba(50,35,25,0.85)" stroke="#3a2010" strokeWidth="0.5"/>
          {/* Голова — собачья */}
          <path d="M 32 212 Q 30 207 33 203 Q 37 200 42 202 Q 44 206 43 211 Q 42 214 38 215 Q 33 215 32 212 Z"
            fill="rgba(60,40,30,0.85)" stroke="#3a2010" strokeWidth="0.5"/>
          {/* Морда — вытянутая */}
          <path d="M 33 210 Q 30 211 30 214 Q 33 215 35 213 Z" fill="rgba(80,55,30,0.85)" stroke="#3a2010" strokeWidth="0.3"/>
          {/* Уши — длинные, остроконечные */}
          <path d="M 31 205 Q 28 198 30 193 L 33 203 Z" fill="rgba(60,40,30,0.9)" stroke="#3a2010" strokeWidth="0.4"/>
          <path d="M 40 203 Q 43 197 42 192 L 38 202 Z" fill="rgba(60,40,30,0.9)" stroke="#3a2010" strokeWidth="0.4"/>
          {/* Глаза — горящие */}
          <ellipse cx="35" cy="208" rx="0.7" ry="0.5" fill="#ffd700"/>
          <ellipse cx="35.2" cy="207.8" r="0.2" fill="#fff"/>
          {/* Нос */}
          <ellipse cx="31" cy="213" rx="0.6" ry="0.4" fill="rgba(20,15,10,0.9)"/>
          {/* Лапы */}
          <path d="M 44 216 L 42 220 L 46 220 Z" fill="rgba(60,40,30,0.85)" stroke="#3a2010" strokeWidth="0.3"/>
          <path d="M 48 216 L 46 220 L 50 220 Z" fill="rgba(60,40,30,0.85)" stroke="#3a2010" strokeWidth="0.3"/>
          {/* Хвост */}
          <path d="M 51 212 Q 58 207 60 212" fill="none" stroke="rgba(60,40,30,0.85)" strokeWidth="2" strokeLinecap="round"/>
          {/* Ошейник — золотой */}
          <path d="M 32 210 Q 36 209 42 210" fill="none" stroke="#ffd700" strokeWidth="0.5" opacity="0.7"/>
          <circle cx="37" cy="209.5" r="0.5" fill="#ffd700"/>
        </g>

        {/* ============================================================
            СФИНКС-КОШКА (Бастет) — справа, нисходит (статичный)
            ============================================================ */}
        <g>
          {/* Тело — лежащее */}
          <path d="M 145 215 Q 142 211 145 207 Q 153 205 163 207 Q 168 209 166 215 Q 158 218 150 217 Q 143 217 145 215 Z"
            fill="rgba(220,200,160,0.75)" stroke="#8b5a2b" strokeWidth="0.5"/>
          {/* Голова — кошачья */}
          <path d="M 155 212 Q 153 207 156 203 Q 160 200 165 202 Q 167 206 166 211 Q 165 214 161 215 Q 156 215 155 212 Z"
            fill="rgba(232,200,160,0.85)" stroke="#8b5a2b" strokeWidth="0.5"/>
          {/* Уши — кошачьи, треугольные */}
          <path d="M 155 205 L 153 198 L 157 202 Z" fill="rgba(232,200,160,0.85)" stroke="#8b5a2b" strokeWidth="0.3"/>
          <path d="M 163 203 L 165 197 L 167 203 Z" fill="rgba(232,200,160,0.85)" stroke="#8b5a2b" strokeWidth="0.3"/>
          {/* Внутренность ушей */}
          <path d="M 155 202 L 154 199 L 156 201 Z" fill="rgba(180,60,60,0.6)"/>
          <path d="M 164 201 L 165 199 L 166 202 Z" fill="rgba(180,60,60,0.6)"/>
          {/* Глаза — кошачьи */}
          <ellipse cx="158" cy="208" rx="0.9" ry="0.7" fill="#ffd700"/>
          <ellipse cx="162" cy="208" rx="0.9" ry="0.7" fill="#ffd700"/>
          <ellipse cx="158" cy="208" rx="0.3" ry="0.6" fill="#3a2010"/>
          <ellipse cx="162" cy="208" rx="0.3" ry="0.6" fill="#3a2010"/>
          {/* Нос */}
          <path d="M 159 211 Q 160 212 161 211" fill="rgba(180,60,60,0.7)"/>
          {/* Усы */}
          <path d="M 156 212 Q 152 213 150 213" fill="none" stroke="rgba(232,200,160,0.7)" strokeWidth="0.2"/>
          <path d="M 156 213 Q 152 214 150 214" fill="none" stroke="rgba(232,200,160,0.7)" strokeWidth="0.2"/>
          <path d="M 164 212 Q 168 213 170 213" fill="none" stroke="rgba(232,200,160,0.7)" strokeWidth="0.2"/>
          <path d="M 164 213 Q 168 214 170 214" fill="none" stroke="rgba(232,200,160,0.7)" strokeWidth="0.2"/>
          {/* Лапы */}
          <path d="M 147 216 L 145 220 L 149 220 Z" fill="rgba(220,200,160,0.85)" stroke="#8b5a2b" strokeWidth="0.3"/>
          <path d="M 151 216 L 149 220 L 153 220 Z" fill="rgba(220,200,160,0.85)" stroke="#8b5a2b" strokeWidth="0.3"/>
          {/* Хвост — длинный, загнутый */}
          <path d="M 166 212 Q 174 210 176 215 Q 178 220 174 223" fill="none" stroke="rgba(220,200,160,0.85)" strokeWidth="2" strokeLinecap="round"/>
          {/* Ошейник — золотой */}
          <path d="M 155 210 Q 160 209 165 210" fill="none" stroke="#ffd700" strokeWidth="0.5" opacity="0.7"/>
          <circle cx="160" cy="209.5" r="0.5" fill="#ffd700"/>
        </g>

        {/* Декоративные васнецовские завитки по углам */}
        <path d="M 25 130 Q 30 125 35 130 Q 30 135 25 130 Z" fill="none" stroke="rgba(255,215,0,0.4)" strokeWidth="0.4"/>
        <path d="M 165 130 Q 170 125 175 130 Q 170 135 165 130 Z" fill="none" stroke="rgba(255,215,0,0.4)" strokeWidth="0.4"/>
        {/* Цветы по углам */}
        <g>
          <circle cx="28" cy="135" r="1.5" fill="rgba(220,60,60,0.6)" stroke="#991b1b" strokeWidth="0.3"/>
          <circle cx="28" cy="135" r="0.5" fill="#ffd700"/>
        </g>
        <g>
          <circle cx="172" cy="135" r="1.5" fill="rgba(220,60,60,0.6)" stroke="#991b1b" strokeWidth="0.3"/>
          <circle cx="172" cy="135" r="0.5" fill="#ffd700"/>
        </g>
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

    // XII. ПОВЕШЕННЫЙ — юноша, подвешенный за ногу на Т-образном столбе
    "major-12": (
      <g>
        {/* Сумеречный лесной фон — мягкий, не отвлекает */}
        <rect x="14" y="42" width="172" height="208" fill="rgba(50,45,30,0.18)" rx="2"/>
        {/* Лёгкое облачко */}
        <path d="M 30 60 Q 40 55 50 60 Q 55 58 60 62 Q 55 66 45 64 Q 35 65 30 60 Z" fill="rgba(255,255,255,0.08)"/>

        {/* ===== Т-ОБРАЗНЫЙ СТОЛБ — ясная горизонтальная перекладина + вертикаль ===== */}
        {/* Вертикальный столб — толстый, в землю */}
        <path d="M 96 250 L 96 130 L 104 130 L 104 250 Z" fill="rgba(80,55,30,0.85)" stroke="#3a2010" strokeWidth="0.6"/>
        {/* Морщины коры на столбе */}
        <path d="M 98 140 Q 98 190 98 240" fill="none" stroke="#3a2010" strokeWidth="0.4"/>
        <path d="M 100 135 Q 100 195 100 245" fill="none" stroke="#3a2010" strokeWidth="0.3"/>
        <path d="M 102 140 Q 102 190 102 240" fill="none" stroke="#3a2010" strokeWidth="0.4"/>

        {/* Горизонтальная перекладина — длинная, толще */}
        <path d="M 50 125 L 150 125 L 150 138 L 50 138 Z" fill="rgba(80,55,30,0.85)" stroke="#3a2010" strokeWidth="0.6"/>
        {/* Морщины на перекладине */}
        <path d="M 55 130 L 145 130" fill="none" stroke="#3a2010" strokeWidth="0.3"/>
        <path d="M 55 134 L 145 134" fill="none" stroke="#3a2010" strokeWidth="0.3"/>
        {/* Торцы перекладины */}
        <ellipse cx="50" cy="131.5" rx="2" ry="6.5" fill="rgba(60,40,25,0.9)" stroke="#3a2010" strokeWidth="0.4"/>
        <ellipse cx="150" cy="131.5" rx="2" ry="6.5" fill="rgba(60,40,25,0.9)" stroke="#3a2010" strokeWidth="0.4"/>

        {/* Узел соединения столба и перекладины */}
        <circle cx="100" cy="131.5" r="3" fill="rgba(120,90,50,0.7)" stroke="#5a3a20" strokeWidth="0.4"/>

        {/* ===== ВЕРЁВКА — свисает с перекладины ===== */}
        <path d="M 100 138 L 100 155" fill="none" stroke="rgba(120,90,50,0.85)" strokeWidth="2.5" strokeLinecap="round"/>
        {/* Узел верёвки у перекладины */}
        <circle cx="100" cy="140" r="2.5" fill="rgba(120,90,50,0.8)" stroke="#5a3a20" strokeWidth="0.4"/>
        <path d="M 97 142 Q 95 145 97 148" fill="none" stroke="rgba(120,90,50,0.7)" strokeWidth="0.6"/>
        <path d="M 103 142 Q 105 145 103 148" fill="none" stroke="rgba(120,90,50,0.7)" strokeWidth="0.6"/>

        {/* ===== Земля с травой у основания столба ===== */}
        <path d="M 14 235 Q 50 230 100 235 Q 150 230 186 235 L 186 250 L 14 250 Z" fill="rgba(60,50,30,0.35)" stroke="#3a2010" strokeWidth="0.3"/>
        {/* Камни у основания */}
        <path d="M 75 240 Q 72 235 75 231 Q 80 229 83 233 Q 85 238 82 241 Q 78 243 75 240 Z" fill="rgba(80,70,55,0.55)" stroke="#5a3a20" strokeWidth="0.3"/>
        <path d="M 115 240 Q 112 235 115 231 Q 120 229 123 233 Q 125 238 122 241 Q 118 243 115 240 Z" fill="rgba(80,70,55,0.55)" stroke="#5a3a20" strokeWidth="0.3"/>
        {/* Травинки */}
        <path d="M 50 238 Q 52 232 54 238" fill="none" stroke="#2d6e2d" strokeWidth="0.5"/>
        <path d="M 145 238 Q 147 232 149 238" fill="none" stroke="#2d6e2d" strokeWidth="0.5"/>

        {/* ===== ФИГУРА ЮНОШИ — перевёрнутая, головой вниз =====
            Композиция: ноги вверху (одна привязана к верёвке), тело вниз, голова в самом низу с нимбом */}
        <g>
          {/* === НОГИ — вверху, одна привязана к верёвке === */}
          {/* Левая нога (свободная, согнута) — перекрещивается */}
          <path d="M 96 155 Q 92 160 88 168 Q 86 175 90 180" fill="none" stroke="rgba(232,200,160,0.9)" strokeWidth="3.5" strokeLinecap="round"/>
          <path d="M 96 155 Q 92 160 88 168 Q 86 175 90 180" fill="none" stroke="#8b5a2b" strokeWidth="0.4"/>
          {/* Башмак левой ноги */}
          <path d="M 86 178 L 80 178 Q 78 178 78 182 L 86 184 Z" fill="rgba(80,55,30,0.9)" stroke="#3a2010" strokeWidth="0.4"/>
          <path d="M 80 180 L 85 180" fill="none" stroke="#3a2010" strokeWidth="0.3"/>

          {/* Правая нога — вертикально вниз, привязана к верёвке */}
          <path d="M 100 155 L 100 175" fill="none" stroke="rgba(232,200,160,0.9)" strokeWidth="4" strokeLinecap="round"/>
          <path d="M 100 155 L 100 175" fill="none" stroke="#8b5a2b" strokeWidth="0.4"/>
          {/* Башмак правой ноги — привязан к верёвке */}
          <path d="M 96 173 L 104 173 L 104 183 L 96 183 Z" fill="rgba(80,55,30,0.9)" stroke="#3a2010" strokeWidth="0.4"/>
          <path d="M 97 176 L 103 176" fill="none" stroke="#3a2010" strokeWidth="0.3"/>
          <path d="M 97 179 L 103 179" fill="none" stroke="#3a2010" strokeWidth="0.3"/>
          {/* Верёвка обвязывает башмак */}
          <path d="M 95 170 Q 100 168 105 170" fill="none" stroke="rgba(120,90,50,0.85)" strokeWidth="0.8"/>
          <path d="M 95 172 Q 100 170 105 172" fill="none" stroke="rgba(120,90,50,0.75)" strokeWidth="0.6"/>

          {/* === ТЕЛО — перевёрнутое, в рубахе, от ног вниз к голове === */}
          {/* Рубаха — охряная, с золотым узором */}
          <path d="M 90 175 Q 88 195 90 215 Q 92 220 100 220 Q 108 220 110 215 Q 112 195 110 175 Q 100 170 90 175 Z"
            fill="rgba(184,134,11,0.5)" stroke="#5a3a20" strokeWidth="0.6"/>
          {/* Складки рубахи */}
          <path d="M 94 180 Q 94 200 94 215" fill="none" stroke="rgba(120,80,40,0.5)" strokeWidth="0.4"/>
          <path d="M 100 180 Q 100 200 100 215" fill="none" stroke="rgba(120,80,40,0.4)" strokeWidth="0.3"/>
          <path d="M 106 180 Q 106 200 106 215" fill="none" stroke="rgba(120,80,40,0.5)" strokeWidth="0.4"/>

          {/* Золотой растительный узор на рубахе */}
          <path d="M 92 188 Q 100 184 108 188 Q 103 194 100 190 Q 97 194 92 188 Z" fill="none" stroke="#ffd700" strokeWidth="0.4" opacity="0.7"/>
          <path d="M 92 205 Q 100 201 108 205 Q 103 211 100 207 Q 97 211 92 205 Z" fill="none" stroke="#ffd700" strokeWidth="0.4" opacity="0.7"/>

          {/* Пояс — на талии (между ногами и телом) */}
          <path d="M 88 175 Q 100 173 112 175 L 112 180 Q 100 178 88 180 Z" fill="rgba(120,90,50,0.8)" stroke="#5a3a20" strokeWidth="0.4"/>

          {/* === РУКИ — из плеч (возле головы), согнуты за спиной, кисти за головой === */}
          {/* Левая рука — из левого плеча (y~212) за спину к голове */}
          <path d="M 92 212 Q 84 218 88 228" fill="none" stroke="rgba(232,200,160,0.9)" strokeWidth="3" strokeLinecap="round"/>
          <path d="M 92 212 Q 84 218 88 228" fill="none" stroke="#8b5a2b" strokeWidth="0.4"/>
          {/* Правая рука — из правого плеча за спину к голове */}
          <path d="M 108 212 Q 116 218 112 228" fill="none" stroke="rgba(232,200,160,0.9)" strokeWidth="3" strokeLinecap="round"/>
          <path d="M 108 212 Q 116 218 112 228" fill="none" stroke="#8b5a2b" strokeWidth="0.4"/>
          {/* Связанные кисти — за головой */}
          <ellipse cx="88" cy="228" rx="3" ry="2.5" fill="rgba(232,200,160,0.9)" stroke="#8b5a2b" strokeWidth="0.4"/>
          <ellipse cx="112" cy="228" rx="3" ry="2.5" fill="rgba(232,200,160,0.9)" stroke="#8b5a2b" strokeWidth="0.4"/>
          {/* Пальцы на кистях */}
          <path d="M 86 230 L 85 232" fill="none" stroke="rgba(232,200,160,0.9)" strokeWidth="0.8" strokeLinecap="round"/>
          <path d="M 88 231 L 88 233" fill="none" stroke="rgba(232,200,160,0.9)" strokeWidth="0.8" strokeLinecap="round"/>
          <path d="M 112 231 L 112 233" fill="none" stroke="rgba(232,200,160,0.9)" strokeWidth="0.8" strokeLinecap="round"/>
          <path d="M 114 230 L 115 232" fill="none" stroke="rgba(232,200,160,0.9)" strokeWidth="0.8" strokeLinecap="round"/>
          {/* Верёвка, связывающая кисти за головой */}
          <path d="M 91 228 Q 100 230 109 228" fill="none" stroke="rgba(120,90,50,0.9)" strokeWidth="1.2"/>
          <path d="M 91 230 Q 100 232 109 230" fill="none" stroke="rgba(120,90,50,0.75)" strokeWidth="0.8"/>
          {/* Узел на верёвке */}
          <circle cx="100" cy="231" r="1.5" fill="rgba(120,90,50,0.9)" stroke="#5a3a20" strokeWidth="0.4"/>
          <path d="M 98 232 Q 96 234 98 236" fill="none" stroke="rgba(120,90,50,0.8)" strokeWidth="0.5"/>
          <path d="M 102 232 Q 104 234 102 236" fill="none" stroke="rgba(120,90,50,0.8)" strokeWidth="0.5"/>

          {/* === ГОЛОВА — внизу, детальная, с нимбом === */}
          {/* Шея */}
          <path d="M 96 215 L 96 222 L 104 222 L 104 215 Z" fill="rgba(232,200,160,0.9)" stroke="#8b5a2b" strokeWidth="0.3"/>

          {/* Лицо — большое, ясное, безмятежное */}
          <path d="M 92 230 Q 90 222 94 218 Q 97 215 100 215 Q 103 215 106 218 Q 110 222 108 230 Q 109 235 107 238 Q 104 241 100 241 Q 96 241 93 238 Q 91 235 92 230 Z"
            fill="rgba(232,200,160,0.92)" stroke="#8b5a2b" strokeWidth="0.4"/>

          {/* Волосы — свисают вниз от макушки */}
          <path d="M 92 224 Q 89 234 91 245" fill="none" stroke="rgba(120,80,40,0.85)" strokeWidth="2" strokeLinecap="round"/>
          <path d="M 95 226 Q 93 236 95 246" fill="none" stroke="rgba(120,80,40,0.85)" strokeWidth="2" strokeLinecap="round"/>
          <path d="M 100 227 Q 100 237 100 247" fill="none" stroke="rgba(120,80,40,0.85)" strokeWidth="2" strokeLinecap="round"/>
          <path d="M 105 226 Q 107 236 105 246" fill="none" stroke="rgba(120,80,40,0.85)" strokeWidth="2" strokeLinecap="round"/>
          <path d="M 108 224 Q 111 234 109 245" fill="none" stroke="rgba(120,80,40,0.85)" strokeWidth="2" strokeLinecap="round"/>

          {/* Глаза — закрытые, безмятежные */}
          <path d="M 94 226 Q 96 225 98 226" fill="none" stroke="#5a3a20" strokeWidth="0.5" strokeLinecap="round"/>
          <path d="M 102 226 Q 104 225 106 226" fill="none" stroke="#5a3a20" strokeWidth="0.5" strokeLinecap="round"/>
          {/* Ресницы */}
          <path d="M 95 227 L 95 228" stroke="#3a2010" strokeWidth="0.3"/>
          <path d="M 97 227 L 97 228" stroke="#3a2010" strokeWidth="0.3"/>
          <path d="M 103 227 L 103 228" stroke="#3a2010" strokeWidth="0.3"/>
          <path d="M 105 227 L 105 228" stroke="#3a2010" strokeWidth="0.3"/>

          {/* Брови — спокойные, ровные */}
          <path d="M 94 223 Q 96 222 98 223" fill="none" stroke="#5a3a20" strokeWidth="0.5"/>
          <path d="M 102 223 Q 104 222 106 223" fill="none" stroke="#5a3a20" strokeWidth="0.5"/>

          {/* Нос — прямой */}
          <path d="M 100 228 L 99 233 Q 99 234 100 234 Q 101 234 101 233 Z" fill="none" stroke="#8b5a2b" strokeWidth="0.4"/>

          {/* Рот — мягкая безмятежная улыбка */}
          <path d="M 96 236 Q 100 237 104 236" fill="none" stroke="#991b1b" strokeWidth="0.5" strokeLinecap="round"/>

          {/* Румянец — лёгкий */}
          <ellipse cx="94" cy="232" rx="1.5" ry="1" fill="rgba(220,120,80,0.25)"/>
          <ellipse cx="106" cy="232" rx="1.5" ry="1" fill="rgba(220,120,80,0.25)"/>

          {/* НИМБ — большой, золотой, вокруг головы (символ просветления) */}
          <ellipse cx="100" cy="240" rx="13" ry="4" fill="none" stroke="#ffd700" strokeWidth="1.2" opacity="0.9"/>
          <ellipse cx="100" cy="240" rx="15" ry="4.5" fill="none" stroke="rgba(255,215,0,0.5)" strokeWidth="0.6"/>
          <ellipse cx="100" cy="240" rx="17" ry="5" fill="rgba(255,215,0,0.1)" stroke="none"/>
        </g>

        {/* Декоративные элементы — символы трансформации */}
        {/* Монеты/пентакли — падающие из карманов (символ отречения от материального) */}
        <g>
          <circle cx="35" cy="170" r="3" fill="rgba(255,215,0,0.4)" stroke="#b8860b" strokeWidth="0.4"/>
          <circle cx="35" cy="170" r="1.5" fill="rgba(184,115,51,0.4)"/>
          <path d="M 33 170 L 37 170 M 35 168 L 35 172" stroke="#b8860b" strokeWidth="0.3"/>
        </g>
        <g>
          <circle cx="165" cy="195" r="2.5" fill="rgba(255,215,0,0.35)" stroke="#b8860b" strokeWidth="0.4"/>
          <circle cx="165" cy="195" r="1.2" fill="rgba(184,115,51,0.4)"/>
        </g>

        {/* Листья по бокам — символ осеннего увядания/обновления */}
        <path d="M 25 180 Q 30 175 35 180 Q 30 185 25 180 Z" fill="rgba(180,100,40,0.5)" stroke="#8b5a2b" strokeWidth="0.3"/>
        <path d="M 170 200 Q 175 195 180 200 Q 175 205 170 200 Z" fill="rgba(180,100,40,0.5)" stroke="#8b5a2b" strokeWidth="0.3"/>

        {/* Символ вверх ногами — перевернутый знак бесконечности над головой (показывает перевёрнутую перспективу) */}
        <path d="M 90 60 Q 95 55 100 60 Q 105 55 110 60 Q 105 65 100 60 Q 95 65 90 60 Z" fill="none" stroke="#ffd700" strokeWidth="1" opacity="0.6"/>
        <path d="M 90 60 Q 95 55 100 60 Q 105 55 110 60 Q 105 65 100 60 Q 95 65 90 60 Z" fill="none" stroke="rgba(255,215,0,0.3)" strokeWidth="0.4"/>
      </g>
    ),

    // XIII. СМЕРТЬ — скелет в плаще на бледном коне со стягом Мистической Розы
    "major-13": (
      <g>
        {/* Светлый фон — закатное небо, но достаточно светлое, чтобы видеть детали */}
        <rect x="14" y="42" width="172" height="208" fill="rgba(180,100,50,0.18)" rx="2"/>
        {/* Закатное небо — мягкие горизонтальные полосы */}
        <path d="M 14 42 L 186 42 L 186 85 Q 150 70 100 75 Q 50 70 14 85 Z" fill="rgba(220,140,60,0.25)"/>
        <path d="M 14 55 L 186 55 L 186 90 Q 150 78 100 82 Q 50 78 14 90 Z" fill="rgba(180,80,30,0.15)"/>

        {/* Восходящее солнце между двумя башнями — символ возрождения */}
        <g>
          {/* Свечение солнца */}
          <circle cx="100" cy="95" r="22" fill="rgba(255,200,80,0.18)" stroke="none"/>
          <circle cx="100" cy="95" r="15" fill="rgba(255,200,80,0.25)" stroke="none"/>
          {/* Диск солнца — выглядывает из-за горизонта */}
          <path d="M 84 95 Q 84 82 100 82 Q 116 82 116 95 Z" fill="rgba(255,180,60,0.6)" stroke="#b8860b" strokeWidth="0.5"/>
          {/* Лучи солнца */}
          {[-50, -30, -15, 0, 15, 30, 50].map(deg => {
            const rad = deg * Math.PI / 180
            return <line key={deg} x1={100 + Math.cos(rad - Math.PI/2) * 15} y1={95 + Math.sin(rad - Math.PI/2) * 15} x2={100 + Math.cos(rad - Math.PI/2) * 26} y2={95 + Math.sin(rad - Math.PI/2) * 26} stroke="#ffd700" strokeWidth="0.7" opacity="0.6"/>
          })}
        </g>

        {/* Две башни на горизонте — простые силуэты */}
        <path d="M 28 130 L 28 108 L 26 106 L 30 106 L 30 130 Z" fill="rgba(60,40,25,0.6)" stroke="#3a2010" strokeWidth="0.3"/>
        <path d="M 26 108 Q 28 103 30 108" fill="rgba(255,215,0,0.35)" stroke="#b8860b" strokeWidth="0.3"/>
        <path d="M 172 130 L 172 106 L 170 104 L 174 104 L 174 130 Z" fill="rgba(60,40,25,0.6)" stroke="#3a2010" strokeWidth="0.3"/>
        <path d="M 170 106 Q 172 101 174 106" fill="rgba(255,215,0,0.35)" stroke="#b8860b" strokeWidth="0.3"/>

        {/* Река на горизонте — символ Стикса */}
        <path d="M 14 130 Q 50 127 100 130 Q 150 127 186 130 L 186 142 L 14 142 Z" fill="rgba(80,110,140,0.3)" stroke="#4a6a8a" strokeWidth="0.4"/>
        {/* Волны на реке */}
        <path d="M 25 136 Q 35 134 45 136 Q 55 138 65 136" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="0.3"/>
        <path d="M 110 134 Q 120 132 130 134 Q 140 136 150 134" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="0.3"/>

        {/* Дальние холмы */}
        <path d="M 14 142 Q 50 139 100 142 Q 150 139 186 142 L 186 160 L 14 160 Z" fill="rgba(80,55,30,0.4)" stroke="#3a2010" strokeWidth="0.3"/>

        {/* Мёртвое дерево слева */}
        <g>
          <path d="M 22 200 Q 23 160 22 130 Q 21 120 24 110" fill="none" stroke="rgba(80,55,30,0.8)" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M 22 140 Q 18 135 14 130" fill="none" stroke="rgba(80,55,30,0.8)" strokeWidth="1.2" strokeLinecap="round"/>
          <path d="M 22 155 Q 26 150 30 145" fill="none" stroke="rgba(80,55,30,0.8)" strokeWidth="1" strokeLinecap="round"/>
          <path d="M 22 125 Q 18 120 15 115" fill="none" stroke="rgba(80,55,30,0.8)" strokeWidth="0.8" strokeLinecap="round"/>
          <path d="M 14 130 Q 11 128 9 125" fill="none" stroke="rgba(80,55,30,0.7)" strokeWidth="0.5"/>
          <path d="M 30 145 Q 33 143 35 140" fill="none" stroke="rgba(80,55,30,0.7)" strokeWidth="0.5"/>
        </g>

        {/* Земля — выжженная, ровная */}
        <path d="M 14 200 Q 50 195 100 200 Q 150 195 186 200 L 186 250 L 14 250 Z" fill="rgba(100,65,35,0.45)" stroke="#3a2010" strokeWidth="0.3"/>
        {/* Трещины на земле */}
        <path d="M 30 225 L 40 232 L 35 240" fill="none" stroke="#3a2010" strokeWidth="0.4"/>
        <path d="M 150 220 L 158 230 L 155 240" fill="none" stroke="#3a2010" strokeWidth="0.4"/>

        {/* ===== КОНЬ — бледный, крупный, центральная фигура ===== */}
        <g>
          {/* Тело коня */}
          <path d="M 55 195 Q 48 188 50 178 Q 65 172 90 174 Q 115 175 122 182 Q 125 195 120 205 Q 100 210 75 208 Q 58 205 55 195 Z"
            fill="rgba(230,220,200,0.65)" stroke="#5a3a20" strokeWidth="0.7"/>
          {/* Тень на животе */}
          <path d="M 55 200 Q 80 205 120 200" fill="none" stroke="rgba(120,90,60,0.4)" strokeWidth="0.6"/>
          {/* Блик на крупе */}
          <path d="M 65 185 Q 80 180 95 183" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="0.7"/>

          {/* Голова коня */}
          <path d="M 50 192 Q 40 184 38 172 Q 42 164 50 168 Q 58 175 60 185 Q 60 192 55 196 Z"
            fill="rgba(230,220,200,0.7)" stroke="#5a3a20" strokeWidth="0.6"/>
          {/* Морда */}
          <path d="M 38 180 Q 33 184 36 192 Q 42 195 47 192 Q 47 184 38 180 Z"
            fill="rgba(245,235,215,0.8)" stroke="#5a3a20" strokeWidth="0.5"/>
          {/* Ноздри */}
          <ellipse cx="38" cy="187" rx="0.8" ry="1.3" fill="rgba(40,25,15,0.85)"/>
          <ellipse cx="42" cy="189" rx="0.6" ry="1" fill="rgba(40,25,15,0.7)"/>
          {/* Рот */}
          <path d="M 36 192 Q 40 194 44 192" fill="none" stroke="#3a2010" strokeWidth="0.4"/>
          {/* Глаз коня — горящий */}
          <ellipse cx="46" cy="178" rx="1.3" ry="0.9" fill="rgba(255,60,20,0.85)" stroke="#3a2010" strokeWidth="0.3"/>
          <circle cx="46" cy="178" r="0.5" fill="#ffd700"/>
          <circle cx="46.2" cy="177.8" r="0.2" fill="rgba(255,255,255,0.9)"/>
          {/* Уши */}
          <path d="M 50 168 L 49 162 L 53 167 Z" fill="rgba(230,220,200,0.8)" stroke="#5a3a20" strokeWidth="0.3"/>
          <path d="M 54 168 L 55 162 L 57 167 Z" fill="rgba(230,220,200,0.8)" stroke="#5a3a20" strokeWidth="0.3"/>

          {/* Грива — развевающаяся */}
          <path d="M 56 172 Q 48 165 42 168 Q 38 162 36 170 Q 32 165 30 175" fill="none" stroke="rgba(60,40,30,0.9)" strokeWidth="2" strokeLinecap="round"/>
          <path d="M 58 175 Q 50 170 46 175 Q 42 170 38 178" fill="none" stroke="rgba(60,40,30,0.75)" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M 60 180 Q 52 178 48 182" fill="none" stroke="rgba(60,40,30,0.6)" strokeWidth="1" strokeLinecap="round"/>

          {/* Ноги коня */}
          <path d="M 60 205 L 56 232 L 62 232 L 64 205 Z" fill="rgba(230,220,200,0.65)" stroke="#5a3a20" strokeWidth="0.4"/>
          <path d="M 55 232 L 53 235 L 64 235 L 62 232 Z" fill="rgba(40,25,15,0.9)" stroke="#3a2010" strokeWidth="0.3"/>
          <path d="M 78 207 L 75 234 L 81 234 L 82 207 Z" fill="rgba(230,220,200,0.65)" stroke="#5a3a20" strokeWidth="0.4"/>
          <path d="M 74 234 L 72 237 L 82 237 L 81 234 Z" fill="rgba(40,25,15,0.9)" stroke="#3a2010" strokeWidth="0.3"/>
          <path d="M 100 205 L 98 232 L 104 232 L 104 205 Z" fill="rgba(230,220,200,0.65)" stroke="#5a3a20" strokeWidth="0.4"/>
          <path d="M 97 232 L 95 235 L 105 235 L 104 232 Z" fill="rgba(40,25,15,0.9)" stroke="#3a2010" strokeWidth="0.3"/>
          <path d="M 115 203 L 113 232 L 119 232 L 119 203 Z" fill="rgba(230,220,200,0.65)" stroke="#5a3a20" strokeWidth="0.4"/>
          <path d="M 112 232 L 110 235 L 120 235 L 119 232 Z" fill="rgba(40,25,15,0.9)" stroke="#3a2010" strokeWidth="0.3"/>

          {/* Хвост */}
          <path d="M 122 195 Q 132 200 134 215 Q 136 228 132 240" fill="none" stroke="rgba(60,40,30,0.9)" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M 122 195 Q 130 205 130 220 Q 128 232 124 240" fill="none" stroke="rgba(60,40,30,0.65)" strokeWidth="1.5" strokeLinecap="round"/>

          {/* Седло — коричневое с золотой отделкой */}
          <path d="M 70 180 Q 85 175 100 178 L 100 188 Q 85 184 70 188 Z" fill="rgba(100,65,35,0.8)" stroke="#3a2010" strokeWidth="0.5"/>
          <path d="M 74 183 Q 85 180 96 183" fill="none" stroke="#ffd700" strokeWidth="0.4" opacity="0.7"/>
          {/* Стремя */}
          <path d="M 76 188 L 74 200 L 78 200 L 78 188 Z" fill="rgba(80,55,30,0.85)" stroke="#3a2010" strokeWidth="0.3"/>
        </g>

        {/* ===== ВСАДНИК — СМЕРТЬ (скелет в плаще, плащ узкий, не квадратный) ===== */}
        <g className="svg-breathe" style={{ transformOrigin: "85px 165px" }}>
          {/* Плащ — узкий, развевающийся, НЕ сплошной (оставляет фигуру читаемой) */}
          {/* Левая полоса плаща */}
          <path d="M 78 150 Q 73 170 76 190 L 80 190 Q 78 170 82 150 Z"
            fill="rgba(40,25,15,0.8)" stroke="#3a2010" strokeWidth="0.5"/>
          {/* Правая полоса плаща */}
          <path d="M 92 150 Q 96 170 94 190 L 90 190 Q 92 170 88 150 Z"
            fill="rgba(40,25,15,0.8)" stroke="#3a2010" strokeWidth="0.5"/>
          {/* Развевающийся край плаща слева */}
          <path d="M 78 150 Q 70 152 66 162 Q 64 175 68 180" fill="none" stroke="rgba(40,25,15,0.85)" strokeWidth="2" strokeLinecap="round"/>
          {/* Развевающийся край плаща справа */}
          <path d="M 92 150 Q 100 152 104 162 Q 106 175 102 180" fill="none" stroke="rgba(40,25,15,0.85)" strokeWidth="2" strokeLinecap="round"/>

          {/* === СКЕЛЕТ — виден между полосами плаща === */}
          {/* Позвоночник — вертикальные позвонки */}
          <path d="M 85 150 L 85 195" fill="none" stroke="rgba(220,210,190,0.7)" strokeWidth="1.5"/>
          {/* Позвонки — горизонтальные чёрточки */}
          {Array.from({length: 6}).map((_, i) => (
            <line key={i} x1={82} y1={155 + i * 6} x2={88} y2={155 + i * 6} stroke="rgba(220,210,190,0.6)" strokeWidth="0.8"/>
          ))}
          {/* Рёбра — изогнутые */}
          <path d="M 85 160 Q 76 163 76 170" fill="none" stroke="rgba(220,210,190,0.7)" strokeWidth="0.8"/>
          <path d="M 85 160 Q 94 163 94 170" fill="none" stroke="rgba(220,210,190,0.7)" strokeWidth="0.8"/>
          <path d="M 85 168 Q 77 171 77 178" fill="none" stroke="rgba(220,210,190,0.7)" strokeWidth="0.8"/>
          <path d="M 85 168 Q 93 171 93 178" fill="none" stroke="rgba(220,210,190,0.7)" strokeWidth="0.8"/>
          <path d="M 85 176 Q 78 179 78 184" fill="none" stroke="rgba(220,210,190,0.7)" strokeWidth="0.8"/>
          <path d="M 85 176 Q 92 179 92 184" fill="none" stroke="rgba(220,210,190,0.7)" strokeWidth="0.8"/>

          {/* Капюшон — небольшой, нависающий над черепом */}
          <path d="M 76 150 Q 72 132 80 124 Q 85 120 90 124 Q 98 132 94 150 Q 90 145 85 145 Q 80 145 76 150 Z"
            fill="rgba(40,25,15,0.9)" stroke="#3a2010" strokeWidth="0.5"/>

          {/* ЧЕРЕП — крупный, явный */}
          <path d="M 78 142 Q 76 132 80 128 Q 85 125 90 125 Q 95 128 92 142 Q 91 146 85 147 Q 79 146 78 142 Z"
            fill="rgba(240,230,210,0.9)" stroke="#3a2010" strokeWidth="0.5"/>
          {/* Глазницы — крупные чёрные провалы */}
          <ellipse cx="81" cy="135" rx="2" ry="1.5" fill="rgba(20,10,5,1)" stroke="#3a2010" strokeWidth="0.3"/>
          <ellipse cx="89" cy="135" rx="2" ry="1.5" fill="rgba(20,10,5,1)" stroke="#3a2010" strokeWidth="0.3"/>
          {/* Горящие точки в глазницах */}
          <circle cx="81" cy="135" r="0.6" fill="rgba(255,80,30,1)"/>
          <circle cx="89" cy="135" r="0.6" fill="rgba(255,80,30,1)"/>
          {/* Нос черепа — перевёрнутый треугольник */}
          <path d="M 85 139 L 82 143 L 88 143 Z" fill="rgba(40,25,15,0.95)"/>
          {/* Зубы черепа — явные */}
          <path d="M 80 145 L 80 147 M 82 145 L 82 147 M 84 145 L 84 147 M 86 145 L 86 147 M 88 145 L 88 147 M 90 145 L 90 147" stroke="rgba(60,40,30,0.8)" strokeWidth="0.4"/>
          {/* Верхняя челюсть — линия */}
          <path d="M 79 144 L 91 144" fill="none" stroke="rgba(60,40,30,0.6)" strokeWidth="0.3"/>

          {/* Руки — костлявые, явные */}
          {/* Левая рука — держит поводья */}
          <path d="M 80 165 Q 70 175 60 185" fill="none" stroke="rgba(240,230,210,0.85)" strokeWidth="2.5" strokeLinecap="round"/>
          {/* Костяные суставы на левой руке */}
          <circle cx="73" cy="172" r="0.8" fill="rgba(220,210,190,0.8)"/>
          <circle cx="65" cy="180" r="0.8" fill="rgba(220,210,190,0.8)"/>
          {/* Кисть — костлявая */}
          <path d="M 58 184 L 56 187 L 58 188 L 60 185 Z" fill="rgba(240,230,210,0.85)" stroke="#3a2010" strokeWidth="0.3"/>
          {/* Поводья */}
          <path d="M 58 187 Q 50 192 45 195" fill="none" stroke="rgba(120,90,50,0.9)" strokeWidth="0.8"/>

          {/* Правая рука — поднята, держит стяг */}
          <path d="M 90 165 Q 100 158 110 148" fill="none" stroke="rgba(240,230,210,0.85)" strokeWidth="2.5" strokeLinecap="round"/>
          {/* Костяные суставы на правой руке */}
          <circle cx="96" cy="162" r="0.8" fill="rgba(220,210,190,0.8)"/>
          <circle cx="104" cy="155" r="0.8" fill="rgba(220,210,190,0.8)"/>
          {/* Кисть — костлявая, держит древко */}
          <path d="M 110 148 L 112 145 L 114 148 L 112 150 Z" fill="rgba(240,230,210,0.85)" stroke="#3a2010" strokeWidth="0.3"/>
        </g>

        {/* ===== СТЯГ с МИСТИЧЕСКОЙ РОЗОЙ — меньший, роза как настоящий цветок ===== */}
        <g>
          {/* Древко стяга — диагональное */}
          <path d="M 112 148 L 124 80 L 127 80 L 115 148 Z" fill="rgba(80,55,30,0.9)" stroke="#3a2010" strokeWidth="0.5"/>
          {/* Наконечник древка */}
          <path d="M 124 80 L 125.5 72 L 127 80 Z" fill="rgba(255,215,0,0.65)" stroke="#b8860b" strokeWidth="0.4"/>
          <circle cx="125.5" cy="78" r="1" fill="#ffd700"/>

          {/* Полотно стяга — меньше, чтобы роза была заметнее */}
          <path d="M 124 84 Q 138 80 150 86 Q 152 102 148 120 Q 136 116 124 122 Q 126 102 124 84 Z"
            fill="rgba(40,25,15,0.88)" stroke="#3a2010" strokeWidth="0.5"/>
          {/* Складки полотна */}
          <path d="M 128 88 Q 132 102 130 118" fill="none" stroke="rgba(80,55,30,0.5)" strokeWidth="0.3"/>
          <path d="M 138 86 Q 142 102 140 120" fill="none" stroke="rgba(80,55,30,0.5)" strokeWidth="0.3"/>

          {/* === МИСТИЧЕСКАЯ РОЗА — настоящий цветок с явными лепестками === */}
          <g>
            {/* Стебель розы — зелёный, с шипами */}
            <path d="M 135 122 L 135 110" fill="none" stroke="#2d6e2d" strokeWidth="1.2"/>
            {/* Шипы на стебле */}
            <path d="M 135 118 L 133 116" fill="none" stroke="#2d6e2d" strokeWidth="0.5"/>
            <path d="M 135 114 L 137 112" fill="none" stroke="#2d6e2d" strokeWidth="0.5"/>

            {/* Листья розы — большие, явные, зелёные */}
            <path d="M 128 112 Q 124 110 124 114 Q 128 116 128 112 Z" fill="rgba(34,100,40,0.85)" stroke="#2d6e2d" strokeWidth="0.4"/>
            <path d="M 126 112 L 124 113" fill="none" stroke="#1e5020" strokeWidth="0.3"/>
            <path d="M 142 112 Q 146 110 146 114 Q 142 116 142 112 Z" fill="rgba(34,100,40,0.85)" stroke="#2d6e2d" strokeWidth="0.4"/>
            <path d="M 144 112 L 146 113" fill="none" stroke="#1e5020" strokeWidth="0.3"/>

            {/* Внешние лепестки розы — 5 явных лепестков вокруг */}
            <path d="M 130 105 Q 125 102 127 97 Q 132 96 133 101 Q 132 105 130 105 Z" fill="rgba(245,235,210,0.92)" stroke="#8b5a2b" strokeWidth="0.5"/>
            <path d="M 140 105 Q 145 102 143 97 Q 138 96 137 101 Q 138 105 140 105 Z" fill="rgba(245,235,210,0.92)" stroke="#8b5a2b" strokeWidth="0.5"/>
            <path d="M 131 95 Q 130 89 135 88 Q 140 89 139 95 Q 137 97 135 96 Q 133 97 131 95 Z" fill="rgba(250,245,225,0.95)" stroke="#8b5a2b" strokeWidth="0.5"/>
            <path d="M 128 100 Q 124 99 124 95 Q 128 92 130 96 Q 129 99 128 100 Z" fill="rgba(245,235,210,0.9)" stroke="#8b5a2b" strokeWidth="0.4"/>
            <path d="M 142 100 Q 146 99 146 95 Q 142 92 140 96 Q 141 99 142 100 Z" fill="rgba(245,235,210,0.9)" stroke="#8b5a2b" strokeWidth="0.4"/>

            {/* Средние лепестки — свёрнутые внутрь */}
            <path d="M 132 98 Q 134 94 137 95 Q 138 98 136 100 Q 134 99 132 98 Z" fill="rgba(255,250,230,0.95)" stroke="#8b5a2b" strokeWidth="0.3"/>
            <path d="M 138 98 Q 136 94 133 95 Q 132 98 134 100 Q 136 99 138 98 Z" fill="rgba(255,250,230,0.95)" stroke="#8b5a2b" strokeWidth="0.3"/>

            {/* Сердцевина розы — золотая точка */}
            <circle cx="135" cy="97" r="1.2" fill="rgba(255,215,0,0.85)" stroke="#b8860b" strokeWidth="0.3"/>
            <circle cx="135" cy="97" r="0.5" fill="rgba(255,180,40,0.9)"/>

            {/* Тень/блик на лепестках */}
            <path d="M 131 93 Q 133 91 135 91" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="0.4"/>
          </g>
        </g>

        {/* ===== ПАВШИЙ КОРОЛЬ у ног коня ===== */}
        <g>
          {/* Тело павшего */}
          <path d="M 130 240 Q 125 245 135 248 Q 145 248 152 245 Q 150 240 145 238 Q 138 236 130 240 Z"
            fill="rgba(140,30,30,0.65)" stroke="#5a1010" strokeWidth="0.4"/>
          {/* Корона павшего короля */}
          <path d="M 128 242 L 130 235 L 133 240 L 136 233 L 139 240 L 142 235 L 144 242 Z"
            fill="rgba(255,215,0,0.7)" stroke="#b8860b" strokeWidth="0.4"/>
          <circle cx="133" cy="238" r="0.6" fill="rgba(180,30,30,0.8)"/>
          <circle cx="139" cy="238" r="0.6" fill="rgba(180,30,30,0.8)"/>
          <circle cx="136" cy="236" r="0.7" fill="rgba(34,100,40,0.8)"/>
          {/* Рука павшего */}
          <path d="M 145 240 Q 152 235 158 232" fill="none" stroke="rgba(232,200,160,0.8)" strokeWidth="2" strokeLinecap="round"/>
          <ellipse cx="158" cy="232" rx="1.5" ry="1.2" fill="rgba(232,200,160,0.8)" stroke="#8b5a2b" strokeWidth="0.3"/>
          <path d="M 158 230 Q 160 228 161 226" fill="none" stroke="rgba(232,200,160,0.8)" strokeWidth="0.8" strokeLinecap="round"/>
          <path d="M 159 231 Q 161 229 162 228" fill="none" stroke="rgba(232,200,160,0.8)" strokeWidth="0.8" strokeLinecap="round"/>
        </g>

        {/* Дитя у ног коня — символ новой жизни */}
        <g>
          <path d="M 35 240 Q 32 245 38 248 Q 44 248 48 245 Q 46 240 42 238 Q 38 238 35 240 Z"
            fill="rgba(34,100,40,0.65)" stroke="#2d6e2d" strokeWidth="0.4"/>
          <path d="M 36 238 Q 35 234 38 232 Q 41 232 42 235 Q 42 238 40 239 Q 37 240 36 238 Z"
            fill="rgba(232,200,160,0.85)" stroke="#8b5a2b" strokeWidth="0.3"/>
          <path d="M 36 236 Q 38 233 41 234 Q 41 235 40 235 Q 38 234 36 236 Z" fill="rgba(180,140,70,0.75)"/>
          <circle cx="38" cy="236" r="0.3" fill="#3a2010"/>
          <circle cx="40" cy="236" r="0.3" fill="#3a2010"/>
          <path d="M 42 240 Q 48 238 54 240" fill="none" stroke="rgba(232,200,160,0.85)" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="54" cy="240" r="1.2" fill="rgba(255,215,0,0.85)" stroke="#b8860b" strokeWidth="0.3"/>
          <path d="M 53 240 L 51 240" fill="none" stroke="#2d6e2d" strokeWidth="0.4"/>
        </g>

        {/* Декоративные васнецовские завитки */}
        <path d="M 20 220 Q 25 215 30 220 Q 25 225 20 220 Z" fill="none" stroke="rgba(255,215,0,0.3)" strokeWidth="0.4"/>
        <path d="M 170 220 Q 175 215 180 220 Q 175 225 170 220 Z" fill="none" stroke="rgba(255,215,0,0.3)" strokeWidth="0.4"/>
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

    // XIX. СОЛНЦЕ — детальное анимированное солнце с вращающимися лучами
    "major-19": (
      <g>
        {/* Тёплое небо — золотистое, с полосами */}
        <rect x="14" y="42" width="172" height="208" fill="rgba(204,153,51,0.18)" rx="2"/>
        {/* Полосы света — вертикальные, мягкие */}
        <path d="M 14 42 L 186 42 L 186 80 Q 150 70 100 75 Q 50 70 14 80 Z" fill="rgba(255,200,100,0.2)"/>
        <path d="M 14 55 L 186 55 L 186 90 Q 150 78 100 82 Q 50 78 14 90 Z" fill="rgba(255,180,60,0.12)"/>

        {/* Лёгкие облака — резные */}
        <path d="M 25 60 Q 35 55 45 60 Q 55 56 65 62 Q 60 65 50 63 Q 40 66 30 63 Q 22 63 25 60 Z" fill="rgba(255,255,255,0.18)"/>
        <path d="M 130 55 Q 140 50 150 55 Q 165 52 175 58 Q 168 62 158 59 Q 148 63 138 59 Q 128 60 130 55 Z" fill="rgba(255,255,255,0.18)"/>

        {/* Птицы летящие в небе */}
        <path d="M 50 65 Q 53 63 56 65 Q 53 64 50 65 Z" fill="rgba(80,60,40,0.6)"/>
        <path d="M 60 70 Q 63 68 66 70 Q 63 69 60 70 Z" fill="rgba(80,60,40,0.6)"/>
        <path d="M 145 70 Q 148 68 151 70 Q 148 69 145 70 Z" fill="rgba(80,60,40,0.6)"/>

        {/* Звёзды-искры в небе */}
        <circle cx="35" cy="50" r="0.6" fill="#ffd700" opacity="0.8"/>
        <circle cx="165" cy="48" r="0.7" fill="#ffd700" opacity="0.8"/>
        <circle cx="80" cy="55" r="0.5" fill="#ffd700" opacity="0.6"/>
        <circle cx="125" cy="50" r="0.5" fill="#ffd700" opacity="0.6"/>

        {/* ===== ВНЕШНЕЕ СВЕЧЕНИЕ СОЛНЦА — пульсирующее ===== */}
        <g className="svg-sun-glow">
          <circle cx="100" cy="90" r="38" fill="rgba(255,215,0,0.1)" stroke="none"/>
          <circle cx="100" cy="90" r="32" fill="rgba(255,200,80,0.12)" stroke="none"/>
          <circle cx="100" cy="90" r="28" fill="rgba(255,235,150,0.1)" stroke="none"/>
        </g>

        {/* ===== ЛУЧИ СОЛНЦА — вращающиеся (длинный слой) ===== */}
        <g className="svg-sun-rays">
          {/* Длинные прямые лучи — 12 шт */}
          {Array.from({length: 12}).map((_, i) => {
            const a = (i / 12) * Math.PI * 2
            const x1 = 100 + Math.cos(a) * 25
            const y1 = 90 + Math.sin(a) * 25
            const x2 = 100 + Math.cos(a) * 45
            const y2 = 90 + Math.sin(a) * 45
            return (
              <g key={i}>
                <path d={`M ${x1} ${y1} L ${x2} ${y2}`} stroke="#b8860b" strokeWidth="2" opacity="0.85"/>
                <path d={`M ${x1} ${y1} L ${x2} ${y2}`} stroke="#ffd700" strokeWidth="0.8" opacity="0.8"/>
                <path d={`M ${x1} ${y1} L ${x2} ${y2}`} stroke="rgba(255,255,200,0.6)" strokeWidth="0.4"/>
                {/* Кончик луча — заострённый */}
                <path d={`M ${x2} ${y2} L ${100 + Math.cos(a + 0.05) * 42} ${90 + Math.sin(a + 0.05) * 42} L ${100 + Math.cos(a - 0.05) * 42} ${90 + Math.sin(a - 0.05) * 42} Z`} fill="rgba(255,215,0,0.6)" stroke="#b8860b" strokeWidth="0.3"/>
              </g>
            )
          })}
          {/* Волнистые лучи между прямыми — 12 шт */}
          {Array.from({length: 12}).map((_, i) => {
            const a = (i / 12) * Math.PI * 2 + Math.PI / 12
            const x1 = 100 + Math.cos(a) * 25
            const y1 = 90 + Math.sin(a) * 25
            const x2 = 100 + Math.cos(a) * 38
            const y2 = 90 + Math.sin(a) * 38
            const cx = 100 + Math.cos(a) * 32
            const cy = 90 + Math.sin(a) * 32 - 2
            return (
              <g key={`w-${i}`}>
                <path d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`} stroke="#ffd700" strokeWidth="1.2" opacity="0.7" fill="none"/>
                <path d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`} stroke="rgba(255,235,150,0.5)" strokeWidth="0.5" fill="none"/>
              </g>
            )
          })}
          {/* Точки-искры между лучами — 24 шт */}
          {Array.from({length: 24}).map((_, i) => {
            const a = (i / 24) * Math.PI * 2 + Math.PI / 24
            return <circle key={`s-${i}`} cx={100 + Math.cos(a) * 42} cy={90 + Math.sin(a) * 42} r="0.6" fill="#ffd700" opacity="0.8"/>
          })}
        </g>

        {/* ===== ОСНОВНОЙ ДИСК СОЛНЦА — пульсирующий ===== */}
        <g className="svg-sun-pulse">
          {/* Внешний обод — золотой, резной */}
          <circle cx="100" cy="90" r="24" fill="none" stroke="#b8860b" strokeWidth="1.5"/>
          <circle cx="100" cy="90" r="24" fill="none" stroke="#ffd700" strokeWidth="0.5" opacity="0.8"/>
          {/* Точки по ободу — 24 шт */}
          {Array.from({length: 24}).map((_, i) => {
            const a = (i / 24) * Math.PI * 2
            return <circle key={i} cx={100 + Math.cos(a) * 24} cy={90 + Math.sin(a) * 24} r="0.4" fill="#ffd700" opacity="0.9"/>
          })}
          {/* Средний диск — золотой */}
          <circle cx="100" cy="90" r="22" fill="rgba(255,215,0,0.55)" stroke="#b8860b" strokeWidth="0.6"/>
          <circle cx="100" cy="90" r="20" fill="rgba(255,200,80,0.6)"/>
          {/* Внутренний диск — светлее */}
          <circle cx="100" cy="90" r="17" fill="rgba(255,235,150,0.55)"/>
          <circle cx="100" cy="90" r="14" fill="rgba(255,250,200,0.5)"/>

          {/* ===== ЛИЦО СОЛНЦА — крупное, детальное ===== */}
          {/* Лицо — охряный овал */}
          <path d="M 88 90 Q 86 80 90 75 Q 95 71 100 70 Q 105 71 110 75 Q 114 80 112 90 Q 113 96 110 100 Q 105 104 100 104 Q 95 104 90 100 Q 87 96 88 90 Z"
            fill="rgba(255,220,120,0.7)" stroke="#5a3a20" strokeWidth="0.4"/>

          {/* Глаза — большие, с белком и зрачком */}
          <ellipse cx="94" cy="86" rx="2" ry="1.5" fill="rgba(255,255,255,0.9)" stroke="#5a3a20" strokeWidth="0.3"/>
          <ellipse cx="106" cy="86" rx="2" ry="1.5" fill="rgba(255,255,255,0.9)" stroke="#5a3a20" strokeWidth="0.3"/>
          <circle cx="94" cy="86.5" r="1" fill="#5a3a20"/>
          <circle cx="106" cy="86.5" r="1" fill="#5a3a20"/>
          <circle cx="94.3" cy="86" r="0.3" fill="rgba(255,255,255,0.9)"/>
          <circle cx="106.3" cy="86" r="0.3" fill="rgba(255,255,255,0.9)"/>

          {/* Брови — изогнутые, весёлые */}
          <path d="M 91 82 Q 94 80 97 82" fill="none" stroke="#5a3a20" strokeWidth="0.6" strokeLinecap="round"/>
          <path d="M 103 82 Q 106 80 109 82" fill="none" stroke="#5a3a20" strokeWidth="0.6" strokeLinecap="round"/>

          {/* Нос — крупный */}
          <path d="M 100 89 L 98 95 Q 98 96 100 96 Q 102 96 102 95 Z" fill="none" stroke="#5a3a20" strokeWidth="0.5" strokeLinecap="round"/>
          {/* Ноздри */}
          <ellipse cx="98.5" cy="95.5" rx="0.4" ry="0.3" fill="rgba(80,50,30,0.5)"/>
          <ellipse cx="101.5" cy="95.5" rx="0.4" ry="0.3" fill="rgba(80,50,30,0.5)"/>

          {/* Рот — широкая улыбка с зубами */}
          <path d="M 90 99 Q 100 105 110 99" fill="none" stroke="#5a3a20" strokeWidth="0.8" strokeLinecap="round"/>
          <path d="M 91 99 Q 100 103 109 99 Q 100 105 91 99" fill="rgba(180,60,60,0.7)"/>
          {/* Зубы */}
          <path d="M 93 99 L 93 101 M 96 99 L 96 101 M 100 99 L 100 101 M 104 99 L 104 101 M 107 99 L 107 101" stroke="rgba(255,250,230,0.8)" strokeWidth="0.4"/>

          {/* Румянец */}
          <ellipse cx="89" cy="93" rx="2.5" ry="1.5" fill="rgba(220,120,80,0.5)"/>
          <ellipse cx="111" cy="93" rx="2.5" ry="1.5" fill="rgba(220,120,80,0.5)"/>

          {/* Кудри/локоны по краям лица — 6 шт */}
          <path d="M 88 80 Q 85 78 84 82 Q 86 84 88 82 Z" fill="rgba(255,215,0,0.7)" stroke="#b8860b" strokeWidth="0.3"/>
          <path d="M 112 80 Q 115 78 116 82 Q 114 84 112 82 Z" fill="rgba(255,215,0,0.7)" stroke="#b8860b" strokeWidth="0.3"/>
          <path d="M 87 88 Q 84 88 84 92 Q 86 94 88 92 Z" fill="rgba(255,215,0,0.7)" stroke="#b8860b" strokeWidth="0.3"/>
          <path d="M 113 88 Q 116 88 116 92 Q 114 94 112 92 Z" fill="rgba(255,215,0,0.7)" stroke="#b8860b" strokeWidth="0.3"/>
          <path d="M 88 96 Q 85 97 85 100 Q 87 102 89 100 Z" fill="rgba(255,215,0,0.7)" stroke="#b8860b" strokeWidth="0.3"/>
          <path d="M 112 96 Q 115 97 115 100 Q 113 102 111 100 Z" fill="rgba(255,215,0,0.7)" stroke="#b8860b" strokeWidth="0.3"/>
        </g>

        {/* Дальние холмы с городом */}
        <path d="M 14 175 Q 50 168 100 172 Q 150 168 186 175 L 186 200 L 14 200 Z" fill="rgba(120,80,40,0.25)" stroke="#5a3a20" strokeWidth="0.3"/>
        {/* Купола далёкого города */}
        <path d="M 30 175 L 30 168 Q 30 165 33 165 Q 36 165 36 168 L 36 175 Z" fill="rgba(120,20,20,0.4)" stroke="#5a3a20" strokeWidth="0.3"/>
        <path d="M 32 165 Q 33 162 34 165" fill="rgba(255,215,0,0.5)"/>
        <path d="M 160 175 L 160 167 Q 160 164 163 164 Q 166 164 166 167 L 166 175 Z" fill="rgba(120,20,20,0.4)" stroke="#5a3a20" strokeWidth="0.3"/>
        <path d="M 162 164 Q 163 161 164 164" fill="rgba(255,215,0,0.5)"/>
        {/* Дальние деревья */}
        <path d="M 70 175 L 70 170 L 71 167 L 72 170 L 72 175 Z" fill="rgba(34,100,40,0.5)" stroke="#2d6e2d" strokeWidth="0.2"/>
        <path d="M 130 175 L 130 170 L 131 167 L 132 170 L 132 175 Z" fill="rgba(34,100,40,0.5)" stroke="#2d6e2d" strokeWidth="0.2"/>

        {/* Цветущий сад */}
        <path d="M 14 200 Q 50 195 100 200 Q 150 195 186 200 L 186 250 L 14 250 Z" fill="rgba(90,60,30,0.3)" stroke="#5a3a20" strokeWidth="0.3"/>

        {/* ===== Подсолнухи — детальные, крупные ===== */}
        {[[28,215],[172,215],[55,220],[145,220]].map(([x,y]: any, i: number) => (
          <g key={i}>
            {/* Стебель — толстый */}
            <path d={`M ${x} ${y} Q ${x+1} ${y-12} ${x} ${y-22}`} fill="none" stroke="#2d6e2d" strokeWidth="1.5"/>
            {/* Листья — большие */}
            <path d={`M ${x} ${y-10} Q ${x-4} ${y-12} ${x-6} ${y-8} Q ${x-3} ${y-7} ${x} ${y-10} Z`} fill="rgba(34,100,40,0.75)" stroke="#2d6e2d" strokeWidth="0.4"/>
            <path d={`M ${x-4} ${y-9} L ${x-2} ${y-10}`} fill="none" stroke="#1e5020" strokeWidth="0.3"/>
            <path d={`M ${x+1} ${y-15} Q ${x+5} ${y-17} ${x+7} ${y-13} Q ${x+4} ${y-12} ${x+1} ${y-15} Z`} fill="rgba(34,100,40,0.75)" stroke="#2d6e2d" strokeWidth="0.4"/>
            <path d={`M ${x+4} ${y-14} L ${x+6} ${y-15}`} fill="none" stroke="#1e5020" strokeWidth="0.3"/>
            {/* Лепестки — 10 шт, золотые */}
            {Array.from({length: 10}).map((_, j) => {
              const a = (j / 10) * Math.PI * 2
              return <ellipse key={j} cx={x + Math.cos(a) * 5} cy={y - 22 + Math.sin(a) * 5} rx="3.5" ry="1.5" fill="rgba(255,215,0,0.8)" stroke="#b8860b" strokeWidth="0.3" transform={`rotate(${j * 36} ${x + Math.cos(a) * 5} ${y - 22 + Math.sin(a) * 5})`}/>
            })}
            {/* Сердцевина — тёмная */}
            <circle cx={x} cy={y - 22} r="3.5" fill="rgba(80,50,30,0.9)" stroke="#3a2010" strokeWidth="0.3"/>
            <circle cx={x} cy={y - 22} r="2.5" fill="rgba(120,80,40,0.8)"/>
            {/* Семечки — детальные */}
            {Array.from({length: 7}).map((_, k) => {
              const a = (k / 7) * Math.PI * 2
              return <circle key={k} cx={x + Math.cos(a) * 1.5} cy={y - 22 + Math.sin(a) * 1.5} r="0.4" fill="rgba(40,25,15,0.9)"/>
            })}
            <circle cx={x} cy={y - 22} r="0.4" fill="rgba(40,25,15,0.9)"/>
          </g>
        ))}

        {/* ===== Ромашки — детальные ===== */}
        <g>
          {[45, 75, 125, 155].map((x, i) => (
            <g key={i}>
              <line x1={x} y1="238" x2={x} y2="227" stroke="#2d6e2d" strokeWidth="0.7"/>
              {/* Листочки на стебле */}
              <path d={`M ${x} 233 Q ${x-2} 232 ${x-3} 234 Q ${x-1} 234 ${x} 233 Z`} fill="rgba(34,100,40,0.7)" stroke="#2d6e2d" strokeWidth="0.2"/>
              {/* Лепестки — 8 шт */}
              {Array.from({length: 8}).map((_, j) => {
                const a = (j / 8) * Math.PI * 2
                return <ellipse key={j} cx={x + Math.cos(a) * 2.5} cy={226 + Math.sin(a) * 2.5} rx="2" ry="0.7" fill="rgba(255,255,255,0.9)" stroke="#b8860b" strokeWidth="0.2" transform={`rotate(${j * 45} ${x + Math.cos(a) * 2.5} ${226 + Math.sin(a) * 2.5})`}/>
              })}
              {/* Сердцевина */}
              <circle cx={x} cy={226} r="1.2" fill="rgba(255,215,0,0.9)" stroke="#b8860b" strokeWidth="0.2"/>
              <circle cx={x} cy={226} r="0.5" fill="rgba(180,100,40,0.8)"/>
            </g>
          ))}
        </g>

        {/* ===== Красные маки — дополнительно ===== */}
        {[[20,235],[180,235],[100,242]].map(([x,y], i) => (
          <g key={i}>
            <line x1={x} y1={y} x2={x} y2={y-8} stroke="#2d6e2d" strokeWidth="0.6"/>
            {/* Лепестки мака — 4 шт */}
            <ellipse cx={x-1.5} cy={y-9} rx="1.5" ry="1" fill="rgba(220,40,40,0.85)" stroke="#991b1b" strokeWidth="0.2"/>
            <ellipse cx={x+1.5} cy={y-9} rx="1.5" ry="1" fill="rgba(220,40,40,0.85)" stroke="#991b1b" strokeWidth="0.2"/>
            <ellipse cx={x} cy={y-10.5} rx="1.2" ry="1.5" fill="rgba(220,40,40,0.85)" stroke="#991b1b" strokeWidth="0.2"/>
            {/* Сердцевина мака */}
            <circle cx={x} cy={y-9} r="0.8" fill="rgba(40,25,15,0.9)"/>
            <circle cx={x} cy={y-9} r="0.3" fill="rgba(255,215,0,0.8)"/>
          </g>
        ))}

        {/* Трава — густая */}
        <path d="M 25 230 Q 27 222 29 230" fill="none" stroke="#2d6e2d" strokeWidth="0.6"/>
        <path d="M 35 232 Q 37 224 39 232" fill="none" stroke="#2d6e2d" strokeWidth="0.6"/>
        <path d="M 65 235 Q 67 227 69 235" fill="none" stroke="#2d6e2d" strokeWidth="0.6"/>
        <path d="M 88 238 Q 90 230 92 238" fill="none" stroke="#2d6e2d" strokeWidth="0.6"/>
        <path d="M 110 238 Q 112 230 114 238" fill="none" stroke="#2d6e2d" strokeWidth="0.6"/>
        <path d="M 135 235 Q 137 227 139 235" fill="none" stroke="#2d6e2d" strokeWidth="0.6"/>
        <path d="M 160 232 Q 162 224 164 232" fill="none" stroke="#2d6e2d" strokeWidth="0.6"/>
        <path d="M 170 230 Q 172 222 174 230" fill="none" stroke="#2d6e2d" strokeWidth="0.6"/>

        {/* ===== КАМЕННАЯ СТЕНА — васнецовская, детальная ===== */}
        <path d="M 14 195 L 186 195 L 186 202 L 14 202 Z" fill="rgba(120,80,40,0.4)" stroke="#5a3a20" strokeWidth="0.4"/>
        {/* Камни стены */}
        {[20, 40, 60, 80, 100, 120, 140, 160, 180].map((x, i) => (
          <g key={i}>
            <path d={`M ${x-8} 195 L ${x} 195 L ${x} 202 L ${x-8} 202 Z`} fill="none" stroke="#5a3a20" strokeWidth="0.3"/>
            <path d={`M ${x-6} 198 Q ${x-3} 196 ${x-2} 198`} fill="none" stroke="#5a3a20" strokeWidth="0.2"/>
          </g>
        ))}
        {/* Верхний ряд камней */}
        {[30, 50, 70, 90, 110, 130, 150, 170].map((x, i) => (
          <path key={i} d={`M ${x-8} 198 L ${x} 198`} fill="none" stroke="#5a3a20" strokeWidth="0.2" opacity="0.5"/>
        ))}

        {/* ===== БЕЛЫЙ КОНЬ — детальный, более крупный ===== */}
        <g className="svg-breathe" style={{ transformOrigin: "100px 195px" }}>
          {/* Тело коня — крупнее */}
          <path d="M 80 198 Q 75 190 78 184 Q 92 178 110 180 Q 122 182 124 190 Q 124 200 116 204 Q 100 208 86 205 Q 78 202 80 198 Z"
            fill="rgba(248,243,232,0.7)" stroke="#5a3a20" strokeWidth="0.6"/>
          {/* Тень на животе */}
          <path d="M 80 200 Q 100 205 122 200" fill="none" stroke="rgba(180,160,130,0.4)" strokeWidth="0.5"/>
          {/* Блик на крупе */}
          <path d="M 86 188 Q 100 184 116 187" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="0.7"/>

          {/* Голова коня — детальная */}
          <path d="M 118 192 Q 124 186 126 178 Q 124 172 119 174 Q 114 180 113 188 Q 113 192 116 195 Z"
            fill="rgba(248,243,232,0.75)" stroke="#5a3a20" strokeWidth="0.5"/>
          {/* Морда */}
          <path d="M 124 184 Q 127 188 124 192 Q 121 193 119 190 Z" fill="rgba(255,250,240,0.8)" stroke="#5a3a20" strokeWidth="0.4"/>
          {/* Ноздря */}
          <ellipse cx="123" cy="188" rx="0.6" ry="0.9" fill="rgba(60,40,30,0.8)"/>
          {/* Рот */}
          <path d="M 121 191 Q 123 192 125 191" fill="none" stroke="#3a2010" strokeWidth="0.3"/>
          {/* Глаз коня — крупный */}
          <ellipse cx="119" cy="182" rx="0.9" ry="0.7" fill="#3a2010"/>
          <ellipse cx="119.2" cy="181.7" r="0.2" fill="rgba(255,255,255,0.9)"/>
          {/* Уши */}
          <path d="M 117 174 L 116 169 L 119 173 Z" fill="rgba(248,243,232,0.8)" stroke="#5a3a20" strokeWidth="0.3"/>
          <path d="M 122 173 L 123 168 L 124 173 Z" fill="rgba(248,243,232,0.8)" stroke="#5a3a20" strokeWidth="0.3"/>

          {/* Грива — пышная, золотистая */}
          <path d="M 116 178 Q 121 172 125 168 Q 127 174 124 180" fill="rgba(220,200,160,0.65)" stroke="#8b5a2b" strokeWidth="0.4"/>
          <path d="M 118 180 Q 122 175 126 172" fill="none" stroke="rgba(180,140,70,0.7)" strokeWidth="0.8" strokeLinecap="round"/>
          <path d="M 114 184 Q 118 180 122 180" fill="none" stroke="rgba(120,80,40,0.6)" strokeWidth="0.5"/>
          {/* Пряди гривы */}
          <path d="M 119 175 L 122 170" fill="none" stroke="rgba(180,140,70,0.5)" strokeWidth="0.4"/>
          <path d="M 121 177 L 124 173" fill="none" stroke="rgba(180,140,70,0.5)" strokeWidth="0.4"/>

          {/* Ноги коня — 4 шт, детальные с копытами */}
          <path d="M 86 204 L 84 224 L 89 224 L 89 204 Z" fill="rgba(248,243,232,0.7)" stroke="#5a3a20" strokeWidth="0.4"/>
          <path d="M 83 224 L 81 226 L 89 226 L 89 224 Z" fill="rgba(120,80,40,0.85)" stroke="#3a2010" strokeWidth="0.3"/>
          <path d="M 98 205 L 96 224 L 101 224 L 101 205 Z" fill="rgba(248,243,232,0.7)" stroke="#5a3a20" strokeWidth="0.4"/>
          <path d="M 95 224 L 93 226 L 101 226 L 101 224 Z" fill="rgba(120,80,40,0.85)" stroke="#3a2010" strokeWidth="0.3"/>
          <path d="M 110 203 L 112 224 L 117 224 L 115 203 Z" fill="rgba(248,243,232,0.7)" stroke="#5a3a20" strokeWidth="0.4"/>
          <path d="M 111 224 L 109 226 L 117 226 L 115 224 Z" fill="rgba(120,80,40,0.85)" stroke="#3a2010" strokeWidth="0.3"/>
          <path d="M 120 200 L 122 220 L 127 220 L 125 200 Z" fill="rgba(248,243,232,0.7)" stroke="#5a3a20" strokeWidth="0.4"/>
          <path d="M 121 220 L 119 222 L 127 222 L 125 220 Z" fill="rgba(120,80,40,0.85)" stroke="#3a2010" strokeWidth="0.3"/>

          {/* Хвост — длинный, развевающийся */}
          <path d="M 80 193 Q 72 200 70 215" fill="none" stroke="rgba(220,200,160,0.7)" strokeWidth="2" strokeLinecap="round"/>
          <path d="M 80 193 Q 74 202 72 215" fill="none" stroke="rgba(180,140,70,0.7)" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M 80 193 Q 76 205 74 218" fill="none" stroke="rgba(120,80,40,0.6)" strokeWidth="1" strokeLinecap="round"/>

          {/* Седло — красное, с золотой отделкой */}
          <path d="M 88 188 Q 100 184 112 187 L 112 195 Q 100 192 88 195 Z" fill="rgba(140,30,30,0.7)" stroke="#5a1010" strokeWidth="0.4"/>
          <path d="M 92 190 Q 100 188 108 190" fill="none" stroke="#ffd700" strokeWidth="0.4" opacity="0.7"/>
          {/* Стремя */}
          <path d="M 90 195 L 88 205 L 92 205 L 92 195 Z" fill="rgba(80,55,30,0.8)" stroke="#3a2010" strokeWidth="0.3"/>
        </g>

        {/* ===== ЮНОША на коне — детальный ===== */}
        <g className="svg-breathe" style={{ transformOrigin: "100px 175px" }}>
          {/* Тело — в охряной рубахе с золотым узором */}
          <path d="M 90 185 Q 88 175 92 165 L 108 165 Q 112 175 110 185 Q 100 188 90 185 Z"
            fill="rgba(184,134,11,0.6)" stroke="#5a3a20" strokeWidth="0.5"/>
          {/* Складки рубахи */}
          <path d="M 94 167 Q 95 178 94 185" fill="none" stroke="rgba(120,80,40,0.5)" strokeWidth="0.3"/>
          <path d="M 100 167 Q 100 178 100 185" fill="none" stroke="rgba(120,80,40,0.4)" strokeWidth="0.3"/>
          <path d="M 106 167 Q 105 178 106 185" fill="none" stroke="rgba(120,80,40,0.5)" strokeWidth="0.3"/>

          {/* Золотой растительный узор — детальный */}
          <path d="M 92 175 Q 100 172 108 175 Q 103 180 100 177 Q 97 180 92 175 Z" fill="none" stroke="#ffd700" strokeWidth="0.5" opacity="0.8"/>
          <path d="M 95 176 Q 97 175 99 176" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.6"/>
          <path d="M 101 176 Q 103 175 105 176" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.6"/>

          {/* Пояс — золотой */}
          <path d="M 90 175 Q 100 173 110 175 L 110 179 Q 100 177 90 179 Z" fill="rgba(255,215,0,0.5)" stroke="#b8860b" strokeWidth="0.4"/>

          {/* Шея */}
          <path d="M 96 156 L 96 165 L 104 165 L 104 156 Z" fill="rgba(232,200,160,0.9)" stroke="#8b5a2b" strokeWidth="0.3"/>

          {/* Лицо — детское, радостное */}
          <path d="M 92 150 Q 90 142 94 137 Q 97 134 100 133 Q 103 134 106 137 Q 110 142 108 150 Q 109 154 107 157 Q 104 160 100 160 Q 96 160 93 157 Q 91 154 92 150 Z"
            fill="rgba(232,200,160,0.92)" stroke="#8b5a2b" strokeWidth="0.4"/>

          {/* Глаза — большие, детские */}
          <path d="M 93 145 Q 95 144 97 145 Q 97 146 95 147 Q 93 146 93 145 Z" fill="rgba(255,255,255,0.85)"/>
          <path d="M 103 145 Q 105 144 107 145 Q 107 146 105 147 Q 103 146 103 145 Z" fill="rgba(255,255,255,0.85)"/>
          <circle cx="95" cy="145.5" r="1" fill="#5a3a20"/>
          <circle cx="105" cy="145.5" r="1" fill="#5a3a20"/>
          <circle cx="95.3" cy="145.2" r="0.3" fill="rgba(255,255,255,0.9)"/>
          <circle cx="105.3" cy="145.2" r="0.3" fill="rgba(255,255,255,0.9)"/>

          {/* Брови — приподнятые, радостные */}
          <path d="M 93 142 Q 95 141 97 142" fill="none" stroke="#5a3a20" strokeWidth="0.5"/>
          <path d="M 103 142 Q 105 141 107 142" fill="none" stroke="#5a3a20" strokeWidth="0.5"/>

          {/* Нос */}
          <path d="M 100 148 L 99 153 Q 100 154 101 153 Z" fill="none" stroke="#8b5a2b" strokeWidth="0.3"/>

          {/* Рот — широкая улыбка */}
          <path d="M 95 156 Q 100 159 105 156" fill="none" stroke="#991b1b" strokeWidth="0.5" strokeLinecap="round"/>
          <path d="M 96 156 Q 100 158 104 156" fill="rgba(180,60,60,0.4)"/>

          {/* Румянец — яркий */}
          <ellipse cx="94" cy="152" rx="1.8" ry="1.2" fill="rgba(220,120,80,0.5)"/>
          <ellipse cx="106" cy="152" rx="1.8" ry="1.2" fill="rgba(220,120,80,0.5)"/>

          {/* Волосы — русые, кудрявые */}
          <path d="M 92 142 Q 96 138 100 138 Q 104 138 108 142 Q 106 140 104 139 Q 100 137 96 139 Q 94 140 92 142 Z" fill="rgba(180,140,70,0.8)" stroke="#8b5a2b" strokeWidth="0.3"/>
          {/* Кудри */}
          <circle cx="93" cy="142" r="1.5" fill="rgba(180,140,70,0.7)" stroke="#8b5a2b" strokeWidth="0.2"/>
          <circle cx="107" cy="142" r="1.5" fill="rgba(180,140,70,0.7)" stroke="#8b5a2b" strokeWidth="0.2"/>

          {/* Венок из цветов на голове — детальный */}
          <path d="M 90 140 Q 95 137 100 138 Q 105 137 110 140" fill="none" stroke="rgba(34,100,40,0.8)" strokeWidth="0.6"/>
          {/* Листья венка */}
          <path d="M 92 139 Q 90 137 89 139 Q 90 140 92 139 Z" fill="rgba(34,100,40,0.8)" stroke="#2d6e2d" strokeWidth="0.2"/>
          <path d="M 108 139 Q 110 137 111 139 Q 110 140 108 139 Z" fill="rgba(34,100,40,0.8)" stroke="#2d6e2d" strokeWidth="0.2"/>
          {/* Цветы в венке — 5 шт */}
          <circle cx="93" cy="138" r="1.5" fill="rgba(220,60,60,0.85)" stroke="#991b1b" strokeWidth="0.3"/>
          <circle cx="93" cy="138" r="0.5" fill="#ffd700"/>
          <circle cx="97" cy="137" r="1.5" fill="#ffd700" opacity="0.85" stroke="#b8860b" strokeWidth="0.3"/>
          <circle cx="97" cy="137" r="0.5" fill="rgba(180,100,40,0.8)"/>
          <circle cx="100" cy="136" r="1.7" fill="rgba(220,60,60,0.85)" stroke="#991b1b" strokeWidth="0.3"/>
          <circle cx="100" cy="136" r="0.6" fill="#ffd700"/>
          <circle cx="103" cy="137" r="1.5" fill="#ffd700" opacity="0.85" stroke="#b8860b" strokeWidth="0.3"/>
          <circle cx="103" cy="137" r="0.5" fill="rgba(180,100,40,0.8)"/>
          <circle cx="107" cy="138" r="1.5" fill="rgba(220,180,200,0.85)" stroke="#991b1b" strokeWidth="0.3"/>
          <circle cx="107" cy="138" r="0.5" fill="#ffd700"/>

          {/* Руки — раскинуты в радости */}
          <path d="M 92 170 Q 86 178 80 188" fill="none" stroke="rgba(232,200,160,0.9)" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M 108 170 Q 114 178 120 188" fill="none" stroke="rgba(232,200,160,0.9)" strokeWidth="2.5" strokeLinecap="round"/>
        </g>

        {/* ===== Знамя в руке юноши — детальное ===== */}
        <g>
          {/* Древко знамени */}
          <path d="M 78 190 L 76 160 L 79 160 L 81 190 Z" fill="rgba(80,55,30,0.9)" stroke="#3a2010" strokeWidth="0.3"/>
          {/* Наконечник древка */}
          <path d="M 76 160 L 77.5 154 L 79 160 Z" fill="rgba(255,215,0,0.7)" stroke="#b8860b" strokeWidth="0.3"/>
          {/* Полотно знамени — золотое, развевающееся */}
          <path d="M 79 162 Q 95 158 100 165 Q 102 175 98 182 Q 88 178 79 180 Q 81 170 79 162 Z"
            fill="rgba(255,215,0,0.6)" stroke="#b8860b" strokeWidth="0.4"/>
          {/* Складки полотна */}
          <path d="M 83 165 Q 87 170 84 178" fill="none" stroke="rgba(180,140,70,0.5)" strokeWidth="0.3"/>
          <path d="M 90 163 Q 93 172 91 180" fill="none" stroke="rgba(180,140,70,0.5)" strokeWidth="0.3"/>
          {/* Символ солнца на знамени */}
          <circle cx="89" cy="171" r="2.5" fill="rgba(180,100,40,0.6)" stroke="#b8860b" strokeWidth="0.3"/>
          {/* Лучи символа */}
          {Array.from({length: 8}).map((_, i) => {
            const a = (i / 8) * Math.PI * 2
            return <line key={i} x1={89 + Math.cos(a) * 2.5} y1={171 + Math.sin(a) * 2.5} x2={89 + Math.cos(a) * 4} y2={171 + Math.sin(a) * 4} stroke="#b8860b" strokeWidth="0.4" opacity="0.6"/>
          })}
          {/* Бахрома знамени */}
          <path d="M 79 180 Q 79 183 81 182" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.7"/>
          <path d="M 84 181 Q 84 184 86 183" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.7"/>
          <path d="M 90 181 Q 90 184 92 183" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.7"/>
          <path d="M 96 180 Q 96 183 98 182" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.7"/>
        </g>

        {/* Декоративные васнецовские завитки по углам */}
        <path d="M 20 110 Q 25 105 30 110 Q 25 115 20 110 Z" fill="none" stroke="rgba(255,215,0,0.4)" strokeWidth="0.4"/>
        <path d="M 170 110 Q 175 105 180 110 Q 175 115 170 110 Z" fill="none" stroke="rgba(255,215,0,0.4)" strokeWidth="0.4"/>
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
// === Детальный рисованный объект масти (кубок/меч/жезл/пентакль) ===
function drawSuitObject(suit: string, x: number, y: number, scale: number = 1, rotation: number = 0, accent: string) {
  const s = scale
  return (
    <g transform={`translate(${x}, ${y}) rotate(${rotation}) scale(${s})`}>
      {suit === "cups" && (
        <g>
          {/* Кубок — золотой, детальный */}
          {/* Чаша — полукруглая с расширением */}
          <path d="M -10 -10 Q -12 0 -8 8 Q 0 12 8 8 Q 12 0 10 -10 Z" fill="rgba(255,215,0,0.55)" stroke="#b8860b" strokeWidth="0.6"/>
          {/* Блик на чаше */}
          <path d="M -7 -8 Q -8 0 -6 6" fill="none" stroke="rgba(255,255,200,0.6)" strokeWidth="0.8"/>
          {/* Жидкость в чаше */}
          <ellipse cx="0" cy="-9" rx="9" ry="2" fill="rgba(180,60,60,0.5)" stroke="#991b1b" strokeWidth="0.3"/>
          {/* Узоры на чаше — растительные */}
          <path d="M -6 -2 Q -3 -5 0 -2 Q 3 -5 6 -2" fill="none" stroke="#ffd700" strokeWidth="0.4" opacity="0.7"/>
          <path d="M -5 3 Q -2 1 0 3 Q 2 1 5 3" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.6"/>
          {/* Ножка кубка */}
          <path d="M -2 8 L -2 16 L 2 16 L 2 8 Z" fill="rgba(255,215,0,0.5)" stroke="#b8860b" strokeWidth="0.4"/>
          {/* Декор на ножке */}
          <circle cx="0" cy="12" r="1" fill="rgba(255,215,0,0.6)" stroke="#b8860b" strokeWidth="0.3"/>
          {/* Основание */}
          <ellipse cx="0" cy="18" rx="8" ry="2.5" fill="rgba(255,215,0,0.55)" stroke="#b8860b" strokeWidth="0.5"/>
          <ellipse cx="0" cy="17" rx="6" ry="1.5" fill="rgba(184,115,51,0.5)" stroke="#5a3a20" strokeWidth="0.3"/>
          {/* Декор основания */}
          <path d="M -6 18 Q -3 20 0 18 Q 3 20 6 18" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.6"/>
        </g>
      )}
      {suit === "swords" && (
        <g>
          {/* Меч — вертикальный, детальный */}
          {/* Клинок — длинный, с долом */}
          <path d="M -1.5 -25 L -1.5 12 L 0 16 L 1.5 12 L 1.5 -25 Z" fill="rgba(220,220,230,0.7)" stroke="#3a2010" strokeWidth="0.4"/>
          {/* Дол — центральная линия */}
          <line x1="0" y1="-23" x2="0" y2="10" stroke="rgba(255,255,255,0.5)" strokeWidth="0.3"/>
          {/* Блик на клинке */}
          <line x1="-0.8" y1="-22" x2="-0.8" y2="8" stroke="rgba(255,255,255,0.7)" strokeWidth="0.3"/>
          {/* Острие */}
          <path d="M -1.5 -25 L 0 -28 L 1.5 -25 Z" fill="rgba(220,220,230,0.85)" stroke="#3a2010" strokeWidth="0.3"/>
          {/* Гарда — золотая, резная */}
          <path d="M -8 12 L 8 12 L 8 15 L -8 15 Z" fill="rgba(255,215,0,0.6)" stroke="#b8860b" strokeWidth="0.5"/>
          {/* Завитки на гарде */}
          <path d="M -8 13 Q -10 14 -8 16" fill="none" stroke="#b8860b" strokeWidth="0.4"/>
          <path d="M 8 13 Q 10 14 8 16" fill="none" stroke="#b8860b" strokeWidth="0.4"/>
          {/* Рукоять — обмотанная */}
          <path d="M -2 15 L -2 22 L 2 22 L 2 15 Z" fill="rgba(120,80,40,0.7)" stroke="#3a2010" strokeWidth="0.3"/>
          {/* Обмотка рукояти */}
          <line x1="-2" y1="17" x2="2" y2="17" stroke="#991b1b" strokeWidth="0.4"/>
          <line x1="-2" y1="19" x2="2" y2="19" stroke="#991b1b" strokeWidth="0.4"/>
          <line x1="-2" y1="21" x2="2" y2="21" stroke="#991b1b" strokeWidth="0.4"/>
          {/* Навершие — золотой шар с камнем */}
          <circle cx="0" cy="24" r="2.5" fill="rgba(255,215,0,0.6)" stroke="#b8860b" strokeWidth="0.4"/>
          <circle cx="0" cy="24" r="1" fill={accent} stroke="#3a2010" strokeWidth="0.2"/>
        </g>
      )}
      {suit === "wands" && (
        <g>
          {/* Жезл — живая ветвь с побегами */}
          {/* Основной стержень — деревянный, изогнутый */}
          <path d="M -1 -25 Q 0 -10 -1 5 Q 0 15 -1 22" fill="none" stroke="rgba(80,55,30,0.85)" strokeWidth="3" strokeLinecap="round"/>
          {/* Кора — текстура */}
          <path d="M -1 -20 Q 0 -15 -1 -10" fill="none" stroke="#3a2010" strokeWidth="0.4"/>
          <path d="M -1 -5 Q 0 0 -1 5" fill="none" stroke="#3a2010" strokeWidth="0.4"/>
          <path d="M -1 10 Q 0 15 -1 20" fill="none" stroke="#3a2010" strokeWidth="0.4"/>
          {/* Малые веточки */}
          <path d="M -1 -15 Q -4 -17 -6 -20" fill="none" stroke="rgba(80,55,30,0.8)" strokeWidth="1.2" strokeLinecap="round"/>
          <path d="M -1 5 Q 3 7 5 10" fill="none" stroke="rgba(80,55,30,0.8)" strokeWidth="1.2" strokeLinecap="round"/>
          {/* Листья — золотые и зелёные */}
          <path d="M -6 -20 Q -8 -22 -10 -20 Q -8 -19 -6 -20 Z" fill="rgba(255,215,0,0.6)" stroke="#b8860b" strokeWidth="0.3"/>
          <path d="M -6 -20 Q -4 -22 -2 -20 Q -4 -19 -6 -20 Z" fill="rgba(34,100,40,0.6)" stroke="#2d6e2d" strokeWidth="0.3"/>
          <path d="M 5 10 Q 7 8 9 10 Q 7 12 5 10 Z" fill="rgba(255,215,0,0.6)" stroke="#b8860b" strokeWidth="0.3"/>
          <path d="M 5 10 Q 3 8 1 10 Q 3 12 5 10 Z" fill="rgba(34,100,40,0.6)" stroke="#2d6e2d" strokeWidth="0.3"/>
          {/* Цветок на вершине */}
          <circle cx="-1" cy="-25" r="2" fill="rgba(220,60,60,0.7)" stroke="#991b1b" strokeWidth="0.3"/>
          <circle cx="-3" cy="-26" r="1" fill="rgba(220,60,60,0.6)"/>
          <circle cx="1" cy="-26" r="1" fill="rgba(220,60,60,0.6)"/>
          <circle cx="-1" cy="-28" r="1" fill="rgba(220,60,60,0.6)"/>
          <circle cx="-1" cy="-25" r="0.6" fill="#ffd700"/>
          {/* Основание — корни */}
          <path d="M -1 22 Q -3 24 -5 25" fill="none" stroke="rgba(80,55,30,0.8)" strokeWidth="1" strokeLinecap="round"/>
          <path d="M -1 22 Q 1 24 3 25" fill="none" stroke="rgba(80,55,30,0.8)" strokeWidth="1" strokeLinecap="round"/>
        </g>
      )}
      {suit === "pentacles" && (
        <g>
          {/* Пентакль — золотая монета с гравировкой */}
          {/* Внешний круг монеты */}
          <circle cx="0" cy="0" r="12" fill="rgba(255,215,0,0.55)" stroke="#b8860b" strokeWidth="0.8"/>
          {/* Внутренний круг */}
          <circle cx="0" cy="0" r="9" fill="rgba(184,115,51,0.5)" stroke="#5a3a20" strokeWidth="0.5"/>
          {/* Декоративный бордюр */}
          <circle cx="0" cy="0" r="10.5" fill="none" stroke="#ffd700" strokeWidth="0.4" opacity="0.7"/>
          {/* Точки по кругу */}
          {Array.from({length: 12}).map((_, i) => {
            const a = (i / 12) * Math.PI * 2
            return <circle key={i} cx={Math.cos(a) * 11} cy={Math.sin(a) * 11} r="0.4" fill="#ffd700" opacity="0.7"/>
          })}
          {/* Пентаграмма в центре — звезда */}
          <path d="M 0 -6 L 1.8 -2 L 6 -2 L 2.5 1 L 4 5 L 0 2.5 L -4 5 L -2.5 1 L -6 -2 L -1.8 -2 Z"
            fill="rgba(255,215,0,0.4)" stroke="#b8860b" strokeWidth="0.4"/>
          {/* Центральный камень */}
          <circle cx="0" cy="0" r="1.2" fill={accent} stroke="#3a2010" strokeWidth="0.3"/>
          {/* Блики на монете */}
          <path d="M -8 -8 Q -10 -6 -10 -3" fill="none" stroke="rgba(255,255,200,0.7)" strokeWidth="0.6"/>
          <path d="M -9 -2 Q -10 0 -9 2" fill="none" stroke="rgba(255,255,200,0.5)" strokeWidth="0.4"/>
          {/* Растительный узор по краям */}
          <path d="M 8 -8 Q 10 -6 8 -4" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.6"/>
          <path d="M 8 8 Q 10 6 8 4" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.6"/>
        </g>
      )}
    </g>
  )
}

// === Детальная фигура персонажа для фигурных карт ===
function drawFigure(rank: string, suit: string, suitColor: string, accent: string) {
  // Общие цвета
  const skinTone = "rgba(232,200,160,0.9)"
  const hairColor = "rgba(180,140,70,0.85)"
  const goldTrim = "#ffd700"

  return (
    <g>
      {/* ===== ПАЖ — юноша стоящий, с посохом ===== */}
      {rank === "page" && (
        <g>
          {/* Земля */}
          <path d="M 50 245 Q 100 240 150 245 L 150 250 L 50 250 Z" fill="rgba(80,55,30,0.3)" stroke="#3a2010" strokeWidth="0.3"/>
          {/* Трава */}
          <path d="M 60 245 Q 62 240 64 245" fill="none" stroke="#2d6e2d" strokeWidth="0.4"/>
          <path d="M 140 245 Q 142 240 144 245" fill="none" stroke="#2d6e2d" strokeWidth="0.4"/>

          {/* Тело — в охряной тунике */}
          <path d="M 86 220 Q 84 200 86 175 Q 88 158 92 145 L 108 145 Q 112 158 114 175 Q 116 200 114 220 Q 100 225 86 220 Z"
            fill="rgba(184,134,11,0.5)" stroke="#5a3a20" strokeWidth="0.5"/>
          {/* Складки туники */}
          <path d="M 92 150 Q 92 185 92 220" fill="none" stroke="rgba(120,80,40,0.5)" strokeWidth="0.4"/>
          <path d="M 100 150 Q 100 185 100 220" fill="none" stroke="rgba(120,80,40,0.4)" strokeWidth="0.3"/>
          <path d="M 108 150 Q 108 185 108 220" fill="none" stroke="rgba(120,80,40,0.5)" strokeWidth="0.4"/>
          {/* Пояс */}
          <path d="M 86 180 Q 100 178 114 180 L 114 184 Q 100 182 86 184 Z" fill="rgba(120,90,50,0.7)" stroke="#5a3a20" strokeWidth="0.4"/>

          {/* Золотой растительный узор */}
          <path d="M 88 165 Q 96 161 100 165 Q 104 161 112 165 Q 108 169 100 167 Q 92 169 88 165 Z" fill="none" stroke={goldTrim} strokeWidth="0.4" opacity="0.7"/>

          {/* Ноги в сапогах */}
          <path d="M 92 220 L 90 240 L 96 240 L 96 220 Z" fill="rgba(80,55,30,0.8)" stroke="#3a2010" strokeWidth="0.4"/>
          <path d="M 104 220 L 104 240 L 110 240 L 108 220 Z" fill="rgba(80,55,30,0.8)" stroke="#3a2010" strokeWidth="0.4"/>

          {/* Шея */}
          <path d="M 96 135 L 96 145 L 104 145 L 104 135 Z" fill={skinTone} stroke="#8b5a2b" strokeWidth="0.3"/>

          {/* Лицо — детское */}
          <path d="M 92 130 Q 90 122 94 116 Q 97 113 100 112 Q 103 113 106 116 Q 110 122 108 130 Q 109 134 107 137 Q 104 140 100 140 Q 96 140 93 137 Q 91 134 92 130 Z"
            fill={skinTone} stroke="#8b5a2b" strokeWidth="0.4"/>
          {/* Глаза */}
          <ellipse cx="96" cy="123" rx="1" ry="0.7" fill="rgba(255,255,255,0.85)"/>
          <ellipse cx="104" cy="123" rx="1" ry="0.7" fill="rgba(255,255,255,0.85)"/>
          <circle cx="96" cy="123.3" r="0.6" fill="#5a3a20"/>
          <circle cx="104" cy="123.3" r="0.6" fill="#5a3a20"/>
          {/* Брови */}
          <path d="M 94 120 Q 96 119 98 120" fill="none" stroke="#5a3a20" strokeWidth="0.4"/>
          <path d="M 102 120 Q 104 119 106 120" fill="none" stroke="#5a3a20" strokeWidth="0.4"/>
          {/* Нос */}
          <path d="M 100 125 L 99 130 Q 100 131 101 130 Z" fill="none" stroke="#8b5a2b" strokeWidth="0.3"/>
          {/* Рот */}
          <path d="M 96 134 Q 100 135 104 134" fill="none" stroke="#991b1b" strokeWidth="0.4"/>

          {/* Волосы — русые */}
          <path d="M 92 118 Q 96 113 100 113 Q 104 113 108 118 Q 106 116 104 115 Q 100 112 96 115 Q 94 116 92 118 Z" fill={hairColor} stroke="#8b5a2b" strokeWidth="0.3"/>
          {/* Чёлка */}
          <path d="M 94 117 Q 100 114 106 117" fill="none" stroke={hairColor} strokeWidth="0.5"/>

          {/* Шапочка с пером */}
          <path d="M 91 112 Q 100 102 109 112 L 107 117 L 93 117 Z" fill="rgba(184,134,11,0.5)" stroke="#b8860b" strokeWidth="0.4"/>
          {/* Декор шапочки */}
          <path d="M 95 110 Q 100 107 105 110" fill="none" stroke={goldTrim} strokeWidth="0.3" opacity="0.6"/>
          {/* Перо */}
          <path d="M 108 108 Q 116 100 118 92 Q 114 100 110 104 Z" fill="rgba(180,30,30,0.55)" stroke="#991b1b" strokeWidth="0.3"/>
          <path d="M 110 105 Q 114 100 116 95" fill="none" stroke="#5a1010" strokeWidth="0.3"/>

          {/* Руки — одна держит посох */}
          <path d="M 92 160 Q 86 168 84 178" fill="none" stroke={skinTone} strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M 108 160 Q 114 170 116 185" fill="none" stroke={skinTone} strokeWidth="2.5" strokeLinecap="round"/>

          {/* Посох / символ масти в руке */}
          {drawSuitObject(suit, 116, 168, 0.9, 0, accent)}
        </g>
      )}

      {/* ===== РЫЦАРЬ — на коне, в доспехах ===== */}
      {rank === "knight" && (
        <g>
          {/* Земля */}
          <path d="M 30 245 Q 100 240 170 245 L 170 250 L 30 250 Z" fill="rgba(80,55,30,0.3)" stroke="#3a2010" strokeWidth="0.3"/>

          {/* Конь — детальный */}
          <g>
            {/* Тело коня */}
            <path d="M 70 215 Q 65 207 70 200 Q 90 195 115 197 Q 130 200 130 210 Q 130 220 122 222 Q 100 225 80 222 Q 70 220 70 215 Z"
              fill="rgba(50,35,25,0.7)" stroke="#3a2010" strokeWidth="0.5"/>
            {/* Голова коня */}
            <path d="M 60 205 Q 52 195 56 185 Q 62 180 68 188 Q 72 195 70 205 Z"
              fill="rgba(50,35,25,0.7)" stroke="#3a2010" strokeWidth="0.5"/>
            {/* Морда */}
            <path d="M 56 195 Q 52 200 56 205 Q 60 205 62 200 Z" fill="rgba(80,55,30,0.7)" stroke="#3a2010" strokeWidth="0.4"/>
            {/* Ноздря */}
            <ellipse cx="58" cy="198" rx="0.6" ry="0.9" fill="rgba(20,15,10,0.7)"/>
            {/* Глаз */}
            <ellipse cx="62" cy="192" rx="0.7" ry="0.5" fill="#3a2010"/>
            <circle cx="62" cy="192" r="0.2" fill="#ffd700"/>
            {/* Уши */}
            <path d="M 64 185 L 63 180 L 65 184 Z" fill="rgba(50,35,25,0.8)" stroke="#3a2010" strokeWidth="0.3"/>
            <path d="M 67 184 L 66 179 L 68 183 Z" fill="rgba(50,35,25,0.8)" stroke="#3a2010" strokeWidth="0.3"/>
            {/* Грива — золотая, пышная */}
            <path d="M 66 188 Q 60 180 64 175 Q 60 178 58 185" fill="none" stroke="rgba(255,215,0,0.7)" strokeWidth="1.2" strokeLinecap="round"/>
            <path d="M 68 192 Q 62 184 66 178" fill="none" stroke="rgba(255,215,0,0.5)" strokeWidth="0.8" strokeLinecap="round"/>
            <path d="M 70 196 Q 66 188 70 182" fill="none" stroke="rgba(220,180,70,0.6)" strokeWidth="0.6" strokeLinecap="round"/>

            {/* Ноги коня */}
            <path d="M 78 222 L 76 240 L 82 240 L 82 222 Z" fill="rgba(50,35,25,0.75)" stroke="#3a2010" strokeWidth="0.4"/>
            <path d="M 76 240 L 74 242 L 82 242 L 82 240 Z" fill="rgba(40,25,15,0.85)" stroke="#3a2010" strokeWidth="0.3"/>
            <path d="M 92 222 L 90 242 L 96 242 L 96 222 Z" fill="rgba(50,35,25,0.75)" stroke="#3a2010" strokeWidth="0.4"/>
            <path d="M 90 242 L 88 244 L 96 244 L 96 242 Z" fill="rgba(40,25,15,0.85)" stroke="#3a2010" strokeWidth="0.3"/>
            <path d="M 110 220 L 108 242 L 114 242 L 114 220 Z" fill="rgba(50,35,25,0.75)" stroke="#3a2010" strokeWidth="0.4"/>
            <path d="M 108 242 L 106 244 L 114 244 L 114 242 Z" fill="rgba(40,25,15,0.85)" stroke="#3a2010" strokeWidth="0.3"/>
            <path d="M 122 218 L 124 240 L 130 240 L 128 218 Z" fill="rgba(50,35,25,0.75)" stroke="#3a2010" strokeWidth="0.4"/>
            <path d="M 124 240 L 122 242 L 130 242 L 128 240 Z" fill="rgba(40,25,15,0.85)" stroke="#3a2010" strokeWidth="0.3"/>

            {/* Хвост */}
            <path d="M 130 210 Q 138 215 138 230 Q 138 235 134 238" fill="none" stroke="rgba(60,40,30,0.8)" strokeWidth="2" strokeLinecap="round"/>
            <path d="M 130 210 Q 136 218 134 230" fill="none" stroke="rgba(40,25,15,0.6)" strokeWidth="1" strokeLinecap="round"/>

            {/* Седло — резное */}
            <path d="M 80 200 Q 100 197 118 200 L 118 205 Q 100 202 80 205 Z" fill="rgba(40,25,15,0.7)" stroke="#3a2010" strokeWidth="0.4"/>
            <path d="M 84 202 Q 100 200 116 202" fill="none" stroke={goldTrim} strokeWidth="0.3" opacity="0.6"/>
          </g>

          {/* ===== Рыцарь — в доспехах ===== */}
          <g>
            {/* Ноги в стременах */}
            <path d="M 92 200 L 88 220 L 94 220 L 96 200 Z" fill="rgba(50,50,60,0.65)" stroke="#3a3a40" strokeWidth="0.4"/>
            <path d="M 108 200 L 110 220 L 116 220 L 112 200 Z" fill="rgba(50,50,60,0.65)" stroke="#3a3a40" strokeWidth="0.4"/>
            {/* Сапоги */}
            <ellipse cx="91" cy="220" rx="3" ry="1.5" fill="rgba(40,25,15,0.85)" stroke="#3a2010" strokeWidth="0.3"/>
            <ellipse cx="113" cy="220" rx="3" ry="1.5" fill="rgba(40,25,15,0.85)" stroke="#3a2010" strokeWidth="0.3"/>

            {/* Доспех — нагрудник */}
            <path d="M 86 180 Q 84 165 88 150 L 112 150 Q 116 165 114 180 Q 100 185 86 180 Z"
              fill="rgba(60,60,70,0.65)" stroke="#3a3a40" strokeWidth="0.5"/>
            {/* Чешуя на доспехе */}
            {Array.from({length: 3}).map((_, row) => 
              Array.from({length: 3}).map((_, col) => (
                <path key={`d-${row}-${col}`} d={`M ${89 + col * 7} ${155 + row * 7} q 3 -2 6 0`} fill="none" stroke="rgba(160,160,170,0.4)" strokeWidth="0.4"/>
              ))
            )}
            {/* Блик на доспехе */}
            <path d="M 90 155 Q 88 165 90 175" fill="none" stroke="rgba(220,220,230,0.5)" strokeWidth="0.5"/>

            {/* Красный плащ */}
            <path d="M 86 180 L 78 150 L 76 180 Q 81 183 86 180 Z" fill="rgba(120,20,20,0.55)" stroke="#5a1010" strokeWidth="0.4"/>
            <path d="M 114 180 L 122 150 L 124 180 Q 119 183 114 180 Z" fill="rgba(120,20,20,0.55)" stroke="#5a1010" strokeWidth="0.4"/>

            {/* Шея */}
            <path d="M 96 140 L 96 150 L 104 150 L 104 140 Z" fill={skinTone} stroke="#8b5a2b" strokeWidth="0.3"/>

            {/* Лицо — серьёзное */}
            <path d="M 92 130 Q 90 122 94 116 Q 97 113 100 112 Q 103 113 106 116 Q 110 122 108 130 Q 109 135 107 138 Q 104 141 100 141 Q 96 141 93 138 Q 91 135 92 130 Z"
              fill={skinTone} stroke="#8b5a2b" strokeWidth="0.4"/>
            {/* Глаза — строгие */}
            <path d="M 93 124 Q 95 123 97 124 Q 97 125 95 125 Q 93 125 93 124 Z" fill="rgba(255,255,255,0.85)"/>
            <path d="M 103 124 Q 105 123 107 124 Q 107 125 105 125 Q 103 125 103 124 Z" fill="rgba(255,255,255,0.85)"/>
            <circle cx="95" cy="124.3" r="0.7" fill="#3a2010"/>
            <circle cx="105" cy="124.3" r="0.7" fill="#3a2010"/>
            {/* Брови — нахмуренные */}
            <path d="M 93 121 Q 96 119 98 121" fill="none" stroke="#5a3a20" strokeWidth="0.5"/>
            <path d="M 102 121 Q 104 119 107 121" fill="none" stroke="#5a3a20" strokeWidth="0.5"/>
            {/* Нос */}
            <path d="M 100 126 L 99 132 Q 99 133 100 133 Q 101 133 101 132 Z" fill="none" stroke="#8b5a2b" strokeWidth="0.3"/>
            {/* Рот — плотно сжат */}
            <path d="M 96 136 Q 100 137 104 136" fill="none" stroke="#991b1b" strokeWidth="0.4"/>

            {/* Шлем — золотой, остроконечный, с забралом */}
            <path d="M 88 117 Q 100 95 112 117 L 110 124 L 90 124 Z" fill="rgba(255,215,0,0.3)" stroke="#b8860b" strokeWidth="0.5"/>
            {/* Декор шлема */}
            <path d="M 92 110 Q 100 102 108 110" fill="none" stroke={goldTrim} strokeWidth="0.4" opacity="0.5"/>
            {/* Гребень шлема */}
            <path d="M 100 95 L 100 88 L 102 88 L 102 95 Z" fill="rgba(120,20,20,0.7)" stroke="#5a1010" strokeWidth="0.3"/>
            {/* Забрало */}
            <line x1="91" y1="120" x2="109" y2="120" stroke="#3a2010" strokeWidth="0.5"/>
            <line x1="91" y1="123" x2="109" y2="123" stroke="#3a2010" strokeWidth="0.3"/>
            {/* Султан — перо на шлеме */}
            <path d="M 100 88 Q 102 80 100 75 Q 98 80 100 88 Z" fill="rgba(180,30,30,0.7)" stroke="#5a1010" strokeWidth="0.3"/>
            <path d="M 100 86 Q 102 82 102 78" fill="none" stroke="#5a1010" strokeWidth="0.3"/>

            {/* Рука — поднята с оружием */}
            <path d="M 110 165 Q 118 155 124 145" fill="none" stroke="rgba(60,60,70,0.85)" strokeWidth="3" strokeLinecap="round"/>
            <path d="M 86 165 Q 78 170 76 180" fill="none" stroke="rgba(60,60,70,0.85)" strokeWidth="3" strokeLinecap="round"/>

            {/* Оружие — символ масти в руке */}
            {drawSuitObject(suit, 124, 130, 1.1, 0, accent)}
          </g>
        </g>
      )}

      {/* ===== КОРОЛЕВА — на троне, в платье ===== */}
      {rank === "queen" && (
        <g>
          {/* Трон — резной, деревянный */}
          <path d="M 70 250 L 70 165 L 130 165 L 130 250 Z" fill="rgba(74,53,36,0.5)" stroke="#3a2010" strokeWidth="0.5"/>
          {/* Спинка трона — резная */}
          <path d="M 65 165 L 135 165 L 135 155 L 65 155 Z" fill="rgba(139,90,43,0.5)" stroke="#5a3a20" strokeWidth="0.4"/>
          {/* Края трона — резные */}
          <path d="M 60 165 L 65 155 L 65 165 Z" fill="rgba(139,90,43,0.6)" stroke="#5a3a20" strokeWidth="0.3"/>
          <path d="M 140 165 L 135 155 L 135 165 Z" fill="rgba(139,90,43,0.6)" stroke="#5a3a20" strokeWidth="0.3"/>
          {/* Декор трона — растительный */}
          <path d="M 75 180 Q 85 175 95 180 Q 105 175 115 180 Q 125 175 130 180" fill="none" stroke={goldTrim} strokeWidth="0.4" opacity="0.5"/>
          <path d="M 75 220 Q 85 215 95 220 Q 105 215 115 220 Q 125 215 130 220" fill="none" stroke={goldTrim} strokeWidth="0.4" opacity="0.5"/>
          {/* Боковые завитки */}
          <path d="M 70 200 Q 65 195 67 190 Q 70 195 72 198" fill="none" stroke="#5a3a20" strokeWidth="0.4"/>
          <path d="M 130 200 Q 135 195 133 190 Q 130 195 128 198" fill="none" stroke="#5a3a20" strokeWidth="0.4"/>
          {/* Подлокотники */}
          <path d="M 65 200 L 70 200 L 70 210 L 65 210 Z" fill="rgba(139,90,43,0.55)" stroke="#5a3a20" strokeWidth="0.3"/>
          <path d="M 135 200 L 130 200 L 130 210 L 135 210 Z" fill="rgba(139,90,43,0.55)" stroke="#5a3a20" strokeWidth="0.3"/>

          {/* Платье — длинное, бордовое */}
          <path d="M 78 245 Q 80 215 84 195 Q 88 175 92 155 L 108 155 Q 112 175 116 195 Q 120 215 122 245 Q 100 250 78 245 Z"
            fill="rgba(120,20,20,0.55)" stroke="#5a1010" strokeWidth="0.5"/>
          {/* Складки платья */}
          <path d="M 84 165 Q 86 200 84 240" fill="none" stroke="rgba(60,10,10,0.5)" strokeWidth="0.4"/>
          <path d="M 92 165 Q 94 200 92 240" fill="none" stroke="rgba(60,10,10,0.4)" strokeWidth="0.3"/>
          <path d="M 100 165 Q 100 200 100 240" fill="none" stroke="rgba(60,10,10,0.4)" strokeWidth="0.3"/>
          <path d="M 108 165 Q 106 200 108 240" fill="none" stroke="rgba(60,10,10,0.4)" strokeWidth="0.3"/>
          <path d="M 116 165 Q 114 200 116 240" fill="none" stroke="rgba(60,10,10,0.5)" strokeWidth="0.4"/>

          {/* Золотой растительный узор */}
          <path d="M 82 180 Q 92 176 100 180 Q 108 176 118 180 Q 110 186 100 182 Q 92 186 82 180 Z" fill="none" stroke={goldTrim} strokeWidth="0.4" opacity="0.7"/>
          <path d="M 82 215 Q 92 211 100 215 Q 108 211 118 215 Q 110 221 100 217 Q 92 221 82 215 Z" fill="none" stroke={goldTrim} strokeWidth="0.4" opacity="0.7"/>

          {/* Золотой пояс с медальоном */}
          <path d="M 80 195 Q 100 193 120 195 L 120 200 Q 100 198 80 200 Z" fill="rgba(255,215,0,0.4)" stroke="#b8860b" strokeWidth="0.4"/>
          <circle cx="100" cy="197" r="3" fill="rgba(255,215,0,0.5)" stroke="#b8860b" strokeWidth="0.4"/>
          <circle cx="100" cy="197" r="1" fill={accent}/>

          {/* Воротник — золотой */}
          <path d="M 88 155 L 112 155 L 112 162 L 88 162 Z" fill="rgba(255,215,0,0.4)" stroke="#b8860b" strokeWidth="0.4"/>
          <path d="M 90 160 Q 100 158 110 160" fill="none" stroke="#991b1b" strokeWidth="0.3"/>

          {/* Шея */}
          <path d="M 96 142 L 96 155 L 104 155 L 104 142 Z" fill={skinTone} stroke="#8b5a2b" strokeWidth="0.3"/>

          {/* Лицо — женское, нежное */}
          <path d="M 92 132 Q 90 124 94 118 Q 97 114 100 113 Q 103 114 106 118 Q 110 124 108 132 Q 109 137 107 140 Q 104 144 100 144 Q 96 144 93 140 Q 91 137 92 132 Z"
            fill={skinTone} stroke="#8b5a2b" strokeWidth="0.4"/>
          {/* Глаза — миндалевидные */}
          <path d="M 93 126 Q 95 125 97 126 Q 97 127 95 128 Q 93 127 93 126 Z" fill="rgba(255,255,255,0.85)"/>
          <path d="M 103 126 Q 105 125 107 126 Q 107 127 105 128 Q 103 127 103 126 Z" fill="rgba(255,255,255,0.85)"/>
          <circle cx="95" cy="126.5" r="0.8" fill="#5a3a20"/>
          <circle cx="105" cy="126.5" r="0.8" fill="#5a3a20"/>
          {/* Брови — тонкие */}
          <path d="M 93 123 Q 95 122 97 123" fill="none" stroke="#5a3a20" strokeWidth="0.4"/>
          <path d="M 103 123 Q 105 122 107 123" fill="none" stroke="#5a3a20" strokeWidth="0.4"/>
          {/* Нос */}
          <path d="M 100 128 L 99 134 Q 99 135 100 135 Q 101 135 101 134 Z" fill="none" stroke="#8b5a2b" strokeWidth="0.3"/>
          {/* Рот — мягкая улыбка */}
          <path d="M 96 138 Q 100 140 104 138" fill="none" stroke="#991b1b" strokeWidth="0.4"/>
          {/* Румянец */}
          <ellipse cx="94" cy="134" rx="1.5" ry="1" fill="rgba(220,120,80,0.3)"/>
          <ellipse cx="106" cy="134" rx="1.5" ry="1" fill="rgba(220,120,80,0.3)"/>

          {/* Волосы — длинные, распущенные */}
          <path d="M 88 125 Q 84 155 86 185" fill="none" stroke={hairColor} strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M 112 125 Q 116 155 114 185" fill="none" stroke={hairColor} strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M 92 118 Q 96 113 100 114 Q 104 113 108 118 Q 106 116 104 115 Q 100 112 96 115 Q 94 116 92 118 Z" fill={hairColor} stroke="#8b5a2b" strokeWidth="0.3"/>
          {/* Пряди */}
          <path d="M 90 130 Q 88 150 90 170" fill="none" stroke={hairColor} strokeWidth="1" strokeLinecap="round"/>
          <path d="M 110 130 Q 112 150 110 170" fill="none" stroke={hairColor} strokeWidth="1" strokeLinecap="round"/>

          {/* Корона — золотая, с камнями */}
          <path d="M 88 115 L 90 105 L 93 113 L 96 102 L 100 110 L 104 102 L 107 113 L 110 105 L 112 115 Z"
            fill="rgba(255,215,0,0.5)" stroke="#b8860b" strokeWidth="0.4"/>
          <path d="M 88 115 L 112 115 L 112 118 L 88 118 Z" fill="rgba(255,215,0,0.4)" stroke="#b8860b" strokeWidth="0.3"/>
          {/* Камни на короне */}
          <circle cx="92" cy="108" r="1" fill="rgba(180,30,30,0.7)" stroke="#5a1010" strokeWidth="0.2"/>
          <circle cx="96" cy="106" r="1" fill="rgba(34,100,40,0.7)" stroke="#1e1e50" strokeWidth="0.2"/>
          <circle cx="100" cy="108" r="1.2" fill="rgba(180,30,30,0.7)" stroke="#5a1010" strokeWidth="0.2"/>
          <circle cx="104" cy="106" r="1" fill="rgba(34,100,40,0.7)" stroke="#1e1e50" strokeWidth="0.2"/>
          <circle cx="108" cy="108" r="1" fill="rgba(180,30,30,0.7)" stroke="#5a1010" strokeWidth="0.2"/>

          {/* Руки — сложены или держат символ */}
          <path d="M 88 175 Q 82 185 80 195" fill="none" stroke={skinTone} strokeWidth="3" strokeLinecap="round"/>
          <path d="M 112 175 Q 118 185 120 195" fill="none" stroke={skinTone} strokeWidth="3" strokeLinecap="round"/>

          {/* Символ масти в руках */}
          {drawSuitObject(suit, 100, 200, 0.85, 0, accent)}
        </g>
      )}

      {/* ===== КОРОЛЬ — на троне, в мантии ===== */}
      {rank === "king" && (
        <g>
          {/* Трон — более массивный */}
          <path d="M 65 250 L 65 160 L 135 160 L 135 250 Z" fill="rgba(74,53,36,0.55)" stroke="#3a2010" strokeWidth="0.5"/>
          {/* Спинка трона */}
          <path d="M 60 160 L 140 160 L 140 148 L 60 148 Z" fill="rgba(139,90,43,0.55)" stroke="#5a3a20" strokeWidth="0.4"/>
          {/* Резные края трона */}
          <path d="M 58 160 L 60 145 L 65 148 L 65 160 Z" fill="rgba(139,90,43,0.6)" stroke="#5a3a20" strokeWidth="0.3"/>
          <path d="M 142 160 L 140 145 L 135 148 L 135 160 Z" fill="rgba(139,90,43,0.6)" stroke="#5a3a20" strokeWidth="0.3"/>
          {/* Резной декор трона */}
          <path d="M 75 175 Q 85 170 95 175 Q 105 170 115 175 Q 125 170 130 175" fill="none" stroke={goldTrim} strokeWidth="0.4" opacity="0.6"/>
          <path d="M 75 200 Q 85 195 95 200 Q 105 195 115 200 Q 125 195 130 200" fill="none" stroke={goldTrim} strokeWidth="0.4" opacity="0.6"/>
          <path d="M 75 225 Q 85 220 95 225 Q 105 220 115 225 Q 125 220 130 225" fill="none" stroke={goldTrim} strokeWidth="0.4" opacity="0.6"/>
          {/* Боковые завитки */}
          <path d="M 65 195 Q 60 190 62 185 Q 65 190 67 193" fill="none" stroke="#5a3a20" strokeWidth="0.4"/>
          <path d="M 135 195 Q 140 190 138 185 Q 135 190 133 193" fill="none" stroke="#5a3a20" strokeWidth="0.4"/>
          {/* Подлокотники */}
          <path d="M 60 195 L 65 195 L 65 210 L 60 210 Z" fill="rgba(139,90,43,0.6)" stroke="#5a3a20" strokeWidth="0.3"/>
          <path d="M 140 195 L 135 195 L 135 210 L 140 210 Z" fill="rgba(139,90,43,0.6)" stroke="#5a3a20" strokeWidth="0.3"/>
          {/* Шар на спинке трона */}
          <circle cx="100" cy="148" r="3" fill="rgba(255,215,0,0.4)" stroke="#b8860b" strokeWidth="0.4"/>
          <path d="M 97 148 Q 100 145 103 148 Q 100 151 97 148 Z" fill="#991b1b" opacity="0.6"/>

          {/* Мантия — тёмно-синяя, длинная, с золотым шитьём */}
          <path d="M 76 245 Q 78 215 82 195 Q 86 175 90 155 L 110 155 Q 114 175 118 195 Q 122 215 124 245 Q 100 250 76 245 Z"
            fill="rgba(30,30,80,0.6)" stroke="#1e1e50" strokeWidth="0.5"/>
          {/* Складки мантии */}
          <path d="M 84 165 Q 86 200 84 240" fill="none" stroke="rgba(15,15,40,0.5)" strokeWidth="0.4"/>
          <path d="M 92 165 Q 94 200 92 240" fill="none" stroke="rgba(15,15,40,0.4)" strokeWidth="0.3"/>
          <path d="M 100 165 Q 100 200 100 240" fill="none" stroke="rgba(15,15,40,0.4)" strokeWidth="0.3"/>
          <path d="M 108 165 Q 106 200 108 240" fill="none" stroke="rgba(15,15,40,0.4)" strokeWidth="0.3"/>
          <path d="M 116 165 Q 114 200 116 240" fill="none" stroke="rgba(15,15,40,0.5)" strokeWidth="0.4"/>

          {/* Золотой растительный узор на мантии */}
          <path d="M 80 180 Q 90 176 100 180 Q 110 176 120 180 Q 110 186 100 182 Q 90 186 80 180 Z" fill="none" stroke={goldTrim} strokeWidth="0.4" opacity="0.7"/>
          <path d="M 80 215 Q 90 211 100 215 Q 110 211 120 215 Q 110 221 100 217 Q 90 221 80 215 Z" fill="none" stroke={goldTrim} strokeWidth="0.4" opacity="0.7"/>

          {/* Золотой пояс */}
          <path d="M 78 195 Q 100 193 122 195 L 122 200 Q 100 198 78 200 Z" fill="rgba(255,215,0,0.4)" stroke="#b8860b" strokeWidth="0.4"/>
          <circle cx="100" cy="197" r="3" fill="rgba(255,215,0,0.5)" stroke="#b8860b" strokeWidth="0.4"/>
          <path d="M 97 197 Q 100 194 103 197 Q 100 200 97 197 Z" fill="#991b1b" opacity="0.6"/>

          {/* Воротник — золотой */}
          <path d="M 88 155 L 112 155 L 112 162 L 88 162 Z" fill="rgba(255,215,0,0.4)" stroke="#b8860b" strokeWidth="0.4"/>
          <path d="M 90 160 Q 100 158 110 160" fill="none" stroke="#991b1b" strokeWidth="0.3"/>

          {/* Шея */}
          <path d="M 96 142 L 96 155 L 104 155 L 104 142 Z" fill={skinTone} stroke="#8b5a2b" strokeWidth="0.3"/>

          {/* Лицо — мужское, суровое */}
          <path d="M 92 132 Q 90 124 94 118 Q 97 114 100 113 Q 103 114 106 118 Q 110 124 108 132 Q 109 138 107 141 Q 104 145 100 145 Q 96 145 93 141 Q 91 138 92 132 Z"
            fill={skinTone} stroke="#8b5a2b" strokeWidth="0.4"/>
          {/* Морщины */}
          <path d="M 94 120 Q 100 119 106 120" fill="none" stroke="rgba(120,80,40,0.4)" strokeWidth="0.3"/>
          {/* Глаза — суровые */}
          <path d="M 93 126 Q 95 125 97 126 Q 97 127 95 128 Q 93 127 93 126 Z" fill="rgba(255,255,255,0.85)"/>
          <path d="M 103 126 Q 105 125 107 126 Q 107 127 105 128 Q 103 127 103 126 Z" fill="rgba(255,255,255,0.85)"/>
          <circle cx="95" cy="126.5" r="0.8" fill="#3a2010"/>
          <circle cx="105" cy="126.5" r="0.8" fill="#3a2010"/>
          {/* Брови — нахмуренные */}
          <path d="M 93 123 Q 95 121 97 122" fill="none" stroke="#5a3a20" strokeWidth="0.5"/>
          <path d="M 103 122 Q 105 121 107 123" fill="none" stroke="#5a3a20" strokeWidth="0.5"/>
          {/* Нос — крупный */}
          <path d="M 100 128 L 99 135 Q 99 136 100 136 Q 101 136 101 135 Z" fill="none" stroke="#8b5a2b" strokeWidth="0.4"/>
          {/* Усы и борода — короткие */}
          <path d="M 95 140 Q 100 142 105 140" fill="rgba(60,40,30,0.7)"/>
          <path d="M 94 141 Q 92 145 95 147 L 105 147 Q 108 145 106 141" fill="rgba(80,60,40,0.5)" stroke="#5a3a20" strokeWidth="0.3"/>
          {/* Рот */}
          <path d="M 96 142 Q 100 143 104 142" fill="none" stroke="#991b1b" strokeWidth="0.4"/>

          {/* Волосы — короткие, тёмные */}
          <path d="M 92 118 Q 96 113 100 113 Q 104 113 108 118 Q 106 116 104 115 Q 100 112 96 115 Q 94 116 92 118 Z" fill="rgba(80,50,30,0.8)" stroke="#5a3a20" strokeWidth="0.3"/>

          {/* Корона — золотая, царская, с большими зубцами */}
          <path d="M 86 115 L 88 100 L 92 110 L 96 95 L 100 108 L 104 95 L 108 110 L 112 100 L 114 115 Z"
            fill="rgba(255,215,0,0.5)" stroke="#b8860b" strokeWidth="0.5"/>
          <path d="M 86 115 L 114 115 L 114 119 L 86 119 Z" fill="rgba(255,215,0,0.4)" stroke="#b8860b" strokeWidth="0.4"/>
          {/* Камни на короне */}
          <circle cx="88" cy="103" r="1.2" fill="rgba(180,30,30,0.8)" stroke="#5a1010" strokeWidth="0.2"/>
          <circle cx="96" cy="100" r="1.2" fill="rgba(34,100,40,0.8)" stroke="#1e1e50" strokeWidth="0.2"/>
          <circle cx="100" cy="102" r="1.5" fill="rgba(180,30,30,0.8)" stroke="#5a1010" strokeWidth="0.2"/>
          <circle cx="104" cy="100" r="1.2" fill="rgba(34,100,40,0.8)" stroke="#1e1e50" strokeWidth="0.2"/>
          <circle cx="112" cy="103" r="1.2" fill="rgba(180,30,30,0.8)" stroke="#5a1010" strokeWidth="0.2"/>
          {/* Центральный крест */}
          <path d="M 99 95 L 101 95 L 101 92 L 102 92 L 102 95 L 104 95 L 104 96 L 102 96 L 102 99 L 101 99 L 101 96 L 99 96 Z" fill={goldTrim} stroke="#b8860b" strokeWidth="0.2"/>

          {/* Руки — держат символ масти или скипетр */}
          <path d="M 88 175 Q 82 185 80 195" fill="none" stroke={skinTone} strokeWidth="3" strokeLinecap="round"/>
          <path d="M 112 175 Q 118 185 120 195" fill="none" stroke={skinTone} strokeWidth="3" strokeLinecap="round"/>

          {/* Символ масти в руках */}
          {drawSuitObject(suit, 100, 200, 0.85, 0, accent)}
        </g>
      )}
    </g>
  )
}

function MinorArcanaArt({ card }: { card: TarotCard }) {
  const suitColor = suitInfo[card.suit].color
  const rank = card.rank!
  const accent = suitColor

  // === ВАСНЕЦОВСКИЕ ТУЗЫ — детальный объект масти из облака ===
  if (rank === "ace") {
    return (
      <g>
        {/* Небесный фон — золотистый */}
        <rect x="14" y="42" width="172" height="208" fill="rgba(204,153,51,0.06)" rx="2"/>
        {/* Свечение */}
        <circle cx="100" cy="160" r="60" fill="rgba(255,215,0,0.06)" stroke="none"/>

        {/* Облако — васнецовское, детальное */}
        <path d="M 60 100 Q 70 88 85 92 Q 95 85 105 92 Q 120 85 130 95 Q 145 95 145 105 Q 140 115 130 113 Q 120 120 105 115 Q 95 122 85 115 Q 70 118 60 110 Q 55 105 60 100 Z" fill="rgba(255,250,230,0.25)" stroke="#b8860b" strokeWidth="0.5"/>
        <path d="M 70 95 Q 80 88 90 92" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5"/>
        <path d="M 110 90 Q 120 85 130 92" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5"/>
        {/* Дополнительные облачные пряди */}
        <ellipse cx="75" cy="105" rx="10" ry="3" fill="rgba(255,250,230,0.2)"/>
        <ellipse cx="125" cy="105" rx="10" ry="3" fill="rgba(255,250,230,0.2)"/>

        {/* Рука из облака — детальная */}
        <path d="M 88 110 L 86 120 Q 84 125 88 128 L 92 130 Q 96 132 100 130 L 104 130 Q 108 132 112 130 L 116 128 Q 120 125 118 120 L 116 110 Z"
          fill="rgba(232,200,160,0.85)" stroke="#8b5a2b" strokeWidth="0.5"/>
        {/* Ладонь — с пальцами */}
        <path d="M 88 128 Q 86 132 88 135 L 92 136 Q 95 135 95 132 Z" fill="rgba(232,200,160,0.85)" stroke="#8b5a2b" strokeWidth="0.4"/>
        <path d="M 95 132 Q 95 136 97 138 L 100 138 Q 102 136 102 132 Z" fill="rgba(232,200,160,0.85)" stroke="#8b5a2b" strokeWidth="0.4"/>
        <path d="M 102 132 Q 102 136 104 138 L 107 138 Q 108 136 108 132 Z" fill="rgba(232,200,160,0.85)" stroke="#8b5a2b" strokeWidth="0.4"/>
        <path d="M 108 132 Q 108 134 110 136 L 113 136 Q 115 134 114 130 Z" fill="rgba(232,200,160,0.85)" stroke="#8b5a2b" strokeWidth="0.4"/>
        {/* Ногти */}
        <ellipse cx="89" cy="135" rx="0.6" ry="0.4" fill="rgba(220,180,140,0.7)"/>
        <ellipse cx="98" cy="137" rx="0.6" ry="0.4" fill="rgba(220,180,140,0.7)"/>
        <ellipse cx="105" cy="137" rx="0.6" ry="0.4" fill="rgba(220,180,140,0.7)"/>
        <ellipse cx="111" cy="135" rx="0.6" ry="0.4" fill="rgba(220,180,140,0.7)"/>

        {/* Рукав — с золотым растительным узором */}
        <path d="M 88 110 Q 78 100 80 90 L 90 95 L 92 105 Z" fill="rgba(184,134,11,0.4)" stroke="#b8860b" strokeWidth="0.5"/>
        <path d="M 116 110 Q 126 100 124 90 L 114 95 L 112 105 Z" fill="rgba(184,134,11,0.4)" stroke="#b8860b" strokeWidth="0.5"/>
        {/* Узор на рукаве */}
        <path d="M 82 100 Q 86 96 90 100" fill="none" stroke="#ffd700" strokeWidth="0.4" opacity="0.6"/>
        <path d="M 84 95 Q 88 91 92 95" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.5"/>
        <path d="M 118 100 Q 114 96 110 100" fill="none" stroke="#ffd700" strokeWidth="0.4" opacity="0.6"/>
        <path d="M 116 95 Q 112 91 108 95" fill="none" stroke="#ffd700" strokeWidth="0.3" opacity="0.5"/>

        {/* Большой объект масти — детальный */}
        {card.suit === "wands" ? (
          // === ТУЗ ЖЕЗЛОВ — большой вертикальный посох-ветвь с побегами и листьями ===
          <g>
            {/* Основной стержень жезла — толстая живая ветвь, вертикальная */}
            <path d="M 97 130 Q 98 165 97 200 Q 98 215 97 220" fill="none" stroke="rgba(80,55,30,0.9)" strokeWidth="6" strokeLinecap="round"/>
            <path d="M 97 130 Q 98 165 97 200 Q 98 215 97 220" fill="none" stroke="rgba(120,80,40,0.7)" strokeWidth="4" strokeLinecap="round"/>
            {/* Текстура коры — вертикальные линии */}
            <path d="M 96 140 Q 97 175 96 205" fill="none" stroke="#3a2010" strokeWidth="0.5"/>
            <path d="M 98 145 Q 99 180 98 210" fill="none" stroke="#3a2010" strokeWidth="0.4"/>
            {/* Узлы на ветви */}
            <ellipse cx="97" cy="155" rx="4" ry="2" fill="rgba(60,40,25,0.7)" stroke="#3a2010" strokeWidth="0.4"/>
            <ellipse cx="97" cy="185" rx="4" ry="2" fill="rgba(60,40,25,0.7)" stroke="#3a2010" strokeWidth="0.4"/>

            {/* Малые веточки-побеги */}
            <path d="M 97 160 Q 90 155 84 148" fill="none" stroke="rgba(80,55,30,0.85)" strokeWidth="2" strokeLinecap="round"/>
            <path d="M 97 175 Q 105 170 112 165" fill="none" stroke="rgba(80,55,30,0.85)" strokeWidth="2" strokeLinecap="round"/>
            <path d="M 97 195 Q 88 200 82 208" fill="none" stroke="rgba(80,55,30,0.85)" strokeWidth="2" strokeLinecap="round"/>
            <path d="M 97 205 Q 106 210 113 215" fill="none" stroke="rgba(80,55,30,0.85)" strokeWidth="2" strokeLinecap="round"/>

            {/* Большие листья — золотые и зелёные, ярусами */}
            {/* Верхний ярус листьев (около вершины) */}
            <path d="M 84 148 Q 78 145 75 150 Q 78 154 84 152 Z" fill="rgba(255,215,0,0.7)" stroke="#b8860b" strokeWidth="0.4"/>
            <path d="M 80 150 L 78 152" fill="none" stroke="#5a3a20" strokeWidth="0.3"/>
            <path d="M 84 148 Q 88 144 92 148 Q 88 152 84 150 Z" fill="rgba(34,100,40,0.7)" stroke="#2d6e2d" strokeWidth="0.4"/>
            <path d="M 88 149 L 90 151" fill="none" stroke="#1e5020" strokeWidth="0.3"/>

            {/* Средний ярус листьев */}
            <path d="M 112 165 Q 118 161 122 166 Q 118 170 112 168 Z" fill="rgba(255,215,0,0.7)" stroke="#b8860b" strokeWidth="0.4"/>
            <path d="M 117 166 L 119 168" fill="none" stroke="#5a3a20" strokeWidth="0.3"/>
            <path d="M 112 165 Q 108 161 104 165 Q 108 169 112 167 Z" fill="rgba(34,100,40,0.7)" stroke="#2d6e2d" strokeWidth="0.4"/>
            <path d="M 108 166 L 106 168" fill="none" stroke="#1e5020" strokeWidth="0.3"/>

            {/* Нижний ярус листьев */}
            <path d="M 82 208 Q 76 210 73 215 Q 76 219 82 216 Z" fill="rgba(34,100,40,0.7)" stroke="#2d6e2d" strokeWidth="0.4"/>
            <path d="M 77 213 L 75 215" fill="none" stroke="#1e5020" strokeWidth="0.3"/>
            <path d="M 82 208 Q 86 212 90 216 Q 86 220 82 216 Z" fill="rgba(255,215,0,0.7)" stroke="#b8860b" strokeWidth="0.4"/>
            <path d="M 86 213 L 88 215" fill="none" stroke="#5a3a20" strokeWidth="0.3"/>

            <path d="M 113 215 Q 119 218 122 222 Q 119 226 113 223 Z" fill="rgba(34,100,40,0.7)" stroke="#2d6e2d" strokeWidth="0.4"/>
            <path d="M 118 220 L 120 222" fill="none" stroke="#1e5020" strokeWidth="0.3"/>

            {/* === ВЕРШИНА ЖЕЗЛА — большой распустившийся цветок === */}
            {/* Цветок — крупный, с 6 лепестками */}
            <g>
              {/* Лепестки — 6 штук вокруг центра */}
              {Array.from({length: 6}).map((_, i) => {
                const a = (i / 6) * Math.PI * 2
                const x1 = 97 + Math.cos(a) * 3
                const y1 = 128 + Math.sin(a) * 3
                const x2 = 97 + Math.cos(a) * 9
                const y2 = 128 + Math.sin(a) * 9
                return <ellipse key={i} cx={97 + Math.cos(a) * 6} cy={128 + Math.sin(a) * 6} rx="4" ry="2" fill="rgba(220,60,60,0.85)" stroke="#991b1b" strokeWidth="0.4" transform={`rotate(${i * 60} ${97 + Math.cos(a) * 6} ${128 + Math.sin(a) * 6})`}/>
              })}
              {/* Сердцевина цветка — золотая */}
              <circle cx="97" cy="128" r="3" fill="rgba(255,215,0,0.9)" stroke="#b8860b" strokeWidth="0.5"/>
              <circle cx="97" cy="128" r="1.5" fill="rgba(255,180,40,0.95)"/>
              <circle cx="97" cy="128" r="0.6" fill="rgba(120,80,40,0.9)"/>
              {/* Тычинки — точки вокруг */}
              {Array.from({length: 6}).map((_, i) => {
                const a = (i / 6) * Math.PI * 2
                return <circle key={i} cx={97 + Math.cos(a) * 2.5} cy={128 + Math.sin(a) * 2.5} r="0.3" fill="rgba(255,255,200,0.9)"/>
              })}
            </g>

            {/* === ОСНОВА ЖЕЗЛА — корни/утолщение === */}
            <ellipse cx="97" cy="220" rx="6" ry="3" fill="rgba(80,55,30,0.9)" stroke="#3a2010" strokeWidth="0.5"/>
            <ellipse cx="97" cy="219" rx="4" ry="2" fill="rgba(120,80,40,0.8)"/>
            {/* Малые корни */}
            <path d="M 95 222 Q 91 225 88 227" fill="none" stroke="rgba(80,55,30,0.85)" strokeWidth="1.2" strokeLinecap="round"/>
            <path d="M 99 222 Q 103 225 106 227" fill="none" stroke="rgba(80,55,30,0.85)" strokeWidth="1.2" strokeLinecap="round"/>
            <path d="M 97 222 L 97 226" fill="none" stroke="rgba(80,55,30,0.85)" strokeWidth="1.2" strokeLinecap="round"/>

            {/* Светящиеся искры вокруг жезла — символ энергии */}
            <circle cx="80" cy="170" r="0.8" fill="rgba(255,215,0,0.7)"/>
            <circle cx="115" cy="190" r="0.8" fill="rgba(255,215,0,0.7)"/>
            <circle cx="78" cy="195" r="0.6" fill="rgba(255,215,0,0.6)"/>
            <circle cx="118" cy="150" r="0.6" fill="rgba(255,215,0,0.6)"/>
            <circle cx="85" cy="180" r="0.5" fill="rgba(255,215,0,0.5)"/>
            <circle cx="110" cy="175" r="0.5" fill="rgba(255,215,0,0.5)"/>
          </g>
        ) : (
          drawSuitObject(card.suit, 100, 175, 2.2, 0, accent)
        )}

        {/* Лучи — растительные, васнецовские */}
        {Array.from({ length: 16 }).map((_, i) => {
          const a = (i / 16) * Math.PI * 2
          return (
            <g key={i}>
              {i % 2 === 0 ? (
                <path d={`M ${100 + Math.cos(a) * 55} ${175 + Math.sin(a) * 55} L ${100 + Math.cos(a) * 70} ${175 + Math.sin(a) * 70}`} stroke="#b8860b" strokeWidth="1" opacity="0.4"/>
              ) : (
                <path d={`M ${100 + Math.cos(a) * 55} ${175 + Math.sin(a) * 55} Q ${100 + Math.cos(a) * 62} ${175 + Math.sin(a) * 62 - 2} ${100 + Math.cos(a) * 70} ${175 + Math.sin(a) * 70}`} stroke="rgba(255,215,0,0.5)" strokeWidth="0.6" fill="none"/>
              )}
            </g>
          )
        })}

        {/* Декоративные растительные завитки внизу */}
        <path d="M 35 240 Q 50 250 65 240 Q 60 246 50 244 Q 40 246 35 240 Z" fill="none" stroke="#b8860b" strokeWidth="0.5" opacity="0.5"/>
        <path d="M 135 240 Q 150 250 165 240 Q 160 246 150 244 Q 140 246 135 240 Z" fill="none" stroke="#b8860b" strokeWidth="0.5" opacity="0.5"/>

        {/* Цветы в завитках */}
        <g>
          <circle cx="45" cy="242" r="2" fill="rgba(180,30,30,0.6)" stroke="#991b1b" strokeWidth="0.3"/>
          <path d="M 43 242 Q 45 240 47 242 Q 45 244 43 242 Z" fill="rgba(255,180,180,0.5)"/>
          <path d="M 45 242 L 45 247" fill="none" stroke="#2d6e2d" strokeWidth="0.4"/>
        </g>
        <g>
          <circle cx="155" cy="242" r="2" fill="#ffd700" opacity="0.6" stroke="#b8860b" strokeWidth="0.3"/>
          <path d="M 153 242 Q 155 240 157 242 Q 155 244 153 242 Z" fill="rgba(255,235,150,0.6)"/>
          <path d="M 155 242 L 155 247" fill="none" stroke="#2d6e2d" strokeWidth="0.4"/>
        </g>
        <g>
          <circle cx="60" cy="248" r="1.5" fill="rgba(34,100,40,0.7)" stroke="#2d6e2d" strokeWidth="0.3"/>
          <path d="M 60 248 L 60 251" fill="none" stroke="#2d6e2d" strokeWidth="0.4"/>
        </g>
        <g>
          <circle cx="140" cy="248" r="1.5" fill="rgba(34,100,40,0.7)" stroke="#2d6e2d" strokeWidth="0.3"/>
          <path d="M 140 248 L 140 251" fill="none" stroke="#2d6e2d" strokeWidth="0.4"/>
        </g>
      </g>
    )
  }

  // === ВАСНЕЦОВСКИЕ ЧИСЛОВЫЕ КАРТЫ — детальные объекты масти ===
  if (["two","three","four","five","six","seven","eight","nine","ten"].includes(rank)) {
    const count = { two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10 }[rank]!
    const positions: Record<number, [number, number, number][]> = {
      2: [[100, 130, 0], [100, 220, 180]],
      3: [[100, 110, 0], [100, 175, 0], [100, 240, 180]],
      4: [[70, 120, 0], [130, 120, 0], [70, 220, 180], [130, 220, 180]],
      5: [[70, 110, 0], [130, 110, 0], [100, 165, 0], [70, 220, 180], [130, 220, 180]],
      6: [[70, 110, 0], [130, 110, 0], [70, 165, 0], [130, 165, 0], [70, 220, 180], [130, 220, 180]],
      7: [[70, 105, 0], [130, 105, 0], [100, 145, 0], [70, 185, 0], [130, 185, 0], [70, 230, 180], [130, 230, 180]],
      8: [[70, 105, 0], [130, 105, 0], [100, 145, 0], [70, 185, 0], [130, 185, 0], [100, 220, 0], [70, 235, 180], [130, 235, 180]],
      9: [[70, 105, 0], [130, 105, 0], [70, 150, 0], [130, 150, 0], [100, 175, 0], [70, 200, 180], [130, 200, 180], [70, 240, 180], [130, 240, 180]],
      10: [[70, 100, 0], [130, 100, 0], [70, 140, 0], [130, 140, 0], [70, 180, 0], [130, 180, 0], [70, 225, 180], [130, 225, 180], [100, 125, 0], [100, 200, 0]],
    }
    const pos = positions[count] || []

    return (
      <g>
        {/* Васнецовская арка с растительным орнаментом — детальная */}
        <path d="M 40 110 Q 100 75 160 110" fill="none" stroke="#b8860b" strokeWidth="1" opacity="0.5"/>
        <path d="M 45 108 Q 100 80 155 108" fill="none" stroke="rgba(255,215,0,0.3)" strokeWidth="0.5"/>

        {/* Цветы на арке */}
        <g>
          <circle cx="40" cy="110" r="3" fill="rgba(180,30,30,0.6)" stroke="#991b1b" strokeWidth="0.3"/>
          <path d="M 38 110 Q 40 107 42 110 Q 40 113 38 110 Z" fill="rgba(255,180,180,0.6)"/>
          <circle cx="40" cy="110" r="1" fill="#ffd700"/>
          {/* Лепестки */}
          <path d="M 37 109 Q 38 107 40 108" fill="none" stroke="rgba(180,30,30,0.5)" strokeWidth="0.3"/>
          <path d="M 40 108 Q 42 107 43 109" fill="none" stroke="rgba(180,30,30,0.5)" strokeWidth="0.3"/>
          <path d="M 37 111 Q 38 113 40 112" fill="none" stroke="rgba(180,30,30,0.5)" strokeWidth="0.3"/>
          <path d="M 40 112 Q 42 113 43 111" fill="none" stroke="rgba(180,30,30,0.5)" strokeWidth="0.3"/>
        </g>
        <g>
          <circle cx="160" cy="110" r="3" fill="#ffd700" opacity="0.6" stroke="#b8860b" strokeWidth="0.3"/>
          <path d="M 158 110 Q 160 107 162 110 Q 160 113 158 110 Z" fill="rgba(255,235,150,0.7)"/>
          <circle cx="160" cy="110" r="1" fill="rgba(120,80,40,0.7)"/>
          <path d="M 157 109 Q 158 107 160 108" fill="none" stroke="#b8860b" strokeWidth="0.3"/>
          <path d="M 160 108 Q 162 107 163 109" fill="none" stroke="#b8860b" strokeWidth="0.3"/>
          <path d="M 157 111 Q 158 113 160 112" fill="none" stroke="#b8860b" strokeWidth="0.3"/>
          <path d="M 160 112 Q 162 113 163 111" fill="none" stroke="#b8860b" strokeWidth="0.3"/>
        </g>

        {/* Листья на арке */}
        <path d="M 50 105 Q 55 95 60 105 Q 55 110 50 105 Z" fill="rgba(34,100,40,0.6)" stroke="#2d6e2d" strokeWidth="0.3"/>
        <path d="M 140 105 Q 145 95 150 105 Q 145 110 140 105 Z" fill="rgba(34,100,40,0.6)" stroke="#2d6e2d" strokeWidth="0.3"/>
        <path d="M 65 95 Q 70 88 75 95 Q 70 100 65 95 Z" fill="rgba(34,100,40,0.5)" stroke="#2d6e2d" strokeWidth="0.3"/>
        <path d="M 125 95 Q 130 88 135 95 Q 130 100 125 95 Z" fill="rgba(34,100,40,0.5)" stroke="#2d6e2d" strokeWidth="0.3"/>
        <path d="M 80 90 Q 85 84 90 90 Q 85 95 80 90 Z" fill="rgba(34,100,40,0.5)" stroke="#2d6e2d" strokeWidth="0.3"/>
        <path d="M 110 90 Q 115 84 120 90 Q 115 95 110 90 Z" fill="rgba(34,100,40,0.5)" stroke="#2d6e2d" strokeWidth="0.3"/>

        {/* Декоративные завитки */}
        <path d="M 35 115 Q 30 110 35 105 Q 38 110 35 115 Z" fill="none" stroke="#b8860b" strokeWidth="0.4" opacity="0.4"/>
        <path d="M 165 115 Q 170 110 165 105 Q 162 110 165 115 Z" fill="none" stroke="#b8860b" strokeWidth="0.4" opacity="0.4"/>

        {/* Объекты масти — детальные */}
        {pos.map(([x, y, rot], i) => (
          <g key={i}>
            {drawSuitObject(card.suit, x, y, 1.1, rot, accent)}
          </g>
        ))}

        {/* Васнецовская арка снизу — детальная */}
        <path d="M 40 245 Q 100 260 160 245" fill="none" stroke="#b8860b" strokeWidth="1" opacity="0.5"/>
        <path d="M 45 245 Q 100 258 155 245" fill="none" stroke="rgba(255,215,0,0.3)" strokeWidth="0.5"/>

        {/* Цветы на нижней арке */}
        <g>
          <circle cx="40" cy="245" r="2.5" fill="rgba(34,100,40,0.6)" stroke="#2d6e2d" strokeWidth="0.3"/>
          <path d="M 38 245 Q 40 243 42 245 Q 40 247 38 245 Z" fill="rgba(180,30,30,0.5)"/>
          <circle cx="40" cy="245" r="0.8" fill="#ffd700"/>
        </g>
        <g>
          <circle cx="160" cy="245" r="2.5" fill="rgba(180,30,30,0.6)" stroke="#991b1b" strokeWidth="0.3"/>
          <path d="M 158 245 Q 160 243 162 245 Q 160 247 158 245 Z" fill="rgba(255,180,180,0.5)"/>
          <circle cx="160" cy="245" r="0.8" fill="#ffd700"/>
        </g>

        {/* Центральная декоративная розетка для нечётных */}
        {count % 2 === 1 && (
          <g>
            <circle cx="100" cy="175" r="6" fill="none" stroke="#b8860b" strokeWidth="0.5" opacity="0.4"/>
            <circle cx="100" cy="175" r="3" fill="none" stroke="#ffd700" strokeWidth="0.4" opacity="0.4"/>
            <path d="M 96 175 Q 100 170 104 175 Q 100 180 96 175 Z" fill="none" stroke={accent} strokeWidth="0.4" opacity="0.5"/>
            <circle cx="100" cy="175" r="0.8" fill={accent} opacity="0.7"/>
          </g>
        )}
      </g>
    )
  }

  // === ВАСНЕЦОВСКИЕ ФИГУРНЫЕ КАРТЫ — детальные персонажи ===
  return (
    <g>
      {/* Фон-арка с растительным орнаментом */}
      <path d="M 30 110 Q 100 80 170 110" fill="none" stroke="#b8860b" strokeWidth="0.8" opacity="0.4"/>
      <path d="M 35 108 Q 100 85 165 108" fill="none" stroke="rgba(255,215,0,0.3)" strokeWidth="0.4"/>
      {/* Цветы на арке */}
      <circle cx="30" cy="110" r="2.5" fill="rgba(180,30,30,0.6)" stroke="#991b1b" strokeWidth="0.3"/>
      <circle cx="170" cy="110" r="2.5" fill="#ffd700" opacity="0.6" stroke="#b8860b" strokeWidth="0.3"/>

      {/* Детальная фигура персонажа */}
      {drawFigure(rank, card.suit, suitColor, accent)}

      {/* Буква ранга внизу — с золотым орнаментом */}
      <text x="100" y="245" fontSize="11" textAnchor="middle" fill={suitColor} opacity="0.5" fontWeight="bold" style={{ fontFamily: "var(--font-cinzel)" }}>
        {rank === "page" ? "П" : rank === "knight" ? "R" : rank === "queen" ? "Q" : "K"}
      </text>
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
