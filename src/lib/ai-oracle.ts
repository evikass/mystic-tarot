/**
 * ИИ-Оракул — локальная экспертная система для мистического чат-аватара.
 *
 * Поскольку сайт статический (GitHub Pages), мы не можем вызывать настоящий LLM
 * на сервере. Вместо этого — экспертная система, которая:
 *  - распознаёт ключевые слова и намерения в вопросе пользователя
 *  - использует сохранённые имя и дату рождения (sessionStorage)
 *  - отвечает, опираясь на реальные данные приложения:
 *    знак зодиака, личный аркан, тайна имени, нумерология, гороскоп дня,
 *    аркан года, совместимость, фаза Луны, карты Таро
 *
 * Это даёт ощущение живого ИИ-помощника, который «знает» о вас.
 */

import { getZodiacSign, calculateBirthDate, type ZodiacSign, type BirthDateResult } from "./psychology-data"
import { getBirthArcana, getYearArcana, getMeditationCard } from "./arcana-data"
import { findNameSecret } from "./name-secret-data"
import { getDailyHoroscope, getWeeklyHoroscope, getSignByBirthDate, horoscopeSigns } from "./horoscope-data"
import { getMoonPhase, getMoonInfluence, getLunarDay } from "./runes-moon-data"
import { allTarotCards } from "./tarot-data"

export interface OracleUserContext {
  name: string
  day: number | null
  month: number | null
  year: number | null
}

export interface OracleMessage {
  role: "user" | "oracle"
  content: string
  timestamp: number
}

/** Загрузить контекст пользователя из sessionStorage */
export function loadUserContext(): OracleUserContext {
  if (typeof window === "undefined") {
    return { name: "", day: null, month: null, year: null }
  }
  try {
    const raw = sessionStorage.getItem("oracle-user-context")
    if (raw) return JSON.parse(raw)
  } catch {}
  return { name: "", day: null, month: null, year: null }
}

/** Сохранить контекст пользователя в sessionStorage */
export function saveUserContext(ctx: OracleUserContext): void {
  if (typeof window === "undefined") return
  try {
    sessionStorage.setItem("oracle-user-context", JSON.stringify(ctx))
  } catch {}
}

/** Очистить контекст */
export function clearUserContext(): void {
  if (typeof window === "undefined") return
  try {
    sessionStorage.removeItem("oracle-user-context")
  } catch {}
}

// ===== Утилиты для распознавания =====

const LEARN_NAME_PATTERNS = [
  /меня\s+зовут\s+([а-яёa-z]+)/i,
  /мо[ёе]\s+имя\s+[—-]?\s*([а-яёa-z]+)/i,
  /я\s+([а-яё]{2,20})\s*[,\.]/i,
]

const LEARN_BIRTHDATE_PATTERNS = [
  /(\d{1,2})[\.\/\s](\d{1,2})[\.\/\s](\d{4})/,
  /родил(?:ся|ась)\s+(\d{1,2})[\.\/\s](\d{1,2})[\.\/\s](\d{4})/i,
]

function extractName(text: string): string | null {
  for (const p of LEARN_NAME_PATTERNS) {
    const m = text.match(p)
    if (m && m[1]) {
      const n = m[1].trim()
      // Capitalize first letter
      return n.charAt(0).toUpperCase() + n.slice(1).toLowerCase()
    }
  }
  return null
}

function extractBirthdate(text: string): { day: number; month: number; year: number } | null {
  for (const p of LEARN_BIRTHDATE_PATTERNS) {
    const m = text.match(p)
    if (m) {
      const day = parseInt(m[1])
      const month = parseInt(m[2])
      const year = parseInt(m[3])
      if (day >= 1 && day <= 31 && month >= 1 && month <= 12 && year >= 1900 && year <= 2100) {
        return { day, month, year }
      }
    }
  }
  return null
}

// ===== Намерения =====

type Intent =
  | "greeting"
  | "learn_name"
  | "learn_birthdate"
  | "ask_zodiac"
  | "ask_arcana"
  | "ask_name_secret"
  | "ask_horoscope_today"
  | "ask_horoscope_tomorrow"
  | "ask_horoscope_week"
  | "ask_year_arcana"
  | "ask_moon"
  | "ask_compatibility"
  | "ask_love"
  | "ask_career"
  | "ask_finance"
  | "ask_health"
  | "ask_card_meaning"
  | "ask_advice"
  | "ask_who_are_you"
  | "ask_help"
  | "clear_memory"
  | "fallback"

function detectIntent(text: string): Intent {
  const t = text.toLowerCase().trim()

  // Приветствие
  if (/^(привет|здравствуй|здравствуйте|hi|hello|хай|добрый\s*(день|вечер|утро))/.test(t)) {
    return "greeting"
  }

  // Запоминание имени
  if (LEARN_NAME_PATTERNS.some(p => p.test(text))) {
    return "learn_name"
  }

  // Запоминание даты рождения
  if (LEARN_BIRTHDATE_PATTERNS.some(p => p.test(text))) {
    return "learn_birthdate"
  }

  // Кто ты
  if (/кто\s+ты|что\s+ты\s+такое|ты\s+бот|ты\s+и[иі]|тво[её]\s+имя/.test(t)) {
    return "ask_who_are_you"
  }

  // Помощь
  if (/помощь|что\s+умеешь|что\s+можешь|help|как\s+(пользоваться|работать)/.test(t)) {
    return "ask_help"
  }

  // Очистить память
  if (/забудь|очисти|сбрось|удали\s+память|начни\s+сначала/.test(t)) {
    return "clear_memory"
  }

  // Знак зодиака
  if (/знак\s*зодиака|мой\s+знак|кто\s+я\s+по\s+знаку|зодиак|гороскоп\s*знак/.test(t)) {
    return "ask_zodiac"
  }

  // Личный аркан
  if (/аркан|моя\s+карта|карта\s+рождения|личн/.test(t) && /аркан|карт/.test(t)) {
    return "ask_arcana"
  }

  // Аркан года
  if (/аркан\s+года|карта\s+года|что\s+год\s+сулит|год\s+для\s+меня/.test(t)) {
    return "ask_year_arcana"
  }

  // Тайна имени
  if (/тайна\s+имен|значение\s+имен|мо[ёе]\s+имя|что\s+значит\s+мо[ёе]\s+имя|происхождение\s+имен/.test(t)) {
    return "ask_name_secret"
  }

  // Гороскоп сегодня
  if (/гороскоп|прогноз/.test(t) && /(сегодня|на\s+сегодня|нынче|день)/.test(t)) {
    return "ask_horoscope_today"
  }
  if (/что\s+сегодня|как\s+сегодня|совет\s+на\s+сегодня/.test(t)) {
    return "ask_horoscope_today"
  }

  // Гороскоп завтра
  if (/гороскоп|прогноз/.test(t) && /(завтра|на\s+завтра)/.test(t)) {
    return "ask_horoscope_tomorrow"
  }

  // Гороскоп неделя
  if (/недел|на\s+неделю/.test(t)) {
    return "ask_horoscope_week"
  }

  // Луна
  if (/лун|фаза\s+луны|лунный\s+день/.test(t)) {
    return "ask_moon"
  }

  // Совместимость
  if (/совместим|подходим\s+ли|он\s+и\s+я|она\s+и\s+я|пара|отношени/.test(t)) {
    return "ask_compatibility"
  }

  // Любовь
  if (/любов|отношен|свидан|брак|роман|сердце/.test(t)) {
    return "ask_love"
  }

  // Карьера
  if (/карьер|работ|дело|професс|бизнес|деньги\s+в\s+работе/.test(t)) {
    return "ask_career"
  }

  // Финансы
  if (/финанс|деньги|богатств|доход|зарплат|купить/.test(t)) {
    return "ask_finance"
  }

  // Здоровье
  if (/здоров|болезн|самочувств|тело/.test(t)) {
    return "ask_health"
  }

  // Значение карты
  if (/что\s+значит\s+карта|значение\s+карты|что\s+означает/.test(t) && /карт/.test(t)) {
    return "ask_card_meaning"
  }

  // Совет
  if (/совет|посоветуй|что\s+делать|как\s+мне|подскажи/.test(t)) {
    return "ask_advice"
  }

  return "fallback"
}

// ===== Генерация ответов =====

function buildZodiacInfo(ctx: OracleUserContext): { sign: ZodiacSign; birthResult: BirthDateResult | null } | null {
  if (!ctx.day || !ctx.month || !ctx.year) return null
  const sign = getZodiacSign(ctx.day, ctx.month)
  if (!sign) return null
  const birthResult = calculateBirthDate(ctx.day, ctx.month, ctx.year)
  return { sign, birthResult }
}

function buildArcanaInfo(ctx: OracleUserContext) {
  if (!ctx.day || !ctx.month || !ctx.year) return null
  return getBirthArcana(ctx.day, ctx.month, ctx.year)
}

function buildYearArcanaInfo(ctx: OracleUserContext, year: number) {
  if (!ctx.day || !ctx.month || !ctx.year) return null
  return getYearArcana(ctx.day, ctx.month, year)
}

function buildNameSecretInfo(ctx: OracleUserContext) {
  if (!ctx.name) return null
  return findNameSecret(ctx.name)
}

function buildHoroscope(ctx: OracleUserContext, period: "today" | "tomorrow" | "week") {
  if (!ctx.day || !ctx.month) return null
  const signId = getSignByBirthDate(ctx.day, ctx.month)
  const today = new Date()
  const date = new Date(today)
  if (period === "tomorrow") date.setDate(date.getDate() + 1)
  return getDailyHoroscope(signId, date, period === "week" ? "week" : period)
}

function buildWeeklyHoroscope(ctx: OracleUserContext) {
  if (!ctx.day || !ctx.month) return null
  const signId = getSignByBirthDate(ctx.day, ctx.month)
  return null // used via getDailyHoroscope with "week"
}

function findCardByName(text: string) {
  const t = text.toLowerCase()
  // Try to find a card name mentioned in the text
  for (const card of allTarotCards) {
    if (t.includes(card.name.toLowerCase())) {
      return card
    }
  }
  return null
}

/** Главный метод: получить ответ оракула на сообщение пользователя */
export function getOracleResponse(text: string, ctx: OracleUserContext): { response: string; updatedCtx: OracleUserContext } {
  const intent = detectIntent(text)
  const updatedCtx: OracleUserContext = { ...ctx }

  // Сначала попробуем обновить контекст (имя/дата рождения)
  const extractedName = extractName(text)
  const extractedDate = extractBirthdate(text)
  if (extractedName) updatedCtx.name = extractedName
  if (extractedDate) {
    updatedCtx.day = extractedDate.day
    updatedCtx.month = extractedDate.month
    updatedCtx.year = extractedDate.year
  }

  const userName = updatedCtx.name ? updatedCtx.name : "странник"
  const hasBirthdate = !!(updatedCtx.day && updatedCtx.month && updatedCtx.year)

  switch (intent) {
    case "greeting": {
      const greetings = [
        `✦ Приветствую, ${userName}. Я — Мистический Оракул. Чем могу помочь? Спросите о знаке зодиака, аркане, гороскопе или тайне имени.`,
        `✦ Здравствуй, ${userName}. Я здесь, чтобы провести тебя через туманы судьбы. О чём хочешь узнать?`,
        `✦ Привет, ${userName}. Я оракул этого приложения — знаю твой знак, аркан, гороскоп и фазу Луны. Просто спроси.`,
      ]
      return { response: greetings[Math.floor(Math.random() * greetings.length)], updatedCtx }
    }

    case "learn_name": {
      if (extractedName) {
        const secret = findNameSecret(extractedName)
        if (secret) {
          return {
            response: `✦ Запомнила, ${extractedName}. Твоё имя происходит из ${secret.origin.toLowerCase()} и означает «${secret.meaning.toLowerCase()}». Хочешь узнать свой знак зодиака или аркан по дате рождения?`,
            updatedCtx,
          }
        }
        return {
          response: `✦ Приятно познакомиться, ${extractedName}. Я запомнила твоё имя. Расскажи ещё дату рождения — и я раскрою твой знак зодиака, личный аркан и гороскоп.`,
          updatedCtx,
        }
      }
      return { response: `✦ Как тебя зовут? Напиши, например: «меня зовут Анна».`, updatedCtx }
    }

    case "learn_birthdate": {
      if (extractedDate) {
        const sign = getZodiacSign(extractedDate.day, extractedDate.month)
        const arcana = getBirthArcana(extractedDate.day, extractedDate.month, extractedDate.year)
        const signText = sign ? `твой знак — ${sign.name} ${sign.symbol}` : "не удалось определить знак"
        const arcanaText = arcana ? `личный аркан — ${arcana.card.name}` : ""
        return {
          response: `✦ Запомнила: ${extractedDate.day}.${extractedDate.month}.${extractedDate.year}. ${signText}, ${arcanaText}. Можешь спросить про гороскоп на сегодня, аркан года или тайну имени.`,
          updatedCtx,
        }
      }
      return { response: `✦ Напиши дату рождения в формате ДД.ММ.ГГГГ, например: 15.03.1990`, updatedCtx }
    }

    case "ask_who_are_you": {
      return {
        response: `✦ Я — Мистический Оракул, дух этого приложения Таро. Я помню твоё имя и дату рождения в этой сессии и могу рассказать о знаке зодиака, личном аркане, гороскопе на сегодня/завтра/неделю, аркане года, тайне имени, фазе Луны и значении карт. Просто спроси.`,
        updatedCtx,
      }
    }

    case "ask_help": {
      return {
        response: `✦ Вот что я умею:
• «меня зовут [имя]» — запомню имя
• «родился 15.03.1990» — запомню дату рождения
• «мой знак зодиака»
• «мой аркан» / «аркан года»
• «гороскоп на сегодня» / «завтра» / «неделю»
• «тайна моего имени»
• «какая сейчас фаза Луны»
• «что значит карта [имя]»
• «совет на сегодня»`,
        updatedCtx,
      }
    }

    case "clear_memory": {
      const cleared: OracleUserContext = { name: "", day: null, month: null, year: null }
      return {
        response: `✦ Я всё забыла. Начнём с чистого листа. Расскажи, как тебя зовут и когда ты родился.`,
        updatedCtx: cleared,
      }
    }

    case "ask_zodiac": {
      if (!hasBirthdate) {
        return { response: `✦ Чтобы назвать твой знак зодиака, мне нужна дата рождения. Напиши, например: «родился 15.03.1990».`, updatedCtx }
      }
      const info = buildZodiacInfo(updatedCtx)
      if (!info) return { response: `✦ Не удалось определить знак. Проверь дату.`, updatedCtx }
      const { sign, birthResult } = info
      return {
        response: `✦ ${userName}, твой знак — ${sign.name} ${sign.symbol} (${sign.dates}). Стихия: ${sign.element}. Управитель: ${sign.ruler}. Архетип: ${sign.archetype}.\n\n${sign.psychology}\n\nСильные стороны: ${sign.strengths.join(", ")}. Тень: ${sign.shadow.join(", ")}.`,
        updatedCtx,
      }
    }

    case "ask_arcana": {
      if (!hasBirthdate) {
        return { response: `✦ Чтобы назвать твой личный аркан, мне нужна дата рождения. Напиши: «родился 15.03.1990».`, updatedCtx }
      }
      const info = buildArcanaInfo(updatedCtx)
      if (!info) return { response: `✦ Не удалось рассчитать аркан.`, updatedCtx }
      return {
        response: `✦ ${userName}, твой личный аркан по дате рождения — ${info.card.name} (№${info.arcanaNumber === 22 ? 22 : info.arcanaNumber}). Ключевое слово: ${info.card.keyword}.\n\n${info.card.upright.summary}\n\nАрхетип: ${info.card.archetype}.`,
        updatedCtx,
      }
    }

    case "ask_year_arcana": {
      if (!hasBirthdate) {
        return { response: `✦ Чтобы рассчитать аркан года, мне нужна дата рождения.`, updatedCtx }
      }
      const year = new Date().getFullYear()
      const info = buildYearArcanaInfo(updatedCtx, year)
      if (!info) return { response: `✦ Не удалось рассчитать аркан года.`, updatedCtx }
      return {
        response: `✦ ${userName}, аркан ${year} года для тебя — ${info.card.name} (№${info.arcanaNumber}). Тема года: ${info.card.keyword}.\n\n${info.card.upright.summary}\n\nПсихология года: ${info.card.upright.psychology}`,
        updatedCtx,
      }
    }

    case "ask_name_secret": {
      if (!updatedCtx.name) {
        return { response: `✦ Сначала расскажи, как тебя зовут. Напиши: «меня зовут [имя]».`, updatedCtx }
      }
      const secret = buildNameSecretInfo(updatedCtx)
      if (!secret) {
        return { response: `✦ Имя «${updatedCtx.name}» не найдено в моей базе из 90+ имён. Попробуй полное имя (например, Александр, Анна).`, updatedCtx }
      }
      return {
        response: `✦ ${updatedCtx.name}: происхождение — ${secret.origin}, первоначальное значение — «${secret.meaning.toLowerCase()}» (${secret.translation}).\n\nХарактер: ${secret.character}\n\nТалисманы: камни — ${secret.stones.join(", ")}; цвета — ${secret.colors.join(", ")}; счастливые числа — ${secret.numbers.join(", ")}.`,
        updatedCtx,
      }
    }

    case "ask_horoscope_today":
    case "ask_horoscope_tomorrow": {
      if (!hasBirthdate) {
        return { response: `✦ Чтобы дать гороскоп, мне нужна дата рождения. Напиши: «родился 15.03.1990».`, updatedCtx }
      }
      const period = intent === "ask_horoscope_today" ? "today" : "tomorrow"
      const h = buildHoroscope(updatedCtx, period)
      if (!h) return { response: `✦ Не удалось составить гороскоп.`, updatedCtx }
      const t = h.texts.general
      return {
        response: `✦ ${userName}, гороскоп на ${period === "today" ? "сегодня" : "завтра"} для ${h.sign}:\n\n${t.text}\n\nРейтинг: ${t.rating}/10. ${t.luckyItem ? "Счастливый предмет: " + t.luckyItem + "." : ""}\n\n💡 ${t.advice}`,
        updatedCtx,
      }
    }

    case "ask_horoscope_week": {
      if (!hasBirthdate) {
        return { response: `✦ Чтобы дать гороскоп на неделю, мне нужна дата рождения.`, updatedCtx }
      }
      const signId = getSignByBirthDate(updatedCtx.day!, updatedCtx.month!)
      const today = new Date()
      const weekly = getWeeklyHoroscope(signId, today)
      const bestDay = weekly.bestDay ? weekly.bestDay.weekday : "—"
      const worstDay = weekly.worstDay ? weekly.worstDay.weekday : "—"
      return {
        response: `✦ ${userName}, неделя для ${weekly.title.replace("Гороскоп на неделю для ", "")}:\n\n${weekly.summary}\n\n${weekly.text}\n\nЛучший день: ${bestDay}. Сложный: ${worstDay}.`,
        updatedCtx,
      }
    }

    case "ask_moon": {
      const moon = getMoonPhase(new Date())
      const lunarDay = getLunarDay(new Date())
      const influence = getMoonInfluence(moon.phaseIndex, moon.zodiacSign)
      return {
        response: `✦ Сейчас ${moon.phase.emoji} ${moon.phase.name}. Луна в ${moon.zodiacSign}. Лунный день: ${lunarDay}. Освещённость: ${moon.illumination}%.\n\n${moon.phase.description}\n\nЭнергия: ${moon.phase.energy}. Настроение дня: ${influence.mood}`,
        updatedCtx,
      }
    }

    case "ask_compatibility": {
      if (!hasBirthdate) {
        return { response: `✦ Чтобы проверить совместимость, мне нужна твоя дата рождения. Напиши её, потом дату партнёра.`, updatedCtx }
      }
      const sign = getZodiacSign(updatedCtx.day!, updatedCtx.month!)
      if (!sign) return { response: `✦ Не удалось определить твой знак.`, updatedCtx }
      return {
        response: `✦ ${userName}, ты ${sign.name}. Тебе подходят: ${sign.compatibility.join(", ")}. Напиши дату рождения партнёра — и я скажу, насколько вы совместимы.`,
        updatedCtx,
      }
    }

    case "ask_love": {
      if (!hasBirthdate) {
        return { response: `✦ Чтобы дать совет в любви, мне нужна дата рождения.`, updatedCtx }
      }
      const h = buildHoroscope(updatedCtx, "today")
      if (!h) return { response: `✦ Не удалось составить прогноз.`, updatedCtx }
      return {
        response: `✦ ${userName}, в любви сегодня: ${h.texts.love.text}\n\n💡 ${h.texts.love.advice}`,
        updatedCtx,
      }
    }

    case "ask_career": {
      if (!hasBirthdate) return { response: `✦ Нужна дата рождения для прогноза по карьере.`, updatedCtx }
      const h = buildHoroscope(updatedCtx, "today")
      if (!h) return { response: `✦ Не удалось составить прогноз.`, updatedCtx }
      return {
        response: `✦ ${userName}, в карьере сегодня: ${h.texts.career.text}\n\n💡 ${h.texts.career.advice}`,
        updatedCtx,
      }
    }

    case "ask_finance": {
      if (!hasBirthdate) return { response: `✦ Нужна дата рождения для прогноза по финансам.`, updatedCtx }
      const h = buildHoroscope(updatedCtx, "today")
      if (!h) return { response: `✦ Не удалось составить прогноз.`, updatedCtx }
      return {
        response: `✦ ${userName}, в финансах сегодня: ${h.texts.finance.text}\n\n💡 ${h.texts.finance.advice}`,
        updatedCtx,
      }
    }

    case "ask_health": {
      if (!hasBirthdate) return { response: `✦ Нужна дата рождения для прогноза по здоровью.`, updatedCtx }
      const h = buildHoroscope(updatedCtx, "today")
      if (!h) return { response: `✦ Не удалось составить прогноз.`, updatedCtx }
      return {
        response: `✦ ${userName}, в здоровье сегодня: ${h.texts.health.text}\n\n💡 ${h.texts.health.advice}`,
        updatedCtx,
      }
    }

    case "ask_card_meaning": {
      const card = findCardByName(text)
      if (card) {
        return {
          response: `✦ Карта «${card.name}» (${card.keyword}).\n\nПрямое значение: ${card.upright.summary}\nВ любви: ${card.upright.love}\nВ работе: ${card.upright.career}\n\nПеревёрнутая: ${card.reversed.summary}`,
          updatedCtx,
        }
      }
      return {
        response: `✦ Какая карта тебя интересует? Назови имя (например, «Шут», «Маг», «Влюблённые», «Солнце»).`,
        updatedCtx,
      }
    }

    case "ask_advice": {
      const meditation = getMeditationCard(new Date())
      return {
        response: `✦ ${userName}, совет дня от карты ${meditation.card.name}:\n\n${meditation.advice}\n\n✨ Аффирмация: ${meditation.affirmation}`,
        updatedCtx,
      }
    }

    case "fallback":
    default: {
      // Если есть имя/дата, но вопрос не распознан — даём общий совет
      if (hasBirthdate && updatedCtx.name) {
        return {
          response: `✦ ${userName}, я не совсем поняла вопрос. Попробуй спросить: «мой знак зодиака», «мой аркан», «гороскоп на сегодня», «аркан года», «тайна моего имени» или «совет на сегодня». Напиши «помощь», чтобы увидеть все команды.`,
          updatedCtx,
        }
      }
      if (updatedCtx.name) {
        return {
          response: `✦ ${userName}, расскажи дату рождения — и я раскрою твой знак зодиака, аркан и гороскоп. Напиши, например: «родился 15.03.1990».`,
          updatedCtx,
        }
      }
      return {
        response: `✦ Я — Мистический Оракул. Расскажи, как тебя зовут и когда ты родился — и я отвечу на вопросы о знаке, аркане, гороскопе, имени и картах. Напиши «помощь», чтобы увидеть все команды.`,
        updatedCtx,
      }
    }
  }
}

/** Приветственное сообщение при первом открытии */
export function getWelcomeMessage(ctx: OracleUserContext): string {
  if (ctx.name && ctx.day && ctx.month && ctx.year) {
    return `✦ С возвращением, ${ctx.name}. Я помню тебя. О чём хочешь спросить?`
  }
  return `✦ Привет, странник. Я — Мистический Оракул. Расскажи, как тебя зовут и когда ты родился — и я раскрою твой знак зодиака, аркан и гороскоп. Напиши «помощь», чтобы увидеть, что я умею.`
}
