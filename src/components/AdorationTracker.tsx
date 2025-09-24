import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Plus } from 'lucide-react';

const AdorationTracker = () => {
  const [inputValue, setInputValue] = useState('');
  const [unit, setUnit] = useState('hours');
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('adoration-minutes');
    if (saved) {
      setTotalMinutes(parseInt(saved, 10));
    }
  }, []);

  // Save to localStorage when total changes
  useEffect(() => {
    localStorage.setItem('adoration-minutes', totalMinutes.toString());
  }, [totalMinutes]);

  const handleAdd = () => {
    const value = parseInt(inputValue, 10);
    if (isNaN(value) || value <= 0) return;

    setIsAnimating(true);
    const minutesToAdd = unit === 'hours' ? value * 60 : value;
    
    setTimeout(() => {
      setTotalMinutes(prev => prev + minutesToAdd);
      setInputValue('');
      setIsAnimating(false);
    }, 200);
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours === 0) return `${mins} minutes`;
    if (mins === 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
    return `${hours}h ${mins}m`;
  };

  return (
    <Card className="bg-gradient-card border-prayer-soft shadow-card hover-glow">
      <CardHeader className="text-center pb-4">
        <CardTitle className="flex items-center justify-center gap-3 text-2xl text-prayer-accent">
          <Clock className="w-8 h-8" />
          Adoration Hours
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className={`text-5xl font-bold text-primary mb-2 ${isAnimating ? 'counting-up' : ''}`}>
            {formatTime(totalMinutes)}
          </div>
          <p className="text-muted-foreground">Total time in adoration</p>
        </div>

        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Enter amount"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="bg-prayer-soft border-prayer-soft text-foreground placeholder:text-muted-foreground"
              min="1"
              step="1"
            />
            <Select value={unit} onValueChange={setUnit}>
              <SelectTrigger className="w-32 bg-prayer-soft border-prayer-soft">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hours">Hours</SelectItem>
                <SelectItem value="minutes">Minutes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={handleAdd}
            disabled={!inputValue || parseInt(inputValue, 10) <= 0}
            className="w-full bg-gradient-primary hover:shadow-glow hover:scale-105 transition-all duration-300 text-lg py-6 font-semibold"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Time
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdorationTracker;