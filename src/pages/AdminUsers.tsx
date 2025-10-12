import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';

interface User {
  id: number;
  email: string;
  fullName: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

const AdminUsers = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserFullName, setNewUserFullName] = useState('');
  const [newUserRole, setNewUserRole] = useState('employee');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const sessionToken = localStorage.getItem('adminSessionToken');
    const savedUser = localStorage.getItem('adminUser');

    if (!sessionToken || !savedUser) {
      navigate('/admin/login');
      return;
    }

    const user = JSON.parse(savedUser);
    setCurrentUser(user);

    if (user.role !== 'admin') {
      navigate('/admin');
      return;
    }

    fetchUsers(sessionToken);
  }, [navigate]);

  const fetchUsers = async (sessionToken: string) => {
    try {
      const response = await fetch(
        'https://functions.poehali.dev/2ca3ab93-ba3e-4c38-8527-efa5ec2151e6',
        {
          headers: {
            'X-Session-Token': sessionToken,
          },
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setUsers(data.users);
      } else if (response.status === 401 || response.status === 403) {
        localStorage.removeItem('adminSessionToken');
        localStorage.removeItem('adminUser');
        navigate('/admin/login');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const sessionToken = localStorage.getItem('adminSessionToken');

    try {
      const response = await fetch('https://functions.poehali.dev/2ca3ab93-ba3e-4c38-8527-efa5ec2151e6', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Session-Token': sessionToken!,
        },
        body: JSON.stringify({
          email: newUserEmail,
          password: newUserPassword,
          fullName: newUserFullName,
          role: newUserRole,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert('Сотрудник успешно добавлен!');
        setShowAddForm(false);
        setNewUserEmail('');
        setNewUserPassword('');
        setNewUserFullName('');
        setNewUserRole('employee');
        fetchUsers(sessionToken!);
      } else {
        alert(data.error || 'Ошибка при добавлении сотрудника');
      }
    } catch (error) {
      console.error('Error adding user:', error);
      alert('Ошибка соединения с сервером');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleUserActive = async (userId: number, isActive: boolean) => {
    const sessionToken = localStorage.getItem('adminSessionToken');

    try {
      const response = await fetch('https://functions.poehali.dev/2ca3ab93-ba3e-4c38-8527-efa5ec2151e6', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Session-Token': sessionToken!,
        },
        body: JSON.stringify({
          userId,
          isActive,
        }),
      });

      if (response.ok) {
        setUsers(
          users.map((user) =>
            user.id === userId ? { ...user, isActive } : user
          )
        );
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminSessionToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-muted-foreground">Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary flex items-center justify-center rounded">
              <Icon name="Zap" className="text-primary-foreground" size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold">МОТОДВНИ - Админ</h1>
              <p className="text-sm text-muted-foreground">{currentUser?.fullName}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/admin')}>
              <Icon name="ArrowLeft" size={16} className="mr-2" />
              К заказам
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <Icon name="LogOut" size={16} className="mr-2" />
              Выйти
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Управление сотрудниками</CardTitle>
                <CardDescription>
                  Всего сотрудников: {users.length}
                </CardDescription>
              </div>
              <Button onClick={() => setShowAddForm(!showAddForm)}>
                <Icon name="Plus" size={16} className="mr-2" />
                Добавить сотрудника
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {showAddForm && (
              <Card className="bg-muted/50">
                <CardHeader>
                  <CardTitle className="text-lg">Новый сотрудник</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddUser} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="email@example.com"
                          value={newUserEmail}
                          onChange={(e) => setNewUserEmail(e.target.value)}
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Пароль</Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Минимум 6 символов"
                          value={newUserPassword}
                          onChange={(e) => setNewUserPassword(e.target.value)}
                          required
                          disabled={isSubmitting}
                          minLength={6}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="fullName">ФИО</Label>
                        <Input
                          id="fullName"
                          type="text"
                          placeholder="Иванов Иван Иванович"
                          value={newUserFullName}
                          onChange={(e) => setNewUserFullName(e.target.value)}
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role">Роль</Label>
                        <Select value={newUserRole} onValueChange={setNewUserRole}>
                          <SelectTrigger id="role" disabled={isSubmitting}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="employee">Сотрудник</SelectItem>
                            <SelectItem value="admin">Администратор</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowAddForm(false)}
                        disabled={isSubmitting}
                      >
                        Отмена
                      </Button>
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Добавление...' : 'Добавить'}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ФИО</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Роль</TableHead>
                    <TableHead>Дата создания</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.fullName}</TableCell>
                      <TableCell className="font-mono text-sm">{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                          {user.role === 'admin' ? 'Администратор' : 'Сотрудник'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        {new Date(user.createdAt).toLocaleDateString('ru-RU')}
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.isActive ? 'outline' : 'secondary'}>
                          {user.isActive ? 'Активен' : 'Заблокирован'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={user.isActive}
                            onCheckedChange={(checked) =>
                              toggleUserActive(user.id, checked)
                            }
                            disabled={user.id === currentUser?.id}
                          />
                          <span className="text-sm text-muted-foreground">
                            {user.isActive ? 'Активен' : 'Заблокирован'}
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminUsers;
