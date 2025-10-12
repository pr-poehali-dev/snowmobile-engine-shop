import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface ProductFiltersProps {
  priceRange: [number, number];
  powerRange: [number, number];
  onPriceChange: (value: [number, number]) => void;
  onPowerChange: (value: [number, number]) => void;
  onReset: () => void;
  minPrice: number;
  maxPrice: number;
  minPower: number;
  maxPower: number;
  resultsCount: number;
}

const ProductFilters = ({
  priceRange,
  powerRange,
  onPriceChange,
  onPowerChange,
  onReset,
  minPrice,
  maxPrice,
  minPower,
  maxPower,
  resultsCount,
}: ProductFiltersProps) => {
  return (
    <Card className="sticky top-20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Icon name="SlidersHorizontal" size={20} />
            Фильтры
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onReset}>
            <Icon name="RotateCcw" size={16} className="mr-2" />
            Сбросить
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Цена</Label>
            <Badge variant="secondary">
              {priceRange[0].toLocaleString('ru-RU')} - {priceRange[1].toLocaleString('ru-RU')} ₽
            </Badge>
          </div>
          <Slider
            min={minPrice}
            max={maxPrice}
            step={1000}
            value={priceRange}
            onValueChange={onPriceChange}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{minPrice.toLocaleString('ru-RU')} ₽</span>
            <span>{maxPrice.toLocaleString('ru-RU')} ₽</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Мощность</Label>
            <Badge variant="secondary">
              {powerRange[0]} - {powerRange[1]} л.с.
            </Badge>
          </div>
          <Slider
            min={minPower}
            max={maxPower}
            step={1}
            value={powerRange}
            onValueChange={onPowerChange}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{minPower} л.с.</span>
            <span>{maxPower} л.с.</span>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Найдено товаров:</span>
            <Badge className="bg-primary text-primary-foreground">{resultsCount}</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductFilters;
