import { useMemo, useState, useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { categories } from "@/data/products";
import { useCatalog } from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";
import { PriceRange, SortSelect, sortProducts, type SortOption } from "@/components/ProductFilters";

const PRICE_BOUND = 250000;

type ShopSearch = {
  q: string | undefined;
  category: string | undefined;
  min: number;
  max: number;
  sort: SortOption;
};

function toNumber(value: unknown, fallback: number) {
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) && n >= 0 ? n : fallback;
}

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): ShopSearch => ({
    q: typeof search["q"] === "string" && search["q"] ? search["q"] : undefined,
    category:
      typeof search["category"] === "string" && search["category"] ? search["category"] : undefined,
    min: toNumber(search["min"], 0),
    max: toNumber(search["max"], PRICE_BOUND),
    sort: typeof search["sort"] === "string" ? (search["sort"] as SortOption) : "featured",
  }),

  head: () => ({
    meta: [
      { title: "Shop All Fitness Equipment — FitnessCube Pakistan" },
      {
        name: "description",
        content:
          "Browse the full FitnessCube catalogue: treadmills, ellipticals, bikes, benches, racks, dumbbells, plates, accessories and supplements.",
      },
      { property: "og:title", content: "Shop All Fitness Equipment — FitnessCube" },
      { property: "og:description", content: "The full FitnessCube catalogue, with PKR pricing." },
    ],
  }),
  component: Shop,
});

function Shop() {
  const { q, category, min, max, sort } = Route.useSearch();
  const navigate = useNavigate({ from: "/shop" });
  const [term, setTerm] = useState(q ?? "");

  useEffect(() => {
    setTerm(q ?? "");
  }, [q]);

  const safeSort: SortOption = ["featured", "price-asc", "price-desc", "rating"].includes(sort)
    ? sort
    : "featured";

  const catalog = useCatalog();

  const results = useMemo(() => {
    let list = catalog.slice();
    if (category) list = list.filter((p) => p.category === category);
    if (q) {
      const needle = q.toLowerCase();
      list = list.filter((p) =>
        [p.name, p.brand, p.subcategory, p.description].join(" ").toLowerCase().includes(needle),
      );
    }
    const lo = Math.min(min, max);
    const hi = Math.max(min, max);
    list = list.filter((p) => p.price >= lo && p.price <= hi);
    return sortProducts(list, safeSort);
  }, [q, category, min, max, safeSort]);

  const filtersActive = Boolean(q || category) || min > 0 || max < PRICE_BOUND || safeSort !== "featured";

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-4xl">{q ? `Results for "${q}"` : "Shop all"}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{results.length} products</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[220px_1fr]">
        <aside className="space-y-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ search: (prev: ShopSearch) => ({ ...prev, q: term.trim() || undefined }) });
            }}
            className="relative"
          >
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Search products"
              aria-label="Search products"
              className="h-10 w-full border border-input bg-secondary/40 pl-9 pr-3 text-sm outline-none focus:border-primary"
            />
          </form>

          <div>
            <h2 className="mb-3 text-sm tracking-widest">Categories</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/shop"
                  search={(prev: ShopSearch) => ({ ...prev, category: undefined })}
                  className={!category ? "text-primary" : "text-muted-foreground hover:text-foreground"}
                >
                  All products
                </Link>
              </li>
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    to="/shop"
                    search={(prev: ShopSearch) => ({ ...prev, category: c.slug })}
                    className={
                      category === c.slug ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    }
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <PriceRange
            min={min}
            max={max}
            bound={PRICE_BOUND}
            onChange={(next) => navigate({ search: (prev: ShopSearch) => ({ ...prev, ...next }) })}
          />

          {filtersActive && (
            <Link
              to="/shop"
              search={{ q: undefined, category: undefined, min: 0, max: PRICE_BOUND, sort: "featured" }}
              className="inline-block border border-border px-3 py-2 text-xs uppercase tracking-widest hover:border-primary hover:text-primary"
            >
              Clear filters
            </Link>
          )}
        </aside>

        <div>
          <div className="mb-4 flex justify-end">
            <SortSelect
              value={safeSort}
              onChange={(value) => navigate({ search: (prev: ShopSearch) => ({ ...prev, sort: value }) })}
            />
          </div>

          {results.length === 0 ? (
            <p className="border border-border p-10 text-center text-sm text-muted-foreground">
              No products match your filters.
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
