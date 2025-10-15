import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const LifanDvigateli = () => {
  const navigate = useNavigate();

  const snowmobiles = [
    {
      name: 'Буран',
      icon: 'Snowflake',
      engines: ['27 л.с.', '30 л.с.', '35 л.с.'],
      link: '/buran/dvigatel',
      description: 'Оптимальный выбор для Бурана — модели от 27 до 35 л.с.'
    },
    {
      name: 'Тайга',
      icon: 'Mountain',
      engines: ['30 л.с.', '35 л.с.'],
      link: '#',
      description: 'Для Тайги рекомендуем 30-35 л.с. для уверенной езды'
    },
    {
      name: 'Рысь',
      icon: 'CircleSlash',
      engines: ['27 л.с.', '30 л.с.'],
      link: '#',
      description: 'Лёгкой Рыси достаточно 27-30 л.с. для отличной динамики'
    }
  ];

  const features = [
    {
      icon: 'Cog',
      title: '4-тактные двухцилиндровые',
      text: 'Надёжная конструкция с ресурсом 5000+ моточасов'
    },
    {
      icon: 'Zap',
      title: 'Электростартер в комплекте',
      text: 'Запуск двигателя одной кнопкой в любую погоду'
    },
    {
      icon: 'Snowflake',
      title: 'Морозостойкие до -40°C',
      text: 'Адаптированы для суровых российских зим'
    },
    {
      icon: 'DollarSign',
      title: 'Экономия до 30%',
      text: 'Расход 3-5 л/ч — экономия 200-300 л за сезон'
    },
    {
      icon: 'Wrench',
      title: 'Простое обслуживание',
      text: 'Стандартные запчасти, понятная конструкция'
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
        <title>Двигатели Lifan для снегоходов — купить от 69 990 ₽</title>
        <meta name="description" content="Двигатели Lifan для снегоходов Буран, Тайга, Рысь. От 27 до 35 л.с. ✓ Электростартер ✓ Запуск -40°C ✓ Экономия топлива 30% ✓ Доставка по РФ" />
        <meta name="keywords" content="двигатель лифан для снегохода, lifan двигатели для снегоходов купить, лифан снегоход" />
        <link rel="canonical" href="https://dvigatel-lifan-na-snegohod.ru/lifan/dvigateli-dlya-snegohodov" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs 
          items={[
            { label: 'Главная', link: '/' },
            { label: 'Lifan', link: '/lifan/dvigateli-dlya-snegohodov' },
            { label: 'Двигатели для снегоходов' }
          ]}
        />

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Двигатели Lifan для снегоходов</h1>
          <p className="text-xl text-muted-foreground">
            Профессиональные бензиновые двигатели Lifan для российских снегоходов. 
            Мощность от 27 до 35 л.с., морозостойкость до -40°C, гарантия качества.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((item, idx) => (
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

        <h2 className="text-3xl font-bold mb-6">Подбор двигателя по модели снегохода</h2>
        
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {snowmobiles.map((item, idx) => (
            <Card key={idx} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Icon name={item.icon} className="w-8 h-8 text-primary" />
                  <CardTitle className="text-2xl">{item.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                <div className="mb-4">
                  <div className="text-sm font-semibold mb-2">Подходящие двигатели:</div>
                  <div className="flex flex-wrap gap-2">
                    {item.engines.map((engine, i) => (
                      <span key={i} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                        {engine}
                      </span>
                    ))}
                  </div>
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => item.link !== '#' ? navigate(item.link) : navigate('/#catalog')}
                >
                  Выбрать двигатель
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Почему выбирают Lifan для снегоходов?</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <h3>Надёжность в экстремальных условиях</h3>
            <p>
              Двигатели Lifan специально адаптированы для российских морозов. 4-тактная конструкция 
              обеспечивает стабильную работу до -40°C без предпускового подогрева. Электростартер 
              гарантирует лёгкий запуск даже в сильный холод.
            </p>

            <h3>Экономичность</h3>
            <p>
              Средний расход топлива 3-5 литров в час — это на 20-30% экономичнее стандартных 
              двухтактных двигателей. За сезон экономия составляет 200-300 литров бензина, 
              что окупает разницу в цене уже через 1-2 года.
            </p>

            <h3>Универсальная совместимость</h3>
            <p>
              Подходят для всех популярных российских снегоходов: Буран, Тайга, Рысь, а также 
              самодельных конструкций. В полной комплектации идёт адаптерная плита, которая 
              упрощает установку и не требует сварочных работ.
            </p>

            <h3>Простота обслуживания</h3>
            <p>
              Стандартные запчасти, понятная конструкция, доступная диагностика. Замена масла 
              каждые 50 моточасов — и двигатель работает без поломок годами. Ресурс до 5000+ моточасов.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-12 bg-primary/5">
          <CardHeader>
            <CardTitle>Модельный ряд двигателей Lifan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-xl font-bold mb-2">Lifan 27 л.с.</h3>
                <p className="text-muted-foreground mb-3">
                  Для лёгких снегоходов до 350 кг
                </p>
                <ul className="space-y-1 text-sm">
                  <li>• Объём: 688 см³</li>
                  <li>• Вес: 60 кг</li>
                  <li>• Расход: 3-4 л/ч</li>
                  <li>• Цена: от 69 990 ₽</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Lifan 30 л.с.</h3>
                <p className="text-muted-foreground mb-3">
                  Универсальный для средних снегоходов
                </p>
                <ul className="space-y-1 text-sm">
                  <li>• Объём: 724 см³</li>
                  <li>• Вес: 62 кг</li>
                  <li>• Расход: 4-5 л/ч</li>
                  <li>• Цена: от 79 990 ₽</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Lifan 35 л.с.</h3>
                <p className="text-muted-foreground mb-3">
                  Для тяжёлых снегоходов и горных условий
                </p>
                <ul className="space-y-1 text-sm">
                  <li>• Объём: 845 см³</li>
                  <li>• Вес: 68 кг</li>
                  <li>• Расход: 4-5 л/ч</li>
                  <li>• Цена: от 94 990 ₽</li>
                </ul>
              </div>
            </div>
            <div className="mt-6">
              <Button size="lg" onClick={() => navigate('/#catalog')}>
                Смотреть все модели в каталоге
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Установка и техническая поддержка</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Мы помогаем не только с выбором двигателя, но и с его установкой на ваш снегоход. 
              Опытные механики выполнят работы под ключ с гарантией 6 месяцев.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold mb-2">Услуги установки:</h3>
                <ul className="space-y-1 text-sm">
                  <li>• Демонтаж старого двигателя</li>
                  <li>• Установка адаптерной плиты</li>
                  <li>• Подключение электрики</li>
                  <li>• Первый запуск и обкатка</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Доставка:</h3>
                <ul className="space-y-1 text-sm">
                  <li>• По Ижевску — 1-2 дня</li>
                  <li>• По России — 3-7 дней</li>
                  <li>• Бесплатно от 50 000 ₽</li>
                  <li>• Выезд мастера по Удмуртии</li>
                </ul>
              </div>
            </div>
            <div className="flex gap-4">
              <Button onClick={() => navigate('/#catalog')}>
                Заказать с установкой
              </Button>
              <Button variant="outline" onClick={() => navigate('/faq')}>
                Частые вопросы
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default LifanDvigateli;
