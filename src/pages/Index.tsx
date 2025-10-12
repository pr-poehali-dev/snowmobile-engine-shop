import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activeSection, setActiveSection] = useState('home');

  const product = {
    id: 'lifan-2v78f-2a',
    name: 'Lifan 2V78F-2A PRO',
    price: 89900,
    power: '27 л.с.',
    volume: '688 см³',
    image: 'https://cdn.poehali.dev/files/4c1f2bc5-fd6e-4a17-9031-1deacf7cdb07.png',
    specs: {
      basic: [
        { label: 'Тип двигателя', value: '4-тактный, двухцилиндровый, бензиновый' },
        { label: 'Мощность', value: '27 л.с. (21 кВт при 3600 об/мин)' },
        { label: 'Крутящий момент', value: '50 Н·м при 2500 об/мин' },
        { label: 'Рабочий объём', value: '688 см³' },
        { label: 'Диаметр цилиндра', value: '78 мм' },
        { label: 'Ход поршня', value: '72 мм' },
        { label: 'Степень сжатия', value: '8.0:1' },
        { label: 'Система охлаждения', value: 'Воздушная' },
      ],
      electrical: [
        { label: 'Система запуска', value: 'Ручной + электростартер' },
        { label: 'Катушка освещения', value: '20 А / 240 Вт' },
        { label: 'Система зажигания', value: 'Бесконтактное электронное' },
        { label: 'Электропитание', value: 'Аккумулятор 12 В' },
      ],
      physical: [
        { label: 'Вес', value: '60 кг' },
        { label: 'Страна производства', value: 'Китай/Россия' },
        { label: 'Гарантия', value: '14 дней на проверку' },
      ],
    },
    compatibility: ['Буран', 'Тайга', 'Рысь', 'Самодельные снегоходы'],
    complectation: [
      'Двигатель с электростартером',
      'Колена выхлопа для снегохода "Буран"',
      'Вариатор "Сафари"',
      'Крепёжный болт для вариатора',
    ],
  };

  const addToCart = () => {
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
      }]);
    }
  };

  const removeFromCart = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary flex items-center justify-center">
              <Icon name="Zap" className="text-primary-foreground" size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight">МОТОДВНИ</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('home')}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                activeSection === 'home' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Главная
            </button>
            <button
              onClick={() => scrollToSection('catalog')}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                activeSection === 'catalog' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Каталог
            </button>
            <button
              onClick={() => scrollToSection('delivery')}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                activeSection === 'delivery' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Доставка
            </button>
            <button
              onClick={() => scrollToSection('warranty')}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                activeSection === 'warranty' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Гарантия
            </button>
          </nav>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Icon name="ShoppingCart" size={20} />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-primary text-primary-foreground">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg">
              <SheetHeader>
                <SheetTitle>Корзина</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 py-4">
                {cartItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Icon name="ShoppingCart" size={48} className="text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Корзина пуста</p>
                  </div>
                ) : (
                  <>
                    <div className="flex-1 space-y-4">
                      {cartItems.map(item => (
                        <Card key={item.id}>
                          <CardContent className="p-4">
                            <div className="flex gap-4">
                              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                              <div className="flex-1">
                                <h4 className="font-medium">{item.name}</h4>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {item.price.toLocaleString('ru-RU')} ₽
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  >
                                    <Icon name="Minus" size={16} />
                                  </Button>
                                  <span className="w-8 text-center">{item.quantity}</span>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  >
                                    <Icon name="Plus" size={16} />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 ml-auto"
                                    onClick={() => removeFromCart(item.id)}
                                  >
                                    <Icon name="Trash2" size={16} />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    <Separator />
                    <div className="space-y-4">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Итого:</span>
                        <span>{totalPrice.toLocaleString('ru-RU')} ₽</span>
                      </div>
                      <Button className="w-full" size="lg">
                        Оформить заказ
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <section id="home" className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <Badge className="bg-primary text-primary-foreground">Профессиональное оборудование</Badge>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                Двигатели для снегоходов
              </h1>
              <p className="text-xl text-muted-foreground">
                Надёжные моторы Lifan для Бурана, Тайги, Рыси и самодельной техники
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" onClick={() => scrollToSection('catalog')}>
                  <Icon name="Zap" className="mr-2" size={20} />
                  Смотреть каталог
                </Button>
                <Button size="lg" variant="outline" onClick={() => scrollToSection('warranty')}>
                  Гарантия
                </Button>
              </div>
            </div>
            <div className="relative animate-scale-in">
              <div className="absolute inset-0 bg-primary/20 blur-3xl" />
              <img
                src="https://cdn.poehali.dev/files/b372e95b-2fde-4136-be71-7043452fda66.png"
                alt="Lifan Engine"
                className="relative w-full rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Каталог двигателей</h2>
            <p className="text-xl text-muted-foreground">Профессиональное оборудование для мототехники</p>
          </div>

          <Card className="max-w-6xl mx-auto overflow-hidden">
            <div className="grid md:grid-cols-2 gap-6 p-6">
              <div className="space-y-4">
                <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="aspect-square rounded overflow-hidden bg-muted border border-border">
                      <img src={product.image} alt="" className="w-full h-full object-cover opacity-60" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <Badge className="mb-2 bg-primary text-primary-foreground">В наличии</Badge>
                  <h3 className="text-3xl font-bold mb-2">{product.name}</h3>
                  <p className="text-muted-foreground">Профессиональный двигатель для снегоходов</p>
                </div>

                <div className="flex items-baseline gap-4">
                  <span className="text-4xl font-bold text-primary">{product.price.toLocaleString('ru-RU')} ₽</span>
                </div>

                <div className="flex gap-4">
                  <div className="flex-1 bg-muted rounded-lg p-4 text-center">
                    <Icon name="Gauge" className="mx-auto mb-2 text-primary" size={24} />
                    <div className="font-bold">{product.power}</div>
                    <div className="text-sm text-muted-foreground">Мощность</div>
                  </div>
                  <div className="flex-1 bg-muted rounded-lg p-4 text-center">
                    <Icon name="Box" className="mx-auto mb-2 text-primary" size={24} />
                    <div className="font-bold">{product.volume}</div>
                    <div className="text-sm text-muted-foreground">Объём</div>
                  </div>
                </div>

                <Button size="lg" className="w-full" onClick={addToCart}>
                  <Icon name="ShoppingCart" className="mr-2" size={20} />
                  Добавить в корзину
                </Button>

                <Separator />

                <div>
                  <h4 className="font-bold mb-3 flex items-center gap-2">
                    <Icon name="CheckCircle2" className="text-primary" size={20} />
                    Совместимость
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {product.compatibility.map(item => (
                      <Badge key={item} variant="outline">{item}</Badge>
                    ))}
                  </div>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="specs">
                    <AccordionTrigger>Технические характеристики</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div>
                          <h5 className="font-medium mb-2">Основные параметры</h5>
                          <div className="space-y-2 text-sm">
                            {product.specs.basic.map(spec => (
                              <div key={spec.label} className="flex justify-between">
                                <span className="text-muted-foreground">{spec.label}:</span>
                                <span className="font-medium">{spec.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <Separator />
                        <div>
                          <h5 className="font-medium mb-2">Электрическая система</h5>
                          <div className="space-y-2 text-sm">
                            {product.specs.electrical.map(spec => (
                              <div key={spec.label} className="flex justify-between">
                                <span className="text-muted-foreground">{spec.label}:</span>
                                <span className="font-medium">{spec.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <Separator />
                        <div>
                          <h5 className="font-medium mb-2">Физические параметры</h5>
                          <div className="space-y-2 text-sm">
                            {product.specs.physical.map(spec => (
                              <div key={spec.label} className="flex justify-between">
                                <span className="text-muted-foreground">{spec.label}:</span>
                                <span className="font-medium">{spec.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="complectation">
                    <AccordionTrigger>Комплектация</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 text-sm">
                        {product.complectation.map(item => (
                          <li key={item} className="flex gap-2">
                            <Icon name="Check" className="text-primary flex-shrink-0" size={16} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section id="delivery" className="py-20 bg-muted/50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Доставка</h2>
              <p className="text-xl text-muted-foreground">Быстрая и надёжная доставка по всей России</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <Icon name="Package" className="text-primary mb-2" size={32} />
                  <CardTitle>Упаковка</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Профессиональная упаковка с защитой от повреждений при транспортировке
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Icon name="Truck" className="text-primary mb-2" size={32} />
                  <CardTitle>Транспортные компании</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Работаем с СДЭК, Деловые Линии, ПЭК и другими надёжными перевозчиками
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Icon name="Clock" className="text-primary mb-2" size={32} />
                  <CardTitle>Сроки доставки</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    От 3 до 14 дней в зависимости от региона. Отправка в день заказа при наличии
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Стоимость доставки</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">Москва и МО</div>
                    <div className="text-sm text-muted-foreground">Курьерская служба</div>
                  </div>
                  <div className="font-bold">500 ₽</div>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">Регионы России</div>
                    <div className="text-sm text-muted-foreground">Транспортная компания</div>
                  </div>
                  <div className="font-bold">от 1000 ₽</div>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">Самовывоз</div>
                    <div className="text-sm text-muted-foreground">г. Москва, склад</div>
                  </div>
                  <div className="font-bold text-primary">Бесплатно</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="warranty" className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Гарантия</h2>
              <p className="text-xl text-muted-foreground">Мы гарантируем качество нашей продукции</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <Icon name="Shield" className="text-primary mb-2" size={32} />
                  <CardTitle>Гарантия производителя</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    14 дней на проверку работоспособности двигателя
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex gap-2">
                      <Icon name="Check" className="text-primary flex-shrink-0" size={16} />
                      <span>Проверка комплектации</span>
                    </li>
                    <li className="flex gap-2">
                      <Icon name="Check" className="text-primary flex-shrink-0" size={16} />
                      <span>Тестовый запуск</span>
                    </li>
                    <li className="flex gap-2">
                      <Icon name="Check" className="text-primary flex-shrink-0" size={16} />
                      <span>Проверка технического состояния</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Icon name="RefreshCw" className="text-primary mb-2" size={32} />
                  <CardTitle>Возврат и обмен</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Возможность возврата или обмена товара в течение 14 дней
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex gap-2">
                      <Icon name="Check" className="text-primary flex-shrink-0" size={16} />
                      <span>Сохранность товарного вида</span>
                    </li>
                    <li className="flex gap-2">
                      <Icon name="Check" className="text-primary flex-shrink-0" size={16} />
                      <span>Полная комплектация</span>
                    </li>
                    <li className="flex gap-2">
                      <Icon name="Check" className="text-primary flex-shrink-0" size={16} />
                      <span>Документы и упаковка</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Техническая поддержка</CardTitle>
                <CardDescription>Мы всегда на связи для решения ваших вопросов</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <Icon name="Phone" className="text-primary mt-1" size={20} />
                  <div>
                    <div className="font-medium">Телефон</div>
                    <div className="text-muted-foreground">+7 (XXX) XXX-XX-XX</div>
                    <div className="text-sm text-muted-foreground">Пн-Пт: 9:00 - 18:00 МСК</div>
                  </div>
                </div>
                <Separator />
                <div className="flex items-start gap-4">
                  <Icon name="Mail" className="text-primary mt-1" size={20} />
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-muted-foreground">info@motodvni.ru</div>
                    <div className="text-sm text-muted-foreground">Ответим в течение 24 часов</div>
                  </div>
                </div>
                <Separator />
                <div className="flex items-start gap-4">
                  <Icon name="MessageCircle" className="text-primary mt-1" size={20} />
                  <div>
                    <div className="font-medium">Онлайн-консультант</div>
                    <div className="text-muted-foreground">Чат на сайте</div>
                    <div className="text-sm text-muted-foreground">Ответим моментально в рабочее время</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-12 bg-muted/50">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-primary flex items-center justify-center">
                  <Icon name="Zap" className="text-primary-foreground" size={24} />
                </div>
                <span className="text-xl font-bold">МОТОДВНИ</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Профессиональные двигатели для снегоходов и мототехники
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Каталог</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Двигатели Lifan</li>
                <li>Запчасти</li>
                <li>Аксессуары</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Информация</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>О компании</li>
                <li>Доставка и оплата</li>
                <li>Гарантия</li>
                <li>Контакты</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>+7 (XXX) XXX-XX-XX</li>
                <li>info@motodvni.ru</li>
                <li>г. Москва</li>
              </ul>
            </div>
          </div>

          <Separator className="my-8" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2024 МОТОДВНИ. Все права защищены.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-primary transition-colors">Условия использования</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
