import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Order, Stats } from '@/components/admin/types';
import StatsOverview from '@/components/admin/StatsOverview';
import StatsCharts from '@/components/admin/StatsCharts';
import OrdersTable from '@/components/admin/OrdersTable';
import OrderDetailModal from '@/components/admin/OrderDetailModal';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('все');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statsPeriod, setStatsPeriod] = useState('all');

  useEffect(() => {
    const sessionToken = localStorage.getItem('adminSessionToken');
    const savedUser = localStorage.getItem('adminUser');

    if (!sessionToken || !savedUser) {
      navigate('/admin/login');
      return;
    }

    setUser(JSON.parse(savedUser));
    fetchStats(sessionToken, statsPeriod);
    fetchOrders(sessionToken);
  }, [navigate, statusFilter, searchQuery, statsPeriod]);

  const fetchStats = async (sessionToken: string, period: string) => {
    try {
      const response = await fetch(
        `https://functions.poehali.dev/97017881-7f77-46c3-a9fc-ba0e40b3be0b?period=${period}`,
        {
          headers: {
            'X-Session-Token': sessionToken,
          },
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setStats({
          overview: data.overview,
          statusBreakdown: data.statusBreakdown,
          topCities: data.topCities,
          topProducts: data.topProducts,
          dailyStats: data.dailyStats,
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

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
        fetchStats(sessionToken!, statsPeriod);
      }
    } catch (error) {
      console.error('Error updating order:', error);
    }
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
        <Tabs defaultValue="stats" className="space-y-6">
          <TabsList>
            <TabsTrigger value="stats">
              <Icon name="BarChart3" size={16} className="mr-2" />
              Статистика
            </TabsTrigger>
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

          <TabsContent value="stats" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Аналитика продаж</h2>
              <Select value={statsPeriod} onValueChange={setStatsPeriod}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Сегодня</SelectItem>
                  <SelectItem value="week">Неделя</SelectItem>
                  <SelectItem value="month">Месяц</SelectItem>
                  <SelectItem value="year">Год</SelectItem>
                  <SelectItem value="all">Все время</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {stats && (
              <>
                <StatsOverview stats={stats} />
                <StatsCharts stats={stats} />
              </>
            )}
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <OrdersTable
              orders={orders}
              user={user}
              searchQuery={searchQuery}
              statusFilter={statusFilter}
              onSearchChange={setSearchQuery}
              onStatusFilterChange={setStatusFilter}
              onOrderSelect={setSelectedOrder}
              onStatusUpdate={updateOrderStatus}
            />
          </TabsContent>
        </Tabs>

        {selectedOrder && (
          <OrderDetailModal
            order={selectedOrder}
            onClose={() => setSelectedOrder(null)}
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
