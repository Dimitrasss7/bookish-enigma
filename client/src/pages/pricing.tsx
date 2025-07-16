import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star, Zap, Crown } from "lucide-react";
import { PAYMENT_PLANS } from "@/lib/types";

export default function Pricing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Выберите свой план
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Персонализированные кето-программы для достижения ваших целей по здоровью и весу
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {PAYMENT_PLANS.map((plan, index) => (
            <Card key={plan.id} className={`relative ${plan.popular ? 'border-2 border-green-500 shadow-lg' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-green-500 text-white px-4 py-1">
                    <Star className="w-4 h-4 mr-1" />
                    Популярный
                  </Badge>
                </div>
              )}
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  {plan.id === 'premium' ? (
                    <Crown className="w-12 h-12 text-yellow-500" />
                  ) : (
                    <Zap className="w-12 h-12 text-blue-500" />
                  )}
                </div>
                <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {plan.price}₽
                </div>
                <p className="text-gray-600 dark:text-gray-300">{plan.duration}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full ${plan.popular ? 'bg-green-500 hover:bg-green-600' : ''}`}
                  size="lg"
                >
                  Выбрать план
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Comparison */}
        <div className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl text-center mb-6">
                Сравнение планов
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-4 px-4">Функция</th>
                      <th className="text-center py-4 px-4">Базовый</th>
                      <th className="text-center py-4 px-4">Премиум</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-4 px-4">Персональный план питания</td>
                      <td className="text-center py-4 px-4">
                        <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                      </td>
                      <td className="text-center py-4 px-4">
                        <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-4 px-4">Расчет калорий и БЖУ</td>
                      <td className="text-center py-4 px-4">
                        <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                      </td>
                      <td className="text-center py-4 px-4">
                        <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-4 px-4">Списки покупок</td>
                      <td className="text-center py-4 px-4">
                        <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                      </td>
                      <td className="text-center py-4 px-4">
                        <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-4 px-4">Отслеживание прогресса</td>
                      <td className="text-center py-4 px-4">
                        <span className="text-gray-400">Базовое</span>
                      </td>
                      <td className="text-center py-4 px-4">
                        <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-4 px-4">Консультации специалистов</td>
                      <td className="text-center py-4 px-4">
                        <span className="text-gray-400">—</span>
                      </td>
                      <td className="text-center py-4 px-4">
                        <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-4 px-4">Приоритетная поддержка</td>
                      <td className="text-center py-4 px-4">
                        <span className="text-gray-400">—</span>
                      </td>
                      <td className="text-center py-4 px-4">
                        <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-4 px-4">Индивидуальная корректировка</td>
                      <td className="text-center py-4 px-4">
                        <span className="text-gray-400">—</span>
                      </td>
                      <td className="text-center py-4 px-4">
                        <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl text-center mb-6">
                Часто задаваемые вопросы
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Можно ли изменить план после покупки?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Да, вы можете перейти на премиум-план в любое время. Разница в стоимости будет пересчитана.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Есть ли скидки для длительных подписок?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Мы регулярно проводим акции для новых пользователей. Подпишитесь на рассылку, чтобы не пропустить специальные предложения.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Можно ли отменить подписку?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Конечно! Вы можете отменить подписку в любое время в настройках аккаунта. Доступ к программе сохранится до конца оплаченного периода.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Безопасны ли платежи?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Да, все платежи обрабатываются через защищенную систему Stripe с использованием SSL-шифрования. Мы не храним данные ваших карт.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Guarantee Section */}
        <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
          <CardContent className="text-center py-16">
            <CheckCircle className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-3xl font-bold mb-4">30-дневная гарантия возврата денег</h2>
            <p className="text-xl opacity-90 mb-8">
              Если вы не удовлетворены результатами в течение первого месяца, мы вернем вам деньги
            </p>
            <Button size="lg" variant="secondary" className="text-gray-900 hover:bg-white">
              Начать сейчас без риска
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}