import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, Eye, UserCheck, Database, Mail } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Политика конфиденциальности
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Последнее обновление: 16 июля 2025 г.
            </p>
          </div>

          {/* Introduction */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-6 h-6 text-green-500 mr-2" />
                Защита ваших данных
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                В "Моя Кето Диета" мы серьезно относимся к защите вашей конфиденциальности. 
                Данная политика объясняет, как мы собираем, используем и защищаем вашу личную информацию.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Используя наш сервис, вы соглашаетесь с условиями данной политики конфиденциальности.
              </p>
            </CardContent>
          </Card>

          {/* Data Collection */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="w-6 h-6 text-blue-500 mr-2" />
                Какие данные мы собираем
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Персональные данные
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                    <li>Имя и контактная информация (email, телефон)</li>
                    <li>Возраст, пол, рост, вес</li>
                    <li>Цели по здоровью и весу</li>
                    <li>Пищевые предпочтения и ограничения</li>
                    <li>Уровень физической активности</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Техническая информация
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                    <li>IP-адрес и данные браузера</li>
                    <li>Информация об устройстве</li>
                    <li>Логи активности на сайте</li>
                    <li>Файлы cookie и похожие технологии</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Платежная информация
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Платежные данные обрабатываются исключительно через защищенную систему Stripe. 
                    Мы не храним данные ваших банковских карт на наших серверах.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Usage */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="w-6 h-6 text-purple-500 mr-2" />
                Как мы используем ваши данные
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Основные цели использования:
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                    <li>Создание персонализированных планов питания</li>
                    <li>Расчет калорий и макронутриентов</li>
                    <li>Отслеживание прогресса и результатов</li>
                    <li>Предоставление консультаций и поддержки</li>
                    <li>Обработка платежей и управление подписками</li>
                    <li>Улучшение качества наших услуг</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Коммуникация:
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                    <li>Отправка уведомлений о вашем прогрессе</li>
                    <li>Информирование об обновлениях сервиса</li>
                    <li>Ответы на ваши вопросы и запросы</li>
                    <li>Маркетинговые материалы (с вашего согласия)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="w-6 h-6 text-red-500 mr-2" />
                Безопасность данных
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300">
                  Мы применяем современные методы защиты для обеспечения безопасности ваших данных:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                  <li>SSL-шифрование для передачи данных</li>
                  <li>Шифрование данных в базе данных</li>
                  <li>Регулярные аудиты безопасности</li>
                  <li>Ограниченный доступ к данным сотрудников</li>
                  <li>Резервное копирование и восстановление</li>
                  <li>Мониторинг подозрительной активности</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-300">
                  Несмотря на все меры предосторожности, мы не можем гарантировать 100% безопасность 
                  передачи данных через интернет.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Data Sharing */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserCheck className="w-6 h-6 text-orange-500 mr-2" />
                Передача данных третьим лицам
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300">
                  Мы не продаем и не сдаем в аренду ваши персональные данные третьим лицам. 
                  Данные могут быть переданы только в следующих случаях:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                  <li>Сервисные провайдеры (Stripe для платежей, облачные сервисы)</li>
                  <li>Юридические требования (по запросу властей)</li>
                  <li>Защита наших прав и безопасности</li>
                  <li>Передача бизнеса (при слиянии или продаже)</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-300">
                  Все третьи лица обязаны соблюдать конфиденциальность и использовать 
                  данные только для указанных целей.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* User Rights */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Ваши права</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300">
                  В соответствии с законодательством о защите данных, вы имеете право:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                  <li>Доступ к вашим персональным данным</li>
                  <li>Исправление неточной информации</li>
                  <li>Удаление ваших данных</li>
                  <li>Ограничение обработки данных</li>
                  <li>Портируемость данных</li>
                  <li>Отзыв согласия на обработку</li>
                  <li>Подача жалобы в надзорный орган</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-300">
                  Для реализации этих прав обращайтесь к нам по адресу: privacy@moyaketo.ru
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Cookies */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Использование cookie</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300">
                  Мы используем cookie и похожие технологии для улучшения работы сайта:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                  <li>Необходимые cookie для работы сайта</li>
                  <li>Аналитические cookie для изучения поведения</li>
                  <li>Функциональные cookie для персонализации</li>
                  <li>Маркетинговые cookie для рекламы</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-300">
                  Вы можете управлять cookie в настройках браузера или через наш центр предпочтений.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Data Retention */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Сроки хранения данных</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300">
                  Мы храним ваши данные только в течение необходимого времени:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                  <li>Данные аккаунта: до удаления аккаунта</li>
                  <li>Данные питания: 3 года после последнего входа</li>
                  <li>Платежные данные: 7 лет (требования налогового законодательства)</li>
                  <li>Маркетинговые данные: до отзыва согласия</li>
                  <li>Техническая информация: 2 года</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Updates */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Изменения в политике</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Мы оставляем за собой право обновлять данную политику конфиденциальности. 
                Существенные изменения будут доведены до вашего сведения через:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                <li>Уведомления на сайте</li>
                <li>Email-рассылку</li>
                <li>Обновление даты последнего изменения</li>
              </ul>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
            <CardContent className="text-center py-12">
              <Mail className="w-12 h-12 mx-auto mb-4 opacity-90" />
              <h2 className="text-2xl font-bold mb-4">Вопросы по конфиденциальности?</h2>
              <p className="text-lg opacity-90 mb-6">
                Свяжитесь с нами, если у вас есть вопросы о защите ваших данных
              </p>
              <div className="space-y-2">
                <p>Email: privacy@moyaketo.ru</p>
                <p>Телефон: +7 (800) 123-45-67</p>
                <p>Адрес: г. Москва, ул. Пример, д. 123, офис 456</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}