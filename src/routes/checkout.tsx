import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";
import { formatPKR } from "@/lib/format";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/checkout")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Checkout — FitnessCube" },
      { name: "description", content: "Complete your FitnessCube order with cash on delivery or bank transfer." },
      { property: "og:title", content: "Checkout — FitnessCube" },
      { property: "og:description", content: "Complete your FitnessCube order." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Checkout,
});

function Checkout() {
  const cart = useCart();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
    payment_method: "cod",
  });

  const shipping = cart.subtotal > 25000 || cart.subtotal === 0 ? 0 : 1500;
  const total = cart.subtotal + shipping;

  useEffect(() => {
    if (!user) return;
    setForm((f) => ({ ...f, email: f.email || user.email || "" }));
    supabase
      .from("profiles")
      .select("full_name, phone, address, city")
      .eq("id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (!data) return;
        setForm((f) => ({
          ...f,
          full_name: f.full_name || data.full_name || "",
          phone: f.phone || data.phone || "",
          address: f.address || data.address || "",
          city: f.city || data.city || "",
        }));
      });
  }, [user]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please sign in to place your order");
      navigate({ to: "/auth" });
      return;
    }
    if (cart.lines.length === 0) return;

    setSubmitting(true);
    const { data: order, error } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        full_name: form.full_name,
        email: form.email,
        phone: form.phone,
        address: form.address,
        city: form.city,
        notes: form.notes || null,
        payment_method: form.payment_method,
        subtotal: cart.subtotal,
        shipping,
        total,
      })
      .select("id")
      .single();

    if (error || !order) {
      setSubmitting(false);
      toast.error(error?.message ?? "Could not place your order");
      return;
    }

    const { error: itemsError } = await supabase.from("order_items").insert(
      cart.lines.map((l) => ({
        order_id: order.id,
        user_id: user.id,
        product_slug: l.slug,
        product_name: l.name,
        variant: l.variant ?? null,
        unit_price: l.price,
        quantity: l.quantity,
        image_url: l.image,
      })),
    );

    setSubmitting(false);
    if (itemsError) {
      toast.error(itemsError.message);
      return;
    }

    cart.clear();
    toast.success("Order placed! We'll call you to confirm.");
    navigate({ to: "/orders" });
  };

  if (loading) {
    return <div className="mx-auto max-w-7xl px-4 py-20 text-sm text-muted-foreground">Loading…</div>;
  }

  if (cart.lines.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h1 className="text-3xl">Nothing to check out</h1>
        <Link
          to="/shop"
          search={{ q: undefined, category: undefined, min: undefined, max: undefined, sort: "featured" }}
          className="mt-6 inline-block bg-primary px-6 py-3 text-sm font-bold uppercase tracking-widest text-primary-foreground"
        >
          Browse products
        </Link>
      </div>
    );
  }

  const field = "h-11 w-full border border-input bg-secondary/40 px-3 text-sm outline-none focus:border-primary";

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-4xl">Checkout</h1>

      {!user && (
        <p className="mt-4 border border-primary/40 bg-primary/10 p-4 text-sm">
          You need an account to place an order.{" "}
          <Link to="/auth" className="font-bold text-primary underline">
            Sign in or create one
          </Link>
          .
        </p>
      )}

      <form onSubmit={submit} className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
        <div className="space-y-4 border border-border p-6">
          <h2 className="text-xl">Delivery details</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="mb-1 block text-xs uppercase tracking-widest text-muted-foreground">Full name</span>
              <input
                required
                className={field}
                value={form.full_name}
                onChange={(e) => setForm({ ...form, full_name: e.target.value })}
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block text-xs uppercase tracking-widest text-muted-foreground">Email</span>
              <input
                required
                type="email"
                className={field}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block text-xs uppercase tracking-widest text-muted-foreground">Phone</span>
              <input
                required
                className={field}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block text-xs uppercase tracking-widest text-muted-foreground">City</span>
              <input
                required
                className={field}
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
              />
            </label>
          </div>
          <label className="block text-sm">
            <span className="mb-1 block text-xs uppercase tracking-widest text-muted-foreground">Address</span>
            <input
              required
              className={field}
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block text-xs uppercase tracking-widest text-muted-foreground">
              Order notes (optional)
            </span>
            <textarea
              rows={3}
              className="w-full border border-input bg-secondary/40 p-3 text-sm outline-none focus:border-primary"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </label>

          <h2 className="pt-4 text-xl">Payment</h2>
          <div className="space-y-2">
            {[
              { id: "cod", label: "Cash on delivery" },
              { id: "bank", label: "Bank transfer" },
            ].map((m) => (
              <label
                key={m.id}
                className={`flex cursor-pointer items-center gap-3 border p-3 text-sm ${
                  form.payment_method === m.id ? "border-primary bg-primary/10" : "border-border"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  className="accent-primary"
                  checked={form.payment_method === m.id}
                  onChange={() => setForm({ ...form, payment_method: m.id })}
                />
                {m.label}
              </label>
            ))}
          </div>
        </div>

        <aside className="h-fit border border-border p-6">
          <h2 className="text-xl">Your order</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {cart.lines.map((l) => (
              <li key={`${l.slug}-${l.variant ?? ""}`} className="flex justify-between gap-3">
                <span className="text-muted-foreground">
                  {l.name}
                  {l.variant ? ` (${l.variant})` : ""} × {l.quantity}
                </span>
                <span>{formatPKR(l.price * l.quantity)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
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
              <dd className="text-primary">{formatPKR(total)}</dd>
            </div>
          </dl>
          <button
            type="submit"
            disabled={submitting}
            className="mt-6 w-full bg-primary px-6 py-3 text-sm font-bold uppercase tracking-widest text-primary-foreground hover:bg-primary/85 disabled:opacity-50"
          >
            {submitting ? "Placing order…" : "Place order"}
          </button>
        </aside>
      </form>
    </div>
  );
}
