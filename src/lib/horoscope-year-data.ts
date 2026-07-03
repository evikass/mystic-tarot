/**
 * Годовой гороскоп по знаку зодиака.
 *
 * Структура: общая характеристика года + прогноз по 12 месяцам.
 * Учитывает:
 *  - стихию знака (Огонь/Земля/Воздух/Вода)
 *  - нумерологию года (1-9 — Personal Year Number)
 *  - китайский зодиак года (для доп. акцентов)
 *
 * Год считается от 1 января до 31 декабря (не от дня рождения — упрощение).
 */

import { getChineseZodiac } from "./psychology-data"
import { horoscopeSigns } from "./horoscope-data"

export interface MonthForecast {
  month: number  // 1-12
  name: string
  theme: string
  text: string
  rating: number  // 1-10
  advice: string
}

export interface YearHoroscope {
  sign: string
  year: number
  personalYearNumber: number
  personalYearTitle: string
  personalYearDescription: string
  chineseAnimal: string
  chineseAdvice: string
  overallRating: number
  overallText: string
  bestMonths: number[]
  worstMonths: number[]
  months: MonthForecast[]
  love: string
  career: string
  finance: string
  health: string
}

const monthNames = [
  "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
]

const monthThemes = [
  "Зимний старт и планирование",
  "Перемены и рост энергии",
  "Весеннее пробуждение и социализация",
  "Действие и карьерный рывок",
  "Творчество и романтика",
  "Эмоции и семейные дела",
  "Энергия и активные действия",
  "Урожай и подведение итогов",
  "Анализ и корректировка планов",
  "Углубление отношений и ресурсы",
  "Рефлексия и подготовка к финалу",
  "Завершение цикла и освобождение",
]

// ===== Нумерология года =====
function personalYearNumber(year: number): number {
  let sum = year
  while (sum > 9) {
    sum = String(sum).split("").reduce((a, b) => a + parseInt(b), 0)
  }
  return sum
}

const personalYearDescriptions: Record<number, { title: string; description: string }> = {
  1: {
    title: "Год новых начинаний (1)",
    description: "Год сеяния семян. То, что вы начнёте сейчас, определит следующие 9 лет. Время инициативы, смелых решений и независимости. Не бойтесь менять работу, место жительства или отношения, которые изжили себя.",
  },
  2: {
    title: "Год партнёрства и терпения (2)",
    description: "Год сотрудничества, чувствительности и медленного созревания. Не форсируйте события — стройте отношения, союзы, команду. Учитесь дипломатии и компромиссам.",
  },
  3: {
    title: "Год самовыражения и радости (3)",
    description: "Год творчества, общения и расширения социальных контактов. Хороший год для искусства, путешествий, публичных выступлений и романтики. Не распыляйтесь на мелочи.",
  },
  4: {
    title: "Год труда и фундамента (4)",
    description: "Год тяжёлой работы, строительства фундамента, наведения порядка. Не время для авантюр — время для дисциплины и ответственности. Усилия этого года окупятся позже.",
  },
  5: {
    title: "Год перемен и свободы (5)",
    description: "Год неожиданностей, путешествий, свободы и перемен. Будьте гибки — рутина разрушится, и это к лучшему. Хороший год для смены работы, переезда, новых хобби.",
  },
  6: {
    title: "Год семьи и ответственности (6)",
    description: "Год дома, семьи, брака, детей и ремонтов. Уделите внимание близким и домашнему очагу. Хороший год для покупок недвижимости и долгосрочных обязательств.",
  },
  7: {
    title: "Год внутреннего поиска (7)",
    description: "Год рефлексии, учения, духовного роста и уединения. Не время для активных внешних действий — копайте вглубь. Хороший год для обучения, медитации, исследования.",
  },
  8: {
    title: "Год власти и денег (8)",
    description: "Год материальных достижений, карьерного роста, финансов и признания. То, что вы строили в 4-й год, приносит плоды. Будьте честны и амбициозны.",
  },
  9: {
    title: "Год завершения и освобождения (9)",
    description: "Год подведения итогов девятилетнего цикла. Отпускайте то, что больше не служит — людей, привычки, проекты. Готовьтесь к новому циклу, который начнётся в следующем году.",
  },
}

// ===== Стихия знака — общий тон года =====
const elementYearThemes: Record<string, { love: string; career: string; finance: string; health: string }> = {
  "Огонь": {
    love: "В любви год ярких страстей и романтических авантюр. Не дайте импульсивности разрушить то, что ценно.",
    career: "В карьере год лидерства, презентаций и инициатив. Чем смелее — тем выше результат.",
    finance: "Финансы нестабильны: большие заработки чередуются с крупными тратами. Дисциплина в расходах критична.",
    health: "Следите за сердцем, давлением и уровнем стресса. Активный спорт полезен, но без фанатизма.",
  },
  "Земля": {
    love: "В любви год стабильности и долгих отношений. Хороший год для брака и семьи.",
    career: "В карьере год методичного труда, упорства и медленного, но верного роста.",
    finance: "Финансы стабильны. Хороший год для инвестиций в недвижимость и долгосрочные активы.",
    health: "Следите за пищеварением, костями и суставами. Простой режим питания важнее диет.",
  },
  "Воздух": {
    love: "В любви год общения, новых знакомств, лёгких романов. Связь через интеллект важнее эмоций.",
    career: "В карьере год обучения, интеллектуального труда, переговоров, IT и коммуникаций.",
    finance: "Финансы зависят от вашей гибкости и сети контактов. Инвестиции в образование окупятся.",
    health: "Следите за нервной системой и дыханием. Проветривайте помещение, гуляйте на воздухе.",
  },
  "Вода": {
    love: "В любви год глубоких эмоций, интуиции и родственных душ. Возможна сильная встреча.",
    career: "В карьере год творчества, медицины, психологии, искусства. Доверьтесь интуиции.",
    finance: "Финансы зависят от эмоционального состояния. Не принимайте денежных решений на эмоциях.",
    health: "Следите за почками, лимфой и эмоциональным фоном. Вода, отдых и тишина необходимы.",
  },
}

// ===== Китайский зодиак года — доп. акценты =====
const chineseYearAdvice: Record<string, string> = {
  "Крыса": "Год Крысы благоприятен для накоплений, хитрости и обучения. Не упускайте возможности.",
  "Бык": "Год Быка требует упорства и дисциплины. Труд принесёт заслуженный результат.",
  "Тигр": "Год Тигра несёт перемены и риск. Будьте смелы, но благоразумны.",
  "Кролик": "Год Кролика мягкий, дипломатичный. Хороший год для семьи и уюта.",
  "Дракон": "Год Дракона — удача и амбиции. Не бойтесь масштабных проектов.",
  "Змея": "Год Змеи требует мудрости и хитрости. Хороший год для инвестиций и стратегии.",
  "Лошадь": "Год Лошади — активность, путешествия, перемены. Не стойте на месте.",
  "Коза": "Год Козы — творчество, искусство, уют. Заботьтесь о красоте вокруг.",
  "Обезьяна": "Год Обезьяны — изобретательность, юмор, обучение. Будьте гибки.",
  "Петух": "Год Петуха — честность, гордость, порядок. Держите слово.",
  "Собака": "Год Собаки — верность, дружба, защита. Цените близких.",
  "Свинья": "Год Свиньи — изобилие, удовольствие, завершение. Радуйтесь жизни.",
}

// ===== Детерминированный seed =====
function hashSeed(signId: string, year: number): number {
  let hash = 0
  const str = `${signId}-${year}`
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length]
}

const monthAdviceTemplates = [
  "Сделайте один большой шаг в этом месяце — даже если страшно.",
  "Сосредоточьтесь на одном проекте, не распыляйтесь.",
  "Запланируйте время для отдыха и семьи — это окупится вдвое.",
  "Проявите инициативу в карьере — вас заметят.",
  "Пересмотрите бюджет и откажитесь от лишних трат.",
  "Позвоните старому другу — это будет важно.",
  "Сделайте что-то творческое, даже если не умеете.",
  "Отложите решение на неделю, если сомневаетесь.",
  "Сделайте генеральную уборку — физически и эмоционально.",
  "Запишитесь на курс или начните читать книгу.",
  "Поговорите с тем, с кем давно не общались.",
  "Сделайте подарок себе — маленький, но значимый.",
]

/**
 * Рассчитать годовой гороскоп для знака зодиака.
 */
export function getYearHoroscope(signId: string, year: number = new Date().getFullYear()): YearHoroscope {
  const sign = horoscopeSigns.find(s => s.id === signId) ?? horoscopeSigns[0]
  const seed = hashSeed(signId, year)
  const pyn = personalYearNumber(year)
  const pynInfo = personalYearDescriptions[pyn] ?? personalYearDescriptions[1]
  const elem = elementYearThemes[sign.element] ?? elementYearThemes["Огонь"]

  // Chinese zodiac of the year
  let chineseAnimal = ""
  let chineseAdvice = ""
  try {
    const cz = getChineseZodiac(year)
    if (cz) {
      chineseAnimal = cz.animal
      chineseAdvice = chineseYearAdvice[cz.animal] ?? ""
    }
  } catch {
    // ignore
  }

  // 12 месяцев
  const months: MonthForecast[] = monthNames.map((name, i) => {
    const monthSeed = seed + i * 13
    const rating = Math.max(1, Math.min(10, 5 + ((monthSeed % 7) - 2)))
    return {
      month: i + 1,
      name,
      theme: monthThemes[i],
      text: `${monthThemes[i]}. ${pick(monthAdviceTemplates, monthSeed >> 2)}`,
      rating,
      advice: pick(monthAdviceTemplates, monthSeed >> 4),
    }
  })

  // Лучшие/худшие месяцы
  const sortedByRating = [...months].sort((a, b) => b.rating - a.rating)
  const bestMonths = sortedByRating.slice(0, 3).map(m => m.month)
  const worstMonths = sortedByRating.slice(-3).map(m => m.month)

  const overallRating = Math.round(months.reduce((a, m) => a + m.rating, 0) / 12)

  const overallText = `${pynInfo.description} ${elem.career} Стихия ${sign.element} задаёт общий тон года. ${chineseAdvice}`

  return {
    sign: sign.name,
    year,
    personalYearNumber: pyn,
    personalYearTitle: pynInfo.title,
    personalYearDescription: pynInfo.description,
    chineseAnimal,
    chineseAdvice,
    overallRating,
    overallText,
    bestMonths,
    worstMonths,
    months,
    love: elem.love,
    career: elem.career,
    finance: elem.finance,
    health: elem.health,
  }
}
