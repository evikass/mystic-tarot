/**
 * Благоприятные дни по знаку зодиака.
 *
 * Алгоритм оценки:
 * 1. День недели управителя знака (+20 баллов)
 * 2. День недели гармонирующей стихии (+10 баллов)
 * 3. Лунная фаза (растущая/полнолуние +, новолуние/убывающая −)
 * 4. Нумерологическое число дня (1, 5, 9 — благоприятные)
 * 5. Совпадение числа дня с числом знака (+5)
 *
 * Итог: 0–100. ≥70 — благоприятный, 40–69 — нейтральный, <40 — неблагоприятный.
 */

import { getMoonPhase } from "./runes-moon-data"

export type DayFavorability = {
  date: Date
  day: number
  weekday: number // 0 = Sun, 6 = Sat
  score: number
  level: "favorable" | "neutral" | "unfavorable"
  reasons: string[]
  moonEmoji: string
  moonName: string
}

// Классические управители знаков и дни недели (0=воскресенье)
const rulerDays: Record<string, number[]> = {
  "Овен": [2],         // Марс → вторник
  "Телец": [5],        // Венера → пятница
  "Близнецы": [3],     // Меркурий → среда
  "Рак": [1],          // Луна → понедельник
  "Лев": [0],          // Солнце → воскресенье
  "Дева": [3],         // Меркурий → среда
  "Весы": [5],         // Венера → пятница
  "Скорпион": [2],     // Марс → вторник
  "Стрелец": [4],      // Юпитер → четверг
  "Козерог": [6],      // Сатурн → суббота
  "Водолей": [6],      // Сатурн/Уран → суббота
  "Рыбы": [4],         // Юпитер/Нептун → четверг
}

// Гармонирующие дни по стихии
const elementDays: Record<string, number[]> = {
  "Огонь": [0, 2],     // Солнце, Марс — родственные огненные планеты
  "Земля": [6, 4],     // Сатурн, Юпитер
  "Воздух": [3, 5],    // Меркурий, Венера
  "Вода": [1, 4],      // Луна, Юпитер
}

const weekdayNames = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"]
const weekdayShort = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"]

const signNumber: Record<string, number> = {
  "Овен": 1, "Телец": 2, "Близнецы": 3, "Рак": 4, "Лев": 5, "Дева": 6,
  "Весы": 7, "Скорпион": 8, "Стрелец": 9, "Козерог": 1, "Водолей": 2, "Рыбы": 3,
}

export function getWeekdayName(d: number): string {
  return weekdayNames[d] ?? ""
}

export function getWeekdayShort(d: number): string {
  return weekdayShort[d] ?? ""
}

/**
 * Вычислить нумерологическое число даты (1–9).
 */
function numerologyNumber(date: Date): number {
  const d = date.getDate()
  const m = date.getMonth() + 1
  const y = date.getFullYear()
  let sum = d + m + y
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = String(sum).split("").reduce((a, b) => a + parseInt(b), 0)
  }
  if (sum > 9) sum = String(sum).split("").reduce((a, b) => a + parseInt(b), 0)
  return sum
}

/**
 * Рассчитать благоприятность одного дня для указанного знака зодиака.
 */
export function calculateDayFavorability(date: Date, zodiacName: string, zodiacElement: string): DayFavorability {
  const weekday = date.getDay()
  const reasons: string[] = []
  let score = 40

  // 1. День управителя
  const rulerDayList = rulerDays[zodiacName] ?? []
  if (rulerDayList.includes(weekday)) {
    score += 20
    reasons.push(`День управителя ${zodiacName} (${weekdayNames[weekday]})`)
  }

  // 2. Гармонирующий день стихии
  const elemDayList = elementDays[zodiacElement] ?? []
  if (elemDayList.includes(weekday) && !rulerDayList.includes(weekday)) {
    score += 10
    reasons.push(`День стихии ${zodiacElement} (${weekdayNames[weekday]})`)
  }

  // 3. Лунная фаза
  const moon = getMoonPhase(date)
  const phaseIdx = moon.phaseIndex
  // 2 = Первая четверть, 3 = Растущая Луна, 4 = Полнолуние — наиболее благоприятно
  // 0 = Новолуние — низко
  // 6 = Последняя четверть, 7 = Убывающая — неблагоприятно
  if (phaseIdx === 4) {
    score += 15
    reasons.push("Полнолуние — пик энергии")
  } else if (phaseIdx === 3 || phaseIdx === 2) {
    score += 10
    reasons.push(`${moon.phase.name} — рост энергии`)
  } else if (phaseIdx === 0) {
    score -= 10
    reasons.push("Новолуние — время покоя")
  } else if (phaseIdx === 6 || phaseIdx === 7) {
    score -= 5
    reasons.push("Убывающая Луна — замедление")
  }

  // 4. Нумерология дня
  const dayNum = numerologyNumber(date)
  if ([1, 5, 9].includes(dayNum)) {
    score += 10
    reasons.push(`Число дня ${dayNum} — благоприятное`)
  }

  // 5. Совпадение с числом знака
  const signNum = signNumber[zodiacName]
  if (signNum && dayNum === signNum) {
    score += 5
    reasons.push(`Число дня совпадает с числом знака (${dayNum})`)
  }

  score = Math.max(0, Math.min(100, score))

  let level: DayFavorability["level"] = "neutral"
  if (score >= 70) level = "favorable"
  else if (score < 40) level = "unfavorable"

  return {
    date,
    day: date.getDate(),
    weekday,
    score,
    level,
    reasons,
    moonEmoji: moon.phase.emoji,
    moonName: moon.phase.name,
  }
}

/**
 * Рассчитать календарь благоприятных дней на месяц.
 */
export function calculateMonthFavorability(
  year: number,
  month: number, // 0-11
  zodiacName: string,
  zodiacElement: string,
): DayFavorability[] {
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const result: DayFavorability[] = []
  for (let d = 1; d <= daysInMonth; d++) {
    result.push(calculateDayFavorability(new Date(year, month, d), zodiacName, zodiacElement))
  }
  return result
}

/**
 * Подобрать совет дня.
 */
export function getDayAdvice(day: DayFavorability): { title: string; advice: string } {
  if (day.level === "favorable") {
    return {
      title: "✦ Благоприятный день",
      advice: "Отличное время для новых начинаний, важных переговоров, свиданий и крупных покупок. Энергия на вашей стороне.",
    }
  }
  if (day.level === "unfavorable") {
    return {
      title: "✦ Неблагоприятный день",
      advice: "Отложите рискованные решения и крупные траты. Лучше отдохнуть, закончить начатое и поберечь ресурсы.",
    }
  }
  return {
    title: "✦ Нейтральный день",
    advice: "Обычный день для повседневных дел. Можно работать по плану, но без экстрима.",
  }
}
