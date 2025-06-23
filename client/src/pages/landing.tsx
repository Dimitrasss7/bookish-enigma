import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";
import { 
  Leaf, 
  Users, 
  Star, 
  Weight, 
  Brain, 
  Zap, 
  Heart,
  ClipboardList,
  Settings,
  Utensils,
  ChevronRight
} from "lucide-react";

import ultra_realistic_food_photography__overhead_shot_of from "@assets/ultra-realistic-food-photography--overhead-shot-of (1)_1750715471152.png";

export default function Landing() {
  const [, setLocation] = useLocation();

  const navigateToQuestionnaire = () => {
    setLocation("/questionnaire");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-primary flex items-center">
                <Leaf className="mr-2" />
                Моя Кето Диета
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#benefits" className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium transition-colors">
                  О кето-диете
                </a>
                <a href="#how-it-works" className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium transition-colors">
                  Как это работает
                </a>
                <Button className="btn-primary">
                  Войти
                </Button>
              </div>
            </div>
          </div>
        </nav>
      </header>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-secondary/5 to-white pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Персональный план 
                <span className="text-primary"> кето-диеты</span> 
                за 28 дней
              </h1>
              <p className="mt-6 text-xl text-gray-600 leading-relaxed">
                Получите индивидуальный план питания, основанный на ваших предпочтениях, образе жизни и целях. Начните путь к здоровому весу уже сегодня.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={navigateToQuestionnaire}
                  size="lg"
                  className="bg-primary text-white hover:bg-opacity-90 transform hover:scale-105 transition-all shadow-lg text-lg px-8 py-4"
                >
                  <ChevronRight className="mr-2 w-5 h-5" />
                  Получить план питания
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-gray-300 hover:border-primary text-lg px-8 py-4"
                >
                  Смотреть видео
                </Button>
              </div>
              <div className="mt-8 flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <Users className="text-primary mr-2 w-4 h-4" />
                  <span>50,000+ довольных клиентов</span>
                </div>
                <div className="flex items-center">
                  <Star className="text-accent mr-1 w-4 h-4" />
                  <span>4.9/5 рейтинг</span>
                </div>
              </div>
            </div>
            <div className="mt-12 lg:mt-0 lg:col-span-6">
              <div className="relative">
                <img 
                  src="/attached_assets/ultra-realistic-food-photography--overhead-shot-of_1750717330747.png" 
                  alt="Красивый кето-салат с авокадо, яйцом и овощами" 
                  className="rounded-2xl shadow-2xl w-full object-cover h-96"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Weight className="text-primary w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Средняя потеря веса</div>
                      <div className="text-xl font-bold text-gray-900">-5.2 кг</div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                      <ClipboardList className="text-secondary w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">За</div>
                      <div className="text-xl font-bold text-gray-900">28 дней</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* What is Keto Section */}
      <section className="py-20 bg-white" id="benefits">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Что такое кето-диета?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Кетогенная диета - это низкоуглеводный план питания, который помогает вашему организму сжигать жир более эффективно, входя в состояние кетоза.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <img 
                src={ultra_realistic_food_photography__overhead_shot_of} 
                alt="Keto diet foods" 
                className="rounded-2xl shadow-lg w-full ml-[-3px] mr-[-3px] mt-[0px] mb-[0px]"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Как работает кетоз</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Ограничение углеводов</h4>
                    <p className="text-gray-600">Снижаем потребление углеводов до 20-50г в день</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Переключение метаболизма</h4>
                    <p className="text-gray-600">Организм начинает использовать жиры как основной источник энергии</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Кетоз</h4>
                    <p className="text-gray-600">Печень превращает жиры в кетоны - эффективное топливо для мозга и тела</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 bg-gray-50 border-none">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Weight className="text-primary w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Быстрая потеря веса</h3>
                <p className="text-gray-600">Сжигание жира в качестве основного источника энергии</p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6 bg-gray-50 border-none">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="text-secondary w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Улучшение когнитивных функций</h3>
                <p className="text-gray-600">Повышение концентрации и ментальной ясности</p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6 bg-gray-50 border-none">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="text-accent w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Стабильная энергия</h3>
                <p className="text-gray-600">Отсутствие скачков сахара в крови</p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6 bg-gray-50 border-none">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="text-success w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Здоровье сердца</h3>
                <p className="text-gray-600">Улучшение липидного профиля крови</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* How It Works Section */}
      <section className="py-20 bg-gray-50" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Как получить персональный план
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Всего 3 простых шага до вашего индивидуального плана питания
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <ClipboardList className="text-white w-12 h-12" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">1</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Заполните анкету</h3>
              <p className="text-gray-600 text-lg">
                Ответьте на вопросы о ваших предпочтениях в еде, образе жизни и целях по снижению веса
              </p>
            </div>
            
            <div className="text-center">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings className="text-white w-12 h-12" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">2</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Получите анализ</h3>
              <p className="text-gray-600 text-lg">
                Наш алгоритм рассчитает ваш метаболический возраст, калории и оптимальное соотношение БЖУ
              </p>
            </div>
            
            <div className="text-center">
              <div className="relative mb-8">
                <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 bg-[#3c445c]">
                  <Utensils className="text-white w-12 h-12" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">3</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Следуйте плану</h3>
              <p className="text-gray-600 text-lg">
                Получите детальный план питания на 28 дней с рецептами и списками покупок
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button 
              onClick={navigateToQuestionnaire}
              size="lg"
              className="bg-primary text-white hover:bg-opacity-90 transform hover:scale-105 transition-all shadow-lg text-xl px-12 py-6"
            >
              <ChevronRight className="mr-3 w-6 h-6" />
              Начать анкету
            </Button>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold text-primary mb-4 flex items-center">
                <Leaf className="mr-2" />
                Моя Кето Диета
              </div>
              <p className="text-gray-400 mb-4">
                Персональные планы питания для здорового образа жизни и эффективного снижения веса.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Продукт</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-primary transition-colors">Как это работает</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Тарифы</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Отзывы</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Компания</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-primary transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Блог</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Карьера</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Контакты</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-primary transition-colors">Центр помощи</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Условия использования</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Конфиденциальность</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Возврат средств</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Моя Кето Диета. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
