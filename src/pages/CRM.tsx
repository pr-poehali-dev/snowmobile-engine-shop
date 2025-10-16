import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import CRMDashboard from '@/components/crm/CRMDashboard';
import CRMCustomers from '@/components/crm/CRMCustomers';
import CRMOrders from '@/components/crm/CRMOrders';
import CRMAnalytics from '@/components/crm/CRMAnalytics';
import { useOrderNotifications } from '@/hooks/useOrderNotifications';

const CRM = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState<any>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const navigate = useNavigate();
  const { permission, requestPermission, isEnabled } = useOrderNotifications(notificationsEnabled);

  useEffect(() => {
    const token = localStorage.getItem('crm_token');
    const userData = localStorage.getItem('crm_user');
    
    if (!token || !userData) {
      navigate('/crm-login');
      return;
    }
    
    try {
      setUser(JSON.parse(userData));
      const savedNotifPref = localStorage.getItem('crm_notifications_enabled');
      if (savedNotifPref === 'true') {
        setNotificationsEnabled(true);
      }
    } catch {
      navigate('/crm-login');
    }
  }, [navigate]);

  const handleToggleNotifications = async () => {
    if (!notificationsEnabled && permission !== 'granted') {
      const granted = await requestPermission();
      if (granted) {
        setNotificationsEnabled(true);
        localStorage.setItem('crm_notifications_enabled', 'true');
      }
    } else {
      const newState = !notificationsEnabled;
      setNotificationsEnabled(newState);
      localStorage.setItem('crm_notifications_enabled', String(newState));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('crm_token');
    localStorage.removeItem('crm_user');
    navigate('/crm-login');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Icon name="Loader2" size={32} className="animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 md:p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">CRM Система</h1>
            <p className="text-muted-foreground">
              Управление клиентами, заказами и аналитикой
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant={notificationsEnabled ? "default" : "outline"}
              size="sm"
              onClick={handleToggleNotifications}
              className="relative"
            >
              <Icon name={notificationsEnabled ? "BellRing" : "Bell"} size={16} className="mr-2" />
              {notificationsEnabled ? 'Уведомления ON' : 'Уведомления OFF'}
              {isEnabled && (
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-background animate-pulse" />
              )}
            </Button>
            <div className="text-right">
              <div className="text-sm font-medium">{user.username}</div>
              <div className="text-xs text-muted-foreground capitalize">{user.role}</div>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <Icon name="LogOut" size={16} className="mr-2" />
              Выйти
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Icon name="LayoutDashboard" size={16} />
              <span className="hidden sm:inline">Дашборд</span>
            </TabsTrigger>
            <TabsTrigger value="customers" className="flex items-center gap-2">
              <Icon name="Users" size={16} />
              <span className="hidden sm:inline">Клиенты</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Icon name="ShoppingCart" size={16} />
              <span className="hidden sm:inline">Заказы</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <Icon name="TrendingUp" size={16} />
              <span className="hidden sm:inline">Аналитика</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <div className="space-y-6">
              <CRMDashboard />
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Bell" size={20} />
                    Уведомления о новых заказах
                  </CardTitle>
                  <CardDescription>
                    Получайте мгновенные уведомления в браузере при поступлении новых заказов
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="font-medium">Статус уведомлений</div>
                      <div className="text-sm text-muted-foreground">
                        {permission === 'granted' && isEnabled && 'Уведомления включены и работают'}
                        {permission === 'granted' && !isEnabled && 'Уведомления разрешены, но выключены'}
                        {permission === 'denied' && 'Уведомления заблокированы в браузере'}
                        {permission === 'default' && 'Нажмите кнопку чтобы разрешить уведомления'}
                      </div>
                    </div>
                    <Badge variant={isEnabled ? 'default' : 'secondary'} className="ml-4">
                      {isEnabled ? (
                        <span className="flex items-center gap-1">
                          <span className="h-2 w-2 bg-green-400 rounded-full animate-pulse" />
                          Активно
                        </span>
                      ) : (
                        'Выключено'
                      )}
                    </Badge>
                  </div>

                  <div className="pt-2">
                    <Button
                      onClick={handleToggleNotifications}
                      variant={isEnabled ? 'outline' : 'default'}
                      className="w-full"
                      disabled={permission === 'denied'}
                    >
                      <Icon name={isEnabled ? 'BellOff' : 'BellRing'} size={16} className="mr-2" />
                      {isEnabled ? 'Выключить уведомления' : 'Включить уведомления'}
                    </Button>
                    
                    {permission === 'denied' && (
                      <p className="text-xs text-destructive mt-2 text-center">
                        Уведомления заблокированы. Разрешите их в настройках браузера.
                      </p>
                    )}
                  </div>

                  <div className="bg-muted/50 p-3 rounded-lg text-sm space-y-2">
                    <div className="font-medium flex items-center gap-2">
                      <Icon name="Info" size={14} />
                      Как это работает:
                    </div>
                    <ul className="space-y-1 text-muted-foreground ml-5 list-disc">
                      <li>Проверка новых заказов каждые 10 секунд</li>
                      <li>Звуковой сигнал при новом заказе</li>
                      <li>Всплывающее уведомление в браузере</li>
                      <li>Работает даже когда вкладка неактивна</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="customers">
            <CRMCustomers />
          </TabsContent>

          <TabsContent value="orders">
            <CRMOrders />
          </TabsContent>

          <TabsContent value="analytics">
            <CRMAnalytics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CRM;