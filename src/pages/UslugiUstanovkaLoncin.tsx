import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const UslugiUstanovkaLoncin = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Helmet>
        <title>Установка двигателя Loncin на Буран — цена и сроки</title>
        <meta name="description" content="Профессиональная установка Loncin 30 л.с. на Буран. От 15 000 ₽, гарантия 6 месяцев." />
        <link rel="canonical" href="https://dvigatel-lifan-na-snegohod.ru/uslugi/ustanovka-loncin-buran" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs 
          items={[
            { label: 'Главная', link: '/' },
            { label: 'Услуги', link: '/uslugi/ustanovka-dvigatelya-buran' },
            { label: 'Установка Loncin на Буран' }
          ]}
        />

        <h1 className="text-4xl font-bold mb-4">Установка двигателя Loncin на Буран</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Профессиональная установка двигателя Loncin 30 л.с. на снегоход Буран под ключ.
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
                  Работа за 1 день
                </li>
              </ul>
              <Button className="w-full" onClick={() => navigate('/#catalog')}>
                Заказать
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Особенности установки Loncin</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p>
              Двигатель Loncin 30 л.с. устанавливается аналогично Lifan — на адаптерную плиту 
              без сварочных работ. Процесс занимает 4-6 часов, включая обкатку и настройку.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default UslugiUstanovkaLoncin;
