import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import { LayoutDashboard, Package, ShoppingBag, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { useAdminExists, useIsAdmin } from "@/lib/admin";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Store Admin — FitnessCube" },
      { name: "description", content: "Manage FitnessCube orders, products and customers." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLayout,
});

const tabs = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/orders", label: "Orders", icon: ShoppingBag, exact: false },
  { to: "/admin/products", label: "Products", icon: Package, exact: false },
  { to: "/admin/customers", label: "Customers", icon: Users, exact: false },
] as const;

function AdminLayout() {
  const { user, loading } = useAuth();
  const { isAdmin, checking } = useIsAdmin();
  const adminExists = useAdminExists();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!loading && !user) {
      navigate({ to: "/auth", search: { next: "/admin" } });
    }
  }, [loading, user, navigate]);

  if (loading || checking) {
    return <div className="mx-auto max-w-7xl px-4 py-20 text-sm text-muted-foreground">Checking access…</div>;
  }

  if (!user) return null;

  if (!isAdmin) {
    const canClaim = adminExists.data === false;
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="text-3xl">Store admin</h1>
        {canClaim ? (
          <>
            <p className="mt-3 text-sm text-muted-foreground">
              No owner account has been set up yet. Claim owner access for <strong>{user.email}</strong> — this
              can only be done once.
            </p>
            <button
              type="button"
              onClick={async () => {
                const { data, error } = await supabase.rpc("claim_first_admin");
                if (error || !data) {
                  toast.error(error?.message ?? "Owner access has already been claimed");
                  return;
                }
                toast.success("You are now the store owner");
                await queryClient.invalidateQueries();
              }}
              className="mt-6 bg-primary px-6 py-3 text-sm font-bold uppercase tracking-widest text-primary-foreground hover:bg-primary/85"
            >
              Claim owner access
            </button>
          </>
        ) : (
          <p className="mt-3 text-sm text-muted-foreground">
            This area is for store staff only. Ask the store owner to grant your account admin access from
            Admin → Customers.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-3xl">Store admin</h1>
      <p className="mt-1 text-sm text-muted-foreground">Signed in as {user.email}</p>

      <nav className="mt-6 flex flex-wrap gap-1 border-b border-border">
        {tabs.map((t) => (
          <Link
            key={t.to}
            to={t.to}
            activeOptions={{ exact: t.exact }}
            className="flex items-center gap-2 border-b-2 border-transparent px-4 py-3 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground"
            activeProps={{
              className:
                "flex items-center gap-2 border-b-2 border-primary px-4 py-3 text-xs font-bold uppercase tracking-widest text-primary",
            }}
          >
            <t.icon className="h-4 w-4" />
            {t.label}
          </Link>
        ))}
      </nav>

      <div className="py-8">
        <Outlet />
      </div>
    </div>
  );
}
