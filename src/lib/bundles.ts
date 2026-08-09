import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export type ProductBundle = {
  id: string;
  main_product_slug: string;
  companion_slugs: string[];
  bundle_name: string | null;
  discount_pct: number;
  is_active: boolean;
  created_at: string;
};

export function useBundles() {
  return useQuery({
    queryKey: ['bundles'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('product_bundles')
          .select('*')
          .eq('is_active', true);
        if (error) throw error;
        return (data ?? []) as ProductBundle[];
      } catch {
        return [] as ProductBundle[];
      }
    },
    staleTime: 60_000,
  });
}

export function useAdminBundles() {
  return useQuery({
    queryKey: ['admin', 'bundles'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('product_bundles')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) throw error;
        return (data ?? []) as ProductBundle[];
      } catch {
        return [] as ProductBundle[];
      }
    },
  });
}
