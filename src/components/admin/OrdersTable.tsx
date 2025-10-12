import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Order, User } from './types';

interface OrdersTableProps {
  orders: Order[];
  user: User | null;
  searchQuery: string;
  statusFilter: string;
  onSearchChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
  onOrderSelect: (order: Order) => void;
  onStatusUpdate: (orderId: number, status: string) => void;
}

const OrdersTable = ({
  orders,
  user,
  searchQuery,
  statusFilter,
  onSearchChange,
  onStatusFilterChange,
  onOrderSelect,
  onStatusUpdate,
}: OrdersTableProps) => {
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
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={onStatusFilterChange}>
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
                        onClick={() => onOrderSelect(order)}
                      >
                        <Icon name="Eye" size={14} />
                      </Button>
                      {user?.role === 'admin' && (
                        <Select
                          value={order.status}
                          onValueChange={(value) =>
                            onStatusUpdate(order.id, value)
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
  );
};

export default OrdersTable;
