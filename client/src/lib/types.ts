export interface QuestionnaireData {
  gender: 'male' | 'female';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'high';
  proteinSources: string[];
  favoriteVegetables: string[];
  badHabits: string[];
  age: number;
  height: number;
  currentWeight: number;
  targetWeight: number;
}

export interface DietCalculationResult {
  metabolicAge: number;
  dailyCalories: number;
  waterIntake: number;
  fatPercentage: number;
  proteinPercentage: number;
  carbPercentage: number;
  projectedWeightLoss: {
    week1: number;
    week2: number;
    week3: number;
    week4: number;
  };
}

export interface PaymentPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  popular?: boolean;
  duration: string;
}

export const PAYMENT_PLANS: PaymentPlan[] = [
  {
    id: 'basic',
    name: 'Базовый план',
    price: 990,
    duration: 'Доступ на 28 дней',
    features: [
      'Персональный план питания на 28 дней',
      'Рецепты и списки покупок',
      'Трекер прогресса',
      'Email поддержка',
    ],
  },
  {
    id: 'premium',
    name: 'Премиум план',
    price: 1990,
    duration: 'Пожизненный доступ',
    popular: true,
    features: [
      'Все из базового плана',
      'Пожизненный доступ',
      'Дополнительные рецепты',
      'Персональные консультации',
      'Приоритетная поддержка',
    ],
  },
];

export const PROTEIN_SOURCES = [
  { id: 'chicken', name: 'Курица', emoji: '🐔' },
  { id: 'beef', name: 'Говядина', emoji: '🥩' },
  { id: 'fish', name: 'Рыба', emoji: '🐟' },
  { id: 'pork', name: 'Свинина', emoji: '🐷' },
  { id: 'seafood', name: 'Морепродукты', emoji: '🦐' },
  { id: 'vegetarian', name: 'Растительный', emoji: '🥜' },
];

export const VEGETABLES = [
  { id: 'broccoli', name: 'Брокколи', emoji: '🥦' },
  { id: 'spinach', name: 'Шпинат', emoji: '🥬' },
  { id: 'avocado', name: 'Авокадо', emoji: '🥑' },
  { id: 'cauliflower', name: 'Цветная капуста', emoji: '🥬' },
  { id: 'asparagus', name: 'Спаржа', emoji: '🌿' },
  { id: 'cucumber', name: 'Огурец', emoji: '🥒' },
  { id: 'lettuce', name: 'Салат', emoji: '🥬' },
  { id: 'tomato', name: 'Помидор', emoji: '🍅' },
];

export const BAD_HABITS = [
  { id: 'late_eating', name: 'Поздние приемы пищи' },
  { id: 'snacking', name: 'Частые перекусы' },
  { id: 'sweet_drinks', name: 'Сладкие напитки' },
  { id: 'fast_food', name: 'Фастфуд' },
  { id: 'large_portions', name: 'Большие порции' },
  { id: 'irregular_meals', name: 'Нерегулярное питание' },
];

export const ACTIVITY_LEVELS = [
  {
    id: 'sedentary',
    name: 'Малоподвижный',
    description: 'Работа в офисе, мало физических нагрузок',
    icon: 'couch',
    multiplier: 1.2,
  },
  {
    id: 'light',
    name: 'Легкая активность',
    description: '1-3 тренировки в неделю',
    icon: 'walking',
    multiplier: 1.375,
  },
  {
    id: 'moderate',
    name: 'Умеренная активность',
    description: '3-5 тренировок в неделю',
    icon: 'running',
    multiplier: 1.55,
  },
  {
    id: 'high',
    name: 'Высокая активность',
    description: '6-7 интенсивных тренировок в неделю',
    icon: 'dumbbell',
    multiplier: 1.725,
  },
];
