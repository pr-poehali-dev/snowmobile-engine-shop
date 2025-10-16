import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const CRMAnalytics = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="TrendingUp" size={20} />
              Динамика продаж
            </CardTitle>
            <CardDescription>Рост выручки за последние 30 дней</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center border-2 border-dashed rounded-lg">
              <div className="text-center text-muted-foreground">
                <Icon name="BarChart3" size={48} className="mx-auto mb-4 opacity-50" />
                <p>График продаж</p>
                <p className="text-sm mt-2">Данные обновляются автоматически</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="PieChart" size={20} />
              Распределение по категориям
            </CardTitle>
            <CardDescription>Популярные товары</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center border-2 border-dashed rounded-lg">
              <div className="text-center text-muted-foreground">
                <Icon name="PieChart" size={48} className="mx-auto mb-4 opacity-50" />
                <p>Круговая диаграмма</p>
                <p className="text-sm mt-2">Категории товаров</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Users" size={20} />
            Воронка продаж
          </CardTitle>
          <CardDescription>Конверсия клиентов</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { label: 'Посетители', value: 1000, percent: 100, color: 'bg-blue-500' },
              { label: 'Просмотры товаров', value: 650, percent: 65, color: 'bg-purple-500' },
              { label: 'Добавили в корзину', value: 300, percent: 30, color: 'bg-orange-500' },
              { label: 'Оформили заказ', value: 120, percent: 12, color: 'bg-green-500' },
            ].map((stage, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{stage.label}</span>
                  <span className="text-sm text-muted-foreground">
                    {stage.value} ({stage.percent}%)
                  </span>
                </div>
                <div className="h-8 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${stage.color} transition-all duration-500 flex items-center justify-end pr-4 text-white text-sm font-medium`}
                    style={{ width: `${stage.percent}%` }}
                  >
                    {stage.percent}%
                  </div>
                </div>
              </div>
            ))}
          </div>
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
            <div className="text-3xl font-bold">8 500 ₽</div>
            <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
              <Icon name="TrendingUp" size={16} />
              +12% за месяц
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Конверсия
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12%</div>
            <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
              <Icon name="TrendingUp" size={16} />
              +3% за месяц
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
            <div className="text-3xl font-bold">24%</div>
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
