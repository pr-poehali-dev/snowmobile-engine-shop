import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const BuranDvigatel = () => {
  const navigate = useNavigate();

  const categories = [
    {
      title: 'Двигатели Lifan для Буран',
      description: '4-тактные двигатели 27-35 л.с. с электростартером и генератором',
      link: '/buran/dvigatel-lifan',
      popular: true,
      features: ['EFI инжектор', 'Электростартер', 'Запуск -40°C', 'Гарантия']
    },
    {
      title: 'Двигатели Loncin для Буран',
      description: '30 л.с., надёжная китайская сборка по доступной цене',
      link: '/buran/dvigatel-loncin',
      features: ['30 л.с.', 'Электростартер', 'Доступная цена', 'В наличии']
    }
  ];

  const advantages = [
    {
      icon: 'Cog',
      title: '4-тактные двигатели',
      text: 'Ресурс 5000+ моточасов, тихая работа, экономия топлива'
    },
    {
      icon: 'Zap',
      title: 'Электростартер',
      text: 'Запуск одной кнопкой в любую погоду'
    },
    {
      icon: 'Snowflake',
      title: 'Морозостойкость -40°C',
      text: 'Адаптированы для российских зим'
    },
    {
      icon: 'Wrench',
      title: 'Простая установка',
      text: 'Адаптерная плита в комплекте'
    },
    {
      icon: 'DollarSign',
      title: 'Экономия 20-30%',
      text: 'Расход 3-5 л/ч против 7-8 л/ч у 2-тактных'
    },
    {
      icon: 'Shield',
      title: 'Гарантия качества',
      text: '14 дней на проверку, замена при браке'
    }
  ];

  return (
    <Layout>
      <Helmet>
        <title>Двигатель для Буран — 4-тактные Lifan 27–35 л.с. | Доставка по РФ</title>
        <meta name="description" content="Подберём и поставим двигатель для снегохода Буран: Lifan/Loncin, инжектор/карбюратор, электростартер, гарантия до 2 лет. Цена и наличие." />
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
            Профессиональные 4-тактные двигатели для снегоходов Буран всех моделей. 
            Lifan и Loncin от 27 до 35 л.с., электростартер, адаптерная плита в комплекте.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {advantages.map((item, idx) => (
            <Card key={idx}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-full flex-shrink-0">
                    <Icon name={item.icon} className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.text}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <h2 className="text-3xl font-bold mb-6">Выберите производителя двигателя</h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {categories.map((cat, idx) => (
            <Card key={idx} className={cat.popular ? 'border-primary border-2' : ''}>
              {cat.popular && (
                <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-semibold">
                  ⭐ Популярный выбор
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{cat.title}</CardTitle>
                <p className="text-muted-foreground">{cat.description}</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {cat.features.map((feature, i) => (
                    <div key={i} className="flex items-center text-sm">
                      <Icon name="Check" className="w-4 h-4 mr-2 text-green-600" />
                      {feature}
                    </div>
                  ))}
                </div>
                <Button className="w-full" onClick={() => navigate(cat.link)}>
                  Смотреть модели
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Почему 4-тактный двигатель лучше для Буран?</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <h3>Экономия топлива до 50%</h3>
            <p>
              Штатный 2-тактный двигатель Буран потребляет 7-8 литров в час. 4-тактные Lifan 
              расходуют всего 3-5 л/ч — это экономия 200-300 литров бензина за сезон, что окупает 
              разницу в цене за 1-2 года.
            </p>

            <h3>Больше мощности и тяги</h3>
            <p>
              Двигатели Lifan 27-35 л.с. обеспечивают отличную динамику и проходимость. Крутящий 
              момент 50-65 Н·м позволяет уверенно двигаться по глубокому снегу и бездорожью.
            </p>

            <h3>Надёжность в морозы</h3>
            <p>
              Электростартер и адаптация для российских зим гарантируют запуск до -40°C. 
              Не нужно мучиться с ручным стартером на морозе — заводится одной кнопкой.
            </p>

            <h3>Тихая работа</h3>
            <p>
              4-тактные двигатели работают в 2-3 раза тише 2-тактных. Это важно для охоты, 
              рыбалки и езды в населённых пунктах.
            </p>

            <h3>Больше ресурс</h3>
            <p>
              Ресурс до капремонта — 5000+ моточасов против 1500-2000 у штатного двигателя Буран. 
              Простое обслуживание — замена масла каждые 50 моточасов.
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