import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock, RefreshCw } from "lucide-react";

export default function Refund() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Политика возврата средств
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Мы заботимся о вашем удовлетворении и предлагаем справедливую политику возврата
            </p>
          </div>

          {/* Guarantee Section */}
          <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-2xl p-8 mb-8 text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="w-16 h-16" />
            </div>
            <h2 className="text-3xl font-bold mb-4">30-дневная гарантия возврата денег</h2>
            <p className="text-lg opacity-90">
              Если вы не удовлетворены результатами в течение первых 30 дней, мы вернем вам деньги
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
                  Условия возврата
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <Badge variant="outline" className="mr-2 mt-1">✓</Badge>
                    Запрос подан в течение 30 дней с момента покупки
                  </li>
                  <li className="flex items-start">
                    <Badge variant="outline" className="mr-2 mt-1">✓</Badge>
                    Вы следовали программе минимум 14 дней
                  </li>
                  <li className="flex items-start">
                    <Badge variant="outline" className="mr-2 mt-1">✓</Badge>
                    Предоставили обратную связь о проблемах
                  </li>
                  <li className="flex items-start">
                    <Badge variant="outline" className="mr-2 mt-1">✓</Badge>
                    Аккаунт не был заблокирован за нарушения
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-2" />
                  Исключения
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <Badge variant="outline" className="mr-2 mt-1">✗</Badge>
                    Прошло более 30 дней с момента покупки
                  </li>
                  <li className="flex items-start">
                    <Badge variant="outline" className="mr-2 mt-1">✗</Badge>
                    Нарушение условий использования
                  </li>
                  <li className="flex items-start">
                    <Badge variant="outline" className="mr-2 mt-1">✗</Badge>
                    Отказ от сотрудничества с поддержкой
                  </li>
                  <li className="flex items-start">
                    <Badge variant="outline" className="mr-2 mt-1">✗</Badge>
                    Злоупотребление политикой возврата
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Process Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-center">Процесс возврата средств</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">1</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Обращение</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Свяжитесь с нами через форму обратной связи или email
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-green-600 dark:text-green-400">2</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Рассмотрение</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Мы рассмотрим ваш запрос в течение 2-3 рабочих дней
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">3</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Одобрение</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    При одобрении мы инициируем возврат средств
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">4</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Возврат</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Деньги вернутся на карту в течение 5-10 рабочих дней
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Часто задаваемые вопросы</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Почему нужно следовать программе минимум 14 дней?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Кетогенная диета требует времени для адаптации организма. Первые результаты становятся 
                  заметными через 2-3 недели регулярного соблюдения программы.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Как долго обрабатывается запрос на возврат?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Обычно рассмотрение занимает 2-3 рабочих дня. В сложных случаях может потребоваться 
                  до 5 рабочих дней.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Можно ли получить частичный возврат?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Мы предоставляем полный возврат средств. Частичные возвраты рассматриваются в 
                  индивидуальном порядке в особых случаях.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Что делать, если прошло более 30 дней?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Обратитесь к нам через службу поддержки. Мы рассмотрим ваш случай индивидуально 
                  и постараемся найти решение.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
            <CardContent className="text-center py-12">
              <RefreshCw className="w-16 h-16 mx-auto mb-6 opacity-90" />
              <h2 className="text-3xl font-bold mb-4">Нужен возврат средств?</h2>
              <p className="text-lg opacity-90 mb-8">
                Мы готовы помочь вам решить любые вопросы. Свяжитесь с нами сегодня.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" className="text-gray-900">
                  Связаться с поддержкой
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-900">
                  Отправить запрос
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}