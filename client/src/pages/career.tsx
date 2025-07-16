import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Users, Heart, Star, ArrowRight } from "lucide-react";

export default function Career() {
  const openings = [
    {
      title: "Нутрициолог",
      department: "Здоровье",
      location: "Москва / Удаленно",
      type: "Полная занятость",
      description: "Ищем опытного нутрициолога для консультирования клиентов по кетогенной диете и разработки персонализированных программ питания",
      requirements: ["Высшее медицинское образование", "Опыт работы с кето-диетой от 2 лет", "Сертификат нутрициолога", "Знание английского языка"]
    },
    {
      title: "Frontend React Developer",
      department: "Разработка",
      location: "Москва / Удаленно",
      type: "Полная занятость",
      description: "Требуется опытный React разработчик для развития платформы персонализированного питания",
      requirements: ["Опыт с React, TypeScript от 3 лет", "Знание современных инструментов (Vite, Tailwind)", "Опыт работы с API", "Понимание UX/UI принципов"]
    },
    {
      title: "Маркетолог",
      department: "Маркетинг",
      location: "Москва",
      type: "Полная занятость",
      description: "Ищем креативного маркетолога для продвижения наших кето-программ и увеличения базы клиентов",
      requirements: ["Опыт в digital-маркетинге от 3 лет", "Знание соцсетей и контент-маркетинга", "Аналитические навыки", "Креативность и проактивность"]
    },
    {
      title: "Специалист поддержки",
      department: "Поддержка",
      location: "Москва / Удаленно",
      type: "Частичная занятость",
      description: "Требуется отзывчивый специалист для консультирования клиентов и решения их вопросов",
      requirements: ["Опыт работы в поддержке от 1 года", "Знание основ кетогенной диеты", "Отличные коммуникативные навыки", "Эмпатия и терпение"]
    }
  ];

  const benefits = [
    { icon: <Heart className="w-6 h-6" />, title: "Медицинская страховка", description: "Полный пакет медицинского страхования" },
    { icon: <Clock className="w-6 h-6" />, title: "Гибкий график", description: "Возможность удаленной работы и гибкого графика" },
    { icon: <Users className="w-6 h-6" />, title: "Дружная команда", description: "Работа с профессиональными и позитивными людьми" },
    { icon: <Star className="w-6 h-6" />, title: "Развитие навыков", description: "Обучение и развитие за счет компании" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Карьера в Моя Кето Диета
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Присоединяйтесь к нашей команде и помогайте людям достигать своих целей в здоровье и питании
          </p>
        </div>

        {/* Company Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Почему стоит работать с нами
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                    {benefit.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Open Positions */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Открытые вакансии
          </h2>
          <div className="space-y-6">
            {openings.map((job, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">{job.department}</Badge>
                        <Badge variant="outline" className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {job.location}
                        </Badge>
                        <Badge variant="outline" className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {job.type}
                        </Badge>
                      </div>
                    </div>
                    <Button className="mt-4 md:mt-0">
                      Подать заявку
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {job.description}
                  </p>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Требования:
                    </h4>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                      {job.requirements.map((req, reqIndex) => (
                        <li key={reqIndex}>{req}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Culture Section */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-3xl text-center">
              Наша культура
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Забота о здоровье
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Мы искренне заботимся о здоровье наших клиентов и коллег
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Командная работа
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Мы работаем как единая команда для достижения общих целей
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Стремление к совершенству
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Мы постоянно улучшаем наши продукты и процессы
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Process Section */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-3xl text-center">
              Процесс найма
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                  1
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Подача заявки
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Отправьте резюме и сопроводительное письмо
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                  2
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Первичный отбор
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Рассмотрение заявки и предварительный отбор
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                  3
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Собеседование
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Интервью с HR и руководителем отдела
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                  4
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Оффер
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Предложение о работе и оформление
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
          <CardContent className="text-center py-16">
            <h2 className="text-3xl font-bold mb-4">Не нашли подходящую вакансию?</h2>
            <p className="text-xl opacity-90 mb-8">
              Отправьте нам свое резюме, и мы свяжемся с вами, когда появится подходящая позиция
            </p>
            <Button size="lg" variant="secondary" className="text-gray-900 hover:bg-white">
              Отправить резюме
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}