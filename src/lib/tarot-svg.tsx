import { TarotCard, suitInfo } from "./tarot-data"

interface CardSVGProps {
  card: TarotCard
  isReversed?: boolean
  width?: number
  height?: number
  className?: string
}

/**
 * Получить символ для числовых карт младших арканов.
 */
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
    case "knight": return "Р"
    case "queen": return "Кор"
    case "king": return "Кор"
    default: return ""
  }
}

/**
 * Получить символ-эмблему масти (алхимический символ стихии)
 */
function getSuitSymbol(suit: string): string {
  switch (suit) {
    case "wands": return "🜂" // Огонь
    case "cups": return "🜄" // Вода
    case "swords": return "🜁" // Воздух
    case "pentacles": return "🜃" // Земля
    default: return "✦"
  }
}

/**
 * Получить ключ-символ для старших арканов (римская цифра + эзотерический знак).
 */
function getMajorSymbol(number: number): { roman: string; symbol: string } {
  const symbols: Record<number, string> = {
    0: "☉", // Шут - Солнце/новый цикл
    1: "☿", // Маг - Меркурий
    2: "☾", // Жрица - Луна
    3: "♀", // Императрица - Венера
    4: "♂", // Император - Марс
    5: "♃", // Иерофант - Юпитер (традиционно Телец)
    6: "♊", // Влюблённые - Близнецы
    7: "♋", // Колесница - Рак
    8: "♌", // Сила - Лев
    9: "♍", // Отшельник - Дева
    10: "♃", // Колесо Фортуны - Юпитер
    11: "♎", // Справедливость - Весы
    12: "♆", // Повешенный - Нептун
    13: "♏", // Смерть - Скорпион
    14: "♐", // Умеренность - Стрелец
    15: "♑", // Дьявол - Козерог
    16: "♂", // Башня - Марс
    17: "♒", // Звезда - Водолей
    18: "♓", // Луна - Рыбы
    19: "☉", // Солнце
    20: "♇", // Суд - Плутон
    21: "♄", // Мир - Сатурн
  }
  const romans: Record<number, string> = {
    0: "0", 1: "I", 2: "II", 3: "III", 4: "IV", 5: "V", 6: "VI", 7: "VII",
    8: "VIII", 9: "IX", 10: "X", 11: "XI", 12: "XII", 13: "XIII", 14: "XIV",
    15: "XV", 16: "XVI", 17: "XVII", 18: "XVIII", 19: "XIX", 20: "XX", 21: "XXI"
  }
  return { roman: romans[number] || "", symbol: symbols[number] || "✦" }
}

/**
 * SVG для каждого старшего аркана — стилизованная иллюстрация
 */
function MajorArcanaArt({ card }: { card: TarotCard }) {
  const map: Record<string, JSX.Element> = {
    "major-0": (
      // Шут: фигура на краю пропасти с посохом и узелком
      <g>
        <path d="M 70 200 Q 100 140 130 200 L 130 240 L 70 240 Z" fill="rgba(125,211,252,0.3)" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="100" cy="120" r="14" fill="rgba(255,255,255,0.4)" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M 80 160 L 75 200" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M 120 160 L 125 200" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M 100 200 L 95 240" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M 100 200 L 105 240" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        {/* Посох */}
        <line x1="140" y1="130" x2="160" y2="220" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="158" cy="125" r="5" fill="currentColor" opacity="0.7"/>
        {/* Узелок */}
        <ellipse cx="80" cy="180" rx="10" ry="8" fill="rgba(125,211,252,0.3)" stroke="currentColor" strokeWidth="1"/>
        {/* Солнце над плечом */}
        <circle cx="160" cy="100" r="8" fill="rgba(251,191,36,0.7)"/>
        {/* Маленькая собачка */}
        <path d="M 70 240 Q 60 235 65 245 L 70 245 Z" fill="currentColor" opacity="0.5"/>
      </g>
    ),
    "major-1": (
      // Маг: фигура перед столом с 4 символами стихий
      <g>
        {/* Маг */}
        <path d="M 90 220 L 95 130 L 105 130 L 110 220 Z" fill="rgba(251,191,36,0.25)" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="100" cy="115" r="11" fill="rgba(255,255,255,0.4)" stroke="currentColor" strokeWidth="1.5"/>
        {/* Левая рука с жезлом вверх */}
        <line x1="92" y1="150" x2="70" y2="100" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="70" y1="100" x2="70" y2="80" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="70" cy="75" r="5" fill="currentColor" opacity="0.8"/>
        {/* Правая рука вниз к столу */}
        <line x1="108" y1="150" x2="130" y2="180" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        {/* Стол */}
        <line x1="125" y1="190" x2="175" y2="190" stroke="currentColor" strokeWidth="2"/>
        <line x1="130" y1="190" x2="130" y2="210" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="170" y1="190" x2="170" y2="210" stroke="currentColor" strokeWidth="1.5"/>
        {/* Чаша */}
        <path d="M 138 178 L 142 188 L 152 188 L 156 178 Z" fill="rgba(96,165,250,0.5)" stroke="currentColor" strokeWidth="1"/>
        {/* Меч */}
        <line x1="165" y1="170" x2="165" y2="190" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="161" y1="172" x2="169" y2="172" stroke="currentColor" strokeWidth="1.5"/>
        {/* Пентакль */}
        <circle cx="172" cy="184" r="3" fill="none" stroke="currentColor" strokeWidth="1"/>
        {/* Бесконечность над головой */}
        <path d="M 92 95 Q 96 90 100 95 Q 104 90 108 95 Q 104 100 100 95 Q 96 100 92 95 Z" fill="currentColor" opacity="0.8"/>
      </g>
    ),
    "major-2": (
      // Жрица: фигура между колонн с луной у ног
      <g>
        {/* Колонны */}
        <rect x="60" y="80" width="12" height="160" fill="rgba(255,255,255,0.15)" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="128" y="80" width="12" height="160" fill="rgba(255,255,255,0.15)" stroke="currentColor" strokeWidth="1.5"/>
        {/* Капители */}
        <rect x="56" y="76" width="20" height="6" fill="currentColor" opacity="0.6"/>
        <rect x="124" y="76" width="20" height="6" fill="currentColor" opacity="0.6"/>
        {/* Жрица */}
        <path d="M 90 240 L 95 130 Q 100 120 105 130 L 110 240 Z" fill="rgba(167,139,250,0.3)" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="100" cy="115" r="11" fill="rgba(255,255,255,0.4)" stroke="currentColor" strokeWidth="1.5"/>
        {/* Свиток в руках */}
        <rect x="88" y="165" width="24" height="14" fill="rgba(255,255,255,0.5)" stroke="currentColor" strokeWidth="1"/>
        <text x="100" y="176" fontSize="6" textAnchor="middle" fill="currentColor" opacity="0.6">TORA</text>
        {/* Полумесяц у ног */}
        <path d="M 90 248 A 12 12 0 1 0 110 248 A 8 8 0 1 1 90 248 Z" fill="rgba(196,181,253,0.7)" stroke="currentColor" strokeWidth="1"/>
        {/* Корона с тремя фазами */}
        <path d="M 92 100 L 96 95 L 100 100 L 104 95 L 108 100" stroke="currentColor" strokeWidth="1.2" fill="none"/>
      </g>
    ),
    "major-3": (
      // Императрица: фигура на троне с венком из звёзд
      <g>
        {/* Трон */}
        <rect x="70" y="170" width="60" height="80" fill="rgba(134,239,172,0.15)" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="65" y="100" width="70" height="10" fill="rgba(134,239,172,0.3)" stroke="currentColor" strokeWidth="1.5"/>
        {/* Императрица */}
        <path d="M 88 220 L 92 130 L 108 130 L 112 220 Z" fill="rgba(134,239,172,0.4)" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="100" cy="120" r="11" fill="rgba(255,255,255,0.5)" stroke="currentColor" strokeWidth="1.5"/>
        {/* Венец из 12 звёзд */}
        {Array.from({ length: 7 }).map((_, i) => {
          const angle = (i / 6) * Math.PI - Math.PI
          const x = 100 + Math.cos(angle) * 18
          const y = 105 + Math.sin(angle) * 8
          return <text key={i} x={x} y={y} fontSize="5" textAnchor="middle" fill="rgba(251,191,36,0.9)">★</text>
        })}
        {/* Скипетр */}
        <line x1="80" y1="160" x2="75" y2="130" stroke="currentColor" strokeWidth="2"/>
        <circle cx="74" cy="127" r="5" fill="rgba(251,191,36,0.8)"/>
        {/* Щит с символом Венеры */}
        <circle cx="125" cy="170" r="9" fill="rgba(134,239,172,0.3)" stroke="currentColor" strokeWidth="1.2"/>
        <circle cx="125" cy="167" r="3" fill="none" stroke="currentColor" strokeWidth="1"/>
        <line x1="125" y1="170" x2="125" y2="178" stroke="currentColor" strokeWidth="1.2"/>
        {/* Пшеница у ног */}
        <path d="M 80 245 Q 78 240 82 238 Q 86 240 84 245" fill="rgba(251,191,36,0.7)" stroke="currentColor" strokeWidth="0.5"/>
        <path d="M 120 245 Q 118 240 122 238 Q 126 240 124 245" fill="rgba(251,191,36,0.7)" stroke="currentColor" strokeWidth="0.5"/>
      </g>
    ),
    "major-4": (
      // Император: фигура на троне с орлом и скипетром
      <g>
        {/* Трон каменный */}
        <rect x="65" y="180" width="70" height="70" fill="rgba(248,113,113,0.15)" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="60" y="95" width="80" height="14" fill="rgba(248,113,113,0.3)" stroke="currentColor" strokeWidth="1.5"/>
        {/* Император */}
        <path d="M 88 220 L 92 130 L 108 130 L 112 220 Z" fill="rgba(248,113,113,0.4)" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="100" cy="120" r="11" fill="rgba(255,255,255,0.5)" stroke="currentColor" strokeWidth="1.5"/>
        {/* Корона */}
        <path d="M 90 105 L 94 95 L 98 105 L 100 92 L 102 105 L 106 95 L 110 105 Z" fill="rgba(251,191,36,0.8)" stroke="currentColor" strokeWidth="1"/>
        {/* Скипетр-Анкх */}
        <line x1="78" y1="160" x2="78" y2="200" stroke="currentColor" strokeWidth="2"/>
        <circle cx="78" cy="155" r="5" fill="none" stroke="currentColor" strokeWidth="2"/>
        {/* Орёл на спинке трона */}
        <path d="M 95 100 Q 100 95 105 100 L 102 108 L 98 108 Z" fill="currentColor" opacity="0.4"/>
        {/* Доспех-накидка */}
        <path d="M 92 130 L 88 200 L 100 195 L 112 200 L 108 130" fill="rgba(248,113,113,0.5)" stroke="currentColor" strokeWidth="0.8"/>
      </g>
    ),
    "major-5": (
      // Иерофант: фигура с тиарой и два ученика
      <g>
        {/* Иерофант на возвышении */}
        <rect x="80" y="220" width="40" height="30" fill="rgba(253,230,138,0.15)" stroke="currentColor" strokeWidth="1"/>
        <path d="M 90 220 L 92 130 L 108 130 L 110 220 Z" fill="rgba(253,230,138,0.4)" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="100" cy="120" r="11" fill="rgba(255,255,255,0.5)" stroke="currentColor" strokeWidth="1.5"/>
        {/* Тиара - тройная корона */}
        <path d="M 92 108 Q 92 95 96 95 L 96 100 L 100 92 L 104 100 L 104 95 Q 108 95 108 108" fill="rgba(251,191,36,0.8)" stroke="currentColor" strokeWidth="1"/>
        {/* Жезл-тройной крест */}
        <line x1="80" y1="160" x2="80" y2="210" stroke="currentColor" strokeWidth="2"/>
        <line x1="76" y1="170" x2="84" y2="170" stroke="currentColor" strokeWidth="2"/>
        <line x1="77" y1="175" x2="83" y2="175" stroke="currentColor" strokeWidth="2"/>
        {/* Два ученика */}
        <path d="M 65 250 L 67 220 L 73 220 L 75 250 Z" fill="rgba(167,139,250,0.3)" stroke="currentColor" strokeWidth="1"/>
        <circle cx="70" cy="215" r="6" fill="rgba(255,255,255,0.4)" stroke="currentColor" strokeWidth="1"/>
        <path d="M 125 250 L 127 220 L 133 220 L 135 250 Z" fill="rgba(248,113,113,0.3)" stroke="currentColor" strokeWidth="1"/>
        <circle cx="130" cy="215" r="6" fill="rgba(255,255,255,0.4)" stroke="currentColor" strokeWidth="1"/>
      </g>
    ),
    "major-6": (
      // Влюблённые: мужчина, женщина и ангел над ними
      <g>
        {/* Ангел сверху */}
        <circle cx="100" cy="80" r="10" fill="rgba(251,191,36,0.4)" stroke="currentColor" strokeWidth="1.2"/>
        {/* Крылья */}
        <path d="M 88 80 Q 70 75 65 95 Q 80 90 90 90 Z" fill="rgba(255,255,255,0.4)" stroke="currentColor" strokeWidth="1"/>
        <path d="M 112 80 Q 130 75 135 95 Q 120 90 110 90 Z" fill="rgba(255,255,255,0.4)" stroke="currentColor" strokeWidth="1"/>
        {/* Мужчина слева */}
        <path d="M 75 230 L 77 150 L 87 150 L 89 230 Z" fill="rgba(96,165,250,0.3)" stroke="currentColor" strokeWidth="1.2"/>
        <circle cx="82" cy="140" r="9" fill="rgba(255,255,255,0.5)" stroke="currentColor" strokeWidth="1.2"/>
        {/* Женщина справа */}
        <path d="M 113 230 L 115 150 L 125 150 L 127 230 Z" fill="rgba(249,168,212,0.3)" stroke="currentColor" strokeWidth="1.2"/>
        <circle cx="120" cy="140" r="9" fill="rgba(255,255,255,0.5)" stroke="currentColor" strokeWidth="1.2"/>
        {/* Солнце над ангелом */}
        <circle cx="100" cy="55" r="6" fill="rgba(251,191,36,0.8)"/>
        {Array.from({ length: 6 }).map((_, i) => {
          const a = (i / 6) * Math.PI * 2
          const x1 = 100 + Math.cos(a) * 8
          const y1 = 55 + Math.sin(a) * 8
          const x2 = 100 + Math.cos(a) * 12
          const y2 = 55 + Math.sin(a) * 12
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(251,191,36,0.7)" strokeWidth="1"/>
        })}
        {/* Змей-искуситель у дерева */}
        <path d="M 130 110 Q 135 120 128 130 Q 122 140 130 150" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.6"/>
        {/* Дерево позади мужчины */}
        <line x1="60" y1="105" x2="60" y2="240" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
        <circle cx="60" cy="100" r="15" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
      </g>
    ),
    "major-7": (
      // Колесница: воин в колеснице, два сфинкса
      <g>
        {/* Колесница-кузов */}
        <rect x="75" y="155" width="50" height="55" fill="rgba(96,165,250,0.25)" stroke="currentColor" strokeWidth="1.5"/>
        {/* Колесница-навес */}
        <path d="M 70 155 Q 100 130 130 155" fill="rgba(96,165,250,0.4)" stroke="currentColor" strokeWidth="1.5"/>
        {/* Воин */}
        <circle cx="100" cy="140" r="10" fill="rgba(255,255,255,0.5)" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M 92 175 L 95 155 L 105 155 L 108 175 Z" fill="rgba(248,113,113,0.4)" stroke="currentColor" strokeWidth="1.2"/>
        {/* Корона со звездой */}
        <path d="M 92 130 L 100 122 L 108 130" fill="rgba(251,191,36,0.8)" stroke="currentColor" strokeWidth="1"/>
        <text x="100" y="130" fontSize="6" textAnchor="middle" fill="rgba(251,191,36,0.9)">★</text>
        {/* Скипетр */}
        <line x1="120" y1="170" x2="135" y2="155" stroke="currentColor" strokeWidth="2"/>
        {/* Колёса */}
        <circle cx="80" cy="215" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
        <circle cx="120" cy="215" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
        {Array.from({ length: 4 }).map((_, i) => {
          const a = (i / 4) * Math.PI
          return (
            <g key={`l${i}`}>
              <line x1="80" y1="215" x2={80 + Math.cos(a) * 8} y2={215 + Math.sin(a) * 8} stroke="currentColor" strokeWidth="1"/>
              <line x1="120" y1="215" x2={120 + Math.cos(a) * 8} y2={215 + Math.sin(a) * 8} stroke="currentColor" strokeWidth="1"/>
            </g>
          )
        })}
        {/* Два сфинкса/кони */}
        <path d="M 35 215 Q 30 200 40 195 L 55 195 L 55 215 Z" fill="rgba(248,113,113,0.4)" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M 145 215 Q 150 200 140 195 L 125 195 L 125 215 Z" fill="rgba(96,165,250,0.4)" stroke="currentColor" strokeWidth="1.2"/>
      </g>
    ),
    "major-8": (
      // Сила: женщина укрощает льва
      <g>
        {/* Женщина */}
        <path d="M 70 175 L 75 130 L 85 130 L 90 175 Z" fill="rgba(251,191,36,0.3)" stroke="currentColor" strokeWidth="1.2"/>
        <circle cx="78" cy="120" r="9" fill="rgba(255,255,255,0.5)" stroke="currentColor" strokeWidth="1.2"/>
        {/* Венок на голове */}
        <path d="M 70 110 Q 78 105 86 110" fill="none" stroke="rgba(134,239,172,0.7)" strokeWidth="1.5"/>
        {/* Бесконечность над головой */}
        <path d="M 72 105 Q 76 100 80 105 Q 84 100 88 105 Q 84 110 80 105 Q 76 110 72 105 Z" fill="currentColor" opacity="0.8"/>
        {/* Лев */}
        <ellipse cx="130" cy="195" rx="28" ry="20" fill="rgba(251,191,36,0.4)" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="155" cy="185" r="14" fill="rgba(251,191,36,0.5)" stroke="currentColor" strokeWidth="1.5"/>
        {/* Грива - лучи */}
        {Array.from({ length: 10 }).map((_, i) => {
          const a = (i / 9) * Math.PI * 1.5 + Math.PI * 0.2
          const x1 = 155 + Math.cos(a) * 14
          const y1 = 185 + Math.sin(a) * 14
          const x2 = 155 + Math.cos(a) * 19
          const y2 = 185 + Math.sin(a) * 19
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1.2" opacity="0.6"/>
        })}
        {/* Глаза льва */}
        <circle cx="150" cy="183" r="1.5" fill="currentColor"/>
        <circle cx="160" cy="183" r="1.5" fill="currentColor"/>
        {/* Рука женщины на пасти льва */}
        <path d="M 90 160 Q 110 165 130 175" fill="none" stroke="currentColor" strokeWidth="1.5"/>
        {/* Цветок в другой руке */}
        <circle cx="62" cy="155" r="3" fill="rgba(249,168,212,0.8)" stroke="currentColor" strokeWidth="0.5"/>
        {/* Горный пейзаж */}
        <path d="M 30 240 L 50 200 L 70 240" fill="rgba(96,165,250,0.15)" stroke="currentColor" strokeWidth="0.5"/>
        <path d="M 130 240 L 155 195 L 180 240" fill="rgba(96,165,250,0.15)" stroke="currentColor" strokeWidth="0.5"/>
      </g>
    ),
    "major-9": (
      // Отшельник: старец с фонарём и посохом
      <g>
        {/* Капюшон-плащ */}
        <path d="M 80 230 L 78 130 Q 100 105 122 130 L 120 230 Z" fill="rgba(203,213,225,0.3)" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="100" cy="125" r="11" fill="rgba(255,255,255,0.4)" stroke="currentColor" strokeWidth="1.5"/>
        {/* Капюшон */}
        <path d="M 86 125 Q 100 100 114 125 L 110 135 Q 100 115 90 135 Z" fill="rgba(203,213,225,0.6)" stroke="currentColor" strokeWidth="1.2"/>
        {/* Борода */}
        <path d="M 95 138 L 92 160 L 108 160 L 105 138 Z" fill="rgba(255,255,255,0.5)" stroke="currentColor" strokeWidth="0.8"/>
        {/* Фонарь в правой руке */}
        <line x1="115" y1="160" x2="135" y2="155" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="135" y="148" width="14" height="18" fill="rgba(251,191,36,0.4)" stroke="currentColor" strokeWidth="1.2"/>
        {/* Свет фонаря - звезда внутри */}
        <text x="142" y="161" fontSize="8" textAnchor="middle" fill="rgba(251,191,36,0.95)">✦</text>
        {/* Посох */}
        <line x1="78" y1="130" x2="72" y2="240" stroke="currentColor" strokeWidth="2"/>
        {/* Серый фон-горы */}
        <path d="M 30 245 L 60 180 L 90 245 Z" fill="rgba(148,163,184,0.2)"/>
        <path d="M 110 245 L 140 180 L 170 245 Z" fill="rgba(148,163,184,0.2)"/>
      </g>
    ),
    "major-10": (
      // Колесо Фортуны: колесо со спицами и символами
      <g>
        {/* Внешний круг */}
        <circle cx="100" cy="160" r="55" fill="none" stroke="currentColor" strokeWidth="2.5"/>
        {/* Средний круг */}
        <circle cx="100" cy="160" r="42" fill="rgba(163,230,53,0.15)" stroke="currentColor" strokeWidth="1.5"/>
        {/* Внутренний круг */}
        <circle cx="100" cy="160" r="25" fill="rgba(251,191,36,0.2)" stroke="currentColor" strokeWidth="1.2"/>
        {/* Спицы - 8 лучей */}
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * Math.PI * 2
          return <line key={i} x1="100" y1="160" x2={100 + Math.cos(a) * 55} y2={160 + Math.sin(a) * 55} stroke="currentColor" strokeWidth="1"/>
        })}
        {/* Буквы T A R O по кругу */}
        {["T", "A", "R", "O"].map((l, i) => {
          const a = (i / 4) * Math.PI * 2 - Math.PI / 2
          const x = 100 + Math.cos(a) * 33
          const y = 165 + Math.sin(a) * 33
          return <text key={i} x={x} y={y} fontSize="9" textAnchor="middle" fill="currentColor" opacity="0.9" fontWeight="bold">{l}</text>
        })}
        {/* Сфинкс сверху */}
        <path d="M 90 100 Q 100 85 110 100 L 108 115 L 92 115 Z" fill="rgba(251,191,36,0.7)" stroke="currentColor" strokeWidth="1.2"/>
        {/* Змей слева */}
        <path d="M 35 200 Q 50 215 70 205 Q 80 200 85 215" fill="none" stroke="rgba(28,163,150,0.7)" strokeWidth="2"/>
        {/* Анубис справа */}
        <path d="M 165 200 Q 150 215 130 205 Q 120 200 115 215" fill="none" stroke="rgba(248,113,113,0.6)" strokeWidth="2"/>
      </g>
    ),
    "major-11": (
      // Справедливость: фигура с мечом и весами
      <g>
        {/* Трон */}
        <rect x="68" y="170" width="64" height="80" fill="rgba(147,197,253,0.15)" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="62" y="100" width="76" height="12" fill="rgba(147,197,253,0.3)" stroke="currentColor" strokeWidth="1.5"/>
        {/* Фигура */}
        <path d="M 88 220 L 92 130 L 108 130 L 112 220 Z" fill="rgba(147,197,253,0.4)" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="100" cy="120" r="11" fill="rgba(255,255,255,0.5)" stroke="currentColor" strokeWidth="1.5"/>
        {/* Корона */}
        <path d="M 90 105 L 95 95 L 100 105 L 105 95 L 110 105 Z" fill="rgba(251,191,36,0.8)" stroke="currentColor" strokeWidth="1"/>
        {/* Весы в левой руке */}
        <line x1="78" y1="155" x2="62" y2="135" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="55" y1="135" x2="70" y2="135" stroke="currentColor" strokeWidth="1.5"/>
        {/* Чаша левая */}
        <path d="M 50 135 L 53 145 L 62 145 L 65 135 Z" fill="rgba(147,197,253,0.4)" stroke="currentColor" strokeWidth="1"/>
        {/* Чаша правая */}
        <path d="M 60 135 L 63 145 L 72 145 L 75 135 Z" fill="rgba(147,197,253,0.4)" stroke="currentColor" strokeWidth="1"/>
        {/* Меч в правой руке */}
        <line x1="120" y1="155" x2="138" y2="210" stroke="currentColor" strokeWidth="2.5"/>
        <line x1="113" y1="160" x2="127" y2="160" stroke="currentColor" strokeWidth="2"/>
        <line x1="120" y1="155" x2="120" y2="148" stroke="currentColor" strokeWidth="2"/>
      </g>
    ),
    "major-12": (
      // Повешенный: фигура, подвешенная за ногу
      <g>
        {/* Перекладина */}
        <line x1="50" y1="80" x2="150" y2="80" stroke="currentColor" strokeWidth="3"/>
        <line x1="55" y1="80" x2="55" y2="70" stroke="currentColor" strokeWidth="2"/>
        <line x1="145" y1="80" x2="145" y2="70" stroke="currentColor" strokeWidth="2"/>
        {/* Веревка */}
        <line x1="100" y1="80" x2="100" y2="110" stroke="currentColor" strokeWidth="1.5"/>
        {/* Нога */}
        <line x1="100" y1="110" x2="100" y2="135" stroke="currentColor" strokeWidth="2"/>
        {/* Вторая нога согнута */}
        <path d="M 100 135 Q 115 130 115 145" fill="none" stroke="currentColor" strokeWidth="2"/>
        {/* Тело (головой вниз) */}
        <path d="M 90 220 L 92 140 L 108 140 L 110 220 Z" fill="rgba(103,232,249,0.3)" stroke="currentColor" strokeWidth="1.5"/>
        {/* Голова внизу */}
        <circle cx="100" cy="225" r="10" fill="rgba(255,255,255,0.4)" stroke="currentColor" strokeWidth="1.5"/>
        {/* Сияние вокруг головы */}
        <circle cx="100" cy="225" r="15" fill="none" stroke="rgba(251,191,36,0.6)" strokeWidth="0.8" strokeDasharray="2 2"/>
        {/* Руки за спиной */}
        <path d="M 92 175 Q 80 180 78 170" fill="none" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M 108 175 Q 120 180 122 170" fill="none" stroke="currentColor" strokeWidth="1.5"/>
        {/* Деревья по бокам с плодами */}
        <line x1="35" y1="80" x2="35" y2="240" stroke="currentColor" strokeWidth="1.5" opacity="0.6"/>
        <circle cx="35" cy="120" r="3" fill="rgba(251,191,36,0.7)" opacity="0.6"/>
        <circle cx="35" cy="160" r="3" fill="rgba(251,191,36,0.7)" opacity="0.6"/>
        <circle cx="35" cy="200" r="3" fill="rgba(251,191,36,0.7)" opacity="0.6"/>
        <line x1="165" y1="80" x2="165" y2="240" stroke="currentColor" strokeWidth="1.5" opacity="0.6"/>
        <circle cx="165" cy="120" r="3" fill="rgba(251,191,36,0.7)" opacity="0.6"/>
        <circle cx="165" cy="160" r="3" fill="rgba(251,191,36,0.7)" opacity="0.6"/>
        <circle cx="165" cy="200" r="3" fill="rgba(251,191,36,0.7)" opacity="0.6"/>
      </g>
    ),
    "major-13": (
      // Смерть: скелет на коне с флагом
      <g>
        {/* Конь */}
        <ellipse cx="100" cy="195" rx="40" ry="20" fill="rgba(148,163,184,0.4)" stroke="currentColor" strokeWidth="1.5"/>
        {/* Ноги коня */}
        <line x1="75" y1="210" x2="75" y2="245" stroke="currentColor" strokeWidth="2.5"/>
        <line x1="90" y1="210" x2="90" y2="245" stroke="currentColor" strokeWidth="2.5"/>
        <line x1="110" y1="210" x2="110" y2="245" stroke="currentColor" strokeWidth="2.5"/>
        <line x1="125" y1="210" x2="125" y2="245" stroke="currentColor" strokeWidth="2.5"/>
        {/* Голова коня */}
        <path d="M 55 195 Q 45 185 50 175 L 65 175 L 70 190 Z" fill="rgba(148,163,184,0.4)" stroke="currentColor" strokeWidth="1.5"/>
        {/* Грива */}
        <path d="M 60 180 Q 55 170 70 168 Q 75 175 70 180" fill="rgba(28,43,67,0.6)" stroke="currentColor" strokeWidth="1"/>
        {/* Скелет-всадник */}
        <ellipse cx="105" cy="155" rx="14" ry="20" fill="rgba(255,255,255,0.2)" stroke="currentColor" strokeWidth="1.5"/>
        {/* Череп */}
        <circle cx="105" cy="130" r="10" fill="rgba(255,255,255,0.5)" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="101" cy="129" r="2" fill="currentColor"/>
        <circle cx="109" cy="129" r="2" fill="currentColor"/>
        <path d="M 100 136 L 102 138 L 104 136 L 106 138 L 108 136" fill="none" stroke="currentColor" strokeWidth="0.8"/>
        {/* Флаг с розой */}
        <line x1="120" y1="120" x2="120" y2="80" stroke="currentColor" strokeWidth="2"/>
        <rect x="120" y="80" width="30" height="20" fill="rgba(28,43,67,0.6)" stroke="currentColor" strokeWidth="1"/>
        {/* Роза Тюдоров на флаге */}
        <circle cx="135" cy="90" r="5" fill="rgba(248,113,113,0.8)" stroke="currentColor" strokeWidth="0.8"/>
        {/* Падающий король у ног */}
        <path d="M 50 245 Q 55 235 65 240 L 70 250" fill="rgba(251,191,36,0.4)" stroke="currentColor" strokeWidth="1"/>
        <circle cx="65" cy="232" r="5" fill="rgba(255,255,255,0.4)" stroke="currentColor" strokeWidth="1"/>
        {/* Корона на земле */}
        <path d="M 60 225 L 65 220 L 70 225" fill="rgba(251,191,36,0.8)" stroke="currentColor" strokeWidth="0.8"/>
      </g>
    ),
    "major-14": (
      // Умеренность: ангел переливает воду между двумя чашами
      <g>
        {/* Ангел */}
        <path d="M 88 230 L 92 140 L 108 140 L 112 230 Z" fill="rgba(167,243,208,0.3)" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="100" cy="125" r="11" fill="rgba(255,255,255,0.5)" stroke="currentColor" strokeWidth="1.5"/>
        {/* Крылья */}
        <path d="M 90 145 Q 70 155 65 180 Q 85 170 90 175 Z" fill="rgba(255,255,255,0.4)" stroke="currentColor" strokeWidth="1"/>
        <path d="M 110 145 Q 130 155 135 180 Q 115 170 110 175 Z" fill="rgba(255,255,255,0.4)" stroke="currentColor" strokeWidth="1"/>
        {/* Венок на голове */}
        <path d="M 90 115 Q 100 105 110 115" fill="none" stroke="rgba(134,239,172,0.8)" strokeWidth="1.5"/>
        <text x="100" y="112" fontSize="5" textAnchor="middle" fill="rgba(251,191,36,0.9)">★</text>
        {/* Чаша левая */}
        <path d="M 78 175 L 82 190 L 92 190 L 96 175 Z" fill="rgba(96,165,250,0.5)" stroke="currentColor" strokeWidth="1.2"/>
        {/* Чаша правая */}
        <path d="M 104 175 L 108 190 L 118 190 L 122 175 Z" fill="rgba(96,165,250,0.5)" stroke="currentColor" strokeWidth="1.2"/>
        {/* Поток воды между чашами */}
        <path d="M 87 180 Q 100 168 113 180" fill="none" stroke="rgba(96,165,250,0.8)" strokeWidth="2" strokeLinecap="round"/>
        {/* Дорога к горам */}
        <path d="M 100 235 Q 110 250 130 245" fill="none" stroke="rgba(251,191,36,0.5)" strokeWidth="1.5"/>
        {/* Солнце-корона на горизонте */}
        <circle cx="135" cy="225" r="6" fill="rgba(251,191,36,0.7)"/>
        {/* Горы */}
        <path d="M 110 235 L 125 215 L 140 235 Z" fill="rgba(167,243,208,0.2)" stroke="currentColor" strokeWidth="0.5"/>
        {/* Кувшинки у ног */}
        <circle cx="75" cy="235" r="3" fill="rgba(249,168,212,0.7)"/>
        <circle cx="125" cy="235" r="3" fill="rgba(249,168,212,0.7)"/>
      </g>
    ),
    "major-15": (
      // Дьявол: рогатое существо над двумя прикованными фигурами
      <g>
        {/* Дьявол-Бафомет */}
        <ellipse cx="100" cy="155" rx="20" ry="28" fill="rgba(220,38,38,0.4)" stroke="currentColor" strokeWidth="1.5"/>
        {/* Голова с рогами */}
        <path d="M 88 130 Q 85 110 92 115 L 100 105 L 108 115 Q 115 110 112 130" fill="rgba(148,163,184,0.5)" stroke="currentColor" strokeWidth="1.5"/>
        {/* Рога */}
        <path d="M 88 122 L 80 100 L 86 110" fill="rgba(148,163,184,0.6)" stroke="currentColor" strokeWidth="1"/>
        <path d="M 112 122 L 120 100 L 114 110" fill="rgba(148,163,184,0.6)" stroke="currentColor" strokeWidth="1"/>
        {/* Глаза */}
        <circle cx="95" cy="125" r="1.5" fill="rgba(251,191,36,0.9)"/>
        <circle cx="105" cy="125" r="1.5" fill="rgba(251,191,36,0.9)"/>
        {/* Пентакль-перевёрнутая звезда на груди */}
        <text x="100" y="170" fontSize="20" textAnchor="middle" fill="rgba(251,191,36,0.9)">☆</text>
        {/* Факел в руке */}
        <line x1="118" y1="170" x2="135" y2="155" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M 132 152 Q 135 145 138 152 Q 140 158 135 158 Z" fill="rgba(251,191,36,0.8)"/>
        {/* Цепь к мужчине */}
        <line x1="80" y1="195" x2="68" y2="220" stroke="currentColor" strokeWidth="1.2"/>
        {/* Цепь к женщине */}
        <line x1="120" y1="195" x2="132" y2="220" stroke="currentColor" strokeWidth="1.2"/>
        {/* Прикованный мужчина */}
        <circle cx="68" cy="220" r="6" fill="rgba(96,165,250,0.5)" stroke="currentColor" strokeWidth="1"/>
        <path d="M 64 230 L 66 245 L 70 245 L 72 230 Z" fill="rgba(96,165,250,0.3)" stroke="currentColor" strokeWidth="1"/>
        {/* Прикованная женщина */}
        <circle cx="132" cy="220" r="6" fill="rgba(249,168,212,0.5)" stroke="currentColor" strokeWidth="1"/>
        <path d="M 128 230 L 130 245 L 134 245 L 136 230 Z" fill="rgba(249,168,212,0.3)" stroke="currentColor" strokeWidth="1"/>
        {/* Рога у прикованных */}
        <line x1="65" y1="215" x2="62" y2="210" stroke="currentColor" strokeWidth="1"/>
        <line x1="71" y1="215" x2="74" y2="210" stroke="currentColor" strokeWidth="1"/>
        <line x1="129" y1="215" x2="126" y2="210" stroke="currentColor" strokeWidth="1"/>
        <line x1="135" y1="215" x2="138" y2="210" stroke="currentColor" strokeWidth="1"/>
        {/* Пьедестал */}
        <rect x="50" y="245" width="100" height="10" fill="rgba(148,163,184,0.3)" stroke="currentColor" strokeWidth="1"/>
      </g>
    ),
    "major-16": (
      // Башня: падающая башня с молнией
      <g>
        {/* Башня */}
        <rect x="65" y="100" width="70" height="155" fill="rgba(148,163,184,0.4)" stroke="currentColor" strokeWidth="2"/>
        {/* Крыша с короной */}
        <path d="M 60 100 L 100 75 L 140 100 Z" fill="rgba(220,38,38,0.5)" stroke="currentColor" strokeWidth="2"/>
        {/* Корона падает */}
        <path d="M 95 65 L 100 55 L 105 65" fill="rgba(251,191,36,0.7)" stroke="currentColor" strokeWidth="1"/>
        {/* Молния */}
        <path d="M 145 60 L 130 80 L 138 85 L 120 110 L 132 105 L 110 135" fill="none" stroke="rgba(251,191,36,0.95)" strokeWidth="2.5" strokeLinejoin="round"/>
        {/* Окна */}
        <rect x="85" y="120" width="10" height="14" fill="rgba(251,191,36,0.6)" stroke="currentColor" strokeWidth="1"/>
        <rect x="105" y="120" width="10" height="14" fill="rgba(251,191,36,0.6)" stroke="currentColor" strokeWidth="1"/>
        <rect x="85" y="155" width="10" height="14" fill="rgba(251,191,36,0.6)" stroke="currentColor" strokeWidth="1"/>
        <rect x="105" y="155" width="10" height="14" fill="rgba(251,191,36,0.6)" stroke="currentColor" strokeWidth="1"/>
        {/* Дверь */}
        <path d="M 92 255 L 92 215 Q 100 200 108 215 L 108 255 Z" fill="rgba(220,38,38,0.5)" stroke="currentColor" strokeWidth="1"/>
        {/* Падающие фигуры */}
        <circle cx="55" cy="115" r="5" fill="rgba(96,165,250,0.7)" stroke="currentColor" strokeWidth="1"/>
        <path d="M 50 122 L 45 135 L 53 140 L 58 128 Z" fill="rgba(96,165,250,0.4)" stroke="currentColor" strokeWidth="1"/>
        <circle cx="148" cy="135" r="5" fill="rgba(249,168,212,0.7)" stroke="currentColor" strokeWidth="1"/>
        <path d="M 152 142 L 156 155 L 148 158 L 144 145 Z" fill="rgba(249,168,212,0.4)" stroke="currentColor" strokeWidth="1"/>
        {/* Шары-облака */}
        <ellipse cx="40" cy="50" rx="14" ry="6" fill="rgba(148,163,184,0.4)" stroke="currentColor" strokeWidth="0.5"/>
        <ellipse cx="160" cy="50" rx="14" ry="6" fill="rgba(148,163,184,0.4)" stroke="currentColor" strokeWidth="0.5"/>
      </g>
    ),
    "major-17": (
      // Звезда: обнажённая фигура у воды с двумя кувшинами и звёздами
      <g>
        {/* Звезда большая */}
        <text x="100" y="80" fontSize="36" textAnchor="middle" fill="rgba(125,211,252,0.9)">✦</text>
        {/* Семь малых звёзд */}
        {[
          [60, 75], [140, 75], [50, 110], [150, 110], [75, 60], [125, 60], [100, 50]
        ].map(([x, y], i) => (
          <text key={i} x={x} y={y} fontSize="8" textAnchor="middle" fill="rgba(251,191,36,0.8)">★</text>
        ))}
        {/* Фигура - коленопреклонённая */}
        <ellipse cx="100" cy="180" rx="18" ry="25" fill="rgba(125,211,252,0.3)" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="100" cy="145" r="10" fill="rgba(255,255,255,0.5)" stroke="currentColor" strokeWidth="1.5"/>
        {/* Длинные волосы */}
        <path d="M 92 145 Q 85 175 92 195 M 108 145 Q 115 175 108 195" fill="none" stroke="rgba(125,211,252,0.6)" strokeWidth="2"/>
        {/* Левая рука с кувшином */}
        <line x1="84" y1="180" x2="70" y2="200" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M 60 200 L 62 215 L 78 215 L 80 200 Z" fill="rgba(125,211,252,0.5)" stroke="currentColor" strokeWidth="1"/>
        {/* Поток в воду */}
        <path d="M 70 215 Q 65 225 60 240" fill="none" stroke="rgba(96,165,250,0.7)" strokeWidth="2"/>
        {/* Правая рука с кувшином */}
        <line x1="116" y1="180" x2="130" y2="195" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M 128 195 L 130 208 L 142 208 L 140 195 Z" fill="rgba(125,211,252,0.5)" stroke="currentColor" strokeWidth="1"/>
        {/* Поток на землю */}
        <path d="M 135 208 Q 138 218 145 225" fill="none" stroke="rgba(96,165,250,0.7)" strokeWidth="2"/>
        {/* Водоём */}
        <ellipse cx="55" cy="245" rx="22" ry="6" fill="rgba(96,165,250,0.4)" stroke="currentColor" strokeWidth="1"/>
        {/* Дерево справа */}
        <line x1="160" y1="245" x2="160" y2="195" stroke="currentColor" strokeWidth="1.5"/>
        <ellipse cx="160" cy="190" rx="10" ry="8" fill="rgba(134,239,172,0.4)" stroke="currentColor" strokeWidth="1"/>
        {/* Птица на дереве */}
        <path d="M 158 175 Q 160 170 162 175" fill="rgba(251,191,36,0.8)" stroke="currentColor" strokeWidth="0.5"/>
      </g>
    ),
    "major-18": (
      // Луна: луна между двумя башнями, две собаки и рак
      <g>
        {/* Большая луна */}
        <circle cx="100" cy="80" r="22" fill="rgba(196,181,253,0.6)" stroke="currentColor" strokeWidth="2"/>
        {/* Лучи луны */}
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * Math.PI * 2
          const x1 = 100 + Math.cos(a) * 22
          const y1 = 80 + Math.sin(a) * 22
          const x2 = 100 + Math.cos(a) * 30
          const y2 = 80 + Math.sin(a) * 30
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(196,181,253,0.6)" strokeWidth="1.5"/>
        })}
        {/* Капли-слёзы */}
        <text x="80" y="115" fontSize="6" textAnchor="middle" fill="rgba(196,181,253,0.8)">✦</text>
        <text x="120" y="115" fontSize="6" textAnchor="middle" fill="rgba(196,181,253,0.8)">✦</text>
        {/* Две башни */}
        <rect x="40" y="120" width="22" height="135" fill="rgba(148,163,184,0.4)" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M 38 120 L 51 105 L 64 120 Z" fill="rgba(220,38,38,0.4)" stroke="currentColor" strokeWidth="1"/>
        <rect x="138" y="120" width="22" height="135" fill="rgba(148,163,184,0.4)" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M 136 120 L 149 105 L 162 120 Z" fill="rgba(220,38,38,0.4)" stroke="currentColor" strokeWidth="1"/>
        {/* Собака/волк слева */}
        <path d="M 70 235 Q 65 220 75 215 L 85 215 L 88 235 Z" fill="rgba(196,181,253,0.4)" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M 70 215 L 68 208 L 73 215" fill="rgba(196,181,253,0.4)" stroke="currentColor" strokeWidth="1"/>
        {/* Собака/волк справа */}
        <path d="M 130 235 Q 135 220 125 215 L 115 215 L 112 235 Z" fill="rgba(196,181,253,0.4)" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M 130 215 L 132 208 L 127 215" fill="rgba(196,181,253,0.4)" stroke="currentColor" strokeWidth="1"/>
        {/* Рак скорпион в воде */}
        <ellipse cx="100" cy="250" rx="14" ry="5" fill="rgba(220,38,38,0.4)" stroke="currentColor" strokeWidth="1"/>
        <line x1="86" y1="250" x2="80" y2="248" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="114" y1="250" x2="120" y2="248" stroke="currentColor" strokeWidth="1.5"/>
        {/* Клешни */}
        <path d="M 80 248 Q 75 245 78 250 Z" fill="rgba(220,38,38,0.6)" stroke="currentColor" strokeWidth="0.8"/>
        <path d="M 120 248 Q 125 245 122 250 Z" fill="rgba(220,38,38,0.6)" stroke="currentColor" strokeWidth="0.8"/>
        {/* Извилистая дорога */}
        <path d="M 100 240 Q 90 230 95 220 Q 105 210 95 200" fill="none" stroke="rgba(196,181,253,0.3)" strokeWidth="1" strokeDasharray="2 2"/>
      </g>
    ),
    "major-19": (
      // Солнце: большое солнце с детским лицом, ребёнок на лошади, подсолнухи
      <g>
        {/* Большое солнце */}
        <circle cx="100" cy="80" r="28" fill="rgba(251,191,36,0.85)" stroke="currentColor" strokeWidth="2"/>
        {/* Лучи прямые и волнистые */}
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2
          const x1 = 100 + Math.cos(a) * 28
          const y1 = 80 + Math.sin(a) * 28
          const x2 = 100 + Math.cos(a) * 40
          const y2 = 80 + Math.sin(a) * 40
          return i % 2 === 0 ? (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(251,191,36,0.9)" strokeWidth="2"/>
          ) : (
            <path key={i} d={`M ${x1} ${y1} Q ${100 + Math.cos(a) * 33} ${80 + Math.sin(a) * 33} ${x2} ${y2}`} fill="none" stroke="rgba(251,191,36,0.7)" strokeWidth="1.5"/>
          )
        })}
        {/* Лицо в солнце */}
        <circle cx="92" cy="75" r="2" fill="currentColor"/>
        <circle cx="108" cy="75" r="2" fill="currentColor"/>
        <path d="M 88 85 Q 100 95 112 85" fill="none" stroke="currentColor" strokeWidth="1.5"/>
        {/* Ребёнок на лошади (белой) */}
        <ellipse cx="100" cy="195" rx="35" ry="14" fill="rgba(255,255,255,0.6)" stroke="currentColor" strokeWidth="1.5"/>
        {/* Голова лошади */}
        <path d="M 65 195 Q 55 185 60 175 L 75 175 L 80 190 Z" fill="rgba(255,255,255,0.6)" stroke="currentColor" strokeWidth="1.5"/>
        {/* Грива */}
        <path d="M 70 175 Q 75 165 85 168" fill="none" stroke="rgba(251,191,36,0.6)" strokeWidth="1.5"/>
        {/* Ноги лошади */}
        <line x1="75" y1="208" x2="75" y2="240" stroke="currentColor" strokeWidth="2.5"/>
        <line x1="90" y1="208" x2="90" y2="240" stroke="currentColor" strokeWidth="2.5"/>
        <line x1="110" y1="208" x2="110" y2="240" stroke="currentColor" strokeWidth="2.5"/>
        <line x1="125" y1="208" x2="125" y2="240" stroke="currentColor" strokeWidth="2.5"/>
        {/* Ребёнок */}
        <circle cx="105" cy="155" r="8" fill="rgba(255,255,255,0.7)" stroke="currentColor" strokeWidth="1.2"/>
        {/* Венок */}
        <path d="M 98 152 Q 105 145 112 152" fill="none" stroke="rgba(134,239,172,0.8)" strokeWidth="1"/>
        <path d="M 95 175 L 100 160 L 115 160 L 118 175 Z" fill="rgba(251,191,36,0.5)" stroke="currentColor" strokeWidth="1.2"/>
        {/* Знамя */}
        <line x1="115" y1="160" x2="125" y2="140" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M 125 140 L 140 140 L 138 155 L 125 152 Z" fill="rgba(220,38,38,0.6)" stroke="currentColor" strokeWidth="1"/>
        {/* Подсолнухи */}
        <g>
          <line x1="50" y1="245" x2="50" y2="220" stroke="rgba(134,239,172,0.7)" strokeWidth="1.5"/>
          <circle cx="50" cy="218" r="6" fill="rgba(251,191,36,0.9)" stroke="currentColor" strokeWidth="1"/>
        </g>
        <g>
          <line x1="160" y1="245" x2="160" y2="220" stroke="rgba(134,239,172,0.7)" strokeWidth="1.5"/>
          <circle cx="160" cy="218" r="6" fill="rgba(251,191,36,0.9)" stroke="currentColor" strokeWidth="1"/>
        </g>
      </g>
    ),
    "major-20": (
      // Суд: ангел с трубой над восстающими из гробов
      <g>
        {/* Ангел в облаках */}
        <ellipse cx="100" cy="85" rx="35" ry="14" fill="rgba(167,243,208,0.4)" stroke="currentColor" strokeWidth="0.8"/>
        {/* Крылья */}
        <path d="M 75 90 Q 55 95 50 80 Q 70 85 80 90 Z" fill="rgba(255,255,255,0.6)" stroke="currentColor" strokeWidth="1"/>
        <path d="M 125 90 Q 145 95 150 80 Q 130 85 120 90 Z" fill="rgba(255,255,255,0.6)" stroke="currentColor" strokeWidth="1"/>
        {/* Голова ангела */}
        <circle cx="100" cy="80" r="8" fill="rgba(255,255,255,0.6)" stroke="currentColor" strokeWidth="1.2"/>
        {/* Труба */}
        <line x1="100" y1="92" x2="135" y2="100" stroke="currentColor" strokeWidth="2"/>
        <path d="M 130 95 L 145 100 L 140 110 L 128 105 Z" fill="rgba(251,191,36,0.7)" stroke="currentColor" strokeWidth="1.2"/>
        {/* Звуковые волны */}
        <path d="M 130 100 Q 140 105 145 115" fill="none" stroke="rgba(251,191,36,0.5)" strokeWidth="1"/>
        <path d="M 138 105 Q 148 110 153 120" fill="none" stroke="rgba(251,191,36,0.5)" strokeWidth="1"/>
        {/* Крест на трубе */}
        <line x1="135" y1="98" x2="135" y2="105" stroke="currentColor" strokeWidth="1.2"/>
        <line x1="132" y1="101" x2="138" y2="101" stroke="currentColor" strokeWidth="1.2"/>
        {/* Три гроба */}
        <rect x="35" y="190" width="35" height="55" fill="rgba(148,163,184,0.5)" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="82" y="190" width="35" height="55" fill="rgba(148,163,184,0.5)" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="130" y="190" width="35" height="55" fill="rgba(148,163,184,0.5)" stroke="currentColor" strokeWidth="1.5"/>
        {/* Восставший мужчина (средний) */}
        <circle cx="100" cy="175" r="9" fill="rgba(96,165,250,0.7)" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M 92 185 L 95 175 L 105 175 L 108 185 Z" fill="rgba(96,165,250,0.5)" stroke="currentColor" strokeWidth="1.2"/>
        {/* Восставшая женщина слева */}
        <circle cx="55" cy="180" r="7" fill="rgba(249,168,212,0.7)" stroke="currentColor" strokeWidth="1"/>
        <path d="M 50 188 L 52 180 L 60 180 L 62 188 Z" fill="rgba(249,168,212,0.5)" stroke="currentColor" strokeWidth="1"/>
        {/* Восставший ребёнок справа */}
        <circle cx="148" cy="180" r="6" fill="rgba(255,255,255,0.7)" stroke="currentColor" strokeWidth="1"/>
        <path d="M 144 187 L 146 180 L 152 180 L 154 187 Z" fill="rgba(255,255,255,0.5)" stroke="currentColor" strokeWidth="1"/>
        {/* Руки подняты */}
        <line x1="95" y1="172" x2="90" y2="160" stroke="currentColor" strokeWidth="1.2"/>
        <line x1="105" y1="172" x2="110" y2="160" stroke="currentColor" strokeWidth="1.2"/>
      </g>
    ),
    "major-21": (
      // Мир: фигура в венке с 4 символами евангелистов по углам
      <g>
        {/* Венок овальный */}
        <ellipse cx="100" cy="155" rx="40" ry="55" fill="none" stroke="rgba(134,239,172,0.7)" strokeWidth="3"/>
        <ellipse cx="100" cy="155" rx="36" ry="51" fill="rgba(134,239,172,0.15)" stroke="rgba(134,239,172,0.4)" strokeWidth="1.5"/>
        {/* Листья на венке */}
        {Array.from({ length: 16 }).map((_, i) => {
          const a = (i / 16) * Math.PI * 2
          const x = 100 + Math.cos(a) * 38
          const y = 155 + Math.sin(a) * 53
          return <ellipse key={i} cx={x} cy={y} rx="3" ry="1.5" fill="rgba(134,239,172,0.7)" transform={`rotate(${a * 180 / Math.PI} ${x} ${y})`}/>
        })}
        {/* Фигура танцующая внутри */}
        <ellipse cx="100" cy="175" rx="11" ry="20" fill="rgba(52,211,153,0.5)" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="100" cy="150" r="8" fill="rgba(255,255,255,0.5)" stroke="currentColor" strokeWidth="1.2"/>
        {/* Лёгкая ткань */}
        <path d="M 88 175 Q 85 195 95 200" fill="none" stroke="rgba(52,211,153,0.6)" strokeWidth="1.5"/>
        <path d="M 112 175 Q 115 195 105 200" fill="none" stroke="rgba(52,211,153,0.6)" strokeWidth="1.5"/>
        {/* Жезл в руке */}
        <line x1="108" y1="155" x2="118" y2="125" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="116" y1="123" x2="120" y2="127" stroke="currentColor" strokeWidth="1.2"/>
        {/* Тело частично закрыто шарфом */}
        <path d="M 92 165 Q 100 175 108 165" fill="none" stroke="rgba(52,211,153,0.5)" strokeWidth="1.5"/>
        {/* Четыре символа евангелистов в углах */}
        {/* Лев (Марк) - левый верхний */}
        <g>
          <circle cx="35" cy="55" r="14" fill="rgba(251,191,36,0.3)" stroke="currentColor" strokeWidth="1.5"/>
          <text x="35" y="62" fontSize="14" textAnchor="middle" fill="currentColor" opacity="0.7">🦁</text>
        </g>
        {/* Телец (Лука) - правый верхний */}
        <g>
          <circle cx="165" cy="55" r="14" fill="rgba(163,230,53,0.3)" stroke="currentColor" strokeWidth="1.5"/>
          <text x="165" y="62" fontSize="14" textAnchor="middle" fill="currentColor" opacity="0.7">🐂</text>
        </g>
        {/* Ангел (Матфей) - левый нижний */}
        <g>
          <circle cx="35" cy="245" r="14" fill="rgba(167,139,250,0.3)" stroke="currentColor" strokeWidth="1.5"/>
          <text x="35" y="252" fontSize="14" textAnchor="middle" fill="currentColor" opacity="0.7">👼</text>
        </g>
        {/* Орёл (Иоанн) - правый нижний */}
        <g>
          <circle cx="165" cy="245" r="14" fill="rgba(96,165,250,0.3)" stroke="currentColor" strokeWidth="1.5"/>
          <text x="165" y="252" fontSize="14" textAnchor="middle" fill="currentColor" opacity="0.7">🦅</text>
        </g>
      </g>
    ),
  }
  return map[card.id] || null
}

/**
 * Иллюстрация для младшего аркана - символы масти и число/фигура
 */
function MinorArcanaArt({ card }: { card: TarotCard }) {
  const suitColor = suitInfo[card.suit].color
  const rank = card.rank!

  // Для Туза - крупный символ масти
  if (rank === "ace") {
    return (
      <g>
        {/* Большая рука держит символ масти */}
        <path d="M 80 100 L 95 100 L 100 110 L 95 120 L 80 120 Z" fill="rgba(255,255,255,0.4)" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="88" y1="105" x2="88" y2="115" stroke="currentColor" strokeWidth="1"/>
        {/* Символ масти крупный */}
        <text x="100" y="190" fontSize="80" textAnchor="middle" fill={suitColor} opacity="0.85">{getSuitSymbol(card.suit)}</text>
        {/* Лучи вокруг */}
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * Math.PI * 2
          const x1 = 100 + Math.cos(a) * 50
          const y1 = 170 + Math.sin(a) * 50
          const x2 = 100 + Math.cos(a) * 60
          const y2 = 170 + Math.sin(a) * 60
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={suitColor} strokeWidth="1" opacity="0.4"/>
        })}
      </g>
    )
  }

  // Для числовых карт - расположение символов масти по сетке
  if (["two","three","four","five","six","seven","eight","nine","ten"].includes(rank)) {
    const count = { two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10 }[rank]!
    // Позиции символов масти в зависимости от количества
    const positions: Record<number, [number, number][]> = {
      2: [[100, 130], [100, 210]],
      3: [[100, 125], [100, 170], [100, 215]],
      4: [[75, 135], [125, 135], [75, 205], [125, 205]],
      5: [[75, 135], [125, 135], [100, 170], [75, 205], [125, 205]],
      6: [[75, 130], [125, 130], [75, 170], [125, 170], [75, 210], [125, 210]],
      7: [[75, 130], [125, 130], [100, 155], [75, 180], [125, 180], [75, 215], [125, 215]],
      8: [[75, 130], [125, 130], [100, 155], [75, 180], [125, 180], [75, 215], [125, 215], [100, 230]],
      9: [[75, 130], [125, 130], [75, 165], [125, 165], [100, 180], [75, 195], [125, 195], [75, 225], [125, 225]],
      10: [[75, 125], [125, 125], [75, 155], [125, 155], [75, 185], [125, 185], [75, 215], [125, 215], [100, 140], [100, 200]],
    }
    const pos = positions[count] || []
    return (
      <g>
        {pos.map(([x, y], i) => (
          <text key={i} x={x} y={y + 6} fontSize="20" textAnchor="middle" fill={suitColor} opacity="0.85">{getSuitSymbol(card.suit)}</text>
        ))}
        {/* Декоративная рамка из листьев */}
        <path d="M 50 110 Q 100 90 150 110" fill="none" stroke={suitColor} strokeWidth="1" opacity="0.4"/>
        <path d="M 50 220 Q 100 240 150 220" fill="none" stroke={suitColor} strokeWidth="1" opacity="0.4"/>
      </g>
    )
  }

  // Для фигурных карт - стилизованная фигура + символ масти
  const figureConfig: Record<string, { color: string; accessory: string }> = {
    page: { color: "rgba(167,243,208,0.4)", accessory: "П" },
    knight: { color: "rgba(251,191,36,0.4)", accessory: "Р" },
    queen: { color: "rgba(249,168,212,0.4)", accessory: "Кор" },
    king: { color: "rgba(251,191,36,0.5)", accessory: "Кор" },
  }
  const fc = figureConfig[rank]

  return (
    <g>
      {/* Трон/конь для фигур */}
      {rank === "knight" && (
        <ellipse cx="100" cy="200" rx="30" ry="12" fill="rgba(148,163,184,0.3)" stroke="currentColor" strokeWidth="1.5"/>
      )}
      {(rank === "queen" || rank === "king") && (
        <rect x="65" y="190" width="70" height="55" fill="rgba(148,163,184,0.25)" stroke="currentColor" strokeWidth="1.5"/>
      )}
      {/* Фигура */}
      <path d="M 88 190 L 92 130 L 108 130 L 112 190 Z" fill={fc.color} stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="100" cy="120" r="11" fill="rgba(255,255,255,0.5)" stroke="currentColor" strokeWidth="1.5"/>
      {/* Корона для короля и королевы */}
      {(rank === "king" || rank === "queen") && (
        <path d="M 90 105 L 95 95 L 100 105 L 105 95 L 110 105 Z" fill="rgba(251,191,36,0.8)" stroke="currentColor" strokeWidth="1"/>
      )}
      {/* Шлем для рыцаря */}
      {rank === "knight" && (
        <path d="M 88 115 Q 100 95 112 115 L 110 125 L 90 125 Z" fill="rgba(148,163,184,0.5)" stroke="currentColor" strokeWidth="1.5"/>
      )}
      {/* Шапочка для пажа */}
      {rank === "page" && (
        <path d="M 90 110 Q 100 100 110 110 L 108 118 L 92 118 Z" fill="rgba(134,239,172,0.5)" stroke="currentColor" strokeWidth="1"/>
      )}
      {/* Символ масти в руках фигуры */}
      <text x="100" y="165" fontSize="18" textAnchor="middle" fill={suitColor} opacity="0.9">{getSuitSymbol(card.suit)}</text>
      {/* Буква ранга внизу */}
      <text x="100" y="240" fontSize="10" textAnchor="middle" fill="currentColor" opacity="0.6" fontWeight="bold">{fc.accessory}</text>
    </g>
  )
}

/**
 * Главный компонент SVG-карты
 */
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
        <linearGradient id={`bg-${card.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1a0f2e" stopOpacity="0.95"/>
          <stop offset="50%" stopColor="#2d1b4e" stopOpacity="0.95"/>
          <stop offset="100%" stopColor="#1a0f2e" stopOpacity="0.95"/>
        </linearGradient>
        <radialGradient id={`glow-${card.id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={accentColor} stopOpacity="0.25"/>
          <stop offset="100%" stopColor={accentColor} stopOpacity="0"/>
        </radialGradient>
        <pattern id={`stars-${card.id}`} width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="0.5" fill="rgba(255,255,255,0.4)"/>
          <circle cx="13" cy="11" r="0.4" fill="rgba(255,255,255,0.3)"/>
          <circle cx="8" cy="16" r="0.3" fill="rgba(255,255,255,0.2)"/>
        </pattern>
      </defs>

      {/* Фон */}
      <rect x="0" y="0" width="200" height="320" fill={`url(#bg-${card.id})`} rx="10"/>
      <rect x="0" y="0" width="200" height="320" fill={`url(#stars-${card.id})`} rx="10"/>
      <rect x="0" y="0" width="200" height="320" fill={`url(#glow-${card.id})`} rx="10"/>

      {/* Декоративная рамка */}
      <rect x="6" y="6" width="188" height="308" fill="none" stroke={accentColor} strokeWidth="1" opacity="0.5" rx="6"/>
      <rect x="10" y="10" width="180" height="300" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" rx="4"/>

      {/* Угловые орнаменты */}
      {[
        [15, 15], [185, 15], [15, 305], [185, 305]
      ].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="3" fill={accentColor} opacity="0.7"/>
          <circle cx={x} cy={y} r="6" fill="none" stroke={accentColor} strokeWidth="0.5" opacity="0.5"/>
        </g>
      ))}

      {/* Верхняя метка - номер/ранг + символ масти */}
      <text x="20" y="28" fontSize="11" fill={accentColor} fontWeight="bold" opacity="0.9">
        {isMajor ? majorSym?.roman : getRankSymbol(card.rank)}
      </text>
      <text x="180" y="28" fontSize="13" textAnchor="end" fill={accentColor} opacity="0.85">
        {isMajor ? majorSym?.symbol : suitInfoData.symbol}
      </text>

      {/* Нижняя метка - зеркально */}
      <text x="180" y="305" fontSize="11" textAnchor="end" fill={accentColor} fontWeight="bold" opacity="0.9">
        {isMajor ? majorSym?.roman : getRankSymbol(card.rank)}
      </text>
      <text x="20" y="305" fontSize="13" fill={accentColor} opacity="0.85">
        {isMajor ? majorSym?.symbol : suitInfoData.symbol}
      </text>

      {/* Основная иллюстрация */}
      <g color={accentColor}>
        {isMajor ? <MajorArcanaArt card={card}/> : <MinorArcanaArt card={card}/>}
      </g>

      {/* Название карты внизу */}
      <text x="100" y="285" fontSize="10" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontWeight="500">
        {card.name}
      </text>
    </svg>
  )
}

/**
 * Рубашка карты - мистический орнамент
 */
export function CardBack({ width = 200, height = 320, className }: { width?: number; height?: number; className?: string }) {
  return (
    <svg viewBox="0 0 200 320" width={width} height={height} className={className}>
      <defs>
        <linearGradient id="cardback-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2d1b4e"/>
          <stop offset="50%" stopColor="#1a0f2e"/>
          <stop offset="100%" stopColor="#0f0820"/>
        </linearGradient>
        <pattern id="cardback-pattern" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M 15 0 L 30 15 L 15 30 L 0 15 Z" fill="none" stroke="rgba(251,191,36,0.2)" strokeWidth="0.5"/>
          <circle cx="15" cy="15" r="2" fill="rgba(251,191,36,0.4)"/>
        </pattern>
        <radialGradient id="cardback-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(251,191,36,0.3)"/>
          <stop offset="100%" stopColor="rgba(251,191,36,0)"/>
        </radialGradient>
      </defs>

      {/* Фон */}
      <rect x="0" y="0" width="200" height="320" fill="url(#cardback-bg)" rx="10"/>
      <rect x="0" y="0" width="200" height="320" fill="url(#cardback-pattern)" rx="10"/>
      <rect x="0" y="0" width="200" height="320" fill="url(#cardback-glow)" rx="10"/>

      {/* Рамка */}
      <rect x="6" y="6" width="188" height="308" fill="none" stroke="rgba(251,191,36,0.6)" strokeWidth="1.5" rx="6"/>
      <rect x="10" y="10" width="180" height="300" fill="none" stroke="rgba(251,191,36,0.3)" strokeWidth="0.5" rx="4"/>

      {/* Угловые узоры */}
      {[
        [25, 25, 0], [175, 25, 90], [175, 295, 180], [25, 295, 270]
      ].map(([x, y, rot], i) => (
        <g key={i} transform={`rotate(${rot} ${x} ${y})`}>
          <path d={`M ${x} ${y} L ${x + 12} ${y} L ${x + 12} ${y + 3} L ${x + 3} ${y + 3} L ${x + 3} ${y + 12} L ${x} ${y + 12} Z`} fill="rgba(251,191,36,0.7)"/>
          <circle cx={x + 15} cy={y + 15} r="2" fill="rgba(251,191,36,0.6)"/>
        </g>
      ))}

      {/* Центральный медальон */}
      <g transform="translate(100, 160)">
        {/* Внешний круг */}
        <circle r="42" fill="none" stroke="rgba(251,191,36,0.7)" strokeWidth="1.5"/>
        <circle r="36" fill="rgba(251,191,36,0.05)" stroke="rgba(251,191,36,0.4)" strokeWidth="0.8"/>
        {/* Лучи */}
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2
          return <line key={i} x1={Math.cos(a) * 42} y1={Math.sin(a) * 42} x2={Math.cos(a) * 50} y2={Math.sin(a) * 50} stroke="rgba(251,191,36,0.6)" strokeWidth="1"/>
        })}
        {/* Звезда 8-конечная */}
        <path d="M 0 -28 L 6 -8 L 28 -10 L 10 4 L 22 22 L 0 10 L -22 22 L -10 4 L -28 -10 L -6 -8 Z" fill="rgba(251,191,36,0.4)" stroke="rgba(251,191,36,0.9)" strokeWidth="1"/>
        {/* Луна сверху */}
        <path d="M -10 -38 A 10 10 0 1 1 10 -38 A 7 7 0 1 0 -10 -38 Z" fill="rgba(196,181,253,0.7)"/>
        {/* Солнце снизу */}
        <circle cx="0" cy="38" r="6" fill="rgba(251,191,36,0.8)"/>
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * Math.PI * 2
          return <line key={i} x1={Math.cos(a) * 6} y1={38 + Math.sin(a) * 6} x2={Math.cos(a) * 10} y2={38 + Math.sin(a) * 10} stroke="rgba(251,191,36,0.7)" strokeWidth="1"/>
        })}
        {/* Глаз в центре */}
        <ellipse rx="8" ry="4" fill="rgba(255,255,255,0.2)" stroke="rgba(251,191,36,0.9)" strokeWidth="1"/>
        <circle r="2" fill="rgba(251,191,36,0.95)"/>
      </g>

      {/* Декоративные символы по краям */}
      <text x="100" y="50" fontSize="14" textAnchor="middle" fill="rgba(251,191,36,0.6)">✦</text>
      <text x="100" y="285" fontSize="14" textAnchor="middle" fill="rgba(251,191,36,0.6)">✦</text>
      <text x="40" y="165" fontSize="12" textAnchor="middle" fill="rgba(251,191,36,0.4)">☾</text>
      <text x="160" y="165" fontSize="12" textAnchor="middle" fill="rgba(251,191,36,0.4)">☉</text>
    </svg>
  )
}
