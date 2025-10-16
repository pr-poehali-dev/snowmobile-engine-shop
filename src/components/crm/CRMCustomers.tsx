import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  city: string;
  total_orders: number;
  total_spent: number;
  status: string;
  created_at: string;
}

const CRMCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(false);
      setCustomers([]);
    } catch (error) {
      console.error('Error fetching customers:', error);
      setLoading(false);
    }
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone?.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Клиенты</CardTitle>
              <CardDescription>Управление базой клиентов</CardDescription>
            </div>
            <Button>
              <Icon name="UserPlus" size={16} className="mr-2" />
              Добавить клиента
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Поиск по имени, email или телефону..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {loading ? (
            <div className="text-center py-8 text-muted-foreground">
              Загрузка клиентов...
            </div>
          ) : filteredCustomers.length === 0 ? (
            <div className="text-center py-12">
              <Icon name="Users" size={48} className="mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg font-medium mb-2">Клиентов пока нет</p>
              <p className="text-muted-foreground mb-4">
                Клиенты появятся здесь после первых заказов
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredCustomers.map((customer) => (
                <Card key={customer.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Icon name="User" className="text-primary" size={24} />
                        </div>
                        <div>
                          <div className="font-medium">{customer.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {customer.email || customer.phone}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <div className="text-sm text-muted-foreground">Заказов</div>
                          <div className="font-bold">{customer.total_orders}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-muted-foreground">Потрачено</div>
                          <div className="font-bold">{customer.total_spent.toLocaleString('ru-RU')} ₽</div>
                        </div>
                        <Badge variant={customer.status === 'active' ? 'default' : 'secondary'}>
                          {customer.status === 'active' ? 'Активен' : 'Неактивен'}
                        </Badge>
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

export default CRMCustomers;
