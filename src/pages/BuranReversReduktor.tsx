import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const BuranReversReduktor = () => {
  const navigate = useNavigate();

  const products = [
    {
      name: 'Реверс-редуктор стандартный',
      price: '24 990 ₽',
      features: [
        'Передаточное число 1:2',
        'Задний ход',
        'Для двигателей 27-30 л.с.',
        'Вес 8 кг'
      ],
      popular: true
    },
    {
      name: 'Реверс-редуктор с пониженной',
      price: '29 990 ₽',
      features: [
        'Передаточное число 1:2.5',
        'Задний ход + пониженная',
        'Для двигателей 30-35 л.с.',
        'Вес 9.5 кг'
      ]
    }
  ];

  return (
    <Layout>
      <Helmet>
        <title>Реверс-редуктор для Буран — с задним ходом и пониженной</title>
        <meta name="description" content="Реверс-редукторы для снегохода Буран с двигателем Lifan/Loncin. Задний ход, пониженная передача. Доставка по РФ." />
        <link rel="canonical" href="https://dvigatel-lifan-na-snegohod.ru/buran/revers-reduktor" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs 
          items={[
            { label: 'Главная', link: '/' },
            { label: 'Буран', link: '/buran/dvigatel' },
            { label: 'Реверс-редукторы' }
          ]}
        />

        <h1 className="text-4xl font-bold mb-4">Реверс-редуктор для Буран</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Реверс-редукторы для снегоходов Буран с двигателями Lifan и Loncin. 
          Задний ход и пониженная передача для лучшей проходимости.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {products.map((product, idx) => (
            <Card key={idx} className={product.popular ? 'border-primary border-2' : ''}>
              {product.popular && (
                <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-semibold">
                  ⭐ Популярный выбор
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl">{product.name}</CardTitle>
                <div className="text-3xl font-bold text-primary">{product.price}</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm">
                      <Icon name="Check" className="w-4 h-4 mr-2 text-green-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full" onClick={() => navigate('/#catalog')}>
                  Купить
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Зачем нужен реверс-редуктор?</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <h3>Задний ход</h3>
            <p>
              Реверс-редуктор добавляет снегоходу возможность двигаться назад. Это крайне 
              полезно при маневрировании в ограниченном пространстве, выезде из глубокого 
              снега или при парковке.
            </p>

            <h3>Пониженная передача</h3>
            <p>
              Модель с пониженной передачей увеличивает крутящий момент в 2.5 раза. 
              Это позволяет уверенно двигаться по глубокому снегу, буксировать грузы 
              или подниматься в горку.
            </p>

            <h3>Совместимость</h3>
            <p>
              Реверс-редукторы совместимы с двигателями Lifan и Loncin 27-35 л.с. 
              Устанавливаются между двигателем и вариатором. Монтаж занимает 2-3 часа.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Комплектация</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Icon name="Check" className="w-4 h-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                Реверс-редуктор в сборе
              </li>
              <li className="flex items-start">
                <Icon name="Check" className="w-4 h-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                Крепёжный набор
              </li>
              <li className="flex items-start">
                <Icon name="Check" className="w-4 h-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                Рычаг переключения
              </li>
              <li className="flex items-start">
                <Icon name="Check" className="w-4 h-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                Инструкция по установке
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default BuranReversReduktor;
