import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Heart, Minus, Plus, Truck, ShieldCheck, Wrench, Youtube, FileText, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { type Product } from "@/data/products";
import { useCatalog, productImagesList, fetchProductBySlug, FALLBACK_IMAGE } from "@/lib/catalog";
import { formatPKR } from "@/lib/format";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { Stars } from "@/components/Stars";
import { ProductCard } from "@/components/ProductCard";
import { useBundles } from "@/lib/bundles";

export const Route = createFileRoute("/product/$slug")({
  loader: async ({ params }) => {
    const product = await fetchProductBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData?.product) {
      return { meta: [{ title: "Product not found — FitnessCube" }, { name: "robots", content: "noindex" }] };
    }
    const { product } = loaderData;
    const description = (product.description || "").slice(0, 155);
    return {
      meta: [
        { title: `${product.name} — FitnessCube` },
        { name: "description", content: description },
        { property: "og:title", content: `${product.name} — FitnessCube` },
        { property: "og:description", content: description },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const loaderData = Route.useLoaderData() as { product: Product } | undefined;
  const { slug } = Route.useParams();
  const catalog = useCatalog();
  const product = catalog.find((p) => p.slug === slug) ?? loaderData?.product;

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h1 className="text-3xl font-bold">Product not found</h1>
        <Link to="/shop" className="mt-4 inline-block bg-primary px-6 py-2 text-sm text-primary-foreground">
          Browse shop
        </Link>
      </div>
    );
  }


  const cart = useCart();
  const { user } = useAuth();
  const [variant, setVariant] = useState(product.variants?.options[0]?.name);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"description" | "specs">("description");

  const price = product.variants
    ? (product.variants.options.find((o) => o.name === variant)?.price ?? product.price)
    : product.price;

  const related = catalog
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 4);

  const { data: allBundles = [] } = useBundles();
  const bundle = allBundles.find((b) => b.main_product_slug === product.slug);
  const bundleProducts = bundle
    ? catalog.filter((p) => bundle.companion_slugs.includes(p.slug))
    : [];

  const youtubeUrl = (product as any).youtubeUrl as string | null;
  const manualUrl = (product as any).manualUrl as string | null;

  // Convert youtube watch URL to embed URL
  const youtubeEmbedUrl = youtubeUrl
    ? youtubeUrl.replace("watch?v=", "embed/").replace("youtu.be/", "www.youtube.com/embed/")
    : null;

  const addToWishlist = async () => {
    if (!user) {
      toast.error("Sign in to save items to your wishlist");
      return;
    }
    const { error } = await supabase
      .from("wishlist_items")
      .insert({ user_id: user.id, product_slug: product.slug });
    if (error) {
      toast.error(error.message.includes("duplicate") ? "Already in your wishlist" : error.message);
      return;
    }
    toast.success("Saved to wishlist");
  };

  const gallery = productImagesList((product as any).imageKey || (product as any).image_key);
  const [activeImg, setActiveImg] = useState<string | null>(null);
  const currentImg = activeImg || gallery[0] || product.image;

  const whatsappOrder = () => {
    const text = encodeURIComponent(
      `Hi FitnessCube! I am interested in ordering: ${product.name} (${formatPKR(price)}). Is it currently available?`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <nav className="mb-6 text-xs uppercase tracking-widest text-muted-foreground">
        <Link to="/" className="hover:text-primary">
          Home
        </Link>
        <span className="px-2">/</span>
        <Link to="/category/$slug" params={{ slug: product.category }} className="hover:text-primary">
          {product.subcategory}
        </Link>
        <span className="px-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-3">
          <div className="border border-border bg-secondary">
            <img
              src={currentImg || FALLBACK_IMAGE}
              alt={product.name}
              width={1200}
              height={1200}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = FALLBACK_IMAGE;
              }}
              className="aspect-square w-full object-cover"
            />
          </div>
          {gallery.length > 1 && (
            <div className="flex flex-wrap gap-2">
              {gallery.map((imgUrl, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImg(imgUrl)}
                  className={`h-16 w-16 overflow-hidden border-2 bg-secondary ${
                    currentImg === imgUrl ? "border-primary" : "border-border hover:border-primary/50"
                  }`}
                >
                  <img src={imgUrl} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">{product.brand}</p>
          <h1 className="mt-2 text-3xl md:text-4xl">{product.name}</h1>
          <div className="mt-3">
            <Stars rating={product.rating} reviews={product.reviews} />
          </div>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-primary">{formatPKR(price)}</span>
            {product.oldPrice && (
              <span className="text-lg text-muted-foreground line-through">{formatPKR(product.oldPrice)}</span>
            )}
          </div>

          <p className="mt-4 text-sm text-muted-foreground">{product.description}</p>

          <p className="mt-4 text-xs font-bold uppercase tracking-widest">
            {product.inStock ? (
              <span className="text-accent">In stock — ships in 2-4 days</span>
            ) : (
              <span className="text-destructive">Out of stock</span>
            )}
          </p>

          {product.variants && (
            <div className="mt-6">
              <p className="mb-2 text-xs font-bold uppercase tracking-widest">{product.variants.label}</p>
              <div className="flex flex-wrap gap-2">
                {product.variants.options.map((o) => (
                  <button
                    key={o.name}
                    type="button"
                    onClick={() => setVariant(o.name)}
                    className={`border px-4 py-2 text-sm ${
                      variant === o.name
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/60"
                    }`}
                  >
                    {o.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-stretch gap-3">
            <div className="flex items-center border border-border">
              <button
                type="button"
                onClick={() => setQty((n) => Math.max(1, n - 1))}
                className="grid h-12 w-12 place-items-center hover:text-primary"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center text-sm font-bold">{qty}</span>
              <button
                type="button"
                onClick={() => setQty((n) => n + 1)}
                className="grid h-12 w-12 place-items-center hover:text-primary"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <button
              type="button"
              disabled={!product.inStock}
              onClick={() => {
                cart.add(
                  {
                    slug: product.slug,
                    name: product.name,
                    price,
                    image: product.image,
                    ...(variant ? { variant } : {}),
                  },
                  qty,
                );
                toast.success(`${product.name} added to cart`);
              }}
              className="h-12 flex-1 bg-primary px-8 text-sm font-bold uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/85 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {product.inStock ? "Add to cart" : "Out of stock"}
            </button>

            <button
              type="button"
              onClick={whatsappOrder}
              className="h-12 border border-emerald-600 bg-emerald-600/10 px-5 text-xs font-bold uppercase tracking-widest text-emerald-600 transition-colors hover:bg-emerald-600 hover:text-white"
            >
              Order on WhatsApp
            </button>

            <button
              type="button"
              onClick={addToWishlist}
              className="grid h-12 w-12 place-items-center border border-border hover:border-primary hover:text-primary"
              aria-label="Add to wishlist"
            >
              <Heart className="h-5 w-5" />
            </button>
          </div>

          <ul className="mt-8 space-y-2 border-t border-border pt-6 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-primary" /> Nationwide delivery across Pakistan
            </li>
            <li className="flex items-center gap-2">
              <Wrench className="h-4 w-4 text-primary" /> Free installation on large machines
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" /> 1 year parts & service warranty
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-14 border-t border-border pt-8">
        <div className="flex gap-6 text-xs font-bold uppercase tracking-widest">
          <button
            type="button"
            onClick={() => setTab("description")}
            className={tab === "description" ? "text-primary" : "text-muted-foreground"}
          >
            Description
          </button>
          <button
            type="button"
            onClick={() => setTab("specs")}
            className={tab === "specs" ? "text-primary" : "text-muted-foreground"}
          >
            Specifications
          </button>
        </div>
        <div className="mt-5 max-w-3xl text-sm text-muted-foreground">
          {tab === "description" ? (
            <p>{product.description}</p>
          ) : (
            <ul className="space-y-2">
              {product.specs.map((s) => (
                <li key={s} className="border-b border-border pb-2">
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* ── YouTube video ──────────────────────────────────────────────── */}
      {youtubeEmbedUrl && (
        <div className="mt-10 border-t border-border pt-8">
          <h2 className="mb-4 flex items-center gap-2 text-xl">
            <Youtube className="h-5 w-5 text-red-500" />
            Installation &amp; Assembly Guide
          </h2>
          <div className="aspect-video w-full max-w-3xl overflow-hidden border border-border">
            <iframe
              src={youtubeEmbedUrl}
              title={`${product.name} video guide`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
        </div>
      )}

      {/* ── Manual download ───────────────────────────────────────────── */}
      {manualUrl && (
        <div className="mt-6">
          <a
            href={manualUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 border border-border px-5 py-2.5 text-sm font-bold uppercase tracking-widest hover:border-primary hover:text-primary"
          >
            <FileText className="h-4 w-4" />
            Download User Manual (PDF)
          </a>
        </div>
      )}

      {/* ── Frequently Bought Together ────────────────────────────────── */}

      {bundleProducts.length > 0 && (
        <div className="mt-16 border border-border bg-secondary/20 p-6">
          <h2 className="mb-1 flex items-center gap-2 text-xl">
            <ShoppingBag className="h-5 w-5 text-primary" />
            {bundle?.bundle_name ?? "Frequently Bought Together"}
          </h2>
          <p className="mb-5 text-sm text-muted-foreground">Customers who bought this also bought</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {bundleProducts.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
          <button
            type="button"
            onClick={() => {
              bundleProducts.forEach((p) => {
                cart.add({ slug: p.slug, name: p.name, price: p.price, image: p.image }, 1);
              });
              toast.success(`${bundleProducts.length} items added to cart`);
            }}
            className="mt-4 flex items-center gap-2 border border-primary bg-primary/10 px-5 py-2.5 text-sm font-bold uppercase tracking-widest text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <ShoppingBag className="h-4 w-4" />
            Add All {bundleProducts.length} to Cart
          </button>
        </div>
      )}

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-6 text-2xl">You may also like</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
