import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const SECRET_KEY = 'create-admin-2024';

const CreateAdmin = () => {
  const [accessKey, setAccessKey] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [email, setEmail] = useState('admin@crm.local');
  const [password, setPassword] = useState('Admin2024!');
  const [fullName, setFullName] = useState('Администратор CRM');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedAuth = sessionStorage.getItem('admin_creator_auth');
    if (savedAuth === SECRET_KEY) {
      setIsAuthorized(true);
    }
  }, []);

  const handleAccessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessKey === SECRET_KEY) {
      setIsAuthorized(true);
      sessionStorage.setItem('admin_creator_auth', SECRET_KEY);
      setError('');
    } else {
      setError('Неверный ключ доступа');
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);
    setLoading(true);

    try {
      const response = await fetch('https://functions.poehali.dev/cd3b1dbe-ac1b-4bb5-a59f-732f0b6eca1a', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, full_name: fullName }),
      });

      const data = await response.json();

      if (data.success) {
        setResult(data);
      } else {
        setError(data.error || 'Ошибка создания администратора');
      }
    } catch (err) {
      setError('Ошибка подключения к серверу');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-4">
              <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
                <Icon name="ShieldAlert" size={24} className="text-destructive" />
              </div>
            </div>
            <CardTitle className="text-2xl text-center">Доступ ограничен</CardTitle>
            <CardDescription className="text-center">
              Введите секретный ключ для создания администратора
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAccessSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="accessKey">Секретный ключ</Label>
                <Input
                  id="accessKey"
                  type="password"
                  placeholder="Введите ключ доступа"
                  value={accessKey}
                  onChange={(e) => setAccessKey(e.target.value)}
                  required
                />
              </div>
              
              {error && (
                <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                  <Icon name="AlertCircle" size={16} />
                  <span>{error}</span>
                </div>
              )}

              <div className="bg-muted/50 p-3 rounded-md text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <Icon name="Info" size={14} className="mt-0.5" />
                  <div>
                    <strong>Ключ доступа:</strong> create-admin-2024<br/>
                    <span className="text-xs">Эта страница только для первичной настройки</span>
                  </div>
                </div>
              </div>
              
              <Button type="submit" className="w-full">
                <Icon name="Unlock" size={16} className="mr-2" />
                Получить доступ
              </Button>

              <Button 
                type="button" 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/crm-login')}
              >
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                Вернуться к входу
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon name="UserPlus" size={24} className="text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Создать администратора</CardTitle>
          <CardDescription className="text-center">
            Создайте нового пользователя с правами администратора
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="text"
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fullName">Полное имя</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Иван Иванов"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            
            {error && (
              <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                <Icon name="AlertCircle" size={16} />
                <span>{error}</span>
              </div>
            )}

            {result && (
              <div className="bg-green-50 border border-green-200 p-4 rounded-md space-y-2">
                <div className="flex items-center gap-2 text-green-800 font-medium">
                  <Icon name="CheckCircle" size={16} />
                  Администратор создан!
                </div>
                <div className="text-sm space-y-1">
                  <div><strong>Email:</strong> {result.credentials?.login}</div>
                  <div><strong>Пароль:</strong> {result.credentials?.password}</div>
                  <div><strong>Роль:</strong> {result.user?.role}</div>
                </div>
                <div className="pt-2">
                  <a href="/crm-login" className="text-sm text-primary hover:underline">
                    Перейти к входу →
                  </a>
                </div>
              </div>
            )}
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                  Создание...
                </>
              ) : (
                <>
                  <Icon name="UserPlus" size={16} className="mr-2" />
                  Создать
                </>
              )}
            </Button>

            <Button 
              type="button" 
              variant="outline" 
              className="w-full"
              onClick={() => {
                sessionStorage.removeItem('admin_creator_auth');
                setIsAuthorized(false);
              }}
            >
              <Icon name="Lock" size={16} className="mr-2" />
              Заблокировать доступ
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateAdmin;
