import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ShieldCheck, ShieldOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { formatPKR } from "@/lib/format";
import { useAdminCustomers, useAdminOrders, useAdminRoles } from "@/lib/admin";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/admin/customers")({
  component: AdminCustomers,
});

function AdminCustomers() {
  const customers = useAdminCustomers();
  const orders = useAdminOrders();
  const roles = useAdminRoles();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [term, setTerm] = useState("");

  const rows = useMemo(() => {
    const stats = new Map<string, { count: number; spend: number; email: string; last: string }>();
    for (const o of orders.data ?? []) {
      const s = stats.get(o.user_id) ?? { count: 0, spend: 0, email: o.email, last: o.created_at };
      s.count += 1;
      if (o.status !== "cancelled") s.spend += o.total;
      if (o.created_at > s.last) s.last = o.created_at;
      s.email = s.email || o.email;
      stats.set(o.user_id, s);
    }
    const adminIds = new Set((roles.data ?? []).filter((r) => r.role === "admin").map((r) => r.user_id));

    let list = (customers.data ?? []).map((c) => ({
      ...c,
      email: stats.get(c.id)?.email ?? "",
      orders: stats.get(c.id)?.count ?? 0,
      spend: stats.get(c.id)?.spend ?? 0,
      isAdmin: adminIds.has(c.id),
    }));
    if (term.trim()) {
      const needle = term.trim().toLowerCase();
      list = list.filter((c) =>
        [c.full_name, c.email, c.phone, c.city].filter(Boolean).join(" ").toLowerCase().includes(needle),
      );
    }
    return list.sort((a, b) => b.spend - a.spend);
  }, [customers.data, orders.data, roles.data, term]);

  const setAdmin = async (userId: string, makeAdmin: boolean) => {
    const { error } = makeAdmin
      ? await supabase.from("user_roles").insert({ user_id: userId, role: "admin" })
      : await supabase.from("user_roles").delete().eq("user_id", userId).eq("role", "admin");
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(makeAdmin ? "Admin access granted" : "Admin access removed");
    await queryClient.invalidateQueries({ queryKey: ["admin", "roles"] });
  };

  if (customers.isLoading) return <p className="text-sm text-muted-foreground">Loading customers…</p>;

  return (
    <div>
      <input
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Search customers"
        aria-label="Search customers"
        className="mb-5 h-10 w-full max-w-xs border border-input bg-secondary/40 px-3 text-sm outline-none focus:border-primary"
      />

      {rows.length === 0 ? (
        <p className="border border-border p-10 text-center text-sm text-muted-foreground">No customers yet.</p>
      ) : (
        <div className="divide-y divide-border border border-border">
          {rows.map((c) => (
            <div key={c.id} className="flex flex-wrap items-center gap-3 p-4">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold">
                  {c.full_name || c.email || "Customer"}
                  {c.isAdmin && (
                    <span className="ml-2 bg-primary/15 px-2 py-0.5 text-[10px] uppercase tracking-widest text-primary">
                      admin
                    </span>
                  )}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {[c.email, c.phone, c.city].filter(Boolean).join(" · ") || "No contact details saved"}
                </p>
              </div>
              <div className="text-right text-xs text-muted-foreground">
                <p className="text-sm font-bold text-foreground">{formatPKR(c.spend)}</p>
                <p>
                  {c.orders} order{c.orders === 1 ? "" : "s"}
                </p>
              </div>
              {c.id !== user?.id && (
                <button
                  type="button"
                  onClick={() => setAdmin(c.id, !c.isAdmin)}
                  className="flex items-center gap-2 border border-border px-3 py-2 text-[10px] uppercase tracking-widest hover:border-primary hover:text-primary"
                >
                  {c.isAdmin ? <ShieldOff className="h-3.5 w-3.5" /> : <ShieldCheck className="h-3.5 w-3.5" />}
                  {c.isAdmin ? "Revoke admin" : "Make admin"}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
