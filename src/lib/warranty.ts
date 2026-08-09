import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export type WarrantyRecord = {
  id: string;
  order_id: string | null;
  customer_name: string;
  customer_phone: string | null;
  product_name: string;
  serial_number: string | null;
  purchase_date: string;
  warranty_months: number;
  warranty_expiry: string | null;
  status: 'active' | 'claimed' | 'expired';
  notes: string | null;
  created_at: string;
};

export function useWarrantyRecords() {
  return useQuery({
    queryKey: ['admin', 'warranty'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('warranty_records')
          .select('*')
          .order('purchase_date', { ascending: false });
        if (error) throw error;
        return (data ?? []) as WarrantyRecord[];
      } catch {
        return [] as WarrantyRecord[];
      }
    },
  });
}
