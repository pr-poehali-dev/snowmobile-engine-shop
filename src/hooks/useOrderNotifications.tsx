import { useEffect, useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface Order {
  id: number;
  customer_name: string;
  total: number;
  created_at: string;
}

export const useOrderNotifications = (enabled: boolean = false) => {
  const { toast } = useToast();
  const [lastOrderId, setLastOrderId] = useState<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result === 'granted';
    }
    return Notification.permission === 'granted';
  };

  const showNotification = (order: Order) => {
    const title = '🛒 Новый заказ!';
    const body = `${order.customer_name}\nСумма: ${order.total.toLocaleString('ru-RU')} ₽`;
    
    toast({
      title,
      description: body,
      duration: 10000,
    });

    if (Notification.permission === 'granted') {
      const notification = new Notification(title, {
        body,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        tag: `order-${order.id}`,
        requireInteraction: true,
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
      };

      if ('vibrate' in navigator) {
        navigator.vibrate([200, 100, 200]);
      }

      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSiO1O7QgTIIHWS46+CjVRMNVKro87Z2IwUug9Xx0IY4ChVhtuvnql4VDUyn5PG8eyUIKpHU8dCHOQoWY7zs56tgFg5Nq+Txt3soBSqS1PDRiTsKFmO97OisYhYOUbDn8rl+KwUslNXx0oo9CxZkvO3ps2UYD1Ky6PKygC0FL5bW8tONPwsYZb7u6rRnGRBUtujzuIMyBjGY2PTUkUELGWe+7uq1aRkQVbfp9LmDMwYymdn11ZFCDBdowO/rtmocEVa46vW6hDMGM5na9daSSgwXacHw6rZrHBFXuOr1u4Q0BjOa2vXXk0oMGGrC8Ou4bB0SWLrr9b2GNQc0m9z22JRLDBlrw/HsuWwdElm66/a+hjUHNZzd9tmVTQ0abMTx7LpuHhJauuz3v4c1BzWd3vbZlk4NG23F8e27bx4SW7rs+L+INgg1nt/22pZPDRxuxfLtvXAfE1y77PnBiTYINZ/g99uXTw0dbtDz7r1xHxRcvO36wok2CDWg4PfbmFAOHW/R8++9ch8UXb3t+8OKNwg2oOH43JlRDh5w0vTwvnIfFV6+7vzDizcINqHi+N2aUg4eccX08r50IBVfv+/8xIs4CDai4/ndm1MPI3PG9vO/dSAWYMDw/cWMOAg3ouT43p1VDyR0x/f0wHYgFmHB8f7Gi zl JPiPl+N6eVg8ldMj49MF3IRdiwvH+x4w5CTck5ijeH1cPJnXJ+fXCeCEXY8Px/8iNOQo3Jec53uBYDyh2y/r2w3khGGTD8v/IjjoKOCfnOd7gWRApeM38 98R6IRhlxPP/yY86CjgI6Doe4FkRKXnO/PfFeyIZZsT0AMqQOwo5Ceo6HuFaESttz/33xnwiGWfE9QDLkD sKOQrrOx/hWxEs bNA+N8b84lmoBdgxQDLkTwLOgvtPCDiWxItbjMA+d4c8xloRhdhxgHMkj0MOwvvPSHjW xMtcDAA+t8c8xppRhgdyR oNMk z8OyAARt3y3dyRA=');
      audio.play().catch(() => {});
    }
  };

  const checkForNewOrders = async () => {
    try {
      const token = localStorage.getItem('crm_token');
      if (!token) return;

      const response = await fetch('https://functions.poehali.dev/67bde94f-bf30-4efd-ab58-f1351096f50c?limit=1', {
        headers: {
          'X-Session-Token': token,
        },
      });

      const data = await response.json();

      if (data.success && data.orders && data.orders.length > 0) {
        const latestOrder = data.orders[0];
        
        if (lastOrderId === null) {
          setLastOrderId(latestOrder.id);
        } else if (latestOrder.id > lastOrderId) {
          setLastOrderId(latestOrder.id);
          showNotification(latestOrder);
        }
      }
    } catch (error) {
      console.error('Failed to check for new orders:', error);
    }
  };

  useEffect(() => {
    if (enabled && permission === 'granted') {
      checkForNewOrders();
      
      intervalRef.current = setInterval(() => {
        checkForNewOrders();
      }, 10000);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [enabled, permission, lastOrderId]);

  return {
    permission,
    requestPermission,
    isEnabled: enabled && permission === 'granted',
  };
};
