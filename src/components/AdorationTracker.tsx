import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const AdorationTracker = () => {
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
    const minutesToAdd = 10;

    setIsAnimating(true);

    const { error } = await supabase
      .from('prayer_counters')
      .update({
        total_value: totalMinutes + minutesToAdd
      })
      .eq('counter_type', 'adoration_minutes');

    if (error) {
      console.error('Error updating adoration count:', error);
    }

    setTimeout(() => {
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
    <Card className="bg-gradient-card border-prayer-soft shadow-card hover-glow w-full">
      <CardHeader className="text-center pb-3 md:pb-4 px-4 md:px-6">
        <CardTitle className="flex items-center justify-center gap-2 md:gap-3 text-xl md:text-2xl text-prayer-accent">
          <Clock className="w-6 h-6 md:w-8 md:h-8" />
          Adoration Hours
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4 md:space-y-6 px-4 md:px-6">
        <div className="text-center">
          <div className={`text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-2 ${isAnimating ? 'counting-up' : ''}`}>
            {formatTime(totalMinutes)}
          </div>
          <p className="text-sm md:text-base text-muted-foreground">Total time in adoration</p>
        </div>

        <div className="space-y-3 md:space-y-4">
          <Button
            onClick={handleAdd}
            className="w-full bg-gradient-primary hover:shadow-glow hover:scale-105 transition-all duration-300 text-base md:text-lg py-4 md:py-6 font-semibold"
          >
            <Plus className="w-4 h-4 md:w-5 md:h-5 mr-2" />
            Add 10 Minutes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdorationTracker;