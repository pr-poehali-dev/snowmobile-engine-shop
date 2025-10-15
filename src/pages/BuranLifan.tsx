import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const BuranLifan = () => {
  const navigate = useNavigate();

  const engines = [
    {
      name: 'Lifan 27 л.с. (688 см³)',
      price: '69 990 ₽',
      power: '27 л.с. (21 кВт)',
      volume: '688 см³',
      torque: '50 Н·м',
      weight: '60 кг',
      starter: 'Ручной + электростартер',
      fuel: 'Карбюратор',
      generator: '20А',
      features: ['Запуск до -40°C', 'Расход 3-4 л/ч', 'Для Буран до 350 кг']
    },
    {
      name: 'Lifan 30 л.с. (724 см³)',
      price: '79 990 ₽',
      power: '30 л.с. (23 кВт)',
      volume: '724 см³',
      torque: '55 Н·м',
      weight: '62 кг',
      starter: 'Электростартер',
      fuel: 'Карбюратор',
      generator: '20А',
      popular: true,
      features: ['Запуск до -40°C', 'Расход 4-5 л/ч', 'Универсальный']
    },
    {
      name: 'Lifan 35 л.с. (845 см³)',
      price: '94 990 ₽',
      power: '35 л.с. (27 кВт)',
      volume: '845 см³',
      torque: '65 Н·м',
      weight: '68 кг',
      starter: 'Электростартер',
      fuel: 'Карбюратор',
      generator: '20А',
      features: ['Запуск до -40°C', 'Расход 4-5 л/ч', 'Для тяжёлых нагрузок']
    }
  ];

  return (
    <Layout>
      <Helmet>
        <title>Двигатель Lifan для Буран — 27–35 л.с., EFI, электростартер</title>
        <meta name="description" content="Двигатели Lifan для снегохода Буран. 4-тактные 27-35 л.с., электростартер, катушка 20А. Адаптерная плита в комплекте. Запуск до -40°C." />
        <link rel="canonical" href="https://dvigatel-lifan-na-snegohod.ru/buran/dvigatel-lifan" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs 
          items={[
            { label: 'Главная', link: '/' },
            { label: 'Буран', link: '/buran/dvigatel' },
            { label: 'Lifan' }
          ]}
        />

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Двигатель Lifan для Буран</h1>
          <p className="text-xl text-muted-foreground">
            Профессиональные 4-тактные двигатели Lifan специально для снегоходов Буран. 
            Мощность от 27 до 35 л.с., электростартер, морозостойкость до -40°C.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {engines.map((engine, idx) => (
            <Card key={idx} className={engine.popular ? 'border-primary border-2' : ''}>
              {engine.popular && (
                <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-semibold">
                  ⭐ Хит продаж
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl">{engine.name}</CardTitle>
                <div className="text-3xl font-bold text-primary mb-2">{engine.price}</div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Мощность:</span>
                    <span className="font-semibold">{engine.power}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Объём:</span>
                    <span className="font-semibold">{engine.volume}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Крутящий момент:</span>
                    <span className="font-semibold">{engine.torque}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Вес:</span>
                    <span className="font-semibold">{engine.weight}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Стартер:</span>
                    <span className="font-semibold">{engine.starter}</span>
                  </div>
                </div>

                <div className="border-t pt-4 mb-4">
                  {engine.features.map((feature, i) => (
                    <div key={i} className="flex items-center text-sm mb-2">
                      <Icon name="Check" className="w-4 h-4 mr-2 text-green-600" />
                      {feature}
                    </div>
                  ))}
                </div>

                <Button className="w-full" onClick={() => navigate('/#catalog')}>
                  Купить
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Совместимые модели Буран</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="font-semibold mb-2">Подходят для:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm">
                    <Icon name="Check" className="w-4 h-4 mr-2 text-green-600" />
                    Буран 640
                  </li>
                  <li className="flex items-center text-sm">
                    <Icon name="Check" className="w-4 h-4 mr-2 text-green-600" />
                    Буран АЕ
                  </li>
                  <li className="flex items-center text-sm">
                    <Icon name="Check" className="w-4 h-4 mr-2 text-green-600" />
                    Буран Лидер
                  </li>
                  <li className="flex items-center text-sm">
                    <Icon name="Check" className="w-4 h-4 mr-2 text-green-600" />
                    Буран СБ-640А
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Комплектация:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm">
                    <Icon name="Check" className="w-4 h-4 mr-2 text-green-600" />
                    Адаптерная плита для Буран
                  </li>
                  <li className="flex items-center text-sm">
                    <Icon name="Check" className="w-4 h-4 mr-2 text-green-600" />
                    Крепёжный набор
                  </li>
                  <li className="flex items-center text-sm">
                    <Icon name="Check" className="w-4 h-4 mr-2 text-green-600" />
                    Инструкция по установке
                  </li>
                  <li className="flex items-center text-sm">
                    <Icon name="Check" className="w-4 h-4 mr-2 text-green-600" />
                    Техподдержка
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button onClick={() => navigate('/uslugi/ustanovka-lifan-buran')}>
            Заказать установку
          </Button>
          <Button variant="outline" onClick={() => navigate('/faq')}>
            Частые вопросы
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default BuranLifan;
