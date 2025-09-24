import { useEffect, useState } from 'react';
import jyLogo from '@/assets/jy-logo.png';

const PrayerHeader = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <header className="py-8 md:py-16 px-4 md:px-6">
      <div 
        className={`transition-all duration-1200 ease-out ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        {/* JY Logo at the left */}
        <div className="flex justify-start mb-6 md:mb-8">
          <div className="flex items-center justify-center">
            <img 
              src={jyLogo} 
              alt="Jesus Youth Logo" 
              className="w-10 h-10 md:w-12 md:h-12 object-contain"
            />
          </div>
        </div>
        <div className="text-center">
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4 md:mb-6">
          Veritas'25
        </h1>
        
        <div 
          className={`transition-all duration-1200 ease-out delay-300 ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-lg sm:text-xl md:text-2xl text-prayer-accent italic mb-3 md:mb-4 font-light px-2">
            "And you will know the truth, and the truth will set you free"
          </p>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 px-2">
            — John 8:32
          </p>
        </div>

        <div 
          className={`transition-all duration-1200 ease-out delay-600 ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl text-foreground font-medium px-2">
            Let's Intercede Together for Veritas'25
          </h2>
        </div>
        </div>
      </div>
    </header>
  );
};

export default PrayerHeader;