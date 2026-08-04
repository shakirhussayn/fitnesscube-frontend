import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ChevronDown, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { formatPKR } from "@/lib/format";
import { ORDER_STATUSES, useAdminOrderItems, useAdminOrders, type OrderStatus } from "@/lib/admin";

export const Route = createFileRoute("/admin/orders")({
  component: AdminOrders,
});

const statusStyles: Record<string, string> = {
  pending: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  confirmed: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
  shipped: "bg-purple-500/15 text-purple-600 dark:text-purple-400",
  delivered: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  cancelled: "bg-destructive/15 text-destructive",
};

function AdminOrders() {
  const orders = useAdminOrders();
  const items = useAdminOrderItems();
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<"all" | OrderStatus>("all");
  const [open, setOpen] = useState<string | null>(null);
  const [term, setTerm] = useState("");

  const list = useMemo(() => {
    let rows = orders.data ?? [];
    if (filter !== "all") rows = rows.filter((o) => o.status === filter);
    if (term.trim()) {
      const needle = term.trim().toLowerCase();
      rows = rows.filter((o) =>
        [o.full_name, o.email, o.phone, o.city].join(" ").toLowerCase().includes(needle),
      );
    }
    return rows;
  }, [orders.data, filter, term]);

  const itemsByOrder = useMemo(() => {
    const map = new Map<string, typeof items.data extends undefined ? never : NonNullable<typeof items.data>>();
    for (const item of items.data ?? []) {
      const arr = map.get(item.order_id) ?? [];
      arr.push(item);
      map.set(item.order_id, arr);
    }
    return map;
  }, [items.data]);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("orders").update({ status }).eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(`Order marked ${status}`);
    await queryClient.invalidateQueries({ queryKey: ["admin", "orders"] });
  };

  if (orders.isLoading) return <p className="text-sm text-muted-foreground">Loading orders…</p>;

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <input
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search name, email, phone, city"
          aria-label="Search orders"
          className="h-10 w-full max-w-xs border border-input bg-secondary/40 px-3 text-sm outline-none focus:border-primary"
        />
        <div className="flex flex-wrap gap-1">
          {(["all", ...ORDER_STATUSES] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setFilter(s)}
              className={`border px-3 py-2 text-xs uppercase tracking-widest ${
                filter === s ? "border-primary text-primary" : "border-border text-muted-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {list.length === 0 ? (
        <p className="border border-border p-10 text-center text-sm text-muted-foreground">No orders found.</p>
      ) : (
        <div className="divide-y divide-border border border-border">
          {list.map((o) => {
            const expanded = open === o.id;
            return (
              <div key={o.id}>
                <div className="flex flex-wrap items-center gap-3 p-4">
                  <button
                    type="button"
                    onClick={() => setOpen(expanded ? null : o.id)}
                    className="flex min-w-0 flex-1 items-center gap-3 text-left"
                    aria-expanded={expanded}
                  >
                    {expanded ? (
                      <ChevronDown className="h-4 w-4 shrink-0" />
                    ) : (
                      <ChevronRight className="h-4 w-4 shrink-0" />
                    )}
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold">
                        {o.full_name} <span className="font-normal text-muted-foreground">· {o.city}</span>
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {new Date(o.created_at).toLocaleString()} · {o.payment_method.toUpperCase()} ·{" "}
                        #{o.id.slice(0, 8)}
                      </p>
                    </div>
                  </button>

                  <span
                    className={`px-2 py-1 text-[10px] font-bold uppercase tracking-widest ${
                      statusStyles[o.status] ?? "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {o.status}
                  </span>
                  <span className="w-28 text-right text-sm font-bold text-primary">{formatPKR(o.total)}</span>
                  <select
                    value={o.status}
                    onChange={(e) => updateStatus(o.id, e.target.value)}
                    aria-label={`Update status for order ${o.id.slice(0, 8)}`}
                    className="h-9 border border-input bg-secondary/40 px-2 text-xs uppercase tracking-widest outline-none focus:border-primary"
                  >
                    {ORDER_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                {expanded && (
                  <div className="grid gap-6 border-t border-border bg-secondary/30 p-5 md:grid-cols-2">
                    <div className="text-sm">
                      <h3 className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">Delivery</h3>
                      <p>{o.full_name}</p>
                      <p className="text-muted-foreground">{o.address}</p>
                      <p className="text-muted-foreground">{o.city}</p>
                      <p className="mt-2">
                        <a href={`tel:${o.phone}`} className="text-primary hover:underline">
                          {o.phone}
                        </a>
                      </p>
                      <p>
                        <a href={`mailto:${o.email}`} className="text-primary hover:underline">
                          {o.email}
                        </a>
                      </p>
                      {o.notes && <p className="mt-2 text-muted-foreground">Note: {o.notes}</p>}
                    </div>
                    <div className="text-sm">
                      <h3 className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">Items</h3>
                      <ul className="space-y-2">
                        {(itemsByOrder.get(o.id) ?? []).map((item) => (
                          <li key={item.id} className="flex justify-between gap-4">
                            <span>
                              {item.quantity} × {item.product_name}
                              {item.variant ? ` (${item.variant})` : ""}
                            </span>
                            <span>{formatPKR(item.unit_price * item.quantity)}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-3 space-y-1 border-t border-border pt-3 text-muted-foreground">
                        <p className="flex justify-between">
                          <span>Subtotal</span>
                          <span>{formatPKR(o.subtotal)}</span>
                        </p>
                        <p className="flex justify-between">
                          <span>Shipping</span>
                          <span>{o.shipping === 0 ? "Free" : formatPKR(o.shipping)}</span>
                        </p>
                        <p className="flex justify-between font-bold text-foreground">
                          <span>Total</span>
                          <span>{formatPKR(o.total)}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
