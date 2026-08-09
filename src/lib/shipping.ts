import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export type ShippingRule = {
  id: string;
  city_pattern: string;
  rate: number;
  free_above: number;
  is_remote: boolean;
  sort_order: number;
  created_at: string;
};

export const DEFAULT_SHIPPING_RULES: ShippingRule[] = [
  { id: '1', city_pattern: 'karachi',    rate: 0,    free_above: 0,     is_remote: false, sort_order: 1,  created_at: '' },
  { id: '2', city_pattern: 'lahore',     rate: 0,    free_above: 0,     is_remote: false, sort_order: 2,  created_at: '' },
  { id: '3', city_pattern: 'islamabad',  rate: 500,  free_above: 30000, is_remote: false, sort_order: 3,  created_at: '' },
  { id: '4', city_pattern: 'rawalpindi', rate: 500,  free_above: 30000, is_remote: false, sort_order: 4,  created_at: '' },
  { id: '5', city_pattern: 'default',    rate: 1500, free_above: 25000, is_remote: false, sort_order: 10, created_at: '' },
  { id: '6', city_pattern: 'remote',     rate: 2500, free_above: 50000, is_remote: true,  sort_order: 20, created_at: '' },
];

export function useShippingRules() {
  return useQuery({
    queryKey: ['shipping-rules'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('shipping_rules')
          .select('*')
          .order('sort_order');
        if (error) throw error;
        return (data ?? DEFAULT_SHIPPING_RULES) as ShippingRule[];
      } catch {
        return DEFAULT_SHIPPING_RULES;
      }
    },
    staleTime: 60_000,
  });
}

/** Given a city string and order subtotal, returns the shipping cost in PKR */
export function calcShipping(city: string, subtotal: number, rules: ShippingRule[]): number {
  const lower = city.trim().toLowerCase();
  const match =
    rules.find((r) => r.city_pattern !== 'default' && r.city_pattern !== 'remote' && lower.includes(r.city_pattern)) ??
    rules.find((r) => r.city_pattern === 'default');
  if (!match) return 1500;
  return subtotal >= match.free_above && match.free_above > 0 ? 0 : match.rate;
}
