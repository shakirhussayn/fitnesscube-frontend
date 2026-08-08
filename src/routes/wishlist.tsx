import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { useCatalog } from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/wishlist")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Wishlist — FitnessCube" },
      { name: "description", content: "Every piece of kit you've saved for later at FitnessCube." },
      { property: "og:title", content: "Wishlist — FitnessCube" },
      { property: "og:description", content: "Your saved FitnessCube products." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Wishlist,
});

function Wishlist() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [slugs, setSlugs] = useState<string[]>([]);
  const [fetching, setFetching] = useState(true);
  const catalog = useCatalog();

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth", replace: true });
  }, [loading, user, navigate]);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("wishlist_items")
      .select("product_slug")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setSlugs((data ?? []).map((r) => r.product_slug));
        setFetching(false);
      });
  }, [user]);

  const removeItem = async (slug: string) => {
    if (!user) return;
    const { error } = await supabase
      .from("wishlist_items")
      .delete()
      .eq("user_id", user.id)
      .eq("product_slug", slug);
    if (error) {
      toast.error(error.message);
      return;
    }
    setSlugs((s) => s.filter((x) => x !== slug));
    toast.success("Removed from wishlist");
  };

  if (loading || !user || fetching) {
    return <div className="mx-auto max-w-7xl px-4 py-20 text-sm text-muted-foreground">Loading…</div>;
  }

  const items = slugs
    .map((s) => catalog.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-4xl">Wishlist</h1>

      {items.length === 0 ? (
        <div className="mt-8 border border-border p-12 text-center">
          <p className="text-muted-foreground">Nothing saved yet.</p>
          <Link
            to="/shop"
            search={{ q: undefined, category: undefined, min: undefined, max: undefined, sort: "featured" }}
            className="mt-6 inline-block bg-primary px-6 py-3 text-sm font-bold uppercase tracking-widest text-primary-foreground"
          >
            Browse products
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((p) => (
            <div key={p.slug} className="relative">
              <ProductCard product={p} />
              <button
                type="button"
                onClick={() => removeItem(p.slug)}
                className="absolute right-2 top-2 grid h-9 w-9 place-items-center bg-background/80 hover:text-destructive"
                aria-label={`Remove ${p.name} from wishlist`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
