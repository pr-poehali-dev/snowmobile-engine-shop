import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Order {
  id: number;
  full_name: string;
  phone: string;
  city: string;
  items: string;
  total_price: number;
  status: string;
  created_at: string;
}

const CRMAnalytics = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('crm_token');
      const response = await fetch('https://functions.poehali.dev/2a93d0c2-77a1-48f5-afda-3bc42abc2df7', {
        headers: {
          'X-Session-Token': token || ''
        }
      });
      const data = await response.json();
      
      if (data.success) {
        setOrders(data.orders || []);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const salesByDay = () => {
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const dayOrders = orders.filter(order => 
        order.created_at.split('T')[0] === dateStr
      );
      
      const total = dayOrders.reduce((sum, order) => sum + order.total_price, 0);
      
      last7Days.push({
        date: date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }),
        sales: total,
        orders: dayOrders.length
      });
    }
    return last7Days;
  };

  const productsByCategory = () => {
    const categories: { [key: string]: { count: number; total: number } } = {};
    
    orders.forEach(order => {
      try {
        const items = JSON.parse(order.items);
        items.forEach((item: any) => {
          const category = item.category || 'Без категории';
          if (!categories[category]) {
            categories[category] = { count: 0, total: 0 };
          }
          categories[category].count += item.quantity;
          categories[category].total += item.price * item.quantity;
        });
      } catch (e) {
        console.error('Error parsing items:', e);
      }
    });

    return Object.entries(categories).map(([name, data]) => ({
      name,
      value: data.total,
      count: data.count
    }));
  };

  const getMetrics = () => {
    const totalRevenue = orders.reduce((sum, order) => sum + order.total_price, 0);
    const avgCheck = orders.length > 0 ? totalRevenue / orders.length : 0;
    
    const customers = new Map();
    orders.forEach(order => {
      const key = `${order.phone}-${order.full_name}`;
      customers.set(key, (customers.get(key) || 0) + 1);
    });
    
    const repeatCustomers = Array.from(customers.values()).filter(count => count > 1).length;
    const repeatRate = customers.size > 0 ? (repeatCustomers / customers.size) * 100 : 0;

    return {
      avgCheck: Math.round(avgCheck),
      totalOrders: orders.length,
      repeatRate: Math.round(repeatRate)
    };
  };

  const COLORS = ['#3b82f6', '#8b5cf6', '#f97316', '#10b981', '#ef4444', '#f59e0b'];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Загрузка аналитики...</div>
      </div>
    );
  }

  const salesData = salesByDay();
  const categoryData = productsByCategory();
  const metrics = getMetrics();

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="TrendingUp" size={20} />
              Динамика продаж
            </CardTitle>
            <CardDescription>Продажи за последние 7 дней</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  formatter={(value: number) => `${value.toLocaleString('ru-RU')} ₽`}
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }}
                />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} name="Выручка" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="PieChart" size={20} />
              Распределение по категориям
            </CardTitle>
            <CardDescription>Продажи по категориям товаров</CardDescription>
          </CardHeader>
          <CardContent>
            {categoryData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `${value.toLocaleString('ru-RU')} ₽`} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                Нет данных по категориям
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="BarChart3" size={20} />
            Количество заказов
          </CardTitle>
          <CardDescription>Динамика заказов за неделю</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }}
              />
              <Bar dataKey="orders" fill="#8b5cf6" name="Заказы" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Средний чек
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{metrics.avgCheck.toLocaleString('ru-RU')} ₽</div>
            <p className="text-sm text-muted-foreground mt-2">
              из {metrics.totalOrders} заказов
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Всего заказов
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{metrics.totalOrders}</div>
            <p className="text-sm text-muted-foreground mt-2">
              за всё время
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Повторные покупки
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{metrics.repeatRate}%</div>
            <p className="text-sm text-muted-foreground mt-2">
              клиентов вернулись
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CRMAnalytics;
