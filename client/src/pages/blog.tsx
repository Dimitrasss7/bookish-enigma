import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Clock, ArrowRight } from "lucide-react";

export default function Blog() {
  const posts = [
    {
      title: "Кето-диета для начинающих: полное руководство",
      excerpt: "Все, что нужно знать о кетогенной диете - от основных принципов до практических советов по началу пути",
      category: "Основы",
      date: "15 июля 2025",
      author: "Анна Смирнова",
      readTime: "8 мин",
      image: "bg-gradient-to-br from-green-400 to-blue-500"
    },
    {
      title: "10 лучших кето-продуктов для быстрого похудения",
      excerpt: "Список самых эффективных продуктов для кетогенной диеты, которые помогут ускорить процесс сжигания жира",
      category: "Питание",
      date: "12 июля 2025",
      author: "Максим Козлов",
      readTime: "5 мин",
      image: "bg-gradient-to-br from-purple-400 to-pink-500"
    },
    {
      title: "Как справиться с кето-гриппом: симптомы и решения",
      excerpt: "Подробное руководство по преодолению начальных трудностей адаптации к кетогенной диете",
      category: "Здоровье",
      date: "10 июля 2025",
      author: "Елена Петрова",
      readTime: "6 мин",
      image: "bg-gradient-to-br from-orange-400 to-red-500"
    },
    {
      title: "Кето-рецепты на каждый день: завтрак, обед, ужин",
      excerpt: "Коллекция простых и вкусных рецептов для разнообразного кето-меню на всю неделю",
      category: "Рецепты",
      date: "8 июля 2025",
      author: "Анна Смирнова",
      readTime: "12 мин",
      image: "bg-gradient-to-br from-teal-400 to-green-500"
    },
    {
      title: "Спорт и кето: как совмещать тренировки с диетой",
      excerpt: "Практические советы по адаптации тренировочного процесса к кетогенному питанию",
      category: "Фитнес",
      date: "5 июля 2025",
      author: "Максим Козлов",
      readTime: "7 мин",
      image: "bg-gradient-to-br from-blue-400 to-purple-500"
    },
    {
      title: "Кето и гормоны: влияние диеты на женское здоровье",
      excerpt: "Как кетогенная диета влияет на гормональный фон женщин и что важно учитывать",
      category: "Здоровье",
      date: "3 июля 2025",
      author: "Елена Петрова",
      readTime: "9 мин",
      image: "bg-gradient-to-br from-pink-400 to-purple-500"
    }
  ];

  const categories = [
    { name: "Все", count: 24 },
    { name: "Основы", count: 8 },
    { name: "Питание", count: 12 },
    { name: "Рецепты", count: 15 },
    { name: "Здоровье", count: 6 },
    { name: "Фитнес", count: 4 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Блог о кето-диете
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Полезные статьи, научные исследования и практические советы для успешного кето-образа жизни
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Категории</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.map((category, index) => (
                    <div key={index} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                      <span className="text-gray-700 dark:text-gray-300">{category.name}</span>
                      <Badge variant="secondary">{category.count}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="grid md:grid-cols-2 gap-8">
              {posts.map((post, index) => (
                <Card key={index} className="group hover:shadow-lg transition-shadow cursor-pointer">
                  <div className={`h-48 ${post.image} rounded-t-lg`}></div>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{post.category}</Badge>
                      <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {post.readTime}
                      </span>
                    </div>
                    <CardTitle className="group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <User className="w-4 h-4 mr-1" />
                        {post.author}
                        <Calendar className="w-4 h-4 ml-3 mr-1" />
                        {post.date}
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <button className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all">
                Загрузить еще статьи
              </button>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <Card className="mt-16 bg-gradient-to-r from-green-500 to-blue-500 text-white">
          <CardContent className="text-center py-16">
            <h2 className="text-3xl font-bold mb-4">Подпишитесь на нашу рассылку</h2>
            <p className="text-xl opacity-90 mb-8">
              Получайте новые статьи, рецепты и советы по кето-диете прямо на почту
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Ваш email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500"
              />
              <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Подписаться
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}