import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface WarrantySectionProps {
  openAI: () => void;
}

const WarrantySection = ({ openAI }: WarrantySectionProps) => {
  return (
    <section id="warranty" className="py-12 md:py-20">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">Гарантия</h2>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground">Мы гарантируем качество нашей продукции</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
            <Card>
              <CardHeader>
                <Icon name="Shield" className="text-primary mb-2" size={32} />
                <CardTitle>Гарантия производителя</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  14 дней на проверку работоспособности двигателя
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2">
                    <Icon name="Check" className="text-primary flex-shrink-0" size={16} />
                    <span>Проверка комплектации</span>
                  </li>
                  <li className="flex gap-2">
                    <Icon name="Check" className="text-primary flex-shrink-0" size={16} />
                    <span>Тестовый запуск</span>
                  </li>
                  <li className="flex gap-2">
                    <Icon name="Check" className="text-primary flex-shrink-0" size={16} />
                    <span>Проверка технического состояния</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Icon name="RefreshCw" className="text-primary mb-2" size={32} />
                <CardTitle>Возврат и обмен</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Возможность возврата или обмена товара в течение 14 дней
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2">
                    <Icon name="Check" className="text-primary flex-shrink-0" size={16} />
                    <span>Сохранность товарного вида</span>
                  </li>
                  <li className="flex gap-2">
                    <Icon name="Check" className="text-primary flex-shrink-0" size={16} />
                    <span>Полная комплектация</span>
                  </li>
                  <li className="flex gap-2">
                    <Icon name="Check" className="text-primary flex-shrink-0" size={16} />
                    <span>Документы и упаковка</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Техническая поддержка</CardTitle>
              <CardDescription>Мы всегда на связи для решения ваших вопросов</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4">
                <Icon name="Phone" className="text-primary mt-1" size={20} />
                <div>
                  <div className="font-medium">Телефон</div>
                  <div className="text-muted-foreground">+7 (XXX) XXX-XX-XX</div>
                  <div className="text-sm text-muted-foreground">Пн-Пт: 9:00 - 18:00 МСК</div>
                </div>
              </div>
              <Separator />
              <div className="flex items-start gap-4">
                <Icon name="Mail" className="text-primary mt-1" size={20} />
                <div>
                  <div className="font-medium">Email</div>
                  <div className="text-muted-foreground">info@motodvni.ru</div>
                  <div className="text-sm text-muted-foreground">Ответим в течение 24 часов</div>
                </div>
              </div>
              <Separator />
              <button 
                onClick={openAI}
                className="flex items-start gap-4 w-full text-left hover:bg-muted/50 p-2 -m-2 rounded-lg transition-colors"
              >
                <Icon name="MessageCircle" className="text-primary mt-1" size={20} />
                <div>
                  <div className="font-medium">Онлайн-консультант</div>
                  <div className="text-muted-foreground">Чат на сайте</div>
                  <div className="text-sm text-muted-foreground">Ответим моментально в рабочее время</div>
                </div>
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default WarrantySection;