// === НАТАЛЬНАЯ КАРТА ===

export interface Planet {
  id: string
  name: string
  symbol: string
  type: "luminary" | "personal" | "social" | "transpersonal"
  color: string
  meaning: string
  psychology: string
  cycle: string
}

export const planets: Planet[] = [
  {
    id: "sun",
    name: "Солнце",
    symbol: "☉",
    type: "luminary",
    color: "#fbbf24",
    meaning: "Я-концепция, эго, жизненная сила, сознание",
    psychology: "Солнце в карте — это ваше Я, ваше сознательное эго, то, как вы проявляете себя в мире. Это ядро вашей личности, ваша жизненная сила и творческая энергия. Солнце показывает, что делает вас уникальным, в чём ваша сила и куда направлена ваша воля.",
    cycle: "1 год (полный оборот по зодиаку)",
  },
  {
    id: "moon",
    name: "Луна",
    symbol: "☾",
    type: "luminary",
    color: "#94a3b8",
    meaning: "Эмоции, подсознание, инстинкты, потребность в безопасности",
    psychology: "Луна — это ваше подсознание, эмоциональная природа, то, как вы реагируете на мир на инстинктивном уровне. Луна показывает ваши потребности в безопасности и заботе, как вы выражаете чувства и что вас питает эмоционально.",
    cycle: "27.3 дня",
  },
  {
    id: "mercury",
    name: "Меркурий",
    symbol: "☿",
    type: "personal",
    color: "#60a5fa",
    meaning: "Мышление, коммуникация, обучение",
    psychology: "Меркурий — это ваш ум, способ мышления и коммуникации. Он показывает, как вы обрабатываете информацию, как говорите, пишете, учитесь. Меркурий в знаке определяет ваш ментальный стиль — логический или интуитивный, быстрый или вдумчивый.",
    cycle: "88 дней",
  },
  {
    id: "venus",
    name: "Венера",
    symbol: "♀",
    type: "personal",
    color: "#ec4899",
    meaning: "Любовь, ценности, красота, отношения",
    psychology: "Венера — это ваша способность любить и быть любимой, ваши ценности и эстетические предпочтения. Она показывает, что вы находите прекрасным, как вы выражаете нежность, что для вас важно в отношениях. Венера также связана с деньгами и материальными ценностями.",
    cycle: "225 дней",
  },
  {
    id: "mars",
    name: "Марс",
    symbol: "♂",
    type: "personal",
    color: "#dc2626",
    meaning: "Действие, воля, энергия, сексуальность",
    psychology: "Марс — это ваша способность действовать, ваша воля и энергия. Он показывает, как вы добиваетесь целей, как выражаете гнев и страсть, как конкурируете. Марс в знаке определяет ваш стиль действия — прямой или стратегический, быстрый или упорный.",
    cycle: "687 дней",
  },
  {
    id: "jupiter",
    name: "Юпитер",
    symbol: "♃",
    type: "social",
    color: "#f59e0b",
    meaning: "Расширение, мудрость, удача, философия",
    psychology: "Юпитер — это ваш поиск смысла, расширение горизонтов, оптимизм. Он показывает, где вы растёте, в чём ваша удача, какая философия жизни вам близка. Юпитер также связан с обучением, путешествиями, духовным ростом.",
    cycle: "12 лет",
  },
  {
    id: "saturn",
    name: "Сатурн",
    symbol: "♄",
    type: "social",
    color: "#1e293b",
    meaning: "Структура, ограничения, карма, ответственность",
    psychology: "Сатурн — это ваш внутренний страж, ваши ограничения и ответственность. Он показывает, где вам нужно работать упорно, какие уроки вы должны пройти, что вас заземляет. Сатурн также связан с кармой, отцовской фигурой, профессиональным путём.",
    cycle: "29.5 лет",
  },
  {
    id: "uranus",
    name: "Уран",
    symbol: "♅",
    type: "transpersonal",
    color: "#0891b2",
    meaning: "Свобода, революция, оригинальность, интуиция",
    psychology: "Уран — это ваш бунтарь, потребность в свободе и новизне. Он показывает, где вы нестандартны, где происходят внезапные изменения, где вы опережаете время. Уран связан с интуицией, технологиями, коллективным сознанием.",
    cycle: "84 года",
  },
  {
    id: "neptune",
    name: "Нептун",
    symbol: "♆",
    type: "transpersonal",
    color: "#6366f1",
    meaning: "Сны, иллюзии, духовность, сострадание",
    psychology: "Нептун — это ваше стремление к слиянию, к трансценденции, к идеалу. Он показывает, где вы мечтаете, где можете потеряться в иллюзиях, где вы духовно чувствительны. Нептун связан с искусством, мистикой, зависимостями.",
    cycle: "165 лет",
  },
  {
    id: "pluto",
    name: "Плутон",
    symbol: "♇",
    type: "transpersonal",
    color: "#7c2d12",
    meaning: "Трансформация, власть, смерть и возрождение",
    psychology: "Плутон — это ваша глубинная сила, способность к трансформации через кризис. Он показывает, где вы сталкиваетесь с тенью, где происходит смерть и возрождение, где ваша истинная власть. Плутон связан с подсознательными страхами, сексуальностью, оккультным.",
    cycle: "248 лет",
  },
]

// === ЗНАКИ ЗОДИАКА (сокращённые данные для натальной карты) ===
export interface ZodiacInNatal {
  name: string
  symbol: string
  element: string
  ruler: string
  keyword: string
}

export const zodiacInNatal: ZodiacInNatal[] = [
  { name: "Овен", symbol: "♈", element: "Огонь", ruler: "Марс", keyword: "Я действую" },
  { name: "Телец", symbol: "♉", element: "Земля", ruler: "Венера", keyword: "Я имею" },
  { name: "Близнецы", symbol: "♊", element: "Воздух", ruler: "Меркурий", keyword: "Я думаю" },
  { name: "Рак", symbol: "♋", element: "Вода", ruler: "Луна", keyword: "Я чувствую" },
  { name: "Лев", symbol: "♌", element: "Огонь", ruler: "Солнце", keyword: "Я хочу" },
  { name: "Дева", symbol: "♍", element: "Земля", ruler: "Меркурий", keyword: "Я анализирую" },
  { name: "Весы", symbol: "♎", element: "Воздух", ruler: "Венера", keyword: "Я балансирую" },
  { name: "Скорпион", symbol: "♏", element: "Вода", ruler: "Плутон/Марс", keyword: "Я желаю" },
  { name: "Стрелец", symbol: "♐", element: "Огонь", ruler: "Юпитер", keyword: "Я исследую" },
  { name: "Козерог", symbol: "♑", element: "Земля", ruler: "Сатурн", keyword: "Я использую" },
  { name: "Водолей", symbol: "♒", element: "Воздух", ruler: "Уран/Сатурн", keyword: "Я знаю" },
  { name: "Рыбы", symbol: "♓", element: "Вода", ruler: "Нептун/Юпитер", keyword: "Я верю" },
]

// === ДОМА НАТАЛЬНОЙ КАРТЫ ===
export interface NatalHouse {
  number: number
  name: string
  sphere: string
  meaning: string
}

export const natalHouses: NatalHouse[] = [
  { number: 1, name: "Дом Личности", sphere: "Я, внешность, первое впечатление", meaning: "Как вас видят другие, ваша маска, ваш подход к жизни" },
  { number: 2, name: "Дом Ценностей", sphere: "Деньги, ресурсы, самооценка", meaning: "Что вы цените, как зарабатываете, ваша материальная база" },
  { number: 3, name: "Дом Коммуникации", sphere: "Общение, обучение, близкое окружение", meaning: "Как вы общаетесь, ваши отношения с сиблингами, короткие поездки" },
  { number: 4, name: "Дом Дома и Семьи", sphere: "Корни, семья, внутренняя опора", meaning: "Ваша семья, дом, детство, эмоциональный фундамент" },
  { number: 5, name: "Дом Творчества", sphere: "Творчество, дети, романтика, радость", meaning: "Как вы играете, любите, создаёте, выражаете себя" },
  { number: 6, name: "Дом Служения", sphere: "Работа, здоровье, рутина", meaning: "Ваш ежедневный труд, привычки, здоровье, служение другим" },
  { number: 7, name: "Дом Партнёрства", sphere: "Отношения, брак, контракты", meaning: "Что вы ищете в партнёре, как строите отношения, ваши враги" },
  { number: 8, name: "Дом Трансформации", sphere: "Секс, смерть, чужие деньги, кризисы", meaning: "Глубинные изменения, общие ресурсы, оккультное, наследие" },
  { number: 9, name: "Дом Философии", sphere: "Высшее образование, путешествия, вера", meaning: "Ваши убеждения, поиск смысла, дальние поездки, преподавание" },
  { number: 10, name: "Дом Карьеры", sphere: "Карьера, статус, призвание", meaning: "Ваша общественная роль, профессиональная реализация, авторитет" },
  { number: 11, name: "Дом Сообщества", sphere: "Друзья, группы, мечты, идеалы", meaning: "Ваш круг общения, социальные цели, коллективные идеалы" },
  { number: 12, name: "Дом Подсознания", sphere: "Тайное, изоляция, духовность, карма", meaning: "Что скрыто, ваши страхи, духовные практики, подсознательные паттерны" },
]

// === АСПЕКТЫ ===
export interface Aspect {
  name: string
  symbol: string
  angle: number
  type: "harmonious" | "tense" | "neutral"
  meaning: string
}

export const aspects: Aspect[] = [
  { name: "Соединение", symbol: "☌", angle: 0, type: "neutral", meaning: "Слияние энергий, усиление" },
  { name: "Секстиль", symbol: "⚹", angle: 60, type: "harmonious", meaning: "Гармоничная возможность, талант" },
  { name: "Квадрат", symbol: "□", angle: 90, type: "tense", meaning: "Напряжение, конфликт, рост через препятствия" },
  { name: "Тригон", symbol: "△", angle: 120, type: "harmonious", meaning: "Поток, лёгкость, дар" },
  { name: "Оппозиция", symbol: "☍", angle: 180, type: "tense", meaning: "Полярность, баланс через конфликт" },
]

// === УПРОЩЁННЫЙ РАСЧЁТ НАТАЛЬНОЙ КАРТЫ ===
// Внимание: это упрощённая модель без точных эфемерид.
// Для профессиональной астрологии нужны точные эфемеридные данные.

export interface PlanetPosition {
  planet: Planet
  signIndex: number // 0-11
  sign: ZodiacInNatal
  degree: number // 0-30
  house: number // 1-12
  interpretation: string
}

export interface NatalChartResult {
  planets: PlanetPosition[]
  ascendant: ZodiacInNatal
  ascendantDegree: number
  midheaven: ZodiacInNatal
  sunSign: ZodiacInNatal
  moonSign: ZodiacInNatal
  dominantElement: string
  dominantQuality: string
  elementCounts: Record<string, number>
  summary: string
  chartDate: string
}

function getSignByDegree(degree: number): { index: number; sign: ZodiacInNatal; degree: number } {
  const normalized = ((degree % 360) + 360) % 360
  const index = Math.floor(normalized / 30)
  const degreeInSign = normalized - index * 30
  return { index, sign: zodiacInNatal[index], degree: degreeInSign }
}

function interpretPlanetInSign(planet: Planet, sign: ZodiacInNatal): string {
  const interpretations: Record<string, Record<string, string>> = {
    sun: {
      "Овен": "Вы — пионер, который идёт первым. Ваша жизненная сила в действии, смелости, инициативе. Вы заряжаетесь от вызовов и конкуренции.",
      "Телец": "Вы — созидатель, который строит медленно и надёжно. Ваша сила в упорстве, терпении, любви к красоте и комфорту. Вы цените материальный мир.",
      "Близнецы": "Вы — коммуникатор, который живёт идеями и связями. Ваша сила в любопытстве, гибкости, способности видеть разные стороны. Вы заряжаетесь от общения.",
      "Рак": "Вы — хранитель, который создаёт эмоциональную безопасность. Ваша сила в эмпатии, интуиции, заботе. Вы заряжаетесь от семьи и дома.",
      "Лев": "Вы — творец, который сияет и вдохновляет. Ваша сила в харизме, щедрости, лидерстве. Вы заряжаетесь от признания и творческого самовыражения.",
      "Дева": "Вы — аналитик, который совершенствует и служит. Ваша сила в точности, дисциплине, внимании к деталям. Вы заряжаетесь от полезной работы.",
      "Весы": "Вы — дипломат, который создаёт гармонию. Ваша сила в эстетике, справедливости, способности видеть обе стороны. Вы заряжаетесь от партнёрства.",
      "Скорпион": "Вы — трансформатор, который видит глубину. Ваша сила в интенсивности, проницательности, способности к возрождению. Вы заряжаетесь от глубинных опытов.",
      "Стрелец": "Вы — философ, который ищет смысл. Ваша сила в оптимизме, мудрости, любви к свободе. Вы заряжаетесь от путешествий и обучения.",
      "Козерог": "Вы — архитектор, который строит на века. Ваша сила в дисциплине, амбициях, стратегии. Вы заряжаетесь от достижений и ответственности.",
      "Водолей": "Вы — революционер, который меняет будущее. Ваша сила в оригинальности, независимости, гуманизме. Вы заряжаетесь от новизны и свободы.",
      "Рыбы": "Вы — мистик, который чувствует единство. Ваша сила в сострадании, интуиции, творчестве. Вы заряжаетесь от духовности и искусства.",
    },
    moon: {
      "Овен": "Ваши эмоции вспыхивают быстро и угасают. Вы импульсивны в чувствах, нуждаетесь в действии. Эмоциональная безопасность — через независимость.",
      "Телец": "Ваши эмоции стабильны и глубоки. Вы нуждаетесь в материальной безопасности и сенсорном комфорте. Эмоциональная безопасность — через стабильность.",
      "Близнецы": "Ваши эмоции выражаются через слова. Вы нуждаетесь в общении и интеллектуальной стимуляции. Эмоциональная безопасность — через информацию.",
      "Рак": "Ваши эмоции глубокие и защитные. Вы нуждаетесь в семье, доме, эмоциональной близости. Эмоциональная безопасность — через заботу.",
      "Лев": "Ваши эмоции тёплые и драматичные. Вы нуждаетесь в признании и творческом выражении. Эмоциональная безопасность — через восхищение.",
      "Дева": "Ваши эмоции выражаются через заботу и служение. Вы нуждаетесь в порядке и полезности. Эмоциональная безопасность — через рутину и здоровье.",
      "Весы": "Ваши эмоции сбалансированы и ориентированы на партнёра. Вы нуждаетесь в гармонии и отношениях. Эмоциональная безопасность — через партнёрство.",
      "Скорпион": "Ваши эмоции интенсивны и скрытны. Вы нуждаетесь в глубинной связи и трансформации. Эмоциональная безопасность — через контроль и глубину.",
      "Стрелец": "Ваши эмоции оптимистичны и свободны. Вы нуждаетесь в приключениях и смысле. Эмоциональная безопасность — через свободу.",
      "Козерог": "Ваши эмоции сдержанны и ответственны. Вы нуждаетесь в структуре и достижениях. Эмоциональная безопасность — через контроль и статус.",
      "Водолей": "Ваши эмоции независимы и нестандартны. Вы нуждаетесь в свободе и дружбе. Эмоциональная безопасность — через сообщество.",
      "Рыбы": "Ваши эмоции чувствительны и мистичны. Вы нуждаетесь в духовности и сострадании. Эмоциональная безопасность — через слияние и творчество.",
    },
  }

  const planetInterp = interpretations[planet.id]
  if (planetInterp && planetInterp[sign.name]) {
    return planetInterp[sign.name]
  }

  // Общая интерпретация для других планет
  return `${planet.name} в ${sign.name} — ваша ${planet.meaning.toLowerCase()} выражается через энергию ${sign.element}. ${sign.keyword} — ключевая фраза этого положения. Управитель знака — ${sign.ruler}.`
}

export function calculateNatalChart(
  day: number,
  month: number,
  year: number,
  hour: number,
  minute: number
): NatalChartResult | null {
  if (!day || !month || !year || day < 1 || day > 31 || month < 1 || month > 12 || year < 1900 || year > 2100) {
    return null
  }

  // === СОЛНЦЕ ===
  // Солнце: по дате (используем существующую логику знаков)
  const sunBaseDegree = getSunDegree(month, day)
  const sunResult = getSignByDegree(sunBaseDegree)

  // === ЛУНА ===
  // Упрощённый расчёт Луны по дате (цикл 29.53 дня)
  // Используем формулу для приблизительного положения Луны
  const epochDay = Math.floor(Date.UTC(year, month - 1, day) / 86400000)
  const moonPhase = (epochDay - 4) % 29.53
  // Луна движется ~13.17° в день
  const knownNewMoon = 5.1 // приблизительная фаза для эпохи
  const moonDegree = (knownNewMoon + moonPhase * 13.17 + hour * 0.55) % 360
  const moonResult = getSignByDegree(moonDegree)

  // === АСЦЕНДЕНТ ===
  // Упрощённый расчёт Асцендента по времени рождения
  // Реальный расчёт требует широты и точного звёздного времени
  // Здесь — приблизительная модель
  const ascBaseDegree = getAscendantDegree(month, day, hour, minute)
  const ascResult = getSignByDegree(ascBaseDegree)

  // === MC (Середина Неба) ===
  // Примерно 90° от Асцендента
  const mcDegree = (ascBaseDegree - 90 + 360) % 360
  const mcResult = getSignByDegree(mcDegree)

  // === ПЛАНЕТЫ ===
  // Упрощённые расчёты для каждой планеты
  const planetPositions: PlanetPosition[] = []

  // Солнце
  planetPositions.push({
    planet: planets[0],
    signIndex: sunResult.index,
    sign: sunResult.sign,
    degree: sunResult.degree,
    house: getHouse(sunResult.index, ascResult.index),
    interpretation: interpretPlanetInSign(planets[0], sunResult.sign),
  })

  // Луна
  planetPositions.push({
    planet: planets[1],
    signIndex: moonResult.index,
    sign: moonResult.sign,
    degree: moonResult.degree,
    house: getHouse(moonResult.index, ascResult.index),
    interpretation: interpretPlanetInSign(planets[1], moonResult.sign),
  })

  // Меркурий — близко к Солнцу (±28°)
  const mercuryDegree = (sunBaseDegree + getMercuryOffset(year) + hour * 0.5) % 360
  const mercuryResult = getSignByDegree(mercuryDegree)
  planetPositions.push({
    planet: planets[2],
    signIndex: mercuryResult.index,
    sign: mercuryResult.sign,
    degree: mercuryResult.degree,
    house: getHouse(mercuryResult.index, ascResult.index),
    interpretation: interpretPlanetInSign(planets[2], mercuryResult.sign),
  })

  // Венера — близко к Солнцу (±48°)
  const venusDegree = (sunBaseDegree + getVenusOffset(year, month) + hour * 0.3) % 360
  const venusResult = getSignByDegree(venusDegree)
  planetPositions.push({
    planet: planets[3],
    signIndex: venusResult.index,
    sign: venusResult.sign,
    degree: venusResult.degree,
    house: getHouse(venusResult.index, ascResult.index),
    interpretation: interpretPlanetInSign(planets[3], venusResult.sign),
  })

  // Марс — медленнее, по году
  const marsDegree = getMarsDegree(year, month, day)
  const marsResult = getSignByDegree(marsDegree)
  planetPositions.push({
    planet: planets[4],
    signIndex: marsResult.index,
    sign: marsResult.sign,
    degree: marsResult.degree,
    house: getHouse(marsResult.index, ascResult.index),
    interpretation: interpretPlanetInSign(planets[4], marsResult.sign),
  })

  // Юпитер — ~1 знак в год
  const jupiterDegree = getJupiterDegree(year)
  const jupiterResult = getSignByDegree(jupiterDegree)
  planetPositions.push({
    planet: planets[5],
    signIndex: jupiterResult.index,
    sign: jupiterResult.sign,
    degree: jupiterResult.degree,
    house: getHouse(jupiterResult.index, ascResult.index),
    interpretation: interpretPlanetInSign(planets[5], jupiterResult.sign),
  })

  // Сатурн — ~2.5 года на знак
  const saturnDegree = getSaturnDegree(year)
  const saturnResult = getSignByDegree(saturnDegree)
  planetPositions.push({
    planet: planets[6],
    signIndex: saturnResult.index,
    sign: saturnResult.sign,
    degree: saturnResult.degree,
    house: getHouse(saturnResult.index, ascResult.index),
    interpretation: interpretPlanetInSign(planets[6], saturnResult.sign),
  })

  // Уран — ~7 лет на знак
  const uranusDegree = getUranusDegree(year)
  const uranusResult = getSignByDegree(uranusDegree)
  planetPositions.push({
    planet: planets[7],
    signIndex: uranusResult.index,
    sign: uranusResult.sign,
    degree: uranusResult.degree,
    house: getHouse(uranusResult.index, ascResult.index),
    interpretation: interpretPlanetInSign(planets[7], uranusResult.sign),
  })

  // Нептун — ~14 лет на знак
  const neptuneDegree = getNeptuneDegree(year)
  const neptuneResult = getSignByDegree(neptuneDegree)
  planetPositions.push({
    planet: planets[8],
    signIndex: neptuneResult.index,
    sign: neptuneResult.sign,
    degree: neptuneResult.degree,
    house: getHouse(neptuneResult.index, ascResult.index),
    interpretation: interpretPlanetInSign(planets[8], neptuneResult.sign),
  })

  // Плутон — ~13-32 года на знак
  const plutoDegree = getPlutoDegree(year)
  const plutoResult = getSignByDegree(plutoDegree)
  planetPositions.push({
    planet: planets[9],
    signIndex: plutoResult.index,
    sign: plutoResult.sign,
    degree: plutoResult.degree,
    house: getHouse(plutoResult.index, ascResult.index),
    interpretation: interpretPlanetInSign(planets[9], plutoResult.sign),
  })

  // === ДОМИНИРУЮЩАЯ СТИХИЯ ===
  const elementCounts: Record<string, number> = { "Огонь": 0, "Земля": 0, "Воздух": 0, "Вода": 0 }
  planetPositions.forEach((p) => {
    elementCounts[p.sign.element] = (elementCounts[p.sign.element] || 0) + 1
  })

  let dominantElement = "Огонь"
  let maxEl = 0
  Object.entries(elementCounts).forEach(([el, count]) => {
    if (count > maxEl) {
      maxEl = count
      dominantElement = el
    }
  })

  // === ДОМИНИРУЮЩЕЕ КАЧЕСТВО ===
  const cardinal = [0, 3, 6, 9] // Овен, Рак, Весы, Козерог
  const fixed = [1, 4, 7, 10] // Телец, Лев, Скорпион, Водолей
  const mutable = [2, 5, 8, 11] // Близнецы, Дева, Стрелец, Рыбы
  let card = 0, fix = 0, mut = 0
  planetPositions.forEach((p) => {
    if (cardinal.includes(p.signIndex)) card++
    else if (fixed.includes(p.signIndex)) fix++
    else if (mutable.includes(p.signIndex)) mut++
  })
  const dominantQuality = card >= fix && card >= mut ? "Кардинальный" : fix >= mut ? "Фиксированный" : "Мутабельный"

  // === СВОДКА ===
  const summary = `Ваша натальная карта показывает Солнце в ${sunResult.sign.name} и Луну в ${moonResult.sign.name}. ` +
    `Асцендент (восходящий знак) — ${ascResult.sign.name}. ` +
    `Доминирующая стихия — ${dominantElement} (${maxEl} из 10 планет), ` +
    `доминирующее качество — ${dominantQuality}. ` +
    `Это говорит о том, что ваша основная энергия выражается через ${dominantElement === "Огонь" ? "действие и страсть" : dominantElement === "Земля" ? "стабильность и практичность" : dominantElement === "Воздух" ? "мышление и общение" : "эмоции и интуицию"}. ` +
    `Ваш подход к жизни — ${dominantQuality === "Кардинальный" ? "инициативный, начинающий новое" : dominantQuality === "Фиксированный" ? "устойчивый, доводящий до конца" : "адаптивный, меняющийся"}.`

  const chartDate = new Date(year, month - 1, day, hour, minute).toLocaleDateString("ru-RU", {
    day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit",
  })

  return {
    planets: planetPositions,
    ascendant: ascResult.sign,
    ascendantDegree: ascResult.degree,
    midheaven: mcResult.sign,
    sunSign: sunResult.sign,
    moonSign: moonResult.sign,
    dominantElement,
    dominantQuality,
    elementCounts,
    summary,
    chartDate,
  }
}

// === ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ===

function getSunDegree(month: number, day: number): number {
  // Приблизительное положение Солнца по дате
  // 0° = Овен (21 марта)
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  let dayOfYear = day
  for (let i = 0; i < month - 1; i++) {
    dayOfYear += daysInMonth[i]
  }
  // 80-й день года ≈ 21 марта ≈ 0° Овна
  const sunDegree = ((dayOfYear - 80) * 360 / 365.25 + 360) % 360
  return sunDegree
}

function getAscendantDegree(month: number, day: number, hour: number, minute: number): number {
  // Упрощённый расчёт Асцендента
  // Реальный требует широты места рождения
  // Здесь — приблизительная модель по времени

  // Стартовая позиция: Солнце в день рождения
  const sunDeg = getSunDegree(month, day)

  // Солнце восходит примерно в 6:00 → Асцендент = Солнце + время * 15°/час - 90°
  // (при часе 6:00 Асцендент ≈ Солнце)
  const timeOffset = (hour + minute / 60 - 6) * 15
  let ascDeg = (sunDeg + timeOffset) % 360
  if (ascDeg < 0) ascDeg += 360

  return ascDeg
}

function getHouse(planetSignIndex: number, ascSignIndex: number): number {
  // Упрощённый расчёт дома: дом = (знак планеты - знак Асцендента + 1 + 12) % 12 + 1
  let house = (planetSignIndex - ascSignIndex + 12) % 12 + 1
  return house
}

function getMercuryOffset(year: number): number {
  // Меркурий колеблется вокруг Солнца ±28°
  // Используем год как seed для псевдослучайного положения
  return ((year * 17) % 56) - 28
}

function getVenusOffset(year: number, month: number): number {
  // Венера колеблется ±48°
  return ((year * 23 + month * 7) % 96) - 48
}

function getMarsDegree(year: number, month: number, day: number): number {
  // Марс: ~687 дней на оборот, ~0.52°/день
  // Эпоха: 1 января 2000 = ~180° (Весы)
  const epochDay = Math.floor(Date.UTC(year, month - 1, day) / 86400000)
  const marsEpoch = Math.floor(Date.UTC(2000, 0, 1) / 86400000)
  const daysDiff = epochDay - marsEpoch
  const marsDeg = (180 + daysDiff * (360 / 687)) % 360
  return (marsDeg + 360) % 360
}

function getJupiterDegree(year: number): number {
  // Юпитер: ~12 лет на оборот, ~30°/год
  // Эпоха: 2000 = ~40° (Телец)
  return ((year - 2000) * 30 + 40 + 360) % 360
}

function getSaturnDegree(year: number): number {
  // Сатурн: ~29.5 лет на оборот
  // Эпоха: 2000 = ~60° (Близнецы)
  return ((year - 2000) * (360 / 29.5) + 60 + 360) % 360
}

function getUranusDegree(year: number): number {
  // Уран: ~84 года на оборот
  // Эпоха: 2000 = ~310° (Водолей)
  return ((year - 2000) * (360 / 84) + 310 + 360) % 360
}

function getNeptuneDegree(year: number): number {
  // Нептун: ~165 лет на оборот
  // Эпоха: 2000 = ~300° (Водолей)
  return ((year - 2000) * (360 / 165) + 300 + 360) % 360
}

function getPlutoDegree(year: number): number {
  // Плутон: ~248 лет на оборот, но скорость сильно варьируется
  // Эпоха: 2000 = ~250° (Стрелец)
  return ((year - 2000) * (360 / 248) + 250 + 360) % 360
}
