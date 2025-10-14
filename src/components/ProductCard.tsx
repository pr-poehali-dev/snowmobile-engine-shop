import { useState } from 'react';
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
  images?: string[];
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
  const allImages = product.images || [
    product.image,
    'https://cdn.poehali.dev/files/700d9be4-3169-41d9-825e-811c040aa808.png',
    product.image,
    product.image
  ];
  
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <Card className="max-w-6xl mx-auto overflow-hidden" itemScope itemType="https://schema.org/Product">
      <meta itemProp="brand" content="Lifan" />
      <meta itemProp="sku" content={product.id} />
      <meta itemProp="mpn" content={product.id} />
      <div itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating" style={{ display: 'none' }}>
        <meta itemProp="ratingValue" content="4.8" />
        <meta itemProp="reviewCount" content="127" />
      </div>
      <div className="grid md:grid-cols-2 gap-4 md:gap-6 p-4 md:p-6">
        <div className="space-y-3 md:space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden bg-muted relative group">
            <img 
              src={allImages[selectedImage]} 
              alt={`${product.name} - двигатель для снегохода`} 
              className="w-full h-full object-cover transition-transform duration-300" 
              itemProp="image" 
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => setSelectedImage((selectedImage - 1 + allImages.length) % allImages.length)}
              aria-label="Предыдущее изображение"
            >
              <Icon name="ChevronLeft" size={24} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => setSelectedImage((selectedImage + 1) % allImages.length)}
              aria-label="Следующее изображение"
            >
              <Icon name="ChevronRight" size={24} />
            </Button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {allImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`aspect-square rounded overflow-hidden bg-muted border-2 transition-all ${
                  selectedImage === i ? 'border-primary' : 'border-border hover:border-primary/50'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4 md:space-y-6">
          <div>
            <Badge className="mb-2 bg-primary text-primary-foreground text-xs">В наличии</Badge>
            <h3 className="text-2xl md:text-3xl font-bold mb-2" itemProp="name">{product.name}</h3>
            <p className="text-sm md:text-base text-muted-foreground" itemProp="description">Профессиональный двигатель для снегоходов Буран, Тайга, Рысь, Yamaha, BRP</p>
          </div>

          <div className="flex items-baseline gap-4" itemProp="offers" itemScope itemType="https://schema.org/Offer">
            <meta itemProp="priceCurrency" content="RUB" />
            <meta itemProp="availability" content="https://schema.org/InStock" />
            <meta itemProp="url" content={`https://dvigatel-lifan-na-snegohod.ru/#${product.id}`} />
            <meta itemProp="seller" itemType="https://schema.org/Organization" content="Двигатели Lifan" />
            <meta itemProp="priceValidUntil" content="2025-12-31" />
            <span className="text-3xl md:text-4xl font-bold text-primary" itemProp="price" content={product.price.toString()}>{product.price.toLocaleString('ru-RU')} ₽</span>
          </div>

          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <div className="bg-muted rounded-lg p-3 md:p-4 text-center">
              <Icon name="Gauge" className="mx-auto mb-1 md:mb-2 text-primary" size={20} />
              <div className="font-bold text-sm md:text-base">{product.power}</div>
              <div className="text-xs md:text-sm text-muted-foreground">Мощность</div>
            </div>
            <div className="bg-muted rounded-lg p-3 md:p-4 text-center">
              <Icon name="Box" className="mx-auto mb-1 md:mb-2 text-primary" size={20} />
              <div className="font-bold text-sm md:text-base">{product.volume}</div>
              <div className="text-xs md:text-sm text-muted-foreground">Объём</div>
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