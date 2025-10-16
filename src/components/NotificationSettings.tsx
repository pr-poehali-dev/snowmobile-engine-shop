import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface NotificationSettingsProps {
  permission: NotificationPermission;
  isEnabled: boolean;
  onToggle: () => void;
}

const NotificationSettings = ({ permission, isEnabled, onToggle }: NotificationSettingsProps) => {
  return (
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
            onClick={onToggle}
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
  );
};

export default NotificationSettings;
