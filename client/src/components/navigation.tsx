import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: "Главная", href: "/" },
    { name: "Как это работает", href: "/how-it-works" },
    { name: "Тарифы", href: "/pricing" },
    { name: "Отзывы", href: "/reviews" },
    { name: "FAQ", href: "/faq" },
    { name: "Блог", href: "/blog" },
    { name: "О нас", href: "/about" },
    { name: "Контакты", href: "/contact" }
  ];

  const footerLinks = [
    { name: "Условия использования", href: "/terms" },
    { name: "Конфиденциальность", href: "/privacy" },
    { name: "Возврат средств", href: "/refund" },
    { name: "Карьера", href: "/career" }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">МК</span>
            </div>
            <span className="font-bold text-xl text-gray-900 dark:text-white">
              Моя Кето Диета
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <span className={`text-sm font-medium transition-colors hover:text-green-600 dark:hover:text-green-400 ${
                  location === item.href 
                    ? "text-green-600 dark:text-green-400" 
                    : "text-gray-700 dark:text-gray-300"
                }`}>
                  {item.name}
                </span>
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/questionnaire">
              <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                Начать сейчас
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-8">
                {navigation.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <span 
                      className={`block py-2 px-3 rounded-lg text-base font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${
                        location === item.href 
                          ? "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20" 
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </span>
                  </Link>
                ))}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Link href="/questionnaire">
                    <Button 
                      className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                      onClick={() => setIsOpen(false)}
                    >
                      Начать сейчас
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

export function Footer() {
  const footerLinks = [
    { 
      title: "Компания", 
      links: [
        { name: "О нас", href: "/about" },
        { name: "Блог", href: "/blog" },
        { name: "Карьера", href: "/career" },
        { name: "Контакты", href: "/contact" }
      ]
    },
    { 
      title: "Продукт", 
      links: [
        { name: "Как это работает", href: "/how-it-works" },
        { name: "Тарифы", href: "/pricing" },
        { name: "Отзывы", href: "/reviews" },
        { name: "FAQ", href: "/faq" }
      ]
    },
    { 
      title: "Поддержка", 
      links: [
        { name: "Центр помощи", href: "/faq" },
        { name: "Условия использования", href: "/terms" },
        { name: "Конфиденциальность", href: "/privacy" },
        { name: "Возврат средств", href: "/refund" }
      ]
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">МК</span>
              </div>
              <span className="font-bold text-xl">Моя Кето Диета</span>
            </Link>
            <p className="text-gray-400 mb-4">
              Персонализированные кето-программы для достижения ваших целей по здоровью и весу.
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 cursor-pointer">
                <span className="text-sm">TG</span>
              </div>
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 cursor-pointer">
                <span className="text-sm">VK</span>
              </div>
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 cursor-pointer">
                <span className="text-sm">IG</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href}>
                      <span className="text-gray-400 hover:text-white transition-colors">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 Моя Кето Диета. Все права защищены.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/terms">
              <span className="text-gray-400 hover:text-white text-sm transition-colors">
                Условия использования
              </span>
            </Link>
            <Link href="/privacy">
              <span className="text-gray-400 hover:text-white text-sm transition-colors">
                Конфиденциальность
              </span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}