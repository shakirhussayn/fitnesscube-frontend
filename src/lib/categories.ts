import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { categories as staticCategories } from '@/data/products';

export type CategoryRow = {
  id: string;
  slug: string;
  name: string;
  blurb: string | null;
  image_url: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
};

export const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

export async function fetchCategories(): Promise<CategoryRow[]> {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('sort_order');

    if (error) {
      console.warn('Error fetching categories from Supabase, falling back to static data:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.log('Falling back to static categories');
    // Map static categories to match CategoryRow structure
    return staticCategories.map((c: any, index: number) => ({
      id: c.slug || `static-${index}`,
      slug: c.slug || slugify(c.name || ''),
      name: c.name || '',
      blurb: c.blurb || null,
      image_url: c.image_url || null,
      sort_order: index * 10,
      is_active: true,
      created_at: new Date().toISOString(),
    })) as CategoryRow[];
  }
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });
}
