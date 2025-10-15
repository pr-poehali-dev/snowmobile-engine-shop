import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const BuranLoncin = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Helmet>
        <title>Двигатель Loncin для Буран — 30 л.с., доступная цена</title>
        <meta name="description" content="Двигатель Loncin 30 л.с. для снегохода Буран. Надёжная китайская сборка, электростартер, адаптерная плита. Выгодная цена." />
        <link rel="canonical" href="https://dvigatel-lifan-na-snegohod.ru/buran/dvigatel-loncin" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs 
          items={[
            { label: 'Главная', link: '/' },
            { label: 'Буран', link: '/buran/dvigatel' },
            { label: 'Loncin' }
          ]}
        />

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Двигатель Loncin для Буран</h1>
          <p className="text-xl text-muted-foreground">
            Надёжный 4-тактный двигатель Loncin 30 л.с. для снегохода Буран. 
            Доступная цена при хорошем качестве.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Loncin 30 л.с. (724 см³)</CardTitle>
            <div className="text-3xl font-bold text-primary">74 990 ₽</div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Характеристики:</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Мощность:</span>
                    <span className="font-semibold">30 л.с. (23 кВт)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Объём:</span>
                    <span className="font-semibold">724 см³</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Крутящий момент:</span>
                    <span className="font-semibold">54 Н·м</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Вес:</span>
                    <span className="font-semibold">61 кг</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Стартер:</span>
                    <span className="font-semibold">Электростартер</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Генератор:</span>
                    <span className="font-semibold">18А</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Комплектация:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start text-sm">
                    <Icon name="Check" className="w-4 h-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                    Адаптерная плита для Буран
                  </li>
                  <li className="flex items-start text-sm">
                    <Icon name="Check" className="w-4 h-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                    Крепёжный набор
                  </li>
                  <li className="flex items-start text-sm">
                    <Icon name="Check" className="w-4 h-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                    Запуск до -35°C
                  </li>
                  <li className="flex items-start text-sm">
                    <Icon name="Check" className="w-4 h-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                    Инструкция на русском
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-6">
              <Button size="lg" onClick={() => navigate('/#catalog')}>
                Купить за 74 990 ₽
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Преимущества Loncin для Буран</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <h3>Доступная цена</h3>
            <p>
              Loncin стоит на 5 000 ₽ дешевле Lifan при сопоставимых характеристиках. 
              Отличный выбор для тех, кто ищет баланс цены и качества.
            </p>

            <h3>Надёжная конструкция</h3>
            <p>
              4-тактный двухцилиндровый двигатель с ресурсом 3500+ моточасов. Проверенная 
              временем конструкция, простое обслуживание.
            </p>

            <h3>Совместимость с Буран</h3>
            <p>
              В комплекте идёт адаптерная плита для установки на снегоход Буран. 
              Установка без сварочных работ за 4-6 часов.
            </p>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button onClick={() => navigate('/uslugi/ustanovka-loncin-buran')}>
            Заказать с установкой
          </Button>
          <Button variant="outline" onClick={() => navigate('/faq')}>
            Частые вопросы
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default BuranLoncin;
