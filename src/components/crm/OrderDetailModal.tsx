import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Order {
  id: number;
  customer_name: string;
  customer_phone: string;
  customer_city?: string;
  customer_address?: string;
  products: string;
  total: number;
  status: string;
  payment_status: string;
  shipping_status?: string;
  notes?: string;
  created_at: string;
}

interface OrderDetailModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

const OrderDetailModal = ({ order, isOpen, onClose, onUpdate }: OrderDetailModalProps) => {
  const { toast } = useToast();
  const [orderStatus, setOrderStatus] = useState(order?.status || 'new');
  const [paymentStatus, setPaymentStatus] = useState(order?.payment_status || 'pending');
  const [shippingStatus, setShippingStatus] = useState(order?.shipping_status || 'pending');
  const [notes, setNotes] = useState(order?.notes || '');
  const [saving, setSaving] = useState(false);

  if (!order) return null;

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch('https://functions.poehali.dev/67bde94f-bf30-4efd-ab58-f1351096f50c', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update_order',
          order_id: order.id,
          status: orderStatus,
          payment_status: paymentStatus,
          shipping_status: shippingStatus,
          notes: notes,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: 'Заказ обновлён',
          description: `Заказ #${order.id} успешно обновлён`,
        });
        onUpdate();
        onClose();
      } else {
        throw new Error(data.error || 'Ошибка обновления');
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось обновить заказ',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
      new: { label: 'Новый', variant: 'default' },
      processing: { label: 'В обработке', variant: 'secondary' },
      completed: { label: 'Выполнен', variant: 'outline' },
      cancelled: { label: 'Отменен', variant: 'destructive' },
    };
    const config = variants[status] || { label: status, variant: 'outline' };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Заказ #{order.id}
            {getStatusBadge(orderStatus)}
          </DialogTitle>
          <DialogDescription>
            {new Date(order.created_at).toLocaleDateString('ru-RU', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Customer Info */}
          <div className="space-y-2">
            <h3 className="font-semibold flex items-center gap-2">
              <Icon name="User" size={18} />
              Информация о клиенте
            </h3>
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <div><strong>Имя:</strong> {order.customer_name}</div>
              <div><strong>Телефон:</strong> {order.customer_phone}</div>
              {order.customer_city && <div><strong>Город:</strong> {order.customer_city}</div>}
              {order.customer_address && <div><strong>Адрес:</strong> {order.customer_address}</div>}
            </div>
          </div>

          {/* Order Items */}
          <div className="space-y-2">
            <h3 className="font-semibold flex items-center gap-2">
              <Icon name="ShoppingCart" size={18} />
              Состав заказа
            </h3>
            <div className="bg-muted p-4 rounded-lg">
              <div className="whitespace-pre-wrap">{order.products}</div>
              <div className="mt-4 pt-4 border-t border-border">
                <div className="text-xl font-bold">
                  Итого: {order.total.toLocaleString('ru-RU')} ₽
                </div>
              </div>
            </div>
          </div>

          {/* Status Management */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Icon name="Settings" size={18} />
              Управление статусами
            </h3>

            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="order-status">Статус заказа</Label>
                <Select value={orderStatus} onValueChange={setOrderStatus}>
                  <SelectTrigger id="order-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">Новый</SelectItem>
                    <SelectItem value="processing">В обработке</SelectItem>
                    <SelectItem value="completed">Выполнен</SelectItem>
                    <SelectItem value="cancelled">Отменен</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="payment-status">Статус оплаты</Label>
                <Select value={paymentStatus} onValueChange={setPaymentStatus}>
                  <SelectTrigger id="payment-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Ожидает оплаты</SelectItem>
                    <SelectItem value="paid">Оплачен</SelectItem>
                    <SelectItem value="refunded">Возврат</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="shipping-status">Статус доставки</Label>
                <Select value={shippingStatus} onValueChange={setShippingStatus}>
                  <SelectTrigger id="shipping-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Ожидает отправки</SelectItem>
                    <SelectItem value="shipped">Отправлен</SelectItem>
                    <SelectItem value="delivered">Доставлен</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Заметки</Label>
                <Textarea
                  id="notes"
                  placeholder="Добавьте заметки о заказе..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 justify-end pt-4 border-t">
            <Button variant="outline" onClick={onClose} disabled={saving}>
              Отмена
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? 'Сохранение...' : 'Сохранить изменения'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailModal;
