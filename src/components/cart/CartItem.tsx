import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface CartItemData {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartItemProps {
  item: CartItemData;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
}

const CartItem = ({ item, updateQuantity, removeFromCart }: CartItemProps) => {
  return (
    <Card className="animate-in fade-in slide-in-from-right-5 duration-300">
      <CardContent className="p-3">
        <div className="flex gap-3">
          <img 
            src={item.image} 
            alt={item.name}
            className="w-16 h-16 object-cover rounded transition-transform hover:scale-105"
          />
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm line-clamp-2 mb-2">{item.name}</h4>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7 transition-all hover:scale-110 active:scale-95"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  <Icon name="Minus" size={14} />
                </Button>
                <span className="text-sm font-medium w-6 text-center transition-all">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7 transition-all hover:scale-110 active:scale-95"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <Icon name="Plus" size={14} />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold whitespace-nowrap">
                  {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 transition-all hover:scale-110 hover:bg-destructive/10 active:scale-95"
                  onClick={() => removeFromCart(item.id)}
                >
                  <Icon name="Trash2" size={14} className="text-destructive" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CartItem;