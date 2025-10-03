import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const RosaryTracker = () => {
  const [inputValue, setInputValue] = useState('');
  const [totalRosaries, setTotalRosaries] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Load shared total from database and subscribe to updates
  useEffect(() => {
    const loadInitialData = async () => {
      const { data, error } = await supabase
        .from('prayer_counters')
        .select('total_value')
        .eq('counter_type', 'rosary_count')
        .single();
      
      if (data && !error) {
        setTotalRosaries(Number(data.total_value));
      }
    };

    loadInitialData();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'prayer_counters',
          filter: 'counter_type=eq.rosary_count'
        },
        (payload) => {
          if (payload.new) {
            setTotalRosaries(Number(payload.new.total_value));
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

    setIsAnimating(true);
    
    try {
      const { error } = await supabase
        .from('prayer_counters')
        .update({ 
          total_value: totalRosaries + value 
        })
        .eq('counter_type', 'rosary_count');

      if (!error) {
        setInputValue('');
      }
    } catch (error) {
      console.error('Error updating rosary count:', error);
    }

    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  return (
    <Card className="bg-gradient-card border-prayer-soft shadow-card hover-glow w-full">
      <CardHeader className="text-center pb-3 md:pb-4 px-4 md:px-6">
        <CardTitle className="flex items-center justify-center gap-2 md:gap-3 text-xl md:text-2xl text-prayer-secondary">
          <Heart className="w-6 h-6 md:w-8 md:h-8" />
          Rosary Count
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4 md:space-y-6 px-4 md:px-6">
        <div className="text-center">
          <div className={`text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-2 ${isAnimating ? 'counting-up' : ''}`}>
            {totalRosaries}
          </div>
          <p className="text-sm md:text-base text-muted-foreground">
            Rosarie{totalRosaries !== 1 ? 's' : ''} prayed
          </p>
        </div>

        <div className="space-y-3 md:space-y-4">
          <Input
            type="number"
            placeholder="Number of rosaries"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="bg-prayer-soft border-prayer-soft text-foreground placeholder:text-muted-foreground text-base md:text-lg py-4 md:py-6"
            min="1"
            step="1"
          />

          <Button 
            onClick={handleAdd}
            disabled={!inputValue || parseInt(inputValue, 10) <= 0}
            className="w-full bg-gradient-primary hover:shadow-glow hover:scale-105 transition-all duration-300 text-base md:text-lg py-4 md:py-6 font-semibold"
          >
            <Plus className="w-4 h-4 md:w-5 md:h-5 mr-2" />
            Add Rosaries
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RosaryTracker;