import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  CalendarDays, 
  TrendingDown, 
  Target, 
  Clock, 
  CheckCircle, 
  Download, 
  Settings, 
  MessageCircle,
  Trophy,
  Flame,
  Scale,
  Apple,
  ChefHat,
  Calendar,
  BarChart3,
  User,
  CreditCard,
  Star,
  Award,
  Utensils
} from "lucide-react";

export default function Dashboard() {
  const [currentWeight, setCurrentWeight] = useState("68.5");
  
  // Mock data - in real app this would come from API
  const userPlan = {
    type: "Премиум",
    startDate: "2024-01-15",
    daysRemaining: 21,
    totalDays: 28,
    nextPayment: "2024-02-15"
  };

  const progress = {
    currentWeight: 68.5,
    targetWeight: 60,
    startWeight: 75,
    weeklyGoal: 1.5
  };

  const todayMeals = [
    { id: 1, name: "Омлет с авокадо и семенами чиа", calories: 320, completed: true, type: "Завтрак", macros: { protein: 25, carbs: 8, fat: 28 } },
    { id: 2, name: "Салат с лососем и оливковым маслом", calories: 450, completed: true, type: "Обед", macros: { protein: 35, carbs: 12, fat: 32 } },
    { id: 3, name: "Куриная грудка с брокколи", calories: 380, completed: false, type: "Ужин", macros: { protein: 40, carbs: 15, fat: 20 } },
    { id: 4, name: "Орехи и кето-смузи", calories: 180, completed: false, type: "Перекус", macros: { protein: 8, carbs: 6, fat: 16 } },
  ];

  const weeklyProgress = [
    { week: 1, weight: 75, target: 73.5 },
    { week: 2, weight: 72.8, target: 72 },
    { week: 3, weight: 70.5, target: 70.5 },
    { week: 4, weight: 68.5, target: 69 },
  ];

  const payments = [
    { id: 1, date: "2024-01-15", amount: 1990, plan: "Премиум", status: "Оплачено" },
    { id: 2, date: "2023-12-15", amount: 990, plan: "Базовый", status: "Оплачено" },
  ];

  const completionPercentage = ((userPlan.totalDays - userPlan.daysRemaining) / userPlan.totalDays) * 100;
  const weightLossProgress = ((progress.startWeight - progress.currentWeight) / (progress.startWeight - progress.targetWeight)) * 100;
  const completedMeals = todayMeals.filter(meal => meal.completed).length;
  const totalCaloriesToday = todayMeals.filter(meal => meal.completed).reduce((sum, meal) => sum + meal.calories, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Добро пожаловать в ваш кабинет</h1>
              <p className="text-xl text-gray-600">Отслеживайте прогресс и следуйте персональному плану</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-gradient-to-r from-primary to-green-600 text-white px-4 py-2">
                <Trophy className="w-4 h-4 mr-2" />
                {userPlan.type} план
              </Badge>
            </div>
          </div>
        </div>

        {/* Hero Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700">Текущий вес</p>
                  <p className="text-3xl font-bold text-blue-900">{progress.currentWeight} кг</p>
                  <p className="text-xs text-blue-600 mt-1">-{(progress.startWeight - progress.currentWeight).toFixed(1)} кг от начала</p>
                </div>
                <div className="w-14 h-14 bg-blue-200 rounded-2xl flex items-center justify-center">
                  <Scale className="w-8 h-8 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-700">Целевой вес</p>
                  <p className="text-3xl font-bold text-green-900">{progress.targetWeight} кг</p>
                  <p className="text-xs text-green-600 mt-1">Осталось {(progress.currentWeight - progress.targetWeight).toFixed(1)} кг</p>
                </div>
                <div className="w-14 h-14 bg-green-200 rounded-2xl flex items-center justify-center">
                  <Target className="w-8 h-8 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-700">Дней осталось</p>
                  <p className="text-3xl font-bold text-orange-900">{userPlan.daysRemaining}</p>
                  <p className="text-xs text-orange-600 mt-1">из {userPlan.totalDays} дней плана</p>
                </div>
                <div className="w-14 h-14 bg-orange-200 rounded-2xl flex items-center justify-center">
                  <Clock className="w-8 h-8 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-700">Калорий сегодня</p>
                  <p className="text-3xl font-bold text-purple-900">{totalCaloriesToday}</p>
                  <p className="text-xs text-purple-600 mt-1">{completedMeals}/4 приема пищи</p>
                </div>
                <div className="w-14 h-14 bg-purple-200 rounded-2xl flex items-center justify-center">
                  <Flame className="w-8 h-8 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 h-12">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Обзор
            </TabsTrigger>
            <TabsTrigger value="meals" className="flex items-center gap-2">
              <ChefHat className="w-4 h-4" />
              Питание
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-2">
              <TrendingDown className="w-4 h-4" />
              Прогресс
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Профиль
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Платежи
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Progress Section */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-primary" />
                      Ваши достижения
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between text-sm mb-3">
                          <span className="font-medium">Завершено дней программы</span>
                          <span className="font-bold">{userPlan.totalDays - userPlan.daysRemaining} из {userPlan.totalDays}</span>
                        </div>
                        <Progress value={completionPercentage} className="h-3" />
                        <p className="text-xs text-gray-500 mt-2">Вы на {Math.round(completionPercentage)}% пути к цели!</p>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-3">
                          <span className="font-medium">Прогресс по снижению веса</span>
                          <span className="font-bold">{Math.round(weightLossProgress)}%</span>
                        </div>
                        <Progress value={weightLossProgress} className="h-3" />
                        <p className="text-xs text-gray-500 mt-2">Отличная работа! Вы теряете вес согласно плану.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Today's Meals */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Apple className="w-5 h-5 text-primary" />
                      План питания на сегодня
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {todayMeals.map((meal) => (
                        <div key={meal.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${meal.completed ? 'bg-green-500' : 'bg-gray-300'}`}>
                              {meal.completed && <CheckCircle className="w-3 h-3 text-white" />}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{meal.name}</p>
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span>{meal.type}</span>
                                <span>•</span>
                                <span>{meal.calories} ккал</span>
                                <span>•</span>
                                <span>Б: {meal.macros.protein}г</span>
                                <span>Ж: {meal.macros.fat}г</span>
                                <span>У: {meal.macros.carbs}г</span>
                              </div>
                            </div>
                          </div>
                          {!meal.completed && (
                            <Button size="sm" className="ml-4">Выполнено</Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5 text-primary" />
                      Ваш план
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Тариф</span>
                        <Badge className="bg-gradient-to-r from-primary to-green-600 text-white">{userPlan.type}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Дата начала</span>
                        <span className="font-medium">{userPlan.startDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Статус</span>
                        <Badge className="bg-green-100 text-green-800">Активен</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Следующий платеж</span>
                        <span className="font-medium">{userPlan.nextPayment}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Быстрые действия</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start" variant="outline">
                      <Scale className="w-4 h-4 mr-2" />
                      Обновить вес
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Скачать план PDF
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Calendar className="w-4 h-4 mr-2" />
                      Просмотреть календарь
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Связаться с поддержкой
                    </Button>
                  </CardContent>
                </Card>

                {/* Motivational Card */}
                <Card className="bg-gradient-to-br from-primary/10 to-green-100 border-primary/20">
                  <CardContent className="p-6 text-center">
                    <Star className="w-12 h-12 text-primary mx-auto mb-3" />
                    <h3 className="font-bold text-gray-900 mb-2">Отличная работа!</h3>
                    <p className="text-sm text-gray-700">Вы уже потеряли {(progress.startWeight - progress.currentWeight).toFixed(1)} кг. Продолжайте в том же духе!</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="meals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-primary" />
                  Подробный план питания
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <ChefHat className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">План питания на 28 дней</h3>
                  <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                    Здесь будет отображаться детальный план питания на каждый день с рецептами, списками покупок и инструкциями по приготовлению.
                  </p>
                  <Button size="lg" className="bg-gradient-to-r from-primary to-green-600">
                    <Download className="w-5 h-5 mr-2" />
                    Открыть полный план питания
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  График прогресса по неделям
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weeklyProgress.map((week) => (
                    <div key={week.week} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                          <span className="font-bold text-primary">{week.week}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-900">Неделя {week.week}</span>
                          <p className="text-sm text-gray-600">Цель: {week.target} кг</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-bold text-lg">{week.weight} кг</p>
                          <p className="text-sm text-gray-600">Факт. вес</p>
                        </div>
                        <Badge className={week.weight <= week.target ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                          {week.weight <= week.target ? (
                            <div className="flex items-center gap-1">
                              <Award className="w-3 h-3" />
                              Цель достигнута
                            </div>
                          ) : "Близко к цели"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Настройки профиля
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="current-weight" className="text-base font-medium">Текущий вес (кг)</Label>
                    <Input
                      id="current-weight"
                      type="number"
                      value={currentWeight}
                      onChange={(e) => setCurrentWeight(e.target.value)}
                      className="mt-2 h-12 text-lg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="target-weight" className="text-base font-medium">Целевой вес (кг)</Label>
                    <Input
                      id="target-weight"
                      type="number"
                      value="60"
                      className="mt-2 h-12 text-lg"
                    />
                  </div>
                </div>
                <Button size="lg" className="bg-gradient-to-r from-primary to-green-600">
                  <Settings className="w-5 h-5 mr-2" />
                  Сохранить изменения
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  История платежей
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {payments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                          <CreditCard className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{payment.plan}</p>
                          <p className="text-sm text-gray-600">{payment.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">{payment.amount} ₽</p>
                        <Badge className="bg-green-100 text-green-800">{payment.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}