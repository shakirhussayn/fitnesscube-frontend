import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { formatPKR } from "@/lib/format";
import { useAdminOrderItems, useAdminOrders, useAdminProducts } from "@/lib/admin";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="border border-border p-5">
      <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

function AdminDashboard() {
  const orders = useAdminOrders();
  const items = useAdminOrderItems();
  const products = useAdminProducts();

  const stats = useMemo(() => {
    const list = orders.data ?? [];
    const paidish = list.filter((o) => o.status !== "cancelled");
    const revenue = paidish.reduce((sum, o) => sum + o.total, 0);
    const pending = list.filter((o) => o.status === "pending").length;
    const now = Date.now();
    const last30 = paidish.filter((o) => now - new Date(o.created_at).getTime() < 30 * 864e5);
    return {
      revenue,
      orders: list.length,
      pending,
      revenue30: last30.reduce((sum, o) => sum + o.total, 0),
      orders30: last30.length,
      avg: paidish.length ? Math.round(revenue / paidish.length) : 0,
    };
  }, [orders.data]);

  const topProducts = useMemo(() => {
    const map = new Map<string, { name: string; qty: number; revenue: number }>();
    for (const item of items.data ?? []) {
      const entry = map.get(item.product_slug) ?? { name: item.product_name, qty: 0, revenue: 0 };
      entry.qty += item.quantity;
      entry.revenue += item.quantity * item.unit_price;
      map.set(item.product_slug, entry);
    }
    return [...map.values()].sort((a, b) => b.revenue - a.revenue).slice(0, 5);
  }, [items.data]);

  const outOfStock = (products.data ?? []).filter((p) => !p.inStock);
  const hidden = (products.data ?? []).filter((p) => !p.isActive);

  if (orders.isLoading) {
    return <p className="text-sm text-muted-foreground">Loading dashboard…</p>;
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Total revenue" value={formatPKR(stats.revenue)} hint={`${stats.orders} orders`} />
        <Stat label="Last 30 days" value={formatPKR(stats.revenue30)} hint={`${stats.orders30} orders`} />
        <Stat label="Average order" value={formatPKR(stats.avg)} />
        <Stat label="Awaiting action" value={String(stats.pending)} hint="Orders still pending" />
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <section>
          <h2 className="mb-3 text-xl">Recent orders</h2>
          {(orders.data ?? []).length === 0 ? (
            <p className="border border-border p-8 text-center text-sm text-muted-foreground">No orders yet.</p>
          ) : (
            <ul className="divide-y divide-border border border-border">
              {(orders.data ?? []).slice(0, 6).map((o) => (
                <li key={o.id} className="flex items-center justify-between gap-4 p-4 text-sm">
                  <div>
                    <p className="font-bold">{o.full_name}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(o.created_at).toLocaleDateString()} · {o.city} · {o.status}
                    </p>
                  </div>
                  <span className="font-bold text-primary">{formatPKR(o.total)}</span>
                </li>
              ))}
            </ul>
          )}
          <Link
            to="/admin/orders"
            className="mt-3 inline-block text-xs uppercase tracking-widest text-primary hover:underline"
          >
            View all orders
          </Link>
        </section>

        <section>
          <h2 className="mb-3 text-xl">Best sellers</h2>
          {topProducts.length === 0 ? (
            <p className="border border-border p-8 text-center text-sm text-muted-foreground">
              No sales recorded yet.
            </p>
          ) : (
            <ul className="divide-y divide-border border border-border">
              {topProducts.map((p) => (
                <li key={p.name} className="flex items-center justify-between gap-4 p-4 text-sm">
                  <div>
                    <p className="font-bold">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.qty} sold</p>
                  </div>
                  <span className="font-bold text-primary">{formatPKR(p.revenue)}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <section className="grid gap-4 sm:grid-cols-2">
        <Stat
          label="Out of stock"
          value={String(outOfStock.length)}
          hint={outOfStock.slice(0, 3).map((p) => p.name).join(", ") || "Everything in stock"}
        />
        <Stat
          label="Hidden products"
          value={String(hidden.length)}
          hint={hidden.slice(0, 3).map((p) => p.name).join(", ") || "All products visible"}
        />
      </section>
    </div>
  );
}
