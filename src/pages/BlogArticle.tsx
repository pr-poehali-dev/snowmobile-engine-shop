import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

const BlogArticle = () => {
  const { id } = useParams();

  const article = {
    id: 'ustanovka-lifan-buran',
    title: 'Установка двигателя Lifan 27 л.с. на Буран: пошаговая инструкция',
    image: 'https://cdn.poehali.dev/files/4c1f2bc5-fd6e-4a17-9031-1deacf7cdb07.png',
    category: 'Установка',
    date: '15 января 2025',
    readTime: '12 мин',
    author: 'Сергей Морозов',
    content: `
Замена штатного двигателя на снегоходе Буран на современный Lifan 27 л.с. — это отличный способ повысить надёжность, снизить расход топлива и упростить обслуживание. В этой статье я расскажу, как выполнить установку самостоятельно за один день.

## Что потребуется для установки

### Инструменты:
- Набор ключей (8-19 мм)
- Торцевые головки с трещоткой
- Отвёртки (плоская, крестовая)
- Динамометрический ключ
- Плоскогубцы и кусачки
- Дрель со свёрлами (если нужны новые отверстия)

### Материалы:
- Двигатель Lifan 27 л.с. в полной комплектации
- Адаптерная плита для установки (обычно входит в комплект)
- Моторное масло SAE 10W-40 (1,2 литра)
- Бензин АИ-92 или АИ-95
- Крепёжный набор (болты, гайки, шайбы)
- Хомуты для топливных шлангов
- Изолента и термоусадка

## Шаг 1: Демонтаж старого двигателя

**Время выполнения: 1-2 часа**

1. **Слейте топливо и масло** из старого двигателя в подготовленную ёмкость.

2. **Отключите все соединения:**
   - Открутите топливный шланг от карбюратора
   - Снимите провода с катушки зажигания и стартера
   - Отсоедините трос газа
   - Отключите выхлоп

3. **Открутите крепления двигателя** (обычно 4 болта на раме снегохода)

4. **Аккуратно снимите двигатель** с помощником — он весит около 50-60 кг

5. **Очистите посадочное место** от грязи и старого герметика

> **Совет:** Сфотографируйте все соединения перед демонтажем — это упростит сборку.

## Шаг 2: Подготовка нового двигателя

**Время выполнения: 30 минут**

1. **Проверьте комплектацию:**
   - Двигатель в сборе
   - Адаптерная плита
   - Крепёжный набор
   - Выхлопная система
   - Инструкция

2. **Залейте моторное масло:**
   - Открутите заливную пробку (обычно на крышке клапанов)
   - Залейте 1,1-1,2 литра масла 10W-40
   - Проверьте уровень щупом (должен быть между MIN и MAX)
   - Закрутите пробку

3. **Установите адаптерную плиту** на двигатель (если она отдельная):
   - Приложите плиту к креплениям двигателя
   - Закрутите 4 болта крест-накрест моментом 25-30 Н·м
   - Проверьте, что плита плотно прилегает

## Шаг 3: Установка двигателя на раму

**Время выполнения: 1-2 часа**

1. **Установите двигатель на раму:**
   - Поднимите двигатель вдвоём
   - Совместите отверстия в адаптерной плите с креплениями на раме
   - Наживите все 4 болта, не затягивая до конца

2. **Выровняйте двигатель:**
   - Проверьте, чтобы вал двигателя был параллелен раме
   - Убедитесь, что ремень вариатора будет стоять ровно (без перекосов)
   - Затяните болты крест-накрест моментом 40-50 Н·м

3. **Установите натяжитель ремня** (если предусмотрен конструкцией)

## Шаг 4: Подключение систем

**Время выполнения: 1 час**

### Топливная система:
1. Подсоедините топливный шланг к карбюратору
2. Закрепите хомутом (диаметр 8 мм)
3. Проверьте, чтобы шланг не перегибался и не касался горячих частей

### Электрика:
1. **Подключите стартер:**
   - Плюсовой провод от аккумулятора к клемме стартера
   - Провод кнопки запуска к управляющей клемме

2. **Подключите катушку освещения** (если используете):
   - Два провода от катушки к выпрямителю
   - От выпрямителя — к бортовой сети снегохода

3. **Подключите массу** (минусовой провод) от рамы к двигателю

4. **Заизолируйте все соединения** термоусадкой или изолентой

### Система газа:
1. Подсоедините трос газа к рычагу на карбюраторе
2. Отрегулируйте натяжение:
   - На холостом ходу трос должен иметь люфт 2-3 мм
   - При полном газе заслонка должна открываться до упора
3. Зафиксируйте трос на кронштейне

### Выхлопная система:
1. Установите глушитель на шпильки двигателя
2. Закрутите гайки крест-накрест моментом 15-20 Н·м
3. Используйте новую прокладку (входит в комплект)
4. Проверьте герметичность соединения

## Шаг 5: Первый запуск и настройка

**Время выполнения: 30 минут**

1. **Проверьте перед запуском:**
   - Уровень масла в двигателе
   - Затяжку всех болтов
   - Подключение всех проводов
   - Отсутствие утечек топлива

2. **Залейте бензин** в бак (АИ-92 или АИ-95)

3. **Первый запуск:**
   - Закройте воздушную заслонку (если двигатель холодный)
   - Включите зажигание
   - Нажмите кнопку электростартера или потяните ручной стартер
   - После запуска откройте воздушную заслонку через 30 секунд

4. **Прогрейте двигатель** 3-5 минут на холостых оборотах

5. **Настройте холостой ход:**
   - Двигатель должен работать ровно на 1200-1500 об/мин
   - Регулируйте винтом на карбюраторе

6. **Проверьте систему охлаждения** (если есть) — вентилятор должен включиться при прогреве

## Обкатка нового двигателя

**Первые 10 моточасов (обязательно!):**

- Не превышайте 50% от максимальных оборотов
- Избегайте длительной работы на одних оборотах
- Не перегружайте двигатель (не возите тяжёлые грузы)
- Меняйте режимы работы — от холостых до средних оборотов
- После 5 моточасов замените масло (удалится металлическая стружка)
- После 10 моточасов — вторая замена масла

**После обкатки:**
- Двигатель готов к полной нагрузке
- Следующая замена масла — через 50 моточасов

## Частые ошибки при установке

❌ **Не залили масло перед запуском** — двигатель выйдет из строя за минуту

❌ **Перепутали провода стартера** — стартер крутит в обратную сторону или не крутит вообще

❌ **Неправильно натянули ремень** — преждевременный износ или проскальзывание

❌ **Не проверили затяжку болтов** — двигатель может сдвинуться при вибрации

❌ **Забыли открыть топливный кран** — двигатель заводится и глохнет

## Контрольный чек-лист перед поездкой

✅ Уровень масла в норме (между MIN и MAX)

✅ Уровень топлива достаточный

✅ Все болты затянуты

✅ Нет утечек топлива или масла

✅ Трос газа отрегулирован

✅ Двигатель запускается с первого раза

✅ Холостой ход ровный

✅ Ремень вариатора натянут правильно

✅ Выхлоп не подтекает

✅ Все провода заизолированы

## Заключение

Установка двигателя Lifan на Буран — это вполне выполнимая задача для тех, кто умеет работать руками. Главное — не спешить, следовать инструкции и проверять каждый этап. Если у вас возникли вопросы — пишите в комментарии или звоните нашим специалистам.

**Время установки:** 3-4 часа для опытного механика, 5-6 часов для новичка.

**Сложность:** Средняя (требуются базовые навыки работы с техникой).

**Результат:** Надёжный, экономичный двигатель, который прослужит 10+ лет при правильном обслуживании.

Удачной установки! 🛠️
    `
  };

  return (
    <Layout activeSection="blog">
      <Helmet>
        <title>{article.title}</title>
        <meta name="description" content={article.content.substring(0, 160).replace(/\n/g, ' ').trim() + '...'} />
        <meta name="keywords" content={`${article.category.toLowerCase()}, lifan, буран, снегоход, двигатель`} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.content.substring(0, 160).replace(/\n/g, ' ').trim() + '...'} />
        <meta property="og:image" content={article.image} />
        <meta property="article:published_time" content={article.date} />
        <meta property="article:author" content={article.author} />
      </Helmet>
      <article className="py-12 md:py-20">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto">
              <Breadcrumbs items={[
                { label: 'Блог', href: '/blog' },
                { label: article.title }
              ]} />

              <div className="mb-6">
                <Badge variant="secondary" className="mb-4">{article.category}</Badge>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                  {article.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Icon name="User" size={16} />
                    {article.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="Calendar" size={16} />
                    {article.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="Clock" size={16} />
                    {article.readTime}
                  </span>
                </div>
              </div>

              <div className="aspect-video overflow-hidden rounded-lg mb-8">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="prose prose-slate max-w-none dark:prose-invert">
                {article.content.split('\n\n').map((paragraph, idx) => {
                  if (paragraph.startsWith('## ')) {
                    return <h2 key={idx} className="text-2xl md:text-3xl font-bold mt-8 mb-4">{paragraph.replace('## ', '')}</h2>;
                  } else if (paragraph.startsWith('### ')) {
                    return <h3 key={idx} className="text-xl md:text-2xl font-bold mt-6 mb-3">{paragraph.replace('### ', '')}</h3>;
                  } else if (paragraph.startsWith('> ')) {
                    return (
                      <Card key={idx} className="my-4 bg-primary/5 border-primary/20">
                        <CardContent className="pt-4">
                          <p className="text-sm">{paragraph.replace('> ', '').replace('**Совет:**', '')}</p>
                        </CardContent>
                      </Card>
                    );
                  } else if (paragraph.startsWith('- ')) {
                    const items = paragraph.split('\n- ').map(item => item.replace('- ', ''));
                    return (
                      <ul key={idx} className="list-disc list-inside space-y-2 my-4">
                        {items.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    );
                  } else if (paragraph.startsWith('✅') || paragraph.startsWith('❌')) {
                    const items = paragraph.split('\n').filter(item => item.trim());
                    return (
                      <ul key={idx} className="space-y-2 my-4">
                        {items.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-xl">{item.startsWith('✅') ? '✅' : '❌'}</span>
                            <span>{item.replace('✅ ', '').replace('❌ ', '')}</span>
                          </li>
                        ))}
                      </ul>
                    );
                  } else if (paragraph.trim().match(/^\d+\./)) {
                    const items = paragraph.split('\n').filter(item => item.match(/^\d+\./));
                    return (
                      <ol key={idx} className="list-decimal list-inside space-y-2 my-4">
                        {items.map((item, i) => (
                          <li key={i}>{item.replace(/^\d+\.\s*/, '')}</li>
                        ))}
                      </ol>
                    );
                  } else if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                    return <p key={idx} className="font-bold my-4">{paragraph.replace(/\*\*/g, '')}</p>;
                  } else if (paragraph.trim()) {
                    return <p key={idx} className="my-4 text-muted-foreground leading-relaxed">{paragraph}</p>;
                  }
                  return null;
                })}
              </div>

              <Separator className="my-8" />

              <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Была ли статья полезной?</p>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors">
                      👍 Да
                    </button>
                    <button className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors">
                      👎 Нет
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Поделиться:</p>
                  <div className="flex gap-2">
                    <a
                      href={`https://t.me/share/url?url=${window.location.href}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-[#0088cc] text-white rounded-lg hover:bg-[#0077b5] transition-colors"
                    >
                      <Icon name="Send" size={20} />
                    </a>
                  </div>
                </div>
              </div>

              <Card className="mt-8 bg-muted/50">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-2">Нужна помощь с установкой?</h3>
                  <p className="text-muted-foreground mb-4">
                    Наши специалисты проконсультируют бесплатно и помогут разобраться в сложных моментах
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="tel:+79828202197"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      <Icon name="Phone" size={18} />
                      Позвонить
                    </a>
                    <a
                      href="https://t.me/lifanburan"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0088cc] text-white rounded-lg hover:bg-[#0077b5] transition-colors"
                    >
                      <Icon name="Send" size={18} />
                      Написать в Telegram
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
      </article>
    </Layout>
  );
};

export default BlogArticle;