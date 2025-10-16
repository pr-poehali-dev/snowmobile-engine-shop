import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: number;
  order_number: string;
  total_price: number;
  order_items: OrderItem[];
  status: string;
  payment_status: string;
  created_at: string;
}

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  city: string;
  total_orders: number;
  total_spent: number;
  status: string;
}

interface CustomerDetailModalProps {
  customer: Customer | null;
  isOpen: boolean;
  onClose: () => void;
}

const CustomerDetailModal = ({ customer, isOpen, onClose }: CustomerDetailModalProps) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (customer && isOpen) {
      fetchCustomerOrders();
    }
  }, [customer, isOpen]);

  const fetchCustomerOrders = async () => {
    if (!customer) return;
    
    setLoading(true);
    try {
      const token = localStorage.getItem('crm_token');
      const response = await fetch(
        `https://functions.poehali.dev/67bde94f-bf30-4efd-ab58-f1351096f50c?phone=${encodeURIComponent(customer.phone)}`,
        {
          headers: {
            'X-Session-Token': token || ''
          }
        }
      );
      const data = await response.json();
      
      if (data.success) {
        setOrders(data.orders || []);
      }
    } catch (error) {
      console.error('Error fetching customer orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!customer) return null;

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
      new: { label: 'Новый', variant: 'default' },
      processing: { label: 'В обработке', variant: 'secondary' },
      completed: { label: 'Выполнен', variant: 'outline' },
      cancelled: { label: 'Отменен', variant: 'destructive' },
    };
    const config = variants[status] || { label: status, variant: 'outline' };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getPaymentBadge = (status: string) => {
    const variants: Record<string, { label: string; className: string }> = {
      pending: { label: 'Ожидает оплаты', className: 'bg-yellow-100 text-yellow-800' },
      paid: { label: 'Оплачен', className: 'bg-green-100 text-green-800' },
      refunded: { label: 'Возврат', className: 'bg-red-100 text-red-800' },
    };
    const config = variants[status] || { label: status, className: 'bg-gray-100 text-gray-800' };
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="User" size={24} />
            {customer.name}
          </DialogTitle>
          <DialogDescription>
            Полная информация о клиенте и история заказов
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="info">Информация</TabsTrigger>
            <TabsTrigger value="orders">
              История заказов ({customer.total_orders})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Телефон</div>
                      <div className="flex items-center gap-2">
                        <Icon name="Phone" size={16} className="text-muted-foreground" />
                        <span className="font-medium">{customer.phone}</span>
                      </div>
                    </div>
                    {customer.email && (
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Email</div>
                        <div className="flex items-center gap-2">
                          <Icon name="Mail" size={16} className="text-muted-foreground" />
                          <span className="font-medium">{customer.email}</span>
                        </div>
                      </div>
                    )}
                    {customer.city && (
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Город</div>
                        <div className="flex items-center gap-2">
                          <Icon name="MapPin" size={16} className="text-muted-foreground" />
                          <span className="font-medium">{customer.city}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Всего заказов</div>
                      <div className="text-2xl font-bold text-primary">
                        {customer.total_orders}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Общая сумма покупок</div>
                      <div className="text-2xl font-bold text-green-600">
                        {customer.total_spent.toLocaleString('ru-RU')} ₽
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Средний чек</div>
                      <div className="text-xl font-semibold">
                        {Math.round(customer.total_spent / customer.total_orders).toLocaleString('ru-RU')} ₽
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-3">
            {loading ? (
              <div className="text-center py-12 text-muted-foreground">
                <Icon name="Loader2" size={32} className="mx-auto mb-4 animate-spin" />
                Загрузка заказов...
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-12">
                <Icon name="ShoppingCart" size={48} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium mb-2">Заказов пока нет</p>
              </div>
            ) : (
              orders.map((order) => (
                <Card key={order.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-sm">#{order.id}</span>
                          {getStatusBadge(order.status)}
                          {getPaymentBadge(order.payment_status)}
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">
                            {new Date(order.created_at).toLocaleDateString('ru-RU', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {order.order_items && order.order_items.length > 0 ? (
                          order.order_items.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center text-sm py-1 border-b border-border last:border-0">
                              <div>
                                <span className="font-medium">{item.name}</span>
                                <span className="text-muted-foreground ml-2">× {item.quantity}</span>
                              </div>
                              <span className="font-semibold">
                                {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                              </span>
                            </div>
                          ))
                        ) : (
                          <div className="text-sm text-muted-foreground">Нет товаров</div>
                        )}
                      </div>

                      <div className="flex justify-between items-center pt-2 border-t-2 border-border">
                        <span className="font-semibold">Итого:</span>
                        <span className="text-xl font-bold text-primary">
                          {order.total_price.toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerDetailModal;
