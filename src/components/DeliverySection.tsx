import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

const DeliverySection = () => {
  return (
    <section id="delivery" className="py-20 bg-muted/50">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Доставка</h2>
            <p className="text-xl text-muted-foreground">Быстрая и надёжная доставка по всей России</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <Icon name="Package" className="text-primary mb-2" size={32} />
                <CardTitle>Упаковка</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Профессиональная упаковка с защитой от повреждений при транспортировке
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Icon name="Truck" className="text-primary mb-2" size={32} />
                <CardTitle>Транспортные компании</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Работаем с СДЭК, Деловые Линии, ПЭК и другими надёжными перевозчиками
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Icon name="Clock" className="text-primary mb-2" size={32} />
                <CardTitle>Сроки доставки</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  От 3 до 14 дней в зависимости от региона. Отправка в день заказа при наличии
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Стоимость доставки</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Москва и МО</div>
                  <div className="text-sm text-muted-foreground">Курьерская служба</div>
                </div>
                <div className="font-bold">500 ₽</div>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Регионы России</div>
                  <div className="text-sm text-muted-foreground">Транспортная компания</div>
                </div>
                <div className="font-bold">от 1000 ₽</div>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Самовывоз</div>
                  <div className="text-sm text-muted-foreground">г. Москва, склад</div>
                </div>
                <div className="font-bold text-primary">Бесплатно</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DeliverySection;
