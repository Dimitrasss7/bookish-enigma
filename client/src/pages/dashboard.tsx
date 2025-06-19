import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DietCalculationResult, QuestionnaireData } from "@/lib/types";
import { generateDietPlanDays } from "@/lib/diet-calculator";
import { 
  Settings, 
  Check, 
  Utensils, 
  ShoppingCart, 
  BookOpen, 
  BarChart3,
  Leaf,
  Calendar,
  Target,
  TrendingDown
} from "lucide-react";

export default function Dashboard() {
  const [dietPlan, setDietPlan] = useState<DietCalculationResult | null>(null);
  const [questionnaireData, setQuestionnaireData] = useState<QuestionnaireData | null>(null);
  const [currentDay] = useState(5); // Mock current day
  const [userStats] = useState({
    currentWeight: 66.8,
    weightLost: 3.2,
    daysLeft: 23,
  });

  const [mealPlan, setMealPlan] = useState<any[]>([]);

  useEffect(() => {
    const storedDietPlan = sessionStorage.getItem('dietPlan');
    const storedQuestionnaireData = sessionStorage.getItem('questionnaireData');
    
    if (storedDietPlan && storedQuestionnaireData) {
      const dietPlanData = JSON.parse(storedDietPlan);
      const questionnaireDataParsed = JSON.parse(storedQuestionnaireData);
      
      setDietPlan(dietPlanData);
      setQuestionnaireData(questionnaireDataParsed);
      
      // Generate meal plan
      const meals = generateDietPlanDays(
        dietPlanData.dailyCalories,
        questionnaireDataParsed.proteinSources,
        questionnaireDataParsed.favoriteVegetables
      );
      setMealPlan(meals);
    }
  }, []);

  if (!dietPlan || !questionnaireData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  const todaysMeals = mealPlan[currentDay - 1];
  const dayProgress = 75; // Mock progress
  const targetWeight = questionnaireData.targetWeight;
  const toGoal = userStats.currentWeight - targetWeight;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-primary flex items-center">
                <Leaf className="mr-2" />
                Моя Кето Диета
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Мой план питания</h1>
            <p className="text-gray-600 mt-2">Добро пожаловать в ваш персональный кабинет!</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm text-gray-600">Дней осталось</div>
              <div className="text-2xl font-bold text-primary">{userStats.daysLeft}</div>
            </div>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary">
              Активен
            </Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Today's Plan */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg mb-6">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Сегодня - День {currentDay}
                  </h2>
                  <Badge className="bg-primary/10 text-primary">
                    <Calendar className="w-3 h-3 mr-1" />
                    День {currentDay}
                  </Badge>
                </div>
                
                {/* Progress */}
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700 font-medium">Прогресс дня</span>
                    <span className="text-primary font-semibold">{dayProgress}%</span>
                  </div>
                  <Progress value={dayProgress} className="h-3" />
                </div>
                
                {/* Meals */}
                {todaysMeals && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-success/10 border-l-4 border-success rounded-r-xl">
                      <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center">
                        <Check className="text-success w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">Завтрак</div>
                        <div className="text-gray-600">{todaysMeals.breakfast.name}</div>
                      </div>
                      <div className="text-sm text-gray-600">{todaysMeals.breakfast.calories} ккал</div>
                    </div>
                    
                    <div className="flex items-center gap-4 p-4 bg-success/10 border-l-4 border-success rounded-r-xl">
                      <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center">
                        <Check className="text-success w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">Обед</div>
                        <div className="text-gray-600">{todaysMeals.lunch.name}</div>
                      </div>
                      <div className="text-sm text-gray-600">{todaysMeals.lunch.calories} ккал</div>
                    </div>
                    
                    <div className="flex items-center gap-4 p-4 bg-gray-50 border-l-4 border-gray-300 rounded-r-xl">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <Utensils className="text-gray-500 w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">Ужин</div>
                        <div className="text-gray-600">{todaysMeals.dinner.name}</div>
                      </div>
                      <div className="text-sm text-gray-600">{todaysMeals.dinner.calories} ккал</div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Weekly Progress */}
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Прогресс по неделям</h3>
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">
                      -{dietPlan.projectedWeightLoss.week1} кг
                    </div>
                    <div className="text-sm text-gray-600">Неделя 1</div>
                    <Badge className="bg-success/10 text-success mt-1">Достигнуто</Badge>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-400 mb-1">
                      -{dietPlan.projectedWeightLoss.week2} кг
                    </div>
                    <div className="text-sm text-gray-600">Неделя 2</div>
                    <Badge variant="outline" className="mt-1">В процессе</Badge>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-400 mb-1">
                      -{dietPlan.projectedWeightLoss.week3} кг
                    </div>
                    <div className="text-sm text-gray-600">Неделя 3</div>
                    <Badge variant="outline" className="mt-1">Ожидается</Badge>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-400 mb-1">
                      -{dietPlan.projectedWeightLoss.week4} кг
                    </div>
                    <div className="text-sm text-gray-600">Неделя 4</div>
                    <Badge variant="outline" className="mt-1">Ожидается</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Статистика</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Текущий вес</span>
                    <span className="font-bold text-gray-900">{userStats.currentWeight} кг</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Потеряно</span>
                    <span className="font-bold text-success flex items-center">
                      <TrendingDown className="w-4 h-4 mr-1" />
                      -{userStats.weightLost} кг
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">До цели</span>
                    <span className="font-bold text-primary flex items-center">
                      <Target className="w-4 h-4 mr-1" />
                      {toGoal.toFixed(1)} кг
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Быстрые действия</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <ShoppingCart className="text-primary mr-3 w-4 h-4" />
                    Список покупок
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BookOpen className="text-secondary mr-3 w-4 h-4" />
                    Книга рецептов
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="text-accent mr-3 w-4 h-4" />
                    Отчеты
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Today's Macros */}
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Сегодняшние БЖУ</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Жиры</span>
                      <span className="text-sm font-medium">{dietPlan.fatPercentage}%</span>
                    </div>
                    <Progress value={dietPlan.fatPercentage} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Белки</span>
                      <span className="text-sm font-medium">{dietPlan.proteinPercentage}%</span>
                    </div>
                    <Progress value={dietPlan.proteinPercentage} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Углеводы</span>
                      <span className="text-sm font-medium">{dietPlan.carbPercentage}%</span>
                    </div>
                    <Progress value={dietPlan.carbPercentage} className="h-2" />
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
