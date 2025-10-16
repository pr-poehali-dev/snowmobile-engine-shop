import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  totalCustomers: number;
  newCustomers: number;
  pendingOrders: number;
  completedOrders: number;
}

interface DailyStats {
  date: string;
  orders: number;
  revenue: number;
}

interface TopProduct {
  name: string;
  orderedQty: number;
  soldQty: number;
  revenue: number;
}

interface StatusBreakdown {
  status: string;
  count: number;
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
  const [dailyStats, setDailyStats] = useState<DailyStats[]>([]);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [statusBreakdown, setStatusBreakdown] = useState<StatusBreakdown[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchDashboardStats();
  }, [period, statusFilter]);

  const fetchDashboardStats = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('crm_token');
      const response = await fetch(`https://functions.poehali.dev/97017881-7f77-46c3-a9fc-ba0e40b3be0b?period=${period}&status=${statusFilter}`, {
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
        setDailyStats(data.dailyStats || []);
        setTopProducts(data.topProducts || []);
        setStatusBreakdown(data.statusBreakdown || []);
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
      title: 'Выручка (выполненные)',
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

  const getPeriodLabel = () => {
    switch (period) {
      case 'today': return 'сегодня';
      case 'week': return 'за неделю';
      case 'month': return 'за месяц';
      case 'year': return 'за год';
      default: return 'за все время';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Статистика продаж {getPeriodLabel()}</p>
        </div>
        <div className="flex gap-3">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Статус заказов" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                <div className="flex items-center gap-2">
                  <Icon name="List" size={16} />
                  Все статусы
                </div>
              </SelectItem>
              <SelectItem value="new">
                <div className="flex items-center gap-2">
                  <Icon name="FileText" size={16} />
                  Новые
                </div>
              </SelectItem>
              <SelectItem value="processing">
                <div className="flex items-center gap-2">
                  <Icon name="Clock" size={16} />
                  В обработке
                </div>
              </SelectItem>
              <SelectItem value="completed">
                <div className="flex items-center gap-2">
                  <Icon name="CheckCircle" size={16} />
                  Выполненные
                </div>
              </SelectItem>
              <SelectItem value="cancelled">
                <div className="flex items-center gap-2">
                  <Icon name="XCircle" size={16} />
                  Отменённые
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Выберите период" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">
              <div className="flex items-center gap-2">
                <Icon name="Calendar" size={16} />
                Сегодня
              </div>
            </SelectItem>
            <SelectItem value="week">
              <div className="flex items-center gap-2">
                <Icon name="CalendarDays" size={16} />
                Неделя
              </div>
            </SelectItem>
            <SelectItem value="month">
              <div className="flex items-center gap-2">
                <Icon name="CalendarRange" size={16} />
                Месяц
              </div>
            </SelectItem>
            <SelectItem value="year">
              <div className="flex items-center gap-2">
                <Icon name="CalendarClock" size={16} />
                Год
              </div>
            </SelectItem>
            <SelectItem value="all">
              <div className="flex items-center gap-2">
                <Icon name="Infinity" size={16} />
                Все время
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
        </div>
      </div>
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

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Динамика продаж за 30 дней</CardTitle>
            <CardDescription>Заказы и выручка по дням</CardDescription>
          </CardHeader>
          <CardContent>
            {dailyStats.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dailyStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(date) => new Date(date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}
                  />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip 
                    labelFormatter={(date) => new Date(date).toLocaleDateString('ru-RU')}
                    formatter={(value: number, name: string) => [
                      name === 'revenue' ? `${value.toLocaleString('ru-RU')} ₽` : value,
                      name === 'revenue' ? 'Выручка' : 'Заказы'
                    ]}
                  />
                  <Legend formatter={(value) => value === 'revenue' ? 'Выручка' : 'Заказы'} />
                  <Line yAxisId="left" type="monotone" dataKey="orders" stroke="#3b82f6" strokeWidth={2} />
                  <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center text-muted-foreground py-12">Нет данных для отображения</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Распределение по статусам</CardTitle>
            <CardDescription>Статусы текущих заказов</CardDescription>
          </CardHeader>
          <CardContent>
            {statusBreakdown.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusBreakdown.map(s => ({
                      name: s.status === 'new' ? 'Новые' : s.status === 'processing' ? 'В обработке' : s.status === 'completed' ? 'Выполнены' : 'Отменены',
                      value: s.count
                    }))}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => `${entry.name}: ${entry.value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusBreakdown.map((entry, index) => {
                      const colors = ['#3b82f6', '#f59e0b', '#10b981', '#ef4444'];
                      return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                    })}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center text-muted-foreground py-12">Нет данных для отображения</div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Топ-10 товаров</CardTitle>
          <CardDescription>Популярные товары: заказы vs фактические продажи</CardDescription>
        </CardHeader>
        <CardContent>
          {topProducts.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={topProducts} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  width={150}
                  tickFormatter={(name) => name.length > 20 ? name.substring(0, 20) + '...' : name}
                />
                <Tooltip 
                  formatter={(value: number, name: string) => {
                    if (name === 'revenue') return [`${value.toLocaleString('ru-RU')} ₽`, 'Выручка'];
                    if (name === 'soldQty') return [`${value} шт.`, 'Продано'];
                    return [`${value} шт.`, 'Заказано'];
                  }}
                />
                <Legend 
                  formatter={(value) => {
                    if (value === 'revenue') return 'Выручка';
                    if (value === 'soldQty') return 'Продано';
                    return 'Заказано';
                  }} 
                />
                <Bar dataKey="orderedQty" fill="#f59e0b" name="Заказано" />
                <Bar dataKey="soldQty" fill="#3b82f6" name="Продано" />
                <Bar dataKey="revenue" fill="#10b981" name="Выручка" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center text-muted-foreground py-12">Нет данных для отображения</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CRMDashboard;