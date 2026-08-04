import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { rowToProduct, type AdminProduct, type ProductRow } from "@/lib/catalog";

export const ORDER_STATUSES = ["pending", "confirmed", "shipped", "delivered", "cancelled"] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

export type AdminOrder = {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  notes: string | null;
  payment_method: string;
  status: string;
  subtotal: number;
  shipping: number;
  total: number;
  created_at: string;
};

export type AdminOrderItem = {
  id: string;
  order_id: string;
  product_name: string;
  product_slug: string;
  variant: string | null;
  unit_price: number;
  quantity: number;
  image_url: string | null;
};

/** True when the signed-in user holds the admin role (verified server-side). */
export function useIsAdmin() {
  const { user, loading } = useAuth();
  const query = useQuery({
    queryKey: ["is-admin", user?.id ?? null],
    enabled: Boolean(user),
    staleTime: 60_000,
    queryFn: async () => {
      const { data, error } = await supabase.rpc("has_role", {
        _user_id: user!.id,
        _role: "admin",
      });
      if (error) throw error;
      return Boolean(data);
    },
  });
  return {
    isAdmin: Boolean(query.data),
    checking: loading || (Boolean(user) && query.isLoading),
  };
}

export function useAdminExists() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["admin-exists"],
    enabled: Boolean(user),
    queryFn: async () => {
      const { data, error } = await supabase.rpc("admin_exists");
      if (error) throw error;
      return Boolean(data);
    },
  });
}

export function useAdminOrders() {
  return useQuery({
    queryKey: ["admin", "orders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as unknown as AdminOrder[];
    },
  });
}

export function useAdminOrderItems() {
  return useQuery({
    queryKey: ["admin", "order-items"],
    queryFn: async () => {
      const { data, error } = await supabase.from("order_items").select("*");
      if (error) throw error;
      return data as unknown as AdminOrderItem[];
    },
  });
}

export function useAdminProducts() {
  return useQuery({
    queryKey: ["admin", "products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return (data as unknown as ProductRow[]).map(rowToProduct) as AdminProduct[];
    },
  });
}

export type AdminCustomer = {
  id: string;
  full_name: string | null;
  phone: string | null;
  city: string | null;
  address: string | null;
  created_at: string;
};

export function useAdminCustomers() {
  return useQuery({
    queryKey: ["admin", "customers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as unknown as AdminCustomer[];
    },
  });
}

export function useAdminRoles() {
  return useQuery({
    queryKey: ["admin", "roles"],
    queryFn: async () => {
      const { data, error } = await supabase.from("user_roles").select("*");
      if (error) throw error;
      return data as unknown as { id: string; user_id: string; role: string }[];
    },
  });
}
