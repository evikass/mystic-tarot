// Данные для пасьянса — 36 игральных карт

export interface PlayingCard {
  suit: "hearts" | "diamonds" | "clubs" | "spades"
  rank: "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K" | "A"
  rankName: string
  suitName: string
  suitSymbol: string
  color: "red" | "black"
  // Место в раскладе (для пасьянса — что значит карта)
  meaning: string
}

export const playingCardsData: PlayingCard[] = [
  // Червы
  { suit: "hearts", rank: "6", rankName: "Шестёрка", suitName: "Червы", suitSymbol: "♥", color: "red", meaning: "Любовное свидание, романтическое путешествие" },
  { suit: "hearts", rank: "7", rankName: "Семёрка", suitName: "Червы", suitSymbol: "♥", color: "red", meaning: "Встреча с любимым человеком, радость" },
  { suit: "hearts", rank: "8", rankName: "Восьмёрка", suitName: "Червы", suitSymbol: "♥", color: "red", meaning: "Приятный разговор, признание в любви" },
  { suit: "hearts", rank: "9", rankName: "Девятка", suitName: "Червы", suitSymbol: "♥", color: "red", meaning: "Самая счастливая карта в любви, свадьба" },
  { suit: "hearts", rank: "10", rankName: "Десятка", suitName: "Червы", suitSymbol: "♥", color: "red", meaning: "Желание сбудется, платоническая любовь" },
  { suit: "hearts", rank: "J", rankName: "Валет", suitName: "Червы", suitSymbol: "♥", color: "red", meaning: "Молодой человек, любовные хлопоты" },
  { suit: "hearts", rank: "Q", rankName: "Дама", suitName: "Червы", suitSymbol: "♥", color: "red", meaning: "Женщина, замужняя или блондинка, любовь" },
  { suit: "hearts", rank: "K", rankName: "Король", suitName: "Червы", suitSymbol: "♥", color: "red", meaning: "Мужчина, женатый или блондин, нежность" },
  { suit: "hearts", rank: "A", rankName: "Туз", suitName: "Червы", suitSymbol: "♥", color: "red", meaning: "Дом, семейный очаг, любовь" },

  // Бубны
  { suit: "diamonds", rank: "6", rankName: "Шестёрка", suitName: "Бубны", suitSymbol: "♦", color: "red", meaning: "Дорога, препятствие в делах" },
  { suit: "diamonds", rank: "7", rankName: "Семёрка", suitName: "Бубны", suitSymbol: "♦", color: "red", meaning: "Деньги, мелкие хлопоты, разговоры о финансах" },
  { suit: "diamonds", rank: "8", rankName: "Восьмёрка", suitName: "Бубны", suitSymbol: "♦", color: "red", meaning: "Материальное благополучие, удачная сделка" },
  { suit: "diamonds", rank: "9", rankName: "Девятка", suitName: "Бубны", suitSymbol: "♦", color: "red", meaning: "Большая сумма денег, неожиданная прибыль" },
  { suit: "diamonds", rank: "10", rankName: "Десятка", suitName: "Бубны", suitSymbol: "♦", color: "red", meaning: "Денежные интересы, крупная покупка" },
  { suit: "diamonds", rank: "J", rankName: "Валет", suitName: "Бубны", suitSymbol: "♦", color: "red", meaning: "Молодой человек, денежные хлопоты, новости" },
  { suit: "diamonds", rank: "Q", rankName: "Дама", suitName: "Бубны", suitSymbol: "♦", color: "red", meaning: "Женщина с деньгами, интриги, сплетни" },
  { suit: "diamonds", rank: "K", rankName: "Король", suitName: "Бубны", suitSymbol: "♦", color: "red", meaning: "Мужчина, военный или деловой партнёр" },
  { suit: "diamonds", rank: "A", rankName: "Туз", suitName: "Бубны", suitSymbol: "♦", color: "red", meaning: "Важное письмо, документ, новости днём" },

  // Трефы
  { suit: "clubs", rank: "6", rankName: "Шестёрка", suitName: "Трефы", suitSymbol: "♣", color: "black", meaning: "Деловая поездка, вечерняя дорога" },
  { suit: "clubs", rank: "7", rankName: "Семёрка", suitName: "Трефы", suitSymbol: "♣", color: "black", meaning: "Разговор о делах, мелкий успех" },
  { suit: "clubs", rank: "8", rankName: "Восьмёрка", suitName: "Трефы", suitSymbol: "♣", color: "black", meaning: "Встреча с деловыми партнёрами, переговоры" },
  { suit: "clubs", rank: "9", rankName: "Девятка", suitName: "Трефы", suitSymbol: "♣", color: "black", meaning: "Сомнения в отношениях, тревога" },
  { suit: "clubs", rank: "10", rankName: "Десятка", suitName: "Трефы", suitSymbol: "♣", color: "black", meaning: "Большой доход, крупные дела" },
  { suit: "clubs", rank: "J", rankName: "Валет", suitName: "Трефы", suitSymbol: "♣", color: "black", meaning: "Хлопоты, проблемы на работе" },
  { suit: "clubs", rank: "Q", rankName: "Дама", suitName: "Трефы", suitSymbol: "♣", color: "black", meaning: "Женщина-коллега, возможно соперница" },
  { suit: "clubs", rank: "K", rankName: "Король", suitName: "Трефы", suitSymbol: "♣", color: "black", meaning: "Мужчина, друг или начальник, верность" },
  { suit: "clubs", rank: "A", rankName: "Туз", suitName: "Трефы", suitSymbol: "♣", color: "black", meaning: "Дело, работа, Institution" },

  // Пики
  { suit: "spades", rank: "6", rankName: "Шестёрка", suitName: "Пики", suitSymbol: "♠", color: "black", meaning: "Дальняя дорога, потеря" },
  { suit: "spades", rank: "7", rankName: "Семёрка", suitName: "Пики", suitSymbol: "♠", color: "black", meaning: "Слёзы, грусть, разочарование" },
  { suit: "spades", rank: "8", rankName: "Восьмёрка", suitName: "Пики", suitSymbol: "♠", color: "black", meaning: "Спиртное, неприятный разговор, ссора" },
  { suit: "spades", rank: "9", rankName: "Девятка", suitName: "Пики", suitSymbol: "♠", color: "black", meaning: "Болезнь, проблемы со здоровьем" },
  { suit: "spades", rank: "10", rankName: "Десятка", suitName: "Пики", suitSymbol: "♠", color: "black", meaning: "Несбывшиеся надежды, крупная потеря" },
  { suit: "spades", rank: "J", rankName: "Валет", suitName: "Пики", suitSymbol: "♠", color: "black", meaning: "Пустые хлопоты, обман, неверность" },
  { suit: "spades", rank: "Q", rankName: "Дама", suitName: "Пики", suitSymbol: "♠", color: "black", meaning: "Злая женщина, интриганка, вдова" },
  { suit: "spades", rank: "K", rankName: "Король", suitName: "Пики", suitSymbol: "♠", color: "black", meaning: "Враг, соперник, властный мужчина" },
  { suit: "spades", rank: "A", rankName: "Туз", suitName: "Пики", suitSymbol: "♠", color: "black", meaning: "Казённый дом, удар судьбы, ночь" },
]

// Перемешать массив карт (Fisher-Yates)
export function shuffleCards<T>(array: T[]): T[] {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

// Вытащить N случайных карт
export function drawPlayingCards(count: number): PlayingCard[] {
  return shuffleCards(playingCardsData).slice(0, count)
}
