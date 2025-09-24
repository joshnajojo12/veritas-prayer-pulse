import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Plus } from 'lucide-react';

const RosaryTracker = () => {
  const [inputValue, setInputValue] = useState('');
  const [totalRosaries, setTotalRosaries] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('rosary-count');
    if (saved) {
      setTotalRosaries(parseInt(saved, 10));
    }
  }, []);

  // Save to localStorage when total changes
  useEffect(() => {
    localStorage.setItem('rosary-count', totalRosaries.toString());
  }, [totalRosaries]);

  const handleAdd = () => {
    const value = parseInt(inputValue, 10);
    if (isNaN(value) || value <= 0) return;

    setIsAnimating(true);
    
    setTimeout(() => {
      setTotalRosaries(prev => prev + value);
      setInputValue('');
      setIsAnimating(false);
    }, 200);
  };

  return (
    <Card className="bg-gradient-card border-prayer-soft shadow-card hover-glow">
      <CardHeader className="text-center pb-4">
        <CardTitle className="flex items-center justify-center gap-3 text-2xl text-prayer-secondary">
          <Heart className="w-8 h-8" />
          Rosary Count
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className={`text-5xl font-bold text-primary mb-2 ${isAnimating ? 'counting-up' : ''}`}>
            {totalRosaries}
          </div>
          <p className="text-muted-foreground">
            Rosarie{totalRosaries !== 1 ? 's' : ''} prayed
          </p>
        </div>

        <div className="space-y-4">
          <Input
            type="number"
            placeholder="Number of rosaries"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="bg-prayer-soft border-prayer-soft text-foreground placeholder:text-muted-foreground text-lg py-6"
            min="1"
            step="1"
          />

          <Button 
            onClick={handleAdd}
            disabled={!inputValue || parseInt(inputValue, 10) <= 0}
            className="w-full bg-gradient-primary hover:shadow-glow hover:scale-105 transition-all duration-300 text-lg py-6 font-semibold"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Rosaries
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RosaryTracker;