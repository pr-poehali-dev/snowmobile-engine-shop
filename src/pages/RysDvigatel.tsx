import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const RysDvigatel = () => {
  const navigate = useNavigate();

  const engines = [
    {
      name: 'Lifan 27 л.с.',
      price: '69 990 ₽',
      power: '27 л.с.',
      features: ['Электростартер', 'Лёгкий вес 60 кг', 'Оптимально для Рысь'],
      popular: true
    },
    {
      name: 'Lifan 30 л.с.',
      price: '79 990 ₽',
      power: '30 л.с.',
      features: ['Электростартер', 'Больше мощности', 'Для активной езды']
    }
  ];

  return (
    <Layout>
      <Helmet>
        <title>Двигатель для снегохода Рысь — Lifan 27-30 л.с.</title>
        <meta name="description" content="Двигатели Lifan для снегохода Рысь. 27-30 л.с., электростартер, адаптерная плита. Лёгкие и экономичные." />
        <link rel="canonical" href="https://dvigatel-lifan-na-snegohod.ru/rys/dvigatel" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs 
          items={[
            { label: 'Главная', link: '/' },
            { label: 'Рысь', link: '/rys/dvigatel' },
            { label: 'Двигатели' }
          ]}
        />

        <h1 className="text-4xl font-bold mb-4">Двигатель для снегохода Рысь</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Лёгкие 4-тактные двигатели Lifan для снегоходов Рысь. Мощность 27-30 л.с.
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

        <Card>
          <CardHeader>
            <CardTitle>Почему Lifan для Рысь?</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p>
              Рысь — лёгкий и манёвренный снегоход, для которого идеально подходят двигатели 
              Lifan 27-30 л.с. Они обеспечивают отличную динамику при небольшом весе и 
              экономичном расходе топлива.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default RysDvigatel;
