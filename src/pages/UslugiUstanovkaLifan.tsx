import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const UslugiUstanovkaLifan = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Helmet>
        <title>Установка двигателя Lifan на Буран — цена и сроки</title>
        <meta name="description" content="Профессиональная установка Lifan на Буран. От 15 000 ₽, гарантия 6 месяцев. Выезд по Ижевску и Удмуртии." />
        <link rel="canonical" href="https://dvigatel-lifan-na-snegohod.ru/uslugi/ustanovka-lifan-buran" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs 
          items={[
            { label: 'Главная', link: '/' },
            { label: 'Услуги', link: '/uslugi/ustanovka-dvigatelya-buran' },
            { label: 'Установка Lifan на Буран' }
          ]}
        />

        <h1 className="text-4xl font-bold mb-4">Установка двигателя Lifan на Буран</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Профессиональная установка двигателя Lifan 27-35 л.с. на снегоход Буран под ключ.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>В сервисе</CardTitle>
              <div className="text-3xl font-bold text-primary">от 15 000 ₽</div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start text-sm">
                  <Icon name="Check" className="w-4 h-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                  Время работы: 4-6 часов
                </li>
                <li className="flex items-start text-sm">
                  <Icon name="Check" className="w-4 h-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                  Полный цикл установки
                </li>
                <li className="flex items-start text-sm">
                  <Icon name="Check" className="w-4 h-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                  Первый запуск и обкатка
                </li>
                <li className="flex items-start text-sm">
                  <Icon name="Check" className="w-4 h-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                  Гарантия 6 месяцев
                </li>
              </ul>
              <Button className="w-full" onClick={() => navigate('/#catalog')}>
                Заказать
              </Button>
            </CardContent>
          </Card>

          <Card className="border-primary border-2">
            <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-semibold">
              ⭐ Популярная услуга
            </div>
            <CardHeader>
              <CardTitle>Выездная установка</CardTitle>
              <div className="text-3xl font-bold text-primary">от 18 000 ₽</div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start text-sm">
                  <Icon name="Check" className="w-4 h-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                  Мастер приедет к вам
                </li>
                <li className="flex items-start text-sm">
                  <Icon name="Check" className="w-4 h-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                  По Ижевску и Удмуртии
                </li>
                <li className="flex items-start text-sm">
                  <Icon name="Check" className="w-4 h-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                  Выезд от 2 000 ₽
                </li>
                <li className="flex items-start text-sm">
                  <Icon name="Check" className="w-4 h-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                  Работа за 1 день
                </li>
              </ul>
              <Button className="w-full" onClick={() => navigate('/#catalog')}>
                Заказать
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Что входит в установку?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <ul className="space-y-2">
                <li className="flex items-start text-sm">
                  <Icon name="Check" className="w-4 h-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                  Демонтаж старого двигателя
                </li>
                <li className="flex items-start text-sm">
                  <Icon name="Check" className="w-4 h-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                  Установка адаптерной плиты
                </li>
                <li className="flex items-start text-sm">
                  <Icon name="Check" className="w-4 h-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                  Монтаж двигателя Lifan
                </li>
                <li className="flex items-start text-sm">
                  <Icon name="Check" className="w-4 h-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                  Подключение топливной системы
                </li>
              </ul>
              <ul className="space-y-2">
                <li className="flex items-start text-sm">
                  <Icon name="Check" className="w-4 h-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                  Подключение электрики
                </li>
                <li className="flex items-start text-sm">
                  <Icon name="Check" className="w-4 h-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                  Регулировка троса газа
                </li>
                <li className="flex items-start text-sm">
                  <Icon name="Check" className="w-4 h-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                  Заливка масла
                </li>
                <li className="flex items-start text-sm">
                  <Icon name="Check" className="w-4 h-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                  Первый запуск и обкатка
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button onClick={() => navigate('/buran/dvigatel-lifan')}>
            Выбрать двигатель Lifan
          </Button>
          <Button variant="outline" onClick={() => navigate('/faq')}>
            Частые вопросы
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default UslugiUstanovkaLifan;
