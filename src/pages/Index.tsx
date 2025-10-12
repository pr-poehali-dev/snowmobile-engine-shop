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

          <ProductCard product={product} addToCart={addToCart} />
        </div>
      </section>

      <DeliverySection />

      <WarrantySection />

      <Footer />
    </div>
  );
};

export default Index;
