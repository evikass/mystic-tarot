// Данные для гадания на кофейной гуще

export interface CoffeeSymbol {
  id: string
  name: string
  emoji: string
  meaning: string
  // Категория: "good" | "neutral" | "warning"
  category: "good" | "neutral" | "warning"
}

export const coffeeSymbols: CoffeeSymbol[] = [
  // Благоприятные символы
  { id: "heart", name: "Сердце", emoji: "❤️", meaning: "Любовь, романтическое свидание, искренние чувства. Кто-то думает о вас с нежностью.", category: "good" },
  { id: "star", name: "Звезда", emoji: "⭐", meaning: "Исполнение желания, удача, вдохновение. Ваши мечты начнут сбываться.", category: "good" },
  { id: "sun", name: "Солнце", emoji: "☀️", meaning: "Радость, счастье, успех во всех начинаниях. Жизнь наполняется светом.", category: "good" },
  { id: "flower", name: "Цветок", emoji: "🌸", meaning: "Новая любовь, расцвет чувств, гармония в отношениях. Хорошее настроение.", category: "good" },
  { id: "ring", name: "Кольцо", emoji: "💍", meaning: "Помолвка, брак, серьёзные обязательства. Долговременный союз.", category: "good" },
  { id: "key", name: "Ключ", emoji: "🗝️", meaning: "Решение проблемы, новые возможности. Вы найдёте выход из ситуации.", category: "good" },
  { id: "crown", name: "Корона", emoji: "👑", meaning: "Успех, признание, повышение по службе. Достижение высокого положения.", category: "good" },
  { id: "fish", name: "Рыба", emoji: "🐟", meaning: "Прибыль, финансовое благополучие, удачная сделка. Богатство.", category: "good" },
  { id: "angel", name: "Ангел", emoji: "👼", meaning: "Защита высших сил, неожиданная помощь. Вы не одни, вас оберегают.", category: "good" },
  { id: "butterfly", name: "Бабочка", emoji: "🦋", meaning: "Преображение, новые начинания, лёгкость. Позитивные перемены.", category: "good" },

  // Нейтральные символы
  { id: "eye", name: "Глаз", emoji: "👁️", meaning: "Тайное наблюдение, insight, ясновидение. Обратите внимание на детали.", category: "neutral" },
  { id: "moon", name: "Луна", emoji: "🌙", meaning: "Тайны, скрытые чувства, интуиция. Что-то откроется в ближайшее время.", category: "neutral" },
  { id: "mountain", name: "Гора", emoji: "⛰️", meaning: "Препятствие, которое нужно преодолеть. Путь будет трудным, но достижимым.", category: "neutral" },
  { id: "cross", name: "Крест", emoji: "✝️", meaning: "Судьбоносное событие, испытание. Принятие важного решения.", category: "neutral" },
  { id: "bridge", name: "Мост", emoji: "🌉", meaning: "Переход, перемены, соединение. Новая фаза в жизни.", category: "neutral" },
  { id: "clock", name: "Часы", emoji: "⏰", meaning: "Время подошло, не откладывайте. Срочное решение или встреча.", category: "neutral" },
  { id: "book", name: "Книга", emoji: "📖", meaning: "Знания, тайна, скрытая информация. Изучение чего-то нового.", category: "neutral" },
  { id: "candle", name: "Свеча", emoji: "🕯️", meaning: "Духовный поиск, надежда, тихая радость. Молитва будет услышана.", category: "neutral" },

  // Предостерегающие символы
  { id: "snake", name: "Змея", emoji: "🐍", meaning: "Предательство, коварство, скрытый враг. Будьте осторожны с новыми знакомыми.", category: "warning" },
  { id: "knife", name: "Нож", emoji: "🔪", meaning: "Разрыв, ссора, конфликт. Будьте сдержанны в словах.", category: "warning" },
  { id: "cloud", name: "Облако", emoji: "☁️", meaning: "Сомнения, неясность, временные трудности. Подождите с решениями.", category: "warning" },
  { id: "spider", name: "Паук", emoji: "🕷️", meaning: "Ловушка, интриги, чужое влияние. Не попадитесь в сети.", category: "warning" },
  { id: "broken", name: "Разбитое", emoji: "💔", meaning: "Окончание, расставание, разочарование. Но после — новое начало.", category: "warning" },
  { id: "raven", name: "Ворон", emoji: "🐦‍⬛", meaning: "Печальные новости, болезнь близкого. Проявите заботу о родных.", category: "warning" },
]

// Выбрать N случайных символов
export function drawCoffeeSymbols(count: number): CoffeeSymbol[] {
  const shuffled = [...coffeeSymbols].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}
