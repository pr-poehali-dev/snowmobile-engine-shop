import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const BuranDvigatel = () => {
  const navigate = useNavigate();

  const engines = [
    {
      name: 'Lifan 27 л.с. (688 см³)',
      price: '69 990 ₽',
      power: '27 л.с. (21 кВт)',
      features: ['Электростартер', 'Катушка 20А', 'Запуск до -40°C', 'Расход 3-4 л/ч'],
      bestFor: 'Лёгкие Бураны до 350 кг'
    },
    {
      name: 'Lifan 30 л.с. (724 см³)',
      price: '79 990 ₽',
      power: '30 л.с. (23 кВт)',
      features: ['Электростартер', 'Катушка 20А', 'Запуск до -40°C', 'Расход 4-5 л/ч'],
      bestFor: 'Средние Бураны 350-450 кг',
      popular: true
    },
    {
      name: 'Lifan 35 л.с. (845 см³)',
      price: '94 990 ₽',
      power: '35 л.с. (27 кВт)',
      features: ['Электростартер', 'Катушка 20А', 'Запуск до -40°C', 'Расход 4-5 л/ч'],
      bestFor: 'Тяжёлые Бураны, горы, коммерция'
    }
  ];

  const advantages = [
    {
      icon: 'Zap',
      title: 'Простая установка',
      text: 'Адаптерная плита в комплекте. Установка за 4-6 часов.'
    },
    {
      icon: 'Snowflake',
      title: 'Морозостойкость',
      text: 'Надёжный запуск при -40°C без предпускового подогрева.'
    },
    {
      icon: 'DollarSign',
      title: 'Экономичность',
      text: 'Расход 3-5 л/ч — на 30% меньше аналогов.'
    },
    {
      icon: 'Shield',
      title: 'Гарантия',
      text: '14 дней на проверку работоспособности.'
    }
  ];

  return (
    <Layout>
      <Helmet>
        <title>Двигатель для снегохода Буран — купить Lifan от 69 990 ₽</title>
        <meta name="description" content="Двигатели Lifan для снегохода Буран от 27 до 35 л.с. ✓ Запуск при -40°C ✓ Электростартер ✓ Адаптерная плита в комплекте ✓ Доставка по РФ" />
        <meta name="keywords" content="двигатель для снегохода буран, купить двигатель буран, двигатель лифан буран, lifan буран" />
        <link rel="canonical" href="https://dvigatel-lifan-na-snegohod.ru/buran/dvigatel" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs 
          items={[
            { label: 'Главная', link: '/' },
            { label: 'Буран', link: '/buran/dvigatel' },
            { label: 'Двигатели' }
          ]}
        />

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Двигатель для снегохода Буран</h1>
          <p className="text-xl text-muted-foreground">
            Профессиональные двигатели Lifan для снегоходов Буран. Мощность от 27 до 35 л.с., 
            электростартер, адаптерная плита в комплекте.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {advantages.map((item, idx) => (
            <Card key={idx}>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 p-3 bg-primary/10 rounded-full">
                    <Icon name={item.icon} className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.text}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <h2 className="text-3xl font-bold mb-6">Модели двигателей для Бурана</h2>
        
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {engines.map((engine, idx) => (
            <Card key={idx} className={engine.popular ? 'border-primary border-2' : ''}>
              {engine.popular && (
                <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-semibold">
                  ⭐ Популярный выбор
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl">{engine.name}</CardTitle>
                <div className="text-3xl font-bold text-primary">{engine.price}</div>
                <div className="text-muted-foreground">{engine.power}</div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="font-semibold mb-2">Подходит для:</div>
                  <div className="text-sm text-muted-foreground">{engine.bestFor}</div>
                </div>
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

        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Почему Lifan для Бурана?</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <h3>Совместимость с Буран</h3>
            <p>
              Двигатели Lifan идеально подходят для всех моделей снегоходов Буран благодаря 
              адаптерной плите в комплекте. Установка не требует сварочных работ или доработки рамы.
            </p>

            <h3>Работа в экстремальных условиях</h3>
            <p>
              Двигатели адаптированы для российских морозов до -40°C. Электростартер обеспечивает 
              надёжный запуск даже в сильный холод при использовании синтетического масла 0W-30.
            </p>

            <h3>Экономия топлива</h3>
            <p>
              Средний расход 3-5 литров в час — это на 20-30% экономичнее стандартных двухтактных 
              двигателей Буран. За сезон экономия составляет 200-300 литров топлива.
            </p>

            <h3>Надёжность и ресурс</h3>
            <p>
              4-тактные двухцилиндровые двигатели Lifan имеют ресурс до 5000+ моточасов при правильном 
              обслуживании. Замена масла каждые 50 моточасов — и двигатель работает годами.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Установка двигателя на Буран</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Предлагаем профессиональную установку двигателя Lifan на снегоход Буран. 
              Работы выполняют опытные механики с гарантией 6 месяцев.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <Icon name="Check" className="w-5 h-5 mr-2 text-green-600" />
                Демонтаж старого двигателя
              </li>
              <li className="flex items-center">
                <Icon name="Check" className="w-5 h-5 mr-2 text-green-600" />
                Установка адаптерной плиты
              </li>
              <li className="flex items-center">
                <Icon name="Check" className="w-5 h-5 mr-2 text-green-600" />
                Подключение электрики и топливной системы
              </li>
              <li className="flex items-center">
                <Icon name="Check" className="w-5 h-5 mr-2 text-green-600" />
                Первый запуск и обкатка
              </li>
            </ul>
            <div className="flex gap-4">
              <Button onClick={() => navigate('/#catalog')}>
                Заказать с установкой
              </Button>
              <Button variant="outline" onClick={() => navigate('/faq')}>
                Вопросы и ответы
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default BuranDvigatel;
