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
          { label: 'Мощность', value: '27 л.с. (21 кВт при 3600 об/мин)' },
          { label: 'Крутящий момент', value: '50 Н·м при 2500 об/мин' },
          { label: 'Рабочий объём', value: '688 см³' },
          { label: 'Комплектация', value: 'Расширенная (вариатор Сафари в комплекте)' },
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
        'Колена выхлопа для снегохода Буран',
        'Вариатор Сафари (установлен)',
        'Крепёжный болт для вариатора',
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
      volume: '764 см³',
      image: 'https://cdn.poehali.dev/files/700d9be4-3169-41d9-825e-811c040aa808.png',
      specs: {
        basic: [
          { label: 'Тип двигателя', value: 'Двухцилиндровый с инжекторной системой' },
          { label: 'Мощность', value: '31 л.с.' },
          { label: 'Топливная система', value: 'Инжекторная система подачи топлива' },
          { label: 'Преимущества', value: 'Стабильная работа, экономия топлива, легкий запуск' },
        ],
        electrical: [
          { label: 'Система запуска', value: 'Электростартер с инжектором' },
          { label: 'Датчик давления масла', value: 'Присутствует' },
          { label: 'Электронное зажигание', value: 'Присутствует' },
        ],
        physical: [
          { label: 'Вес', value: '62 кг' },
          { label: 'Страна производства', value: 'Россия, Китай' },
          { label: 'Гарантия', value: '6 месяцев' },
        ],
      },
      compatibility: ['Буран', 'Тайга', 'Рысь', 'Ямаха', 'BRP', 'Arctic Cat'],
      complectation: [
        'Двигатель с инжекторной системой',
        'Вариатор Сафари (установлен)',
        'Масляный охладитель (Oil Cooler)',
        'Электронная система зажигания',
        'Патрубки выхлопа',
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