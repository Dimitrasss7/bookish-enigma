import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Users, Target, Zap, Clock, Heart } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Заполните анкету",
      description: "Расскажите о себе, своих целях и предпочтениях в питании",
      icon: <Users className="w-8 h-8" />,
      color: "bg-blue-500"
    },
    {
      number: 2,
      title: "Получите план",
      description: "Наша система создаст персонализированный план питания на основе ваших данных",
      icon: <Target className="w-8 h-8" />,
      color: "bg-green-500"
    },
    {
      number: 3,
      title: "Следуйте программе",
      description: "Используйте наше приложение для отслеживания питания и прогресса",
      icon: <Zap className="w-8 h-8" />,
      color: "bg-purple-500"
    },
    {
      number: 4,
      title: "Получите результат",
      description: "Наслаждайтесь улучшением самочувствия и достижением целей",
      icon: <Heart className="w-8 h-8" />,
      color: "bg-red-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Как это работает
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Простой и научно обоснованный подход к персонализированному кето-питанию
          </p>
        </div>

        {/* Steps Section */}
        <div className="mb-16">
          <div className="grid lg:grid-cols-2 gap-8">
            {steps.map((step, index) => (
              <Card key={step.number} className="relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-2 h-full ${step.color}`} />
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center text-white`}>
                      {step.icon}
                    </div>
                    <div>
                      <Badge variant="outline" className="mb-2">
                        Шаг {step.number}
                      </Badge>
                      <CardTitle className="text-xl">{step.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Science Section */}
        <div className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl text-center mb-6">
                Научная основа нашего подхода
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Расчет BMR
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Используем формулу Миффлина-Сент-Джеора для точного расчета базового метаболизма
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Кето-пропорции
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Оптимальное соотношение: 70% жиров, 25% белков, 5% углеводов для кетоза
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Персонализация
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Учитываем возраст, пол, активность, цели и пищевые предпочтения
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Что включает программа
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Персональный план питания
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Индивидуальное меню на каждый день с учетом ваших предпочтений
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Clock className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Расписание приемов пищи
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Оптимальное время для завтрака, обеда, ужина и перекусов
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Target className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Отслеживание прогресса
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Мониторинг веса, самочувствия и достижения целей
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Users className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Поддержка специалистов
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Консультации нутрициологов и ответы на вопросы
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Zap className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Списки покупок
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Готовые списки продуктов для походов в магазин
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Heart className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Рецепты и советы
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Вкусные кето-рецепты и практические советы
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl text-center mb-6">
                Ваш путь к результату
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    1-3
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Первые дни
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Адаптация к новому режиму питания, снижение тяги к сладкому
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                    1-2
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Первые недели
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Вход в кетоз, улучшение энергии, начало снижения веса
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Первый месяц
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Заметное улучшение самочувствия, стабильная потеря веса
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
                    3+
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Долгосрочный результат
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Достижение целевого веса, формирование здоровых привычек
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
          <CardContent className="text-center py-16">
            <h2 className="text-3xl font-bold mb-4">Готовы начать свой путь к здоровью?</h2>
            <p className="text-xl opacity-90 mb-8">
              Присоединяйтесь к тысячам людей, которые уже изменили свою жизнь с помощью кето-диеты
            </p>
            <Button size="lg" variant="secondary" className="text-gray-900 hover:bg-white">
              Начать сейчас
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}