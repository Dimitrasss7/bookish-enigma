import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { PAYMENT_PLANS } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Check, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function CheckoutForm({ selectedPlan, email }: { selectedPlan: string; email: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements || !email) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, укажите email адрес",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/dashboard`,
        receipt_email: email,
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
        title: "Оплата успешна!",
        description: "Спасибо за покупку! Перенаправляем в личный кабинет...",
      });
      setTimeout(() => {
        setLocation('/dashboard');
      }, 2000);
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      <Button 
        type="submit" 
        disabled={!stripe || isProcessing}
        className="w-full bg-primary text-white hover:bg-primary/90 py-3"
      >
        {isProcessing ? "Обработка..." : "Оплатить"}
      </Button>
    </form>
  );
}

export default function Payment() {
  const [, setLocation] = useLocation();
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [email, setEmail] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const selectedPlanData = PAYMENT_PLANS.find(plan => plan.id === selectedPlan);

  const createPaymentIntent = async () => {
    if (!email || !selectedPlanData) return;

    setIsLoading(true);
    try {
      const response = await apiRequest('POST', '/api/create-payment-intent', {
        amount: selectedPlanData.price,
        planType: selectedPlan,
        userId: 1, // TODO: Get from auth context
      });
      
      const data = await response.json();
      setClientSecret(data.clientSecret);
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось создать платеж. Попробуйте еще раз.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Check if we have data from previous steps
    const storedDietPlan = sessionStorage.getItem('dietPlan');
    if (!storedDietPlan) {
      setLocation('/questionnaire');
    }
  }, [setLocation]);

  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Выберите ваш план
          </h2>
          <p className="text-xl text-gray-600">
            Получите доступ к персональному плану питания и начните преображение уже сегодня
          </p>
        </div>

        {/* Email Input */}
        <Card className="bg-gray-50 mb-8">
          <CardContent className="p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Укажите ваш email</h3>
            <div className="flex gap-4">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 text-lg"
              />
              <Button 
                onClick={createPaymentIntent}
                disabled={!email || isLoading}
                className="bg-primary text-white hover:bg-primary/90"
              >
                {isLoading ? "..." : <Check className="w-4 h-4" />}
              </Button>
            </div>
            <p className="text-sm text-gray-600 mt-2">Мы отправим план питания на этот адрес</p>
          </CardContent>
        </Card>

        {/* Pricing Plans */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {PAYMENT_PLANS.map((plan) => (
            <Card 
              key={plan.id}
              className={cn(
                "cursor-pointer transition-all hover:shadow-lg",
                plan.popular && "border-primary bg-primary/5",
                selectedPlan === plan.id && "ring-2 ring-primary"
              )}
              onClick={() => setSelectedPlan(plan.id)}
            >
              <CardContent className="p-8 relative">
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-accent text-white px-6 py-2 rounded-full text-sm font-semibold">
                      Популярный
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{plan.price.toLocaleString()} ₽</div>
                  <div className="text-gray-600">{plan.duration}</div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="text-primary w-4 h-4 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={cn(
                    "w-full py-4 font-semibold",
                    selectedPlan === plan.id 
                      ? "bg-primary text-white hover:bg-primary/90" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  )}
                >
                  {selectedPlan === plan.id ? "Выбран" : "Выбрать план"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Payment Form */}
        {clientSecret && (
          <Card className="bg-gray-50">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Оплата</h3>
              
              <div className="flex items-center gap-3 mb-6">
                <Checkbox 
                  id="terms"
                  checked={termsAccepted}
                  onCheckedChange={(checked) => setTermsAccepted(!!checked)}
                />
                <Label htmlFor="terms" className="text-gray-700">
                  Я согласен с{" "}
                  <a href="#" className="text-primary hover:underline">условиями использования</a>
                  {" "}и{" "}
                  <a href="#" className="text-primary hover:underline">политикой конфиденциальности</a>
                </Label>
              </div>
              
              <div className="bg-success/10 border border-success/20 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-3">
                  <Shield className="text-success w-6 h-6" />
                  <div>
                    <div className="font-semibold text-success">Гарантия возврата денег</div>
                    <div className="text-sm text-gray-600">30 дней на возврат без вопросов</div>
                  </div>
                </div>
              </div>

              {termsAccepted && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <CheckoutForm selectedPlan={selectedPlan} email={email} />
                </Elements>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
