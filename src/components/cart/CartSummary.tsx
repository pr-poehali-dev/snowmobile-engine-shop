import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface CartSummaryProps {
  totalPrice: number;
  onCheckout: () => void;
  onClearCart: () => void;
}

const CartSummary = ({ totalPrice, onCheckout, onClearCart }: CartSummaryProps) => {
  const handleClearCart = () => {
    if (confirm('Очистить корзину? Все товары будут удалены.')) {
      onClearCart();
    }
  };

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <Separator />
      <div className="flex justify-between text-lg font-bold">
        <span>Итого:</span>
        <span className="transition-all">{totalPrice.toLocaleString('ru-RU')} ₽</span>
      </div>
      <div className="flex gap-2">
        <Button 
          variant="outline"
          size="lg"
          onClick={handleClearCart}
          className="transition-all hover:scale-[1.02] active:scale-95"
        >
          <Icon name="Trash2" size={18} />
        </Button>
        <Button 
          className="flex-1 transition-all hover:scale-[1.02] active:scale-95" 
          size="lg"
          onClick={onCheckout}
        >
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};

export default CartSummary;