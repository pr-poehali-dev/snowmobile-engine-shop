import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface CartSummaryProps {
  totalPrice: number;
  onCheckout: () => void;
}

const CartSummary = ({ totalPrice, onCheckout }: CartSummaryProps) => {
  return (
    <div className="space-y-4">
      <Separator />
      <div className="flex justify-between text-lg font-bold">
        <span>Итого:</span>
        <span>{totalPrice.toLocaleString('ru-RU')} ₽</span>
      </div>
      <Button 
        className="w-full" 
        size="lg"
        onClick={onCheckout}
      >
        Оформить заказ
      </Button>
    </div>
  );
};

export default CartSummary;
