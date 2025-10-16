import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface CartSummaryProps {
  totalPrice: number;
  onCheckout: () => void;
}

const CartSummary = ({ totalPrice, onCheckout }: CartSummaryProps) => {
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <Separator />
      <div className="flex justify-between text-lg font-bold">
        <span>Итого:</span>
        <span className="transition-all">{totalPrice.toLocaleString('ru-RU')} ₽</span>
      </div>
      <Button 
        className="w-full transition-all hover:scale-[1.02] active:scale-95" 
        size="lg"
        onClick={onCheckout}
      >
        Оформить заказ
      </Button>
    </div>
  );
};

export default CartSummary;