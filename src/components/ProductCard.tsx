import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

interface ProductSpec {
  label: string;
  value: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  power: string;
  volume: string;
  image: string;
  specs: {
    basic: ProductSpec[];
    electrical: ProductSpec[];
    physical: ProductSpec[];
  };
  compatibility: string[];
  complectation: string[];
}

interface ProductCardProps {
  product: Product;
  addToCart: () => void;
}

const ProductCard = ({ product, addToCart }: ProductCardProps) => {
  return (
    <Card className="max-w-6xl mx-auto overflow-hidden">
      <div className="grid md:grid-cols-2 gap-6 p-6">
        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden bg-muted">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="aspect-square rounded overflow-hidden bg-muted border border-border">
                <img src={i === 1 ? 'https://cdn.poehali.dev/files/700d9be4-3169-41d9-825e-811c040aa808.png' : product.image} alt="" className="w-full h-full object-cover opacity-60" />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <Badge className="mb-2 bg-primary text-primary-foreground">В наличии</Badge>
            <h3 className="text-3xl font-bold mb-2">{product.name}</h3>
            <p className="text-muted-foreground">Профессиональный двигатель для снегоходов</p>
          </div>

          <div className="flex items-baseline gap-4">
            <span className="text-4xl font-bold text-primary">69990
</span>
          </div>

          <div className="flex gap-4">
            <div className="flex-1 bg-muted rounded-lg p-4 text-center">
              <Icon name="Gauge" className="mx-auto mb-2 text-primary" size={24} />
              <div className="font-bold">{product.power}</div>
              <div className="text-sm text-muted-foreground">Мощность</div>
            </div>
            <div className="flex-1 bg-muted rounded-lg p-4 text-center">
              <Icon name="Box" className="mx-auto mb-2 text-primary" size={24} />
              <div className="font-bold">{product.volume}</div>
              <div className="text-sm text-muted-foreground">Объём</div>
            </div>
          </div>

          <Button size="lg" className="w-full" onClick={addToCart}>
            <Icon name="ShoppingCart" className="mr-2" size={20} />
            Добавить в корзину
          </Button>

          <Separator />

          <div>
            <h4 className="font-bold mb-3 flex items-center gap-2">
              <Icon name="CheckCircle2" className="text-primary" size={20} />
              Совместимость
            </h4>
            <div className="flex flex-wrap gap-2">
              {product.compatibility.map(item => (
                <Badge key={item} variant="outline">{item}</Badge>
              ))}
            </div>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="specs">
              <AccordionTrigger>Технические характеристики</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div>
                    <h5 className="font-medium mb-2">Основные параметры</h5>
                    <div className="space-y-2 text-sm">
                      {product.specs.basic.map(spec => (
                        <div key={spec.label} className="flex justify-between">
                          <span className="text-muted-foreground">{spec.label}:</span>
                          <span className="font-medium">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h5 className="font-medium mb-2">Электрическая система</h5>
                    <div className="space-y-2 text-sm">
                      {product.specs.electrical.map(spec => (
                        <div key={spec.label} className="flex justify-between">
                          <span className="text-muted-foreground">{spec.label}:</span>
                          <span className="font-medium">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h5 className="font-medium mb-2">Физические параметры</h5>
                    <div className="space-y-2 text-sm">
                      {product.specs.physical.map(spec => (
                        <div key={spec.label} className="flex justify-between">
                          <span className="text-muted-foreground">{spec.label}:</span>
                          <span className="font-medium">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="complectation">
              <AccordionTrigger>Комплектация</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 text-sm">
                  {product.complectation.map(item => (
                    <li key={item} className="flex gap-2">
                      <Icon name="Check" className="text-primary flex-shrink-0" size={16} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;