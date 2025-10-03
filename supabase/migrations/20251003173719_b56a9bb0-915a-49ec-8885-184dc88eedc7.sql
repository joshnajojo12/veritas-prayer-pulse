-- Reset prayer counters to 0
UPDATE prayer_counters 
SET total_value = 0 
WHERE counter_type IN ('rosary_count', 'adoration_minutes');