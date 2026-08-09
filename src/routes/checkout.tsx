import { useEffect, useState, useMemo } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { ChevronDown, ChevronUp, UserPlus } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";
import { formatPKR } from "@/lib/format";
import { supabase } from "@/integrations/supabase/client";
import { useShippingRules, calcShipping } from "@/lib/shipping";

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
  const [createAccount, setCreateAccount] = useState(false);
  const [password, setPassword] = useState("");
  const [showSignIn, setShowSignIn] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState<string | null>(null);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
    payment_method: "cod",
  });

  const { data: shippingRules = [] } = useShippingRules();
  const shipping = useMemo(
    () => (cart.subtotal === 0 ? 0 : calcShipping(form.city, cart.subtotal, shippingRules)),
    [form.city, cart.subtotal, shippingRules],
  );
  const total = cart.subtotal + shipping;

  // Pre-fill from logged-in user profile
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
    if (cart.lines.length === 0) return;
    if (createAccount && password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setSubmitting(true);

    // If user wants to create account, do that first
    let resolvedUserId: string | null = user?.id ?? null;

    if (!user && createAccount && form.email && password) {
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: form.email,
        password,
        options: {
          data: { full_name: form.full_name },
        },
      });
      if (signUpError) {
        setSubmitting(false);
        toast.error(`Could not create account: ${signUpError.message}`);
        return;
      }
      resolvedUserId = signUpData.user?.id ?? null;
    }

    // Insert order — user_id is null for guests (requires Supabase SQL fix)
    const { data: order, error } = await supabase
      .from("orders")
      .insert({
        user_id: resolvedUserId as any,
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

    // Insert order items
    const { error: itemsError } = await supabase.from("order_items").insert(
      cart.lines.map((l) => ({
        order_id: order.id,
        user_id: resolvedUserId as any,
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

    if (createAccount && !user) {
      toast.success("Account created! Check your email to verify.");
    }

    if (resolvedUserId) {
      toast.success("Order placed! We'll call you to confirm.");
      navigate({ to: "/orders" });
    } else {
      // Guest — show success screen inline
      setOrderPlaced(order.id);
    }
  };

  if (loading) {
    return <div className="mx-auto max-w-7xl px-4 py-20 text-sm text-muted-foreground">Loading…</div>;
  }

  // ─── Guest Order Success Screen ───────────────────────────────────────────
  if (orderPlaced) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <div className="mb-6 text-5xl">✅</div>
        <h1 className="text-3xl">Order Placed!</h1>
        <p className="mt-4 text-muted-foreground">
          Thank you for your order. Our team will call you shortly on{" "}
          <strong className="text-foreground">{form.phone}</strong> to confirm delivery details.
        </p>
        <p className="mt-2 text-xs text-muted-foreground">Order ID: {orderPlaced}</p>

        <a
          href={`https://wa.me/923372486635?text=${encodeURIComponent(
            `Hi! I just placed an order on FitnessCube (Order ID: ${orderPlaced}). Can you confirm my order?`,
          )}`}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-2 bg-emerald-600 px-6 py-3 text-sm font-bold uppercase tracking-widest text-white hover:bg-emerald-700"
        >
          Confirm via WhatsApp
        </a>

        <div className="mt-4">
          <Link
            to="/shop"
            search={{ q: undefined, category: undefined, min: undefined, max: undefined, sort: "featured" }}
            className="text-sm text-primary underline"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    );
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

      {/* ── Sign-in nudge for guests ───────────────────────────────────── */}
      {!user && (
        <div className="mt-4 border border-border bg-card p-4">
          <button
            type="button"
            onClick={() => setShowSignIn((v) => !v)}
            className="flex w-full items-center justify-between text-sm"
          >
            <span className="text-muted-foreground">
              Already have an account?{" "}
              <span className="font-semibold text-primary">Sign in for faster checkout</span>
            </span>
            {showSignIn ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          {showSignIn && <SignInPanel />}
        </div>
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

          {/* ── Optional account creation (guests only) ──────────────────── */}
          {!user && (
            <div className="mt-4 border border-border bg-muted/30 p-4">
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-0.5 h-4 w-4 accent-primary"
                  checked={createAccount}
                  onChange={(e) => setCreateAccount(e.target.checked)}
                />
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <UserPlus className="h-4 w-4 text-primary" />
                    Create an account (optional)
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Save your address for faster checkout next time and track your orders.
                  </p>
                </div>
              </label>

              {createAccount && (
                <div className="mt-3">
                  <label className="block text-sm">
                    <span className="mb-1 block text-xs uppercase tracking-widest text-muted-foreground">
                      Password (min. 6 characters)
                    </span>
                    <input
                      type="password"
                      className={field}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Choose a password"
                      minLength={6}
                    />
                  </label>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── Order summary sidebar ─────────────────────────────────────── */}
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
          {!user && (
            <p className="mt-3 text-center text-xs text-muted-foreground">
              No account required. We'll call to confirm.
            </p>
          )}
        </aside>
      </form>
    </div>
  );
}

/** Collapsible sign-in panel shown when guest clicks "Sign in" */
function SignInPanel() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Signed in!");
    }
  };

  const field = "h-10 w-full border border-input bg-secondary/40 px-3 text-sm outline-none focus:border-primary";

  return (
    <form onSubmit={signIn} className="mt-4 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
      <input
        required
        type="email"
        placeholder="Email"
        className={field}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        required
        type="password"
        placeholder="Password"
        className={field}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        disabled={loading}
        className="h-10 bg-primary px-4 text-xs font-bold uppercase tracking-widest text-primary-foreground hover:bg-primary/85 disabled:opacity-50"
      >
        {loading ? "…" : "Sign in"}
      </button>
    </form>
  );
}
