import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface User {
  id: number;
  email: string;
  fullName: string;
  role: string;
}

interface Order {
  id: number;
  orderNumber: string;
  fullName: string;
  phone: string;
  city: string;
  totalPrice: number;
  totalItems: number;
  items: Array<{ name: string; quantity: number; price: number }>;
  createdAt: string;
  status: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('все');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const sessionToken = localStorage.getItem('adminSessionToken');
    const savedUser = localStorage.getItem('adminUser');

    if (!sessionToken || !savedUser) {
      navigate('/admin/login');
      return;
    }

    setUser(JSON.parse(savedUser));
    fetchOrders(sessionToken);
  }, [navigate, statusFilter, searchQuery]);

  const fetchOrders = async (sessionToken: string) => {
    try {
      const params = new URLSearchParams();
      if (statusFilter !== 'все') params.append('status', statusFilter);
      if (searchQuery) params.append('search', searchQuery);

      const response = await fetch(
        `https://functions.poehali.dev/67bde94f-bf30-4efd-ab58-f1351096f50c?${params}`,
        {
          headers: {
            'X-Session-Token': sessionToken,
          },
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setOrders(data.orders);
      } else if (response.status === 401) {
        localStorage.removeItem('adminSessionToken');
        localStorage.removeItem('adminUser');
        navigate('/admin/login');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    const sessionToken = localStorage.getItem('adminSessionToken');

    if (sessionToken) {
      await fetch('https://functions.poehali.dev/9bd0a7b4-935f-4aac-843c-1a3cedebe7e3', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Session-Token': sessionToken,
        },
        body: JSON.stringify({ action: 'logout' }),
      });
    }

    localStorage.removeItem('adminSessionToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  const updateOrderStatus = async (orderId: number, newStatus: string) => {
    const sessionToken = localStorage.getItem('adminSessionToken');

    try {
      const response = await fetch('https://functions.poehali.dev/67bde94f-bf30-4efd-ab58-f1351096f50c', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Session-Token': sessionToken!,
        },
        body: JSON.stringify({
          orderId,
          status: newStatus,
        }),
      });

      if (response.ok) {
        setOrders(
          orders.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        );
      }
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-muted-foreground">Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary flex items-center justify-center rounded">
              <Icon name="Zap" className="text-primary-foreground" size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold">МОТОДВНИ - Админ</h1>
              <p className="text-sm text-muted-foreground">{user?.fullName}</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <Icon name="LogOut" size={16} className="mr-2" />
            Выйти
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList>
            <TabsTrigger value="orders">
              <Icon name="ShoppingBag" size={16} className="mr-2" />
              Заказы
            </TabsTrigger>
            {user?.role === 'admin' && (
              <TabsTrigger value="users" onClick={() => navigate('/admin/users')}>
                <Icon name="Users" size={16} className="mr-2" />
                Сотрудники
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Заказы</CardTitle>
                <CardDescription>
                  Всего заказов: {orders.length}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Поиск по телефону, имени или номеру заказа"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Все статусы" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="все">Все статусы</SelectItem>
                      <SelectItem value="новый">Новый</SelectItem>
                      <SelectItem value="в обработке">В обработке</SelectItem>
                      <SelectItem value="выполнен">Выполнен</SelectItem>
                      <SelectItem value="отменен">Отменен</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Номер</TableHead>
                        <TableHead>Дата</TableHead>
                        <TableHead>Клиент</TableHead>
                        <TableHead>Телефон</TableHead>
                        <TableHead>Город</TableHead>
                        <TableHead>Товары</TableHead>
                        <TableHead>Сумма</TableHead>
                        <TableHead>Статус</TableHead>
                        <TableHead>Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-mono text-sm">
                            {order.orderNumber}
                          </TableCell>
                          <TableCell className="text-sm">
                            {new Date(order.createdAt).toLocaleString('ru-RU', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </TableCell>
                          <TableCell>{order.fullName}</TableCell>
                          <TableCell className="font-mono">{order.phone}</TableCell>
                          <TableCell>{order.city}</TableCell>
                          <TableCell>{order.totalItems} шт.</TableCell>
                          <TableCell className="font-semibold">
                            {order.totalPrice.toLocaleString('ru-RU')} ₽
                          </TableCell>
                          <TableCell>{getStatusBadge(order.status)}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setSelectedOrder(order)}
                              >
                                <Icon name="Eye" size={14} />
                              </Button>
                              {user?.role === 'admin' && (
                                <Select
                                  value={order.status}
                                  onValueChange={(value) =>
                                    updateOrderStatus(order.id, value)
                                  }
                                >
                                  <SelectTrigger className="w-[140px] h-8">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="новый">Новый</SelectItem>
                                    <SelectItem value="в обработке">
                                      В обработке
                                    </SelectItem>
                                    <SelectItem value="выполнен">Выполнен</SelectItem>
                                    <SelectItem value="отменен">Отменен</SelectItem>
                                  </SelectContent>
                                </Select>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {selectedOrder && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Заказ {selectedOrder.orderNumber}</CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedOrder(null)}
                  >
                    <Icon name="X" size={20} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Клиент</p>
                    <p className="font-medium">{selectedOrder.fullName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Телефон</p>
                    <p className="font-medium font-mono">{selectedOrder.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Город</p>
                    <p className="font-medium">{selectedOrder.city}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Статус</p>
                    {getStatusBadge(selectedOrder.status)}
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Товары</p>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item, idx) => (
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
                    {selectedOrder.totalPrice.toLocaleString('ru-RU')} ₽
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
