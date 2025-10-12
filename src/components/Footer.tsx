import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

const Footer = () => {
  return (
    <footer className="border-t border-border py-12 bg-muted/50">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary flex items-center justify-center">
                <Icon name="Zap" className="text-primary-foreground" size={24} />
              </div>
              <span className="text-xl font-bold">МОТОДВНИ</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Профессиональные двигатели для снегоходов и мототехники
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Каталог</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Двигатели Lifan</li>
              <li>Запчасти</li>
              <li>Аксессуары</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Информация</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>О компании</li>
              <li>Доставка и оплата</li>
              <li>Гарантия</li>
              <li>Контакты</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Контакты</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>+7 (XXX) XXX-XX-XX</li>
              <li>info@motodvni.ru</li>
              <li>г. Москва</li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2024 МОТОДВНИ. Все права защищены.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-primary transition-colors">Условия использования</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
