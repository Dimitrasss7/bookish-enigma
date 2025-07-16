import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Условия использования
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Последнее обновление: 16 июля 2025 г.
            </p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>1. Принятие условий</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300">
                  Используя наш сервис "Моя Кето Диета", вы соглашаетесь с настоящими условиями использования. 
                  Если вы не согласны с какими-либо из этих условий, пожалуйста, не используйте наш сервис.
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Мы оставляем за собой право изменять эти условия в любое время. Уведомления об изменениях 
                  будут размещены на нашем сайте.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Описание сервиса</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300">
                  "Моя Кето Диета" предоставляет персонализированные программы питания на основе кетогенной диеты. 
                  Наш сервис включает:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                  <li>Персонализированные планы питания</li>
                  <li>Расчет калорий и макронутриентов</li>
                  <li>Рекомендации по продуктам</li>
                  <li>Отслеживание прогресса</li>
                  <li>Поддержку специалистов</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Регистрация и аккаунт</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300">
                  Для использования сервиса вам необходимо создать аккаунт. При регистрации вы обязуетесь:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                  <li>Предоставлять точную и актуальную информацию</li>
                  <li>Поддерживать безопасность своего аккаунта</li>
                  <li>Немедленно уведомлять нас о любом несанкционированном использовании</li>
                  <li>Быть ответственным за всю активность в вашем аккаунте</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Оплата и подписка</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300">
                  Мы предлагаем различные тарифные планы. Условия оплаты:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                  <li>Все платежи обрабатываются безопасно через Stripe</li>
                  <li>Подписка продлевается автоматически</li>
                  <li>Вы можете отменить подписку в любое время</li>
                  <li>Возврат средств осуществляется согласно нашей политике возврата</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Использование сервиса</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300">
                  Вы обязуетесь использовать наш сервис только в законных целях. Запрещается:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                  <li>Нарушать авторские права или другие права интеллектуальной собственности</li>
                  <li>Передавать вредоносный код или вирусы</li>
                  <li>Совершать действия, которые могут навредить работе сервиса</li>
                  <li>Использовать сервис для незаконных целей</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Медицинские рекомендации</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300">
                  Важно понимать, что:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                  <li>Наш сервис не заменяет профессиональную медицинскую консультацию</li>
                  <li>Перед началом любой диеты рекомендуется проконсультироваться с врачом</li>
                  <li>Мы не несем ответственности за результаты использования наших рекомендаций</li>
                  <li>Индивидуальные особенности здоровья должны учитываться при следовании программе</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Интеллектуальная собственность</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300">
                  Все материалы сервиса, включая тексты, изображения, дизайн и программное обеспечение, 
                  защищены авторским правом и принадлежат нам или нашим лицензиарам.
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Вы получаете ограниченную лицензию на использование сервиса только для личных, 
                  некоммерческих целей.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Ограничение ответственности</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300">
                  Мы предоставляем сервис "как есть" без каких-либо гарантий. Мы не несем ответственности за:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                  <li>Любые прямые, косвенные или случайные убытки</li>
                  <li>Потерю данных или прибыли</li>
                  <li>Прерывание работы сервиса</li>
                  <li>Результаты использования диетических рекомендаций</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>9. Прекращение использования</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300">
                  Мы оставляем за собой право прекратить предоставление сервиса или заблокировать 
                  ваш аккаунт в случае нарушения условий использования.
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Вы можете прекратить использование сервиса в любое время, удалив свой аккаунт.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>10. Контактная информация</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300">
                  Если у вас есть вопросы по условиям использования, свяжитесь с нами:
                </p>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-600 dark:text-gray-300">
                    Email: legal@moyaketo.ru<br />
                    Телефон: +7 (800) 123-45-67<br />
                    Адрес: г. Москва, ул. Пример, д. 123, офис 456
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}