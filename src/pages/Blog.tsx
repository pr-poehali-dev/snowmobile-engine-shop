import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Blog = () => {

  const articles = [
    {
      id: 'ustanovka-lifan-buran',
      title: 'Установка двигателя Lifan 27 л.с. на Буран: пошаговая инструкция',
      excerpt: 'Подробное руководство по замене штатного двигателя на современный Lifan с фото и советами от мастера',
      image: 'https://cdn.poehali.dev/files/4c1f2bc5-fd6e-4a17-9031-1deacf7cdb07.png',
      category: 'Установка',
      date: '15 января 2025',
      readTime: '12 мин'
    },
    {
      id: 'obsluzivanie-lifan',
      title: 'Техническое обслуживание двигателя Lifan: что и когда менять',
      excerpt: 'График ТО, выбор масла и фильтров, типичные ошибки при эксплуатации зимой',
      image: 'https://cdn.poehali.dev/files/4c1f2bc5-fd6e-4a17-9031-1deacf7cdb07.png',
      category: 'Обслуживание',
      date: '10 января 2025',
      readTime: '8 мин'
    },
    {
      id: 'sravnenie-27-30-35',
      title: 'Lifan 27, 30 или 35 л.с.: какой двигатель выбрать для вашего снегохода',
      excerpt: 'Сравнение моделей по мощности, расходу, весу и цене с практическими советами',
      image: 'https://cdn.poehali.dev/files/4c1f2bc5-fd6e-4a17-9031-1deacf7cdb07.png',
      category: 'Выбор',
      date: '5 января 2025',
      readTime: '10 мин'
    },
    {
      id: 'podgotovka-k-sezonu',
      title: 'Подготовка снегохода к зимнему сезону: чек-лист из 15 пунктов',
      excerpt: 'Что проверить перед первым выездом, чтобы избежать поломок в поле',
      image: 'https://cdn.poehali.dev/files/4c1f2bc5-fd6e-4a17-9031-1deacf7cdb07.png',
      category: 'Эксплуатация',
      date: '28 декабря 2024',
      readTime: '6 мин'
    },
    {
      id: 'problemy-zapuska',
      title: 'Двигатель не заводится на морозе: 7 причин и решений',
      excerpt: 'Диагностика и устранение проблем с холодным запуском без поездки в сервис',
      image: 'https://cdn.poehali.dev/files/4c1f2bc5-fd6e-4a17-9031-1deacf7cdb07.png',
      category: 'Ремонт',
      date: '20 декабря 2024',
      readTime: '9 мин'
    },
    {
      id: 'tyuning-lifan',
      title: 'Как увеличить мощность Lifan на 15-20%: доступные доработки',
      excerpt: 'Установка спортивного карбюратора, выхлопа и других улучшений своими руками',
      image: 'https://cdn.poehali.dev/files/4c1f2bc5-fd6e-4a17-9031-1deacf7cdb07.png',
      category: 'Тюнинг',
      date: '15 декабря 2024',
      readTime: '11 мин'
    }
  ];

  const categories = ['Все', 'Установка', 'Обслуживание', 'Выбор', 'Эксплуатация', 'Ремонт', 'Тюнинг'];
  const [activeCategory, setActiveCategory] = useState('Все');

  const filteredArticles = activeCategory === 'Все' 
    ? articles 
    : articles.filter(a => a.category === activeCategory);

  return (
    <Layout activeSection="blog">
      <section className="py-12 md:py-20">
          <div className="container px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8 md:mb-12">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
                  Блог и статьи
                </h1>
                <p className="text-base md:text-lg lg:text-xl text-muted-foreground">
                  Инструкции, советы и лайфхаки по установке и эксплуатации двигателей
                </p>
              </div>

              <div className="flex flex-wrap gap-2 justify-center mb-8">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      activeCategory === cat
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article) => (
                  <Link key={article.id} to={`/blog/${article.id}`}>
                    <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                      <div className="aspect-video overflow-hidden rounded-t-lg">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary">{article.category}</Badge>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Icon name="Clock" size={12} />
                            {article.readTime}
                          </span>
                        </div>
                        <CardTitle className="line-clamp-2">{article.title}</CardTitle>
                        <CardDescription className="line-clamp-3">{article.excerpt}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Icon name="Calendar" size={14} />
                            {article.date}
                          </span>
                          <span className="flex items-center gap-1 text-primary">
                            Читать →
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              <div className="mt-12">
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                          <Icon name="Bell" className="text-primary" size={32} />
                        </div>
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <h3 className="text-xl font-bold mb-2">Подписка на новые статьи</h3>
                        <p className="text-muted-foreground">
                          Получайте полезные советы и инструкции первыми — подписывайтесь на наш Telegram-канал
                        </p>
                      </div>
                      <a
                        href="https://t.me/lifanburan"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#0088cc] text-white rounded-lg hover:bg-[#0077b5] transition-colors whitespace-nowrap"
                      >
                        <Icon name="Send" size={18} />
                        Подписаться
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
      </section>
    </Layout>
  );
};

export default Blog;