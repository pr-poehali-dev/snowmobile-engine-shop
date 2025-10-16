import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface Order {
  id: number;
  customer_name: string;
  customer_phone: string;
  products: string;
  total: number;
  status: string;
  payment_status: string;
  created_at: string;
}

const CRMOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/67bde94f-bf30-4efd-ab58-f1351096f50c');
      const data = await response.json();
      
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

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

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer_phone.includes(searchTerm) ||
      order.id.toString().includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Заказы</CardTitle>
          <CardDescription>Управление всеми заказами</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Поиск по номеру, имени или телефону..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Фильтр по статусу" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все статусы</SelectItem>
                <SelectItem value="new">Новые</SelectItem>
                <SelectItem value="processing">В обработке</SelectItem>
                <SelectItem value="completed">Выполнены</SelectItem>
                <SelectItem value="cancelled">Отменены</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {loading ? (
            <div className="text-center py-8 text-muted-foreground">
              Загрузка заказов...
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <Icon name="ShoppingCart" size={48} className="mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg font-medium mb-2">
                {searchTerm || statusFilter !== 'all' ? 'Заказы не найдены' : 'Заказов пока нет'}
              </p>
              <p className="text-muted-foreground">
                {searchTerm || statusFilter !== 'all'
                  ? 'Попробуйте изменить параметры поиска'
                  : 'Новые заказы появятся здесь автоматически'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredOrders.map((order) => (
                <Card key={order.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-sm">#{order.id}</span>
                          {getStatusBadge(order.status || 'new')}
                        </div>
                        <div className="font-medium">{order.customer_name}</div>
                        <div className="text-sm text-muted-foreground">{order.customer_phone}</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {new Date(order.created_at).toLocaleDateString('ru-RU', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground mb-1">Сумма</div>
                          <div className="text-2xl font-bold">{order.total?.toLocaleString('ru-RU') || 0} ₽</div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Icon name="Eye" size={16} className="mr-2" />
                          Подробнее
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CRMOrders;
