import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const TaigaDvigatel = () => {
  const navigate = useNavigate();

  const engines = [
    {
      name: 'Lifan 30 л.с.',
      price: '79 990 ₽',
      power: '30 л.с.',
      features: ['Электростартер', 'Запуск -40°C', 'Для Тайга 500/550'],
      popular: true
    },
    {
      name: 'Lifan 35 л.с.',
      price: '94 990 ₽',
      power: '35 л.с.',
      features: ['Электростартер', 'Максимальная мощность', 'Для Тайга Варяг']
    }
  ];

  return (
    <Layout>
      <Helmet>
        <title>Двигатель для снегохода Тайга — Lifan 30-35 л.с.</title>
        <meta name="description" content="Двигатели Lifan для снегохода Тайга. 30-35 л.с., электростартер, адаптерная плита. Совместимость с Тайга 500, 550, Варяг." />
        <link rel="canonical" href="https://dvigatel-lifan-na-snegohod.ru/taiga/dvigatel" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs 
          items={[
            { label: 'Главная', link: '/' },
            { label: 'Тайга', link: '/taiga/dvigatel' },
            { label: 'Двигатели' }
          ]}
        />

        <h1 className="text-4xl font-bold mb-4">Двигатель для снегохода Тайга</h1>
        <p className="text-xl text-muted-foreground mb-8">
          4-тактные двигатели Lifan для снегоходов Тайга всех моделей. Мощность 30-35 л.с.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {engines.map((engine, idx) => (
            <Card key={idx} className={engine.popular ? 'border-primary border-2' : ''}>
              {engine.popular && (
                <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-semibold">
                  ⭐ Популярный выбор
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{engine.name}</CardTitle>
                <div className="text-3xl font-bold text-primary">{engine.price}</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {engine.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm">
                      <Icon name="Check" className="w-4 h-4 mr-2 text-green-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full" onClick={() => navigate('/#catalog')}>
                  Подробнее
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Совместимые модели Тайга</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Icon name="Check" className="w-4 h-4 mr-2 text-green-600" />
                  Тайга 500
                </li>
                <li className="flex items-center">
                  <Icon name="Check" className="w-4 h-4 mr-2 text-green-600" />
                  Тайга 550
                </li>
                <li className="flex items-center">
                  <Icon name="Check" className="w-4 h-4 mr-2 text-green-600" />
                  Тайга Варяг
                </li>
              </ul>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Icon name="Check" className="w-4 h-4 mr-2 text-green-600" />
                  Тайга Патруль
                </li>
                <li className="flex items-center">
                  <Icon name="Check" className="w-4 h-4 mr-2 text-green-600" />
                  Тайга СТ-500
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default TaigaDvigatel;
