import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const AdorationTracker = () => {
  const [inputValue, setInputValue] = useState('');
  const [unit, setUnit] = useState('hours');
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Load from database and set up real-time updates
  useEffect(() => {
    const fetchTotal = async () => {
      const { data } = await supabase
        .from('prayer_counters')
        .select('total_value')
        .eq('counter_type', 'adoration_minutes')
        .single();
      
      if (data) {
        setTotalMinutes(data.total_value);
      }
    };

    fetchTotal();

    // Set up real-time subscription
    const channel = supabase
      .channel('adoration-updates')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'prayer_counters',
          filter: 'counter_type=eq.adoration_minutes'
        },
        (payload) => {
          if (payload.new && typeof payload.new.total_value === 'number') {
            setTotalMinutes(payload.new.total_value);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleAdd = async () => {
    const value = parseInt(inputValue, 10);
    if (isNaN(value) || value <= 0) return;

    const minutesToAdd = unit === 'hours' ? value * 60 : value;

    setIsAnimating(true);
    
    setTimeout(async () => {
      // Update database
      const { error } = await supabase
        .from('prayer_counters')
        .update({ 
          total_value: totalMinutes + minutesToAdd 
        })
        .eq('counter_type', 'adoration_minutes');

      if (error) {
        console.error('Error updating adoration count:', error);
      }

      setInputValue('');
      setUnit('hours');
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