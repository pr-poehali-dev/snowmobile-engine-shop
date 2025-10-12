import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface HeroSectionProps {
  scrollToSection: (section: string) => void;
}

const HeroSection = ({ scrollToSection }: HeroSectionProps) => {
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
            <img
              src="https://cdn.poehali.dev/files/b372e95b-2fde-4136-be71-7043452fda66.png"
              alt="Lifan Engine"
              className="relative w-full rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;