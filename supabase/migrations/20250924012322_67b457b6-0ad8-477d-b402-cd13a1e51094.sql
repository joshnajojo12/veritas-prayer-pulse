-- Create tables for shared prayer tracking
CREATE TABLE public.prayer_counters (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  counter_type TEXT NOT NULL UNIQUE,
  total_value BIGINT NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.prayer_counters ENABLE ROW LEVEL SECURITY;

-- Create policy to allow everyone to read prayer counters (no authentication required)
CREATE POLICY "Anyone can view prayer counters" 
ON public.prayer_counters 
FOR SELECT 
USING (true);

-- Create policy to allow anyone to update prayer counters (no authentication required)
CREATE POLICY "Anyone can update prayer counters" 
ON public.prayer_counters 
FOR UPDATE 
USING (true);

-- Create policy to allow anyone to insert prayer counters (no authentication required)
CREATE POLICY "Anyone can insert prayer counters" 
ON public.prayer_counters 
FOR INSERT 
WITH CHECK (true);

-- Insert initial counter records
INSERT INTO public.prayer_counters (counter_type, total_value) VALUES 
('adoration_minutes', 0),
('rosary_count', 0);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_prayer_counters_updated_at
BEFORE UPDATE ON public.prayer_counters
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for live updates
ALTER TABLE public.prayer_counters REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.prayer_counters;