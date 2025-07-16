import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Quote, TrendingDown, Heart, Zap } from "lucide-react";

export default function Reviews() {
  const reviews = [
    {
      name: "Анна Михайлова",
      age: 34,
      result: "Сбросила 12 кг за 2 месяца",
      rating: 5,
      text: "Никогда не думала, что кето может быть таким простым! Программа очень удобная, все расписано по дням. Уже через неделю почувствовала прилив энергии. Спасибо за индивидуальный подход!",
      avatar: "АМ",
      gradient: "from-pink-400 to-red-500"
    },
    {
      name: "Дмитрий Козлов",
      age: 41,
      result: "Сбросил 18 кг за 3 месяца",
      rating: 5,
      text: "Долго сомневался, но решил попробовать. Результат превзошел все ожидания! Не только похудел, но и улучшилось общее самочувствие. Отличная поддержка от специалистов.",
      avatar: "ДК",
      gradient: "from-blue-400 to-purple-500"
    },
    {
      name: "Елена Петрова",
      age: 28,
      result: "Сбросила 8 кг за 1.5 месяца",
      rating: 5,
      text: "Очень довольна результатом! Программа помогла не только похудеть, но и изменить отношение к еде. Теперь чувствую себя более энергичной и уверенной в себе.",
      avatar: "ЕП",
      gradient: "from-green-400 to-blue-500"
    },
    {
      name: "Марина Сидорова",
      age: 45,
      result: "Сбросила 15 кг за 4 месяца",
      rating: 5,
      text: "После 40 лет думала, что похудеть уже невозможно. Но эта программа доказала обратное! Очень благодарна за профессиональную поддержку и мотивацию.",
      avatar: "МС",
      gradient: "from-purple-400 to-pink-500"
    },
    {
      name: "Александр Волков",
      age: 37,
      result: "Сбросил 22 кг за 5 месяцев",
      rating: 5,
      text: "Лучшая инвестиция в свое здоровье! Программа помогла не только похудеть, но и улучшить показатели здоровья. Рекомендую всем, кто серьезно настроен на результат.",
      avatar: "АВ",
      gradient: "from-orange-400 to-red-500"
    },
    {
      name: "Ирина Новикова",
      age: 32,
      result: "Сбросила 10 кг за 2 месяца",
      rating: 5,
      text: "Замечательная программа! Все четко структурировано, есть поддержка. Особенно нравится, что можно корректировать план под свои предпочтения. Результат отличный!",
      avatar: "ИН",
      gradient: "from-teal-400 to-green-500"
    }
  ];

  const stats = [
    { number: "95%", label: "Успешных результатов", icon: <TrendingDown className="w-8 h-8" /> },
    { number: "10,000+", label: "Довольных клиентов", icon: <Heart className="w-8 h-8" /> },
    { number: "4.9/5", label: "Средняя оценка", icon: <Star className="w-8 h-8" /> },
    { number: "150,000+", label: "Кг сброшено всего", icon: <Zap className="w-8 h-8" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Отзывы наших клиентов
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Истории реальных людей, которые изменили свою жизнь с помощью нашей кето-программы
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {reviews.map((review, index) => (
            <Card key={index} className="relative">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${review.gradient} rounded-full flex items-center justify-center text-white font-bold`}>
                    {review.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {review.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {review.age} лет
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <div className="flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                    {review.result}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 w-6 h-6 text-gray-300 dark:text-gray-600" />
                  <p className="text-gray-600 dark:text-gray-300 pl-4">
                    {review.text}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Success Stories */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-3xl text-center">
              Истории успеха
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Быстрые результаты
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Большинство наших клиентов видят первые результаты уже через 1-2 недели
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Долгосрочный эффект
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Кето-диета помогает не только похудеть, но и поддерживать результат
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Улучшение здоровья
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Клиенты отмечают повышение энергии, улучшение сна и общего самочувствия
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 rounded-xl p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Средний результат
                </h3>
                <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                  -12 кг
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  За первые 2 месяца
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Энергия:</span>
                    <span className="text-green-600 dark:text-green-400">+85%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Сон:</span>
                    <span className="text-green-600 dark:text-green-400">+78%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Настроение:</span>
                    <span className="text-green-600 dark:text-green-400">+92%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
          <CardContent className="text-center py-16">
            <h2 className="text-3xl font-bold mb-4">Станьте следующей историей успеха!</h2>
            <p className="text-xl opacity-90 mb-8">
              Присоединяйтесь к тысячам людей, которые уже изменили свою жизнь
            </p>
            <button className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
              Начать свой путь
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}