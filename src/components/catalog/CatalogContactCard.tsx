import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const CatalogContactCard = () => {
  return (
    <div className="mt-8">
      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="Phone" className="text-primary" size={32} />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold mb-2">Нужна консультация?</h3>
              <p className="text-muted-foreground">
                Поможем подобрать оптимальное решение для вашего снегохода
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="tel:+79828202197"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors whitespace-nowrap"
              >
                <Icon name="Phone" size={18} />
                Позвонить
              </a>
              <a
                href="https://t.me/lifanburan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0088cc] text-white rounded-lg hover:bg-[#0077b5] transition-colors whitespace-nowrap"
              >
                <Icon name="Send" size={18} />
                Telegram
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CatalogContactCard;
