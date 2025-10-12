import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Stats } from './types';

interface StatsOverviewProps {
  stats: Stats;
}

const StatsOverview = ({ stats }: StatsOverviewProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Всего заказов</CardTitle>
          <Icon name="ShoppingCart" className="text-muted-foreground" size={16} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.overview.totalOrders}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Общая выручка</CardTitle>
          <Icon name="DollarSign" className="text-muted-foreground" size={16} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.overview.totalRevenue.toLocaleString('ru-RU')} ₽
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Продано товаров</CardTitle>
          <Icon name="Package" className="text-muted-foreground" size={16} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.overview.totalItems} шт.</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Средний чек</CardTitle>
          <Icon name="TrendingUp" className="text-muted-foreground" size={16} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {Math.round(stats.overview.avgOrderValue).toLocaleString('ru-RU')} ₽
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsOverview;
