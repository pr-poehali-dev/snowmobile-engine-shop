import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Icon from '@/components/ui/icon';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface HeaderProps {
  activeSection: string;
  scrollToSection: (section: string) => void;
  cartItems: CartItem[];
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  totalPrice: number;
  totalItems: number;
}

const Header = ({
  activeSection,
  scrollToSection,
  cartItems,
  updateQuantity,
  removeFromCart,
  clearCart,
  totalPrice,
  totalItems,
}: HeaderProps) => {
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [fullName, setFullName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openCityPopover, setOpenCityPopover] = useState(false);

  const russianCities = [
    'Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Казань',
    'Нижний Новгород', 'Челябинск', 'Самара', 'Омск', 'Ростов-на-Дону',
    'Уфа', 'Красноярск', 'Воронеж', 'Пермь', 'Волгоград',
    'Краснодар', 'Саратов', 'Тюмень', 'Тольятти', 'Ижевск',
    'Барнаул', 'Ульяновск', 'Иркутск', 'Хабаровск', 'Ярославль',
    'Владивосток', 'Махачкала', 'Томск', 'Оренбург', 'Кемерово',
    'Новокузнецк', 'Рязань', 'Астрахань', 'Набережные Челны', 'Пенза',
    'Липецк', 'Тула', 'Киров', 'Чебоксары', 'Калининград',
    'Брянск', 'Курск', 'Иваново', 'Магнитогорск', 'Тверь',
    'Ставрополь', 'Нижний Тагил', 'Белгород', 'Архангельск', 'Владимир',
    'Сочи', 'Курган', 'Смоленск', 'Калуга', 'Чита',
    'Орёл', 'Волжский', 'Череповец', 'Владикавказ', 'Мурманск',
    'Сургут', 'Вологда', 'Саранск', 'Тамбов', 'Стерлитамак',
    'Грозный', 'Якутск', 'Кострома', 'Комсомольск-на-Амуре', 'Петрозаводск',
    'Нижневартовск', 'Новороссийск', 'Йошкар-Ола', 'Химки', 'Таганрог'
  ];

  const filteredCities = city
    ? russianCities.filter(c => c.toLowerCase().includes(city.toLowerCase()))
    : russianCities;

  const isFormValid = phone.trim().length > 0 && city.trim().length > 0;

  const handleSubmitOrder = async () => {
    if (!isFormValid || isSubmitting) return;
    
    setIsSubmitting(true);

    try {
      const response = await fetch('https://functions.poehali.dev/14166080-7df3-43be-8985-e12ee3235156', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: fullName || 'Не указано',
          phone,
          city,
          items: cartItems,
          totalPrice,
          totalItems
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert(`✅ Заказ успешно оформлен!\n\nНомер заказа: ${data.orderNumber}\n\nМы свяжемся с вами по телефону: ${phone}`);
        
        setShowOrderForm(false);
        setPhone('');
        setCity('');
        setFullName('');
        clearCart();
      } else {
        alert('❌ Ошибка при отправке заявки. Попробуйте позже или свяжитесь с нами по телефону.');
      }
    } catch (error) {
      console.error('Order submission error:', error);
      alert('❌ Ошибка при отправке заявки. Проверьте интернет-соединение.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 md:h-16 items-center justify-between px-4">
        <div className="flex items-center gap-1.5 md:gap-2">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-primary flex items-center justify-center rounded">
            <Icon name="Zap" className="text-primary-foreground" size={20} />
          </div>
          <span className="text-base md:text-xl font-bold tracking-tight">МОТОДВНИ</span>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="md:hidden">
              <Icon name="Menu" size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64">
            <SheetHeader>
              <SheetTitle>Меню</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-4 mt-8">
              <button
                onClick={() => scrollToSection('home')}
                className={`text-left text-base font-medium transition-colors hover:text-primary ${
                  activeSection === 'home' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Главная
              </button>
              <button
                onClick={() => scrollToSection('catalog')}
                className={`text-left text-base font-medium transition-colors hover:text-primary ${
                  activeSection === 'catalog' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Каталог
              </button>
              <button
                onClick={() => scrollToSection('delivery')}
                className={`text-left text-base font-medium transition-colors hover:text-primary ${
                  activeSection === 'delivery' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Доставка
              </button>
              <button
                onClick={() => scrollToSection('warranty')}
                className={`text-left text-base font-medium transition-colors hover:text-primary ${
                  activeSection === 'warranty' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Гарантия
              </button>
            </nav>
          </SheetContent>
        </Sheet>

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
                  {!showOrderForm ? (
                    <div className="space-y-4">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Итого:</span>
                        <span>{totalPrice.toLocaleString('ru-RU')} ₽</span>
                      </div>
                      <Button 
                        className="w-full" 
                        size="lg"
                        onClick={() => setShowOrderForm(true)}
                      >
                        Оформить заказ
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex justify-between text-lg font-bold mb-4">
                        <span>Итого:</span>
                        <span>{totalPrice.toLocaleString('ru-RU')} ₽</span>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">
                            Телефон <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+7 (___) ___-__-__"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="city">
                            Город получения <span className="text-destructive">*</span>
                          </Label>
                          <Popover open={openCityPopover} onOpenChange={setOpenCityPopover}>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openCityPopover}
                                className="w-full justify-between font-normal"
                              >
                                {city || "Выберите город"}
                                <Icon name="ChevronsUpDown" size={16} className="ml-2 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0" align="start">
                              <Command>
                                <CommandInput 
                                  placeholder="Поиск города..." 
                                  value={city}
                                  onValueChange={setCity}
                                />
                                <CommandList>
                                  <CommandEmpty>Город не найден</CommandEmpty>
                                  <CommandGroup>
                                    {filteredCities.slice(0, 50).map((cityName) => (
                                      <CommandItem
                                        key={cityName}
                                        value={cityName}
                                        onSelect={(currentValue) => {
                                          setCity(currentValue);
                                          setOpenCityPopover(false);
                                        }}
                                      >
                                        <Icon
                                          name="Check"
                                          size={16}
                                          className={city === cityName ? "mr-2 opacity-100" : "mr-2 opacity-0"}
                                        />
                                        {cityName}
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="fullName">ФИО (опционально)</Label>
                          <Input
                            id="fullName"
                            type="text"
                            placeholder="Иванов Иван Иванович"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => setShowOrderForm(false)}
                          disabled={isSubmitting}
                        >
                          Назад
                        </Button>
                        <Button
                          className="flex-1"
                          onClick={handleSubmitOrder}
                          disabled={!isFormValid || isSubmitting}
                        >
                          {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;