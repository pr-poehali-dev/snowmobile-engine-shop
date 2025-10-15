import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const UslugiUstanovka = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    snowmobile: '',
    engine: ''
  });

  const services = [
    {
      title: 'Установка двигателя на Буран',
      price: 'от 15 000 ₽',
      time: '4-6 часов',
      features: [
        'Демонтаж старого двигателя',
        'Установка адаптерной плиты',
        'Монтаж нового двигателя Lifan',
        'Подключение топливной системы',
        'Подключение электрики и стартера',
        'Регулировка троса газа',
        'Первый запуск и обкатка'
      ]
    },
    {
      title: 'Выездная установка',
      price: 'от 18 000 ₽',
      time: 'в течение дня',
      features: [
        'Выезд мастера с инструментами',
        'По Ижевску и Удмуртии (100 км)',
        'Все работы на вашей территории',
        'Стоимость выезда от 2 000 ₽',
        'Гарантия на работы 6 месяцев'
      ],
      popular: true
    }
  ];

  const steps = [
    {
      number: '1',
      title: 'Консультация',
      description: 'Звоните или оставляйте заявку. Подбираем двигатель под ваш снегоход.',
      icon: 'Phone'
    },
    {
      number: '2',
      title: 'Доставка',
      description: 'Привозим двигатель к вам или вы приезжаете к нам в сервис.',
      icon: 'Truck'
    },
    {
      number: '3',
      title: 'Установка',
      description: 'Мастер устанавливает двигатель, подключает все системы, делает обкатку.',
      icon: 'Wrench'
    },
    {
      number: '4',
      title: 'Готово',
      description: 'Снегоход готов к эксплуатации. Гарантия на работы 6 месяцев.',
      icon: 'Check'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/#catalog');
  };

  return (
    <Layout>
      <Helmet>
        <title>Установка двигателя на снегоход Буран — от 15 000 ₽ под ключ</title>
        <meta name="description" content="Профессиональная установка двигателя Lifan на Буран. ✓ Гарантия 6 месяцев ✓ Выезд по Ижевску и Удмуртии ✓ Работа под ключ за 1 день" />
        <meta name="keywords" content="установка двигателя буран, установка двигателя лифан на буран, установка lifan буран" />
        <link rel="canonical" href="https://dvigatel-lifan-na-snegohod.ru/uslugi/ustanovka-dvigatelya-buran" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs 
          items={[
            { label: 'Главная', link: '/' },
            { label: 'Услуги', link: '/uslugi/ustanovka-dvigatelya-buran' },
            { label: 'Установка двигателя на Буран' }
          ]}
        />

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Установка двигателя на снегоход Буран</h1>
          <p className="text-xl text-muted-foreground">
            Профессиональная установка двигателя Lifan на снегоход Буран под ключ. 
            Работаем по Ижевску и Удмуртии. Гарантия на работы 6 месяцев.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {services.map((service, idx) => (
            <Card key={idx} className={service.popular ? 'border-primary border-2' : ''}>
              {service.popular && (
                <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-semibold">
                  ⭐ Популярная услуга
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{service.title}</CardTitle>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="text-3xl font-bold text-primary">{service.price}</div>
                  <div className="text-sm">
                    <Icon name="Clock" className="w-4 h-4 inline mr-1" />
                    {service.time}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-sm">
                      <Icon name="Check" className="w-4 h-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full" onClick={() => document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' })}>
                  Заказать услугу
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <h2 className="text-3xl font-bold mb-6">Как проходит установка</h2>
        
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {steps.map((step, idx) => (
            <Card key={idx}>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                    {step.number}
                  </div>
                  <Icon name={step.icon} className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Что входит в установку двигателя на Буран?</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <h3>1. Демонтаж старого двигателя</h3>
            <p>
              Аккуратно снимаем старый двигатель, сливаем масло и топливо, отключаем все системы. 
              Проверяем состояние рамы и креплений снегохода.
            </p>

            <h3>2. Подготовка посадочного места</h3>
            <p>
              Очищаем раму от грязи и ржавчины, проверяем крепёжные отверстия. При необходимости 
              усиливаем посадочное место для нового двигателя.
            </p>

            <h3>3. Установка адаптерной плиты</h3>
            <p>
              Устанавливаем адаптерную плиту (идёт в комплекте с двигателем). Плита позволяет 
              закрепить двигатель Lifan на штатные места Бурана без сварочных работ.
            </p>

            <h3>4. Монтаж нового двигателя</h3>
            <p>
              Устанавливаем двигатель Lifan на адаптерную плиту, затягиваем все крепёжные болты 
              с правильным моментом. Проверяем надёжность фиксации.
            </p>

            <h3>5. Подключение топливной системы</h3>
            <p>
              Подключаем топливный бак, устанавливаем топливный фильтр, проверяем герметичность 
              всех соединений. При необходимости меняем топливные шланги.
            </p>

            <h3>6. Подключение электрики</h3>
            <p>
              Подключаем стартер, генератор, фары, приборы. Проверяем правильность подключения 
              и работоспособность всех электрических систем.
            </p>

            <h3>7. Установка выхлопной системы</h3>
            <p>
              Монтируем выхлопную трубу и глушитель, герметизируем соединения. Проверяем, 
              чтобы выхлоп не касался элементов снегохода.
            </p>

            <h3>8. Регулировка троса газа</h3>
            <p>
              Подключаем и регулируем трос газа для плавного и точного управления оборотами двигателя.
            </p>

            <h3>9. Заливка масла и первый запуск</h3>
            <p>
              Заливаем качественное моторное масло (входит в стоимость), проверяем уровень. 
              Производим первый запуск и контролируем работу двигателя.
            </p>

            <h3>10. Обкатка и настройка</h3>
            <p>
              Даём двигателю поработать на холостых оборотах 10-15 минут, затем на средних оборотах 
              ещё 20 минут. Проверяем температуру, давление масла, отсутствие утечек.
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="pt-6 text-center">
              <Icon name="Shield" className="w-12 h-12 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Гарантия 6 месяцев</h3>
              <p className="text-sm text-muted-foreground">
                На все выполненные работы даём гарантию 6 месяцев
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <Icon name="Users" className="w-12 h-12 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Опытные мастера</h3>
              <p className="text-sm text-muted-foreground">
                Установкой занимаются механики с опытом работы от 5 лет
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <Icon name="Clock" className="w-12 h-12 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Быстро</h3>
              <p className="text-sm text-muted-foreground">
                Установка за 4-6 часов, выездная установка — за 1 день
              </p>
            </CardContent>
          </Card>
        </div>

        <Card id="order-form" className="mb-12">
          <CardHeader>
            <CardTitle>Заказать установку двигателя</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Ваше имя</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 border rounded-md"
                  placeholder="Иван"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Телефон</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-2 border rounded-md"
                  placeholder="+7 (900) 123-45-67"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Модель снегохода</label>
                <input
                  type="text"
                  value={formData.snowmobile}
                  onChange={(e) => setFormData({...formData, snowmobile: e.target.value})}
                  className="w-full px-4 py-2 border rounded-md"
                  placeholder="Буран"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Какой двигатель хотите установить?</label>
                <select
                  value={formData.engine}
                  onChange={(e) => setFormData({...formData, engine: e.target.value})}
                  className="w-full px-4 py-2 border rounded-md"
                  required
                >
                  <option value="">Выберите двигатель</option>
                  <option value="27">Lifan 27 л.с. — 69 990 ₽</option>
                  <option value="30">Lifan 30 л.с. — 79 990 ₽</option>
                  <option value="35">Lifan 35 л.с. — 94 990 ₽</option>
                </select>
              </div>
              <Button type="submit" size="lg" className="w-full">
                Отправить заявку
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Частые вопросы</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Можно ли установить двигатель самостоятельно?</h3>
              <p className="text-sm text-muted-foreground">
                Да, если у вас есть базовые навыки механика. К двигателю прилагается подробная инструкция. 
                Но мы рекомендуем доверить установку профессионалам для гарантии качества.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Сколько времени занимает установка?</h3>
              <p className="text-sm text-muted-foreground">
                В сервисе — 4-6 часов. Выездная установка — в течение одного дня.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Что нужно для установки?</h3>
              <p className="text-sm text-muted-foreground">
                Снегоход, новый двигатель Lifan (можем привезти с собой) и минимум инструментов. 
                Всё остальное мастер привозит с собой.
              </p>
            </div>
            <Button variant="outline" onClick={() => navigate('/faq')}>
              Все вопросы и ответы
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default UslugiUstanovka;
