import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPKR } from "@/lib/format";
import { useShippingRules, calcShipping } from "@/lib/shipping";
import { FALLBACK_IMAGE } from "@/lib/catalog";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — FitnessCube" },
      { name: "description", content: "Review the fitness equipment in your FitnessCube cart before checkout." },
      { property: "og:title", content: "Your Cart — FitnessCube" },
      { property: "og:description", content: "Review your FitnessCube order before checkout." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const cart = useCart();
  const { data: shippingRules = [] } = useShippingRules();
  const shipping = cart.subtotal === 0 ? 0 : calcShipping("", cart.subtotal, shippingRules);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-4xl">Your cart</h1>

      {cart.lines.length === 0 ? (
        <div className="mt-10 border border-border p-12 text-center">
          <p className="text-muted-foreground">Your cart is empty.</p>
          <Link
            to="/shop"
            search={{ q: undefined, category: undefined, min: undefined, max: undefined, sort: "featured" }}
            className="mt-6 inline-block bg-primary px-6 py-3 text-sm font-bold uppercase tracking-widest text-primary-foreground hover:bg-primary/85"
          >
            Start shopping
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
          <div className="divide-y divide-border border border-border">
            {cart.lines.map((line) => (
              <div key={`${line.slug}-${line.variant ?? ""}`} className="flex gap-4 p-4">
                <img
                  src={line.image || FALLBACK_IMAGE}
                  alt={line.name}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = FALLBACK_IMAGE;
                  }}
                  className="h-24 w-24 shrink-0 object-cover"
                />
                <div className="flex-1">
                  <Link to="/product/$slug" params={{ slug: line.slug }} className="font-semibold hover:text-primary">
                    {line.name}
                  </Link>
                  {line.variant && <p className="text-xs text-muted-foreground">{line.variant}</p>}
                  <p className="mt-1 text-sm text-primary">{formatPKR(line.price)}</p>

                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex items-center border border-border">
                      <button
                        type="button"
                        onClick={() => cart.setQuantity(line.slug, line.variant, line.quantity - 1)}
                        className="grid h-9 w-9 place-items-center hover:text-primary"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm">{line.quantity}</span>
                      <button
                        type="button"
                        onClick={() => cart.setQuantity(line.slug, line.variant, line.quantity + 1)}
                        className="grid h-9 w-9 place-items-center hover:text-primary"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => cart.remove(line.slug, line.variant)}
                      className="inline-flex items-center gap-1 text-xs uppercase tracking-widest text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Remove
                    </button>
                  </div>
                </div>
                <p className="font-bold">{formatPKR(line.price * line.quantity)}</p>
              </div>
            ))}
          </div>

          <aside className="h-fit border border-border p-6">
            <h2 className="text-xl">Order summary</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd>{formatPKR(cart.subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Shipping</dt>
                <dd>{shipping === 0 ? "Free" : formatPKR(shipping)}</dd>
              </div>
              <div className="flex justify-between border-t border-border pt-3 text-base font-bold">
                <dt>Total</dt>
                <dd className="text-primary">{formatPKR(cart.subtotal + shipping)}</dd>
              </div>
            </dl>
            <Link
              to="/checkout"
              className="mt-6 block bg-primary px-6 py-3 text-center text-sm font-bold uppercase tracking-widest text-primary-foreground hover:bg-primary/85"
            >
              Checkout
            </Link>
            <button
              type="button"
              onClick={cart.clear}
              className="mt-3 w-full text-xs uppercase tracking-widest text-muted-foreground hover:text-destructive"
            >
              Clear cart
            </button>
          </aside>
        </div>
      )}
    </div>
  );
}
