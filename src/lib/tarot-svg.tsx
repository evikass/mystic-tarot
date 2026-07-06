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
    // 0. ШУТ — в стиле Васнецова: сказочный юноша на краю пропасти, охра/бордо/золото
    "major-0": (
      <g>
        {/* === ВАСНЕЦОВСКИЙ ПЕЙЗАЖ === */}
        {/* Небо — тёплый градиент охры */}
        <rect x="14" y="42" width="172" height="100" fill="rgba(204,153,51,0.12)" rx="2"/>
        {/* Закатное солнце — крупное, васнецовское */}
        <circle cx="155" cy="75" r="14" fill="rgba(218,165,32,0.35)" stroke="#b8860b" strokeWidth="0.8"/>
        <circle cx="155" cy="75" r="10" fill="rgba(255,200,80,0.5)"/>
        {/* Лучи — растительные, как у Васнецова */}
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * Math.PI * 2
          return <line key={i} x1={155 + Math.cos(a) * 14} y1={75 + Math.sin(a) * 14} x2={155 + Math.cos(a) * 20} y2={75 + Math.sin(a) * 20} stroke="#b8860b" strokeWidth="0.6" opacity="0.5"/>
        })}
        {/* Горы — силуэты охрой */}
        <path d="M 14 200 L 50 140 L 90 200 Z" fill="rgba(139,90,43,0.25)" stroke="#8b5a2b" strokeWidth="0.6"/>
        <path d="M 80 200 L 120 130 L 170 200 Z" fill="rgba(139,90,43,0.3)" stroke="#8b5a2b" strokeWidth="0.6"/>
        {/* Утёс — тёмно-коричневый */}
        <path d="M 55 210 L 100 170 L 145 210 L 145 250 L 55 250 Z" fill="rgba(74,53,36,0.7)" stroke="#8b5a2b" strokeWidth="0.8"/>
        {/* Трава — изумрудная, васнецовская */}
        <path d="M 14 240 Q 40 235 60 240 Q 80 235 100 240 Q 120 235 140 240 Q 160 235 186 240 L 186 250 L 14 250 Z" fill="rgba(34,100,40,0.2)" stroke="#2d6e2d" strokeWidth="0.4"/>

        {/* === ФИГУРА ШУТА — в стиле сказочного богатыря === */}
        <g className="svg-breathe" style={{ transformOrigin: "100px 180px" }}>
          {/* Голова — молодой, русые кудри */}
          <ellipse cx="100" cy="108" rx="8" ry="9" fill="rgba(232,200,160,0.9)" stroke="#8b5a2b" strokeWidth="0.8"/>
          {/* Волосы — русые кудри */}
          <path d="M 92 105 Q 90 98 95 96 Q 100 93 105 96 Q 110 98 108 105" fill="rgba(139,90,43,0.6)" stroke="#8b5a2b" strokeWidth="0.4"/>
          {/* Колпак — красный с золотым узором (как у скоморохов) */}
          <path d="M 92 106 Q 100 88 108 106 L 106 110 L 94 110 Z" fill="rgba(153,27,27,0.85)" stroke="#b8860b" strokeWidth="0.8"/>
          {/* Узор на колпаке — растительный */}
          <path d="M 96 100 Q 98 97 100 99 Q 102 97 104 100" fill="none" stroke="#ffd700" strokeWidth="0.5"/>
          {/* Бубенец на кончике */}
          <circle cx="100" cy="90" r="2" fill="#ffd700" stroke="#b8860b" strokeWidth="0.4"/>
          {/* Тело — кафтан охровый с бордовой отделкой */}
          <path d="M 87 225 L 91 125 L 109 125 L 113 225 Z" fill="rgba(184,134,11,0.5)" stroke="#8b5a2b" strokeWidth="1"/>
          {/* Отделка кафтана — бордовая */}
          <path d="M 91 125 L 109 125 L 109 130 L 91 130 Z" fill="rgba(153,27,27,0.6)"/>
          <path d="M 87 220 L 113 220 L 113 225 L 87 225 Z" fill="rgba(153,27,27,0.6)"/>
          {/* Растительный узор на кафтане — васнецовский */}
          <path d="M 95 145 Q 100 142 105 145 Q 103 150 100 148 Q 97 150 95 145" fill="none" stroke="#ffd700" strokeWidth="0.5"/>
          <circle cx="100" cy="160" r="2.5" fill="rgba(255,215,0,0.6)" stroke="#b8860b" strokeWidth="0.4"/>
          <path d="M 95 175 Q 100 172 105 175 Q 103 180 100 178 Q 97 180 95 175" fill="none" stroke="#ffd700" strokeWidth="0.5"/>
          <path d="M 95 195 Q 100 192 105 195 Q 103 200 100 198 Q 97 200 95 195" fill="none" stroke="#ffd700" strokeWidth="0.5"/>
          {/* Ноги — в сапогах */}
          <path d="M 94 225 L 91 245" stroke="#8b5a2b" strokeWidth="3" strokeLinecap="round"/>
          <path d="M 106 225 L 111 240" stroke="#8b5a2b" strokeWidth="3" strokeLinecap="round"/>
        </g>
        {/* Посох — берестяной, с узелком */}
        <line x1="78" y1="225" x2="125" y2="110" stroke="#8b5a2b" strokeWidth="2" strokeLinecap="round"/>
        <ellipse cx="125" cy="110" rx="7" ry="5" fill="rgba(153,27,27,0.6)" stroke="#b8860b" strokeWidth="0.8"/>
        {/* Собачка — рыжая, как у Васнецова */}
        <g className="svg-drift" style={{ transformOrigin: "78px 238px" }}>
          <ellipse cx="78" cy="238" rx="6" ry="3" fill="rgba(184,134,11,0.6)" stroke="#8b5a2b" strokeWidth="0.6"/>
          <circle cx="72" cy="236" r="2.5" fill="rgba(184,134,11,0.7)" stroke="#8b5a2b" strokeWidth="0.5"/>
          <path d="M 70 234 L 69 231 M 72 233 L 72 230" stroke="#8b5a2b" strokeWidth="0.5"/>
        </g>
        {/* Розы — алые */}
        <circle cx="130" cy="245" r="3" fill="rgba(180,30,30,0.9)" stroke="#b8860b" strokeWidth="0.4"/>
        <circle cx="135" cy="248" r="2" fill="rgba(180,30,30,0.9)" stroke="#b8860b" strokeWidth="0.4"/>
        {/* Растительные стебли */}
        <path d="M 130 248 Q 128 252 126 250" fill="none" stroke="#2d6e2d" strokeWidth="0.6"/>
        <path d="M 135 250 Q 137 254 139 252" fill="none" stroke="#2d6e2d" strokeWidth="0.6"/>
      </g>
    ),

    // I. МАГ — в стиле Васнецова: волхв перед алтарём, золото/индиго/охра
    "major-1": (
      <g>
        {/* === ВАСНЕЦОВСКИЙ ФОН === */}
        {/* Арочный проём — как в храме */}
        <path d="M 30 250 L 30 70 Q 30 50 50 50 L 150 50 Q 170 50 170 70 L 170 250 Z" fill="rgba(26,20,50,0.3)" stroke="#b8860b" strokeWidth="0.6" opacity="0.5"/>
        {/* Лемниската — золотая, мерцает */}
        <path d="M 90 78 Q 95 71 100 78 Q 105 71 110 78 Q 105 85 100 78 Q 95 85 90 78 Z" fill="#ffd700" stroke="#fef3c7" strokeWidth="0.5" opacity="0.9"/>
        {/* Сияние — васнецовские лучи */}
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * Math.PI - Math.PI
          return <line key={i} x1={100} y1={68} x2={100 + Math.cos(a) * 12} y2={68 + Math.sin(a) * 12} stroke="#b8860b" strokeWidth="0.6" opacity="0.5"/>
        })}
        {/* === ФИГУРА МАГА-ВОЛХВА === */}
        <g className="svg-breathe" style={{ transformOrigin: "100px 160px" }}>
          {/* Голова с бородой — мудрый старец */}
          <circle cx="100" cy="98" r="8" fill="rgba(232,200,160,0.9)" stroke="#8b5a2b" strokeWidth="0.8"/>
          {/* Борода — длинная, белая с серебром */}
          <path d="M 94 103 Q 92 115 96 122 L 104 122 Q 108 115 106 103" fill="rgba(220,220,230,0.6)" stroke="#8b5a2b" strokeWidth="0.4"/>
          {/* Мантия — тёмно-синяя индиго с золотой каймой */}
          <path d="M 84 225 L 88 112 L 112 112 L 116 225 Z" fill="rgba(30,30,80,0.7)" stroke="#b8860b" strokeWidth="1"/>
          {/* Золотая кайма по краю */}
          <path d="M 88 112 L 112 112 L 112 118 L 88 118 Z" fill="rgba(255,215,0,0.3)" stroke="#b8860b" strokeWidth="0.4"/>
          <path d="M 84 220 L 116 220 L 116 225 L 84 225 Z" fill="rgba(255,215,0,0.2)" stroke="#b8860b" strokeWidth="0.4"/>
          {/* Растительный узор на мантии */}
          <path d="M 94 135 Q 100 132 106 135 Q 103 140 100 138 Q 97 140 94 135" fill="none" stroke="#ffd700" strokeWidth="0.4"/>
          <path d="M 94 155 Q 100 152 106 155 Q 103 160 100 158 Q 97 160 94 155" fill="none" stroke="#ffd700" strokeWidth="0.4"/>
          <path d="M 94 175 Q 100 172 106 175 Q 103 180 100 178 Q 97 180 94 175" fill="none" stroke="#ffd700" strokeWidth="0.4"/>
          {/* Жезл — берестяной, с золотым навершием */}
          <line x1="92" y1="135" x2="68" y2="80" stroke="#8b5a2b" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="68" y1="80" x2="68" y2="65" stroke="#8b5a2b" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="68" cy="60" r="5" fill="#ffd700" stroke="#b8860b" strokeWidth="0.8"/>
          {/* Рука вниз к столу */}
          <line x1="108" y1="135" x2="130" y2="170" stroke="rgba(232,200,160,0.9)" strokeWidth="2.5" strokeLinecap="round"/>
        </g>
        {/* Алтарь — деревянный, как у Васнецова */}
        <rect x="122" y="178" width="58" height="6" fill="rgba(74,53,36,0.8)" stroke="#8b5a2b" strokeWidth="0.8"/>
        <line x1="127" y1="184" x2="127" y2="215" stroke="#8b5a2b" strokeWidth="1.5"/>
        <line x1="175" y1="184" x2="175" y2="215" stroke="#8b5a2b" strokeWidth="1.5"/>
        {/* Стихии на алтаре — васнецовская палитра */}
        {/* Чаша — медная */}
        <g>
          <path d="M 136 168 L 139 178 L 149 178 L 152 168 Z" fill="rgba(184,115,51,0.7)" stroke="#b8860b" strokeWidth="0.8"/>
          <ellipse cx="144" cy="168" rx="5" ry="1.5" fill="rgba(100,150,200,0.4)" stroke="#b8860b" strokeWidth="0.4"/>
        </g>
        {/* Меч — стальной с золотой рукоятью */}
        <g>
          <line x1="160" y1="158" x2="160" y2="178" stroke="rgba(180,180,190,0.8)" strokeWidth="1.8"/>
          <line x1="155" y1="162" x2="165" y2="162" stroke="#ffd700" strokeWidth="1.2"/>
          <circle cx="160" cy="156" r="1.8" fill="#ffd700" stroke="#b8860b" strokeWidth="0.4"/>
        </g>
        {/* Пентакль — золотой */}
        <g>
          <circle cx="170" cy="173" r="4" fill="rgba(255,215,0,0.3)" stroke="#ffd700" strokeWidth="0.8"/>
          <path d="M 170 169 L 171.5 172 L 174 172 L 172 174 L 173 177 L 170 175 L 167 177 L 168 174 L 166 172 L 168.5 172 Z" fill="#ffd700"/>
        </g>
        {/* Растения — васнецовские травы */}
        <path d="M 28 245 L 33 240 L 30 235 L 36 230 L 33 225" fill="none" stroke="#2d6e2d" strokeWidth="0.8"/>
        <circle cx="33" cy="240" r="2" fill="rgba(180,30,30,0.8)"/>
        <circle cx="36" cy="230" r="2" fill="#ffd700"/>
        <path d="M 163 245 L 168 240 L 166 235 L 170 230" fill="none" stroke="#2d6e2d" strokeWidth="0.8"/>
        <circle cx="168" cy="240" r="2" fill="rgba(180,30,30,0.8)"/>
      </g>
    ),

    // II. ЖРИЦА — сказочная ведунья между резными столбами
    "major-2": (
      <g>
        {/* Резные деревянные колонны — васнецовские */}
        <rect x="28" y="60" width="22" height="190" fill="rgba(74,53,36,0.7)" stroke="#8b5a2b" strokeWidth="1"/>
        <rect x="24" y="55" width="30" height="8" fill="rgba(139,90,43,0.8)" stroke="#8b5a2b" strokeWidth="0.5"/>
        <rect x="24" y="248" width="30" height="8" fill="rgba(139,90,43,0.8)" stroke="#8b5a2b" strokeWidth="0.5"/>
        {/* Резной узор на левой колонне */}
        <path d="M 32 100 Q 39 95 46 100 Q 39 105 32 100" fill="none" stroke="#b8860b" strokeWidth="0.5"/>
        <path d="M 32 140 Q 39 135 46 140 Q 39 145 32 140" fill="none" stroke="#b8860b" strokeWidth="0.5"/>
        <path d="M 32 180 Q 39 175 46 180 Q 39 185 32 180" fill="none" stroke="#b8860b" strokeWidth="0.5"/>
        {/* Правая колонна */}
        <rect x="150" y="60" width="22" height="190" fill="rgba(139,90,43,0.5)" stroke="#ffd700" strokeWidth="1"/>
        <rect x="146" y="55" width="30" height="8" fill="rgba(184,134,11,0.8)" stroke="#ffd700" strokeWidth="0.5"/>
        <rect x="146" y="248" width="30" height="8" fill="rgba(184,134,11,0.8)" stroke="#ffd700" strokeWidth="0.5"/>
        <path d="M 154 100 Q 161 95 168 100 Q 161 105 154 100" fill="none" stroke="#ffd700" strokeWidth="0.5"/>
        <path d="M 154 140 Q 161 135 168 140 Q 161 145 154 140" fill="none" stroke="#ffd700" strokeWidth="0.5"/>
        {/* Завеса между колоннами с растительным узором */}
        <path d="M 50 60 Q 100 65 150 60 L 150 250 Q 100 245 50 250 Z" fill="rgba(30,30,80,0.2)" stroke="#b8860b" strokeWidth="0.6"/>
        <path d="M 70 100 Q 80 95 90 100 Q 100 95 110 100 Q 120 95 130 100" fill="none" stroke="#ffd700" strokeWidth="0.4" opacity="0.5"/>
        <path d="M 70 150 Q 80 145 90 150 Q 100 145 110 150 Q 120 145 130 150" fill="none" stroke="#ffd700" strokeWidth="0.4" opacity="0.5"/>
        {/* Фигура Жрицы — сказочная ведунья */}
        <g className="svg-breathe" style={{ transformOrigin: "100px 160px" }}>
          {/* Голова с короной-полумесяцем */}
          <ellipse cx="100" cy="105" rx="8" ry="9" fill="rgba(232,200,160,0.9)" stroke="#8b5a2b" strokeWidth="0.8"/>
          {/* Длинные тёмные волосы */}
          <path d="M 92 108 Q 88 130 90 150" fill="none" stroke="rgba(60,30,20,0.6)" strokeWidth="2"/>
          <path d="M 108 108 Q 112 130 110 150" fill="none" stroke="rgba(60,30,20,0.6)" strokeWidth="2"/>
          {/* Корона-полумесяц */}
          <path d="M 92 98 Q 100 90 108 98" fill="none" stroke="#ffd700" strokeWidth="1.2"/>
          <circle cx="100" cy="93" r="2" fill="rgba(196,181,253,0.7)" stroke="#ffd700" strokeWidth="0.4"/>
          {/* Мантия — тёмно-синяя с золотым узором */}
          <path d="M 82 230 L 86 115 L 114 115 L 118 230 Z" fill="rgba(30,30,80,0.6)" stroke="#b8860b" strokeWidth="0.8"/>
          {/* Золотой растительный узор */}
          <path d="M 92 140 Q 100 136 108 140 Q 104 145 100 143 Q 96 145 92 140" fill="none" stroke="#ffd700" strokeWidth="0.4"/>
          <path d="M 92 170 Q 100 166 108 170 Q 104 175 100 173 Q 96 175 92 170" fill="none" stroke="#ffd700" strokeWidth="0.4"/>
          <path d="M 92 200 Q 100 196 108 200 Q 104 205 100 203 Q 96 205 92 200" fill="none" stroke="#ffd700" strokeWidth="0.4"/>
        </g>
        {/* Свиток на коленях */}
        <rect x="88" y="215" width="24" height="6" fill="rgba(184,134,11,0.5)" stroke="#b8860b" strokeWidth="0.4" rx="2"/>
        {/* Крест на груди */}
        <line x1="100" y1="130" x2="100" y2="145" stroke="#ffd700" strokeWidth="0.8"/>
        <line x1="96" y1="137" x2="104" y2="137" stroke="#ffd700" strokeWidth="0.8"/>
        {/* Гранаты на завесе */}
        <circle cx="75" cy="120" r="2" fill="rgba(153,27,27,0.6)" stroke="#b8860b" strokeWidth="0.3"/>
        <circle cx="125" cy="120" r="2" fill="rgba(153,27,27,0.6)" stroke="#b8860b" strokeWidth="0.3"/>
        <circle cx="100" cy="180" r="2" fill="rgba(153,27,27,0.6)" stroke="#b8860b" strokeWidth="0.3"/>
      </g>
    ),

    // III. ИМПЕРАТРИЦА — сказочная царица на лесном троне
    "major-3": (
      <g>
        {/* Лесной фон — васнецовские деревья */}
        <rect x="14" y="50" width="172" height="200" fill="rgba(34,80,34,0.08)" rx="2"/>
        {/* Деревья силуэтами */}
        <path d="M 20 250 L 20 100 L 25 90 L 30 100 L 30 250 Z" fill="rgba(34,80,34,0.15)" stroke="#2d6e2d" strokeWidth="0.4"/>
        <path d="M 170 250 L 170 90 L 175 80 L 180 90 L 180 250 Z" fill="rgba(34,80,34,0.15)" stroke="#2d6e2d" strokeWidth="0.4"/>
        {/* Пшеничное поле внизу */}
        <path d="M 14 235 Q 50 230 100 235 Q 150 230 186 235 L 186 250 L 14 250 Z" fill="rgba(184,134,11,0.2)" stroke="#b8860b" strokeWidth="0.3"/>
        {/* Колосья */}
        {Array.from({length: 8}).map((_, i) => (
          <line key={i} x1={20 + i * 22} y1="235" x2={20 + i * 22} y2="225" stroke="#b8860b" strokeWidth="0.5"/>
        ))}
        {/* Трон — деревянный, резной */}
        <path d="M 75 230 L 75 160 L 125 160 L 125 230 Z" fill="rgba(74,53,36,0.6)" stroke="#8b5a2b" strokeWidth="0.8"/>
        <path d="M 72 160 L 128 160 L 128 145 L 72 145 Z" fill="rgba(139,90,43,0.7)" stroke="#8b5a2b" strokeWidth="0.5"/>
        {/* Резной узор на троне */}
        <path d="M 80 180 Q 90 175 100 180 Q 110 175 120 180" fill="none" stroke="#ffd700" strokeWidth="0.4"/>
        <path d="M 80 200 Q 90 195 100 200 Q 110 195 120 200" fill="none" stroke="#ffd700" strokeWidth="0.4"/>
        {/* Фигура Царицы */}
        <g className="svg-breathe" style={{ transformOrigin: "100px 180px" }}>
          {/* Голова с короной */}
          <ellipse cx="100" cy="100" rx="8" ry="9" fill="rgba(232,200,160,0.9)" stroke="#8b5a2b" strokeWidth="0.8"/>
          {/* Золотая корона с зубцами */}
          <path d="M 91 95 L 91 88 L 95 92 L 100 85 L 105 92 L 109 88 L 109 95 Z" fill="rgba(255,215,0,0.6)" stroke="#b8860b" strokeWidth="0.5"/>
          <circle cx="100" cy="86" r="1.5" fill="rgba(180,30,30,0.7)"/>
          {/* Русые волосы */}
          <path d="M 92 105 Q 88 120 90 135" fill="none" stroke="rgba(139,90,43,0.5)" strokeWidth="2"/>
          <path d="M 108 105 Q 112 120 110 135" fill="none" stroke="rgba(139,90,43,0.5)" strokeWidth="2"/>
          {/* Платье — бордовое с золотым узором */}
          <path d="M 80 225 L 84 115 L 116 115 L 120 225 Z" fill="rgba(120,20,20,0.5)" stroke="#b8860b" strokeWidth="0.8"/>
          {/* Золотая кайма */}
          <path d="M 84 115 L 116 115 L 116 120 L 84 120 Z" fill="rgba(255,215,0,0.3)" stroke="#b8860b" strokeWidth="0.3"/>
          {/* Растительный узор */}
          <path d="M 90 140 Q 100 135 110 140 Q 105 147 100 144 Q 95 147 90 140" fill="none" stroke="#ffd700" strokeWidth="0.4"/>
          <path d="M 90 170 Q 100 165 110 170 Q 105 177 100 174 Q 95 177 90 170" fill="none" stroke="#ffd700" strokeWidth="0.4"/>
          <path d="M 90 200 Q 100 195 110 200 Q 105 207 100 204 Q 95 207 90 200" fill="none" stroke="#ffd700" strokeWidth="0.4"/>
        </g>
        {/* Скипетр в руке */}
        <line x1="120" y1="160" x2="135" y2="130" stroke="#8b5a2b" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="135" cy="128" r="3" fill="#ffd700" stroke="#b8860b" strokeWidth="0.5"/>
        {/* Щит с орлом у ног */}
        <ellipse cx="75" cy="240" rx="8" ry="6" fill="rgba(184,134,11,0.4)" stroke="#b8860b" strokeWidth="0.5"/>
        <text x="75" y="243" fontSize="5" textAnchor="middle" fill="#b8860b">🦅</text>
      </g>
    ),

    // IV. ИМПЕРАТОР — сказочный царь-богатырь на каменном троне
    "major-4": (
      <g>
        {/* Каменный фон — крепостная стена */}
        <rect x="14" y="50" width="172" height="200" fill="rgba(100,80,60,0.08)" rx="2"/>
        {/* Каменные блоки */}
        {Array.from({length: 3}).map((_, row) => (
          Array.from({length: 5}).map((_, col) => (
            <rect key={`${row}-${col}`} x={20 + col * 33} y={60 + row * 25} width="30" height="22" fill="none" stroke="rgba(100,80,60,0.2)" strokeWidth="0.4"/>
          ))
        ))}
        {/* Трон — каменный с золотыми подлокотниками */}
        <path d="M 72 235 L 72 140 L 128 140 L 128 235 Z" fill="rgba(80,60,45,0.6)" stroke="#8b5a2b" strokeWidth="0.8"/>
        <path d="M 68 140 L 132 140 L 132 120 L 68 120 Z" fill="rgba(139,90,43,0.5)" stroke="#8b5a2b" strokeWidth="0.5"/>
        {/* Орнамент на спинке трона */}
        <path d="M 80 160 Q 100 155 120 160" fill="none" stroke="#ffd700" strokeWidth="0.4"/>
        <path d="M 80 190 Q 100 185 120 190" fill="none" stroke="#ffd700" strokeWidth="0.4"/>
        {/* Фигура Царя-богатыря */}
        <g className="svg-breathe" style={{ transformOrigin: "100px 180px" }}>
          {/* Голова с бородой */}
          <ellipse cx="100" cy="95" rx="8" ry="9" fill="rgba(232,200,160,0.9)" stroke="#8b5a2b" strokeWidth="0.8"/>
          {/* Борода — русая */}
          <path d="M 93 100 Q 90 115 95 120 L 105 120 Q 110 115 107 100" fill="rgba(139,90,43,0.5)" stroke="#8b5a2b" strokeWidth="0.3"/>
          {/* Шапка Мономаха — золотая с меховой опушкой */}
          <path d="M 90 90 Q 100 75 110 90 L 108 93 L 92 93 Z" fill="rgba(255,215,0,0.4)" stroke="#b8860b" strokeWidth="0.6"/>
          <path d="M 90 90 L 110 90 L 110 93 L 90 93 Z" fill="rgba(180,30,30,0.4)"/>
          <circle cx="100" cy="80" r="2" fill="#ffd700" stroke="#b8860b" strokeWidth="0.3"/>
          {/* Кольчуга/доспех */}
          <path d="M 82 225 L 86 112 L 114 112 L 118 225 Z" fill="rgba(60,60,70,0.5)" stroke="#8b5a2b" strokeWidth="0.8"/>
          {/* Чешуйчатый узор кольчуги */}
          {Array.from({length: 4}).map((_, row) => (
            Array.from({length: 3}).map((_, col) => (
              <path key={`m-${row}-${col}`} d={`M ${90 + col * 7} ${130 + row * 20} q 3 -2 6 0 q 3 -2 6 0`} fill="none" stroke="rgba(180,180,190,0.3)" strokeWidth="0.3"/>
            ))
          ))}
          {/* Красный плащ за спиной */}
          <path d="M 82 225 L 78 120 L 72 225 Z" fill="rgba(120,20,20,0.3)" stroke="#8b5a2b" strokeWidth="0.4"/>
          <path d="M 118 225 L 122 120 L 128 225 Z" fill="rgba(120,20,20,0.3)" stroke="#8b5a2b" strokeWidth="0.4"/>
        </g>
        {/* Скипетр */}
        <line x1="120" y1="160" x2="140" y2="125" stroke="#8b5a2b" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="140" cy="122" r="3.5" fill="#ffd700" stroke="#b8860b" strokeWidth="0.5"/>
        {/* Держава */}
        <circle cx="78" cy="160" r="4" fill="rgba(255,215,0,0.3)" stroke="#b8860b" strokeWidth="0.5"/>
        <line x1="78" y1="156" x2="78" y2="152" stroke="#ffd700" strokeWidth="0.8"/>
        <circle cx="78" cy="150" r="1.5" fill="#ffd700"/>
      </g>
    ),

    // V. ИЕРОФАНТ — сказочный патриарх с золотым посохом
    "major-5": (
      <g>
        {/* Храмовый фон — арка */}
        <path d="M 30 250 L 30 80 Q 30 55 55 55 L 145 55 Q 170 55 170 80 L 170 250 Z" fill="rgba(30,20,50,0.15)" stroke="#b8860b" strokeWidth="0.5" opacity="0.4"/>
        {/* Купол — луковичный */}
        <path d="M 85 55 Q 85 35 100 30 Q 115 35 115 55" fill="rgba(180,30,30,0.2)" stroke="#b8860b" strokeWidth="0.5"/>
        <line x1="100" y1="30" x2="100" y2="22" stroke="#ffd700" strokeWidth="0.8"/>
        <circle cx="100" cy="22" r="1.5" fill="#ffd700"/>
        {/* Два монаха-помощника по бокам */}
        <ellipse cx="55" cy="130" rx="7" ry="8" fill="rgba(232,200,160,0.7)" stroke="#8b5a2b" strokeWidth="0.5"/>
        <path d="M 48 200 L 48 140 L 62 140 L 62 200 Z" fill="rgba(60,40,20,0.4)" stroke="#8b5a2b" strokeWidth="0.5"/>
        <ellipse cx="145" cy="130" rx="7" ry="8" fill="rgba(232,200,160,0.7)" stroke="#8b5a2b" strokeWidth="0.5"/>
        <path d="M 138 200 L 138 140 L 152 140 L 152 200 Z" fill="rgba(60,40,20,0.4)" stroke="#8b5a2b" strokeWidth="0.5"/>
        {/* Фигура Патриарха — в центре */}
        <g className="svg-breathe" style={{ transformOrigin: "100px 170px" }}>
          {/* Голова с бородой — мудрый старец */}
          <ellipse cx="100" cy="95" rx="8" ry="9" fill="rgba(232,200,160,0.9)" stroke="#8b5a2b" strokeWidth="0.8"/>
          {/* Седая борода */}
          <path d="M 93 100 Q 90 118 96 125 L 104 125 Q 110 118 107 100" fill="rgba(220,220,225,0.5)" stroke="#8b5a2b" strokeWidth="0.3"/>
          {/* Митра — золотая, резная */}
          <path d="M 90 88 L 100 70 L 110 88 Z" fill="rgba(255,215,0,0.4)" stroke="#b8860b" strokeWidth="0.6"/>
          <path d="M 93 82 Q 100 78 107 82" fill="none" stroke="#ffd700" strokeWidth="0.4"/>
          {/* Облачение — золотое с растительным узором */}
          <path d="M 80 230 L 84 110 L 116 110 L 120 230 Z" fill="rgba(184,134,11,0.4)" stroke="#b8860b" strokeWidth="0.8"/>
          {/* Кайма */}
          <path d="M 84 110 L 116 110 L 116 115 L 84 115 Z" fill="rgba(255,215,0,0.3)"/>
          <path d="M 80 225 L 120 225 L 120 230 L 80 230 Z" fill="rgba(255,215,0,0.3)"/>
          {/* Узоры */}
          <path d="M 90 140 Q 100 135 110 140 Q 105 147 100 144 Q 95 147 90 140" fill="none" stroke="#ffd700" strokeWidth="0.4"/>
          <path d="M 90 170 Q 100 165 110 170 Q 105 177 100 174 Q 95 177 90 170" fill="none" stroke="#ffd700" strokeWidth="0.4"/>
          <path d="M 90 200 Q 100 195 110 200 Q 105 207 100 204 Q 95 207 90 200" fill="none" stroke="#ffd700" strokeWidth="0.4"/>
        </g>
        {/* Посох — золотой с крестом */}
        <line x1="70" y1="220" x2="70" y2="80" stroke="#8b5a2b" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="70" cy="75" r="5" fill="rgba(255,215,0,0.4)" stroke="#b8860b" strokeWidth="0.6"/>
        <line x1="70" y1="70" x2="70" y2="80" stroke="#ffd700" strokeWidth="1"/>
        <line x1="66" y1="74" x2="74" y2="74" stroke="#ffd700" strokeWidth="1"/>
      </g>
    ),

    // VI. ВЛЮБЛЁННЫЕ — сказочные юноша и девица в саду
    "major-6": (
      <g>
        {/* Сад — васнецовские деревья */}
        <rect x="14" y="50" width="172" height="200" fill="rgba(34,80,34,0.06)" rx="2"/>
        {/* Деревья */}
        <circle cx="30" cy="90" r="15" fill="rgba(34,100,40,0.12)" stroke="#2d6e2d" strokeWidth="0.4"/>
        <circle cx="170" cy="90" r="15" fill="rgba(34,100,40,0.12)" stroke="#2d6e2d" strokeWidth="0.4"/>
        {/* Ангел/солнце сверху */}
        <circle cx="100" cy="65" r="8" fill="rgba(255,215,0,0.3)" stroke="#b8860b" strokeWidth="0.5"/>
        {Array.from({length: 8}).map((_, i) => {
          const a = (i / 8) * Math.PI * 2
          return <line key={i} x1={100 + Math.cos(a) * 8} y1={65 + Math.sin(a) * 8} x2={100 + Math.cos(a) * 13} y2={65 + Math.sin(a) * 13} stroke="#b8860b" strokeWidth="0.5" opacity="0.5"/>
        })}
        {/* Крылья ангела */}
        <path d="M 92 65 Q 80 60 75 70 Q 82 68 92 70" fill="rgba(255,255,255,0.2)" stroke="#b8860b" strokeWidth="0.4"/>
        <path d="M 108 65 Q 120 60 125 70 Q 118 68 108 70" fill="rgba(255,255,255,0.2)" stroke="#b8860b" strokeWidth="0.4"/>
        {/* Юноша слева — в охровой рубахе */}
        <g>
          <ellipse cx="75" cy="140" rx="7" ry="8" fill="rgba(232,200,160,0.9)" stroke="#8b5a2b" strokeWidth="0.6"/>
          {/* Русые волосы */}
          <path d="M 68 138 Q 68 130 75 128 Q 82 130 82 138" fill="rgba(139,90,43,0.5)" stroke="#8b5a2b" strokeWidth="0.3"/>
          {/* Рубаха охровая */}
          <path d="M 65 230 L 68 148 L 82 148 L 85 230 Z" fill="rgba(184,134,11,0.4)" stroke="#8b5a2b" strokeWidth="0.6"/>
          {/* Узоры */}
          <path d="M 70 170 Q 75 167 80 170 Q 77 175 75 173 Q 73 175 70 170" fill="none" stroke="#ffd700" strokeWidth="0.3"/>
          <path d="M 70 200 Q 75 197 80 200 Q 77 205 75 203 Q 73 205 70 200" fill="none" stroke="#ffd700" strokeWidth="0.3"/>
        </g>
        {/* Девица справа — в бордовом сарафане */}
        <g>
          <ellipse cx="125" cy="140" rx="7" ry="8" fill="rgba(232,200,160,0.9)" stroke="#8b5a2b" strokeWidth="0.6"/>
          {/* Русая коса */}
          <path d="M 118 138 Q 115 150 118 165" fill="none" stroke="rgba(139,90,43,0.5)" strokeWidth="2"/>
          <path d="M 132 138 Q 135 150 132 165" fill="none" stroke="rgba(139,90,43,0.5)" strokeWidth="2"/>
          {/* Сарафан бордовый с золотом */}
          <path d="M 115 230 L 118 148 L 132 148 L 135 230 Z" fill="rgba(120,20,20,0.4)" stroke="#b8860b" strokeWidth="0.6"/>
          <path d="M 120 170 Q 125 167 130 170 Q 127 175 125 173 Q 123 175 120 170" fill="none" stroke="#ffd700" strokeWidth="0.3"/>
          <path d="M 120 200 Q 125 197 130 200 Q 127 205 125 203 Q 123 205 120 200" fill="none" stroke="#ffd700" strokeWidth="0.3"/>
        </g>
        {/* Цветы между ними */}
        <circle cx="100" cy="220" r="2.5" fill="rgba(180,30,30,0.8)" stroke="#b8860b" strokeWidth="0.3"/>
        <circle cx="96" cy="225" r="1.5" fill="#ffd700" stroke="#b8860b" strokeWidth="0.3"/>
        <circle cx="104" cy="225" r="1.5" fill="#ffd700" stroke="#b8860b" strokeWidth="0.3"/>
        <line x1="100" y1="222" x2="100" y2="235" stroke="#2d6e2d" strokeWidth="0.5"/>
      </g>
    ),

    // VII. КОЛЕСНИЦА — сказочный богатырь в золотой колеснице
    "major-7": (
      <g>
        {/* Небо — охра */}
        <rect x="14" y="42" width="172" height="110" fill="rgba(204,153,51,0.08)" rx="2"/>
        {/* Город на горизонте — васнецовские купола */}
        <path d="M 40 150 L 40 130 Q 40 120 45 120 Q 50 120 50 130 L 50 150" fill="rgba(120,20,20,0.15)" stroke="#b8860b" strokeWidth="0.4"/>
        <path d="M 150 150 L 150 125 Q 150 115 155 115 Q 160 115 160 125 L 160 150" fill="rgba(120,20,20,0.15)" stroke="#b8860b" strokeWidth="0.4"/>
        {/* Земля */}
        <path d="M 14 200 Q 100 195 186 200 L 186 250 L 14 250 Z" fill="rgba(139,90,43,0.12)" stroke="#8b5a2b" strokeWidth="0.3"/>
        {/* Колесница — деревянная, резная */}
        <rect x="70" y="170" width="60" height="35" fill="rgba(139,90,43,0.5)" stroke="#8b5a2b" strokeWidth="0.8" rx="3"/>
        {/* Резной узор на колеснице */}
        <path d="M 78 180 Q 88 175 100 180 Q 112 175 122 180" fill="none" stroke="#ffd700" strokeWidth="0.4"/>
        <path d="M 78 195 Q 88 190 100 195 Q 112 190 122 195" fill="none" stroke="#ffd700" strokeWidth="0.4"/>
        {/* Колёса */}
        <circle cx="78" cy="210" r="10" fill="none" stroke="#8b5a2b" strokeWidth="1.5"/>
        <circle cx="78" cy="210" r="5" fill="none" stroke="#8b5a2b" strokeWidth="0.6"/>
        <circle cx="122" cy="210" r="10" fill="none" stroke="#8b5a2b" strokeWidth="1.5"/>
        <circle cx="122" cy="210" r="5" fill="none" stroke="#8b5a2b" strokeWidth="0.6"/>
        {/* Спицы колёс */}
        {[0, 60, 120, 180, 240, 300].map(deg => {
          const rad = deg * Math.PI / 180
          return (
            <g key={deg}>
              <line x1={78 + Math.cos(rad) * 5} y1={210 + Math.sin(rad) * 5} x2={78 + Math.cos(rad) * 10} y2={210 + Math.sin(rad) * 10} stroke="#8b5a2b" strokeWidth="0.5"/>
              <line x1={122 + Math.cos(rad) * 5} y1={210 + Math.sin(rad) * 5} x2={122 + Math.cos(rad) * 10} y2={210 + Math.sin(rad) * 10} stroke="#8b5a2b" strokeWidth="0.5"/>
            </g>
          )
        })}
        {/* Фигура богатыря в колеснице */}
        <g className="svg-breathe" style={{ transformOrigin: "100px 150px" }}>
          {/* Голова с шлемом */}
          <ellipse cx="100" cy="130" rx="7" ry="8" fill="rgba(232,200,160,0.9)" stroke="#8b5a2b" strokeWidth="0.6"/>
          {/* Шлем — золотой, остроконечный */}
          <path d="M 93 127 L 100 110 L 107 127" fill="rgba(255,215,0,0.3)" stroke="#b8860b" strokeWidth="0.5"/>
          <circle cx="100" cy="110" r="1.5" fill="#ffd700"/>
          {/* Доспех */}
          <path d="M 88 168 L 90 138 L 110 138 L 112 168 Z" fill="rgba(60,60,70,0.5)" stroke="#8b5a2b" strokeWidth="0.6"/>
          {/* Красный плащ */}
          <path d="M 88 168 L 82 135 L 80 168 Z" fill="rgba(120,20,20,0.4)"/>
          <path d="M 112 168 L 118 135 L 120 168 Z" fill="rgba(120,20,20,0.4)"/>
        </g>
        {/* Два коня — силуэты по бокам */}
        {/* Левый конь — тёмный */}
        <g>
          <ellipse cx="45" cy="185" rx="12" ry="6" fill="rgba(60,40,30,0.4)" stroke="#8b5a2b" strokeWidth="0.5"/>
          <path d="M 35 180 L 30 165 L 33 185" fill="rgba(60,40,30,0.4)" stroke="#8b5a2b" strokeWidth="0.4"/>
          <line x1="50" y1="190" x2="55" y2="195" stroke="#8b5a2b" strokeWidth="0.6"/>
          <line x1="40" y1="190" x2="38" y2="195" stroke="#8b5a2b" strokeWidth="0.6"/>
        </g>
        {/* Правый конь — светлый */}
        <g>
          <ellipse cx="155" cy="185" rx="12" ry="6" fill="rgba(220,200,160,0.3)" stroke="#8b5a2b" strokeWidth="0.5"/>
          <path d="M 165 180 L 170 165 L 167 185" fill="rgba(220,200,160,0.3)" stroke="#8b5a2b" strokeWidth="0.4"/>
          <line x1="150" y1="190" x2="145" y2="195" stroke="#8b5a2b" strokeWidth="0.6"/>
          <line x1="160" y1="190" x2="162" y2="195" stroke="#8b5a2b" strokeWidth="0.6"/>
        </g>
        {/* Поводья */}
        <line x1="55" y1="175" x2="80" y2="165" stroke="#8b5a2b" strokeWidth="0.6"/>
        <line x1="145" y1="175" x2="120" y2="165" stroke="#8b5a2b" strokeWidth="0.6"/>
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
