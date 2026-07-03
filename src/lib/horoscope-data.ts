/**
 * Генератор ежедневных гороскопов по знаку зодиака.
 *
 * Поскольку у нас нет астрологического API, мы процедурно генерируем
 * тексты на основе:
 *  - дня недели (управитель знака)
 *  - фазы Луны
 *  - знака Луны (из getMoonPhase)
 *  - нумерологии даты
 *  - стихии знака
 *  - детерминированного seed по (знак, дата), чтобы текст был стабильным в течение дня
 *
 * 5 категорий: общий, любовь, карьера, финансы, здоровье.
 * 3 периода: сегодня, завтра, неделя.
 */

import { getMoonPhase, getLunarDay } from "./runes-moon-data"

export type HoroscopeCategory = "general" | "love" | "career" | "finance" | "health"
export type HoroscopePeriod = "today" | "tomorrow" | "week"

export interface HoroscopeText {
  title: string
  text: string
  advice: string
  rating: number  // 1-10
  luckyItem?: string
}

export interface DailyHoroscope {
  sign: string
  date: Date
  period: HoroscopePeriod
  texts: Record<HoroscopeCategory, HoroscopeText>
}

// ===== Знаки зодиака =====
export const horoscopeSigns = [
  { id: "aries", name: "Овен", symbol: "♈", element: "Огонь", dateRange: "21 марта — 20 апреля", color: "#dc2626" },
  { id: "taurus", name: "Телец", symbol: "♉", element: "Земля", dateRange: "21 апреля — 20 мая", color: "#16a34a" },
  { id: "gemini", name: "Близнецы", symbol: "♊", element: "Воздух", dateRange: "21 мая — 20 июня", color: "#eab308" },
  { id: "cancer", name: "Рак", symbol: "♋", element: "Вода", dateRange: "21 июня — 22 июля", color: "#3b82f6" },
  { id: "leo", name: "Лев", symbol: "♌", element: "Огонь", dateRange: "23 июля — 22 августа", color: "#f97316" },
  { id: "virgo", name: "Дева", symbol: "♍", element: "Земля", dateRange: "23 августа — 22 сентября", color: "#65a30d" },
  { id: "libra", name: "Весы", symbol: "♎", element: "Воздух", dateRange: "23 сентября — 22 октября", color: "#ec4899" },
  { id: "scorpio", name: "Скорпион", symbol: "♏", element: "Вода", dateRange: "23 октября — 21 ноября", color: "#7c2d12" },
  { id: "sagittarius", name: "Стрелец", symbol: "♐", element: "Огонь", dateRange: "22 ноября — 21 декабря", color: "#7c3aed" },
  { id: "capricorn", name: "Козерог", symbol: "♑", element: "Земля", dateRange: "22 декабря — 19 января", color: "#475569" },
  { id: "aquarius", name: "Водолей", symbol: "♒", element: "Воздух", dateRange: "20 января — 18 февраля", color: "#0ea5e9" },
  { id: "pisces", name: "Рыбы", symbol: "♓", element: "Вода", dateRange: "19 февраля — 20 марта", color: "#06b6d4" },
]

// ===== Детерминированный seed по (знак, дата) =====
function hashSeed(signId: string, date: Date): number {
  const dateStr = date.toISOString().slice(0, 10)
  let hash = 0
  const str = `${signId}-${dateStr}`
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length]
}

// ===== Фрагменты текстов по стихиям и фазам =====

const elementDescriptors: Record<string, { energy: string; approach: string; tone: string }> = {
  "Огонь": {
    energy: "Энергия дня заряжает вас огненной силой — хочется действовать и побеждать",
    approach: "Двигайтесь вперёд смело, но без излишней спешки",
    tone: "яростный",
  },
  "Земля": {
    energy: "День благоволит спокойному и методичному подходу земной стихии",
    approach: "Опирайтесь на практичность и терпение — rushing сейчас ни к чему",
    tone: "стабильный",
  },
  "Воздух": {
    energy: "Воздушная лёгкость и общительность наполняют этот день",
    approach: "Общайтесь, обменивайтесь идеями, будьте гибки в планах",
    tone: "лёгкий",
  },
  "Вода": {
    energy: "Эмоциональная глубина водной стихии усиливает интуицию",
    approach: "Прислушивайтесь к чувствам, не подавляйте эмоции, заботьтесь о близких",
    tone: "чувствительный",
  },
}

const phaseTones: Record<number, string> = {
  0: "Новолуние добавляет дню тишину и потенциал — закладывайте намерения",
  1: "Растущий серп усиливает желание строить и расти",
  2: "Первая четверть требует решительных действий",
  3: "Растущая Луна приближает culmination — уточняйте планы",
  4: "Полнолуние обостряет эмоции — будьте осторожны с резкими словами",
  5: "Убывающая Луна приглашает подвести итоги и распределить энергию",
  6: "Последняя четверть — фаза отпускания и прощения",
  7: "Убывающий серп требует отдыха и восстановления",
}

const generalOpeners = [
  "Сегодняшний день",
  "Этот день",
  "День обещает быть",
  "Звёзды говорят, что сегодняшний день",
  "Астрологическая картина дня",
]

const generalMiddles = [
  "успешным, если вы останетесь верны себе",
  "полным неожиданностей, к которым стоит подготовиться",
  "благоприятным для новых начинаний и важных разговоров",
  "сложным в первой половине, но продуктивным во второй",
  "хорошим для завершения начатого ранее",
  "идеальным для общения и обмена идеями",
  "днём, когда стоит прислушаться к интуиции",
]

const generalClosers = [
  "Главное — не торопиться с выводами и сохранять внутренний баланс.",
  "Помните: даже небольшие шаги сегодня приведут к большим результатам завтра.",
  "Будьте готовы к тому, что планы могут измениться — гибкость станет вашим союзником.",
  "Не бойтесь просить совета у тех, кому доверяете.",
  "Сосредоточьтесь на главном, и мелочи сами встанут на места.",
]

const loveOpeners = [
  "В сфере любви",
  "Романтическая сторона дня",
  "Отношения сегодня",
  "В личной жизни",
  "Эмоциональный фон дня",
]

const loveMiddles = [
  "требует искренности — говорите с партнёром о чувствах открыто",
  "благоприятен для свиданий и душевных разговоров",
  "приносит неожиданный поворот — будьте готовы удивляться",
  "уязвим для конфликтов из-за мелочей — выберите мягкость",
  "хорош для примирения после давней ссоры",
  "поддерживает новые знакомства, особенно через общих друзей",
  "напомнит о важности такта и уважения к границам близких",
]

const careerOpeners = [
  "В карьере",
  "Деловая сфера",
  "Рабочий день",
  "В профессиональных делах",
  "Трудовые вопросы",
]

const careerMiddles = [
  "хорош для презентаций, переговоров и presentations своего труда",
  "требует внимания к деталям — проверьте факты дважды",
  "благоприятен для старта новых проектов, особенно долгосрочных",
  "поддерживает обучение и повышение квалификации",
  "сложен для принятия радикальных решений — лучше всё обдумать",
  "хорош для завершения ранее начатых дел",
  "приносит признание ваших усилий со стороны руководства",
]

const financeOpeners = [
  "В финансовых делах",
  "Денежная сфера",
  "Финансовый аспект дня",
  "С деньгами",
  "В вопросах бюджета",
]

const financeMiddles = [
  "хорош для крупных покупок и инвестиций в долгое",
  "не рекомендуются спонтанные траты на эмоциях",
  "благоприятен для планирования бюджета и накоплений",
  "приносит шанс на дополнительный доход через хобби",
  "требует осторожности с долгами и кредитами",
  "поддерживает переговоры о повышении зарплаты",
  "хорош для аудита расходов и пересмотра подписок",
]

const healthOpeners = [
  "В здоровье",
  "Физическое состояние",
  "Самочувствие",
  "В сфере здоровья",
  "Телесный аспект дня",
]

const healthMiddles = [
  "обратите внимание на режим сна — ложитесь раньше",
  "хорошо пройдёт лёгкая физическая активность: прогулка, йога, растяжка",
  "избегайте тяжёлой пищи и переедания — выберите лёгкое питание",
  "полезно meditation или просто 10 минут тишины",
  "уязвимы нервы — снизьте кофеин и добавьте воду",
  "хороший день для планового обследования или анализа",
  "помните про осанку и перерывы в работе за экраном",
]

const adviceTemplates = [
  "Не бойтесь делегировать — вам не обязательно всё делать самому.",
  "Сделайте сегодня один маленький шаг к большой цели.",
  "Поблагодарите кого-то за поддержку — это укрепит отношения.",
  "Запишите три вещи, за которые вы благодарны этому дню.",
  "Отложите хотя бы 15 минут наедине с собой.",
  "Позвоните тому, кого давно не слышали — это будет важно.",
  "Сделайте что-то творческое, даже если вы не считаете себя творцом.",
  "Прогулка на свежем воздухе принесёт больше, чем вы ожидаете.",
  "Будьте осторожны с обещаниями — сегодня слово весит особенно много.",
  "Не откладывайте сложный разговор — он пройдёт легче, чем кажется.",
]

const luckyItems = [
  "синий цвет", "зелёный камень", "цифра 7", "восточное направление",
  "аромат лаванды", "музыка с фортепиано", "тёплый чай с имбирём",
  "прогулка у воды", "контакт с деревом", "жёлтый предмет в кармане",
  "букет полевых цветов", "свеча тёплого оттенка",
]

// Сферы, зависящие от Луны в знаке
const moonZodiacBoosts: Record<string, string> = {
  "Овен ♈": "Луна в Овне подстёгивает к действиям, но чревата импульсивностью.",
  "Телец ♉": "Луна в Тельце усиливает финансовую удачу и чувственность.",
  "Близнецы ♊": "Луна в Близнецах благоволит коммуникации и обучению.",
  "Рак ♋": "Луна в Раке обостряет интуицию и семейные чувства.",
  "Лев ♌": "Луна во Льве повышает творческую энергию и харизму.",
  "Дева ♍": "Луна в Деве помогает с деталями, здоровьем и порядком.",
  "Весы ♎": "Луна в Весах благоприятна для партнёрства и переговоров.",
  "Скорпион ♏": "Луна в Скорпионе усиливает проницательность и эмоциональную глубину.",
  "Стрелец ♐": "Луна в Стрельце расширяет горизонты, хороша для путешествий.",
  "Козерог ♑": "Луна в Козероге помогает с карьерой и дисциплиной.",
  "Водолей ♒": "Луна в Водолее благоприятна для коллективных дел и инноваций.",
  "Рыбы ♓": "Луна в Рыбах усиливает интуицию, творчество и эмпатию.",
}

// Нумерология даты — добавляет финальный штрих
function dateNumerology(date: Date): number {
  const d = date.getDate()
  const m = date.getMonth() + 1
  const y = date.getFullYear()
  let sum = d + m + y
  while (sum > 9) {
    sum = String(sum).split("").reduce((a, b) => a + parseInt(b), 0)
  }
  return sum
}

// Рейтинг дня (1-10) — на основе нескольких факторов
function calculateRating(seed: number, phaseIdx: number, dayNum: number): number {
  let rating = 5
  if (phaseIdx === 3 || phaseIdx === 4) rating += 2  // растущая/полнолуние
  if (phaseIdx === 0 || phaseIdx === 7) rating -= 1  // новолуние/убывающий серп
  if ([1, 5, 9].includes(dayNum)) rating += 1
  rating += (seed % 3) - 1  // лёгкий случайный разброс
  return Math.max(1, Math.min(10, rating))
}

function buildText(
  signId: string,
  date: Date,
  openers: string[],
  middles: string[],
  closers: string[],
  element: string,
): string {
  const seed = hashSeed(signId, date)
  const moon = getMoonPhase(date)
  const elem = elementDescriptors[element] ?? elementDescriptors["Огонь"]
  const phaseTone = phaseTones[moon.phaseIndex] ?? ""
  const moonBoost = moonZodiacBoosts[moon.zodiacSign] ?? ""

  const opener = pick(openers, seed)
  const middle = pick(middles, seed >> 3)
  const closer = pick(closers, seed >> 5)

  return `${opener} ${middle}. ${elem.energy}. ${phaseTone}. ${moonBoost} ${closer}`.trim()
}

/**
 * Сгенерировать гороскоп для знака на указанную дату.
 */
export function getDailyHoroscope(signId: string, date: Date, period: HoroscopePeriod = "today"): DailyHoroscope {
  const sign = horoscopeSigns.find(s => s.id === signId) ?? horoscopeSigns[0]
  const seed = hashSeed(signId, date)
  const dayNum = dateNumerology(date)
  const rating = calculateRating(seed, getMoonPhase(date).phaseIndex, dayNum)

  const general = buildText(signId, date, generalOpeners, generalMiddles, generalClosers, sign.element)
  const love = buildText(signId, date, loveOpeners, loveMiddles, generalClosers, sign.element)
  const career = buildText(signId, date, careerOpeners, careerMiddles, generalClosers, sign.element)
  const finance = buildText(signId, date, financeOpeners, financeMiddles, generalClosers, sign.element)
  const health = buildText(signId, date, healthOpeners, healthMiddles, generalClosers, sign.element)

  return {
    sign: sign.name,
    date,
    period,
    texts: {
      general: {
        title: "Общий гороскоп",
        text: general,
        advice: pick(adviceTemplates, seed >> 7),
        rating,
        luckyItem: pick(luckyItems, seed >> 9),
      },
      love: {
        title: "Любовь и отношения",
        text: love,
        advice: pick(adviceTemplates.filter(a => a.includes("благодар") || a.includes("позвон") || a.includes("разговор") || a.includes("отношен")), seed >> 11) ?? adviceTemplates[0],
        rating: Math.max(1, Math.min(10, rating + ((seed >> 2) % 3) - 1)),
      },
      career: {
        title: "Карьера и работа",
        text: career,
        advice: pick(adviceTemplates.filter(a => a.includes("делег") || a.includes("шаг") || a.includes("цель") || a.includes("обеща")), seed >> 13) ?? adviceTemplates[0],
        rating: Math.max(1, Math.min(10, rating + ((seed >> 4) % 3) - 1)),
      },
      finance: {
        title: "Финансы",
        text: finance,
        advice: pick(adviceTemplates, seed >> 15),
        rating: Math.max(1, Math.min(10, rating + ((seed >> 6) % 3) - 1)),
      },
      health: {
        title: "Здоровье",
        text: health,
        advice: pick(adviceTemplates.filter(a => a.includes("сон") || a.includes("прогул") || a.includes("тишин") || a.includes("вод")), seed >> 17) ?? adviceTemplates[0],
        rating: Math.max(1, Math.min(10, rating + ((seed >> 8) % 3) - 1)),
      },
    },
  }
}

/**
 * Гороскоп на неделю: агрегирует прогноз на 7 дней вперёд.
 */
export function getWeeklyHoroscope(signId: string, startDate: Date): {
  title: string
  summary: string
  ratings: { day: Date; rating: number; weekday: string }[]
  bestDay: { day: Date; weekday: string; rating: number } | null
  worstDay: { day: Date; weekday: string; rating: number } | null
  text: string
} {
  const weekdays = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"]
  const ratings: { day: Date; rating: number; weekday: string }[] = []
  for (let i = 0; i < 7; i++) {
    const d = new Date(startDate)
    d.setDate(d.getDate() + i)
    const h = getDailyHoroscope(signId, d, "week")
    ratings.push({ day: d, rating: h.texts.general.rating, weekday: weekdays[d.getDay()] })
  }
  const bestDay = ratings.reduce((a, b) => b.rating > a.rating ? b : a, ratings[0])
  const worstDay = ratings.reduce((a, b) => b.rating < a.rating ? b : a, ratings[0])
  const avg = Math.round(ratings.reduce((a, b) => a + b.rating, 0) / ratings.length)

  const sign = horoscopeSigns.find(s => s.id === signId)
  const elem = sign ? elementDescriptors[sign.element] : elementDescriptors["Огонь"]
  const seed = hashSeed(signId, startDate)

  const summary = `Неделя для ${sign?.name ?? "вас"} несёт ${elem.tone} тон. Средний рейтинг недели — ${avg}/10. ${pick(phaseTones[getMoonPhase(startDate).phaseIndex] ? [phaseTones[getMoonPhase(startDate).phaseIndex]] : generalMiddles, seed)}`

  const text = `На этой неделе ${elem.energy.toLowerCase()}. Лучший день — ${bestDay.weekday} (рейтинг ${bestDay.rating}/10), наиболее сложный — ${worstDay.weekday} (рейтинг ${worstDay.rating}/10). ${pick(generalClosers, seed >> 2)}`

  return {
    title: `Гороскоп на неделю для ${sign?.name}`,
    summary,
    ratings,
    bestDay,
    worstDay,
    text,
  }
}

/**
 * Определить знак знака по дате рождения.
 */
export function getSignByBirthDate(day: number, month: number): string {
  // month is 1-12
  const ranges: { id: string; range: [number, number, number, number] }[] = [
    { id: "capricorn", range: [12, 22, 1, 19] },
    { id: "aquarius", range: [1, 20, 2, 18] },
    { id: "pisces", range: [2, 19, 3, 20] },
    { id: "aries", range: [3, 21, 4, 20] },
    { id: "taurus", range: [4, 21, 5, 20] },
    { id: "gemini", range: [5, 21, 6, 20] },
    { id: "cancer", range: [6, 21, 7, 22] },
    { id: "leo", range: [7, 23, 8, 22] },
    { id: "virgo", range: [8, 23, 9, 22] },
    { id: "libra", range: [9, 23, 10, 22] },
    { id: "scorpio", range: [10, 23, 11, 21] },
    { id: "sagittarius", range: [11, 22, 12, 21] },
  ]
  for (const r of ranges) {
    const [sm, sd, em, ed] = r.range
    if (sm > em) {
      // Capricorn: Dec 22 - Jan 19
      if ((month === sm && day >= sd) || (month === em && day <= ed)) return r.id
    } else {
      if ((month === sm && day >= sd) || (month === em && day <= ed)) return r.id
    }
  }
  return "aries"
}
