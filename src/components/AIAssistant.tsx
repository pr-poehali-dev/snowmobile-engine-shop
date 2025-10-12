import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, isMobile]);

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="lg"
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-2xl hover:scale-110 transition-transform animate-pulse"
        aria-label="Открыть ИИ помощника"
      >
        <Icon name={isOpen ? 'X' : 'MessageCircle'} size={24} />
      </Button>

      {isOpen && (
        <>
          {isMobile && (
            <div 
              className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
          )}
          
          <div className={`
            fixed z-50 shadow-2xl overflow-hidden bg-background border border-border
            ${isMobile 
              ? 'inset-4 rounded-xl' 
              : 'bottom-24 right-6 w-[95vw] max-w-md h-[600px] rounded-lg'
            }
          `}>
            <div className="flex items-center justify-between p-4 border-b border-border bg-muted">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center relative">
                  <Icon name="Bot" size={18} className="text-primary-foreground" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-muted"></span>
                </div>
                <div>
                  <h3 className="font-semibold text-sm">ИИ Консультант</h3>
                  <p className="text-xs text-muted-foreground">Онлайн</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8"
              >
                <Icon name="X" size={18} />
              </Button>
            </div>
            <iframe
              allow="microphone;autoplay"
              style={{ width: '100%', height: 'calc(100% - 65px)', border: 'none' }}
              src="https://functions.pro-talk.ru/api/v1.0/chatgpt_widget_dialog_api?record_id=recPKZytaWzLujgNQ&promt_id=40480&lang=ru&fullscreen=0&voice=1&file=1&circle=1"
              title="ИИ консультант"
            />
          </div>
        </>
      )}
    </>
  );
};

export default AIAssistant;