import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import type { Product } from "@/data/products";
import { formatPKR } from "@/lib/format";
import { useCart } from "@/lib/cart";
import { Stars } from "@/components/Stars";

export function ProductCard({ product }: { product: Product }) {
  const cart = useCart();
  const hasVariants = Boolean(product.variants);

  return (
    <article className="group flex flex-col border border-border bg-card transition-colors hover:border-primary/60">
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="relative block overflow-hidden bg-secondary"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={900}
          height={900}
          className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-0 top-0 flex flex-col items-start gap-1 p-2">
          {product.oldPrice && (
            <span className="bg-primary px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-primary-foreground">
              Sale
            </span>
          )}
          {product.tags.includes("new") && (
            <span className="bg-accent px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-accent-foreground">
              New
            </span>
          )}
        </div>
        {!product.inStock && (
          <span className="absolute inset-x-0 bottom-0 bg-background/85 py-1.5 text-center text-xs font-semibold uppercase tracking-widest">
            Out of stock
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{product.subcategory}</p>
        <h3 className="text-base leading-tight">
          <Link to="/product/$slug" params={{ slug: product.slug }} className="hover:text-primary">
            {product.name}
          </Link>
        </h3>
        <Stars rating={product.rating} reviews={product.reviews} />
        <div className="mt-auto flex items-baseline gap-2 pt-2">
          <span className="text-lg font-bold">{formatPKR(product.price)}</span>
          {product.oldPrice && (
            <span className="text-sm text-muted-foreground line-through">{formatPKR(product.oldPrice)}</span>
          )}
        </div>

        {!product.inStock ? (
          <Link
            to="/product/$slug"
            params={{ slug: product.slug }}
            className="mt-2 block border border-border px-3 py-2 text-center text-xs font-bold uppercase tracking-widest hover:border-primary hover:text-primary"
          >
            Read more
          </Link>
        ) : hasVariants ? (
          <Link
            to="/product/$slug"
            params={{ slug: product.slug }}
            className="mt-2 block border border-border px-3 py-2 text-center text-xs font-bold uppercase tracking-widest hover:border-primary hover:text-primary"
          >
            Select options
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => {
              cart.add({
                slug: product.slug,
                name: product.name,
                price: product.price,
                image: product.image,
              });
              toast.success(`${product.name} added to cart`);
            }}
            className="mt-2 bg-primary px-3 py-2 text-xs font-bold uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/85"
          >
            Add to cart
          </button>
        )}
      </div>
    </article>
  );
}
