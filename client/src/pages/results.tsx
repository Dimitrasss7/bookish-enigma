import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DietCalculationResult, QuestionnaireData } from "@/lib/types";
import { Heart, Flame, Droplets, Utensils } from "lucide-react";

export default function Results() {
  const [, setLocation] = useLocation();
  const [dietPlan, setDietPlan] = useState<DietCalculationResult | null>(null);
  const [questionnaireData, setQuestionnaireData] = useState<QuestionnaireData | null>(null);

  useEffect(() => {
    const storedDietPlan = sessionStorage.getItem('dietPlan');
    const storedQuestionnaireData = sessionStorage.getItem('questionnaireData');
    
    if (storedDietPlan && storedQuestionnaireData) {
      setDietPlan(JSON.parse(storedDietPlan));
      setQuestionnaireData(JSON.parse(storedQuestionnaireData));
    } else {
      // Redirect to questionnaire if no data
      setLocation('/questionnaire');
    }
  }, [setLocation]);

  const handleGetFullPlan = () => {
    setLocation('/payment');
  };

  if (!dietPlan || !questionnaireData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-white py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Ваш персональный анализ готов!
          </h2>
          <p className="text-xl text-gray-600">
            Основываясь на ваших ответах, мы подготовили индивидуальные рекомендации
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Metabolic Info */}
          <Card className="shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Ваши показатели</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Heart className="text-primary w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Метаболический возраст</div>
                      <div className="text-xl font-bold text-gray-900">{dietPlan.metabolicAge} лет</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                      <Flame className="text-secondary w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Суточная норма калорий</div>
                      <div className="text-xl font-bold text-gray-900">{dietPlan.dailyCalories.toLocaleString()} ккал</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                      <Droplets className="text-accent w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Рекомендуемое количество воды</div>
                      <div className="text-xl font-bold text-gray-900">{dietPlan.waterIntake} литра</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Macros Distribution */}
          <Card className="shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Распределение БЖУ</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700 font-medium">Жиры</span>
                    <span className="text-primary font-bold">{dietPlan.fatPercentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-primary h-3 rounded-full transition-all duration-500" 
                      style={{ width: `${dietPlan.fatPercentage}%` }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700 font-medium">Белки</span>
                    <span className="text-secondary font-bold">{dietPlan.proteinPercentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-secondary h-3 rounded-full transition-all duration-500" 
                      style={{ width: `${dietPlan.proteinPercentage}%` }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700 font-medium">Углеводы</span>
                    <span className="text-accent font-bold">{dietPlan.carbPercentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-accent h-3 rounded-full transition-all duration-500" 
                      style={{ width: `${dietPlan.carbPercentage}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weight Loss Projection */}
        <Card className="shadow-lg mb-12">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Прогноз снижения веса</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">-{dietPlan.projectedWeightLoss.week1} кг</div>
                <div className="text-gray-600">1 неделя</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">-{dietPlan.projectedWeightLoss.week2} кг</div>
                <div className="text-gray-600">2 недели</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">-{dietPlan.projectedWeightLoss.week3} кг</div>
                <div className="text-gray-600">3 недели</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">-{dietPlan.projectedWeightLoss.week4} кг</div>
                <div className="text-gray-600">4 недели</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Button */}
        <div className="text-center">
          <Button 
            onClick={handleGetFullPlan}
            size="lg"
            className="bg-primary text-white hover:bg-opacity-90 transform hover:scale-105 transition-all shadow-lg text-xl px-12 py-6"
          >
            <Utensils className="mr-3 w-6 h-6" />
            Получить полный план на 28 дней
          </Button>
          <p className="text-gray-600 mt-4">Детальный план питания с рецептами и списками покупок</p>
        </div>
      </div>
    </div>
  );
}
