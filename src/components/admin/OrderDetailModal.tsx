import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Order } from './types';

interface OrderDetailModalProps {
  order: Order;
  onClose: () => void;
}

const OrderDetailModal = ({ order, onClose }: OrderDetailModalProps) => {
  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'outline'> = {
      'новый': 'default',
      'в обработке': 'secondary',
      'выполнен': 'outline',
    };

    return (
      <Badge variant={variants[status] || 'default'}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Заказ {order.orderNumber}</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Клиент</p>
              <p className="font-medium">{order.fullName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Телефон</p>
              <p className="font-medium font-mono">{order.phone}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Город</p>
              <p className="font-medium">{order.city}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Статус</p>
              {getStatusBadge(order.status)}
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Товары</p>
            <div className="space-y-2">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between p-2 bg-muted rounded">
                  <span>{item.name}</span>
                  <span className="font-medium">
                    {item.quantity} × {item.price.toLocaleString('ru-RU')} ₽
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <span className="text-lg font-bold">Итого:</span>
            <span className="text-lg font-bold">
              {order.totalPrice.toLocaleString('ru-RU')} ₽
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderDetailModal;
