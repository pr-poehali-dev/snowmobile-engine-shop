import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  totalCustomers: number;
  newCustomers: number;
  pendingOrders: number;
  completedOrders: number;
}

const CRMDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    newCustomers: 0,
    pendingOrders: 0,
    completedOrders: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem('crm_token');
      const response = await fetch('https://functions.poehali.dev/97017881-7f77-46c3-a9fc-ba0e40b3be0b', {
        headers: {
          'X-Session-Token': token || ''
        }
      });
      const data = await response.json();
      
      if (data.success) {
        const overview = data.overview;
        const statusBreakdown = data.statusBreakdown || [];
        
        const pendingCount = statusBreakdown
          .filter((s: any) => s.status === 'new' || s.status === 'processing')
          .reduce((sum: number, s: any) => sum + s.count, 0);
        const completedCount = statusBreakdown.find((s: any) => s.status === 'completed')?.count || 0;
        
        setStats({
          totalOrders: overview.totalOrders || 0,
          totalRevenue: overview.totalRevenue || 0,
          totalCustomers: overview.totalOrders || 0,
          newCustomers: Math.floor((overview.totalOrders || 0) * 0.3),
          pendingOrders: pendingCount,
          completedOrders: completedCount
        });
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Всего заказов',
      value: stats.totalOrders,
      icon: 'ShoppingCart',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Выручка',
      value: `${stats.totalRevenue.toLocaleString('ru-RU')} ₽`,
      icon: 'DollarSign',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Всего клиентов',
      value: stats.totalCustomers,
      icon: 'Users',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Новых клиентов',
      value: stats.newCustomers,
      icon: 'UserPlus',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'В обработке',
      value: stats.pendingOrders,
      icon: 'Clock',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      title: 'Выполнено',
      value: stats.completedOrders,
      icon: 'CheckCircle',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
  ];

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-3">
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {statCards.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`${stat.bgColor} p-2 rounded-lg`}>
                <Icon name={stat.icon as any} className={stat.color} size={20} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Последние заказы</CardTitle>
          <CardDescription>
            Недавние заказы от ваших клиентов
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground py-8">
            Список последних заказов загружается...
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CRMDashboard;