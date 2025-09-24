import { useEffect, useState } from 'react';
import jyLogo from '@/assets/jy-logo.png';

const PrayerFooter = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <footer className="mt-20 py-12 px-6 text-center">
      <div 
        className={`transition-all duration-1000 ease-out ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-white shadow-glow flex items-center justify-center">
            <img 
              src={jyLogo} 
              alt="Jesus Youth Logo" 
              className="w-8 h-8 object-contain"
            />
          </div>
          <div className="text-2xl font-bold text-primary">
            Veritas'25
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm">
          Jesus Youth • United in Prayer
        </p>
      </div>
    </footer>
  );
};

export default PrayerFooter;