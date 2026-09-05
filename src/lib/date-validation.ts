/**
 * Валидация дат для форм ввода.
 * Предотвращает ввод некорректных значений (2222 год, 22 месяц и т.п.)
 */

/** Валидация дня (1-31) */
export function validateDay(value: string): string {
  const num = parseInt(value)
  if (isNaN(num)) return ""
  if (num < 1) return "1"
  if (num > 31) return "31"
  return String(num)
}

/** Валидация месяца (1-12) */
export function validateMonth(value: string): string {
  const num = parseInt(value)
  if (isNaN(num)) return ""
  if (num < 1) return "1"
  if (num > 12) return "12"
  return String(num)
}

/** Валидация года (1900-2099) */
export function validateYear(value: string): string {
  const num = parseInt(value)
  if (isNaN(num)) return ""
  if (num < 1900) return "1900"
  if (num > 2099) return "2099"
  return String(num)
}

/** Полная валидация даты — возвращает true если дата корректна */
export function isValidDate(day: string, month: string, year?: string): boolean {
  const d = parseInt(day)
  const m = parseInt(month)
  const y = year ? parseInt(year) : 2000

  if (isNaN(d) || isNaN(m) || isNaN(y)) return false
  if (d < 1 || d > 31) return false
  if (m < 1 || m > 12) return false
  if (y < 1900 || y > 2099) return false

  // Проверяем реальную дату через Date
  const date = new Date(y, m - 1, d)
  return date.getDate() === d && date.getMonth() === m - 1 && date.getFullYear() === y
}

/** Проверка, что строка содержит только цифры */
export function isNumeric(value: string): boolean {
  return /^\d*$/.test(value)
}
