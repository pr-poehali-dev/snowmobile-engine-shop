import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useState } from 'react';

interface HeroSectionProps {
  scrollToSection: (section: string) => void;
}

const HeroSection = ({ scrollToSection }: HeroSectionProps) => {
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

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
            <div className="relative w-full rounded-lg overflow-hidden shadow-2xl aspect-video group">
              <iframe
                key={isMuted ? 'muted' : 'unmuted'}
                src={`https://www.youtube.com/embed/f7rLajIafYg?autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&playlist=f7rLajIafYg&controls=0&modestbranding=1&rel=0`}
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="Lifan Engine Demo"
              />
              <button
                onClick={toggleMute}
                className="absolute bottom-4 right-4 bg-background/80 hover:bg-background text-foreground rounded-full p-3 shadow-lg transition-all hover:scale-110 z-10"
                aria-label={isMuted ? 'Включить звук' : 'Выключить звук'}
              >
                <Icon name={isMuted ? 'VolumeX' : 'Volume2'} size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;