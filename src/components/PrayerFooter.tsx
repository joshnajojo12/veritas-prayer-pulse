import { useEffect, useState } from 'react';
import jyLogo from '@/assets/jy-logo.png';

const PrayerFooter = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <footer className="mt-12 md:mt-20 py-8 md:py-12 px-4 md:px-6 text-center">
      <div 
        className={`transition-all duration-1000 ease-out ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="flex items-center justify-center gap-3 md:gap-4 mb-3 md:mb-4">
          <div className="flex items-center justify-center">
            <img 
              src={jyLogo} 
              alt="Jesus Youth Logo" 
              className="w-6 h-6 md:w-8 md:h-8 object-contain"
            />
          </div>
          <div className="text-xl md:text-2xl font-bold text-primary">
            Veritas'25
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm">
          Jesus Youth Pala
        </p>
      </div>
    </footer>
  );
};

export default PrayerFooter;