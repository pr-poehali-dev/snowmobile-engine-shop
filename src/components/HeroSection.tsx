import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useState, useEffect } from 'react';

interface HeroSectionProps {
  scrollToSection: (section: string) => void;
}

const HeroSection = ({ scrollToSection }: HeroSectionProps) => {
  const engineImages = [
    'https://cdn.poehali.dev/files/4c1f2bc5-fd6e-4a17-9031-1deacf7cdb07.png',
    'https://cdn.poehali.dev/files/35584b42-c3c3-498e-b470-bc3a63a94a8c.png',
    'https://cdn.poehali.dev/files/4becad3f-ed84-4089-a9b2-22c3af55e347.png',
    'https://cdn.poehali.dev/files/892c1c7d-757e-46c2-881a-804abc3875e9.png',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % engineImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative py-12 md:py-20 overflow-hidden" itemScope itemType="https://schema.org/Product">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
      <div className="container relative px-4">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-4 md:space-y-6 animate-fade-in">
            <Badge className="bg-primary text-primary-foreground text-xs md:text-sm">Профессиональное оборудование</Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight" itemProp="name">
              Двигатели Lifan для снегоходов Буран, Тайга, Рысь
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed" itemProp="description">
              Мощные и надёжные двигатели Lifan от 27 до 31 л.с. для снегоходов Буран, Тайга, Рысь, Ямаха, BRP. Инжектор, электростартер, гарантия до 2 лет. Полная комплектация с вариатором Сафари.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Button size="lg" onClick={() => scrollToSection('catalog')} className="w-full sm:w-auto">
                <Icon name="Zap" className="mr-2" size={20} />
                Смотреть каталог
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToSection('warranty')} className="w-full sm:w-auto">
                Гарантия
              </Button>
            </div>
          </div>
          <div className="relative animate-scale-in mt-8 lg:mt-0">
            <div className="absolute inset-0 bg-primary/20 blur-3xl" />
            <div className="relative w-full rounded-lg overflow-hidden shadow-2xl">
              <img
                src={engineImages[currentImageIndex]}
                alt="Двигатель Lifan для снегохода"
                className="w-full h-auto transition-opacity duration-1000 ease-in-out"
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {engineImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex
                        ? 'bg-primary w-8'
                        : 'bg-primary/30 hover:bg-primary/50'
                    }`}
                    aria-label={`Переключить на изображение ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;