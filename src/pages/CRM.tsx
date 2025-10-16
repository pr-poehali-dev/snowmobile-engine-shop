import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import CRMDashboard from '@/components/crm/CRMDashboard';
import CRMCustomers from '@/components/crm/CRMCustomers';
import CRMOrders from '@/components/crm/CRMOrders';
import CRMAnalytics from '@/components/crm/CRMAnalytics';

const CRM = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 md:p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">CRM Система</h1>
          <p className="text-muted-foreground">
            Управление клиентами, заказами и аналитикой
          </p>
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
            <CRMDashboard />
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
