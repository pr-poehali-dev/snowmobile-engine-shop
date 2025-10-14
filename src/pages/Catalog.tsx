import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Tabs } from '@/components/ui/tabs';
import { categories } from '@/components/catalog/CatalogData';
import CatalogTabsList from '@/components/catalog/CatalogTabsList';
import CatalogTabContent from '@/components/catalog/CatalogTabContent';

const Catalog = () => {
  return (
    <Layout activeSection="catalog">
      <Helmet>
        <title>Каталог двигателей Lifan и запчастей для снегоходов</title>
        <meta name="description" content="Полный каталог двигателей Lifan 27-35 л.с., запчастей, аксессуаров и услуг по установке для снегоходов Буран, Тайга, Рысь. Купить с доставкой." />
        <meta name="keywords" content="каталог lifan, двигатели lifan, запчасти снегоход, купить двигатель, lifan 27 30 35, буран" />
      </Helmet>
      <section className="py-12 md:py-20">
        <div className="container px-4">
          <div className="max-w-6xl mx-auto">
            <Breadcrumbs items={[{ label: 'Каталог' }]} />
            
            <div className="text-center mb-8 md:mb-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
                Каталог продукции
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-muted-foreground">
                Двигатели, запчасти, аксессуары и услуги для вашего снегохода
              </p>
            </div>

            <Tabs defaultValue="engines" className="w-full">
              <CatalogTabsList categories={categories} />

              {categories.map((cat) => (
                <CatalogTabContent key={cat.id} category={cat} />
              ))}
            </Tabs>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Catalog;