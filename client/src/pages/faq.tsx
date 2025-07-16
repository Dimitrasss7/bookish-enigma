import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, Search, Heart, Zap } from "lucide-react";

export default function FAQ() {
  const categories = [
    {
      title: "Основы кето-диеты",
      icon: <Heart className="w-5 h-5" />,
      color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
      questions: [
        {
          question: "Что такое кетогенная диета?",
          answer: "Кетогенная диета - это низкоуглеводная диета с высоким содержанием жиров, которая заставляет организм использовать жиры в качестве основного источника энергии вместо углеводов. Это состояние называется кетозом."
        },
        {
          question: "Как работает кето-диета?",
          answer: "При ограничении углеводов до 5% от общей калорийности (обычно 20-50г в день), организм начинает расщеплять жиры на кетоны, которые становятся альтернативным источником энергии для мозга и тела."
        },
        {
          question: "Сколько времени нужно для входа в кетоз?",
          answer: "Обычно организм входит в кетоз через 2-7 дней строгого соблюдения кето-диеты. Скорость зависит от индивидуальных особенностей, уровня активности и количества потребляемых углеводов."
        }
      ]
    },
    {
      title: "Использование сервиса",
      icon: <Zap className="w-5 h-5" />,
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
      questions: [
        {
          question: "Как создать персональный план питания?",
          answer: "Заполните нашу подробную анкету, указав ваши цели, пищевые предпочтения, уровень активности и другие параметры. Система автоматически создаст индивидуальный план питания."
        },
        {
          question: "Можно ли изменить план после создания?",
          answer: "Да, вы можете корректировать свой план в любое время. Премиум-пользователи могут получить персональную корректировку от наших специалистов."
        },
        {
          question: "Как отслеживать прогресс?",
          answer: "В личном кабинете вы можете записывать свой вес, отмечать выполненные приемы пищи и видеть статистику по неделям. Графики покажут ваш прогресс в снижении веса."
        }
      ]
    },
    {
      title: "Питание и продукты",
      icon: <Search className="w-5 h-5" />,
      color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
      questions: [
        {
          question: "Какие продукты можно есть на кето?",
          answer: "Разрешены: мясо, рыба, яйца, масла, орехи, семена, листовые зеленые овощи, авокадо, сыры. Ограничены: крупы, сахар, фрукты, крахмалистые овощи, бобовые."
        },
        {
          question: "Сколько углеводов можно в день?",
          answer: "Для поддержания кетоза рекомендуется потреблять не более 20-50г чистых углеводов в день. Чистые углеводы = общие углеводы - клетчатка."
        },
        {
          question: "Как рассчитать БЖУ?",
          answer: "Стандартное соотношение для кето: 70% жиров, 25% белков, 5% углеводов от общей калорийности. Наша система автоматически рассчитывает точные граммы для ваших целей."
        }
      ]
    },
    {
      title: "Здоровье и побочные эффекты",
      icon: <HelpCircle className="w-5 h-5" />,
      color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
      questions: [
        {
          question: "Есть ли побочные эффекты?",
          answer: "В первые дни возможны: усталость, головные боли, раздражительность ('кето-грипп'). Это нормальная адаптация, которая проходит через несколько дней."
        },
        {
          question: "Кому нельзя кето-диету?",
          answer: "Противопоказания: диабет 1 типа, беременность, кормление грудью, некоторые заболевания печени и почек. Обязательно проконсультируйтесь с врачом."
        },
        {
          question: "Нужно ли принимать витамины?",
          answer: "Рекомендуется принимать электролиты (натрий, калий, магний), витамин D, омега-3. Конкретные рекомендации зависят от вашего рациона и анализов."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Частые вопросы
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Ответы на самые популярные вопросы о кето-диете и нашем сервисе
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {categories.map((category, categoryIndex) => (
            <Card key={categoryIndex}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Badge className={`${category.color} mr-3`}>
                    {category.icon}
                  </Badge>
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  {category.questions.map((item, questionIndex) => (
                    <AccordionItem key={questionIndex} value={`item-${categoryIndex}-${questionIndex}`}>
                      <AccordionTrigger className="text-left">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 dark:text-gray-300">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Section */}
        <Card className="mt-16 bg-gradient-to-r from-green-500 to-blue-500 text-white">
          <CardContent className="text-center py-16">
            <HelpCircle className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-3xl font-bold mb-4">Не нашли ответ?</h2>
            <p className="text-xl opacity-90 mb-8">
              Свяжитесь с нами, и мы поможем решить любые вопросы
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="inline-block">
                <button className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Связаться с поддержкой
                </button>
              </a>
              <a href="mailto:support@moyaketo.ru" className="inline-block">
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors">
                  Написать email
                </button>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}