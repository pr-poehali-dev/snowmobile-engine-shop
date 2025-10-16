import Icon from '@/components/ui/icon';

const FloatingCallButton = () => {
  return (
    <a
      href="tel:+79828202197"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center group md:hidden"
      aria-label="Позвонить"
    >
      <Icon name="Phone" size={24} className="group-hover:animate-pulse" />
    </a>
  );
};

export default FloatingCallButton;
