import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Icon from '@/components/ui/icon';
import AddressAutocomplete from '@/components/AddressAutocomplete';
import InputMask from 'react-input-mask';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderFormProps {
  cartItems: CartItem[];
  totalPrice: number;
  totalItems: number;
  onBack: () => void;
  onSuccess: () => void;
}

const russianCities = [
  'Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Казань',
  'Нижний Новгород', 'Челябинск', 'Самара', 'Омск', 'Ростов-на-Дону',
  'Уфа', 'Красноярск', 'Воронеж', 'Пермь', 'Волгоград',
  'Краснодар', 'Саратов', 'Тюмень', 'Тольятти', 'Ижевск',
  'Барнаул', 'Ульяновск', 'Иркутск', 'Хабаровск', 'Ярославль',
  'Владивосток', 'Махачкала', 'Томск', 'Оренбург', 'Кемерово',
  'Новокузнецк', 'Рязань', 'Астрахань', 'Набережные Челны', 'Пенза',
  'Липецк', 'Тула', 'Киров', 'Чебоксары', 'Калининград',
  'Брянск', 'Курск', 'Иваново', 'Магнитогорск', 'Тверь',
  'Ставрополь', 'Нижний Тагил', 'Белгород', 'Архангельск', 'Владимир',
  'Сочи', 'Курган', 'Смоленск', 'Калуга', 'Чита',
  'Орёл', 'Волжский', 'Череповец', 'Владикавказ', 'Мурманск',
  'Сургут', 'Вологда', 'Саранск', 'Тамбов', 'Стерлитамак',
  'Грозный', 'Якутск', 'Кострома', 'Комсомольск-на-Амуре', 'Петрозаводск',
  'Нижневартовск', 'Новороссийск', 'Йошкар-Ола', 'Химки', 'Таганрог'
];

const OrderForm = ({ cartItems, totalPrice, totalItems, onBack, onSuccess }: OrderFormProps) => {
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openCityPopover, setOpenCityPopover] = useState(false);
  const [cityDetected, setCityDetected] = useState(false);
  const [dadataToken, setDadataToken] = useState('');

  useEffect(() => {
    fetch('https://functions.poehali.dev/a68422b0-053a-4ce5-ae24-75cb2e280ea8/secrets/DADATA_API_KEY')
      .then(res => res.json())
      .then(data => {
        if (data.value) {
          setDadataToken(data.value);
        }
      })
      .catch(err => console.log('DaData token fetch failed:', err));
  }, []);

  useEffect(() => {
    const detectCity = async () => {
      try {
        const response = await fetch('https://functions.poehali.dev/a68422b0-053a-4ce5-ae24-75cb2e280ea8');
        const data = await response.json();
        if (data.city && !city && !cityDetected) {
          setCity(data.city);
          setCityDetected(true);
        }
      } catch (error) {
        console.log('City detection failed:', error);
      }
    };
    
    if (!cityDetected) {
      detectCity();
    }
  }, [city, cityDetected]);

  const filteredCities = city
    ? russianCities.filter(c => c.toLowerCase().includes(city.toLowerCase()))
    : russianCities;

  const phoneDigits = phone.replace(/\D/g, '');
  const isPhoneValid = phoneDigits.length === 11;
  const isCityValid = russianCities.includes(city);
  const isFormValid = isPhoneValid && isCityValid;

  const handleSubmitOrder = async () => {
    if (!isFormValid || isSubmitting) return;
    
    setIsSubmitting(true);

    try {
      const response = await fetch('https://functions.poehali.dev/14166080-7df3-43be-8985-e12ee3235156', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: fullName || 'Не указано',
          phone,
          city,
          address,
          comment,
          items: cartItems,
          totalPrice,
          totalItems
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        if (typeof window !== 'undefined' && (window as any).ym) {
          (window as any).ym(104609660, 'reachGoal', 'order_success', {
            order_id: data.orderNumber,
            order_price: totalPrice,
            order_items: totalItems,
            city: city
          });
        }
        
        alert(`✅ Заказ успешно оформлен!\n\nНомер заказа: ${data.orderNumber}\n\nМы свяжемся с вами по телефону: ${phone}`);
        onSuccess();
      } else {
        alert('❌ Ошибка при отправке заявки. Попробуйте позже или свяжитесь с нами по телефону.');
      }
    } catch (error) {
      console.error('Order submission error:', error);
      alert('❌ Ошибка при отправке заявки. Проверьте интернет-соединение.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-left-5 duration-500">
      <div className="flex justify-between text-lg font-bold mb-4">
        <span>Итого:</span>
        <span>{totalPrice.toLocaleString('ru-RU')} ₽</span>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2 animate-in fade-in slide-in-from-bottom-3 duration-300 delay-100">
          <Label htmlFor="phone">
            Телефон <span className="text-destructive">*</span>
          </Label>
          <InputMask
            mask="+7 (999) 999-99-99"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            maskChar="_"
          >
            {(inputProps: any) => (
              <Input
                {...inputProps}
                id="phone"
                type="tel"
                placeholder="+7 (___) ___-__-__"
                required
                className={phone.length > 0 && !isPhoneValid ? 'border-destructive' : ''}
              />
            )}
          </InputMask>
          {phone.length > 0 && !isPhoneValid && (
            <p className="text-xs text-destructive animate-in fade-in slide-in-from-top-1 duration-200">Введите полный номер телефона</p>
          )}
        </div>

        <div className="space-y-2 animate-in fade-in slide-in-from-bottom-3 duration-300 delay-200">
          <Label htmlFor="city">
            Город получения <span className="text-destructive">*</span>
          </Label>
          <Popover open={openCityPopover} onOpenChange={setOpenCityPopover}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openCityPopover}
                className={`w-full justify-between font-normal ${city && !isCityValid ? 'border-destructive' : ''}`}
              >
                {city || "Выберите город"}
                <Icon name="ChevronsUpDown" size={16} className="ml-2 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
              <Command>
                <CommandInput 
                  placeholder="Поиск города..." 
                  value={city}
                  onValueChange={setCity}
                />
                <CommandList>
                  <CommandEmpty>Город не найден</CommandEmpty>
                  <CommandGroup>
                    {filteredCities.slice(0, 50).map((cityName) => (
                      <CommandItem
                        key={cityName}
                        value={cityName}
                        onSelect={(currentValue) => {
                          setCity(currentValue);
                          setOpenCityPopover(false);
                        }}
                      >
                        <Icon
                          name="Check"
                          size={16}
                          className={city === cityName ? "mr-2 opacity-100" : "mr-2 opacity-0"}
                        />
                        {cityName}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {city && !isCityValid && (
            <p className="text-xs text-destructive animate-in fade-in slide-in-from-top-1 duration-200">Выберите город из списка</p>
          )}
        </div>

        <div className="space-y-2 animate-in fade-in slide-in-from-bottom-3 duration-300 delay-300">
          <Label htmlFor="fullName">ФИО (опционально)</Label>
          <Input
            id="fullName"
            type="text"
            placeholder="Иванов Иван Иванович"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div className="space-y-2 animate-in fade-in slide-in-from-bottom-3 duration-300 delay-[400ms]">
          <Label htmlFor="address">
            Адрес доставки
          </Label>
          {dadataToken ? (
            <AddressAutocomplete
              value={address}
              onChange={setAddress}
              token={dadataToken}
            />
          ) : (
            <Input
              id="address"
              type="text"
              placeholder="Улица, дом, квартира"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          )}
        </div>

        <div className="space-y-2 animate-in fade-in slide-in-from-bottom-3 duration-300 delay-500">
          <Label htmlFor="comment">Комментарий к заказу</Label>
          <Textarea
            id="comment"
            placeholder="Укажите удобное время звонка, пожелания по доставке или другие детали..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            className="resize-none"
          />
        </div>
      </div>

      <div className="flex gap-2 animate-in fade-in slide-in-from-bottom-3 duration-300 delay-[600ms]">
        <Button
          variant="outline"
          className="flex-1"
          onClick={onBack}
          disabled={isSubmitting}
        >
          Назад
        </Button>
        <Button
          className="flex-1"
          onClick={handleSubmitOrder}
          disabled={!isFormValid || isSubmitting}
        >
          {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
        </Button>
      </div>
    </div>
  );
};

export default OrderForm;