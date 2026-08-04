import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { products as fallbackProducts, type Product } from "@/data/products";
import treadmill from "@/assets/p-treadmill.jpg";
import elliptical from "@/assets/p-elliptical.jpg";
import bike from "@/assets/p-bike.jpg";
import bench from "@/assets/p-bench.jpg";
import multigym from "@/assets/p-multigym.jpg";
import dumbbells from "@/assets/p-dumbbells.jpg";
import plates from "@/assets/p-plates.jpg";
import yogamat from "@/assets/p-yogamat.jpg";
import trampoline from "@/assets/p-trampoline.jpg";
import bands from "@/assets/p-bands.jpg";
import kettlebell from "@/assets/p-kettlebell.jpg";
import protein from "@/assets/p-protein.jpg";

/** Bundled product photography, referenced from the database by key. */
export const productImages: Record<string, string> = {
  treadmill,
  elliptical,
  bike,
  bench,
  multigym,
  dumbbells,
  plates,
  yogamat,
  trampoline,
  bands,
  kettlebell,
  protein,
};

export const imageKeys = Object.keys(productImages);

export function imageFor(key: string | null | undefined) {
  if (!key) return treadmill;
  const trimmed = key.trim();
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("data:")) return trimmed;
  return productImages[trimmed] || treadmill;
}

export function productImagesList(key: string | null | undefined): string[] {
  if (!key) return [treadmill];
  const lines = key.split("\n").map((k) => k.trim()).filter(Boolean);
  const result: string[] = [];
  for (const line of lines) {
    if (line.startsWith("data:") || line.startsWith("http://") || line.startsWith("https://")) {
      result.push(line);
    } else if (line.includes(",")) {
      line.split(",").forEach((item) => {
        const sub = item.trim();
        if (sub) result.push(imageFor(sub));
      });
    } else {
      result.push(imageFor(line));
    }
  }
  return result.length > 0 ? result : [treadmill];
}

export type ProductRow = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  old_price: number | null;
  category: string;
  subcategory: string;
  image_key: string;
  rating: number | string;
  reviews: number;
  in_stock: boolean;
  tags: unknown;
  description: string;
  specs: unknown;
  variants: unknown;
  sort_order: number;
  is_active: boolean;
};

export type AdminProduct = Product & { id: string; imageKey: string; isActive: boolean; sortOrder: number };

export function rowToProduct(row: ProductRow): AdminProduct {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    brand: row.brand,
    price: row.price,
    ...(row.old_price != null ? { oldPrice: row.old_price } : {}),
    category: row.category,
    subcategory: row.subcategory,
    image: imageFor(row.image_key),
    imageKey: row.image_key,
    rating: Number(row.rating),
    reviews: row.reviews,
    inStock: row.in_stock,
    tags: (Array.isArray(row.tags) ? row.tags : []) as Product["tags"],
    description: row.description,
    specs: (Array.isArray(row.specs) ? row.specs : []) as string[],
    ...(row.variants ? { variants: row.variants as NonNullable<Product["variants"]> } : {}),
    isActive: row.is_active,
    sortOrder: row.sort_order,
  } as AdminProduct;
}

async function fetchCatalog(): Promise<AdminProduct[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data as unknown as ProductRow[]).map(rowToProduct);
}

/**
 * Live storefront catalogue. Renders instantly from the bundled catalogue,
 * then swaps in whatever the shop owner has published in the admin area.
 */
export function useCatalog(): Product[] {
  const { data } = useQuery({
    queryKey: ["catalog"],
    queryFn: fetchCatalog,
    initialData: fallbackProducts as unknown as AdminProduct[],
    initialDataUpdatedAt: 0,
    staleTime: 60_000,
  });
  return data;
}

export function useCatalogProduct(slug: string): Product | undefined {
  return useCatalog().find((p) => p.slug === slug);
}

export function useProductsByTag(tag: Product["tags"][number]): Product[] {
  return useCatalog().filter((p) => p.tags.includes(tag));
}
