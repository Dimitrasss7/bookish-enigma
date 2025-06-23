import { useState, useEffect } from "react";
import { useStripe, useElements, PaymentElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { PAYMENT_PLANS } from "@/lib/types";
import { Check, Shield, CreditCard, Star, Crown, Zap, Gift, Clock, Users, Award, Sparkles } from "lucide-react";

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function CheckoutForm({ selectedPlan, email }: { selectedPlan: string; email: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/dashboard",
      },
    });

    if (error) {
      toast({
        title: "Ошибка оплаты",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Оплата прошла успешно",
        description: "Спасибо за покупку!",
      });
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-xl border">
        <PaymentElement 
          options={{
            layout: 'tabs'
          }}
        />
      </div>
      <Button 
        type="submit" 
        disabled={!stripe || isLoading} 
        className="w-full bg-gradient-to-r from-primary to-green-600 hover:from-primary/90 hover:to-green-600/90 shadow-lg text-lg py-6"
        size="lg"
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Обработка платежа...
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Оплатить {selectedPlan === 'premium' ? '1990' : '990'} ₽
          </div>
        )}
      </Button>
    </form>
  );
}

export default function Payment() {
  const [selectedPlan, setSelectedPlan] = useState('basic');
  const [email, setEmail] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    if (selectedPlan && email && agreedToTerms) {
      // Create PaymentIntent when plan is selected
      const planData = PAYMENT_PLANS.find(p => p.id === selectedPlan);
      if (planData) {
        apiRequest("POST", "/api/create-payment-intent", { 
          amount: planData.price,
          plan: selectedPlan,
          email 
        })
          .then((res) => res.json())
          .then((data) => {
            setClientSecret(data.clientSecret);
          })
          .catch((error) => {
            toast({
              title: "Ошибка",
              description: "Не удалось создать платеж",
              variant: "destructive",
            });
          });
      }
    }
  }, [selectedPlan, email, agreedToTerms]);

  const selectedPlanData = PAYMENT_PLANS.find(p => p.id === selectedPlan);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-primary to-green-600 rounded-2xl flex items-center justify-center shadow-xl">
              <Crown className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Выберите ваш план
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Начните путь к здоровому весу уже сегодня с персональным планом кето-диеты
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Plan Selection */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <Sparkles className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-gray-900">Тарифные планы</h2>
            </div>
            
            <div className="grid gap-6">
              {PAYMENT_PLANS.map((plan) => (
                <Card 
                  key={plan.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-xl ${
                    selectedPlan === plan.id 
                      ? 'ring-2 ring-primary border-primary shadow-xl scale-105' 
                      : 'hover:shadow-lg hover:-translate-y-1'
                  } ${plan.popular ? 'border-primary/50 relative overflow-hidden' : ''}`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-primary to-green-600 text-white px-4 py-1 text-sm font-medium">
                      Популярный выбор
                    </div>
                  )}
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-6 h-6 rounded-full border-2 transition-all ${
                          selectedPlan === plan.id 
                            ? 'bg-primary border-primary shadow-lg' 
                            : 'border-gray-300 hover:border-primary'
                        }`}>
                          {selectedPlan === plan.id && (
                            <Check className="w-4 h-4 text-white m-0.5" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                            {plan.id === 'premium' && (
                              <Crown className="w-5 h-5 text-yellow-500" />
                            )}
                          </div>
                          <p className="text-gray-600">{plan.duration}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-gray-900 mb-1">{plan.price} ₽</div>
                        {plan.id === 'premium' && (
                          <div className="text-sm text-green-600 font-medium">Пожизненный доступ</div>
                        )}
                        {plan.id === 'basic' && (
                          <div className="text-sm text-gray-500">28 дней</div>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-3 mb-6">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-green-600" />
                          </div>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {plan.id === 'premium' && (
                      <div className="p-4 bg-gradient-to-r from-primary/10 to-green-100 rounded-xl">
                        <div className="flex items-center gap-2 mb-2">
                          <Gift className="w-5 h-5 text-primary" />
                          <span className="font-semibold text-gray-900">Эксклюзивные бонусы:</span>
                        </div>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Библиотека из 500+ кето-рецептов</li>
                          <li>• Персональная поддержка нутрициолога</li>
                          <li>• Мобильное приложение с трекером</li>
                          <li>• Доступ к закрытому сообществу</li>
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Trust Indicators */}
            <div className="grid sm:grid-cols-3 gap-4 mt-8">
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4 text-center">
                  <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-green-800 mb-1">Гарантия возврата</h4>
                  <p className="text-xs text-green-700">7 дней на возврат денег</p>
                </CardContent>
              </Card>
              
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4 text-center">
                  <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-blue-800 mb-1">50,000+</h4>
                  <p className="text-xs text-blue-700">довольных клиентов</p>
                </CardContent>
              </Card>
              
              <Card className="bg-yellow-50 border-yellow-200">
                <CardContent className="p-4 text-center">
                  <Award className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-yellow-800 mb-1">4.9/5</h4>
                  <p className="text-xs text-yellow-700">средний рейтинг</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Payment Form */}
          <div className="space-y-6">
            <Card className="border-2 border-gray-100 shadow-xl sticky top-6">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <CreditCard className="w-6 h-6 text-primary" />
                  Оформление заказа
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Order Summary */}
                {selectedPlanData && (
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-3">Ваш заказ:</h4>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700">{selectedPlanData.name}</span>
                      <span className="font-bold text-lg">{selectedPlanData.price} ₽</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {selectedPlanData.duration}
                    </div>
                  </div>
                )}

                {/* Email Input */}
                <div>
                  <Label htmlFor="email" className="text-base font-medium">Email адрес</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="mt-2 h-12 text-base"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    На этот email придет доступ к вашему плану
                  </p>
                </div>

                {/* Terms Agreement */}
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="terms"
                    checked={agreedToTerms}
                    onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
                    className="mt-1"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-700 leading-6">
                    Я согласен с{" "}
                    <a href="#" className="text-primary hover:underline font-medium">
                      условиями использования
                    </a>{" "}
                    и{" "}
                    <a href="#" className="text-primary hover:underline font-medium">
                      политикой конфиденциальности
                    </a>. Также согласен на обработку персональных данных.
                  </label>
                </div>

                {/* Payment Element */}
                {clientSecret && email && agreedToTerms ? (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm selectedPlan={selectedPlan} email={email} />
                  </Elements>
                ) : (
                  <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-xl">
                    <Clock className="w-8 h-8 mx-auto mb-3 text-gray-400" />
                    {!email && <p>Введите email для продолжения</p>}
                    {email && !agreedToTerms && <p>Согласитесь с условиями для продолжения</p>}
                  </div>
                )}

                {/* Security Notice */}
                <div className="flex items-center justify-center gap-4 text-sm text-gray-600 pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span>Защищенная оплата SSL</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-blue-600" />
                    <span>Stripe Security</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}