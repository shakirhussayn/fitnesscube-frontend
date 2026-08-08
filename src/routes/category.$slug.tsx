import { useMemo, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getCategory } from "@/data/products";
import { useCatalog } from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";
import { PriceRange, SortSelect, sortProducts, type SortOption } from "@/components/ProductFilters";

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }) => {
    const category = getCategory(params.slug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Category not found — FitnessCube" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.category.name} — FitnessCube Pakistan`;
    const description = `${loaderData.category.blurb}. Shop ${loaderData.category.name.toLowerCase()} online in Pakistan with delivery and installation.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const catalog = useCatalog();
  const all = useMemo(() => catalog.filter((p) => p.category === category.slug), [catalog, category.slug]);
  const subcategories = useMemo(() => [...new Set(all.map((p) => p.subcategory))], [all]);

  const [sub, setSub] = useState<string | null>(null);
  const [sort, setSort] = useState<SortOption>("featured");
  const [range, setRange] = useState<{ min?: number; max?: number }>({});

  const list = useMemo(() => {
    let filtered = all.filter((p) => (sub ? p.subcategory === sub : true));
    if (range.min !== undefined && !isNaN(range.min)) {
      filtered = filtered.filter((p) => p.price >= range.min!);
    }
    if (range.max !== undefined && !isNaN(range.max)) {
      filtered = filtered.filter((p) => p.price <= range.max!);
    }
    return sortProducts(filtered, sort);
  }, [all, sub, sort, range]);

  return (
    <div>
      <div className="relative isolate overflow-hidden border-b border-border">
        <img src={category.image} alt={category.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-background/80" />
        <div className="relative mx-auto max-w-7xl px-4 py-16">
          <nav className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">
            <Link to="/" className="hover:text-primary">
              Home
            </Link>
            <span className="px-2">/</span>
            <span>{category.name}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl">{category.name}</h1>
          <p className="mt-2 text-muted-foreground">{category.blurb}</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
          <aside className="space-y-8">
            <div>
              <h2 className="mb-3 text-sm tracking-widest">Type</h2>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={() => setSub(null)}
                    className={!sub ? "text-primary" : "text-muted-foreground hover:text-foreground"}
                  >
                    All {category.name.toLowerCase()}
                  </button>
                </li>
                {subcategories.map((s) => (
                  <li key={s}>
                    <button
                      onClick={() => setSub(s)}
                      className={sub === s ? "text-primary" : "text-muted-foreground hover:text-foreground"}
                    >
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <PriceRange min={range.min} max={range.max} onChange={setRange} />

            <Link
              to="/shop"
              search={{ q: undefined, category: category.slug, min: undefined, max: undefined, sort: "featured" }}
              className="inline-block border border-border px-3 py-2 text-xs uppercase tracking-widest hover:border-primary hover:text-primary"
            >
              Search this category
            </Link>
          </aside>

          <div>
            <div className="mb-4 flex items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">{list.length} products</p>
              <SortSelect value={sort} onChange={setSort} />
            </div>

            {list.length === 0 ? (
              <p className="border border-border p-10 text-center text-sm text-muted-foreground">
                No products match your filters.
              </p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {list.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
