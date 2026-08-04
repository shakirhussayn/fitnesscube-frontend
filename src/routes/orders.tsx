import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { formatPKR } from "@/lib/format";

type OrderRow = {
  id: string;
  created_at: string;
  status: string;
  total: number;
  city: string;
  payment_method: string;
  order_items: {
    id: string;
    product_name: string;
    product_slug: string;
    variant: string | null;
    quantity: number;
    unit_price: number;
    image_url: string | null;
  }[];
};

export const Route = createFileRoute("/orders")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Order History — FitnessCube" },
      { name: "description", content: "Track your FitnessCube orders and see everything you've purchased." },
      { property: "og:title", content: "Order History — FitnessCube" },
      { property: "og:description", content: "Track your FitnessCube orders." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Orders,
});

function Orders() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth", replace: true });
  }, [loading, user, navigate]);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("orders")
      .select(
        "id, created_at, status, total, city, payment_method, order_items(id, product_name, product_slug, variant, quantity, unit_price, image_url)",
      )
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setOrders((data as OrderRow[]) ?? []);
        setFetching(false);
      });
  }, [user]);

  if (loading || !user || fetching) {
    return <div className="mx-auto max-w-7xl px-4 py-20 text-sm text-muted-foreground">Loading…</div>;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-4xl">Order history</h1>

      {orders.length === 0 ? (
        <div className="mt-8 border border-border p-12 text-center">
          <p className="text-muted-foreground">You haven't placed any orders yet.</p>
          <Link
            to="/shop"
            search={{ q: undefined, category: undefined, min: 0, max: 250000, sort: "featured" }}
            className="mt-6 inline-block bg-primary px-6 py-3 text-sm font-bold uppercase tracking-widest text-primary-foreground"
          >
            Start shopping
          </Link>
        </div>
      ) : (
        <div className="mt-8 space-y-6">
          {orders.map((order) => (
            <article key={order.id} className="border border-border">
              <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-4 text-xs uppercase tracking-widest">
                <span className="text-muted-foreground">
                  Order #{order.id.slice(0, 8)} · {new Date(order.created_at).toLocaleDateString("en-PK")}
                </span>
                <span className="bg-primary px-2 py-1 text-primary-foreground">{order.status}</span>
              </header>
              <ul className="divide-y divide-border">
                {order.order_items.map((item) => (
                  <li key={item.id} className="flex items-center gap-4 p-4">
                    {item.image_url && (
                      <img src={item.image_url} alt={item.product_name} className="h-16 w-16 object-cover" />
                    )}
                    <div className="flex-1 text-sm">
                      <Link
                        to="/product/$slug"
                        params={{ slug: item.product_slug }}
                        className="font-semibold hover:text-primary"
                      >
                        {item.product_name}
                      </Link>
                      {item.variant && <p className="text-xs text-muted-foreground">{item.variant}</p>}
                      <p className="text-xs text-muted-foreground">Qty {item.quantity}</p>
                    </div>
                    <p className="text-sm">{formatPKR(item.unit_price * item.quantity)}</p>
                  </li>
                ))}
              </ul>
              <footer className="flex justify-between border-t border-border p-4 text-sm">
                <span className="text-muted-foreground">
                  {order.payment_method === "cod" ? "Cash on delivery" : "Bank transfer"} · {order.city}
                </span>
                <span className="font-bold text-primary">{formatPKR(order.total)}</span>
              </footer>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
