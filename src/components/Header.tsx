import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import OrderForm from '@/components/cart/OrderForm';

interface CartItemData {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface HeaderProps {
  activeSection?: string;
  scrollToSection?: (section: string) => void;
  cartItems?: CartItemData[];
  updateQuantity?: (id: string, quantity: number) => void;
  removeFromCart?: (id: string) => void;
  clearCart?: () => void;
  totalPrice?: number;
  totalItems?: number;
}

const Header = ({
  activeSection = '',
  scrollToSection = () => {},
  cartItems = [],
  updateQuantity = () => {},
  removeFromCart = () => {},
  clearCart = () => {},
  totalPrice = 0,
  totalItems = 0,
}: HeaderProps) => {
  const [showOrderForm, setShowOrderForm] = useState(false);

  const handleOrderSuccess = () => {
    setShowOrderForm(false);
    clearCart();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 md:h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-1.5 md:gap-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-primary flex items-center justify-center rounded">
            <Icon name="Zap" className="text-primary-foreground" size={20} />
          </div>
          <span className="text-base md:text-xl font-bold tracking-tight">МОТОДВИЖ</span>
        </Link>

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
              <Link
                to="/"
                className={`text-left text-base font-medium transition-colors hover:text-primary ${
                  activeSection === 'home' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Главная
              </Link>
              <Link
                to="/catalog"
                className={`text-left text-base font-medium transition-colors hover:text-primary ${
                  activeSection === 'catalog' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Каталог
              </Link>
              <Link
                to="/blog"
                className={`text-left text-base font-medium transition-colors hover:text-primary ${
                  activeSection === 'blog' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Блог
              </Link>
              <Link
                to="/faq"
                className={`text-left text-base font-medium transition-colors hover:text-primary ${
                  activeSection === 'faq' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Вопросы и ответы
              </Link>
              <Separator />
              <a 
                href="https://t.me/lifanburan" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-left text-base font-medium text-[#0088cc] hover:text-[#0077b5] transition-colors"
              >
                <Icon name="Send" size={18} />
                Telegram
              </a>
              <a 
                href="tel:+79000000000"
                className="flex items-center gap-2 text-left text-base font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                <Icon name="Phone" size={18} />
                +7 (900) 000-00-00
              </a>
            </nav>
          </SheetContent>
        </Sheet>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              activeSection === 'home' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Главная
          </Link>
          <Link
            to="/catalog"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              activeSection === 'catalog' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Каталог
          </Link>
          <Link
            to="/blog"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              activeSection === 'blog' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Блог
          </Link>
          <Link
            to="/faq"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              activeSection === 'faq' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Вопросы и ответы
          </Link>
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <a 
            href="https://t.me/lifanburan" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden md:flex"
          >
            <Button variant="ghost" size="sm" className="gap-2">
              <Icon name="Send" size={18} className="text-[#0088cc]" />
              <span className="hidden lg:inline">Telegram</span>
            </Button>
          </a>
          
          <a 
            href="tel:+79000000000"
            className="hidden md:flex"
          >
            <Button variant="ghost" size="sm" className="gap-2">
              <Icon name="Phone" size={18} />
              <span className="hidden lg:inline">+7 (900) 000-00-00</span>
            </Button>
          </a>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Icon name="ShoppingCart" size={20} />
                {totalItems > 0 && (
                  <Badge 
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    variant="default"
                  >
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg">
              <SheetHeader>
                <SheetTitle>Корзина</SheetTitle>
              </SheetHeader>
              <div className="mt-8 flex flex-col h-[calc(100vh-8rem)]">
                {cartItems.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-500">
                    <Icon name="ShoppingCart" size={64} className="text-muted-foreground mb-4 animate-in fade-in slide-in-from-bottom-5 duration-700" />
                    <p className="text-muted-foreground mb-2 animate-in fade-in slide-in-from-bottom-3 duration-500 delay-200">Корзина пуста</p>
                    <p className="text-sm text-muted-foreground animate-in fade-in slide-in-from-bottom-3 duration-500 delay-300">Добавьте товары из каталога</p>
                  </div>
                ) : (
                  <>
                    <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                      {!showOrderForm ? (
                        <>
                          {cartItems.map(item => (
                            <CartItem
                              key={item.id}
                              item={item}
                              updateQuantity={updateQuantity}
                              removeFromCart={removeFromCart}
                            />
                          ))}
                        </>
                      ) : (
                        <OrderForm
                          cartItems={cartItems}
                          totalPrice={totalPrice}
                          totalItems={totalItems}
                          onBack={() => setShowOrderForm(false)}
                          onSuccess={handleOrderSuccess}
                        />
                      )}
                    </div>
                    {!showOrderForm && (
                      <CartSummary
                        totalPrice={totalPrice}
                        onCheckout={() => setShowOrderForm(true)}
                      />
                    )}
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;