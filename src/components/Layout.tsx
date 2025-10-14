import { ReactNode, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AIAssistant from '@/components/AIAssistant';

interface LayoutProps {
  children: ReactNode;
  activeSection?: string;
  scrollToSection?: (section: string) => void;
  cartItems?: any[];
  updateQuantity?: (id: string, quantity: number) => void;
  removeFromCart?: (id: string) => void;
  clearCart?: () => void;
  totalPrice?: number;
  totalItems?: number;
}

const Layout = ({
  children,
  activeSection,
  scrollToSection,
  cartItems,
  updateQuantity,
  removeFromCart,
  clearCart,
  totalPrice,
  totalItems,
}: LayoutProps) => {
  const [isAIOpen, setIsAIOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        totalPrice={totalPrice}
        totalItems={totalItems}
      />
      
      <main className="flex-1">
        {children}
      </main>

      <Footer />
      <AIAssistant isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />
    </div>
  );
};

export default Layout;
