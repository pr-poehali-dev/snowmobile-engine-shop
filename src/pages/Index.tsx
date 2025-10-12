import { useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ProductCard from '@/components/ProductCard';
import DeliverySection from '@/components/DeliverySection';
import WarrantySection from '@/components/WarrantySection';
import Footer from '@/components/Footer';

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

  const products = [
    {
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
    },
    {
      id: 'lifan-2v80f-a',
      name: 'Lifan 2V80F-A',
      price: 76990,
      power: '29 л.с.',
      volume: '764 см³',
      image: 'https://cdn.poehali.dev/files/35584b42-c3c3-498e-b470-bc3a63a94a8c.png',
      specs: {
        basic: [
          { label: 'Тип двигателя', value: 'Двухцилиндровый с горизонтальным валом' },
          { label: 'Мощность', value: '29 л.с.' },
          { label: 'Диаметр вала', value: '25 мм' },
          { label: 'Топливная система', value: 'Двухкамерный карбюратор с распределенным впрыском' },
          { label: 'Катушка зажигания', value: '20 А' },
          { label: 'OEM-номер', value: 'mm40156' },
        ],
        electrical: [
          { label: 'Система запуска', value: 'Электростартер и ручной стартер' },
          { label: 'Катушка зажигания', value: 'Усовершенствованная 20А' },
          { label: 'Изоляция', value: 'Силиконовые высоковольтные провода' },
          { label: 'Электропитание', value: 'Подключаемый аккумулятор' },
        ],
        physical: [
          { label: 'Вес', value: '60 кг' },
          { label: 'Материал', value: 'Металл, Пластик' },
          { label: 'Цвет', value: 'Черный' },
          { label: 'Страна производства', value: 'Россия, Китай' },
          { label: 'Гарантия', value: '14 дней на проверку' },
        ],
      },
      compatibility: ['Буран', 'Тайга', 'Рысь', 'Самодельные снегоходы', 'Снегоболотоходы'],
      complectation: [
        'Базовый двигатель с электростартером',
        'Колени для выхлопа на снегоход Буран',
        'Вариатор Сафари',
        'Болт для крепления вариатора',
      ],
    },
    {
      id: 'lifan-24hp',
      name: 'Lifan 24 л.с. (подготовленный)',
      price: 82990,
      power: '24 л.с.',
      volume: '688 см³',
      image: 'https://cdn.poehali.dev/files/4becad3f-ed84-4089-a9b2-22c3af55e347.png',
      specs: {
        basic: [
          { label: 'Тип двигателя', value: 'Бензиновый, двухцилиндровый' },
          { label: 'Мощность', value: '24 л.с. (14,5 кВт при 3600 об/мин)' },
          { label: 'Крутящий момент', value: '42 Н·м при 2500 об/мин' },
          { label: 'Рабочий объём', value: '688 см³' },
          { label: 'Диаметр вала', value: '25 мм' },
          { label: 'Расположение вала', value: 'Горизонтальное' },
          { label: 'Расход топлива', value: '370 г/кВт·ч' },
          { label: 'Объём масла', value: '1,4 л' },
          { label: 'OEM-номер', value: 'wm21588' },
        ],
        electrical: [
          { label: 'Система запуска', value: 'Ручной и электростартер' },
          { label: 'Катушка освещения', value: '20 А' },
          { label: 'Замок зажигания', value: 'Выведен для установки' },
          { label: 'Проводка', value: 'Выведена и подготовлена' },
        ],
        physical: [
          { label: 'Габариты (ДxШxВ)', value: '450 × 455 × 400 мм' },
          { label: 'Вес', value: '59 кг' },
          { label: 'Материал', value: 'Сталь' },
          { label: 'Цвет', value: 'Черный' },
          { label: 'Страна производства', value: 'Россия, Китай' },
          { label: 'Гарантия', value: '6 месяцев' },
        ],
      },
      compatibility: ['Буран', 'Тайга (с доработками)', 'Рысь', 'Ямаха', 'BRP старых годов'],
      complectation: [
        'Двигатель Lifan 24 л.с. (подготовленный)',
        'Вариатор Сафари (установлен)',
        'Патрубки для глушителя Буран',
        'Счетчик моточасов',
        'Болт крепления вариатора',
        'Ручной стартер',
        'Электростартер',
        'Инструкция по установке и эксплуатации',
      ],
    },
  ];

  const addToCart = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cartItems.find(item => item.id === productId);
    
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === productId
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
      <Header
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        totalPrice={totalPrice}
        totalItems={totalItems}
      />

      <HeroSection scrollToSection={scrollToSection} />

      <section id="catalog" className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Каталог двигателей</h2>
            <p className="text-xl text-muted-foreground">Профессиональное оборудование для мототехники</p>
          </div>

          <div className="space-y-12">
            {products.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                addToCart={() => addToCart(product.id)} 
              />
            ))}
          </div>
        </div>
      </section>

      <DeliverySection />

      <WarrantySection />

      <Footer />
    </div>
  );
};

export default Index;