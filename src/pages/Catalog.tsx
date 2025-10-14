import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AIAssistant from '@/components/AIAssistant';
import { Tabs } from '@/components/ui/tabs';
import { categories } from '@/components/catalog/CatalogData';
import CatalogTabsList from '@/components/catalog/CatalogTabsList';
import CatalogTabContent from '@/components/catalog/CatalogTabContent';

const Catalog = () => {
  const [isAIOpen, setIsAIOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header activeSection="catalog" />
      
      <main className="flex-1">
        <section className="py-12 md:py-20">
          <div className="container px-4">
            <div className="max-w-6xl mx-auto">
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
      </main>

      <Footer />
      <AIAssistant isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />
    </div>
  );
};

export default Catalog;
