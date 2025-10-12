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
      id: 'lifan-27hp-basic',
      name: 'Двигатель Lifan 27 л.с.',
      price: 69990,
      power: '27 л.с.',
      volume: '688 см³',
      image: 'https://cdn.poehali.dev/files/4c1f2bc5-fd6e-4a17-9031-1deacf7cdb07.png',
      specs: {
        basic: [
          { label: 'Тип двигателя', value: '4-тактный, двухцилиндровый, бензиновый' },
          { label: 'Мощность', value: '27 л.с. (21 кВт при 3600 об/мин)' },
          { label: 'Крутящий момент', value: '50 Н·м при 2500 об/мин' },
          { label: 'Рабочий объём', value: '688 см³' },
          { label: 'Комплектация', value: 'Базовая' },
        ],
        electrical: [
          { label: 'Система запуска', value: 'Ручной + электростартер' },
          { label: 'Катушка освещения', value: '20 А / 240 Вт' },
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
        'Базовая комплектация',
      ],
    },
    {
      id: 'lifan-29hp-basic',
      name: 'Двигатель Lifan 29 л.с.',
      price: 76990,
      power: '29 л.с.',
      volume: '764 см³',
      image: 'https://cdn.poehali.dev/files/35584b42-c3c3-498e-b470-bc3a63a94a8c.png',
      specs: {
        basic: [
          { label: 'Тип двигателя', value: 'Двухцилиндровый с горизонтальным валом' },
          { label: 'Мощность', value: '29 л.с.' },
          { label: 'Диаметр вала', value: '25 мм' },
          { label: 'Комплектация', value: 'Базовая' },
        ],
        electrical: [
          { label: 'Система запуска', value: 'Электростартер и ручной стартер' },
          { label: 'Катушка зажигания', value: '20 А' },
        ],
        physical: [
          { label: 'Вес', value: '60 кг' },
          { label: 'Страна производства', value: 'Россия, Китай' },
          { label: 'Гарантия', value: '14 дней на проверку' },
        ],
      },
      compatibility: ['Буран', 'Тайга', 'Рысь', 'Самодельные снегоходы'],
      complectation: [
        'Базовый двигатель с электростартером',
      ],
    },
    {
      id: 'lifan-24hp',
      name: 'Двигатель Lifan 24 л.с.',
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
        ],
        electrical: [
          { label: 'Система запуска', value: 'Ручной и электростартер' },
          { label: 'Катушка освещения', value: '20 А' },
        ],
        physical: [
          { label: 'Вес', value: '59 кг' },
          { label: 'Страна производства', value: 'Россия, Китай' },
          { label: 'Гарантия', value: '6 месяцев' },
        ],
      },
      compatibility: ['Буран', 'Тайга', 'Рысь', 'Ямаха', 'BRP'],
      complectation: [
        'Двигатель с электростартером',
        'Патрубки для глушителя',
      ],
    },
    {
      id: 'lifan-27hp-pro',
      name: 'Двигатель Lifan 27 л.с. PRO',
      price: 89990,
      power: '27 л.с.',
      volume: '688 см³',
      image: 'https://cdn.poehali.dev/files/4c1f2bc5-fd6e-4a17-9031-1deacf7cdb07.png',
      specs: {
        basic: [
          { label: 'Тип двигателя', value: '4-тактный, двухцилиндровый, бензиновый' },
          { label: 'Мощность', value: '27 л.с. (17 кВт при 3600 об/мин)' },
          { label: 'Крутящий момент', value: '50 Н·м при 2500 об/мин' },
          { label: 'Диаметр вала', value: '25 мм' },
          { label: 'Расположение вала', value: 'Горизонтальное' },
          { label: 'Объём масла', value: '1,4 л' },
          { label: 'Расход топлива', value: '370 г/кВт·ч' },
          { label: 'OEM-номер', value: 'wm40666' },
        ],
        electrical: [
          { label: 'Система запуска', value: 'Ручной и электростартер' },
          { label: 'Катушка освещения', value: '20 А' },
          { label: 'Замок зажигания', value: 'Выведен для удобной установки' },
          { label: 'Проводка', value: 'Выведена и подготовлена' },
        ],
        physical: [
          { label: 'Габариты (ДxШxВ)', value: '450 × 455 × 400 мм' },
          { label: 'Вес', value: '59 кг' },
          { label: 'Страна производства', value: 'Россия, Китай' },
          { label: 'Состояние', value: 'Подготовленный (запущен, настроен)' },
          { label: 'Гарантия', value: '14 дней на проверку' },
        ],
      },
      compatibility: ['Буран', 'Тайга (с доработками)', 'Рысь', 'Ямаха', 'BRP', 'Polaris старых годов'],
      complectation: [
        'Двигатель Lifan 27 л.с. (подготовленный)',
        'Вариатор Сафари (установлен)',
        'Патрубки для глушителя Буран',
        'Катушка на 20А',
        'Счетчик моточасов',
        'Болт крепления вариатора',
        'Ручной стартер',
        'Электростартер',
        'Инструкция по установке и эксплуатации',
      ],
    },
    {
      id: 'lifan-29hp-pro',
      name: 'Двигатель Lifan 29 л.с. PRO',
      price: 92990,
      power: '29 л.с.',
      volume: '764 см³',
      image: 'https://cdn.poehali.dev/files/35584b42-c3c3-498e-b470-bc3a63a94a8c.png',
      specs: {
        basic: [
          { label: 'Тип двигателя', value: 'Двухцилиндровый с горизонтальным валом' },
          { label: 'Мощность', value: '29 л.с.' },
          { label: 'Диаметр вала', value: '25 мм' },
          { label: 'Комплектация', value: 'Расширенная (вариатор Сафари в комплекте)' },
        ],
        electrical: [
          { label: 'Система запуска', value: 'Электростартер и ручной стартер' },
          { label: 'Катушка зажигания', value: 'Усовершенствованная 20А' },
        ],
        physical: [
          { label: 'Вес', value: '60 кг' },
          { label: 'Страна производства', value: 'Россия, Китай' },
          { label: 'Гарантия', value: '14 дней на проверку' },
        ],
      },
      compatibility: ['Буран', 'Тайга', 'Рысь', 'Самодельные снегоходы'],
      complectation: [
        'Двигатель с электростартером',
        'Колена выхлопа для снегохода Буран',
        'Вариатор Сафари (установлен)',
        'Болт для крепления вариатора',
      ],
    },
    {
      id: 'lifan-29hp-arctica',
      name: 'Двигатель Lifan 29 л.с. Arctica',
      price: 94990,
      power: '29 л.с.',
      volume: '764 см³',
      image: 'https://cdn.poehali.dev/files/35584b42-c3c3-498e-b470-bc3a63a94a8c.png',
      specs: {
        basic: [
          { label: 'Тип двигателя', value: 'Двухцилиндровый с горизонтальным валом' },
          { label: 'Мощность', value: '29 л.с.' },
          { label: 'Версия', value: 'Спецверсия Arctica для экстремальных условий' },
        ],
        electrical: [
          { label: 'Система запуска', value: 'Электростартер и ручной стартер' },
          { label: 'Защита', value: 'Усиленная для низких температур' },
        ],
        physical: [
          { label: 'Вес', value: '60 кг' },
          { label: 'Страна производства', value: 'Россия, Китай' },
          { label: 'Гарантия', value: '14 дней на проверку' },
        ],
      },
      compatibility: ['Буран', 'Тайга', 'Рысь', 'Ямаха', 'BRP'],
      complectation: [
        'Двигатель Arctica с электростартером',
        'Усиленная защита от мороза',
        'Вариатор Сафари (установлен)',
        'Колена выхлопа',
      ],
    },
    {
      id: 'lifan-31hp-injector',
      name: 'Двигатель Lifan 31 л.с. (инжектор)',
      price: 99990,
      power: '31 л.с.',
      volume: '744 см³',
      image: 'https://cdn.poehali.dev/files/892c1c7d-757e-46c2-881a-804abc3875e9.png',
      specs: {
        basic: [
          { label: 'Тип двигателя', value: '4-тактный, двухцилиндровый, бензиновый ИНЖЕКТОР' },
          { label: 'Мощность', value: '31 л.с. (22,8 кВт)' },
          { label: 'Объем двигателя', value: '744 см³' },
          { label: 'Топливная система', value: 'Инжекторная с электронным газом (Е-ГАЗ)' },
          { label: 'Особенность', value: 'Требуется штатный АКБ на снегоходе' },
          { label: 'OEM-номер', value: 'wm69025' },
        ],
        electrical: [
          { label: 'Система запуска', value: 'Ручной и электростартер' },
          { label: 'Катушка освещения', value: '240 Вт' },
          { label: 'Проводка', value: 'Переделана под снегоход' },
          { label: 'Электронный газ', value: 'Е-ГАЗ (электронное управление)' },
        ],
        physical: [
          { label: 'Вес', value: '60 кг' },
          { label: 'Материал', value: 'Сталь' },
          { label: 'Цвет', value: 'Черный' },
          { label: 'Страна производства', value: 'Китай, Россия' },
          { label: 'Гарантия', value: '2 года' },
        ],
      },
      compatibility: ['Буран', 'Тайга (с доработками)', 'Рысь', 'Ямаха', 'BRP старых годов'],
      complectation: [
        'Двигатель Lifan 31 л.с. инжектор в сборе',
        'Вариатор Сафари (установлен)',
        'Патрубки (колени) для глушителя Буран',
        'Катушка на 20А',
        'Счетчик моточасов',
        'Болт крепления вариатора',
        'Ручной стартер',
        'Электростартер',
        'Проводка, адаптированная под снегоход',
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

      <section id="catalog" className="py-12 md:py-20" itemScope itemType="https://schema.org/ItemList">
        <div className="container px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4" itemProp="name">Каталог двигателей Lifan для снегоходов</h2>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground" itemProp="description">Мощные двигатели от 27 до 31 л.с. для Буран, Тайга, Рысь, Ямаха, BRP. С инжектором и электростартером.</p>
          </div>

          <div className="space-y-8 md:space-y-12">
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