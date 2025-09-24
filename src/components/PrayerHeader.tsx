import { useEffect, useState } from 'react';
import jyLogo from '@/assets/jy-logo.png';

const PrayerHeader = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <header className="text-center py-16 px-6">
      <div 
        className={`transition-all duration-1200 ease-out ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        {/* JY Logo at the beginning */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center">
            <img 
              src={jyLogo} 
              alt="Jesus Youth Logo" 
              className="w-12 h-12 object-contain"
            />
          </div>
        </div>
        <h1 className="text-7xl md:text-8xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
          Veritas'25
        </h1>
        
        <div 
          className={`transition-all duration-1200 ease-out delay-300 ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-xl md:text-2xl text-prayer-accent italic mb-4 font-light">
            "And you will know the truth, and the truth will set you free"
          </p>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
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
          <h2 className="text-2xl md:text-3xl text-foreground font-medium">
            Let's Intercede Together for Veritas'25
          </h2>
        </div>
      </div>
    </header>
  );
};

export default PrayerHeader;