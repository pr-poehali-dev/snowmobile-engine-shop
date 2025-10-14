import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

const Footer = () => {
  return (
    <footer className="border-t border-border py-8 md:py-12 bg-muted/50">
      <div className="container px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-primary flex items-center justify-center rounded">
                <Icon name="Zap" className="text-primary-foreground" size={20} />
              </div>
              <span className="text-lg md:text-xl font-bold">МОТОДВНИ</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Профессиональные двигатели для снегоходов и мототехники
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-3 md:mb-4 text-sm md:text-base">Каталог</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Двигатели Lifan</li>
              <li>Запчасти</li>
              <li>Аксессуары</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-3 md:mb-4 text-sm md:text-base">Информация</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>О компании</li>
              <li>Доставка и оплата</li>
              <li>Гарантия</li>
              <li>Контакты</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-3 md:mb-4 text-sm md:text-base">Контакты</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>+7 (XXX) XXX-XX-XX</li>
              <li>
                <a 
                  href="https://t.me/lifanburan" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors inline-flex items-center gap-1"
                >
                  <Icon name="Send" size={14} />
                  Telegram канал
                </a>
              </li>
              <li>г. Москва</li>
            </ul>
          </div>
        </div>

        <Separator className="my-6 md:my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4 text-xs md:text-sm text-muted-foreground text-center md:text-left">
          <p>© 2024 МОТОДВНИ. Все права защищены.</p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <a href="#" className="hover:text-primary transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-primary transition-colors">Условия использования</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;